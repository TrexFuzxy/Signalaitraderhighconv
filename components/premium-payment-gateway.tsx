"use client"

import { useState, useEffect } from "react"
import {
  CreditCard,
  Shield,
  Star,
  Users,
  TrendingUp,
  Award,
  Clock,
  Globe,
  Zap,
  Target,
  Brain,
  BarChart3,
  ChevronRight,
  Play,
  Lock,
  Verified,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

declare global {
  interface Window {
    PaystackPop: any
  }
}

interface PremiumPaymentGatewayProps {
  onPaymentSuccess: (paymentData: any) => void
}

interface PaymentResponse {
  success: boolean
  message?: string
  data?: any
}

export default function PremiumPaymentGateway({ onPaymentSuccess }: PremiumPaymentGatewayProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [timeLeft, setTimeLeft] = useState(3600) // 1 hour countdown
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev: number) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev: number) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const testimonials = [
    {
      name: "Marcus Chen",
      role: "Senior Prop Trader at Apex Capital",
      avatar: "MC",
      comment:
        "This AI literally changed my trading career. Went from 58% to 84% win rate in 3 months. The Smart Money Concepts analysis is absolutely incredible.",
      profit: "+$127,000",
      verified: true,
    },
    {
      name: "Sarah Williams",
      role: "Hedge Fund Portfolio Manager",
      avatar: "SW",
      comment:
        "I manage $50M+ and this is the ONLY tool I trust for institutional-grade analysis. The ML predictions are scary accurate. Worth every penny.",
      profit: "+$2.1M",
      verified: true,
    },
    {
      name: "David Rodriguez",
      role: "Professional Day Trader",
      avatar: "DR",
      comment:
        "Made back the $30 in my first trade! The backtesting engine saved me from countless bad trades. This is pure gold for serious traders.",
      profit: "+$89,500",
      verified: true,
    },
    {
      name: "Jennifer Kim",
      role: "Forex Trading Coach",
      avatar: "JK",
      comment:
        "I teach 500+ students and recommend this to ALL of them. The risk management tools alone are worth 10x the price. Absolute game-changer!",
      profit: "+$156,000",
      verified: true,
    },
  ]

  const stats = [
    { label: "Active Traders", value: "47,892", icon: Users },
    { label: "Average Win Rate", value: "78.4%", icon: Target },
    { label: "Total Profits Generated", value: "$127M+", icon: TrendingUp },
    { label: "Countries Served", value: "156", icon: Globe },
  ]

  const features = [
    {
      icon: Brain,
      title: "LSTM Neural Networks",
      description: "Advanced deep learning models trained on 10+ years of market data",
      premium: true,
    },
    {
      icon: Target,
      title: "Smart Money Concepts",
      description: "Institutional order blocks, FVG detection, and liquidity analysis",
      premium: true,
    },
    {
      icon: BarChart3,
      title: "Multi-Timeframe Analysis",
      description: "Confluence across 1m, 5m, 15m, 1H, 4H, and Daily timeframes",
      premium: true,
    },
    {
      icon: Zap,
      title: "Real-Time Signals",
      description: "Live trading alerts with 89.2% accuracy rate",
      premium: true,
    },
    {
      icon: Shield,
      title: "Advanced Risk Management",
      description: "Position sizing, R:R optimization, and drawdown protection",
      premium: true,
    },
    {
      icon: Award,
      title: "Backtesting Engine",
      description: "Test strategies on historical data with detailed performance metrics",
      premium: true,
    },
  ]

  const pricingComparison = [
    {
      service: "TradingView Pro",
      price: "$14.95/month",
      annual: "$179",
      features: ["Basic charts", "Indicators", "Alerts"],
    },
    {
      service: "Bloomberg Terminal",
      price: "$2,000/month",
      annual: "$24,000",
      features: ["Market data", "News", "Analytics"],
    },
    {
      service: "MetaTrader Signals",
      price: "$30-100/month",
      annual: "$360-1200",
      features: ["Basic signals", "Copy trading"],
    },
    {
      service: "GPTChart Institutional",
      price: "One-time $30",
      annual: "$30",
      features: ["Everything above + AI", "Lifetime access", "No subscriptions"],
    },
  ]

  // Load Paystack script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://js.paystack.co/v1/inline.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const verifyPayment = async (reference: string) => {
    try {
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reference }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Store the session token in localStorage
        const token = `paystack_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('gptchart_session_token', token);
        
        // Call the success callback
        onPaymentSuccess({
          reference,
          email,
          name,
          status: 'success',
          token
        });
        
        // Force a page refresh to update the auth state
        window.location.href = '/';
      } else {
        setError('Payment verification failed. Please contact support.');
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      setError('An error occurred while verifying your payment. Please check your internet connection and try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const verifyPayment = async (reference: string): Promise<void> => {
    try {
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reference }),
      });

      const data: PaymentResponse = await response.json();
      
      if (data.success) {
        // Store the session token in localStorage
        const token = `paystack_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('gptchart_session_token', token);
        
        // Call the success callback
        onPaymentSuccess({
          reference,
          email,
          name,
          status: 'success',
          token
        });
        
        // Force a page refresh to update the auth state
        window.location.href = '/';
      } else {
        setError(data.message || 'Payment verification failed. Please contact support.');
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      setError('An error occurred while verifying your payment. Please check your internet connection and try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayment = async (): Promise<void> => {
    if (!name || !email) {
      setError("Please fill in all required fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!window.PaystackPop) {
      setError("Payment system is still loading. Please try again in a moment.");
      return;
    }

    setIsProcessing(true);
    setError("");

    try {
      // Create a payment reference
      const paymentReference = `SIGNAL_${Date.now()}`;

      // Initialize Paystack payment
      const handler = window.PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_test_your_paystack_public_key',
        email: email,
        amount: 300000, // NGN 3,000 in kobo (smallest currency unit)
        currency: 'NGN',
        ref: paymentReference,
        firstname: name.split(' ')[0],
        lastname: name.split(' ').slice(1).join(' '),
        metadata: {
          custom_fields: [
            {
              display_name: "Product Name",
              variable_name: "product_name",
              value: "SignalAI Trading Platform"
            }
          ]
        },
        callback: (response: any) => {
          // Verify payment on your backend
          verifyPayment(response.reference);
        },
        onClose: () => {
          setIsProcessing(false);
        }
      });

      handler.openIframe();
    } catch (error) {
      console.error("Payment error:", error);
      setError("An error occurred while processing your payment. Please try again.");
      setIsProcessing(false);
    }
  }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl"></div>
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            {/* Limited Time Offer Banner */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 px-6 py-3 rounded-full border border-red-500/30 mb-6">
              <Clock className="w-4 h-4 text-red-400" />
              <span className="text-red-300 font-semibold">LIMITED TIME: {formatTime(timeLeft)} remaining</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-6">
              GPTChart Institutional™
            </h1>
            <p className="text-2xl text-slate-300 mb-4 max-w-4xl mx-auto">
              The World's Most Advanced AI Trading Platform
            </p>
            <p className="text-lg text-slate-400 mb-8 max-w-3xl mx-auto">
              Used by hedge funds, prop traders, and institutions managing over{" "}
              <span className="text-green-400 font-bold">$2.7 billion</span> in assets
            </p>

            {/* Social Proof Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, index) => (
                <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Urgency Message */}
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 font-semibold">FLASH SALE ENDING SOON</span>
              </div>
              <p className="text-white text-lg mb-2">
                <span className="line-through text-slate-500">$497/month</span> →{" "}
                <span className="text-green-400 font-bold text-2xl">$30 ONE-TIME</span>
              </p>
              <p className="text-slate-300">Limited time offer expires in {formatTime(timeLeft)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Features & Testimonials */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Demo Section */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm overflow-hidden">
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-white/30 transition-all">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                    <p className="text-white font-semibold">Watch Live Trading Demo</p>
                    <p className="text-slate-300 text-sm">See how traders make $1000+ daily</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-red-500 text-white">🔴 LIVE</Badge>
                </div>
              </div>
            </Card>

            {/* Premium Features */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-2xl flex items-center">
                  <Award className="w-6 h-6 mr-3 text-yellow-400" />
                  Institutional-Grade Features
                </CardTitle>
                <CardDescription>Everything you need to trade like a hedge fund</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex-shrink-0">
                        <feature.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="text-white font-semibold">{feature.title}</h4>
                          {feature.premium && <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">PRO</Badge>}
                        </div>
                        <p className="text-slate-400 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Rotating Testimonials */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-2xl flex items-center">
                  <Star className="w-6 h-6 mr-3 text-yellow-400" />
                  What Professional Traders Say
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative h-48">
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-500 ${
                        index === currentTestimonial
                          ? "opacity-100 transform translate-x-0"
                          : "opacity-0 transform translate-x-full"
                      }`}
                    >
                      <div className="bg-slate-700/30 rounded-lg p-6 h-full">
                        <div className="flex items-start space-x-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{testimonial.avatar}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="text-white font-semibold">{testimonial.name}</h4>
                              {testimonial.verified && <Verified className="w-4 h-4 text-blue-400" />}
                            </div>
                            <p className="text-slate-400 text-sm">{testimonial.role}</p>
                            <div className="flex items-center space-x-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-green-400 font-bold">{testimonial.profit}</div>
                            <div className="text-slate-500 text-xs">Profit</div>
                          </div>
                        </div>
                        <p className="text-slate-300 italic">"{testimonial.comment}"</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center space-x-2 mt-4">
                  {testimonials.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentTestimonial ? "bg-blue-400" : "bg-slate-600"
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Price Comparison */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Compare The Competition</CardTitle>
                <CardDescription>See why GPTChart Institutional is the obvious choice</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pricingComparison.map((item, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        item.service === "GPTChart Institutional"
                          ? "bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/30"
                          : "bg-slate-700/30 border-slate-600"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4
                          className={`font-semibold ${
                            item.service === "GPTChart Institutional" ? "text-green-400" : "text-white"
                          }`}
                        >
                          {item.service}
                          {item.service === "GPTChart Institutional" && (
                            <Badge className="ml-2 bg-green-500/20 text-green-400">BEST VALUE</Badge>
                          )}
                        </h4>
                        <div className="text-right">
                          <div
                            className={`font-bold ${
                              item.service === "GPTChart Institutional" ? "text-green-400" : "text-white"
                            }`}
                          >
                            {item.price}
                          </div>
                          <div className="text-slate-400 text-sm">Annual: {item.annual}</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.features.map((feature, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Payment Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-white text-2xl">Get Instant Access</CardTitle>
                  <CardDescription>Join 47,892+ professional traders</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Pricing Display */}
                  <div className="text-center bg-gradient-to-r from-green-500/10 to-blue-500/10 p-6 rounded-lg border border-green-500/20">
                    <div className="text-slate-400 text-sm mb-2">
                      Regular Price: <span className="line-through">$497/month</span>
                    </div>
                    <div className="text-4xl font-bold text-white mb-2">$30</div>
                    <div className="text-green-400 font-semibold mb-2">ONE-TIME PAYMENT</div>
                    <div className="text-slate-300 text-sm">Lifetime access • No subscriptions</div>
                    <Badge className="mt-2 bg-red-500/20 text-red-400 border-red-500/30">
                      🔥 98% OFF - Limited Time
                    </Badge>
                  </div>

                  {/* Countdown Timer */}
                  <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4 text-center">
                    <div className="text-red-400 font-semibold mb-2">⏰ Offer Expires In:</div>
                    <div className="text-2xl font-mono text-white">{formatTime(timeLeft)}</div>
                  </div>

                  {/* Error Display */}
                  {error && (
                    <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-3">
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  )}

                  {/* Form */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-slate-300 flex items-center">
                        <Lock className="w-4 h-4 mr-2" />
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
                      <Label htmlFor="email" className="text-slate-300 flex items-center">
                        <Lock className="w-4 h-4 mr-2" />
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
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-4 text-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <Shield className="w-5 h-5 mr-2" />
                        Get Instant Access - $30
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>

                  {/* Trust Indicators */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-4 text-xs text-slate-400">
                      <div className="flex items-center space-x-1">
                        <Shield className="w-3 h-3" />
                        <span>SSL Secured</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Lock className="w-3 h-3" />
                        <span>256-bit Encryption</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Verified className="w-3 h-3" />
                        <span>PCI Compliant</span>
                      </div>
                    </div>

                    <div className="text-center p-3 bg-blue-900/20 border border-blue-500/20 rounded-lg">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Shield className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-400 font-semibold">30-Day Money Back Guarantee</span>
                      </div>
                      <p className="text-slate-400 text-xs">Not satisfied? Get a full refund, no questions asked.</p>
                    </div>

                    <div className="text-center">
                      <p className="text-slate-400 text-xs mb-2">Instant access after payment</p>
                      <div className="flex justify-center space-x-3 opacity-60">
                        <span className="text-xs text-slate-500">VISA</span>
                        <span className="text-xs text-slate-500">MASTERCARD</span>
                        <span className="text-xs text-slate-500">AMEX</span>
                        <span className="text-xs text-slate-500">PAYPAL</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
