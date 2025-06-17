// /src/app/api/checkout/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

export async function POST(req: Request) {
  try {
    const { cart, email } = await req.json();

    const line_items = cart.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
          description: item.grading
            ? `Grading: ${item.grading}${item.addHolder ? ' + Holder' : ''}`
            : item.addHolder
              ? 'Includes Holder'
              : 'No extras',
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: 1,
    }));

    const domain =
      process.env.NODE_ENV === 'production'
        ? 'https://freedomservicegrading.com'
        : 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items,
      mode: 'payment',
      success_url: `${domain}/success`,
      cancel_url: `${domain}/cart`,
    });

    // 🔁 Reduce inventory
    for (const item of cart) {
      const existing = await prisma.marketCard.findUnique({
        where: { id: item.id },
      });

      if (existing && existing.available && existing.quantity > 0) {
        const newQty = existing.quantity - 1;
        await prisma.marketCard.update({
          where: { id: item.id },
          data: {
            quantity: newQty,
            available: newQty > 0,
          },
        });
      }
    }

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('❌ Stripe checkout failed', err);
    return NextResponse.json({ error: 'Stripe checkout failed' }, { status: 500 });
  }
}