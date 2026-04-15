import { NextRequest, NextResponse } from 'next/server'
import { getContactSubmissions, getContactStats } from '@/lib/data/contacts'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || undefined
    const limit = parseInt(searchParams.get('limit') || '50', 10)
    const offset = parseInt(searchParams.get('offset') || '0', 10)

    const [submissions, stats] = await Promise.all([
      getContactSubmissions({ status, limit, offset }),
      getContactStats(),
    ])

    return NextResponse.json({ submissions, stats })
  } catch (error) {
    console.error('Failed to get inbox:', error)
    return NextResponse.json({ error: 'Failed to get inbox' }, { status: 500 })
  }
}
