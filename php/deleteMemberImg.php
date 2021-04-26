<?php
/*
    file: php/deleteMemberImg.php
    date: 7.5.2019
    auth: Karel H
    desc: Deletes profilepicture from database and changes it back to avatar.png
*/
header("Access-Control-Allow-Origin: * ");
if (empty($_GET['id'])) echo '{"status":"Something went wrong"}';
else {
    $userID = $_GET['id'];
    include ('dbConnect.php');
    $sql = "SELECT Kuva FROM jasen WHERE JasenID=$userID";
    $result = $conn->query($sql);
    if ($result->num_rows > 0){
        $row = $result->fetch_assoc();
        $target_dir = "../images/profilepics/";
        unlink($target_dir.$row['Kuva']);
        $sql = "UPDATE jasen SET Kuva='avatar.png' WHERE JasenID=$userID";
        if ($conn->query($sql)===true) echo '{"status":"ok"}';
        else echo '{"status":"Something went wrong"}';
    } else echo '{"status":"Something went wrong"}';
}
?>