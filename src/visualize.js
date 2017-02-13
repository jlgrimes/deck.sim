$(document).ready(function() {
    $("#printButton").click(function (event) {
        parse();
        $(".print").empty();

        var i;
        i = deck.length - 60;

        for (i; i < deck.length; i++) {
            var url = 'https://api.pokemontcg.io/v1/cards/' + deck[i].set + "-" + deck[i].setNo;

            $.ajax({
                async: false,
                url: url,
                success: function (data) {
                    $(".print").append("<img src='" + data.card.imageUrl + "' id='printCard" + i + "' class='printedCard' height='" + printHeight + "'></img>");
                }
            });
        }

    });
});