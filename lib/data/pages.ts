import { sql } from '@vercel/postgres'

export async function getPageContent(pageName: string) {
  try {
    const result = await sql`
      SELECT content FROM page_content WHERE page_name = ${pageName}
    `
    return result.rows[0]?.content ?? null
  } catch (error) {
    console.error(`Failed to get page content for ${pageName}:`, error)
    return null
  }
}

export async function upsertPageContent(pageName: string, content: unknown, updatedBy?: string) {
  const id = `page-${pageName}`
  await sql`
    INSERT INTO page_content (id, page_name, content, updated_by, updated_at)
    VALUES (${id}, ${pageName}, ${JSON.stringify(content)}, ${updatedBy ?? null}, NOW())
    ON CONFLICT (page_name) DO UPDATE SET
      content = ${JSON.stringify(content)},
      updated_by = ${updatedBy ?? null},
      updated_at = NOW()
  `
}

export async function getAllPages() {
  const result = await sql`
    SELECT page_name, content, updated_at FROM page_content ORDER BY page_name
  `
  return result.rows
}
