"use client"

import Navbar from "@/component/Navbar"
import Footer from "@/component/footer"
import { motion } from "framer-motion"

const highlightItems = [
  {
    title: "Design in minutes",
    description: "Craft stunning motion with our visual editor and smart timelines.",
  },
  {
    title: "AI-assisted motion",
    description: "Get suggestions, refinements, and code snippets instantly.",
  },
  {
    title: "Export with confidence",
    description: "Ship clean keyframes, CSS, and presets straight to production.",
  },
]

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-black dark:via-[#0f0f1a] dark:to-black flex flex-col">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 flex items-center justify-center py-16 px-6"
      >
        <div className="w-full max-w-5xl grid lg:grid-cols-[1.1fr_1fr] gap-10 items-stretch">
          <div className="hidden lg:flex flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-br from-primary/15 via-transparent to-transparent p-10 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_60%)] opacity-70" />
            <div className="relative z-10">
              <p className="text-sm uppercase tracking-[0.3em] text-white/70">MotionLab</p>
              <h2 className="text-3xl font-semibold mt-4">{title}</h2>
              <p className="text-white/70 mt-3">{subtitle}</p>
            </div>
            <div className="relative z-10 space-y-5">
              {highlightItems.map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                  <div>
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="text-xs text-white/65">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-[440px] rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-card px-8 py-10 shadow-lg dark:shadow-none flex flex-col">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 text-center">{title}</h1>
              <p className="text-gray-600 dark:text-muted text-sm mb-6 text-center">{subtitle}</p>
              {children}
            </div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  )
}
