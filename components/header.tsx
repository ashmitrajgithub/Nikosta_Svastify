"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  Bell,
  Menu,
  X,
  User,
  Sparkles,
  BookOpen,
  Mail,
  Phone,
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
  Check,
  Calendar,
  Gift,
  MessageCircle,
  GraduationCap,
  Users2,
  Settings,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { AuthModal } from "@/components/auth-modal"

interface Notification {
  id: string
  title: string
  message: string
  type: "success" | "info" | "warning" | "class" | "promotion"
  timestamp: Date
  read: boolean
  icon?: React.ReactNode
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState<"user" | "trainer">("user") // Track user type
  const [isScrolled, setIsScrolled] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [headerHeight, setHeaderHeight] = useState(120)
  const headerRef = useRef<HTMLElement>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()

  // Optimized scroll handler with throttling and RAF
  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    scrollTimeoutRef.current = setTimeout(() => {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY
        const newIsScrolled = scrollY > 20
        const newHeight = scrollY > 100 ? 80 : 120 - scrollY * 0.4

        if (newIsScrolled !== isScrolled) {
          setIsScrolled(newIsScrolled)
        }

        if (Math.abs(newHeight - headerHeight) > 1) {
          setHeaderHeight(newHeight)
        }
      })
    }, 10) // Throttle to 10ms for smooth performance
  }, [isScrolled, headerHeight])

  useEffect(() => {
    // Use passive listeners for better performance
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [handleScroll])

  // Optimized click outside handler
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false)
    }
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside, { passive: true })
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden"
      document.body.style.touchAction = "none" // Prevent iOS bounce
    } else {
      document.body.style.overflow = "unset"
      document.body.style.touchAction = "auto"
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "unset"
      document.body.style.touchAction = "auto"
    }
  }, [isMenuOpen, handleClickOutside])

  // Initialize notifications with memoization
  const initializeNotifications = useCallback(() => {
    if (isLoggedIn && notifications.length === 0) {
      const initialNotifications: Notification[] = [
        {
          id: "1",
          title: userType === "trainer" ? "Welcome to Instructor Portal!" : "Welcome to Svasthify!",
          message:
            userType === "trainer"
              ? "Your instructor account has been successfully created. Start managing your classes."
              : "Your account has been successfully created. Start exploring our yoga classes.",
          type: "success",
          timestamp: new Date(),
          read: false,
          icon: <Check className="w-4 h-4" />,
        },
        {
          id: "2",
          title: userType === "trainer" ? "Class Schedule Updated" : "New Class Available",
          message:
            userType === "trainer"
              ? "Your Morning Vinyasa Flow class has been successfully scheduled."
              : "Morning Vinyasa Flow with Sarah is now available for booking.",
          type: "class",
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          read: false,
          icon: <Calendar className="w-4 h-4" />,
        },
        {
          id: "3",
          title: userType === "trainer" ? "Instructor Bonus" : "Special Offer",
          message:
            userType === "trainer"
              ? "You've earned a bonus for excellent student feedback this month!"
              : "Get 20% off on your first month premium membership!",
          type: "promotion",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          read: false,
          icon: <Gift className="w-4 h-4" />,
        },
      ]
      setNotifications(initialNotifications)
    }
  }, [isLoggedIn, notifications.length, userType])

  useEffect(() => {
    initializeNotifications()
  }, [initializeNotifications])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Programs", href: "/programs" },
    { name: "Trainers", href: "/trainers" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  const handleSignIn = useCallback(() => {
    setShowLoginModal(true)
    setIsMenuOpen(false)
  }, [])

  const handleSignOut = useCallback(() => {
    setIsLoggedIn(false)
    setUserType("user")
    setNotifications([])
  }, [])

  const handleAuthSuccess = useCallback((loginUserType: "user" | "trainer" = "user") => {
    setIsLoggedIn(true)
    setUserType(loginUserType)
    setShowNotification(true)

    const welcomeNotification: Notification = {
      id: Date.now().toString(),
      title: loginUserType === "trainer" ? "Welcome Back, Instructor!" : "Welcome Back!",
      message:
        loginUserType === "trainer"
          ? "You have successfully signed in to your instructor portal."
          : "You have successfully signed in to your account.",
      type: "success",
      timestamp: new Date(),
      read: false,
      icon: <Check className="w-4 h-4" />,
    }

    setNotifications((prev) => [welcomeNotification, ...prev])
    setTimeout(() => setShowNotification(false), 5000)
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === notificationId ? { ...notification, read: true } : notification)),
    )
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }, [])

  const getNotificationIcon = useCallback((type: string) => {
    switch (type) {
      case "success":
        return <Check className="w-4 h-4 text-green-600" />
      case "class":
        return <Calendar className="w-4 h-4 text-blue-600" />
      case "promotion":
        return <Gift className="w-4 h-4 text-purple-600" />
      case "info":
        return <MessageCircle className="w-4 h-4 text-gray-600" />
      default:
        return <Bell className="w-4 h-4 text-gray-600" />
    }
  }, [])

  const getNotificationBgColor = useCallback((type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200"
      case "class":
        return "bg-blue-50 border-blue-200"
      case "promotion":
        return "bg-purple-50 border-purple-200"
      case "info":
        return "bg-gray-50 border-gray-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }, [])

  const formatTimestamp = useCallback((timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }, [])

  // Optimized header styles
  const headerStyles = {
    height: `${headerHeight}px`,
    transform: `translateZ(0)`, // Force hardware acceleration
    willChange: isScrolled ? "transform" : "auto",
  }

  const headerClasses = `fixed top-0 w-full z-[999] transition-all duration-300 ease-out ${
    isScrolled ? "bg-white border-b border-emerald-200/50 shadow-lg" : "bg-white"
  }`

  return (
    <>
      {/* Success Notification Bar */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-[9999] text-white py-2 sm:py-3 px-3 sm:px-4 text-center font-medium shadow-lg ${
              userType === "trainer" ? "bg-purple-500" : "bg-green-500"
            }`}
            style={{ transform: "translateZ(0)" }}
          >
            <div className="flex items-center justify-center space-x-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm lg:text-base">
                {userType === "trainer"
                  ? "Welcome to Instructor Portal! You have successfully signed in."
                  : "Welcome! You have successfully signed in."}
              </span>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[998] bg-black/50 lg:hidden"
            style={{
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              transform: "translateZ(0)",
            }}
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <header ref={headerRef} style={headerStyles} className={headerClasses}>
        {/* Solid Background Layer - Always White */}
        <div className="absolute inset-0 bg-white" style={{ transform: "translateZ(0)" }} />

        {/* Content Layer */}
        <div className="relative z-10">
          {/* Top Info Bar */}
          <div
            className={`border-b ${userType === "trainer" ? "bg-purple-700 border-purple-600" : "bg-emerald-700 border-emerald-600"}`}
          >
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row items-center justify-between h-auto sm:h-10 md:h-12 py-2 sm:py-0 text-xs sm:text-sm">
                {/* Left: Contact Info */}
                <div
                  className={`flex flex-col xs:flex-row sm:flex-row items-center space-y-1 xs:space-y-0 xs:space-x-3 sm:space-x-4 md:space-x-6 mb-2 sm:mb-0 ${
                    userType === "trainer" ? "text-purple-100" : "text-emerald-100"
                  }`}
                >
                  <div className="flex items-center space-x-1.5 sm:space-x-2">
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="text-xs sm:text-sm truncate">
                      {userType === "trainer" ? "instructors@svasthify.com" : "info@svasthify.com"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5 sm:space-x-2">
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">+1 234 567 8910</span>
                  </div>
                  {userType === "trainer" && (
                    <div className="hidden md:flex items-center space-x-2">
                      <GraduationCap className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">Instructor Portal</span>
                    </div>
                  )}
                </div>

                {/* Right: Social Media Icons */}
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <Link
                    href="#"
                    className={`transition-colors duration-200 p-1 rounded hover:bg-white/10 ${
                      userType === "trainer" ? "text-purple-100 hover:text-white" : "text-emerald-100 hover:text-white"
                    }`}
                  >
                    <Twitter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Link>
                  <Link
                    href="#"
                    className={`transition-colors duration-200 p-1 rounded hover:bg-white/10 ${
                      userType === "trainer" ? "text-purple-100 hover:text-white" : "text-emerald-100 hover:text-white"
                    }`}
                  >
                    <Facebook className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Link>
                  <Link
                    href="#"
                    className={`transition-colors duration-200 p-1 rounded hover:bg-white/10 ${
                      userType === "trainer" ? "text-purple-100 hover:text-white" : "text-emerald-100 hover:text-white"
                    }`}
                  >
                    <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Link>
                  <Link
                    href="#"
                    className={`transition-colors duration-200 p-1 rounded hover:bg-white/10 ${
                      userType === "trainer" ? "text-purple-100 hover:text-white" : "text-emerald-100 hover:text-white"
                    }`}
                  >
                    <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Header */}
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 bg-white">
            <div className="flex items-center justify-between h-14 sm:h-16 md:h-18 lg:h-20 xl:h-24">
              {/* Svasthify Logo */}
              <Link href="/" className="flex items-center group flex-shrink-0">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 2xl:w-36 2xl:h-36">
                  <Image
                    src="https://svasthify.com/wp-content/uploads/2023/07/svasthify_logo.png"
                    alt="Svasthify Logo"
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-200"
                    priority
                    sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, (max-width: 1024px) 96px, (max-width: 1280px) 112px, (max-width: 1536px) 128px, 144px"
                  />
                </div>
              </Link>

              {/* Clean Navigation Links */}
              <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6 2xl:space-x-8">
                {navItems.map((item, index) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className={`font-medium transition-colors duration-200 relative group text-sm xl:text-base 2xl:text-lg px-2 py-1 ${
                        userType === "trainer"
                          ? "text-gray-800 hover:text-purple-600"
                          : "text-gray-800 hover:text-emerald-600"
                      }`}
                    >
                      {item.name}
                      <div
                        className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full ${
                          userType === "trainer" ? "bg-purple-600" : "bg-emerald-600"
                        }`}
                      />
                    </Link>
                  </div>
                ))}

                {/* Notification Bell - Only show when logged in */}
                {isLoggedIn && (
                  <div className="ml-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`relative rounded-full transition-all duration-200 w-9 h-9 xl:w-10 xl:h-10 ${
                            userType === "trainer" ? "hover:bg-purple-50" : "hover:bg-emerald-50"
                          }`}
                        >
                          <Bell className="h-4 w-4 xl:h-5 xl:w-5 text-gray-700" />
                          {unreadCount > 0 && (
                            <div className="absolute -top-1 -right-1 pointer-events-none">
                              <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs min-w-[18px] xl:min-w-[20px] h-4 xl:h-5 flex items-center justify-center rounded-full px-1">
                                {unreadCount > 9 ? "9+" : unreadCount}
                              </Badge>
                            </div>
                          )}
                          {unreadCount > 0 && (
                            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 xl:w-3 xl:h-3 bg-red-500 rounded-full opacity-75 pointer-events-none animate-pulse" />
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-80 xl:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 p-0 overflow-hidden max-h-96"
                        sideOffset={8}
                      >
                        {/* Header */}
                        <div
                          className={`px-4 py-3 border-b border-emerald-100 ${
                            userType === "trainer"
                              ? "bg-gradient-to-r from-purple-50 to-indigo-50"
                              : "bg-gradient-to-r from-emerald-50 to-green-50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900 text-sm xl:text-base">Notifications</h3>
                            {unreadCount > 0 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={markAllAsRead}
                                className={`text-xs xl:text-sm p-1 h-auto ${
                                  userType === "trainer"
                                    ? "text-purple-600 hover:text-purple-700"
                                    : "text-emerald-600 hover:text-emerald-700"
                                }`}
                              >
                                Mark all read
                              </Button>
                            )}
                          </div>
                          {unreadCount > 0 && (
                            <p className="text-xs xl:text-sm text-gray-600 mt-1">
                              You have {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
                            </p>
                          )}
                        </div>

                        {/* Notifications List */}
                        <div className="max-h-80 overflow-y-auto">
                          {notifications.length === 0 ? (
                            <div className="p-6 text-center text-gray-500">
                              <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                              <p className="text-sm">No notifications yet</p>
                            </div>
                          ) : (
                            notifications.map((notification) => (
                              <div
                                key={notification.id}
                                className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 cursor-pointer ${
                                  !notification.read ? "bg-blue-50/50" : ""
                                }`}
                                onClick={() => markAsRead(notification.id)}
                              >
                                <div className="flex items-start space-x-3">
                                  <div className={`p-2 rounded-lg ${getNotificationBgColor(notification.type)}`}>
                                    {getNotificationIcon(notification.type)}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                      <p
                                        className={`text-sm font-medium text-gray-900 ${!notification.read ? "font-semibold" : ""}`}
                                      >
                                        {notification.title}
                                      </p>
                                      {!notification.read && (
                                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                                      )}
                                    </div>
                                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{notification.message}</p>
                                    <p className="text-xs text-gray-400 mt-2">
                                      {formatTimestamp(notification.timestamp)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>

                        {/* Footer */}
                        {notifications.length > 0 && (
                          <div className="p-3 bg-gray-50 border-t border-gray-100">
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`w-full ${
                                userType === "trainer"
                                  ? "text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                                  : "text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                              }`}
                            >
                              View all notifications
                            </Button>
                          </div>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}

                {/* Login/Profile Section */}
                {!isLoggedIn ? (
                  <div className="ml-2">
                    <Button
                      variant="ghost"
                      className={`px-0 font-medium transition-colors duration-200 group text-sm xl:text-base 2xl:text-lg ${
                        userType === "trainer"
                          ? "text-gray-800 hover:text-purple-600"
                          : "text-gray-800 hover:text-emerald-600"
                      }`}
                      onClick={handleSignIn}
                    >
                      Log in →
                    </Button>
                  </div>
                ) : (
                  <div className="ml-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className={`px-2 font-medium transition-colors duration-200 group text-sm xl:text-base 2xl:text-lg ${
                            userType === "trainer"
                              ? "text-gray-800 hover:text-purple-600"
                              : "text-gray-800 hover:text-emerald-600"
                          }`}
                        >
                          {userType === "trainer" ? (
                            <GraduationCap className="w-4 h-4 xl:w-5 xl:h-5 mr-2" />
                          ) : (
                            <User className="w-4 h-4 xl:w-5 xl:h-5 mr-2" />
                          )}
                          <span className="hidden xl:inline">
                            {userType === "trainer" ? "Instructor Portal" : "My Profile"}
                          </span>
                          <span className="xl:hidden">{userType === "trainer" ? "Portal" : "Profile"}</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-64 xl:w-72 bg-white rounded-xl shadow-2xl border border-gray-200 p-0 overflow-hidden"
                        sideOffset={8}
                      >
                        {/* User info header */}
                        <div
                          className={`px-6 py-4 border-b border-emerald-100 ${
                            userType === "trainer"
                              ? "bg-gradient-to-r from-purple-50 to-indigo-50"
                              : "bg-gradient-to-r from-emerald-50 to-green-50"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${
                                userType === "trainer" ? "bg-purple-600" : "bg-emerald-600"
                              }`}
                            >
                              {userType === "trainer" ? (
                                <GraduationCap className="h-5 w-5" />
                              ) : (
                                <User className="h-5 w-5" />
                              )}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 text-sm xl:text-base">
                                {userType === "trainer" ? "Welcome Back, Instructor!" : "Welcome Back!"}
                              </p>
                              <p className="text-xs xl:text-sm text-gray-600">
                                {userType === "trainer" ? "Certified Instructor" : "Premium Member"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Menu items */}
                        <div className="p-2">
                          <DropdownMenuItem
                            asChild
                            className={`rounded-lg p-3 cursor-pointer transition-colors duration-150 ${
                              userType === "trainer" ? "hover:bg-purple-50" : "hover:bg-emerald-50"
                            }`}
                          >
                            <Link
                              href={userType === "trainer" ? "/instructor/dashboard" : "/dashboard"}
                              className="flex items-center space-x-3"
                            >
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                  userType === "trainer" ? "bg-purple-100" : "bg-emerald-100"
                                }`}
                              >
                                <Sparkles
                                  className={`w-4 h-4 ${
                                    userType === "trainer" ? "text-purple-600" : "text-emerald-600"
                                  }`}
                                />
                              </div>
                              <span className="text-sm xl:text-base">
                                {userType === "trainer" ? "Instructor Dashboard" : "Dashboard"}
                              </span>
                            </Link>
                          </DropdownMenuItem>

                          {userType === "trainer" ? (
                            <>
                              <DropdownMenuItem className="rounded-lg p-3 cursor-pointer hover:bg-purple-50 transition-colors duration-150">
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                                    <Users2 className="w-4 h-4 text-indigo-600" />
                                  </div>
                                  <span className="text-sm xl:text-base">My Classes</span>
                                </div>
                              </DropdownMenuItem>

                              <DropdownMenuItem className="rounded-lg p-3 cursor-pointer hover:bg-purple-50 transition-colors duration-150">
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <BarChart3 className="w-4 h-4 text-blue-600" />
                                  </div>
                                  <span className="text-sm xl:text-base">Analytics</span>
                                </div>
                              </DropdownMenuItem>

                              <DropdownMenuItem className="rounded-lg p-3 cursor-pointer hover:bg-purple-50 transition-colors duration-150">
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <Settings className="w-4 h-4 text-gray-600" />
                                  </div>
                                  <span className="text-sm xl:text-base">Settings</span>
                                </div>
                              </DropdownMenuItem>
                            </>
                          ) : (
                            <DropdownMenuItem className="rounded-lg p-3 cursor-pointer hover:bg-emerald-50 transition-colors duration-150">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                                  <BookOpen className="w-4 h-4 text-indigo-600" />
                                </div>
                                <span className="text-sm xl:text-base">My Classes</span>
                              </div>
                            </DropdownMenuItem>
                          )}

                          <DropdownMenuItem
                            className={`rounded-lg p-3 cursor-pointer transition-colors duration-150 ${
                              userType === "trainer" ? "hover:bg-purple-50" : "hover:bg-emerald-50"
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center relative">
                                <Bell className="w-4 h-4 text-purple-600" />
                                {unreadCount > 0 && (
                                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                                )}
                              </div>
                              <span className="text-sm xl:text-base">Notifications</span>
                              {unreadCount > 0 && (
                                <Badge className="bg-red-500 text-white text-xs ml-auto">{unreadCount}</Badge>
                              )}
                            </div>
                          </DropdownMenuItem>

                          <DropdownMenuSeparator className="my-2 bg-gray-200" />

                          <DropdownMenuItem
                            onClick={handleSignOut}
                            className="rounded-lg p-3 cursor-pointer hover:bg-red-50 transition-colors duration-150 text-red-600"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                                <X className="w-4 h-4 text-red-600" />
                              </div>
                              <span className="text-sm xl:text-base">Sign Out</span>
                            </div>
                          </DropdownMenuItem>
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </nav>

              {/* Mobile/Tablet Toggle */}
              <div className="lg:hidden flex items-center space-x-2">
                {/* Mobile/Tablet Notification Bell */}
                {isLoggedIn && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`relative w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl transition-all duration-200 ${
                          userType === "trainer" ? "hover:bg-purple-50" : "hover:bg-emerald-50"
                        }`}
                      >
                        <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
                        {unreadCount > 0 && (
                          <div className="absolute -top-1 -right-1 pointer-events-none">
                            <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs min-w-[16px] sm:min-w-[18px] h-3.5 sm:h-4 flex items-center justify-center rounded-full px-1">
                              {unreadCount > 9 ? "9+" : unreadCount}
                            </Badge>
                          </div>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 p-0 overflow-hidden max-h-96"
                      sideOffset={8}
                    >
                      {/* Same notification content as desktop */}
                      <div
                        className={`px-4 py-3 border-b border-emerald-100 ${
                          userType === "trainer"
                            ? "bg-gradient-to-r from-purple-50 to-indigo-50"
                            : "bg-gradient-to-r from-emerald-50 to-green-50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Notifications</h3>
                          {unreadCount > 0 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={markAllAsRead}
                              className={`text-xs sm:text-sm p-1 h-auto ${
                                userType === "trainer"
                                  ? "text-purple-600 hover:text-purple-700"
                                  : "text-emerald-600 hover:text-emerald-700"
                              }`}
                            >
                              Mark all read
                            </Button>
                          )}
                        </div>
                        {unreadCount > 0 && (
                          <p className="text-xs sm:text-sm text-gray-600 mt-1">
                            You have {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
                          </p>
                        )}
                      </div>

                      <div className="max-h-80 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-6 text-center text-gray-500">
                            <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No notifications yet</p>
                          </div>
                        ) : (
                          notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 cursor-pointer ${
                                !notification.read ? "bg-blue-50/50" : ""
                              }`}
                              onClick={() => markAsRead(notification.id)}
                            >
                              <div className="flex items-start space-x-3">
                                <div className={`p-2 rounded-lg ${getNotificationBgColor(notification.type)}`}>
                                  {getNotificationIcon(notification.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <p
                                      className={`text-sm font-medium text-gray-900 ${!notification.read ? "font-semibold" : ""}`}
                                    >
                                      {notification.title}
                                    </p>
                                    {!notification.read && (
                                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{notification.message}</p>
                                  <p className="text-xs text-gray-400 mt-2">
                                    {formatTimestamp(notification.timestamp)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      {notifications.length > 0 && (
                        <div className="p-3 bg-gray-50 border-t border-gray-100">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`w-full ${
                              userType === "trainer"
                                ? "text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                                : "text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                            }`}
                          >
                            View all notifications
                          </Button>
                        </div>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}

                <div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`relative w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl transition-all duration-200 text-gray-800 ${
                      userType === "trainer" ? "hover:bg-purple-50" : "hover:bg-emerald-50"
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {isMenuOpen ? (
                        <motion.div
                          key="close"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          <X className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="menu"
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Menu className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`lg:hidden absolute top-full left-0 right-0 z-[1000] bg-white shadow-2xl ${
                  userType === "trainer" ? "border-b border-purple-200/50" : "border-b border-emerald-200/50"
                }`}
                style={{ transform: "translateZ(0)" }}
              >
                <div className="max-w-7xl mx-auto">
                  <div className="py-4 sm:py-6 px-3 sm:px-4 md:px-6">
                    {/* Navigation items */}
                    <div className="flex flex-col space-y-1">
                      {navItems.map((item, index) => (
                        <div key={item.name}>
                          <Link
                            href={item.href}
                            className={`flex items-center space-x-3 px-4 py-3 sm:py-4 rounded-xl text-gray-800 font-medium transition-all duration-200 border border-transparent text-base sm:text-lg ${
                              userType === "trainer"
                                ? "hover:bg-purple-50 hover:border-purple-200"
                                : "hover:bg-emerald-50 hover:border-emerald-200"
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <span>{item.name}</span>
                          </Link>
                        </div>
                      ))}
                    </div>

                    {/* Mobile actions */}
                    <div className="mt-6 space-y-3 px-4">
                      {!isLoggedIn ? (
                        <div>
                          <Button
                            variant="outline"
                            className={`w-full py-3 sm:py-4 rounded-xl border-2 font-semibold text-base sm:text-lg bg-transparent transition-all duration-200 ${
                              userType === "trainer"
                                ? "border-purple-300 text-purple-700 hover:bg-purple-50"
                                : "border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                            }`}
                            onClick={handleSignIn}
                          >
                            Log in →
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Link
                            href={userType === "trainer" ? "/instructor/dashboard" : "/dashboard"}
                            className={`flex items-center space-x-3 px-4 py-3 sm:py-4 rounded-xl text-gray-800 font-medium transition-all duration-200 border border-transparent text-base sm:text-lg ${
                              userType === "trainer"
                                ? "hover:bg-purple-50 hover:border-purple-200"
                                : "hover:bg-emerald-50 hover:border-emerald-200"
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {userType === "trainer" ? (
                              <GraduationCap
                                className={`w-5 h-5 sm:w-6 sm:h-6 ${userType === "trainer" ? "text-purple-600" : "text-emerald-600"}`}
                              />
                            ) : (
                              <Sparkles
                                className={`w-5 h-5 sm:w-6 sm:h-6 ${userType === "trainer" ? "text-purple-600" : "text-emerald-600"}`}
                              />
                            )}
                            <span>{userType === "trainer" ? "Instructor Dashboard" : "Dashboard"}</span>
                          </Link>
                          <button
                            onClick={() => {
                              handleSignOut()
                              setIsMenuOpen(false)
                            }}
                            className="flex items-center space-x-3 px-4 py-3 sm:py-4 rounded-xl hover:bg-red-50 text-red-600 font-medium transition-all duration-200 border border-transparent hover:border-red-200 w-full text-left text-base sm:text-lg"
                          >
                            <X className="w-5 h-5 sm:w-6 sm:h-6" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onSuccess={handleAuthSuccess} />
    </>
  )
}
