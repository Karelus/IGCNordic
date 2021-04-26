<?php
/*
	file: php/getSocPick.php
	pvm: 9.5.2019
	auth: Karel H
	desc: Updates users current societies
*/
header("Access-Control-Allow-Origin: * ");
if(empty($_POST)) echo '{"status":"fail"}';
else {
    $userID = $_POST['userID'];
    $socID = $_POST['socID'];
    include ('dbConnect.php');
    $sql = "INSERT INTO jasenyys(JasenID,YhdistysID) VALUES ($userID,$socID)";
    if($conn->query($sql)===TRUE) echo '{"status":"ok"}';
    else echo '{"status":"fail"}';
}
?>