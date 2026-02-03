"use client"

import { supabase } from "@/lib/supabase/client"
import Navbar from "@/component/Navbar"
import Footer from "@/component/footer"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff } from "lucide-react"

export default function SignInPage() {
  const router = useRouter()
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
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${typeof window !== "undefined" ? window.location.origin : ""}/dashboard` },
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
    <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-black dark:via-[#0f0f1a] dark:to-black flex flex-col">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 flex items-center justify-center py-16 px-6"
      >
        <form
          onSubmit={handleSignUp}
          className="w-full max-w-[440px] rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-card px-8 py-10 shadow-lg dark:shadow-none flex flex-col"
        >
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 text-center">
            Create account
          </h1>
          <p className="text-gray-600 dark:text-muted text-sm mb-6 text-center">
            Sign up to save your animations and access your dashboard.
          </p>

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
      </motion.div>
      <Footer />
    </div>
  )
}
