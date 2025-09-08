"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Save, CheckCircle } from "lucide-react"

interface ClassesData {
  hero: {
    title: string
    subtitle: string
    description: string
  }
  categories: Array<{
    id: string
    name: string
    count: number
  }>
  featuredClasses: Array<{
    id: string
    title: string
    description: string
    videoId: string
    thumbnail: string
    duration: string
    level: string
    topics: string[]
    benefits: string[]
  }>
}

export default function AdminClassesPage() {
  const [data, setData] = useState<ClassesData>({
    hero: { title: "", subtitle: "", description: "" },
    categories: [],
    featuredClasses: [],
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    fetch("/api/admin/pages/classes")
      .then((res) => res.json())
      .then((pageData) => setData(pageData))
      .catch((error) => console.error("Failed to load classes data:", error))
  }, [])

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await fetch("/api/admin/pages/classes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 2000)
    } catch (error) {
      console.error("Failed to save classes page:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const addClass = () => {
    const newClass = {
      id: `class-${Date.now()}`,
      title: "",
      description: "",
      videoId: "",
      thumbnail: "",
      duration: "",
      level: "Beginner",
      topics: [],
      benefits: [],
    }
    setData({ ...data, featuredClasses: [...data.featuredClasses, newClass] })
  }

  const updateClass = (id: string, field: string, value: any) => {
    setData({
      ...data,
      featuredClasses: data.featuredClasses.map((cls) => (cls.id === id ? { ...cls, [field]: value } : cls)),
    })
  }

  const deleteClass = (id: string) => {
    setData({
      ...data,
      featuredClasses: data.featuredClasses.filter((cls) => cls.id !== id),
    })
  }

  const updateClassTopics = (id: string, topics: string) => {
    const topicsArray = topics
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
    updateClass(id, "topics", topicsArray)
  }

  const updateClassBenefits = (id: string, benefits: string) => {
    const benefitsArray = benefits
      .split(",")
      .map((b) => b.trim())
      .filter(Boolean)
    updateClass(id, "benefits", benefitsArray)
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
              <CardTitle>Page Header</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <Input
                  value={data.hero.title}
                  onChange={(e) => setData({ ...data, hero: { ...data.hero, title: e.target.value } })}
                  placeholder="Classes page title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                <Input
                  value={data.hero.subtitle}
                  onChange={(e) => setData({ ...data, hero: { ...data.hero, subtitle: e.target.value } })}
                  placeholder="Classes page subtitle"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <Textarea
                  value={data.hero.description}
                  onChange={(e) => setData({ ...data, hero: { ...data.hero, description: e.target.value } })}
                  placeholder="Classes page description"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Featured Classes */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Featured Classes</CardTitle>
                <Button onClick={addClass} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Class
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {data.featuredClasses.map((classItem) => (
                  <div key={classItem.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-medium">Class</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteClass(classItem.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <Input
                          value={classItem.title}
                          onChange={(e) => updateClass(classItem.id, "title", e.target.value)}
                          placeholder="Class title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <Textarea
                          value={classItem.description}
                          onChange={(e) => updateClass(classItem.id, "description", e.target.value)}
                          placeholder="Class description"
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Video ID</label>
                          <Input
                            value={classItem.videoId}
                            onChange={(e) => updateClass(classItem.id, "videoId", e.target.value)}
                            placeholder="YouTube video ID"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                          <Input
                            value={classItem.duration}
                            onChange={(e) => updateClass(classItem.id, "duration", e.target.value)}
                            placeholder="e.g., 25:00"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                          <Select
                            value={classItem.level}
                            onValueChange={(value) => updateClass(classItem.id, "level", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Beginner">Beginner</SelectItem>
                              <SelectItem value="Intermediate">Intermediate</SelectItem>
                              <SelectItem value="Advanced">Advanced</SelectItem>
                              <SelectItem value="All Levels">All Levels</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail URL</label>
                        <Input
                          value={classItem.thumbnail}
                          onChange={(e) => updateClass(classItem.id, "thumbnail", e.target.value)}
                          placeholder="Thumbnail image URL"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Topics (comma-separated)
                          </label>
                          <Input
                            value={classItem.topics.join(", ")}
                            onChange={(e) => updateClassTopics(classItem.id, e.target.value)}
                            placeholder="Morning Routine, Energy Cultivation"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Benefits (comma-separated)
                          </label>
                          <Input
                            value={classItem.benefits.join(", ")}
                            onChange={(e) => updateClassBenefits(classItem.id, e.target.value)}
                            placeholder="Boost energy, Improve mood"
                          />
                        </div>
                      </div>
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
