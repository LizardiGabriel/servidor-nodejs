/*
  Warnings:

  - You are about to drop the column `Apellido_Materno` on the `Anfitrion` table. All the data in the column will be lost.
  - You are about to drop the column `Apellido_Paterno` on the `Anfitrion` table. All the data in the column will be lost.
  - You are about to drop the column `Contrasena` on the `Anfitrion` table. All the data in the column will be lost.
  - You are about to drop the column `Email` on the `Anfitrion` table. All the data in the column will be lost.
  - You are about to drop the column `Nombre` on the `Anfitrion` table. All the data in the column will be lost.
  - You are about to drop the column `Telefono` on the `Anfitrion` table. All the data in the column will be lost.
  - You are about to drop the column `Repetibilidad` on the `Reunion` table. All the data in the column will be lost.
  - The primary key for the `Super_Administrador` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Contrasena` on the `Super_Administrador` table. All the data in the column will be lost.
  - You are about to drop the column `Email` on the `Super_Administrador` table. All the data in the column will be lost.
  - You are about to drop the column `ID_SuperAdmin` on the `Super_Administrador` table. All the data in the column will be lost.
  - Added the required column `ID_Usuario` to the `Anfitrion` table without a default value. This is not possible if the table is not empty.
  - Made the column `Descripcion` on table `Reunion` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `ID_Super_Administrador` to the `Super_Administrador` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ID_Usuario` to the `Super_Administrador` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Anfitrion_Email_key` ON `Anfitrion`;

-- DropIndex
DROP INDEX `Super_Administrador_Email_key` ON `Super_Administrador`;

-- AlterTable
ALTER TABLE `Anfitrion` DROP COLUMN `Apellido_Materno`,
    DROP COLUMN `Apellido_Paterno`,
    DROP COLUMN `Contrasena`,
    DROP COLUMN `Email`,
    DROP COLUMN `Nombre`,
    DROP COLUMN `Telefono`,
    ADD COLUMN `ID_Usuario` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Reunion` DROP COLUMN `Repetibilidad`,
    MODIFY `Fecha_Reunion` VARCHAR(191) NOT NULL,
    MODIFY `Hora_Reunion` VARCHAR(191) NOT NULL,
    MODIFY `Descripcion` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Super_Administrador` DROP PRIMARY KEY,
    DROP COLUMN `Contrasena`,
    DROP COLUMN `Email`,
    DROP COLUMN `ID_SuperAdmin`,
    ADD COLUMN `ID_Super_Administrador` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `ID_Usuario` INTEGER NOT NULL,
    ADD PRIMARY KEY (`ID_Super_Administrador`);

-- CreateTable
CREATE TABLE `Usuario` (
    `ID_Usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `Email` VARCHAR(191) NOT NULL,
    `Contrasena` VARCHAR(191) NOT NULL,
    `Nombre` VARCHAR(191) NOT NULL,
    `Apellido_Paterno` VARCHAR(191) NOT NULL,
    `Apellido_Materno` VARCHAR(191) NOT NULL,
    `Telefono` DECIMAL(65, 30) NOT NULL,

    UNIQUE INDEX `Usuario_Email_key`(`Email`),
    PRIMARY KEY (`ID_Usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Anfitrion` ADD CONSTRAINT `Anfitrion_ID_Usuario_fkey` FOREIGN KEY (`ID_Usuario`) REFERENCES `Usuario`(`ID_Usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Super_Administrador` ADD CONSTRAINT `Super_Administrador_ID_Usuario_fkey` FOREIGN KEY (`ID_Usuario`) REFERENCES `Usuario`(`ID_Usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;
