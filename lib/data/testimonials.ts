import { sql } from '@vercel/postgres'

export interface TestimonialRow {
  id: string
  name: string
  age: number | null
  location: string | null
  rating: number
  text: string
  course: string | null
  image: string | null
  sort_order: number
  created_at: string
  updated_at: string
}

export async function getAllTestimonials() {
  const result = await sql`
    SELECT * FROM testimonials ORDER BY sort_order, created_at DESC
  `
  return result.rows as TestimonialRow[]
}

export async function getTestimonial(id: string) {
  const result = await sql`SELECT * FROM testimonials WHERE id = ${id}`
  return (result.rows[0] as TestimonialRow) ?? null
}

export async function createTestimonial(testimonial: Omit<TestimonialRow, 'created_at' | 'updated_at'>) {
  await sql`
    INSERT INTO testimonials (id, name, age, location, rating, text, course, image, sort_order)
    VALUES (${testimonial.id}, ${testimonial.name}, ${testimonial.age}, ${testimonial.location}, ${testimonial.rating}, ${testimonial.text}, ${testimonial.course}, ${testimonial.image}, ${testimonial.sort_order})
  `
}

export async function updateTestimonial(id: string, updates: Partial<Omit<TestimonialRow, 'id' | 'created_at' | 'updated_at'>>) {
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
    `UPDATE testimonials SET ${setClauses.join(', ')} WHERE id = $${paramIndex}`,
    values
  )
}

export async function deleteTestimonial(id: string) {
  await sql`DELETE FROM testimonials WHERE id = ${id}`
}
