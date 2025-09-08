"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Save, CheckCircle } from "lucide-react"

interface AboutData {
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
  affiliations: Array<{
    id: string
    name: string
  }>
  philosophy: {
    title: string
    quote: string
  }
}

export default function AdminAboutPage() {
  const [data, setData] = useState<AboutData>({
    hero: { title: "", description: "", videoId: "", videoThumbnail: "" },
    biography: { title: "", content: [] },
    credentials: [],
    affiliations: [],
    philosophy: { title: "", quote: "" },
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    fetch("/api/admin/pages/about")
      .then((res) => res.json())
      .then((pageData) => setData(pageData))
      .catch((error) => console.error("Failed to load about data:", error))
  }, [])

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await fetch("/api/admin/pages/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 2000)
    } catch (error) {
      console.error("Failed to save about page:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const addCredential = () => {
    const newCredential = {
      id: `credential-${Date.now()}`,
      title: "",
      color: "purple",
    }
    setData({ ...data, credentials: [...data.credentials, newCredential] })
  }

  const updateCredential = (id: string, field: string, value: string) => {
    setData({
      ...data,
      credentials: data.credentials.map((cred) => (cred.id === id ? { ...cred, [field]: value } : cred)),
    })
  }

  const deleteCredential = (id: string) => {
    setData({
      ...data,
      credentials: data.credentials.filter((cred) => cred.id !== id),
    })
  }

  const addAffiliation = () => {
    const newAffiliation = {
      id: `affiliation-${Date.now()}`,
      name: "",
    }
    setData({ ...data, affiliations: [...data.affiliations, newAffiliation] })
  }

  const updateAffiliation = (id: string, name: string) => {
    setData({
      ...data,
      affiliations: data.affiliations.map((aff) => (aff.id === id ? { ...aff, name } : aff)),
    })
  }

  const deleteAffiliation = (id: string) => {
    setData({
      ...data,
      affiliations: data.affiliations.filter((aff) => aff.id !== id),
    })
  }

  const updateBiographyParagraph = (index: number, content: string) => {
    const newContent = [...data.biography.content]
    newContent[index] = content
    setData({
      ...data,
      biography: { ...data.biography, content: newContent },
    })
  }

  const addBiographyParagraph = () => {
    setData({
      ...data,
      biography: { ...data.biography, content: [...data.biography.content, ""] },
    })
  }

  const deleteBiographyParagraph = (index: number) => {
    const newContent = data.biography.content.filter((_, i) => i !== index)
    setData({
      ...data,
      biography: { ...data.biography, content: newContent },
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
              <CardTitle>Hero Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <Input
                  value={data.hero.title}
                  onChange={(e) => setData({ ...data, hero: { ...data.hero, title: e.target.value } })}
                  placeholder="About page title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <Textarea
                  value={data.hero.description}
                  onChange={(e) => setData({ ...data, hero: { ...data.hero, description: e.target.value } })}
                  placeholder="About page description"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Video ID</label>
                  <Input
                    value={data.hero.videoId}
                    onChange={(e) => setData({ ...data, hero: { ...data.hero, videoId: e.target.value } })}
                    placeholder="YouTube video ID"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Video Thumbnail URL</label>
                  <Input
                    value={data.hero.videoThumbnail}
                    onChange={(e) => setData({ ...data, hero: { ...data.hero, videoThumbnail: e.target.value } })}
                    placeholder="Thumbnail image URL"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Biography */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Biography</CardTitle>
                <Button onClick={addBiographyParagraph} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Paragraph
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                <Input
                  value={data.biography.title}
                  onChange={(e) => setData({ ...data, biography: { ...data.biography, title: e.target.value } })}
                  placeholder="Biography section title"
                />
              </div>
              <div className="space-y-4">
                {data.biography.content.map((paragraph, index) => (
                  <div key={index} className="flex gap-2">
                    <Textarea
                      value={paragraph}
                      onChange={(e) => updateBiographyParagraph(index, e.target.value)}
                      placeholder={`Paragraph ${index + 1}`}
                      rows={4}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteBiographyParagraph(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Credentials */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Credentials</CardTitle>
                <Button onClick={addCredential} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Credential
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.credentials.map((credential) => (
                  <div key={credential.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="flex-1">
                      <Input
                        value={credential.title}
                        onChange={(e) => updateCredential(credential.id, "title", e.target.value)}
                        placeholder="Credential title"
                      />
                    </div>
                    <div className="w-32">
                      <select
                        value={credential.color}
                        onChange={(e) => updateCredential(credential.id, "color", e.target.value)}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="purple">Purple</option>
                        <option value="pink">Pink</option>
                        <option value="orange">Orange</option>
                        <option value="teal">Teal</option>
                        <option value="indigo">Indigo</option>
                        <option value="blue">Blue</option>
                      </select>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteCredential(credential.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Affiliations */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Affiliations</CardTitle>
                <Button onClick={addAffiliation} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Affiliation
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.affiliations.map((affiliation) => (
                  <div key={affiliation.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="flex-1">
                      <Input
                        value={affiliation.name}
                        onChange={(e) => updateAffiliation(affiliation.id, e.target.value)}
                        placeholder="Organization name"
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteAffiliation(affiliation.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Philosophy */}
          <Card>
            <CardHeader>
              <CardTitle>Teaching Philosophy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                <Input
                  value={data.philosophy.title}
                  onChange={(e) => setData({ ...data, philosophy: { ...data.philosophy, title: e.target.value } })}
                  placeholder="Philosophy section title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quote</label>
                <Textarea
                  value={data.philosophy.quote}
                  onChange={(e) => setData({ ...data, philosophy: { ...data.philosophy, quote: e.target.value } })}
                  placeholder="Teaching philosophy quote"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
