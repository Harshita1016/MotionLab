import { getSupabaseClient } from "@/lib/supabase/client"

/**
 * Fetches chat history for the current user.
 */
export async function getChatHistory() {
    const supabase = getSupabaseClient()
    if (!supabase) return []

    const { data, error } = await supabase
        .from("chat_history")
        .select("*")
        .order("created_at", { ascending: true })

    if (error) {
        console.error("Error fetching chat history:", error)
        return []
    }
    return data
}

/**
 * Saves a single chat message to the database.
 */
export async function saveChatMessage(role, content, code_snippet = null) {
    const supabase = getSupabaseClient()
    if (!supabase) return null

    // Get current user ID first
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data, error } = await supabase
        .from("chat_history")
        .insert([
            {
                user_id: user.id,
                role,
                content,
                code_snippet,
            },
        ])
        .select()

    if (error) {
        console.error("Error saving chat message:", error)
        return null
    }
    return data?.[0]
}

/**
 * Saves an animation snippet to the library.
 */
export async function saveAnimation(title, css_code, type = "custom") {
    const supabase = getSupabaseClient()
    if (!supabase) return { error: "Supabase client not initialized" }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: "User not logged in" }

    const { data, error } = await supabase
        .from("animations")
        .insert([
            {
                user_id: user.id,
                title,
                css_code,
                type,
                settings: {}, // Default empty settings for now
                is_public: false,
            },
        ])
        .select()

    if (error) {
        console.error("Error saving animation:", error)
        return { error: error.message }
    }
    return { success: true, data: data?.[0] }
}

/**
 * Fetches saved animations for the current user.
 */
export async function getSavedAnimations() {
    const supabase = getSupabaseClient()
    if (!supabase) return []

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    const { data, error } = await supabase
        .from("animations")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

    if (error) {
        console.error("Error fetching animations:", error)
        return []
    }
    return data
}
