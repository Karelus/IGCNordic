<?php
/*
    file: php/Society.php
    date: 17.5.2019
    auth: Karel H
    desc: Updates society information to database
*/
header("Access-Control-Allow-Origin: * ");
if (empty($_POST)) echo '{"status":"fail"}';
else {
    $error = false;
    $message = '';
    if (!empty($_POST['socID'])) $socID = $_POST['socID']; else $error = true;
    if (!empty($_POST['socName'])) $socName = $_POST['socName']; else $error = true;
    if (!empty($_POST['socPlace'])) $socPlace = $_POST['socPlace']; else $socPlace = '';
    if (!empty($_POST['socCountry'])) $socCountry = $_POST['socCountry']; else $socCountry = '';
    if (!empty($_POST['socDesc'])) $socDesc = $_POST['socDesc']; else $socDesc= '';

    include ('dbConnect.php');
   
    if (!$error){
        $sql="UPDATE yhdistys SET YhdistysNimi='$socName', Paikkakunta='$socPlace' ";
        if($socPlace<>'') $sql.=", Paikkakunta='$socPlace'";
        if($socCountry<>'') $sql.=", Maa='$socCountry'";
        if($socDesc<>'') $sql.=", Kuvaus='$socDesc' ";
        $sql.="WHERE YhdistysID=$socID";
        if($conn->query($sql)===TRUE) echo '{"status":"ok"}';
        else echo '{"status":"Error when updating, try again later"}';
    } else echo '{"status":"fail"}';
} ;
?>