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
    && isset($data->prenom) 
	&& !empty(checkInput($data->id)) 
    && !empty(checkInput($data->prenom))
    && !empty(checkInput($data->email)) 
    && !empty(checkInput($data->mdp))  
	){
    $id = mysqli_real_escape_string($db_conn, checkInput($data->id));
    $prenom = mysqli_real_escape_string($db_conn, checkInput($data->prenom));
    $email = mysqli_real_escape_string($db_conn, checkInput($data->email));
    $mdp = mysqli_real_escape_string($db_conn, checkInput($data->mdp));
    // $mdp = hash('sha512', $mdp);
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $req ="INSERT INTO `typecpt`(`idUser`, `prenom`, `email`, `mdp`, `typeC`) VALUES ('$id','$prenom','$email','$mdp','user' )";
            $inserttype = mysqli_query($db_conn,$req);
            if($inserttype){
                echo json_encode(["success"=>1,"msg"=>"Type Utilisateur inseré.","id"=>$id]);
                    }
                    else{
                        echo json_encode(["success"=>0,"msg"=>"Type Utilisateur non inseré!"]);
                    }
       
    }else{
        echo json_encode(["success"=>0,"msg"=>"Adresse email invalide!"]);
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