<?php
/*
    file: php/logout.php
    date: 25.4.2019
    auth: Karel H
    desc: Destroys session informations
*/
header("Acces-Control-Allow-Origin: * "); //can also be called from mobile devices
session_start();
session_destroy();
echo '{"status":"You have logged out!"}'
?>