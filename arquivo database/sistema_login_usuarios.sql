-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: sistema_login
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `senha` varchar(255) NOT NULL,
  `imagem` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (2,'Teste','teste@gmail.com','$2b$10$pjXeUeFtueC.osOnX8ji7edOkj1FDuzT1FrKNOHaaUsE7dmq.3h5C',NULL),(3,'teste2','teste2@gmail.com','$2b$10$8g6aiCkJVy6OEZAsK1I0weAs7XL1Ss0fmLevtaFqT8EDl6nEh7nzG',NULL),(4,'Rafael','rafael@gmail.com','$2b$10$9JB9k7S8tXYdEJxsqeV7yuXl5c.cyAL6BGRrDxuUcjIaFG6oGKiwa',NULL),(5,'rafa','teste4@gmail.com','$2b$10$GY1f3HcDI5GdwukgbpUp2uY2e88j1g0175UHl0b078x4/UHC4ztVK',NULL),(6,'testes1','testes1@gmail.com','$2b$10$BuKMEd.pcYq12sMlubloKO6Dnt7F1ruhVbIKXOshBepEWBOs.9E4.',NULL),(7,'teste90','teste90@gmail.com','$2b$10$mZagebm3P8cZng.aQQBhqOnXnBQ1bv57B3qzji0tLPIhbqd2agSWW',NULL),(9,'teste89','teste89@gmail.com','$2b$10$Cw4hdqtbbdo6.QFA0KIUHORx1u6IFnxOAT/nXel6r688hHmLt7NZK',NULL),(10,'RAFA','RAFAELHEDLUND110@GMAIL.COM','$2b$10$ULpX0.oFQe1SjvnuzgdR8uS1LeXwwppuWZbOu2R3zqAG8lMBWMidK',NULL),(12,'','','$2b$10$PWw4ka83UeiuBDHuy58FAOjNVkdtv4jm5FfjrM66wsL.IL4h0mRoG',NULL),(15,'teste09','teste09@gmail.com','$2b$10$ZN.IB3UjtfLtacmC4KypS.UeRCA0sL7tQc1YdBlLuCKhfsVyjKM.u','/uploads/1742054564076_lua.png'),(16,'pedro','pedro@gmail.com','$2b$10$YXDCtqgNhYdvsjvDuajEsuKKlXPZSsADXoNn8ALSnH9ZNDUwob19a',NULL),(17,'rafita','rafita@gmail.com','$2b$10$9vjQr8cMfbDch9.a89IKtuwIad7Zp.f5w1vS2Jv3gCbTjK3CaeZHa',NULL),(18,'teste','teste902@gmail.com','$2b$10$bN4CPHfQf6VzXHW1.jVuRulTbEtCJ4Xcb6z514g3NbgNsdit2I6sy',NULL),(19,'rafael','rafa@gmail.com','$2b$10$u2AKyoTSxzZYY/UxRDMbWeiZhAIYFyJmsGiK7jKtXuzl7sQG5aGkm',NULL),(20,'ewr','emailteste@gmail.com','$2b$10$n/d6Eg28Uxuuw3WdmzeqruMjvp8BC5H5BtCuEXoFu/Z8Z6NeBEmXa',NULL),(21,'ert','ert@gmail.com','$2b$10$Z3w/lDBX6ht8uAWxAbcVy.owG/dIB/n5Pr3IPAzRMCk0DpI8bJXW.',NULL),(22,'s','sistema@gmail.com','$2b$10$Eow9VcAS9rudCB24t57O7uCYOjPjXONp9JV7ozyiEtkKqd2QtGEli',NULL),(25,'rafa','rafael38u8@gmail.com','$2b$10$ZaLHUhd/lkqg7oovAx3Ds.za1yn4mNc6tDDeHE3ZCzRGS2zobqN96',NULL),(26,'rafa','rafsdsdsdsa@gmail.com','$2b$10$RBorhZ/UjY4dXuyrnxmj9.NQ6au5F3z/dTCoH/vuaU66.QnpRVTRa',NULL),(27,'rafa','rafaelhedlunh@gmail.com','$2b$10$k02PNihzWBdxAssYf/llgufxAY9idl8qy2OILbnCuwfIHC4x1xlhi',NULL),(29,'rafael','adfajo@gmail.com','$2b$10$EH.Wl8nSqD/LGt/x8QXPDOGDHKCYoDVpL.b1joWebqKd7/fYXxCa.',NULL),(31,'rafa','rafagooej@gmail.com','$2b$10$JKm0orW8lbBESGxN.X/ohODbuFx8J0GWKxjGdWN7SMcvv45AvPggO',NULL),(32,'tofu','tofu@gmail.com','$2b$10$FOjYg71g69Ywt9j.NNiqk.L/PSuNBGw1WqFnZMXEP7YtOP5b6qgzK',NULL),(33,'wd','wwdwd@gmail.com','$2b$10$tBtj5kd6EnG5374T2IG1pO44RGz/EfcP6S/MGtqqgbNJSs3mLpnY6',NULL),(35,'rafa','rhgraoj@gmail.com','$2b$10$tpp2MeL4C3DYc2TS1h00suLrAO6N7DbV3735ZXeO2xalxRhuK7EsK',NULL),(36,'afehieuah','uheiufhes@gmail.com','$2b$10$13rwuAF8RhWy7tim3cUoR.cQlL7IQP3fSqiQnyzNlVM5exGy0ve1C',NULL),(37,'ijoij','ehwlsjiu@gmail.com','$2b$10$3nmzgwxgTQSV6aPwb91iIOYq1UeX/ope7nZCeJnPs2R7Zdm.1f3We',NULL),(39,'wdw','waqdawd@gmail.com','$2b$10$FSTTXtf6Lr56llCWm4jFq.G7lM0y2A6h4lignZwm4EIBhAi5LJIs6',NULL),(41,'rafa','eaefakjj@gmail.com','$2b$10$8TJKzkI5fE.ICAMLEmcd0OeWJhqixhT5L9Eu.A.d9j0YprgxHijHK',NULL),(43,'rafa','ghouiolop@gmail.com','$2b$10$2hWjvw26LaVojaFmphWziejvkOMKAbswjPALZxzNhF0LXrgJpTX1C',NULL),(44,'efarf','rafajsk@gmail.com','$2b$10$LAUAWdjyXHemg9kFCvz4D.fI1K2g54hZ3SdUW3SwfZBfaNZplrOhq',NULL),(46,'ekkrkr','ekkrkrkrk@gmail.com','$2b$10$XsYrOKBl7ywyw/wmWYnD6OtWftW/dDyXiHjIeHaGxNnYj3u1UXteq',NULL),(47,'tafa','tafaefkl@gmail.com','$2b$10$SzKPN35F5.vUo8WLOTFKzewmlZDfVr/G5reo1/g7ejKx/M6.nAv1a',NULL),(48,'arkafl','ekdemldkl@gmail.com','$2b$10$RCClzv.pNRAX1uXdJDr2HeNdxfFEcvu1PBDdqIA9RXBFVmUBBMvj2',NULL),(49,'dekdelde','dlekdlkelk@gmail.com','$2b$10$uZboQ0wFdxovK1RZ.mpMG.LN4KY/2VyI8fAFA6TJb2MpA7nRFvGlW',NULL);
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

-- Dump completed on 2025-03-18 22:30:54
