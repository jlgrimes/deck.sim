$(document).ready(function() {
    $(".rule").hide();
    $(".subset").hide();
    $(".set").hide();
    $("li").click(function () {
        $(this).next("ul").toggle();
    })
});