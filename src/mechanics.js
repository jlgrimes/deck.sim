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
  hand.splice(pos, 1);

  var cardsS = document.getElementById('hand');
  cardsS.removeChild(cardsS.childNodes[pos]);

  //alert('card' + pos)
}

function shuffleHandInDeck()
{
  var handLength = $("#hand").children().length;
  var i;
  for (i = 0; i < handLength; i++)
  {
    pictodeck($('#hand').children().first().src)
    $('#hand').children().first().remove();
  }

  shuffle(deck);
}
