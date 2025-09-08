// Video data for all sections of the website

export interface VideoData {
  id: string
  title: string
  description: string
  vimeoId?: string
  youtubeId?: string
  thumbnail: string
  duration: string
  level: string
  instructor: string
  topics: string[]
  benefits: string[]
}

export const videoData = {
  // Hero video
  heroVideo: {
    id: "hero-welcome",
    title: "Welcome Message from Dr. Beauvais",
    description:
      "Discover how Tai Chi can Transform Your World Through Holistic Wellness practices that heal your mind, strengthen your body, and create financial abundance.",
    vimeoId: "1102922216",
    thumbnail: "/images/hero-video-thumbnail.jpg",
    duration: "3:45",
    level: "Introduction",
    instructor: "Dr. Danielle Beauvais",
    topics: ["Welcome", "Introduction", "Tai Chi Benefits", "Holistic Wellness"],
    benefits: ["Understanding the approach", "Getting started", "Setting expectations", "Inspiration"],
  },

  // About page video
  aboutVideo: {
    id: "about-dr-beauvais",
    title: "Meet Dr. Danielle Beauvais - Your Wellness Guide",
    description:
      "Get to know Dr. Danielle Beauvais and her compassionate approach to holistic wellness. Learn about her journey, philosophy, and how she can help you transform your life through Tai Chi and mindful practices.",
    youtubeId: "3gtyTDXa0j0",
    duration: "20:15",
    level: "All Levels",
    instructor: "Dr. Danielle Beauvais",
    thumbnail: "/images/dr-danielle-intro.png",
    topics: ["Dr. Beauvais's Journey", "Teaching Philosophy", "Holistic Approach", "Personal Story", "Wellness Vision"],
    benefits: [
      "Connect with Dr. Beauvais personally",
      "Understand her teaching approach",
      "Learn about her wellness philosophy",
      "Feel inspired by her journey",
      "Build trust and confidence",
    ],
  },

  // Success stories videos - Updated with specified names
  successStories: [
    {
      id: "wellness-transformation",
      title: "Jacqueline",
      description:
        "Jacqueline shares her inspiring story of complete life transformation through Dr. Beauvais's holistic Tai Chi approach, finding balance in mind, body, and spirit.",
      vimeoId: "1104929012",
      thumbnail: "/images/success-stories/thumb-new-first.png",
      duration: "11:45",
      level: "All Levels",
      instructor: "Dr. Danielle Beauvais",
      topics: ["Holistic Wellness", "Life Transformation", "Mind-Body Balance", "Personal Growth"],
      benefits: ["Complete life balance", "Improved well-being", "Spiritual growth", "Renewed vitality"],
    },
    {
      id: "sarah-anxiety",
      title: "Joanna",
      description:
        "Follow Joanna's incredible journey from daily panic attacks to finding lasting peace through Dr. Beauvais's gentle Tai Chi approach.",
      vimeoId: "1102921684",
      thumbnail: "/images/success-stories/thumb-1.jpg",
      duration: "8:32",
      level: "Beginner",
      instructor: "Dr. Danielle Beauvais",
      topics: ["Anxiety Relief", "Panic Attacks", "Mental Health", "Personal Story"],
      benefits: ["Reduced anxiety", "Better sleep", "Increased confidence", "Daily peace"],
    },
    {
      id: "robert-pain",
      title: "Maria",
      description:
        "Discover how Maria overcame 20 years of chronic back pain through Dr. Beauvais's therapeutic Tai Chi program.",
      vimeoId: "1102921676",
      thumbnail: "/images/success-stories/thumb-2-new.jpg",
      duration: "12:15",
      level: "Therapeutic",
      instructor: "Dr. Danielle Beauvais",
      topics: ["Chronic Pain", "Back Pain", "Physical Healing", "Recovery Story"],
      benefits: ["Pain reduction", "Improved mobility", "Better posture", "Increased strength"],
    },
    {
      id: "maria-financial",
      title: "Miguel",
      description:
        "Miguel shares how he broke through money blocks and created his first six-figure year using Dr. Beauvais's unique financial wellness approach.",
      vimeoId: "1102921664",
      thumbnail: "/images/success-stories/thumb-3.jpg",
      duration: "10:45",
      level: "All Levels",
      instructor: "Dr. Danielle Beauvais",
      topics: ["Financial Wellness", "Money Blocks", "Abundance Mindset", "Success Story"],
      benefits: ["Increased income", "Better money relationship", "Reduced financial stress", "Abundance mindset"],
    },
    {
      id: "jennifer-depression",
      title: "Dr. Raida",
      description:
        "Dr. Raida's powerful story of healing from depression and finding joy again through Dr. Beauvais's compassionate Tai Chi approach.",
      vimeoId: "1102921650",
      thumbnail: "/images/success-stories/thumb-2.jpg",
      duration: "9:20",
      level: "All Levels",
      instructor: "Dr. Danielle Beauvais",
      topics: ["Depression Recovery", "Mental Health", "Emotional Healing", "Hope"],
      benefits: ["Improved mood", "Emotional stability", "Renewed hope", "Life transformation"],
    },
  ],

  // Interview videos - Updated with correct Vimeo IDs
  interviews: [
    {
      id: "mental-wellness-interview",
      title: "Mental Wellness Through Tai Chi",
      description:
        "Dr. Beauvais discusses how Tai Chi can transform mental health, reduce anxiety, and create lasting emotional balance.",
      vimeoId: "1102970478",
      thumbnail: "/images/interviews/thumb-mental.jpg",
      duration: "15:30",
      level: "All Levels",
      instructor: "Dr. Danielle Beauvais",
      topics: ["Mental Health", "Anxiety Relief", "Emotional Balance", "Mindfulness"],
      benefits: ["Reduced stress", "Better emotional regulation", "Increased mental clarity", "Inner peace"],
    },
    {
      id: "physical-health-interview",
      title: "Physical Wellness and Healing",
      description:
        "Learn about the physical benefits of Tai Chi for chronic pain, balance, and overall health improvement.",
      vimeoId: "1102970827",
      thumbnail: "/images/interviews/thumb-physical.jpg",
      duration: "18:45",
      level: "All Levels",
      instructor: "Dr. Danielle Beauvais",
      topics: ["Physical Health", "Chronic Pain", "Balance", "Mobility"],
      benefits: ["Pain relief", "Better balance", "Increased flexibility", "Improved strength"],
    },
    {
      id: "financial-abundance-interview",
      title: "Financial Abundance Mindset",
      description:
        "Revolutionary approach to manifest financial abundance through mindfulness practices. Break through money blocks and create a healthy, abundant relationship with wealth.",
      vimeoId: "1102970368",
      thumbnail: "/images/interviews/thumb-finance.jpg",
      duration: "20:15",
      level: "All Levels",
      instructor: "Dr. Danielle Beauvais",
      topics: ["Financial Wellness", "Abundance Mindset", "Money Blocks", "Prosperity"],
      benefits: [
        "Identifying and releasing money blocks",
        "Abundance meditation and visualization",
        "Reduced financial stressMindful spending and saving practices",
        "Wealth consciousness",
      ],
    },
  ],

  // Featured classes for the free videos section
  featuredClasses: [
    {
      id: "morning-energy",
      title: "Morning Energy Flow - Complete 25 Minute Practice",
      description:
        "Start your day with this energizing Tai Chi sequence designed to awaken your body and mind. Perfect for beginners and includes modifications for all abilities. Ready for More? Love our free classes? Dive deeper and register for live classes now designed to transform your mental, physical, and financial well-being. Back to Home to Register for live classes or online classes Perfect for beginners and includes modifications for all abilities.",
      youtubeId: "6w7V1_bJcks",
      duration: "25:00",
      level: "Beginner",
      instructor: "Dr. Danielle Beauvais",
      thumbnail:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=350&q=80",
      topics: ["Morning Routine", "Energy Cultivation", "Gentle Awakening", "Breath Work"],
      benefits: ["Boost natural energy", "Improve morning mood", "Enhance focus", "Create positive habits"],
    },
    {
      id: "stress-relief",
      title: "Stress Relief Breathing & Movement",
      description:
        "Powerful combination of breathing techniques and gentle movements to release tension and anxiety. Perfect for busy people who need quick stress relief.",
      youtubeId: "PSq8sIZLlKs",
      duration: "15:30",
      level: "All Levels",
      instructor: "Dr. Danielle Beauvais",
      thumbnail:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=350&q=80",
      topics: ["Stress Management", "Breathing Techniques", "Tension Release", "Quick Relief"],
      benefits: ["Reduce stress instantly", "Lower anxiety levels", "Release tension", "Improve balance"],
    },
    {
      id: "chair-seniors",
      title: "Chair Tai Chi for Seniors - Full Session",
      description:
        "Complete Tai Chi practice adapted for chair use. Perfect for those with limited mobility or anyone who prefers seated practice.",
      youtubeId: "dOskZDad3kE",
      duration: "30:45",
      level: "Senior Friendly",
      instructor: "Dr. Danielle Beauvais",
      thumbnail:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=350&q=80",
      topics: ["Chair Adaptations", "Senior Safety", "Circulation", "Balance Training"],
      benefits: ["Practice safely seated", "Improve circulation", "Enhance balance", "Boost cognitive function"],
    },
  ],

  // Quick practice videos for the free videos section
  quickPractices: [
    {
      id: "energy-boost",
      title: "5-Minute Quick Energy Boost",
      description:
        "Short but powerful sequence for when you need a quick energy boost. Perfect for office breaks or mid-day slumps.",
      youtubeId: "M2kNXbhZGBE",
      duration: "5:45",
      level: "All Levels",
      instructor: "Dr. Danielle Beauvais",
      thumbnail:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&q=80",
      topics: ["Quick Energy", "Office Wellness", "Micro-Breaks", "Instant Vitality"],
      benefits: ["Instant energy boost", "Combat fatigue", "Improve focus", "Reduce work stress"],
    },
    {
      id: "back-pain",
      title: "Lower Back Pain Relief Sequence",
      description:
        "Targeted movements specifically designed to ease lower back pain and improve spinal mobility. Gentle and therapeutic approach.",
      youtubeId: "cwlvTcWR3Gs",
      duration: "12:20",
      level: "Therapeutic",
      instructor: "Dr. Danielle Beauvais",
      thumbnail:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&q=80",
      topics: ["Back Pain Relief", "Spinal Health", "Therapeutic Movement", "Pain Management"],
      benefits: ["Reduce back pain naturally", "Improve flexibility", "Strengthen muscles", "Prevent injury"],
    },
    {
      id: "balance-training",
      title: "Balance & Fall Prevention Training",
      description:
        "Improve your balance and confidence with these targeted exercises. Especially beneficial for older adults.",
      youtubeId: "dOskZDad3kE",
      duration: "18:15",
      level: "Senior Friendly",
      instructor: "Dr. Danielle Beauvais",
      thumbnail:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&q=80",
      topics: ["Balance Training", "Fall Prevention", "Stability", "Coordination"],
      benefits: ["Improve balance significantly", "Reduce fall risk", "Build confidence", "Enhance coordination"],
    },
  ],

  // Course videos for the courses preview section
  courseVideos: {
    "mental-health": {
      id: "mental-health-preview",
      title: "Mental Health Mastery Course Preview",
      description:
        "Get a preview of our comprehensive Mental Health Mastery course and see how Tai Chi can transform your mental wellness.",
      vimeoId: "1102970478",
      thumbnail:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      duration: "5:30",
      level: "All Levels",
      instructor: "Dr. Danielle Beauvais",
      topics: ["Mental Health", "Course Preview", "Anxiety Relief", "Depression Support"],
      benefits: ["Course overview", "Learning expectations", "Transformation preview", "Getting started"],
    },
    "physical-health": {
      id: "physical-health-preview",
      title: "Physical Wellness and Healing Course Preview",
      description: "Explore our Physical Wellness and Healing course designed for gentle healing and strength building.",
      vimeoId: "1102970827",
      thumbnail:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      duration: "6:15",
      level: "All Levels",
      instructor: "Dr. Danielle Beauvais",
      topics: ["Physical Health", "Course Preview", "Gentle Movement", "Pain Relief"],
      benefits: ["Course structure", "Exercise modifications", "Healing approach", "Progress tracking"],
    },
    "financial-health": {
      id: "financial-health-preview",
      title: "Financial Abundance Mindset Course Preview",
      description: "Discover our unique approach to financial wellness through mindfulness and abundance practices.",
      vimeoId: "1102970368",
      thumbnail:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      duration: "7:00",
      level: "All Levels",
      instructor: "Dr. Danielle Beauvais",
      topics: ["Financial Wellness", "Course Preview", "Abundance Mindset", "Money Blocks"],
      benefits: ["Financial transformation", "Mindset shifts", "Practical tools", "Wealth building"],
    },
  },

  // Course detail videos
  courseDetailVideos: {
    "mental-health": [
      {
        id: "mental-health-intro",
        title: "Course Introduction - Mental Health Mastery",
        description: "Welcome to your journey of mental wellness transformation through Tai Chi and mindfulness.",
        youtubeId: "PSq8sIZLlKs",
        duration: "5:30",
        level: "All Levels",
        instructor: "Dr. Danielle Beauvais",
        thumbnail:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        topics: ["Course Overview", "Mental Health", "Expectations", "Getting Started"],
        benefits: ["Understand course structure", "Set clear intentions", "Prepare for transformation"],
      },
    ],
    "physical-health": [
      {
        id: "physical-health-intro",
        title: "Course Introduction - Physical Wellness and Healing",
        description: "Begin your path to physical healing and vitality through gentle, therapeutic Tai Chi practices.",
        youtubeId: "cwlvTcWR3Gs",
        duration: "6:15",
        level: "All Levels",
        instructor: "Dr. Danielle Beauvais",
        thumbnail:
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        topics: ["Course Overview", "Physical Wellness", "Safety Guidelines", "Modifications"],
        benefits: ["Understand course approach", "Learn safety principles", "Prepare for healing"],
      },
    ],
    "financial-health": [
      {
        id: "financial-health-intro",
        title: "Course Introduction - Financial Abundance Mindset",
        description: "Transform your relationship with money through mindfulness and abundance practices.",
        youtubeId: "Jyy0ra2WcQQ",
        duration: "4:45",
        level: "All Levels",
        instructor: "Dr. Danielle Beauvais",
        thumbnail:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        topics: ["Course Overview", "Financial Wellness", "Money Mindset", "Abundance Principles"],
        benefits: ["Understand financial wellness", "Identify money blocks", "Set abundance intentions"],
      },
    ],
  },
}
