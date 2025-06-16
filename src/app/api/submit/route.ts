import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});
const prisma = new PrismaClient();

const PRICING: Record<string, number> = {
  standard: 15,
  express: 25,
  freedom: 50,
  bulk: 10,
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('📦 Incoming body:', body);

    const { fullName, email, address, city, state, zip, cards } = body;

    // 🧮 Calculate total cost
    let totalCost = 0;
    for (const card of cards) {
      const basePrice = PRICING[card.level] ?? 0;
      totalCost += basePrice + (card.insurance ? 10 : 0);
    }

    // 🧾 Save submission and cards
    const customer = await prisma.customer.create({
      data: {
        fullName,
        email,
        address,
        city,
        state,
        zip,
        cards: {
          create: cards.map((card: any) => ({
            name: card.name,
            year: card.year,
            brand: card.brand,
            cardNumber: card.cardNumber,
            category: card.category,
            level: card.level,
            insurance: card.insurance,
          })),
        },
      },
    });

    // 💳 Stripe Checkout
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
            unit_amount: Math.round(totalCost * 100), // 💡 fix is here
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
    console.error('❌ SUBMIT ERROR:', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}