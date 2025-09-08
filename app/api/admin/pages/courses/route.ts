import { type NextRequest, NextResponse } from "next/server"
import { getContent, updatePageContent } from "@/lib/content-store"

export async function GET() {
  try {
    const content = getContent()
    return NextResponse.json(content.pages.courses)
  } catch (error) {
    return NextResponse.json({ error: "Failed to load courses data" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    updatePageContent("courses", data)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update courses page" }, { status: 500 })
  }
}
