"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Heart, DollarSign, Star, Clock, BookOpen } from "lucide-react"

const courses = [
  {
    id: "mental-health",
    title: "Mental Health Mastery",
    icon: Brain,
    color: "sage",
    price: "$99",
    description: "Transform your mental well-being through mindfulness and emotional regulation",
    features: [
      "Mindfulness & Meditation Techniques",
      "Stress Reduction Strategies",
      "Emotional Regulation Skills",
      "Cognitive Reframing Methods",
      "Daily Practice Routines",
    ],
    duration: "8 weeks",
    lessons: "24 lessons",
    rating: 4.9,
  },
  {
    id: "physical-health",
    title: "Physical Wellness and Healing",
    icon: Heart,
    color: "ocean",
    price: "$99",
    description: "Gentle movement practices for strength, flexibility, and pain relief",
    features: [
      "Gentle Movement Sequences",
      "Flexibility & Balance Training",
      "Energy Flow Techniques",
      "Pain Management Strategies",
      "Senior-Friendly Adaptations",
    ],
    duration: "10 weeks",
    lessons: "30 lessons",
    rating: 4.8,
  },
  {
    id: "financial-health",
    title: "Financial Abundance Mindset",
    icon: DollarSign,
    color: "earth",
    price: "$99",
    description: "Develop a healthy relationship with money and create financial wellness",
    features: [
      "Abundance Mindset Development",
      "Financial Meditation Practices",
      "Money Block Breakthrough",
      "Wealth Visualization Techniques",
      "Financial Planning for Well-being",
    ],
    duration: "6 weeks",
    lessons: "18 lessons",
    rating: 4.7,
  },
]

export function CoursesOverview() {
  return (
    <section className="py-20 bg-white/70 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <BookOpen className="w-12 h-12 text-sage-500 mx-auto mb-4" />
          <h2 className="text-4xl font-light text-sage-800 mb-4">Comprehensive Wellness Courses</h2>
          <p className="text-xl text-sage-600 max-w-3xl mx-auto">
            Deepen your wellness journey with our structured courses designed to transform your mental, physical, and
            financial well-being
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {courses.map((course) => {
            const IconComponent = course.icon
            const colorClasses = {
              sage: "from-sage-500 to-sage-600 border-sage-200",
              ocean: "from-ocean-500 to-ocean-600 border-ocean-200",
              earth: "from-earth-500 to-earth-600 border-earth-200",
            }

            return (
              <Card
                key={course.id}
                className={`group hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm border-2 ${colorClasses[course.color as keyof typeof colorClasses].split(" ")[1]}`}
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${colorClasses[course.color as keyof typeof colorClasses].split(" ")[0]} ${colorClasses[course.color as keyof typeof colorClasses].split(" ")[1]} flex items-center justify-center`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-light text-sage-800 mb-2">{course.title}</CardTitle>
                  <p className="text-sage-600 leading-relaxed">{course.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Course Stats */}
                  <div className="flex justify-between items-center text-sm text-sage-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{course.lessons}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sage-800 mb-3">What You'll Learn:</h4>
                    <ul className="space-y-2">
                      {course.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-sage-600">
                          <div className="w-1.5 h-1.5 bg-sage-400 rounded-full mt-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="pt-4 border-t border-sage-100">
                    <div className="text-center mb-4">
                      <span className="text-3xl font-bold text-sage-800">{course.price}</span>
                      <span className="text-sage-600 ml-1">one-time</span>
                    </div>

                    <div className="space-y-3">
                      <Button
                        className={`w-full bg-gradient-to-r ${colorClasses[course.color as keyof typeof colorClasses].split(" ")[0]} ${colorClasses[course.color as keyof typeof colorClasses].split(" ")[1]} hover:opacity-90 text-white py-3 rounded-full`}
                      >
                        Enroll Now - Stripe
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-sage-300 text-sage-700 hover:bg-sage-50 py-3 rounded-full"
                      >
                        Join our Membership for 30% off
online classes.
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
