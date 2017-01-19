function print()
{
   var deckInText = document.getElementById('deckIn');
   deckOut.value = deckInText.value;
}

function parse()
{
   var lines = $('textarea').val().split('\n');
   for(var i = 0;i < lines.length;i++){
    sometext.value += lines[i] + " ";
   }
}
