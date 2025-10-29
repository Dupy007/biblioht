<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));
if(isset($data->nom) 
    && isset($data->id) 
    && !empty(checkInput($data->id)) 
	&& isset($data->adresse) 
	&& !empty(checkInput($data->nom)) 
    && !empty(checkInput($data->adresse))
	&& isset($data->ville) 
	&& !empty(checkInput($data->depart)) 
    && !empty(checkInput($data->pays))
	){
    $nom = mysqli_real_escape_string($db_conn, checkInput($data->nom));
    $adresse =(int)mysqli_real_escape_string($db_conn, checkInput($data->adresse));
    $id = mysqli_real_escape_string($db_conn, checkInput($data->id));
    $ville =(int)mysqli_real_escape_string($db_conn, checkInput($data->ville));
    $depart = mysqli_real_escape_string($db_conn, checkInput($data->depart));
    $pays =(int)mysqli_real_escape_string($db_conn, checkInput($data->pays));

        $reqa = "UPDATE `adresse` SET `ville`=$ville,`depart`=$depart,`pays`=$pays WHERE idAdresse = $adresse";
        $insertAdresse = mysqli_query($db_conn,$reqa);
        if($insertAdresse){
            $reqe = "UPDATE `edition` SET `nomEdition`=$nom WHERE idEdition = $id";
            $updateUser = mysqli_query($db_conn,$reqe);
            if($updateUser){
                echo json_encode(["success"=>1,"msg"=>"Edition Updated!"]);  
            }else{
                echo json_encode(["success"=>0,"msg"=>"Edition Not Updated!"]);
            }
        }else{
            echo json_encode(["success"=>0,"msg"=>"Adresse Not Updated!"]);
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