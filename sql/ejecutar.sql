DROP DATABASE IF EXISTS beemeet;
CREATE DATABASE IF NOT EXISTS beemeet;
USE beemeet;
CREATE SCHEMA IF NOT EXISTS `beemeet` DEFAULT CHARACTER SET utf8;
USE `beemeet`;
CREATE TABLE IF NOT EXISTS `beemeet`.`usuario` (
    `id_usuario` int primary key auto_increment,
    `email_usuario` VARCHAR(100) ,
    `password_usuario` VARCHAR(100) ,
    `nombre_usuario` VARCHAR(100) ,
    `apellido_paterno_usuario` VARCHAR(100) ,
    `apellido_materno_usuario` VARCHAR(100) ,
    `telefono_usuario` INT ,
    `rol_usuario` ENUM('SuperAdmin', 'Anfitrion', 'Seguridad') ,
    `foto_usuario` VARCHAR(200) 
    
);



CREATE TABLE IF NOT EXISTS `beemeet`.`sala` (
    `id_sala` int primary key auto_increment,
    `nombre_sala` VARCHAR(100) ,
    `capacidad_sala` INT ,
    `piso_sala` INT ,
    `numero_sala` INT,
    `estatus_sala` ENUM('NoDisponible', 'Disponible') 

);


CREATE TABLE IF NOT EXISTS `beemeet`.`reunion` (
    `id_reunion` int primary key auto_increment,
    `id_usuario` INT ,
    `id_sala` INT ,
    `titulo_reunion` VARCHAR(100) ,
    `descripcion_reunion` VARCHAR(200) ,
    

    FOREIGN KEY (`id_usuario`) REFERENCES `beemeet`.`usuario` (`id_usuario`),
    FOREIGN KEY (`id_sala`) REFERENCES `beemeet`.`sala` (`id_sala`)
);

CREATE table if not EXISTS `beemeet`.`repeticion` (
    `id_repeticion` int primary key auto_increment,
    `id_reunion` INT ,
    `subtema_repeticion` VARCHAR(100) ,
    `descripcion_repeticion` VARCHAR(200) ,


    `fecha_repeticion` varchar(100),
    `hora_inicio_repeticion` varchar(100) ,
    `hora_fin_repeticion` varchar(100) ,
    `estatus_repeticion` varchar(100) ,

    FOREIGN KEY (`id_reunion`) REFERENCES `beemeet`.`reunion` (`id_reunion`)
);
    


CREATE TABLE IF NOT EXISTS `beemeet`.`invitado` (
    `id_invitado` int primary key auto_increment,
    `nombre_invitado` VARCHAR(100) ,
    `apellido_paterno_invitado` VARCHAR(100) ,
    `apellido_materno_invitado` VARCHAR(100) ,
    `email_invitado` VARCHAR(100) ,
    `password_invitado` VARCHAR(100) ,
    `telefono_invitado` INT ,
    `empresa_invitado` VARCHAR(100) ,
    `foto_invitado` VARCHAR(200) ,
    `identificacion_invitado` VARCHAR(100) ,
    `es_colado_invitado` int ,
    `habilitado` int 

);
CREATE TABLE IF NOT EXISTS `beemeet`.`invitacion` (
    `id_invitacion` int primary key auto_increment,
    `id_reunion` INT ,
    `id_invitado` INT ,
    `qr_acceso` VARCHAR(500) ,
    `habilitado` ENUM('Si', 'No') ,

    FOREIGN KEY (`id_invitado`) REFERENCES `beemeet`.`invitado` (`id_invitado`),
    FOREIGN KEY (`id_reunion`) REFERENCES `beemeet`.`reunion` (`id_reunion`)
);


CREATE TABLE IF NOT EXISTS `beemeet`.`acceso` (
    `id_acceso` int primary key auto_increment,
    `id_invitacion` INT ,
    `id_reunion` INT ,
    `nota_acceso` varchar(200),
    `hora_entrada_acceso` varchar(100) ,
    `hora_salida_acceso` varchar(100),

    FOREIGN KEY (`id_invitacion`) REFERENCES `beemeet`.`invitacion` (`id_invitacion`),
    FOREIGN KEY (`id_reunion`) REFERENCES `beemeet`.`reunion` (`id_reunion`)
);


CREATE TABLE IF NOT EXISTS `beemeet`.`dispositivo_electronico` (
    `id_dispositivo_electronico` int primary key auto_increment,
    `id_invitacion` INT ,
    `no_serie_dispositivo_electronico` VARCHAR(100) ,
    `modelo_dispositivo_electronico` VARCHAR(100) ,
    `marca_dispositivo_electronico` VARCHAR(100) ,

    FOREIGN KEY (`id_invitacion`) REFERENCES `beemeet`.`invitacion` (`id_invitacion`)
);



