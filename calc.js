const expression = (() => {
    const OPERATORS = {
        "-": (a, b) => a - b,
        "+": (a, b) => a + b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b
    };
    const NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const FINALIZERS = ["=", "Enter"];
    let symbols = [];

    const append = (symbol) => symbols.push(symbol);

    const clear = () => symbols = [];

    const calculate = () => {
        const parts = toArray();

        const result = parts.reduce(
            (resultSoFar, part, index, allParts) => {
                if (isOperator(part)) {
                    // All operators are assumed to be binary
                    const nextPart = allParts[index + 1];
                    const operatorFn = OPERATORS[part];
                    return operatorFn(resultSoFar, nextPart);
                } else {
                    return resultSoFar;
                }
            }
        );

        return result;
    };

    const isOperator = (symbol) => Object.keys(OPERATORS).includes(symbol);
    const isNumber = (symbol) => NUMBERS.includes(symbol);
    const isFinal = (symbol) => FINALIZERS.includes(symbol);

    const toString = () => symbols.join("");

    const toArray = () => {
        const lastOf = (array) => array[array.length - 1]; // [1, 2, 3] => 3
        const initial = (array) => array.slice(0, -1);     // [1, 2, 3] => [1, 2]

        // Concatenate consecutive non-operator symbols into their own parts
        const mergedParts = symbols.reduce(
            (partsSoFar, symbol) => {
                const previousPart = lastOf(partsSoFar);

                if (isOperator(symbol) || isOperator(previousPart)) {
                    return [...partsSoFar, symbol];
                } else {
                    return [...initial(partsSoFar), previousPart.concat(symbol)];
                }
            }
        );

        // Convert non-operator parts into numbers
        const parts = mergedParts.map(
            (part) => isOperator(part) ? part : Number(part)
        );

        return parts;
    };

    return {
        append,
        clear,
        calculate,
        helpers: {
            isOperator,
            isNumber,
            isFinal
        },
        toString,
        toArray
    };
})();


const calculator = ((expression) => {
    const display = (string) => $("#display").val(string);

    const process = (symbol) => {
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
    };

    const clear = () => {
        display("");
        expression.clear();
    };

    return {
        process,
        clear
    };
})(expression);


$(document).ready(() => {
    const $symbolButtons = $("#b0, #b1, #b2, #b3, #b4, #b5, #b6, #b7, #b8, #b9, #bdel, #beq, #bdiv, #bplus, #btimes, #bsub");
    const $clearButton = $("#bclr");

    $symbolButtons.on('click', (e) => calculator.process(e.target.innerHTML));
    $(document).on('keydown', (e) => calculator.process(e.key));

    $clearButton.on('click', calculator.clear);
});
