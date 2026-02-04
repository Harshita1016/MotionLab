"use client"

import ChatMessage from "@/component/ChatMessage"
import CodeBlock from "@/component/codeBlock"
import Tabs from "@/component/Tabs"
import Link from "next/link"
import { useState } from "react"
import { Sparkles, Zap, BookOpen, MousePointer } from "lucide-react"

const exampleResponse = `@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}`

const examplePrompts = [
  "Give me a CSS fade-in animation",
  "Create a bounce keyframe",
  "Fade in from bottom with stagger",
]

export default function AIAssistantSection() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I can help you with animation code and motion suggestions. Try asking for a fade-in effect or keyframes.",
    },
  ])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    setMessages((prev) => [
      ...prev,
      { role: "user", content: input.trim() },
      {
        role: "assistant",
        content: "Here's a simple CSS fade-in you can use:",
        code: exampleResponse,
      },
    ])
    setInput("")
  }

  const chatPanel = (
    <div className="space-y-4">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <ChatMessage role={msg.role} content={msg.content}>
            {msg.code && (
              <div className="mt-3">
                <CodeBlock code={msg.code} language="css" />
              </div>
            )}
          </ChatMessage>
        </div>
      ))}

      <form onSubmit={handleSubmit} className="pt-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask for an animation..."
            className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-muted focus:outline-none focus:border-primary shadow-sm"
            aria-label="Type your animation request"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-primary text-white font-medium hover:opacity-90 transition shadow-sm"
            aria-label="Send message"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )

  const examplesPanel = (
    <div className="rounded-2xl bg-card border border-white/10 p-6">
      <p className="text-muted text-sm mb-4">Try these prompts:</p>
      <ul className="space-y-2">
        {examplePrompts.map((prompt, i) => (
          <li
            key={i}
            className="text-white text-sm px-3 py-2 rounded-lg bg-white/5 border border-white/10"
          >
            {prompt}
          </li>
        ))}
      </ul>
    </div>
  )

  const aiFeatures = [
    { icon: Sparkles, text: "Describe animations in natural language" },
    { icon: Zap, text: "Get instant parameter suggestions" },
    { icon: BookOpen, text: "Learn motion design best practices" },
    { icon: MousePointer, text: "Apply AI suggestions with one click" },
  ]

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Heading */}
      <div className="flex flex-col lg:flex-row lg:items-start gap-8 mb-12">
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            AI Assistant
          </h1>
          <p className="text-muted text-lg">
            Ask for animation code, keyframes, or motion ideas.
          </p>
        </div>
      </div>

      {/* AI Motion Assistance Section */}
      <section className="mt-16">
        {/* Why AI */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 flex flex-col justify-center mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">
            Why use AI for motion?
          </h3>
          <p className="text-muted text-sm leading-relaxed mb-4">
            Describe animations in natural language and get production-ready
            keyframes and parameters. No guesswork—our AI suggests easing,
            duration, and transforms that match your intent.
          </p>
          <p className="text-muted text-sm leading-relaxed">
            Perfect for designers and developers who want to ship polished
            animations without memorizing every CSS or Framer Motion option.
          </p>
        </div>

        {/* Chat + Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div id="chat">
            <Tabs
              tabs={[
                { label: "Chat", content: chatPanel },
                { label: "Examples", content: examplesPanel },
              ]}
            />
          </div>

          <div className="rounded-2xl bg-card border border-white/10 p-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              Meet your Motion Assistant
            </h2>
            <p className="text-muted mb-6">
              Simply describe the animation you want in plain English. Our AI
              understands motion design and generates the perfect animation
              parameters for you.
            </p>

            <ul className="space-y-4 mb-8">
              {aiFeatures.map(({ icon: Icon, text }, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-white/90 text-sm"
                >
                  <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>

            <Link
              href="#chat"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-medium hover:opacity-90 transition"
            >
              <Sparkles className="w-4 h-4" />
              Try your AI Assistance
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-16">
        <div className="rounded-3xl bg-gradient-to-br from-primary/20 via-card to-primary/10 border border-white/10 p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to create amazing animations?
          </h2>
          <p className="text-muted mb-8 max-w-xl mx-auto">
            Start for free and build smooth, accessible motion in minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="px-8 py-4 rounded-xl bg-primary text-white font-medium hover:opacity-90 transition"
            >
              Get started for free
            </Link>
            <Link
              href="/demo"
              className="px-8 py-4 rounded-xl border border-white/20 text-white font-medium hover:bg-white/5 transition"
            >
              View documentation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
