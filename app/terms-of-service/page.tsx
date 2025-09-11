import type React from "react"
import { FileText, Scale, AlertTriangle, Users, CreditCard, Shield } from "lucide-react"

export default function TermsOfServicePage() {
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
            <FileText className="w-16 h-16 text-purple-600 mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              Terms of Service
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Our Agreement
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Please read these terms carefully before using our services.
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
                  <Scale className="w-6 h-6 text-purple-600" />
                  Acceptance of Terms
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  By accessing and using our website and services, you accept and agree to be bound by the 
                  terms and provision of this agreement. If you do not agree to abide by the above, please 
                  do not use this service.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Users className="w-6 h-6 text-purple-600" />
                  Use License
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Permission is granted to temporarily download one copy of the materials on our website 
                  for personal, non-commercial transitory viewing only. This is the grant of a license, 
                  not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-purple-600" />
                  Payment Terms
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  All payments are processed securely through third-party payment processors. By making a 
                  purchase, you agree to:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                  <li>Provide accurate and complete payment information</li>
                  <li>Pay all applicable fees and taxes</li>
                  <li>Authorize us to charge your payment method</li>
                  <li>Understand that all sales are final unless otherwise specified</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-purple-600" />
                  Disclaimer
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  The materials on our website are provided on an 'as is' basis. We make no warranties, 
                  expressed or implied, and hereby disclaim and negate all other warranties including 
                  without limitation, implied warranties or conditions of merchantability, fitness for a 
                  particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-purple-600" />
                  Limitations
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  In no event shall our company or its suppliers be liable for any damages (including, 
                  without limitation, damages for loss of data or profit, or due to business interruption) 
                  arising out of the use or inability to use the materials on our website, even if we or 
                  our authorized representative has been notified orally or in writing of the possibility 
                  of such damage.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Health and Wellness Disclaimer
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Our Tai Chi and wellness programs are for educational and informational purposes only. 
                  They are not intended to replace professional medical advice, diagnosis, or treatment. 
                  Always consult with your healthcare provider before beginning any new exercise program.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Governing Law
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  These terms and conditions are governed by and construed in accordance with the laws 
                  and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Changes to Terms
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  We reserve the right to modify these terms at any time. We will notify users of any 
                  changes by posting the new Terms of Service on this page and updating the "Last updated" date.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Contact Information
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us:
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

