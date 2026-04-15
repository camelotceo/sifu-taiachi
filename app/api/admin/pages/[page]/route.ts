import { NextRequest, NextResponse } from 'next/server'
import { getPageContent, upsertPageContent } from '@/lib/data/pages'
import { logAudit } from '@/lib/data/audit'

export async function GET(_request: NextRequest, { params }: { params: Promise<{ page: string }> }) {
  const { page } = await params
  try {
    const content = await getPageContent(page)
    if (!content) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(content)
  } catch (error) {
    console.error('Failed to get page content:', error)
    return NextResponse.json({ error: 'Failed to get page content' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ page: string }> }) {
  const { page } = await params
  try {
    const body = await request.json()
    const old = await getPageContent(page)
    const adminEmail = request.headers.get('x-admin-email') || 'unknown'

    await upsertPageContent(page, body, adminEmail)
    await logAudit({ userEmail: adminEmail, action: 'update', entityType: 'page_content', entityId: page, oldValue: old, newValue: body })

    return NextResponse.json({ message: 'Updated' })
  } catch (error) {
    console.error('Failed to update page content:', error)
    return NextResponse.json({ error: 'Failed to update page content' }, { status: 500 })
  }
}
