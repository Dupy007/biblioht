<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

// POST DATA
$data = json_decode(file_get_contents("php://input"));

if(isset($data->email) 
	&& isset($data->mdp) 
	&& !empty(checkInput($data->email)) 
    && !empty(checkInput($data->mdp))
	){
        $email = mysqli_real_escape_string($db_conn, checkInput($data->email));
        $mdp = mysqli_real_escape_string($db_conn, checkInput($data->mdp));
      //  $mdp = hash('sha512', $mdp);
        $connectUser = mysqli_query($db_conn,"SELECT idUser,prenom,typeC FROM typeCpt WHERE email='$email' AND mdp='$mdp' ;");
        if(mysqli_num_rows($connectUser) > 0){
            $connectUser = mysqli_fetch_all($connectUser,MYSQLI_ASSOC);
            echo json_encode(["success"=>1,"msg"=>"User trouvé.","users"=>$connectUser]);
        }else{
            echo json_encode(["success"=>0,"msg"=>"User non trouvé."]);
        }
    }else{
    echo json_encode( ["success"=>0,"msg"=>"Veuillez remplir tous les champs"] );
}

function checkInput($data) 
{
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}