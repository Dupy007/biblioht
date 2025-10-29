<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));

if(isset($data->nom) 
    && isset($data->prenom) 
    && isset($data->id) 
	&& !empty(checkInput($data->id)) 
	&& !empty(checkInput($data->nom)) 
    && !empty(checkInput($data->prenom))
    && !empty(checkInput($data->sexe))
    && !empty(checkInput($data->email)) 
    && !empty(checkInput($data->statut))
    && !empty(checkInput($data->mdp))  
    && !empty(checkInput($data->birth)) 
    && !empty(checkInput($data->adresse)) 
    && !empty(checkInput($data->phone))
    && !empty(checkInput($data->pays)) 
    && !empty(checkInput($data->ville)) 
    && !empty(checkInput($data->depart))
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
    $ville = mysqli_real_escape_string($db_conn, checkInput($data->ville));
    $pays = mysqli_real_escape_string($db_conn, checkInput($data->pays));
    $depart = mysqli_real_escape_string($db_conn, checkInput($data->depart));
    $id = mysqli_real_escape_string($db_conn, checkInput($data->id));
    $time = strtotime($birth);
    $birth = date('Y-m-d',$time);
    $mdp = hash('sha512', $mdp);


    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $reqa = "UPDATE `adresse` SET `ville`=$ville,`depart`=$depart,`pays`=$pays WHERE idAdresse = $adresse";
        $insertAdresse = mysqli_query($db_conn,$reqa);
        if($insertAdresse){
            $requ = "UPDATE `users` SET `nomUser`=$nom,`prenomUser`=$prenom,`emailUser`=$email,`birthUser`=$birth,`sexeUser`=$sexe,`statutUser`=$statut,`phone`=$phone WHERE idUser = $id";
            $updateUser = mysqli_query($db_conn,$requ);
            if($updateUser){
                $reqc = "UPDATE `typecpt` SET `prenom`=$prenom,`email`=$email WHERE idUser = $id";
                $updateCpt = mysqli_query($db_conn,$reqc);
                if($updateCpt){
                echo json_encode(["success"=>1,"msg"=>"Compte Update."]);
            }
            else{
                echo json_encode(["success"=>0,"msg"=>"Compte Not Updated!"]);
            }}else{
                echo json_encode(["success"=>0,"msg"=>"Utilisateur Not Updated!"]);
            }
        }else{
            echo json_encode(["success"=>0,"msg"=>"Adresse Not Updated!"]);
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