"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Star, Quote, Award, Heart, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Priya Mehta",
    age: 32,
    location: "Mumbai",
    profession: "Software Engineer",
    image: "/02.jpg?height=400&width=400&text=Priya+Mehta+Client",
    rating: 5,
    title: "Transformed My Work-Life Balance",
    testimonial:
      "Svasthify completely changed my approach to wellness. The personalized yoga sessions at home fit perfectly into my busy schedule. I've lost 15kg and feel more energetic than ever!",
    results: ["Lost 15kg in 6 months", "Improved flexibility by 80%", "Reduced stress levels significantly"],
    program: "Personal Yoga + Wellness Coaching",
    duration: "6 months",
    beforeAfter: {
      before: "Stressed, overweight, poor posture",
      after: "Confident, healthy, energetic",
    },
    videoThumbnail: "/placeholder.svg?height=200&width=300&text=Priya+Success+Video",
    gradient: "from-rose-500 to-pink-600",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    age: 45,
    location: "Delhi",
    profession: "Business Owner",
    image: "/03.jpg?height=400&width=400&text=Rajesh+Kumar+Client",
    rating: 5,
    title: "Overcame Chronic Back Pain",
    testimonial:
      "After years of back pain from desk work, I was skeptical about yoga. But the therapeutic sessions with Svasthify's expert trainers have been life-changing. I'm pain-free for the first time in 5 years!",
    results: ["100% pain relief", "Improved posture", "Better sleep quality"],
    program: "Therapeutic Yoga + Meditation",
    duration: "4 months",
    beforeAfter: {
      before: "Chronic pain, poor sleep, limited mobility",
      after: "Pain-free, active, peaceful",
    },
    videoThumbnail: "/placeholder.svg?height=200&width=300&text=Rajesh+Success+Video",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    id: 3,
    name: "Anita Sharma",
    age: 28,
    location: "Bangalore",
    profession: "New Mother",
    image: "/placeholder.svg?height=400&width=400&text=Anita+Sharma+Client",
    rating: 5,
    title: "Perfect Prenatal & Postnatal Care",
    testimonial:
      "The prenatal yoga sessions helped me have a smooth pregnancy and delivery. Post-delivery, the gentle recovery program helped me regain my strength safely. Highly recommend to all mothers!",
    results: ["Smooth pregnancy", "Quick recovery", "Regained pre-pregnancy fitness"],
    program: "Prenatal + Postnatal Yoga",
    duration: "12 months",
    beforeAfter: {
      before: "Pregnancy discomfort, anxiety",
      after: "Confident mother, strong body",
    },
    videoThumbnail: "/04.jpg?height=200&width=300&text=Anita+Success+Video",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: 4,
    name: "Vikram Singh",
    age: 38,
    location: "Pune",
    profession: "Marketing Director",
    image: "/placeholder.svg?height=400&width=400&text=Vikram+Singh+Client",
    rating: 5,
    title: "Achieved Peak Mental Clarity",
    testimonial:
      "The meditation and mindfulness sessions transformed my mental health. I'm more focused at work, handle stress better, and have found inner peace. The convenience of home sessions is unmatched!",
    results: ["90% stress reduction", "Improved focus", "Better decision making"],
    program: "Meditation + Mindfulness Coaching",
    duration: "8 months",
    beforeAfter: {
      before: "High stress, poor focus, anxiety",
      after: "Calm, focused, confident leader",
    },
    videoThumbnail: "/placeholder.svg?height=200&width=300&text=Vikram+Success+Video",
    gradient: "from-purple-500 to-violet-600",
  },
  {
    id: 5,
    name: "Meera Patel",
    age: 52,
    location: "Ahmedabad",
    profession: "Teacher",
    image: "/placeholder.svg?height=400&width=400&text=Meera+Patel+Client",
    rating: 5,
    title: "Rediscovered Youthful Energy",
    testimonial:
      "At 52, I thought it was too late to start yoga. Svasthify's gentle approach and expert guidance proved me wrong. I feel 10 years younger and more flexible than my 30s!",
    results: ["Increased flexibility", "Better joint health", "Renewed confidence"],
    program: "Gentle Yoga + Wellness Coaching",
    duration: "10 months",
    beforeAfter: {
      before: "Joint stiffness, low energy, self-doubt",
      after: "Flexible, energetic, confident",
    },
    videoThumbnail: "/placeholder.svg?height=200&width=300&text=Meera+Success+Video",
    gradient: "from-orange-500 to-red-600",
  },
]

