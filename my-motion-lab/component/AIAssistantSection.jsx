"use client"

import ChatMessage from "@/component/ChatMessage"
import CodeBlock from "@/component/codeBlock"
import Tabs from "@/component/Tabs"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { fetchGeminiResponse } from "@/lib/geminiClient"
import { getChatHistory, saveChatMessage, saveAnimation } from "@/lib/db-client"
import { Sparkles, Zap, BookOpen, MousePointer, Save } from "lucide-react"

// ... (existing example constants remain unchanged) ...

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

  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  // Load History on Mount
  useEffect(() => {
    const loadHistory = async () => {
      const history = await getChatHistory();
      if (history && history.length > 0) {
        // Map DB format to UI format
        const formattedHistory = history.map(msg => ({
          role: msg.role,
          content: msg.content,
          code: msg.code_snippet // Ensure DB field name matches
        }));
        setMessages(formattedHistory);
      }
    }
    loadHistory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userContent = input.trim();
    const userMsg = { role: "user", content: userContent };

    // Optimistic UI update
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Save User Message to DB
    saveChatMessage("user", userContent);

    try {
      const aiText = await fetchGeminiResponse(userContent);
      // Try to extract code block if present
      const codeMatch = aiText.match(/```(?:css)?([\s\S]*?)```/);

      const aiMsg = codeMatch
        ? { role: "assistant", content: aiText.replace(/```(?:css)?([\s\S]*?)```/, "").trim(), code: codeMatch[1].trim() }
        : { role: "assistant", content: aiText };

      setMessages((prev) => [...prev, aiMsg]);

      // Save Assistant Message to DB
      saveChatMessage("assistant", aiMsg.content, aiMsg.code || null);

    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I couldn't fetch a response from Gemini API." },
      ]);
    }
    setLoading(false);
  };

  const handleSaveAnimation = async (code) => {
    const title = `Animation ${new Date().toLocaleString()}`;
    const result = await saveAnimation(title, code);
    if (result.success) {
      alert("Animation saved to your library!");
    } else {
      alert("Failed to save: " + result.error);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const chatPanel = (
    <div className="rounded-2xl bg-card border-2 border-primary/30 p-4 flex flex-col h-[400px] max-h-[60vh] shadow-xl shadow-primary/5">
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide"
        style={{ minHeight: 0 }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[85%] ${msg.role === "user" ? "" : "w-full"}`}>
              {msg.role === "user" ? (
                <ChatMessage role={msg.role} content={msg.content} />
              ) : (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-4 text-gray-200 leading-relaxed">
                      {msg.content}
                    </div>
                    {msg.code && (
                      <div className="mt-2 relative group">
                        <CodeBlock code={msg.code} language="css" />
                        <button
                          onClick={() => handleSaveAnimation(msg.code)}
                          className="absolute top-2 right-2 p-2 rounded-lg bg-white/10 hover:bg-primary text-white transition opacity-0 group-hover:opacity-100 flex items-center gap-2 text-xs"
                          title="Save to Library"
                        >
                          <Save className="w-3 h-3" />
                          Save
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-4 text-gray-400 italic">
                Thinking...
              </div>
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="pt-4 mt-2 border-t border-white/10">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask for an animation..."
            className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            aria-label="Type your animation request"
            disabled={loading}
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-primary text-white font-medium hover:opacity-90 transition shadow-lg shadow-primary/20"
            aria-label="Send message"
            disabled={loading}
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );

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
