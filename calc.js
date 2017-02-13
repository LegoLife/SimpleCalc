var allInputs = [];

$(document).keydown(function (e) {
    console.log(e.key);
    processSymbol(e.key);
});

$(document).ready(function () {
    $("#bclr").click(clearDisplay);

    $("#b0, #b1, #b2, #b3, #b4, #b5, #b6, #b7, #b8, #b9, #bdel, #beq, #bdiv, #bplus, #btimes, #bsub")
        .click(function (e) {
            processSymbol(e.target.innerHTML);
        });
});

function processSymbol(symbol) {
    var operators = ["-", "+", "/", "*"];
    var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    var finalizers = ["=", "Enter"];

    if (operators.includes(symbol)) {
        appendToExpression(symbol);
    }

    if (numbers.includes(symbol)) {
        appendToExpression(symbol);
        displayCurrentExpression();
    }

    if (finalizers.includes(symbol)) {
        displayResult(operators);
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

function clearExpression() {
    allInputs = [];
}

function appendToExpression(symbol) {
    allInputs.push(symbol);
}

function getExpressionParts() {
    return allInputs;
}

function getExpression() {
    return allInputs.join("");
}

function clearDisplay() {
    display("");
    clearExpression();
}

function displayResult(operators) {
    display(
        getAnswer(getExpressionParts(), operators)
    );
    clearExpression();
}

function displayCurrentExpression() {
    display(getExpression());
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
