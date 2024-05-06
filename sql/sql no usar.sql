-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema beemeet
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema beemeet
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `beemeet` DEFAULT CHARACTER SET utf8 ;
USE `beemeet` ;

-- -----------------------------------------------------
-- Table `beemeet`.`usuario`
-- -----------------------------------------------------
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
  PRIMARY KEY (`id_usuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `beemeet`.`sala`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `beemeet`.`sala` (
  `id_sala` INT NOT NULL,
  `nombre_sala` VARCHAR(100) NOT NULL,
  `capacidad_sala` INT NOT NULL,
  `piso_sala` INT NOT NULL,
  `ubicacion_sala` VARCHAR(100) NOT NULL,
  `estatus_sala` ENUM('NoDisponible', 'Disponible') NOT NULL,
  PRIMARY KEY (`id_sala`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `beemeet`.`reunion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `beemeet`.`reunion` (
  `id_reunion` INT NOT NULL,
  `id_usuario` INT NOT NULL,
  `id_sala` INT NOT NULL,
  `titulo_reunion` VARCHAR(100) NOT NULL,
  `fecha_reunion` DATE NOT NULL,
  `hora_reunion` TIME NOT NULL,
  `descripcion_reunion` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id_reunion`),
  INDEX `fk_reunion_usuario_idx` (`id_usuario` ASC) VISIBLE,
  INDEX `fk_reunion_sala1_idx` (`id_sala` ASC) VISIBLE,
  CONSTRAINT `fk_reunion_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `beemeet`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_reunion_sala1`
    FOREIGN KEY (`id_sala`)
    REFERENCES `beemeet`.`sala` (`id_sala`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `beemeet`.`invitado`
-- -----------------------------------------------------
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
  PRIMARY KEY (`id_invitado`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `beemeet`.`invitacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `beemeet`.`invitacion` (
  `id_invitacion` INT NOT NULL,
  `id_reunion` INT NOT NULL,
  `id_invitado` INT NOT NULL,
  `qr_acceso` VARCHAR(500) NOT NULL,
  `habilitado` ENUM('Si', 'No') NOT NULL,
  PRIMARY KEY (`id_invitacion`),
  INDEX `fk_invitacion_invitado1_idx` (`id_invitado` ASC) VISIBLE,
  INDEX `fk_invitacion_reunion1_idx` (`id_reunion` ASC) VISIBLE,
  CONSTRAINT `fk_invitacion_invitado1`
    FOREIGN KEY (`id_invitado`)
    REFERENCES `beemeet`.`invitado` (`id_invitado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_invitacion_reunion1`
    FOREIGN KEY (`id_reunion`)
    REFERENCES `beemeet`.`reunion` (`id_reunion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `beemeet`.`acceso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `beemeet`.`acceso` (
  `id_acceso` INT NOT NULL,
  `id_invitacion` INT NOT NULL,
  `id_reunion` INT NOT NULL,
  `nota_acceso` TEXT NULL,
  `hora_entrada_acceso` DATETIME NOT NULL,
  `hora_salida_acceso` DATETIME NULL,
  PRIMARY KEY (`id_acceso`),
  INDEX `fk_acceso_invitacion1_idx` (`id_invitacion` ASC) VISIBLE,
  INDEX `fk_acceso_reunion1_idx` (`id_reunion` ASC) VISIBLE,
  CONSTRAINT `fk_acceso_invitacion1`
    FOREIGN KEY (`id_invitacion`)
    REFERENCES `beemeet`.`invitacion` (`id_invitacion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_acceso_reunion1`
    FOREIGN KEY (`id_reunion`)
    REFERENCES `beemeet`.`reunion` (`id_reunion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `beemeet`.`dispositivo_electronico`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `beemeet`.`dispositivo_electronico` (
  `id_dispositivo_electronico` INT NOT NULL,
  `id_invitacion` INT NOT NULL,
  `no_serie_dispositivo_electronico` VARCHAR(100) NOT NULL,
  `modelo_dispositivo_electronico` VARCHAR(100) NOT NULL,
  `marca_dispositivo_electronico` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id_dispositivo_electronico`),
  INDEX `fk_dispositivo_electronico_invitacion1_idx` (`id_invitacion` ASC) VISIBLE,
  CONSTRAINT `fk_dispositivo_electronico_invitacion1`
    FOREIGN KEY (`id_invitacion`)
    REFERENCES `beemeet`.`invitacion` (`id_invitacion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `beemeet`.`acompaniante`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `beemeet`.`acompaniante` (
  `id_acompaniante` INT NOT NULL,
  `id_invitacion` INT NOT NULL,
  `nombre_acompaniante` VARCHAR(100) NOT NULL,
  `apellido_paterno_acompaniante` VARCHAR(100) NOT NULL,
  `apellido_materno_acompaniante` VARCHAR(100) NOT NULL,
  `email_acompaniante` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id_acompaniante`),
  INDEX `fk_acompaniante_invitacion1_idx` (`id_invitacion` ASC) VISIBLE,
  CONSTRAINT `fk_acompaniante_invitacion1`
    FOREIGN KEY (`id_invitacion`)
    REFERENCES `beemeet`.`invitacion` (`id_invitacion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `beemeet`.`automovil`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `beemeet`.`automovil` (
  `id_automovil` INT NOT NULL,
  `id_invitacion` INT NOT NULL,
  `color_automovil` VARCHAR(100) NOT NULL,
  `matricula_automovil` VARCHAR(100) NOT NULL,
  `marca_automovil` VARCHAR(100) NOT NULL,
  `modelo_automovil` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id_automovil`),
  INDEX `fk_automovil_invitacion1_idx` (`id_invitacion` ASC) VISIBLE,
  CONSTRAINT `fk_automovil_invitacion1`
    FOREIGN KEY (`id_invitacion`)
    REFERENCES `beemeet`.`invitacion` (`id_invitacion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `beemeet`.`colado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `beemeet`.`colado` (
  `id_colado` INT NOT NULL,
  `id_invitado` INT NOT NULL,
  PRIMARY KEY (`id_colado`),
  INDEX `fk_colado_invitado1_idx` (`id_invitado` ASC) VISIBLE,
  CONSTRAINT `fk_colado_invitado1`
    FOREIGN KEY (`id_invitado`)
    REFERENCES `beemeet`.`invitado` (`id_invitado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `beemeet`.`colado_invitado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `beemeet`.`colado_invitado` (
  `id_colado_invitado` INT NOT NULL,
  `id_colado` INT NOT NULL,
  `id_invitado` INT NOT NULL,
  PRIMARY KEY (`id_colado_invitado`),
  INDEX `fk_colado_invitado_colado1_idx` (`id_colado` ASC) VISIBLE,
  INDEX `fk_colado_invitado_invitado1_idx` (`id_invitado` ASC) VISIBLE,
  CONSTRAINT `fk_colado_invitado_colado1`
    FOREIGN KEY (`id_colado`)
    REFERENCES `beemeet`.`colado` (`id_colado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_colado_invitado_invitado1`
    FOREIGN KEY (`id_invitado`)
    REFERENCES `beemeet`.`invitado` (`id_invitado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `beemeet`.`acceso_dispositivo_electronico`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `beemeet`.`acceso_dispositivo_electronico` (
  `id_acceso_dispositivo_electronico` INT NOT NULL,
  `id_acceso` INT NOT NULL,
  `id_dispositivo_electronico` INT NOT NULL,
  `check` TINYINT NOT NULL,
  PRIMARY KEY (`id_acceso_dispositivo_electronico`),
  INDEX `fk_acceso_dispositivo_electronico_acceso1_idx` (`id_acceso` ASC) VISIBLE,
  INDEX `fk_acceso_dispositivo_electronico_dispositivo_electronico1_idx` (`id_dispositivo_electronico` ASC) VISIBLE,
  CONSTRAINT `fk_acceso_dispositivo_electronico_acceso1`
    FOREIGN KEY (`id_acceso`)
    REFERENCES `beemeet`.`acceso` (`id_acceso`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_acceso_dispositivo_electronico_dispositivo_electronico1`
    FOREIGN KEY (`id_dispositivo_electronico`)
    REFERENCES `beemeet`.`dispositivo_electronico` (`id_dispositivo_electronico`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
