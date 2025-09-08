"use client"

import { useState, useEffect } from "react"

export default function FetchTestPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const testFetch = async () => {
    setLoading(true)
    setError(null)
    try {
      console.log("Fetch Test: Starting fetch...")
      
      const response = await fetch("/api/content/home", {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        cache: 'no-store'
      })
      
      console.log("Fetch Test: Response status:", response.status)
      console.log("Fetch Test: Response ok:", response.ok)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log("Fetch Test: Received data:", data)
      setResult(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error"
      console.error("Fetch Test: Error:", errorMessage)
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    testFetch()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Fetch Test Page</h1>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Status</h2>
            <div className="space-y-2">
              <div><strong>Loading:</strong> {loading ? "Yes" : "No"}</div>
              <div><strong>Error:</strong> {error || "None"}</div>
              <div><strong>Has Result:</strong> {result ? "Yes" : "No"}</div>
            </div>
          </div>

          {result && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Result</h2>
              <div className="space-y-4">
                <div>
                  <strong>Testimonials Count:</strong> {result.testimonials?.length || 0}
                </div>
                <div>
                  <strong>First Testimonial Name:</strong> {result.testimonials?.[0]?.name || "None"}
                </div>
                <div>
                  <strong>Raw Data:</strong>
                  <pre className="mt-2 p-4 bg-gray-100 rounded text-sm overflow-auto">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Actions</h2>
            <button
              onClick={testFetch}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Test Fetch Again
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 