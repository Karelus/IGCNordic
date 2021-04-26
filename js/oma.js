let path="http://localhost/IGCnordic/php/";
let ownID; //checks own infos for example when own infos are being edited
let isAdmin = false; //can show more info to the user if true
let jasenListaStart = 0; //global variable for memberlist paging

$(document).ready(function(){
    getFrontpageText();
    $("#slideshow").show(showSlideShow());
    showCarousel();
    if (isAdmin) $("#editFrontpageBtn").show();
    $("#liHome").addClass('active');
        loggedIn(); // check if user has logged in
    $("#frmlogin").submit(function(){
        login();
        return false; //blocks reloading of the page when submitting
    });
    $("#logoutbtn").click(function(){
        logout();
    });
    $("#updatePasswordFrm").submit(function(){
        updatePassword();
        return false;
    });
    $("#owninfo").on('show.bs.modal',function(){
        $("#ownInfo").html('');
        $("#passwordInfo").html('');
        showInfo();
    });
    $("#navbarResponsive").on('click','.nav-item',function(){
        $(".nav-item").removeClass('active');
    });
    $("#liMemberLink").click(function(){
        $("#liMemberLink").addClass('active');
        $("#liSocLink").removeClass('active')
        showMemberList();
        $("#editFrontpageBtn").hide();
        $("#carousel").hide();
        $("#carouselImages").hide();
        $("#editCarouselBtn").hide();
    });
    $("#liSocLink").click(function(){
        $("#liSocLink").addClass('active');
        $("#liMemberLink").removeClass('active')
        showSocList();
        $("#editFrontpageBtn").hide();
        $("#carousel").hide();
        $("#carouselImages").hide();
        $("#editCarouselBtn").hide();
    });
    $("#resultContent").on('click','.memberNumber',function(){
        let userID = $(this).attr('data-userID');
        editMember(userID);
        $("#hideCol").show();
    });
    $("#SocietyFrm").submit(function(){
		addSociety();
		return false;
	});
    $("#resultContent").on('click','.deleteSoc',function(){
        let socID = $(this).attr('data-socID');
        deleteSoc(socID);
    });
    $('#resultContent').on('click','.cancelSocDel',function(){
        showSocList();
    });
    $("#resultContent").on('click','.confirmSocDel',function(){
        let socID = $(this).attr('data-socID');
        confirmSocDel(socID);
    });
    $("#memberInfosForm").submit(function(){
        editMemberBasic();
        return false;
    });
    $("#memberImgFrm").submit(function(){
        editMemberImg();
        return false;
    });
    $("#editMember").on('click','.delimg',function(){
        let userID = $(this).attr('data-imgID');
        deleteMemberImage(userID);
    });
    $("#ownInfoFrm").submit(function(){
        updateOwnInfo();
        return false;
    });
    $("#resultContent").on('click','.membercard',function(){
        let userID = $(this).attr('data-cardID');
        new_url = 'kortti.html?id='+userID;
        window.open(new_url,'blank');         
    });
    $("#editFrontpageBtn").click(function(){
        editFrontpage();
    });
    $("#EditFrontpageFrm").submit(function(){
        saveFrontpage();
        showCarousel();
        return false;
    });
    $("#result2").on('click','.showOwnSoc',function(){
        selectOwnSoc();
        $("#result").html('');
        $("#result2").html('<a href="#" class="btn btn-danger backToSoc">Back</a>')
    });
    $("#resultContent").on('submit','#ownSocFrm',function(){
        updateMembership($("#mySociety").val());
        return false;
    });
    $("#resultContent").on('click','.deleteMembership',function(){
        let socID = $(this).attr('data-socID');
        deleteMembership(socID);
    });
    $('#result2').on('click','.backToSoc',function(){
        showSocList();
    });

    $("#SearchSoc").keyup(function(){
        let value = $(this).val().toLowerCase();
        $("#resultContent .societyTable tr").filter(function(){
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
        $("#SearchSoc").keyup(function(){
            let value = $(this).val().toLowerCase();
            $("#resultContent .logoutTable tr").filter(function(){
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            });
        });
    $("#SearchMemb").keyup(function(){
        let value = $(this).val().toLowerCase();
        $("#resultContent .memberTable tr").filter(function(){
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
    $("#resultContent").on('click','.socRow',function(){
        let socID = $(this).attr('data-ID');
        societyMembers(socID);
    });
	$("#resultContent").on('click','.prevJasenlista',function(){
		let start=$(this).attr('data-start');
		jasenListaStart=start;
		showMemberList();
	});
	$("#resultContent").on('click','.nextJasenlista',function(){
		let start=$(this).attr('data-start');
		jasenListaStart=start;
		showMemberList();
    });
    $("#resultContent").on('click','.nroJasenlista',function(){
		let start=$(this).attr('data-start');
		jasenListaStart=start;
		showMemberList();
    });
    $("#editCarouselBtn").click(function(){
        manageImages();
    });
    $("#resultContent").on('click','.addCarouselImage',function(){
        new_url='lisaakuva.html';
        window.open(new_url,'_blank');
    });
    $("#resultContent").on('click','.updateCarouselImage',function(){
        manageImages();
    });

    $("#resultContent").on('click','.deleteCarouselImage',function(){
        let imgID = $(this).attr('data-id');
        deleteCarouselImage(imgID);
    });
    $("#registerbutton").click(function(){
        registerFormOpen();
    });
    $("#resultContent").on('submit','.regForm',function(){
        registerFormSubmit();
        return false;
    });
    $("#resultContent").on('click','.hideAdminRights',function(){
        let userID = $(this).attr('data-userID');
        editMember(userID);
        $("#hideCol").hide();
    });
    $("#resultContent").on('click','.memberNumberDel',function(){
        let userID = $(this).attr('data-userID');
        showDelButton(userID);
    });
    $("#delButtonHere").on('click','.deleteUserBtn',function(){
        let userID = $(this).attr('data-id');
        deleteUser(userID);
    });
    $("#liLoggedOut").click(function(){
        $("#LoggedOutSocLink").addClass('active');
        LoggedOutList();
    });
    $("#resultContent").on('click','.socRowLoggedOut',function(){
        let socID = $(this).attr('data-ID');
        showMembersLoggedOut(socID);
    });
    $("#resultContent").on('click','.userinfocard',function(){
        let userID = $(this).attr('data-userID');
        showUserCard(userID);
    });
    $("#resultContent").on('click','.EditsocietyNumber',function(){
        let socID = $(this).attr('data-socID');
        ShowEditSoc(socID);
    });
    $("#EditSocietyFrm").submit(function(){
        EditSoc();
        return false;
    });
});
function EditSoc(){
    let socID  = $("#EditsocietyID").val();
    let socName = $("#Editsocietyname").val();
    let socPlace = $("#Editsocietyplace").val();
    let socCountry = $("#Editsocietycountry").val();
    let socDesc = $("#Editsocietydesc").val();
    $.post(path+'updateSociety.php',{
        socID:socID,
        socName:socName,
        socPlace:socPlace,
        socCountry:socCountry,
        socDesc:socDesc
    },function(data){
        let result = $.parseJSON(data);
        if (result.status=='ok'){
            $("#EditsocietyFrmInfo").html('<p class="alert alert-success">Updated successfully!</p>')
            showSocList();
            setTimeout(function(){
                $("#editSociety").modal('hide');
                $("#EditsocietyFrmInfo").html('');
                loggedIn();
			},2000);
        } else {
            $("#EditsocietyFrmInfo").html('<p class="alert alert-danger">Something went wrong, try again later!"</p>')
        }
    });
}

function ShowEditSoc(socID){
    $.get(path+'getSoc.php?id='+socID,function(data){
        let result=$.parseJSON(data);
        $.each(result.societies,function(key,soc){
            $("#EditsocietyID").val(socID);
            $("#Editsocietyname").val(soc.YhdistysNimi);
            $("#Editsocietyplace").val(soc.Paikkakunta);
            $("#Editsocietycountry").val(soc.Maa);
            $("#Editsocietydesc").val(soc.Kuvaus);
        });
    });
}

function showUserCard(userID){
    $("#result").html('<a href="#" onClick="showMemberList()" class="btn btn-danger">Back</a>');
    $("#result2").html('');
    $("#carousel").hide();
    $.get(path+'getUserInfo.php?id='+userID,function(data){
        let result = $.parseJSON(data);
        $.each(result.users,function(key,user){
        let text = '<h3>Member Information</h3><br />';
        text=text+'<div class="row d-flex justify-content-center text-dark">';
        text=text+'<div class="col-md-6">';
        text=text+'<div class="card" style="max-width: 20rem;">';
        if (user.Kuva != 'avatar.png'){
        text=text+'<img class="card-img-top" src="images/profilepics/'+user.Kuva+'" alt="Card image cap">';
        } else {
        text=text+'<img class="card-img-top" src="images/avatar.png" alt="Card image cap">';
        }
        text=text+'<div class="card-body">';
        text=text+'<h4 class="card-title">'+user.Etunimi+' '+user.Sukunimi+'</h4>';
        text=text+'<p class="card-text">Email: <b>'+user.Email+'</b></p>';
        text=text+'<p class="card-text">Mobile: <b>'+user.Puhelin+'</b></p>';
        text=text+'<p class="card-text">Place: <b>'+user.Postitoimipaikka+'</b></p>';
        text=text+'<p class="card-text">Country: <b>'+user.Maa+'</b></p>';
        text=text+'<p class="card-text">Languages: <b>'+user.Osaaminen+'</b></p>';
        text=text+'</div>';
        text=text+'</div>';
        text=text+'</div>';
        text=text+'</div>';
        $("#resultContent").html(text);
        });
    }); 
}

function showMembersLoggedOut(socID){
    let societyName = '';
    let text = ' - members</h3>';
    $.get(path+'societyMembers.php?id='+socID,function(data){
        let result = $.parseJSON(data);
        text=text+'<table class="table table-dark"><thead><tr><th>Name</th><th>Email</th><th>Mobile</th><th>Languages</th></tr></thead><tbody>';
        $.each(result.jasenet,function(key,jasen){
            text=text+'<tr>';
            text=text+'<td>';
            text=text+jasen.Etunimi+' '+jasen.Sukunimi;
            text=text+'</td>';
            text=text+'<td>';
            text=text+jasen.Email;
            text=text+'</td>';
            text=text+'<td>';
            text=text+jasen.Puhelin;
            text=text+'</td>';
            text=text+'<td>';
            text=text+jasen.Osaaminen;
            text=text+'</td>';
            text=text+'</tr>';
            societyName='<h3>'+jasen.YhdistysNimi;
        });
        text=text+'</tbody></table>';
        text=text+'<p><a href="php/teePDF.php?id='+socID+'" target="_blank" class="btn-sm btn-dark">Create PDF-document</a></p>';
        $("#resultContent").html(societyName+text);
        $("#result").html('<a href="#" onClick="LoggedOutList()" class="btn btn-danger">Back</a>');
        $("#result2").html('');
    });
}

function LoggedOutList(){
    $("#carousel").hide();
    $("#result").html('');
    let infos = '<h3 class="text-white">Societies</h3><table class="table table-dark logoutTable">';
    infos=infos+'<thead><tr><th>Name</th><th>Place</th><th>Country</th></tr></thead><tbody>';
    $.get(path+'getSoc.php',function(data){
        let result=$.parseJSON(data);
        $.each(result.societies,function(key,soc){
        infos=infos+'<tr>';
        infos=infos+'<td class="socRowLoggedOut" data-id="'+soc.YhdistysID+'">';
        infos=infos+'<a href="#">'+soc.YhdistysNimi+'</a>';
        infos=infos+'</td>';
        infos=infos+'<td>';
        infos=infos+soc.Paikkakunta;
        infos=infos+'</td>';
        infos=infos+'<td>';
        infos=infos+soc.Maa;
        infos=infos+'</td>';
        infos=infos+'</tr>';
        });
        infos=infos+'</tbody></table>';
        $("#resultContent").html(infos);
    });
    $("#SearchSoc").show();
    $("#SearchMemb").hide();
}

function showDelButton(userID){
    let memberID = userID;
    $("#delButtonHere").html('<button class="btn btn-danger deleteUserBtn" data-id="'+memberID+'">Delete</button>');
}

function deleteUser(userID){
   $.get(path+'deleteUser.php?id='+userID,function(data){
       let result = $.parseJSON(data);
         if (result.status=='ok'){
              $("#delMemberInfo").html('<p class="alert alert-success">User deleted successfully</p>');
              showMemberList();
              setTimeout(function(){
                $("#delMemberInfo").html('hide');
                $("#delMemberModal").modal('hide');
			},2000);
         } else {
            alert('Something went wrong, try again later!');
         }      
    });
}

function registerFormSubmit(){
    let name = $('#regFirstName').val();
    let lastname = $('#regLastName').val();
    let email = $('#regEmail').val();
    let date = $('#regDate').val();
    let streetaddress = $('#regStreetAddress').val();
    let postalcode = $('#regPostal').val();
    let city = $('#regCity').val();
    let country = $('#regCountry').val();
    let mobile = $('#regMobile').val();
    let skills = $('#regSkills').val();
    let password = $('#regPassword').val();
    let password2 = $('#regPassword2').val();
    $.post(path+'registration.php',{
        name:name,
        lastname:lastname,
        email:email,
        date:date,
        streetaddress:streetaddress,
        postalcode:postalcode,
        city:city,
        country:country,
        mobile:mobile,
        skills:skills,
        password:password,
        password2:password2
    }, function(data){
        let result = $.parseJSON(data);
        if (result.status=='ok'){
            alert('Successfully registered! Please login to continue');
            window.location.href = "index.html";
        } else {
            alert(result.status);
        }
    });
}

function registerFormOpen(){
    //registeration form
    let text = '<h3>Register</h3>';
    $("#carousel").html('');
    $("#carouselImages").html('');
    $("#result").html('<a href="index.html" class="btn btn-danger">Back</a>');  
    text=text+'<form class="regForm" id="registerForm">';
    text=text+'<div class="form-row">';
        text=text+'<div class="col">';
            text=text+'<label for="regFirstName">Firstname:</label>';
            text=text+'<input type="text" class="form-control" id="regFirstName" required />';
        text=text+'</div>';
        text=text+'<div class="col">';
            text=text+'<label for="regLastName">Lastname:</label>';
            text=text+'<input type="text" class="form-control" id="regLastName" required />';
        text=text+'</div>';
        text=text+'<div class="col">';
            text=text+'<label for="regEmail">Email:</label>';
            text=text+'<input type="email" class="form-control" id="regEmail" required />';
        text=text+'</div>';
    text=text+'</div><br>';

    text=text+'<div class="form-row">'; 
        text=text+'<div class="col">';
            text=text+'<label for="regDate">Date of Birth:</label>';
            text=text+'<input type="date" class="form-control" id="regDate" />';
        text=text+'</div>';
        text=text+'<div class="col">';
            text=text+'<label for="regStreetAddress">Street Address:</label>';
            text=text+'<input type="text" class="form-control" id="regStreetAddress"/>';
        text=text+'</div>';
        text=text+'<div class="col">';
            text=text+'<label for="regPostal">Postal Code:</label>';
            text=text+'<input type="text" class="form-control" id="regPostal"/>';
        text=text+'</div>';
    text=text+'</div><br>';

    text=text+'<div class="form-row">'; 
        text=text+'<div class="col">';
            text=text+'<label for="regCity">City:</label>';
            text=text+'<input type="text" class="form-control" id="regCity"/>';
        text=text+'</div>';
        text=text+'<div class="col">';
            text=text+'<label for="regCountry">Country:</label>';
            text=text+'<input type="text" class="form-control" id="regCountry" required />';
        text=text+'</div>';
        text=text+'<div class="col">';
            text=text+'<label for="regMobile">Mobile Number:</label>';
            text=text+'<input type="text" class="form-control" id="regMobile"/>';
        text=text+'</div>';
    text=text+'</div><br>';

    text=text+'<div class="form-row">'; 
        text=text+'<div class="col-sm-4">';
            text=text+'<label for="regSkills">Language Skills:</label>';
            text=text+'<input type="textbox" class="form-control" id="regSkills" placeholder="English, Swedish, Chinese"/>';
        text=text+'</div>';
        text=text+'<div class="col-sm-4">';
            text=text+'<label for="regPassword">Password:</label>';
            text=text+'<input type="password" class="form-control" id="regPassword" required />';
        text=text+'</div>';
        text=text+'<div class="col-sm-4">';
        text=text+'<label for="regPassword2">Password Again:</label>';
        text=text+'<input type="password" class="form-control" id="regPassword2" required/>';
    text=text+'</div>';
    text=text+'</div><br>';

    text=text+'<button type="submit" class="btn btn-dark btn-block" style="margin-bottom: 10px;">Register</button>';
    text=text+'</form>';

    $("#resultContent").html(text);
}

function deleteCarouselImage(imgID){
$.get(path+'deleteCarouselImage.php?id='+imgID,function(data){
    let result = $.parseJSON(data);
        if (result.status=='ok'){
            alert('deleted!')
            manageImages();
        } else {
            alert (result.status);
        }
    });
}

function manageImages(){
    $("#carousel").hide();
    $("#carouselImages").hide();
    let text = '<h3>Manage frontpage images</h3>';
    text=text+'<p><button class="addCarouselImage btn btn-info">Add image</button>';
    text=text+'<span><button class="updateCarouselImage btn btn-dark" style="margin-left:10px;">Update view</button></span></p>';
    $.get(path+'getImages.php',function(data){
        text=text+'<div class="card-deck">';
        let result = $.parseJSON(data);
        $.each(result.images,function(key,image){
            text=text+'<div class="card bg-dark">';
            text=text+'<div class="card-body text-center" style="padding:0px; border:0px;">';
            text=text+'<img src="images/slideshow/'+image.KuvaNimi+'" class="img-fluid mx-auto thumbnail" alt="">';
            text=text+'<p>'+image.KuvaTeksti+'</p>'
            text=text+'<button class="btn btn-danger deleteCarouselImage" style="position:absolute; top:0px; left:0px;" data-id="'+image.KuvaID+'">&times;</button>';
            text=text+'</div>';
            text=text+'</div>';
        });
        text=text+'</div>'
    $("#resultContent").html(text);
    });
}

function showCarousel(){
    let text = '<div class="carousel-inner">';
    $.get(path+'showSlideShow.php?lkm=3',function(data){
        let result = $.parseJSON(data);
            text=text+'<div class="carousel-item active">';
            text=text+'<img src="images/slideshow/'+result.images[0].KuvaNimi+'" class="img-fluid mx-auto d-block thumbnail" alt="" width="600px">';
            text=text+'</div>';
            text=text+'<div class="carousel-item">';
            text=text+'<img src="images/slideshow/'+result.images[1].KuvaNimi+'" class="img-fluid mx-auto d-block thumbnail" alt="" width="600px">';
            text=text+'</div>';
            text=text+'<div class="carousel-item">';
            text=text+'<img src="images/slideshow/'+result.images[2].KuvaNimi+'" class="img-fluid mx-auto d-block thumbnail" alt="" width="600px">';
            text=text+'</div>';
            text=text+'</div>';
        $("#carouselImages").html(text);
    });
}

function showSlideShow(){
    $.get(path+'showSlideShow.php',function(data){
        let result = $.parseJSON(data);
        let text = '<img class="img-fluid mx-auto d-block thumbnail" src="images/slideshow/'+result.images[0].KuvaNimi+'" alt="" width="600px">';
        $("#slideshow").html(text);
    });
}

function societyMembers(socID){
    let societyName = '';
    let text = ' - members</h3>';
    $.get(path+'societyMembers.php?id='+socID,function(data){
        let result = $.parseJSON(data);
        text=text+'<table class="table table-dark"><thead><tr><th>Name</th><th>Email</th></tr></thead><tbody>';
        $.each(result.jasenet,function(key,jasen){
            text=text+'<tr>';
            text=text+'<td>';
            text=text+jasen.Etunimi+' '+jasen.Sukunimi;
            text=text+'</td>';
            text=text+'<td>';
            text=text+jasen.Email;
            text=text+'</td>';
            text=text+'</tr>';
            societyName='<h3>'+jasen.YhdistysNimi;
        });
        text=text+'</tbody></table>';
        text=text+'<p><a href="php/teePDF.php?id='+socID+'" target="_blank" class="btn-sm btn-dark">Create PDF-document</a></p>';
        $("#resultContent").html(societyName+text);
        $("#result").html('<a href="#" onClick="showSocList()" class="btn btn-danger">Back</a>');
        $("#result2").html('');
    });
}

function deleteMembership(socID){
    $.get(path+'deleteMembership.php?id='+socID,function(data){
        selectOwnSoc();
    });
}

function updateMembership(choose){
    $.post(path+'updateMembership.php',{
        userID:ownID,
        socID:choose
    },function(data){
        let result = $.parseJSON(data);
        if(result.status=='ok'){
            selectOwnSoc();
        } else {
            alert('Cannot be updated!')
        }
    });
}

function selectOwnSoc(){
    $("#resultContent").html('<h3>Own Society</h3>');
    let own = '<h5>Current membership</h5>';
    own=own+'<table class="table table-dark"><thead><tr><th>Name</th><th>Place</th></tr></thead><tbody>'
    $.get(path+'getMembership.php',function(data){
        let result = $.parseJSON(data);
        $.each(result.yhdistykset,function(key,yhdistys){
            own=own+'<tr>';
            own=own+'<td>';
            own=own+yhdistys.YhdistysNimi;
            own=own+'</td>';
            own=own+'<td>';
            own=own+yhdistys.Paikkakunta;
            own=own+'</td>'; 
            own=own+'<td>';
            own=own+'<button class="btn btn-danger float-right deleteMembership" data-socID="'+yhdistys.YhdistysID+'">&times;</button>';
            own=own+'</td>';            
            own=own+'</tr>';
        });
        own=own+'</tbody></table>';
        $("#resultContent").append(own);
    });
    let text = '<h4>Pick Society</h4>';
    text=text+'<form id="ownSocFrm"';
    text=text+'<div class="form-group">';
    text=text+'<label for="mySociety">Own Society:</label>';
    text=text+'<select class="form-control" id="mySociety" style="max-width:400px;">';
    text=text+'<option value="">-Choose-</option>';
    $.get(path+'getSocPick.php',function(data){
        let result = $.parseJSON(data);
        $.each(result.yhdistykset,function(key,yhdistys){
            text=text+'<option value="'+yhdistys.YhdistysID+'">'+yhdistys.YhdistysNimi+'</option>';
        });
    text=text+'</select></div>';
    text=text+'<button type="submit" class="btn btn-info" style="margin-top:10px;">Update</button></form>';
    $("#resultContent").append(text);
    });
    $("#SearchSoc").hide();
    $("#SearchMemb").hide();
}

function saveFrontpage(){
    let text = $("#textbox").val();
    $.post(path+'updateFrontpage.php',{text:text},function(data){
        let result = $.parseJSON(data);
        if (result.status='ok'){
            alert('Updated');
            editFrontpage();
            getFrontpageText();
        } else {
            alert('Error when updating');
        }
    });
}

function editFrontpage(){
    let text = '';
    $.get(path+'getFrontpageText.php',function(data){
        let result = $.parseJSON(data);
        tinyMCE.get('textbox').setContent(result.text);
        $("#timestamp").html('Last updated: <strong>'+result.timestamp+'</strong>');
    });
}

function getFrontpageText(){
    let text = '';
    $.get(path+'getFrontpageText.php',function(data){
        let result = $.parseJSON(data);
        text=text+result.text;
        $("#resultContent").html(text);
    });
}

function updateOwnInfo(){
    let userID = ownID;
    let userFName = $("#firstname").val();
    let userLastname = $("#lastname").val();
    let userEmail = $("#ownemail").val();
    let dateofBirth = $("#birthdate").val();
    let streetAddress = $("#streetaddress").val();
    let postalCode = $("#postalcode").val();
    let City = $("#city").val();
    let Country = $("#country").val();
    let Mobile = $("#mobile").val();
    let Skills = $("#skills").val();
    $.post(path+'updateInfoBasic.php',{
        userID:userID,
        userFName:userFName,
        userLastname:userLastname,
        userEmail:userEmail,
        dateofBirth:dateofBirth,
        streetAddress:streetAddress,
        postalCode:postalCode,
        City:City,
        Country:Country,
        Mobile:Mobile,
        Skills:Skills
    },function(data){
        let result = $.parseJSON(data);
        if (result.status=='ok'){
            $('#ownInfo').html('<p class="alert alert-success">Information updated</p>');
            showMemberList();
            setTimeout(function(){
                $("#ownInfo").html('');
             },2500);
        } else {
            $('#ownInfo').html('<p class="alert alert-danger">'+result.status+'</p>');
        }
    });
}

function deleteMemberImage(userID){
    $.get(path+'deleteMemberImg.php?id='+userID,function(data){
        let result = $.parseJSON(data);
        if (result.status=='ok'){
            $("#imgUpdateInfo").html('<p class="alert alert-success">Image deleted successfully</p>');
            showMemberList();
            setTimeout(function(){
                editMember(userID);
            },2000);
        } else {
            $("#imgUpdateInfo").html('<p class="alert alert-danger">'+result.status+'</p>')
            setTimeout(function(){
                $("#imgUpdateInfo").html('');
            },2000);
        }
    });
}

function editMemberImg(){
    let userID = $("#memberIDimg").val();
    let memberImgFile = $("#memberImgFile").val();
    let file_data = $("#memberImgFile").prop("files")[0];
    //also pick file's information and data
    let form_data = new FormData(); //creates FormData object
        form_data.append("memberImgFile",file_data);
        form_data.append("userID",userID);
        $.ajax({
            url:path+'saveProfilepic.php',
            dataType:'html',
            cache:false,
            contentType:false,
            processData:false,
            data:form_data,
            type:'post'
        }
        ).done(function(data){
            //ajax successful
            let result = $.parseJSON(data);
            if (result.status=='ok'){
                $("#imgUpdateInfo").html('<p class="alert alert-success">Image updated!</p>');

                setTimeout(function(){
                    $("#imgUpdateInfo").html('');
                    editMember(userID);
                },2500);
            } else {
                $("#imgUpdateInfo").html('<p class="alert alert-danger">'+result.status+'</p>');
            }
        }).fail(function(data){
            //ajax failed
            $("#imgUpdateInfo").html('<p class="alert alert-danger">Problem with saving, try again!</p>');
        });
}

function editMemberBasic(){
    let userID = $("#userID").val();
    let userFName = $("#userFName").val();
    let userLastname = $("#userLastname").val();
    let dateofBirth = $("#dateofBirth").val();
    let userEmail = $("#userEmail").val();
    let userRole = $("#userRole").val();
    $.post(path+'updateInfoBasic.php',{
        userID:userID,
        userFName:userFName,
        userLastname:userLastname,
        dateofBirth:dateofBirth,
        userEmail:userEmail,
        userRole:userRole
    },function(data){
        let result = $.parseJSON(data);
        if (result.status=='ok'){
            $('#memberUpdateInfo').html('<p class="alert alert-success">Information updated</p>');
            showMemberList();
            //editMember(userID);
            setTimeout(function(){
                $("#memberUpdateInfo").html('');
             },2500);
        } else {
            $('#memberUpdateInfo').html('<p class="alert alert-danger">'+result.status+'</p>');
        }
    });
}

function confirmSocDel(socID){
    $.get(path+'deleteSoc.php?id='+socID,function(data){
        let result = $.parseJSON(data);
        if (result.status=='ok'){
           $("#confResult").html('<p class="alert alert-success">Success</p>')
           setTimeout(function(){
            showSocList();
        },2000);
        } else{
            $("#confResult").html('<p class="alert alert-danger">Fail</p>')
        }
        
    });
}

function deleteSoc(socID){
    let infos = '<h2>Delete society</h2>';
    $.get(path+'getSoc.php?id='+socID,function(data){
        let result=$.parseJSON(data);
        $.each(result.societies,function(key,soc){
            infos=infos+'<p><h5 class="text-warning">Are you sure you want to delete a society called: ';
            infos=infos+'<b>'+soc.YhdistysNimi+'</b></h5></p>';
            infos=infos+'<p><a href="#" class="btn btn-success confirmSocDel" data-socID="'+soc.YhdistysID+'">Confirm</a> ';
            infos=infos+'<span><a href="#" class="btn btn-danger cancelSocDel">Cancel</a></span></p>';
            infos=infos+'<div style="width:100px;" id="confResult"></div>'
        });
        $("#resultContent").html(infos);
        $("#result").html('');
    });
}

function addSociety(){
    let societyname = $('#societyname').val();
    let societyplace = $('#societyplace').val();
    let societycountry = $('#societycountry').val();
    let societydesc = $('#societydesc').val();
    $.post(path+'addSoc.php',{
        societyname:societyname,
        societyplace:societyplace,
        societycountry:societycountry,
        societydesc:societydesc
    }, function(data){
        let result = JSON.parse(data,function(key,value){
        return value;
        });
        if (result.status=='ok'){
             $("#societyFrmInfo").html('<p class="alert alert-success">Society added</p>');
             setTimeout(function(){
                $("#societyFrmInfo").html('');
             },2000);
             showSocList();
             $('#societyname').val('');
             $('#societyplace').val('');
             $('#societycountry').val('');
             $('#societydesc').val('');
        } else{
             $("#societyFrmInfo").html('<p class="alert alert-danger">Cant be added to the database</p>');
             setTimeout(function(){
                $("#societyFrmInfo").html('');
             },2000);
             }
    });
}

function showSocList(){
    let infos = '<h3 class="text-white">Societies</h3><table class="table table-dark societyTable">';
    infos=infos+'<thead><tr><th>Name</th><th>Place</th><th>Description</th></tr></thead><tbody>';
    $.get(path+'getSoc.php',function(data){
        let result=$.parseJSON(data);
        $.each(result.societies,function(key,soc){
        infos=infos+'<tr>';
        infos=infos+'<td class="socRow" data-id="'+soc.YhdistysID+'">';
        infos=infos+'<a href="#">'+soc.YhdistysNimi+'</a>';
        infos=infos+'</td>';
        infos=infos+'<td>';
        infos=infos+soc.Paikkakunta;
        infos=infos+'</td>';
        infos=infos+'<td>';
        infos=infos+soc.Kuvaus;
        infos=infos+'</td>';
        if(isAdmin) infos=infos+'<td><button class="btn btn-info EditsocietyNumber" data-toggle="modal" data-target="#editSociety" data-socID="'+soc.YhdistysID+'">Edit</button></td>';
        if (isAdmin){
            infos=infos+'<td><button class="btn btn-danger float-right deleteSoc" data-socID="'+soc.YhdistysID+'">&times;</button></td>';
        }
        infos=infos+'</tr>';
        });
        infos=infos+'</tbody></table>';
        $("#resultContent").html(infos);
        $("#result2").html('<button class="btn btn-dark showOwnSoc" style="margin-right:5px;">Own Society</button>');
        if(isAdmin){
        $("#result").html('<button class="btn btn-info" id="addSocbtn" data-toggle="modal" data-target="#addSociety">Add Society</button>');
        }
    });
    $("#SearchSoc").show();
    $("#SearchMemb").hide();
}

function editMember(userID){
    $.get(path+'getMembers.php?id='+userID,function(data){
        let result=$.parseJSON(data);
        $.each(result.jasenet,function(key,jasen){
            $("#userID").val(userID);
            $("#userFName").val(jasen.Etunimi);
            $("#userLastname").val(jasen.Sukunimi);
            $("#dateofBirth").val(jasen.SyntymaAika)
            $("#userEmail").val(jasen.Email);
            $("#userRole").val(jasen.Rooli);
            $("#imgUpdateInfo").html('');
            $("#memberUpdateInfo").html('');
            if(jasen.Kuva!='avatar.png'){
                $("#memberImg").attr('src', 'images/profilepics/'+jasen.Kuva);
                $("#imggone").html('<a href="#" class="btn btn-danger delimg" data-imgID="'+userID+'">Delete image</a>');
            } else {
                $("#memberImg").attr('src', 'images/avatar.png');
                $("#imggone").html('');
            }
            $("#memberIDimg").val(userID);
        });
    });
}

function showMemberList(){
    let montako=4;
    let infos = '<h3 class="text-white">Members</h3>';
    infos=infos+'<table class="table table-dark memberTable">';
    infos=infos+'<thead><tr><th>Name</th><th>Membercard</th><th>Email</th><th>Role</th></tr></thead><tbody>';
    $.get(path+'getMembers.php?start='+jasenListaStart+'&montako='+montako,function(data){
        let result=$.parseJSON(data);
        //code for pagination
        let edellinen=jasenListaStart; //remembers previous page's starting point
        let seuraava=parseInt(result[0]); //poimii JSONista start arvon (seuraavan sivun aloituskohdan)
		if(seuraava>=parseInt(result[1])*montako) seuraava=seuraava-montako; //ollaan viimeisellä sivulla
		edellinen=edellinen-montako;
		if(edellinen<0)edellinen=0;
		let pager='<ul class="pagination justify-content-end" style="margin:20px 0">';
            pager=pager+'<li class="page-item"><a class="page-link prevJasenlista" data-start="'+edellinen+'" href="#">Previous</a></li>';
            for(i=1;i<=parseInt(result[1]);i++){
				let sivuNro=(i-1)*montako;
				pager=pager+'<li class="page-item"><a class="page-link nroJasenlista" data-start="'+sivuNro+'" href="#">'+i+'</a></li>';
			}
            pager=pager+'<li class="page-item"><a class="page-link nextJasenlista" data-start="'+seuraava+'" href="#">Next</a></li>';
			pager=pager+'</ul>';
        //code for pagination
        $.each(result.jasenet,function(key,jasen){
            infos=infos+'<tr>';
            infos=infos+'<td>';
            infos=infos+'<button class="btn btn-info userinfocard" data-userID="'+jasen.JasenID+'" style="margin-right:8px;">View</button>';
            if(ownID==jasen.JasenID){
                infos=infos+'<a href="#" data-toggle="modal" data-target="#owninfo" title="Edit your info">';
            }
            infos=infos+jasen.Etunimi+' '+jasen.Sukunimi;
            if(ownID==jasen.JasenID){
                infos=infos+'</a>';
            }
            infos=infos+'</td>';
            infos=infos+'<td>';
                infos=infos+'<button class="btn btn-secondary membercard" style="margin-left:10px;" ';
                infos=infos+'data-cardID="'+jasen.JasenID+'">Card</button>';
                if(ownID==jasen.JasenID){
                    infos=infos+'<button class="btn-xs btn-info hideAdminRights" style="margin-left:5px;white-space: normal;" data-toggle="modal" data-target="#editMember" data-userID="'+jasen.JasenID+'">Edit Photo</button>';
                }

            infos=infos+'</td>';
            infos=infos+'<td>'+jasen.Email+'</td>';
            infos=infos+'<td>'+jasen.Rooli+'</td>';
            if(isAdmin) infos=infos+'<td><button class="btn btn-info memberNumber" data-toggle="modal" data-target="#editMember" data-userID="'+jasen.JasenID+'">Edit</button></td>';
            if(isAdmin) infos=infos+'<td><button class="btn btn-danger memberNumberDel" data-toggle="modal" data-target="#delMemberModal" data-userID="'+jasen.JasenID+'">&times;</button></td>';
            infos=infos+'</tr>';
        });
        infos=infos+'</tbody></table>';
    $("#resultContent").html(pager);
    $("#resultContent").append(infos);
    $("#result2").html('');
    $("#result").html('');
    if(isAdmin){
        $("#result").html('');
        }
    });
    $("#SearchSoc").hide();
    $("#SearchMemb").show();
} 

function loggedIn(){
    //ask from session.php -script if there are user info in session infos
    $.get(path+'session.php',function(data){
        let result = JSON.parse(data,function(key,value){
            return value;
        });
        if(result.status=='ok'){
            $("#loginbutton").hide(); //hides login button when logged in
            $("#logoutbutton").show(); //shows logout button when logged in
            $("#registerbutton").hide();
            $("#userTag").html(result.user); //shows which user is logged in from JSON
            //show nav items to logged in user
            $("#liMemberLink").show();
            $("#liSocLink").show();
            $("#liLoggedOut").hide();
            // ownID value from JSON to global variable
            ownID = result.ownID;
            if(result.role == 'admin') {
                isAdmin = true; //if user is admin
                $("#adminTag").html('<span class="badge badge-dark">Admin</span>');
                $("#editFrontpageBtn").show();
                $("#editCarouselBtn").show();
            } else {

            }
        } else{
            $("#loginbutton").show(); //shows login button when logged out
            $("#logoutbutton").hide(); //hides logout button when logged out
            //hide nav items when logged out
            $("#liMemberLink").hide();
            $("#liSocLink").hide();
            $("#editFrontpageBtn").hide();
            $("#editCarouselBtn").hide();
            $("#liLoggedOut").show();
        }
    });
}

function login(){
    let email = $("#email").val();
    let password = $("#password").val();
    $.post(path+'login.php',{
        email:email,
        password:password
    },function(data){
        let result = JSON.parse(data,function(key,value){
            return value;
        });
        if(result.status == 'ok'){
            $("#userTag").html(result.user);
            $("#logininfo").html('<p class="alert alert-success">Login success!</p>');
            $("#loginbutton").hide(); //piilota Login-painike
            $("#logoutbutton").show(); //näytä Logout-painike
            $("#registerbutton").hide();
            setTimeout(function(){
                $("#loginfrm").modal('hide');
                $("#logininfo").html('');
                loggedIn(); //updates the page after login
                window.location.href = "index.html";
			},1000);
        } else{
            $("#logininfo").html('<p class="alert alert-danger">Check login details!</p>');
        }
        $("#email").val('');
		$("#password").val('');
    });
}

function logout(){
    $.get(path+'logout.php',function(data){
        let result = JSON.parse(data,function(key,value){
            return value;
        });
        $("#result").html('<p class="alert alert-success">'+result.status+'</p>');
        $("#result2").html('');
        $("#userTag").html(''); //deletes userinfo
        $("#loginbutton").show(); //show Login-painike
        $("#logoutbutton").hide(); //hide Logout-painike
        $("#registerbutton").show();
        $("#editFrontpageBtn").hide();
        setTimeout(function(){
            $("#result").html('');
            location.reload(); //refreshes page again
        },2000);
    });
}

function updatePassword(){
    let oldPassword = $("#oldPassword").val();
    let newPassword0 = $("#newPassword").val();
    let newPassword1 = $("#confirmPassword").val();
    $.post(path+'updatePassword.php',{
        oldPassword:oldPassword,
        newPassword0:newPassword0,
        newPassword1:newPassword1
    },function(data){
        let result = JSON.parse(data,function(key,value){
            return value;
    });
        if (result.status == 'ok'){
            $("#passwordInfo").html('<p class="alert alert-success">Password updated!</p>');
            setTimeout(function(){
            $("#passwordInfo").html('');
            },2000);
        } else{
            $("#passwordInfo").html('<p class="alert alert-danger">'+result.status+'</p>');
        }
        $("#oldPassword").val('');
        $("#newPassword").val('');
        $("#confirmPassword").val('');
    });
}

function showInfo(){
   $.get(path+'showInfo.php',function(data){
       if (data != 'fail'){
           let result = $.parseJSON(data);
           $.each(result.infos,function(key, info){
               $("#firstname").val(info.Etunimi);
               $("#lastname").val(info.Sukunimi);
               $("#ownemail").val(info.Email);
               $("#birthdate").val(info.SyntymaAika);
               $("#streetaddress").val(info.Katuosoite);
               $("#postalcode").val(info.Postinumero);
               $("#city").val(info.Postitoimipaikka);
               $("#country").val(info.Maa);
               $("#mobile").val(info.Puhelin);
               $("#skills").val(info.Osaaminen);
           });
       } else{
           $("#ownInfo").html('<p class="alert alert-danger">Info not found!</p>');
       }
   }); 
} 