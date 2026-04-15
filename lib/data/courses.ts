import { sql } from '@vercel/postgres'

export interface CourseRow {
  id: string
  title: string
  subtitle: string | null
  description: string | null
  price: number | null
  original_price: number | null
  image: string | null
  duration: string | null
  lessons: number | null
  students: number
  rating: number | null
  level: string
  highlights: string[]
  modules: unknown[]
  benefits: string[]
  testimonials: unknown[]
  video_id: string | null
  video_thumbnail: string | null
  eventbrite_url: string | null
  sort_order: number
  created_at: string
  updated_at: string
}

export async function getAllCourses() {
  const result = await sql`
    SELECT * FROM courses ORDER BY sort_order, created_at
  `
  return result.rows as CourseRow[]
}

export async function getCourse(id: string) {
  const result = await sql`SELECT * FROM courses WHERE id = ${id}`
  return (result.rows[0] as CourseRow) ?? null
}

export async function createCourse(course: Omit<CourseRow, 'created_at' | 'updated_at'>) {
  await sql`
    INSERT INTO courses (id, title, subtitle, description, price, original_price, image, duration, lessons, students, rating, level, highlights, modules, benefits, testimonials, video_id, video_thumbnail, eventbrite_url, sort_order)
    VALUES (
      ${course.id}, ${course.title}, ${course.subtitle}, ${course.description},
      ${course.price}, ${course.original_price}, ${course.image}, ${course.duration},
      ${course.lessons}, ${course.students}, ${course.rating}, ${course.level},
      ${course.highlights as unknown as string}, ${JSON.stringify(course.modules)},
      ${course.benefits as unknown as string}, ${JSON.stringify(course.testimonials)},
      ${course.video_id}, ${course.video_thumbnail}, ${course.eventbrite_url}, ${course.sort_order}
    )
  `
}

export async function updateCourse(id: string, updates: Partial<Omit<CourseRow, 'id' | 'created_at' | 'updated_at'>>) {
  const setClauses: string[] = []
  const values: unknown[] = []
  let paramIndex = 1

  const jsonFields = ['modules', 'testimonials']
  const arrayFields = ['highlights', 'benefits']

  for (const [key, value] of Object.entries(updates)) {
    setClauses.push(`${key} = $${paramIndex}`)
    if (jsonFields.includes(key)) {
      values.push(JSON.stringify(value))
    } else {
      values.push(value)
    }
    paramIndex++
  }

  if (setClauses.length === 0) return

  setClauses.push(`updated_at = NOW()`)
  values.push(id)

  await sql.query(
    `UPDATE courses SET ${setClauses.join(', ')} WHERE id = $${paramIndex}`,
    values
  )
}

export async function deleteCourse(id: string) {
  await sql`DELETE FROM courses WHERE id = ${id}`
}
