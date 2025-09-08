"use client"

import { Button } from "@/components/ui/button"
import { Play, Heart, Brain, DollarSign } from "lucide-react"

export function WelcomeIntro() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-sage-100 via-ocean-100 to-earth-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Video Container */}
          <div className="relative mb-8 rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm">
            <div className="aspect-video bg-gradient-to-br from-sage-200 to-ocean-200 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto backdrop-blur-sm">
                  <Play className="w-8 h-8 text-sage-700 ml-1" />
                </div>
                <p className="text-sage-700 font-medium">Welcome Video: Overcoming Depression Through Wellness</p>
              </div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-light text-sage-800 leading-tight">
              Find Your Path to
              <span className="block text-ocean-700 font-medium">Complete Wellness</span>
            </h1>

            <p className="text-xl text-sage-600 max-w-2xl mx-auto leading-relaxed">
              Discover healing through Tai Chi, breathing, and meditation. Transform your mental, physical, and
              financial well-being with Dr. Danielle Beauvais.
            </p>

            {/* Wellness Pillars */}
            <div className="flex flex-wrap justify-center gap-6 mt-12">
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                <Brain className="w-5 h-5 text-sage-600" />
                <span className="text-sage-700 font-medium">Mental Health</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                <Heart className="w-5 h-5 text-ocean-600" />
                <span className="text-ocean-700 font-medium">Physical Health</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                <DollarSign className="w-5 h-5 text-earth-600" />
                <span className="text-earth-700 font-medium">Financial Health</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Button size="lg" className="bg-sage-600 hover:bg-sage-700 text-white px-8 py-3 text-lg rounded-full">
                Start Your Free Practice
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-ocean-300 text-ocean-700 hover:bg-ocean-50 px-8 py-3 text-lg rounded-full"
              >
                Explore Courses
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
