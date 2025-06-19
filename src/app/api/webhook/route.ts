import { NextResponse } from 'next/server';
import Stripe from 'stripe';
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
    console.error('❌ Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_email;
    const metadataCart = session.metadata?.cart;

    try {
      if (metadataCart) {
        const cartItems = JSON.parse(metadataCart);

        for (const item of cartItems) {
          const { id, title, price, grading, addHolder, quantity = 1 } = item;

          if (id && !isNaN(parseInt(id))) {
            const marketCard = await prisma.marketCard.findUnique({ where: { id: parseInt(id) } });

            if (marketCard && marketCard.quantity >= quantity) {
              await prisma.marketCard.update({
                where: { id: parseInt(id) },
                data: { quantity: { decrement: quantity } },
              });

              if (marketCard.quantity - quantity <= 0) {
                await prisma.marketCard.delete({ where: { id: parseInt(id) } });
              }
            }
          }

          await prisma.order.create({
            data: {
              email: email!,
              itemName: title,
              quantity,
              gradingOption: grading || null,
              includesHolder: !!addHolder,
              total: price * quantity,
            },
          });
        }

        console.log(`✅ Saved order(s) for ${email}`);
      }
    } catch (err: any) {
      console.error('❌ Webhook processing error:', err.message);
    }
  }

  return NextResponse.json({ received: true });
}