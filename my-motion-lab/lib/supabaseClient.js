import { createClient } from "@supabase/supabase-js"

let cachedClient = null

export function getSupabaseClient() {
  if (cachedClient) return cachedClient

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Avoid throwing during build/prerender when env vars aren't set yet.
  if (!supabaseUrl || !supabaseAnonKey) return null

  cachedClient = createClient(supabaseUrl, supabaseAnonKey)
  return cachedClient
}

// Back-compat named export used across the app.
// Will be `null` if NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are missing.
export const supabase = getSupabaseClient()
