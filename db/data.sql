CREATE DATABASE  IF NOT EXISTS `books` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `books`;
-- MySQL dump 10.13  Distrib 5.6.24, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: books
-- ------------------------------------------------------
-- Server version	5.6.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `book` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `annotation` varchar(255) COLLATE utf8_czech_ci DEFAULT NULL,
  `author` varchar(255) COLLATE utf8_czech_ci DEFAULT NULL,
  `cover` varchar(255) COLLATE utf8_czech_ci DEFAULT NULL,
  `genre` varchar(255) COLLATE utf8_czech_ci DEFAULT NULL,
  `illustrator` varchar(255) COLLATE utf8_czech_ci DEFAULT NULL,
  `isbn` varchar(13) COLLATE utf8_czech_ci NOT NULL,
  `language` varchar(255) COLLATE utf8_czech_ci DEFAULT NULL,
  `number_of_pages` int(11) NOT NULL,
  `original_language` varchar(255) COLLATE utf8_czech_ci DEFAULT NULL,
  `original_title` varchar(255) COLLATE utf8_czech_ci DEFAULT NULL,
  `publisher` varchar(255) COLLATE utf8_czech_ci DEFAULT NULL,
  `subtitle` varchar(255) COLLATE utf8_czech_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8_czech_ci DEFAULT NULL,
  `translator` varchar(255) COLLATE utf8_czech_ci DEFAULT NULL,
  `year_of_publishing` varchar(4) COLLATE utf8_czech_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_ehpdfjpu1jm3hijhj4mm0hx9h` (`isbn`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (1,'2016-01-22 10:36:52','2016-01-22 10:36:52',NULL,NULL,NULL,NULL,NULL,'9781566199094',NULL,0,NULL,NULL,NULL,NULL,'book1',NULL,NULL),(2,'2016-01-22 10:36:53','2016-01-22 10:36:53',NULL,NULL,NULL,NULL,NULL,'9781566189094',NULL,0,NULL,NULL,NULL,NULL,'book2',NULL,NULL),(3,'2016-01-22 10:36:55','2016-01-22 10:36:55',NULL,NULL,NULL,NULL,NULL,'9781576189094',NULL,0,NULL,NULL,NULL,NULL,'book3',NULL,NULL),(54,NULL,NULL,'Děj knihy je zasazen do současné Prahy. Na půdorysu fabulační hříčky s detektivní zápletkou virtuózně rozehrává pestrou škálu stylistických i myšlenkových vtipů, jež autorovi slouží k sarkastickému pojednání českého dneška.','OUŘEDNÍK, Patrik',NULL,'13','','9788072152902','',153,'','','Torst','','AD acta','','2015'),(55,NULL,NULL,'Jako první svazek ediční řady Acta Romana Bohemica vyšla kolektivní monografie, na níž se podílelo 13 odborníků dlouhodobě zpracovávajících prameny italských a vatikánských archivů a knihoven. Kniha podává přehled o vývoji českého bádání, zahájeného roku ','Pánek, Jaroslav a kol.',NULL,'2','','9788072862511','český, resumé v IJ',220,'','','Akademie věd České republiky. Historický ústav','Český historický ústav v Římě (1994-2014) v kontextu českého bádání v Itálii a Vatikánu v 19.-21. století','Ad fontes','','2013'),(56,NULL,NULL,'Katalog výstavy k příležitosti 1150. výročí příchodu Konstantina a Metoděje na území Velké Moravy, zabývající se osudy celé řady jiných věrozvěstů, kteří se vydali na cestu šíření víry.','',NULL,'9','','9788070533000','český',67,'','','Vědecká knihovna v Olomouci','Moravští misionáři v 16.-18. století','Ad gloriam Dei','','2006'),(57,NULL,NULL,'Sborník k 75. narozeninám prof. Bořivoje Srby tvoří příspěvky jedenatřiceti Srbových kolegů, spolupracovníků, žáků a přátel, povětšině divadelníků, ale také literátů a výtvarníků (např. E. Turnovského, M. Hynšta, J. Císaře, I. a P. Osolsoběho, I. Vyskočil','',NULL,'17','','9788086928166','český',366,'','','Janáčkova akademie múzických umění v Brně','','Ad honorem Bořivoj Srba','','2007'),(58,NULL,NULL,'Tento sborník byl vydán u příležitosti nedožitého životního jubilea profesora Josefa Polišenského. Připravila ho Filozofická fakulta Univerzity Palackého za spolupráce přátel Josefa Polišenského.','Barteček, Ivo (editor)',NULL,'2','','9788024416465','',374,'','','Univerzita Palackého v Olomouci','','Ad honorem Josef Polišenský (1915–2001)','','2010'),(59,NULL,NULL,'Monografie se svým zaměřením vrací ke starší tradici studia zemského práva jako klíčového právního okruhu, který rozhodujícím způsobem určoval chod českého státu a jeho společnosti.','Jan, Libor - Janiš, Dalibor a kol.',NULL,'2','','9788086488653','český',300,'','','Matice moravská','Proměny zemského práva v českých zemích ve středověku a raném novověku','Ad iustitiam et bonum commune','','2008');
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_of_user`
--

