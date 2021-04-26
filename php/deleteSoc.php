<?php 
/*
    file: php/deleteSoc.php
    date: 6.5.2019
    auth: Karel H
    desc: Deletes society from database from table 'yhdistys'
*/
header("Acces-Control-Allow-Origin: * "); //can bealso called from mobile devices
if(empty($_GET['id'])) echo '"status":"fail"';
else{
    include('dbConnect.php');
    $sql = "DELETE FROM yhdistys WHERE YhdistysID =".$_GET['id'];
    if ($conn->query($sql)===true) echo '{"status":"ok"}';
        else echo '{"status":"fail"}';
}

?>