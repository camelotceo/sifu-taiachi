"use client"

/* Web Speech API type augmentation for TypeScript */
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionResultList {
  readonly length: number
  [index: number]: SpeechRecognitionResult
}

interface SpeechRecognitionResult {
  readonly length: number
  readonly isFinal: boolean
  [index: number]: SpeechRecognitionAlternative
}

interface SpeechRecognitionAlternative {
  readonly transcript: string
  readonly confidence: number
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  abort(): void
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: Event) => void) | null
  onend: (() => void) | null
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionInstance
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance
  }
}

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Send, Volume2, VolumeX, Mic, MicOff, Sparkles, CheckCircle2, XCircle, Loader2 } from "lucide-react"

interface Message {
  id: number
  text: string
  isBot: boolean
  timestamp: Date
  actions?: Array<{ tool: string; description: string; success: boolean }>
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm your website assistant. You can ask me to update page content, manage testimonials, FAQs, change settings, or just ask what's currently on the site. Try saying something like \"change the hero title to Welcome to Tai Chi\" or \"show me all testimonials\".",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isListening, setIsListening] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const speechSynthRef = useRef<SpeechSynthesis | null>(null)
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  const [speechSupported, setSpeechSupported] = useState(false)
  const [micSupported, setMicSupported] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("speechSynthesis" in window) {
        speechSynthRef.current = window.speechSynthesis
        setSpeechSupported(true)
        // Load voices
        const loadVoices = () => {
          speechSynthRef.current?.getVoices()
        }
        loadVoices()
        if (speechSynthRef.current) {
          speechSynthRef.current.onvoiceschanged = loadVoices
        }
      }
      if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
        setMicSupported(true)
      }
    }
    return () => {
      if (speechSynthRef.current) {
        speechSynthRef.current.cancel()
      }
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
    }
  }, [])

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  const getVoice = useCallback(() => {
    if (!speechSynthRef.current) return null
    const voices = speechSynthRef.current.getVoices()
    const preferred = [
      "Samantha",
      "Karen",
      "Google US English Female",
      "Google UK English Female",
      "Microsoft Aria Online (Natural)",
      "Microsoft Jenny Online (Natural)",
    ]
    for (const name of preferred) {
      const v = voices.find((voice) => voice.name.includes(name))
      if (v) return v
    }
    return voices[0] || null
  }, [])

  const speakText = useCallback(
    (text: string) => {
      if (isMuted || !speechSupported || !speechSynthRef.current || !text.trim()) return

      speechSynthRef.current.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      currentUtteranceRef.current = utterance

      const voice = getVoice()
      if (voice) utterance.voice = voice

      utterance.rate = 0.85
      utterance.pitch = 1.1
      utterance.volume = 0.9

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => {
        setIsSpeaking(false)
        currentUtteranceRef.current = null
      }
      utterance.onerror = () => {
        setIsSpeaking(false)
        currentUtteranceRef.current = null
      }

      speechSynthRef.current.speak(utterance)
    },
    [isMuted, speechSupported, getVoice]
  )

  const stopSpeaking = useCallback(() => {
    if (speechSynthRef.current) speechSynthRef.current.cancel()
    setIsSpeaking(false)
    currentUtteranceRef.current = null
  }, [])

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      if (!prev) stopSpeaking()
      return !prev
    })
  }, [stopSpeaking])

  const startListening = useCallback(() => {
    if (!micSupported) return
    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognitionAPI) return
    const recognition = new SpeechRecognitionAPI()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = "en-US"

    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript || ""
      if (transcript) {
        setMessage(transcript)
      }
    }
    recognition.onerror = () => setIsListening(false)
    recognition.onend = () => setIsListening(false)

    recognitionRef.current = recognition
    recognition.start()
    setIsListening(true)
  }, [micSupported])

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop()
    setIsListening(false)
  }, [])

  const sendMessage = useCallback(async () => {
    const trimmed = message.trim()
    if (!trimmed || isLoading) return

    const userMsg: Message = {
      id: Date.now(),
      text: trimmed,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    setMessage("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/admin/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      })

      const data = await response.json()

      const botMsg: Message = {
        id: Date.now() + 1,
        text:
          data.response ||
          "I had trouble with that request. Could you try again?",
        isBot: true,
        timestamp: new Date(),
        actions: data.actions,
      }

      setMessages((prev) => [...prev, botMsg])

      // Speak the response
      setTimeout(() => speakText(botMsg.text), 400)
    } catch {
      const errorMsg: Message = {
        id: Date.now() + 1,
        text: "Sorry, something went wrong. Please try again.",
        isBot: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMsg])
    } finally {
      setIsLoading(false)
    }
  }, [message, isLoading, speakText])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        sendMessage()
      }
    },
    [sendMessage]
  )

  // Floating button when closed
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => {
            setIsOpen(true)
            setTimeout(() => inputRef.current?.focus(), 300)
          }}
          className="group flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          title="AI Assistant"
        >
          <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        </button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)]">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden" style={{ height: "min(600px, calc(100vh - 6rem))" }}>
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">AI Assistant</h3>
              <p className="text-white/70 text-xs">
                {isSpeaking
                  ? "Speaking..."
                  : isListening
                    ? "Listening..."
                    : "Ask me anything"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {speechSupported && (
              <Button
                size="sm"
                variant="ghost"
                onClick={toggleMute}
                className="text-white hover:bg-white/20 p-1.5 h-auto"
                title={isMuted ? "Unmute voice" : "Mute voice"}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </Button>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setIsOpen(false)
                stopSpeaking()
                stopListening()
              }}
              className="text-white hover:bg-white/20 p-1.5 h-auto"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
              <div className={`max-w-[85%] ${msg.isBot ? "" : ""}`}>
                <div
                  className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.isBot
                      ? "bg-white text-gray-800 border border-gray-100 shadow-sm rounded-bl-md"
                      : "bg-purple-600 text-white rounded-br-md"
                  }`}
                >
                  {msg.text}
                </div>

                {/* Actions badges */}
                {msg.actions && msg.actions.length > 0 && (
                  <div className="mt-1.5 space-y-1">
                    {msg.actions.map((action, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs ${
                          action.success
                            ? "bg-green-50 text-green-700 border border-green-100"
                            : "bg-red-50 text-red-700 border border-red-100"
                        }`}
                      >
                        {action.success ? (
                          <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-3 h-3 flex-shrink-0" />
                        )}
                        <span>{action.description}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-100 shadow-sm px-4 py-3 rounded-2xl rounded-bl-md">
                <div className="flex items-center gap-2 text-gray-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-xs">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Speaking indicator */}
        {isSpeaking && (
          <div className="px-4 py-2 bg-purple-50 border-t border-purple-100 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="flex space-x-0.5">
                <div className="w-1 h-3 bg-purple-500 rounded-full animate-bounce" />
                <div className="w-1 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                <div className="w-1 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              </div>
              <span className="text-xs text-purple-600 font-medium">Speaking...</span>
            </div>
            <button
              onClick={stopSpeaking}
              className="text-xs text-purple-600 hover:text-purple-800 font-medium"
            >
              Stop
            </button>
          </div>
        )}

        {/* Input area */}
        <div className="p-3 border-t border-gray-200 bg-white flex-shrink-0">
          <div className="flex items-center gap-2">
            {micSupported && (
              <button
                onClick={isListening ? stopListening : startListening}
                className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                  isListening
                    ? "bg-red-100 text-red-600 animate-pulse"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
                title={isListening ? "Stop listening" : "Voice input"}
              >
                {isListening ? (
                  <MicOff className="w-4 h-4" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </button>
            )}
            <Input
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isListening ? "Listening..." : "Type a command or ask a question..."}
              className="flex-1 border-gray-200 rounded-full text-sm h-9 focus-visible:ring-purple-500"
              disabled={isLoading}
            />
            <Button
              onClick={sendMessage}
              size="sm"
              disabled={isLoading || !message.trim()}
              className="flex-shrink-0 w-9 h-9 rounded-full bg-purple-600 hover:bg-purple-700 text-white p-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {/* Quick suggestions */}
          <div className="mt-2 flex flex-wrap gap-1">
            {[
              "Show testimonials",
              "List FAQs",
              "View home page",
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  setMessage(suggestion)
                  setTimeout(() => inputRef.current?.focus(), 50)
                }}
                className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-purple-50 hover:text-purple-600 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
