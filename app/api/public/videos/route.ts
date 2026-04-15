import { NextRequest, NextResponse } from "next/server"
import { getVideosByCategory, getAllVideos } from "@/lib/data/videos"
import { videoData } from "@/components/video-data"

export async function GET(request: NextRequest) {
  const cacheHeaders = {
    "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
  }

  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")

  try {
    const videos = category
      ? await getVideosByCategory(category)
      : await getAllVideos()

    if (videos && videos.length > 0) {
      return NextResponse.json(videos, { headers: cacheHeaders })
    }
  } catch (error) {
    console.error("Public videos API: DB read failed, using fallback", error)
  }

  // Fallback to hardcoded video-data.tsx
  let fallback: any[] = []

  if (category === "success_story") {
    fallback = videoData.successStories.map((v: any, i: number) => ({
      id: v.id,
      title: v.title,
      description: v.description,
      vimeo_id: v.vimeoId || null,
      youtube_id: v.youtubeId || null,
      thumbnail: v.thumbnail,
      duration: v.duration,
      level: v.level,
      instructor: v.instructor,
      category: "success_story",
      topics: v.topics,
      benefits: v.benefits,
      sort_order: i,
      course_id: null,
    }))
  } else if (category === "interview") {
    fallback = videoData.interviews.map((v: any, i: number) => ({
      id: v.id,
      title: v.title,
      description: v.description,
      vimeo_id: v.vimeoId || null,
      youtube_id: v.youtubeId || null,
      thumbnail: v.thumbnail,
      duration: v.duration,
      level: v.level,
      instructor: v.instructor,
      category: "interview",
      topics: v.topics,
      benefits: v.benefits,
      sort_order: i,
      course_id: null,
    }))
  } else {
    // Return all videos from all categories
    const allCategories = [
      { data: [videoData.heroVideo], cat: "hero" },
      { data: [videoData.aboutVideo], cat: "about" },
      { data: videoData.successStories, cat: "success_story" },
      { data: videoData.interviews, cat: "interview" },
      { data: videoData.featuredClasses, cat: "featured_class" },
      { data: videoData.quickPractices, cat: "quick_practice" },
    ]

    for (const { data, cat } of allCategories) {
      data.forEach((v: any, i: number) => {
        fallback.push({
          id: v.id,
          title: v.title,
          description: v.description,
          vimeo_id: v.vimeoId || null,
          youtube_id: v.youtubeId || null,
          thumbnail: v.thumbnail,
          duration: v.duration,
          level: v.level,
          instructor: v.instructor,
          category: cat,
          topics: v.topics,
          benefits: v.benefits,
          sort_order: i,
          course_id: null,
        })
      })
    }
  }

  return NextResponse.json(fallback, { headers: cacheHeaders })
}
