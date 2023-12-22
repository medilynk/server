/*
  Warnings:

  - The primary key for the `Appointment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Rooms` on the `Nurse` table. All the data in the column will be lost.
  - The primary key for the `Prescription` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Nurses` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `doctor_id` on the `Shift_Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Shift_Doctor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Prescription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `end_time` to the `Shift_Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `Shift_Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Shift_Doctor" DROP CONSTRAINT "Shift_Doctor_doctor_id_fkey";

-- AlterTable
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT;
DROP SEQUENCE "Appointment_id_seq";

-- AlterTable
ALTER TABLE "Nurse" DROP COLUMN "Rooms",
ADD COLUMN     "rooms" TEXT[];

-- AlterTable
ALTER TABLE "Prescription" DROP CONSTRAINT "Prescription_pkey",
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Prescription_id_seq";

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "Nurses",
ADD COLUMN     "nurses" TEXT[];

-- AlterTable
ALTER TABLE "Shift_Doctor" DROP COLUMN "doctor_id",
DROP COLUMN "time",
ADD COLUMN     "doctorId" TEXT,
ADD COLUMN     "end_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start_time" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_id_key" ON "Appointment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Prescription_id_key" ON "Prescription"("id");

-- AddForeignKey
ALTER TABLE "Shift_Doctor" ADD CONSTRAINT "Shift_Doctor_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
