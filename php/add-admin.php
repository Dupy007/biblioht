<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

// POST DATA
$data = json_decode(file_get_contents("php://input"));

if(isset($data->pseudo) 
    && isset($data->mdp) 
    && !empty(checkInput($data->pseudo))
    && !empty(checkInput($data->email)) 
    && !empty(checkInput($data->mdp))  
	){
    $pseudo = mysqli_real_escape_string($db_conn, checkInput($data->pseudo));
    $email = mysqli_real_escape_string($db_conn, checkInput($data->email));
    $mdp = mysqli_real_escape_string($db_conn, checkInput($data->mdp));
    $mdp = hash('sha512', $mdp);

    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $req = "INSERT INTO `admin`(`pseudoAdmin`, `mdpAdmin`, `emailAdmin`) VALUES 
                                ('$pseudo','$email','$mdp')";
            $insertUser = mysqli_query($db_conn,$req);
            if($insertUser){
                $last_id = mysqli_insert_id($db_conn);
                echo json_encode(["success"=>1,"msg"=>"Admin inseré.","id"=>$last_id]);
            }else{
                echo json_encode(["success"=>0,"msg"=>"Admin non inseré! "]);
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