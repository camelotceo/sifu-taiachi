"use client"

import { Button } from "@/components/ui/button"
import { LogOut, Settings, Home, Eye, FileText, Users, MessageSquare, BookOpen, Phone, HelpCircle } from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"

export function AdminHeader() {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" })
    router.push("/admin/login")
  }

  // Don't show header on login page
  if (pathname === "/admin/login") {
    return null
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: Home },
    { href: "/admin/pages/home", label: "Home", icon: FileText },
    { href: "/admin/pages/about", label: "About", icon: Users },
    { href: "/admin/pages/classes", label: "Classes", icon: BookOpen },
    { href: "/admin/pages/courses", label: "Courses", icon: BookOpen },
    { href: "/admin/pages/contact", label: "Contact", icon: Phone },
    { href: "/admin/pages/faq", label: "FAQ", icon: HelpCircle },
    { href: "/admin/global", label: "Global", icon: Settings },
    { href: "/admin/ai", label: "AI", icon: MessageSquare },
  ]

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Admin branding */}
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-2 hover:opacity-80">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Settings className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900">Admin Panel</span>
            </Link>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-3">
            <Link href="/" target="_blank">
              <Button variant="ghost" size="sm" className="text-sm">
                <Eye className="w-4 h-4 mr-1" />
                View Site
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-sm text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <div className="px-6 py-2 bg-gray-50 border-t border-gray-100">
        <nav className="flex items-center gap-1 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link key={item.href} href={item.href}>
                <Button variant={isActive ? "default" : "ghost"} size="sm" className="text-xs whitespace-nowrap">
                  <Icon className="w-3 h-3 mr-1" />
                  {item.label}
                </Button>
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
