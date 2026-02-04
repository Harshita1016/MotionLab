import Navbar from "@/component/Navbar"
import Footer from "@/component/footer"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-[#0f0f1a] to-black text-text">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-muted mb-8">Welcome back. Manage your animations and projects.</p>
        <div className="grid md:grid-cols-2 gap-6">
          <Link
            href="/demo"
            className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/30 transition"
          >
            <h2 className="text-lg font-semibold text-white mb-2">Animation Demo</h2>
            <p className="text-muted text-sm">Open the visual editor and try animations.</p>
          </Link>
          <Link
            href="/assistant"
            className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/30 transition"
          >
            <h2 className="text-lg font-semibold text-white mb-2">AI Assistant</h2>
            <p className="text-muted text-sm">Get code and motion suggestions from AI.</p>
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  )
}
