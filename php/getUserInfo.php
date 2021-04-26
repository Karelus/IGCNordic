<?php
/*
	file: php/UserInfo.php
	desc: Returns societies from database from yhdistys-table in JSON form.
*/
header("Access-Control-Allow-Origin: * ");
$JSON = array(); //array for results as JSON
include('dbConnect.php');
$sql="SELECT Etunimi, Sukunimi, Email, Postitoimipaikka, Maa, Puhelin, Osaaminen, Kuva FROM jasen";
if(isset($_GET['id'])) $sql.=" WHERE JasenID=".$_GET['id'];
$result=$conn->query($sql);
if ($result->num_rows > 0){
    $JSON = array();
    $row = $result->fetch_assoc();
    $JSON["users"][]= $row; //places row information to JSON-array variable
    echo json_encode($JSON);
} else echo '{"status":"fail"}';
?>