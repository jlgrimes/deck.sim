function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function parse()
{  
   var lines = document.getElementById('deckIn').value.split('\n');

   var target = "";
   var badLine = false;
   
   for(var i = 0;i < lines.length;i++){

   	  if (lines[i].includes("on -"))
   	  {
      		target = "pokemon";
      		badLine = true;
   	  }
   	  else if (lines[i].includes("Trainer Cards -"))
   	  {
   	  		target = "trainers"
   	  		badLine = true;
   	  }
   	  else if (lines[i].includes("Energy -"))
   	  {
   	  		target = "energy"
   	  		badLine = true;
   	  }
   	  else if (lines[i].includes("Total Cards"))
   	  {
   	  		badLine = true;
   	  }
   	  else
   	  	badLine = false;

      if (lines[i][0] != '*' && lines[i] != "" && !badLine)
      {
      	var num = lines[i][0];
      	var j;
      	lines[i] = lines[i].slice(2);

      	for (j = 0; j < num; j++)
      	{
      		deck.push(lines[i]);

      		if (target == "pokemon")
      			pokemon.push(lines[i]);
      		else if (target == "trainers")
      			trainers.push(lines[i]);
      		else if (target == "energy")
      			energy.push(lines[i]);
      	}
	  }
   }
   deck = shuffle(deck);
   document.getElementById("sometext").innerHTML = deck;
}
