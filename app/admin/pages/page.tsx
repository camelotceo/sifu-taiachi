"use client"

import Link from "next/link"

const pages = [
  { name: "Home", slug: "home", description: "Hero section, wellness pillars, success stories" },
  { name: "About", slug: "about", description: "Biography, credentials, publications, philosophy" },
  { name: "Courses", slug: "courses", description: "Course hero section text" },
  { name: "Free Classes", slug: "classes", description: "Classes hero section, categories" },
  { name: "Contact", slug: "contact", description: "Contact info, social media, response times" },
  { name: "FAQ", slug: "faq", description: "FAQ hero section, categories" },
]

export default function PagesIndex() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Page Editor</h1>
        <p className="text-gray-500 text-sm mt-1">Edit text content for each page</p>
      </div>

      <div className="grid gap-3">
        {pages.map((page) => (
          <Link
            key={page.slug}
            href={`/admin/pages/${page.slug}`}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:border-purple-300 hover:shadow-sm transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{page.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{page.description}</p>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
