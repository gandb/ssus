
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
	$("#toTests").bind("click",goToTestes);	
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

function goToTestes()
{ 
	 sendMessage("T");
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

		chrome.runtime.sendMessage( {action, login,tabid}, function(response) {
		//	console.log(response.farewell);
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
			url = `https://sti.uspdigital.usp.br/CentrosTI/CETISP/SSU/Lists/DemandasConcluidas/AllItems.aspx?View=%7bCD72403C-E0E9-4582-A329-013D24954658%7d&FilterField1=Identity&FilterValue1=${target}&InitialTabId=Ribbon%2EListItem&VisibilityContext=WSSTabPersistence`;
		}
		else
		{
			url = `https://sti.uspdigital.usp.br/CentrosTI/CETISP/SSU/Forms/WPEditDemanda.aspx?List=4717158e-24b2-4891-9fb2-5d3ae8e85cac&ID=${target}&Web=8dd1b852-620f-4a1e-ac32-de825a818c6f`;
		}
	}

	
	chrome.tabs.create({url:url});
}

