import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { fullName, email, totalCost } = await req.json();

  try {
    await prisma.submission.create({
      data: { fullName, email, totalCost },
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'FSG Grading Submission',
              description: `Submission for ${fullName}`,
            },
            unit_amount: totalCost * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/submit',
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('API Error:', error.message);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}