<?php
/*
	file: php/societyMembers.php
	pvm: 10.5.2019
	auth: Karel H
	desc: Shows which members belong to the clicked society
*/
header("Access-Control-Allow-Origin: * ");
$JSON = array();
include ('dbConnect.php');
$sql ="SELECT Etunimi,Sukunimi,Email,Puhelin,Osaaminen, jasenyys.YhdistysID, yhdistys.YhdistysNimi FROM jasen ";
$sql.="INNER JOIN jasenyys ON jasen.JasenID=jasenyys.JasenID ";
$sql.="INNER JOIN yhdistys ON jasenyys.YhdistysID=yhdistys.YhdistysID ";
$sql.="WHERE jasenyys.YhdistysID=".$_GET['id'];
$result = $conn->query($sql);
while ($row=$result->fetch_assoc()){
    $JSON['jasenet'][]=$row;
}
echo json_encode($JSON);
?>