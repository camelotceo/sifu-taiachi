import { NextRequest, NextResponse } from 'next/server'
import { getAllCourses, createCourse } from '@/lib/data/courses'
import { logAudit } from '@/lib/data/audit'

export async function GET() {
  try {
    const courses = await getAllCourses()
    return NextResponse.json(courses)
  } catch (error) {
    console.error('Failed to get courses:', error)
    return NextResponse.json({ error: 'Failed to get courses' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const id = body.id || `course-${Date.now()}`

    await createCourse({
      id,
      title: body.title,
      subtitle: body.subtitle ?? null,
      description: body.description ?? null,
      price: body.price ?? null,
      original_price: body.original_price ?? null,
      image: body.image ?? null,
      duration: body.duration ?? null,
      lessons: body.lessons ?? null,
      students: body.students ?? 0,
      rating: body.rating ?? null,
      level: body.level ?? 'All Levels',
      highlights: body.highlights ?? [],
      modules: body.modules ?? [],
      benefits: body.benefits ?? [],
      testimonials: body.testimonials ?? [],
      video_id: body.video_id ?? null,
      video_thumbnail: body.video_thumbnail ?? null,
      eventbrite_url: body.eventbrite_url ?? null,
      sort_order: body.sort_order ?? 0,
    })

    const adminEmail = request.headers.get('x-admin-email') || 'unknown'
    await logAudit({ userEmail: adminEmail, action: 'create', entityType: 'course', entityId: id, newValue: body })

    return NextResponse.json({ id, message: 'Course created' }, { status: 201 })
  } catch (error) {
    console.error('Failed to create course:', error)
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 })
  }
}
