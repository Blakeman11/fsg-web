import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

export async function POST(req: Request) {
  const buf = await req.arrayBuffer();
  const rawBody = Buffer.from(buf);
  const sig = req.headers.get('stripe-signature')!;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: any) {
    console.error('❌ Webhook signature verification failed.', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_email;

    if (!email) {
      console.warn('⚠️ No email in session');
      return NextResponse.json({ received: true });
    }

    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

      for (const item of lineItems.data) {
        await prisma.order.create({
          data: {
            email,
            itemName: item.description,
            quantity: item.quantity ?? 1,
            total: (item.amount_total ?? 0) / 100,
          },
        });
      }

      console.log(`✅ Saved ${lineItems.data.length} order(s) for ${email}`);
    } catch (err) {
      console.error('❌ Failed to save order(s):', err);
    }
  }

  return NextResponse.json({ received: true });
}