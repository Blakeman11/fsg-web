/*
  Warnings:

  - The `year` column on the `MarketCard` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `grade` on table `MarketCard` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "MarketCard" ADD COLUMN     "available" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "condition" TEXT,
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1,
DROP COLUMN "year",
ADD COLUMN     "year" INTEGER,
ALTER COLUMN "grade" SET NOT NULL;
