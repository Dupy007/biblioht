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
	&& isset($data->cle) 
	&& !empty(checkInput($data->id)) 
    && !empty(checkInput($data->cle))
    && !empty(checkInput($data->mode)) 
    && !empty(checkInput($data->email)) 
	){
    $id = mysqli_real_escape_string($db_conn, checkInput($data->id));
    $cle = mysqli_real_escape_string($db_conn, checkInput($data->cle));
    $mode = mysqli_real_escape_string($db_conn, checkInput($data->mode));
    $email = mysqli_real_escape_string($db_conn, checkInput($data->email));
        $req = "INSERT INTO `paiement`(`idUser`, `keyUser`, `emailUser`, `mode`) VALUES ($id,$cle,$email,$mode)";
        $insertPay = mysqli_query($db_conn,$req);
        if($insertPay){
            $last_id = mysqli_insert_id($db_conn);
            echo json_encode(["success"=>1,"msg"=>"Paiement Inserted.","id"=>$last_id]);
        }
        else{
            echo json_encode(["success"=>0,"msg"=>"Paiement Not Inserted!"]);
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