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
