/*
  Warnings:

  - You are about to drop the column `medication_name` on the `Prescription` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Prescription" DROP COLUMN "medication_name";

-- CreateTable
CREATE TABLE "Medication" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dosage" TEXT,
    "instructions" TEXT,
    "prescription_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Medication_id_key" ON "Medication"("id");

-- AddForeignKey
ALTER TABLE "Medication" ADD CONSTRAINT "Medication_prescription_id_fkey" FOREIGN KEY ("prescription_id") REFERENCES "Prescription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
