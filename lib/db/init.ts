/**
 * Database initialization script
 * Run: npx tsx lib/db/init.ts
 */

import { config } from 'dotenv'
config({ path: '.env.local' })
import { sql } from '@vercel/postgres'

async function init() {
  console.log('Initializing database schema...')

  // Execute each CREATE TABLE/INDEX as a complete statement
  const statements = [
    `CREATE TABLE IF NOT EXISTS page_content (
      id TEXT PRIMARY KEY,
      page_name TEXT NOT NULL UNIQUE,
      content JSONB NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      updated_by TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS global_settings (
      id TEXT PRIMARY KEY DEFAULT 'global',
      settings JSONB NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      updated_by TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS videos (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      vimeo_id TEXT,
      youtube_id TEXT,
      thumbnail TEXT,
      duration TEXT,
      level TEXT,
      instructor TEXT DEFAULT 'Dr. Danielle Beauvais',
      category TEXT NOT NULL,
      topics TEXT[] DEFAULT '{}',
      benefits TEXT[] DEFAULT '{}',
      sort_order INTEGER DEFAULT 0,
      course_id TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )`,
    `CREATE TABLE IF NOT EXISTS testimonials (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      age INTEGER,
      location TEXT,
      rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
      text TEXT NOT NULL,
      course TEXT,
      image TEXT,
      sort_order INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )`,
    `CREATE TABLE IF NOT EXISTS faqs (
      id TEXT PRIMARY KEY,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      category TEXT DEFAULT 'general',
      sort_order INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )`,
    `CREATE TABLE IF NOT EXISTS courses (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      subtitle TEXT,
      description TEXT,
      price NUMERIC(10,2),
      original_price NUMERIC(10,2),
      image TEXT,
      duration TEXT,
      lessons INTEGER,
      students INTEGER DEFAULT 0,
      rating NUMERIC(2,1),
      level TEXT DEFAULT 'All Levels',
      highlights TEXT[] DEFAULT '{}',
      modules JSONB DEFAULT '[]',
      benefits TEXT[] DEFAULT '{}',
      testimonials JSONB DEFAULT '[]',
      video_id TEXT,
      video_thumbnail TEXT,
      eventbrite_url TEXT,
      sort_order INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )`,
    `CREATE TABLE IF NOT EXISTS contact_submissions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied', 'archived')),
      replied_at TIMESTAMPTZ,
      reply_text TEXT,
      resend_email_id TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )`,
    `CREATE TABLE IF NOT EXISTS eventbrite_events (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      start_date TIMESTAMPTZ,
      end_date TIMESTAMPTZ,
      venue TEXT,
      ticket_price NUMERIC(10,2),
      url TEXT NOT NULL,
      status TEXT DEFAULT 'draft',
      is_primary BOOLEAN DEFAULT false,
      image_url TEXT,
      synced_at TIMESTAMPTZ DEFAULT NOW(),
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )`,
    `CREATE TABLE IF NOT EXISTS magic_links (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email TEXT NOT NULL,
      code_hash TEXT NOT NULL,
      expires_at TIMESTAMPTZ NOT NULL,
      used BOOLEAN DEFAULT false,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )`,
    `CREATE TABLE IF NOT EXISTS audit_log (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_email TEXT NOT NULL,
      action TEXT NOT NULL,
      entity_type TEXT NOT NULL,
      entity_id TEXT NOT NULL,
      old_value JSONB,
      new_value JSONB,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )`,
    // Indexes
    `CREATE INDEX IF NOT EXISTS idx_videos_category ON videos(category)`,
    `CREATE INDEX IF NOT EXISTS idx_videos_course_id ON videos(course_id)`,
    `CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category)`,
    `CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status)`,
    `CREATE INDEX IF NOT EXISTS idx_contact_submissions_created ON contact_submissions(created_at DESC)`,
    `CREATE INDEX IF NOT EXISTS idx_eventbrite_events_primary ON eventbrite_events(is_primary) WHERE is_primary = true`,
    `CREATE INDEX IF NOT EXISTS idx_magic_links_email ON magic_links(email)`,
    `CREATE INDEX IF NOT EXISTS idx_magic_links_expires ON magic_links(expires_at)`,
    `CREATE INDEX IF NOT EXISTS idx_audit_log_entity ON audit_log(entity_type, entity_id)`,
    `CREATE INDEX IF NOT EXISTS idx_audit_log_created ON audit_log(created_at DESC)`,
  ]

  for (const statement of statements) {
    try {
      await sql.query(statement)
      const match = statement.match(/(?:TABLE|INDEX)\s+(?:IF\s+NOT\s+EXISTS\s+)?(\S+)/i)
      console.log(`  OK: ${match?.[1] || 'statement'}`)
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : String(error)
      if (errMsg.includes('already exists')) {
        const match = statement.match(/(?:TABLE|INDEX)\s+(?:IF\s+NOT\s+EXISTS\s+)?(\S+)/i)
        console.log(`  Already exists: ${match?.[1] || 'unknown'}`)
      } else {
        console.error(`  ERROR:`, errMsg)
      }
    }
  }

  console.log('\nSchema initialization complete!')
}

init().catch(console.error).finally(() => process.exit())
