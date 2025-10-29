<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

// POST DATA
$data = json_decode(file_get_contents("php://input"));

if(isset($data->cle) 
	&& isset($data->email) 
	&& !empty(checkInput($data->cle)) 
    && !empty(checkInput($data->email))
    && !empty(checkInput($data->nom)) 
    && !empty(checkInput($data->px)) 
	){
    $nom = mysqli_real_escape_string($db_conn, checkInput($data->nom));
    $cle = mysqli_real_escape_string($db_conn, checkInput($data->cle));
    $email = mysqli_real_escape_string($db_conn, checkInput($data->email));
    $px = mysqli_real_escape_string($db_conn, checkInput($data->px));
       
    require('Stripe.php');
    $stripe= new Stripe('');
    $customer= $stripe->api('customers', [
       "description" => $nom,
       "email" => $email,
       "source" => $cle
    ]);
   $stripe->api('charges', [
       'amount'=> $px,
       'currency'=> 'usd',
       'customer'=> $customer->id
   ]);
    
        if($stripe.paymentIntent.status === 'succeeded'){
            echo json_encode(["success"=>1,"msg"=>"Paiement effevtue avec sucess"]);
        }
        else{
            echo json_encode(["success"=>0,"msg"=>"Paiement non effectue!"]);
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

