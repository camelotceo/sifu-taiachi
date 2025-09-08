"use client"

import { useState, use } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Heart, DollarSign, Users, Star, CheckCircle, Play, Award } from "lucide-react"
import { notFound } from "next/navigation"
import { VideoModal } from "@/components/video-modal"
import { videoData } from "@/components/video-data"

const courseData = {
  "mental-health": {
    title: "Mental Health Mastery",
    subtitle: "Develop a personalized practice for mental resilience and healing",
    icon: Brain,
    color: "purple",
    price: 99,
    originalPrice: 149,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    duration: "8 weeks",
    lessons: 24,
    students: 2847,
    rating: 4.9,
    level: "All Levels",
    description:
      "Discover the profound connection between mindful movement and mental wellness. This comprehensive course combines ancient Tai Chi wisdom with modern therapeutic techniques to help you overcome anxiety, depression, and stress.",
    longDescription:
      "Discover the profound connection between Tai Chi’s mindful movement and mental wellness. This comprehensive Master course combines ancient Tai Chi wisdom with modern therapeutic techniques to help you overcome anxiety, depression, stress, PTSD, Trauma, Burnout / Fatigue.",
    instructor: "Dr. Danielle Beauvais",
    modules: [
      {
        title: "Foundation: Understanding the Mind-Body Connection",
        duration: "45 min",
        lessons: 3,
        description:
          "Mental illness as a dysfunction of Qi (life force) flow and nervous system dysregulation. The role of breathing in healing.",
      },
      {
        title: "Breath as Medicine: Therapeutic Breathing Techniques",
        duration: "60 min",
        lessons: 4,
        description:
          "Master powerful breathing techniques that can instantly calm anxiety and regulate your nervous system.",
      },
      {
        title: "Moving Through Emotions: Tai Chi for Mood Regulation",
        duration: "75 min",
        lessons: 4,
        description: "Learn specific Tai Chi sequences designed to process and transform difficult emotions.",
      },
      {
        title: "Mindful Awareness: Present-Moment Practices",
        duration: "50 min",
        lessons: 3,
        description:
          "Develop the skill of mindful awareness to break free from anxious thoughts and depressive patterns.",
      },
      {
        title: "Stress Transformation: From Tension to Flow",
        duration: "65 min",
        lessons: 4,
        description:
          "Transform your relationship with stress through movement-based practices and cognitive reframing.",
      },
      {
        title: "Building Your Daily Practice",
        duration: "40 min",
        lessons: 2,
        description:
          "Create a sustainable daily practice that fits your lifestyle and supports long-term mental wellness.",
      },
      {
        title: "Advanced Techniques for Difficult Emotions",
        duration: "55 min",
        lessons: 2,
        description: "Advanced practices for working with trauma, grief, and other challenging emotional states.",
      },
      {
        title: "Integration: Living Your New Mental Wellness",
        duration: "35 min",
        lessons: 2,
        description: "Integrate everything you've learned into a comprehensive approach to mental wellness.",
      },
      {
        title: "Mental Rewiring & Self-Healing Blueprint",
        duration: "35 min",
        lessons: 2,
        description: "Experience how mind-body practices recalibrate your system.",
      }
    ],
    benefits: [
      "Reduce anxiety and depression symptoms by up to 60%",
      "Develop emotional resilience and stress management skills",
      "Learn evidence-based techniques for panic attack management",
      "Create a sustainable daily practice for mental wellness",
      "Build confidence and self-compassion through gentle movement",
      "Access to private community forum for ongoing support",
      "Lifetime access to all course materials and updates",
      "30-day money-back guarantee",
    ],
    testimonials: [
      {
        name: "Sarah M.",
        rating: 5,
        text: "This course literally saved my life. I was struggling with severe anxiety and depression, and Dr. Beauvais's approach gave me tools I use every single day. I feel like myself again.",
      },
      {
        name: "Michael R.",
        rating: 5,
        text: "As a veteran dealing with PTSD, I was skeptical about Tai Chi. But the combination of movement and mindfulness has been more effective than years of traditional therapy.",
      },
    ],
    videos: videoData.courseDetailVideos["mental-health"],
  },
  "physical-health": {
    title: "Physical Wellness and Healing",
    subtitle: "Gentle Healing for Body & Spirit",
    icon: Heart,
    color: "pink",
    price: 99,
    originalPrice: 149,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    duration: "10 weeks",
    lessons: 30,
    students: 3521,
    rating: 4.8,
    level: "Beginner Friendly",
    description:
      "Experience the gentle power of Tai Chi for physical healing. Perfect for seniors, those with chronic pain, or anyone seeking a sustainable approach to fitness and flexibility.",
    longDescription:
      "The Physical Wellness and Healing is a comprehensive 10-week program designed specifically for those seeking gentle, effective healing for their bodies. Whether you're dealing with chronic pain, recovering from injury, or simply want to maintain your physical health as you age, this course provides safe, accessible practices that honor your body's wisdom.",
    instructor: "Dr. Danielle Beauvais",
    modules: [
      {
        title: "Getting Started: Safety and Modifications",
        duration: "40 min",
        lessons: 3,
        description: "Learn proper form, safety guidelines, and how to modify movements for your unique needs to improve balance, flexibility, strength, and coordination through its slow, controlled movements. ",
      },
      {
        title: "Foundation Movements: Building Your Base",
        duration: "55 min",
        lessons: 4,
        description: "Master the fundamental Tai Chi movements that form the foundation of all practices.",
      },
      {
        title: "Balance and Stability Training",
        duration: "50 min",
        lessons: 3,
        description: "Improve balance and prevent falls with targeted exercises and techniques.",
      },
      {
        title: "Gentle Strength and Flexibility",
        duration: "60 min",
        lessons: 4,
        description: "Build functional strength and flexibility without strain or impact.",
      },
      {
        title: "Pain Relief Sequences",
        duration: "70 min",
        lessons: 4,
        description: "Specific sequences for common pain conditions including back pain, arthritis, and fibromyalgia.",
      },
      {
        title: "Energy Flow and Vitality",
        duration: "45 min",
        lessons: 3,
        description: "Learn to cultivate and direct your body's natural energy for increased vitality.",
      },
      {
        title: "Advanced Movements and Combinations",
        duration: "65 min",
        lessons: 3,
        description: "Progress to more complex movements as your strength and confidence grow.",
      },
      {
        title: "Chair Tai Chi Adaptations",
        duration: "40 min",
        lessons: 2,
        description: "Complete Tai Chi practice adapted for those with limited mobility or who prefer seated practice.",
      },
      {
        title: "Creating Your Personal Practice",
        duration: "35 min",
        lessons: 2,
        description: "Design a personalized practice routine that fits your schedule and physical needs.",
      }
    ],
    benefits: [
      "Reduce chronic pain by up to 70% within 8 weeks",
      "Improve balance and reduce fall risk by 50%",
      "Increase flexibility and range of motion safely",
      "Build functional strength without joint stress",
      "Boost energy levels and overall vitality",
      "Chair-based modifications for all abilities",
      "Lifetime access to all course materials",
      "30-day money-back guarantee",
    ],
    testimonials: [
      {
        name: "Robert K.",
        rating: 5,
        text: "At 68 with chronic back pain, I thought my active days were over. This course gave me my life back. I'm pain-free and more flexible than I've been in decades.",
      },
      {
        name: "Maria L.",
        rating: 5,
        text: "The chair modifications were perfect for my arthritis. I can do a full practice even on my worst days, and it always makes me feel better.",
      },
    ],
    videos: videoData.courseDetailVideos["physical-health"],
  },
  "financial-health": {
    title: "Financial Abundance Mindset",
    subtitle: "Wealth Consciousness Through Wellness",
    icon: DollarSign,
    color: "teal",
    price: 99,
    originalPrice: 149,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    duration: "6 weeks",
    lessons: 18,
    students: 1893,
    rating: 4.7,
    level: "All Levels",
    description:
      "Revolutionary approach combining mindfulness practices with financial wellness. Break through money blocks and create a healthy, abundant relationship with wealth.",
    longDescription:
      "Financial Abundance Mindset is a groundbreaking 6-week program that addresses the often-overlooked connection between our physical and emotional well-being and our financial health. Through mindful movement, meditation, and practical exercises, you'll uncover and transform the deep-seated beliefs that may be blocking your path to financial abundance.",
    instructor: "Dr. Danielle Beauvais",
    modules: [
      {
        title: "Understanding Your Money Story",
        duration: "50 min",
        lessons: 3,
        description: "Uncover the unconscious beliefs and patterns that shape your relationship with money.",
      },
      {
        title: "Releasing Financial Fears and Blocks",
        duration: "60 min",
        lessons: 3,
        description: "Use movement and breathwork to release deep-seated fears and limiting beliefs about money.",
      },
      {
        title: "Abundance Mindset Cultivation",
        duration: "55 min",
        lessons: 3,
        description: "Develop a genuine sense of abundance through mindfulness practices and cognitive reframing.",
      },
      {
        title: "Mindful Money Management",
        duration: "65 min",
        lessons: 3,
        description: "Learn to make financial decisions from a place of calm awareness rather than fear or impulse.",
      },
      {
        title: "Wealth Visualization and Manifestation",
        duration: "45 min",
        lessons: 3,
        description: "Powerful visualization techniques combined with Tai Chi movements to align with financial goals.",
      },
      {
        title: "Creating Your Financial Wellness Plan",
        duration: "40 min",
        lessons: 3,
        description: "Integrate everything you've learned into a comprehensive plan for ongoing financial wellness.",
      },
    ],
    benefits: [
      "Identify and release limiting beliefs about money",
      "Develop a healthy, abundant relationship with wealth",
      "Learn mindful approaches to spending and saving",
      "Create clear financial goals aligned with your values",
      "Reduce financial stress and anxiety",
      "Access to wealth-building meditation library",
      "Lifetime access to all course materials",
      "30-day money-back guarantee",
    ],
    testimonials: [
      {
        name: "Jennifer T.",
        rating: 5,
        text: "I never connected my money problems to my mindset before. This course helped me break through blocks I didn't even know I had. My income has doubled in 6 months.",
      },
      {
        name: "David H.",
        rating: 5,
        text: "The combination of movement and financial education was brilliant. I finally feel confident about money instead of anxious and overwhelmed.",
      },
    ],
    videos: videoData.courseDetailVideos["financial-health"],
  },
}

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [selectedVideo, setSelectedVideo] = useState<any>(null)
  const resolvedParams = use(params)
  const course = courseData[resolvedParams.id as keyof typeof courseData]

  if (!course) {
    notFound()
  }

  const IconComponent = course.icon
  const colorClasses = {
    purple: "from-purple-500 to-purple-600 border-purple-200 text-purple-600",
    pink: "from-pink-500 to-pink-600 border-pink-200 text-pink-600",
    teal: "from-teal-500 to-teal-600 border-teal-200 text-teal-600",
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-teal-50">
        {/* Hero Section */}
        <section className="pt-24 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${colorClasses[course.color as keyof typeof colorClasses].split(" ")[0]} ${colorClasses[course.color as keyof typeof colorClasses].split(" ")[1]} flex items-center justify-center`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <Badge
                        className={`${colorClasses[course.color as keyof typeof colorClasses].split(" ")[3]} mb-2`}
                      >
                        {course.level}
                      </Badge>
                      <h1 className="text-4xl font-bold text-gray-800">{course.title}</h1>
                      <p className="text-xl text-gray-600">{course.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-lg text-gray-600 leading-relaxed">{course.longDescription}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-white/80 backdrop-blur-sm rounded-lg">
                      <Play className="w-6 h-6 text-pink-600 mx-auto mb-1" />
                      <p className="font-bold text-gray-800">{course.lessons}</p>
                      <p className="text-xs text-gray-600">Lessons</p>
                    </div>
                    <div className="text-center p-3 bg-white/80 backdrop-blur-sm rounded-lg">
                      <Users className="w-6 h-6 text-teal-600 mx-auto mb-1" />
                      <p className="font-bold text-gray-800">{course.students.toLocaleString()}</p>
                      <p className="text-xs text-gray-600">Students</p>
                    </div>
                    <div className="text-center p-3 bg-white/80 backdrop-blur-sm rounded-lg">
                      <Star className="w-6 h-6 text-orange-600 mx-auto mb-1" />
                      <p className="font-bold text-gray-800">{course.rating}</p>
                      <p className="text-xs text-gray-600">Rating</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold text-gray-800">${course.price}</span>
                      <span className="text-xl text-gray-400 line-through">${course.originalPrice}</span>
                      <Badge variant="destructive">33% OFF</Badge>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    {(resolvedParams.id === 'financial-health' || resolvedParams.id === 'physical-health' || resolvedParams.id === 'mental-health') ? (
                      <Button
                        size="lg"
                        className={`bg-gradient-to-r ${colorClasses[course.color as keyof typeof colorClasses].split(" ")[0]} ${colorClasses[course.color as keyof typeof colorClasses].split(" ")[1]} hover:opacity-90 text-white px-8`}
                        onClick={() => window.open('https://www.eventbrite.com/e/tai-chi-with-dr-beauvais-to-manifest-financial-abundance-luncheon-tickets-1668941100759?aff=oddtdtcreator', '_blank')}
                      >
                        Enroll Now - ${course.price}
                      </Button>
                    ) : (
                      <Button
                        size="lg"
                        className={`bg-gradient-to-r ${colorClasses[course.color as keyof typeof colorClasses].split(" ")[0]} ${colorClasses[course.color as keyof typeof colorClasses].split(" ")[1]} hover:opacity-90 text-white px-8`}
                      >
                        Enroll Now - ${course.price}
                      </Button>
                    )}
                    <Button size="lg" variant="outline" className="px-8">
                      Join our Membership for 30% off
online classes.
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  <Card className="overflow-hidden shadow-2xl">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          className="w-full h-80 object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <div
                            onClick={() =>
                              setSelectedVideo(videoData.courseVideos[resolvedParams.id as keyof typeof videoData.courseVideos])
                            }
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
        </section>

        {/* Course Content */}
        <section className="pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <Tabs defaultValue="curriculum" className="w-full">
                <TabsList className={`grid w-full ${(resolvedParams.id === 'financial-health' || resolvedParams.id === 'physical-health' || resolvedParams.id === 'mental-health') ? 'grid-cols-2' : 'grid-cols-4'} mb-8`}>
                  <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                  {(resolvedParams.id !== 'financial-health' && resolvedParams.id !== 'physical-health' && resolvedParams.id !== 'mental-health') && <TabsTrigger value="videos">Course Videos</TabsTrigger>}
                  <TabsTrigger value="benefits">Benefits</TabsTrigger>
                  {(resolvedParams.id !== 'financial-health' && resolvedParams.id !== 'physical-health' && resolvedParams.id !== 'mental-health') && <TabsTrigger value="testimonials">Reviews</TabsTrigger>}
                </TabsList>

                <TabsContent value="curriculum" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="w-6 h-6 text-purple-600" />
                        Course Curriculum
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {course.modules.map((module, index) => (
                          <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-gray-800">
                                Module {index + 1}: {module.title}
                              </h3>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <Play className="w-4 h-4" />
                                  {module.lessons} lessons
                                </span>
                              </div>
                            </div>
                            <p className="text-gray-600 text-sm">{module.description}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {(resolvedParams.id !== 'financial-health' && resolvedParams.id !== 'physical-health' && resolvedParams.id !== 'mental-health') && (
                  <TabsContent value="videos" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Play className="w-6 h-6 text-purple-600" />
                          Course Videos
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                          {course.videos?.map((video, index) => (
                            <Card
                              key={video.id}
                              className="group cursor-pointer hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm"
                              onClick={() => setSelectedVideo(video)}
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

                                </div>

                                <div className="p-4">
                                  <h3 className="font-semibold text-gray-800 mb-2 text-base leading-tight">
                                    {video.title}
                                  </h3>
                                  <p className="text-gray-600 text-sm mb-3 leading-relaxed line-clamp-2">
                                    {video.description}
                                  </p>
                                  <div className="flex flex-wrap gap-1">
                                    {video.topics.slice(0, 2).map((topic, topicIndex) => (
                                      <Badge key={topicIndex} variant="outline" className="text-xs">
                                        {topic}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                )}

                <TabsContent value="benefits" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        What You'll Achieve
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {course.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {(resolvedParams.id !== 'financial-health' && resolvedParams.id !== 'physical-health' && resolvedParams.id !== 'mental-health') && (
                  <TabsContent value="testimonials" className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {course.testimonials.map((testimonial, index) => (
                        <Card key={index}>
                          <CardContent className="p-6">
                            <div className="flex items-center gap-1 mb-4">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <p className="text-gray-600 italic mb-4">"{testimonial.text}"</p>
                            <p className="font-semibold text-gray-800">— {testimonial.name}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                )}
              </Tabs>
            </div>
          </div>
        </section>
      </div>

      {selectedVideo && (
        <VideoModal isOpen={!!selectedVideo} onClose={() => setSelectedVideo(null)} video={selectedVideo} />
      )}
    </>
  )
}
