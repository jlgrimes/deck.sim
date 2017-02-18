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

    $("#calculate").click(function() {
        var targetE = document.getElementById("targetnumber");
        var target = targetE.options[targetE.selectedIndex].text;
        var playedInt = parseInt(target);

        var playedE = document.getElementById("playednumber");
        var played = playedE.options[playedE.selectedIndex].text;
        var targetInt = parseInt(played);

        // oops, i had them flipped!

        if (targetInt >= playedInt)
            $('.result').html((binomial(targetInt, playedInt) * binomial(60 - targetInt, 6 - playedInt) / binomial(60, 6)) * 100 + '%');
        else
            $('.result').html("You can't prize more cards than you play")
    });

    $("#calculate_cleanline").click(function() {
        var firstE = document.getElementById("cleanline1");
        var first = firstE.options[firstE.selectedIndex].text;
        var firstInt = parseInt(first);

        var secondE = document.getElementById("cleanline2");
        var second = secondE.options[secondE.selectedIndex].text;
        var secondInt = parseInt(second);

        var sum = firstInt + secondInt;
        // alert(sum);

        //alert(sum * binomial((60 - sum), 5) / (binomial(60, 6) * 100) + '%');
        $('.result').html(sum * binomial((60 - sum), 5) / binomial(60, 6) * 100 + '%');
    });

        $("#calculate_cleanlinee").click(function() {
            var firstE = document.getElementById("cleanlinee1");
            var first = firstE.options[firstE.selectedIndex].text;
            var firstInt = parseInt(first);

            var secondE = document.getElementById("cleanlinee2");
            var second = secondE.options[secondE.selectedIndex].text;
            var secondInt = parseInt(second);

            var thirdE = document.getElementById("cleanlinee3");
            var third = thirdE.options[thirdE.selectedIndex].text;
            var thirdInt = parseInt(third);

            var sum = firstInt + secondInt + thirdInt;
            // alert(sum);

            //alert(sum * binomial((60 - sum), 5) / (binomial(60, 6) * 100) + '%');
            $('.result').html(sum * binomial((60 - sum), 5) / binomial(60, 6) * 100 + '%');
        });

    $("#calculate_brick").click(function() {
        var firstE = document.getElementById("sycamorecount");
        var first = firstE.options[firstE.selectedIndex].text;
        var sycamore = parseInt(first);

        var secondE = document.getElementById("ncount");
        var second = secondE.options[secondE.selectedIndex].text;
        var n = parseInt(second);

        var thirdE = document.getElementById("tmailcount");
        var third = thirdE.options[thirdE.selectedIndex].text;
        var tmail = parseInt(third);

        var shayE = document.getElementById("shaymincount");
        var shay = shayE.options[shayE.selectedIndex].text;
        var shaymin = parseInt(shay);

        var hoopaE = document.getElementById("hoopscount");
        var hoopa = hoopaE.options[hoopaE.selectedIndex].text;
        var hoops = parseInt(hoopa);

        var ifTrainer = false;

        var success = sycamore + n;
        if (sycamore > 0 || n > 0)
            ifTrainer = true;
        if (shaymin > 0 || hoops > 0) // Account Ultra Balls into not bricking if the player runs Shaymin-EX or Hoopa-EX
        {
            success += 4;
            ifTrainer = true;
        }
        var tmail_success = (tmail * binomial((60 - success), 4) / binomial(60, 4));
        if (ifTrainer)
            success += tmail_success;
        success += shaymin;
        success += hoops;
        // Making tmail quantity equal to success rate times number of trainer's mail
        // Even though there's no way to hit a decimal amount of trainer's mails :P

        // alert(sum);

        var noDraw = 1 * binomial((60 - success), 7) / binomial(60, 7);

        $('.resultbrick').html(noDraw * 100 + '%');
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
    basicCount = 0;

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
                        basicCount += parseInt(basics[i].num);
                    }
            }
        });
    }

    //alert(basicCount);

    //alert(hypergeometric(60 - basicCount, 60, basicCount));

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

function hypergeoSimple(m, N, n)
{
    // N = 60 cards in deck, n = subject size (7 for hand, 6 for prize)
    // m = number of subject in deck (4 for playset), i = 1

    var prob = 0;
    prob = prob + (binomial(m, i) * binomial((N - m), (n - i)) / binomial(N, n));
    return prob;
}