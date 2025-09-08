"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Award, Users, BookOpen, Heart, Star, Building2 } from "lucide-react"
import { VideoModal } from "@/components/video-modal"
import { videoData } from "@/components/video-data"

export function AboutSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  return (
    <>
      <section id="about" className="py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        {/* Hero Section */}
        <div className="pt-8 pb-16 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-4xl font-bold text-gray-800 mb-6">Meet Sifu Danielle Beauvais</h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
                      Your compassionate guide to holistic wellness through the transformative power of Tai Chi, mindful movement, and integrated healing practices.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl">
                      <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <p className="font-bold text-2xl text-gray-800">25+</p>
                      <p className="text-sm text-gray-600">Years Experience</p>
                    </div>
                    <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl">
                      <Users className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                      <p className="font-bold text-2xl text-gray-800">10,000+</p>
                      <p className="text-sm text-gray-600">Students Helped</p>
                    </div>
                    <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl">
                      <Star className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                      <p className="font-bold text-2xl text-gray-800">4.9</p>
                      <p className="text-sm text-gray-600">Average Rating</p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <Card className="overflow-hidden shadow-2xl">
                    <CardContent className="p-0">
                      <div className="relative aspect-video">
                        <img
                          src="/images/dr-danielle-intro.png"
                          alt="Dr. Danielle Beauvais teaching Tai Chi"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <div
                            onClick={() => setIsVideoOpen(true)}
                            className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer"
                          >
                            <Play className="w-8 h-8 text-purple-700 ml-1" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Biography Section */}
        <div className="py-16 bg-white/70 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <h3 className="text-3xl font-bold text-gray-800 mb-6">
                    My Journey to Wellness
                  </h3>

                  <div className="prose prose-lg text-gray-600">
                    <p className="mb-6">
                      Dr. Danielle Beauvais discovered the transformative power of Tai Chi during her own journey
                      through personal challenges with anxiety and chronic pain. What began as a search for healing
                      became a life-changing passion that has now touched thousands of lives worldwide.
                    </p>

                    <p className="mb-6">
                      With over 25 years of dedicated practice and teaching, Dr. Beauvais has developed a unique
                      approach that integrates traditional Tai Chi principles with modern therapeutic techniques. Her
                      method addresses not just physical wellness, but the interconnected nature of mental, emotional,
                      and financial well-being.
                    </p>

                    <p className="mb-6">
                      "I believe that true healing happens when we address the whole person," says Dr. Beauvais. "Tai
                      Chi taught me that our bodies, minds, and spirits are not separate entities, but parts of one
                      beautiful, integrated system that deserves our gentle attention and care."
                    </p>

                    <p>
                      Her groundbreaking work in financial wellness through mindfulness practices has helped countless
                      individuals break free from limiting beliefs about money and abundance, creating lasting change
                      that extends far beyond the practice mat.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card className="p-6 bg-gradient-to-br from-purple-100 to-pink-100">
                    <h4 className="font-bold text-gray-800 mb-4">Credentials & Training</h4>
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                        <span>Certified Tai Chi Master Instructor</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-pink-500 rounded-full mt-2" />
                        <span>Licensed Therapeutic Movement Specialist</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                        <span>Certified Mindfulness-Based Stress Reduction (MBSR)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-teal-500 rounded-full mt-2" />
                        <span>Advanced Training in Somatic Therapy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2" />
                        <span>Financial Wellness Coaching Certification</span>
                      </li>
                    </ul>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-teal-100 to-blue-100">
                    <h4 className="font-bold text-gray-800 mb-4">Published Works</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-5 h-5 text-teal-600" />
                        <div>
                          <p className="font-semibold text-sm text-gray-800">"Flowing Toward Abundance"</p>
                          <p className="text-xs text-gray-600">
                            A Guide to Financial Wellness Through Mindful Movement
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-semibold text-sm text-gray-800">"Healing in Motion"</p>
                          <p className="text-xs text-gray-600">Tai Chi for Chronic Pain and Depression</p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-green-100 to-emerald-100">
                    <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-green-600" />
                      Professional Affiliations
                    </h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                        <span>Aventura Hospital - H2U</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                        <span>Cancer Support Community of Greater Miami at Jackson North Hospital</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                        <span>Claridge House Nursing and Rehabilitation</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                        <span>City of North Miami</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                        <span>City of North Miami Beach</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                        <span>Grand Court Lakes Nursing Home</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                        <span>Hampton Court Nursing Home</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                        <span>Miami Jewish Health Systems</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                        <span>North Dade Nursing and Rehab</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                        <span>North Miami Beach Library</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                        <span>North Miami Public Library</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                        <span>Regents Park of Aventura</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                        <span>TGI Precision Adult Day Care</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
            }}
          />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <Heart className="w-16 h-16 mx-auto mb-6 text-white/80" />
              <h3 className="text-3xl font-bold mb-8">My Teaching Philosophy</h3>
              <blockquote className="text-xl italic leading-relaxed mb-8">
                "Wellness is not about perfection—it's about progress, compassion, and the courage to show up for
                yourself every day. Through gentle movement and mindful awareness, we create space for healing that
                honors both our struggles and our strength."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} video={videoData.aboutVideo} />
    </>
  )
}
