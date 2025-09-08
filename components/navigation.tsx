"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Heart } from "lucide-react"
import Link from "next/link"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Free Classes", href: "/classes" },
    { name: "Courses", href: "/#transformation-courses" },
    { name: "About Dr. Beauvais", href: "/about" },
    { name: "FAQ", href: "/#faq" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-purple-200 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-800">Tai Chi with Dr. Beauvais</span>
              <p className="text-xs text-purple-600 font-medium">Holistic Wellness & Transformation</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isAnchorLink = item.href.startsWith('/#')
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-purple-600 transition-colors font-medium relative group"
                  onClick={isAnchorLink ? (e) => {
                    e.preventDefault()
                    const targetId = item.href.substring(2) // Remove '/#'
                    const targetElement = document.getElementById(targetId)
                    if (targetElement) {
                      targetElement.scrollIntoView({ behavior: 'smooth' })
                    }
                  } : undefined}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300" />
                </Link>
              )
            })}
            <Link href="/classes">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-6 shadow-lg hover:shadow-xl transition-all">
                Start Free
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-purple-600"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-purple-200 bg-white/95 backdrop-blur-md">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => {
                const isAnchorLink = item.href.startsWith('/#')
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-purple-600 transition-colors font-medium px-2 py-1"
                    onClick={(e) => {
                      setIsOpen(false)
                      if (isAnchorLink) {
                        e.preventDefault()
                        const targetId = item.href.substring(2) // Remove '/#'
                        const targetElement = document.getElementById(targetId)
                        if (targetElement) {
                          targetElement.scrollIntoView({ behavior: 'smooth' })
                        }
                      }
                    }}
                  >
                    {item.name}
                  </Link>
                )
              })}
              <Link href="/classes" onClick={() => setIsOpen(false)}>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full w-fit px-6">
                  Start Free
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
