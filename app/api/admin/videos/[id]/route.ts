import { NextRequest, NextResponse } from 'next/server'
import { getVideo, updateVideo, deleteVideo } from '@/lib/data/videos'
import { logAudit } from '@/lib/data/audit'

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const video = await getVideo(id)
    if (!video) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(video)
  } catch (error) {
    console.error('Failed to get video:', error)
    return NextResponse.json({ error: 'Failed to get video' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const body = await request.json()
    const old = await getVideo(id)
    await updateVideo(id, body)

    const adminEmail = request.headers.get('x-admin-email') || 'unknown'
    await logAudit({ userEmail: adminEmail, action: 'update', entityType: 'video', entityId: id, oldValue: old, newValue: body })

    return NextResponse.json({ message: 'Updated' })
  } catch (error) {
    console.error('Failed to update video:', error)
    return NextResponse.json({ error: 'Failed to update video' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const old = await getVideo(id)
    await deleteVideo(id)

    const adminEmail = request.headers.get('x-admin-email') || 'unknown'
    await logAudit({ userEmail: adminEmail, action: 'delete', entityType: 'video', entityId: id, oldValue: old })

    return NextResponse.json({ message: 'Deleted' })
  } catch (error) {
    console.error('Failed to delete video:', error)
    return NextResponse.json({ error: 'Failed to delete video' }, { status: 500 })
  }
}
