<?php

$db = new mysqli("localhost","admin","adminjenajjaci","imbd");
$user = $_POST['user'];

$user = json_decode($user,true);

$users=$db->query("select * from users");
$exist=false;
$admin=false;

foreach ($users as $row){
  if(($user["email"]==$row["userEmail"]||$user["email"]==$row["userName"]) && $user["password"]==$row["userPassword"]){
    $exist=true;
    $admin=$row["isAdmin"];
    break;
  }
}
echo json_encode(array("exist"=> $exist, "isAdmin"=> $admin));










$db->close();
?>