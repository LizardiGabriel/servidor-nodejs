DROP DATABASE IF EXISTS beemeet;
CREATE DATABASE IF NOT EXISTS beemeet;
USE beemeet;
CREATE SCHEMA IF NOT EXISTS `beemeet` DEFAULT CHARACTER SET utf8;
USE `beemeet`;
CREATE TABLE IF NOT EXISTS `beemeet`.`usuario` (
    `id_usuario` INT NOT NULL,
    `email_usuario` VARCHAR(100) NOT NULL,
    `password_usuario` VARCHAR(100) NOT NULL,
    `nombre_usuario` VARCHAR(100) NOT NULL,
    `apellido_paterno_usuario` VARCHAR(100) NOT NULL,
    `apellido_materno_usuario` VARCHAR(100) NOT NULL,
    `telefono_usuario` INT NOT NULL,
    `rol_usuario` ENUM('SuperAdmin', 'Anfitrion', 'Seguridad') NOT NULL,
    `foto_usuario` VARCHAR(200) NOT NULL,
    PRIMARY KEY (`id_usuario`)
);


CREATE TABLE IF NOT EXISTS `beemeet`.`sala` (
    `id_sala` INT NOT NULL,
    `nombre_sala` VARCHAR(100) NOT NULL,
    `capacidad_sala` INT NOT NULL,
    `piso_sala` INT NOT NULL,
    `ubicacion_sala` VARCHAR(100) NOT NULL,
    `estatus_sala` ENUM('NoDisponible', 'Disponible') NOT NULL,
    PRIMARY KEY (`id_sala`)
);


CREATE TABLE IF NOT EXISTS `beemeet`.`reunion` (
    `id_reunion` INT NOT NULL,
    `id_usuario` INT NOT NULL,
    `id_sala` INT NOT NULL,
    `titulo_reunion` VARCHAR(100) NOT NULL,
    `fecha_reunion` DATE NOT NULL,
    `hora_reunion` TIME NOT NULL,
    `descripcion_reunion` VARCHAR(200) NOT NULL,
    PRIMARY KEY (`id_reunion`),
    FOREIGN KEY (`id_usuario`) REFERENCES `beemeet`.`usuario` (`id_usuario`),
    FOREIGN KEY (`id_sala`) REFERENCES `beemeet`.`sala` (`id_sala`)
);
CREATE TABLE IF NOT EXISTS `beemeet`.`invitado` (
    `id_invitado` INT NOT NULL,
    `nombre_invitado` VARCHAR(100) NOT NULL,
    `apellido_paterno_invitado` VARCHAR(100) NOT NULL,
    `apellido_materno_invitado` VARCHAR(100) NOT NULL,
    `email_invitado` VARCHAR(100) NOT NULL,
    `password_invitado` VARCHAR(100) NOT NULL,
    `telefono_invitado` INT NOT NULL,
    `empresa_invitado` VARCHAR(100) NOT NULL,
    `foto_invitado` VARCHAR(200) NOT NULL,
    `identificacion_invitado` VARCHAR(100) NOT NULL,
    `es_colado_invitado` TINYINT NOT NULL,
    `habilitado` TINYINT NOT NULL,
    PRIMARY KEY (`id_invitado`)
);
CREATE TABLE IF NOT EXISTS `beemeet`.`invitacion` (
    `id_invitacion` INT NOT NULL,
    `id_reunion` INT NOT NULL,
    `id_invitado` INT NOT NULL,
    `qr_acceso` VARCHAR(500) NOT NULL,
    `habilitado` ENUM('Si', 'No') NOT NULL,
    PRIMARY KEY (`id_invitacion`),
    FOREIGN KEY (`id_invitado`) REFERENCES `beemeet`.`invitado` (`id_invitado`),
    FOREIGN KEY (`id_reunion`) REFERENCES `beemeet`.`reunion` (`id_reunion`)
);


