

document.txtAndamento = null;
document.cmbSituacao = null;

const textAreas = document.getElementsByTagName("textarea");

alert("TextAreas  : " + textAreas.length);

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

function teste3(){}


function setTxtAndamento(text)
{
    document.txtAndamento.innerHTML = text;
}


function setTxtAndamento2(text)
{
    document.txtAndamento.innerHTML = text;
}

