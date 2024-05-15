/*
  Warnings:

  - You are about to drop the column `estatus_reunion` on the `Reunion` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_reunion` on the `Reunion` table. All the data in the column will be lost.
  - You are about to drop the column `hora_fin_reunion` on the `Reunion` table. All the data in the column will be lost.
  - You are about to drop the column `hora_inicio_reunion` on the `Reunion` table. All the data in the column will be lost.
  - Added the required column `estatus_repeticion` to the `Repeticion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fecha_repeticion` to the `Repeticion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hora_fin_repeticion` to the `Repeticion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hora_inicio_repeticion` to the `Repeticion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Repeticion` ADD COLUMN `estatus_repeticion` VARCHAR(191) NOT NULL,
    ADD COLUMN `fecha_repeticion` DATETIME(3) NOT NULL,
    ADD COLUMN `hora_fin_repeticion` VARCHAR(191) NOT NULL,
    ADD COLUMN `hora_inicio_repeticion` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Reunion` DROP COLUMN `estatus_reunion`,
    DROP COLUMN `fecha_reunion`,
    DROP COLUMN `hora_fin_reunion`,
    DROP COLUMN `hora_inicio_reunion`;
