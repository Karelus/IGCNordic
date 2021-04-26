<?php
/*
	file: php/updateFrontpage.php
	pvm: 9.5.2019
	auth: Karel H
	desc: Updates frontpage text to the database
*/
header("Access-Control-Allow-Origin: * ");
if(empty($_POST)) echo '{"status":"fail"}';
else {
    $text = trim($_POST['text']); //trim from empty spaces
    $text = str_replace("\r","",$text); //replace enters
    $text = str_replace("\n","",$text);
	$text = str_replace("'","||",$text);
    include('dbConnect.php');
    $sql = "UPDATE etusivu SET EtusivuText='$text', EtusivuDate=now() WHERE EtusivuID=1";
    if($conn->query($sql)===TRUE) echo '{"status":"ok"}';
    else echo '{"status":"fail"}';
}
?>