"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import CodeBlock from "@/component/codeBlock"


const animationTypes = ["fade", "scale", "rotate", "slide", "bounce"];

export default function AnimationPreview() {
  const [animation, setAnimation] = useState(animationTypes[0]);

  // Auto-cycle animations every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimation((prev) => {
        const idx = animationTypes.indexOf(prev);
        return animationTypes[(idx + 1) % animationTypes.length];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const sampleCode = `/* CSS Animation */
@keyframes ${animation} {
  from {
    opacity: ${animation === "fade" ? 0 : 1};
    transform: ${
      animation === "scale"
        ? "scale(0)"
        : animation === "rotate"
        ? "rotate(-180deg)"
        : animation === "slide"
        ? "translateX(-100px)"
        : animation === "bounce"
        ? "translateY(0)"
        : "none"
    };
  }
  50% {
    ${animation === "bounce" ? "transform: translateY(-40px);" : ""}
  }
  to {
    opacity: 1;
    transform: scale(1) rotate(0deg) translateX(0) ${animation === "bounce" ? "translateY(0)" : ""};
  }
}

.animate-${animation} {
  animation: ${animation} 0.6s ease-out forwards;
}`

  return (
    <div className="w-full max-w-5xl rounded-2xl bg-card border border-white/10 overflow-hidden">
      {/* Mac-style title bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-gray-800/50 border-b border-white/10">
        <h3 className="text-white font-semibold text-lg">
          Animation Preview
        </h3>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Preview Area */}
        <div className="flex items-center justify-center min-h-[200px] rounded-xl bg-black/40">
          <motion.div
            key={animation}
            initial={
              animation === "fade"
                ? { opacity: 0 }
                : animation === "scale"
                ? { scale: 0 }
                : animation === "rotate"
                ? { rotate: -180 }
                : animation === "slide"
                ? { x: -100 }
                : animation === "bounce"
                ? { y: 0 }
                : {}
            }
            animate={
              animation === "fade"
                ? { opacity: 1 }
                : animation === "scale"
                ? { scale: 1 }
                : animation === "rotate"
                ? { rotate: 0 }
                : animation === "slide"
                ? { x: 0 }
                : animation === "bounce"
                ? { y: [0, -40, 0] }
                : {}
            }
            transition={{ duration: 1 }}
            className="w-20 h-20 rounded-lg bg-primary"
          />
        </div>

        {/* Animation Controls */}
        <div className="flex flex-wrap gap-3 justify-center">
          {animationTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setAnimation(type)}
              className={`px-4 py-2 rounded-lg capitalize text-sm ${
                animation === type
                  ? "bg-primary text-white"
                  : "border border-white/20 text-white hover:bg-white/5"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Code */}
        <CodeBlock code={sampleCode} language="css" />
      </div>
    </div>
  )
}
