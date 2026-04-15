"use client"

import { useEffect, useState } from "react"
import { VoiceInput } from "@/components/admin/voice-input"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"

interface Course {
  id: string
  title: string
  subtitle: string | null
  description: string | null
  price: number | null
  original_price: number | null
  image: string | null
  duration: string | null
  lessons: number | null
  students: number
  rating: number | null
  level: string
  highlights: string[]
  benefits: string[]
  video_id: string | null
  eventbrite_url: string | null
  sort_order: number
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Course | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  async function load() {
    try {
      const res = await fetch("/api/admin/courses")
      if (res.ok) setCourses(await res.json())
    } catch (error) { console.error("Failed:", error) }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  function openNew() {
    setIsNew(true)
    setEditing({ id: "", title: "", subtitle: "", description: "", price: null, original_price: null, image: null, duration: "", lessons: null, students: 0, rating: null, level: "All Levels", highlights: [], benefits: [], video_id: null, eventbrite_url: null, sort_order: 0 })
  }

  async function save() {
    if (!editing) return
    const method = isNew ? "POST" : "PUT"
    const url = isNew ? "/api/admin/courses" : `/api/admin/courses/${editing.id}`
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) })
    setEditing(null)
    setIsNew(false)
    load()
  }

  async function handleDelete() {
    if (!deleteId) return
    await fetch(`/api/admin/courses/${deleteId}`, { method: "DELETE" })
    setDeleteId(null)
    load()
  }

  if (loading) return <div className="animate-pulse space-y-4">{[1,2].map(i => <div key={i} className="h-24 bg-gray-200 rounded-lg" />)}</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
          <p className="text-gray-500 text-sm mt-1">{courses.length} courses</p>
        </div>
        <button onClick={openNew} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium">
          Add Course
        </button>
      </div>

      <div className="space-y-3">
        {courses.map((c) => (
          <div key={c.id} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{c.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{c.subtitle}</p>
                <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                  {c.price && <span className="font-medium">${c.price}</span>}
                  {c.original_price && <span className="line-through text-gray-400">${c.original_price}</span>}
                  {c.lessons && <span>{c.lessons} lessons</span>}
                  {c.duration && <span>{c.duration}</span>}
                  <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">{c.level}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setIsNew(false); setEditing(c) }} className="px-3 py-1.5 text-sm text-purple-600 hover:bg-purple-50 rounded-lg">Edit</button>
                <button onClick={() => setDeleteId(c.id)} className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setEditing(null)} />
          <div className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-lg font-semibold mb-4">{isNew ? "Add Course" : "Edit Course"}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <div className="flex gap-2">
                  <input value={editing.title} onChange={e => setEditing({...editing, title: e.target.value})} className="flex-1 px-3 py-2 border rounded-lg text-sm" />
                  <VoiceInput onTranscript={t => setEditing({...editing, title: t})} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                <div className="flex gap-2">
                  <input value={editing.subtitle ?? ""} onChange={e => setEditing({...editing, subtitle: e.target.value})} className="flex-1 px-3 py-2 border rounded-lg text-sm" />
                  <VoiceInput onTranscript={t => setEditing({...editing, subtitle: t})} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <div className="flex gap-2 items-start">
                  <textarea value={editing.description ?? ""} onChange={e => setEditing({...editing, description: e.target.value})} rows={4} className="flex-1 px-3 py-2 border rounded-lg text-sm" />
                  <VoiceInput onTranscript={t => setEditing({...editing, description: (editing.description ?? "") + " " + t})} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input type="number" value={editing.price ?? ""} onChange={e => setEditing({...editing, price: e.target.value ? parseFloat(e.target.value) : null})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Original Price ($)</label>
                  <input type="number" value={editing.original_price ?? ""} onChange={e => setEditing({...editing, original_price: e.target.value ? parseFloat(e.target.value) : null})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                  <input value={editing.level} onChange={e => setEditing({...editing, level: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input value={editing.duration ?? ""} onChange={e => setEditing({...editing, duration: e.target.value})} placeholder="e.g. 8 weeks" className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lessons</label>
                  <input type="number" value={editing.lessons ?? ""} onChange={e => setEditing({...editing, lessons: e.target.value ? parseInt(e.target.value) : null})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Students</label>
                  <input type="number" value={editing.students} onChange={e => setEditing({...editing, students: parseInt(e.target.value) || 0})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Highlights (one per line)</label>
                <textarea value={editing.highlights.join("\n")} onChange={e => setEditing({...editing, highlights: e.target.value.split("\n").filter(Boolean)})} rows={3} className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Benefits (one per line)</label>
                <textarea value={editing.benefits.join("\n")} onChange={e => setEditing({...editing, benefits: e.target.value.split("\n").filter(Boolean)})} rows={3} className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Eventbrite URL</label>
                <input value={editing.eventbrite_url ?? ""} onChange={e => setEditing({...editing, eventbrite_url: e.target.value || null})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="https://www.eventbrite.com/..." />
              </div>
            </div>
            <div className="flex gap-3 justify-end mt-6">
              <button onClick={() => setEditing(null)} className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
              <button onClick={save} className="px-4 py-2 text-sm text-white bg-purple-600 rounded-lg hover:bg-purple-700">Save</button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog open={!!deleteId} title="Delete Course" message="This will permanently delete this course." onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
    </div>
  )
}
