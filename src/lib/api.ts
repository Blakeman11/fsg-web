'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Fetch all submissions with customer and cards
export async function getSubmissions() {
  try {
    const submissions = await prisma.customer.findMany({
      include: { cards: true },
      orderBy: { createdAt: 'desc' },
    });

    return submissions.map((customer) => ({
      ...customer,
      cards: customer.cards,
    }));
  } catch (error) {
    console.error('❌ Failed to fetch submissions:', error);
    return [];
  }
}

// Update submission status by card ID
export async function updateSubmissionStatus(id: number, newStatus: string) {
  try {
    await prisma.cardSubmission.update({
      where: { id },
      data: { status: newStatus },
    });
  } catch (error) {
    console.error('❌ Failed to update status:', error);
    throw error;
  }
}

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

// Add new market card
export async function createMarketCard(data: {
  title: string;
  playerName: string;
  year: number;
  brand: string;
  cardNumber: string;
  category: string;
  condition: string;
  grade: string;
  price: number;
  imageUrl: string;
  variation: string; // ✅ no more optional
  quantity: number;
}) {
  try {
    return await prisma.marketCard.create({ data });
  } catch (error) {
    console.error('❌ Failed to create market card:', error);
    throw error;
  }
}