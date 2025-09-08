// Content management system - in production, use a proper database
import fs from 'fs'
import path from 'path'

interface ContentStore {
  pages: {
    home: HomePageContent
    about: AboutPageContent
    courses: CoursesPageContent
    classes: ClassesPageContent
    contact: ContactPageContent
    faq: FAQPageContent
  }
  global: GlobalContent
  ai: AIConfiguration
}

export interface HomePageContent {
  hero: {
    title: string
    subtitle: string
    description: string
    videoId: string
    videoThumbnail: string
  }
  wellnessPillars: Array<{
    id: string
    title: string
    description: string
    image: string
  }>
  successStories: Array<{
    id: string
    title: string
    description: string
    videoId: string
    thumbnail: string
    duration: string
    level: string
  }>
  testimonials: Array<{
    id: string
    name: string
    age: number
    location: string
    rating: number
    text: string
    course: string
    image: string
  }>
}

export interface AboutPageContent {
  hero: {
    title: string
    description: string
    videoId: string
    videoThumbnail: string
  }
  biography: {
    title: string
    content: string[]
  }
  credentials: Array<{
    id: string
    title: string
    color: string
  }>
  publications: Array<{
    id: string
    title: string
    subtitle: string
    icon: string
  }>
  affiliations: Array<{
    id: string
    name: string
  }>
  philosophy: {
    title: string
    quote: string
  }
}

export interface CoursesPageContent {
  hero: {
    title: string
    subtitle: string
    description: string
  }
  courses: Array<{
    id: string
    title: string
    subtitle: string
    description: string
    price: number
    originalPrice: number
    image: string
    duration: string
    lessons: number
    students: number
    rating: number
    level: string
    highlights: string[]
    modules: Array<{
      title: string
      duration: string
      lessons: number
      description: string
    }>
    benefits: string[]
    testimonials: Array<{
      name: string
      rating: number
      text: string
    }>
    videoId: string
    videoThumbnail: string
  }>
}

export interface ClassesPageContent {
  hero: {
    title: string
    subtitle: string
    description: string
  }
  categories: Array<{
    id: string
    name: string
    count: number
  }>
  featuredClasses: Array<{
    id: string
    title: string
    description: string
    videoId: string
    thumbnail: string
    duration: string
    level: string
    topics: string[]
    benefits: string[]
  }>
  quickPractices: Array<{
    id: string
    title: string
    description: string
    videoId: string
    thumbnail: string
    duration: string
    level: string
    topics: string[]
    benefits: string[]
  }>
}

export interface ContactPageContent {
  hero: {
    title: string
    subtitle: string
    description: string
  }
  contactInfo: {
    email: string
    phone: string
    location: string
  }
  socialMedia: Array<{
    id: string
    name: string
    url: string
    icon: string
  }>
  responseTime: {
    email: string
    phone: string
    chat: string
    emergency: string
  }
}

export interface FAQPageContent {
  hero: {
    title: string
    subtitle: string
    description: string
  }
  categories: Array<{
    id: string
    name: string
    count: number
  }>
  faqs: Array<{
    id: string
    question: string
    answer: string
    category: string
  }>
}

export interface GlobalContent {
  siteName: string
  tagline: string
  navigation: Array<{
    id: string
    name: string
    href: string
    order: number
  }>
  footer: {
    description: string
    links: Array<{
      id: string
      title: string
      items: Array<{
        id: string
        name: string
        href: string
      }>
    }>
  }
}

export interface AIConfiguration {
  chatbot: {
    systemPrompt: string
    model: string
    maxTokens: number
    temperature: number
    voiceSettings: {
      enabled: boolean
      rate: number
      pitch: number
      volume: number
      preferredVoices: string[]
    }
  }
  speech: {
    enabled: boolean
    apiKey: string
  }
}

// File path for persistence
const CONTENT_FILE_PATH = path.join(process.cwd(), 'data', 'content-store.json')

