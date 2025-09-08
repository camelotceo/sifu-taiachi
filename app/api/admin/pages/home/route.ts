import { type NextRequest, NextResponse } from "next/server"
import { getContent, updatePageContent } from "@/lib/content-store"

export async function GET() {
  try {
    const content = getContent()
    console.log("Admin API: Loading home page data with", content.pages.home.testimonials.length, "testimonials")
    return NextResponse.json(content.pages.home)
  } catch (error) {
    console.error("Admin API: Failed to load home page data:", error)
    return NextResponse.json({ error: "Failed to load home page data" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    console.log("Admin API: Updating home page with", data.testimonials?.length || 0, "testimonials")
    
    updatePageContent("home", data)
    
    // Verify the update worked
    const updatedContent = getContent()
    console.log("Admin API: Updated content now has", updatedContent.pages.home.testimonials.length, "testimonials")
    
    return NextResponse.json({ success: true, message: "Home page updated successfully" })
  } catch (error) {
    console.error("Admin API: Failed to update home page:", error)
    return NextResponse.json({ error: "Failed to update home page" }, { status: 500 })
  }
}
