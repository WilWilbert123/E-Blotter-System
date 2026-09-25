import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1"

serve(async (req) => {
  return new Response(JSON.stringify({ message: "Bulk create users ready." }), {
    headers: { "Content-Type": "application/json" },
  })
})
