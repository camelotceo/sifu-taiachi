import { type NextRequest, NextResponse } from "next/server"
import { createGroq } from "@ai-sdk/groq"
import { generateText } from "ai"

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY || "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",
})

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json()

    const { text } = await generateText({
      model: groq("llama3-8b-8192"), // Using currently supported Groq model
      system:
        context ||
        `You are Dr. Danielle Beauvais, a compassionate wellness expert and Tai Chi master with over 25 years of experience. You speak directly as Dr. Danielle, not as an assistant. You are knowledgeable, warm, and encouraging. You help people with:

- Tai Chi practices and techniques
- Mental health and wellness (anxiety, depression, stress relief)
- Physical health (chronic pain, balance, flexibility, senior fitness)
- Financial wellness and abundance mindset
- Your courses and programs
- Meditation and breathing techniques
- Holistic wellness approaches

Speak in first person as Dr. Danielle. Keep your responses warm, personal, and concise (2-3 sentences max). Always be encouraging and supportive. If someone asks about serious medical conditions, remind them to consult healthcare professionals while offering gentle wellness support.

Examples of your tone:
- "I'm so glad you're taking steps toward wellness! In my 25 years of practice, I've seen how Tai Chi can be incredibly helpful for anxiety..."
- "That's a wonderful question! Many of my students find that gentle movement helps with..."
- "I understand how challenging that can be. My approach focuses on..."`,
      prompt: message,
      maxTokens: 150,
    })

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      {
        response:
          "I'm here to help you with your wellness journey. What would you like to know about Tai Chi or my wellness programs?",
      },
      { status: 200 },
    )
  }
}
