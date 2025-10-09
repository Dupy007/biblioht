<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

$allAdresse = mysqli_query($db_conn,"SELECT * FROM `adresse`");
if(mysqli_num_rows($allAdresse) > 0){
    $all_adresse = mysqli_fetch_all($allAdresse,MYSQLI_ASSOC);
    echo json_encode(["success"=>1,"adresse"=>$all_adresse]);
}
else{
    echo json_encode(["success"=>0]);
}