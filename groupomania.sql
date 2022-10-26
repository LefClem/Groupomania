-- MySQL dump 10.13  Distrib 8.0.30, for macos12 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `like`
--

DROP TABLE IF EXISTS `like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `like` (
  `id` int NOT NULL AUTO_INCREMENT,
  `postId` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `postId_idx` (`postId`),
  KEY `userIdlike_idx` (`userId`),
  CONSTRAINT `postIdlikes` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE CASCADE,
  CONSTRAINT `userIdlike` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=902 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like`
--

LOCK TABLES `like` WRITE;
/*!40000 ALTER TABLE `like` DISABLE KEYS */;
INSERT INTO `like` VALUES (601,212,94),(635,212,110),(637,212,113),(886,212,50),(891,212,99),(892,284,16),(896,212,16),(898,287,118),(899,212,118),(900,287,16);
/*!40000 ALTER TABLE `like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `text` varchar(255) DEFAULT NULL,
  `image_url` varchar(100) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=295 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (212,'2022-10-22 22:55:57','2022-10-22 22:55:57','On fait un test de like ici ','http://localhost:3000/images/post/61lCsZbCScS._SL1270_700x.jpg1666472157299.jpeg',50),(256,'2022-10-25 11:32:37','2022-10-25 11:32:37','On test ','',93),(257,'2022-10-25 11:46:01','2022-10-25 21:01:10','C\'est fonctionnel pour le moment !','',93),(258,'2022-10-25 11:57:12','2022-10-25 21:00:55','La modification en admin fonctionne !!!','',93),(284,'2022-10-25 20:48:02','2022-10-25 21:02:25','Si je modifie normalement ça remonte ','http://localhost:3000/images/post/20202-bouteille-de-champagne.jpeg1666724545917.jpeg',99),(287,'2022-10-25 21:24:47','2022-10-26 12:27:00','Comment allez-vous ?','',16),(292,'2022-10-26 02:53:20','2022-10-26 02:53:35','Ce projet est officiellement terminé !','http://localhost:3000/images/post/20202-bouteille-de-champagne.jpeg1666745615423.jpeg',118),(293,'2022-10-26 12:33:02','2022-10-26 12:33:02','On va manger ? J\'ai faim !','',16);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `profile_picture` varchar(100) DEFAULT NULL,
  `admin` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (16,'Clément','clem@mail.com','$2b$10$.qx8.2yN1429jR.oaT8QLO5JfCaZwoxvbBMyIj6aeKvcJo/vfOLt2','http://localhost:3000/images/profile/IMG-0289.JPG1666367332005.jpeg',0),(17,'Joanne','jo@mail.com','$2b$10$BvCWdYV1CJf7dZMgAVW3T.m801h0vYiO7TArLFrPQufo/w03dkw2i',NULL,0),(19,'hina','hina@mail.com','$2b$10$LpluDy.gkdHdUL6EXMUP7.L0Sp6rKVEJ3TA5uK4/MGy8LJY0CBvG2',NULL,0),(48,'clem','clement@mail.com','$2b$10$qpO4OrK.jFlsfuBv5B78eu8Qom8lLioH7DbYwqE07kmWz2tQQTuP2','http://localhost:3000/images/profile/61lCsZbCScS._SL1270_700x.jpg1664893621756.jpeg',0),(50,'sora','sora@mail.com','$2b$10$dJbCX7v41MaUsw2Bz6dMN.CTgllKWrQjk8z/TsoLX1GDS2haB3kYi','http://localhost:3000/images/profile/IMG-20210508-WA0047.jpg1666233536354.jpeg',0),(52,'Sora','sora2@mail.com','$2b$10$uFYjDbqad6zq/DW/d/i0y.qFSG0cVpk58UKEJUMJ49TCMyonOHyEu',NULL,0),(53,'patroche','patroche@mail.com','$2b$10$re/5LGjXSlyJ/JE5M.XJeemEw8/hVv490XkHQgEQOMKDiGy5vP6qG','http://localhost:3000/images/profile/61lCsZbCScS._SL1270_700x.jpg1664911341752.jpeg',0),(54,'Michel','michel@mail.com','$2b$10$CZpOKs9AXpKdG3i8ujloi.QUe0muboQPXHb6fyP6uDinpE6D/pXUS','http://localhost:3000/images/profile/0005700000366_1-B.jpg1664911730973.jpeg',0),(56,'jeff','jeff@mail.com','$2b$10$Nc8WXkv8Arufgtih3tqGxOlfJlGKOFNl5AHL8w1Z2N8RchShzWZYu','http://localhost:3000/images/profile/61lCsZbCScS._SL1270_700x.jpg1664911885087.jpeg',0),(57,'Marc','marc@mail.com','$2b$10$pydu5aJ6BRljcsMalJjZDuRyAEQZ5xJWgKghAGusn8oUQFFcN8HYK','http://localhost:3000/images/profile/61lCsZbCScS._SL1270_700x.jpg1664949391868.jpeg',0),(58,'Poule','poule@mail.com','$2b$10$q5dqM/lIoZ/qDqc3nDgh2Ov10IrLiQxNG49ZUZ..xs1bA1vNb3ipi','http://localhost:3000/images/profile/0005700000366_1-B.jpg1664967460326.jpeg',0),(93,'Kiwi','kiwi@mail.com','$2b$10$zkCQggMxhKvObcBX9FQ3k./4cFVF1tFiguk9qQZZMkqqQyAvgGhs6','http://localhost:3000/images/profile/61lCsZbCScS._SL1270_700x.jpg1665017062168.jpeg',0),(94,'Kawa','kawa@mail.com','$2b$10$/a2S4yySfIyJjqYrGHJAM.ztMhutAZnBKx887F/acFli9EAD65Eye','http://localhost:3000/images/profile/B42078FC-7338-4C6E-A96E-46419BF32C68.jpeg1666477066112.jpeg',0),(98,'True','clem@gmail.com','$2b$10$buurztLEviWSWEIRzfnqs.naUpcic5c0qLmFzo3i.RXVvE735Dl66','',0),(99,'Yarn','kaw@mail.com','$2b$10$c2Z55iN3soGIOWjnWs0Xr.iasMCnAsuq65mMEagD.5/fBDIH/eHru','http://localhost:3000/images/profile/20202-bouteille-de-champagne.jpeg1666723805981.jpeg',0),(100,'Youri','youri@mail.com','$2b$10$CfUZFXNTtKQsuwwJMrcbKOlqxLL37uhmS0FYCmoowXahL5u8cyeUm','http://localhost:3000/images/profile/61lCsZbCScS._SL1270_700x.jpg1665095035888.jpeg',0),(105,'Joe','joe@mail.com','$2b$10$b53pZEz4kUSnJ0C4TuXQfeHnJP0OaZv3UAWZlE8auheoHYtdOLGM.','',0),(106,'Jules','jules@mail.com','$2b$10$Pfe1V0dIQ7BLI.WxTfZY7.sKO6kdj5dTan.0xH2niypv46coI6oIy','',0),(110,'Tentative','tentative@mail.com','$2b$10$/lNjybLatOQMDrwj8IW0yeHVfAQKOdDMwrTTDxNK3Rgi.cQza1vHG','',0),(113,'Jean','jean@mail.com','$2b$10$aALKiSGofaTyrJaPdmBrjOKdqLvp7OS35P72Si7XVjS2LIYTX7r8y','http://localhost:3000/images/profile/B5F160A1-D352-49D3-B643-B0F5EB11DAC1.jpeg1666536656050.jpeg',0),(117,'Moderateur','admin@mail.com','$2b$10$Znph5IzeRoS3/m3JrBYj7uGIDaOviiDeDwvYIo5kWTz3mhhssxzA6','http://localhost:3000/images/profile/Content-Moderation-V2.jpeg1666620474260.jpeg',1),(118,'OnTest Mode','ontest@mail.com','$2b$10$mBILcd9Bw16qXemAOd2npepbKbAMo9mcwfVsUkWDuWNcUQwX6TtOK','http://localhost:3000/images/profile/6B50ED58-9E46-4E5D-B79C-E97526F94CFF.jpeg1666745561882.jpeg',0),(119,'Mario','mario@mail.com','$2b$10$ARo6kl4VeoPEvgKaBSZdI.c5IdVGeOCQFaNfrVknACjxQQiS6RwlO','http://localhost:3000/images/profile/20202-bouteille-de-champagne.jpeg1666780704377.jpeg',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-26 14:27:26
