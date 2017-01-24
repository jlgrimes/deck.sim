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
}
function levelball()
{
	script = "";
	searchDeck();
}