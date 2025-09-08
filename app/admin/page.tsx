"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LayoutDashboard,
  FileText,
  ImageIcon,
  Video,
  Settings,
  Home,
  User,
  BookOpen,
  GraduationCap,
  Phone,
  HelpCircle,
  Bot,
  BarChart3,
  Eye,
  RefreshCw,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

const dashboardStats = [
  { title: "Total Pages", value: "6", icon: FileText, color: "bg-blue-500" },
  { title: "Content Items", value: "127", icon: LayoutDashboard, color: "bg-green-500" },
  { title: "Videos", value: "24", icon: Video, color: "bg-purple-500" },
  { title: "Images", value: "89", icon: ImageIcon, color: "bg-orange-500" },
]

const pageManagement = [
  {
    id: "home",
    title: "Home Page",
    description: "Hero, testimonials, success stories",
    icon: Home,
    href: "/admin/pages/home",
  },
  {
    id: "about",
    title: "About Page",
    description: "Biography, credentials, affiliations",
    icon: User,
    href: "/admin/pages/about",
  },
  {
    id: "classes",
    title: "Free Classes",
    description: "Featured classes, quick practices",
    icon: BookOpen,
    href: "/admin/pages/classes",
  },
  {
    id: "courses",
    title: "Courses",
    description: "Course catalog and details",
    icon: GraduationCap,
    href: "/admin/pages/courses",
  },
  {
    id: "contact",
    title: "Contact Page",
    description: "Contact info, social media",
    icon: Phone,
    href: "/admin/pages/contact",
  },
  { id: "faq", title: "FAQ Page", description: "Questions and answers", icon: HelpCircle, href: "/admin/pages/faq" },
]

        const quickActions = [
          { title: "JSON Content Manager", description: "Edit page content from JSON files", icon: FileText, href: "/admin3" },
          { title: "Advanced Content Manager", description: "Edit all pages and sections", icon: Settings, href: "/admin2" },
          { title: "AI Configuration", description: "Chatbot settings and prompts", icon: Bot, href: "/admin/ai" },
  { title: "Global Settings", description: "Site-wide content and navigation", icon: Settings, href: "/admin/global" },
  { title: "Analytics", description: "Content performance metrics", icon: BarChart3, href: "/admin/analytics" },
  { title: "Preview Site", description: "View live website", icon: Eye, href: "/" },
]

export default function AdminDashboard() {
  const router = useRouter()
  const [systemStatus, setSystemStatus] = useState<{
    contentStore: 'online' | 'offline'
    lastSync: Date | null
    pendingChanges: number
  }>({
    contentStore: 'online',
    lastSync: null,
    pendingChanges: 0
  })

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" })
    router.push("/admin/login")
  }

  // Check system status
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch("/api/content/home")
        if (response.ok) {
          setSystemStatus(prev => ({
            ...prev,
            contentStore: 'online',
            lastSync: new Date()
          }))
        } else {
          setSystemStatus(prev => ({
            ...prev,
            contentStore: 'offline'
          }))
        }
      } catch (error) {
        setSystemStatus(prev => ({
          ...prev,
          contentStore: 'offline'
        }))
      }
    }

    checkStatus()
    const interval = setInterval(checkStatus, 10000) // Check every 10 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* System Status Bar */}
        <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${systemStatus.contentStore === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm font-medium">
                  Content Store: {systemStatus.contentStore === 'online' ? 'Online' : 'Offline'}
                </span>
              </div>
              {systemStatus.lastSync && (
                <span className="text-sm text-gray-500">
                  Last sync: {systemStatus.lastSync.toLocaleTimeString()}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {systemStatus.pendingChanges > 0 && (
                <div className="flex items-center gap-2 text-orange-600">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{systemStatus.pendingChanges} pending changes</span>
                </div>
              )}
              <Button
                onClick={() => window.location.reload()}
                size="sm"
                variant="outline"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Page Management Cards */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Page Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pageManagement.map((page) => (
                    <Link key={page.id} href={page.href}>
                      <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-2 rounded-lg group-hover:scale-110 transition-transform">
                              <page.icon className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{page.title}</h3>
                              <p className="text-sm text-gray-600 mt-1">{page.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions Sidebar */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quickActions.map((action) => (
                    <Link key={action.title} href={action.href}>
                      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group">
                        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-2 rounded-lg group-hover:scale-110 transition-transform">
                          <action.icon className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{action.title}</p>
                          <p className="text-xs text-gray-600">{action.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Content Store</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${systemStatus.contentStore === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className={systemStatus.contentStore === 'online' ? 'text-green-600' : 'text-red-600'}>
                        {systemStatus.contentStore === 'online' ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Auto-refresh</span>
                    <span className="text-green-600">Active</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Real-time updates</span>
                    <span className="text-green-600">Enabled</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Home page updated</span>
                    <span className="text-gray-400 ml-auto">2h ago</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">New FAQ added</span>
                    <span className="text-gray-400 ml-auto">4h ago</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-600">AI settings updated</span>
                    <span className="text-gray-400 ml-auto">1d ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
