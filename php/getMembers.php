<?php
/*
	file: php/getMembers.php
	pvm: 7.5.2019
	auth: Karel H
	desc: Returns members from database from jasen-table in JSON form.
*/
header("Access-Control-Allow-Origin: * ");
$JSON = array(); //array for results as JSON
include('dbConnect.php');
$sql="SELECT JasenID,Etunimi,Sukunimi,SyntymaAika,Email,Rooli,Kuva,Postitoimipaikka,Maa,Jasennumero FROM jasen ";
if(isset($_GET['id'])) $sql.=" WHERE JasenID=".$_GET['id'];
$sql.=" ORDER BY Sukunimi, Etunimi";
if(isset($_GET['start'])) $start=$_GET['start'];else $start=0;
if(isset($_GET['montako'])) $montako=$_GET['montako'];else $montako=0;
if($montako>0) $sql.=" LIMIT $start,$montako";
$result=$conn->query($sql);
while($row=$result->fetch_assoc()){
	$JSON["jasenet"][]=$row; //name of JSON-array "supervisors"
}
if($montako>0){ //mikäli sivutus tarvitaan
	//lasketaan rivien kokonaismäärä taulussa jasen, jotta voidaan sivutusta varten laskea tietoja
	$sql="SELECT count(JasenID) as lkm FROM jasen";
	$tulos=$conn->query($sql);
	$rivi=$tulos->fetch_assoc();
	$lkm=$rivi['lkm']; //rivien lkm taulussa
	$start=$start+$montako; //seuraavan haettavan tiedon alkukohta
	$viimeinensivu=ceil($lkm / $montako); //laskee sivujen lkm (pyöristää ylös, jos desimaali)
	array_push($JSON,$start); //lisätään JSON-arrayhin alkuun $start -arvo
	array_push($JSON,$viimeinensivu);
}
echo json_encode($JSON); //encodes the data into JSON-object
?>