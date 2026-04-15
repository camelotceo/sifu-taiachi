"use client"

import { useEffect, useState } from "react"
import { VoiceInput } from "@/components/admin/voice-input"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  sort_order: number
}

const CATEGORIES = ["general", "courses", "practice", "billing", "technical"]

export default function FAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<FAQ | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>("all")

  async function load() {
    try {
      const res = await fetch("/api/admin/faqs")
      if (res.ok) setFaqs(await res.json())
    } catch (error) {
      console.error("Failed to load:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const filtered = filterCategory === "all" ? faqs : faqs.filter(f => f.category === filterCategory)

  function openNew() {
    setIsNew(true)
    setEditing({ id: "", question: "", answer: "", category: "general", sort_order: 0 })
  }

  async function save() {
    if (!editing) return
    try {
      if (isNew) {
        await fetch("/api/admin/faqs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editing),
        })
      } else {
        await fetch(`/api/admin/faqs/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editing),
        })
      }
      setEditing(null)
      setIsNew(false)
      load()
    } catch (error) {
      console.error("Save failed:", error)
    }
  }

  async function handleDelete() {
    if (!deleteId) return
    await fetch(`/api/admin/faqs/${deleteId}`, { method: "DELETE" })
    setDeleteId(null)
    load()
  }

  if (loading) return <div className="animate-pulse space-y-4">{[1,2,3].map(i => <div key={i} className="h-16 bg-gray-200 rounded-lg" />)}</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">FAQs</h1>
          <p className="text-gray-500 text-sm mt-1">{faqs.length} questions</p>
        </div>
        <button onClick={openNew} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium">
          Add FAQ
        </button>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {["all", ...CATEGORIES].map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 text-sm rounded-lg capitalize ${filterCategory === cat ? "bg-purple-100 text-purple-700 font-medium" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((f) => (
          <div key={f.id} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2 py-0.5 bg-gray-100 rounded capitalize">{f.category}</span>
                </div>
                <h3 className="font-medium text-gray-900">{f.question}</h3>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">{f.answer}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <button onClick={() => { setIsNew(false); setEditing(f) }} className="px-3 py-1.5 text-sm text-purple-600 hover:bg-purple-50 rounded-lg">Edit</button>
                <button onClick={() => setDeleteId(f.id)} className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setEditing(null)} />
          <div className="relative bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
            <h2 className="text-lg font-semibold mb-4">{isNew ? "Add FAQ" : "Edit FAQ"}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select value={editing.category} onChange={e => setEditing({...editing, category: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm">
                  {CATEGORIES.map(c => <option key={c} value={c} className="capitalize">{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                <div className="flex gap-2">
                  <input value={editing.question} onChange={e => setEditing({...editing, question: e.target.value})} className="flex-1 px-3 py-2 border rounded-lg text-sm" />
                  <VoiceInput onTranscript={t => setEditing({...editing, question: t})} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                <div className="flex gap-2 items-start">
                  <textarea value={editing.answer} onChange={e => setEditing({...editing, answer: e.target.value})} rows={5} className="flex-1 px-3 py-2 border rounded-lg text-sm" />
                  <VoiceInput onTranscript={t => setEditing({...editing, answer: editing.answer + " " + t})} />
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-end mt-6">
              <button onClick={() => setEditing(null)} className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
              <button onClick={save} className="px-4 py-2 text-sm text-white bg-purple-600 rounded-lg hover:bg-purple-700">Save</button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog open={!!deleteId} title="Delete FAQ" message="Are you sure? This cannot be undone." onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
    </div>
  )
}
