<?php

$db = new mysqli("localhost","admin","adminjenajjaci","imbd");

$data = $_POST['req'];
$data= json_decode($data, true);
$func=$data["function"];

switch($func){
  case "get":
    $filmovi=$db->query("select * from films"); 
    $niz=[];   
    foreach($filmovi as $film){
      array_push($niz, $film["naslov"]);
    }
    echo json_encode($niz);
    break;

  case "get1":
    $naslov=$data["naslov"];
    $film=$db->query("select * from films where naslov ='$naslov'");
    foreach($film as $f){
      echo json_encode(array("naslov"=> $f["naslov"], "opis"=> $f["opis"], "zanr"=> $f["zanr"], "scenarista"=> $f["scenarista"], "reziser"=> $f["reziser"], "prodKuca"=> $f["prodKuca"], "godina"=> $f["godina"], "slika"=> $f["slika"], "trajanje"=> $f["trajanje"], "glumci"=> $f["glumci"], "id" => $f["filmID"]));
    }
    break;
  case "change":
    $filmId=$data["filmId"];
    $naslov=$data["naslov"];
    $opis=$data["opis"];
    $zanr=$data["zanr"];
    $scenarista=$data["scenarista"];
    $reziser=$data["reziser"];
    $prodKuca=$data["prodKuca"];
    $godina=$data["godina"];
    $slika=$data["slika"];
    $trajanje=$data["trajanje"];
    $glumci=$data["glumci"];
    $sql="update films set naslov='$naslov', opis='$opis', zanr='$zanr', scenarista='$scenarista', reziser='$reziser', prodKuca='$prodKuca', godina='$godina', slika='$slika', trajanje='$trajanje', glumci='$glumci' where filmID='$filmId'" ;
    $db->query($sql);
    echo "podaci sacuvani";
    break;
  case "add":
    $naslov=$data["naslov"];
    $opis=$data["opis"];
    $zanr=$data["zanr"];
    $scenarista=$data["scenarista"];
    $reziser=$data["reziser"];
    $prodKuca=$data["prodKuca"];
    $godina=$data["godina"];
    $slika=$data["slika"];
    $trajanje=$data["trajanje"];
    $glumci=$data["glumci"];
    $sql="INSERT INTO films (`naslov`, `opis`, `zanr`, `scenarista`, `reziser`,`prodKuca`,`godina`, `trajanje`,`slika`, `glumci`) values('$naslov','$opis','$zanr','$scenarista','$reziser','$prodKuca','$godina','$trajanje', '$slika','$glumci')";
    $db->query($sql);
    echo $sql;
    break;
  case "remove":
    $naslov=$data["naslov"];
    $sql="DELETE from films where naslov='$naslov'";

    $db->query($sql);
    echo "$naslov je obrisan";
    break;
  case "getNamePhoto":
    $sql="select * from films";
    $filmovi=$db->query($sql);
    $niz=[];
    foreach($filmovi as $f){
      array_push($niz,json_encode(array("naslov"=> $f["naslov"],"slika"=>$f["slika"], "id"=>$f["filmID"])));
    }
    echo json_encode($niz);
    break;
  case "getById":
    $id=$data["id"];
    $film=$db->query("select * from films where filmID =$id");
    $pocena=$db->query("select avg(ocena) as av from ocene where filmID=$id");
    $po;
    foreach($pocena as $p){
      $po=$p["av"];
    }
    $cocena=$db->query("select count(ocena) as c from ocene where filmID=$id");
    $co;
    foreach($cocena as $c){
      $co=$c["c"];
    }
    foreach($film as $f){
      
      echo json_encode(array("naslov"=> $f["naslov"], "opis"=> $f["opis"], "zanr"=> $f["zanr"], "scenarista"=> $f["scenarista"], "reziser"=> $f["reziser"], "prodKuca"=> $f["prodKuca"], "godina"=> $f["godina"], "slika"=> $f["slika"], "trajanje"=> $f["trajanje"], "glumci"=> $f["glumci"], "id" => $f["filmID"], "pOcena"=>$po, "cOcena"=>$co));
    }
    break;
  case "find":
    $pretraga=$data["pretraga"];
    $tZanrovi=$data["zanrovi"];//trazeni zanrovi
    $sql="select * from films where naslov like '%$pretraga%'";
    $niz=[];
    $filmovi=$db->query($sql);
    foreach($filmovi as $film){
      array_push($niz,json_encode(array("naslov"=>$film["naslov"], "zanrovi"=>$film["zanr"], "id"=>$film["filmID"],"slika"=>$film["slika"])));
    }
    echo json_encode($niz);
    break;


};


$db->close();
?>
