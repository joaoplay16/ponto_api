-- MySQL dump 10.13  Distrib 8.0.35, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: emponto
-- ------------------------------------------------------
-- Server version	8.2.0

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
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20240105223109-create-usuarios.js'),('20240105223228-create-pontos.js'),('20240107132642-add-column-cargo.js'),('20240107134156-add-column-ativo.js'),('20240107233230-add-column-criado_em.js'),('20240108185353-set-column-senha-null.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pontos`
--

DROP TABLE IF EXISTS `pontos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pontos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `data` date NOT NULL,
  `hora_entrada` time NOT NULL,
  `hora_saida` time DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `pontos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=249 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pontos`
--

LOCK TABLES `pontos` WRITE;
/*!40000 ALTER TABLE `pontos` DISABLE KEYS */;
INSERT INTO `pontos` VALUES (158,1,'2023-08-10','09:09:00','12:45:43'),(159,1,'2023-08-10','15:09:00','18:45:43'),(174,1,'2023-07-02','10:33:00','14:50:24'),(175,1,'2023-07-02','16:33:00','18:50:24'),(176,1,'2023-08-24','10:06:00','14:30:16'),(177,1,'2023-08-24','16:06:00','18:30:16'),(178,1,'2023-10-08','08:34:00','12:27:34'),(179,1,'2023-10-08','14:34:00','18:27:34'),(180,1,'2023-09-23','09:51:00','13:45:47'),(181,1,'2023-09-23','15:51:00','18:45:47'),(186,2,'2023-11-16','10:45:00','14:05:50'),(187,2,'2023-11-16','16:45:00','18:05:50'),(188,2,'2023-06-09','08:41:00','12:33:02'),(189,2,'2023-06-09','14:41:00','18:33:02'),(190,1,'2023-07-31','09:30:00','15:52:22'),(191,1,'2023-07-31','15:30:00','18:52:22'),(198,1,'2024-01-03','09:20:00','13:40:57'),(199,1,'2024-01-03','15:20:00','18:40:57'),(200,1,'2024-01-04','08:55:00','13:25:10'),(201,1,'2024-01-04','14:55:00','18:25:10'),(206,1,'2024-01-01','08:34:00','12:54:22'),(207,1,'2024-01-01','14:34:00','18:54:22'),(208,1,'2024-01-02','09:07:00','13:15:37'),(209,1,'2024-01-02','15:07:00','18:15:37'),(214,1,'2024-01-05','08:50:00','13:01:09'),(215,1,'2024-01-05','14:50:00','18:01:09'),(216,1,'2024-01-13','08:10:01','12:00:13'),(217,1,'2024-01-13','14:04:24','17:54:25'),(218,2,'2024-01-13','21:25:33','21:25:42'),(219,2,'2024-01-13','21:26:27','21:51:28'),(220,1,'2024-01-14','08:12:46','16:38:47'),(221,1,'2024-01-14','14:12:35','17:09:14'),(222,3,'2024-01-14','00:09:10','00:09:14'),(223,3,'2024-01-14','00:09:15','09:27:36'),(225,1,'2024-01-15','08:28:33','12:59:35'),(234,1,'2024-01-15','13:01:16','17:01:23'),(235,1,'2024-01-06','13:01:29','17:08:09'),(236,2,'2024-01-19','07:56:19','10:56:25'),(237,1,'2024-01-19','08:08:00','11:31:09'),(238,2,'2023-08-10','15:09:00','18:45:43'),(239,2,'2023-08-10','15:09:00','18:45:43'),(240,3,'2024-01-15','08:01:29','12:08:09'),(241,3,'2024-01-15','13:01:29','17:08:09'),(242,4,'2024-01-15','08:01:29','12:08:09'),(243,4,'2024-01-15','13:01:29','17:08:09'),(244,9,'2024-01-14','08:01:29','12:08:09'),(245,9,'2024-01-14','14:01:29','18:08:09'),(246,3,'2023-09-23','07:51:00','12:17:47'),(247,3,'2023-09-23','14:25:00','18:45:47');
/*!40000 ALTER TABLE `pontos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(60) NOT NULL,
  `cargo` varchar(30) NOT NULL DEFAULT 'colaborador',
  `nome_de_usuario` varchar(30) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) DEFAULT NULL,
  `celular` varchar(11) NOT NULL,
  `criado_em` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `e_admin` int DEFAULT '0',
  `ativo` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `nome_de_usuario` (`nome_de_usuario`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Meliodas','gestor','meliodas','meliodas@gmail.com','$2b$10$fXI4K14QE4/MWDG./qJTwug5rneoYBmdYDFJr05zHLu.PCTA3tfHe','99982244287','2024-01-07 21:46:09',0,1),(2,'Lucas Melo','colaborador','lucasmelo','lucasmelo123@gmail.com','$2b$10$trLqaswevqEXbPFIByOzJeuO1vGgfTWFcSfXTTpEeVfzp2w5hGKD2','99982524585','2024-01-08 15:58:09',0,1),(3,'Vitor Tales','colaborador','vitals','vitals@gmail.com','$2b$10$7gjizfPzgrmLdtpC5ugAIe8RWh84o5c2ZXqsw8zoxWmR4/XLdZZWa','99845215478','2024-01-15 05:38:54',0,1),(4,'Raul Dantas','gestor','radantas','radantas@mail.com','$2b$10$jtV1//0mBOTBeVj5fMLv0ehQ4hmS9lSsM72MZEyfIfd5DJpPT75Va','99982244287','2022-03-14 05:56:49',1,1),(5,'João Pedro','gestor','joaoplay','joaoplay16@gmail.com','$2b$10$En.2gRZj/h2StBGxWzPo5O5/4FSWLYRRp9MF.KbgLtkAP1d2Smf.6','99991478545','2024-01-05 10:00:47',1,1),(9,'Fernanda Santos','colaborador','nandanda','nandanda@protonmail.com','$2b$10$tnW1bPynR4n41/rq1Dcoqe5sVvmtzykrlifN6oONV.FZLljZkDAT2','98982545263','2024-01-15 12:41:16',0,1),(69,'Augusto Almeida','colaborador','algusto','algusto@hotmail.com','$2b$10$tnW1bPynR4n41/rq1Dcoqe5sVvmtzykrlifN6oONV.FZLljZkDAT2','98982545263','2024-01-15 12:41:16',0,0),(70,'Camila Ferraz','colaborador','cmilraz','cmilraz@uol.com','$2b$10$tnW1bPynR4n41/rq1Dcoqe5sVvmtzykrlifN6oONV.FZLljZkDAT2','98982582132','2024-01-15 12:41:16',0,1),(71,'Aline Vieira','gestor','alinevieira','alinesvier@protonmail.com','$2b$10$tnW1bPynR4n41/rq1Dcoqe5sVvmtzykrlifN6oONV.FZLljZkDAT2','98982545263','2024-01-15 12:41:16',0,1),(72,'Valecia Vante','colaborador','valeciate','valeciate@outlook.com','$2b$10$tnW1bPynR4n41/rq1Dcoqe5sVvmtzykrlifN6oONV.FZLljZkDAT2','98982541256','2024-01-15 12:41:16',0,1),(73,'Mildes Morales','colaborador','mildes34','mildes34@bol.com','$2b$10$tnW1bPynR4n41/rq1Dcoqe5sVvmtzykrlifN6oONV.FZLljZkDAT2','98981545563','2024-01-15 12:41:16',0,1),(74,'Cojaque Lin','colaborador','cojaqlin','cojaqlin@yandex.com','$2b$10$tnW1bPynR4n41/rq1Dcoqe5sVvmtzykrlifN6oONV.FZLljZkDAT2','98981447265','2024-01-15 12:41:16',0,1),(75,'Junior','colaborador','junior','lambdaresult@protonmail.com','$2b$10$aa3YHdQD2qHgWHmmCCynwuoLI/4ibCw5hYX0lpnPzRQofwbPcIJjK','99981586547','2024-01-19 10:48:55',0,1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-19 13:05:00
