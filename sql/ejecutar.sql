

USE beemeet;


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





