import { sql } from '@vercel/postgres'

export interface ContactSubmissionRow {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: 'unread' | 'read' | 'replied' | 'archived'
  replied_at: string | null
  reply_text: string | null
  resend_email_id: string | null
  created_at: string
  updated_at: string
}

export async function createContactSubmission(submission: {
  name: string
  email: string
  subject: string
  message: string
  resend_email_id?: string
}) {
  const result = await sql`
    INSERT INTO contact_submissions (name, email, subject, message, resend_email_id)
    VALUES (${submission.name}, ${submission.email}, ${submission.subject}, ${submission.message}, ${submission.resend_email_id ?? null})
    RETURNING id
  `
  return result.rows[0]?.id
}

export async function getContactSubmissions(options?: {
  status?: string
  limit?: number
  offset?: number
}) {
  const limit = options?.limit ?? 50
  const offset = options?.offset ?? 0

  if (options?.status) {
    const result = await sql`
      SELECT * FROM contact_submissions
      WHERE status = ${options.status}
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `
    return result.rows as ContactSubmissionRow[]
  }

  const result = await sql`
    SELECT * FROM contact_submissions
    ORDER BY created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `
  return result.rows as ContactSubmissionRow[]
}

export async function getContactSubmission(id: string) {
  const result = await sql`SELECT * FROM contact_submissions WHERE id = ${id}`
  return (result.rows[0] as ContactSubmissionRow) ?? null
}

export async function updateContactStatus(id: string, status: string) {
  await sql`
    UPDATE contact_submissions SET status = ${status}, updated_at = NOW()
    WHERE id = ${id}
  `
}

export async function markContactReplied(id: string, replyText: string) {
  await sql`
    UPDATE contact_submissions
    SET status = 'replied', reply_text = ${replyText}, replied_at = NOW(), updated_at = NOW()
    WHERE id = ${id}
  `
}

export async function getUnreadCount() {
  const result = await sql`
    SELECT COUNT(*) as count FROM contact_submissions WHERE status = 'unread'
  `
  return parseInt(result.rows[0]?.count ?? '0', 10)
}

export async function getContactStats() {
  const result = await sql`
    SELECT status, COUNT(*) as count FROM contact_submissions GROUP BY status
  `
  const stats: Record<string, number> = { unread: 0, read: 0, replied: 0, archived: 0 }
  for (const row of result.rows) {
    stats[row.status] = parseInt(row.count, 10)
  }
  return stats
}
