"use client"

import { createContext, useContext, useEffect, useState } from "react"

const FALLBACK_URL = "https://www.eventbrite.com/e/tai-chi-with-dr-beauvais-to-manifest-financial-abundance-luncheon-tickets-1668941100759?aff=oddtdtcreator"

const EventbriteContext = createContext<string>(FALLBACK_URL)

export function EventbriteProvider({ children }: { children: React.ReactNode }) {
  const [enrollUrl, setEnrollUrl] = useState(FALLBACK_URL)

  useEffect(() => {
    fetch("/api/events/primary")
      .then(res => res.json())
      .then(data => {
        if (data.url) setEnrollUrl(data.url)
      })
      .catch(() => {
        // Keep fallback URL
      })
  }, [])

  return (
    <EventbriteContext.Provider value={enrollUrl}>
      {children}
    </EventbriteContext.Provider>
  )
}

export function useEnrollUrl(): string {
  return useContext(EventbriteContext)
}