const stats = [
  { number: "2500+", label: "Success Stories", icon: Heart },
  { number: "98%", label: "Client Satisfaction", icon: Award },
  { number: "4.9/5", label: "Average Rating", icon: Star },
  { number: "85%", label: "Achieve Goals", icon: TrendingUp },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000) // Longer interval for mobile

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextTestimonial()
    }
    if (isRightSwipe) {
      prevTestimonial()
    }
  }

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section
      id="testimonials"
      className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.05),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.05),transparent_50%)]"></div>

      <div className="container mx-auto relative z-10">
        {/* Header - Mobile optimized */}
        <div className="text-center mb-16 sm:mb-20">
          <Badge
            className="mb-4 sm:mb-6 bg-purple-100 text-purple-800 hover:bg-purple-100 px-4 sm:px-6 py-2 text-xs sm:text-sm font-semibold"
            data-aos="fade-up"
            data-aos-duration="500"
          >
            ⭐ Client Success Stories
          </Badge>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-4 sm:px-0"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="100"
          >
            Real People,
            <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-emerald-600 bg-clip-text text-transparent">
              Real Transformations
            </span>
          </h2>
          <p
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="200"
          >
            Discover how thousands of clients have transformed their lives with our personalized wellness programs.
            Their success stories speak louder than any promise we could make.
          </p>
        </div>

        {/* Stats Bar - Mobile optimized */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 mb-16 sm:mb-20"
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="300"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div
                key={stat.label}
                className="text-center p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 touch-manipulation"
                data-aos="zoom-in"
                data-aos-duration="500"
                data-aos-delay={400 + index * 100}
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-r from-purple-100 to-emerald-100 rounded-xl sm:rounded-2xl flex items-center justify-center">
                  <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium text-sm sm:text-base">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Main Testimonial Carousel - Mobile optimized */}
        <div
          className="relative mb-12 sm:mb-16"
          data-aos="fade-up"
          data-aos-duration="700"
          data-aos-delay="500"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left Side - Testimonial Content */}
            <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
              {/* Quote Icon */}
              <div
                className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg mx-auto lg:mx-0"
                data-aos="zoom-in"
                data-aos-duration="500"
                data-aos-delay="600"
              >
                <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>

              {/* Rating */}
              <div
                className="flex items-center justify-center lg:justify-start space-x-2"
                data-aos="fade-right"
                data-aos-duration="500"
                data-aos-delay="700"
              >
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 fill-current" />
                ))}
                <span className="text-lg font-semibold text-gray-900 ml-2">{currentTestimonial.rating}.0</span>
              </div>

              {/* Title */}
              <h3
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight text-center lg:text-left"
                data-aos="fade-right"
                data-aos-duration="600"
                data-aos-delay="800"
              >
                {currentTestimonial.title}
              </h3>

              {/* Testimonial Text */}
              <blockquote
                className="text-lg sm:text-xl text-gray-700 leading-relaxed italic text-center lg:text-left"
                data-aos="fade-right"
                data-aos-duration="600"
                data-aos-delay="900"
              >
                "{currentTestimonial.testimonial}"
              </blockquote>

              {/* Results */}
              <div
                className="space-y-2 sm:space-y-3"
                data-aos="fade-right"
                data-aos-duration="600"
                data-aos-delay="1000"
              >
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 text-center lg:text-left">
                  Key Results:
                </h4>
                {currentTestimonial.results.map((result, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 justify-center lg:justify-start"
                    data-aos="fade-left"
                    data-aos-duration="400"
                    data-aos-delay={1100 + index * 100}
                  >
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium text-sm sm:text-base">{result}</span>
                  </div>
                ))}
              </div>

              {/* Client Info */}
              <div
                className="flex items-center space-x-3 sm:space-x-4 pt-4 sm:pt-6 border-t border-gray-200 justify-center lg:justify-start"
                data-aos="fade-right"
                data-aos-duration="600"
                data-aos-delay="1400"
              >
                <img
                  src={currentTestimonial.image || "/placeholder.svg"}
                  alt={currentTestimonial.name}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover shadow-lg"
                />
                <div className="text-center lg:text-left">
                  <div className="font-bold text-gray-900 text-base sm:text-lg">{currentTestimonial.name}</div>
                  <div className="text-gray-600 text-sm sm:text-base">{currentTestimonial.profession}</div>
                  <div className="text-sm text-gray-500">
                    {currentTestimonial.location} • {currentTestimonial.age} years
                  </div>
                </div>
              </div>

              {/* Program Info */}
              <div
                className="bg-gradient-to-r from-purple-50 to-emerald-50 rounded-xl sm:rounded-2xl p-4 sm:p-6"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="1500"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs sm:text-sm text-gray-600 mb-1">Program</div>
                    <div className="font-semibold text-gray-900 text-sm sm:text-base">{currentTestimonial.program}</div>
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm text-gray-600 mb-1">Duration</div>
                    <div className="font-semibold text-gray-900 text-sm sm:text-base">
                      {currentTestimonial.duration}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Visual Content */}
            <div className="relative order-1 lg:order-2">
              {/* Main Image */}
              <div
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl"
                data-aos="zoom-in"
                data-aos-duration="700"
                data-aos-delay="600"
              >
                <img
                  src={currentTestimonial.image || "/placeholder.svg"}
                  alt={currentTestimonial.name}
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                {/* Success Badge */}
                <div
                  className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-emerald-500 text-white rounded-full px-3 sm:px-4 py-1 sm:py-2 shadow-lg"
                  data-aos="fade-left"
                  data-aos-duration="500"
                  data-aos-delay="1200"
                >
                  <div className="text-xs sm:text-sm font-bold">Success Story</div>
                </div>
              </div>

              {/* Before/After Card */}
              <div
                className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl sm:shadow-2xl border border-gray-100 max-w-xs"
                data-aos="fade-up-right"
                data-aos-duration="600"
                data-aos-delay="1400"
              >
                <h4 className="font-bold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Transformation</h4>
                <div className="space-y-1 sm:space-y-2">
                  <div>
                    <span className="text-xs sm:text-sm text-red-600 font-medium">Before: </span>
                    <span className="text-xs sm:text-sm text-gray-700">{currentTestimonial.beforeAfter.before}</span>
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm text-emerald-600 font-medium">After: </span>
                    <span className="text-xs sm:text-sm text-gray-700">{currentTestimonial.beforeAfter.after}</span>
                  </div>
                </div>
              </div>

              {/* Floating Achievement */}
              <div
                className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl sm:shadow-2xl text-white"
                data-aos="fade-down-left"
                data-aos-duration="600"
                data-aos-delay="1600"
              >
                <Award className="w-4 h-4 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2" />
                <div className="text-xs sm:text-sm font-bold text-center">Client of</div>
                <div className="text-xs sm:text-sm text-center">the Month</div>
              </div>
            </div>
          </div>

          {/* Swipe Indicator for Mobile */}
          <div className="flex justify-center mt-6 lg:hidden">
            <div className="bg-gray-200 rounded-full px-4 py-2">
              <span className="text-xs text-gray-600">← Swipe to see more stories →</span>
            </div>
          </div>
        </div>

        {/* Testimonial Thumbnails - Mobile optimized */}
        <div
          className="flex justify-center space-x-3 sm:space-x-4 mb-12 sm:mb-16 overflow-x-auto pb-4"
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="2000"
        >
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => goToTestimonial(index)}
              className={`flex-shrink-0 relative transition-all duration-300 touch-manipulation ${
                index === currentIndex
                  ? "scale-110 ring-4 ring-purple-500 ring-opacity-50"
                  : "hover:scale-105 opacity-70 hover:opacity-100"
              }`}
              data-aos="zoom-in"
              data-aos-duration="400"
              data-aos-delay={2100 + index * 100}
            >
              <img
                src={testimonial.image || "/placeholder.svg"}
                alt={testimonial.name}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover shadow-lg"
              />
              {index === currentIndex && (
                <div className="absolute -bottom-1 sm:-bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* Carousel Indicators */}
        <div
          className="flex justify-center space-x-2 sm:space-x-3 mb-12 sm:mb-16"
          data-aos="fade-up"
          data-aos-duration="500"
          data-aos-delay="2300"
        >
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`transition-all duration-300 touch-manipulation ${
                index === currentIndex
                  ? "w-6 sm:w-8 h-2 sm:h-3 bg-purple-500 rounded-full"
                  : "w-2 sm:w-3 h-2 sm:h-3 bg-gray-300 rounded-full hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Bottom CTA - Mobile optimized */}
        <div
          className="text-center bg-gradient-to-r from-purple-600 via-pink-600 to-emerald-600 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden mx-4 sm:mx-0"
          data-aos="zoom-in"
          data-aos-duration="700"
          data-aos-delay="2400"
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <h3
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="2600"
            >
              Ready to Write Your Success Story?
            </h3>
            <p
              className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="2700"
            >
              Join thousands of satisfied clients who have transformed their lives with Svasthify
            </p>
            <div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="2800"
            >
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 active:bg-gray-200 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation"
              >
                Start Your Transformation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-purple-600 active:bg-gray-100 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-transparent transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation"
              >
                View All Success Stories
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
