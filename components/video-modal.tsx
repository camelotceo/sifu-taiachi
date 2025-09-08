"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { X, Play, Clock, User, Tag, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { VideoData } from "./video-data"

interface VideoModalProps {
  video: VideoData | null
  isOpen: boolean
  onClose: () => void
}

export function VideoModal({ video, isOpen, onClose }: VideoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const getEmbedUrl = (video: VideoData) => {
    if (video.vimeoId) {
      return `https://player.vimeo.com/video/${video.vimeoId}?autoplay=1&title=0&byline=0&portrait=0`
    } else if (video.youtubeId) {
      return `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`
    }
    return ""
  }

  if (!isOpen || !video) return null

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div ref={modalRef} className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg">
              <Play className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{video.title}</h2>
              <div className="flex items-center gap-4 mt-1">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  {video.duration}
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  {video.instructor}
                </div>
                <Badge variant="outline">{video.level}</Badge>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Video Player */}
          <div className="relative aspect-video bg-black">
            <iframe
              src={getEmbedUrl(video)}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Video Details */}
          <div className="p-6 space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">About This Video</h3>
              <p className="text-gray-600 leading-relaxed">{video.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Topics Covered */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-purple-600" />
                  Topics Covered
                </h4>
                <div className="flex flex-wrap gap-2">
                  {video.topics.map((topic) => (
                    <Badge key={topic} variant="secondary" className="bg-purple-100 text-purple-700">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  What You'll Gain
                </h4>
                <ul className="space-y-2">
                  {video.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 text-center">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Ready to Transform Your Life?</h4>
              <p className="text-gray-600 mb-4">
                This is just a glimpse of what's possible. Explore our comprehensive courses for deeper transformation.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://www.eventbrite.com/e/tai-chi-with-dr-beauvais-to-manifest-financial-abundance-luncheon-tickets-1668941100759?aff=oddtdtcreator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all duration-300 inline-block text-center"
                >
                  Enroll now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
