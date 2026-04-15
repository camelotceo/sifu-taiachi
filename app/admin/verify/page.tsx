"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"

function VerifyContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying")
  const [error, setError] = useState("")

  useEffect(() => {
    const code = searchParams.get("code")
    const email = searchParams.get("email")

    if (!code || !email) {
      setStatus("error")
      setError("Invalid verification link")
      return
    }

    async function verify() {
      try {
        const res = await fetch("/api/admin/auth/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code, email }),
        })

        if (res.ok) {
          setStatus("success")
          setTimeout(() => router.push("/admin"), 1500)
        } else {
          const data = await res.json()
          setStatus("error")
          setError(data.error || "Verification failed")
        }
      } catch {
        setStatus("error")
        setError("Something went wrong. Please try again.")
      }
    }

    verify()
  }, [searchParams, router])

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100 text-center">
      {status === "verifying" && (
        <>
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <svg className="animate-spin h-10 w-10 text-purple-600" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Verifying...</h2>
          <p className="text-gray-500">Please wait while we sign you in.</p>
        </>
      )}

      {status === "success" && (
        <>
          <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Welcome!</h2>
          <p className="text-gray-500">Redirecting to dashboard...</p>
        </>
      )}

      {status === "error" && (
        <>
          <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Verification Failed</h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <a
            href="/admin/login"
            className="inline-block py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all"
          >
            Try Again
          </a>
        </>
      )}
    </div>
  )
}

export default function AdminVerifyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="w-full max-w-md mx-4">
        <Suspense fallback={
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100 text-center">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg className="animate-spin h-10 w-10 text-purple-600" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading...</h2>
          </div>
        }>
          <VerifyContent />
        </Suspense>
      </div>
    </div>
  )
}
