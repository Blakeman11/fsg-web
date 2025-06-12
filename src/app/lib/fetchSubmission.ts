import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function fetchSubmissions() {
  try {
    const submissions = await prisma.cardSubmission.findMany({
      include: {
        customer: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return submissions;
  } catch (error) {
    console.error('❌ Failed to fetch submissions:', error);
    return [];
  }
}