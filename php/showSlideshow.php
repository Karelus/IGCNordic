<?php
/*
	file: php/showSlideshow.php
	pvm: 13.5.2019
	auth: Karel H
	desc: 
*/
header("Access-Control-Allow-Origin: * ");
$JSON = array(); //array for results as JSON
if (isset($_GET['lkm'])) $lkm=$_GET['lkm']; else $lkm=1;
include('dbConnect.php');
$sql = "SELECT * FROM kuvat ORDER BY rand() LIMIT $lkm";
$result=$conn->query($sql);
while($row=$result->fetch_assoc()){
	$JSON["images"][]=$row; //name of JSON-array "supervisors"
}
echo json_encode($JSON);

?>