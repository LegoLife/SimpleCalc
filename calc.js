
var allInputs = [];
$(document).ready(function () {

    $(document).keydown(function(){
        
        allInputs = $("#display").val().split("");
        
        if(event.keyCode===46 && allInputs.length > 0||event.keyCode===8 && allInputs.length > 0){
            allInputs.pop();
            appendToDisplay(allInputs);      
        }
    })
    $(document).keypress(function () {

    var key = String.fromCharCode(event.keyCode);
    var acceptedInputs = [".","0", "1", "2", "3", "4", "5", "6", "7", "8", "9","-", "+", "/", "*","="];

    for (var i = 0; i <= acceptedInputs.length+1; i++) 
    {
        if(acceptedInputs[i]===key){
            allInputs.push(key);
            break;
            }

        if (event.keyCode === 13) {
        allInputs.push(key);
        var itemtoremove = "=";
        allInputs.splice($.inArray(itemtoremove, allInputs), 1);
        CalculateAndDisplayAnswer(allInputs);
        break;
        }
    }
   appendToDisplay(allInputs);
})
   
    $("#bclr").click(clearDisplay);

    $("#b0, #b1,#b2,#b3,#b4,#b5,#b6,#b7,#b8,#b9,#bdel,#beq,#bdiv,#bplus,#btimes,#bsub").click(function (e) {
        var item = e.target.innerHTML;
        allInputs.push(item);
        appendToDisplay(allInputs);

        if (item === "="){
            var itemtoremove = "=";
            allInputs.splice($.inArray(itemtoremove, allInputs), 1);
            CalculateAndDisplayAnswer(allInputs);
        }
    });
});

function clearDisplay() {
    allInputs = [];
    $("#display").val(allInputs);
}

function appendToDisplay(listofItemstoAppend) {
   
    var joinedlistforDisplay = listofItemstoAppend.join("");
    $("#display").val(joinedlistforDisplay);
}

function CalculateAndDisplayAnswer(arrayOfinputsFromtheUser) {
    
    if (arrayOfinputsFromtheUser.length == 0) {
        $("#display").val(0);
    } else {

        var calculatedAnswer = Function("return " + arrayOfinputsFromtheUser.join(""))();
        $("#display").val(calculatedAnswer.toString());
    }
    allInputs = [calculatedAnswer.toString()];
}



