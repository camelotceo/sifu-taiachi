"use client"

import { useState, useEffect } from "react"

export default function DebugFrontendPage() {
  const [apiData, setApiData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      console.log("Debug Frontend: Starting fetch...")
      const response = await fetch("/api/content/home", {
        cache: 'no-store'
      })
      console.log("Debug Frontend: Response status:", response.status)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log("Debug Frontend: Received data:", data)
      setApiData(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error"
      console.error("Debug Frontend: Error:", errorMessage)
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Frontend Debug Test</h1>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Status</h2>
            <div className="space-y-2">
              <div><strong>Loading:</strong> {loading ? "Yes" : "No"}</div>
              <div><strong>Error:</strong> {error || "None"}</div>
              <div><strong>Has Data:</strong> {apiData ? "Yes" : "No"}</div>
            </div>
          </div>

          {apiData && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">API Data</h2>
              <div className="space-y-4">
                <div>
                  <strong>Testimonials Count:</strong> {apiData.testimonials?.length || 0}
                </div>
                <div>
                  <strong>First Testimonial Name:</strong> {apiData.testimonials?.[0]?.name || "None"}
                </div>
                <div>
                  <strong>Raw Data:</strong>
                  <pre className="mt-2 p-4 bg-gray-100 rounded text-sm overflow-auto">
                    {JSON.stringify(apiData, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Actions</h2>
            <button
              onClick={fetchData}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Fetch Data Again
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 