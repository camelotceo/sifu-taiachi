"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Save, CheckCircle } from "lucide-react"

interface ContactData {
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

export default function AdminContactPage() {
  const [data, setData] = useState<ContactData>({
    hero: { title: "", subtitle: "", description: "" },
    contactInfo: { email: "", phone: "", location: "" },
    socialMedia: [],
    responseTime: { email: "", phone: "", chat: "", emergency: "" },
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    fetch("/api/admin/pages/contact")
      .then((res) => res.json())
      .then((pageData) => setData(pageData))
      .catch((error) => console.error("Failed to load contact data:", error))
  }, [])

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await fetch("/api/admin/pages/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 2000)
    } catch (error) {
      console.error("Failed to save contact page:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const addSocialMedia = () => {
    const newSocial = {
      id: `social-${Date.now()}`,
      name: "",
      url: "",
      icon: "facebook",
    }
    setData({ ...data, socialMedia: [...data.socialMedia, newSocial] })
  }

  const updateSocialMedia = (id: string, field: string, value: string) => {
    setData({
      ...data,
      socialMedia: data.socialMedia.map((social) => (social.id === id ? { ...social, [field]: value } : social)),
    })
  }

  const deleteSocialMedia = (id: string) => {
    setData({
      ...data,
      socialMedia: data.socialMedia.filter((social) => social.id !== id),
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
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
          {/* Hero Section */}
          <Card>
            <CardHeader>
              <CardTitle>Page Header</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <Input
                  value={data.hero.title}
                  onChange={(e) => setData({ ...data, hero: { ...data.hero, title: e.target.value } })}
                  placeholder="Contact page title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                <Input
                  value={data.hero.subtitle}
                  onChange={(e) => setData({ ...data, hero: { ...data.hero, subtitle: e.target.value } })}
                  placeholder="Contact page subtitle"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <Textarea
                  value={data.hero.description}
                  onChange={(e) => setData({ ...data, hero: { ...data.hero, description: e.target.value } })}
                  placeholder="Contact page description"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <Input
                  type="email"
                  value={data.contactInfo.email}
                  onChange={(e) => setData({ ...data, contactInfo: { ...data.contactInfo, email: e.target.value } })}
                  placeholder="contact@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <Input
                  value={data.contactInfo.phone}
                  onChange={(e) => setData({ ...data, contactInfo: { ...data.contactInfo, phone: e.target.value } })}
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <Input
                  value={data.contactInfo.location}
                  onChange={(e) => setData({ ...data, contactInfo: { ...data.contactInfo, location: e.target.value } })}
                  placeholder="Online Worldwide"
                />
              </div>
            </CardContent>
          </Card>

          {/* Response Times */}
          <Card>
            <CardHeader>
              <CardTitle>Response Times</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Response</label>
                  <Input
                    value={data.responseTime.email}
                    onChange={(e) =>
                      setData({ ...data, responseTime: { ...data.responseTime, email: e.target.value } })
                    }
                    placeholder="Within 24 hours"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Availability</label>
                  <Input
                    value={data.responseTime.phone}
                    onChange={(e) =>
                      setData({ ...data, responseTime: { ...data.responseTime, phone: e.target.value } })
                    }
                    placeholder="Mon-Fri, 9AM-5PM PST"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Chat Availability</label>
                  <Input
                    value={data.responseTime.chat}
                    onChange={(e) => setData({ ...data, responseTime: { ...data.responseTime, chat: e.target.value } })}
                    placeholder="Available 24/7"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                  <Input
                    value={data.responseTime.emergency}
                    onChange={(e) =>
                      setData({ ...data, responseTime: { ...data.responseTime, emergency: e.target.value } })
                    }
                    placeholder="Use chat for immediate help"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Media */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Social Media</CardTitle>
                <Button onClick={addSocialMedia} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Social Media
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.socialMedia.map((social) => (
                  <div key={social.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-medium">Social Media Link</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteSocialMedia(social.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
                        <Input
                          value={social.name}
                          onChange={(e) => updateSocialMedia(social.id, "name", e.target.value)}
                          placeholder="Facebook"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
                        <Input
                          value={social.url}
                          onChange={(e) => updateSocialMedia(social.id, "url", e.target.value)}
                          placeholder="https://facebook.com/yourpage"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                        <select
                          value={social.icon}
                          onChange={(e) => updateSocialMedia(social.id, "icon", e.target.value)}
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="facebook">Facebook</option>
                          <option value="instagram">Instagram</option>
                          <option value="youtube">YouTube</option>
                          <option value="twitter">Twitter</option>
                          <option value="linkedin">LinkedIn</option>
                          <option value="tiktok">TikTok</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
