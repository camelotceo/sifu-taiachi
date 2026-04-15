import { NextRequest, NextResponse } from 'next/server'
import { getCourse, updateCourse, deleteCourse } from '@/lib/data/courses'
import { logAudit } from '@/lib/data/audit'

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const course = await getCourse(id)
    if (!course) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(course)
  } catch (error) {
    console.error('Failed to get course:', error)
    return NextResponse.json({ error: 'Failed to get course' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const body = await request.json()
    const old = await getCourse(id)
    await updateCourse(id, body)

    const adminEmail = request.headers.get('x-admin-email') || 'unknown'
    await logAudit({ userEmail: adminEmail, action: 'update', entityType: 'course', entityId: id, oldValue: old, newValue: body })

    return NextResponse.json({ message: 'Updated' })
  } catch (error) {
    console.error('Failed to update course:', error)
    return NextResponse.json({ error: 'Failed to update course' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const old = await getCourse(id)
    await deleteCourse(id)

    const adminEmail = request.headers.get('x-admin-email') || 'unknown'
    await logAudit({ userEmail: adminEmail, action: 'delete', entityType: 'course', entityId: id, oldValue: old })

    return NextResponse.json({ message: 'Deleted' })
  } catch (error) {
    console.error('Failed to delete course:', error)
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 })
  }
}
