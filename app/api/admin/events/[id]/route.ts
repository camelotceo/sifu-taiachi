import { NextRequest, NextResponse } from 'next/server'
import { getEvent, upsertEvent, deleteEvent, setPrimaryEvent } from '@/lib/data/events'
import { logAudit } from '@/lib/data/audit'

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const event = await getEvent(id)
    if (!event) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(event)
  } catch (error) {
    console.error('Failed to get event:', error)
    return NextResponse.json({ error: 'Failed to get event' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const body = await request.json()
    const old = await getEvent(id)

    // Handle "set as primary" toggle
    if (body.set_primary === true) {
      await setPrimaryEvent(id)
      const adminEmail = request.headers.get('x-admin-email') || 'unknown'
      await logAudit({ userEmail: adminEmail, action: 'update', entityType: 'event', entityId: id, oldValue: { is_primary: old?.is_primary }, newValue: { is_primary: true } })
      return NextResponse.json({ message: 'Set as primary' })
    }

    await upsertEvent({
      id,
      title: body.title ?? old?.title ?? '',
      description: body.description ?? old?.description ?? null,
      start_date: body.start_date ?? old?.start_date ?? null,
      end_date: body.end_date ?? old?.end_date ?? null,
      venue: body.venue ?? old?.venue ?? null,
      ticket_price: body.ticket_price ?? old?.ticket_price ?? null,
      url: body.url ?? old?.url ?? '',
      status: body.status ?? old?.status ?? 'draft',
      is_primary: body.is_primary ?? old?.is_primary ?? false,
      image_url: body.image_url ?? old?.image_url ?? null,
      synced_at: new Date().toISOString(),
    })

    const adminEmail = request.headers.get('x-admin-email') || 'unknown'
    await logAudit({ userEmail: adminEmail, action: 'update', entityType: 'event', entityId: id, oldValue: old, newValue: body })

    return NextResponse.json({ message: 'Updated' })
  } catch (error) {
    console.error('Failed to update event:', error)
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const old = await getEvent(id)
    await deleteEvent(id)

    const adminEmail = request.headers.get('x-admin-email') || 'unknown'
    await logAudit({ userEmail: adminEmail, action: 'delete', entityType: 'event', entityId: id, oldValue: old })

    return NextResponse.json({ message: 'Deleted' })
  } catch (error) {
    console.error('Failed to delete event:', error)
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 })
  }
}