DROP TABLE IF EXISTS `book_of_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `book_of_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `availability` int(11) NOT NULL,
  `no_of_copies` int(11) NOT NULL,
  `book_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_s44rthj38brosbai5m43i15ga` (`book_id`,`user_id`),
  KEY `FK_bq2fpukwmywim8ly2yv9egag1` (`user_id`),
  CONSTRAINT `FK_bq2fpukwmywim8ly2yv9egag1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_ck96khlf3ibj10n2e2hbd0qb0` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_of_user`
--

LOCK TABLES `book_of_user` WRITE;
/*!40000 ALTER TABLE `book_of_user` DISABLE KEYS */;
INSERT INTO `book_of_user` VALUES (1,'2016-01-22 10:36:57','2016-01-22 10:36:57',1,0,3,1),(2,'2016-01-22 10:36:59','2016-01-22 10:36:59',2,0,1,1),(3,'2016-01-22 10:37:01','2016-01-22 10:37:01',2,0,2,2);
/*!40000 ALTER TABLE `book_of_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `borrowed_book`
--

DROP TABLE IF EXISTS `borrowed_book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `borrowed_book` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `comment` varchar(255) COLLATE utf8_czech_ci DEFAULT NULL,
  `date_borrowed` datetime DEFAULT NULL,
  `date_returned` datetime DEFAULT NULL,
  `returned` bit(1) NOT NULL,
  `book_id` bigint(20) NOT NULL,
  `borrower_id` bigint(20) NOT NULL,
  `owner_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_8ympku070lo178kjv5ncfgkul` (`book_id`),
  KEY `FK_qgwo0f4miwinxrqbflqi6wqqx` (`borrower_id`),
  KEY `FK_a3n54ghh0ly85udpw6alj6plt` (`owner_id`),
  CONSTRAINT `FK_8ympku070lo178kjv5ncfgkul` FOREIGN KEY (`book_id`) REFERENCES `book_of_user` (`id`),
  CONSTRAINT `FK_a3n54ghh0ly85udpw6alj6plt` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_qgwo0f4miwinxrqbflqi6wqqx` FOREIGN KEY (`borrower_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `borrowed_book`
--

LOCK TABLES `borrowed_book` WRITE;
/*!40000 ALTER TABLE `borrowed_book` DISABLE KEYS */;
INSERT INTO `borrowed_book` VALUES (1,'2016-01-22 10:37:22','2016-01-22 10:37:22',NULL,NULL,NULL,'\0',1,2,1),(2,'2016-01-22 10:37:24','2016-01-22 10:37:24','I don\'t know!!!',NULL,NULL,'\0',3,1,2);
/*!40000 ALTER TABLE `borrowed_book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_czech_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8_czech_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_czech_ci DEFAULT NULL,
  `profile_picture` varchar(255) COLLATE utf8_czech_ci DEFAULT NULL,
  `sur_name` varchar(255) COLLATE utf8_czech_ci DEFAULT NULL,
  `telephone` varchar(255) COLLATE utf8_czech_ci DEFAULT NULL,
  `image` longblob,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_ob8kqyqqgmefl0aco34akdtpe` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'2016-01-22 10:36:45','2016-01-22 10:36:45','book1@hot.gr',NULL,'1234',NULL,NULL,NULL,NULL),(2,'2016-01-22 10:36:48','2016-01-22 10:36:48','book2@hot.gr',NULL,'1234',NULL,NULL,NULL,NULL),(3,'2016-01-22 10:36:50','2016-01-22 10:36:50','book3@hot.gr',NULL,'1234',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_friend`
--

DROP TABLE IF EXISTS `user_friend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_friend` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `accepted` bit(1) NOT NULL,
  `approval_date` datetime DEFAULT NULL,
  `follow_friend` int(11) NOT NULL,
  `friend_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_53tmlmfrj1pafhkhddjsng8yf` (`friend_id`,`user_id`),
  KEY `FK_yqo5tjhs5j9v500vx9dsciks` (`user_id`),
  CONSTRAINT `FK_7y4q4hntapssdn8ea963uko0g` FOREIGN KEY (`friend_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_yqo5tjhs5j9v500vx9dsciks` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_friend`
--

LOCK TABLES `user_friend` WRITE;
/*!40000 ALTER TABLE `user_friend` DISABLE KEYS */;
INSERT INTO `user_friend` VALUES (1,'2016-01-22 10:37:03','2016-01-22 10:37:14','','2016-01-22 10:37:14',0,2,1),(2,'2016-01-22 10:37:14','2016-01-22 10:37:14','','2016-01-22 10:37:14',0,1,2),(3,'2016-02-24 15:09:42','2016-02-24 15:09:42','\0',NULL,0,1,3);
/*!40000 ALTER TABLE `user_friend` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-03-07 14:51:39
