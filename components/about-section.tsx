"use client"

import { useState, useEffect } from "react"
import { Heart, Users, Globe, Target, Star, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const teamMembers = [
  {
    id: 1,
    name: "Dr. Arjun Mehta",
    role: "Founder & CEO",
    specialization: "Ayurveda & Wellness Strategy",
    image: "/placeholder.svg?height=400&width=400&text=Dr.+Arjun+Mehta",
    bio: "With 15+ years in holistic wellness, Dr. Mehta founded Svasthify to bridge ancient wisdom with modern lifestyle needs.",
    achievements: ["PhD in Ayurveda", "500+ Client Transformations", "Wellness Industry Pioneer"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "arjun@svasthify.com",
    },
  },
  {
    id: 2,
    name: "Kavya Sharma",
    role: "Head of Training",
    specialization: "Yoga & Meditation",
    image: "/placeholder.svg?height=400&width=400&text=Kavya+Sharma",
    bio: "International yoga instructor with expertise in traditional Hatha and modern Vinyasa practices.",
    achievements: ["RYT-500 Certified", "International Speaker", "Mindfulness Expert"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "kavya@svasthify.com",
    },
  },
  {
    id: 3,
    name: "Rohit Patel",
    role: "Wellness Technology Lead",
    specialization: "Digital Health & Innovation",
    image: "/placeholder.svg?height=400&width=400&text=Rohit+Patel",
    bio: "Tech entrepreneur passionate about leveraging technology to make wellness more accessible and personalized.",
    achievements: ["MIT Graduate", "Health Tech Innovator", "AI Wellness Pioneer"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "rohit@svasthify.com",
    },
  },
  {
    id: 4,
    name: "Dr. Meera Gupta",
    role: "Chief Wellness Officer",
    specialization: "Nutrition & Lifestyle Medicine",
    image: "/placeholder.svg?height=400&width=400&text=Dr.+Meera+Gupta",
    bio: "Certified nutritionist and lifestyle medicine practitioner focused on sustainable health transformations.",
    achievements: ["MD in Lifestyle Medicine", "Nutrition Specialist", "Wellness Author"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "meera@svasthify.com",
    },
  },
]

const stats = [
  { number: "2500+", label: "Lives Transformed", icon: Heart, color: "text-emerald-500" },
  { number: "50+", label: "Expert Trainers", icon: Users, color: "text-purple-500" },
  { number: "15+", label: "Cities Covered", icon: Globe, color: "text-emerald-500" },
  { number: "4.9/5", label: "Client Rating", icon: Star, color: "text-yellow-500" },
]

export function AboutSection() {
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

    const section = document.getElementById("about-section")
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about-section"
      className="py-16 px-6 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50/30"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/5 via-transparent to-purple-500/5"></div>
        <div className="absolute top-10 -left-20 w-40 h-40 bg-emerald-400/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 -right-20 w-48 h-48 bg-purple-400/10 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto relative z-10 max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-xs font-bold bg-gradient-to-r from-emerald-600 to-purple-600 bg-clip-text text-transparent tracking-[0.2em] uppercase">
              Our Story
            </span>
            <div className="w-16 h-0.5 bg-gradient-to-r from-emerald-500 to-purple-500 mx-auto mt-1"></div>
          </div>

          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
            Transforming Lives Through
            <span className="block bg-gradient-to-r from-emerald-500 to-purple-600 bg-clip-text text-transparent">
              Excellence
            </span>
          </h2>

          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Born from a passion to make holistic wellness accessible to everyone, Svasthify has grown into a trusted
            wellness destination.
          </p>
        </div>

        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            <div className="relative">
              <img
                src="/about.jpg?height=400&width=500&text=Svasthify+Wellness+Journey"
                alt="Svasthify wellness journey"
                className="rounded-2xl w-full shadow-xl"
              />
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-emerald-500 to-purple-600 text-white p-4 rounded-xl shadow-lg">
                <div className="text-2xl font-black mb-1">2500+</div>
                <div className="text-xs font-bold opacity-90">Lives Transformed</div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-black text-slate-900 mb-4 leading-tight">Our Journey</h3>
                <p className="text-base text-slate-600 leading-relaxed mb-4">
                  Founded in 2021 by passionate wellness experts, Svasthify bridges ancient wisdom with modern lifestyle
                  needs.
                </p>
                <p className="text-base text-slate-600 leading-relaxed">
                  Today, we remain committed to enhancing quality of life and fostering a vibrant wellness community.
                </p>
              </div>

              <div className="grid gap-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-slate-900 mb-1">Our Mission</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Make holistic wellness accessible and sustainable through expert guidance and innovative
                      approaches.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-slate-900 mb-1">Our Vision</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Create a world where wellness is a way of life, empowering individuals to achieve their highest
                      potential.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={stat.label} className="text-center group cursor-pointer">
                  <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-emerald-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-black text-slate-900 mb-1 group-hover:scale-110 transition-all duration-300">
                    {stat.number}
                  </div>
                  <div className="text-slate-600 font-bold uppercase tracking-wide text-xs">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="text-center">
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-purple-500/10 rounded-2xl blur-2xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-xl">
              <h3 className="text-3xl font-black text-slate-900 mb-4 leading-tight">
                Ready to Start Your Wellness Journey?
              </h3>
              <p className="text-base text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                Join thousands who have transformed their lives with our expert guidance and personalized wellness
                approach.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-emerald-500 to-purple-600 hover:from-emerald-600 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-3 rounded-full font-black hover:scale-105">
                  Start Your Journey
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 px-8 py-3 rounded-full font-black transition-all duration-300 bg-transparent hover:scale-105"
                >
                  Meet Our Team
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
