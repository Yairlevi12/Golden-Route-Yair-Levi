-- CreateTable
CREATE TABLE "Entry" (
    "id" SERIAL NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "radius" DOUBLE PRECISION NOT NULL,
    "speed" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plane" (
    "id" SERIAL NOT NULL,
    "entryId" INTEGER NOT NULL,
    "license" TEXT NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "closureTime" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Plane_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Plane" ADD CONSTRAINT "Plane_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
