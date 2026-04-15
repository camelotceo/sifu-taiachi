import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

export async function GET() {
  try {
    const [testimonials, faqs, courses, videos, unread, events] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM testimonials`,
      sql`SELECT COUNT(*) as count FROM faqs`,
      sql`SELECT COUNT(*) as count FROM courses`,
      sql`SELECT COUNT(*) as count FROM videos`,
      sql`SELECT COUNT(*) as count FROM contact_submissions WHERE status = 'unread'`,
      sql`SELECT COUNT(*) as count FROM eventbrite_events`,
    ])

    return NextResponse.json({
      testimonials: parseInt(testimonials.rows[0].count, 10),
      faqs: parseInt(faqs.rows[0].count, 10),
      courses: parseInt(courses.rows[0].count, 10),
      videos: parseInt(videos.rows[0].count, 10),
      unreadMessages: parseInt(unread.rows[0].count, 10),
      events: parseInt(events.rows[0].count, 10),
    })
  } catch (error) {
    console.error('Failed to get stats:', error)
    return NextResponse.json({
      testimonials: 0, faqs: 0, courses: 0, videos: 0, unreadMessages: 0, events: 0,
    })
  }
}
