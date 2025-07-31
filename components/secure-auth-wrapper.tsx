"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import PremiumPaymentGateway from "./premium-payment-gateway"
import { Shield, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SecureAuthWrapperProps {
  children: React.ReactNode
}

export default function SecureAuthWrapper({ children }: SecureAuthWrapperProps) {
  const [hasAccess, setHasAccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [sessionToken, setSessionToken] = useState<string | null>(null)
  const [securityViolation, setSecurityViolation] = useState(false)
  const [lastValidation, setLastValidation] = useState(0)

  // Anti-tampering: Check for developer tools (disabled in development)
  const detectDevTools = useCallback(() => {
    if (process.env.NODE_ENV === 'production') {
      const threshold = 160
      const devtools = {
        open: false,
        orientation: null as string | null,
      }

      const widthThreshold = window.outerWidth - window.innerWidth > threshold
      const heightThreshold = window.outerHeight - window.innerHeight > threshold

      if (widthThreshold || heightThreshold) {
        devtools.open = true
        devtools.orientation = widthThreshold ? "vertical" : "horizontal"
      }

      if (devtools.open) {
        setSecurityViolation(true)
        localStorage.removeItem("gptchart_session_token")
        console.clear()
        console.warn("Security violation detected. Access revoked.")
      }
    }
  }, [])

  // Anti-tampering: Detect localStorage manipulation
  const validateLocalStorage = useCallback(() => {
    const token = localStorage.getItem("gptchart_session_token")
    if (!token) return false

    try {
      const parts = token.split(":")
      if (parts.length < 2) {
        throw new Error("Invalid token format")
      }
      return true
    } catch {
      localStorage.removeItem("gptchart_session_token")
      setSecurityViolation(true)
      return false
    }
  }, [])

  // Server-side session validation
  const validateSession = useCallback(async (token: string) => {
    // In development, trust the local token
    if (process.env.NODE_ENV !== 'production') {
      return true;
    }

    try {
      const response = await fetch("/api/validate-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionToken: token }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Session validation failed")
      }

      return data.sessionValid
    } catch (error) {
      console.error("Session validation error:", error)
      return false
    }
  }, [])

  // Periodic session validation
  useEffect(() => {
    const validatePeriodically = async () => {
      const token = localStorage.getItem("gptchart_session_token")
      if (!token) {
        setHasAccess(false)
        return
      }

      const now = Date.now()
      if (now - lastValidation > 5 * 60 * 1000) {
        const isValid = await validateSession(token)
        if (!isValid) {
          localStorage.removeItem("gptchart_session_token")
          setHasAccess(false)
          setSecurityViolation(true)
        }
        setLastValidation(now)
      }
    }

    const interval = setInterval(validatePeriodically, 60000)
    return () => clearInterval(interval)
  }, [validateSession, lastValidation])

  // Initial authentication check
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        if (!validateLocalStorage()) {
          setHasAccess(false)
          setIsLoading(false)
          return
        }

        const token = localStorage.getItem("gptchart_session_token")
        if (!token) {
          setHasAccess(false)
          setIsLoading(false)
          return
        }

        const isValid = await validateSession(token)
        if (isValid) {
          setSessionToken(token)
          setHasAccess(true)
          setLastValidation(Date.now())
        } else {
          localStorage.removeItem("gptchart_session_token")
          setHasAccess(false)
        }
      } catch (error) {
        console.error("Authentication check failed:", error)
        setHasAccess(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthentication()
  }, [validateSession, validateLocalStorage])

  // Anti-tampering: Monitor for developer tools
  useEffect(() => {
    const interval = setInterval(detectDevTools, 1000)
    return () => clearInterval(interval)
  }, [detectDevTools])

  // Anti-tampering: Disable right-click and common shortcuts
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) ||
        (e.ctrlKey && e.key === "U")
      ) {
        e.preventDefault()
        setSecurityViolation(true)
        return false
      }
    }

    document.addEventListener("contextmenu", handleContextMenu)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  // Handle successful payment
  const handlePaymentSuccess = async (paymentData: any) => {
    try {
      const response = await fetch("/api/verify-payment-secure", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Payment verification failed")
      }

      localStorage.setItem("gptchart_session_token", data.sessionToken)
      setSessionToken(data.sessionToken)
      setHasAccess(true)
      setLastValidation(Date.now())
    } catch (error) {
      console.error("Payment verification failed:", error)
      alert("Payment verification failed. Please contact support.")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Verifying premium access...</p>
          <p className="text-slate-400 text-sm mt-2">Performing security checks</p>
        </div>
      </div>
    )
  }

  if (securityViolation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-slate-900 to-red-900 flex items-center justify-center p-4">
        <Card className="max-w-md bg-slate-800 border-red-500/50">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            <CardTitle className="text-red-400">Security Violation Detected</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-slate-300 mb-4">
              Unauthorized access attempt detected. Your session has been terminated for security reasons.
            </p>
            <p className="text-slate-400 text-sm">If you believe this is an error, please contact support.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!hasAccess) {
    return <PremiumPaymentGateway onPaymentSuccess={handlePaymentSuccess} />
  }

  return (
    <div>
      {/* Security indicator */}
      <div className="fixed top-4 right-4 z-50">
        <div className="flex items-center space-x-2 bg-green-500/20 px-3 py-1 rounded-full border border-green-500/30">
          <Shield className="w-4 h-4 text-green-400" />
          <span className="text-green-400 text-xs font-medium">Premium Access</span>
        </div>
      </div>
      {children}
    </div>
  )
}
