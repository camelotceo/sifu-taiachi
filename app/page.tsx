"use client"

import { WelcomeHero } from "@/components/welcome-hero"
import { InterviewsSection } from "@/components/interviews-section"
import { SuccessStories } from "@/components/success-stories"
import { CoursesPreview } from "@/components/courses-preview"
import { FreeVideos } from "@/components/free-videos"
import { TestimonialsSection } from "@/components/testimonials-section"
import { AboutSection } from "@/components/about-section"
import { FAQ } from "@/components/faq"
import { ChatbotWidget } from "@/components/chatbot-widget"
import { usePageContent } from "@/hooks/use-page-content"

export default function HomePage() {
  const { content, loading, error } = usePageContent("home")

  if (loading) {
    return (
      <main>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p>Loading content...</p>
          </div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600">Error loading content: {error}</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main>
      <WelcomeHero content={content} />
      <InterviewsSection />
      <SuccessStories content={content} />
      <CoursesPreview />
      <FreeVideos />
      <TestimonialsSection content={content} />
      <AboutSection />
      <FAQ />
      <ChatbotWidget />
    </main>
  )
}
