"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Clock, Users, Heart, Filter, Search, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { VideoModal } from "@/components/video-modal"
import { videoData } from "@/components/video-data"
import { usePageContent } from "@/hooks/use-page-content"

export default function ClassesPage() {
  const [selectedVideo, setSelectedVideo] = useState<any>(null)
  const { content, loading, error } = usePageContent("classes")

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

  const videoCategories = content?.categories || []
  const allVideos = content?.featuredClasses || []

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
                {content?.hero?.title || "Free Tai Chi Classes"}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  {content?.hero?.subtitle || "Start Your Wellness Journey Today"}
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                {content?.hero?.description || "Access our complete library of free Tai Chi classes and guided practices. Perfect for beginners and experienced practitioners alike."}
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="pb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Search classes..."
                      className="pl-10 bg-white/80 border-gray-200 focus:border-purple-500"
                    />
                  </div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filter
                  </Button>
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-2">
                  {videoCategories.map((category: any) => (
                    <Badge
                      key={category.name}
                      variant={category.active ? "default" : "secondary"}
                      className="cursor-pointer hover:bg-purple-100"
                    >
                      {category.name}
                      <span className="ml-1 text-xs opacity-70">({category.count})</span>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Classes */}
        <section className="pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Classes</h2>
                <p className="text-gray-600">Start with these popular classes designed for all levels</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allVideos.map((video: any) => (
                  <Card key={video.id} className="group hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm overflow-hidden">
                    <div className="relative">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      
                      {/* Play Button */}
                      <div
                        className="absolute inset-0 flex items-center justify-center cursor-pointer group-hover:bg-black/20 transition-colors"
                        onClick={() => setSelectedVideo(video)}
                      >
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform opacity-0 group-hover:opacity-100">
                          <Play className="w-6 h-6 text-purple-700 ml-1" />
                        </div>
                      </div>

                      {/* Video Stats */}
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{video.duration}</span>
                          </div>
                          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                            {video.level}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {video.description}
                      </p>

                      {/* Topics */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {video.topics?.slice(0, 3).map((topic: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                            {topic}
                          </Badge>
                        ))}
                      </div>

                      {/* Benefits */}
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Benefits:</h4>
                        <ul className="space-y-1">
                          {video.benefits?.slice(0, 2).map((benefit: string, index: number) => (
                            <li key={index} className="flex items-center gap-2 text-xs text-gray-600">
                              <Heart className="w-3 h-3 text-pink-500" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
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
