"use client"

import Link from "next/link"

export default function FeatureCard({ title, description, icon, href }) {
  return (
    <Link
      href={href}
      className="group p-6 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-primary/5 dark:hover:bg-primary/10 hover:border-primary/30 transition block shadow-sm dark:shadow-none"
      aria-label={title}
    >
      <span className="text-2xl text-primary mb-4 block">{icon}</span>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-muted text-base leading-relaxed">{description}</p>
    </Link>
  )
}
