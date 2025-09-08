import { TestimonialsSection } from "@/components/testimonials-section"

export default function SimpleTestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Simple Test Page</h1>
        <TestimonialsSection />
      </div>
    </div>
  )
} 