"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Play, CheckCircle, Star, Users, Calendar, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="home" className="relative min-h-screen bg-white overflow-hidden pt-24 sm:pt-32">
      {/* Clean Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.08),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-emerald-100/50 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100vh-6rem)] sm:min-h-[80vh]">
          {/* Left Content */}
          <div className={`text-center lg:text-left ${isVisible ? "animate-fade-in-left" : "opacity-0"}`}>
            {/* Trust Badge */}
            <Badge
              className={`mb-6 sm:mb-8 bg-emerald-100 text-emerald-800 hover:bg-emerald-100 px-4 sm:px-6 py-2 text-xs sm:text-sm font-semibold rounded-full inline-flex items-center ${isVisible ? "animate-fade-in-up animate-delay-200" : "opacity-0"}`}
            >
              ⭐ Trusted by 2500+ Happy Clients
            </Badge>

            {/* Main Heading */}
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight ${isVisible ? "animate-fade-in-up animate-delay-300" : "opacity-0"}`}
            >
              Your Personal
              <span className="block text-emerald-600">Wellness Journey</span>
              <span className="block text-gray-700">Starts at Home</span>
            </h1>

            {/* Description */}
            <p
              className={`text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 px-2 sm:px-0 ${isVisible ? "animate-fade-in-up animate-delay-400" : "opacity-0"}`}
            >
              Transform your life with certified yoga instructors, meditation experts, and wellness coaches who come
              directly to your home. Experience personalized care that fits your schedule and lifestyle.
            </p>

            {/* Key Benefits */}
            <div
              className={`space-y-3 sm:space-y-4 mb-8 sm:mb-10 ${isVisible ? "animate-fade-in-up animate-delay-500" : "opacity-0"}`}
            >
              {[
                "Certified & experienced trainers",
                "Personalized wellness programs",
                "Flexible scheduling & home service",
                "Proven results with 4.9/5 rating",
              ].map((benefit, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 justify-center lg:justify-start ${isVisible ? `animate-fade-in-left animate-delay-${600 + index * 100}` : "opacity-0"}`}
                >
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" />
                  </div>
                  <span className="text-gray-700 font-medium text-sm sm:text-base">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 px-4 sm:px-0 ${isVisible ? "animate-fade-in-up animate-delay-800" : "opacity-0"}`}
            >
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation text-sm sm:text-base"
              >
                Book Free Consultation
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 bg-transparent touch-manipulation text-sm sm:text-base"
              >
                <Play className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                Watch Demo
              </Button>
            </div>

            {/* Social Proof */}
            <div
              className={`flex items-center justify-center lg:justify-start space-x-4 sm:space-x-8 text-center ${isVisible ? "animate-fade-in-up animate-delay-900" : "opacity-0"}`}
            >
              <div className={`text-center ${isVisible ? "animate-zoom-in animate-delay-1000" : "opacity-0"}`}>
                <div className="text-xl sm:text-2xl font-bold text-gray-900">2500+</div>
                <div className="text-xs sm:text-sm text-gray-600">Happy Clients</div>
              </div>
              <div className={`text-center ${isVisible ? "animate-zoom-in animate-delay-1100" : "opacity-0"}`}>
                <div className="flex items-center justify-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
                  ))}
                  <span className="ml-1 text-xs sm:text-sm font-semibold text-gray-900">4.9</span>
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Average Rating</div>
              </div>
              <div className={`text-center ${isVisible ? "animate-zoom-in animate-delay-1200" : "opacity-0"}`}>
                <div className="text-xl sm:text-2xl font-bold text-gray-900">50+</div>
                <div className="text-xs sm:text-sm text-gray-600">Expert Trainers</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className={`mt-8 lg:mt-0 ${isVisible ? "animate-fade-in-right animate-delay-200" : "opacity-0"}`}>
            <div className="relative px-4 sm:px-0">
              {/* Main Image */}
              <div
                className={`relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl ${isVisible ? "animate-zoom-in animate-delay-400" : "opacity-0"}`}
              >
                <img
                  src="/13082.jpg?height=600&width=500&text=Professional+Yoga+Session+at+Home"
                  alt="Professional yoga session at home"
                  className="w-full h-64 sm:h-80 lg:h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Floating Elements */}
              <div
                className={`absolute -top-2 sm:-top-4 -left-2 sm:-left-4 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg sm:shadow-xl border border-gray-100 ${isVisible ? "animate-slide-in-top animate-delay-600" : "opacity-0"}`}
              >
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <div className="font-semibold text-gray-900 text-xs sm:text-sm">Live Session</div>
                    <div className="text-xs text-gray-600">24 people joined</div>
                  </div>
                </div>
              </div>

              <div
                className={`absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 bg-emerald-600 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg sm:shadow-xl text-white ${isVisible ? "animate-slide-in-top animate-delay-700" : "opacity-0"}`}
              >
                <div className="text-center">
                  <Users className="w-4 h-4 sm:w-6 sm:h-6 mx-auto mb-1" />
                  <div className="text-sm sm:text-lg font-bold">24/7</div>
                  <div className="text-xs">Support</div>
                </div>
              </div>

              <div
                className={`absolute top-1/2 -left-3 sm:-left-6 bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-lg sm:shadow-xl border border-gray-100 ${isVisible ? "animate-fade-in-right animate-delay-800" : "opacity-0"}`}
              >
                <div className="text-center">
                  <div className="text-lg sm:text-xl font-bold text-emerald-600">98%</div>
                  <div className="text-xs text-gray-600">Success Rate</div>
                </div>
              </div>

              {/* Background Decoration */}
              <div className="absolute -z-10 top-4 sm:top-8 left-4 sm:left-8 w-full h-full bg-emerald-100 rounded-2xl sm:rounded-3xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div
        className={`bg-gray-50 py-12 sm:py-16 mt-12 sm:mt-20 ${isVisible ? "animate-fade-in-up animate-delay-1000" : "opacity-0"}`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div
            className={`bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden ${isVisible ? "animate-zoom-in animate-delay-1100" : "opacity-0"}`}
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>
            </div>
            <div className="relative z-10">
              <h2
                className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 ${isVisible ? "animate-fade-in-up animate-delay-1200" : "opacity-0"}`}
              >
                Ready to Transform Your Life?
              </h2>
              <p
                className={`text-lg sm:text-xl mb-6 sm:mb-8 opacity-90 ${isVisible ? "animate-fade-in-up animate-delay-1300" : "opacity-0"}`}
              >
                Join thousands who have already started their wellness journey with us
              </p>
              <div
                className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto ${isVisible ? "animate-fade-in-up animate-delay-1400" : "opacity-0"}`}
              >
                <Button
                  size="lg"
                  className="bg-white text-emerald-600 hover:bg-gray-100 active:bg-gray-200 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg touch-manipulation transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <Calendar className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  Book Your First Session
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 active:bg-gray-100 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-transparent touch-manipulation transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <Phone className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  Call +91 98765 43210
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
