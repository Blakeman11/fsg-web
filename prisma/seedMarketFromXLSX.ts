// prisma/seedMarketFromXLSX.ts
import fs from 'fs';
import path from 'path';
import { read, utils } from 'xlsx';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface MarketCardInput {
  title?: string;
  playerName?: string;
  year?: string | number;
  brand?: string;
  variation?: string;
  cardNumber?: string | number;
  category?: string;
  grade?: string;
  price?: number;
  imageUrl?: string;
  [key: string]: any;
}

async function main() {
  const filePath = path.join(process.cwd(), 'Market.xlsx');
  const workbook = read(fs.readFileSync(filePath));
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const records = utils.sheet_to_json<MarketCardInput>(sheet);

  console.log(`📊 Found ${records.length} rows in Excel`);

  const validCards = [];
  const skippedCards = [];

  for (const card of records) {
    const hasAllRequired = card.title && card.playerName && card.price && card.imageUrl;
    if (!hasAllRequired) {
      skippedCards.push(card.title || '[no title]');
      continue;
    }

    validCards.push({
      title: String(card.title),
      playerName: String(card.playerName),
      year: String(card.year || ''),
      brand: String(card.brand || ''),
      variation: String(card.variation || ''),
      cardNumber: String(card.cardNumber || ''),
      category: String(card.category || ''),
      grade: String(card.grade || 'Raw'),
      price: card.price,
      imageUrl: String(card.imageUrl),
    });
  }

  console.log(`✅ Valid: ${validCards.length}, ❌ Skipped: ${skippedCards.length}`);
  if (skippedCards.length) console.log('📝 Skipped Titles:', skippedCards);

  await prisma.marketCard.deleteMany(); // clear the table
  await prisma.marketCard.createMany({ data: validCards });

  console.log(`🚀 Imported ${validCards.length} cards from Market.xlsx`);
}

main().catch((e) => {
  console.error('❌ Error importing:', e);
  process.exit(1);
});