



const textAreas = document.getElementsByTagName("textarea");



//alert("TextAreas  : " + textAreas.length);

for(let index = 0 ; index < textAreas.length ; index++)
{
    const textArea = textAreas.item(index);
    alert("TextAreas id: " + textArea.id);
}


function testeX(x)
{
    alert("x="+x);
}


function testeY(x)
{
    alert("Y="+x);
}