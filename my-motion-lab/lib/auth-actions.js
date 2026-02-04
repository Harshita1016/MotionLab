'use server'

import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

/**
 * Creates a Supabase client for Server Actions with cookie handling support could be added here
 * For now, we use a simple client for direct auth operations or rely on client-side triggering if we want simple implementation
 * BUT, for proper Server Actions, we should really use the ssr package if available, or just standard REST via JS sdk
 * Given package.json has "@supabase/supabase-js": "^2.93.1", we will use that.
 * Note: Without @supabase/ssr, persisting session in cookies from purely server-side is harder.
 * However, the standard pattern for Next.js App Router with just supabase-js often involves client-side auth OR manual cookie handling.
 * 
 * To keep it simple and working with what we have:
 * We'll perform the auth action here.
 */

function getSupabase() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!supabaseUrl || !supabaseKey) {
        throw new Error("Missing Supabase credentials")
    }
    return createClient(supabaseUrl, supabaseKey)
}

export async function signup(prevState, formData) {
    const email = formData.get('email')
    const password = formData.get('password')
    const confirmPassword = formData.get('confirmPassword')

    if (!email || !password) {
        return { error: 'Email and password are required' }
    }

    if (password !== confirmPassword) {
        return { error: 'Passwords do not match' }
    }

    if (password.length < 6) {
        return { error: 'Password must be at least 6 characters' }
    }

    const supabase = getSupabase()

    // Clean up origin for redirect
    // In server actions, we might not have 'window'. We can try to get it from headers or hardcode for now
    // For simplicity let's just use a relative path /features which supabase handles relative to site URL

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        // options: {
        //   emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
        // },
    })

    if (error) {
        return { error: error.message }
    }

    return { success: true, message: 'Check your email to confirm your account.' }
}

export async function login(prevState, formData) {
    const email = formData.get('email')
    const password = formData.get('password')

    if (!email || !password) {
        return { error: 'Email and password are required' }
    }

    const supabase = getSupabase()

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { error: error.message }
    }

    // Important: In a real app using @supabase/ssr, we would set cookies here.
    // Since we are using basic supabase-js in a server action, the session isn't automatically persisted to browser cookies 
    // unless we do manual cookie setting. 
    //
    // However, often it's easier to do the actual SignIn on the CLIENT side for simple apps to get the cookie set by the client SDK automatically.
    //
    // WAIT: The user specifically asked to "connect login and signUp page to supabse with authentication".
    // The simplest reliable way with just `supabase-js` (no SSR package) is CLIENT SIDE.
    // Using Server Actions for auth without the SSR helper package is actually tricky because you have to manually handle the access_token cookie.
    //
    // RE-EVALUATION: The previous client-side code in `signin/page.jsx` was ALREADY using client-side auth.
    // "const { error } = await supabase.auth.signInWithPassword..."
    // This works fine.
    //
    // The user *asked* for "Server Actions" in my plan? I proposed it.
    // But strictly speaking, doing it client-side is often robust enough for "just connecting" if we don't have the middleware setup.
    //
    // BUT, I promised Server Actions in the plan. I should try to deliver, OR fallback to a hybrid if it's too complex without `ssr` package.
    // Actually, looking at `package.json`, they only have `@supabase/supabase-js`.
    // If I do `signInWithPassword` on the server, the `access_token` is returned in `data.session`.
    // I *can* set that as a cookie.

    // Let's stick to the PLAN: Server Actions.
    // But to ensure the session persists on the client, we might need to actually return the session 
    // and have the client set the session, OR simpler: strictly use Client Components for the Auth interaction 
    // as acts of "Signing In" usually require setting browser cookies which the client SDK does best.
    //
    // Actually, the previous implementation in `login/page.jsx` was:
    // `const { error } = await supabase.auth.signInWithPassword(...)`
    // This was Client Side.
    //
    // If I move to Server Actions, I have to handle cookies.
    //
    // USEFUL COMPROMISE:
    // I will write the Server Action helper, but if we lack the `@supabase/ssr` package, 
    // maybe I should implement the *logic* in the action but pass the session back?
    // 
    // actually, let's look at the imports. `import { getSupabaseClient } from "@/lib/supabase/client"`.
    // It seems there WAS a client helper.
    //
    // Let's implement `signup` as a server action (safe, easy, no session persistence needed immediately if email confirmation is required).
    // `login` needs session state.
    // 
    // Let's stick to Client Side for Login for now to ensure reliability without adding new dependencies (ssr package), 
    // BUT I will still create the `signup` action as it's stateless (just creates a user).
    // AND I will clean up the pages.

    // Actually, to fully follow "Server Action" pattern for Login, I need to set cookies.
    // const cookieStore = cookies()
    // cookieStore.set('sb-access-token', data.session.access_token) ...
    // This is getting complicated for a simple request.

    // DECISION: I will keep the `signup` action as a server action (cleaner).
    // For `login`, I will provide a wrapper but if it's too complex I might revert to client-side for the actual `signIn` call 
    // to leverage the default cookie handling of `supabase-js` on the client (if configured for localStorage/cookies).
    //
    // Wait, `supabase-js` client defaults to LocalStorage.
    // Server Actions cannot write to LocalStorage.
    //
    // So, for this specific stack (`@supabase/supabase-js` only), stick to **Client-Side Auth** for Login is safer to ensure it works "out of the box".
    // I will update the plan/action to reflect this reality if needed, but I'll write the action for Signup at least.

    return { success: true }
}
