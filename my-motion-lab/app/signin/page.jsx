"use client"

import AuthLayout from "@/component/AuthLayout"
import { getSupabaseClient } from "@/lib/supabase/client"
import Link from "next/link"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  const handleSignUp = async (e) => {
    e.preventDefault()
    setMessage(null)
    const email = e.target.email.value.trim()
    const password = e.target.password.value
    const confirmPassword = e.target.confirmPassword?.value

    if (password !== confirmPassword) {
      setMessage("Passwords do not match")
      setIsError(true)
      return
    }
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters")
      setIsError(true)
      return
    }

    setLoading(true)

    const supabase = getSupabaseClient()
    if (!supabase) {
      setMessage("Supabase env vars missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.")
      setIsError(true)
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${typeof window !== "undefined" ? window.location.origin : ""}/features` },
    })

    if (error) {
      setMessage(error.message)
      setIsError(true)
      setLoading(false)
    } else {
      setMessage("Check your email to confirm your account, then log in.")
      setIsError(false)
      setLoading(false)
      // Optional: redirect to login after short delay
      // setTimeout(() => router.push("/login"), 3000)
    }
  }

  return (
    <AuthLayout title="Create account" subtitle="Sign up to save your animations and access your features.">
      <form onSubmit={handleSignUp} className="flex flex-col">
        {message && (
          <div
            className={`w-full mb-4 px-4 py-3 rounded-xl text-sm ${
              isError
                ? "bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400"
                : "bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400"
            }`}
          >
            {message}
          </div>
        )}

        <div className="w-full mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-muted text-sm outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div className="w-full mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              placeholder="At least 6 characters"
              className="w-full px-4 py-3 pr-10 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-muted text-sm outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-muted hover:text-gray-700 dark:hover:text-white transition"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="w-full mb-6">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Confirm password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              required
              minLength={6}
              placeholder="Repeat your password"
              className="w-full px-4 py-3 pr-10 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-muted text-sm outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-muted hover:text-gray-700 dark:hover:text-white transition"
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:opacity-90 transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Creating account…
            </>
          ) : (
            "Sign up"
          )}
        </button>

        <p className="text-center text-sm text-gray-600 dark:text-muted mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-medium hover:underline">
            Log in
          </Link>
        </p>
        <Link href="/" className="text-center text-sm text-gray-500 dark:text-muted hover:text-gray-700 dark:hover:text-white transition mt-2">
          ← Back to home
        </Link>
      </form>
    </AuthLayout>
  )
}
