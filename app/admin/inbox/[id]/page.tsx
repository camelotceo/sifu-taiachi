"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { VoiceInput } from "@/components/admin/voice-input"

interface Submission {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: string
  reply_text: string | null
  replied_at: string | null
  created_at: string
}

export default function InboxDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [submission, setSubmission] = useState<Submission | null>(null)
  const [loading, setLoading] = useState(true)
  const [reply, setReply] = useState("")
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/admin/inbox/${params.id}`)
        if (res.ok) setSubmission(await res.json())
      } catch (error) { console.error("Failed:", error) }
      finally { setLoading(false) }
    }
    load()
  }, [params.id])

  async function sendReply() {
    if (!reply.trim()) return
    setSending(true)
    try {
      const res = await fetch(`/api/admin/inbox/${params.id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: reply }),
      })
      if (res.ok) {
        setSent(true)
        setSubmission(prev => prev ? { ...prev, status: "replied", reply_text: reply } : null)
      }
    } catch (error) { console.error("Failed:", error) }
    finally { setSending(false) }
  }

  async function updateStatus(status: string) {
    await fetch(`/api/admin/inbox/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
    setSubmission(prev => prev ? { ...prev, status } : null)
  }

  if (loading) return <div className="animate-pulse space-y-4"><div className="h-8 bg-gray-200 rounded w-48" /><div className="h-64 bg-gray-200 rounded-lg" /></div>
  if (!submission) return <div className="text-center py-12 text-gray-500">Message not found</div>

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.push("/admin/inbox")} className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-900">{submission.subject}</h1>
          <p className="text-sm text-gray-500 mt-1">
            From {submission.name} &lt;{submission.email}&gt; &middot; {new Date(submission.created_at).toLocaleString()}
          </p>
        </div>
        <div className="flex gap-2">
          {submission.status !== "archived" && (
            <button onClick={() => updateStatus("archived")} className="px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">Archive</button>
          )}
        </div>
      </div>

      {/* Message */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <p className="text-gray-800 whitespace-pre-wrap">{submission.message}</p>
      </div>

      {/* Previous reply */}
      {submission.reply_text && (
        <div className="bg-purple-50 rounded-xl border border-purple-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-medium text-purple-700">Your Reply</span>
            {submission.replied_at && <span className="text-xs text-purple-500">{new Date(submission.replied_at).toLocaleString()}</span>}
          </div>
          <p className="text-gray-800 whitespace-pre-wrap">{submission.reply_text}</p>
        </div>
      )}

      {/* Reply form */}
      {!sent && submission.status !== "replied" && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-medium text-gray-900 mb-3">Reply to {submission.name}</h3>
          <div className="flex gap-2 items-start mb-4">
            <textarea
              value={reply}
              onChange={e => setReply(e.target.value)}
              rows={5}
              placeholder="Type your reply..."
              className="flex-1 px-3 py-2 border rounded-lg text-sm"
            />
            <VoiceInput onTranscript={t => setReply(prev => prev + " " + t)} />
          </div>
          <button
            onClick={sendReply}
            disabled={sending || !reply.trim()}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium disabled:opacity-50"
          >
            {sending ? "Sending..." : "Send Reply"}
          </button>
        </div>
      )}

      {sent && (
        <div className="bg-green-50 rounded-xl border border-green-200 p-6 text-center">
          <p className="text-green-700 font-medium">Reply sent successfully!</p>
        </div>
      )}
    </div>
  )
}
