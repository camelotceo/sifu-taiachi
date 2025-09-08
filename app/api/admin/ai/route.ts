import { type NextRequest, NextResponse } from "next/server"
import { getAuthToken, validateToken } from "@/lib/auth"
import { getContent, updateAIConfiguration } from "@/lib/content-store"

export async function GET(request: NextRequest) {
  const token = getAuthToken(request)
  if (!token || !validateToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const content = getContent()
  return NextResponse.json(content.ai)
}

export async function PUT(request: NextRequest) {
  const token = getAuthToken(request)
  if (!token || !validateToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const aiConfig = await request.json()
    updateAIConfiguration(aiConfig)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update AI configuration" }, { status: 500 })
  }
}
