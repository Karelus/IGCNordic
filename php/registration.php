<?php
/*
    file: php/registration.php
    date: 15.5.2019
    auth: Karel H
    desc: Registers member into database
*/
header("Access-Control-Allow-Origin: * ");
if (empty($_POST)) echo '{"status":"fail"}';
else {
    $error = false;
    $message = '';
    //$password = '$2y$10$dT.naD1NGot5qeoglMg3I.d.YDLnJxGwrRs88Oyd9qsqngTluUt/S';
    if (!empty($_POST['name'])) $name = $_POST['name']; else $error = true;
    if (!empty($_POST['lastname'])) $lastname = $_POST['lastname']; else $error = true;
    if (!empty($_POST['date'])) $date = $_POST['date']; else $date = '';
    if (!empty($_POST['streetaddress'])) $streetaddress = $_POST['streetaddress']; else $streetaddress = '';
    if (!empty($_POST['postalcode'])) $postalcode = $_POST['postalcode']; else $postalcode = '';
    if (!empty($_POST['city'])) $city = $_POST['city']; else $city = '';
    if (!empty($_POST['country'])) $country = $_POST['country']; else $country = '';
    if (!empty($_POST['mobile'])) $mobile = $_POST['mobile']; else $mobile = '';
    if (!empty($_POST['skills'])) $skills = $_POST['skills']; else $skills = '';
    if (!empty($_POST['password'])) $password = $_POST['password']; else $error = true;
    if (!empty($_POST['password2'])) $password2 = $_POST['password2']; else $error = true;
    //check email
    include ('checkEmail.inc');
    if (validEmail($_POST['email'])) $email = $_POST['email'];
    else {
         $error = true;
         $message.='Email not correct!';
         $email = '';
    }
    // check password
    if ($password == $password2){
    $passwordcrypted = password_hash($password, PASSWORD_DEFAULT);
    } else {
        $error = true;
        $message.='Passwords dont match!';
    }
    // generate membernumber parts
    $numberCountry = substr($country,0,1);
    $regDate = date('Y-m-d');
    $numberDate = explode('-', $regDate);
    $numberName = substr($name,0,1).substr($lastname,0,1);

    include ('dbConnect.php');
    // checks that email is not already taken by some other user
    $sql = "SELECT Email FROM jasen WHERE Email='$email'";
    $result = $conn->query($sql);
	if ($result->num_rows > 0){
        $error = true;
        $message.='Email already taken!';
    }
    if (!$error){
        $sql="INSERT INTO jasen (Etunimi, Sukunimi, Email, Salasana, SyntymaAika, Katuosoite, Postinumero, Postitoimipaikka, Maa, Puhelin, Osaaminen) ";
        $sql.="VALUES ('$name', '$lastname', '$email', '$passwordcrypted', '$date', '$streetaddress', '$postalcode', '$city', '$country', '$mobile', '$skills')";
        if($conn->query($sql)===TRUE) {
            $id = mysqli_insert_id($conn);
            $idPart = str_pad($id, 5, '0', STR_PAD_LEFT);
            $membernumber = $numberCountry.$numberDate[0].$numberDate[1].$numberDate[2].$idPart.$numberName;
            $sql = "UPDATE jasen SET Jasennumero='$membernumber' WHERE JasenID='$id'";
            $conn->query($sql);
            echo '{"status":"ok"}';
        }  else echo '{"status":"Error with registering, try again later"}';
    } else echo '{"status":"'.$message.'"}';
} ;
?>