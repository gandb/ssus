 

(()=>{
        
    document.txtAndamento = null;
    document.cmbSituacao = null;

    const textAreas = document.getElementsByTagName("textarea");

    for(let index = 0 ; index < textAreas.length ; index++)
    {
        const textArea = textAreas.item(index);
        if(textArea.id.indexOf('txtAndamento')>=0)
        {
            document.txtAndamento = textArea;
        }    
    }

    const selects = document.getElementsByTagName("select");
    for(let index = 0 ; index < selects.length ; index++)
    {
        const select = selects.item(index);
        if(select.id.indexOf('Situacao')>=0)
        {
            document.cmbSituacao = select;
        }
    }

    
    
})();


function checkPage()
{ 

    if(!document.txtAndamento)
    {
        alert('Página incorreta de SSU! Caixa de andamento não encontrada.');
    }

    if(!document.cmbSituacao)
    {
        alert('Página incorreta de SSU! Caixa status não encontrada.');
    }
}
 

function setAction(action, login)
{

	let txtAndamentoVal = document.txtAndamento.innerHTML ;
	txtAndamentoVal = txtAndamentoVal  + "\n\n------------------------\n\n";
	
	const now = new Date();
	const year = now.getUTCFullYear();
	const month  = now.getUTCMonth() +1 ; 
    const day   = now.getUTCDate() ;
    let time =  year + "-" + month + "-" + day + " (" + login + ") -  " ;
    
    
	let newParagraph = "";
    let txtAction = "";
 
	if (action!="A")
	{
		//situacao
		if(action=="H")
		{
            setCmbSituacao("5");//aguardando validação
			txtAction = "homologação" ;
		}
		else if(action=="R")
		{
			setCmbSituacao("12");//re análise
		}
		else if(action=="P")
		{
			setCmbSituacao("15");//disponível em produção
			txtAction = "produção" ;
        }
        else if(action=="T")
		{
            setCmbSituacao("4");//re análise
            txtAction = "análise técnica" ;
		}
        
        if(action!="R")
		{
			newParagraph =  "Disponível para " + txtAction + ".";		 
		}
		 
    }	
    
    document.txtAndamento.innerHTML = txtAndamentoVal + time + newParagraph;
}

function setCmbSituacao(text)
{
    document.cmbSituacao.value = text;
}
 