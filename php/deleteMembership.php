<?php
/*
	file: php/deleteMembership.php
	pvm: 9.5.2019
	auth: Karel H
	desc: Deletes users membership from chosen society
*/
header("Access-Control-Allow-Origin: * ");
session_start();
include ('dbConnect.php');
$sql = "DELETE FROM jasenyys WHERE YhdistysID=".$_GET['id']." AND JasenID=".$_SESSION['userID'];
if($conn->query($sql)===TRUE) echo '{"status":"ok"}';
else echo '{"status":"fail"}';
?>