<?php
/*
    file: php/updateInfoBasic.php
    date: 7.5.2019
    auth: Karel H
    desc: Updates chosen members user information
*/
header("Access-Control-Allow-Origin: * ");
if (empty($_POST)) echo '{"status":"fail"}';
else {
    $error = false;
    $message = '';
    if (!empty($_POST['userID'])) $userID = $_POST['userID']; else $error = true;
    if (!empty($_POST['userFName'])) $userFName = $_POST['userFName']; else $error = true;
    if (!empty($_POST['userLastname'])) $userLastname = $_POST['userLastname']; else $error = true;
    if (!empty($_POST['dateofBirth'])) $dateofBirth = $_POST['dateofBirth']; else $dateofBirth = '';
    if (!empty($_POST['streetAddress'])) $streetAddress = $_POST['streetAddress']; else $streetAddress = '';
    if (!empty($_POST['postalCode'])) $postalCode = $_POST['postalCode']; else $postalCode = '';
    if (!empty($_POST['City'])) $City = $_POST['City']; else $City = '';
    if (!empty($_POST['Country'])) $Country = $_POST['Country']; else $Country = '';
    if (!empty($_POST['Mobile'])) $Mobile = $_POST['Mobile']; else $Mobile = '';
    if (!empty($_POST['userRole'])) $userRole = $_POST['userRole']; else $userRole = '';
    if (!empty($_POST['Skills'])) $Skills = $_POST['Skills']; else $Skills= '';
    include ('checkEmail.inc');
    if (validEmail($_POST['userEmail'])) $userEmail = $_POST['userEmail'];
    else {
         $error = true;
         $message.='Email not correct!';
         $userEmail = '';
    }
    include ('dbConnect.php');
    // checks that email is not already taken by some other user
    $sql = "SELECT Email FROM jasen WHERE Email='$userEmail' AND JasenID<>$userID";
    $result = $conn->query($sql);
	if ($result->num_rows > 0){
        $error = true;
        $message.='Email already taken!';
    }
    if (!$error){
        $sql="UPDATE jasen SET Etunimi='$userFName', Sukunimi='$userLastname', Email='$userEmail' ";
        if($dateofBirth<>'') $sql.=", SyntymaAika='$dateofBirth'";
        if($streetAddress<>'') $sql.=", Katuosoite='$streetAddress'";
        if($postalCode<>'') $sql.=", Postinumero='$postalCode'";
        if($City<>'') $sql.=", Postitoimipaikka='$City'";
        if($Country<>'') $sql.=", Maa='$Country'";
        if($Mobile<>'') $sql.=", Puhelin='$Mobile'";
        if($userRole<>'') $sql.=", Rooli='$userRole'";
        if($Skills<>'') $sql.=", Osaaminen='$Skills' ";
        $sql.="WHERE JasenID=$userID";
        if($conn->query($sql)===TRUE) echo '{"status":"ok"}';
        else echo '{"status":"Error when updating, try again later"}';
    } else echo '{"status":"No empty fields. '.$message.'"}';
} ;
?>