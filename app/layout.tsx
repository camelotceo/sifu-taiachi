import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { PublicShell } from "@/components/public-shell"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Tai Chi with Dr. Beauvais - Transform Your World Through Holistic Wellness",
  description:
    "Discover the transformative power of Tai Chi with Dr. Danielle Beauvais. Expert instruction, holistic wellness approach, and personalized guidance for all levels.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PublicShell>
          {children}
        </PublicShell>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Handle hash navigation on homepage
              if (window.location.pathname === '/' && window.location.hash) {
                setTimeout(() => {
                  const targetId = window.location.hash.substring(1);
                  const targetElement = document.getElementById(targetId);
                  if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
