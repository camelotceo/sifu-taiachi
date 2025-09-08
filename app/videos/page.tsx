import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Clock, Users, Heart, Filter, Search, Star } from "lucide-react"
import { Input } from "@/components/ui/input"

const videoCategories = [
  { name: "All Videos", count: 48, active: true },
  { name: "Beginner", count: 16, active: false },
  { name: "Intermediate", count: 20, active: false },
  { name: "Advanced", count: 12, active: false },
  { name: "Chair Tai Chi", count: 8, active: false },
  { name: "Pain Relief", count: 14, active: false },
  { name: "Stress Relief", count: 18, active: false },
  { name: "Morning Practice", count: 10, active: false },
  { name: "Evening Practice", count: 12, active: false },
]

const freeVideos = [
  {
    id: 1,
    title: "Morning Energy Flow - Complete 25 Minute Practice",
    description:
      "Start your day with this energizing Tai Chi sequence designed to awaken your body and mind. Perfect for beginners and includes modifications for all abilities. Ready for More? Love our free classes? Dive deeper and register for live classes now designed to transform your mental, physical, and financial well-being. Back to Home to Register for live classes or online classes Perfect for beginners and includes modifications for all abilities. Ready for More? Love our free classes? Dive deeper and register for live classes now designed to transform your mental, physical, and financial well-being. Back to Home to Register for live classes or online classes",
    duration: "25:00",
    level: "Beginner",
    views: "12.3k",
    likes: "1.2k",
    category: "Morning Practice",
    thumbnail: "/placeholder.svg?height=200&width=350",
    featured: true,
  },
  {
    id: 2,
    title: "Stress Relief Breathing & Movement",
    description:
      "Powerful combination of breathing techniques and gentle movements to release tension and anxiety. Use anytime you need to reset and find calm.",
    duration: "15:30",
    level: "All Levels",
    views: "18.7k",
    likes: "2.1k",
    category: "Stress Relief",
    thumbnail: "/placeholder.svg?height=200&width=350",
    featured: true,
  },
  {
    id: 3,
    title: "Chair Tai Chi for Seniors - Full Session",
    description:
      "Complete Tai Chi practice adapted for chair use. Perfect for those with limited mobility or anyone who prefers seated practice.",
    duration: "30:45",
    level: "Senior Friendly",
    views: "25.2k",
    likes: "3.8k",
    category: "Chair Tai Chi",
    thumbnail: "/placeholder.svg?height=200&width=350",
    featured: false,
  },
  {
    id: 4,
    title: "Evening Wind Down Meditation",
    description:
      "Gentle movements and meditation to help you transition from day to night. Promotes better sleep and deep relaxation.",
    duration: "18:20",
    level: "All Levels",
    views: "9.8k",
    likes: "1.5k",
    category: "Evening Practice",
    thumbnail: "/placeholder.svg?height=200&width=350",
    featured: false,
  },
  {
    id: 5,
    title: "Lower Back Pain Relief Sequence",
    description:
      "Targeted movements specifically designed to ease lower back pain and improve spinal mobility. Gentle and therapeutic.",
    duration: "22:15",
    level: "Therapeutic",
    views: "31.5k",
    likes: "4.2k",
    category: "Pain Relief",
    thumbnail: "/placeholder.svg?height=200&width=350",
    featured: true,
  },
  {
    id: 6,
    title: "5-Minute Quick Energy Boost",
    description:
      "Short but powerful sequence for when you need a quick energy boost. Perfect for office breaks or mid-day slumps.",
    duration: "5:45",
    level: "All Levels",
    views: "14.9k",
    likes: "1.8k",
    category: "Beginner",
    thumbnail: "/placeholder.svg?height=200&width=350",
    featured: false,
  },
  {
    id: 7,
    title: "Balance & Fall Prevention Training",
    description:
      "Improve your balance and confidence with these targeted exercises. Especially beneficial for older adults.",
    duration: "28:30",
    level: "Senior Friendly",
    views: "19.3k",
    likes: "2.7k",
    category: "Beginner",
    thumbnail: "/placeholder.svg?height=200&width=350",
    featured: false,
  },
  {
    id: 8,
    title: "Advanced Flow - The Dragon Sequence",
    description:
      "Challenge yourself with this beautiful, flowing sequence that builds strength, flexibility, and coordination.",
    duration: "35:20",
    level: "Advanced",
    views: "8.1k",
    likes: "1.1k",
    category: "Advanced",
    thumbnail: "/placeholder.svg?height=200&width=350",
    featured: false,
  },
  {
    id: 9,
    title: "Arthritis-Friendly Gentle Movements",
    description:
      "Specially designed for those with arthritis or joint stiffness. All movements are gentle and can be modified as needed.",
    duration: "20:10",
    level: "Therapeutic",
    views: "16.4k",
    likes: "2.3k",
    category: "Pain Relief",
    thumbnail: "/placeholder.svg?height=200&width=350",
    featured: false,
  },
]

export default function VideosPage() {
  const featuredVideos = freeVideos.filter((video) => video.featured)
  const regularVideos = freeVideos.filter((video) => !video.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Heart className="w-16 h-16 text-pink-600 mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              Free Practice Videos
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Complete Classes, Anytime
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Access our complete library of full-length Tai Chi classes, breathing exercises, and meditation sessions.
              All free, all designed to support your wellness journey.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Play className="w-4 h-4 mr-2" />
                48 Free Videos
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Users className="w-4 h-4 mr-2" />
                500k+ Views
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Heart className="w-4 h-4 mr-2" />
                New Videos Weekly
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="pb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search videos..."
                  className="pl-10 py-3 text-lg border-purple-200 focus:border-purple-400"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2 px-6">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-8">
              {videoCategories.map((category) => (
                <Button
                  key={category.name}
                  variant={category.active ? "default" : "outline"}
                  size="sm"
                  className={`${category.active ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white" : "hover:bg-purple-50"}`}
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Videos */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
              <Star className="w-8 h-8 text-yellow-500" />
              Featured Videos
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredVideos.map((video) => (
                <Card
                  key={video.id}
                  className="group cursor-pointer hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm border-2 border-purple-200 hover:border-purple-400"
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors rounded-t-lg" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-white/95 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                          <Play className="w-8 h-8 text-purple-700 ml-1" />
                        </div>
                      </div>
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">Featured</Badge>
                      </div>
                      <div className="absolute top-3 right-3">
                        <Badge variant="secondary" className="bg-white/90 text-gray-800">
                          {video.level}
                        </Badge>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {video.duration}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-bold text-gray-800 mb-2 text-lg leading-tight">{video.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">{video.description}</p>

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {video.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {video.likes}
                          </span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {video.category}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Videos */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">All Practice Videos</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularVideos.map((video) => (
                <Card
                  key={video.id}
                  className="group cursor-pointer hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white/95"
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="w-full h-40 object-cover rounded-t-lg"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors rounded-t-lg" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                          <Play className="w-6 h-6 text-purple-700 ml-1" />
                        </div>
                      </div>
                      <div className="absolute top-2 left-2">
                        <Badge variant="secondary" className="text-xs bg-white/90">
                          {video.level}
                        </Badge>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {video.duration}
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2 text-base leading-tight line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-gray-600 text-xs mb-3 leading-relaxed line-clamp-2">{video.description}</p>

                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {video.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {video.likes}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 text-lg hover:opacity-90"
              >
                Load More Videos
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
