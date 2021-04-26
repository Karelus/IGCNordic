<?php
/*
    file: php/passwordCrypted.php
    date: 26.4.2019
    auth: Karel H
    desc: Crypts the password
*/
$newpw = 12345;
$newpassword=password_hash($newpw,PASSWORD_DEFAULT);
echo $newpassword;
?>