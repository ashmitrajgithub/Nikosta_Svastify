"use client"

import type React from "react"
import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, User, Loader2, X, GraduationCap } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/contexts/auth-context"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultMode?: "login" | "signup"
}

export function AuthModal({ isOpen, onClose, defaultMode = "login" }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">(defaultMode)
  const [userType, setUserType] = useState<"user" | "trainer">("user")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { login, signup, isLoading } = useAuth()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (mode === "signup") {
      if (!formData.name) {
        newErrors.name = "Name is required"
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      let success = false

      if (mode === "login") {
        success = await login(formData.email, formData.password, userType)
      } else {
        success = await signup(formData.name, formData.email, formData.password, userType)
      }

      if (success) {
        handleClose()
      } else {
        setErrors({
          submit: mode === "login" ? "Invalid email or password" : "Failed to create account. Please try again.",
        })
      }
    } catch (error) {
      setErrors({
        submit: "Something went wrong. Please try again.",
      })
    }
  }

  const handleClose = () => {
    setFormData({ name: "", email: "", password: "", confirmPassword: "" })
    setErrors({})
    setShowPassword(false)
    setRememberMe(false)
    onClose()
  }

  const switchMode = () => {
    setMode(mode === "login" ? "signup" : "login")
    setErrors({})
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md p-0 gap-0">
        <div className="relative">
          {/* Close button */}
          <button onClick={handleClose} className="absolute right-4 top-4 z-10 text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>

          {/* Tab navigation */}
          <div className="flex border-b">
            <button
              onClick={() => setUserType("user")}
              className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 text-sm font-medium transition-colors ${
                userType === "user"
                  ? "text-emerald-600 border-b-2 border-emerald-600 bg-white"
                  : "text-gray-500 hover:text-gray-700 bg-gray-50"
              }`}
            >
              <User className="h-4 w-4" />
              User
            </button>
            <button
              onClick={() => setUserType("trainer")}
              className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 text-sm font-medium transition-colors ${
                userType === "trainer"
                  ? "text-emerald-600 border-b-2 border-emerald-600 bg-white"
                  : "text-gray-500 hover:text-gray-700 bg-gray-50"
              }`}
            >
              <GraduationCap className="h-4 w-4" />
              Trainer
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-emerald-600 mb-2">
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-gray-600">
              {mode === "login" ? `Sign in to your ${userType} account` : `Create your ${userType} account`}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`h-12 rounded-full border-gray-200 ${errors.name ? "border-red-500" : ""}`}
                />
                {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`h-12 rounded-full border-gray-200 ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`h-12 rounded-full border-gray-200 pr-12 ${errors.password ? "border-red-500" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
            </div>

            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={`h-12 rounded-full border-gray-200 ${errors.confirmPassword ? "border-red-500" : ""}`}
                />
                {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>
            )}

            {mode === "login" && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-600">
                    Remember me
                  </Label>
                </div>
                <button type="button" className="text-sm text-emerald-600 hover:text-emerald-700">
                  Forgot password?
                </button>
              </div>
            )}

            {errors.submit && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{errors.submit}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>{mode === "login" ? "Signing In..." : "Creating Account..."}</span>
                </div>
              ) : mode === "login" ? (
                `Sign In as ${userType === "user" ? "Practitioner" : "Trainer"}`
              ) : (
                `Create ${userType === "user" ? "Practitioner" : "Trainer"} Account`
              )}
            </Button>

            <div className="text-center pt-2">
              <p className="text-sm text-gray-600">
                {mode === "login" ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={switchMode}
                  className="ml-1 text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  {mode === "login" ? "Create one now" : "Sign In"}
                </button>
              </p>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
