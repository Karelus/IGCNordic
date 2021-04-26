let path="http://localhost/IGCnordic/php/";
let ownID; //checks own infos for example when own infos are being edited
let isAdmin = false; //can show more info to the user if true

$(document).ready(function(){
    let url =window.location.href;
    let userID =url.split('id=').pop();
    showCard(userID);
});

function showCard(userID){
    $.get (path+'getMembers.php?id='+userID,function(data){
        let result = $.parseJSON(data);
        $.each (result.jasenet,function(key,jasen){
            let name = jasen.Etunimi+' '+jasen.Sukunimi;
            $("#name").html(name);
            $("#email").html(jasen.Email);
            $("#img").attr('src','images/profilepics/'+jasen.Kuva);
            $("#cardcountry").html(jasen.Maa);
            $("#cardplace").html(jasen.Postitoimipaikka);
            $("#barcode").barcode(jasen.Jasennumero,"code128");
        });
    });
}