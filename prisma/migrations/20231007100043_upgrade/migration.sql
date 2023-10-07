/*
  Warnings:

  - You are about to drop the column `category_id` on the `Symptom` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Symptom` DROP FOREIGN KEY `Symptom_category_id_fkey`;

-- AlterTable
ALTER TABLE `Symptom` DROP COLUMN `category_id`;

-- CreateTable
CREATE TABLE `Condition` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `severity` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `category_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Condition` ADD CONSTRAINT `Condition_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
