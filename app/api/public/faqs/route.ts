import { NextResponse } from "next/server"
import { getAllFAQs } from "@/lib/data/faqs"

export async function GET() {
  const cacheHeaders = {
    "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
  }

  try {
    const faqs = await getAllFAQs()
    if (faqs && faqs.length > 0) {
      return NextResponse.json(faqs, { headers: cacheHeaders })
    }
  } catch (error) {
    console.error("Public FAQs API: DB read failed, using fallback", error)
  }

  // Fallback to hardcoded data
  const fallback = [
    { id: "1", question: "What is Tai Chi and how can it help me?", answer: "Tai Chi is an ancient Chinese practice that combines gentle, flowing movements with deep breathing and meditation. It's often called 'meditation in motion' and has been scientifically proven to reduce stress, improve balance, alleviate chronic pain, and enhance overall well-being. It's particularly beneficial for seniors and those dealing with depression or anxiety.", category: "general", sort_order: 0 },
    { id: "2", question: "Do I need any experience to start?", answer: "Absolutely not! Our programs are designed for complete beginners. Dr. Beauvais guides you step-by-step through each movement and breathing technique. The beauty of Tai Chi is that it meets you where you are - whether you're 25 or 85, dealing with physical limitations, or completely new to mindful movement.", category: "general", sort_order: 1 },
    { id: "3", question: "How is financial wellness connected to Tai Chi?", answer: "Our financial wellness approach combines mindfulness practices with practical money management. Through meditation and breathing techniques, we help you identify and release limiting beliefs about money, develop an abundance mindset, and make financial decisions from a place of calm clarity rather than stress or fear.", category: "general", sort_order: 2 },
    { id: "4", question: "What equipment do I need?", answer: "One of the wonderful things about Tai Chi is that you need virtually nothing to get started! Just comfortable clothing that allows you to move freely and a small space (even 6x6 feet is enough). For some practices, you might want a yoga mat for floor exercises, but it's not required.", category: "general", sort_order: 3 },
    { id: "5", question: "How long before I see results?", answer: "Many students report feeling more relaxed and centered after their very first session! For physical benefits like improved balance and reduced pain, most people notice changes within 2-4 weeks of regular practice. Mental and emotional benefits often appear even sooner, sometimes within days of starting.", category: "general", sort_order: 4 },
    { id: "6", question: "Are the courses suitable for seniors?", answer: "Yes! Our programs are specifically designed to be senior-friendly. All movements can be modified for different mobility levels, and many can even be done seated. Dr. Beauvais has extensive experience working with older adults and understands the unique challenges and needs of this population.", category: "general", sort_order: 5 },
    { id: "7", question: "What's the difference between free videos and paid courses?", answer: "Our free videos are complete practice sessions that give you a taste of our approach. The paid courses offer structured, progressive learning with detailed instruction, personalized modifications, community support, and comprehensive materials covering mental, physical, and financial wellness strategies.", category: "general", sort_order: 6 },
    { id: "8", question: "Can Tai Chi help with depression and anxiety?", answer: "Yes, numerous studies have shown that Tai Chi can significantly reduce symptoms of depression and anxiety. The combination of gentle movement, deep breathing, and mindful awareness helps regulate the nervous system, reduce stress hormones, and promote the release of mood-enhancing endorphins.", category: "general", sort_order: 7 },
    { id: "9", question: "Does Tai Chi really help with mental illness?", answer: "Tai Chi can help with mental illness by reducing stress, anxiety, and depression through its gentle, mindful movements and deep breathing techniques. It promotes relaxation and improves emotional regulation ,which can help stabilize mood and reduce negative thought patterns. Practicing Tai Chi regularly can also enhance self-awareness, boost self-esteem, and improve sleep\u2014factors that are often disrupted in mental illness. Its meditative nature fosters a sense of inner calm and connection, supporting overall mental health and well-being.", category: "general", sort_order: 8 },
    { id: "10", question: "Why practice Tai Chi?", answer: "Practicing Tai Chi regularly has been shown to have a variety of positive effects on overall wellness supported by both scientific studies and traditional practices.", category: "general", sort_order: 9 },
    { id: "11", question: "Can practicing Tai Chi reduce stress?", answer: "Tai Chi's slow, mindful movements combined with deep breathing activates the parasympathetic nervous system (the 'rest and digest'mode) tolower cortisol (stress hormone) levels and help practitioners feel more relaxed.", category: "general", sort_order: 10 },
    { id: "12", question: "Does Tai Chi Improve mood and reduce symptoms of Depression and Anxiety?", answer: "Physical movement, breath focus, and meditative attention in Tai Chi can alter brain chemistry (increased serotonin, dopamine). Several clinical trials show reductions in anxiety, depression, and mood disturbances, especially in older adults or those with chronic illness.", category: "general", sort_order: 11 },
    { id: "13", question: "How about memory, coordination and attention can Tai Chi practice help keep my brain active? ", answer: "Studies (particularly in older adults) show improvements in executive function, memory, and processing speed.", category: "general", sort_order: 12 },
    { id: "14", question: "What can Tai Chi help improve in my life?", answer: "For one focused awareness to help reduce rumination and regulate emotions - Improves Sleep Quality by reducing physical and mental tension and promoting relaxation - better balance, strength, and control - feeling more confident in your physical and mental capabilities - higher self-esteem and resilience in daily life.", category: "general", sort_order: 13 },
    { id: "15", question: "How long and how often do I practice Tai Chi?", answer: "According to Sifu Beauvais, practicing Tai Chi for better health and wellness upon waking for about 15-30 minutes and before sleep 10-20 minutes daily.", category: "general", sort_order: 14 },
    { id: "16", question: "Can I take Tai Chi classes for health on a regular basis?", answer: "Absolutely... You may register for in person and online Tai Chi/Qigong classes at the luncheon.", category: "general", sort_order: 15 },
  ]

  return NextResponse.json(fallback, { headers: cacheHeaders })
}
