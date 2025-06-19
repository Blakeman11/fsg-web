// src/app/api/checkout/route.ts

import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(req: Request) {
  try {
    const { cartItems, email } = await req.json();

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
    }

    // Stripe line items
    const lineItems = cartItems.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.title },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity || 1,
    }));

    // Add shipping line item
    const shippingAmount = Math.min(495 + Math.max(cartItems.length - 1, 0) * 50, 1595);
    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: { name: 'Shipping' },
        unit_amount: shippingAmount,
      },
      quantity: 1,
    });

    // Update inventory and remove sold-out market cards
    for (const item of cartItems) {
      // Skip custom grading submissions
      if (!item.id || isNaN(parseInt(item.id))) continue;

      const id = parseInt(item.id);
      const qtyToDecrement = item.quantity || 1;

      const current = await prisma.marketCard.findUnique({
        where: { id },
        select: { quantity: true },
      });

      if (!current || current.quantity < qtyToDecrement) {
        return NextResponse.json({ error: 'Not enough inventory' }, { status: 400 });
      }

      await prisma.marketCard.update({
        where: { id },
        data: { quantity: { decrement: qtyToDecrement } },
      });

      const updated = await prisma.marketCard.findUnique({
        where: { id },
        select: { quantity: true },
      });

      if (updated?.quantity === 0) {
        await prisma.marketCard.delete({ where: { id } });
      }
    }

    // Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      customer_email: email,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Checkout Error:', err);
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 });
  }
}