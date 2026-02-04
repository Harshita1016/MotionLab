"use client"

import { useEffect, useState } from "react"
import { getSupabaseClient } from "@/lib/supabase/client"
import Navbar from "@/component/Navbar"
import Footer from "@/component/footer"
import Hero from "@/component/Hero"
import FeatureCard from "@/component/featureCard"
import DemoSection from "@/component/DemoSection"
import AIAssistantSection from "@/component/AIAssistantSection"
import ScrollReveal from "@/component/ScrollReveal"
import Link from "next/link"

import SavedAnimationsList from "@/component/SavedAnimationsList"

export default function Home() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Scroll handling
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : ""
    if (hash) {
      const el = document.getElementById(hash)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100)
      }
    }

    const setupAuth = async () => {
      const supabase = getSupabaseClient()
      if (!supabase) {
        setLoading(false)
        return
      }

      // 1. Get initial session
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)

      // 2. Listen for changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      })

      return subscription
    }

    let authSubscription = null
    setupAuth().then(sub => authSubscription = sub)

    return () => {
      authSubscription?.unsubscribe()
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

      {!loading && !user && (
        <section className="py-24 text-center">
          <div className="max-w-3xl mx-auto px-6">
            <ScrollReveal>
              <div className="p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Ready to create amazing animations?
                </h2>
                <p className="text-gray-600 dark:text-muted mb-8 text-lg">
                  Log in to access the AI Motion Assistant, Visual Editor, and save your work.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/signup"
                    className="px-8 py-4 rounded-xl bg-primary text-white font-medium hover:opacity-90 transition"
                  >
                    Get Started
                  </Link>
                  <a
                    href="https://www.framer.com/motion/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 rounded-xl border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition"
                  >
                    View Documentation
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {user && (
        <>
          {/* Features */}
          <section id="features" className="scroll-mt-24 py-16 md:py-24 relative">
            <div className="max-w-7xl mx-auto px-6">
              <ScrollReveal>
                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary mb-8 text-center animate-fade-in-up">
                  Welcome back, {user?.email?.split('@')[0]}!
                </h1>
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

          {/* Saved Animations */}
          <div id="saved-projects" className="scroll-mt-24">
            <ScrollReveal>
              <SavedAnimationsList />
            </ScrollReveal>
          </div>


        </>
      )}

      <Footer />
    </main>
  )
}
