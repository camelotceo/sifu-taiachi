"use client"

import { usePathname } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ChatbotWidget } from "@/components/chatbot-widget"
import { EventbriteProvider } from "@/components/eventbrite-provider"

export function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith("/admin")

  if (isAdmin) {
    // Admin pages render their own layout — no nav/footer/chatbot
    return <>{children}</>
  }

  return (
    <EventbriteProvider>
      <Navigation />
      {children}
      <Footer />
      <ChatbotWidget />
    </EventbriteProvider>
  )
}
