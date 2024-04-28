DROP DATABASE IF EXISTS BeeMeet;

CREATE DATABASE IF NOT EXISTS BeeMeet;
USE BeeMeet;

CREATE TABLE Super_Administrador (
    ID_SuperAdmin INT PRIMARY KEY auto_increment,
    Email VARCHAR(50),
    Contrasena VARCHAR(50)
);

CREATE TABLE Anfitrion (
    ID_Anfitrion INT PRIMARY KEY auto_increment,
    Nombre VARCHAR(20),
    Apellido_Paterno VARCHAR(20),
    Apellido_Materno VARCHAR(20),
    Email VARCHAR(50),
    Telefono NUMERIC(20),
    Contrasena VARCHAR(50)
);



CREATE TABLE Sala (
    ID_Sala INT PRIMARY KEY auto_increment,
    Nombre_Sala VARCHAR(50),
    Capacidad INT,
    Piso INT
);

CREATE TABLE Reunion (
    ID_Reunion INT PRIMARY KEY auto_increment,
    Fecha_Reunion DATE,
    Hora_Reunion TIME,
    Descripcion TEXT,
    Titulo VARCHAR(50),
    Repetibilidad BOOLEAN,
    ID_Sala INT,
    ID_Anfitrion INT,
    FOREIGN KEY (ID_Sala) REFERENCES Sala(ID_Sala),
    FOREIGN KEY (ID_Anfitrion) REFERENCES Anfitrion(ID_Anfitrion)
);

select * from Super_Administrador;



