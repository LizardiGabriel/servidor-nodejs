-- CreateTable
CREATE TABLE `Rol` (
    `ID_Rol` INTEGER NOT NULL,
    `Nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID_Rol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `ID_Usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `Email` VARCHAR(191) NOT NULL,
    `Contrasena` VARCHAR(191) NOT NULL,
    `Nombre` VARCHAR(191) NOT NULL,
    `Apellido_Paterno` VARCHAR(191) NOT NULL,
    `Apellido_Materno` VARCHAR(191) NOT NULL,
    `Telefono` INTEGER NOT NULL,
    `ID_Rol` INTEGER NOT NULL,

    PRIMARY KEY (`ID_Usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sala` (
    `ID_Sala` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre_Sala` VARCHAR(191) NOT NULL,
    `Capacidad` INTEGER NOT NULL,
    `Piso` INTEGER NOT NULL,
    `Numero_Sala` INTEGER NOT NULL,
    `Estado` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID_Sala`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reunion` (
    `ID_Reunion` INTEGER NOT NULL AUTO_INCREMENT,
    `ID_Usuario` INTEGER NOT NULL,
    `Titulo` VARCHAR(191) NOT NULL,
    `Fecha_Reunion` VARCHAR(191) NOT NULL,
    `Hora_Reunion` VARCHAR(191) NOT NULL,
    `Descripcion` VARCHAR(191) NOT NULL,
    `Lugar` VARCHAR(191) NOT NULL,
    `ID_Sala` INTEGER NOT NULL,
    `ID_Anfitrion` INTEGER NOT NULL,

    PRIMARY KEY (`ID_Reunion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dispositivo` (
    `ID_Dispositivo` INTEGER NOT NULL AUTO_INCREMENT,
    `Numero_Serie` VARCHAR(191) NOT NULL,
    `Modelo` VARCHAR(191) NOT NULL,
    `Marca` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID_Dispositivo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Automovil` (
    `ID_Automovil` INTEGER NOT NULL AUTO_INCREMENT,
    `Color` VARCHAR(191) NOT NULL,
    `Matricula` VARCHAR(191) NOT NULL,
    `Marca` VARCHAR(191) NOT NULL,
    `Modelo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID_Automovil`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Invitacion` (
    `ID_Invitacion` INTEGER NOT NULL AUTO_INCREMENT,
    `ID_Reunion` INTEGER NOT NULL,
    `Num_Acomp_Invit` INTEGER NOT NULL,
    `correoExterno` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID_Invitacion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Externo` (
    `ID_Externo` INTEGER NOT NULL AUTO_INCREMENT,
    `Empresa` VARCHAR(191) NOT NULL,
    `Identificacion` VARCHAR(191) NOT NULL,
    `QR` VARCHAR(191) NOT NULL,
    `Foto` VARCHAR(191) NOT NULL,
    `ID_Automovil` INTEGER NOT NULL,
    `ID_Usuario` INTEGER NOT NULL,
    `ID_Reunion` INTEGER NOT NULL,

    PRIMARY KEY (`ID_Externo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventoExternos` (
    `ID_Evento` INTEGER NOT NULL AUTO_INCREMENT,
    `ID_Externo` INTEGER NOT NULL,
    `evento` INTEGER NOT NULL,

    PRIMARY KEY (`ID_Evento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExternoDispositivo` (
    `ID_ExtDis` INTEGER NOT NULL AUTO_INCREMENT,
    `ID_Externo` INTEGER NOT NULL,
    `ID_Dispositivo` INTEGER NOT NULL,

    PRIMARY KEY (`ID_ExtDis`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Invitado` (
    `ID_Invit` INTEGER NOT NULL AUTO_INCREMENT,
    `ID_Externo` INTEGER NOT NULL,

    PRIMARY KEY (`ID_Invit`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Colado` (
    `ID_Colado` INTEGER NOT NULL AUTO_INCREMENT,
    `ID_Invit` INTEGER NOT NULL,
    `ID_Externo` INTEGER NOT NULL,

    PRIMARY KEY (`ID_Colado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_ID_Rol_fkey` FOREIGN KEY (`ID_Rol`) REFERENCES `Rol`(`ID_Rol`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reunion` ADD CONSTRAINT `Reunion_ID_Usuario_fkey` FOREIGN KEY (`ID_Usuario`) REFERENCES `Usuario`(`ID_Usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reunion` ADD CONSTRAINT `Reunion_ID_Sala_fkey` FOREIGN KEY (`ID_Sala`) REFERENCES `Sala`(`ID_Sala`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invitacion` ADD CONSTRAINT `Invitacion_ID_Reunion_fkey` FOREIGN KEY (`ID_Reunion`) REFERENCES `Reunion`(`ID_Reunion`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Externo` ADD CONSTRAINT `Externo_ID_Usuario_fkey` FOREIGN KEY (`ID_Usuario`) REFERENCES `Usuario`(`ID_Usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Externo` ADD CONSTRAINT `Externo_ID_Reunion_fkey` FOREIGN KEY (`ID_Reunion`) REFERENCES `Reunion`(`ID_Reunion`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Externo` ADD CONSTRAINT `Externo_ID_Automovil_fkey` FOREIGN KEY (`ID_Automovil`) REFERENCES `Automovil`(`ID_Automovil`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventoExternos` ADD CONSTRAINT `EventoExternos_ID_Externo_fkey` FOREIGN KEY (`ID_Externo`) REFERENCES `Externo`(`ID_Externo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExternoDispositivo` ADD CONSTRAINT `ExternoDispositivo_ID_Externo_fkey` FOREIGN KEY (`ID_Externo`) REFERENCES `Externo`(`ID_Externo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExternoDispositivo` ADD CONSTRAINT `ExternoDispositivo_ID_Dispositivo_fkey` FOREIGN KEY (`ID_Dispositivo`) REFERENCES `Dispositivo`(`ID_Dispositivo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invitado` ADD CONSTRAINT `Invitado_ID_Externo_fkey` FOREIGN KEY (`ID_Externo`) REFERENCES `Externo`(`ID_Externo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Colado` ADD CONSTRAINT `Colado_ID_Invit_fkey` FOREIGN KEY (`ID_Invit`) REFERENCES `Invitado`(`ID_Invit`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Colado` ADD CONSTRAINT `Colado_ID_Externo_fkey` FOREIGN KEY (`ID_Externo`) REFERENCES `Externo`(`ID_Externo`) ON DELETE RESTRICT ON UPDATE CASCADE;
