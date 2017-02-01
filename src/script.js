$(document).ready(function(){
    $("#prompt").html("Please enter in a deck list in PTCGO format, or load from a preset.");
    $("#endturn").hide();
    //parseCookie();
    printCache();

    //$("#peek").append("<div>dank</div>");

    $(".pokemon").click(function(event){
        if (energySelect != "") {
            energyPlayed = true;
            //alert(energySelect);

            var pos = $(event.target).position();
            var newpos = pos.left;
            var num = pos.left;

            if (num < 0)
            {
                newpos += activeEnergy * energyOffset;
                activeEnergy++;
            }
            else
            {
                num = Math.floor(num / 179);
                newpos += benchedEnergy[num] * energyOffset;
                benchedEnergy[num]++;
            }

            //alert(pos.left);
            $(".energy").append("<img style='position: absolute; left: " + newpos + "px; top: " + energyHeightOffset + "px' height='" + energyHeight + "' src = '" + energySelect + "'>");

            energySelect = "";

            $("#prompt").html("");
        }
        else if (toolSelect != "")
        {
            var pos = $(event.target).position();
            var num = pos.left - 215;
            num = Math.floor(num / 179);
            var valid = true;

            //alert(toolSelect);

            if (num < 0 && activeTool == 0)
            {
                activeTool++;
            }
            else if (num >= 0 && benchedTool[num] == 0)
            {
                benchedTool[num]++;
            }
            else
                valid = false;

            if (valid) {
                $(".tool").append("<img style='position: absolute; left: " + pos.left + "px; top: " + toolHeightOffset + "px' height='" + toolHeight + "' src = '" + toolSelect + "'>");
                toolSelect = "";
                $("#prompt").html("");
            }
            else
                alert("This Pokemon already has a tool silly!");
        }
        //else
            //alert("no energy select");

    });

    $("#parsedeck").click(function(){
        $("textarea").hide();
        $("#cookies").hide();
        $("#save").hide();

        play();
    });

    $("#endturn").click(function(){
        turnNo++;
        updateDebug();
        supporterPlayed = false;
        energyPlayed = false;
        draw(1);
    });

    $("#save").click(function(){
        setCache();
        alert("Deck saved!");
        //$("#cookies").hide();
        //printCache();
    });

    $("#peek").on("click", "div", function(event) {

        if (event.target.innerHTML == "Whiff") {
            shuffle(deck);
            $("#peek").empty();
            updateDebug();
            param = 1;
        }
        else {
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
                success: function (data) {
                    if (!eval(param))
                        valid = false

                    if (valid) {
                        if (elixir){
                            energySelect = pic;
                        }
                        else
                            $("#hand").append("<img src = '" + pic + "' height='300'</img>");
                    }
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
        }
        $("#prompt").html("");

        $('.pokemon').show();
        $('.energy').show();
        $('.tool').show();
    });

    $("#cookies").click(function(event) {
        parseCache(event.target.innerHTML);
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
                        $("#active").append("<div class='pokemon'><img height='" + activeHeight + "' src = '" + event.target.src + "'></div>");
                        $(event.target).remove();

                        dealPrizes();
                        draw(1);
                        updateDebug();
                    }
                }
            })

            $("#prompt").html("");
        }
        else
        {
            $.ajax({
                async: false,
                url: url,
                success: function(data) {
                    if ((data.card.subtype == "Basic" || data.card.subtype == "EX") && data.card.supertype.includes("mon")) {
                        $("#benched").append("<div class='pokemon'><img class='pokemon' style='position: relative' height='" + benchedHeight + "' src = '" + event.target.src + "'>'</div>");
                        //$("#benched").append("<div class='pokemon'><img src = '" + event.target.src + "' height='250'>dank</div>");
                        $(event.target).remove();
                    }

                    else if (data.card.subtype == "Stadium" && !stadiumPlayed) {
                        $("#stadium").append("<img class = 'pokemon' src = '" + event.target.src + "' height='" + stadiumHeight + "'</img>");
                        $(event.target).remove();
                        stadiumPlayed = true;
                    }
                    else if (data.card.subtype == "Stadium" && stadiumPlayed); // do nothing
                    else if (data.card.supertype == "Energy" && !energyPlayed) {
                        energySelect = event.target.src;
                        energyPlayed = true;
                        $("#prompt").html("Which Pokemon would you like to attach the energy to?");
                        $(event.target).remove();
                    }
                    else if (data.card.supertype == "Energy" && energyPlayed); // do nothing
                    else if (data.card.subtype.indexOf("Tool") >= 0) {
                        toolSelect = event.target.src;
                        $("#prompt").html("Which Pokemon would you like to attach the tool to?");
                        $(event.target).remove();
                    }
                    else {
                        if (!(data.card.subtype == "Supporter" && supporterPlayed)) {
                            $(event.target).remove();
                            $("#discard").append("<img src = '" + event.target.src + "' height='" + discardHeight + "'</img>");
                            discardCount++;
                        }
                    }


                    if (discardHandVar == 0) {
                        if (data.card.name == "N" && !supporterPlayed)
                            N();
                        else if (data.card.name == "Professor Sycamore" && !supporterPlayed)
                            sycamore();
                        else if (data.card.name == "Level Ball")
                            levelball();
                        else if (data.card.name == "Ultra Ball")
                            ultraball();
                        else if (data.card.name == "Shaymin-EX")
                            draw(6 - $("#hand").children().length)
                        else if (data.card.name == "Trainers' Mail")
                            trainermail();
                        else if (data.card.name == "Max Elixir")
                            maxelixir();
                    }
                    else
                        discardHandVar++;
                }
            });

            //alert("in function" + discardHandVar);

            if (discardHandVar == 3) {
                //alert("HEYOO!");
                searchDeck();
                discardHandVar = 0;
            }
        }

        updateDebug();
    });
    
});

function play()
{
  $("#discard").empty();
  $("#active").empty();
  $("#benched").empty();
  $("#stadium").empty();
  $(".energy").empty();
  $("#discard").append("<p id = 'noDiscard'></p>");
  $("#prompt").html("");
  $("#endturn").show();

    turnNo = 0;

  document.getElementById("hand").innerHTML = "";

  prizes = [];
  discardCount = 0;
  ifBasic = false;
  activeFilled = false;
  supporterPlayed = false;
  var repeat = false;
    energySelect = "";
    energyPlayed = false;
    stadiumPlayed = false;


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

  $("#prompt").html("Please choose an Active Pokemon.");
  //alert("Please choose an Active Pokemon.");

  //deal(1);

  updateDebug();

  //searchDeck();
}

function parse()
{
    var lines = document.getElementById('deckIn').value.split('\n');

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

function pictoname(url){
    $.ajax({
        async: false,
        url: url,
        success: function (data) {
            return data.card.name;
        }
    });
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

function updateDebug()
{
    $("#turn").html("Turn " + turnNo);
  document.getElementById("deckSize").innerHTML = "Deck: " + deck.length;
  document.getElementById("remainingPrizes").innerHTML = "Prizes: " + prizes.length;
  document.getElementById("noDiscard").innerHTML = "Discard: " + discardCount;
}

