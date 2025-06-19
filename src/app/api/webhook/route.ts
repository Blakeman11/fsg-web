import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { buffer } from 'micro';
import { prisma } from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

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

    console.log('✅ Payment confirmed for:', email);

    // Fetch line items
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

    for (const item of lineItems.data) {
      // Save each item to Prisma order table
      await prisma.order.create({
        data: {
          email: email!,
          itemName: item.description,
          quantity: item.quantity ?? 1,
          total: ((item.amount_total ?? 0) / 100),
        },
      });

      // Optional: If the item was a grading submission (based on metadata)
      if (session.metadata?.submissionId) {
        await prisma.cardSubmission.update({
          where: { id: parseInt(session.metadata.submissionId) },
          data: { status: 'paid' },
        });
        console.log(`📦 Marked submission ${session.metadata.submissionId} as paid`);
      }
    }

    // Optional: You could notify admin or trigger email here
    console.log(`📧 Sent receipt or notification for ${email}`);
  }

  return NextResponse.json({ received: true });
}