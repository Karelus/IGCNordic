<?php
/*
	file:	php/talletaProfiilikuva.php
	desc:	Tallentaa kuvatiedoston ja päivittää tietokantaa
*/
header("Access-Control-Allow-Origin: * "); 
if(!empty($_POST)){
	//lomakkeen kentät
	$kuvateksti=$_POST['kuvateksti'];
	$kuva=basename($_FILES["etusivuKuva"]["name"]); //kuvatiedoston nimi
	$viesti='';
	$uploadOk=1; //tarkistetaan, että tiedosto ladattu palvelimelle
	$target_dir="../images/slideshow/";
	$target_file=$target_dir.$kuva;
	$imageFileType=strtolower(pathinfo($target_file,PATHINFO_EXTENSION)); //poimii tiedostotyypin esim .jpg
	//haetaan nykyisen kuvan nimi tietokannasta
	include('dbConnect.php');
	//kuvatiedoston tarkistus
	if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["etusivuKuva"]["tmp_name"]);
		if($check !== false) {
			$viesti= "File is an image - " . $check["mime"] . ".";
			$uploadOk = 1;
		} else {
			$viesti= "File is not an image.";
			$uploadOk = 0;
		}
	}
	// Check if file already exists
	if (file_exists($target_file)) {
		$viesti.= "Sorry, file already exists.";
		$uploadOk = 0;
	}
	// Check file size
	if ($_FILES["etusivuKuva"]["size"] > 1000000) {
		$viesti.= "Sorry, your file is too large.";
		$uploadOk = 0;
	}
	// Allow certain file formats
	if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
		$viesti.= "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
		$uploadOk = 0;
	}
	//jos ei tarkistuksissa virheitä, talletus
	if($uploadOk==0) echo '{"status":"'.$viesti.'"}'; //jokin virhe kuvatiedostossa
	else{
		if(move_uploaded_file($_FILES["etusivuKuva"]["tmp_name"],$target_file)){ //uusi kuva talletetaan
			$sql="INSERT INTO kuvat(KuvaNimi,KuvaTeksti) VALUES('$kuva','$kuvateksti')";
			if($conn->query($sql)===TRUE) echo '{"status":"ok"}';
			else echo '{"status":"Ei voinut päivittää. Yritä kohta uudelleen."}';
		}else echo '{"status":"fail"}';
	}
}else echo '{"status":"fail"}';
?>