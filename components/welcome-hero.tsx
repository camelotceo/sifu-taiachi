"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Play, ArrowRight } from "lucide-react"
import Link from "next/link"
import { VideoModal } from "./video-modal"
import { videoData } from "./video-data"
import { PageContent } from "@/lib/json-content"

interface WelcomeHeroProps {
  content?: PageContent | null
}

export function WelcomeHero({ content }: WelcomeHeroProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  
  // Debug logging
  console.log("WelcomeHero: content received:", content)
  console.log("WelcomeHero: hero content:", content?.hero)
  
  // Use admin content if available, otherwise fall back to hardcoded content
  const heroTitle = content?.hero?.title || "Holistic Wellness"
  const heroSubtitle = content?.hero?.subtitle || "Discover the ancient art of Tai Chi combined with modern therapeutic practices"
  const heroDescription = content?.hero?.description || "Discover the ancient art of Tai Chi combined with modern therapeutic practices. Heal your mind, strengthen your body, and create financial abundance with Dr. Danielle Beauvais."
  const videoId = content?.hero?.videoId || videoData.heroVideo.vimeoId
  const videoThumbnail = content?.hero?.videoThumbnail || "/public/images/hero-video-thumbnail.jpg"
  
  console.log("WelcomeHero: using title:", heroTitle)

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 69, 19, 0.3), rgba(75, 0, 130, 0.4)), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
          }}
        />

        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-purple-300/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute top-40 right-20 w-48 h-48 bg-pink-300/20 rounded-full blur-xl animate-pulse delay-1000" />
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-orange-300/20 rounded-full blur-xl animate-pulse delay-2000" />
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Hero Content */}
              <div className="space-y-8 text-center lg:text-left">
                <div className="space-y-6">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400">
                      {heroTitle}
                    </span>
                  </h1>

                  <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                    {heroDescription}
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href="/classes">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                    >
                      Start Free Practice
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/courses">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg rounded-full backdrop-blur-sm bg-white/10 shadow-xl hover:shadow-2xl transition-all duration-300"
                    >
                      Explore Courses
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Hero Video */}
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-white/20 group cursor-pointer">
                  <div className="aspect-video bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center relative">
                    <img
                      src={videoThumbnail}
                      alt="Dr. Danielle Beauvais teaching Tai Chi"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />

                    {/* Play Button - Only shows on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div
                        onClick={() => setIsVideoOpen(true)}
                        className="w-24 h-24 bg-white/95 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group"
                      >
                        <Play className="w-10 h-10 text-purple-700 ml-1" />
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
                        <p className="text-white font-semibold text-sm">Welcome Message from Dr. Beauvais</p>
                        <p className="text-white/80 text-xs">Discover how Tai Chi can transform your life</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl animate-bounce">
                  ✨ Free to Start!
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        video={{
          ...videoData.heroVideo,
          vimeoId: videoId
        }}
      />
    </>
  )
}
