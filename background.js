
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

if($("#s4-simple-error-content .ms-ButtonHeightWidth").length == 1)
{
	$("body").html("<P>Redirencionando...</p>");
	window.location.replace("https://sti.uspdigital.usp.br/CentrosTI/CETISP/SSU/demandas.aspx");
}

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
  