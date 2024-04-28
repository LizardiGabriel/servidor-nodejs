CREATE DATABASE IF NOT EXISTS BeeMeet;
USE BeeMeet;

CREATE TABLE Super_Administrador (
    ID_SuperAdmin INT PRIMARY KEY,
    Email VARCHAR(50),
    Contraseña VARCHAR(50)
);

CREATE TABLE Invitacion (
    ID_Invit INT PRIMARY KEY,
    Email_Invit VARCHAR(50),
    Num_Acomp_Invit INT
);

CREATE TABLE Seguridad (
    ID_Seguridad INT PRIMARY KEY,
    Nombre VARCHAR(20),
    Apellido_Paterno VARCHAR(20),
    Apellido_Materno VARCHAR(20),
    Email VARCHAR(50),
    Teléfono NUMERIC(20),
    Contraseña VARCHAR(50)
);

CREATE TABLE Anfitrion (
    ID_Anfitrion INT PRIMARY KEY,
    Nombre VARCHAR(20),
    Apellido_Paterno VARCHAR(20),
    Apellido_Materno VARCHAR(20),
    Email VARCHAR(50),
    Teléfono NUMERIC(20),
    Contraseña VARCHAR(50)
);



CREATE TABLE Sala (
    ID_Sala INT PRIMARY KEY,
    Nombre_Sala VARCHAR(50),
    Capacidad INT,
    Piso INT
);

CREATE TABLE Reunion (
    ID_Reunion INT PRIMARY KEY,
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
CREATE TABLE Dispositivo (
    ID_Dispositivo INT PRIMARY KEY,
    Numero_Serie VARCHAR(50),
    Modelo VARCHAR(100),
    Marca VARCHAR(50)
);

CREATE TABLE Automovil (
    ID_Automovil INT PRIMARY KEY,
    Color VARCHAR(50),
    Matricula VARCHAR(20),
    Marca VARCHAR(50),
    Modelo VARCHAR(50)
);

CREATE TABLE Invitado (
    ID_Invit INT PRIMARY KEY,
    Nombre VARCHAR(20),
    Apellido_Paterno VARCHAR(20),
    Apellido_Materno VARCHAR(20),
    Email VARCHAR(50),
    Teléfono NUMERIC(20),
    Empresa VARCHAR(50),
    Identificacion VARCHAR(20),
    QR BLOB,
    Foto BLOB,
    Contraseña VARCHAR(50),
    ID_Anfitrion INT,
    ID_Dispositivo INT,
    ID_Reunion INT,
    ID_Automovil INT,
    FOREIGN KEY (ID_Anfitrion) REFERENCES Anfitrion(ID_Anfitrion),
    FOREIGN KEY (ID_Dispositivo) REFERENCES Dispositivo(ID_Dispositivo),
    FOREIGN KEY (ID_Reunion) REFERENCES Reunion(ID_Reunion),
    FOREIGN KEY (ID_Automovil) REFERENCES Automovil(ID_Automovil)
);
