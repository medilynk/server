/*
  Warnings:

  - The `id` column on the `Medication` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `dosage` on the `Prescription` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Medication_id_key";

-- AlterTable
ALTER TABLE "Medication" DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Medication_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Prescription" DROP COLUMN "dosage";
