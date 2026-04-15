/**
 * Database seed script
 * Run: npx tsx lib/db/seed.ts
 *
 * Seeds the Vercel Postgres database with existing content from
 * content-store.json and video-data.tsx
 */

import { config } from 'dotenv'
config({ path: '.env.local' })
import { sql } from '@vercel/postgres'
import { readFileSync } from 'fs'
import { join } from 'path'

async function seed() {
  console.log('Starting database seed...')

  // Read existing content store
  const contentStorePath = join(process.cwd(), 'data', 'content-store.json')
  const contentStore = JSON.parse(readFileSync(contentStorePath, 'utf-8'))

  // 1. Seed page content
  console.log('Seeding page content...')
  const pages = ['home', 'about', 'courses', 'classes', 'contact', 'faq']
  for (const page of pages) {
    if (contentStore.pages[page]) {
      await sql`
        INSERT INTO page_content (id, page_name, content, updated_by)
        VALUES (${'page-' + page}, ${page}, ${JSON.stringify(contentStore.pages[page])}, ${'seed-script'})
        ON CONFLICT (page_name) DO UPDATE SET content = ${JSON.stringify(contentStore.pages[page])}, updated_at = NOW()
      `
      console.log(`  Seeded page: ${page}`)
    }
  }

  // 2. Seed global settings
  console.log('Seeding global settings...')
  const globalSettings = {
    ...contentStore.global,
    ai: contentStore.ai,
  }
  await sql`
    INSERT INTO global_settings (id, settings, updated_by)
    VALUES ('global', ${JSON.stringify(globalSettings)}, 'seed-script')
    ON CONFLICT (id) DO UPDATE SET settings = ${JSON.stringify(globalSettings)}, updated_at = NOW()
  `

  // 3. Seed videos from video-data.tsx
  console.log('Seeding videos...')

  // Hero video
  await insertVideo({
    id: 'hero-welcome',
    title: 'Welcome Message from Dr. Beauvais',
    description: 'Discover how Tai Chi can Transform Your World Through Holistic Wellness.',
    vimeo_id: '1102922216',
    youtube_id: null,
    thumbnail: '/images/hero-video-thumbnail.jpg',
    duration: '3:45',
    level: 'Introduction',
    category: 'hero',
    topics: ['Welcome', 'Introduction', 'Tai Chi Benefits', 'Holistic Wellness'],
    benefits: ['Understanding the approach', 'Getting started', 'Setting expectations', 'Inspiration'],
    sort_order: 0,
  })

  // About video
  await insertVideo({
    id: 'about-dr-beauvais',
    title: 'Meet Dr. Danielle Beauvais - Your Wellness Guide',
    description: 'Get to know Dr. Danielle Beauvais and her compassionate approach to holistic wellness.',
    vimeo_id: null,
    youtube_id: '3gtyTDXa0j0',
    thumbnail: '/images/dr-danielle-intro.png',
    duration: '20:15',
    level: 'All Levels',
    category: 'about',
    topics: ["Dr. Beauvais's Journey", 'Teaching Philosophy', 'Holistic Approach'],
    benefits: ['Connect with Dr. Beauvais personally', 'Understand her teaching approach'],
    sort_order: 0,
  })

  // Success stories
  const successStories = [
    { id: 'wellness-transformation', title: 'Jacqueline', vimeo_id: '1104929012', thumbnail: '/images/success-stories/thumb-new-first.png', duration: '11:45', sort_order: 0 },
    { id: 'sarah-anxiety', title: 'Joanna', vimeo_id: '1102921684', thumbnail: '/images/success-stories/thumb-1.jpg', duration: '8:32', sort_order: 1 },
    { id: 'robert-pain', title: 'Maria', vimeo_id: '1102921676', thumbnail: '/images/success-stories/thumb-2-new.jpg', duration: '12:15', sort_order: 2 },
    { id: 'maria-financial', title: 'Miguel', vimeo_id: '1102921664', thumbnail: '/images/success-stories/thumb-3.jpg', duration: '10:45', sort_order: 3 },
    { id: 'jennifer-depression', title: 'Dr. Raida', vimeo_id: '1102921650', thumbnail: '/images/success-stories/thumb-2.jpg', duration: '9:20', sort_order: 4 },
  ]
  for (const story of successStories) {
    await insertVideo({
      ...story,
      description: `${story.title}'s transformation story`,
      youtube_id: null,
      level: 'All Levels',
      category: 'success_story',
      topics: ['Transformation', 'Personal Story'],
      benefits: ['Inspiration', 'Hope'],
    })
  }

  // Interviews
  const interviews = [
    { id: 'mental-wellness-interview', title: 'Mental Wellness Through Tai Chi', vimeo_id: '1102970478', thumbnail: '/images/interviews/thumb-mental.jpg', duration: '15:30', sort_order: 0, topics: ['Mental Health', 'Anxiety Relief', 'Emotional Balance', 'Mindfulness'] },
    { id: 'physical-health-interview', title: 'Physical Wellness and Healing', vimeo_id: '1102970827', thumbnail: '/images/interviews/thumb-physical.jpg', duration: '18:45', sort_order: 1, topics: ['Physical Health', 'Chronic Pain', 'Balance', 'Mobility'] },
    { id: 'financial-abundance-interview', title: 'Financial Abundance Mindset', vimeo_id: '1102970368', thumbnail: '/images/interviews/thumb-finance.jpg', duration: '20:15', sort_order: 2, topics: ['Financial Wellness', 'Abundance Mindset', 'Money Blocks', 'Prosperity'] },
  ]
  for (const interview of interviews) {
    await insertVideo({
      ...interview,
      description: `Dr. Beauvais discusses ${interview.title.toLowerCase()}.`,
      youtube_id: null,
      level: 'All Levels',
      category: 'interview',
      benefits: ['Knowledge', 'Understanding', 'Motivation'],
    })
  }

  // Featured classes
  const featuredClasses = [
    { id: 'morning-energy', title: 'Morning Energy Flow - Complete 25 Minute Practice', youtube_id: '6w7V1_bJcks', duration: '25:00', level: 'Beginner', sort_order: 0 },
    { id: 'stress-relief', title: 'Stress Relief Breathing & Movement', youtube_id: 'PSq8sIZLlKs', duration: '15:30', level: 'All Levels', sort_order: 1 },
    { id: 'chair-seniors', title: 'Chair Tai Chi for Seniors - Full Session', youtube_id: 'dOskZDad3kE', duration: '30:45', level: 'Senior Friendly', sort_order: 2 },
  ]
  for (const cls of featuredClasses) {
    await insertVideo({
      ...cls,
      description: `Full-length ${cls.title.toLowerCase()} class`,
      vimeo_id: null,
      thumbnail: null,
      category: 'featured_class',
      topics: ['Practice', 'Wellness'],
      benefits: ['Improved health', 'Stress relief'],
    })
  }

  // Quick practices
  const quickPractices = [
    { id: 'energy-boost', title: '5-Minute Quick Energy Boost', youtube_id: 'M2kNXbhZGBE', duration: '5:45', level: 'All Levels', sort_order: 0 },
    { id: 'back-pain', title: 'Lower Back Pain Relief Sequence', youtube_id: 'cwlvTcWR3Gs', duration: '12:20', level: 'Therapeutic', sort_order: 1 },
    { id: 'balance-training', title: 'Balance & Fall Prevention Training', youtube_id: 'dOskZDad3kE', duration: '18:15', level: 'Senior Friendly', sort_order: 2 },
  ]
  for (const qp of quickPractices) {
    await insertVideo({
      ...qp,
      description: `Quick practice: ${qp.title}`,
      vimeo_id: null,
      thumbnail: null,
      category: 'quick_practice',
      topics: ['Quick Practice'],
      benefits: ['Quick results'],
    })
  }

  // 4. Seed testimonials
  console.log('Seeding testimonials...')
  const testimonials = contentStore.pages.home.testimonials || []
  // Also include the defaults from content-store.ts if the JSON doesn't have the good ones
  const defaultTestimonials = [
    { id: 'sarah-m', name: 'Sarah Mitchell', age: 42, location: 'Seattle, WA', rating: 5, text: "I was having panic attacks daily and couldn't leave my house. Dr. Beauvais's Mental Health Mastery course gave me tools that actually work. I'm now panic-free and living my life again. This literally saved me.", course: 'Mental Health Mastery', image: '/placeholder.svg?height=80&width=80' },
    { id: 'robert-k', name: 'Robert Kim', age: 68, location: 'Phoenix, AZ', rating: 5, text: "After 20 years of chronic back pain, I thought I'd never be pain-free again. The Physical Wellness and Healing changed everything. I'm now more flexible and stronger than I was at 50!", course: 'Physical Wellness and Healing', image: '/placeholder.svg?height=80&width=80' },
  ]

  const testimonialsToSeed = testimonials.length > 0 && testimonials[0]?.id !== 'persistence-test'
    ? testimonials
    : defaultTestimonials

  for (let i = 0; i < testimonialsToSeed.length; i++) {
    const t = testimonialsToSeed[i]
    await sql`
      INSERT INTO testimonials (id, name, age, location, rating, text, course, image, sort_order)
      VALUES (${t.id}, ${t.name}, ${t.age}, ${t.location}, ${t.rating}, ${t.text}, ${t.course}, ${t.image}, ${i})
      ON CONFLICT (id) DO UPDATE SET name = ${t.name}, text = ${t.text}, updated_at = NOW()
    `
  }
  console.log(`  Seeded ${testimonialsToSeed.length} testimonials`)

  // 5. Seed FAQs
  console.log('Seeding FAQs...')
  const faqs = contentStore.pages.faq.faqs || []
  for (let i = 0; i < faqs.length; i++) {
    const f = faqs[i]
    await sql`
      INSERT INTO faqs (id, question, answer, category, sort_order)
      VALUES (${f.id}, ${f.question}, ${f.answer}, ${f.category}, ${i})
      ON CONFLICT (id) DO UPDATE SET question = ${f.question}, answer = ${f.answer}, updated_at = NOW()
    `
  }
  console.log(`  Seeded ${faqs.length} FAQs`)

  // 6. Seed courses
  console.log('Seeding courses...')
  const courses = contentStore.pages.courses.courses || []
  for (let i = 0; i < courses.length; i++) {
    const c = courses[i]
    await sql`
      INSERT INTO courses (id, title, subtitle, description, price, original_price, image, duration, lessons, students, rating, level, highlights, modules, benefits, testimonials, video_id, video_thumbnail, sort_order)
      VALUES (${c.id}, ${c.title}, ${c.subtitle}, ${c.description}, ${c.price}, ${c.originalPrice}, ${c.image}, ${c.duration}, ${c.lessons}, ${c.students}, ${c.rating}, ${c.level}, ${c.highlights}, ${JSON.stringify(c.modules)}, ${c.benefits}, ${JSON.stringify(c.testimonials)}, ${c.videoId}, ${c.videoThumbnail}, ${i})
      ON CONFLICT (id) DO UPDATE SET title = ${c.title}, description = ${c.description}, updated_at = NOW()
    `
  }
  console.log(`  Seeded ${courses.length} courses`)

  // 7. Seed default Eventbrite event (the currently hardcoded one)
  console.log('Seeding Eventbrite events...')
  await sql`
    INSERT INTO eventbrite_events (id, title, description, url, status, is_primary)
    VALUES (
      'default-enrollment',
      'Tai Chi with Dr. Beauvais - Financial Abundance Luncheon',
      'Join Dr. Beauvais for a transformative luncheon on manifesting financial abundance through Tai Chi.',
      'https://www.eventbrite.com/e/tai-chi-with-dr-beauvais-to-manifest-financial-abundance-luncheon-tickets-1668941100759?aff=oddtdtcreator',
      'live',
      true
    )
    ON CONFLICT (id) DO NOTHING
  `
  console.log('  Seeded default Eventbrite event')

  console.log('\nSeed complete!')
}

async function insertVideo(video: {
  id: string
  title: string
  description: string | null
  vimeo_id: string | null
  youtube_id: string | null
  thumbnail: string | null
  duration: string
  level: string
  category: string
  topics: string[]
  benefits: string[]
  sort_order: number
  course_id?: string | null
}) {
  await sql`
    INSERT INTO videos (id, title, description, vimeo_id, youtube_id, thumbnail, duration, level, instructor, category, topics, benefits, sort_order, course_id)
    VALUES (${video.id}, ${video.title}, ${video.description}, ${video.vimeo_id}, ${video.youtube_id}, ${video.thumbnail}, ${video.duration}, ${video.level}, ${'Dr. Danielle Beauvais'}, ${video.category}, ${video.topics as unknown as string}, ${video.benefits as unknown as string}, ${video.sort_order}, ${video.course_id ?? null})
    ON CONFLICT (id) DO UPDATE SET title = ${video.title}, updated_at = NOW()
  `
  console.log(`  Seeded video: ${video.title}`)
}

seed().catch(console.error)
