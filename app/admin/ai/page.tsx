"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Volume2, MessageSquare, Settings, Save, CheckCircle } from "lucide-react"

export default function AIConfigurationPage() {
  const [config, setConfig] = useState({
    chatbot: {
      systemPrompt: "",
      model: "llama3-8b-8192",
      maxTokens: 150,
      temperature: 0.7,
      voiceSettings: {
        enabled: true,
        rate: 0.75,
        pitch: 1.2,
        volume: 0.8,
        preferredVoices: [],
      },
    },
    speech: {
      enabled: true,
      apiKey: "",
    },
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    // Load current AI configuration
    fetch("/api/admin/ai")
      .then((res) => res.json())
      .then((data) => setConfig(data))
  }, [])

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await fetch("/api/admin/ai", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      })
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 2000)
    } catch (error) {
      console.error("Failed to save AI configuration:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const availableVoices = [
    "Microsoft Aria Online (Natural)",
    "Microsoft Jenny Online (Natural)",
    "Google UK English Female",
    "Google US English Female",
    "Samantha",
    "Karen",
    "Moira",
    "Tessa",
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Save Button - Fixed at top */}
        <div className="mb-6 flex justify-end">
          <Button onClick={handleSave} disabled={isLoading} className="bg-green-600 hover:bg-green-700 text-white">
            {isLoading ? (
              "Saving..."
            ) : isSaved ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Saved!
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>

        <div className="space-y-8">
          {/* Chatbot Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Chatbot Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">System Prompt</label>
                <Textarea
                  value={config.chatbot.systemPrompt}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      chatbot: { ...config.chatbot, systemPrompt: e.target.value },
                    })
                  }
                  rows={6}
                  placeholder="Enter the system prompt that defines the AI's personality and behavior..."
                  className="w-full"
                />
                <p className="text-sm text-gray-500 mt-1">
                  This prompt defines how the AI chatbot behaves and responds to users.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">AI Model</label>
                  <Select
                    value={config.chatbot.model}
                    onValueChange={(value) =>
                      setConfig({
                        ...config,
                        chatbot: { ...config.chatbot, model: value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="llama3-8b-8192">Llama 3 8B</SelectItem>
                      <SelectItem value="llama3-70b-8192">Llama 3 70B</SelectItem>
                      <SelectItem value="mixtral-8x7b-32768">Mixtral 8x7B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Tokens</label>
                  <Input
                    type="number"
                    value={config.chatbot.maxTokens}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        chatbot: { ...config.chatbot, maxTokens: Number.parseInt(e.target.value) },
                      })
                    }
                    min="50"
                    max="500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Temperature: {config.chatbot.temperature}
                </label>
                <Slider
                  value={[config.chatbot.temperature]}
                  onValueChange={([value]) =>
                    setConfig({
                      ...config,
                      chatbot: { ...config.chatbot, temperature: value },
                    })
                  }
                  min={0}
                  max={1}
                  step={0.1}
                  className="w-full"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Controls randomness in responses. Lower values are more focused, higher values are more creative.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Voice Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="w-5 h-5" />
                Voice Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Enable Voice Responses</h3>
                  <p className="text-sm text-gray-500">Allow the chatbot to speak responses aloud</p>
                </div>
                <Switch
                  checked={config.chatbot.voiceSettings.enabled}
                  onCheckedChange={(checked) =>
                    setConfig({
                      ...config,
                      chatbot: {
                        ...config.chatbot,
                        voiceSettings: { ...config.chatbot.voiceSettings, enabled: checked },
                      },
                    })
                  }
                />
              </div>

              {config.chatbot.voiceSettings.enabled && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Speech Rate: {config.chatbot.voiceSettings.rate}
                    </label>
                    <Slider
                      value={[config.chatbot.voiceSettings.rate]}
                      onValueChange={([value]) =>
                        setConfig({
                          ...config,
                          chatbot: {
                            ...config.chatbot,
                            voiceSettings: { ...config.chatbot.voiceSettings, rate: value },
                          },
                        })
                      }
                      min={0.5}
                      max={2}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pitch: {config.chatbot.voiceSettings.pitch}
                    </label>
                    <Slider
                      value={[config.chatbot.voiceSettings.pitch]}
                      onValueChange={([value]) =>
                        setConfig({
                          ...config,
                          chatbot: {
                            ...config.chatbot,
                            voiceSettings: { ...config.chatbot.voiceSettings, pitch: value },
                          },
                        })
                      }
                      min={0.5}
                      max={2}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Volume: {config.chatbot.voiceSettings.volume}
                    </label>
                    <Slider
                      value={[config.chatbot.voiceSettings.volume]}
                      onValueChange={([value]) =>
                        setConfig({
                          ...config,
                          chatbot: {
                            ...config.chatbot,
                            voiceSettings: { ...config.chatbot.voiceSettings, volume: value },
                          },
                        })
                      }
                      min={0.1}
                      max={1}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Voices</label>
                    <div className="space-y-2">
                      {availableVoices.map((voice) => (
                        <div key={voice} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={voice}
                            checked={config.chatbot.voiceSettings.preferredVoices.includes(voice)}
                            onChange={(e) => {
                              const voices = e.target.checked
                                ? [...config.chatbot.voiceSettings.preferredVoices, voice]
                                : config.chatbot.voiceSettings.preferredVoices.filter((v) => v !== voice)
                              setConfig({
                                ...config,
                                chatbot: {
                                  ...config.chatbot,
                                  voiceSettings: { ...config.chatbot.voiceSettings, preferredVoices: voices },
                                },
                              })
                            }}
                            className="rounded border-gray-300"
                          />
                          <label htmlFor={voice} className="text-sm text-gray-700">
                            {voice}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Speech API Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Speech API Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Enable Speech API</h3>
                  <p className="text-sm text-gray-500">Use external speech synthesis service</p>
                </div>
                <Switch
                  checked={config.speech.enabled}
                  onCheckedChange={(checked) =>
                    setConfig({
                      ...config,
                      speech: { ...config.speech, enabled: checked },
                    })
                  }
                />
              </div>

              {config.speech.enabled && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                  <Input
                    type="password"
                    value={config.speech.apiKey}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        speech: { ...config.speech, apiKey: e.target.value },
                      })
                    }
                    placeholder="Enter your speech API key..."
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
