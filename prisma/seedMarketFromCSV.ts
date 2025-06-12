// prisma/seedMarketFromXLSX.ts
import * as xlsx from 'xlsx';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const workbook = xlsx.readFile('Market.xlsx');
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const records = xlsx.utils.sheet_to_json(sheet);

  console.log(`📦 Parsed ${records.length} records`);

  const validCards = [];
  const skippedCards = [];

  for (const card of records as any[]) {
    const hasAllRequired = card.title && card.playerName && card.price && card.imageUrl;
    if (!hasAllRequired) {
      skippedCards.push(card.title || '[no title]');
      continue;
    }

    validCards.push({
      title: card.title,
      playerName: card.playerName,
      year: card.year,
      brand: card.brand,
      variation: card.variation || '',
      cardNumber: card.cardNumber,
      category: card.category,
      grade: card.grade || 'Raw',
      price: parseFloat(card.price),
      imageUrl: card.imageUrl,
    });
  }

  console.log(`✅ Valid cards: ${validCards.length}`);
  console.log(`❌ Skipped (invalid): ${skippedCards.length}`);
  if (skippedCards.length) {
    console.log('📝 Skipped titles:', skippedCards);
  }

  await prisma.marketCard.deleteMany();
  await prisma.marketCard.createMany({ data: validCards });

  console.log(`✅ Imported ${validCards.length} cards from XLSX`);
}

main().catch((e) => {
  console.error('❌ Error importing:', e);
  process.exit(1);
});