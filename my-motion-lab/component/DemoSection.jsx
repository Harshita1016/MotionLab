"use client"

import AnimationPreview from "@/component/AnimatationPreview"
import CodeBlock from "@/component/codeBlock"
import Tabs from "@/component/Tabs"

const sampleCode = `/* Framer Motion example */
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6 }}
  className="w-20 h-20 rounded-lg bg-primary"
/>`

export default function DemoSection() {
  return (
    <div className="rounded-2xl bg-white dark:bg-card border border-gray-200 dark:border-white/10 p-6 shadow-lg dark:shadow-none">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Animation Demo</h3>
      <p className="text-gray-600 dark:text-muted text-sm mb-6">
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
  )
}
