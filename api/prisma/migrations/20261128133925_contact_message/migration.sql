/*
  Warnings:

  - You are about to drop the column `user_id` on the `messages` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_user_id_fkey";

-- DropIndex
DROP INDEX "messages_user_id_key";

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "user_id";
