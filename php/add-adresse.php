<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

// POST DATA
$data = json_decode(file_get_contents("php://input"));

if(isset($data->ville) 
	&& isset($data->depart) 
	&& !empty(checkInput($data->ville)) 
    && !empty(checkInput($data->depart))
    && !empty(checkInput($data->pays)) 
	){
    $ville = mysqli_real_escape_string($db_conn, checkInput($data->ville));
    $depart = mysqli_real_escape_string($db_conn, checkInput($data->depart));
    $pays = mysqli_real_escape_string($db_conn, checkInput($data->pays));
        $req = "INSERT INTO adresse(ville,depart,pays) values('$ville','$depart','$pays')";
        $insertAdresse = mysqli_query($db_conn,$req);
        if($insertAdresse){
            $last_id = mysqli_insert_id($db_conn);
            echo json_encode(["success"=>1,"msg"=>"Adresse Inserted.","id"=>$last_id]);
        }
        else{
            echo json_encode(["success"=>0,"msg"=>"Adresse Not Inserted!"]);
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