import { NextRequest, NextResponse } from "next/server"
import { getPageContent, savePageContent, getAllPages } from "@/lib/json-content"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ page: string }> }
) {
  try {
    const resolvedParams = await params
    const { page } = resolvedParams
    
    console.log(`Pages API: Loading ${page} page content`)
    
    const content = getPageContent(page)
    if (!content) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }
    
    return NextResponse.json(content)
  } catch (error) {
    console.error(`Pages API: Failed to load ${params} page:`, error)
    return NextResponse.json({ error: "Failed to load page content" }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ page: string }> }
) {
  try {
    const resolvedParams = await params
    const { page } = resolvedParams
    const data = await request.json()
    
    console.log(`Pages API: Updating ${page} page content`)
    
    const success = savePageContent(page, data)
    if (!success) {
      return NextResponse.json({ error: "Failed to save page content" }, { status: 500 })
    }
    
    return NextResponse.json({ 
      success: true, 
      message: `${page} page updated successfully` 
    })
  } catch (error) {
    console.error(`Pages API: Failed to update ${params} page:`, error)
    return NextResponse.json({ error: "Failed to update page content" }, { status: 500 })
  }
} 