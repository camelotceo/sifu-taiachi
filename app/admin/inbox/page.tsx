"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

interface Submission {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: string
  created_at: string
}

interface InboxData {
  submissions: Submission[]
  stats: Record<string, number>
}

const STATUS_COLORS: Record<string, string> = {
  unread: "bg-red-100 text-red-700",
  read: "bg-blue-100 text-blue-700",
  replied: "bg-green-100 text-green-700",
  archived: "bg-gray-100 text-gray-600",
}

export default function InboxPage() {
  const [data, setData] = useState<InboxData | null>(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>("all")

  async function load() {
    try {
      const params = filter !== "all" ? `?status=${filter}` : ""
      const res = await fetch(`/api/admin/inbox${params}`)
      if (res.ok) setData(await res.json())
    } catch (error) { console.error("Failed:", error) }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [filter]) // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <div className="animate-pulse space-y-4">{[1,2,3].map(i => <div key={i} className="h-20 bg-gray-200 rounded-lg" />)}</div>

  const total = Object.values(data?.stats ?? {}).reduce((a, b) => a + b, 0)

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Inbox</h1>
        <p className="text-gray-500 text-sm mt-1">{total} messages</p>
      </div>

      {/* Status filters */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {[
          { key: "all", label: "All", count: total },
          { key: "unread", label: "Unread", count: data?.stats.unread ?? 0 },
          { key: "read", label: "Read", count: data?.stats.read ?? 0 },
          { key: "replied", label: "Replied", count: data?.stats.replied ?? 0 },
          { key: "archived", label: "Archived", count: data?.stats.archived ?? 0 },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 text-sm rounded-lg ${filter === f.key ? "bg-purple-100 text-purple-700 font-medium" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
          >
            {f.label} ({f.count})
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {(data?.submissions ?? []).map((s) => (
          <Link key={s.id} href={`/admin/inbox/${s.id}`} className="block bg-white rounded-xl border border-gray-200 p-5 hover:border-purple-300 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${STATUS_COLORS[s.status]}`}>{s.status}</span>
                  <span className="text-xs text-gray-400">{new Date(s.created_at).toLocaleDateString()}</span>
                </div>
                <h3 className={`font-medium ${s.status === "unread" ? "text-gray-900" : "text-gray-700"}`}>{s.subject}</h3>
                <p className="text-sm text-gray-500 mt-1">{s.name} &lt;{s.email}&gt;</p>
                <p className="text-sm text-gray-600 mt-1 line-clamp-1">{s.message}</p>
              </div>
              <svg className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}

        {(data?.submissions ?? []).length === 0 && (
          <div className="text-center py-12 text-gray-500">No messages found</div>
        )}
      </div>
    </div>
  )
}
