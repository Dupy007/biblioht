<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

$allAuteur = mysqli_query($db_conn,"SELECT * FROM `auteur`");
if(mysqli_num_rows($allAuteur) > 0){
    $all_auteur = mysqli_fetch_all($allAuteur,MYSQLI_ASSOC);
    echo json_encode(["success"=>1,"auteur"=>$all_auteur]);
}
else{
    echo json_encode(["success"=>0]);
}