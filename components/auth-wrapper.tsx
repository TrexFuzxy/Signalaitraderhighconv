"use client"

import type React from "react"

import { useState, useEffect } from "react"
import PaymentGateway from "./payment-gateway"

interface AuthWrapperProps {
  children: React.ReactNode
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const [hasAccess, setHasAccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user has paid (in production, this would check your backend/database)
    const checkPaymentStatus = () => {
      const paymentStatus = localStorage.getItem("gptchart_payment_status")
      const paymentExpiry = localStorage.getItem("gptchart_payment_expiry")

      if (paymentStatus === "completed") {
        // For lifetime access, we don't need to check expiry
        // But you could implement subscription logic here if needed
        setHasAccess(true)
      } else {
        setHasAccess(false)
      }
      setIsLoading(false)
    }

    checkPaymentStatus()
  }, [])

  const handlePaymentSuccess = () => {
    // Store payment status (in production, this would be handled by your backend)
    localStorage.setItem("gptchart_payment_status", "completed")
    localStorage.setItem("gptchart_payment_date", new Date().toISOString())
    localStorage.setItem("gptchart_user_email", "user@example.com") // Would come from payment form

    setHasAccess(true)

    // In production, you would also:
    // 1. Verify payment with Razorpay webhook
    // 2. Store user data in your database
    // 3. Send confirmation email
    // 4. Generate user session/JWT token
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading GPTChart Institutional™...</p>
        </div>
      </div>
    )
  }

  if (!hasAccess) {
    return <PaymentGateway onPaymentSuccess={handlePaymentSuccess} />
  }

  return <>{children}</>
}
