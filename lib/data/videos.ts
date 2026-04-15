import { sql } from '@vercel/postgres'

export interface VideoRow {
  id: string
  title: string
  description: string | null
  vimeo_id: string | null
  youtube_id: string | null
  thumbnail: string | null
  duration: string | null
  level: string | null
  instructor: string
  category: string
  topics: string[]
  benefits: string[]
  sort_order: number
  course_id: string | null
  created_at: string
  updated_at: string
}

export async function getVideosByCategory(category: string) {
  const result = await sql`
    SELECT * FROM videos WHERE category = ${category} ORDER BY sort_order, created_at
  `
  return result.rows as VideoRow[]
}

export async function getVideosByCourseId(courseId: string) {
  const result = await sql`
    SELECT * FROM videos WHERE course_id = ${courseId} ORDER BY sort_order
  `
  return result.rows as VideoRow[]
}

export async function getVideo(id: string) {
  const result = await sql`SELECT * FROM videos WHERE id = ${id}`
  return (result.rows[0] as VideoRow) ?? null
}

export async function createVideo(video: Omit<VideoRow, 'created_at' | 'updated_at'>) {
  await sql`
    INSERT INTO videos (id, title, description, vimeo_id, youtube_id, thumbnail, duration, level, instructor, category, topics, benefits, sort_order, course_id)
    VALUES (${video.id}, ${video.title}, ${video.description}, ${video.vimeo_id}, ${video.youtube_id}, ${video.thumbnail}, ${video.duration}, ${video.level}, ${video.instructor}, ${video.category}, ${video.topics as unknown as string}, ${video.benefits as unknown as string}, ${video.sort_order}, ${video.course_id})
  `
}

export async function updateVideo(id: string, updates: Partial<VideoRow>) {
  const setClauses: string[] = []
  const values: unknown[] = []
  let paramIndex = 1

  const allowedFields = ['title', 'description', 'vimeo_id', 'youtube_id', 'thumbnail', 'duration', 'level', 'instructor', 'category', 'topics', 'benefits', 'sort_order', 'course_id']

  for (const [key, value] of Object.entries(updates)) {
    if (allowedFields.includes(key)) {
      setClauses.push(`${key} = $${paramIndex}`)
      values.push(key === 'topics' || key === 'benefits' ? value : value)
      paramIndex++
    }
  }

  if (setClauses.length === 0) return

  setClauses.push(`updated_at = NOW()`)
  values.push(id)

  await sql.query(
    `UPDATE videos SET ${setClauses.join(', ')} WHERE id = $${paramIndex}`,
    values
  )
}

export async function deleteVideo(id: string) {
  await sql`DELETE FROM videos WHERE id = ${id}`
}

export async function getAllVideos() {
  const result = await sql`SELECT * FROM videos ORDER BY category, sort_order, created_at`
  return result.rows as VideoRow[]
}
