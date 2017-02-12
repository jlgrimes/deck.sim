function card (name, set, setNo) {
	this.name = name;
	this.set = set;
	this.setNo = setNo;
}

function basicCard (name, set, setNo, num) {
    this.name = name;
    this.set = set;
    this.setNo = setNo;
    this.num = num;
}

var deck = [];
var prizes = [];
var supporterPlayed = false;
var stadiumPlayed = false;
var ifBasic;

var basics = [];
var newBasics = [];
var basicCount;

var turnNo;

var discardCount;
var activeFilled;
var param = 1;
var discardHandVar = 0;

var toolSelect = "";
var activeTool = 0;
var benchedTool = [0, 0, 0, 0, 0, 0, 0, 0];

var evolvingPokemon = "";
var evolvingPokemonNo;
var evolvingPokemonName;

var energySelect = "";
var energyPlayed = false;
var activeEnergy = 0;
var benchedEnergy = [0, 0, 0, 0, 0, 0, 0, 0];

var activeTurn = 0;
var benchedTurn = [0, 0, 0, 0, 0, 0, 0, 0];

var elixir = false;
var vsSeeker = false;


var odds = [];
var someNumbers = [];