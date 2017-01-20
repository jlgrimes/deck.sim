function card (name, type) {
	this.name = name;
	this.type = type;
}

card.prototype.recallName = function(){
	return this.name;
}

card.prototype.recallType = function(){
	return this.type;
}

var deck = [];
