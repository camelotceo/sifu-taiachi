"use client"

import { useHomeContent } from "@/hooks/use-content"

export default function TestContentPage() {
  const { content, loading, error, lastUpdated, refresh } = useHomeContent()

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Content Hook Test</h1>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Hook Status</h2>
            <div className="space-y-2">
              <div><strong>Loading:</strong> {loading ? "Yes" : "No"}</div>
              <div><strong>Error:</strong> {error || "None"}</div>
              <div><strong>Last Updated:</strong> {lastUpdated ? lastUpdated.toLocaleTimeString() : "Never"}</div>
              <div><strong>Has Content:</strong> {content ? "Yes" : "No"}</div>
            </div>
          </div>

          {content && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Content Data</h2>
              <div className="space-y-4">
                <div>
                  <strong>Hero Title:</strong> {content.hero?.title}
                </div>
                <div>
                  <strong>Testimonials Count:</strong> {content.testimonials?.length || 0}
                </div>
                <div>
                  <strong>Testimonials:</strong>
                  <ul className="mt-2 space-y-2">
                    {content.testimonials?.map((testimonial, index) => (
                      <li key={testimonial.id} className="p-3 bg-gray-100 rounded">
                        <div><strong>Name:</strong> {testimonial.name}</div>
                        <div><strong>Age:</strong> {testimonial.age}</div>
                        <div><strong>Text:</strong> {testimonial.text}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Actions</h2>
            <button
              onClick={refresh}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Refresh Content
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 