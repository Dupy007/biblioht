<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';
$req = "SELECT u.idUser,u.prenomUser,u.nomUser,u.emailUser,u.birthUser,a.ville,a.depart,a.pays,u.sexeUser,u.statutUser,u.phone FROM adresse as a,users as u WHERE a.idAdresse = u.adresse ";
$allUsers = mysqli_query($db_conn,$req);
if( mysqli_num_rows($allUsers) > 0 ){
    $all_users = mysqli_fetch_all($allUsers,MYSQLI_ASSOC);
    echo json_encode(["success"=>1,"users"=>$all_users]);
}
else{
    echo json_encode(["success"=>0]);
}