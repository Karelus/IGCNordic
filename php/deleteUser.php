<?php 
/*
    file: php/deleteUser.php
    date: 16.5.2019
    auth: Karel H
    desc: Deletes user from the table called jasen and possible records from jasenyys table
*/
header("Acces-Control-Allow-Origin: * ");
if(empty($_GET['id'])) echo '"status":"fail"';
else{
    include('dbConnect.php');
    $sql = "SELECT Kuva FROM jasen WHERE JasenID=".$_GET['id'];
    $result = $conn->query($sql);
    if ($result->num_rows > 0){
        $row = $result->fetch_assoc();
        $target_dir = "../images/profilepics/";
        unlink($target_dir.$row['Kuva']);
        $sql = "UPDATE jasen SET Kuva='avatar.png' WHERE JasenID=".$_GET['id'];
    }
    $sql = "DELETE FROM jasen WHERE JasenID =".$_GET['id'];
    if ($conn->query($sql)===true) echo '{"status":"ok"}';  
        else echo '{"status":"fail"}';
    
    $sql = "DELETE FROM jasenyys WHERE JasenID =".$_GET['id'];
    if ($conn->query($sql)===true) echo ''; 
    
}

?>