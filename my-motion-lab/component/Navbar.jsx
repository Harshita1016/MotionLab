"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Sun, Moon, LogIn, UserPlus, LogOut } from "lucide-react"
import { useTheme } from "@/component/ThemeProvider"
import { getSupabaseClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

// Remove Demo from SECTIONS for clarity
const SECTIONS = [
  { id: "features", label: "Features" },
  { id: "ai-assistant", label: "AI Assistant" },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const isHome = pathname === "/"
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const supabase = getSupabaseClient()
    if (!supabase) return

    // Initial check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    // Listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    const supabase = getSupabaseClient()
    if (supabase) {
      await supabase.auth.signOut()
      setUser(null)
      router.refresh()
      // Force reload to update page content state
      window.location.reload()
    }
  }

  const scrollToSection = (e, id) => {
    if (isHome) {
      e.preventDefault()
      const el = document.getElementById(id)
      el?.scrollIntoView({ behavior: "smooth" })
      setMobileOpen(false)
    }
  }

  return (
    <div className="w-full px-4 sm:px-6 pt-4 pb-0 z-50 sticky top-0 pointer-events-none [&>*]:pointer-events-auto">
      <header className="w-full max-w-7xl mx-auto rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white/80 dark:bg-black/50 backdrop-blur-xl shadow-lg dark:shadow-black/20 py-1">
        <nav className="w-full px-6 py-3 flex items-center justify-between gap-4">
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
            }}
            className="text-xl font-semibold text-gray-900 dark:text-white hover:opacity-90 transition shrink-0"
            aria-label="MotionLab Home"
          >
            Motion<span className="text-primary">Lab</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
            {user && SECTIONS.map(({ id, label }) => (
              <Link
                key={id}
                href={isHome ? `#${id}` : `/#${id}`}
                onClick={(e) => scrollToSection(e, id)}
                className="text-base font-medium text-gray-700 dark:text-white hover:text-primary transition"
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-600 dark:text-muted hover:bg-black/5 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white transition"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-base font-medium text-gray-700 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 hover:text-red-400 transition"
              >
                <LogOut className="w-4 h-4" />
                Log out
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-base font-medium text-gray-700 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 hover:text-primary transition"
                >
                  <LogIn className="w-4 h-4" />
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-base font-medium text-gray-700 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 hover:text-primary transition"
                >
                  <UserPlus className="w-4 h-4" />
                  Sign up
                </Link>
              </>
            )}

          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 text-gray-900 dark:text-white rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>
      </header>
    </div>
  )
}
