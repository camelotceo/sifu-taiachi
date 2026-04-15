import { NextRequest, NextResponse } from 'next/server'
import { getAllEvents, upsertEvent } from '@/lib/data/events'
import { logAudit } from '@/lib/data/audit'

export async function GET() {
  try {
    const events = await getAllEvents()
    return NextResponse.json(events)
  } catch (error) {
    console.error('Failed to get events:', error)
    return NextResponse.json({ error: 'Failed to get events' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const id = body.id || `event-${Date.now()}`

    await upsertEvent({
      id,
      title: body.title,
      description: body.description ?? null,
      start_date: body.start_date ?? null,
      end_date: body.end_date ?? null,
      venue: body.venue ?? null,
      ticket_price: body.ticket_price ?? null,
      url: body.url,
      status: body.status ?? 'draft',
      is_primary: body.is_primary ?? false,
      image_url: body.image_url ?? null,
      synced_at: new Date().toISOString(),
    })

    const adminEmail = request.headers.get('x-admin-email') || 'unknown'
    await logAudit({ userEmail: adminEmail, action: 'create', entityType: 'event', entityId: id, newValue: body })

    return NextResponse.json({ id, message: 'Event created' }, { status: 201 })
  } catch (error) {
    console.error('Failed to create event:', error)
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
  }
}
