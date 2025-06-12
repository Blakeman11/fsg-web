import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Fetch all market cards
export async function getMarketCards() {
  try {
    return await prisma.marketCard.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('❌ Failed to fetch market cards:', error);
    return [];
  }
}

// Delete a market card by ID
export async function deleteMarketCard(id: number) {
  try {
    await prisma.marketCard.delete({
      where: { id },
    });
  } catch (error) {
    console.error('❌ Failed to delete market card:', error);
    throw error;
  }
}