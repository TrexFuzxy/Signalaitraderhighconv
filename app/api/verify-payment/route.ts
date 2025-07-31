import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("x-razorpay-signature")

    // Verify webhook signature (replace with your actual webhook secret)
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "your_webhook_secret"

    const expectedSignature = crypto.createHmac("sha256", webhookSecret).update(body).digest("hex")

    if (signature !== expectedSignature) {
      return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 400 })
    }

    const event = JSON.parse(body)

    // Handle different webhook events
    switch (event.event) {
      case "payment.captured":
        // Payment successful - grant access to user
        const paymentData = event.payload.payment.entity

        // In production, you would:
        // 1. Update user record in database
        // 2. Send confirmation email
        // 3. Log the transaction

        console.log("Payment captured:", paymentData)
        break

      case "payment.failed":
        // Payment failed - handle accordingly
        console.log("Payment failed:", event.payload.payment.entity)
        break

      default:
        console.log("Unhandled webhook event:", event.event)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ success: false, error: "Webhook processing failed" }, { status: 500 })
  }
}
