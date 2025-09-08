"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, GripVertical, Save, CheckCircle } from "lucide-react"

interface GlobalData {
  siteName: string
  tagline: string
  navigation: Array<{
    id: string
    name: string
    href: string
    order: number
  }>
  footer: {
    description: string
    links: Array<{
      id: string
      title: string
      items: Array<{
        id: string
        name: string
        href: string
      }>
    }>
  }
}

export default function AdminGlobalPage() {
  const [data, setData] = useState<GlobalData>({
    siteName: "",
    tagline: "",
    navigation: [],
    footer: { description: "", links: [] },
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    fetch("/api/admin/global")
      .then((res) => res.json())
      .then((globalData) => setData(globalData))
      .catch((error) => console.error("Failed to load global data:", error))
  }, [])

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await fetch("/api/admin/global", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 2000)
    } catch (error) {
      console.error("Failed to save global settings:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const addNavItem = () => {
    const newItem = {
      id: `nav-${Date.now()}`,
      name: "",
      href: "",
      order: data.navigation.length + 1,
    }
    setData({ ...data, navigation: [...data.navigation, newItem] })
  }

  const updateNavItem = (id: string, field: string, value: string | number) => {
    setData({
      ...data,
      navigation: data.navigation.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    })
  }

  const deleteNavItem = (id: string) => {
    setData({
      ...data,
      navigation: data.navigation.filter((item) => item.id !== id),
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
          {/* Site Information */}
          <Card>
            <CardHeader>
              <CardTitle>Site Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                <Input
                  value={data.siteName}
                  onChange={(e) => setData({ ...data, siteName: e.target.value })}
                  placeholder="Tai Chi with Dr. Beauvais"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
                <Input
                  value={data.tagline}
                  onChange={(e) => setData({ ...data, tagline: e.target.value })}
                  placeholder="Transform Your World Through Holistic Wellness"
                />
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Navigation Menu</CardTitle>
                <Button onClick={addNavItem} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Menu Item
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.navigation
                  .sort((a, b) => a.order - b.order)
                  .map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <GripVertical className="w-4 h-4 text-gray-400" />
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                          <Input
                            value={item.name}
                            onChange={(e) => updateNavItem(item.id, "name", e.target.value)}
                            placeholder="Menu item name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
                          <Input
                            value={item.href}
                            onChange={(e) => updateNavItem(item.id, "href", e.target.value)}
                            placeholder="/page-url"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                          <Input
                            type="number"
                            value={item.order}
                            onChange={(e) => updateNavItem(item.id, "order", Number.parseInt(e.target.value))}
                            placeholder="1"
                          />
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteNavItem(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <Card>
            <CardHeader>
              <CardTitle>Footer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Footer Description</label>
                <Textarea
                  value={data.footer.description}
                  onChange={(e) => setData({ ...data, footer: { ...data.footer, description: e.target.value } })}
                  placeholder="Site description for footer"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
