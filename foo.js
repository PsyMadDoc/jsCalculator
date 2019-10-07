class Calculator {
  constructor(previousInputTextElement, currentInputTextElement) {
    this.previousInputTextElement = previousInputTextElement;
    this.currentInputTextElement = currentInputTextElement;
    this.readyToReset = false;
    this.delete();
  }

  delete() {
    this.currentInput = '';
    this.previousInput = '';
    this.operation = undefined;
  }

  backspace() {
    this.currentInput = this.currentInput.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentInput.includes('.')) return;
    this.currentInput = this.currentInput.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentInput === '') return;
    if (this.currentInput !== '' && this.previousInput !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousInput = this.currentInput;
    this.currentInput = '';
  }

  compute() {
    let result;
    const previousNum = parseFloat(this.previousInput);
    const currentNum = parseFloat(this.currentInput);
    if (isNaN(previousNum) || isNaN(currentNum)) return;
    switch (this.operation) {
      case '÷':
        result = previousNum / currentNum;
        break;
      case '×':
        result = previousNum * currentNum;
        break;
      case '-':
        result = previousNum - currentNum;
        break;
      case '+':
        result = previousNum + currentNum;
        break;
      default:
        return;
    }
    this.readyToReset = true;
    this.currentInput = result;
    this.operation = undefined;
    this.previousInput = '';
  }

  updateDisplay() {
    this.currentInputTextElement.innerText = this.currentInput;
    if (this.operation != null) {
      this.previousInputTextElement.innerText = `${this.previousInput} ${this.operation}`;
    }
  }
} // class Calculator end

const numberButtons = document.querySelectorAll('[data-number]');
const operandButtons = document.querySelectorAll('[data-operand]');
const equalsButton = document.querySelector('[data-equals]');
const backspaceButton = document.querySelector('[data-backspace]');
const deleteButton = document.querySelector('[data-delete]');
const previousInputTextElement = document.querySelector(
  '[data-previous-input]'
);
const currentInputTextElement = document.querySelector('[data-current-input]');

const calculator = new Calculator(
  previousInputTextElement,
  currentInputTextElement
);

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});

backspaceButton.addEventListener('click', button => {
  calculator.backspace();
  calculator.updateDisplay();
});

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (
      calculator.previousInput === '' &&
      calculator.currentInput !== '' &&
      calculator.readyToReset
    ) {
      calculator.currentInput = '';
      calculator.readyToReset = false;
    }
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operandButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
});