CREATE TABLE IF NOT EXISTS `beemeet`.`acompaniante` (
    `id_acompaniante` int primary key auto_increment,
    `id_invitacion` INT ,
    `nombre_acompaniante` VARCHAR(100) ,
    `apellido_paterno_acompaniante` VARCHAR(100) ,
    `apellido_materno_acompaniante` VARCHAR(100) ,
    `email_acompaniante` VARCHAR(100) ,

    FOREIGN KEY (`id_invitacion`) REFERENCES `beemeet`.`invitacion` (`id_invitacion`)

);


CREATE TABLE IF NOT EXISTS `beemeet`.`automovil` (
    `id_automovil` int primary key auto_increment,
    `id_invitacion` INT ,
    `color_automovil` VARCHAR(100) ,
    `matricula_automovil` VARCHAR(100) ,
    `marca_automovil` VARCHAR(100) ,
    `modelo_automovil` VARCHAR(100) ,

    FOREIGN KEY (`id_invitacion`) REFERENCES `beemeet`.`invitacion` (`id_invitacion`)

);


CREATE TABLE IF NOT EXISTS `beemeet`.`colado` (
    `id_colado` int primary key auto_increment,
    `id_invitado` INT ,

    FOREIGN KEY (`id_invitado`) REFERENCES `beemeet`.`invitado` (`id_invitado`)
);



CREATE TABLE IF NOT EXISTS `beemeet`.`colado_invitado` (
    `id_colado_invitado` int primary key auto_increment,
    `id_colado` INT ,
    `id_invitado` INT ,

    FOREIGN KEY (`id_colado`) REFERENCES `beemeet`.`colado` (`id_colado`),
    FOREIGN KEY (`id_invitado`) REFERENCES `beemeet`.`invitado` (`id_invitado`)
);


CREATE TABLE IF NOT EXISTS `beemeet`.`acceso_dispositivo_electronico` (
    `id_acceso_dispositivo_electronico` int primary key auto_increment,
    `id_acceso` INT ,
    `id_dispositivo_electronico` INT ,
    `checka` int ,

    FOREIGN KEY (`id_acceso`) REFERENCES `beemeet`.`acceso` (`id_acceso`),
    FOREIGN KEY (`id_dispositivo_electronico`) REFERENCES `beemeet`.`dispositivo_electronico` (`id_dispositivo_electronico`)

);



INSERT INTO usuario ( email_usuario, password_usuario, 
            nombre_usuario, apellido_paterno_usuario, apellido_materno_usuario, 
            telefono_usuario, rol_usuario, foto_usuario) 
VALUES ( 'admin@test.com', '$2b$11$tpeJKZANQoWqhevVHHTq0ODNibR0RUDcgmGVoNAiWzhjX5Iw1MR2q', 
            'Admin', 'Admin', 'Admin', 1234567890, 'SuperAdmin', 'admin.jpg');

INSERT INTO usuario ( email_usuario, password_usuario,
            nombre_usuario, apellido_paterno_usuario, apellido_materno_usuario, 
            telefono_usuario, rol_usuario, foto_usuario)
VALUES ( 'anfitrion@test.com', '$2b$11$tpeJKZANQoWqhevVHHTq0ODNibR0RUDcgmGVoNAiWzhjX5Iw1MR2q', 
            'Anfitrion', 'Anfitrion', 'Anfitrion', 1234567890, 'Anfitrion', 'anfitrion.jpg');

INSERT INTO usuario ( email_usuario, password_usuario,
            nombre_usuario, apellido_paterno_usuario, apellido_materno_usuario, 
            telefono_usuario, rol_usuario, foto_usuario)
values ( 'seguridad@test.com', '$2b$11$tpeJKZANQoWqhevVHHTq0ODNibR0RUDcgmGVoNAiWzhjX5Iw1MR2q', 
            'Seguridad', 'Seguridad', 'Seguridad', 1234567890, 'Seguridad', 'seguridad.jpg');


INSERT INTO sala ( nombre_sala, capacidad_sala, piso_sala, numero_sala, estatus_sala)
VALUES ('Sala 1 sql', 10, 1, 4, 'Disponible');

INSERT INTO sala ( nombre_sala, capacidad_sala, piso_sala, numero_sala, estatus_sala)
VALUES ( 'Sala 2 sql', 10, 1, 5, 'Disponible');

INSERT INTO sala ( nombre_sala, capacidad_sala, piso_sala, numero_sala, estatus_sala)
VALUES ( 'Sala 3 sql', 10, 1, 6, 'NoDisponible');


INSERT INTO reunion (id_usuario, id_sala, titulo_reunion, descripcion_reunion) VALUES
(2, 3, 'Presentación de Proyecto', 'Presentación del proyecto para aprobación');

INSERT INTO repeticion (id_reunion, subtema_repeticion, descripcion_repeticion, fecha_repeticion, hora_inicio_repeticion, hora_fin_repeticion, estatus_repeticion) VALUES
(1, 'rep1', 'Presentación 1', '2024-05-14', '09:00', '11:00', 'Activa'),
(1, 'rep2', 'desarrollo 2', '2024-05-16', '09:00', '11:00', 'Activa'),
(1, 'rep3', 'final 3', '2021-10-10', '09:00', '11:00', 'Activa');


