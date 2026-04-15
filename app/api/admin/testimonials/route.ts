import { NextRequest, NextResponse } from 'next/server'
import { getAllTestimonials, createTestimonial } from '@/lib/data/testimonials'
import { logAudit } from '@/lib/data/audit'

export async function GET() {
  try {
    const testimonials = await getAllTestimonials()
    return NextResponse.json(testimonials)
  } catch (error) {
    console.error('Failed to get testimonials:', error)
    return NextResponse.json({ error: 'Failed to get testimonials' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const id = `testimonial-${Date.now()}`

    await createTestimonial({
      id,
      name: body.name,
      age: body.age ?? null,
      location: body.location ?? null,
      rating: body.rating ?? 5,
      text: body.text,
      course: body.course ?? null,
      image: body.image ?? null,
      sort_order: body.sort_order ?? 0,
    })

    const adminEmail = request.headers.get('x-admin-email') || 'unknown'
    await logAudit({
      userEmail: adminEmail,
      action: 'create',
      entityType: 'testimonial',
      entityId: id,
      newValue: body,
    })

    return NextResponse.json({ id, message: 'Testimonial created' }, { status: 201 })
  } catch (error) {
    console.error('Failed to create testimonial:', error)
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 })
  }
}
