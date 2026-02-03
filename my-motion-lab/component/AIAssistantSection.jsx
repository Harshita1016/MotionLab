"use client"

import { useState } from "react"
import ChatMessage from "@/component/ChatMessage"
import CodeBlock from "@/component/codeBlock"
import Tabs from "@/component/Tabs"

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
    setMessages((prev) => [...prev, { role: "user", content: input.trim() }])
    setMessages((prev) => [
      ...prev,
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
        <ChatMessage
          key={i}
          role={msg.role === "user" ? "user" : "assistant"}
          content={msg.content}
        >
          {msg.code && (
            <div className="mt-3">
              <CodeBlock code={msg.code} language="css" />
            </div>
          )}
        </ChatMessage>
      ))}
      <form onSubmit={handleSubmit} className="pt-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask for an animation..."
            className="flex-1 px-4 py-3 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-muted focus:outline-none focus:border-primary"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-primary text-white font-medium hover:opacity-90 transition"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )

  const examplesPanel = (
    <div className="rounded-2xl bg-card border border-white/10 p-6">
      <p className="text-gray-600 dark:text-muted text-sm mb-4">Try these prompts:</p>
      <ul className="space-y-2">
        {examplePrompts.map((prompt, i) => (
          <li
            key={i}
            className="text-gray-900 dark:text-white text-sm px-3 py-2 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10"
          >
            {prompt}
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="rounded-2xl bg-white dark:bg-card border border-gray-200 dark:border-white/10 p-6 shadow-lg dark:shadow-none">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">AI Assistant</h3>
      <p className="text-gray-600 dark:text-muted text-sm mb-6">
        Ask for animation code, keyframes, or motion ideas.
      </p>
      <Tabs
        tabs={[
          { label: "Chat", content: chatPanel },
          { label: "Examples", content: examplesPanel },
        ]}
      />
    </div>
  )
}
