"use client"

import { useState } from "react"

export default function CodeBlock({ code, language = "css" }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative rounded-xl bg-[#0d1117] border border-white/10 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
        <span className="text-xs text-muted uppercase tracking-wider">{language}</span>
        <button
          type="button"
          onClick={copy}
          className="text-xs text-muted hover:text-white transition px-2 py-1 rounded"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm text-[#e6edf3] font-mono">
        <code>{code}</code>
      </pre>
    </div>
  )
}
