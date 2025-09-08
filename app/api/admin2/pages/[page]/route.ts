import { NextRequest, NextResponse } from "next/server"
import { getContent, updatePageContent } from "@/lib/content-store"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ page: string }> }
) {
  try {
    const resolvedParams = await params
    const { page } = resolvedParams
    const content = getContent()
    
    console.log(`Admin2 API: Loading ${page} page data`)
    
    if (!content.pages[page as keyof typeof content.pages]) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }
    
    return NextResponse.json(content.pages[page as keyof typeof content.pages])
  } catch (error) {
    console.error(`Admin2 API: Failed to load page:`, error)
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
    
    console.log(`Admin2 API: Updating ${page} page with data:`, Object.keys(data))
    
    updatePageContent(page as any, data)
    
    console.log(`Admin2 API: ${page} page updated successfully`)
    
    return NextResponse.json({ 
      success: true, 
      message: `${page} page updated successfully` 
    })
  } catch (error) {
    console.error(`Admin2 API: Failed to update page:`, error)
    return NextResponse.json({ error: "Failed to update page content" }, { status: 500 })
  }
} 