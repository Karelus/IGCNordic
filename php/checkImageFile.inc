<?php
	/*
		file:	php/checkImageFile.inc
		desc:	Tarkistaa kuvatiedostosta ominaisuuksia
	*/
	// Check if image file is a actual image or fake image
	if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["memberImgFile"]["tmp_name"]);
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
	if ($_FILES["memberImgFile"]["size"] > 500000) {
		$viesti.= "Sorry, your file is too large.";
		$uploadOk = 0;
	}
	// Allow certain file formats
	if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
		$viesti.= "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
		$uploadOk = 0;
	}
?>