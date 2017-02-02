function card (name, set, setNo) {
	this.name = name;
	this.set = set;
	this.setNo = setNo;
}

var deck = [];
var prizes = [];
var supporterPlayed = false;
var stadiumPlayed = false;
var ifBasic;

var turnNo;

var discardCount;
var activeFilled;
//var script;
var param = 1;
var discardHandVar = 0;

var toolSelect = "";
var activeTool = 0;
var benchedTool = [0, 0, 0, 0, 0];

var energySelect = "";
var energyPlayed = false;
var activeEnergy = 0;
var benchedEnergy = [0, 0, 0, 0, 0];

var elixir = false;
var vsSeeker = false;

var triggerpos;

var globalSet;