import type React from "react"
import { Shield, Eye, Lock, Database, UserCheck, Globe } from "lucide-react"

export default function PrivacyPolicyPage() {
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
            <Shield className="w-16 h-16 text-purple-600 mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              Privacy Policy
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Your Privacy Matters
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We are committed to protecting your privacy and ensuring the security of your personal information.
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
                  <Eye className="w-6 h-6 text-purple-600" />
                  Information We Collect
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  We collect information you provide directly to us, such as when you create an account, 
                  subscribe to our newsletter, or contact us for support. This may include:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                  <li>Name and contact information (email address, phone number)</li>
                  <li>Account credentials and preferences</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                  <li>Communications with us (support requests, feedback)</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Database className="w-6 h-6 text-purple-600" />
                  How We Use Your Information
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send technical notices, updates, and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Comply with legal obligations</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Lock className="w-6 h-6 text-purple-600" />
                  Information Security
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal 
                  information against unauthorized access, alteration, disclosure, or destruction. However, 
                  no method of transmission over the internet is 100% secure.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <UserCheck className="w-6 h-6 text-purple-600" />
                  Your Rights
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Data portability</li>
                  <li>Withdraw consent where applicable</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Globe className="w-6 h-6 text-purple-600" />
                  Third-Party Services
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  We may use third-party services for analytics, payment processing, and other functions. 
                  These services have their own privacy policies, and we encourage you to review them.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Changes to This Policy
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes 
                  by posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Contact Us
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at:
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
