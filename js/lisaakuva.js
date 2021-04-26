let polku="http://localhost/IGCnordic/php/";
$(document).ready(function(){
	$("#etusivuKuvaFrm").submit(function(){
		talletaKuva();
		return false;
	});
});
function talletaKuva(){
	let kuvateksti=$("#kuvateksti").val();
	let etusivuKuva=$("#etusivuKuva").val();
	let file_data=$("#etusivuKuva").prop("files")[0]; //varsinainen tiedostosisältö
	//poimitaan myös tiedoston tiedot ja data
	let form_data=new FormData(); //luo FormData objektin
		form_data.append("etusivuKuva",file_data); 
		form_data.append("kuvateksti",kuvateksti);
		$.ajax({
			url:polku+'talletaEtusivukuva.php',
			dataType:'html',
			cache:false,
			contentType:false,
			processData:false,
			data:form_data,
			type:'post'
		}
		).done(function(data){
			//Ajax-kutsu onnistui, tuli vastaus ohjelmalta
			let result=$.parseJSON(data);
			if(result.status=='ok'){
				alert('Image saved!');
			}else alert(result.status);
		}).fail(function(data){
			//Ajax-kutsu ei onnistunut jostain syystä
			alert('Problem with saving');
		});
}