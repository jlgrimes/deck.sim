$(document).ready(function() {
    $('#deckIn').hide();

    $("#cookies").click(function() {
        $('#deckIn').hide();
        $('.result').empty();
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

    odds = [];

    //$('#text').hide();
    $('.multilineResults').append("<h3>Chances of starting with a specific Pokemon<\h3>");

    for (i = 0; i < newBasics.length; i++) {
        var tempNum = parseInt(newBasics[i].num);
        var tempProb = hypergeometric(tempNum, 60, 7);
        $('.multilineResults').append("<p>" + newBasics[i].name + ": " + (tempProb * 100) + "%" + "<\p>");
        odds.push(tempProb);
    }

    $('.multilineResults').append("<p><br><\p>");

    $('.multilineResults').append("<h3>Chances of starting with multiple Pokemon<\h3>");

    someNumbers = [];

    for (i = 0; i < newBasics.length; i++)
        someNumbers.push(i);

    var combinations = combine(someNumbers, 2);
    var temp;

    for (i = 0; i < combinations.length; i++) // loops through every combination
    {
        temp = 1;
        $('.multilineResults').append("<div>");

        if (combinations[i].length <= 7) {
            for (var j = 0; j < combinations[i].length; j++) // loops through the selected combination
            {
                $('.multilineResults').append(newBasics[combinations[i][j]].name + ", ");
                temp *= odds[combinations[i][j]];
            }

            $('.multilineResults').append(temp * 100 + "%<\div>");
        }
    }
/*
    for (i = 0; i < newBasics.length - 1; i++) {
        for (var j = i + 1; j < newBasics.length; j++) {
            var oddsProduct = odds[i] * odds[j] * 100;
            $('.multilineResults').append("<div>" + newBasics[i].name + ", " + newBasics[j].name + ": " + oddsProduct + "%" + "<\div>");
        }
    }
    */
}

var combine = function(a, min) {
    var fn = function(n, src, got, all) {
        if (n == 0) {
            if (got.length > 0) {
                all[all.length] = got;
            }
            return;
        }
        for (var j = 0; j < src.length; j++) {
            fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
        }
        return;
    }
    var all = [];
    for (var i = min; i < a.length; i++) {
        fn(i, a, [], all);
    }
    all.push(a);
    return all;
}

function binomial(n, k) {
    if ((typeof n !== 'number') || (typeof k !== 'number'))
        return false;
    var coeff = 1;
    for (var x = n-k+1; x <= n; x++) coeff *= x;
    for (x = 1; x <= k; x++) coeff /= x;
    return coeff;
}

function hypergeometric(m, N, n)
{
    // N = 60 cards in deck, n = subject size (7 for hand, 6 for prize)
    // m = number of subject in deck (4 for playset), i = 1

    var prob = 0;
    for (var i = 1; i < 5; i++) {
        prob = prob + (binomial(m, i) * binomial((N - m), (n - i)) / binomial(N, n));
        //alert(prob);
    }
    return prob;
}