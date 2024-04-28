DROP DATABASE IF EXISTS BeeMeet;
CREATE DATABASE IF NOT EXISTS BeeMeet;
USE BeeMeet;

CREATE TABLE Usuario (
    ID_Usuario INT PRIMARY KEY auto_increment,
    Email VARCHAR(50),
    Contrasena VARCHAR(50),
    Nombre VARCHAR(20),
    Apellido_Paterno VARCHAR(20),
    Apellido_Materno VARCHAR(20),
    Telefono NUMERIC(20)

);

CREATE TABLE Anfitrion (
    ID_Anfitrion INT PRIMARY KEY auto_increment,
    ID_Usuario INT,
    FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario)
);

CREATE TABLE Super_Administrador (
    ID_Super_Administrador INT PRIMARY KEY auto_increment,
    ID_Usuario INT,
    FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario)
);


CREATE TABLE Sala (
    ID_Sala INT PRIMARY KEY auto_increment,
    Nombre_Sala VARCHAR(50),
    Capacidad INT,
    Piso INT
);

CREATE TABLE Reunion (
    ID_Reunion INT PRIMARY KEY auto_increment,
    Titulo VARCHAR(50),
    Fecha_Reunion VARCHAR(20),
    Hora_Reunion VARCHAR(20),
    Descripcion TEXT,
    ID_Sala INT,
    ID_Anfitrion INT,
    FOREIGN KEY (ID_Sala) REFERENCES Sala(ID_Sala),
    FOREIGN KEY (ID_Anfitrion) REFERENCES Anfitrion(ID_Anfitrion)
);

select * from Usuario;



