import { type NextRequest, NextResponse } from "next/server"
import { getContent, updatePageContent } from "@/lib/content-store"

export async function GET() {
  try {
    const content = getContent()
    return NextResponse.json(content.pages.faq)
  } catch (error) {
    return NextResponse.json({ error: "Failed to load FAQ data" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    updatePageContent("faq", data)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update FAQ page" }, { status: 500 })
  }
}
