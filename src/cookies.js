function parseCache(name)
{
    //alert(document.cookie);
    var lines = localStorage.getItem(name);
    //alert("Lines length: " + globalLines.length + "lines[0]: " + globalLines[0]);

    //alert(lines);
    //lines = lines.split(' ').join('_');
    lines = lines.split('~').join('\n');
    lines = lines.split(name + '=').join('');

    $('#deckIn').empty();
    $('#deckIn').append(lines);
    //deckIn.append(lines[i].toString());
}


var printCache = function(){
    for (var i = 0; i < localStorage.length; i++)
        $('#cookies').append("<div>" + localStorage.key(i) + "</div>");

    //for (var i = 0; i < cookies.length; i++)
        //$('#cookies').append("<div>" + cookies[i] + "</div>");
}

function setCache(name) {
    var name = prompt("Enter a name.");
    name = name.split(' ').join('_');

    var lines = document.getElementById('deckIn').value.split('\n');
    var i;
    var cvalue = "";

    for (i = 0; i < lines.length; i++)
        cvalue += lines[i] + "~";


    //var d = new Date();
    //d.setTime(d.getTime() + (10*24*60*60*1000));
    //var expires = "expires="+ d.toUTCString();
    localStorage.setItem(name, cvalue);

}