import { NextRequest, NextResponse } from 'next/server'
import { getAllVideos, createVideo } from '@/lib/data/videos'
import { logAudit } from '@/lib/data/audit'

export async function GET() {
  try {
    const videos = await getAllVideos()
    return NextResponse.json(videos)
  } catch (error) {
    console.error('Failed to get videos:', error)
    return NextResponse.json({ error: 'Failed to get videos' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const id = body.id || `video-${Date.now()}`

    await createVideo({
      id,
      title: body.title,
      description: body.description ?? null,
      vimeo_id: body.vimeo_id ?? null,
      youtube_id: body.youtube_id ?? null,
      thumbnail: body.thumbnail ?? null,
      duration: body.duration ?? null,
      level: body.level ?? 'All Levels',
      instructor: body.instructor ?? 'Dr. Danielle Beauvais',
      category: body.category,
      topics: body.topics ?? [],
      benefits: body.benefits ?? [],
      sort_order: body.sort_order ?? 0,
      course_id: body.course_id ?? null,
    })

    const adminEmail = request.headers.get('x-admin-email') || 'unknown'
    await logAudit({ userEmail: adminEmail, action: 'create', entityType: 'video', entityId: id, newValue: body })

    return NextResponse.json({ id, message: 'Video created' }, { status: 201 })
  } catch (error) {
    console.error('Failed to create video:', error)
    return NextResponse.json({ error: 'Failed to create video' }, { status: 500 })
  }
}
