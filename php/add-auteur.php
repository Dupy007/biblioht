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
	&& isset($data->prenom) 
	&& !empty(checkInput($data->nom)) 
    && !empty(checkInput($data->prenom))
	&& !empty(checkInput($data->adresse)) 
	){
        $nom = mysqli_real_escape_string($db_conn, checkInput($data->nom));
        $prenom = mysqli_real_escape_string($db_conn, checkInput($data->prenom));
        $adresse = mysqli_real_escape_string($db_conn, checkInput($data->adresse));
        $req = "INSERT INTO auteur(prenomAuteur,nomAuteur,adresse) values('$prenom','$nom','$adresse')";
        $insertAuteur = mysqli_query($db_conn,$req);
        if($insertAuteur){
            $last_id = mysqli_insert_id($db_conn);
            echo json_encode(["success"=>1,"msg"=>"Auteur Inserted.","id"=>$last_id]);
        }
        else{
            echo json_encode( ["success"=>0,"msg"=>"Auteur Not Inserted!"] );
        }


       
    }else{
    echo json_encode(["success"=>0,"msg"=>"Please fill all the required fields!"]);
}

function checkInput($data) 
{
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}