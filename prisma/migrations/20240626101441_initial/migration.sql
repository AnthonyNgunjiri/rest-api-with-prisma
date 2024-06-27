-- CreateTable
CREATE TABLE "product_table" (
    "id" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "offer" BOOLEAN NOT NULL,

    CONSTRAINT "product_table_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_table_thumbnail_key" ON "product_table"("thumbnail");
