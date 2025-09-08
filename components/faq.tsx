"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react"

const faqs = [
  {
    id: 1,
    question: "What is Tai Chi and how can it help me?",
    answer:
      "Tai Chi is an ancient Chinese practice that combines gentle, flowing movements with deep breathing and meditation. It's often called 'meditation in motion' and has been scientifically proven to reduce stress, improve balance, alleviate chronic pain, and enhance overall well-being. It's particularly beneficial for seniors and those dealing with depression or anxiety.",
  },
  {
    id: 2,
    question: "Do I need any experience to start?",
    answer:
      "Absolutely not! Our programs are designed for complete beginners. Dr. Beauvais guides you step-by-step through each movement and breathing technique. The beauty of Tai Chi is that it meets you where you are - whether you're 25 or 85, dealing with physical limitations, or completely new to mindful movement.",
  },
  {
    id: 3,
    question: "How is financial wellness connected to Tai Chi?",
    answer:
      "Our financial wellness approach combines mindfulness practices with practical money management. Through meditation and breathing techniques, we help you identify and release limiting beliefs about money, develop an abundance mindset, and make financial decisions from a place of calm clarity rather than stress or fear.",
  },
  {
    id: 4,
    question: "What equipment do I need?",
    answer:
      "One of the wonderful things about Tai Chi is that you need virtually nothing to get started! Just comfortable clothing that allows you to move freely and a small space (even 6x6 feet is enough). For some practices, you might want a yoga mat for floor exercises, but it's not required.",
  },
  {
    id: 5,
    question: "How long before I see results?",
    answer:
      "Many students report feeling more relaxed and centered after their very first session! For physical benefits like improved balance and reduced pain, most people notice changes within 2-4 weeks of regular practice. Mental and emotional benefits often appear even sooner, sometimes within days of starting.",
  },
  {
    id: 6,
    question: "Are the courses suitable for seniors?",
    answer:
      "Yes! Our programs are specifically designed to be senior-friendly. All movements can be modified for different mobility levels, and many can even be done seated. Dr. Beauvais has extensive experience working with older adults and understands the unique challenges and needs of this population.",
  },
  {
    id: 7,
    question: "What's the difference between free videos and paid courses?",
    answer:
      "Our free videos are complete practice sessions that give you a taste of our approach. The paid courses offer structured, progressive learning with detailed instruction, personalized modifications, community support, and comprehensive materials covering mental, physical, and financial wellness strategies.",
  },
  {
    id: 8,
    question: "Can Tai Chi help with depression and anxiety?",
    answer:
      "Yes, numerous studies have shown that Tai Chi can significantly reduce symptoms of depression and anxiety. The combination of gentle movement, deep breathing, and mindful awareness helps regulate the nervous system, reduce stress hormones, and promote the release of mood-enhancing endorphins.",
  },
  {
    id: 9,
    question: "Does Tai Chi really help with mental illness?",
    answer:
      "Tai Chi can help with mental illness by reducing stress, anxiety, and depression through its gentle, mindful movements and deep breathing techniques. It promotes relaxation and improves emotional regulation ,which can help stabilize mood and reduce negative thought patterns. Practicing Tai Chi regularly can also enhance self-awareness, boost self-esteem, and improve sleep—factors that are often disrupted in mental illness. Its meditative nature fosters a sense of inner calm and connection, supporting overall mental health and well-being.",
  },
  {
    id: 10,
    question: "Why practice Tai Chi?",
    answer:
      "Practicing Tai Chi regularly has been shown to have a variety of positive effects on overall wellness supported by both scientific studies and traditional practices.",
  },
  {
    id: 11,
    question: "Can practicing Tai Chi reduce stress?",
    answer:
      "Tai Chi’s slow, mindful movements combined with deep breathing activates the parasympathetic nervous system (the 'rest and digest'mode) tolower cortisol (stress hormone) levels and help practitioners feel more relaxed.",
  },
  {
    id: 12,
    question: "Does Tai Chi Improve mood and reduce symptoms of Depression and Anxiety?",
    answer:
      "Physical movement, breath focus, and meditative attention in Tai Chi can alter brain chemistry (increased serotonin, dopamine). Several clinical trials show reductions in anxiety, depression, and mood disturbances, especially in older adults or those with chronic illness.",
  },
  {
    id: 13,
    question: "How about memory, coordination and attention can Tai Chi practice help keep my brain active? ",
    answer:
      "Studies (particularly in older adults) show improvements in executive function, memory, and processing speed.",
  },
  {
    id: 14,
    question: "What can Tai Chi help improve in my life?",
    answer:
      "For one focused awareness to help reduce rumination and regulate emotions - Improves Sleep Quality by reducing physical and mental tension and promoting relaxation - better balance, strength, and control - feeling more confident in your physical and mental capabilities - higher self-esteem and resilience in daily life.",
  },
  {
    id: 15,
    question: "How long and how often do I practice Tai Chi?",
    answer:
      "According to Sifu Beauvais, practicing Tai Chi for better health and wellness upon waking for about 15-30 minutes and before sleep 10-20 minutes daily.",
  },
  {
    id: 16,
    question: "Can I take Tai Chi classes for health on a regular basis?",
    answer:
      "Absolutely... You may register for in person and online Tai Chi/Qigong classes at the luncheon.",
  },
]

export function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (id: number) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <section id="faq" className="py-20 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <HelpCircle className="w-12 h-12 text-sage-500 mx-auto mb-4" />
            <h2 className="text-4xl font-light text-sage-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-sage-600">Everything you need to know about starting your wellness journey</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <Card key={faq.id} className="bg-white/90 backdrop-blur-sm border-sage-200 overflow-hidden">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full p-6 text-left hover:bg-sage-50/50 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-300 focus:ring-inset"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-sage-800 pr-4">{faq.question}</h3>
                      {openItems.includes(faq.id) ? (
                        <ChevronUp className="w-5 h-5 text-sage-600 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-sage-600 flex-shrink-0" />
                      )}
                    </div>
                  </button>

                  {openItems.includes(faq.id) && (
                    <div className="px-6 pb-6">
                      <p className="text-sage-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-sage-600 mb-4">Still have questions?</p>
            <p className="text-sage-600">
              Our AI assistant is here to help, or you can{" "}
              <a href="mailto:info@taichiwithdrbeauvais.com" className="text-ocean-600 hover:text-ocean-700 underline">
                contact us directly
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
