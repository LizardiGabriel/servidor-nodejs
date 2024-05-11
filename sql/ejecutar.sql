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
    `fecha_reunion` DATEtime,
    `descripcion_reunion` VARCHAR(200) ,

    FOREIGN KEY (`id_usuario`) REFERENCES `beemeet`.`usuario` (`id_usuario`),
    FOREIGN KEY (`id_sala`) REFERENCES `beemeet`.`sala` (`id_sala`)
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
    `hora_entrada_acceso` DATETIME ,
    `hora_salida_acceso` DATETIME,

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
VALUES ('Sala 1', 10, 1, 4, 'Disponible');

INSERT INTO sala ( nombre_sala, capacidad_sala, piso_sala, numero_sala, estatus_sala)
VALUES ( 'Sala 2', 10, 1, 5, 'Disponible');

INSERT INTO sala ( nombre_sala, capacidad_sala, piso_sala, numero_sala, estatus_sala)
VALUES ( 'Sala 3', 10, 1, 6, 'NoDisponible');




select * from reunion;

INSERT INTO usuario (email_usuario, password_usuario, nombre_usuario, apellido_paterno_usuario, apellido_materno_usuario, telefono_usuario, rol_usuario, foto_usuario) VALUES
('usuario1@example.com', 'password123', 'Juan', 'Gonzalez', 'Perez', 1234567890, 'SuperAdmin', 'user1.jpg'),
('usuario2@example.com', 'password456', 'Maria', 'Lopez', 'Martinez', 1234567890, 'Anfitrion', 'user2.jpg'),
('usuario3@example.com', 'password789', 'Carlos', 'Rodriguez', 'Sanchez', 1234567890, 'Seguridad', 'user3.jpg');


INSERT INTO sala (nombre_sala, capacidad_sala, piso_sala, numero_sala, estatus_sala) VALUES
('Sala de Juntas A', 10, 2, 1, 'Disponible'),
('Sala de Conferencias B', 50, 1, 2, 'NoDisponible'),
('Sala de Reuniones C', 20, 3, 3, 'Disponible');


insert INTO reunion ( id_usuario, id_sala, titulo_reunion, fecha_reunion, descripcion_reunion) VALUES 
( 1, 1, 'Reunion 1', '2021-10-10T15:45:30', 'Descripcion 1');

INSERT INTO reunion (id_usuario, id_sala, titulo_reunion, fecha_reunion, descripcion_reunion) VALUES
(1, 1, 'Reunión de Planificación', '2024-05-12 09:00:00', 'Planificación del próximo trimestre'),
(2, 3, 'Presentación de Proyecto', '2024-05-14 14:00:00', 'Presentación del proyecto para aprobación'),
(3, 2, 'Entrenamiento de Seguridad', '2024-05-16 10:00:00', 'Entrenamiento sobre procedimientos de seguridad');


INSERT INTO invitado (nombre_invitado, apellido_paterno_invitado, apellido_materno_invitado, email_invitado, password_invitado, telefono_invitado, empresa_invitado, foto_invitado, identificacion_invitado, es_colado_invitado, habilitado) VALUES
('Invitado1', 'Gomez', 'Lopez', 'invitado1@example.com', 'guest123', 1234567890, 'Empresa A', 'guest1.jpg', 'ID001', 0, 1),
('Invitado2', 'Martinez', 'Hernandez', 'invitado2@example.com', 'guest456', 1234567890, 'Empresa B', 'guest2.jpg', 'ID002', 1, 1),
('Invitado3', 'Perez', 'Sanchez', 'invitado3@example.com', 'guest789', 1234567890, 'Empresa C', 'guest3.jpg', 'ID003', 0, 1),
('Invitado4', 'Gonzalez', 'Rodriguez', 'invitado4@example.com', 'prueba123', 1234567890, 'Empresa D', 'guest4.jpg', 'ID004', 0, 0);


INSERT INTO invitacion (id_reunion, id_invitado, qr_acceso, habilitado) VALUES
(1, 1, 'qr1.png', 'Si'),
(2, 2, 'qr2.png', 'Si'),
(3, 3, 'qr3.png', 'No'),
(4, 4, 'qr4.png', 'Si'),
(4, 1, 'qr5.png', 'Si');


SELECT * FROM invitacion;


INSERT INTO acceso (id_invitacion, id_reunion, nota_acceso, hora_entrada_acceso, hora_salida_acceso) 
VALUES (1, 1, 'Acceso autorizado', '2024-05-12 09:45:00', '2024-05-12 11:00:00'),
       (2, 2, 'Acceso permitido', '2024-05-15 13:45:00', '2024-05-15 16:00:00');

-- Insertar datos en la tabla de dispositivo electrónico
INSERT INTO dispositivo_electronico (id_invitacion, no_serie_dispositivo_electronico, modelo_dispositivo_electronico, marca_dispositivo_electronico) 
VALUES (1, 'SER123', 'ModeloX', 'MarcaA'),
       (2, 'SER456', 'ModeloY', 'MarcaB');

-- Insertar datos en la tabla de acompañante
INSERT INTO acompaniante (id_invitacion, nombre_acompaniante, apellido_paterno_acompaniante, apellido_materno_acompaniante, email_acompaniante) 
VALUES (1, 'Acompañante', 'ApellidoPaterno', 'ApellidoMaterno', 'acompañante1@example.com'),
       (2, 'Acompañante', 'ApellidoPaterno', 'ApellidoMaterno', 'acompañante2@example.com');

-- Insertar datos en la tabla de automóvil
INSERT INTO automovil (id_invitacion, color_automovil, matricula_automovil, marca_automovil, modelo_automovil) 
VALUES (1, 'Rojo', 'ABC123', 'MarcaX', 'ModeloA'),
       (2, 'Azul', 'XYZ456', 'MarcaY', 'ModeloB');

-- Insertar datos en la tabla de colado
INSERT INTO colado (id_invitado) 
VALUES (1),
       (2);

-- Insertar datos en la tabla de colado invitado
INSERT INTO colado_invitado (id_colado, id_invitado) 
VALUES (1, 1),
       (2, 2);

-- Insertar datos en la tabla de acceso dispositivo electrónico
INSERT INTO acceso_dispositivo_electronico (id_acceso, id_dispositivo_electronico, checka) 
VALUES (1, 1, 1),
       (2, 2, 1);


