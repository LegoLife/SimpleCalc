var allInputs = [];
var operators = ["-", "+", "/", "*"];
var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

$(document).keydown(function (e) {
    console.log(e.key);

    if (operators.includes(e.key)) {
        appendToExpression(e.key);
    }

    if (numbers.includes(e.key)) {
        appendToExpression(e.key);
        displayCurrentExpression();
    }

    if (e.key == "Enter") {
        displayResult();
    }
});

$(document).ready(function () {
    $("#bclr").click(clearDisplay);

    $("#b0, #b1, #b2, #b3, #b4, #b5, #b6, #b7, #b8, #b9, #bdel, #beq, #bdiv, #bplus, #btimes, #bsub")
        .click(function (e) {
            var symbol = e.target.innerHTML;

            appendToExpression(symbol);

            if (numbers.includes(symbol)) {
                displayCurrentExpression();
            }

            if (symbol === "=") {
                displayResult();
            }
        });
});

function getAnswer() {
    var expressionParts = getExpressionParts();
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

function displayResult() {
    display(getAnswer());
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
