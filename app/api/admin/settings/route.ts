import { NextRequest, NextResponse } from 'next/server'
import { getGlobalSettings, upsertGlobalSettings } from '@/lib/data/settings'
import { logAudit } from '@/lib/data/audit'

export async function GET() {
  try {
    const settings = await getGlobalSettings()
    return NextResponse.json(settings ?? {})
  } catch (error) {
    console.error('Failed to get settings:', error)
    return NextResponse.json({ error: 'Failed to get settings' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const old = await getGlobalSettings()
    const adminEmail = request.headers.get('x-admin-email') || 'unknown'

    await upsertGlobalSettings(body, adminEmail)
    await logAudit({ userEmail: adminEmail, action: 'update', entityType: 'global_settings', entityId: 'global', oldValue: old, newValue: body })

    return NextResponse.json({ message: 'Settings updated' })
  } catch (error) {
    console.error('Failed to update settings:', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
