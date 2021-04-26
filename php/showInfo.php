<?php
/*
	file: php/showInfo.php
	date: 26.4.2019
    auth: Karel H
	desc: Searches users info from database and returns in JSON form.
*/
header("Acces-Control-Allow-Origin: * ");
include ('dbConnect.php');
session_start();
$sql = "SELECT Etunimi, Sukunimi, Email, SyntymaAika, Katuosoite, Postinumero, 
Postitoimipaikka, Maa, Puhelin, Osaaminen FROM jasen WHERE JasenID = ".$_SESSION['userID'];
$result = $conn->query($sql);
if ($result->num_rows > 0){
    $JSON = array();
    $row = $result->fetch_assoc();
    $JSON["infos"][]= $row; //places row information to JSON-array variable
    echo json_encode($JSON);
} else echo '{"status":"fail"}';
?>