/*
  Warnings:

  - Added the required column `doctorId` to the `Visit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Visit` ADD COLUMN `doctorId` INTEGER NOT NULL;