// Ensure data directory exists
function ensureDataDirectory() {
  const dataDir = path.dirname(CONTENT_FILE_PATH)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Load content from file
function loadContentFromFile(): ContentStore | null {
  try {
    ensureDataDirectory()
    if (fs.existsSync(CONTENT_FILE_PATH)) {
      const fileContent = fs.readFileSync(CONTENT_FILE_PATH, 'utf-8')
      const loadedContent = JSON.parse(fileContent)
      console.log('Content Store: Loaded content from file with', loadedContent.pages.home.testimonials.length, 'testimonials')
      return loadedContent
    } else {
      console.log('Content Store: No saved content file found, using default')
    }
  } catch (error) {
    console.error('Failed to load content from file:', error)
  }
  return null
}

// Save content to file
function saveContentToFile(content: ContentStore) {
  try {
    ensureDataDirectory()
    fs.writeFileSync(CONTENT_FILE_PATH, JSON.stringify(content, null, 2))
    console.log('Content saved to file successfully')
  } catch (error) {
    console.error('Failed to save content to file:', error)
  }
}

// Default content store
const defaultContentStore: ContentStore = {
  pages: {
    home: {
      hero: {
        title: "Holistic Wellness",
        subtitle: "Discover the ancient art of Tai Chi combined with modern therapeutic practices",
        description: "Discover the ancient art of Tai Chi combined with modern therapeutic practices. Heal your mind, strengthen your body, and create financial abundance with Dr. Danielle Beauvais.",
        videoId: "1102922216",
        videoThumbnail: "/images/dr-danielle-intro.png",
      },
      wellnessPillars: [
        {
          id: "mental-wellness",
          title: "Mental Wellness",
          description: "Overcome anxiety, depression, and stress through mindful movement",
          image:
            "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        },
        {
          id: "physical-health",
          title: "Physical Health",
          description: "Gentle healing for chronic pain, balance, and vitality",
          image:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        },
        {
          id: "financial-abundance",
          title: "Financial Abundance",
          description: "Transform your relationship with money and create wealth",
          image:
            "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        },
      ],
      successStories: [
        {
          id: "sarah-anxiety",
          title: "From Anxiety to Inner Peace - Sarah's Transformation",
          description:
            "Follow Sarah's incredible journey from daily panic attacks to finding lasting peace through Dr. Beauvais's gentle Tai Chi approach.",
          videoId: "PSq8sIZLlKs",
          thumbnail:
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
          duration: "8:32",
          level: "Beginner",
        },
        {
          id: "robert-pain",
          title: "Healing Chronic Back Pain - Robert's Recovery Story",
          description:
            "Discover how Robert overcame 20 years of chronic back pain through Dr. Beauvais's therapeutic Tai Chi program.",
          videoId: "cwlvTcWR3Gs",
          thumbnail:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
          duration: "12:15",
          level: "Therapeutic",
        },
        {
          id: "maria-financial",
          title: "Financial Breakthrough Through Mindfulness - Maria's Success",
          description:
            "Maria shares how she broke through money blocks and created her first six-figure year using Dr. Beauvais's unique financial wellness approach.",
          videoId: "Jyy0ra2WcQQ",
          thumbnail:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
          duration: "10:45",
          level: "All Levels",
        },
      ],
      testimonials: [
        {
          id: "sarah-m",
          name: "Sarah Mitchell",
          age: 42,
          location: "Seattle, WA",
          rating: 5,
          text: "I was having panic attacks daily and couldn't leave my house. Dr. Beauvais's Mental Health Mastery course gave me tools that actually work. I'm now panic-free and living my life again. This literally saved me.",
          course: "Mental Health Mastery",
          image: "/placeholder.svg?height=80&width=80",
        },
        {
          id: "robert-k",
          name: "Robert Kim",
          age: 68,
          location: "Phoenix, AZ",
          rating: 5,
          text: "After 20 years of chronic back pain, I thought I'd never be pain-free again. The Physical Wellness and Healing changed everything. I'm now more flexible and stronger than I was at 50!",
          course: "Physical Wellness and Healing",
          image: "/placeholder.svg?height=80&width=80",
        },
      ],
    },
    about: {
      hero: {
        title: "Meet Dr. Danielle Beauvais",
        description:
          "Your compassionate guide to holistic wellness through the transformative power of Tai Chi, mindful movement, and integrated healing practices.",
        videoId: "1102922216",
        videoThumbnail: "/images/dr-danielle-intro.png",
      },
      biography: {
        title: "My Journey to Wellness",
        content: [
          "Dr. Danielle Beauvais discovered the transformative power of Tai Chi during her own journey through personal challenges with anxiety and chronic pain. What began as a search for healing became a life-changing passion that has now touched thousands of lives worldwide.",
          "With over 25 years of dedicated practice and teaching, Dr. Beauvais has developed a unique approach that integrates traditional Tai Chi principles with modern therapeutic techniques. Her method addresses not just physical wellness, but the interconnected nature of mental, emotional, and financial well-being.",
          '"I believe that true healing happens when we address the whole person," says Dr. Beauvais. "Tai Chi taught me that our bodies, minds, and spirits are not separate entities, but parts of one beautiful, integrated system that deserves our gentle attention and care."',
          "Her groundbreaking work in financial wellness through mindfulness practices has helped countless individuals break free from limiting beliefs about money and abundance, creating lasting change that extends far beyond the practice mat.",
        ],
      },
      credentials: [
        { id: "tai-chi-master", title: "Certified Tai Chi Master Instructor", color: "purple" },
        { id: "therapeutic-movement", title: "Licensed Therapeutic Movement Specialist", color: "pink" },
        { id: "mbsr", title: "Certified Mindfulness-Based Stress Reduction (MBSR)", color: "orange" },
        { id: "somatic-therapy", title: "Advanced Training in Somatic Therapy", color: "teal" },
        { id: "financial-wellness", title: "Financial Wellness Coaching Certification", color: "indigo" },
      ],
      publications: [
        {
          id: "flowing-abundance",
          title: "Flowing Toward Abundance",
          subtitle: "A Guide to Financial Wellness Through Mindful Movement",
          icon: "teal",
        },
        {
          id: "healing-motion",
          title: "Healing in Motion",
          subtitle: "Tai Chi for Chronic Pain and Depression",
          icon: "blue",
        },
      ],
      affiliations: [
        { id: "aventura-hospital", name: "Aventura Hospital - H2U" },
        { id: "cancer-support", name: "Cancer Support Community of Greater Miami at Jackson North Hospital" },
        { id: "claridge-house", name: "Claridge House Nursing and Rehabilitation" },
        { id: "north-miami", name: "City of North Miami" },
        { id: "north-miami-beach", name: "City of North Miami Beach" },
        { id: "grand-court", name: "Grand Court Lakes Nursing Home" },
        { id: "hampton-court", name: "Hampton Court Nursing Home" },
        { id: "miami-jewish", name: "Miami Jewish Health Systems" },
        { id: "north-dade", name: "North Dade Nursing and Rehab" },
        { id: "nmb-library", name: "North Miami Beach Library" },
        { id: "nm-library", name: "North Miami Public Library" },
        { id: "regents-park", name: "Regents Park of Aventura" },
        { id: "tgi-precision", name: "TGI Precision Adult Day Care" },
      ],
      philosophy: {
        title: "My Teaching Philosophy",
        quote:
          "Wellness is not about perfection—it's about progress, compassion, and the courage to show up for yourself every day. Through gentle movement and mindful awareness, we create space for healing that honors both our struggles and our strength.",
      },
    },
    courses: {
      hero: {
        title: "Transform Your Life with Our Wellness Courses",
        subtitle:
          "Comprehensive programs designed to heal your mind, strengthen your body, and create financial abundance",
        description: "through the ancient wisdom of Tai Chi and modern therapeutic practices.",
      },
      courses: [
        {
          id: "mental-health",
          title: "Mental Health Mastery",
          subtitle: "Develop a personalized practice for mental resilience and healing",
          description:
            "Discover the profound connection between mindful movement and mental wellness. This comprehensive course combines ancient Tai Chi wisdom with modern therapeutic techniques to help you overcome anxiety, depression, and stress.",
          price: 99,
          originalPrice: 149,
          image:
            "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          duration: "8 weeks",
          lessons: 24,
          students: 2847,
          rating: 4.9,
          level: "All Levels",
          highlights: [
            "Daily 15-minute morning routines for anxiety relief",
            "Breathing techniques for panic attack management",
            "Mindfulness practices for emotional regulation",
            "Cognitive reframing through movement meditation",
          ],
          modules: [
            {
              title: "Foundation: Understanding the Mind-Body Connection",
              duration: "45 min",
              lessons: 3,
              description:
                "Mental illness as a dysfunction of Qi (life force) flow and nervous system dysregulation. The role of breathing in healing.",
            },
          ],
          benefits: [
            "Reduce anxiety and depression symptoms by up to 60%",
            "Develop emotional resilience and stress management skills",
            "Learn evidence-based techniques for panic attack management",
          ],
          testimonials: [
            {
              name: "Sarah M.",
              rating: 5,
              text: "This course literally saved my life. I was struggling with severe anxiety and depression, and Dr. Beauvais's approach gave me tools I use every single day.",
            },
          ],
          videoId: "PSq8sIZLlKs",
          videoThumbnail:
            "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        },
      ],
    },
    classes: {
      hero: {
        title: "Free Practice Classes",
        subtitle: "Complete Sessions, Anytime",
        description:
          "Access our complete library of full-length Tai Chi classes, breathing exercises, and meditation sessions. All free, all designed to support your wellness journey.",
      },
      categories: [
        { id: "all", name: "All Classes", count: 48 },
        { id: "beginner", name: "Beginner", count: 16 },
        { id: "intermediate", name: "Intermediate", count: 20 },
        { id: "advanced", name: "Advanced", count: 12 },
      ],
      featuredClasses: [
        {
          id: "morning-energy",
          title: "Morning Energy Flow - Complete 25 Minute Practice",
          description: "Start your day with this energizing Tai Chi sequence designed to awaken your body and mind. Perfect for beginners and includes modifications for all abilities. Ready for More? Love our free classes? Dive deeper and register for live classes now designed to transform your mental, physical, and financial well-being. Back to Home to Register for live classes or online classes",
          videoId: "6w7V1_bJcks",
          thumbnail:
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=350&q=80",
          duration: "25:00",
          level: "Beginner",
          topics: ["Morning Routine", "Energy Cultivation"],
          benefits: ["Boost natural energy", "Improve morning mood"],
        },
      ],
      quickPractices: [
        {
          id: "energy-boost",
          title: "5-Minute Quick Energy Boost",
          description: "Short but powerful sequence for when you need a quick energy boost.",
          videoId: "M2kNXbhZGBE",
          thumbnail:
            "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&q=80",
          duration: "5:45",
          level: "All Levels",
          topics: ["Quick Energy", "Office Wellness"],
          benefits: ["Instant energy boost", "Combat fatigue"],
        },
      ],
    },
    contact: {
      hero: {
        title: "Get in Touch",
        subtitle: "We're Here to Help",
        description:
          "Have questions about our wellness programs? Ready to start your transformation journey? We'd love to hear from you and support you every step of the way.",
      },
      contactInfo: {
        email: "info@taichiwithdrbeauvais.com",
        phone: "(555) 123-4567",
        location: "Online Worldwide",
      },
      socialMedia: [
        { id: "facebook", name: "Facebook", url: "#", icon: "facebook" },
        { id: "instagram", name: "Instagram", url: "#", icon: "instagram" },
        { id: "youtube", name: "YouTube", url: "#", icon: "youtube" },
        { id: "twitter", name: "Twitter", url: "#", icon: "twitter" },
      ],
      responseTime: {
        email: "Within 24 hours",
        phone: "Mon-Fri, 9AM-5PM PST",
        chat: "Available 24/7",
        emergency: "Use chat for immediate help",
      },
    },
    faq: {
      hero: {
        title: "Frequently Asked Questions",
        subtitle: "Everything you need to know about starting your wellness journey",
        description: "Find answers to common questions about our programs, practices, and approach.",
      },
      categories: [
        { id: "general", name: "General", count: 8 },
        { id: "courses", name: "Courses", count: 5 },
        { id: "practice", name: "Practice", count: 6 },
      ],
      faqs: [
        {
          id: "what-is-tai-chi",
          question: "What is Tai Chi and how can it help me?",
          answer:
            "Tai Chi is an ancient Chinese practice that combines gentle, flowing movements with deep breathing and meditation. It's often called 'meditation in motion' and has been scientifically proven to reduce stress, improve balance, alleviate chronic pain, and enhance overall well-being.",
          category: "general",
        },
        {
          id: "no-experience",
          question: "Do I need any experience to start?",
          answer:
            "Absolutely not! Our programs are designed for complete beginners. Dr. Beauvais guides you step-by-step through each movement and breathing technique.",
          category: "general",
        },
      ],
    },
  },
  global: {
    siteName: "Tai Chi with Dr. Beauvais",
    tagline: "Transform Your World Through Holistic Wellness",
    navigation: [
      { id: "home", name: "Home", href: "/", order: 1 },
      { id: "about", name: "About", href: "/about", order: 2 },
      { id: "classes", name: "Free Classes", href: "/classes", order: 3 },
      { id: "courses", name: "Courses", href: "/courses", order: 4 },
      { id: "faq", name: "FAQ", href: "/faq", order: 5 },
      { id: "contact", name: "Contact", href: "/contact", order: 6 },
    ],
    footer: {
      description: "Transform your life through the ancient art of Tai Chi combined with modern therapeutic practices.",
      links: [
        {
          id: "programs",
          title: "Programs",
          items: [
            { id: "free-classes", name: "Free Classes", href: "/classes" },
            { id: "courses", name: "Courses", href: "/courses" },
          ],
        },
        {
          id: "support",
          title: "Support",
          items: [
            { id: "faq", name: "FAQ", href: "/faq" },
            { id: "contact", name: "Contact", href: "/contact" },
          ],
        },
      ],
    },
  },
  ai: {
    chatbot: {
      systemPrompt:
        "You are Dr. Danielle Beauvais, a compassionate wellness expert and Tai Chi master with over 25 years of experience. You speak directly as Dr. Danielle, not as an assistant. You are knowledgeable, warm, and encouraging.",
      model: "llama3-8b-8192",
      maxTokens: 150,
      temperature: 0.7,
      voiceSettings: {
        enabled: true,
        rate: 0.75,
        pitch: 1.2,
        volume: 0.8,
        preferredVoices: [
          "Microsoft Aria Online (Natural)",
          "Microsoft Jenny Online (Natural)",
          "Google UK English Female",
          "Samantha",
        ],
      },
    },
    speech: {
      enabled: true,
      apiKey: "",
    },
  },
}

// Initialize content store with persistence
let contentStore: ContentStore = loadContentFromFile() || defaultContentStore
console.log('Content Store: Initialized with', contentStore.pages.home.testimonials.length, 'testimonials')

// Content management functions
export function getContent(): ContentStore {
  return contentStore
}

export function updateContent(updates: Partial<ContentStore>): void {
  contentStore = { ...contentStore, ...updates }
  saveContentToFile(contentStore)
}

export function updatePageContent<T extends keyof ContentStore["pages"]>(
  page: T,
  content: Partial<ContentStore["pages"][T]>,
): void {
  contentStore.pages[page] = { ...contentStore.pages[page], ...content }
  saveContentToFile(contentStore)
}

export function updateGlobalContent(content: Partial<GlobalContent>): void {
  contentStore.global = { ...contentStore.global, ...content }
  saveContentToFile(contentStore)
}

export function updateAIConfiguration(config: Partial<AIConfiguration>): void {
  contentStore.ai = { ...contentStore.ai, ...config }
  saveContentToFile(contentStore)
}

// Helper functions for dynamic content
export function addFAQ(faq: Omit<ContentStore["pages"]["faq"]["faqs"][0], "id">): void {
  const id = `faq-${Date.now()}`
  contentStore.pages.faq.faqs.push({ ...faq, id })
  saveContentToFile(contentStore)
}

export function updateFAQ(id: string, updates: Partial<ContentStore["pages"]["faq"]["faqs"][0]>): void {
  const index = contentStore.pages.faq.faqs.findIndex((faq) => faq.id === id)
  if (index !== -1) {
    contentStore.pages.faq.faqs[index] = { ...contentStore.pages.faq.faqs[index], ...updates }
    saveContentToFile(contentStore)
  }
}

export function deleteFAQ(id: string): void {
  contentStore.pages.faq.faqs = contentStore.pages.faq.faqs.filter((faq) => faq.id !== id)
  saveContentToFile(contentStore)
}

export function addTestimonial(testimonial: Omit<ContentStore["pages"]["home"]["testimonials"][0], "id">): void {
  const id = `testimonial-${Date.now()}`
  contentStore.pages.home.testimonials.push({ ...testimonial, id })
  saveContentToFile(contentStore)
}

export function updateTestimonial(
  id: string,
  updates: Partial<ContentStore["pages"]["home"]["testimonials"][0]>,
): void {
  const index = contentStore.pages.home.testimonials.findIndex((t) => t.id === id)
  if (index !== -1) {
    contentStore.pages.home.testimonials[index] = { ...contentStore.pages.home.testimonials[index], ...updates }
    saveContentToFile(contentStore)
  }
}

export function deleteTestimonial(id: string): void {
  contentStore.pages.home.testimonials = contentStore.pages.home.testimonials.filter((t) => t.id !== id)
  saveContentToFile(contentStore)
}

export function addFeaturedClass(classItem: Omit<ContentStore["pages"]["classes"]["featuredClasses"][0], "id">): void {
  const id = `class-${Date.now()}`
  contentStore.pages.classes.featuredClasses.push({ ...classItem, id })
  saveContentToFile(contentStore)
}

export function updateFeaturedClass(
  id: string,
  updates: Partial<ContentStore["pages"]["classes"]["featuredClasses"][0]>,
): void {
  const index = contentStore.pages.classes.featuredClasses.findIndex((c) => c.id === id)
  if (index !== -1) {
    contentStore.pages.classes.featuredClasses[index] = {
      ...contentStore.pages.classes.featuredClasses[index],
      ...updates,
    }
    saveContentToFile(contentStore)
  }
}

export function deleteFeaturedClass(id: string): void {
  contentStore.pages.classes.featuredClasses = contentStore.pages.classes.featuredClasses.filter((c) => c.id !== id)
  saveContentToFile(contentStore)
}

export function addCourse(course: Omit<ContentStore["pages"]["courses"]["courses"][0], "id">): void {
  const id = `course-${Date.now()}`
  contentStore.pages.courses.courses.push({ ...course, id })
  saveContentToFile(contentStore)
}

export function updateCourse(id: string, updates: Partial<ContentStore["pages"]["courses"]["courses"][0]>): void {
  const index = contentStore.pages.courses.courses.findIndex((c) => c.id === id)
  if (index !== -1) {
    contentStore.pages.courses.courses[index] = { ...contentStore.pages.courses.courses[index], ...updates }
    saveContentToFile(contentStore)
  }
}

export function deleteCourse(id: string): void {
  contentStore.pages.courses.courses = contentStore.pages.courses.courses.filter((c) => c.id !== id)
  saveContentToFile(contentStore)
}
