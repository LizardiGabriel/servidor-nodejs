/*
  Warnings:

  - Added the required column `numero_colados` to the `Invitacion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Invitacion` ADD COLUMN `numero_colados` INTEGER NOT NULL;
