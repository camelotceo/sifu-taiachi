"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Save, CheckCircle } from "lucide-react"

interface FAQData {
  hero: {
    title: string
    subtitle: string
    description: string
  }
  categories: Array<{
    id: string
    name: string
    count: number
  }>
  faqs: Array<{
    id: string
    question: string
    answer: string
    category: string
  }>
}

export default function AdminFAQPage() {
  const [data, setData] = useState<FAQData>({
    hero: { title: "", subtitle: "", description: "" },
    categories: [],
    faqs: [],
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    fetch("/api/admin/pages/faq")
      .then((res) => res.json())
      .then((pageData) => setData(pageData))
      .catch((error) => console.error("Failed to load FAQ data:", error))
  }, [])

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await fetch("/api/admin/pages/faq", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 2000)
    } catch (error) {
      console.error("Failed to save FAQ page:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const addFAQ = () => {
    const newFAQ = {
      id: `faq-${Date.now()}`,
      question: "",
      answer: "",
      category: data.categories[0]?.id || "general",
    }
    setData({ ...data, faqs: [...data.faqs, newFAQ] })
  }

  const updateFAQ = (id: string, field: string, value: string) => {
    setData({
      ...data,
      faqs: data.faqs.map((faq) => (faq.id === id ? { ...faq, [field]: value } : faq)),
    })
  }

  const deleteFAQ = (id: string) => {
    setData({
      ...data,
      faqs: data.faqs.filter((faq) => faq.id !== id),
    })
  }

  const addCategory = () => {
    const newCategory = {
      id: `category-${Date.now()}`,
      name: "New Category",
      count: 0,
    }
    setData({ ...data, categories: [...data.categories, newCategory] })
  }

  const updateCategory = (id: string, field: string, value: string | number) => {
    setData({
      ...data,
      categories: data.categories.map((cat) => (cat.id === id ? { ...cat, [field]: value } : cat)),
    })
  }

  const deleteCategory = (id: string) => {
    setData({
      ...data,
      categories: data.categories.filter((cat) => cat.id !== id),
      faqs: data.faqs.filter((faq) => faq.category !== id),
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
                  placeholder="FAQ page title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                <Input
                  value={data.hero.subtitle}
                  onChange={(e) => setData({ ...data, hero: { ...data.hero, subtitle: e.target.value } })}
                  placeholder="FAQ page subtitle"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <Textarea
                  value={data.hero.description}
                  onChange={(e) => setData({ ...data, hero: { ...data.hero, description: e.target.value } })}
                  placeholder="FAQ page description"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>FAQ Categories</CardTitle>
                <Button onClick={addCategory} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Category
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.categories.map((category) => (
                  <div key={category.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="flex-1">
                      <Input
                        value={category.name}
                        onChange={(e) => updateCategory(category.id, "name", e.target.value)}
                        placeholder="Category name"
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteCategory(category.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* FAQs */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>FAQ Items</CardTitle>
                <Button onClick={addFAQ} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add FAQ
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {data.faqs.map((faq) => (
                  <div key={faq.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-medium">FAQ Item</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteFAQ(faq.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <Select value={faq.category} onValueChange={(value) => updateFAQ(faq.id, "category", value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {data.categories.map((cat) => (
                              <SelectItem key={cat.id} value={cat.id}>
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                        <Input
                          value={faq.question}
                          onChange={(e) => updateFAQ(faq.id, "question", e.target.value)}
                          placeholder="FAQ question"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Answer</label>
                        <Textarea
                          value={faq.answer}
                          onChange={(e) => updateFAQ(faq.id, "answer", e.target.value)}
                          placeholder="FAQ answer"
                          rows={4}
                        />
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
