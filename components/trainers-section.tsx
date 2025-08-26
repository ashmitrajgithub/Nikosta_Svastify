"use client"

import { useState, useEffect } from "react"
import { Star, Calendar, MapPin, Phone, ChevronDown, ChevronUp, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookingModal } from "./booking-modal"

const trainers = [
  {
    id: 1,
    name: "Sikha Bansal",
    title: "Senior Yoga Instructor",
    specialization: "Hatha & Vinyasa Yoga",
    experience: "8 years",
    rating: 4.9,
    reviews: 156,
    location: "Mumbai, Pune",
    image: "/t1.jpg?height=400&width=400&text=Priya+Sharma+Yoga+Instructor",
    certifications: ["RYT-500", "Meditation Teacher", "Ayurveda Certified"],
    languages: ["Hindi", "English", "Marathi"],
    price: "₹1,200",
    availability: "Mon-Sat",
    bio: "Passionate about helping students find balance through traditional yoga practices combined with modern wellness techniques.",
    specialty: "Stress Relief & Flexibility",
    sessions: 1200,
    successRate: "98%",
  },
  {
    id: 2,
    name: "Manoj Bansal",
    title: "Power Yoga Specialist",
    specialization: "Power Yoga & Meditation",
    experience: "12 years",
    rating: 4.8,
    reviews: 203,
    location: "Delhi, Gurgaon",
    image: "/t2.jpg?height=400&width=400&text=Rajesh+Kumar+Power+Yoga",
    certifications: ["RYT-200", "Power Yoga Specialist", "Mindfulness Coach"],
    languages: ["Hindi", "English", "Punjabi"],
    price: "₹1,500",
    availability: "All days",
    bio: "Specializes in dynamic yoga flows and meditation techniques for stress management and mental clarity.",
    specialty: "Power Yoga & Mental Clarity",
    sessions: 1800,
    successRate: "96%",
  },
  {
    id: 3,
    name: "Kishan Panwar",
    title: "Wellness & Prenatal Expert",
    specialization: "Prenatal & Restorative Yoga",
    experience: "10 years",
    rating: 5.0,
    reviews: 89,
    location: "Bangalore, Chennai",
    image: "/t3.jpg?height=400&width=400&text=Anita+Patel+Prenatal+Yoga",
    certifications: ["Prenatal Yoga Certified", "Yin Yoga Teacher", "Therapeutic Yoga"],
    languages: ["English", "Tamil", "Kannada"],
    price: "₹1,000",
    availability: "Mon-Fri",
    bio: "Dedicated to supporting women through their wellness journey with gentle, healing yoga practices.",
    specialty: "Prenatal & Therapeutic",
    sessions: 950,
    successRate: "100%",
  },
  {
    id: 4,
    name: "Jacks Maliyakal",
    title: "Master Yoga Teacher",
    specialization: "Ashtanga & Advanced Yoga",
    experience: "15 years",
    rating: 4.9,
    reviews: 267,
    location: "Jaipur, Udaipur",
    image: "/t4.jpg?height=400&width=400&text=Vikram+Singh+Ashtanga+Master",
    certifications: ["Ashtanga Authorized", "Advanced Yoga Teacher", "Philosophy Teacher"],
    languages: ["Hindi", "English", "Rajasthani"],
    price: "₹1,800",
    availability: "Tue-Sun",
    bio: "Master practitioner of traditional Ashtanga yoga with deep knowledge of yogic philosophy and advanced techniques.",
    specialty: "Advanced Practices",
    sessions: 2200,
    successRate: "97%",
  },
]

export function TrainersSection() {
  const [selectedTrainer, setSelectedTrainer] = useState<number | null>(null)
  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [selectedTrainerForBooking, setSelectedTrainerForBooking] = useState<any>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const section = document.getElementById("trainers-section")
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  const handleBookTrainer = (trainerId: number) => {
    const trainer = trainers.find((t) => t.id === trainerId)
    setSelectedTrainerForBooking(trainer)
    setBookingModalOpen(true)
  }

  const toggleTrainerDetails = (trainerId: number) => {
    setSelectedTrainer(selectedTrainer === trainerId ? null : trainerId)
  }

  return (
    <section id="trainers" className="py-24 px-6 bg-white" id="trainers-section">
      <div className="container mx-auto">
        {/* Clean Header */}
        <div className="text-center mb-20">
          <h2
            className={`text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          >
            Meet Our Expert
            <span className="block text-emerald-600">Trainers</span>
          </h2>
          <p
            className={`text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed ${isVisible ? "animate-fade-in-up animate-delay-200" : "opacity-0"}`}
          >
            Learn from certified professionals who are passionate about your wellness journey
          </p>
        </div>

        {/* Clean Trainers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {trainers.map((trainer, index) => (
            <Card
              key={trainer.id}
              className={`group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg bg-white overflow-hidden ${isVisible ? `animate-fade-in-up animate-delay-${300 + index * 100}` : "opacity-0"}`}
            >
              {/* Clean Image Section */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={trainer.image || "/placeholder.svg"}
                  alt={trainer.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                {/* Simple Rating Badge */}
                <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-lg">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-bold">{trainer.rating}</span>
                  </div>
                </div>

                {/* Available Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-emerald-500 text-white">Available</Badge>
                </div>
              </div>

              <CardContent className="p-6">
                {/* Trainer Info */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{trainer.name}</h3>
                  <p className="text-emerald-600 font-semibold mb-2">{trainer.specialization}</p>
                  <p className="text-gray-600 text-sm">{trainer.experience} experience</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-900">{trainer.sessions}+</div>
                    <div className="text-xs text-gray-600">Sessions</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-emerald-600">{trainer.successRate}</div>
                    <div className="text-xs text-gray-600">Success Rate</div>
                  </div>
                </div>

                {/* Location & Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{trainer.location}</span>
                  </div>
                  <div className="text-lg font-bold text-emerald-600">{trainer.price}</div>
                </div>

                {/* Expand Button */}
                <button
                  onClick={() => toggleTrainerDetails(trainer.id)}
                  className="w-full flex items-center justify-center space-x-2 py-2 text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  <span>{selectedTrainer === trainer.id ? "Less Details" : "View Details"}</span>
                  {selectedTrainer === trainer.id ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {/* Expanded Details */}
                {selectedTrainer === trainer.id && (
                  <div className="mt-4 pt-4 border-t space-y-4 animate-slide-in-top">
                    <p className="text-sm text-gray-700 leading-relaxed">{trainer.bio}</p>

                    {/* Certifications */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Certifications</h4>
                      <div className="flex flex-wrap gap-2">
                        {trainer.certifications.map((cert) => (
                          <Badge key={cert} variant="outline" className="text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Languages */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Languages</h4>
                      <div className="flex flex-wrap gap-2">
                        {trainer.languages.map((lang) => (
                          <Badge key={lang} className="bg-gray-100 text-gray-700 text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Book Button */}
                <Button
                  className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105"
                  onClick={() => handleBookTrainer(trainer.id)}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Session
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Simple CTA */}
        <div
          className={`text-center bg-emerald-50 rounded-3xl p-12 ${isVisible ? "animate-fade-in-up animate-delay-800" : "opacity-0"}`}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Need Help Choosing?</h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Our wellness consultants will help you find the perfect trainer based on your goals and preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-xl">
              Get Trainer Recommendation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-bold px-8 py-4 rounded-xl bg-transparent"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => {
          setBookingModalOpen(false)
          setSelectedTrainerForBooking(null)
        }}
        trainer={selectedTrainerForBooking}
      />
    </section>
  )
}
