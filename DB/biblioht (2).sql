-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  mer. 17 juin 2020 à 15:30
-- Version du serveur :  10.1.26-MariaDB
-- Version de PHP :  7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `biblioht`
--

DELIMITER $$
--
-- Procédures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `acheter` (IN `u` INT, IN `l` INT)  BEGIN
    UPDATE avoir SET avoir= true WHERE idUser = u AND idLivre = l;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `afficherAuteur` ()  BEGIN
    SELECT u.idAuteur,u.prenomAuteur,u.nomAuteur,a.idAdresse,a.ville,a.depart,a.pays FROM auteur AS u,adresse as a WHERE a.idAdresse = u.adresse ;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `afficherEdition` ()  BEGIN
    SELECT e.idEdition,e.nomEdition,a.ville,a.depart,a.pays FROM edition AS e,adresse as a WHERE a.idAdresse = u.adresse ;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `afficherLivre` ()  BEGIN
    SELECT l.idLivre,l.nomLivre,u.nomAuteur,u.prenomAuteur,e.nomEditiom,l.pathLivre,l.description,l.prixLivre FROM auteur AS u,edition as e,livre as l WHERE l.auteur = u.idAuteur AND l.edition = e.idEdition ;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `afficherMesLivres` (IN `u` INT)  BEGIN
    SELECT l.idLivre,l.nomLivre,u.nomAuteur,u.prenomAuteur,e.nomEditiom,l.pathLivre,l.description,l.prixLivre FROM auteur AS u,edition as e,livre as l,avoir as a WHERE l.auteur = u.idAuteur AND l.edition = e.idEdition AND l.idLivre= a.idLivre AND a.idUser =u AND a.avoir = true;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `afficherMonPanier` (IN `u` INT)  BEGIN
    SELECT l.idLivre,l.nomLivre,u.nomAuteur,u.prenomAuteur,e.nomEditiom,l.pathLivre,l.description,l.prixLivre FROM auteur AS u,edition as e,livre as l,avoir as a WHERE l.auteur = u.idAuteur AND l.edition = e.idEdition AND l.idLivre= a.idLivre AND a.idUser =u AND a.panier = true;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `afficherPage` (IN `u` INT, IN `l` INT)  BEGIN
    SELECT page FROM avoir WHERE idUser=u AND idLivre=l ;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `afficherUser` ()  BEGIN
    SELECT u.idUser,u.prenomUser,u.nomUser,u.emailUser,u.mdpUser,u.birthUser,a.idAdresse,a.ville,a.depart,a.pays FROM user AS u,adresse as a WHERE a.idAdresse = u.adresse ;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `connectUser` (IN `e` INT, IN `m` INT)  BEGIN
    SELECT idUser,prenom,type FROM typeCpt WHERE emailUser=e AND mdpUser=SHA2(m,384) ;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteAdmin` (IN `val` INT)  BEGIN
    DELETE FROM admin WHERE idAdmin = val;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteAdresse` (IN `val` INT)  BEGIN
    DELETE FROM adresse WHERE idAdresse = val;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteAuteur` (IN `val` INT)  BEGIN
    DELETE FROM auteur WHERE idAuteur = val;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteEdition` (IN `val` INT)  BEGIN
    DELETE FROM edition WHERE idEdition = val;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteLivre` (IN `val` INT)  BEGIN
    DELETE FROM livre WHERE idLivre = val;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deletePanier` (IN `u` INT, IN `l` INT)  BEGIN
    DELETE FROM avoir WHERE idUser = u AND idLivre=l;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deletetype` (IN `val` INT)  BEGIN
    DELETE FROM typeCpt WHERE idUser = val;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteUser` (IN `val` INT)  BEGIN
    DELETE FROM users WHERE idUser = val;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `idAdmin` ()  BEGIN
    SELECT idAdmin as id FROM admin ORDER By idAdmin desc limit 1 ;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `idAdresse` ()  BEGIN
    SELECT idAdresse as id FROM adresse ORDER By idAdresse desc limit 1 ;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `idAUteur` ()  BEGIN
    SELECT idAuteur as id FROM auteur ORDER By idAuteur desc limit 1 ;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `idContact` ()  BEGIN
    SELECT idContact as id FROM edition ORDER By idContact desc limit 1 ;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `idEdition` ()  BEGIN
    SELECT idEdition as id FROM edition ORDER By idEdition desc limit 1 ;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `idLivre` ()  BEGIN
    SELECT idLivre as id FROM livre ORDER By idLivre desc limit 1 ;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `idUser` ()  BEGIN
    SELECT idUser as id FROM users ORDER By idUser desc limit 1 ;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insertAdmin` (IN `p` VARCHAR(50), IN `m` VARCHAR(255))  BEGIN
    INSERT INTO admin(pseudoAdmin,mdpAdmin) values(p,SHA2(m,384));
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insertAdresse` (IN `v` VARCHAR(25), IN `d` VARCHAR(25), IN `p` VARCHAR(25))  BEGIN
    insert into adresse(ville,depart,pays) values(v,d,p);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insertAuteur` (IN `n` VARCHAR(25), IN `a` INT, IN `p` VARCHAR(25))  BEGIN
    INSERT INTO auteur(prenomAuteur,nomAuteur,adresse) values(p,n,a);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insertContact` (IN `n` VARCHAR(50), IN `e` VARCHAR(50), IN `p` VARCHAR(25), IN `s` VARCHAR(50), IN `m` VARCHAR(1024))  BEGIN
