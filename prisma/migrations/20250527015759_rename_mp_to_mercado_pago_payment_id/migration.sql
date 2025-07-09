/*
  Warnings:

  - You are about to drop the column `mpPaymentId` on the `Payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "mpPaymentId",
ADD COLUMN     "mercadoPagoPaymentId" TEXT;
