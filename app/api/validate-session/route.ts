import { type NextRequest, NextResponse } from "next/server"
import { verifySessionToken, checkRateLimit } from "@/lib/auth-security"

export async function POST(request: NextRequest) {
  try {
    const clientIP = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"

    // Rate limiting
    if (!checkRateLimit(`session_validate_${clientIP}`, 10, 60000)) {
      return NextResponse.json({ success: false, error: "Too many validation attempts" }, { status: 429 })
    }

    const { sessionToken } = await request.json()

    if (!sessionToken) {
      return NextResponse.json({ success: false, error: "No session token provided" }, { status: 400 })
    }

    const validation = verifySessionToken(sessionToken)

    if (!validation.valid) {
      return NextResponse.json({ success: false, error: "Invalid or expired session" }, { status: 401 })
    }

    // Additional security checks
    if (!validation.data.paymentVerified) {
      return NextResponse.json({ success: false, error: "Payment not verified" }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      userId: validation.data.userId,
      sessionValid: true,
    })
  } catch (error) {
    console.error("Session validation error:", error)
    return NextResponse.json({ success: false, error: "Session validation failed" }, { status: 500 })
  }
}
