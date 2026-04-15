"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { VoiceInput } from "@/components/admin/voice-input"

export default function PageEditor() {
  const params = useParams()
  const router = useRouter()
  const pageName = params.page as string
  const [content, setContent] = useState<Record<string, unknown> | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/admin/pages/${pageName}`)
        if (res.ok) setContent(await res.json())
      } catch (error) {
        console.error("Failed to load page:", error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [pageName])

  async function save() {
    setSaving(true)
    try {
      await fetch(`/api/admin/pages/${pageName}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (error) {
      console.error("Save failed:", error)
    } finally {
      setSaving(false)
    }
  }

  function updateNestedValue(path: string, value: unknown) {
    if (!content) return
    const keys = path.split(".")
    const newContent = JSON.parse(JSON.stringify(content))
    let obj = newContent
    for (let i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]]
    }
    obj[keys[keys.length - 1]] = value
    setContent(newContent)
  }

  if (loading) return <div className="animate-pulse space-y-4"><div className="h-8 bg-gray-200 rounded w-48" /><div className="h-64 bg-gray-200 rounded-lg" /></div>

  if (!content) return <div className="text-center py-12 text-gray-500">Page content not found. Run the seed script first.</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push("/admin/pages")} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 capitalize">{pageName} Page</h1>
            <p className="text-gray-500 text-sm mt-1">Edit page content</p>
          </div>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            saved ? "bg-green-600 text-white" : "bg-purple-600 text-white hover:bg-purple-700"
          } disabled:opacity-50`}
        >
          {saved ? "Saved!" : saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="space-y-6">
        {renderFields(content, "", updateNestedValue)}
      </div>
    </div>
  )
}

function renderFields(
  obj: Record<string, unknown>,
  prefix: string,
  onChange: (path: string, value: unknown) => void
): React.ReactNode[] {
  const nodes: React.ReactNode[] = []

  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key

    if (typeof value === "string") {
      const isLongText = value.length > 100
      nodes.push(
        <div key={path} className="bg-white rounded-xl border border-gray-200 p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
          <div className="flex gap-2 items-start">
            {isLongText ? (
              <textarea
                value={value}
                onChange={(e) => onChange(path, e.target.value)}
                rows={4}
                className="flex-1 px-3 py-2 border rounded-lg text-sm"
              />
            ) : (
              <input
                value={value}
                onChange={(e) => onChange(path, e.target.value)}
                className="flex-1 px-3 py-2 border rounded-lg text-sm"
              />
            )}
            <VoiceInput onTranscript={(t) => onChange(path, t)} />
          </div>
        </div>
      )
    } else if (typeof value === "number") {
      nodes.push(
        <div key={path} className="bg-white rounded-xl border border-gray-200 p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(path, parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 border rounded-lg text-sm"
          />
        </div>
      )
    } else if (Array.isArray(value) && value.length > 0 && typeof value[0] === "string") {
      nodes.push(
        <div key={path} className="bg-white rounded-xl border border-gray-200 p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">{key.replace(/([A-Z])/g, " $1")} (one per line)</label>
          <textarea
            value={(value as string[]).join("\n")}
            onChange={(e) => onChange(path, e.target.value.split("\n"))}
            rows={4}
            className="w-full px-3 py-2 border rounded-lg text-sm"
          />
        </div>
      )
    } else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      nodes.push(
        <div key={path} className="border-l-4 border-purple-200 pl-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-3 capitalize">{key.replace(/([A-Z])/g, " $1")}</h3>
          <div className="space-y-4">
            {renderFields(value as Record<string, unknown>, path, onChange)}
          </div>
        </div>
      )
    }
  }

  return nodes
}
