var expression = (function() {
    var OPERATORS = {
        "-": function (a, b) { return a - b; },
        "+": function (a, b) { return a + b; },
        "*": function (a, b) { return a * b; },
        "/": function (a, b) { return a / b; }
    };
    var NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    var FINALIZERS = ["=", "Enter"];
    var symbols = [];

    function append(symbol) {
        symbols.push(symbol);
    }

    function clear() {
        symbols = [];
    }

    function calculate() {
        var parts = toArray();
        var result;

        for (var i = 0; i < parts.length; i++) {
            var part = parts[i];

            if (isOperator(part)) {
                // All operators are assumed to be binary
                var isFirstOperator = i === 1;

                var a;

                if (isFirstOperator) {
                    a = parts[i - 1];
                } else {
                    a = result;
                }

                var b = parts[i + 1];
                var associatedFn = OPERATORS[part];

                result = associatedFn(a, b);
            }
        }

        return result;
    }

    function isOperator(symbol) {
        return Object.keys(OPERATORS).includes(symbol);
    }

    function isNumber(symbol) {
        return NUMBERS.includes(symbol);
    }

    function isFinal(symbol) {
        return FINALIZERS.includes(symbol);
    }

    function toString() {
        return symbols.join("");
    }

    function toArray() {
        var i;
        var parts = [];

        // Concatenate consecutive non-operator symbols into their own parts
        for (i = 0; i < symbols.length; i++) {
            var symbol = symbols[i];
            var previousPart = parts[parts.length - 1];
            var isFirstSymbol = i === 0;

            if (isOperator(symbol) || isOperator(previousPart) || isFirstSymbol) {
                parts.push(symbol);
            } else {
                parts[parts.length - 1] += symbol;
            }
        }

        // Convert non-operator parts into numbers
        for (i = 0; i < parts.length; i++) {
            if (!isOperator(parts[i])) {
                parts[i] = Number(parts[i]);
            }
        }

        return parts;
    }

    return {
        append: append,
        clear: clear,
        calculate: calculate,
        helpers: {
            isOperator: isOperator,
            isNumber: isNumber,
            isFinal: isFinal
        },
        toString: toString,
        toArray: toArray
    };
}());


$(document).keydown(function (e) {
    console.log(e.key);
    processSymbol(e.key);
});

$(document).ready(function () {
    $("#bclr").click(function () {
        expression.clear();
        display("");
    });

    $("#b0, #b1, #b2, #b3, #b4, #b5, #b6, #b7, #b8, #b9, #bdel, #beq, #bdiv, #bplus, #btimes, #bsub")
        .click(function (e) {
            processSymbol(e.target.innerHTML);
        });
});

function processSymbol(symbol) {
    if (expression.helpers.isOperator(symbol)) {
        expression.append(symbol);
    }

    if (expression.helpers.isNumber(symbol)) {
        expression.append(symbol);
        display(expression.toString());
    }

    if (expression.helpers.isFinal(symbol)) {
        display(expression.calculate());
        expression.clear();
    }
}

function display(string) {
    $("#display").val(string);
}
