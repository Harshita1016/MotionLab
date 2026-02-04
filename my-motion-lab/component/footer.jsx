"use client"

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-white/10 py-12 mt-24 bg-white/80 dark:bg-black/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            Motion<span className="text-primary">Lab</span>
          </div>
          <div className="flex gap-8 text-base font-medium text-gray-700 dark:text-white">
            <Link href="/" className="hover:text-primary transition">Home</Link>
            <Link href="/#features" className="hover:text-primary transition">Features</Link>
            <Link href="/#ai-assistant" className="hover:text-primary transition">AI Assistant</Link>
            <Link href="/login" className="hover:text-primary transition">Login</Link>
            <Link href="/signin" className="hover:text-primary transition">Sign Up</Link>
          </div>
        </div>
        <p className="text-center md:text-left text-sm text-gray-600 dark:text-muted mt-8">
          © {new Date().getFullYear()} MotionLab. AI-powered animation tools.
        </p>
      </div>
    </footer>
  )
}
