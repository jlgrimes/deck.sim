function print()
{
   var deckInText = document.getElementById('deckIn');
   deckOut.value = deckInText.value;
}

function parse()
{
   var sometextClone = "";
   var lines = $('textarea').val().split('\n');
   for(var i = 0;i < lines.length;i++){
      sometextClone += lines[i] + " ";
   }
   document.getElementById("p1").innerHTML = sometextClone;
}
