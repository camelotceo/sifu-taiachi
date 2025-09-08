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
  Save, RefreshCw, Plus, Trash2, Edit, Eye, Home, User, BookOpen, Users, MessageCircle, HelpCircle, Settings, FileText
} from "lucide-react"
import { toast } from "sonner"

interface PageContent {
  meta: {
    title: string
    description: string
    path: string
  }
  [key: string]: any
}

const pageConfigs = {
  home: {
    name: "Home",
    icon: Home,
    sections: ["hero", "wellnessPillars", "successStories", "testimonials"]
  },
  about: {
    name: "About",
    icon: User,
    sections: ["hero", "biography", "credentials", "publications", "affiliations", "philosophy"]
  },
  courses: {
    name: "Courses",
    icon: BookOpen,
    sections: ["hero", "courses"]
  },
  classes: {
    name: "Free Classes",
    icon: Users,
    sections: ["hero", "categories", "featuredClasses", "quickPractices"]
  },
  contact: {
    name: "Contact",
    icon: MessageCircle,
    sections: ["hero", "contactInfo", "socialMedia", "responseTime"]
  },
  faq: {
    name: "FAQ",
    icon: HelpCircle,
    sections: ["hero", "categories", "faqs"]
  }
}

export default function Admin3Page() {
  const [currentPage, setCurrentPage] = useState("home")
  const [currentSection, setCurrentSection] = useState("hero")
  const [content, setContent] = useState<PageContent>({ meta: { title: "", description: "", path: "" } })
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  // Load content for current page
  const loadContent = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/pages/${currentPage}`)
      if (response.ok) {
        const data = await response.json()
        setContent(data)
        setCurrentSection("hero")
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
      const response = await fetch(`/api/pages/${currentPage}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content)
      })
      
      if (response.ok) {
        toast.success("Content saved successfully!")
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
        // Handle nested field paths (e.g., "biography.title")
        const fieldParts = field.split('.')
        if (fieldParts.length > 1) {
          // Nested field
          if (!newContent[section]) newContent[section] = {}
          let current = newContent[section]
          for (let i = 0; i < fieldParts.length - 1; i++) {
            if (!current[fieldParts[i]]) current[fieldParts[i]] = {}
            current = current[fieldParts[i]]
          }
          current[fieldParts[fieldParts.length - 1]] = value
        } else {
          // Simple field
          if (!newContent[section]) newContent[section] = {}
          newContent[section][field] = value
        }
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

  // Load content when page changes
  useEffect(() => {
    loadContent()
  }, [currentPage])

  // Render field input
  const renderField = (section: string, field: string, value: any, index?: number) => {
    const fieldKey = index !== undefined ? `${section}[${index}].${field}` : `${section}.${field}`
    
    if (typeof value === "string") {
      return value.length > 100 ? (
        <Textarea
          value={value}
          onChange={(e) => handleFieldChange(section, field, e.target.value, index)}
          placeholder={`Enter ${field}...`}
          className="min-h-[100px]"
        />
      ) : (
        <Input
          value={value}
          onChange={(e) => handleFieldChange(section, field, e.target.value, index)}
          placeholder={`Enter ${field}...`}
        />
      )
    } else if (typeof value === "number") {
      return (
        <Input
          type="number"
          value={value}
          onChange={(e) => handleFieldChange(section, field, Number(e.target.value), index)}
          placeholder={`Enter ${field}...`}
        />
      )
    } else if (typeof value === "boolean") {
      return (
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => handleFieldChange(section, field, e.target.checked, index)}
            className="rounded"
          />
          <span className="text-sm text-gray-600">{field}</span>
        </div>
      )
    } else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      // Nested object - render it as a nested section
      return renderNestedObjectField(section, field, value)
    }
    
    return <div className="text-sm text-gray-500">Unsupported field type: {typeof value}</div>
  }

  // Render array section
  const renderArraySection = (section: string, items: any[]) => {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold capitalize">{section}</h4>
          <Button
            variant="outline"
            size="sm"
            onClick={() => addArrayItem(section)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add {section.slice(0, -1)}
          </Button>
        </div>
        
        {items.map((item, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h5 className="font-medium">{section.slice(0, -1)} {index + 1}</h5>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeArrayItem(section, index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              {Object.entries(item).map(([field, value]) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {field}
                  </label>
                  {renderField(section, field, value, index)}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    )
  }

  // Render object section
  const renderObjectSection = (section: string, data: any) => {
    if (Array.isArray(data)) {
      return renderArraySection(section, data)
    }
    
    return (
      <div className="space-y-4">
        <h4 className="text-lg font-semibold capitalize">{section}</h4>
        {Object.entries(data).map(([field, value]) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
              {field}
            </label>
            {renderField(section, field, value)}
          </div>
        ))}
      </div>
    )
  }

  // Render nested object field
  const renderNestedObjectField = (section: string, field: string, data: any) => {
    return (
      <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
        <h5 className="font-medium text-gray-800 capitalize">{field}</h5>
        {Object.entries(data).map(([nestedField, value]) => (
          <div key={nestedField}>
            <label className="block text-sm font-medium text-gray-600 mb-2 capitalize">
              {nestedField}
            </label>
            {renderField(section, `${field}.${nestedField}`, value)}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">JSON Content Manager</h1>
          <p className="text-gray-600">Edit page content directly from JSON files</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(pageConfigs).map(([pageKey, config]) => {
                  const Icon = config.icon
                  return (
                    <Button
                      key={pageKey}
                      variant={currentPage === pageKey ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setCurrentPage(pageKey)}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {config.name}
                    </Button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Main Content Area */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{pageConfigs[currentPage as keyof typeof pageConfigs]?.name} Content</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    {loading ? "Loading..." : "Edit content for this page"}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={loadContent}
                    disabled={loading}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    {loading ? "Loading..." : "Refresh"}
                  </Button>
                  <Button
                    onClick={saveContent}
                    disabled={saving}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600">Loading content...</p>
                  </div>
                </div>
              ) : (
                <Tabs value={currentSection} onValueChange={setCurrentSection}>
                  <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
                    {pageConfigs[currentPage as keyof typeof pageConfigs]?.sections.map((section) => (
                      <TabsTrigger key={section} value={section} className="capitalize">
                        {section}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {pageConfigs[currentPage as keyof typeof pageConfigs]?.sections.map((section) => (
                    <TabsContent key={section} value={section} className="mt-6">
                      {content[section] ? (
                        renderObjectSection(section, content[section])
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <p>No {section} content found</p>
                          <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => handleFieldChange(section, "title", "", undefined)}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add {section} content
                          </Button>
                        </div>
                      )}
                    </TabsContent>
                  ))}
                </Tabs>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 