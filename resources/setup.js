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
   	  else
   	  	badLine = false;

      if (lines[i][0] != '*' && lines[i] != "" && !badLine)
      {
      	if (target == "pokemon")
      		pokemon.push(lines[i]);
      	else if (target == "trainers")
      		trainers.push(lines[i]);
      	else if (target == "energy")
      		energy.push(lines[i]);
	  }
   }
   
   document.getElementById("sometext").innerHTML = pokemon;
}
