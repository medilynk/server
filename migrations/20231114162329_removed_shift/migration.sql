/*
  Warnings:

  - You are about to drop the column `shift_id` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `shift_id` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the `Shift` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `shift` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_shift_id_fkey";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "shift_id";

-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "shift_id",
ADD COLUMN     "shift" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Shift";
