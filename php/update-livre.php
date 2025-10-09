<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));
if(isset($data->nom) 
    && isset($data->livre) 
    && isset($data->id) 
	&& !empty(checkInput($data->id)) 
	&& !empty(checkInput($data->nom)) 
    && !empty(checkInput($data->auteur))
    && !empty(checkInput($data->prix)) 
	&& !empty(checkInput($data->page)) 
    && !empty(checkInput($data->desc))
    && !empty(checkInput($data->age)) 
	&& !empty(checkInput($data->type)) 
    && !empty(checkInput($data->livre))
    && !empty(checkInput($data->image)) 
	){
    $nom = mysqli_real_escape_string($db_conn, checkInput($data->nom));
    $auteur = mysqli_real_escape_string($db_conn, checkInput($data->auteur));
    $prix = mysqli_real_escape_string($db_conn, checkInput($data->prix));
    $edition = mysqli_real_escape_string($db_conn, checkInput($data->edition)) || NULL;
    $page = mysqli_real_escape_string($db_conn, checkInput($data->page));
    $desc = mysqli_real_escape_string($db_conn, checkInput($data->desc));
    $age = mysqli_real_escape_string($db_conn, checkInput($data->age));
    $type = mysqli_real_escape_string($db_conn, checkInput($data->type));
    $livre = mysqli_real_escape_string($db_conn, checkInput($data->livre));
    $image = mysqli_real_escape_string($db_conn, checkInput($data->image));
    $id = mysqli_real_escape_string($db_conn, checkInput($data->id));


        $reql = "UPDATE `livre` SET `nomLivre`=$nom,`auteurLivre`=$auteur,`editionLivre`=$edition,`pathLivre`=$livre,`description`=$desc,`prixLivre`=$prix,`ageLecture`=$age,`nbrePage`=$page,`categorie`=$type,`pathImage`=$image WHERE idLivre = $id";
        $updateLivre = mysqli_query($db_conn,$reql);
        if($updateLivre){
            echo json_encode(["success"=>1,"msg"=>"Livre Updated!"]);

        }else{
            echo json_encode(["success"=>0,"msg"=>"Livre Not Updated!"]);
        }
   
}
else{
    echo json_encode(["success"=>0,"msg"=>"Veuillez renseigner tous les champs!"]);
}

  

function checkInput($data) 
{
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}