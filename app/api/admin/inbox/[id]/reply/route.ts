import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getContactSubmission, markContactReplied } from '@/lib/data/contacts'

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const { message } = await request.json()

    if (!message?.trim()) {
      return NextResponse.json({ error: 'Reply message is required' }, { status: 400 })
    }

    const submission = await getContactSubmission(id)
    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from: 'Dr. Beauvais <noreply@taichiwithdrbeauvais.com>',
      to: [submission.email],
      subject: `Re: ${submission.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed; border-bottom: 2px solid #ec4899; padding-bottom: 10px;">
            Reply from Dr. Beauvais
          </h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="line-height: 1.6; color: #4b5563;">Dear ${submission.name},</p>
            <div style="line-height: 1.6; color: #4b5563;">${message.replace(/\n/g, '<br>')}</div>
          </div>
          <div style="margin-top: 20px; padding: 15px; background-color: #f3e8ff; border-radius: 8px; border-left: 4px solid #7c3aed;">
            <p style="margin: 0; color: #6b21a8; font-size: 14px;">
              Warm regards,<br><strong>Dr. Danielle Beauvais</strong><br>
              Tai Chi with Dr. Beauvais
            </p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Failed to send reply:', error)
      return NextResponse.json({ error: 'Failed to send reply email' }, { status: 500 })
    }

    await markContactReplied(id, message)

    return NextResponse.json({ message: 'Reply sent' })
  } catch (error) {
    console.error('Reply error:', error)
    return NextResponse.json({ error: 'Failed to send reply' }, { status: 500 })
  }
}
