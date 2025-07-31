import { type NextRequest, NextResponse } from "next/server"

// In production, install: npm install razorpay
// const Razorpay = require('razorpay')

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = "USD" } = await request.json()

    // Initialize Razorpay (replace with your actual keys)
    // const razorpay = new Razorpay({
    //   key_id: process.env.RAZORPAY_KEY_ID,
    //   key_secret: process.env.RAZORPAY_KEY_SECRET,
    // })

    // Create order
    // const order = await razorpay.orders.create({
    //   amount: amount, // amount in smallest currency unit
    //   currency: currency,
    //   receipt: `receipt_${Date.now()}`,
    //   payment_capture: 1,
    // })

    // For demo purposes, return mock order
    const mockOrder = {
      id: `order_${Date.now()}`,
      amount: amount,
      currency: currency,
      receipt: `receipt_${Date.now()}`,
      status: "created",
    }

    return NextResponse.json({
      success: true,
      order: mockOrder,
    })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create order",
      },
      { status: 500 },
    )
  }
}
