"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { videoData } from "./video-data"
import { PageContent } from "@/lib/json-content"

interface SuccessStoriesProps {
  content?: PageContent | null
}

export function SuccessStories({ content }: SuccessStoriesProps) {
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null)
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)
  const [mutedVideos, setMutedVideos] = useState<{ [key: string]: boolean }>({})
  const [isMobile, setIsMobile] = useState(false)
  const videoRefs = useRef<{ [key: string]: HTMLIFrameElement | null }>({})

  useEffect(() => {
    // Detect mobile devices
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || "ontouchstart" in window)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleVideoInteraction = (videoId: string, action: "play" | "pause" | "toggle-mute") => {
    const iframe = videoRefs.current[videoId]
    if (!iframe) return

    switch (action) {
      case "play":
        setPlayingVideo(videoId)
        // Play with sound
        iframe.contentWindow?.postMessage('{"method":"setVolume","value":1}', "*")
        iframe.contentWindow?.postMessage('{"method":"play"}', "*")
        setMutedVideos((prev) => ({ ...prev, [videoId]: false }))
        break
      case "pause":
        setPlayingVideo(null)
        iframe.contentWindow?.postMessage('{"method":"pause"}', "*")
        break
      case "toggle-mute":
        const isMuted = mutedVideos[videoId] || false
        const newMutedState = !isMuted
        setMutedVideos((prev) => ({ ...prev, [videoId]: newMutedState }))
        iframe.contentWindow?.postMessage(`{"method":"setVolume","value":${newMutedState ? 0 : 1}}`, "*")
        break
    }
  }

  const handleMouseEnter = (videoId: string) => {
    if (isMobile) return // Don't auto-play on mobile
    setHoveredVideo(videoId)
    handleVideoInteraction(videoId, "play")
  }

  const handleMouseLeave = (videoId: string) => {
    if (isMobile) return // Don't auto-pause on mobile
    setHoveredVideo(null)
    handleVideoInteraction(videoId, "pause")
  }

  const handleClick = (videoId: string) => {
    if (playingVideo === videoId) {
      handleVideoInteraction(videoId, "pause")
    } else {
      // Pause any other playing video first
      if (playingVideo) {
        handleVideoInteraction(playingVideo, "pause")
      }
      handleVideoInteraction(videoId, "play")
    }
  }

  const handleMuteToggle = (videoId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    handleVideoInteraction(videoId, "toggle-mute")
  }

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-200/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Real Stories,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Real Transformations
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Watch authentic testimonials from students who have transformed their lives through Dr. Beauvais's holistic
            wellness approach. These are real people sharing their genuine experiences.
          </p>
          {isMobile && <p className="text-sm text-gray-500 mt-4 italic">Tap any video to play with sound</p>}
        </div>

        {/* Success Stories Grid - Updated for 5 videos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {videoData.successStories.map((story) => (
            <Card
              key={story.id}
              className="group relative overflow-hidden bg-white/90 backdrop-blur-sm border border-gray-200 hover:border-purple-300 transition-all duration-500 hover:shadow-2xl cursor-pointer"
              onMouseEnter={() => handleMouseEnter(story.id)}
              onMouseLeave={() => handleMouseLeave(story.id)}
              onClick={() => handleClick(story.id)}
            >
              <CardContent className="p-0">
                {/* Video Container - Portrait Aspect Ratio */}
                <div className="relative aspect-[9/16] overflow-hidden">
                  {/* Thumbnail Image */}
                  <img
                    src={story.thumbnail || "/placeholder.svg"}
                    alt={story.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                      playingVideo === story.id ? "opacity-0" : "opacity-100"
                    }`}
                  />

                  {/* Vimeo Iframe - Updated for audio support */}
                  <iframe
                    ref={(el) => {
                      videoRefs.current[story.id] = el
                    }}
                    src={`https://player.vimeo.com/video/${story.vimeoId}?autoplay=0&loop=1&byline=0&title=0&portrait=0&muted=0&controls=0&background=0`}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
                      playingVideo === story.id ? "opacity-100" : "opacity-0"
                    }`}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />

                  {/* Play/Pause Overlay */}
                  <div
                    className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 ${
                      (hoveredVideo === story.id && !isMobile) || playingVideo === story.id
                        ? "opacity-0"
                        : "opacity-100"
                    }`}
                  >
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                      <Play className="w-6 h-6 text-purple-600 ml-1" />
                    </div>
                  </div>

                  {/* Video Controls Overlay */}
                  {playingVideo === story.id && (
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                      {/* Playing Indicator */}
                      <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <Volume2 className="w-3 h-3" />
                        LIVE
                      </div>

                      {/* Mute/Unmute Button */}
                      <button
                        onClick={(e) => handleMuteToggle(story.id, e)}
                        className="bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-full transition-colors"
                        aria-label={mutedVideos[story.id] ? "Unmute video" : "Mute video"}
                      >
                        {mutedVideos[story.id] ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                      </button>
                    </div>
                  )}

                  {/* Mobile Play/Pause Button */}
                  {isMobile && (
                    <div className="absolute bottom-3 right-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleClick(story.id)
                        }}
                        className="bg-white/90 backdrop-blur-sm text-purple-600 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                        aria-label={playingVideo === story.id ? "Pause video" : "Play video"}
                      >
                        {playingVideo === story.id ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4 ml-0.5" />
                        )}
                      </button>
                    </div>
                  )}

                  {/* Video Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <div className="flex items-center gap-1 mb-1">
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
                        {story.duration}
                      </Badge>
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
                        {story.level}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Story Details */}
                <div className="p-4">
                  <h3 className="text-sm font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                    {story.title}
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed mb-3 line-clamp-3">{story.description}</p>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {story.topics.slice(0, 2).map((topic) => (
                      <Badge key={topic} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>

                  {/* Benefits */}
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-gray-700 mb-1">Key Benefits:</p>
                    {story.benefits.slice(0, 2).map((benefit) => (
                      <p key={benefit} className="text-xs text-gray-600 flex items-start gap-1">
                        <span className="text-purple-500 mt-0.5">•</span>
                        <span className="line-clamp-1">{benefit}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Write Your Own Success Story?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of students who have transformed their lives through Dr. Beauvais's proven holistic wellness
            approach. Your transformation story could be next.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
              Start Your Journey Today
            </button>
            <button className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-600 hover:text-white transition-all duration-300">
              Explore Our Courses
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
