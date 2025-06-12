// prisma/patchMissingFields.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SUPABASE_BUCKET_URL = 'https://lcnaotinxwcrzvjmuohd.supabase.co/storage/v1/object/public/market-images';

async function main() {
  const allCards = await prisma.marketCard.findMany();

  const updates = allCards.map((card, i) => {
    const needsImage = !card.imageUrl || card.imageUrl.trim() === '';

    if (!needsImage) return null;

    return prisma.marketCard.update({
      where: { id: card.id },
      data: {
        imageUrl: `${SUPABASE_BUCKET_URL}/IMG_${7246 + i}.jpeg`, // 👈 adjust start if needed
      },
    });
  });

  const validUpdates = updates.filter(Boolean) as Promise<any>[];
  await Promise.all(validUpdates);
  console.log(`✅ Patched ${validUpdates.length} image URLs`);
}

main().catch((e) => {
  console.error('❌ Patch error', e);
  process.exit(1);
});