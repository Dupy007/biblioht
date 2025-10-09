<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';
$req = "SELECT `idLivre`, `nomLivre`, `auteurLivre`, `editionLivre`, `pathLivre`, `description`, `prixLivre`, `ageLecture`, `nbrePage`, `categorie`, `pathImage`,'auteur.prenomAuteur','auteur.nomAuteur' FROM `livre`,'auteur' ";
$alllivres = mysqli_query($db_conn,$req);
if( mysqli_num_rows($alllivres) > 0 ){
    $all_livres = mysqli_fetch_all($alllivres,MYSQLI_ASSOC);
    echo json_encode(["success"=>1,"livres"=>$all_livres]);
}
else{
    echo json_encode(["success"=>0]);
}