"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Award, Users, BookOpen, Heart, Star } from "lucide-react"
import Link from "next/link"

export function AboutPreview() {
  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-8 h-8 text-red-500" />
                  <span className="text-red-600 font-semibold text-lg">Meet Your Guide</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                  Dr. Danielle Beauvais
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-red-600">
                    Your Wellness Partner
                  </span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed mb-6">
                  With over 25 years of experience, Dr. Beauvais has helped thousands of people transform their lives
                  through the gentle power of Tai Chi, mindful movement, and holistic wellness practices.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Her unique approach addresses the interconnected nature of mental, physical, and financial well-being,
                  creating lasting transformation that goes far beyond traditional fitness or therapy.
                </p>
              </div>

              {/* Credentials */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
                  <Award className="w-8 h-8 text-amber-600" />
                  <div>
                    <p className="font-bold text-2xl text-gray-800">25+</p>
                    <p className="text-sm text-gray-600">Years Experience</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
                  <Users className="w-8 h-8 text-orange-600" />
                  <div>
                    <p className="font-bold text-2xl text-gray-800">10,000+</p>
                    <p className="text-sm text-gray-600">Lives Changed</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
                  <Star className="w-8 h-8 text-red-600" />
                  <div>
                    <p className="font-bold text-2xl text-gray-800">4.9</p>
                    <p className="text-sm text-gray-600">Student Rating</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
                  <BookOpen className="w-8 h-8 text-purple-600" />
                  <div>
                    <p className="font-bold text-2xl text-gray-800">2</p>
                    <p className="text-sm text-gray-600">Published Books</p>
                  </div>
                </div>
              </div>

              {/* Philosophy Quote */}
              <Card className="bg-gradient-to-r from-amber-100 to-orange-100 border-amber-200">
                <CardContent className="p-6">
                  <blockquote className="text-lg italic text-gray-700 leading-relaxed">
                    "Wellness is not about perfection—it's about progress, compassion, and the courage to show up for
                    yourself every day. Through gentle movement and mindful awareness, we create space for healing that
                    honors both our struggles and our strength."
                  </blockquote>
                  <p className="text-amber-700 font-semibold mt-4">— Dr. Danielle Beauvais</p>
                </CardContent>
              </Card>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/about">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white px-8 py-3"
                  >
                    Learn More About Dr. Beauvais
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-amber-600 text-amber-700 hover:bg-amber-50 px-8 py-3"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Read Her Books
                </Button>
              </div>
            </div>

            {/* Video/Image */}
            <div className="relative">
              <Card className="overflow-hidden shadow-2xl bg-gradient-to-br from-amber-100 to-orange-100">
                <CardContent className="p-0">
                  <div className="relative aspect-[4/5]">
                    <img
                      src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                      alt="Dr. Danielle Beauvais"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="w-20 h-20 bg-white/95 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer">
                        <Play className="w-8 h-8 text-amber-700 ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
                        <p className="text-white font-semibold text-sm">Personal Message from Dr. Beauvais</p>
                        <p className="text-white/80 text-xs">Discover her journey and philosophy</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Floating Testimonial */}
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-2xl max-w-xs">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 italic mb-2">
                  "Dr. Beauvais changed my life. Her compassionate approach made all the difference."
                </p>
                <p className="text-xs text-gray-500 font-semibold">— Sarah M., Student</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