INSERT INTO contact(nomContact,emailContact,phoneContact,subjectContact,messageContact) values(n,e,p,s,m);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insertEdition` (IN `e` VARCHAR(500), IN `a` INT)  BEGIN
    INSERT INTO edition(nomEditiom,adresse) values(e,a);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insertLivre` (IN `n` VARCHAR(100), IN `a` INT, IN `e` INT, IN `p` VARCHAR(255), IN `d` VARCHAR(2500), IN `px` FLOAT, IN `ag` INT, IN `nbr` INT, IN `ty` VARCHAR(50))  BEGIN
    INSERT INTO livre(nomLivre,auteurLivre,editionLivre,pathLivre,description,prixLivre,ageLecture,nbrePage,typeLivre) values(n,a,e,p,d,px,ag,nbr,ty);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insertType` (IN `id` INT, IN `p` VARCHAR(25), IN `e` VARCHAR(255), IN `m` VARCHAR(255), IN `t` VARCHAR(50))  BEGIN
    INSERT INTO typeCpt(idUser,prenomUser,email,mdp,type) values(id,p,e,SHA2(m,384),t);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insertUser` (IN `n` VARCHAR(25), IN `p` VARCHAR(25), IN `e` VARCHAR(255), IN `m` VARCHAR(255), IN `b` DATE, IN `a` INT, IN `se` VARCHAR(10), IN `st` VARCHAR(255))  BEGIN
    INSERT INTO users(prenomUser,nomUser,emailUser,mdpUser,birthUser,adresse,sexeUser,statutUser) values(p,n,e,SHA2(m,384),b,a,se,st);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `lire` (IN `u` INT, IN `l` INT, IN `val` INT)  BEGIN
    UPDATE avoir SET page= val WHERE idUser = u AND idLivre = l;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `panier` (IN `u` INT, IN `l` INT)  BEGIN
    INSERT INTO avoir(idUser,idLivre,panier,avoir,page) values(u,l,true,false,false);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `rechercheLivre` (IN `val` VARCHAR(255))  BEGIN
    SELECT l.idLivre,l.nomLivre,u.nomAuteur,u.prenomAuteur,e.nomEditiom,l.pathLivre,l.description,l.prixLivre FROM auteur AS u,edition as e,livre as l WHERE l.auteur = u.idAuteur AND l.edition = e.idEdition AND l.nomLivre = val ;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateAdmin` (IN `val` INT, IN `p` VARCHAR(50), IN `m` VARCHAR(255))  BEGIN
    UPDATE admin SET pseudoAdmin= p,mdpAdmin = SHA2(m,384) WHERE idAdmin = val;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateAdresse` (IN `val` INT, IN `v` VARCHAR(25), IN `d` VARCHAR(25), IN `p` VARCHAR(25))  BEGIN
    UPDATE adresse SET ville= v,depart = d,pays = p WHERE idAdresse = val;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateAuteur` (IN `val` INT, IN `n` VARCHAR(25), IN `a` INT, IN `p` VARCHAR(25))  BEGIN
    UPDATE auteur SET prenomAuteur= p,nomAuteur = n,adresse = a WHERE idAuteur = val;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateEdition` (IN `val` INT, IN `e` VARCHAR(500), IN `a` INT)  BEGIN
    UPDATE edition SET nomEditiom= e,adresse = a WHERE idEdition = val;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateLivre` (IN `val` INT, IN `n` VARCHAR(100), IN `a` INT, IN `e` INT, IN `p` VARCHAR(255), IN `d` VARCHAR(2500), IN `px` FLOAT)  BEGIN
    UPDATE livre SET nomLivre= n,auteurLivre=a,editionLivre=e,pathLivre=p,description=d,prixLivre=px WHERE idLivre = val;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updatetype` (IN `id` INT, IN `p` VARCHAR(25), IN `e` VARCHAR(255), IN `m` VARCHAR(255), IN `t` VARCHAR(50))  BEGIN
    UPDATE typeCpt SET prenomUser= p,email=e,mdp=SHA2(m,384),type=t WHERE idUser = id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateUser` (IN `val` INT, IN `n` VARCHAR(25), IN `p` VARCHAR(25), IN `e` VARCHAR(255), IN `m` VARCHAR(255), IN `b` DATE, IN `a` INT, IN `se` VARCHAR(10), IN `st` VARCHAR(255))  BEGIN
    UPDATE users SET prenomUser= p,nomUser=n,emailUser=e,mdpUser=SHA2(m,384),birthUser=b,adresse=a,sexeUser=se,statutUser=st WHERE idUser = val;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

CREATE TABLE `admin` (
  `idAdmin` int(11) NOT NULL,
  `pseudoAdmin` varchar(45) NOT NULL,
  `mdpAdmin` varchar(255) NOT NULL,
  `emailAdmin` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `admin`
--

INSERT INTO `admin` (`idAdmin`, `pseudoAdmin`, `mdpAdmin`, `emailAdmin`) VALUES
(1, 'admin', 'admin', 'admin@biblioht.ht');

-- --------------------------------------------------------

--
-- Structure de la table `adresse`
--

CREATE TABLE `adresse` (
  `idAdresse` int(11) NOT NULL,
  `ville` varchar(45) NOT NULL,
  `depart` varchar(45) NOT NULL,
  `pays` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `adresse`
--

INSERT INTO `adresse` (`idAdresse`, `ville`, `depart`, `pays`) VALUES
(1, 'Cap-haitien', 'Nord', 'Haiti'),
(2, 'Cap-haitien', 'Nord', 'Haiti'),
(3, 'Delmas', 'Ouest', 'Haiti'),
(4, 'Delmas', 'Ouest', 'Haiti');

-- --------------------------------------------------------

--
-- Structure de la table `auteur`
--

CREATE TABLE `auteur` (
  `prenomAuteur` varchar(45) NOT NULL,
  `nomAuteur` varchar(45) NOT NULL,
  `adresse` int(11) NOT NULL,
  `idAuteur` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `auteur`
--

INSERT INTO `auteur` (`prenomAuteur`, `nomAuteur`, `adresse`, `idAuteur`) VALUES
('Hebram Chery', 'Karl', 2, 1);

-- --------------------------------------------------------

--
-- Structure de la table `avoir`
--

CREATE TABLE `avoir` (
  `idUser` int(11) NOT NULL,
  `idLivre` int(11) NOT NULL,
  `panier` tinyint(4) NOT NULL DEFAULT '0',
  `avoir` tinyint(4) DEFAULT '0',
  `page` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `commentaire`
--

CREATE TABLE `commentaire` (
  `idcommentaire` int(11) NOT NULL,
  `commentaireaire` text NOT NULL,
  `idLivre` int(11) NOT NULL,
  `idUser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `contact`
