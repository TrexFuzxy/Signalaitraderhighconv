"use client"

import { useState } from "react"
import { CreditCard, Shield, Globe, Zap, Check, Star } from "lucide-react"
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

interface PaymentGatewayProps {
  onPaymentSuccess: () => void
}

export default function PaymentGateway({ onPaymentSuccess }: PaymentGatewayProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")

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
      alert("Please fill in all required fields")
      return
    }

    setIsProcessing(true)

    const res = await loadRazorpayScript()
    if (!res) {
      alert("Razorpay SDK failed to load. Please check your internet connection.")
      setIsProcessing(false)
      return
    }

    // Create order on backend (in production, this would be an API call)
    const orderData = {
      amount: 3000, // $30 in cents (Razorpay uses smallest currency unit)
      currency: "USD",
      receipt: `receipt_${Date.now()}`,
    }

    const options = {
      key: "rzp_test_9999999999", // Replace with your Razorpay Test Key ID
      amount: orderData.amount,
      currency: orderData.currency,
      name: "GPTChart Institutional™",
      description: "Lifetime Access to AI Trading Platform",
      image: "/logo.png", // Your logo URL
      handler: (response: any) => {
        // Payment successful
        console.log("Payment successful:", response)
        setIsProcessing(false)
        onPaymentSuccess()
      },
      prefill: {
        name: name,
        email: email,
        contact: "", // Optional phone number
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
    "Volume Profile Analysis",
    "Support & Resistance Detection",
  ]

  const testimonials = [
    {
      name: "Alex Chen",
      role: "Prop Trader",
      comment: "Increased my win rate from 60% to 78% in just 2 months!",
      rating: 5,
    },
    {
      name: "Sarah Williams",
      role: "Hedge Fund Manager",
      comment: "The ML predictions are incredibly accurate. Best $30 I've spent.",
      rating: 5,
    },
    {
      name: "Mike Rodriguez",
      role: "Day Trader",
      comment: "Smart Money Concepts analysis is game-changing for my strategy.",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Features & Testimonials */}
        <div className="space-y-8">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-4">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-4 py-2 rounded-full border border-blue-500/30">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-yellow-300">Premium Access</span>
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-4">
              GPTChart Institutional™
            </h1>
            <p className="text-xl text-slate-300 mb-6">
              Elite AI-powered trading analysis platform used by professional traders worldwide
            </p>
            <div className="flex items-center justify-center lg:justify-start space-x-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">10,000+</div>
                <div className="text-sm text-slate-400">Active Traders</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">78%</div>
                <div className="text-sm text-slate-400">Avg Win Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">24/7</div>
                <div className="text-sm text-slate-400">AI Analysis</div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">What You Get</CardTitle>
              <CardDescription>Complete access to all premium features</CardDescription>
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

          {/* Testimonials */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">What Traders Say</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-slate-700/30 p-4 rounded-lg">
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-slate-300 text-sm mb-2">"{testimonial.comment}"</p>
                    <div className="text-xs text-slate-400">
                      <span className="font-medium">{testimonial.name}</span> - {testimonial.role}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Payment Form */}
        <div className="flex items-center justify-center">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm w-full max-w-md">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-white text-2xl">Get Lifetime Access</CardTitle>
              <CardDescription>One-time payment, unlimited access forever</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Pricing */}
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">$30</div>
                <div className="text-slate-400 text-sm">One-time payment • Lifetime access</div>
                <Badge className="mt-2 bg-green-500/20 text-green-400 border-green-500/30">Limited Time Offer</Badge>
              </div>

              {/* Payment Benefits */}
              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 p-4 rounded-lg border border-green-500/20">
                <div className="flex items-center space-x-2 mb-3">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-semibold">Secure Payment</span>
                </div>
                <div className="space-y-2 text-sm text-slate-300">
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-blue-400" />
                    <span>Accepted worldwide</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span>Instant access after payment</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span>256-bit SSL encryption</span>
                  </div>
                </div>
              </div>

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
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Pay $30 & Get Access
                  </>
                )}
              </Button>

              {/* Payment Methods */}
              <div className="text-center">
                <p className="text-slate-400 text-xs mb-3">Secure payment powered by Razorpay</p>
                <div className="flex justify-center space-x-4 opacity-60">
                  <div className="text-xs text-slate-500">VISA</div>
                  <div className="text-xs text-slate-500">MASTERCARD</div>
                  <div className="text-xs text-slate-500">AMEX</div>
                  <div className="text-xs text-slate-500">UPI</div>
                  <div className="text-xs text-slate-500">NETBANKING</div>
                </div>
              </div>

              {/* Money Back Guarantee */}
              <div className="text-center p-3 bg-blue-900/20 border border-blue-500/20 rounded-lg">
                <p className="text-blue-400 text-sm font-semibold mb-1">30-Day Money Back Guarantee</p>
                <p className="text-slate-400 text-xs">Not satisfied? Get a full refund within 30 days.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
