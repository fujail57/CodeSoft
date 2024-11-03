const display = document.querySelector('.calculator-screen');
const keys = document.querySelector('.calculator-keys');

let firstOperand = '';
let secondOperand = '';
let currentOperation = null;

keys.addEventListener('click', (event) => {
  const { target } = event;
  const { value } = target;

  if (!target.matches('button')) {
    return;
  }

  switch (value) {
    case '+':
    case '-':
    case '*':
    case '/':
      handleOperator(value);
      break;
    case '=':
      calculate();
      break;
    case 'all-clear':
      clear();
      break;
    default:
      inputDigit(value);
  }

  updateDisplay();
});

function handleOperator(nextOperator) {
  if (currentOperation !== null) {
    calculate();
  }

  firstOperand = display.value;
  currentOperation = nextOperator;
  secondOperand = '';
}

function calculate() {
  let result;

  if (currentOperation === null) {
    return;
  }

  if (currentOperation === '+') {
    result = parseFloat(firstOperand) + parseFloat(secondOperand);
  } else if (currentOperation === '-') {
    result = parseFloat(firstOperand) - parseFloat(secondOperand);
  } else if (currentOperation === '*') {
    result = parseFloat(firstOperand) * parseFloat(secondOperand);
  } else if (currentOperation === '/') {
    result = parseFloat(firstOperand) / parseFloat(secondOperand);
  }

  display.value = result;
  firstOperand = result;
  currentOperation = null;
}

function inputDigit(digit) {
  if (currentOperation === null) {
    display.value = display.value === '0' ? digit : display.value + digit;
  } else {
    if (secondOperand === '') {
      display.value = digit;
    } else {
      display.value += digit;
    }

    secondOperand = display.value;
  }
}

function updateDisplay() {
  display.value = display.value;
}

function clear() {
  display.value = '';
  firstOperand = '';
  secondOperand = '';
  currentOperation = null;
}
