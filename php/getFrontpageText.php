<?php
/*
	file: php/getFrontpageText.php
	pvm: 9.5.2019
	auth: Karel H
	desc: Returns frontpage text from Etusivu-table in the database
*/
header("Access-Control-Allow-Origin: * ");
include ('dbConnect.php');
$sql = "SELECT * FROM etusivu";
$result = $conn->query($sql);
if ($result->num_rows > 0){
	$row = $result->fetch_assoc();
	$frontpagetext = str_replace('"',"'",$row['EtusivuText']);
	$frontpagetext = str_replace("||","'",$frontpagetext);
    echo '{"status":"ok","text":"'.$frontpagetext.'","timestamp":"'.$row['EtusivuDate'].'"}';
} else echo '{"status":"fail"}';

?>