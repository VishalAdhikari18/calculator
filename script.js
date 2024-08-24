let displayValue = "0";
let firstOperand = null;
let secondOperand = false;
let operator = null;

function updateDisplay() {
    const display = document.getElementById("display");
    display.textContent = displayValue;
}

function clearDisplay() {
    displayValue = "0";
    firstOperand = null;
    secondOperand = false;
    operator = null;
    updateDisplay();
}

function appendNumber(number) {
    if (secondOperand === true) {
        displayValue = String(number);
        secondOperand = false;
    } else {
        displayValue = displayValue === "0" ? String(number) : displayValue + number;
    }
    updateDisplay();
}

function appendDot() {
    if (!displayValue.includes(".")) {
        displayValue += ".";
        updateDisplay();
    }
}

function appendOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (operator && secondOperand) {
        operator = nextOperator;
        return;
    }

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = performCalculation(operator, firstOperand, inputValue);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstOperand = result;
    }

    secondOperand = true;
    operator = nextOperator;
    updateDisplay();
}

function performCalculation(operator, firstOperand, secondOperand) {
    switch (operator) {
        case "+":
            return firstOperand + secondOperand;
        case "-":
            return firstOperand - secondOperand;
        case "×":
            return firstOperand * secondOperand;
        case "÷":
            return firstOperand / secondOperand;
        default:
            return secondOperand;
    }
}

function calculateResult() {
    let inputValue = parseFloat(displayValue);

    if (operator && secondOperand) {
        operator = null;
        return;
    }

    if (operator) {
        const result = performCalculation(operator, firstOperand, inputValue);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstOperand = result;
        operator = null;
    }

    secondOperand = true;
    updateDisplay();
}

function deleteLast() {
    if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
    } else {
        displayValue = "0";
    }
    updateDisplay();
}

function toggleSign() {
    displayValue = displayValue.charAt(0) === "-" ? displayValue.slice(1) : "-" + displayValue;
    updateDisplay();
}
function minimizeCalculator() {
    const calculator = document.querySelector('.calculator');
    const display = document.getElementById('display');
    const buttons = document.querySelector('.buttons');
    
    if (calculator.classList.contains('minimized')) {
        display.style.display = 'block';
        buttons.style.display = 'grid';
        calculator.classList.remove('minimized');
    } else {
        display.style.display = 'none';
        buttons.style.display = 'none';
        calculator.classList.add('minimized');
    }
}

function closeCalculator() {
    const calculator = document.querySelector('.calculator');
    calculator.style.display = 'none';
}


document.addEventListener('keydown', function(event) {
    const key = event.key;
    const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', 'Enter', '=', 'Backspace', 'Delete', 'Escape'];

    if (validKeys.includes(key)) {
        if (!isNaN(key)) {
            appendNumber(key);
        } else if (key === '.') {
            appendDot();
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            let operator = key === '*' ? '×' : key === '/' ? '÷' : key;
            appendOperator(operator);
        } else if (key === 'Enter' || key === '=') {
            calculateResult();
        } else if (key === 'Backspace') {
            deleteLast();
        } else if (key === 'Delete') {

            clearDisplay();
        } else if (key === 'Escape') {
            clearDisplay();
        }
    }
});

function appendNumber(number) {
    const display = document.getElementById('display');
    if (display.innerText === '0') {
        display.innerText = number;
    } else {
        display.innerText += number;
    }
}

function appendOperator(operator) {
    const display = document.getElementById('display');
    display.innerText += ` ${operator} `;
}

