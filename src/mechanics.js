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

function draw(num) {
  var i;
  var initialHandLength = hand.length;
  var pos;
  var url;

  for (i = 0; i < num; i++)
  {
    url = 'https://api.pokemontcg.io/v1/cards/' + deck[deck.length - 1].set + "-" + deck[deck.length - 1].setNo;

    $.ajax({
      async: false,
      url: url,
      success: function(data) {
        $("#hand").append("<img src='" + data.card.imageUrl + "' class='card' height='" + handHeight + "'></img>");
        //alert(data.card.supertype)
        if (data.card.supertype.includes("Pok"))
          if (data.card.subtype == "Basic" || data.card.subtype == "EX") {
              basics.push(data.card.name);
              ifBasic = true;
          }
      }
    });

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

function shuffleHandInDeck()
{
  var handLength = $("#hand").children().length;
  var i;
  for (i = 0; i < handLength; i++)
  {
    pictodeck($("#hand img").first().attr("src"))
    $('#hand').children().first().remove();
  }

  shuffle(deck);
}

function discardHand()
{
  var handLength = $("#hand").children().length;
  var i;
  for (i = 0; i < handLength; i++)
  {
    $("#discard").append("<img src = '" + $("#hand img").first().attr("src") + "'height='" + discardHeight + "'</img>");
    $('#hand').children().first().remove();
    discardCount++;
  }
}

function peekDeck(num)
{
    var i;
    for (i = 0; i < num; i++)
        $("#peek").append("<div class = 'card'>" + deck[i].name + "</div>");

    $("#peek").append("<div class = 'card'>Whiff</div>");

    //$('.pokemon').hide();
    $('.energy').hide();
    $('.tool').hide();

    $("#prompt").html("Please grab a valid card.");

    //alert($('#hand').children().first().nodeName);
    //alert($('#peek').children().first().nodeName);
}

function searchDeck()
{
  var i;
  for (i = 0; i < deck.length; i++)
    $("#peek").append("<div class = 'card'>" + deck[i].name + "</div>");

    //$('.pokemon').hide();
    $('.energy').hide();
    $('.tool').hide();

    $("#prompt").html("Search your deck for what you're looking for.");

    //alert($('#hand').children().first().nodeName);
    //alert($('#peek').children().first().nodeName);
}

function flip() {
    return Math.floor(Math.random() * 2);
}