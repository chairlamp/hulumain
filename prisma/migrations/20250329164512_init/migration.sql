-- CreateTable
CREATE TABLE "FoodItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT,
    "nutrition" TEXT,
    "imageUrl" TEXT,

    CONSTRAINT "FoodItem_pkey" PRIMARY KEY ("id")
);
