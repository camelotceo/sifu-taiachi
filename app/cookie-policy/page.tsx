import type React from "react"
import { Cookie, Settings, BarChart, Shield, Eye, Database } from "lucide-react"

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Cookie className="w-16 h-16 text-purple-600 mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              Cookie Policy
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                How We Use Cookies
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Learn about how we use cookies and similar technologies to enhance your experience.
            </p>
            <p className="text-sm text-gray-500">Last updated: December 2024</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Cookie className="w-6 h-6 text-purple-600" />
                  What Are Cookies?
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Cookies are small text files that are placed on your computer or mobile device when you 
                  visit our website. They help us provide you with a better experience by remembering your 
                  preferences and enabling certain functionality.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Settings className="w-6 h-6 text-purple-600" />
                  Types of Cookies We Use
                </h2>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Essential Cookies</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    These cookies are necessary for the website to function properly. They enable basic 
                    functions like page navigation, access to secure areas, and remembering your preferences.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Analytics Cookies</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    These cookies help us understand how visitors interact with our website by collecting 
                    and reporting information anonymously. This helps us improve our website's performance.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Functional Cookies</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    These cookies enable enhanced functionality and personalization, such as remembering 
                    your language preferences and login status.
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <BarChart className="w-6 h-6 text-purple-600" />
                  Third-Party Cookies
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  We may use third-party services that set their own cookies, including:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                  <li>Google Analytics for website analytics</li>
                  <li>Payment processors for secure transactions</li>
                  <li>Social media platforms for sharing functionality</li>
                  <li>Video hosting services for embedded content</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Eye className="w-6 h-6 text-purple-600" />
                  Managing Your Cookie Preferences
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  You can control and manage cookies in several ways:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                  <li>Use your browser settings to block or delete cookies</li>
                  <li>Opt-out of specific third-party cookies through their websites</li>
                  <li>Use browser extensions that block tracking cookies</li>
                  <li>Contact us to discuss your privacy preferences</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Database className="w-6 h-6 text-purple-600" />
                  Data Retention
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Different cookies have different lifespans. Session cookies are deleted when you close 
                  your browser, while persistent cookies remain on your device for a set period or until 
                  you delete them manually.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-purple-600" />
                  Your Rights
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                  <li>Be informed about the cookies we use</li>
                  <li>Give or withdraw consent for non-essential cookies</li>
                  <li>Access information about cookies stored on your device</li>
                  <li>Request deletion of cookie data</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Updates to This Policy
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  We may update this Cookie Policy from time to time to reflect changes in our practices 
                  or for other operational, legal, or regulatory reasons. We will notify you of any 
                  material changes by posting the updated policy on this page.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Contact Us
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  If you have any questions about our use of cookies, please contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700">
                    <strong>Email:</strong> info@taichiwithdrbeauvais.com<br />
                    <strong>Phone:</strong> 786-490-9036
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
