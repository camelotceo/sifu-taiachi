"use client"

import { Star, ExternalLink, RefreshCw, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PageContent } from "@/lib/json-content"

interface TestimonialsSectionProps {
  content?: PageContent | null
}

// Fallback data in case API fails
const fallbackReviews = [
  {
    id: 1,
    name: "Jacqueline",
    rating: 5,
    date: "1 week ago",
    text: "Dr. Beauvais has completely transformed my life. I came to her classes struggling with severe anxiety and depression. Through her gentle guidance and the practice of Tai Chi, I've found inner peace I never thought possible. The breathing techniques alone have been life-changing. I can't recommend her enough!",
    verified: true,
  },
  {
    id: 2,
    name: "Joanna",
    rating: 5,
    date: "2 weeks ago",
    text: "As a veteran dealing with PTSD, I was skeptical about alternative healing methods. Dr. Beauvais created such a safe, understanding environment. Her classes have helped me manage my symptoms better than years of traditional therapy. The community she's built is incredible - we all support each other.",
    verified: true,
  },
  {
    id: 3,
    name: "Maria",
    rating: 5,
    date: "3 weeks ago",
    text: "I've been attending Dr. Beauvais' classes for 6 months now, and the transformation has been remarkable. Not only has my chronic back pain improved significantly, but I've also experienced profound emotional healing. Her approach to wellness is truly holistic and effective.",
    verified: true,
  },
  {
    id: 4,
    name: "Miguel",
    rating: 5,
    date: "1 month ago",
    text: "Dr. Beauvais is a gifted healer and teacher. Her Tai Chi classes have helped me overcome 20 years of chronic pain that doctors couldn't fix. More than that, I've learned to find joy and purpose again. She doesn't just teach movements - she teaches life transformation.",
    verified: true,
  },
  {
    id: 5,
    name: "Dr. Raida",
    rating: 5,
    date: "1 month ago",
    text: "The financial abundance principles Dr. Beauvais teaches alongside Tai Chi have completely changed my relationship with money and success. I've manifested opportunities I never dreamed possible. Her wisdom goes far beyond physical wellness - it's life-changing.",
    verified: true,
  },
]

export function TestimonialsSection({ content }: TestimonialsSectionProps) {
  // Debug logging
  console.log("TestimonialsSection: content received:", content)
  console.log("TestimonialsSection: content.testimonials:", content?.testimonials)
  
  // Use admin content if available, otherwise fall back to hardcoded data
  const testimonials = content?.testimonials || fallbackReviews
  const reviewCount = testimonials.length
  // Check if we have admin content by looking for admin-specific fields
  const isUsingAdminContent = content?.testimonials && content.testimonials.length > 0 && 
    content.testimonials.some((t: any) => 'age' in t && 'course' in t)
  
  console.log("TestimonialsSection: using admin content:", isUsingAdminContent)
  console.log("TestimonialsSection: testimonials to display:", testimonials)

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900">What Our Students Say</h2>
          </div>

          {/* Status and Refresh */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-gray-900">5.0</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            <div className="text-gray-600">
              <p className="font-medium">Based on {reviewCount}+ Student Reviews</p>
            </div>
            

          </div>

          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Real transformations from real students. See what our community has to say about their healing journey.
          </p>
        </div>



        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial: any) => (
            <Card
              key={testimonial.id}
              className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-green-500"
            >
              <CardContent className="p-6">
                {/* Review Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                          ✓ Verified
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {isUsingAdminContent ? `${(testimonial as any).age} years old` : (testimonial as any).date}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-gray-700 leading-relaxed">{testimonial.text}</p>

                {/* Course Badge */}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">
                      {isUsingAdminContent ? "C" : "G"}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {isUsingAdminContent ? (testimonial as any).course : "Google Review"}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Reviews Button */}
        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <a
              href="https://www.google.com/search?sca_esv=385330abf90c463d&sxsrf=AE3TifPdcZ2l9uY1Tia9EEZ32tNSlYr2FA:1753641186737&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-EyN3e3Oj7rG298xRQB5fjePUpBeFUcBC9M2Rrm5zEs_0YMNoV2CMDTAGlyvKb4AuffFFwP7P0LxzX9TlrErRlYUeGXAWaMUK7LAxUAD6W_LwtKqKFQ%3D%3D&q=Tai+Chi+with+Dr.+Beauvais+Reviews&sa=X&ved=2ahUKEwiP3_6_1t2OAxXEkmoFHXfyKlwQ0bkNegQIKxAE&biw=1817&bih=881&dpr=1#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              View All Google Reviews
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">5.0★</div>
            <div className="text-gray-600">Student Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{reviewCount}+</div>
            <div className="text-gray-600">Student Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
            <div className="text-gray-600">5-Star Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">25+</div>
            <div className="text-gray-600">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  )
}
