const historyField = document.getElementById("history");
const resultField = document.getElementById("result");

function clearAll() {
    historyField.value = "";
    resultField.value = "";
}

function deleteLast() {
    resultField.value = resultField.value.slice(0, -1);
}

function insert(value) {

    const lastChar = resultField.value.slice(-1);
    const operators = ['+', '-', '*', '/', '%'];

    if (operators.includes(value) && operators.includes(lastChar)) {
        resultField.value = resultField.value.slice(0, -1) + value;
        return;
    }
    if (value === '.') {
        const parts = resultField.value.split(/[\+\-\*\/]/);
        const lastNumber = parts[parts.length - 1];
        if (lastNumber.includes('.')) return;
    }

    resultField.value += value;
}

function calculate() {
    try {
        const expression = resultField.value;

        if (!expression) return;


        const processedExpression = expression.replace(/%/g, '/100');


        const result = eval(processedExpression);


        const formattedResult = Number.isInteger(result) ?
            result :
            parseFloat(result.toFixed(8)).toString();

        historyField.value = `${expression} =`;
        resultField.value = formattedResult;
    } catch (error) {
        resultField.value = "Error";
        setTimeout(() => {
            resultField.value = "";
        }, 1500);
    }
}

document.addEventListener('keydown', (event) => {
    const key = event.key;


    if (/[\d\+\-\*\/\.\%]/.test(key)) {
        event.preventDefault();
        insert(key);
    }


    if (key === 'Enter') {
        event.preventDefault();
        calculate();
    }

    if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    }


    if (key === 'Escape') {
        event.preventDefault();
        clearAll();
    }
});