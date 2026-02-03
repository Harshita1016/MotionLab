"use client"

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
        <div className="flex flex-col items-center text-center gap-8">
          {/* Badge */}
          <div className="px-4 py-1.5 rounded-full border border-gray-300 dark:border-white/20 text-sm text-gray-600 dark:text-muted bg-white/80 dark:bg-white/5">
            ✨ AI-Powered Animation Playground
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white max-w-4xl leading-tight">
            Create stunning animations with{" "}
            <span className="text-primary">AI-powered</span> motion tools
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-muted max-w-2xl">
            Design, preview, and export beautiful animations for your web
            projects using simple controls and AI assistance.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mt-6">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">10K+</p>
              <p className="text-sm text-gray-600 dark:text-muted">Animations Created</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">50+</p>
              <p className="text-sm text-gray-600 dark:text-muted">Animation Types</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary">AI</p>
              <p className="text-sm text-gray-600 dark:text-muted">Powered</p>
            </div>
          </div>

          {/* Buttons - scroll to sections on same page */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              type="button"
              onClick={() => scrollTo("demo")}
              className="px-8 py-4 rounded-xl bg-primary text-white font-medium hover:opacity-90 transition"
            >
              Try Demo
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
      </div>
    </section>
  )
}
