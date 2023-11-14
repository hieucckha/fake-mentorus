/*
  Warnings:

  - The `current_refresh_token` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "sex" BOOLEAN,
DROP COLUMN "current_refresh_token",
ADD COLUMN     "current_refresh_token" INTEGER;
