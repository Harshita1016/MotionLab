"use client"

import AnimationPreview from "@/component/AnimatationPreview"

export default function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Subtle gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row lg:items-stretch gap-8">
          {/* LEFT COLUMN */}
          <div className="flex-1 flex flex-col justify-center lg:pr-8">
            <div className="mb-4">
              <span className="px-4 py-2 rounded-full border border-gray-300 dark:border-white/20 text-base font-medium text-gray-700 dark:text-white bg-white/90 dark:bg-black/40 shadow-sm block w-fit">
                ✨ AI-Powered Animation Playground
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white max-w-4xl leading-tight mb-6 lg:mb-0 lg:mt-2">
              Create stunning animations with{" "}
              <span className="text-primary">AI-powered</span> motion tools
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-muted max-w-2xl mb-8 lg:mb-0">
              Design, preview, and export beautiful animations for your web
              projects using simple controls and AI assistance.
            </p>
            <div className="flex flex-wrap items-center gap-8 md:gap-12 mb-8 lg:mb-0 lg:justify-start">
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  10K+
                </p>
                <p className="text-sm text-gray-600 dark:text-muted">
                  Animations Created
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  50+
                </p>
                <p className="text-sm text-gray-600 dark:text-muted">
                  Animation Types
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-primary">
                  AI
                </p>
                <p className="text-sm text-gray-600 dark:text-muted">
                  Powered
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <button
                type="button"
                onClick={() => scrollTo("features")}
                className="px-8 py-4 rounded-xl bg-primary text-white font-medium hover:opacity-90 transition"
              >
                Try Features
              </button>
              <button
                type="button"
                onClick={() => scrollTo("ai-assistant")}
                className="px-8 py-4 rounded-xl border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition"
              >
                AI Assistant
              </button>
            </div>
          </div>
          {/* RIGHT COLUMN */}
          <div className="flex-shrink-0 w-full lg:w-[520px] flex items-center justify-center">
            <AnimationPreview />
          </div>
        </div>
      </div>
    </section>
  )
}
