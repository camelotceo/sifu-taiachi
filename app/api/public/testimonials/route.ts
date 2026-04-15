import { NextResponse } from "next/server"
import { getAllTestimonials } from "@/lib/data/testimonials"

export async function GET() {
  const cacheHeaders = {
    "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
  }

  try {
    const testimonials = await getAllTestimonials()
    if (testimonials && testimonials.length > 0) {
      return NextResponse.json(testimonials, { headers: cacheHeaders })
    }
  } catch (error) {
    console.error("Public testimonials API: DB read failed, using fallback", error)
  }

  // Fallback to hardcoded data
  const fallback = [
    {
      id: "1",
      name: "Jacqueline",
      age: null,
      location: null,
      rating: 5,
      text: "Dr. Beauvais has completely transformed my life. I came to her classes struggling with severe anxiety and depression. Through her gentle guidance and the practice of Tai Chi, I've found inner peace I never thought possible. The breathing techniques alone have been life-changing. I can't recommend her enough!",
      course: null,
      image: null,
      sort_order: 0,
      created_at: "",
      updated_at: "",
    },
    {
      id: "2",
      name: "Joanna",
      age: null,
      location: null,
      rating: 5,
      text: "As a veteran dealing with PTSD, I was skeptical about alternative healing methods. Dr. Beauvais created such a safe, understanding environment. Her classes have helped me manage my symptoms better than years of traditional therapy. The community she's built is incredible - we all support each other.",
      course: null,
      image: null,
      sort_order: 1,
      created_at: "",
      updated_at: "",
    },
    {
      id: "3",
      name: "Maria",
      age: null,
      location: null,
      rating: 5,
      text: "I've been attending Dr. Beauvais' classes for 6 months now, and the transformation has been remarkable. Not only has my chronic back pain improved significantly, but I've also experienced profound emotional healing. Her approach to wellness is truly holistic and effective.",
      course: null,
      image: null,
      sort_order: 2,
      created_at: "",
      updated_at: "",
    },
    {
      id: "4",
      name: "Miguel",
      age: null,
      location: null,
      rating: 5,
      text: "Dr. Beauvais is a gifted healer and teacher. Her Tai Chi classes have helped me overcome 20 years of chronic pain that doctors couldn't fix. More than that, I've learned to find joy and purpose again. She doesn't just teach movements - she teaches life transformation.",
      course: null,
      image: null,
      sort_order: 3,
      created_at: "",
      updated_at: "",
    },
    {
      id: "5",
      name: "Dr. Raida",
      age: null,
      location: null,
      rating: 5,
      text: "The financial abundance principles Dr. Beauvais teaches alongside Tai Chi have completely changed my relationship with money and success. I've manifested opportunities I never dreamed possible. Her wisdom goes far beyond physical wellness - it's life-changing.",
      course: null,
      image: null,
      sort_order: 4,
      created_at: "",
      updated_at: "",
    },
  ]

  return NextResponse.json(fallback, { headers: cacheHeaders })
}
