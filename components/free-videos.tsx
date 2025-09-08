"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Clock, Users, Heart, Star, Zap } from "lucide-react"
import Link from "next/link"
import { VideoModal } from "./video-modal"
import { videoData } from "./video-data"

export function FreeVideos() {
  const [selectedVideo, setSelectedVideo] = useState<any>(null)

  return (
    <>
      <section id="free-practice-classes" className="py-20 bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <div className="flex justify-center items-center gap-3 mb-6">
              <Heart className="w-12 h-12 text-pink-600" />
              <Zap className="w-12 h-12 text-teal-600" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Free Practice Classes
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-purple-600">
                Complete Sessions, Always Free
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Access our complete library of full-length Tai Chi classes, breathing exercises, and meditation sessions.
              All free, all designed to support your wellness journey wherever you are.
            </p>

            {/* Stats */}
            
          </div>

          {/* Vimeo Showcase Embed - Full Width with Increased Height */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3 text-center justify-center">
              <Play className="w-8 h-8 text-teal-600" />
              Complete Video Library
            </h3>
            <div className="w-full">
              <Card className="bg-white/90 backdrop-blur-sm border-2 border-teal-200 shadow-2xl overflow-hidden">
                <CardContent className="p-0">
                  <div style={{ padding: "73.125% 0 0 0", position: "relative" }}>
                    <iframe
                      src="https://vimeo.com/showcase/11800481/embed2"
                      allowFullScreen
                      frameBorder="0"
                      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                      title="Free Tai Chi Classes Showcase"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Featured Classes */}
          

        </div>
      </section>

      {selectedVideo && (
        <VideoModal isOpen={!!selectedVideo} onClose={() => setSelectedVideo(null)} video={selectedVideo} />
      )}
    </>
  )
}
