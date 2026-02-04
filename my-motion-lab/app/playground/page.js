"use client"

import Navbar from "@/component/Navbar"
import Footer from "@/component/footer"
import AnimationPreview from "@/component/AnimatationPreview"
import Tabs from "@/component/Tabs"
import CodeBlock from "@/component/codeBlock"
const sampleCode = `/* Framer Motion example */
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6 }}
  className="w-20 h-20 rounded-lg bg-primary"
/>`

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-[#0f0f1a] to-black text-text">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-white mb-2">Animation Demo</h1>
        <p className="text-muted mb-8">
          Try different animation types and see the code.
        </p>

        <Tabs
          tabs={[
            { label: "Preview", content: <AnimationPreview /> },
            {
              label: "Code",
              content: (
                <div className="rounded-2xl bg-card border border-white/10 p-6">
                  <CodeBlock code={sampleCode} language="jsx" />
                </div>
              ),
            },
          ]}
        />
      </div>
      <Footer />
    </main>
  )
}
