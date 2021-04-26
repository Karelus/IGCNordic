<?php
/*
	file:	php/teePDF.php
	desc:	Displays and saves a PDF-file
*/
$id=$_GET['id'];
include('./fpdf/fpdf.php');
class PDF extends FPDF{
	function Header(){
		$this->SetFont('Arial','B',15);
		$this->SetFillColor(210,220,220);
		$this->SetTextColor(26,106,156);
		$this->Image('../images/igclogo.jpg',80,2);
		$this->Ln(35); //empty lines
		$title="Inter Nordic Guide Club";
		$this->Cell(0,10,$title,1,1,'C',true);
		$this->Ln(5); //empty lines
		$this->Cell(0,1,'','B',1);  //line drawn
	}

	function Footer(){
		$this->SetFont('Arial','B',8);
		$this->SetY(-15);
		$this->Cell(0,2,'','B',1);
		$this->Cell(0,5,'Page '.$this->Pageno().'/{nb}',0,0,'C');
	}
}

//create the PDF-document
$pdf=new PDF();
$pdf->AliasNbPages(); //page numbers
$pdf->AddPage();	//adds the first page
$pdf->SetFont('Arial','B',10);

//column headers
$pdf->Cell(10,10,'ID',0,0,'C');
$pdf->Cell(20,10,'Etunimi',0,0,'L');
$pdf->Cell(30,10,'Sukunimi',0,0,'L');
$pdf->Cell(60,10,'Email',0,0,'L');
$pdf->Cell(20,10,'Puhelin',0,0,'R');
$pdf->Cell(30,10,'Rooli',0,1,'L');
$pdf->Cell(0,1,'','B',1);  //line drawn
$pdf->SetFont('Arial','',10);

//content from database
include('dbConnect.php'); //use db.php from one folder up
$sql="SELECT jasen.JasenID,jasen.Etunimi,jasen.Sukunimi,jasen.Email,jasen.Puhelin,jasen.Rooli ";
$sql.="FROM jasen INNER JOIN jasenyys ON jasen.JasenID=jasenyys.JasenID WHERE jasenyys.YhdistysID=$id" ;
$sql.=" ORDER BY Sukunimi, Etunimi";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
	// output data of each row
	$counter=0;
	while($row = $result->fetch_assoc()){
		$pdf->Cell(10,10,$row["JasenID"],0,0,'C');
		$fname=iconv('UTF-8', 'windows-1252', $row["Etunimi"]);
		$pdf->Cell(20,10,$fname,0,0,'L');
		$lname=iconv('UTF-8', 'windows-1252', $row["Sukunimi"]);
		$pdf->Cell(30,10,$lname,0,0,'L');
		$pdf->Cell(60,10,$row["Email"],0,0,'L');
		$pdf->Cell(20,10,$row["Puhelin"],0,0,'R');
		$pdf->Cell(30,10,$row["Rooli"],0,1,'L');
		$counter++;
		if($counter==5){
			$pdf->AddPage();
			$counter=0;
		}
	}

}

//add rest of the page
$pdf->Cell(0,1,'','B',1);  //line drawn
$timestamp=date("H:i d.m.Y");
$pdf->Cell(20,10,$timestamp,0,1,'L');
//Display and save the PDF
$filename="jasenet_$id.";
$pdf->Output("../files/".$filename."pdf","F"); //saves file
$pdf->Output();	//displays in browser
?>