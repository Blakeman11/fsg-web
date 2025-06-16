// src/app/api/submit-card/route.ts

import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { fullName, email, totalCost, cards } = await req.json();

  try {
    const customer = await prisma.customer.create({
      data: {
        fullName,
        email,
        address: 'N/A',
        city: 'N/A',
        state: 'N/A',
        zip: 'N/A',
      },
    });

    await prisma.cardSubmission.createMany({
      data: cards.map((card: any) => ({
        ...card,
        customerId: customer.id,
        status: 'received',
      })),
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
    console.error('❌ Submit-card API error:', error.message);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}