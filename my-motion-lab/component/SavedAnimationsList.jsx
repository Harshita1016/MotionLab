"use client"

import { useEffect, useState } from "react"
import { getSavedAnimations } from "@/lib/db-client"
import CodeBlock from "@/component/codeBlock"
import { Copy, Check, Trash2, Clock } from "lucide-react"

export default function SavedAnimationsList() {
    const [animations, setAnimations] = useState([])
    const [loading, setLoading] = useState(true)
    const [copiedId, setCopiedId] = useState(null)

    useEffect(() => {
        const fetchAnims = async () => {
            const data = await getSavedAnimations()
            setAnimations(data)
            setLoading(false)
        }
        fetchAnims()
    }, [])

    const handleCopy = (code, id) => {
        navigator.clipboard.writeText(code)
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
    }

    if (loading) {
        return (
            <div className="py-12 text-center text-muted">
                Loading library...
            </div>
        )
    }

    if (animations.length === 0) {
        // Return nothing or a placeholder if empty
        return null
    }

    return (
        <section className="py-12">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Your Saved Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {animations.map((anim) => (
                        <div
                            key={anim.id}
                            className="group relative rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-6 hover:shadow-lg transition-all"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-semibold text-gray-900 dark:text-white truncate pr-4">
                                    {anim.title || "Untitled Animation"}
                                </h3>
                                <span className="text-xs text-muted flex items-center gap-1 bg-white/5 px-2 py-1 rounded">
                                    <Clock className="w-3 h-3" />
                                    {new Date(anim.created_at).toLocaleDateString()}
                                </span>
                            </div>

                            <div className="mb-4 h-32 overflow-hidden rounded-lg relative">
                                <div className="text-xs opacity-50 absolute inset-0 bg-black/50 pointer-events-none z-10" />
                                {/* Preview of code (truncated) */}
                                <CodeBlock code={anim.css_code} language="css" />
                            </div>

                            <div className="flex gap-2 mt-auto">
                                <button
                                    onClick={() => handleCopy(anim.css_code, anim.id)}
                                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition text-sm font-medium"
                                >
                                    {copiedId === anim.id ? (
                                        <>
                                            <Check className="w-4 h-4" /> Copied
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-4 h-4" /> Copy Code
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
