function card (name, type) {
	this.name = name;
	this.type = type;

	var action = name.replace(" ", "_");
}

function pokemonCard (name, type) {
	this.name = name;
	this.hp = hp;
	this.stage = stage;
	this.evolvesFrom = evolvesFrom;
	this.type = type;
	this.retreat = retreat;
	this.weakness = weakness;
	this.resistance = resistance;
	this.set = set;
	this.setNum = setNum;
}

function trainerCard (name, text) {
	this.name = name;
	this.action = text;
}

function energyCard (name, type) {
	this.name = name;
	this.cost = cost; // 1 fire, 1 water, and 1 grass would be represented as RWG, a DCE would be CC
					  // Rainbow energies are represented as A for any
}

card.prototype.recallName = function(){
	return this.name;
}

card.prototype.recallType = function(){
	return this.type;
}

var deck = [];
var hand = [];
var prizes = [];
var active;
var benched = [];
