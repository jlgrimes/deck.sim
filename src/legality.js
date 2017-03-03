$(document).ready(function() {

    for (var i = 0; i < data.length; i++) {
        $('.list').append(
            "<li>" + data[i].name + "</li>" +
            "<ul>" +
            "<li>Set: " + data[i].set + "</li>" +
            "<li>Number: " + data[i].number + "</li>" +
            "<li>Reference Required: " + data[i].reference + "</li>")
    }

    $('#search').keyup(function () {
        $('#uh').text("Results for " + $(this).val() + ":");
        $('.list').empty();

        for (var i = 0; i < data.length; i++) {
            if (data[i].name.toLowerCase().indexOf($(this).val().toLowerCase()) >= 0
                || data[i].set.toLowerCase().indexOf($(this).val().toLowerCase()) >= 0
                || data[i].number.toLowerCase().indexOf($(this).val().toLowerCase()) >= 0) {
                $('.list').append(
                    "<li>" + data[i].name + "</li>" +
                    "<ul>" +
                    "<li>Set: " + data[i].set + "</li>" +
                    "<li>Number: " + data[i].number + "</li>" +
                    "<li>Reference Required: " + data[i].reference + "</li>")
            }
        }
    });
});