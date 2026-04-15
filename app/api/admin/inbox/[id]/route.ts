import { NextRequest, NextResponse } from 'next/server'
import { getContactSubmission, updateContactStatus } from '@/lib/data/contacts'

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const submission = await getContactSubmission(id)
    if (!submission) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    // Mark as read if unread
    if (submission.status === 'unread') {
      await updateContactStatus(id, 'read')
    }

    return NextResponse.json(submission)
  } catch (error) {
    console.error('Failed to get submission:', error)
    return NextResponse.json({ error: 'Failed to get submission' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const { status } = await request.json()
    await updateContactStatus(id, status)
    return NextResponse.json({ message: 'Status updated' })
  } catch (error) {
    console.error('Failed to update status:', error)
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 })
  }
}
