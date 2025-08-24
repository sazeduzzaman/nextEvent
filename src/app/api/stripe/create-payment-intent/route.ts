import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

export async function POST(req: NextRequest) {
  try {
    const { totalPrice, userInfo } = await req.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalPrice * 100), // in cents
      currency: "usd",
      receipt_email: userInfo.email,
      metadata: {
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone,
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
