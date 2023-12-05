-- CreateTable
CREATE TABLE "Nurse" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "room" TEXT[]
);

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "nurse_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Nurse_id_key" ON "Nurse"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Room_id_key" ON "Room"("id");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_nurse_id_fkey" FOREIGN KEY ("nurse_id") REFERENCES "Nurse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
