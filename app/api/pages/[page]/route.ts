import { NextRequest, NextResponse } from "next/server"
import { getPageContent as getPageContentFromFS, savePageContent, getAllPages } from "@/lib/json-content"
import { getPageContent as getPageContentFromDB } from "@/lib/data/pages"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ page: string }> }
) {
  try {
    const resolvedParams = await params
    const { page } = resolvedParams

    console.log(`Pages API: Loading ${page} page content`)

    // Try database first
    try {
      const dbContent = await getPageContentFromDB(page)
      if (dbContent) {
        console.log(`Pages API: Loaded ${page} from database`)
        return NextResponse.json(dbContent)
      }
    } catch (dbError) {
      console.error(`Pages API: DB read failed for ${page}, falling back to filesystem`, dbError)
    }

    // Fall back to filesystem
    const content = getPageContentFromFS(page)
    if (!content) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    console.log(`Pages API: Loaded ${page} from filesystem`)
    return NextResponse.json(content)
  } catch (error) {
    console.error(`Pages API: Failed to load page:`, error)
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
    console.error(`Pages API: Failed to update page:`, error)
    return NextResponse.json({ error: "Failed to update page content" }, { status: 500 })
  }
}
