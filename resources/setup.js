function print()
{
   var deckInText = document.getElementById('deckIn');
   deckOut.value = deckInText.value;
}

function parse()
{  
   
   var sometextClone = document.getElementById('deckIn').value;
   /*
   var lines = document.getElementById('sometext').innerHTML.split('\n');
   for(var i = 0;i < lines.length;i++){
      sometextClone += lines[i] + " ";
   }
   */
   document.getElementById("sometext").innerHTML = sometextClone;
}
