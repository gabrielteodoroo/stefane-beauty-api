/*
  Warnings:

  - You are about to drop the column `image` on the `jewels` table. All the data in the column will be lost.
  - Added the required column `category` to the `jewels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `jewels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `material` to the `jewels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `jewels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "jewels" DROP COLUMN "image",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "material" TEXT NOT NULL,
ADD COLUMN     "stock" INTEGER NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
