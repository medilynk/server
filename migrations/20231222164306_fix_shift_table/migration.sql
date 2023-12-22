/*
  Warnings:

  - You are about to drop the column `doctorId` on the `Shift_Doctor` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Shift_Doctor" DROP CONSTRAINT "Shift_Doctor_doctorId_fkey";

-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "shifts" INTEGER[];

-- AlterTable
ALTER TABLE "Shift_Doctor" DROP COLUMN "doctorId";
