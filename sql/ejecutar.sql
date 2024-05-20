

DROP DATABASE IF EXISTS beemeet;
CREATE DATABASE IF NOT EXISTS beemeet;
USE beemeet;

-- CreateTable
CREATE TABLE `Usuario` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `email_usuario` VARCHAR(191) NOT NULL,
    `password_usuario` VARCHAR(191) NOT NULL,
    `nombre_usuario` VARCHAR(191) NOT NULL,
    `apellido_paterno_usuario` VARCHAR(191) NOT NULL,
    `apellido_materno_usuario` VARCHAR(191) NOT NULL,
    `telefono_usuario` INTEGER NOT NULL,
    `rol_usuario` ENUM('SuperAdmin', 'Anfitrion', 'Seguridad') NOT NULL,
    `foto_usuario` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Usuario_email_usuario_key`(`email_usuario`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sala` (
    `id_sala` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_sala` VARCHAR(191) NOT NULL,
    `capacidad_sala` INTEGER NOT NULL,
    `piso_sala` INTEGER NOT NULL,
    `numero_sala` INTEGER NOT NULL,
    `estatus_sala` ENUM('NoDisponible', 'Disponible') NOT NULL,

    PRIMARY KEY (`id_sala`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reunion` (
    `id_reunion` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NOT NULL,
    `id_sala` INTEGER NOT NULL,
    `titulo_reunion` VARCHAR(191) NOT NULL,
    `descripcion_reunion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_reunion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Repeticion` (
    `id_repeticion` INTEGER NOT NULL AUTO_INCREMENT,
    `id_reunion` INTEGER NOT NULL,
    `fecha_repeticion` VARCHAR(191) NOT NULL,
    `hora_inicio_repeticion` VARCHAR(191) NOT NULL,
    `hora_fin_repeticion` VARCHAR(191) NOT NULL,
    `estatus_repeticion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_repeticion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Invitado` (
    `id_invitado` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_invitado` VARCHAR(191) NOT NULL,
    `apellido_paterno_invitado` VARCHAR(191) NOT NULL,
    `apellido_materno_invitado` VARCHAR(191) NOT NULL,
    `email_invitado` VARCHAR(191) NOT NULL,
    `password_invitado` VARCHAR(191) NOT NULL,
    `telefono_invitado` VARCHAR(191) NOT NULL,
    `empresa_invitado` VARCHAR(191) NOT NULL,
    `foto_invitado` VARCHAR(191) NOT NULL,
    `identificacion_invitado` VARCHAR(191) NOT NULL,
    `es_colado_invitado` INTEGER NOT NULL,
    `habilitado` INTEGER NOT NULL,

    UNIQUE INDEX `Invitado_email_invitado_key`(`email_invitado`),
    PRIMARY KEY (`id_invitado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Invitacion` (
    `id_invitacion` INTEGER NOT NULL AUTO_INCREMENT,
    `id_reunion` INTEGER NOT NULL,
    `id_invitado` INTEGER NOT NULL,
    `qr_acceso` VARCHAR(191) NOT NULL,
    `habilitado` ENUM('Si', 'No') NOT NULL,
    `numero_colados` INTEGER NOT NULL,

    PRIMARY KEY (`id_invitacion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Acceso` (
    `id_acceso` INTEGER NOT NULL AUTO_INCREMENT,
    `id_invitacion` INTEGER NOT NULL,
    `id_reunion` INTEGER NOT NULL,
    `nota_acceso` VARCHAR(191) NOT NULL,
    `hora_entrada_acceso` VARCHAR(191) NOT NULL,
    `hora_salida_acceso` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_acceso`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dispositivo_electronico` (
    `id_dispositivo_electronico` INTEGER NOT NULL AUTO_INCREMENT,
    `id_invitacion` INTEGER NOT NULL,
    `no_serie_dispositivo_electronico` VARCHAR(191) NOT NULL,
    `modelo_dispositivo_electronico` VARCHAR(191) NOT NULL,
    `marca_dispositivo_electronico` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_dispositivo_electronico`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Acompaniante` (
    `id_acompaniante` INTEGER NOT NULL AUTO_INCREMENT,
    `id_invitacion` INTEGER NOT NULL,
    `nombre_acompaniante` VARCHAR(191) NOT NULL,
    `apellido_paterno_acompaniante` VARCHAR(191) NOT NULL,
    `apellido_materno_acompaniante` VARCHAR(191) NOT NULL,
    `email_acompaniante` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_acompaniante`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Automovil` (
    `id_automovil` INTEGER NOT NULL AUTO_INCREMENT,
    `id_invitacion` INTEGER NOT NULL,
    `color_automovil` VARCHAR(191) NOT NULL,
    `matricula_automovil` VARCHAR(191) NOT NULL,
    `marca_automovil` VARCHAR(191) NOT NULL,
    `modelo_automovil` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_automovil`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Colado` (
    `id_colado` INTEGER NOT NULL AUTO_INCREMENT,
    `id_invitado` INTEGER NOT NULL,

    PRIMARY KEY (`id_colado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `colado_invitado` (
    `id_colado_invitado` INTEGER NOT NULL AUTO_INCREMENT,
    `id_colado` INTEGER NOT NULL,
    `id_invitado` INTEGER NOT NULL,

    PRIMARY KEY (`id_colado_invitado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `acceso_dispositivo_electronico` (
    `id_acceso_dispositivo_electronico` INTEGER NOT NULL AUTO_INCREMENT,
    `id_acceso` INTEGER NOT NULL,
    `id_dispositivo_electronico` INTEGER NOT NULL,
    `checka` INTEGER NOT NULL,

    PRIMARY KEY (`id_acceso_dispositivo_electronico`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reunion` ADD CONSTRAINT `Reunion_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reunion` ADD CONSTRAINT `Reunion_id_sala_fkey` FOREIGN KEY (`id_sala`) REFERENCES `Sala`(`id_sala`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Repeticion` ADD CONSTRAINT `Repeticion_id_reunion_fkey` FOREIGN KEY (`id_reunion`) REFERENCES `Reunion`(`id_reunion`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invitacion` ADD CONSTRAINT `Invitacion_id_reunion_fkey` FOREIGN KEY (`id_reunion`) REFERENCES `Reunion`(`id_reunion`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invitacion` ADD CONSTRAINT `Invitacion_id_invitado_fkey` FOREIGN KEY (`id_invitado`) REFERENCES `Invitado`(`id_invitado`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Acceso` ADD CONSTRAINT `Acceso_id_invitacion_fkey` FOREIGN KEY (`id_invitacion`) REFERENCES `Invitacion`(`id_invitacion`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Acceso` ADD CONSTRAINT `Acceso_id_reunion_fkey` FOREIGN KEY (`id_reunion`) REFERENCES `Reunion`(`id_reunion`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dispositivo_electronico` ADD CONSTRAINT `dispositivo_electronico_id_invitacion_fkey` FOREIGN KEY (`id_invitacion`) REFERENCES `Invitacion`(`id_invitacion`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Acompaniante` ADD CONSTRAINT `Acompaniante_id_invitacion_fkey` FOREIGN KEY (`id_invitacion`) REFERENCES `Invitacion`(`id_invitacion`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Automovil` ADD CONSTRAINT `Automovil_id_invitacion_fkey` FOREIGN KEY (`id_invitacion`) REFERENCES `Invitacion`(`id_invitacion`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Colado` ADD CONSTRAINT `Colado_id_invitado_fkey` FOREIGN KEY (`id_invitado`) REFERENCES `Invitado`(`id_invitado`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `colado_invitado` ADD CONSTRAINT `colado_invitado_id_colado_fkey` FOREIGN KEY (`id_colado`) REFERENCES `Colado`(`id_colado`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `colado_invitado` ADD CONSTRAINT `colado_invitado_id_invitado_fkey` FOREIGN KEY (`id_invitado`) REFERENCES `Invitado`(`id_invitado`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `acceso_dispositivo_electronico` ADD CONSTRAINT `acceso_dispositivo_electronico_id_acceso_fkey` FOREIGN KEY (`id_acceso`) REFERENCES `Acceso`(`id_acceso`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `acceso_dispositivo_electronico` ADD CONSTRAINT `acceso_dispositivo_electronico_id_dispositivo_electronico_fkey` FOREIGN KEY (`id_dispositivo_electronico`) REFERENCES `dispositivo_electronico`(`id_dispositivo_electronico`) ON DELETE RESTRICT ON UPDATE CASCADE;



use beemeet;
show tables;

INSERT INTO Usuario ( email_usuario, password_usuario, 
            nombre_usuario, apellido_paterno_usuario, apellido_materno_usuario, 
            telefono_usuario, rol_usuario, foto_usuario)  VALUES 

( 'admin@test.com', '$2b$11$tpeJKZANQoWqhevVHHTq0ODNibR0RUDcgmGVoNAiWzhjX5Iw1MR2q', 
            'Admin', 'Admin', 'Admin', 1234567890, 'SuperAdmin', 'admin.jpg'),
 ( 'anfitrion@test.com', '$2b$11$tpeJKZANQoWqhevVHHTq0ODNibR0RUDcgmGVoNAiWzhjX5Iw1MR2q', 
            'Anfitrion', 'Anfitrion', 'Anfitrion', 1234567890, 'Anfitrion', 'anfitrion.jpg'),
( 'seguridad@test.com', '$2b$11$tpeJKZANQoWqhevVHHTq0ODNibR0RUDcgmGVoNAiWzhjX5Iw1MR2q', 
            'Seguridad', 'Seguridad', 'Seguridad', 1234567890, 'Seguridad', 'seguridad.jpg');


INSERT INTO Sala ( nombre_sala, capacidad_sala, piso_sala, numero_sala, estatus_sala) VALUES 
('Sala 1 sql', 10, 1, 4, 'Disponible'),
( 'Sala 2 sql', 10, 1, 5, 'Disponible'),
( 'Sala 3 sql', 10, 1, 6, 'NoDisponible');


INSERT INTO Reunion (id_usuario, id_sala, titulo_reunion, descripcion_reunion) VALUES
(2, 3, 'Presentación de Proyecto', 'Presentación del proyecto para aprobación');

INSERT INTO Repeticion (id_reunion, fecha_repeticion, hora_inicio_repeticion , hora_fin_repeticion, estatus_repeticion) values 
(1, "2024-05-17", "10:00", "12:00", "Agendada");





