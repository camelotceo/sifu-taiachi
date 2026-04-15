import { NextResponse } from "next/server"
import { getAllCourses } from "@/lib/data/courses"

export async function GET() {
  const cacheHeaders = {
    "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
  }

  try {
    const courses = await getAllCourses()
    if (courses && courses.length > 0) {
      return NextResponse.json(courses, { headers: cacheHeaders })
    }
  } catch (error) {
    console.error("Public courses API: DB read failed, using fallback", error)
  }

  // Fallback to hardcoded data
  const fallback = [
    {
      id: "mental-health",
      title: "Mental Health Mastery",
      subtitle: "Develop a personalized practice for mental resilience and healing",
      description: "The objective of this transformative 5-hours Mental Health Mastery Seminar (lunch included) is to introduce Tai Chi, Chi Gong as a supportive method of exercise to the 450,000.000 plus people on antidepressant or in need of better mental health in order to revolutionize the relationship between mental and emotional well-being.",
      price: 99,
      original_price: 149,
      image: null,
      duration: "8 weeks",
      lessons: 24,
      students: 2847,
      rating: 5,
      level: "All Levels",
      highlights: [
        "Daily 7-15-minute morning routines for anxiety relief",
        "Breathing techniques to control invisible energy",
        "The rewire of your energetic body for panic attack",
        "Conscious control to shape your reality",
        "Mindfulness Tai Chi practices for emotional regulation",
      ],
      modules: [],
      benefits: [],
      testimonials: [],
      video_id: null,
      video_thumbnail: null,
      eventbrite_url: null,
      sort_order: 0,
    },
    {
      id: "physical-health",
      title: "Physical Wellness and Healing",
      subtitle: "Gentle Healing for Body & Spirit",
      description: "Experience the gentle power of Tai Chi for physical healing. Perfect for seniors, those with chronic pain, or anyone seeking a sustainable approach to fitness and flexibility.",
      price: 99,
      original_price: 149,
      image: null,
      duration: "10 weeks",
      lessons: 30,
      students: 3521,
      rating: 5,
      level: "All Levels",
      highlights: [
        "Chair-based modifications available",
        "Pain relief for common conditions",
        "Balance and fall prevention exercises",
        "Gentle strength building",
      ],
      modules: [],
      benefits: [],
      testimonials: [],
      video_id: null,
      video_thumbnail: null,
      eventbrite_url: null,
      sort_order: 1,
    },
    {
      id: "financial-health",
      title: "Financial Abundance Mindset",
      subtitle: "Wealth Consciousness Through Wellness",
      description: "Revolutionary approach combining mindfulness with financial wellness. Break through money blocks and create abundance.",
      price: 99,
      original_price: 149,
      image: null,
      duration: "6 weeks",
      lessons: 18,
      students: 1893,
      rating: 5,
      level: "All Levels",
      highlights: [
        "Identify and release money blocks",
        "Abundance meditation practices",
        "Mindful money management",
        "Wealth visualization techniques",
      ],
      modules: [],
      benefits: [],
      testimonials: [],
      video_id: null,
      video_thumbnail: null,
      eventbrite_url: null,
      sort_order: 2,
    },
  ]

  return NextResponse.json(fallback, { headers: cacheHeaders })
}
