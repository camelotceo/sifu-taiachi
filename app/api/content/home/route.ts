import { NextResponse } from "next/server"
import { getContent } from "@/lib/content-store"

export async function GET() {
  try {
    const content = getContent()
    console.log("API: Serving home content with", content.pages.home.testimonials.length, "testimonials")
    console.log("API: First testimonial:", content.pages.home.testimonials[0])
    
    const response = NextResponse.json(content.pages.home)
    console.log("API: Response headers:", Object.fromEntries(response.headers.entries()))
    return response
  } catch (error) {
    console.error("API: Failed to load home page content:", error)
    return NextResponse.json({ error: "Failed to load home page content" }, { status: 500 })
  }
} 