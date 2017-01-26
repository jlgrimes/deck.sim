$(document).ready(function(){
    parseCookie();

    //$("#peek").append("<div>dank</div>");

    $("#parsedeck").click(function(){
        $("textarea").hide();
        play();
    });

    $("#save").click(function(){
        setCookie();
        alert(getCookie("deck"));
    });

    $("#import").click(function(){
        parseCookie();
    });

    $("#peek").on("click", "div", function(event) {
      var index = $(this).index();
      var valid = true;
      //alert(index);
      //alert(decktopic((this).index()));

      var url = decktojson(index);
      var pic = jsontopic(url);

      //alert(url);
      //alert(pic);

      $.ajax({
        async: false,
        url: url,
        success: function(data) {
            if (!eval(param))
                valid = false

            if (valid)
                $("#hand").append("<img src = '" + pic + "' height='300'</img>");
        }
        });

      if (valid) {
          deck.splice($(this).index(), 1);
          shuffle(deck);
          $("#peek").empty();
          updateDebug();
          param = 1;
      }
      else {
          alert("Invalid card.");
      }
    });

    $("#hand").click(function(event) {

        var url = pictojson(event.target.src);

        if (!activeFilled)
        {
          $.ajax({
        async: false,
        url: url,
        success: function(data) {
        if ((data.card.subtype == "Basic" || data.card.subtype == "EX") && data.card.supertype.includes("mon"))
        {
          activeFilled = true;
          $("#active").append("<img src = '" + event.target.src + "' height='300'</img>");
          $(event.target).remove();

          dealPrizes();
          draw(1);
          updateDebug();
        }
        }
          })
        }
        else
        {
      $.ajax({
        async: false,
        url: url,
        success: function(data) {
          if ((data.card.subtype == "Basic" || data.card.subtype == "EX") && data.card.supertype.includes("mon"))
          {
              $("#benched").append("<img src = '" + event.target.src + "' height='250'</img>");
              $(event.target).remove();

          }
          else
          {
            if (!((event.target.src == "https://s3.amazonaws.com/pokemontcg/xy10/105.png" || event.target.src == "https://s3.amazonaws.com/pokemontcg/bw5/96.png" || event.target.src == "https://s3.amazonaws.com/pokemontcg/xy9/107.png") && supporterPlayed))
            {
            $(event.target).remove();
            $("#discard").append("<img src = '" + event.target.src + "' height='150'</img>");
            discardCount++;
            }
          }
        }
        });

        if ((event.target.src == "https://s3.amazonaws.com/pokemontcg/xy10/105.png" || event.target.src == "https://s3.amazonaws.com/pokemontcg/bw5/96.png") && !supporterPlayed)
        {
          //script = "n";
          N();
        }
        else if (event.target.src == "https://s3.amazonaws.com/pokemontcg/xy9/107.png" && !supporterPlayed)
        {
          //script = "sycamore";
          sycamore();
        }
        else if (event.target.src == "https://s3.amazonaws.com/pokemontcg/xy7/76.png")
        {
          //script = "levelball";
          levelball();
        }
        else if (event.target.src == "https://s3.amazonaws.com/pokemontcg/xy10/113.png")
          ultraball();
        }

        updateDebug();
    });
    
});

function play()
{
  $("#discard").empty();
  $("#active").empty();
  $("#benched").empty();
  $("#discard").append("<p id = 'noDiscard'></p>");

  document.getElementById("hand").innerHTML = "";

  prizes = [];
  discardCount = 0;
  ifBasic = false;
  repeat = false;
  activeFilled = false;
  supporterPlayed = false;

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

  alert("Please choose an Active Pokemon.");

  //deal(1);

  updateDebug();

  //searchDeck();
}

function parse()
{
    var lines = document.getElementById('deckIn').value.split('\n');
   setCookie();

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

        if (set == "xyp")
          setNo = "xy" + tempsetNo;

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

function decktojson(pos)
{
        var url;
        
        url = 'https://api.pokemontcg.io/v1/cards/' + deck[pos].set + "-" + deck[pos].setNo;

        return url;
}

function jsontopic(url)
{
    url = url.replace('https://api.pokemontcg.io/v1/cards/','');

    url = url.replace('-','/');

    //alert(url);

    if (url.indexOf("xyp") >= 0)
        url = url.replace('/xy', '/XY');

    return ("https://s3.amazonaws.com/pokemontcg/" + url + ".png");

}

function pictodeck(url){
      var name = "default";

      url = pictojson(url);
      
      $.getJSON(url, function(data) {
        var tempCard = new card(data.card.name, data.card.setCode, data.card.number)
        deck.push(tempCard);
    });
}

function findtrigger(index)
{
  alert(index);
}

function parseCookie()
{
    //alert(document.cookie);
    var lines = document.cookie;
    //alert("Lines length: " + globalLines.length + "lines[0]: " + globalLines[0]);

    //alert(lines);
    lines = lines.split('~').join('\n');
    lines = lines.split('deck=').join('');

    $('#deckIn').empty();
    $('#deckIn').append(lines);
    //deckIn.append(lines[i].toString());
}

function updateDebug()
{
  document.getElementById("deckSize").innerHTML = "Deck: " + deck.length;
  document.getElementById("remainingPrizes").innerHTML = "Prizes: " + prizes.length;
  document.getElementById("noDiscard").innerHTML = "Discard: " + discardCount;
}

function setCookie() {
    var lines = document.getElementById('deckIn').value.split('\n');
    var i;
    var cvalue = "";

    for (i = 0; i < lines.length; i++)
        cvalue += lines[i] + "~";


    //var d = new Date();
    //d.setTime(d.getTime() + (10*24*60*60*1000));
    //var expires = "expires="+ d.toUTCString();
    document.cookie = "deck=" + cvalue + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}