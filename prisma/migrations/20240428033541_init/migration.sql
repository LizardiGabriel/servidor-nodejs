-- CreateTable
CREATE TABLE `Super_Administrador` (
    `ID_SuperAdmin` INTEGER NOT NULL AUTO_INCREMENT,
    `Email` VARCHAR(191) NOT NULL,
    `Contrasena` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Super_Administrador_Email_key`(`Email`),
    PRIMARY KEY (`ID_SuperAdmin`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Anfitrion` (
    `ID_Anfitrion` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(191) NOT NULL,
    `Apellido_Paterno` VARCHAR(191) NOT NULL,
    `Apellido_Materno` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `Telefono` INTEGER NOT NULL,
    `Contrasena` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Anfitrion_Email_key`(`Email`),
    PRIMARY KEY (`ID_Anfitrion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sala` (
    `ID_Sala` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre_Sala` VARCHAR(191) NOT NULL,
    `Capacidad` INTEGER NOT NULL,
    `Piso` INTEGER NOT NULL,

    PRIMARY KEY (`ID_Sala`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reunion` (
    `ID_Reunion` INTEGER NOT NULL AUTO_INCREMENT,
    `Fecha_Reunion` DATETIME(3) NOT NULL,
    `Hora_Reunion` DATETIME(3) NOT NULL,
    `Descripcion` VARCHAR(191) NULL,
    `Titulo` VARCHAR(191) NOT NULL,
    `Repetibilidad` BOOLEAN NOT NULL,
    `ID_Sala` INTEGER NOT NULL,
    `ID_Anfitrion` INTEGER NOT NULL,

    PRIMARY KEY (`ID_Reunion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reunion` ADD CONSTRAINT `Reunion_ID_Sala_fkey` FOREIGN KEY (`ID_Sala`) REFERENCES `Sala`(`ID_Sala`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reunion` ADD CONSTRAINT `Reunion_ID_Anfitrion_fkey` FOREIGN KEY (`ID_Anfitrion`) REFERENCES `Anfitrion`(`ID_Anfitrion`) ON DELETE RESTRICT ON UPDATE CASCADE;
