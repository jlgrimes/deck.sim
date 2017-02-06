$(document).ready(function() {

    $("#cookies").click(function() {
        parse();
        alert((1 - hypergeometric(4, 60, 7, 0)) * 100 + "%");
    });
});

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