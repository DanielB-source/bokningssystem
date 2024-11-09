-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Booking" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "bookedBy" TEXT
);
INSERT INTO "new_Booking" ("bookedBy", "capacity", "date", "endTime", "id", "name", "startTime") SELECT "bookedBy", "capacity", "date", "endTime", "id", "name", "startTime" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
CREATE UNIQUE INDEX "Booking_name_key" ON "Booking"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
