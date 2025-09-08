"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Send, Minimize2, Volume2, VolumeX } from "lucide-react"

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [audioError, setAudioError] = useState<string | null>(null)
  const [speechSupported, setSpeechSupported] = useState(false)
  const speechSynthRef = useRef<SpeechSynthesis | null>(null)
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello, I'm Dr. Danielle Beauvais. It's wonderful to meet you! How can I help you on your wellness journey today?",
      isBot: true,
      timestamp: new Date(),
    },
  ])

  useEffect(() => {
    // Check if speech synthesis is supported
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      speechSynthRef.current = window.speechSynthesis
      setSpeechSupported(true)

      // Load voices
      const loadVoices = () => {
        const voices = speechSynthRef.current?.getVoices() || []
        console.log(
          "Available voices:",
          voices.map((v) => `${v.name} (${v.lang}) - ${v.gender || "unknown"}`),
        )
      }

      loadVoices()
      if (speechSynthRef.current) {
        speechSynthRef.current.onvoiceschanged = loadVoices
      }
    }

    return () => {
      // Cleanup
      if (currentUtteranceRef.current && speechSynthRef.current) {
        speechSynthRef.current.cancel()
      }
    }
  }, [])

  const getBestFemaleVoice = () => {
    if (!speechSynthRef.current) return null

    const voices = speechSynthRef.current.getVoices()

    // Enhanced priority order for more natural, soothing female voices
    const preferredVoices = [
      "Microsoft Aria Online (Natural)", // Edge - very natural
      "Microsoft Jenny Online (Natural)", // Edge - very natural
      "Google UK English Female", // Chrome - good quality
      "Google US English Female", // Chrome - good quality
      "Samantha", // macOS - excellent quality
      "Karen", // macOS - warm voice
      "Moira", // macOS - Irish accent, very soothing
      "Tessa", // macOS - South African accent
      "Microsoft Zira Desktop", // Windows
      "Microsoft Hazel Desktop", // Windows
      "Alex", // macOS - can be configured as female
    ]

    // First, try to find preferred voices
    for (const preferredName of preferredVoices) {
      const voice = voices.find((v) => v.name.includes(preferredName))
      if (voice) {
        console.log("Selected preferred voice:", voice.name)
        return voice
      }
    }

    // Enhanced fallback: find any natural-sounding female voice
    const femaleVoice = voices.find(
      (v) =>
        (v.name.toLowerCase().includes("female") ||
          v.name.toLowerCase().includes("woman") ||
          v.name.toLowerCase().includes("aria") ||
          v.name.toLowerCase().includes("jenny") ||
          v.name.toLowerCase().includes("zira") ||
          v.name.toLowerCase().includes("hazel") ||
          v.name.toLowerCase().includes("samantha") ||
          v.name.toLowerCase().includes("karen") ||
          v.name.toLowerCase().includes("moira") ||
          v.name.toLowerCase().includes("tessa")) &&
        !v.name.toLowerCase().includes("male"), // Exclude any that might have "male" in the name
    )

    if (femaleVoice) {
      console.log("Selected female voice:", femaleVoice.name)
      return femaleVoice
    }

    // Last resort: use default voice
    console.log("Using default voice")
    return voices[0] || null
  }

  const speakText = async (text: string) => {
    if (isMuted || !text.trim() || !speechSupported || !speechSynthRef.current) return

    try {
      setIsSpeaking(true)
      setIsAnimating(true)
      setAudioError(null)

      // Cancel any ongoing speech
      speechSynthRef.current.cancel()

      // Create new utterance
      const utterance = new SpeechSynthesisUtterance(text)
      currentUtteranceRef.current = utterance

      // Get the best female voice
      const selectedVoice = getBestFemaleVoice()
      if (selectedVoice) {
        utterance.voice = selectedVoice
      }

      // Enhanced voice settings for a more soothing, therapeutic tone
      utterance.rate = 0.75 // Slower for more calming effect
      utterance.pitch = 1.2 // Higher pitch for more feminine, soothing voice
      utterance.volume = 0.8 // Slightly softer volume

      utterance.onstart = () => {
        console.log("Speech started")
        setIsSpeaking(true)
        setIsAnimating(true)
      }

      utterance.onend = () => {
        console.log("Speech ended")
        setIsSpeaking(false)
        setIsAnimating(false)
        currentUtteranceRef.current = null
      }

      utterance.onerror = (event) => {
        console.error("Speech error:", event.error)
        setAudioError(`Speech error: ${event.error}`)
        setIsSpeaking(false)
        setIsAnimating(false)
        currentUtteranceRef.current = null
      }

      // Speak the text
      speechSynthRef.current.speak(utterance)
    } catch (error) {
      console.error("Speech error:", error)
      setAudioError(`Speech error: ${error}`)
      setIsSpeaking(false)
      setIsAnimating(false)
    }
  }

  const stopSpeaking = () => {
    if (speechSynthRef.current) {
      speechSynthRef.current.cancel()
    }
    setIsSpeaking(false)
    setIsAnimating(false)
    setAudioError(null)
    currentUtteranceRef.current = null
  }

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return

    const newMessage = {
      id: messages.length + 1,
      text: message,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setMessage("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
          context:
            "You are Dr. Danielle Beauvais, speaking directly as yourself. You help people with questions about Tai Chi, wellness practices, mental health, physical health, financial wellness, and your courses. Be compassionate, knowledgeable, and encouraging. Keep responses concise but helpful. Speak in a warm, soothing, therapeutic tone.",
        }),
      })

      const data = await response.json()
      const responseText =
        data.response ||
        "I'm here to help you with your wellness journey. Could you tell me more about what you're looking for?"

      const botResponse = {
        id: messages.length + 2,
        text: responseText,
        isBot: true,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botResponse])

      // Speak the response after a short delay
      setTimeout(() => {
        speakText(responseText)
      }, 800)
    } catch (error) {
      const errorResponse = {
        id: messages.length + 2,
        text: "I'm here to help you with your wellness journey. What specific aspect of Tai Chi or wellness would you like to explore today?",
        isBot: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorResponse])

      setTimeout(() => {
        speakText(errorResponse.text)
      }, 800)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (!isMuted) {
      stopSpeaking()
    }
    setAudioError(null)
  }

  // Test audio function with enhanced voice
  const testAudio = () => {
    speakText(
      "Hello, this is Dr. Danielle Beauvais. I'm here to guide you on your wellness journey with compassion, care, and gentle wisdom. How may I support you today?",
    )
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div
          onClick={() => setIsOpen(true)}
          className={`w-28 h-28 rounded-full cursor-pointer hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-3xl overflow-hidden border-4 border-white relative ${
            isAnimating ? "animate-pulse" : ""
          }`}
        >
          <img
            src="/images/dr-danielle-avatar.jpg"
            alt="Dr. Danielle Beauvais"
            className={`w-full h-full object-cover object-top transition-transform duration-200 ${
              isAnimating ? "scale-105" : "scale-100"
            }`}
            style={{
              filter: "brightness(1.1) contrast(1.1) saturate(1.2)",
            }}
          />
          <div className="absolute -top-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
            <div className={`w-3 h-3 bg-white rounded-full ${isSpeaking ? "animate-ping" : "animate-pulse"}`} />
          </div>
          {isSpeaking && (
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full animate-pulse" />
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card
        className={`w-80 bg-white shadow-2xl border-0 transition-all duration-300 overflow-hidden ${
          isMinimized ? "h-16" : "h-[500px]"
        }`}
        style={{
          background: "linear-gradient(135deg, #8B5CF6 0%, #A855F7 50%, #C084FC 100%)",
        }}
      >
        <CardHeader className="p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full overflow-hidden border-2 border-white/30 transition-all duration-200 ${
                  isAnimating ? "border-yellow-300 shadow-lg scale-110" : ""
                }`}
              >
                <img
                  src="/images/dr-danielle-avatar.jpg"
                  alt="Dr. Danielle"
                  className={`w-full h-full object-cover object-top transition-transform duration-200 ${
                    isAnimating ? "scale-110" : "scale-100"
                  }`}
                  style={{
                    filter: "brightness(1.1) contrast(1.1)",
                  }}
                />
              </div>
              <div>
                <h3 className="font-bold text-sm flex items-center gap-2">
                  Dr. Danielle
                  {isSpeaking && (
                    <div className="flex space-x-1">
                      <div className="w-1 h-3 bg-yellow-300 rounded-full animate-bounce" />
                      <div className="w-1 h-3 bg-yellow-300 rounded-full animate-bounce delay-100" />
                      <div className="w-1 h-3 bg-yellow-300 rounded-full animate-bounce delay-200" />
                    </div>
                  )}
                </h3>
                <div className="flex items-center gap-1">
                  <div
                    className={`w-2 h-2 rounded-full ${isSpeaking ? "bg-yellow-400 animate-ping" : "bg-green-400"}`}
                  />
                  <p className="text-xs opacity-90">
                    {isSpeaking ? "Speaking..." : speechSupported ? "Soothing Voice Ready" : "Text Only"}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {speechSupported && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={testAudio}
                  className="text-white hover:bg-white/20 p-1 h-auto text-xs"
                  title="Test Soothing Voice"
                >
                  🎵
                </Button>
              )}
              <Button
                size="sm"
                variant="ghost"
                onClick={toggleMute}
                className={`text-white hover:bg-white/20 p-1 h-auto ${isMuted ? "opacity-50" : ""}`}
                disabled={!speechSupported}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20 p-1 h-auto"
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setIsOpen(false)
                  stopSpeaking()
                }}
                className="text-white hover:bg-white/20 p-1 h-auto"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-[436px]">
            {/* Avatar Display */}
            <div className="h-64 relative overflow-hidden">
              <img
                src="/images/dr-danielle-avatar.jpg"
                alt="Dr. Danielle Beauvais"
                className={`w-full h-full object-cover object-top transition-all duration-300 ${
                  isAnimating ? "scale-105 brightness-110" : "scale-100"
                }`}
                style={{
                  filter: "brightness(1.1) contrast(1.1) saturate(1.1)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

              {/* Speaking Animation Overlay */}
              {isSpeaking && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-purple-400/20 animate-pulse" />
              )}

              {/* Voice Animation Indicator */}
              {isSpeaking && (
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-pink-600 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce delay-200" />
                    </div>
                    <span className="text-xs text-gray-700 font-medium">Speaking with care...</span>
                  </div>
                </div>
              )}

              {/* Audio Error Display */}
              {audioError && (
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-red-500/90 backdrop-blur-sm rounded-lg p-2">
                    <p className="text-white text-xs font-medium">{audioError}</p>
                    <Button
                      onClick={testAudio}
                      size="sm"
                      className="mt-1 bg-white text-red-600 hover:bg-gray-100 text-xs h-6"
                    >
                      Try Soothing Voice
                    </Button>
                  </div>
                </div>
              )}

              {/* Speech Support Info */}
              {!speechSupported && (
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-blue-500/90 backdrop-blur-sm rounded-lg p-2">
                    <p className="text-white text-xs font-medium">Voice not supported in this browser</p>
                  </div>
                </div>
              )}
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
                  {msg.isBot && (
                    <div
                      className={`w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0 transition-all duration-200 ${
                        isAnimating && msg.id === messages[messages.length - 1]?.id
                          ? "border-2 border-purple-400 shadow-lg"
                          : ""
                      }`}
                    >
                      <img
                        src="/images/dr-danielle-avatar.jpg"
                        alt="Dr. Danielle"
                        className={`w-full h-full object-cover object-top transition-transform duration-200 ${
                          isAnimating && msg.id === messages[messages.length - 1]?.id ? "scale-110" : "scale-100"
                        }`}
                        style={{
                          filter: "brightness(1.1) contrast(1.1)",
                        }}
                      />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                      msg.isBot ? "bg-gray-700 text-white rounded-bl-sm" : "bg-purple-600 text-white rounded-br-sm"
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                    {msg.isBot && speechSupported && (
                      <Button
                        onClick={() => speakText(msg.text)}
                        size="sm"
                        variant="ghost"
                        className="mt-1 text-white hover:bg-white/20 text-xs h-5 p-1"
                        title="Hear with soothing voice"
                      >
                        🎵
                      </Button>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0 border-2 border-purple-400 animate-pulse">
                    <img
                      src="/images/dr-danielle-avatar.jpg"
                      alt="Dr. Danielle"
                      className="w-full h-full object-cover object-top"
                      style={{
                        filter: "brightness(1.1) contrast(1.1)",
                      }}
                    />
                  </div>
                  <div className="bg-gray-700 text-white p-3 rounded-2xl rounded-bl-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2 items-center bg-gray-100 rounded-full px-4 py-2">
                <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src="/images/dr-danielle-avatar.jpg"
                    alt="Dr. Danielle"
                    className="w-full h-full object-cover object-top"
                    style={{
                      filter: "brightness(1.1) contrast(1.1)",
                    }}
                  />
                </div>
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask Dr. Danielle anything..."
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1 border-0 bg-transparent focus:ring-0 focus:outline-none placeholder-gray-500"
                  disabled={isLoading}
                />
                <Button
                  onClick={sendMessage}
                  size="sm"
                  disabled={isLoading || !message.trim()}
                  className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-2 h-8 w-8"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              {isSpeaking && (
                <div className="mt-2 text-center">
                  <Button onClick={stopSpeaking} size="sm" variant="outline" className="text-xs px-3 py-1 h-6">
                    Stop Speaking
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
