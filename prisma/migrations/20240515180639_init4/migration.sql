-- AlterTable
ALTER TABLE `Acceso` MODIFY `hora_entrada_acceso` VARCHAR(191) NOT NULL,
    MODIFY `hora_salida_acceso` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Repeticion` MODIFY `fecha_repeticion` VARCHAR(191) NOT NULL;
