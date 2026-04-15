"use client"

import { useEffect, useState } from "react"
import { VoiceInput } from "@/components/admin/voice-input"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"

interface Video {
  id: string
  title: string
  description: string | null
  vimeo_id: string | null
  youtube_id: string | null
  thumbnail: string | null
  duration: string | null
  level: string | null
  category: string
  topics: string[]
  benefits: string[]
  sort_order: number
}

const CATEGORIES = ["hero", "about", "success_story", "interview", "featured_class", "quick_practice", "course_preview", "course_detail"]
const CATEGORY_LABELS: Record<string, string> = {
  hero: "Hero", about: "About", success_story: "Success Stories", interview: "Interviews",
  featured_class: "Featured Classes", quick_practice: "Quick Practices", course_preview: "Course Previews", course_detail: "Course Details",
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Video | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState("all")

  async function load() {
    try {
      const res = await fetch("/api/admin/videos")
      if (res.ok) setVideos(await res.json())
    } catch (error) { console.error("Failed:", error) }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const filtered = filterCategory === "all" ? videos : videos.filter(v => v.category === filterCategory)

  function openNew() {
    setIsNew(true)
    setEditing({ id: "", title: "", description: "", vimeo_id: "", youtube_id: "", thumbnail: "", duration: "", level: "All Levels", category: "featured_class", topics: [], benefits: [], sort_order: 0 })
  }

  async function save() {
    if (!editing) return
    const method = isNew ? "POST" : "PUT"
    const url = isNew ? "/api/admin/videos" : `/api/admin/videos/${editing.id}`
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) })
    setEditing(null)
    setIsNew(false)
    load()
  }

  async function handleDelete() {
    if (!deleteId) return
    await fetch(`/api/admin/videos/${deleteId}`, { method: "DELETE" })
    setDeleteId(null)
    load()
  }

  if (loading) return <div className="animate-pulse space-y-4">{[1,2,3].map(i => <div key={i} className="h-20 bg-gray-200 rounded-lg" />)}</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Videos</h1>
          <p className="text-gray-500 text-sm mt-1">{videos.length} videos</p>
        </div>
        <button onClick={openNew} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium">
          Add Video
        </button>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        <button onClick={() => setFilterCategory("all")} className={`px-3 py-1.5 text-sm rounded-lg ${filterCategory === "all" ? "bg-purple-100 text-purple-700 font-medium" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
          All
        </button>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setFilterCategory(cat)} className={`px-3 py-1.5 text-sm rounded-lg ${filterCategory === cat ? "bg-purple-100 text-purple-700 font-medium" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((v) => (
          <div key={v.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
            <div className="w-20 h-14 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center overflow-hidden">
              {v.thumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={v.thumbnail} alt="" className="w-full h-full object-cover" />
              ) : (
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 truncate">{v.title}</h3>
              <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                <span className="px-2 py-0.5 bg-gray-100 rounded">{CATEGORY_LABELS[v.category] || v.category}</span>
                {v.duration && <span>{v.duration}</span>}
                {v.vimeo_id && <span>Vimeo</span>}
                {v.youtube_id && <span>YouTube</span>}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setIsNew(false); setEditing(v) }} className="px-3 py-1.5 text-sm text-purple-600 hover:bg-purple-50 rounded-lg">Edit</button>
              <button onClick={() => setDeleteId(v.id)} className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setEditing(null)} />
          <div className="relative bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-lg font-semibold mb-4">{isNew ? "Add Video" : "Edit Video"}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <div className="flex gap-2">
                  <input value={editing.title} onChange={e => setEditing({...editing, title: e.target.value})} className="flex-1 px-3 py-2 border rounded-lg text-sm" />
                  <VoiceInput onTranscript={t => setEditing({...editing, title: t})} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select value={editing.category} onChange={e => setEditing({...editing, category: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm">
                  {CATEGORIES.map(c => <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <div className="flex gap-2 items-start">
                  <textarea value={editing.description ?? ""} onChange={e => setEditing({...editing, description: e.target.value})} rows={3} className="flex-1 px-3 py-2 border rounded-lg text-sm" />
                  <VoiceInput onTranscript={t => setEditing({...editing, description: (editing.description ?? "") + " " + t})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vimeo ID</label>
                  <input value={editing.vimeo_id ?? ""} onChange={e => setEditing({...editing, vimeo_id: e.target.value || null})} placeholder="e.g. 1102922216" className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">YouTube ID</label>
                  <input value={editing.youtube_id ?? ""} onChange={e => setEditing({...editing, youtube_id: e.target.value || null})} placeholder="e.g. 6w7V1_bJcks" className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input value={editing.duration ?? ""} onChange={e => setEditing({...editing, duration: e.target.value})} placeholder="e.g. 15:30" className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                  <input value={editing.level ?? ""} onChange={e => setEditing({...editing, level: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail URL</label>
                <input value={editing.thumbnail ?? ""} onChange={e => setEditing({...editing, thumbnail: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
            </div>
            <div className="flex gap-3 justify-end mt-6">
              <button onClick={() => setEditing(null)} className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
              <button onClick={save} className="px-4 py-2 text-sm text-white bg-purple-600 rounded-lg hover:bg-purple-700">Save</button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog open={!!deleteId} title="Delete Video" message="Are you sure? This cannot be undone." onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
    </div>
  )
}
