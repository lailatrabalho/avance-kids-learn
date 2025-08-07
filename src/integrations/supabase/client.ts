import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xwxzcklljjcyoblznocp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3eHpja2xsampjeW9ibHpub2NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NzQwOTAsImV4cCI6MjA2ODI1MDA5MH0.da5u8qn0ItyfdYLpOsofnocvSFc3FDh9syzXGIfaK6U'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)