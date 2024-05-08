DROP DATABASE IF EXISTS BeeMeet;
CREATE DATABASE IF NOT EXISTS BeeMeet;
USE BeeMeet;


create table Rol(
	ID_Rol int primary key auto_increment,
    Nombre varchar(20)
);


CREATE TABLE Usuario (
    ID_Usuario INT PRIMARY KEY auto_increment,
    Email VARCHAR(50),
    Contrasena VARCHAR(70),
    Nombre VARCHAR(20),
    Apellido_Paterno VARCHAR(20),
    Apellido_Materno VARCHAR(20),
    Telefono NUMERIC(20),
    
    ID_Rol int,
    FOREIGN KEY (ID_Rol) REFERENCES Rol(ID_Rol)
    

);


CREATE TABLE Sala (
    ID_Sala INT PRIMARY KEY auto_increment,
    Nombre_Sala VARCHAR(50),
    Capacidad INT,
    Piso INT,
    Numero_Sala INT,
    Estado varchar(20)
);

CREATE TABLE Reunion (
    ID_Reunion INT PRIMARY KEY auto_increment,
    
    /*anfitrion*/
    ID_Usuario int,
    Titulo VARCHAR(50),
    Fecha_Reunion VARCHAR(20),
    Hora_Reunion VARCHAR(20),
    Descripcion TEXT,
    Lugar varchar(50),
    
    ID_Sala INT,
    ID_Anfitrion INT,
    FOREIGN KEY (ID_Sala) REFERENCES Sala(ID_Sala),
    FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario)
);

CREATE TABLE Dispositivo (
    ID_Dispositivo INT PRIMARY KEY auto_increment,
    Numero_Serie VARCHAR(50),
    Modelo VARCHAR(100),
    Marca VARCHAR(50)
);

CREATE TABLE Automovil (
    ID_Automovil INT PRIMARY KEY auto_increment,
    Color VARCHAR(50),
    Matricula VARCHAR(20),
    Marca VARCHAR(50),
    Modelo VARCHAR(50)
);

CREATE TABLE Invitacion (
	ID_Invitacion int primary key auto_increment,
	ID_Reunion int,
    Num_Acomp_Invit INT,
    correoExterno varchar(30)
    
);


create table Externo(
	ID_Externo int primary key auto_increment,
    
    Empresa VARCHAR(50),
    Identificacion VARCHAR(20),
    QR VARCHAR(50),
    Foto VARCHAR(40),
    ID_Automovil INT,
	ID_Usuario int,
    
    ID_Reunion int, 
    
    foreign key(ID_Usuario) references Usuario(ID_Usuario),
    foreign key (ID_Reunion) references Reunion(ID_Reunion),
    FOREIGN KEY (ID_Automovil) REFERENCES Automovil(ID_Automovil)

);
 
create table EventoExternos(
	ID_Evento int primary key auto_increment,
    ID_Externo int,
    evento int, 
    foreign key(ID_Externo) references Externo(ID_Externo)
    
);




create table ExternoDispositivo(
	ID_ExtDis int primary key auto_increment,
    ID_Externo int,
    ID_Dispositivo int,
    
    FOREIGN KEY (ID_Externo) REFERENCES Externo(ID_Externo),
	FOREIGN KEY (ID_Dispositivo) REFERENCES Dispositivo(ID_Dispositivo)
    
);

CREATE TABLE Invitado (
    ID_Invit INT PRIMARY KEY auto_increment,
    ID_Externo int,

    foreign key (ID_Externo) references Externo(ID_Externo)
);


CREATE TABLE Colado (
    ID_Colado INT PRIMARY KEY auto_increment,
    ID_Invit int,
    ID_Externo int,
    
    foreign key (ID_Externo) references Externo(ID_Externo),
    foreign key (ID_Invit) references Invitado(ID_Invit)
);


INSERT INTO Rol (Nombre) VALUES ('Admin');
INSERT INTO Rol (Nombre) VALUES ('Anfitrion');
INSERT INTO Rol (Nombre) VALUES ('Seguridad');
INSERT INTO Rol (Nombre) VALUES ('Externo');


select * from Rol;

insert into Sala (Nombre_Sala, Capacidad, Piso, Numero_Sala, Estado) values ('Sala 1', 10, 1, 1, 'a');
insert into Sala (Nombre_Sala, Capacidad, Piso, Numero_Sala, Estado) values ('Sala 2', 10, 1, 2, 'a');
insert into Sala (Nombre_Sala, Capacidad, Piso, Numero_Sala, Estado) values ('Sala 3', 10, 1, 3, 'b');

SELECT * FROM Sala;

/* COMMENT: password = password */
INSERT into Usuario (Email, Contrasena, Nombre, Apellido_Paterno, Apellido_Materno, Telefono, ID_Rol) values (
    'lizardigabriel9@gmail.com', '$2b$11$tpeJKZANQoWqhevVHHTq0ODNibR0RUDcgmGVoNAiWzhjX5Iw1MR2q', 
    'Juan', 'Perez', 'Lopez', 1234567890, 1
);

INSERT into Usuario (Email, Contrasena, Nombre, Apellido_Paterno, Apellido_Materno, Telefono, ID_Rol) values (
    'anfitrion@test.com', '$2b$11$tpeJKZANQoWqhevVHHTq0ODNibR0RUDcgmGVoNAiWzhjX5Iw1MR2q',
    'Maria', 'Gomez', 'Gonzalez', 1234567890, 2
);
INSERT into Usuario (Email, Contrasena, Nombre, Apellido_Paterno, Apellido_Materno, Telefono, ID_Rol) values (
    'seguridad@test.com', '$2b$11$tpeJKZANQoWqhevVHHTq0ODNibR0RUDcgmGVoNAiWzhjX5Iw1MR2q',
    'Pedro', 'Garcia', 'Gonzalez', 1234567890, 3
);
INSERT into Usuario (Email, Contrasena, Nombre, Apellido_Paterno, Apellido_Materno, Telefono, ID_Rol) values (
    'externo@test.com', '$2b$11$tpeJKZANQoWqhevVHHTq0ODNibR0RUDcgmGVoNAiWzhjX5Iw1MR2q',
    'Luis', 'Garcia', 'Gonzalez', 1234567890, 4
);

select * from Usuario;


