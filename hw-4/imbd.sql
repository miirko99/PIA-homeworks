-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 31, 2021 at 10:39 PM
-- Server version: 5.7.31
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `imbd`
--

-- --------------------------------------------------------

--
-- Table structure for table `films`
--

DROP TABLE IF EXISTS `films`;
CREATE TABLE IF NOT EXISTS `films` (
  `naslov` varchar(30) NOT NULL,
  `opis` varchar(255) NOT NULL,
  `zanr` json NOT NULL,
  `scenarista` varchar(30) NOT NULL,
  `reziser` varchar(30) NOT NULL,
  `prodKuca` varchar(30) NOT NULL,
  `godina` int(11) NOT NULL,
  `slika` varchar(30) NOT NULL,
  `trajanje` int(11) NOT NULL,
  `glumci` json NOT NULL,
  `filmID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`filmID`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `films`
--

INSERT INTO `films` (`naslov`, `opis`, `zanr`, `scenarista`, `reziser`, `prodKuca`, `godina`, `slika`, `trajanje`, `glumci`, `filmID`) VALUES
('Avengers: Endgame', 'asdfa', '[\"naucna fantastika\", \"akcija\"]', 'Christopher Markus ', ' Anthony Russo', 'Marvel', 2019, 'images/endgame', 180, '[\"Robert Downey Jr\", \" Chris Evans\", \" Mark Ruffalo\"]', 5),
('Gladijator', 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.', '[\"avantura\", \"etika\", \"drama\", \"istorijska fikcija\", \"istorijska\", \"drama\"]', 'Ridley Scott', ' David Franzoni', 'Universal pictures', 2000, 'images/gladijator.jpg', 155, '[\"Joaquin Phoenix\", \"Robert De Niro\", \"Zazie Beetz\", \"Frances Conroy\", \"Brett Cullen\"]', 18),
('Joker', '', '[\"drama\", \"triler\", \"psiholoski triler\"]', 'Todd Phillips', ' Todd Phillips', 'Warner bros', 2019, 'images/joker.jpg', 122, '[\"Joaquin Phoenix\", \"Robert De Niro\", \"Zazie Beetz\", \"Frances Conroy\", \"Brett Cullen\"]', 17);

-- --------------------------------------------------------

--
-- Table structure for table `ocene`
--

DROP TABLE IF EXISTS `ocene`;
CREATE TABLE IF NOT EXISTS `ocene` (
  `ocena` int(11) NOT NULL,
  `userName` varchar(30) NOT NULL,
  `filmID` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ocene`
--

INSERT INTO `ocene` (`ocena`, `userName`, `filmID`) VALUES
(7, 'necaneca', 5),
(7, 'miirko99', 5),
(8, 'necaneca', 10);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `userFirstName` varchar(255) NOT NULL,
  `userLastName` varchar(255) NOT NULL,
  `userEmail` varchar(255) NOT NULL,
  `userPassword` varchar(255) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userFirstName`, `userLastName`, `userEmail`, `userPassword`, `userName`, `isAdmin`) VALUES
('Mirko', 'Petrovic', 'mirkic.kg99@gmail.com', 'mirko999', 'miirko99', 1),
('Nemanja', 'Stefanovic', 'nemanja@gmail.com', '5nemanja5', 'necaneca', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
