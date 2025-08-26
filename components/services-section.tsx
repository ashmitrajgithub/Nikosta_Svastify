"use client"

import { Heart, Zap, Leaf, ArrowRight, Star, Clock, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const services = [
  {
    icon: Heart,
    title: "Personal Yoga Training",
    description: "One-on-one yoga sessions tailored to your fitness level and wellness goals.",
    features: ["Customized routines", "Posture correction", "Breathing techniques", "Flexibility improvement"],
    price: "₹1,200",
    duration: "60 min",
    rating: 4.9,
    sessions: "1000+",
    image: "/02.jpg?height=200&width=300&text=Yoga+Training",
  },
  {
    icon: Zap,
    title: "Meditation & Mindfulness",
    description: "Guided meditation sessions to reduce stress and improve mental clarity.",
    features: ["Stress reduction", "Better focus", "Emotional balance", "Sleep improvement"],
    price: "₹800",
    duration: "45 min",
    rating: 4.8,
    sessions: "800+",
    image: "/03.jpg?height=200&width=300&text=Meditation",
  },
  {
    icon: Leaf,
    title: "Wellness Coaching",
    description: "Comprehensive lifestyle coaching covering nutrition, habits, and wellness practices.",
    features: ["Nutrition guidance", "Lifestyle planning", "Goal setting", "Progress tracking"],
    price: "₹1,500",
    duration: "90 min",
    rating: 5.0,
    sessions: "600+",
    image: "/04.jpg?height=200&width=300&text=Wellness+Coaching",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
      <div className="container mx-auto">
        {/* Header - Mobile optimized */}
        <div className="text-center mb-12 sm:mb-16">
          <Badge
            className="mb-3 sm:mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-100 px-4 sm:px-6 py-2 text-xs sm:text-sm font-semibold"
            data-aos="fade-up"
            data-aos-duration="500"
          >
            Our Services
          </Badge>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-4 sm:px-0"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="100"
          >
            Choose Your Perfect
            <span className="block text-emerald-600">Wellness Program</span>
          </h2>
          <p
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="200"
          >
            Discover our range of personalized wellness services designed to help you achieve your health and fitness
            goals from the comfort of your home.
          </p>
        </div>

        {/* Services Grid - Mobile optimized */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <Card
                key={service.title}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white touch-manipulation"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay={300 + index * 100}
              >
                {/* Service Image - Mobile optimized */}
                <div
                  className="relative h-40 sm:h-48 overflow-hidden rounded-t-lg"
                  data-aos="zoom-in"
                  data-aos-duration="500"
                  data-aos-delay={400 + index * 100}
                >
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div
                    className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 shadow-lg"
                    data-aos="fade-left"
                    data-aos-duration="400"
                    data-aos-delay={500 + index * 100}
                  >
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
                      <span className="text-xs sm:text-sm font-bold">{service.rating}</span>
                    </div>
                  </div>
                  <div
                    className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-emerald-600 text-white rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold"
                    data-aos="fade-right"
                    data-aos-duration="400"
                    data-aos-delay={500 + index * 100}
                  >
                    {service.price}
                  </div>
                </div>

                <CardHeader
                  className="pb-2 sm:pb-3 px-4 sm:px-6"
                  data-aos="fade-up"
                  data-aos-duration="500"
                  data-aos-delay={600 + index * 100}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                        {service.title}
                      </CardTitle>
                      <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{service.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{service.sessions}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent
                  className="px-4 sm:px-6"
                  data-aos="fade-up"
                  data-aos-duration="500"
                  data-aos-delay={700 + index * 100}
                >
                  {/* Features - Mobile optimized */}
                  <div className="space-y-2 mb-4 sm:mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center space-x-2"
                        data-aos="fade-right"
                        data-aos-duration="400"
                        data-aos-delay={800 + index * 100 + featureIndex * 30}
                      >
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full flex-shrink-0"></div>
                        <span className="text-xs sm:text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button - Mobile optimized */}
                  <Button
                    className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold py-2.5 sm:py-3 rounded-lg touch-manipulation transition-all duration-300 hover:scale-105 active:scale-95 text-sm sm:text-base"
                    data-aos="zoom-in"
                    data-aos-duration="400"
                    data-aos-delay={1000 + index * 100}
                  >
                    Book {service.title}
                    <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA - Mobile optimized */}
        <div
          className="text-center bg-gray-50 rounded-2xl p-8 sm:p-12 mx-4 sm:mx-0"
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="1300"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
            Not Sure Which Service is Right for You?
          </h3>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 px-4 sm:px-0">
            Book a free consultation with our wellness experts to create a personalized plan
          </p>
          <Button
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl touch-manipulation transition-all duration-300 hover:scale-105 active:scale-95"
            data-aos="zoom-in"
            data-aos-duration="400"
            data-aos-delay="1400"
          >
            Get Free Consultation
          </Button>
        </div>
      </div>
    </section>
  )
}
