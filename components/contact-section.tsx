"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Twitter, Send, Heart, MessageCircle } from "lucide-react"
import { EmailConfirmationModal } from "@/components/email-confirmation-modal"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [emailSuccess, setEmailSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage("")

    console.log('📧 Frontend: Starting email submission...')
    console.log('📧 Frontend: Form data:', {
      name: formData.name ? `${formData.name.substring(0, 3)}***` : 'Missing',
      email: formData.email ? `${formData.email.substring(0, 3)}***@${formData.email.split('@')[1] || '***'}` : 'Missing',
      subject: formData.subject ? `${formData.subject.substring(0, 20)}${formData.subject.length > 20 ? '...' : ''}` : 'Missing',
      messageLength: formData.message ? formData.message.length : 0,
    })

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      console.log('📧 Frontend: Response status:', response.status)
      console.log('📧 Frontend: Response headers:', Object.fromEntries(response.headers.entries()))

      const data = await response.json()
      console.log('📧 Frontend: Response data:', data)

      if (response.ok) {
        console.log('✅ Frontend: Email sent successfully')
        setEmailSuccess(true)
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        console.error('❌ Frontend: Email sending failed:', data)
        setEmailSuccess(false)
        setErrorMessage(data.details || data.error || 'Failed to send email')
      }
    } catch (error) {
      console.error('❌ Frontend: Network error:', error)
      setEmailSuccess(false)
      setErrorMessage(`Network error: ${error instanceof Error ? error.message : 'Please try again.'}`)
    } finally {
      setIsSubmitting(false)
      setShowModal(true)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Hero Section */}
      <div className="pt-8 pb-16 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <MessageCircle className="w-16 h-16 text-purple-600 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Get in Touch
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                We're Here to Help
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Have questions about our wellness programs? Ready to start your transformation journey? We'd love to hear from you and support you every step of the way.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Content */}
      <div className="pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="bg-white/90 backdrop-blur-sm shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <Send className="w-6 h-6 text-purple-600" />
                    Send Us a Message
                  </CardTitle>
                  <p className="text-gray-600">Fill out the form below and we'll get back to you within 24 hours.</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                          </label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                          Subject
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="What's this about?"
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us how we can help you..."
                          rows={6}
                          className="w-full resize-none"
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Sending...
                          </div>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-8">
                <Card className="bg-white/90 backdrop-blur-sm shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-800">Contact Information</CardTitle>
                    <p className="text-gray-600">Get in touch with us through any of these channels</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                        <p className="text-gray-600">info@taichiwithdrbeauvais.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">Phone</h3>
                        <p className="text-gray-600">786-490-9036</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">Location</h3>
                        <p className="text-gray-600">Online Worldwide</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Media */}
                <Card className="bg-white/90 backdrop-blur-sm shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-800">Follow Us</CardTitle>
                    <p className="text-gray-600">Stay connected and get wellness tips</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform"
                      >
                        <Facebook className="w-6 h-6" />
                      </a>
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform"
                      >
                        <Instagram className="w-6 h-6" />
                      </a>
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform"
                      >
                        <Youtube className="w-6 h-6" />
                      </a>
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform"
                      >
                        <Twitter className="w-6 h-6" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Confirmation Modal */}
      <EmailConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        isSuccess={emailSuccess}
        errorMessage={errorMessage}
      />
    </section>
  )
}

