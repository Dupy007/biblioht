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
    && !empty(checkInput($data->sexe))
    && !empty(checkInput($data->email)) 
    && !empty(checkInput($data->statut))
    && !empty(checkInput($data->mdp))  
    && !empty(checkInput($data->birth)) 
    && !empty(checkInput($data->adresse)) 
    && !empty(checkInput($data->phone))
	){
    $nom = mysqli_real_escape_string($db_conn, checkInput($data->nom));
    $prenom = mysqli_real_escape_string($db_conn, checkInput($data->prenom));
    $sexe = mysqli_real_escape_string($db_conn, checkInput($data->sexe));
    $email = mysqli_real_escape_string($db_conn, checkInput($data->email));
    $statut = mysqli_real_escape_string($db_conn, checkInput($data->statut));
    $mdp = mysqli_real_escape_string($db_conn, checkInput($data->mdp));
    $phone = mysqli_real_escape_string($db_conn, checkInput($data->phone));
    $birth = mysqli_real_escape_string($db_conn, checkInput($data->birth));
    $adresse =(int) mysqli_real_escape_string($db_conn, checkInput($data->adresse));
    $time = strtotime($birth);
    $birth = date('Y-m-d',$time);
    // $mdp = hash('sha512', $mdp);

    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $req = "INSERT INTO users(nomUser, prenomUser, emailUser, mdpUser, birthUser, adresse, sexeUser, statutUser,phone ) VALUES 
                                ('$nom','$prenom','$email','$mdp','$birth','$adresse','$sexe','$statut','$phone')";
            $insertUser = mysqli_query($db_conn,$req);
            if($insertUser){
                $last_id = mysqli_insert_id($db_conn);
                echo json_encode(["success"=>1,"msg"=>"Utilisateur inseré.","id"=>$last_id]);
            }else{
                echo json_encode(["success"=>0,"msg"=>"Utilisateur non inseré! "]);
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