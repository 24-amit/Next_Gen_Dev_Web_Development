document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');
    const clearButton = document.getElementById('clear');
    const equalsButton = document.getElementById('equals');

    let currentInput = '';
    let operator = '';
    let firstOperand = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            const type = button.getAttribute('data-type');

            if (type === 'operator') {
                if (firstOperand === null) {
                    firstOperand = parseFloat(currentInput);
                } else {
                    firstOperand = calculate(firstOperand, operator, parseFloat(currentInput));
                }
                operator = value;
                currentInput = '';
            } else if (type === 'decimal') {
                if (!currentInput.includes('.')) {
                    currentInput += value;
                }
            } else {
                currentInput += value;
            }

            display.textContent = currentInput || firstOperand || '0';
        });
    });

    equalsButton.addEventListener('click', () => {
        if (firstOperand !== null && operator !== '') {
            currentInput = calculate(firstOperand, operator, parseFloat(currentInput)).toString();
            firstOperand = null;
            operator = '';
            display.textContent = currentInput;
        }
    });

    clearButton.addEventListener('click', () => {
        currentInput = '';
        operator = '';
        firstOperand = null;
        display.textContent = '0';
    });

    function calculate(a, operator, b) {
        switch (operator) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return a / b;
            default: return b;
        }
    }
});