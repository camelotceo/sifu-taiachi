"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Save, CheckCircle } from "lucide-react"

interface HomePageData {
  hero: {
    title: string
    subtitle: string
    description: string
    videoId: string
    videoThumbnail: string
  }
  wellnessPillars: Array<{
    id: string
    title: string
    description: string
    image: string
  }>
  testimonials: Array<{
    id: string
    name: string
    age: number
    location: string
    rating: number
    text: string
    course: string
    image: string
  }>
}

export default function AdminHomePage() {
  const [data, setData] = useState<HomePageData>({
    hero: {
      title: "",
      subtitle: "",
      description: "",
      videoId: "",
      videoThumbnail: "",
    },
    wellnessPillars: [],
    testimonials: [],
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    // Load current home page data
    fetch("/api/admin/pages/home")
      .then((res) => res.json())
      .then((pageData) => setData(pageData))
      .catch((error) => console.error("Failed to load home page data:", error))
  }, [])

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await fetch("/api/admin/pages/home", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 2000)
    } catch (error) {
      console.error("Failed to save home page:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const addTestimonial = () => {
    const newTestimonial = {
      id: `testimonial-${Date.now()}`,
      name: "",
      age: 0,
      location: "",
      rating: 5,
      text: "",
      course: "",
      image: "/placeholder.svg?height=80&width=80",
    }
    setData({
      ...data,
      testimonials: [...data.testimonials, newTestimonial],
    })
  }

  const updateTestimonial = (id: string, field: string, value: any) => {
    setData({
      ...data,
      testimonials: data.testimonials.map((t) => (t.id === id ? { ...t, [field]: value } : t)),
    })
  }

  const deleteTestimonial = (id: string) => {
    setData({
      ...data,
      testimonials: data.testimonials.filter((t) => t.id !== id),
    })
  }

  const updateWellnessPillar = (id: string, field: string, value: string) => {
    setData({
      ...data,
      wellnessPillars: data.wellnessPillars.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Save Button - Fixed at top */}
        <div className="mb-6 flex justify-end">
          <Button onClick={handleSave} disabled={isLoading} className="bg-green-600 hover:bg-green-700 text-white">
            {isLoading ? (
              "Saving..."
            ) : isSaved ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Saved!
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>

        <div className="space-y-8">
          {/* Hero Section */}
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <Input
                  value={data.hero.title}
                  onChange={(e) => setData({ ...data, hero: { ...data.hero, title: e.target.value } })}
                  placeholder="Main hero title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                <Input
                  value={data.hero.subtitle}
                  onChange={(e) => setData({ ...data, hero: { ...data.hero, subtitle: e.target.value } })}
                  placeholder="Hero subtitle"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <Textarea
                  value={data.hero.description}
                  onChange={(e) => setData({ ...data, hero: { ...data.hero, description: e.target.value } })}
                  placeholder="Hero description"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Video ID</label>
                  <Input
                    value={data.hero.videoId}
                    onChange={(e) => setData({ ...data, hero: { ...data.hero, videoId: e.target.value } })}
                    placeholder="YouTube video ID"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Video Thumbnail URL</label>
                  <Input
                    value={data.hero.videoThumbnail}
                    onChange={(e) => setData({ ...data, hero: { ...data.hero, videoThumbnail: e.target.value } })}
                    placeholder="Thumbnail image URL"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Wellness Pillars */}
          <Card>
            <CardHeader>
              <CardTitle>Wellness Pillars</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {data.wellnessPillars.map((pillar) => (
                  <div key={pillar.id} className="border rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <Input
                          value={pillar.title}
                          onChange={(e) => updateWellnessPillar(pillar.id, "title", e.target.value)}
                          placeholder="Pillar title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                        <Input
                          value={pillar.image}
                          onChange={(e) => updateWellnessPillar(pillar.id, "image", e.target.value)}
                          placeholder="Image URL"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <Textarea
                        value={pillar.description}
                        onChange={(e) => updateWellnessPillar(pillar.id, "description", e.target.value)}
                        placeholder="Pillar description"
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Testimonials */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Testimonials</CardTitle>
                <Button onClick={addTestimonial} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Testimonial
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {data.testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-medium">Testimonial</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteTestimonial(testimonial.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                        <Input
                          value={testimonial.name}
                          onChange={(e) => updateTestimonial(testimonial.id, "name", e.target.value)}
                          placeholder="Customer name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                        <Input
                          type="number"
                          value={testimonial.age}
                          onChange={(e) => updateTestimonial(testimonial.id, "age", Number.parseInt(e.target.value))}
                          placeholder="Age"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <Input
                          value={testimonial.location}
                          onChange={(e) => updateTestimonial(testimonial.id, "location", e.target.value)}
                          placeholder="City, State"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                        <Input
                          value={testimonial.course}
                          onChange={(e) => updateTestimonial(testimonial.id, "course", e.target.value)}
                          placeholder="Course name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Rating (1-5)</label>
                        <Input
                          type="number"
                          min="1"
                          max="5"
                          value={testimonial.rating}
                          onChange={(e) => updateTestimonial(testimonial.id, "rating", Number.parseInt(e.target.value))}
                          placeholder="Rating"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Testimonial Text</label>
                      <Textarea
                        value={testimonial.text}
                        onChange={(e) => updateTestimonial(testimonial.id, "text", e.target.value)}
                        placeholder="Customer testimonial"
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
