"use client"

import { useEffect, useState } from "react"
import { VoiceInput } from "@/components/admin/voice-input"

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, unknown> | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/settings")
        if (res.ok) setSettings(await res.json())
      } catch (error) { console.error("Failed:", error) }
      finally { setLoading(false) }
    }
    load()
  }, [])

  async function save() {
    setSaving(true)
    try {
      await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (error) { console.error("Save failed:", error) }
    finally { setSaving(false) }
  }

  function update(key: string, value: unknown) {
    setSettings(prev => prev ? { ...prev, [key]: value } : null)
  }

  if (loading) return <div className="animate-pulse space-y-4"><div className="h-8 bg-gray-200 rounded w-48" /><div className="h-64 bg-gray-200 rounded-lg" /></div>

  if (!settings) return <div className="text-center py-12 text-gray-500">Settings not found. Run the seed script first.</div>

  const s = settings as Record<string, unknown>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500 text-sm mt-1">Global site configuration</p>
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
        {/* Site Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Site Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
              <div className="flex gap-2">
                <input value={(s.siteName as string) ?? ""} onChange={e => update("siteName", e.target.value)} className="flex-1 px-3 py-2 border rounded-lg text-sm" />
                <VoiceInput onTranscript={t => update("siteName", t)} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
              <div className="flex gap-2">
                <input value={(s.tagline as string) ?? ""} onChange={e => update("tagline", e.target.value)} className="flex-1 px-3 py-2 border rounded-lg text-sm" />
                <VoiceInput onTranscript={t => update("tagline", t)} />
              </div>
            </div>
          </div>
        </div>

        {/* AI Configuration */}
        {s.ai && typeof s.ai === "object" && (
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-4">AI Chatbot Configuration</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">System Prompt</label>
                <div className="flex gap-2 items-start">
                  <textarea
                    value={((s.ai as Record<string, unknown>).chatbot as Record<string, unknown>)?.systemPrompt as string ?? ""}
                    onChange={e => {
                      const ai = { ...(s.ai as Record<string, unknown>) }
                      const chatbot = { ...(ai.chatbot as Record<string, unknown>) }
                      chatbot.systemPrompt = e.target.value
                      ai.chatbot = chatbot
                      update("ai", ai)
                    }}
                    rows={5}
                    className="flex-1 px-3 py-2 border rounded-lg text-sm"
                  />
                  <VoiceInput onTranscript={t => {
                    const ai = { ...(s.ai as Record<string, unknown>) }
                    const chatbot = { ...(ai.chatbot as Record<string, unknown>) }
                    chatbot.systemPrompt = t
                    ai.chatbot = chatbot
                    update("ai", ai)
                  }} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                  <input
                    value={((s.ai as Record<string, unknown>).chatbot as Record<string, unknown>)?.model as string ?? ""}
                    onChange={e => {
                      const ai = { ...(s.ai as Record<string, unknown>) }
                      const chatbot = { ...(ai.chatbot as Record<string, unknown>) }
                      chatbot.model = e.target.value
                      ai.chatbot = chatbot
                      update("ai", ai)
                    }}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Tokens</label>
                  <input
                    type="number"
                    value={((s.ai as Record<string, unknown>).chatbot as Record<string, unknown>)?.maxTokens as number ?? 150}
                    onChange={e => {
                      const ai = { ...(s.ai as Record<string, unknown>) }
                      const chatbot = { ...(ai.chatbot as Record<string, unknown>) }
                      chatbot.maxTokens = parseInt(e.target.value)
                      ai.chatbot = chatbot
                      update("ai", ai)
                    }}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Temperature</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="2"
                    value={((s.ai as Record<string, unknown>).chatbot as Record<string, unknown>)?.temperature as number ?? 0.7}
                    onChange={e => {
                      const ai = { ...(s.ai as Record<string, unknown>) }
                      const chatbot = { ...(ai.chatbot as Record<string, unknown>) }
                      chatbot.temperature = parseFloat(e.target.value)
                      ai.chatbot = chatbot
                      update("ai", ai)
                    }}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
