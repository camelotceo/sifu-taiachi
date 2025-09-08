import { type NextRequest, NextResponse } from "next/server"
import { getContent, updatePageContent } from "@/lib/content-store"

export async function GET() {
  try {
    const content = getContent()
    return NextResponse.json(content.pages.about)
  } catch (error) {
    return NextResponse.json({ error: "Failed to load about page data" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    updatePageContent("about", data)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update about page" }, { status: 500 })
  }
}
