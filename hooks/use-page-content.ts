"use client"

import { useState, useEffect, useCallback } from "react"
import { PageContent } from "@/lib/json-content"

export function usePageContent(pageName: string) {
  const [content, setContent] = useState<PageContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchContent = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      console.log(`Hook: Fetching ${pageName} page content...`)
      
      const response = await fetch(`/api/pages/${pageName}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        cache: 'no-store'
      })
      
      console.log(`Hook: Response status for ${pageName}:`, response.status)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log(`Hook: Received ${pageName} content:`, data)
      
      setContent(data)
      setLastUpdated(new Date())
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error"
      console.error(`Hook: Failed to fetch ${pageName} content:`, errorMessage)
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [pageName])

  // Initial fetch
  useEffect(() => {
    fetchContent()
  }, [fetchContent])

  // Auto-refresh disabled per user request
  // useEffect(() => {
  //   const interval = setInterval(fetchContent, 30000)
  //   return () => clearInterval(interval)
  // }, [fetchContent])

  const refresh = useCallback(() => {
    fetchContent()
  }, [fetchContent])

  return { content, loading, error, lastUpdated, refresh }
} 