$(document).ready(function() {
    $('#deckIn').hide();

    $("#cookies").click(function() {
        parseCache(event.target.innerHTML);
        parseProb();
        drawProb();
        //alert(basics[0]);
    });

    $(".abutton").click(function() {
        $('.multilineResults').html("");
    });
});

function parseProb()
{
    var lines = document.getElementById('deckIn').value.split('\n');

    var badLine = false;

    basics = [];

    for(var i = 0;i < lines.length;i++){

        if (lines[i].includes(" - ") || lines[i].includes("**") || lines[i] == "")
            badLine = true;
        else
            badLine = false;

        if (!badLine)
        {
            while (isNaN(lines[i][0]) || lines[i][0] == " ")
                lines[i] = lines[i].slice(1);

            var num = lines[i].substr(0, lines[i].indexOf(' '));

            lines[i] = lines[i].slice(2); // removes the number of card

            var index = lines[i].indexOf(' ');

            var set = lines[i].slice(index);

            while (set.charAt(2) == set.charAt(2).toLowerCase())
            {
                set = set.slice(1);
                index = set.indexOf(' ');
                set = set.slice(index);
            }

            var setNo = set.substr(4);
            set = set.substr(0,4);
            set = set.slice(1);
            var tempsetNo = setNo.split(' ').join('');
            setNo = tempsetNo;
            //alert(set);

            var convertedSet = setConvert(set);
            set = convertedSet;

            if (set == "xyp")
                setNo = "xy" + tempsetNo;

            var tempCard = new basicCard(lines[i], set, setNo, num);
            basics.push(tempCard);
        }
    }
}

function drawProb() {
    var i;
    var url;

    newBasics = [];

    for (i = 0; i < basics.length; i++)
    {
        url = 'https://api.pokemontcg.io/v1/cards/' + basics[i].set + "-" + basics[i].setNo;
        //alert(url);

        $.ajax({
            async: false,
            url: url,
            success: function(data) {
                //alert(data.card.supertype)
                if (data.card.supertype.includes("Pok"))
                    if (data.card.subtype == "Basic" || data.card.subtype == "EX") {
                        newBasics.push(basics[i]);
                    }
            }
        });
    }
    $('.multilineResults').html("");

    for (i = 0; i < newBasics.length; i++) {
        var tempNum = parseInt(newBasics[i].num);
        $('.multilineResults').append("<p>" + newBasics[i].name + ": " + (1 - hypergeometric(tempNum, 60, 7, 0)) * 100 + "%" + "<\p>");
    }
}

function binomial(n, k) {
    if ((typeof n !== 'number') || (typeof k !== 'number'))
        return false;
    var coeff = 1;
    for (var x = n-k+1; x <= n; x++) coeff *= x;
    for (x = 1; x <= k; x++) coeff /= x;
    return coeff;
}

function hypergeometric(X, Y, Z, n)
{
    return (binomial(X, n) * binomial((Y-X), (Z-n)) / binomial(Y, Z));
}