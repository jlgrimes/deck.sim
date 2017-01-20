function play()
{
  document.getElementById("hand").innerHTML = "";
  deck = [];
  hand = [];

  parse();
  deck = shuffle(deck);
  deal(7);
}

function parse()
{  
   var lines = document.getElementById('deckIn').value.split('\n');

   var target = "";
   var badLine = false;

   var totalCount = 0;
   
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
      	var num = lines[i].substr(0, lines[i].indexOf(' '));
      	var j;
      	lines[i] = lines[i].slice(2);

      	for (j = 0; j < num; j++)
      	{
      		if (target == "pokemon")
      			var tempCard = new card(lines[i], "pokemon");
      		else if (target == "trainers")
      			var tempCard = new card(lines[i], "trainer");
      		else if (target == "energy")
      			var tempCard = new card(lines[i], "energy");

          totalCount++;
          deck.push(tempCard);
      	}
	  }
   }
   //document.getElementById("sometext").innerHTML = deck[i].recallName() + " " + deck[i].recallType();
}

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

function deal(num) {
  var i;
  var initialHandLength = hand.length;

  for (i = 0; i < num; i++)
  {
    var pos = i + initialHandLength;
    var para = document.createElement("card" + pos);
    var node = document.createTextNode("card" + pos + ": " + deck[deck.length - 1].recallName());
    para.appendChild(node);

    var element = document.getElementById("hand");
    element.appendChild(para);

    hand.push(deck[deck.length - 1]);
    deck.pop();
    //document.getElementById("sometext").innerHTML = hand[i].recallName();
  }
}
