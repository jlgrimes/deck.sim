function N()
{
	shuffleHandInDeck();
	draw(prizes.length);
	supporterPlayed = true;
	updateDebug();
}
function sycamore()
{
	discardHand();
	draw(7);
	updateDebug();
	supporterPlayed = true;
}
function levelball()
{
	searchDeck();
	param = "data.card.hp <= 90 && data.card.supertype.indexOf('mon') >= 0"
}
function ultraball()
{
	searchDeck();
}