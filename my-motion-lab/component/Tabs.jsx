"use client"

import { useState } from "react"

export default function Tabs({ tabs, defaultTab = 0, onChange }) {
  const [active, setActive] = useState(defaultTab)

  const handleClick = (index) => {
    setActive(index)
    onChange?.(index, tabs[index])
  }

  return (
    <div className="w-full">
      <div className="flex gap-1 p-1 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 overflow-x-auto">
        {tabs.map((tab, index) => (
          <button
            key={typeof tab === "string" ? tab : tab.label ?? index}
            type="button"
            onClick={() => handleClick(index)}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition ${
              active === index
                ? "bg-primary text-white"
                : "text-gray-600 dark:text-muted hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/5"
            }`}
          >
            {typeof tab === "string" ? tab : tab.label}
          </button>
        ))}
      </div>
      {tabs[active]?.content != null && (
        <div className="mt-4">{tabs[active].content}</div>
      )}
    </div>
  )
}
