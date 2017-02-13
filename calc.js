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
        let result;

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];

            if (isOperator(part)) {
                // All operators are assumed to be binary
                const isFirstOperator = i === 1;

                let a;

                if (isFirstOperator) {
                    a = parts[i - 1];
                } else {
                    a = result;
                }

                const b = parts[i + 1];
                const associatedFn = OPERATORS[part];

                result = associatedFn(a, b);
            }
        }

        return result;
    };

    const isOperator = (symbol) => Object.keys(OPERATORS).includes(symbol);
    const isNumber = (symbol) => NUMBERS.includes(symbol);
    const isFinal = (symbol) => FINALIZERS.includes(symbol);

    const toString = () => symbols.join("");

    const toArray = () => {
        const parts = [];

        // Concatenate consecutive non-operator symbols into their own parts
        for (let i = 0; i < symbols.length; i++) {
            const symbol = symbols[i];
            const previousPart = parts[parts.length - 1];
            const isFirstSymbol = i === 0;

            if (isOperator(symbol) || isOperator(previousPart) || isFirstSymbol) {
                parts.push(symbol);
            } else {
                parts[parts.length - 1] += symbol;
            }
        }

        // Convert non-operator parts into numbers
        for (let i = 0; i < parts.length; i++) {
            if (!isOperator(parts[i])) {
                parts[i] = Number(parts[i]);
            }
        }

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
