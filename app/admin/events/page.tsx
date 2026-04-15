"use client"

import { useEffect, useState } from "react"
import { VoiceInput } from "@/components/admin/voice-input"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"

interface EventbriteEvent {
  id: string
  title: string
  description: string | null
  start_date: string | null
  end_date: string | null
  venue: string | null
  ticket_price: number | null
  url: string
  status: string
  is_primary: boolean
  image_url: string | null
}

const STATUS_COLORS: Record<string, string> = {
  draft: "bg-gray-100 text-gray-700",
  live: "bg-green-100 text-green-700",
  completed: "bg-blue-100 text-blue-700",
  canceled: "bg-red-100 text-red-700",
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventbriteEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<EventbriteEvent | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [syncing, setSyncing] = useState(false)

  async function load() {
    try {
      const res = await fetch("/api/admin/events")
      if (res.ok) setEvents(await res.json())
    } catch (error) { console.error("Failed:", error) }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  async function syncFromEventbrite() {
    setSyncing(true)
    try {
      const res = await fetch("/api/admin/events/sync", { method: "POST" })
      if (res.ok) {
        const data = await res.json()
        alert(`Synced ${data.synced} events from Eventbrite!`)
        load()
      } else {
        const data = await res.json()
        alert(`Sync failed: ${data.error}`)
      }
    } catch { alert("Sync failed") }
    finally { setSyncing(false) }
  }

  async function setPrimary(eventId: string) {
    await fetch(`/api/admin/events/${eventId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ set_primary: true }),
    })
    load()
  }

  function openNew() {
    setIsNew(true)
    setEditing({ id: "", title: "", description: "", start_date: null, end_date: null, venue: "", ticket_price: null, url: "", status: "draft", is_primary: false, image_url: null })
  }

  async function save() {
    if (!editing) return
    const method = isNew ? "POST" : "PUT"
    const url = isNew ? "/api/admin/events" : `/api/admin/events/${editing.id}`
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) })
    setEditing(null)
    setIsNew(false)
    load()
  }

  async function handleDelete() {
    if (!deleteId) return
    await fetch(`/api/admin/events/${deleteId}`, { method: "DELETE" })
    setDeleteId(null)
    load()
  }

  if (loading) return <div className="animate-pulse space-y-4">{[1,2].map(i => <div key={i} className="h-20 bg-gray-200 rounded-lg" />)}</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
          <p className="text-gray-500 text-sm mt-1">{events.length} events</p>
        </div>
        <div className="flex gap-2">
          <button onClick={syncFromEventbrite} disabled={syncing} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm font-medium disabled:opacity-50">
            {syncing ? "Syncing..." : "Sync from Eventbrite"}
          </button>
          <button onClick={openNew} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium">
            Add Event
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {events.map((e) => (
          <div key={e.id} className={`bg-white rounded-xl border p-5 ${e.is_primary ? "border-purple-300 ring-1 ring-purple-200" : "border-gray-200"}`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${STATUS_COLORS[e.status]}`}>{e.status}</span>
                  {e.is_primary && <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded font-medium">Primary Enrollment Link</span>}
                </div>
                <h3 className="font-semibold text-gray-900">{e.title}</h3>
                {e.start_date && <p className="text-sm text-gray-500 mt-1">{new Date(e.start_date).toLocaleDateString()} {e.venue ? `• ${e.venue}` : ""}</p>}
                {e.url && <p className="text-xs text-gray-400 mt-1 truncate">{e.url}</p>}
              </div>
              <div className="flex gap-2 ml-4">
                {!e.is_primary && (
                  <button onClick={() => setPrimary(e.id)} className="px-3 py-1.5 text-sm text-purple-600 hover:bg-purple-50 rounded-lg whitespace-nowrap">Set Primary</button>
                )}
                <button onClick={() => { setIsNew(false); setEditing(e) }} className="px-3 py-1.5 text-sm text-purple-600 hover:bg-purple-50 rounded-lg">Edit</button>
                <button onClick={() => setDeleteId(e.id)} className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setEditing(null)} />
          <div className="relative bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-lg font-semibold mb-4">{isNew ? "Add Event" : "Edit Event"}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <div className="flex gap-2">
                  <input value={editing.title} onChange={e => setEditing({...editing, title: e.target.value})} className="flex-1 px-3 py-2 border rounded-lg text-sm" />
                  <VoiceInput onTranscript={t => setEditing({...editing, title: t})} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <div className="flex gap-2 items-start">
                  <textarea value={editing.description ?? ""} onChange={e => setEditing({...editing, description: e.target.value})} rows={3} className="flex-1 px-3 py-2 border rounded-lg text-sm" />
                  <VoiceInput onTranscript={t => setEditing({...editing, description: (editing.description ?? "") + " " + t})} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Eventbrite URL</label>
                <input value={editing.url} onChange={e => setEditing({...editing, url: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="https://www.eventbrite.com/..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input type="datetime-local" value={editing.start_date?.slice(0, 16) ?? ""} onChange={e => setEditing({...editing, start_date: e.target.value ? new Date(e.target.value).toISOString() : null})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input type="datetime-local" value={editing.end_date?.slice(0, 16) ?? ""} onChange={e => setEditing({...editing, end_date: e.target.value ? new Date(e.target.value).toISOString() : null})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
                  <input value={editing.venue ?? ""} onChange={e => setEditing({...editing, venue: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select value={editing.status} onChange={e => setEditing({...editing, status: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm">
                    <option value="draft">Draft</option>
                    <option value="live">Live</option>
                    <option value="completed">Completed</option>
                    <option value="canceled">Canceled</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ticket Price ($)</label>
                <input type="number" value={editing.ticket_price ?? ""} onChange={e => setEditing({...editing, ticket_price: e.target.value ? parseFloat(e.target.value) : null})} className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
            </div>
            <div className="flex gap-3 justify-end mt-6">
              <button onClick={() => setEditing(null)} className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
              <button onClick={save} className="px-4 py-2 text-sm text-white bg-purple-600 rounded-lg hover:bg-purple-700">Save</button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog open={!!deleteId} title="Delete Event" message="Are you sure? This cannot be undone." onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
    </div>
  )
}
