"use client"

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-white/10 py-12 mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            Motion<span className="text-primary">Lab</span>
          </div>
          <div className="flex gap-8 text-sm text-gray-600 dark:text-muted">
            <Link href="/" className="hover:text-gray-900 dark:hover:text-white transition">Home</Link>
            <Link href="/#demo" className="hover:text-gray-900 dark:hover:text-white transition">Demo</Link>
            <Link href="/#ai-assistant" className="hover:text-gray-900 dark:hover:text-white transition">AI Assistant</Link>
            <Link href="/login" className="hover:text-gray-900 dark:hover:text-white transition">Login</Link>
            <Link href="/signin" className="hover:text-gray-900 dark:hover:text-white transition">Sign In</Link>
          </div>
        </div>
        <p className="text-center md:text-left text-sm text-gray-600 dark:text-muted mt-8">
          © {new Date().getFullYear()} MotionLab. AI-powered animation tools.
        </p>
      </div>
    </footer>
  )
}
