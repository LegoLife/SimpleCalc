var allInputs = [];
var numList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var operators = ["-", "+", "/", "*"];

$(document).ready(function () {

    $("#bclr")
        .click(clearDisplay());
    $("#b0, #b1,#b2,#b3,#b4,#b5,#b6,#b7,#b8,#b9,#bdel,#beq,#bdiv,#bplus,#btimes,#bsub")
        .click(function (a) {
            var item = a.target.innerHTML;
            allInputs.push(item);
            if (numList.includes(item.toString())) {
                appendToDisplay(allInputs);
            }
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

            if (a.target.innerHTML === "=") {
                allInputs = [];
                $("#display").val(answer);
            }
        });
});


function clearDisplay() {
        allInputs = [];
        $("#display").val(allInputs);
    }
function appendToDisplay(list) {
    var a = "";
    for (var i = 0; i < list.length; i++) {
        a += list[i].toString();
        //a += list[i] << 0;
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
    //var result = source.filter(function(item){ return $.inArray(target,item,0)});
    //return (result.length > 0);
}