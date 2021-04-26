<?php
/*
	file: php/saveProfilepic.php
	pvm: 7.5.2019
	auth: Karel H
	desc: Returns members from database from jasen-table in JSON form.
*/
header("Access-Control-Allow-Origin: * ");
if (!empty($_POST)){
    $userID = $_POST['userID'];
    $img = basename($_FILES["memberImgFile"]["name"]);
    $viesti = '';
    $uploadOk = 1;
    $target_dir = "../images/profilepics/";
    $target_file = $target_dir.$img;
    $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
    //get active image's name from the database
    include ('dbConnect.php');
    $sql="SELECT Kuva FROM jasen WHERE JasenID=$userID";
    $result = $conn->query($sql);
	if ($result->num_rows > 0){
        //found image
        $row = $result->fetch_assoc();
        include ('checkImageFile.inc');
        //if no errors, save img
        if ($uploadOk==0) echo '{"status":"'.$viesti.'"}';
        else {
            if ($row['Kuva']!='avatar.png') unlink($target_dir.$row['Kuva']); //old imgfile unlinked
            if (move_uploaded_file($_FILES["memberImgFile"]["tmp_name"],$target_file)){ //new img replaces old one
                $sql="UPDATE jasen SET Kuva='$img' WHERE JasenID=$userID";
                if($conn->query($sql)===TRUE) echo '{"status":"ok"}';
                else echo '{"status":"Error when updating, try again later"}';
            } else echo '{"status":"fail"}';
        }
    } else echo '{"status":"fail"}';
} else echo '{"status":"fail"}';
?>