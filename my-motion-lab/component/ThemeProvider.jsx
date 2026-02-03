"use client"

import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext({ theme: "dark", setTheme: () => {} })

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}

export default function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const value = stored || (prefersDark ? "dark" : "light")
    setThemeState(value)
    document.documentElement.classList.toggle("dark", value === "dark")
  }, [])

  const setTheme = (value) => {
    setThemeState(value)
    localStorage.setItem("theme", value)
    document.documentElement.classList.toggle("dark", value === "dark")
  }

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark"
    setTheme(next)
  }

  if (!mounted) return <>{children}</>

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
