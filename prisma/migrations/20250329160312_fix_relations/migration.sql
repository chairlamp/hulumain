/*
  Warnings:

  - You are about to drop the column `access_token` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `expires_at` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `id_token` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `provider` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `providerAccountId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_token` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `scope` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `session_state` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `token_type` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `isDefault` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `lat` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `lng` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `MenuItem` table. All the data in the column will be lost.
  - You are about to drop the column `deliveryAgentId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `deliveryFee` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `estimatedDeliveryTime` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `paymentStatus` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `subtotal` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `options` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `subtotal` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `closingTime` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `coverImage` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `lat` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `lng` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `openingTime` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `expires` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `sessionToken` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the `DeliveryAgent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_deliveryAgentId_fkey";

-- DropIndex
DROP INDEX "Account_provider_providerAccountId_key";

-- DropIndex
DROP INDEX "Session_sessionToken_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "access_token",
DROP COLUMN "expires_at",
DROP COLUMN "id_token",
DROP COLUMN "provider",
DROP COLUMN "providerAccountId",
DROP COLUMN "refresh_token",
DROP COLUMN "scope",
DROP COLUMN "session_state",
DROP COLUMN "token_type",
DROP COLUMN "type";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "isDefault",
DROP COLUMN "lat",
DROP COLUMN "lng",
DROP COLUMN "name";

-- AlterTable
ALTER TABLE "MenuItem" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "deliveryAgentId",
DROP COLUMN "deliveryFee",
DROP COLUMN "estimatedDeliveryTime",
DROP COLUMN "paymentMethod",
DROP COLUMN "paymentStatus",
DROP COLUMN "status",
DROP COLUMN "subtotal";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "options",
DROP COLUMN "subtotal";

-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "closingTime",
DROP COLUMN "coverImage",
DROP COLUMN "email",
DROP COLUMN "image",
DROP COLUMN "lat",
DROP COLUMN "lng",
DROP COLUMN "openingTime",
DROP COLUMN "phone",
DROP COLUMN "website";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "expires",
DROP COLUMN "sessionToken";

-- DropTable
DROP TABLE "DeliveryAgent";
