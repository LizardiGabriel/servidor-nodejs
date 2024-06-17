use beemeet;

INSERT INTO Usuario ( email_usuario, password_usuario, 
            nombre_usuario, apellido_paterno_usuario, apellido_materno_usuario, 
            telefono_usuario, rol_usuario, foto_usuario)  VALUES 

( 'admin@test.com', '$2b$11$tpeJKZANQoWqhevVHHTq0ODNibR0RUDcgmGVoNAiWzhjX5Iw1MR2q', 
            'Admin', 'Admin', 'Admin', "5512345678", 'SuperAdmin', 'uploads/usuario.webp'),
 ( 'anfitrion@test.com', '$2b$11$tpeJKZANQoWqhevVHHTq0ODNibR0RUDcgmGVoNAiWzhjX5Iw1MR2q', 
            'Anfitrion', 'Anfitrion', 'Anfitrion', "5512345678", 'Anfitrion', 'uploads/usuario.webp'),
( 'seguridad@test.com', '$2b$11$tpeJKZANQoWqhevVHHTq0ODNibR0RUDcgmGVoNAiWzhjX5Iw1MR2q', 
            'Seguridad', 'Seguridad', 'Seguridad', "5512345678", 'Seguridad', 'uploads/usuario.webp');


INSERT INTO Sala ( nombre_sala, capacidad_sala, piso_sala, numero_sala, estatus_sala) VALUES 
('Sala 1 sql', 10, 1, 4, 'Disponible'),
( 'Sala 2 sql', 10, 1, 5, 'Disponible'),
( 'Sala 3 sql', 10, 1, 6, 'NoDisponible');

