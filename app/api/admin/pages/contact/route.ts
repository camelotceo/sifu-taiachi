import { type NextRequest, NextResponse } from "next/server"
import { getContent, updatePageContent } from "@/lib/content-store"

export async function GET() {
  try {
    const content = getContent()
    return NextResponse.json(content.pages.contact)
  } catch (error) {
    return NextResponse.json({ error: "Failed to load contact page data" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    updatePageContent("contact", data)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update contact page" }, { status: 500 })
  }
}
