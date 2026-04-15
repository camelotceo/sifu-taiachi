import { sql } from '@vercel/postgres'

export async function logAudit(entry: {
  userEmail: string
  action: 'create' | 'update' | 'delete'
  entityType: string
  entityId: string
  oldValue?: unknown
  newValue?: unknown
}) {
  try {
    await sql`
      INSERT INTO audit_log (user_email, action, entity_type, entity_id, old_value, new_value)
      VALUES (
        ${entry.userEmail},
        ${entry.action},
        ${entry.entityType},
        ${entry.entityId},
        ${entry.oldValue ? JSON.stringify(entry.oldValue) : null},
        ${entry.newValue ? JSON.stringify(entry.newValue) : null}
      )
    `
  } catch (error) {
    console.error('Failed to write audit log:', error)
  }
}

export async function getAuditLog(options?: {
  entityType?: string
  entityId?: string
  limit?: number
}) {
  const limit = options?.limit ?? 100

  if (options?.entityType && options?.entityId) {
    const result = await sql`
      SELECT * FROM audit_log
      WHERE entity_type = ${options.entityType} AND entity_id = ${options.entityId}
      ORDER BY created_at DESC LIMIT ${limit}
    `
    return result.rows
  }

  if (options?.entityType) {
    const result = await sql`
      SELECT * FROM audit_log
      WHERE entity_type = ${options.entityType}
      ORDER BY created_at DESC LIMIT ${limit}
    `
    return result.rows
  }

  const result = await sql`
    SELECT * FROM audit_log ORDER BY created_at DESC LIMIT ${limit}
  `
  return result.rows
}
