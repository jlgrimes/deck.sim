$(document).ready(function(){

    $("#parsedeck").click(function(){
        $("textarea").hide();
    });

    $("#hand").click(function(event) {
        discardCount++;

        $("#discard").append("<img src = '" + event.target.src + "'</p>");
        $(event.target).remove();

        if ((event.target.src == "https://s3.amazonaws.com/pokemontcg/xy10/105.png" || event.target.src == "https://s3.amazonaws.com/pokemontcg/bw5/96.png") && !supporterPlayed)
          N();
        else if (event.target.src == "https://s3.amazonaws.com/pokemontcg/xy9/107.png" && !supporterPlayed)
          sycamore();

        updateDebug();
    });
});

function play()
{
  $("#discard").empty();
  $("#discard").append("<p id = 'noDiscard'></p>");

  document.getElementById("hand").innerHTML = "";

  prizes = [];
  discardCount = 0;
  ifBasic = false;
  repeat = false;

  while(!ifBasic)
  {
    deck = [];
    $("#hand").empty();
    
    parse();

    if (repeat)
      alert("Mulligan!");
    else
      if (deck.length != 60)
        alert("Your deck has " + deck.length + " cards! That's not legal by any means, as every deck must have 60 cards, but I'll let it slide!")
    
    deck = shuffle(deck);
    draw(7);

    repeat = true;
  }

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

   	  if (lines[i].includes(" - ") || lines[i].includes("**") || lines[i] == "")
        badLine = true;
   	  else
   	  	badLine = false;

      if (!badLine)
      {
        while (isNaN(lines[i][0]) || lines[i][0] == " ")
          lines[i] = lines[i].slice(1);

      	var num = lines[i].substr(0, lines[i].indexOf(' '));
      	var j;
      	lines[i] = lines[i].slice(2); // removes the number of card


        var index = lines[i].indexOf(' ');

        var set = lines[i].slice(index);

        while (set.charAt(2) == set.charAt(2).toLowerCase())
        {
          set = set.slice(1);
          index = set.indexOf(' ');
          set = set.slice(index);
        }

        var setNo = set.substr(4);
        set = set.substr(0,4);
        set = set.slice(1);
        var tempsetNo = setNo.split(' ').join('');
        setNo = tempsetNo;
        //alert(set);

        var convertedSet = setConvert(set);
        set = convertedSet;

      	for (j = 0; j < num; j++)
      	{
      		var tempCard = new card(lines[i], set, setNo);

          totalCount++;
          deck.push(tempCard);
      	}
	  }
   }
}

function pictojson(url){
  url = url.replace('https://s3.amazonaws.com/pokemontcg/','');
  url = url.replace('.png','');
  url = url.replace('/','-');

  return ("https://api.pokemontcg.io/v1/cards/" + url);
}

function pictodeck(url){
      var name = "default";

      url = pictojson(url);
      
      $.getJSON(url, function(data) {
        var tempCard = new card(data.card.name, data.card.setCode, data.card.number)
        deck.push(tempCard);
    });
}

function updateDebug()
{
  document.getElementById("deckSize").innerHTML = "Deck: " + deck.length;
  document.getElementById("remainingPrizes").innerHTML = "Prizes: " + prizes.length;
  document.getElementById("noDiscard").innerHTML = "Discard: " + discardCount;
}
