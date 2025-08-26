"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  userType: "user" | "trainer"
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string, userType?: "user" | "trainer") => Promise<boolean>
  signup: (name: string, email: string, password: string, userType?: "user" | "trainer") => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Check for existing session on mount
  useEffect(() => {
    setMounted(true)
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("svasthify_user")
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser))
        } catch (error) {
          console.error("Error parsing saved user:", error)
          localStorage.removeItem("svasthify_user")
        }
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, userType: "user" | "trainer" = "user"): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simple validation for demo purposes
    if (email && password.length >= 6) {
      const newUser: User = {
        id: Date.now().toString(),
        name: email.split("@")[0],
        email: email,
        userType: userType,
      }

      setUser(newUser)
      if (typeof window !== "undefined") {
        localStorage.setItem("svasthify_user", JSON.stringify(newUser))
      }
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const signup = async (
    name: string,
    email: string,
    password: string,
    userType: "user" | "trainer" = "user",
  ): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simple validation for demo purposes
    if (name && email && password.length >= 6) {
      const newUser: User = {
        id: Date.now().toString(),
        name: name,
        email: email,
        userType: userType,
      }

      setUser(newUser)
      if (typeof window !== "undefined") {
        localStorage.setItem("svasthify_user", JSON.stringify(newUser))
      }
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("svasthify_user")
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    isLoading,
  }

  if (!mounted) {
    return null
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
