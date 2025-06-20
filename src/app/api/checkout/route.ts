// src/app/api/checkout/route.ts

import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

export async function POST(req: Request) {
  try {
    const { cartItems, email } = await req.json();

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
    }

    // Safely build Stripe line items
    const lineItems = cartItems.map((item: any, idx: number) => {
      const title = item.title ?? `Item ${idx + 1}`;
      const rawPrice = Number(item.price);
      const priceInCents = Math.round(isNaN(rawPrice) ? 0 : rawPrice * 100);

      if (!priceInCents || priceInCents <= 0) {
        throw new Error(`Invalid price for item: ${title}`);
      }

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: title,
          },
          unit_amount: priceInCents,
        },
        quantity: item.quantity || 1,
      };
    });

    // Flat shipping rate: $4.63
const shippingAmount = 463;

lineItems.push({
  price_data: {
    currency: 'usd',
    product_data: { name: 'Shipping (Flat Rate)' },
    unit_amount: shippingAmount,
  },
  quantity: 1,
});

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      customer_email: email,
      metadata: {
        cart: JSON.stringify(cartItems),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Checkout Error:', err.message);
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 });
  }
}