<?php
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Headers: access");
// header("Access-Control-Allow-Methods: POST");
// header("Content-Type: application/json; charset=UTF-8");
// header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// require 'db_connection.php';

// $data = json_decode(file_get_contents("php://input"));

// if(isset($data->id) 
//     && is_numeric($data->id) 
//     &&isset($data->ida) 
// 	&& is_numeric($data->ida) 
//     && !empty(checkInput($data->nom)) 
//     && !empty(checkInput($data->prenom))
//     && !empty(checkInput($data->sexe))
//     && !empty(checkInput($data->email)) 
//     && !empty(checkInput($data->statut))
//     && !empty(checkInput($data->mdp))  
//     && !empty(checkInput($data->jj)) 
//     && !empty(checkInput($data->mm))
//     && !empty(checkInput($data->aaaa)) 
//     && !empty(checkInput($data->ville)) 
//     && !empty(checkInput($data->depart))
//     && !empty(checkInput($data->pays)) 
//     && !empty(checkInput($data->phone))
// 	){
//         $nom = mysqli_real_escape_string($db_conn, checkInput($data->nom));
//         $prenom = mysqli_real_escape_string($db_conn, checkInput($data->prenom));
//         $sexe = mysqli_real_escape_string($db_conn, checkInput($data->sexe));
//         $email = mysqli_real_escape_string($db_conn, checkInput($data->email));
//         $statut = mysqli_real_escape_string($db_conn, checkInput($data->statut));
//         $mdp = mysqli_real_escape_string($db_conn, checkInput($data->mdp));
//         $phone = mysqli_real_escape_string($db_conn, checkInput($data->phone));
//         $jj = mysqli_real_escape_string($db_conn, checkInput($data->jj));
//         $mm = mysqli_real_escape_string($db_conn, checkInput($data->mm));
//         $aaaa = mysqli_real_escape_string($db_conn, checkInput($data->aaaa));
//         $ville = mysqli_real_escape_string($db_conn, checkInput($data->ville));
//         $depart = mysqli_real_escape_string($db_conn, checkInput($data->depart));
//         $pays = mysqli_real_escape_string($db_conn, checkInput($data->pays));

//     if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
//         $insertAdresse = mysqli_query($db_conn,"CALL updateAdresse('$data->ida','$ville','$depart','$pays');");
//         if($insertAdresse){
//             $last_id = mysqli_insert_id($db_conn);
//             $time = strtotime($mm,$jj,$aaaa);
//             $birth = date('Y-m-d',$time);
//             $updateUser = mysqli_query($db_conn,"CALL updateUser('$data->id','$prenom','$nom','$email','$mdp','$birth','$last_id','$sexe','$statut' ); ");
//             if($updateUser){
//                 echo json_encode(["success"=>1,"msg"=>"Utilisateur Update."]);
//             }
//             else{
//                 echo json_encode(["success"=>0,"msg"=>"Utilisateur Not Updated!"]);
//             }
//         }else{
//             echo json_encode(["success"=>0,"msg"=>"Adresse Not Updated!"]);
//         }
//     }
//     else{
//         echo json_encode(["success"=>0,"msg"=>"Email invalide!"]);
//     }
// }
// else{
//     echo json_encode(["success"=>0,"msg"=>"Veuillez renseigner tous les champs!"]);
// }

  

// function checkInput($data) 
// {
//   $data = trim($data);
//   $data = stripslashes($data);
//   $data = htmlspecialchars($data);
//   return $data;
// }


if (isset($_FILES['myFile'])) {
    if(move_uploaded_file($_FILES['myFile']['tmp_name'], "../src/data/" . $_FILES['myFile']['name'])){
        $load=true;
    }
}
if($load){
    echo json_encode(["success"=>1,"msg"=>$_FILES['myFile']['name'] ] );
}
else{
    echo json_encode(["success"=>0,"msg"=>"Livre Not Inserted!"]);
}
?>