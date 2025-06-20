/*
  Warnings:

  - You are about to drop the column `condition` on the `MarketCard` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `MarketCard` will be added. If there are existing duplicate values, this will fail.
  - Made the column `variation` on table `MarketCard` required. This step will fail if there are existing NULL values in that column.
  - Made the column `year` on table `MarketCard` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "MarketCard" DROP COLUMN "condition",
ALTER COLUMN "variation" SET NOT NULL,
ALTER COLUMN "quantity" DROP DEFAULT,
ALTER COLUMN "year" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "MarketCard_title_key" ON "MarketCard"("title");
