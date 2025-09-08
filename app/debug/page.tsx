"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DebugPage() {
  const [apiData, setApiData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      console.log("Debug: Fetching data...")
      const response = await fetch("/api/content/home", {
        cache: 'no-store'
      })
      console.log("Debug: Response status:", response.status)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log("Debug: Received data:", data)
      setApiData(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error"
      console.error("Debug: Error fetching data:", errorMessage)
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
        <h1 className="text-3xl font-bold mb-8">Debug: Content API Test</h1>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Button onClick={fetchData} disabled={loading}>
                    {loading ? "Loading..." : "Refresh Data"}
                  </Button>
                </div>
                
                {error && (
                  <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    <strong>Error:</strong> {error}
                  </div>
                )}
                
                {apiData && (
                  <div className="space-y-4">
                    <div>
                      <strong>Hero Title:</strong> {apiData.hero?.title || "Not found"}
                    </div>
                    <div>
                      <strong>Testimonials Count:</strong> {apiData.testimonials?.length || 0}
                    </div>
                    <div>
                      <strong>Testimonials:</strong>
                      <pre className="mt-2 p-4 bg-gray-100 rounded text-sm overflow-auto">
                        {JSON.stringify(apiData.testimonials, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Test Admin Update</CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                onClick={async () => {
                  try {
                    const testData = {
                      testimonials: [
                        {
                          id: "debug-test",
                          name: "Debug Test User",
                          age: 30,
                          location: "Debug City",
                          rating: 5,
                          text: "This is a debug test testimonial",
                          course: "Debug Course",
                          image: "/debug.jpg"
                        }
                      ]
                    }
                    
                    console.log("Debug: Sending test update...")
                    const response = await fetch("/api/admin/pages/home", {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(testData)
                    })
                    
                    console.log("Debug: Update response status:", response.status)
                    const result = await response.json()
                    console.log("Debug: Update result:", result)
                    
                    // Refresh the data
                    setTimeout(fetchData, 1000)
                  } catch (err) {
                    console.error("Debug: Error updating:", err)
                  }
                }}
              >
                Send Test Update
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 