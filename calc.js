var allInputs = [];

$(document).keydown(function (e) {
    e = e || event;
    console.log(e.keyCode);

    var keycodes = [8, 13, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 107, 109, 106, 111];

    for (var i = 0; i < keycodes.length; i++) {
        if (e.shiftKey && e.which == 189) {
            allInputs.push("-");
            break;
        }

        if (e.shiftKey && e.which == 187) {
            allInputs.push("+");
            break;
        }

        if (e.keyCode >= 106 && e.keyCode <= 111) {
            switch (e.keyCode) {
                case 106:
                    allInputs.push("*");
                    break;
                case 107:
                    allInputs.push("+");
                    break;
                case 109:
                    allInputs.push("-");
                    break;
                case 111:
                    allInputs.push("/");
                    break;
            }
            break;
        }

        if (e.keyCode >= 48 && e.keyCode <= 57) {
            allInputs.push(String.fromCharCode(e.keyCode));
            appendToDisplay(allInputs);
            break;
        } else if (e.keyCode >= 96 && e.keyCode <= 105) {
            allInputs.push(String.fromCharCode(e.keyCode - 48));
            appendToDisplay(allInputs);
            break;
        } else if (e.keyCode == 13) {
            var answer = GetAnswer();
            $("#display").val(answer);
            allInputs = [];
            break;
        }
    }
})

$(document).ready(function () {
    $("#bclr")
        .click(function () {
            allInputs = [];
            $("#display").val(allInputs);
        });

    $("#b0, #b1, #b2, #b3, #b4, #b5, #b6, #b7, #b8, #b9, #bdel, #beq, #bdiv, #bplus, #btimes, #bsub")
        .click(function (a) {
            var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
            var item = a.target.innerHTML;

            allInputs.push(item);

            if (numbers.includes(item.toString())) {
                appendToDisplay(allInputs);
            }

            if (a.target.innerHTML === "=") {
                var answer = GetAnswer();
                $("#display").val(answer);
                allInputs = [];
            }
        });
});

function GetAnswer() {
    var operators = ["-", "+", "/", "*"];
    var i = indexofOperator(allInputs, operators);
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
    var a = "";
    for (var i = 0; i < list.length; i++) {
        a += list[i].toString();
    }
    $("#display").val(a);
}

function indexofOperator(source, target) {
    for (var i = 0; i < source.length; i++) {
        for (var j = 0; j < target.length; j++) {
            if (source[i] === target[j]) {
                return i;
            }
        }
    }
}
