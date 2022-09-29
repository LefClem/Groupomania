-- MySQL Script generated by MySQL Workbench
-- Thu Sep 29 16:18:10 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Groupomania
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Groupomania
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Groupomania` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `Groupomania` ;

-- -----------------------------------------------------
-- Table `Groupomania`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Groupomania`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `profile_picture` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 16
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `Groupomania`.`post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Groupomania`.`post` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `text` VARCHAR(255) NULL DEFAULT NULL,
  `image_url` VARCHAR(100) NULL DEFAULT NULL,
  `user_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `Groupomania`.`user` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 79
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `Groupomania`.`like`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Groupomania`.`like` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `postId` INT NOT NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `postId_idx` (`postId` ASC) VISIBLE,
  INDEX `userIdlike_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `postIdlikes`
    FOREIGN KEY (`postId`)
    REFERENCES `Groupomania`.`post` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `userIdlike`
    FOREIGN KEY (`userId`)
    REFERENCES `Groupomania`.`user` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 478
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
