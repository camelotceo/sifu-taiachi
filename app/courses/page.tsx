"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Heart, DollarSign, Clock, Users, Star, CheckCircle, Play } from "lucide-react"
import Link from "next/link"
import { VideoModal } from "@/components/video-modal"
import { videoData } from "@/components/video-data"
import { usePageContent } from "@/hooks/use-page-content"

export default function CoursesPage() {
  const [selectedVideo, setSelectedVideo] = useState<any>(null)
  const { content, loading, error } = usePageContent("courses")

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p>Loading content...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error loading content: {error}</p>
        </div>
      </div>
    )
  }

  const courses = content?.courses || []

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        {/* Hero Section */}
        <section className="pt-24 pb-16 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-6xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-gray-800 mb-6">
                {content?.hero?.title || "Transform Your Life"}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  {content?.hero?.subtitle || "Through Holistic Wellness"}
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                {content?.hero?.description || "Discover our comprehensive wellness programs designed to heal your mind, strengthen your body, and create financial abundance through the ancient wisdom of Tai Chi."}
              </p>
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-8">
                {courses.map((course: any) => {
                  const Icon = course.icon === "Brain" ? Brain : course.icon === "Heart" ? Heart : DollarSign
                  return (
                    <Card key={course.id} className="bg-white/90 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
                      <CardHeader className="relative">
                        <div className="absolute top-4 right-4">
                          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                            {course.level}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-${course.color}-500 to-${course.color}-600 text-white`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <CardTitle className="text-xl font-bold text-gray-800">{course.title}</CardTitle>
                            <p className="text-sm text-gray-600">{course.subtitle}</p>
                          </div>
                        </div>
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <p className="text-gray-600 leading-relaxed">{course.description}</p>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Course Stats */}
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <Clock className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                            <p className="text-sm font-semibold text-gray-800">{course.duration}</p>
                            <p className="text-xs text-gray-500">Duration</p>
                          </div>
                          <div>
                            <Users className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                            <p className="text-sm font-semibold text-gray-800">{course.students}</p>
                            <p className="text-xs text-gray-500">Students</p>
                          </div>
                          <div>
                            <Star className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                            <p className="text-sm font-semibold text-gray-800">{course.rating}</p>
                            <p className="text-xs text-gray-500">Rating</p>
                          </div>
                        </div>

                        {/* Highlights */}
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3">What You'll Learn:</h4>
                          <ul className="space-y-2">
                            {course.highlights?.slice(0, 3).map((highlight: string, index: number) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-600">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Pricing */}
                        <div className="border-t pt-4">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <span className="text-2xl font-bold text-gray-800">${course.price}</span>
                              <span className="text-sm text-gray-500 line-through ml-2">${course.originalPrice}</span>
                            </div>
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                            </Badge>
                          </div>
                          <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                            Enroll Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      </div>

             <VideoModal
         isOpen={!!selectedVideo}
         onClose={() => setSelectedVideo(null)}
         video={selectedVideo || videoData.heroVideo}
       />
    </>
  )
}
