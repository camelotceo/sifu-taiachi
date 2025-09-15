"use client"

import { useEffect } from "react"
import { X, CheckCircle, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmailConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  isSuccess: boolean
  errorMessage?: string
}

export function EmailConfirmationModal({ 
  isOpen, 
  onClose, 
  isSuccess, 
  errorMessage 
}: EmailConfirmationModalProps) {
  // Auto-close modal after 5 seconds on success
  useEffect(() => {
    if (isOpen && isSuccess) {
      const timer = setTimeout(() => {
        onClose()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, isSuccess, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
        <div className="p-6">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {isSuccess ? (
            <div className="text-center">
              {/* Success icon */}
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>

              {/* Success message */}
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Email Sent Successfully!
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Thank you for reaching out! Your message has been sent to{" "}
                <span className="font-semibold text-purple-600">
                  info@taichiwithdrbeauvais.com
                </span>
                . We'll get back to you within 24 hours.
              </p>

              {/* Email icon */}
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6">
                <Mail className="w-4 h-4" />
                <span>Check your email for a confirmation</span>
              </div>

              {/* Close button */}
              <Button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
              >
                Close
              </Button>
            </div>
          ) : (
            <div className="text-center">
              {/* Error icon */}
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <X className="w-10 h-10 text-red-600" />
              </div>

              {/* Error message */}
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Failed to Send Email
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {errorMessage || "There was an error sending your message. Please try again or contact us directly."}
              </p>
              {errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-red-700">
                    <strong>Technical Details:</strong> {errorMessage}
                  </p>
                  <p className="text-xs text-red-600 mt-2">
                    Check the browser console for more detailed logs.
                  </p>
                </div>
              )}

              {/* Retry button */}
              <div className="flex gap-3">
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="flex-1"
                >
                  Close
                </Button>
                <Button
                  onClick={onClose}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