--

CREATE TABLE `contact` (
  `idContact` int(11) NOT NULL,
  `nomContact` varchar(50) NOT NULL,
  `emailContact` varchar(50) NOT NULL,
  `phoneContact` varchar(20) DEFAULT NULL,
  `subjectContact` varchar(255) NOT NULL,
  `messageContact` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `edition`
--

CREATE TABLE `edition` (
  `idEdition` int(11) NOT NULL,
  `nomEdition` varchar(45) NOT NULL,
  `adresse` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `edition`
--

INSERT INTO `edition` (`idEdition`, `nomEdition`, `adresse`) VALUES
(1, 'Henri Deschamps', 3);

-- --------------------------------------------------------

--
-- Structure de la table `livre`
--

CREATE TABLE `livre` (
  `idLivre` int(11) NOT NULL,
  `nomLivre` varchar(45) NOT NULL,
  `auteurLivre` int(11) NOT NULL,
  `editionLivre` int(11) DEFAULT NULL,
  `pathLivre` varchar(255) NOT NULL,
  `description` text,
  `prixLivre` int(11) NOT NULL,
  `ageLecture` int(11) NOT NULL,
  `nbrePage` int(11) NOT NULL,
  `categorie` varchar(45) NOT NULL,
  `pathImage` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `livre`
--

INSERT INTO `livre` (`idLivre`, `nomLivre`, `auteurLivre`, `editionLivre`, `pathLivre`, `description`, `prixLivre`, `ageLecture`, `nbrePage`, `categorie`, `pathImage`) VALUES
(1, 'Api', 1, 1, '../data/RestAPI_MonCashSDK_doc_Nodejs.pdf', 'testing', 750, 3, 18, 'roman', 'ipv6-t.jpg'),
(2, 'test', 1, 1, '../data/dlscrib.com_98-367-instructor-guide.en.fr.pdf', 'ceci est un test', 100, 12, 78, 'roman', '1 (7).jpg');

-- --------------------------------------------------------

--
-- Structure de la table `typecpt`
--

CREATE TABLE `typecpt` (
  `idUser` int(11) NOT NULL,
  `prenom` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `mdp` varchar(255) NOT NULL,
  `typeC` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `typecpt`
--

INSERT INTO `typecpt` (`idUser`, `prenom`, `email`, `mdp`, `typeC`) VALUES
(1, 'Fils', 'dupfils@gmail.com', 'rootadmin', NULL),
(2, 'Benson', 'pierrebenson@gmail.com', 'password', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `idUser` int(11) NOT NULL,
  `nomUser` varchar(45) NOT NULL,
  `prenomUser` varchar(45) NOT NULL,
  `emailUser` varchar(45) NOT NULL,
  `mdpUser` varchar(255) NOT NULL,
  `birthUser` date DEFAULT NULL,
  `adresse` int(11) NOT NULL,
  `sexeUser` varchar(10) NOT NULL,
  `statutUser` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`idUser`, `nomUser`, `prenomUser`, `emailUser`, `mdpUser`, `birthUser`, `adresse`, `sexeUser`, `statutUser`, `phone`) VALUES
(1, 'Dup', 'Fils', 'dupfils@gmail.com', 'rootadmin', '2001-01-01', 1, 'Male', 'Professionnel', '+50944091640'),
(2, 'Pierre', 'Benson', 'pierrebenson@gmail.com', 'password', '2012-12-12', 4, 'Male', 'Etudiant', '+50935555159');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`idAdmin`);

--
-- Index pour la table `adresse`
--
ALTER TABLE `adresse`
  ADD PRIMARY KEY (`idAdresse`);

--
-- Index pour la table `auteur`
--
ALTER TABLE `auteur`
  ADD PRIMARY KEY (`idAuteur`),
  ADD KEY `fk_adresse_1` (`adresse`);

--
-- Index pour la table `avoir`
--
ALTER TABLE `avoir`
  ADD KEY `fk_avoir_1` (`idLivre`),
  ADD KEY `fk_avoir_2` (`idUser`);

--
-- Index pour la table `commentaire`
--
ALTER TABLE `commentaire`
  ADD PRIMARY KEY (`idcommentaire`),
  ADD KEY `commentaire_ibfk_1` (`idUser`);

--
-- Index pour la table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`idContact`);

--
-- Index pour la table `edition`
--
ALTER TABLE `edition`
  ADD PRIMARY KEY (`idEdition`),
  ADD KEY `fk_adresse_2` (`adresse`);

--
-- Index pour la table `livre`
--
ALTER TABLE `livre`
  ADD PRIMARY KEY (`idLivre`),
  ADD KEY `fk_auteur_1` (`auteurLivre`),
  ADD KEY `fk_edition_2` (`editionLivre`);

--
-- Index pour la table `typecpt`
--
ALTER TABLE `typecpt`
  ADD KEY `typecpt_ibfk_1` (`idUser`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUser`),
  ADD KEY `fk_adresse_3` (`adresse`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `admin`
--
ALTER TABLE `admin`
  MODIFY `idAdmin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `adresse`
--
ALTER TABLE `adresse`
  MODIFY `idAdresse` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT pour la table `auteur`
--
ALTER TABLE `auteur`
  MODIFY `idAuteur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `commentaire`
--
ALTER TABLE `commentaire`
  MODIFY `idcommentaire` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `contact`
--
ALTER TABLE `contact`
  MODIFY `idContact` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `edition`
--
ALTER TABLE `edition`
  MODIFY `idEdition` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `livre`
--
ALTER TABLE `livre`
  MODIFY `idLivre` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `auteur`
--
ALTER TABLE `auteur`
  ADD CONSTRAINT `fk_adresse_1` FOREIGN KEY (`adresse`) REFERENCES `adresse` (`idAdresse`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `avoir`
--
ALTER TABLE `avoir`
  ADD CONSTRAINT `fk_avoir_1` FOREIGN KEY (`idLivre`) REFERENCES `livre` (`idLivre`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_avoir_2` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `commentaire`
--
ALTER TABLE `commentaire`
  ADD CONSTRAINT `commentaire_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `edition`
--
ALTER TABLE `edition`
  ADD CONSTRAINT `fk_adresse_2` FOREIGN KEY (`adresse`) REFERENCES `adresse` (`idAdresse`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `livre`
--
ALTER TABLE `livre`
  ADD CONSTRAINT `fk_auteur_1` FOREIGN KEY (`auteurLivre`) REFERENCES `auteur` (`idAuteur`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_edition_2` FOREIGN KEY (`editionLivre`) REFERENCES `edition` (`idEdition`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `typecpt`
--
ALTER TABLE `typecpt`
  ADD CONSTRAINT `typecpt_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_adresse_3` FOREIGN KEY (`adresse`) REFERENCES `adresse` (`idAdresse`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
