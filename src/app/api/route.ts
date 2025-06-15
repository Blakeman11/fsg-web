import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params

  try {
    const card = await prisma.marketCard.findUnique({
      where: {
        id: id,
      },
    })

    if (!card) {
      return new Response(JSON.stringify({ error: 'Card not found' }), { status: 404 })
    }

    return new Response(JSON.stringify(card), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 })
  }
}