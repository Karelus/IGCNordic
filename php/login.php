<?php
/*
    file: php/login.php
    date: 25.4.2019
    auth: Karel H
    desc: Checks if inputted email is on the database and then checks if given password matches 
          the email address. If match, add session info.
*/
header("Acces-Control-Allow-Origin: * "); //can be also called from mobile devices

if(!empty($_POST)){
    $email = $_POST['email'];
    $password = $_POST['password'];
    include ('dbConnect.php'); // database connection, where object $conn is created
    $sql = "SELECT JasenID, Salasana, Etunimi, Sukunimi, Rooli FROM jasen WHERE Email='$email'";
    //echo $sql;
    $result = $conn->query($sql); //executes sql query to database
    if($result->num_rows > 0){ //found some info 
        $password = $conn->real_escape_string($password);
        $row = $result->fetch_assoc(); // pick rows from $result - group to variable $row
        if(password_verify($password,$row['Salasana'])){
            //user given password is same as on the database
            session_start();
            $_SESSION['name'] = $row['Etunimi'].' '.$row['Sukunimi'];
            $_SESSION['userID'] = $row['JasenID'];
            $_SESSION['role'] = $row['Rooli'];
            $JSON = '{"status":"ok","user":"'.$_SESSION['name'].'"}';
        } else $JSON = '{"status":"Password wrong!"}';
    } else $JSON = '{"status":"Email was not found"}';
} else $JSON = '{"status":"fail"}';
    echo $JSON;


?>