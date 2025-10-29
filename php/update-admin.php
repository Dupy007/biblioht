<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));

if(isset($data->email) 
    && isset($data->pseudo) 
    && isset($data->id) 
	&& !empty(checkInput($data->id)) 
    && !empty(checkInput($data->pseudo))
    && !empty(checkInput($data->email)) 
    && !empty(checkInput($data->mdp))  
	){
    $email = mysqli_real_escape_string($db_conn, checkInput($data->email));
    $mdp = mysqli_real_escape_string($db_conn, checkInput($data->mdp));
    $pseudo = mysqli_real_escape_string($db_conn, checkInput($data->pseudo));
    $id = mysqli_real_escape_string($db_conn, checkInput($data->id));
    $mdp = hash('sha512', $mdp);


    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $reqa = "UPDATE `admin` SET `pseudoAdmin`=$pseudo,`mdpAdmin`=$mdp,`emailAdmin`=$email WHERE idAdmin = $id ";
        $updateAdmin = mysqli_query($db_conn,$reqa);
        if($updateAdmin){
                echo json_encode(["success"=>1,"msg"=>"Admin Update."]);
        }
        else{
            echo json_encode(["success"=>0,"msg"=>"Admin Not Updated!"]);
        }
    }
    else{
        echo json_encode(["success"=>0,"msg"=>"Email invalide!"]);
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