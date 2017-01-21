$(document).ready(function(){
    $("#parsedeck").click(function(){
        $("textarea").hide();
    });

    $('#hand').bind('click', function(event) {
        value = document.getElementById(event.target.id).innerHTML;

        var i = 0;

        while(i < hand.length)
        {
          if (hand[i].recallName().includes(value))
            {
              globalSet = hand[i].set;
            }
          i++;
        }

        alert(globalSet);
        
    });
});

function play()
{
  document.getElementById("hand").innerHTML = "";

  deck = [];
  hand = [];
  prizes = [];

  parse();
  deck = shuffle(deck);
  deal(7);
  dealPrizes();

  updateDebug();
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
      	lines[i] = lines[i].slice(2); // removes the number of card


        var index = lines[i].indexOf(' ');

        var set = lines[i].slice(index);
        //var setUpper = set.toUpper();

        while (set.charAt(2) == set.charAt(2).toLowerCase())
        {
          set = set.slice(1);
          index = set.indexOf(' ');
          set = set.slice(index);
          //set = set.charAt(2);
        }

      	for (j = 0; j < num; j++)
      	{
      		if (target == "pokemon")
      			var tempCard = new card(lines[i], "pokemon", set);
      		else if (target == "trainers")
      			var tempCard = new card(lines[i], "trainer", set);
      		else if (target == "energy")
      			var tempCard = new card(lines[i], "energy", set);

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
  var pos;

  for (i = 0; i < num; i++)
  {
    pos = i + initialHandLength;
    var para = document.createElement("P");
    para.setAttribute("id", "card" + pos);
    para.setAttribute("innerHTML", deck[deck.length - 1].recallName());
    //para.setAttribute("onclick", onClickTriggered());

    //para.onclick = function {
    //  alert(deck[deck.length - 1].recallName());
    //};

    var node = document.createTextNode(deck[deck.length - 1].recallName());
    para.appendChild(node);

    document.getElementById("hand").appendChild(para);

    hand.push(deck[deck.length - 1]);
    deck.pop();
  }
}

function dealPrizes()
{
  var i;

  for (i = 0; i < 6; i++)
  {
    prizes.push(deck[deck.length - 1]);
    deck.pop();
    //document.getElementById("sometext").innerHTML = hand[i].recallName();
  }
}

function updateDebug()
{
  document.getElementById("deckSize").innerHTML = "Deck: " + deck.length;
  document.getElementById("remainingPrizes").innerHTML = "Prizes: " + prizes.length;
}
