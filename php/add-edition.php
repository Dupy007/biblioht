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
	&& isset($data->adresse) 
	&& !empty(checkInput($data->nom)) 
    && !empty(checkInput($data->adresse))
	){
    $nom = mysqli_real_escape_string($db_conn, checkInput($data->nom));
    $adresse =(int)mysqli_real_escape_string($db_conn, checkInput($data->adresse));

        $insertEdition = mysqli_query($db_conn,"INSERT INTO edition(nomEdition,adresse) values('$nom','$adresse');");
        if($insertEdition){
            $last_id = mysqli_insert_id($db_conn);
            echo json_encode(["success"=>1,"msg"=>"Edition Inserted.","id"=>$last_id]);
        }
        else{
            echo json_encode( ["success"=>0,"msg"=>"Edition Not Inserted! $adresse"] );
        }
    }
else{
    echo json_encode( ["success"=>0,"msg"=>"Veuillez remplir tous les champs"] );
}

function checkInput($data) 
{
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}