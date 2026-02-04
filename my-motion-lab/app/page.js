"use client"

import { useEffect } from "react"
import Navbar from "@/component/Navbar"
import Footer from "@/component/footer"
import Hero from "@/component/Hero"
import FeatureCard from "@/component/featureCard"
import DemoSection from "@/component/DemoSection"
import AIAssistantSection from "@/component/AIAssistantSection"
import ScrollReveal from "@/component/ScrollReveal"
import Link from "next/link"

export default function Home() {
  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : ""
    if (hash) {
      const el = document.getElementById(hash)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100)
      }
    }
  }, [])

  const features = [
    {
      title: "Visual editor",
      description: "Design animations with an intuitive timeline and keyframes.",
      icon: "◇",
      href: "#demo",
    },
    {
      title: "AI Assistant",
      description: "Describe what you want and get code or motion suggestions.",
      icon: "◆",
      href: "#ai-assistant",
    },
    {
      title: "Export & share",
      description: "Export CSS, keyframes, or snippets for your project.",
      icon: "◎",
      href: "#demo",
    },
  ]

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-black dark:via-[#0f0f1a] dark:to-black text-text">
      <Navbar />

      <ScrollReveal>
        <Hero />
      </ScrollReveal>

      {/* Features */}
      <section id="features" className="scroll-mt-24 py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-4">
              What you can do
            </h2>
            <p className="text-gray-600 dark:text-muted text-center max-w-xl mx-auto mb-12">
              From idea to animation in minutes, with AI and a visual playground.
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((item, i) => (
              <ScrollReveal
                key={item.title}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <FeatureCard {...item} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* AI Assistant */}
      <section id="ai-assistant" className="scroll-mt-24 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <AIAssistantSection />
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <ScrollReveal
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to animate?
            </h2>
            <p className="text-gray-600 dark:text-muted mb-8">
              Try the demo above or sign in to save and share your work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#demo"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })
                }}
                className="px-8 py-4 rounded-xl bg-primary text-white font-medium hover:opacity-90 transition"
              >
                Try Demo
              </a>
              <Link
                href="/signup"
                className="px-8 py-4 rounded-xl border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </main>
  )
}
