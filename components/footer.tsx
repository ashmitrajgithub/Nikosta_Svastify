"use client"

import type React from "react"

import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube, Heart, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-gradient-to-br from-emerald-50 via-white via-50% to-emerald-100 to-100% text-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/3 via-white via-50% to-emerald-500/8"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-50/20 to-emerald-100/40"></div>

      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23059669' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 lg:gap-12 mb-12">
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="flex items-center group">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 mr-3 flex-shrink-0">
                <Image
                  src="https://svasthify.com/wp-content/uploads/2023/07/svasthify_logo.png"
                  alt="Svasthify Logo"
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                  priority
                />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-emerald-600 group-hover:text-emerald-700 transition-colors">
                  Svasthify
                </h3>
                <p className="text-emerald-500 text-xs sm:text-sm">Transform Your Life</p>
              </div>
            </Link>

            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              India's premier wellness platform, transforming lives through personalized yoga, meditation, and holistic
              wellness programs.
            </p>

            <div className="flex space-x-3">
              {[
                { Icon: Facebook, link: "#", color: "hover:bg-blue-500" },
                { Icon: Instagram, link: "#", color: "hover:bg-pink-500" },
                { Icon: Twitter, link: "#", color: "hover:bg-blue-400" },
                { Icon: Youtube, link: "#", color: "hover:bg-red-500" },
              ].map(({ Icon, link, color }, index) => (
                <Link
                  key={index}
                  href={link}
                  className={`w-10 h-10 bg-white rounded-xl flex items-center justify-center ${color} hover:text-white transition-all duration-300 shadow-sm border border-emerald-100 hover:shadow-md hover:scale-105`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-800 border-b border-emerald-100 pb-2">Our Services</h4>
            <div className="space-y-3">
              {[
                "Personal Yoga Training",
                "AI-Powered Meditation",
                "Wellness Coaching",
                "Prenatal Yoga",
                "Power Yoga Sessions",
                "Therapeutic Yoga",
              ].map((service) => (
                <Link
                  key={service}
                  href="#"
                  className="flex items-center group text-gray-600 hover:text-emerald-600 transition-all duration-300 text-sm sm:text-base"
                >
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="group-hover:translate-x-1 transition-transform">{service}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-800 border-b border-emerald-100 pb-2">Quick Links</h4>
            <div className="space-y-3">
              {[
                { name: "About Us", href: "#about" },
                { name: "Our Trainers", href: "#trainers" },
                { name: "Success Stories", href: "#testimonials" },
                { name: "Pricing Plans", href: "#pricing" },
                { name: "Wellness Blog", href: "#blog" },
                { name: "Contact Support", href: "#contact" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center group text-gray-600 hover:text-emerald-600 transition-all duration-300 text-sm sm:text-base"
                >
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="group-hover:translate-x-1 transition-transform">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-800 border-b border-emerald-100 pb-2">Get in Touch</h4>

            <div className="space-y-4">
              {[
                { Icon: Phone, title: "+91 98765 43210", subtitle: "24/7 Support", color: "bg-blue-50 text-blue-600" },
                {
                  Icon: Mail,
                  title: "info@svasthify.com",
                  subtitle: "Quick Response",
                  color: "bg-emerald-50 text-emerald-600",
                },
                { Icon: MapPin, title: "Mumbai, India", subtitle: "15+ Cities", color: "bg-purple-50 text-purple-600" },
              ].map(({ Icon, title, subtitle, color }) => (
                <div key={title} className="flex items-center space-x-3 group">
                  <div
                    className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800 text-sm sm:text-base">{title}</div>
                    <div className="text-xs sm:text-sm text-gray-600">{subtitle}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 sm:p-6 bg-white rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
              <h5 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Weekly Wellness Tips</h5>
              <p className="text-gray-600 text-xs sm:text-sm mb-4">
                Get expert wellness advice delivered to your inbox.
              </p>

              {isSubscribed ? (
                <div className="text-center py-4">
                  <div className="text-emerald-600 font-medium text-sm">✓ Successfully subscribed!</div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-sm transition-all"
                    required
                  />
                  <Button
                    type="submit"
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl py-3 text-sm font-medium transition-all hover:shadow-md"
                  >
                    Subscribe Now
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-emerald-200 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 text-gray-600 text-sm">
              <span>© 2024 Svasthify Wellness Pvt. Ltd.</span>
              <span className="hidden sm:inline">•</span>
              <div className="flex items-center space-x-1">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
                <span>in India</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-gray-600 hover:text-emerald-600 text-sm transition-colors duration-300 hover:underline"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
