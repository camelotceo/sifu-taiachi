import { NextRequest, NextResponse } from 'next/server'
import { upsertEvent } from '@/lib/data/events'
import { logAudit } from '@/lib/data/audit'

// Sync events from Eventbrite API
export async function POST(request: NextRequest) {
  const apiToken = process.env.EVENTBRITE_API_TOKEN

  if (!apiToken) {
    return NextResponse.json({ error: 'Eventbrite API token not configured' }, { status: 500 })
  }

  try {
    // Get the organizer's events from Eventbrite API v3
    const orgRes = await fetch('https://www.eventbriteapi.com/v3/users/me/organizations/', {
      headers: { Authorization: `Bearer ${apiToken}` },
    })

    if (!orgRes.ok) {
      return NextResponse.json({ error: 'Failed to fetch Eventbrite organizations' }, { status: 502 })
    }

    const orgData = await orgRes.json()
    const orgId = orgData.organizations?.[0]?.id

    if (!orgId) {
      return NextResponse.json({ error: 'No Eventbrite organization found' }, { status: 404 })
    }

    const eventsRes = await fetch(
      `https://www.eventbriteapi.com/v3/organizations/${orgId}/events/?status=all&order_by=start_desc`,
      { headers: { Authorization: `Bearer ${apiToken}` } }
    )

    if (!eventsRes.ok) {
      return NextResponse.json({ error: 'Failed to fetch events from Eventbrite' }, { status: 502 })
    }

    const eventsData = await eventsRes.json()
    let synced = 0

    for (const event of eventsData.events || []) {
      const statusMap: Record<string, string> = {
        draft: 'draft',
        live: 'live',
        started: 'live',
        ended: 'completed',
        completed: 'completed',
        canceled: 'canceled',
      }

      await upsertEvent({
        id: event.id,
        title: event.name?.text || 'Untitled',
        description: event.description?.text || null,
        start_date: event.start?.utc || null,
        end_date: event.end?.utc || null,
        venue: event.venue?.name || null,
        ticket_price: null, // Would need separate ticket API call
        url: event.url || '',
        status: statusMap[event.status] || 'draft',
        is_primary: false, // Preserve existing primary flag handled separately
        image_url: event.logo?.original?.url || null,
        synced_at: new Date().toISOString(),
      })
      synced++
    }

    const adminEmail = request.headers.get('x-admin-email') || 'unknown'
    await logAudit({ userEmail: adminEmail, action: 'update', entityType: 'eventbrite_sync', entityId: 'sync', newValue: { synced } })

    return NextResponse.json({ message: `Synced ${synced} events`, synced })
  } catch (error) {
    console.error('Eventbrite sync error:', error)
    return NextResponse.json({ error: 'Sync failed' }, { status: 500 })
  }
}
