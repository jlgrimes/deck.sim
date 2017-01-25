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
}
function ultraball()
{
	searchDeck();
}