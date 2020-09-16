
$(document).ready(initSSU);


chrome.tabs.query({'active': true}, function(tabs) {
	const tabid = tabs[0].id;
	var desligar = (""+localStorage["lider"])=="false";
	desligar = desligar ||  localStorage["lider"] == undefined;
	if(desligar)
	{	
		$("#actions input").hide();
	}
});


if (!String.prototype.trim) {
   //code for trim
   String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};
}



function initSSU()
{
	$("#target").focus();
	$("#send").bind("click",goToSSU);
	$("#toHomologacao").bind("click",goToHomologacao);
	$("#toProducao").bind("click",goToProducao);
	$("#toReanalise").bind("click",goToReanalise);
	$("#toAssinar").bind("click",goToAssinar);
	$(document).keypress(function(e) {
    if(e.which == 13) {
        goToSSU();
    }
	 
});
}

function goToReanalise()
{
	 sendMessage("R");
}

function goToHomologacao()
{ 
	 sendMessage("H");
}


function goToAssinar()
{ 
	 sendMessage("A");
}


function goToProducao()
{ 
	 sendMessage("P");
}

function sendMessage(action)
{
	let login = localStorage["login"];
	
	if(!login)
	{
		alert('Configure antes a extensão');
	}
 

	chrome.tabs.query({'active': true}, function(tabs) {
		const tabid = tabs[0].id;

		/*
		chrome.tabs.sendMessage(tabid, {action, login}, function(response) {
			alert('voltou');
		  })
		  */
		chrome.runtime.sendMessage( {action, login}, function(response) {
			console.log(response.farewell);
		});
	});
	 
}

function goToSSU(selSSU,type)
{
	const oldChecked = type=="old" || $( "#old:checked" ).length == 1;
	
	let target;
	if (typeof selSSU === 'string'){ //caso o parametro de ssu ja tenha sido passado pelo handlre de selecao
		target = selSSU;
	} else { //caso tenha sido clicado o bot�o 'Abrir, neste caso o parametro ser� um evento'
		target = $("#target").val();
	}
	target = target.trim();

	let url = null;
	
	if(target=="")
	{
		url = 'https://sti.uspdigital.usp.br/CentrosTI/CETISP/SSU/demandas.aspx';
	}
	else if( isNaN(target))
	{
		$("#target").focus();
		return;
	}
	else
	{
		if(oldChecked)
		{			
			url = `https://sti.uspdigital.usp.br/CentrosTI/CETISP/SSU/Forms/WPDisplayDemanda.aspx?List=dbcdd59f%2Da9b1%2D47f5%2D95c8%2D9c81dfcf57c3&ID=736677&Source=https%3A%2F%2Fsti%2Euspdigital%2Eusp%2Ebr%2FCentrosTI%2FCETISP%2FSSU%2FLists%2FDemandasConcluidas%2FAllItems%2Easpx%3FView%3D%257bCD72403C%2DE0E9%2D4582%2DA329%2D013D24954658%257d%26FilterField1%3DIdentity%26FilterValue1%3D${target}%26InitialTabId%3DRibbon%252EListItem%26VisibilityContext%3DWSSTabPersistence&ContentTypeId=0x01003E5DAA29B6A5C34AB9604FD0A9AA5689`;
		}
		else
		{
			url = `https://sti.uspdigital.usp.br/CentrosTI/CETISP/SSU/Forms/WPEditDemanda.aspx?List=4717158e-24b2-4891-9fb2-5d3ae8e85cac&ID=${target}&Web=8dd1b852-620f-4a1e-ac32-de825a818c6f`;
		}
	}

	
	chrome.tabs.create({url:url});
}

