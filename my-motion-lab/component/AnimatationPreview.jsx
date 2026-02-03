"use client"

import { motion } from "framer-motion"
import { useState } from "react"

export default function AnimationPreview() {
  const [animation, setAnimation] = useState("fade")

  return (
    <div className="flex justify-center px-6 pb-20">
      <div className="w-full max-w-5xl rounded-2xl bg-card border border-white/10 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Preview Area */}
          <div className="flex items-center justify-center min-h-[250px] rounded-xl bg-black/40">
            <motion.div
              key={animation}
              initial={
                animation === "fade"
                  ? { opacity: 0 }
                  : animation === "scale"
                  ? { scale: 0 }
                  : animation === "rotate"
                  ? { rotate: -180 }
                  : { x: -100 }
              }
              animate={{ opacity: 1, scale: 1, rotate: 0, x: 0 }}
              transition={{ duration: 0.6 }}
              className="w-20 h-20 rounded-lg bg-primary"
            />
          </div>

          {/* Controls */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-semibold text-lg">
              Choose Animation
            </h3>
            <div className="flex flex-wrap gap-3">
              {["fade", "scale", "rotate", "slide"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setAnimation(type)}
                  className={`px-4 py-2 rounded-lg capitalize ${
                    animation === type
                      ? "bg-primary text-white"
                      : "border border-white/20 text-white hover:bg-white/5"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
