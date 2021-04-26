<?php
/*
    file: php/session.php
    date: 25.4.2019
    auth: Karel H
    desc: checks does the $_SESSION['name'] exist
*/
header("Acces-Control-Allow-Origin: * "); //can bealso called from mobile devices
session_start();

if (isset($_SESSION['name'])) $JSON = '{"status":"ok","user":"'.$_SESSION['name'].'","ownID":"'.$_SESSION['userID'].'","role":"'.$_SESSION['role'].'"}';
else $JSON = '{"status":"fail"}';
echo $JSON;
?>