import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    const data = await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: ['help@fsg.com'], // or whatever address you want to receive support mail
      subject: `Contact Form Submission from ${name}`,
      reply_to: email,
      text: message,
    });

    return Response.json({ success: true, data });
  } catch (error) {
    console.error('❌ Email send failed:', error);
    return Response.json({ error: 'Email send failed' }, { status: 500 });
  }
}