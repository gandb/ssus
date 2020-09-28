
// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// To make sure we can uniquely identify each screenshot tab, add an id as a
// query param to the url that displays the screenshot.
// Note: It's OK that this is a global variable (and not in localStorage),
// because the event page will stay open as long as any screenshot tabs are
// open.
	
 
if(chrome.runtime.onInstalled)
{

	chrome.runtime.onInstalled.addListener(function() {

		const openNewSSUS = {"title": "Abrir seleção (SSU aberta)",
		"contexts":["selection"],"id": "openSSU"};
		
		const openOldSSUS = {"title": "Abrir seleção (SSU Fechada)",
		"contexts":["selection"],"id": "openClosedSSU"};

	  chrome.contextMenus.removeAll(function() {
		// Add more
		const idOpen = chrome.contextMenus.create(openNewSSUS); 
		const idClose = chrome.contextMenus.create(openOldSSUS); 

	  });  
	});
	
	
	// add click event
	chrome.contextMenus.onClicked.addListener(onClickHandler);
 
	// The onClicked callback function.
	function onClickHandler(info, tab) {
		const  text = info.selectionText;

		const type = (info.menuItemId=="openSSU")?"new":"old";

		//alert("onClickHandler:" + text + "," + type);

		goToSSU(text,type);
	  
	};

	
	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			sendResponse(toClient(request));
		}
	);

}



function autoRedirect()
{
	if($("#s4-simple-error-content .ms-ButtonHeightWidth").length != 1)
	{
		return;	
	}

	$("body").html("<P>Redirencionando...</p>");
		window.location.replace("https://sti.uspdigital.usp.br/CentrosTI/CETISP/SSU/demandas.aspx");
}

function updateWarnings()
{
	const menus = document.getElementsByClassName("HeaderDemanda");

	if(menus.length!=1)
	{
		return;
	}
	
	const menu = menus.item(0);

	menu.innerHTML=menu.innerHTML + `
	<STYLE>
		.warning{
			background-color:#fff687;
			padding:2px;
			color:#333333;
			font-size:14px;
			margin-top:5px;
			margin-bottom:5px;
			vertical-align:middle;
			border-style:solid;
			border-width:1px;
			border-color:orange;
		}
		.warning .simbol {
			font-size:28px;
			vertical-align:middle;
		}
		.escondido
		{
			display:none;
		}
	</STYLE>
	<div class="warning hightpriority escondido">
		<label class="simbol">&#9888;</label>
		<LABEL>Atenção! Esta SSU é uma SSU de prioridade zero!</LABEL>
	</div>
	<div class="warning dependences escondido">
		<label class="simbol">&#9888;</label>
		<LABEL>Atenção! Esta SSU contém dependências!</label>
	</div>
	`;

	
	const inputs = document.getElementsByTagName("INPUT");
	let txtPrioridade = null;
	let txtSolicitacoesDependentes = null;


	for(let index=0;index< inputs.length ; index++)
	{
		const txt = inputs[index];

		if(txt.name.indexOf("txtPrioridade")>=0)
		{
			txtPrioridade = txt;
		}
		if(txt.name.indexOf("txtSolicitacoesDependentes")>=0)
		{
			txtSolicitacoesDependentes = txt;
		}
	}

	setInterval(() => {
		const hightpriority = document.getElementsByClassName("hightpriority")[0];
		const dependences = document.getElementsByClassName("dependences")[0];

		if(txtPrioridade)
		{
			if(txtPrioridade.value == "0")
			{
				if(hightpriority.classList.contains("escondido"))
				{
					hightpriority.classList.remove("escondido");
				}
			}
			else{
				if(!hightpriority.classList.contains("escondido"))
				{
					hightpriority.classList.add("escondido");
				}
			}

		}

		if(txtSolicitacoesDependentes)
		{
			if(txtSolicitacoesDependentes.value == "")
			{				
				if(!dependences.classList.contains("escondido"))
				{
					dependences.classList.add("escondido");
				}
			}
			else{
				if(dependences.classList.contains("escondido"))
				{
					dependences.classList.remove("escondido");
				}
			}
		}
	}, 1000);



}

function init()
{
	autoRedirect();
	updateWarnings();
}

init();




function toClient(request)
{

	chrome.tabs.executeScript(null, {
		file: 'inject.js'
	},(arr)=>{
	 
		chrome.tabs.executeScript(null, {
			code: `checkPage()`
		});
		chrome.tabs.executeScript(null, {
			code: `setAction("${request.action}","${request.login}")`
		});
	}); 
	
	return "OK";
}
  