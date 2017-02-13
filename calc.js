var expression = (function() {
    var OPERATORS = ["-", "+", "/", "*"];
    var NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    var FINALIZERS = ["=", "Enter"];
    var symbols = [];

    function append(symbol) {
        symbols.push(symbol);
    }

    function clear() {
        symbols = [];
    }

    function toString() {
        return symbols.join("");
    }

    function toArray() {
        return symbols;
    }

    return {
        operators: OPERATORS,
        numbers: NUMBERS,
        finalizers: FINALIZERS,
        append: append,
        clear: clear,
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
    if (expression.operators.includes(symbol)) {
        expression.append(symbol);
    }

    if (expression.numbers.includes(symbol)) {
        expression.append(symbol);
        display(expression.toString());
    }

    if (expression.finalizers.includes(symbol)) {
        display(
            getAnswer(expression.toArray(), expression.operators)
        );
        expression.clear();
    }
}

function getAnswer(expressionParts, operators) {
    var i = indexOfOperator(expressionParts, operators);
    var operator = expressionParts[i];
    var answer = "";

    if (expressionParts.length > 0 && operator != null) {
        var firstNum = parseInt(expressionParts.join("").split(operator)[0]);
        var secondNum = parseInt(expressionParts.join("").split(operator)[1]);

        switch (operator) {
            case "+":
                answer = firstNum + secondNum;
                break;
            case "*":
                answer = firstNum * secondNum;
                break;
            case "/":
                answer = firstNum / secondNum;
                break;
            case "-":
                answer = firstNum - secondNum;
                break;
        }
    }

    return answer;
}

function display(string) {
    $("#display").val(string);
}

function indexOfOperator(source, target) {
    for (var i = 0; i < source.length; i++) {
        for (var j = 0; j < target.length; j++) {
            if (source[i] === target[j]) {
                return i;
            }
        }
    }
}
