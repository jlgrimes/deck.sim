function card (name, set, setNo) {
	this.name = name;
	this.set = set;
	this.setNo = setNo;
}

var deck = [];
var prizes = [];
var supporterPlayed = false;
var ifBasic;

var discardCount;
var activeFilled;
//var script;
var param = 1;
var discardHand = 0;

var triggerpos;

var globalSet;