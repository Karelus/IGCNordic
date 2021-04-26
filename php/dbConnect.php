<?php 
/*
    file: dbConnect.php
    date: 25.4.2019
    auth: Karel H
    desc: Database connection to igcnordic - database
*/
$server = 'localhost';
$database = 'igcnordic';
$dbIdentifier = 'igcnordic';
$dbPassword = 'igcnordic';

$conn = new mysqli($server,$dbIdentifier,$dbPassword,$database);

if( $conn->connect_error){
    die('Database connection not working: '.$conn->connect_error);
}

mysqli_set_charset($conn, "utf-8");
?>