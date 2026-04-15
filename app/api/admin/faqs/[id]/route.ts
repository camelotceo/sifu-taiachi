import { NextRequest, NextResponse } from 'next/server'
import { getFAQ, updateFAQ, deleteFAQ } from '@/lib/data/faqs'
import { logAudit } from '@/lib/data/audit'

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const faq = await getFAQ(id)
    if (!faq) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(faq)
  } catch (error) {
    console.error('Failed to get FAQ:', error)
    return NextResponse.json({ error: 'Failed to get FAQ' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const body = await request.json()
    const old = await getFAQ(id)
    await updateFAQ(id, body)

    const adminEmail = request.headers.get('x-admin-email') || 'unknown'
    await logAudit({ userEmail: adminEmail, action: 'update', entityType: 'faq', entityId: id, oldValue: old, newValue: body })

    return NextResponse.json({ message: 'Updated' })
  } catch (error) {
    console.error('Failed to update FAQ:', error)
    return NextResponse.json({ error: 'Failed to update FAQ' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const old = await getFAQ(id)
    await deleteFAQ(id)

    const adminEmail = request.headers.get('x-admin-email') || 'unknown'
    await logAudit({ userEmail: adminEmail, action: 'delete', entityType: 'faq', entityId: id, oldValue: old })

    return NextResponse.json({ message: 'Deleted' })
  } catch (error) {
    console.error('Failed to delete FAQ:', error)
    return NextResponse.json({ error: 'Failed to delete FAQ' }, { status: 500 })
  }
}
