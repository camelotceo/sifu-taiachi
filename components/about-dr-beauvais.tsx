"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, BookOpen, Award, Heart, Users } from "lucide-react"

export function AboutDrBeauvais() {
  return (
    <section className="py-20 bg-gradient-to-b from-sage-50 to-ocean-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Heart className="w-12 h-12 text-sage-500 mx-auto mb-4" />
            <h2 className="text-4xl font-light text-sage-800 mb-4">Meet Dr. Danielle Beauvais</h2>
            <p className="text-xl text-sage-600 max-w-2xl mx-auto">
              Your guide to holistic wellness through the ancient art of Tai Chi and modern therapeutic practices
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Video Introduction */}
            <div className="order-2 lg:order-1">
              <Card className="overflow-hidden shadow-2xl bg-white/90 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-gradient-to-br from-sage-200 to-ocean-200">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                          <Play className="w-8 h-8 text-sage-700 ml-1" />
                        </div>
                        <p className="text-sage-700 font-medium">Personal Introduction from Dr. Beauvais</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* About Content */}
            <div className="order-1 lg:order-2 space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-light text-sage-800">Healing Through Movement & Mindfulness</h3>
                <p className="text-sage-600 leading-relaxed">
                  Dr. Danielle Beauvais brings over two decades of experience in holistic wellness, combining
                  traditional Tai Chi with modern therapeutic approaches. Her unique methodology addresses the
                  interconnected nature of mental, physical, and financial well-being.
                </p>
                <p className="text-sage-600 leading-relaxed">
                  Having helped thousands of students overcome depression, chronic pain, and financial stress, Dr.
                  Beauvais believes that true wellness comes from nurturing all aspects of our lives with compassion and
                  gentle persistence.
                </p>
              </div>

              {/* Credentials */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-lg">
                  <Award className="w-6 h-6 text-sage-600" />
                  <div>
                    <p className="font-semibold text-sage-800">20+ Years</p>
                    <p className="text-sm text-sage-600">Teaching Experience</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-lg">
                  <Users className="w-6 h-6 text-ocean-600" />
                  <div>
                    <p className="font-semibold text-sage-800">5000+</p>
                    <p className="text-sm text-sage-600">Students Helped</p>
                  </div>
                </div>
              </div>

              {/* Philosophy */}
              <div className="bg-white/60 backdrop-blur-sm p-6 rounded-lg border border-sage-200">
                <h4 className="font-semibold text-sage-800 mb-3">My Philosophy</h4>
                <p className="text-sage-600 italic leading-relaxed">
                  "Wellness is not a destination but a gentle journey of self-discovery. Through mindful movement and
                  compassionate self-care, we can transform not just our bodies, but our entire relationship with life
                  itself."
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-sage-600 hover:bg-sage-700 text-white px-6 py-3 rounded-full flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Read My Book
                </Button>
                <Button
                  variant="outline"
                  className="border-ocean-300 text-ocean-700 hover:bg-ocean-50 px-6 py-3 rounded-full"
                >
                  View All Courses
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
