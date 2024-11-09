/*
  Warnings:

  - A unique constraint covering the columns `[name,date,startTime]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Booking_name_date_startTime_key" ON "Booking"("name", "date", "startTime");
