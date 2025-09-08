import { type NextRequest, NextResponse } from "next/server"
import { getContent, updateGlobalContent } from "@/lib/content-store"

export async function GET() {
  try {
    const content = getContent()
    return NextResponse.json(content.global)
  } catch (error) {
    return NextResponse.json({ error: "Failed to load global data" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    updateGlobalContent(data)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update global settings" }, { status: 500 })
  }
}
