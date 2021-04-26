<?php
/*
	file: php/getSocPick.php
	pvm: 9.5.2019
	auth: Karel H
	desc: Shows societies for user to choose from
*/
header("Access-Control-Allow-Origin: * ");
session_start();
$JSON = array();
include ('dbConnect.php');
$sql = "SELECT YhdistysID,YhdistysNimi FROM yhdistys ";
$sql.= "WHERE YhdistysID NOT IN(SELECT YhdistysID FROM jasenyys WHERE JasenID=".$_SESSION['userID'].")";
$result = $conn->query($sql);
while ($row=$result->fetch_assoc()){
    $JSON['yhdistykset'][]=$row;
}
echo json_encode($JSON);
?>