"use client"

import { motion } from "framer-motion"
import { useState } from "react"

const types = ["fadeIn", "scale", "rotate", "slide", "bounce"]

export default function AnimationPreviewCompact() {
  const [animation, setAnimation] = useState("fadeIn")

  const initialMap = {
    fadeIn: { opacity: 0, y: 12 },
    scale: { opacity: 1, scale: 0 },
    rotate: { opacity: 1, rotate: -180 },
    slide: { opacity: 1, x: -80 },
    bounce: { opacity: 1, y: -40 },
  }

  const animateMap = {
    fadeIn: { opacity: 1, y: 0 },
    scale: { opacity: 1, scale: 1 },
    rotate: { opacity: 1, rotate: 0 },
    slide: { opacity: 1, x: 0 },
    bounce: { opacity: 1, y: 0 },
  }

  const transitionMap = {
    fadeIn: { duration: 0.5 },
    scale: { duration: 0.5 },
    rotate: { duration: 0.5 },
    slide: { duration: 0.5 },
    bounce: { type: "spring", stiffness: 400, damping: 12 },
  }

  return (
    <div className="rounded-2xl bg-card border border-white/10 p-4 w-full max-w-sm shrink-0">
      <p className="text-muted text-xs mb-3 font-medium uppercase tracking-wider">Preview</p>
      <div className="flex items-center justify-center min-h-[120px] rounded-xl bg-black/40 mb-4">
        <motion.div
          key={animation}
          initial={initialMap[animation]}
          animate={animateMap[animation]}
          transition={transitionMap[animation]}
          className="w-14 h-14 rounded-lg bg-primary"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {types.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setAnimation(type)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition ${
              animation === type
                ? "bg-primary text-white"
                : "border border-white/20 text-muted hover:text-white hover:bg-white/5"
            }`}
          >
            {type === "fadeIn" ? "Fade In" : type}
          </button>
        ))}
      </div>
    </div>
  )
}
