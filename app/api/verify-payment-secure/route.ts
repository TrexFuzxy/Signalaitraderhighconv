import { type NextRequest, NextResponse } from "next/server"
import { validateRazorpaySignature, generateSessionToken, checkRateLimit } from "@/lib/auth-security"
import crypto from "crypto"

// In production, use a proper database
const paymentDatabase = new Map<
  string,
  {
    userId: string
    paymentId: string
    orderId: string
    amount: number
    status: "pending" | "verified" | "failed"
    timestamp: number
    ipAddress: string
    userAgent: string
  }
>()

export async function POST(request: NextRequest) {
  try {
    const clientIP = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    const userAgent = request.headers.get("user-agent") || "unknown"

    // Rate limiting
    if (!checkRateLimit(`payment_verify_${clientIP}`, 3, 60000)) {
      return NextResponse.json(
        { success: false, error: "Too many verification attempts. Please try again later." },
        { status: 429 },
      )
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, user_email, user_name } = await request.json()

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !user_email) {
      return NextResponse.json({ success: false, error: "Missing required payment data" }, { status: 400 })
    }

    // Validate Razorpay signature
    if (!validateRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)) {
      // Log suspicious activity
      console.warn(`Invalid payment signature attempt from IP: ${clientIP}`, {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        userAgent,
        timestamp: new Date().toISOString(),
      })

      return NextResponse.json({ success: false, error: "Payment verification failed" }, { status: 400 })
    }

    // Double-check with Razorpay API (in production)
    // const razorpay = new Razorpay({
    //   key_id: process.env.RAZORPAY_KEY_ID!,
    //   key_secret: process.env.RAZORPAY_KEY_SECRET!,
    // })

    // const payment = await razorpay.payments.fetch(razorpay_payment_id)
    // if (payment.status !== 'captured' || payment.amount !== 3000) {
    //   return NextResponse.json(
    //     { success: false, error: "Payment not valid" },
    //     { status: 400 }
    //   )
    // }

    // Generate unique user ID
    const userId = crypto.createHash("sha256").update(`${user_email}:${Date.now()}`).digest("hex")

    // Store payment record
    paymentDatabase.set(razorpay_payment_id, {
      userId,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      amount: 3000,
      status: "verified",
      timestamp: Date.now(),
      ipAddress: clientIP,
      userAgent,
    })

    // Generate secure session token
    const sessionToken = generateSessionToken(userId, true)

    // In production, also:
    // 1. Store user in database
    // 2. Send confirmation email
    // 3. Log successful payment
    // 4. Set up user account

    return NextResponse.json({
      success: true,
      sessionToken,
      userId,
      message: "Payment verified successfully",
    })
  } catch (error) {
    console.error("Payment verification error:", error)
    return NextResponse.json({ success: false, error: "Payment verification failed" }, { status: 500 })
  }
}
