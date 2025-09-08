"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Save, CheckCircle } from "lucide-react"

interface CoursesData {
  hero: {
    title: string
    subtitle: string
    description: string
  }
  courses: Array<{
    id: string
    title: string
    subtitle: string
    description: string
    price: number
    originalPrice: number
    image: string
    duration: string
    lessons: number
    students: number
    rating: number
    level: string
    highlights: string[]
    videoId: string
    videoThumbnail: string
  }>
}

export default function AdminCoursesPage() {
  const [data, setData] = useState<CoursesData>({
    hero: { title: "", subtitle: "", description: "" },
    courses: [],
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    fetch("/api/admin/pages/courses")
      .then((res) => res.json())
      .then((pageData) => setData(pageData))
      .catch((error) => console.error("Failed to load courses data:", error))
  }, [])

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await fetch("/api/admin/pages/courses", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 2000)
    } catch (error) {
      console.error("Failed to save courses page:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const addCourse = () => {
    const newCourse = {
      id: `course-${Date.now()}`,
      title: "",
      subtitle: "",
      description: "",
      price: 99,
      originalPrice: 149,
      image: "",
      duration: "",
      lessons: 0,
      students: 0,
      rating: 5,
      level: "All Levels",
      highlights: [],
      videoId: "",
      videoThumbnail: "",
    }
    setData({ ...data, courses: [...data.courses, newCourse] })
  }

  const updateCourse = (id: string, field: string, value: any) => {
    setData({
      ...data,
      courses: data.courses.map((course) => (course.id === id ? { ...course, [field]: value } : course)),
    })
  }

  const deleteCourse = (id: string) => {
    setData({
      ...data,
      courses: data.courses.filter((course) => course.id !== id),
    })
  }

  const updateCourseHighlights = (id: string, highlights: string) => {
    const highlightsArray = highlights
      .split(",")
      .map((h) => h.trim())
      .filter(Boolean)
    updateCourse(id, "highlights", highlightsArray)
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
                  placeholder="Courses page title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                <Input
                  value={data.hero.subtitle}
                  onChange={(e) => setData({ ...data, hero: { ...data.hero, subtitle: e.target.value } })}
                  placeholder="Courses page subtitle"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <Textarea
                  value={data.hero.description}
                  onChange={(e) => setData({ ...data, hero: { ...data.hero, description: e.target.value } })}
                  placeholder="Courses page description"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Courses */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Courses</CardTitle>
                <Button onClick={addCourse} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Course
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {data.courses.map((course) => (
                  <div key={course.id} className="border rounded-lg p-6">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-lg font-medium">Course</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteCourse(course.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                          <Input
                            value={course.title}
                            onChange={(e) => updateCourse(course.id, "title", e.target.value)}
                            placeholder="Course title"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                          <Input
                            value={course.subtitle}
                            onChange={(e) => updateCourse(course.id, "subtitle", e.target.value)}
                            placeholder="Course subtitle"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <Textarea
                          value={course.description}
                          onChange={(e) => updateCourse(course.id, "description", e.target.value)}
                          placeholder="Course description"
                          rows={4}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                          <Input
                            type="number"
                            value={course.price}
                            onChange={(e) => updateCourse(course.id, "price", Number.parseInt(e.target.value))}
                            placeholder="99"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Original Price ($)</label>
                          <Input
                            type="number"
                            value={course.originalPrice}
                            onChange={(e) => updateCourse(course.id, "originalPrice", Number.parseInt(e.target.value))}
                            placeholder="149"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                          <Input
                            value={course.duration}
                            onChange={(e) => updateCourse(course.id, "duration", e.target.value)}
                            placeholder="8 weeks"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Lessons</label>
                          <Input
                            type="number"
                            value={course.lessons}
                            onChange={(e) => updateCourse(course.id, "lessons", Number.parseInt(e.target.value))}
                            placeholder="24"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Students</label>
                          <Input
                            type="number"
                            value={course.students}
                            onChange={(e) => updateCourse(course.id, "students", Number.parseInt(e.target.value))}
                            placeholder="2847"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Rating (1-5)</label>
                          <Input
                            type="number"
                            min="1"
                            max="5"
                            step="0.1"
                            value={course.rating}
                            onChange={(e) => updateCourse(course.id, "rating", Number.parseFloat(e.target.value))}
                            placeholder="4.9"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                          <select
                            value={course.level}
                            onChange={(e) => updateCourse(course.id, "level", e.target.value)}
                            className="w-full p-2 border rounded-md"
                          >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="All Levels">All Levels</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                          <Input
                            value={course.image}
                            onChange={(e) => updateCourse(course.id, "image", e.target.value)}
                            placeholder="Course image URL"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Video Thumbnail URL</label>
                          <Input
                            value={course.videoThumbnail}
                            onChange={(e) => updateCourse(course.id, "videoThumbnail", e.target.value)}
                            placeholder="Video thumbnail URL"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Video ID</label>
                        <Input
                          value={course.videoId}
                          onChange={(e) => updateCourse(course.id, "videoId", e.target.value)}
                          placeholder="YouTube video ID"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Highlights (comma-separated)
                        </label>
                        <Textarea
                          value={course.highlights.join(", ")}
                          onChange={(e) => updateCourseHighlights(course.id, e.target.value)}
                          placeholder="Daily 15-minute routines, Breathing techniques, Mindfulness practices"
                          rows={3}
                        />
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
