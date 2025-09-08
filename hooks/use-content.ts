"use client"

import { useState, useEffect, useCallback } from "react"

interface HomePageContent {
  hero: {
    title: string
    subtitle: string
    description: string
    videoId: string
    videoThumbnail: string
  }
  wellnessPillars: Array<{
    id: string
    title: string
    description: string
    image: string
  }>
  successStories: Array<{
    id: string
    title: string
    description: string
    videoId: string
    thumbnail: string
    duration: string
    level: string
  }>
  testimonials: Array<{
    id: string
    name: string
    age: number
    location: string
    rating: number
    text: string
    course: string
    image: string
  }>
}

export function useHomeContent() {
  const [content, setContent] = useState<HomePageContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchContent = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log("Hook: Fetching home content...")
      const response = await fetch("/api/content/home", {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        cache: 'no-store' // Ensure fresh data
      })
      
      console.log("Hook: Response status:", response.status)
      console.log("Hook: Response ok:", response.ok)
      console.log("Hook: Response headers:", Object.fromEntries(response.headers.entries()))
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log("Hook: Received content with", data.testimonials?.length || 0, "testimonials")
      console.log("Hook: First testimonial:", data.testimonials?.[0])
      console.log("Hook: Full data:", data)
      
      setContent(data)
      setLastUpdated(new Date())
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error"
      console.error("Hook: Failed to fetch content:", errorMessage)
      console.error("Hook: Error details:", err)
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [])

  // Initial fetch
  useEffect(() => {
    fetchContent()
  }, [fetchContent])

  // Auto-refresh disabled per user request
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log("Hook: Auto-refreshing content...")
  //     fetchContent()
  //   }, 30000) // 30 seconds

  //   return () => clearInterval(interval)
  // }, [fetchContent])

  // Manual refresh function
  const refresh = useCallback(() => {
    console.log("Hook: Manual refresh triggered")
    fetchContent()
  }, [fetchContent])

  return { 
    content, 
    loading, 
    error, 
    lastUpdated,
    refresh,
    refetch: fetchContent // Alias for refresh
  }
} 