<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';
$data = json_decode(file_get_contents("php://input"));

if(isset($data->cle) 
  && !empty(checkInput($data->cle)))
   {
    $cle = mysqli_real_escape_string($db_conn, checkInput($data->cle));
$req = "SELECT * FROM livre , auteur , edition WHERE auteur.idAuteur = livre.auteurLivre AND livre.editionLivre = edition.idEdition AND livre.nomLivre LIKE %$cle% OR auteur.nomAuteur LIKE %$cle% OR auteur.prenomnomAuteur LIKE %$cle% OR livre.categorie LIKE %$cle% ";
$allLivre = mysqli_query($db_conn,$req);
if(mysqli_num_rows($allLivre) > 0){
    $all_livre = mysqli_fetch_all($allLivre,MYSQLI_ASSOC);
    echo json_encode(["success"=>1,"livre"=>$all_livre]);
}
else{
    echo json_encode(["success"=>0]);
}
  }

function checkInput($data) 
{
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}