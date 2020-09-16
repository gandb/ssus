
$(document).ready(initSSU);
 

function initSSU()
{
	$("#login").val(localStorage["login"]);
	$("#login").focus();
	$("#save").bind("click",goSave);
	
	if(("" + localStorage["lider"] ) == "true")
	{
//		alert(localStorage["lider"]);
		$("#perfil").val("LSTI");		
	}	
	$(document).keypress(function(e) {
    if(e.which == 13) {
        goSave();
    }
});
} 

function goSave()
{

$("#save").attr('checked','checked');
	var login = $("#login").val();
	
	if(!login)
	{
		$(".erro").html('Todos os campos são obrigatórios!');
		return;
	}
	localStorage["login"] = login;
	if($("#perfil").val() == "LSTI")
	{
		localStorage["lider"] = true;
	}
	else
	{
//		alert('no lider');
		localStorage["lider"] = false;
	}
	$(".sucesso").html('Configurações salvas com sucesso!');
}