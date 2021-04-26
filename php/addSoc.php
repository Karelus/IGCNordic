<?php
/*
    file: addSoc.php
    desc: saves the added society to the database
*/
header("Access-Control-Allow-Origin: * ");
if(empty($_POST)) echo '{"status":"fail"}';
else{
    $error = false;
    if(isset($_POST['societyname'])) $societyname = $_POST['societyname']; else $error = true;
    if(isset($_POST['societyplace'])) $societyplace = $_POST['societyplace']; else $error = true;
    if(isset($_POST['societycountry'])) $societycountry = $_POST['societycountry']; else $error = true;
    if(isset($_POST['societydesc'])) $societydesc = $_POST['societydesc']; else $societydesc ='';
    if($error) echo '{"status":"fail"}';
    else{
        include ('dbConnect.php');
        $sql = "INSERT INTO yhdistys (YhdistysNimi, Paikkakunta, Maa, Kuvaus) VALUES ('$societyname', '$societyplace', '$societycountry', '$societydesc')";
        if ($conn->query($sql)===true) echo '{"status":"ok"}';
        else echo '{"status":"fail"}';
    }
}

?>