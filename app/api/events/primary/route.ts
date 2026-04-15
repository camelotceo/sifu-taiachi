import { NextResponse } from 'next/server'
import { getPrimaryEventUrl } from '@/lib/data/events'

// Public endpoint — returns the current primary enrollment URL
export async function GET() {
  try {
    const url = await getPrimaryEventUrl()
    // Fallback to the hardcoded URL if no primary event is set
    const fallbackUrl = 'https://www.eventbrite.com/e/tai-chi-with-dr-beauvais-to-manifest-financial-abundance-luncheon-tickets-1668941100759?aff=oddtdtcreator'
    return NextResponse.json({
      url: url || fallbackUrl,
    })
  } catch {
    return NextResponse.json({
      url: 'https://www.eventbrite.com/e/tai-chi-with-dr-beauvais-to-manifest-financial-abundance-luncheon-tickets-1668941100759?aff=oddtdtcreator',
    })
  }
}
