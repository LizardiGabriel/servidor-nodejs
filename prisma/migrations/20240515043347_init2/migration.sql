/*
  Warnings:

  - Added the required column `estatus_reunion` to the `Reunion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hora_fin_reunion` to the `Reunion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hora_inicio_reunion` to the `Reunion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Reunion` ADD COLUMN `estatus_reunion` VARCHAR(191) NOT NULL,
    ADD COLUMN `hora_fin_reunion` VARCHAR(191) NOT NULL,
    ADD COLUMN `hora_inicio_reunion` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Repeticion` (
    `id_repeticion` INTEGER NOT NULL AUTO_INCREMENT,
    `id_reunion` INTEGER NOT NULL,

    PRIMARY KEY (`id_repeticion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Repeticion` ADD CONSTRAINT `Repeticion_id_reunion_fkey` FOREIGN KEY (`id_reunion`) REFERENCES `Reunion`(`id_reunion`) ON DELETE RESTRICT ON UPDATE CASCADE;
