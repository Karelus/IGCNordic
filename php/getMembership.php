<?php
/*
	file: php/getSocPick.php
	pvm: 9.5.2019
	auth: Karel H
	desc: Shows own memberships for the user
*/
header("Access-Control-Allow-Origin: * ");
session_start();
include ('dbConnect.php');
$sql = "SELECT yhdistys.YhdistysID, YhdistysNimi, Paikkakunta FROM yhdistys ";
$sql.= "INNER JOIN jasenyys ON yhdistys.YhdistysID=jasenyys.YhdistysID ";
$sql.= "WHERE jasenyys.JasenID=".$_SESSION['userID'];
$result = $conn->query($sql);
while ($row=$result->fetch_assoc()){
    $JSON['yhdistykset'][]=$row;
}
echo json_encode($JSON);
?>