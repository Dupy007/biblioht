use biblioht;

-- Inserer adresse
DELIMITER //
CREATE PROCEDURE insertContact(IN n varchar(50),IN e varchar(50),IN p varchar(25),IN s varchar(50),IN m varchar(1024) )
BEGIN
INSERT INTO contact(nomContact,emailContact,phoneContact,subjectContact,messageContact) values(n,e,p,s,m);
END //
DELIMITER ;

-- Inserer adresse
DELIMITER //
CREATE PROCEDURE insertAdresse(IN v varchar(25),IN d varchar(25),IN p varchar(25) )
BEGIN
    INSERT INTO adresse(ville,depart,pays) values(v,d,p);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE  updateAdresse(IN val INT, IN v varchar(25),IN d varchar(25),IN p varchar(25))
BEGIN
    UPDATE adresse SET ville= v,depart = d,pays = p WHERE idAdresse = val;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE  deleteAdresse(IN val INT )
BEGIN
    DELETE FROM adresse WHERE idAdresse = val;
END //
DELIMITER ;

-- Inserer admin
DELIMITER //
CREATE PROCEDURE insertAdmin(IN p varchar(50),IN m varchar(255) )
BEGIN
    INSERT INTO admin(pseudoAdmin,mdpAdmin) values(p,SHA2(m,384));
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE  updateAdmin(IN val INT ,IN p varchar(50),IN m varchar(255) )
BEGIN
    UPDATE admin SET pseudoAdmin= p,mdpAdmin = SHA2(m,384) WHERE idAdmin = val;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE  deleteAdmin(IN val INT )
BEGIN
    DELETE FROM admin WHERE idAdmin = val;
END //
DELIMITER ;

-- Inserer auteur
DELIMITER //
CREATE PROCEDURE  insertAuteur(IN n varchar(25),IN a INT,IN p varchar(25) )
BEGIN
    INSERT INTO auteur(prenomAuteur,nomAuteur,adresse) values(p,n,a);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE  updateAuteur(IN val INT ,IN n varchar(25),IN a INT,IN p varchar(25) )
BEGIN
    UPDATE auteur SET prenomAuteur= p,nomAuteur = n,adresse = a WHERE idAuteur = val;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE  deleteAuteur(IN val INT )
BEGIN
    DELETE FROM auteur WHERE idAuteur = val;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE  panier(IN u int,IN l INT )
BEGIN
    INSERT INTO avoir(idUser,idLivre,panier,avoir,page) values(u,l,true,false,false);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE deletePanier(IN u INT,IN l INT )
BEGIN
    DELETE FROM avoir WHERE idUser = u AND idLivre=l;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE  acheter(IN u int,IN l INT )
BEGIN
    UPDATE avoir SET avoir= true WHERE idUser = u AND idLivre = l;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE  lire(IN u int,IN l INT,IN val INT )
BEGIN
    UPDATE avoir SET page= val WHERE idUser = u AND idLivre = l;
END //
DELIMITER ;

-- Inserer edition
DELIMITER //
CREATE PROCEDURE  insertEdition(IN e varchar(500),IN a INT  )
BEGIN
    INSERT INTO edition(nomEdition,adresse) values(e,a);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE  updateEdition(IN val INT ,IN e varchar(500),IN a INT  )
BEGIN
    UPDATE edition SET nomEditiom= e,adresse = a WHERE idEdition = val;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE  deleteEdition(IN val INT )
BEGIN
    DELETE FROM edition WHERE idEdition = val;
END //
DELIMITER ;

-- Inserer livre
DELIMITER //
CREATE PROCEDURE  insertLivre(IN n varchar(100),IN a INT, IN e INT,IN p varchar(255),IN d varchar(2500),IN px Float,IN ag int,IN nbr int,IN ty varchar(50)  )
BEGIN
    INSERT INTO livre(nomLivre,auteurLivre,editionLivre,pathLivre,description,prixLivre,ageLecture,nbrePage,typeLivre) values(n,a,e,p,d,px,ag,nbr,ty);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE  updateLivre(IN val INT ,IN n varchar(100),IN a INT, IN e INT,IN p varchar(255),IN d varchar(2500),IN px Float   )
BEGIN
    UPDATE livre SET nomLivre= n,auteurLivre=a,editionLivre=e,pathLivre=p,description=d,prixLivre=px WHERE idLivre = val;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE  deleteLivre(IN val INT )
BEGIN
    DELETE FROM livre WHERE idLivre = val;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE  insertUser(IN n varchar(25) ,IN p varchar(25) ,IN e varchar(255) ,IN m varchar(255) , IN b date,IN a INT,IN se varchar(10),IN st varchar(255) )
BEGIN
    INSERT INTO user(prenomUser,nomUser,emailUser,mdpUser,birthUser,adresse,sexeUser,statutUser) values(p,n,e,SHA2(m,384),b,a,se,st);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE  updateUser(IN val INT , IN n varchar(25) ,IN p varchar(25) ,IN e varchar(255) ,IN m varchar(255) , IN b date,IN a INT,IN se varchar(10),IN st varchar(255)  )
BEGIN
    UPDATE user SET prenomUser= p,nomUser=n,emailUser=e,mdpUser=SHA2(m,384),birthUser=b,adresse=a,sexeUser=se,statutUser=st WHERE idUser = val;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE  deleteUser(IN val INT )
