import { sql } from '@vercel/postgres'

export async function getGlobalSettings() {
  try {
    const result = await sql`
      SELECT settings FROM global_settings WHERE id = 'global'
    `
    return result.rows[0]?.settings ?? null
  } catch (error) {
    console.error('Failed to get global settings:', error)
    return null
  }
}

export async function upsertGlobalSettings(settings: unknown, updatedBy?: string) {
  await sql`
    INSERT INTO global_settings (id, settings, updated_by, updated_at)
    VALUES ('global', ${JSON.stringify(settings)}, ${updatedBy ?? null}, NOW())
    ON CONFLICT (id) DO UPDATE SET
      settings = ${JSON.stringify(settings)},
      updated_by = ${updatedBy ?? null},
      updated_at = NOW()
  `
}
