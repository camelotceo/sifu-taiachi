import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Youtube, Twitter } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white py-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold">Tai Chi with Dr. Beauvais</span>
                <p className="text-xs text-purple-200">Holistic Wellness & Transformation</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Transforming lives through the ancient art of Tai Chi combined with modern therapeutic practices. Heal
              your mind, strengthen your body, and create financial abundance.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-purple-200">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/videos" className="text-gray-300 hover:text-white transition-colors hover:underline">
                  Free Videos
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-gray-300 hover:text-white transition-colors hover:underline">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors hover:underline">
                  About Dr. Beauvais
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors hover:underline">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Wellness Programs */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-pink-200">Wellness Programs</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/courses/mental-health"
                  className="text-gray-300 hover:text-white transition-colors hover:underline"
                >
                  Mental Health Mastery
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/physical-health"
                  className="text-gray-300 hover:text-white transition-colors hover:underline"
                >
                  Physical Wellness and Healing
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/financial-health"
                  className="text-gray-300 hover:text-white transition-colors hover:underline"
                >
                  Financial Abundance Mindset
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors hover:underline">
                  Chair Tai Chi Program
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors hover:underline">
                  Senior Wellness Program
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-teal-200">Get in Touch</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-purple-300" />
                <a
                  href="mailto:info@taichiwithdrbeauvais.com"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  info@taichiwithdrbeauvais.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-purple-300" />
                <a href="tel:+15551234567" className="text-gray-300 hover:text-white transition-colors">
                  (555) 123-4567
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-purple-300" />
                <span className="text-gray-300">Online Worldwide</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg">
              <h4 className="font-semibold text-white mb-2">Newsletter</h4>
              <p className="text-xs text-gray-300 mb-3">Get weekly wellness tips and updates</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-white/20 border border-white/30 rounded text-white placeholder-gray-300 text-xs focus:outline-none focus:border-purple-400"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded text-white text-xs font-semibold hover:opacity-90 transition-opacity">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">© 2024 Tai Chi with Dr. Beauvais. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