BEGIN
    DELETE FROM user WHERE idUser = val;
END //
DELIMITER ;
-- type insertion

DELIMITER //
CREATE PROCEDURE  insertType(IN id int,IN p varchar(25) ,IN e varchar(255) ,IN m varchar(255) ,IN t varchar(50) )
BEGIN
    INSERT INTO typeCpt(idUser,prenomUser,email,mdp,type) values(id,p,e,SHA2(m,384),t);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE  updatetype(IN id int,IN p varchar(25) ,IN e varchar(255) ,IN m varchar(255) ,IN t varchar(50)  )
BEGIN
    UPDATE typeCpt SET prenomUser= p,email=e,mdp=SHA2(m,384),type=t WHERE idUser = id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE  deletetype(IN val INT )
BEGIN
    DELETE FROM typeCpt WHERE idUser = val;
END //
DELIMITER ;


-- Afficher livre
DELIMITER //
CREATE PROCEDURE  afficherLivre()
BEGIN
    SELECT l.idLivre,l.nomLivre,u.nomAuteur,u.prenomAuteur,e.nomEditiom,l.pathLivre,l.description,l.prixLivre FROM auteur AS u,edition as e,livre as l WHERE l.auteur = u.idAuteur AND l.edition = e.idEdition ;
END //
DELIMITER ;

-- Afficher livre
DELIMITER //
CREATE PROCEDURE  afficherMesLivres(IN u INT)
BEGIN
    SELECT l.idLivre,l.nomLivre,u.nomAuteur,u.prenomAuteur,e.nomEditiom,l.pathLivre,l.description,l.prixLivre FROM auteur AS u,edition as e,livre as l,avoir as a WHERE l.auteur = u.idAuteur AND l.edition = e.idEdition AND l.idLivre= a.idLivre AND a.idUser =u AND a.avoir = true;
END //
DELIMITER ;

-- Afficher livre
DELIMITER //
CREATE PROCEDURE  afficherMonPanier(IN u INT)
BEGIN
    SELECT l.idLivre,l.nomLivre,u.nomAuteur,u.prenomAuteur,e.nomEditiom,l.pathLivre,l.description,l.prixLivre FROM auteur AS u,edition as e,livre as l,avoir as a WHERE l.auteur = u.idAuteur AND l.edition = e.idEdition AND l.idLivre= a.idLivre AND a.idUser =u AND a.panier = true;
END //
DELIMITER ;

-- Afficher regime et type
DELIMITER //
CREATE PROCEDURE  rechercheLivre(IN val varchar(255))
BEGIN
    SELECT l.idLivre,l.nomLivre,u.nomAuteur,u.prenomAuteur,e.nomEditiom,l.pathLivre,l.description,l.prixLivre FROM auteur AS u,edition as e,livre as l WHERE l.auteur = u.idAuteur AND l.edition = e.idEdition AND l.nomLivre = val ;
END //
DELIMITER ;

-- Afficher users
DELIMITER //
CREATE PROCEDURE  afficherUser()
BEGIN
    SELECT u.idUser,u.prenomUser,u.nomUser,u.emailUser,u.mdpUser,u.birthUser,a.idAdresse,a.ville,a.depart,a.pays FROM user AS u,adresse as a WHERE a.idAdresse = u.adresse ;
END //
DELIMITER ;

-- Afficher auteur
DELIMITER //
CREATE PROCEDURE  afficherAuteur()
BEGIN
    SELECT u.idAuteur,u.prenomAuteur,u.nomAuteur,a.idAdresse,a.ville,a.depart,a.pays FROM auteur AS u,adresse as a WHERE a.idAdresse = u.adresse ;
END //
DELIMITER ;

-- Afficher edition
DELIMITER //
CREATE PROCEDURE  afficherEdition()
BEGIN
    SELECT e.idEdition,e.nomEdition,a.ville,a.depart,a.pays FROM edition AS e,adresse as a WHERE a.idAdresse = u.adresse ;
END //
DELIMITER ;

-- Afficher edition
DELIMITER //
CREATE PROCEDURE  afficherPage(IN u INT,IN l INT)
BEGIN
    SELECT page FROM avoir WHERE idUser=u AND idLivre=l ;
END //
DELIMITER ;

-- connexion
DELIMITER //
CREATE PROCEDURE  connectUser(IN e INT,IN m INT)
BEGIN
    SELECT idUser,prenom,type FROM typeCpt WHERE emailUser=e AND mdpUser=SHA2(m,384) ;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE  idAdresse()
BEGIN
    SELECT idAdresse as id FROM adresse ORDER By idAdresse desc limit 1 ;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE  idAUteur()
BEGIN
    SELECT idAuteur as id FROM auteur ORDER By idAuteur desc limit 1 ;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE  idUser()
BEGIN
    SELECT idUser as id FROM user ORDER By idUser desc limit 1 ;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE  idLivre()
BEGIN
    SELECT idLivre as id FROM livre ORDER By idLivre desc limit 1 ;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE  idAdmin()
BEGIN
    SELECT idAdmin as id FROM admin ORDER By idAdmin desc limit 1 ;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE  idEdition()
BEGIN
    SELECT idEdition as id FROM edition ORDER By idEdition desc limit 1 ;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE  idContact()
BEGIN
    SELECT idContact as id FROM edition ORDER By idContact desc limit 1 ;
END //
DELIMITER ;