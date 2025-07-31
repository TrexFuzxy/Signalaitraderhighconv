import { type NextRequest, NextResponse } from "next/server"

// Paystack test secret key - must be set in environment variables
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handle preflight requests
function handleOptions(request: NextRequest) {
  return new NextResponse(null, {
    headers: corsHeaders,
  });
}

export async function POST(request: NextRequest) {
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return handleOptions(request);
  }

  if (!PAYSTACK_SECRET_KEY) {
    console.error('Paystack secret key is not configured');
    return NextResponse.json(
      { success: false, error: 'Server configuration error' },
      { status: 500, headers: corsHeaders }
    );
  }

  try {
    const { reference } = await request.json();
    console.log('Verifying payment with reference:', reference);

    if (!reference) {
      console.error('No reference provided');
      return NextResponse.json(
        { success: false, error: 'Reference is required' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Verify payment with Paystack
    const paystackResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await paystackResponse.json();
    console.log('Paystack API response:', JSON.stringify(data, null, 2));

    if (!paystackResponse.ok) {
      console.error('Paystack API error:', data.message || 'Unknown error');
      return NextResponse.json(
        { 
          success: false, 
          error: data.message || 'Failed to verify payment with Paystack',
          paystackError: data
        },
        { status: paystackResponse.status, headers: corsHeaders }
      );
    }

    if (!data.status) {
      console.error('Paystack verification failed:', data.message || 'No status in response');
      return NextResponse.json(
        { 
          success: false, 
          error: data.message || 'Payment verification failed',
          paystackData: data
        },
        { status: 400, headers: corsHeaders }
      );
    }

    // Check if payment was successful
    if (data.data.status === 'success') {
      // Payment successful - grant access to user
      const paymentData = data.data;
      
      // Verify the amount matches what you expect (3000 Naira)
      const expectedAmount = 3000 * 100; // 3000 Naira in kobo
      if (paymentData.amount !== expectedAmount) {
        console.error(`Payment amount mismatch. Expected ${expectedAmount}, got ${paymentData.amount}`);
        return NextResponse.json(
          { 
            success: false, 
            error: 'Payment amount verification failed',
            expectedAmount,
            receivedAmount: paymentData.amount
          },
          { status: 400, headers: corsHeaders }
        );
      }
      
      console.log('Payment verified successfully:', paymentData);
      
      return new NextResponse(
        JSON.stringify({
          success: true,
          data: {
            status: paymentData.status,
            amount: paymentData.amount / 100, // Convert from kobo to Naira
            reference: paymentData.reference,
            paidAt: paymentData.paid_at,
            customer: paymentData.customer,
          },
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }

    console.warn('Payment not successful. Status:', data.data.status);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Payment not successful',
        status: data.data.status,
        paystackData: data
      },
      { 
        status: 400,
        headers: corsHeaders 
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Payment verification error:', errorMessage, error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'An error occurred while verifying payment',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { 
        status: 500,
        headers: corsHeaders 
      }
    );
  }
}
