import { sql } from '@vercel/postgres'

export interface EventbriteEventRow {
  id: string
  title: string
  description: string | null
  start_date: string | null
  end_date: string | null
  venue: string | null
  ticket_price: number | null
  url: string
  status: string
  is_primary: boolean
  image_url: string | null
  synced_at: string
  created_at: string
  updated_at: string
}

export async function getAllEvents() {
  const result = await sql`
    SELECT * FROM eventbrite_events ORDER BY start_date DESC NULLS LAST
  `
  return result.rows as EventbriteEventRow[]
}

export async function getEvent(id: string) {
  const result = await sql`SELECT * FROM eventbrite_events WHERE id = ${id}`
  return (result.rows[0] as EventbriteEventRow) ?? null
}

export async function getPrimaryEventUrl(): Promise<string | null> {
  const result = await sql`
    SELECT url FROM eventbrite_events WHERE is_primary = true LIMIT 1
  `
  return result.rows[0]?.url ?? null
}

export async function upsertEvent(event: Omit<EventbriteEventRow, 'created_at' | 'updated_at'>) {
  await sql`
    INSERT INTO eventbrite_events (id, title, description, start_date, end_date, venue, ticket_price, url, status, is_primary, image_url, synced_at)
    VALUES (${event.id}, ${event.title}, ${event.description}, ${event.start_date}, ${event.end_date}, ${event.venue}, ${event.ticket_price}, ${event.url}, ${event.status}, ${event.is_primary}, ${event.image_url}, NOW())
    ON CONFLICT (id) DO UPDATE SET
      title = ${event.title},
      description = ${event.description},
      start_date = ${event.start_date},
      end_date = ${event.end_date},
      venue = ${event.venue},
      ticket_price = ${event.ticket_price},
      url = ${event.url},
      status = ${event.status},
      is_primary = ${event.is_primary},
      image_url = ${event.image_url},
      synced_at = NOW(),
      updated_at = NOW()
  `
}

export async function setPrimaryEvent(eventId: string) {
  // Clear all primary flags first, then set the new one
  await sql`UPDATE eventbrite_events SET is_primary = false WHERE is_primary = true`
  await sql`UPDATE eventbrite_events SET is_primary = true, updated_at = NOW() WHERE id = ${eventId}`
}

export async function deleteEvent(id: string) {
  await sql`DELETE FROM eventbrite_events WHERE id = ${id}`
}
