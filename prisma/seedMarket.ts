import { PrismaClient } from '@prisma/client';
import * as XLSX from 'xlsx';
import path from 'path';

const prisma = new PrismaClient();
const workbook = XLSX.readFile(path.join(__dirname, '../Market.xlsx'));
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(sheet);

async function main() {
  const cards = rows.map((row: any) => {
    const playerName = row.playerName || 'Unknown';
    const year = parseInt(row.year) || 0;
    const brand = row.brand || 'Unknown';
    const cardNumber = row.cardNumber?.toString() || '';
    const category = row.category || 'unknown';
    const grade = row.grade || 'Raw';
    const price = parseFloat(row.price) || 1;
    const imageUrl = row.imageUrl || '';
    const variation = row.variation || '';
    const quantity = parseInt(row.quantity) || 1;

    return {
      title: `${year} ${brand} ${playerName} #${cardNumber}`.trim(),
      playerName,
      year,
      brand,
      cardNumber,
      category,
      grade,
      variation,
      quantity,
      price,
      imageUrl,
    };
  });

  await prisma.marketCard.deleteMany(); // optional: clear table before inserting
  await prisma.marketCard.createMany({ data: cards });
  console.log(`✅ Seeded ${cards.length} market cards`);
}

main().catch((e) => {
  console.error('❌ Seeding error:', e);
  process.exit(1);
});