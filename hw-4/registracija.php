<?php

$db = new mysqli("localhost","admin","adminjenajjaci","imbd");
$user = $_POST['user'];

$user = json_decode($user,true);

$users=$db->query("select * from users");
$exist=false;

foreach ($users as $row){
  if($user["email"]==$row["userEmail"]||$user["userName"]==$row["userName"]){
    $exist=true;
    echo "zauseto korisnicko ime ili email";
    break;
  }
}
$fname=$user["firstName"];
$Lname=$user["lastName"];
$email=$user["email"];
$Uname=$user["userName"];
$password=$user["password"];

$sql="INSERT INTO `users`(`userFirstName`, `userLastName`, `userEmail`, `userPassword`, `userName`) values('$fname','$Lname','$email','$password','$Uname')";
if($exist==false){
  $db->query($sql);
   echo "uspesno ste se registrovali";
 }
$db->close();
?>