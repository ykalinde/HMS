-- CreateTable
CREATE TABLE `Vital` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `weight` INTEGER NOT NULL,
    `height` INTEGER NOT NULL,
    `temperature` INTEGER NOT NULL,
    `bloodPressure` INTEGER NOT NULL,
    `visitId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Vital` ADD CONSTRAINT `Vital_visitId_fkey` FOREIGN KEY (`visitId`) REFERENCES `Visit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
