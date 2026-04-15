"use client"

import { useEffect, useState } from "react"
import { VoiceInput } from "@/components/admin/voice-input"
import { ImageUpload } from "@/components/admin/image-upload"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"

interface Testimonial {
  id: string
  name: string
  age: number | null
  location: string | null
  rating: number
  text: string
  course: string | null
  image: string | null
  sort_order: number
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Testimonial | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  async function load() {
    try {
      const res = await fetch("/api/admin/testimonials")
      if (res.ok) setTestimonials(await res.json())
    } catch (error) {
      console.error("Failed to load:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  function openNew() {
    setIsNew(true)
    setEditing({ id: "", name: "", age: null, location: "", rating: 5, text: "", course: "", image: null, sort_order: 0 })
  }

  async function save() {
    if (!editing) return
    try {
      if (isNew) {
        await fetch("/api/admin/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editing),
        })
      } else {
        await fetch(`/api/admin/testimonials/${editing.id}`, {
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
    try {
      await fetch(`/api/admin/testimonials/${deleteId}`, { method: "DELETE" })
      setDeleteId(null)
      load()
    } catch (error) {
      console.error("Delete failed:", error)
    }
  }

  if (loading) return <div className="animate-pulse space-y-4">{[1,2,3].map(i => <div key={i} className="h-20 bg-gray-200 rounded-lg" />)}</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-gray-500 text-sm mt-1">{testimonials.length} testimonials</p>
        </div>
        <button onClick={openNew} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium">
          Add Testimonial
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900">{t.name}</h3>
                  <span className="text-yellow-500">{"★".repeat(t.rating)}</span>
                </div>
                <p className="text-sm text-gray-500">{t.location}{t.age ? `, age ${t.age}` : ""} {t.course ? `• ${t.course}` : ""}</p>
                <p className="text-gray-700 mt-2 text-sm line-clamp-2">{t.text}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <button onClick={() => { setIsNew(false); setEditing(t) }} className="px-3 py-1.5 text-sm text-purple-600 hover:bg-purple-50 rounded-lg">Edit</button>
                <button onClick={() => setDeleteId(t.id)} className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit/Create Dialog */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setEditing(null)} />
          <div className="relative bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-lg font-semibold mb-4">{isNew ? "Add Testimonial" : "Edit Testimonial"}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <div className="flex gap-2">
                  <input value={editing.name} onChange={e => setEditing({...editing, name: e.target.value})} className="flex-1 px-3 py-2 border rounded-lg text-sm" />
                  <VoiceInput onTranscript={t => setEditing({...editing, name: t})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input type="number" value={editing.age ?? ""} onChange={e => setEditing({...editing, age: e.target.value ? parseInt(e.target.value) : null})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <select value={editing.rating} onChange={e => setEditing({...editing, rating: parseInt(e.target.value)})} className="w-full px-3 py-2 border rounded-lg text-sm">
                    {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} star{r !== 1 ? "s" : ""}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <div className="flex gap-2">
                  <input value={editing.location ?? ""} onChange={e => setEditing({...editing, location: e.target.value})} className="flex-1 px-3 py-2 border rounded-lg text-sm" />
                  <VoiceInput onTranscript={t => setEditing({...editing, location: t})} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                <input value={editing.course ?? ""} onChange={e => setEditing({...editing, course: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Testimonial Text</label>
                <div className="flex gap-2 items-start">
                  <textarea value={editing.text} onChange={e => setEditing({...editing, text: e.target.value})} rows={4} className="flex-1 px-3 py-2 border rounded-lg text-sm" />
                  <VoiceInput onTranscript={t => setEditing({...editing, text: editing.text + " " + t})} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
                <ImageUpload value={editing.image ?? undefined} onChange={url => setEditing({...editing, image: url})} />
              </div>
            </div>
            <div className="flex gap-3 justify-end mt-6">
              <button onClick={() => setEditing(null)} className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
              <button onClick={save} className="px-4 py-2 text-sm text-white bg-purple-600 rounded-lg hover:bg-purple-700">Save</button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Testimonial"
        message="Are you sure? This cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
