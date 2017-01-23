$(document).ready(function(){

    $("#parsedeck").click(function(){
        $("textarea").hide();
    });

    $("#hand").click(function(event) {

        //alert(event.target.innerHTML)

        discardCount++;
        //alert(discardCount);

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

  deck = [];
  prizes = [];
  discardCount = 0;

  parse();
  deck = shuffle(deck);
  draw(7);
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
        //alert("before: " + deck.length)
        var tempCard = new card(data.card.name, "idk", data.card.setCode, data.card.number)
        deck.push(tempCard);
        //alert("after: " + deck.length)
    });
}

function updateDebug()
{
  document.getElementById("deckSize").innerHTML = "Deck: " + deck.length;
  document.getElementById("remainingPrizes").innerHTML = "Prizes: " + prizes.length;
  document.getElementById("noDiscard").innerHTML = "Discard: " + discardCount;
}
