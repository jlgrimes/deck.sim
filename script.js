$(document).ready(function(){
    $("#parsedeck").click(function(){
        $("textarea").hide();
    });

    $("#hand").click(function(event) {

        //alert(event.target.innerHTML)

        discardCount++;
        //alert(discardCount);
        updateDebug();

        $("#discard").append("<img src = '" + event.target.src + "'</p>");
        $(event.target).remove();

        if (hand[indexChild] == "N DEX 96" && !supporterPlayed)
        {
          alert("N!");
          N();
        }
    });
});

function play()
{
  $("#discard").empty();
  $("#discard").append("<p id = 'noDiscard'></p>");

  document.getElementById("hand").innerHTML = "";

  deck = [];
  prizes = [];
  discardCount = 0;

  parse();
  deck = shuffle(deck);
  deal(7);
  dealPrizes();

  //deal(1);

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

        var setNo = set.substr(4);
        set = set.substr(0,4);
        var tempset = set.split(' ').join('');
        set = tempset;
        var tempsetNo = setNo.split(' ').join('');
        setNo = tempsetNo;

        var convertedSet = setConvert(set);
        set = convertedSet;

      	for (j = 0; j < num; j++)
      	{
      		if (target == "pokemon")
      			var tempCard = new card(lines[i], "pokemon", set, setNo);
      		else if (target == "trainers")
      			var tempCard = new card(lines[i], "trainer", set, setNo);
      		else if (target == "energy")
      			var tempCard = new card(lines[i], "energy", set, setNo);

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
  var url;

  for (i = 0; i < num; i++)
  {
    url = 'https://api.pokemontcg.io/v1/cards/' + deck[deck.length - 1].set + "-" + deck[deck.length - 1].setNo;

    $.getJSON(url, function(data) {
      $("#hand").append("<img src='" + data.card.imageUrl + "'></img>");
    });

    //$("#hand").append("<p class = 'card'>" + deck[deck.length - 1].name + "</p>");
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

function playCard(pos)
{
  discard.push(hand[pos]);
/*
  var para = document.createElement("P");
  para.setAttribute("id", "deadcard" + pos);
  para.setAttribute("innerHTML", hand[pos].recallName());
  var node = document.createTextNode(hand[pos].recallName());
  para.appendChild(node);
  document.getElementById("discard").appendChild(para);
*/
  hand.splice(pos, 1);

  var cardsS = document.getElementById('hand');
  cardsS.removeChild(cardsS.childNodes[pos]);

  //alert('card' + pos)
}

function shuffleHandInDeck()
{
  var handLength = hand.length;
  var i;
  for (i = 0; i < handLength; i++)
  {
    deck.push(hand[hand.length - 1]);
    updateDebug();
    var cardsS = document.getElementById('hand');
    var badCard = document.getElementById('card');
    cardsS.removeChild(badCard);
    hand.pop();
  }

  shuffle(deck);
}

function updateDebug()
{
  document.getElementById("deckSize").innerHTML = "Deck: " + deck.length;
  document.getElementById("remainingPrizes").innerHTML = "Prizes: " + prizes.length;
  document.getElementById("noDiscard").innerHTML = "Discard: " + discardCount;
}
