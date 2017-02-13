var allInputs = [];
var operators = ["-", "+", "/", "*"];
var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

$(document).keydown(function (e) {
    console.log(e.key);

    if (operators.includes(e.key)) {
        allInputs.push(e.key);
    }

    if (numbers.includes(e.key)) {
        allInputs.push(e.key);
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

            allInputs.push(symbol);

            if (numbers.includes(symbol)) {
                displayCurrentExpression();
            }

            if (symbol === "=") {
                displayResult();
            }
        });
});

function getAnswer() {
    var i = indexOfOperator(allInputs, operators);
    var operator = allInputs[i];
    var answer = "";

    if (allInputs.length > 0 && operator != null) {
        var firstNum = parseInt(allInputs.join("").split(operator)[0]);
        var secondNum = parseInt(allInputs.join("").split(operator)[1]);

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

function clearDisplay() {
    display("");
    allInputs = [];
}

function displayResult() {
    display(getAnswer());
    allInputs = [];
}

function displayCurrentExpression() {
    display(allInputs.join(""));
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
