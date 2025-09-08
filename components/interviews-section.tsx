"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, User, Tag, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VideoModal } from "./video-modal"
import { videoData, type VideoData } from "./video-data"

export function InterviewsSection() {
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleVideoClick = (video: VideoData) => {
    setSelectedVideo(video)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedVideo(null)
  }

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-200/15 rounded-full blur-3xl animate-pulse delay-500" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Interviews
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">
                Expert Insights & Guidance
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Dive deep into Dr. Beauvais's expertise with these comprehensive interviews covering mental wellness,
              physical health, and financial abundance through Tai Chi and holistic practices.
            </p>
          </div>

          {/* Interviews Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {videoData.interviews.map((interview) => (
              <Card
                key={interview.id}
                className="group cursor-pointer hover:shadow-2xl transition-all duration-500 bg-white/90 backdrop-blur-sm border border-gray-200 hover:border-blue-300 overflow-hidden"
                onClick={() => handleVideoClick(interview)}
              >
                <CardContent className="p-0">
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={interview.thumbnail || "/placeholder.svg"}
                      alt={interview.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Background overlay */}
                    <div className="absolute inset-0 bg-black/20" />

                    {/* Play Button - Only shows on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Play className="w-8 h-8 text-blue-600 ml-1" />
                      </div>
                    </div>
                  </div>

                  {/* Interview Details */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="text-blue-600 border-blue-200">
                        {interview.level}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <User className="w-4 h-4" />
                        {interview.instructor}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                      {interview.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed mb-4">{interview.description}</p>

                    {/* Topics */}
                    <div className="mb-4">
                      <div className="flex items-center gap-1 mb-2">
                        <Tag className="w-4 h-4 text-teal-600" />
                        <span className="text-sm font-medium text-gray-700">Topics:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {interview.topics.slice(0, 3).map((topic) => (
                          <Badge key={topic} variant="secondary" className="text-xs bg-teal-100 text-teal-700">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Benefits Preview */}
                    <div className="mb-4">
                      <div className="flex items-center gap-1 mb-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-gray-700">You'll Learn:</span>
                      </div>
                      <ul className="space-y-1">
                        {interview.benefits.slice(0, 2).map((benefit) => (
                          <li key={benefit} className="text-sm text-gray-600 flex items-start gap-1">
                            <span className="text-green-500 mt-1">•</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Enroll Button */}
                    <div className="pt-4 border-t border-gray-100">
                      <a
                        href="https://www.eventbrite.com/e/tai-chi-with-dr-beauvais-to-manifest-financial-abundance-luncheon-tickets-1668941100759?aff=oddtdtcreator"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white py-2 text-sm font-semibold">
                          Enroll now
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </section>

      {/* Video Modal */}
      <VideoModal video={selectedVideo} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  )
}
