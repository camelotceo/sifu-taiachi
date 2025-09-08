"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Heart, DollarSign, Star, Users, Clock, CheckCircle, ArrowRight, Play, X } from "lucide-react"
import Link from "next/link"
import { VideoModal } from "./video-modal"
import { videoData } from "./video-data"

const courses = [
  {
    id: "mental-health",
    title: "Mental Health Mastery",
    subtitle: "Develop a personalized practice for mental resilience and healing",
    icon: Brain,
    color: "purple",
    price: 99,
    originalPrice: 149,
    duration: "8 weeks",
    lessons: 24,
    students: 2847,
    rating: 5,
    description: "The objective of this transformative 5-hours Mental Health Mastery Seminar (lunch included) is to introduce Tai Chi, Chi Gong as a supportive method of exercise to the 450,000.000 plus people on antidepressant or in need of better mental health in order to revolutionize the relationship between mental and emotional well-being.",
    highlights: [
      "Daily 7-15-minute morning routines for anxiety relief",
      "Breathing techniques to control invisible energy",
      "The rewire of your energetic body for panic attack",
      "Conscious control to shape your reality",
      "Mindfulness Tai Chi practices for emotional regulation",
    ],
    videoData: videoData.courseVideos["mental-health"],
  },
  {
    id: "physical-health",
    title: "Physical Wellness and Healing",
    subtitle: "Gentle Healing for Body & Spirit",
    icon: Heart,
    color: "pink",
    price: 99,
    originalPrice: 149,
    duration: "10 weeks",
    lessons: 30,
    students: 3521,
    rating: 5,
    description:
      "Experience the gentle power of Tai Chi for physical healing. Perfect for seniors, those with chronic pain, or anyone seeking a sustainable approach to fitness and flexibility.",
    highlights: [
      "Chair-based modifications available",
      "Pain relief for common conditions",
      "Balance and fall prevention exercises",
      "Gentle strength building",
    ],
    videoData: videoData.courseVideos["physical-health"],
  },
  {
    id: "financial-health",
    title: "Financial Abundance Mindset",
    subtitle: "Wealth Consciousness Through Wellness",
    icon: DollarSign,
    color: "teal",
    price: 99,
    originalPrice: 149,
    duration: "6 weeks",
    lessons: 18,
    students: 1893,
    rating: 5,
    description:
      "Revolutionary approach combining mindfulness with financial wellness. Break through money blocks and create abundance.",
    highlights: [
      "Identify and release money blocks",
      "Abundance meditation practices",
      "Mindful money management",
      "Wealth visualization techniques",
    ],
    videoData: videoData.courseVideos["financial-health"],
  },
]

export function CoursesPreview() {
  const [selectedVideo, setSelectedVideo] = useState<any>(null)
  const [showInterviewModal, setShowInterviewModal] = useState(false)

  return (
    <>
      <section id="transformation-courses" className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-indigo-200/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <div className="flex justify-center items-center gap-3 mb-6">
              <Brain className="w-12 h-12 text-purple-600" />
              <Heart className="w-12 h-12 text-pink-600" />
              <DollarSign className="w-12 h-12 text-teal-600" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Comprehensive Wellness
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-teal-600">
                Transformation Courses
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Structured programs designed to create lasting change in your mental, physical, and financial well-being.
              Each course combines ancient wisdom with cutting edge science.
            </p>

            {/* Course Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                <Users className="w-5 h-5 text-purple-600" />
                <span className="font-bold text-gray-800">8,000+ Students</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-bold text-gray-800">5.0 Avg Rating</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-bold text-gray-800">30-Day Guarantee</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {courses.map((course) => {
              const IconComponent = course.icon
              const colorClasses = {
                purple: "from-purple-500 to-purple-600 border-purple-200 bg-purple-50",
                pink: "from-pink-500 to-pink-600 border-pink-200 bg-pink-50",
                teal: "from-teal-500 to-teal-600 border-teal-200 bg-teal-50",
              }

              return (
                <Card
                  key={course.id}
                  className="group hover:shadow-2xl transition-all duration-500 bg-white/90 backdrop-blur-sm border-2 border-transparent hover:border-purple-300 overflow-hidden"
                >
                  <div className="relative">
                    <a
                      href="https://www.eventbrite.com/e/tai-chi-with-dr-beauvais-to-manifest-financial-abundance-luncheon-tickets-1668941100759?aff=oddtdtcreator"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <img
                        src={course.videoData.thumbnail || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-48 object-cover"
                      />
                    </a>
                  </div>

                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-br ${colorClasses[course.color as keyof typeof colorClasses].split(" ")[0]} ${colorClasses[course.color as keyof typeof colorClasses].split(" ")[1]} flex items-center justify-center`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-gray-800">{course.title}</CardTitle>
                        <p className="text-sm text-gray-600">{course.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{course.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Highlights */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Key Benefits:</h4>
                      <ul className="space-y-2">
                        {course.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Pricing */}
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-2xl font-bold text-gray-800">${course.price}</span>
                          <span className="text-lg text-gray-400 line-through ml-2">${course.originalPrice}</span>
                        </div>
                        <Badge variant="destructive" className="text-xs font-bold">
                          SAVE $50
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <Button
                          onClick={() => setShowInterviewModal(true)}
                          className={`w-full bg-gradient-to-r ${colorClasses[course.color as keyof typeof colorClasses].split(" ")[0]} ${colorClasses[course.color as keyof typeof colorClasses].split(" ")[1]} hover:opacity-90 text-white py-3 group`}
                        >
                          Enroll
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white border-0 shadow-2xl">
              <CardContent className="p-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Transform Your Entire Life</h3>
                <p className="text-purple-100 mb-6 text-lg max-w-2xl mx-auto">
                  Don't just treat symptoms—address the root causes. Our holistic approach creates lasting change in all
                  areas of your life.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {selectedVideo && (
        <VideoModal isOpen={!!selectedVideo} onClose={() => setSelectedVideo(null)} video={selectedVideo} />
      )}

      {/* Interview Modal */}
      {showInterviewModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg">
                  <Play className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Interview Videos</h2>
                  <p className="text-sm text-gray-600">Watch these interviews to learn more about our courses</p>
                </div>
              </div>
              <button
                onClick={() => setShowInterviewModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videoData.interviews.map((interview) => (
                  <div key={interview.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                    <div className="relative">
                      <img
                        src={interview.thumbnail}
                        alt={interview.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center shadow-2xl">
                          <Play className="w-6 h-6 text-purple-700 ml-1" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">{interview.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{interview.description}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{interview.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* CTA */}
              <div className="mt-8 text-center">
                <a
                  href="https://www.eventbrite.com/e/tai-chi-with-dr-beauvais-to-manifest-financial-abundance-luncheon-tickets-1668941100759?aff=oddtdtcreator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 inline-block"
                >
                  Enroll Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
