<?php
/*
	file: php/updatePassword.php
	date: 26.4.2019
    auth: Karel H
	desc: Gets old and new password from POST-method. Checks if old password is right and is new
		  one is right 2 times. -> updates password
*/
header("Acces-Control-Allow-Origin: * ");
if (!empty($_POST)){
	include ('dbConnect.php');
	session_start();
	$sql = "SELECT Salasana FROM jasen WHERE JasenID = ".$_SESSION['userID'];
	$result = $conn->query($sql);
	if ($result->num_rows > 0){
		$oldpw = $_POST['oldPassword'];
		$newpw0 = $_POST['newPassword0'];
		$newpw1 = $_POST['newPassword1'];
		$row = $result->fetch_assoc();
		if (password_verify($oldpw,$row['Salasana'])){
			if ($newpw0 == $newpw1){
				$newpassword = password_hash($newpw0, PASSWORD_DEFAULT); //hides and crypts new password
				$sql = "UPDATE jasen SET Salasana='$newpassword' WHERE JasenID=".$_SESSION['userID'];
				if ($conn->query($sql)===true) $JSON = '{"status":"ok"}';
				else $JSON = '{"status":"Cannot be updated"}';
			} else $JSON = '{"status":"New passwords are not matching!"}';
		} else $JSON = '{"status":"Old password wrong!"}';
	} else $JSON = '{"status":"User not found"}';
} else $JSON = '{"status":"fail"}';
echo $JSON;
?>