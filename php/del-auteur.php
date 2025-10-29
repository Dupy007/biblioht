<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

// POST DATA
$data = json_decode(file_get_contents("php://input"));

if(isset($data->id) 
	&& !empty(checkInput($data->id)) 
	){
    $id = mysqli_real_escape_string($db_conn, checkInput($data->id));
    $req = "DELETE FROM `auteur` WHERE `idAuteur`='$id' ";
        $insertPanier = mysqli_query($db_conn,$req);
        if($insertPanier){
            echo json_encode(["success"=>1,"msg"=>"Auteur Deleted."]);
        }
        else{
            echo json_encode( ["success"=>0,"msg"=>"Auteur Not Deleted!"] );
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