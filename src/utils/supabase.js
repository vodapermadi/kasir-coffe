import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xsuljuntphpookkbkdec.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzdWxqdW50cGhwb29ra2JrZGVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0ODkwMDAsImV4cCI6MjA2MzA2NTAwMH0.3U4f24lJnzOnPKGrNbwHTAKnesPUG5GjXayVRE43Uk4"

export const supabase = createClient(supabaseUrl, supabaseKey)