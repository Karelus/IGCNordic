<?php
/*
	file: php/getImages.php
	pvm: 14.5.2019
	auth: Karel H
	desc: 
*/
header("Access-Control-Allow-Origin: * ");
$JSON = array(); //array for results as JSON
include('dbConnect.php');
$sql = "SELECT * FROM kuvat ORDER BY KuvaNimi";
$result=$conn->query($sql);
while($row=$result->fetch_assoc()){
	$JSON["images"][]=$row; //name of JSON-array "supervisors"
}
echo json_encode($JSON);

?>