import { sql } from '@vercel/postgres'

export interface FAQRow {
  id: string
  question: string
  answer: string
  category: string
  sort_order: number
  created_at: string
  updated_at: string
}

export async function getAllFAQs() {
  const result = await sql`
    SELECT * FROM faqs ORDER BY category, sort_order, created_at
  `
  return result.rows as FAQRow[]
}

export async function getFAQsByCategory(category: string) {
  const result = await sql`
    SELECT * FROM faqs WHERE category = ${category} ORDER BY sort_order, created_at
  `
  return result.rows as FAQRow[]
}

export async function getFAQ(id: string) {
  const result = await sql`SELECT * FROM faqs WHERE id = ${id}`
  return (result.rows[0] as FAQRow) ?? null
}

export async function createFAQ(faq: Omit<FAQRow, 'created_at' | 'updated_at'>) {
  await sql`
    INSERT INTO faqs (id, question, answer, category, sort_order)
    VALUES (${faq.id}, ${faq.question}, ${faq.answer}, ${faq.category}, ${faq.sort_order})
  `
}

export async function updateFAQ(id: string, updates: Partial<Omit<FAQRow, 'id' | 'created_at' | 'updated_at'>>) {
  const setClauses: string[] = []
  const values: unknown[] = []
  let paramIndex = 1

  for (const [key, value] of Object.entries(updates)) {
    setClauses.push(`${key} = $${paramIndex}`)
    values.push(value)
    paramIndex++
  }

  if (setClauses.length === 0) return

  setClauses.push(`updated_at = NOW()`)
  values.push(id)

  await sql.query(
    `UPDATE faqs SET ${setClauses.join(', ')} WHERE id = $${paramIndex}`,
    values
  )
}

export async function deleteFAQ(id: string) {
  await sql`DELETE FROM faqs WHERE id = ${id}`
}
