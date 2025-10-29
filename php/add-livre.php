<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

// POST DATA
$data = json_decode(file_get_contents("php://input"));

if(isset($data->nom) 
    && isset($data->livre) 
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

    
        $req = "INSERT INTO livre( nomLivre, auteurLivre, editionLivre, pathLivre, description, prixLivre, ageLecture, nbrePage, categorie,pathImage)
                VALUES ('$nom','$auteur','$edition','$livre','$desc','$prix','$age','$page','$type','$image' ) ";
            
        $insertUser = mysqli_query($db_conn,$req);

        if($insertUser){
            $last_id = mysqli_insert_id($db_conn);
            echo json_encode(["success"=>1,"msg"=>"Livre Inserted.","id"=>$last_id]);
        }
        else{
            echo json_encode(["success"=>0,"msg"=>"Livre Not Inserted!"]);
        }
    }else{
    echo json_encode(["success"=>0,"msg"=>"Veuillez remplir tous les champs!"]);
}

function checkInput($data) 
{
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}