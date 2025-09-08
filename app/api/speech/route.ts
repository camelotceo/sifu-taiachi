export async function POST(request: Request) {
  try {
    const { text } = await request.json()

    if (!text || text.trim().length === 0) {
      return new Response("No text provided", { status: 400 })
    }

    // Use Web Speech API synthesis on the server side with a more natural voice
    // We'll return instructions for the client to handle speech synthesis
    return new Response(
      JSON.stringify({
        text: text,
        useClientSynthesis: true,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      },
    )
  } catch (error) {
    console.error("Speech API error:", error)
    return new Response(`Error generating speech: ${error}`, { status: 500 })
  }
}
