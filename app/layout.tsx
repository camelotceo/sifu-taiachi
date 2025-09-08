import type React from "react"
import { Inter } from "next/font/google"
import { headers } from "next/headers"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ChatbotWidget } from "@/components/chatbot-widget"
import { AdminHeader } from "@/components/admin-header"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Tai Chi with Dr. Beauvais - Transform Your World Through Holistic Wellness",
  description:
    "Discover the transformative power of Tai Chi with Dr. Danielle Beauvais. Expert instruction, holistic wellness approach, and personalized guidance for all levels.",
    generator: 'v0.dev'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const pathname = headersList.get("x-pathname") || ""
  const isAdminPage = pathname.startsWith("/admin")

  return (
    <html lang="en">
      <body className={inter.className}>
        {!isAdminPage && <Navigation />}
        {isAdminPage && <AdminHeader />}
        {children}
        {!isAdminPage && <Footer />}
        {!isAdminPage && <ChatbotWidget />}
      </body>
    </html>
  )
}
