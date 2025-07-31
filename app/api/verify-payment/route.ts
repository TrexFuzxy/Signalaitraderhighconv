import { type NextRequest, NextResponse } from "next/server"

// Paystack test secret key - store this in an environment variable in production
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || 'sk_test_your_paystack_secret_key';

export async function POST(request: NextRequest) {
  try {
    const { reference } = await request.json();

    if (!reference) {
      return NextResponse.json(
        { success: false, error: 'Reference is required' },
        { status: 400 }
      );
    }

    // Verify payment with Paystack
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();

    if (!data.status) {
      return NextResponse.json(
        { success: false, error: data.message || 'Payment verification failed' },
        { status: 400 }
      );
    }

    // Check if payment was successful
    if (data.data.status === 'success') {
      // Payment successful - grant access to user
      const paymentData = data.data;
      
      // In production, you would:
      // 1. Verify the amount matches what you expect
      // 2. Update user record in database
      // 3. Send confirmation email
      // 4. Log the transaction
      
      console.log('Payment verified successfully:', paymentData);
      
      return NextResponse.json({
        success: true,
        data: {
          status: paymentData.status,
          amount: paymentData.amount / 100, // Convert from kobo
          reference: paymentData.reference,
          paidAt: paymentData.paid_at,
          customer: paymentData.customer,
        },
      });
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'Payment not successful',
        status: data.data.status 
      },
      { status: 400 }
    );
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'An error occurred while verifying payment' 
      },
      { status: 500 }
    );
  }
}
