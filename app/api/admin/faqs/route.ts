import { NextRequest, NextResponse } from 'next/server'
import { getAllFAQs, createFAQ } from '@/lib/data/faqs'
import { logAudit } from '@/lib/data/audit'

export async function GET() {
  try {
    const faqs = await getAllFAQs()
    return NextResponse.json(faqs)
  } catch (error) {
    console.error('Failed to get FAQs:', error)
    return NextResponse.json({ error: 'Failed to get FAQs' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const id = `faq-${Date.now()}`

    await createFAQ({
      id,
      question: body.question,
      answer: body.answer,
      category: body.category ?? 'general',
      sort_order: body.sort_order ?? 0,
    })

    const adminEmail = request.headers.get('x-admin-email') || 'unknown'
    await logAudit({
      userEmail: adminEmail,
      action: 'create',
      entityType: 'faq',
      entityId: id,
      newValue: body,
    })

    return NextResponse.json({ id, message: 'FAQ created' }, { status: 201 })
  } catch (error) {
    console.error('Failed to create FAQ:', error)
    return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 })
  }
}
