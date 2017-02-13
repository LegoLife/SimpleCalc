var allInputs = [];

$(document).keydown(function (e) {
    console.log(e.key);

    if (e.key === "-") {
        allInputs.push("-");
    }

    if (e.key === "+") {
        allInputs.push("+");
    }

    if (e.key === "*") {
        allInputs.push("*");
    }

    if (e.key === "/") {
        allInputs.push("/");
    }

    if (e.key >= "0" && e.key <= "9") {
        allInputs.push(e.key);
        appendToDisplay(allInputs);
    } else if (e.key == "Enter") {
        var answer = getAnswer();
        $("#display").val(answer);
        allInputs = [];
    }
});

$(document).ready(function () {
    $("#bclr").click(clearDisplay);

    $("#b0, #b1, #b2, #b3, #b4, #b5, #b6, #b7, #b8, #b9, #bdel, #beq, #bdiv, #bplus, #btimes, #bsub")
        .click(function (e) {
            var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
            var symbol = e.target.innerHTML;

            allInputs.push(symbol);

            if (numbers.includes(symbol.toString())) {
                appendToDisplay(allInputs);
            }

            if (symbol === "=") {
                var answer = getAnswer();
                $("#display").val(answer);
                allInputs = [];
            }
        });
});

function getAnswer() {
    var operators = ["-", "+", "/", "*"];
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
    allInputs = [];
    $("#display").val(allInputs);
}

function appendToDisplay(list) {
    var expression = list.join("");
    $("#display").val(expression);
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
