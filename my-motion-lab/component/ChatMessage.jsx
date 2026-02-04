"use client"

export default function ChatMessage({ role, content, children }) {
  const isUser = role === "user"

  return (
    <div
      className={`flex gap-3 p-4 rounded-xl max-w-xs ${
        isUser ? "bg-primary/10 border border-primary/20" : "bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10"
      }`}
    >
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${
          isUser ? "bg-primary text-white" : "bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-muted"
        }`}
      >
        {isUser ? "U" : "AI"}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">{isUser ? "You" : "Assistant"}</p>
        {content && <p className="text-gray-600 dark:text-muted text-sm whitespace-pre-wrap">{content}</p>}
        {children}
      </div>
    </div>
  )
}