CREATE TABLE IF NOT EXISTS `beemeet`.`acceso` (
    `id_acceso` INT NOT NULL,
    `id_invitacion` INT NOT NULL,
    `id_reunion` INT NOT NULL,
    `nota_acceso` TEXT NULL,
    `hora_entrada_acceso` DATETIME NOT NULL,
    `hora_salida_acceso` DATETIME NULL,
    PRIMARY KEY (`id_acceso`),
    FOREIGN KEY (`id_invitacion`) REFERENCES `beemeet`.`invitacion` (`id_invitacion`),
    FOREIGN KEY (`id_reunion`) REFERENCES `beemeet`.`reunion` (`id_reunion`)
);


CREATE TABLE IF NOT EXISTS `beemeet`.`dispositivo_electronico` (
    `id_dispositivo_electronico` INT NOT NULL,
    `id_invitacion` INT NOT NULL,
    `no_serie_dispositivo_electronico` VARCHAR(100) NOT NULL,
    `modelo_dispositivo_electronico` VARCHAR(100) NOT NULL,
    `marca_dispositivo_electronico` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`id_dispositivo_electronico`),
    FOREIGN KEY (`id_invitacion`) REFERENCES `beemeet`.`invitacion` (`id_invitacion`)
);



CREATE TABLE IF NOT EXISTS `beemeet`.`acompaniante` (
    `id_acompaniante` INT NOT NULL,
    `id_invitacion` INT NOT NULL,
    `nombre_acompaniante` VARCHAR(100) NOT NULL,
    `apellido_paterno_acompaniante` VARCHAR(100) NOT NULL,
    `apellido_materno_acompaniante` VARCHAR(100) NOT NULL,
    `email_acompaniante` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`id_acompaniante`),
    FOREIGN KEY (`id_invitacion`) REFERENCES `beemeet`.`invitacion` (`id_invitacion`)

);


CREATE TABLE IF NOT EXISTS `beemeet`.`automovil` (
    `id_automovil` INT NOT NULL,
    `id_invitacion` INT NOT NULL,
    `color_automovil` VARCHAR(100) NOT NULL,
    `matricula_automovil` VARCHAR(100) NOT NULL,
    `marca_automovil` VARCHAR(100) NOT NULL,
    `modelo_automovil` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`id_automovil`),
    FOREIGN KEY (`id_invitacion`) REFERENCES `beemeet`.`invitacion` (`id_invitacion`)

);


CREATE TABLE IF NOT EXISTS `beemeet`.`colado` (
    `id_colado` INT NOT NULL,
    `id_invitado` INT NOT NULL,
    PRIMARY KEY (`id_colado`),
    FOREIGN KEY (`id_invitado`) REFERENCES `beemeet`.`invitado` (`id_invitado`)
);



CREATE TABLE IF NOT EXISTS `beemeet`.`colado_invitado` (
    `id_colado_invitado` INT NOT NULL,
    `id_colado` INT NOT NULL,
    `id_invitado` INT NOT NULL,
    PRIMARY KEY (`id_colado_invitado`),
    FOREIGN KEY (`id_colado`) REFERENCES `beemeet`.`colado` (`id_colado`),
    FOREIGN KEY (`id_invitado`) REFERENCES `beemeet`.`invitado` (`id_invitado`)
);


CREATE TABLE IF NOT EXISTS `beemeet`.`acceso_dispositivo_electronico` (
    `id_acceso_dispositivo_electronico` INT NOT NULL,
    `id_acceso` INT NOT NULL,
    `id_dispositivo_electronico` INT NOT NULL,
    `check` TINYINT NOT NULL,
    PRIMARY KEY (`id_acceso_dispositivo_electronico`),
    FOREIGN KEY (`id_acceso`) REFERENCES `beemeet`.`acceso` (`id_acceso`),
    FOREIGN KEY (`id_dispositivo_electronico`) REFERENCES `beemeet`.`dispositivo_electronico` (`id_dispositivo_electronico`)

);