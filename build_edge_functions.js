const fs = require('fs');
const path = require('path');

const write = (p, content) => {
  const full = path.join(__dirname, p);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content.trim() + '\n');
};

write('supabase/functions/create-user/index.ts', `
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Verify caller has permissions (must pass a valid JWT in Authorization header)
    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: userError } = await supabase.auth.getUser(token)
    
    if (userError || !user) throw new Error('Unauthorized')

    // Fetch caller role to ensure they are a SUPER_ADMIN or POLICE_ADMIN
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('roles(name)')
      .eq('id', user.id)
      .single()

    if (!profile?.roles?.name?.includes('ADMIN')) {
      throw new Error('Forbidden: Insufficient privileges to create users')
    }

    const { email, password, firstName, lastName, roleId, username } = await req.json()

    // 1. Create auth.user
    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    })

    if (createError) throw createError

    // 2. Create user_profile record
    const { error: profileError } = await supabase.from('user_profiles').insert({
      id: newUser.user.id,
      username,
      first_name: firstName,
      last_name: lastName,
      role_id: roleId,
      must_change_password: true
    })

    if (profileError) {
      // Rollback auth user if profile fails
      await supabase.auth.admin.deleteUser(newUser.user.id)
      throw profileError
    }

    return new Response(JSON.stringify({ user: newUser.user }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
`);

write('supabase/functions/generate-report/index.ts', `
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const { startDate, endDate, status } = await req.json()

    // Base query using the view which enforces RLS based on the caller's JWT automatically
    let query = supabase.from('blotter_reports_view').select('*')

    if (startDate) query = query.gte('incident_date', startDate)
    if (endDate) query = query.lte('incident_date', endDate)
    if (status && status !== 'ALL') query = query.eq('status', status)

    const { data, error } = await query

    if (error) throw error

    // Generate strict structured JSON payload for frontend PDF engine (e.g. react-pdf)
    const reportPayload = {
      generatedAt: new Date().toISOString(),
      recordCount: data.length,
      records: data,
      metadata: { scope: 'authorized_barangays', filters: { startDate, endDate, status } }
    }

    return new Response(JSON.stringify(reportPayload), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
`);

console.log('Built edge functions.');
