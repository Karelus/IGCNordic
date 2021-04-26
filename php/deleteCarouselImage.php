<?php
/*
    file: php/deleteCarouselImage.php
    date: 15.5.2019
    auth: Karel H
    desc: Deletes carousel image from the database and folder
*/
header("Access-Control-Allow-Origin: * ");
if (empty($_GET['id'])) echo '{"status":"Something went wrong"}';
else {
    $imgID = $_GET['id'];
    include ('dbConnect.php');
    $sql = "SELECT KuvaNimi FROM kuvat WHERE KuvaID=$imgID";
    $result = $conn->query($sql);
    if ($result->num_rows > 0){
        $row = $result->fetch_assoc();
        $target_dir = "../images/slideshow/";
        unlink($target_dir.$row['KuvaNimi']);
        $sql = "DELETE FROM kuvat WHERE KuvaID=$imgID";
        if ($conn->query($sql)===true) echo '{"status":"ok"}';
        else echo '{"status":"fail"}';
    } else echo '{"status":"fail"}';
}
?>