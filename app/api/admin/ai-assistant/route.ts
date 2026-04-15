import { type NextRequest, NextResponse } from "next/server"
import { createGroq } from "@ai-sdk/groq"
import { generateText, tool } from "ai"
import { z } from "zod"

import { getPageContent, upsertPageContent, getAllPages } from "@/lib/data/pages"
import { getAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial, getTestimonial } from "@/lib/data/testimonials"
import { getAllFAQs, createFAQ, updateFAQ, deleteFAQ, getFAQ } from "@/lib/data/faqs"
import { getGlobalSettings, upsertGlobalSettings } from "@/lib/data/settings"
import { getAllVideos } from "@/lib/data/videos"
import { getAllCourses } from "@/lib/data/courses"
import { getAllEvents } from "@/lib/data/events"
import { logAudit } from "@/lib/data/audit"

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})

const SYSTEM_PROMPT = `You are a friendly admin assistant for the "Tai Chi with Dr. Beauvais" website. You help the site owner manage website content through natural language commands.

You can help with:
- Updating page content (hero titles, descriptions, section text)
- Managing testimonials (adding, editing, removing)
- Managing FAQs (adding, editing, removing)
- Changing site settings (site name, tagline, contact info)
- Viewing current content to see what exists

Important guidelines:
- Always confirm what you changed after doing it
- After making changes, give a clear summary of what was done
- Be warm, friendly, and helpful - the user is not technical
- If the user's request is unclear, ask for clarification
- When listing content, format it in a readable way
- For page content updates, the content is stored as a JSON object with fields like heroTitle, heroSubtitle, description, etc. Merge your changes with existing content.
- When creating new testimonials or FAQs, generate a unique ID using the format "ai-" followed by a timestamp

Available pages for content: "home", "about", "courses", "testimonials", "faq", "contact"
Common page content fields: heroTitle, heroSubtitle, heroDescription, description, sectionTitle, sectionDescription

Keep your responses concise and conversational.`

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()
    const adminEmail = request.headers.get("x-admin-email") || "ai-assistant"

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      )
    }

    const actions: Array<{ tool: string; description: string; success: boolean }> = []

    const result = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      maxSteps: 5,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: message }],
      tools: {
        update_page_content: tool({
          description:
            "Update text content on any page of the website. Use this for hero titles, descriptions, section text, etc. The content is a JSON object - you should merge your changes with existing content fields.",
          parameters: z.object({
            page: z
              .string()
              .describe(
                'The page to update, e.g. "home", "about", "courses", "testimonials", "faq", "contact"'
              ),
            field: z
              .string()
              .describe(
                'The field to update, e.g. "heroTitle", "heroSubtitle", "heroDescription", "description", "sectionTitle"'
              ),
            value: z.string().describe("The new text value for the field"),
          }),
          execute: async ({ page, field, value }) => {
            try {
              const existing = (await getPageContent(page)) || {}
              const content =
                typeof existing === "object" && existing !== null
                  ? existing
                  : {}
              const updated = { ...content, [field]: value }

              await upsertPageContent(page, updated, adminEmail)
              await logAudit({
                userEmail: adminEmail,
                action: "update",
                entityType: "page_content",
                entityId: page,
                oldValue: content,
                newValue: updated,
              })

              actions.push({
                tool: "update_page_content",
                description: `Updated "${field}" on the "${page}" page to: "${value}"`,
                success: true,
              })
              return {
                success: true,
                message: `Updated ${field} on ${page} page`,
              }
            } catch (error) {
              actions.push({
                tool: "update_page_content",
                description: `Failed to update "${field}" on "${page}" page`,
                success: false,
              })
              return {
                success: false,
                error: `Failed to update page content: ${error}`,
              }
            }
          },
        }),

        update_testimonial: tool({
          description:
            "Add a new testimonial or edit an existing one. Provide the testimonial details. Leave id empty to create a new one, or provide an existing id to update.",
          parameters: z.object({
            id: z
              .string()
              .optional()
              .describe(
                "The ID of an existing testimonial to update, or leave empty to create a new one"
              ),
            name: z.string().describe("The name of the person giving the testimonial"),
            text: z.string().describe("The testimonial text/quote"),
            rating: z
              .number()
              .min(1)
              .max(5)
              .optional()
              .describe("Rating from 1-5 stars, defaults to 5"),
            location: z
              .string()
              .optional()
              .describe("Location of the person, e.g. 'New York, NY'"),
            course: z
              .string()
              .optional()
              .describe("The course the testimonial is about"),
          }),
          execute: async ({ id, name, text, rating, location, course }) => {
            try {
              if (id) {
                const existing = await getTestimonial(id)
                if (!existing) {
                  return { success: false, error: `Testimonial with ID "${id}" not found` }
                }
                const updates: Record<string, unknown> = { name, text }
                if (rating !== undefined) updates.rating = rating
                if (location !== undefined) updates.location = location
                if (course !== undefined) updates.course = course

                await updateTestimonial(id, updates)
                await logAudit({
                  userEmail: adminEmail,
                  action: "update",
                  entityType: "testimonial",
                  entityId: id,
                  oldValue: existing,
                  newValue: updates,
                })

                actions.push({
                  tool: "update_testimonial",
                  description: `Updated testimonial from "${name}"`,
                  success: true,
                })
                return { success: true, message: `Updated testimonial from ${name}` }
              } else {
                const newId = `ai-${Date.now()}`
                await createTestimonial({
                  id: newId,
                  name,
                  text,
                  rating: rating ?? 5,
                  age: null,
                  location: location ?? null,
                  course: course ?? null,
                  image: null,
                  sort_order: 999,
                })
                await logAudit({
                  userEmail: adminEmail,
                  action: "create",
                  entityType: "testimonial",
                  entityId: newId,
                  newValue: { name, text, rating, location, course },
                })

                actions.push({
                  tool: "update_testimonial",
                  description: `Added new testimonial from "${name}"`,
                  success: true,
                })
                return {
                  success: true,
                  message: `Created new testimonial from ${name}`,
                  id: newId,
                }
              }
            } catch (error) {
              actions.push({
                tool: "update_testimonial",
                description: `Failed to update/create testimonial`,
                success: false,
              })
              return { success: false, error: `Failed: ${error}` }
            }
          },
        }),

        delete_testimonial: tool({
          description:
            "Remove a testimonial by its ID. Use list_content first to find the ID of the testimonial to delete.",
          parameters: z.object({
            id: z.string().describe("The ID of the testimonial to delete"),
          }),
          execute: async ({ id }) => {
            try {
              const existing = await getTestimonial(id)
              if (!existing) {
                return { success: false, error: `Testimonial with ID "${id}" not found` }
              }

              await deleteTestimonial(id)
              await logAudit({
                userEmail: adminEmail,
                action: "delete",
                entityType: "testimonial",
                entityId: id,
                oldValue: existing,
              })

              actions.push({
                tool: "delete_testimonial",
                description: `Deleted testimonial from "${existing.name}"`,
                success: true,
              })
              return {
                success: true,
                message: `Deleted testimonial from ${existing.name}`,
              }
            } catch (error) {
              actions.push({
                tool: "delete_testimonial",
                description: `Failed to delete testimonial`,
                success: false,
              })
              return { success: false, error: `Failed: ${error}` }
            }
          },
        }),

        update_faq: tool({
          description:
            "Add a new FAQ or edit an existing one. Leave id empty to create a new FAQ, or provide an existing id to update.",
          parameters: z.object({
            id: z
              .string()
              .optional()
              .describe(
                "The ID of an existing FAQ to update, or leave empty to create new"
              ),
            question: z.string().describe("The FAQ question"),
            answer: z.string().describe("The FAQ answer"),
            category: z
              .string()
              .optional()
              .describe(
                'The category for the FAQ, e.g. "general", "classes", "pricing". Defaults to "general"'
              ),
          }),
          execute: async ({ id, question, answer, category }) => {
            try {
              if (id) {
                const existing = await getFAQ(id)
                if (!existing) {
                  return { success: false, error: `FAQ with ID "${id}" not found` }
                }
                const updates: Record<string, unknown> = { question, answer }
                if (category !== undefined) updates.category = category

                await updateFAQ(id, updates)
                await logAudit({
                  userEmail: adminEmail,
                  action: "update",
                  entityType: "faq",
                  entityId: id,
                  oldValue: existing,
                  newValue: updates,
                })

                actions.push({
                  tool: "update_faq",
                  description: `Updated FAQ: "${question}"`,
                  success: true,
                })
                return { success: true, message: `Updated FAQ: ${question}` }
              } else {
                const newId = `ai-${Date.now()}`
                await createFAQ({
                  id: newId,
                  question,
                  answer,
                  category: category ?? "general",
                  sort_order: 999,
                })
                await logAudit({
                  userEmail: adminEmail,
                  action: "create",
                  entityType: "faq",
                  entityId: newId,
                  newValue: { question, answer, category },
                })

                actions.push({
                  tool: "update_faq",
                  description: `Added new FAQ: "${question}"`,
                  success: true,
                })
                return {
                  success: true,
                  message: `Created new FAQ: ${question}`,
                  id: newId,
                }
              }
            } catch (error) {
              actions.push({
                tool: "update_faq",
                description: `Failed to update/create FAQ`,
                success: false,
              })
              return { success: false, error: `Failed: ${error}` }
            }
          },
        }),

        delete_faq: tool({
          description:
            "Remove an FAQ by its ID. Use list_content first to find the ID of the FAQ to delete.",
          parameters: z.object({
            id: z.string().describe("The ID of the FAQ to delete"),
          }),
          execute: async ({ id }) => {
            try {
              const existing = await getFAQ(id)
              if (!existing) {
                return { success: false, error: `FAQ with ID "${id}" not found` }
              }

              await deleteFAQ(id)
              await logAudit({
                userEmail: adminEmail,
                action: "delete",
                entityType: "faq",
                entityId: id,
                oldValue: existing,
              })

              actions.push({
                tool: "delete_faq",
                description: `Deleted FAQ: "${existing.question}"`,
                success: true,
              })
              return {
                success: true,
                message: `Deleted FAQ: ${existing.question}`,
              }
            } catch (error) {
              actions.push({
                tool: "delete_faq",
                description: `Failed to delete FAQ`,
                success: false,
              })
              return { success: false, error: `Failed: ${error}` }
            }
          },
        }),

        update_settings: tool({
          description:
            "Update global site settings such as site name, tagline, contact email, phone number, address, social media links, etc. Merges with existing settings.",
          parameters: z.object({
            field: z
              .string()
              .describe(
                'The settings field to update, e.g. "siteName", "tagline", "contactEmail", "phone", "address", "facebookUrl", "instagramUrl", "youtubeUrl"'
              ),
            value: z.string().describe("The new value for the field"),
          }),
          execute: async ({ field, value }) => {
            try {
              const existing = (await getGlobalSettings()) || {}
              const settings =
                typeof existing === "object" && existing !== null
                  ? existing
                  : {}
              const updated = { ...settings, [field]: value }

              await upsertGlobalSettings(updated, adminEmail)
              await logAudit({
                userEmail: adminEmail,
                action: "update",
                entityType: "global_settings",
                entityId: "global",
                oldValue: settings,
                newValue: updated,
              })

              actions.push({
                tool: "update_settings",
                description: `Updated setting "${field}" to: "${value}"`,
                success: true,
              })
              return {
                success: true,
                message: `Updated ${field} to "${value}"`,
              }
            } catch (error) {
              actions.push({
                tool: "update_settings",
                description: `Failed to update setting "${field}"`,
                success: false,
              })
              return { success: false, error: `Failed: ${error}` }
            }
          },
        }),

        list_content: tool({
          description:
            'List current content on the website. Use this to see what testimonials, FAQs, videos, courses, events, page content, or settings currently exist. Specify the type of content to list.',
          parameters: z.object({
            content_type: z
              .enum([
                "testimonials",
                "faqs",
                "videos",
                "courses",
                "events",
                "pages",
                "settings",
              ])
              .describe("The type of content to list"),
            page_name: z
              .string()
              .optional()
              .describe(
                'For pages content type, specify which page, e.g. "home", "about"'
              ),
          }),
          execute: async ({ content_type, page_name }) => {
            try {
              switch (content_type) {
                case "testimonials": {
                  const testimonials = await getAllTestimonials()
                  actions.push({
                    tool: "list_content",
                    description: `Listed ${testimonials.length} testimonials`,
                    success: true,
                  })
                  return {
                    success: true,
                    data: testimonials.map((t) => ({
                      id: t.id,
                      name: t.name,
                      text: t.text,
                      rating: t.rating,
                      location: t.location,
                      course: t.course,
                    })),
                  }
                }
                case "faqs": {
                  const faqs = await getAllFAQs()
                  actions.push({
                    tool: "list_content",
                    description: `Listed ${faqs.length} FAQs`,
                    success: true,
                  })
                  return {
                    success: true,
                    data: faqs.map((f) => ({
                      id: f.id,
                      question: f.question,
                      answer: f.answer,
                      category: f.category,
                    })),
                  }
                }
                case "videos": {
                  const videos = await getAllVideos()
                  actions.push({
                    tool: "list_content",
                    description: `Listed ${videos.length} videos`,
                    success: true,
                  })
                  return {
                    success: true,
                    data: videos.map((v) => ({
                      id: v.id,
                      title: v.title,
                      category: v.category,
                      duration: v.duration,
                    })),
                  }
                }
                case "courses": {
                  const courses = await getAllCourses()
                  actions.push({
                    tool: "list_content",
                    description: `Listed ${courses.length} courses`,
                    success: true,
                  })
                  return {
                    success: true,
                    data: courses.map((c) => ({
                      id: c.id,
                      title: c.title,
                      description: c.description,
                      price: c.price,
                      level: c.level,
                    })),
                  }
                }
                case "events": {
                  const events = await getAllEvents()
                  actions.push({
                    tool: "list_content",
                    description: `Listed ${events.length} events`,
                    success: true,
                  })
                  return {
                    success: true,
                    data: events.map((e) => ({
                      id: e.id,
                      title: e.title,
                      start_date: e.start_date,
                      venue: e.venue,
                      status: e.status,
                    })),
                  }
                }
                case "pages": {
                  if (page_name) {
                    const content = await getPageContent(page_name)
                    actions.push({
                      tool: "list_content",
                      description: `Listed content for "${page_name}" page`,
                      success: true,
                    })
                    return { success: true, data: content || {} }
                  } else {
                    const pages = await getAllPages()
                    actions.push({
                      tool: "list_content",
                      description: `Listed ${pages.length} pages`,
                      success: true,
                    })
                    return {
                      success: true,
                      data: pages.map((p) => ({
                        page_name: p.page_name,
                        content: p.content,
                      })),
                    }
                  }
                }
                case "settings": {
                  const settings = await getGlobalSettings()
                  actions.push({
                    tool: "list_content",
                    description: "Listed global settings",
                    success: true,
                  })
                  return { success: true, data: settings || {} }
                }
                default:
                  return { success: false, error: "Unknown content type" }
              }
            } catch (error) {
              actions.push({
                tool: "list_content",
                description: `Failed to list ${content_type}`,
                success: false,
              })
              return { success: false, error: `Failed: ${error}` }
            }
          },
        }),
      },
    })

    // Collect the text response from all steps
    let responseText = result.text || ""

    // If no text but there were tool results, add a fallback
    if (!responseText && result.steps && result.steps.length > 0) {
      const lastStep = result.steps[result.steps.length - 1]
      if (lastStep.text) {
        responseText = lastStep.text
      }
    }

    // If still no text, generate a summary based on actions
    if (!responseText && actions.length > 0) {
      const summaries = actions.map((a) =>
        a.success ? `Done: ${a.description}` : `Failed: ${a.description}`
      )
      responseText = summaries.join("\n")
    }

    if (!responseText) {
      responseText =
        "I'm not sure what to do with that request. Could you try rephrasing? You can ask me to update page content, manage testimonials or FAQs, change settings, or list what's currently on the site."
    }

    return NextResponse.json({
      response: responseText,
      actions,
    })
  } catch (error) {
    console.error("AI Assistant error:", error)
    return NextResponse.json(
      {
        response:
          "Sorry, I had trouble processing that request. Could you try again?",
        actions: [],
        error: String(error),
      },
      { status: 200 }
    )
  }
}
