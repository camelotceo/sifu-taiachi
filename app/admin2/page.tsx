"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Save, 
  RefreshCw, 
  Plus, 
  Trash2, 
  Edit, 
  Eye,
  Home,
  User,
  BookOpen,
  Users,
  MessageCircle,
  HelpCircle,
  Settings
} from "lucide-react"
import { toast } from "sonner"

interface PageContent {
  [key: string]: any
}

interface Admin2PageProps {
  // Add any props if needed
}

export default function Admin2Page() {
  const [currentPage, setCurrentPage] = useState("home")
  const [currentSection, setCurrentSection] = useState("hero")
  const [content, setContent] = useState<PageContent>({})
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [originalContent, setOriginalContent] = useState<PageContent>({})

  // Page configurations
  const pages = {
    home: {
      name: "Home Page",
      icon: Home,
      sections: {
        hero: {
          name: "Hero Section",
          fields: [
            { key: "title", label: "Hero Title", type: "text", placeholder: "Enter hero title" },
            { key: "subtitle", label: "Hero Subtitle", type: "text", placeholder: "Enter hero subtitle" },
            { key: "description", label: "Hero Description", type: "textarea", placeholder: "Enter hero description" },
            { key: "videoId", label: "Video ID", type: "text", placeholder: "Enter video ID" },
            { key: "videoThumbnail", label: "Video Thumbnail", type: "text", placeholder: "Enter video thumbnail URL" }
          ]
        },
        wellnessPillars: {
          name: "Wellness Pillars",
          type: "array",
          fields: [
            { key: "title", label: "Title", type: "text" },
            { key: "description", label: "Description", type: "textarea" },
            { key: "image", label: "Image URL", type: "text" }
          ]
        },
        testimonials: {
          name: "Testimonials",
          type: "array",
          fields: [
            { key: "name", label: "Name", type: "text" },
            { key: "age", label: "Age", type: "number" },
            { key: "location", label: "Location", type: "text" },
            { key: "rating", label: "Rating", type: "number" },
            { key: "text", label: "Testimonial Text", type: "textarea" },
            { key: "course", label: "Course", type: "text" },
            { key: "image", label: "Image URL", type: "text" }
          ]
        }
      }
    },
    about: {
      name: "About Page",
      icon: User,
      sections: {
        hero: {
          name: "Hero Section",
          fields: [
            { key: "title", label: "Hero Title", type: "text" },
            { key: "description", label: "Hero Description", type: "textarea" },
            { key: "videoId", label: "Video ID", type: "text" },
            { key: "videoThumbnail", label: "Video Thumbnail", type: "text" }
          ]
        },
        biography: {
          name: "Biography",
          fields: [
            { key: "title", label: "Biography Title", type: "text" },
            { key: "content", label: "Biography Content", type: "textarea" }
          ]
        }
      }
    },
    courses: {
      name: "Courses Page",
      icon: BookOpen,
      sections: {
        hero: {
          name: "Hero Section",
          fields: [
            { key: "title", label: "Hero Title", type: "text" },
            { key: "subtitle", label: "Hero Subtitle", type: "text" },
            { key: "description", label: "Hero Description", type: "textarea" }
          ]
        },
        courses: {
          name: "Courses",
          type: "array",
          fields: [
            { key: "title", label: "Course Title", type: "text" },
            { key: "subtitle", label: "Course Subtitle", type: "text" },
            { key: "description", label: "Course Description", type: "textarea" },
            { key: "price", label: "Price", type: "number" },
            { key: "originalPrice", label: "Original Price", type: "number" },
            { key: "duration", label: "Duration", type: "text" },
            { key: "lessons", label: "Number of Lessons", type: "number" },
            { key: "level", label: "Level", type: "text" }
          ]
        }
      }
    },
    classes: {
      name: "Classes Page",
      icon: Users,
      sections: {
        hero: {
          name: "Hero Section",
          fields: [
            { key: "title", label: "Hero Title", type: "text" },
            { key: "subtitle", label: "Hero Subtitle", type: "text" },
            { key: "description", label: "Hero Description", type: "textarea" }
          ]
        },
        featuredClasses: {
          name: "Featured Classes",
          type: "array",
          fields: [
            { key: "title", label: "Class Title", type: "text" },
            { key: "description", label: "Class Description", type: "textarea" },
            { key: "videoId", label: "Video ID", type: "text" },
            { key: "duration", label: "Duration", type: "text" },
            { key: "level", label: "Level", type: "text" }
          ]
        }
      }
    },
    contact: {
      name: "Contact Page",
      icon: MessageCircle,
      sections: {
        hero: {
          name: "Hero Section",
          fields: [
            { key: "title", label: "Hero Title", type: "text" },
            { key: "subtitle", label: "Hero Subtitle", type: "text" },
            { key: "description", label: "Hero Description", type: "textarea" }
          ]
        },
        contactInfo: {
          name: "Contact Information",
          fields: [
            { key: "email", label: "Email", type: "text" },
            { key: "phone", label: "Phone", type: "text" },
            { key: "location", label: "Location", type: "text" }
          ]
        }
      }
    },
    faq: {
      name: "FAQ Page",
      icon: HelpCircle,
      sections: {
        hero: {
          name: "Hero Section",
          fields: [
            { key: "title", label: "Hero Title", type: "text" },
            { key: "subtitle", label: "Hero Subtitle", type: "text" },
            { key: "description", label: "Hero Description", type: "textarea" }
          ]
        },
        faqs: {
          name: "FAQ Items",
          type: "array",
          fields: [
            { key: "question", label: "Question", type: "text" },
            { key: "answer", label: "Answer", type: "textarea" },
            { key: "category", label: "Category", type: "text" }
          ]
        }
      }
    }
  }

  // Load content for current page and section
  const loadContent = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin2/pages/${currentPage}`)
      if (response.ok) {
        const data = await response.json()
        setContent(data)
        setOriginalContent(data)
      } else {
        toast.error("Failed to load content")
      }
    } catch (error) {
      toast.error("Error loading content")
    } finally {
      setLoading(false)
    }
  }

  // Save content
  const saveContent = async () => {
    setSaving(true)
    try {
      const response = await fetch(`/api/admin2/pages/${currentPage}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content)
      })
      
      if (response.ok) {
        toast.success("Content saved successfully!")
        setOriginalContent(content)
      } else {
        toast.error("Failed to save content")
      }
    } catch (error) {
      toast.error("Error saving content")
    } finally {
      setSaving(false)
    }
  }

  // Handle field changes
  const handleFieldChange = (section: string, field: string, value: any, index?: number) => {
    setContent(prev => {
      const newContent = { ...prev }
      
      if (index !== undefined) {
        // Array field
        if (!newContent[section]) newContent[section] = []
        if (!newContent[section][index]) newContent[section][index] = {}
        newContent[section][index][field] = value
      } else {
        // Simple field
        if (!newContent[section]) newContent[section] = {}
        newContent[section][field] = value
      }
      
      return newContent
    })
  }

  // Add new array item
  const addArrayItem = (section: string) => {
    setContent(prev => {
      const newContent = { ...prev }
      if (!newContent[section]) newContent[section] = []
      newContent[section].push({})
      return newContent
    })
  }

  // Remove array item
  const removeArrayItem = (section: string, index: number) => {
    setContent(prev => {
      const newContent = { ...prev }
      if (newContent[section] && Array.isArray(newContent[section])) {
        newContent[section].splice(index, 1)
      }
      return newContent
    })
  }

  // Check if content has changed
  const hasChanges = JSON.stringify(content) !== JSON.stringify(originalContent)
  
  // Debug logging
  console.log("Admin2: content keys:", Object.keys(content))
  console.log("Admin2: originalContent keys:", Object.keys(originalContent))
  console.log("Admin2: hasChanges:", hasChanges)

  // Load content when page or section changes
  useEffect(() => {
    loadContent()
  }, [currentPage])

  // Render field input
  const renderField = (field: any, value: any, onChange: (value: any) => void) => {
    switch (field.type) {
      case "textarea":
        return (
          <Textarea
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            className="min-h-[100px]"
          />
        )
      case "number":
        return (
          <Input
            type="number"
            value={value || ""}
            onChange={(e) => onChange(Number(e.target.value))}
            placeholder={field.placeholder}
          />
        )
      default:
        return (
          <Input
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
          />
        )
    }
  }

  // Render section content
  const renderSection = (sectionKey: string, sectionConfig: any) => {
    const sectionData = content[sectionKey] || {}
    
    if (sectionConfig.type === "array") {
      const arrayData = Array.isArray(sectionData) ? sectionData : []
      
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{sectionConfig.name}</h3>
            <Button onClick={() => addArrayItem(sectionKey)} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>
          
          {arrayData.map((item, index) => (
            <Card key={index} className="border-2">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Item {index + 1}</h4>
                  <Button
                    onClick={() => removeArrayItem(sectionKey, index)}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {sectionConfig.fields.map((field: any) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium mb-2">
                      {field.label}
                    </label>
                    {renderField(field, item[field.key], (value) => 
                      handleFieldChange(sectionKey, field.key, value, index)
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      )
    } else {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{sectionConfig.name}</h3>
          {sectionConfig.fields.map((field: any) => (
            <div key={field.key}>
              <label className="block text-sm font-medium mb-2">
                {field.label}
              </label>
              {renderField(field, sectionData[field.key], (value) => 
                handleFieldChange(sectionKey, field.key, value)
              )}
            </div>
          ))}
        </div>
      )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Advanced Content Manager</h1>
          <p className="text-gray-600">Edit content for all pages and sections of your website</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Page Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Pages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(pages).map(([pageKey, pageConfig]) => {
                    const Icon = pageConfig.icon
                    return (
                      <Button
                        key={pageKey}
                        variant={currentPage === pageKey ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setCurrentPage(pageKey)}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {pageConfig.name}
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {(() => {
                        const Icon = pages[currentPage as keyof typeof pages].icon
                        return <Icon className="w-5 h-5" />
                      })()}
                      {pages[currentPage as keyof typeof pages].name}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      Edit content for {pages[currentPage as keyof typeof pages].name.toLowerCase()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasChanges && (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        Unsaved Changes
                      </Badge>
                    )}
                    <Button onClick={loadContent} variant="outline" size="sm" disabled={loading}>
                      <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                      Refresh
                    </Button>
                    <Button onClick={saveContent} disabled={saving || !hasChanges}>
                      <Save className="w-4 h-4 mr-2" />
                      {saving ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <RefreshCw className="w-6 h-6 animate-spin mr-2" />
                    Loading content...
                  </div>
                ) : (
                  <Tabs value={currentSection} onValueChange={setCurrentSection}>
                    <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
                      {Object.entries(pages[currentPage as keyof typeof pages].sections).map(([sectionKey, sectionConfig]) => (
                        <TabsTrigger key={sectionKey} value={sectionKey}>
                          {sectionConfig.name}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    
                    {Object.entries(pages[currentPage as keyof typeof pages].sections).map(([sectionKey, sectionConfig]) => (
                      <TabsContent key={sectionKey} value={sectionKey} className="mt-6">
                        {renderSection(sectionKey, sectionConfig)}
                      </TabsContent>
                    ))}
                  </Tabs>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 