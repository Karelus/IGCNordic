<?php
/*
	file: php/getSoc.php
	desc: Returns societies from database from yhdistys-table in JSON form.
*/
header("Access-Control-Allow-Origin: * ");
$JSON = array(); //array for results as JSON
include('dbConnect.php');
$sql="SELECT YhdistysID, YhdistysNimi, Paikkakunta, Maa, Kuvaus FROM yhdistys";
if(isset($_GET['id'])) $sql.=" WHERE YhdistysID=".$_GET['id'];
$sql.=" ORDER BY Paikkakunta";
$result=$conn->query($sql);
while($row=$result->fetch_assoc()){
	$JSON["societies"][]=$row;
}
echo json_encode($JSON); //encodes the data into JSON-object
?>