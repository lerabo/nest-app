/*
  Warnings:

  - Added the required column `surname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "surname" TEXT NOT NULL,
ALTER COLUMN "jobTitle" DROP NOT NULL;
