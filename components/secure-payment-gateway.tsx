"use client"

import { useState } from "react"
import { CreditCard, Shield, Check, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

declare global {
  interface Window {
    Razorpay: any
  }
}

interface SecurePaymentGatewayProps {
  onPaymentSuccess: (paymentData: any) => void
}

export default function SecurePaymentGateway({ onPaymentSuccess }: SecurePaymentGatewayProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handlePayment = async () => {
    if (!name || !email) {
      setError("Please fill in all required fields")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsProcessing(true)
    setError("")

    try {
      const res = await loadRazorpayScript()
      if (!res) {
        throw new Error("Payment gateway failed to load")
      }

      // Create order with server
      const orderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 3000, // $30 in cents
          currency: "USD",
        }),
      })

      if (!orderResponse.ok) {
        throw new Error("Failed to create payment order")
      }

      const orderData = await orderResponse.json()

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_9999999999",
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "GPTChart Institutional™",
        description: "Lifetime Access to AI Trading Platform",
        order_id: orderData.order.id,
        handler: async (response: any) => {
          try {
            // Verify payment on server
            await onPaymentSuccess({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              user_email: email,
              user_name: name,
            })
          } catch (error) {
            console.error("Payment verification failed:", error)
            setError("Payment verification failed. Please contact support.")
          }
        },
        prefill: {
          name: name,
          email: email,
        },
        notes: {
          address: "GPTChart Institutional HQ",
        },
        theme: {
          color: "#3B82F6",
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false)
          },
        },
      }

      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
    } catch (error) {
      console.error("Payment error:", error)
      setError("Payment failed. Please try again.")
      setIsProcessing(false)
    }
  }

  const features = [
    "Unlimited AI Chart Analysis",
    "LSTM + XGBoost ML Predictions",
    "Smart Money Concepts Analysis",
    "Real-time Market Sentiment",
    "Advanced Backtesting Engine",
    "Multi-timeframe Confluence",
    "Risk Management Tools",
    "Live Trading Signals",
    "News Impact Analysis",
    "Pattern Recognition AI",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Features */}
        <div className="space-y-8">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-4">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-4 py-2 rounded-full border border-blue-500/30">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-300">Secure Payment</span>
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-4">
              GPTChart Institutional™
            </h1>
            <p className="text-xl text-slate-300 mb-6">
              Elite AI-powered trading analysis platform with bank-level security
            </p>
          </div>

          {/* Security Features */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Security Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-slate-300 text-sm">256-bit SSL Encryption</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-slate-300 text-sm">PCI DSS Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-slate-300 text-sm">Anti-Fraud Protection</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-slate-300 text-sm">Secure Session Management</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Premium Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Secure Payment Form */}
        <div className="flex items-center justify-center">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm w-full max-w-md">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-white text-2xl">Secure Payment</CardTitle>
              <CardDescription>One-time payment, lifetime access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Pricing */}
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">$30</div>
                <div className="text-slate-400 text-sm">One-time payment • Lifetime access</div>
                <Badge className="mt-2 bg-green-500/20 text-green-400 border-green-500/30">Secure & Encrypted</Badge>
              </div>

              {/* Error Display */}
              {error && (
                <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                </div>
              )}

              {/* User Details Form */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-slate-300">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="bg-slate-700/50 border-slate-600 text-white mt-1"
                    required
                    disabled={isProcessing}
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-slate-300">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="bg-slate-700/50 border-slate-600 text-white mt-1"
                    required
                    disabled={isProcessing}
                  />
                </div>
              </div>

              {/* Payment Button */}
              <Button
                onClick={handlePayment}
                disabled={isProcessing || !name || !email}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 text-lg"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing Secure Payment...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5 mr-2" />
                    Pay $30 Securely
                  </>
                )}
              </Button>

              {/* Security Badges */}
              <div className="text-center">
                <p className="text-slate-400 text-xs mb-3">Protected by enterprise-grade security</p>
                <div className="flex justify-center space-x-4 opacity-60">
                  <div className="text-xs text-slate-500">SSL</div>
                  <div className="text-xs text-slate-500">PCI DSS</div>
                  <div className="text-xs text-slate-500">ENCRYPTED</div>
                </div>
              </div>

              {/* Money Back Guarantee */}
              <div className="text-center p-3 bg-blue-900/20 border border-blue-500/20 rounded-lg">
                <p className="text-blue-400 text-sm font-semibold mb-1">30-Day Money Back Guarantee</p>
                <p className="text-slate-400 text-xs">Secure payment with full refund protection</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
