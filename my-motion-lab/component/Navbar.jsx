"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Sun, Moon, LogIn } from "lucide-react"
import { useTheme } from "@/component/ThemeProvider"

const SECTIONS = [
  { id: "features", label: "Features" },
  { id: "demo", label: "Demo" },
  { id: "ai-assistant", label: "AI Assistant" },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const isHome = pathname === "/"

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
        {/* Logo - always goes to home */}
        <Link
          href="/"
          className="text-xl font-semibold text-gray-900 dark:text-white hover:opacity-90 transition shrink-0"
        >
          Motion<span className="text-primary">Lab</span>
        </Link>

        {/* Center: Features, Demo, AI Assistant */}
        <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
          {SECTIONS.map(({ id, label }) => (
            <Link
              key={id}
              href={isHome ? `#${id}` : `/#${id}`}
              onClick={(e) => scrollToSection(e, id)}
              className="text-sm text-gray-600 dark:text-muted hover:text-gray-900 dark:hover:text-white transition"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right: theme + Sign In */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-600 dark:text-muted hover:bg-black/5 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white transition"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <Link
            href="/signin"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-muted hover:bg-black/5 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white transition"
          >
            <LogIn className="w-4 h-4" />
            Sign In
          </Link>
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

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden rounded-b-2xl border-t border-gray-200 dark:border-white/10 bg-white/95 dark:bg-black/90 backdrop-blur-xl px-6 py-4 flex flex-col gap-4">
          {SECTIONS.map(({ id, label }) => (
            <Link
              key={id}
              href={isHome ? `#${id}` : `/#${id}`}
              onClick={(e) => scrollToSection(e, id)}
              className="text-gray-600 dark:text-muted hover:text-gray-900 dark:hover:text-white transition py-2"
            >
              {label}
            </Link>
          ))}
          <div className="flex items-center gap-2 pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={() => {
                toggleTheme()
                setMobileOpen(false)
              }}
              className="p-2 rounded-lg text-gray-600 dark:text-muted hover:bg-black/5 dark:hover:bg-white/10"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Link
              href="/signin"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-white/20 text-sm font-medium dark:border-white/20"
              onClick={() => setMobileOpen(false)}
            >
              <LogIn className="w-4 h-4" /> Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
    </div>
  )
}
