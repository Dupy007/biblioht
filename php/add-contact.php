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
	&& isset($data->email) 
	&& !empty(checkInput($data->nom)) 
    && !empty(checkInput($data->email))
    && !empty(checkInput($data->phone)) 
    && !empty(checkInput($data->subject))
    && !empty(checkInput($data->message)) 
	){
    $nom = mysqli_real_escape_string($db_conn, checkInput($data->nom));
    $email = mysqli_real_escape_string($db_conn, checkInput($data->email));
    $phone = mysqli_real_escape_string($db_conn, checkInput($data->phone));
    $subject = mysqli_real_escape_string($db_conn, checkInput($data->subject));
    $message = mysqli_real_escape_string($db_conn, checkInput($data->message));
    
    $req = "INSERT INTO contact(nomContact,emailContact,phoneContact,subjectContact,messageContact) values('$nom','$email','$phone','$subject','$message')";
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $insertContact = mysqli_query($db_conn,$req);
        if($insertContact){
            $last_id = mysqli_insert_id($db_conn);
            echo json_encode(["success"=>1,"msg"=>"Message envoyé.","id"=>$last_id]);
        }
        else{
            echo json_encode(["success"=>0,"msg"=>"Message non envoyé!"]);
        }
    }
    else{
        echo json_encode(["success"=>0,"msg"=>"Invalid Email Address!"]);
    }
}
else{
    echo json_encode(["success"=>0,"msg"=>"Please fill all the required fields!"]);
}

function checkInput($data) 
{
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}