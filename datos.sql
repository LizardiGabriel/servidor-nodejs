-- MySQL dump 10.13  Distrib 8.3.0, for macos14.2 (arm64)
--
-- Host: localhost    Database: beemeet
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `Acceso`
--

LOCK TABLES `Acceso` WRITE;
/*!40000 ALTER TABLE `Acceso` DISABLE KEYS */;
/*!40000 ALTER TABLE `Acceso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `acceso_dispositivo_electronico`
--

LOCK TABLES `acceso_dispositivo_electronico` WRITE;
/*!40000 ALTER TABLE `acceso_dispositivo_electronico` DISABLE KEYS */;
/*!40000 ALTER TABLE `acceso_dispositivo_electronico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Automovil`
--

LOCK TABLES `Automovil` WRITE;
/*!40000 ALTER TABLE `Automovil` DISABLE KEYS */;
INSERT INTO `Automovil` VALUES (1,1,'123','123','123','123'),(2,1,'456','456','456','456');
/*!40000 ALTER TABLE `Automovil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Colado`
--

LOCK TABLES `Colado` WRITE;
/*!40000 ALTER TABLE `Colado` DISABLE KEYS */;
INSERT INTO `Colado` VALUES (1,2,1,0),(2,3,1,0);
/*!40000 ALTER TABLE `Colado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `dispositivo_electronico`
--

LOCK TABLES `dispositivo_electronico` WRITE;
/*!40000 ALTER TABLE `dispositivo_electronico` DISABLE KEYS */;
INSERT INTO `dispositivo_electronico` VALUES (1,1,'qwe','qwe','qwe'),(2,1,'asd','asd','asd');
/*!40000 ALTER TABLE `dispositivo_electronico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Invitacion`
--

LOCK TABLES `Invitacion` WRITE;
/*!40000 ALTER TABLE `Invitacion` DISABLE KEYS */;
INSERT INTO `Invitacion` VALUES (1,1,1,'uploads/qr_acceso.jpg','Si',5,1),(2,1,2,'','No',0,0),(3,1,3,'','No',0,0),(4,1,4,'','No',7,0);
/*!40000 ALTER TABLE `Invitacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Invitado`
--

LOCK TABLES `Invitado` WRITE;
/*!40000 ALTER TABLE `Invitado` DISABLE KEYS */;
INSERT INTO `Invitado` VALUES (1,'juan','juan','juan','lizardigabriel9@gmail.com','$2b$11$45hrKlVFZaOKgCKQKvfA/OrYbOeD2Q3.UwaTRjKQB0hNTJANW5RPq','5560980023','juan','public/build2/uploads/fotografia_invitado1.jpg','INE',1,1,0,1),(2,'','','','diegoillescas2210@gmail.com','709YeytV','','','uploads/usuario.webp','',0,1,1,0),(3,'','','','3lizabeth37124@gmail.com','SJ4OGNcy','','','uploads/usuario.webp','',0,1,1,0),(4,'','','','juan@gmail.com','XFbvn6ft','','','uploads/usuario.webp','',1,1,1,0);
/*!40000 ALTER TABLE `Invitado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Repeticion`
--

LOCK TABLES `Repeticion` WRITE;
/*!40000 ALTER TABLE `Repeticion` DISABLE KEYS */;
INSERT INTO `Repeticion` VALUES (1,1,'2024-05-17','10:00','12:00','Agendada'),(2,2,'2024-06-10','02:00PM','03:00PM','Pendiente'),(3,2,'2024-06-11','02:00PM','03:00PM','Pendiente'),(4,2,'2024-06-12','02:00PM','03:00PM','Pendiente'),(5,3,'2024-06-12','05:00PM','06:00PM','Pendiente'),(6,3,'2024-06-13','05:00PM','06:00PM','Pendiente'),(7,4,'2024-06-10','07:00PM','08:00PM','Pendiente'),(8,4,'2024-06-14','07:00PM','08:00PM','Pendiente'),(9,5,'2024-06-17','05:00PM','06:00PM','Pendiente'),(10,5,'2024-06-18','05:00PM','06:00PM','Pendiente');
/*!40000 ALTER TABLE `Repeticion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Reunion`
--

LOCK TABLES `Reunion` WRITE;
/*!40000 ALTER TABLE `Reunion` DISABLE KEYS */;
INSERT INTO `Reunion` VALUES (1,2,3,'Presentación de Proyecto','Presentación del proyecto para aprobación'),(2,2,3,'reunion3','cita3'),(3,2,2,'reu4','desc'),(4,2,1,'reu5','desc5'),(5,2,2,'reu6','desc6');
/*!40000 ALTER TABLE `Reunion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Sala`
--

LOCK TABLES `Sala` WRITE;
/*!40000 ALTER TABLE `Sala` DISABLE KEYS */;
INSERT INTO `Sala` VALUES (1,'Sala 1 sql',10,1,4,'Disponible'),(2,'Sala 2 sql',10,1,5,'Disponible'),(3,'Sala 3 sql',10,1,6,'NoDisponible');
/*!40000 ALTER TABLE `Sala` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Usuario`
--

LOCK TABLES `Usuario` WRITE;
/*!40000 ALTER TABLE `Usuario` DISABLE KEYS */;
INSERT INTO `Usuario` VALUES (1,'admin@test.com','$2b$11$tpeJKZANQoWqhevVHHTq0ODNibR0RUDcgmGVoNAiWzhjX5Iw1MR2q','Admin','Admin','Admin','5512345678','SuperAdmin','uploads/usuario.webp'),(2,'anfitrion@test.com','$2b$11$tpeJKZANQoWqhevVHHTq0ODNibR0RUDcgmGVoNAiWzhjX5Iw1MR2q','Anfitrion','Jose','Gabriel','5512345678','Anfitrion','uploads/fotografia_usuario2.jpg'),(3,'seguridad@test.com','$2b$11$tpeJKZANQoWqhevVHHTq0ODNibR0RUDcgmGVoNAiWzhjX5Iw1MR2q','Seguridad','Seguridad','Seguridad','5512345678','Seguridad','uploads/usuario.webp');
/*!40000 ALTER TABLE `Usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-09 10:56:42
