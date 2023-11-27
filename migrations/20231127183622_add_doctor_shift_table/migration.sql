-- CreateTable
CREATE TABLE "Shift_Doctor" (
    "id" SERIAL NOT NULL,
    "day" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "doctor_id" TEXT NOT NULL,

    CONSTRAINT "Shift_Doctor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Shift_Doctor" ADD CONSTRAINT "Shift_Doctor_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
