import { createClient } from '@supabase/supabase-js'

const supabaseProjectId = import.meta.env.VITE_SUPABASE_PROJECT_ID
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? (supabaseProjectId ? `https://${supabaseProjectId}.supabase.co` : undefined)
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error('Supabase não configurado. Defina VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY.')
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey)
