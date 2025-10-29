<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));

if(isset($data->idLivre)
    && isset($data->id) 
    && isset($data->page) 
    && !empty(checkInput($data->id)) 
    && !empty(checkInput($data->idLivre)) 
    && !empty(checkInput($data->page)) 
	){
    $idLivre = mysqli_real_escape_string($db_conn, checkInput($data->idLivre));
    $id = mysqli_real_escape_string($db_conn, checkInput($data->id));
    $page = mysqli_real_escape_string($db_conn, checkInput($data->page));

        $reqa = "UPDATE `avoir` SET `page`=$page WHERE idUser = $id AND idLivre = $idLivre ";
        $updateAdmin = mysqli_query($db_conn,$reqa);
        if($updateAdmin){
                echo json_encode(["success"=>1,"msg"=>"success."]);
        }
        else{
            echo json_encode(["success"=>0,"msg"=>"Oups une erreur est survenue!"]);
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