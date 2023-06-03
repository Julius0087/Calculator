let firstNumber;
let operator;
let secondNumber;

let displayValue;
const operatorArr = ["+", "-", "*", "/"];

const display = document.querySelector(".display");
const initialDisplay = display.textContent;

const digit = document.querySelectorAll(".digit");
for (i of digit) {
  i.addEventListener("click", e => {
    // assign the second number if operator exists
    if (operator && secondNumber === undefined) secondNumber = e.target.textContent; 
    else if (operator) {
      secondNumber += e.target.textContent;
    }
    // populate the display
    populateDisplay(e.target.textContent);
  })
}

const operatorDiv = document.querySelectorAll(".operator");
for (i of operatorDiv) {
  i.addEventListener("click", e => {
    calculate();
    if (secondNumber !== undefined || display.textContent === initialDisplay) return;

    // select the operator
    operator = e.target.textContent;
    // check for another operator click
    if (operatorCheck()) updateOperator(operator);// contains any other operator -> update the operator
    else populateDisplay(operator);
    // save the first number
    firstNumber = displayValue.slice(0, -1);

    console.log(firstNumber);
    // TODO: add a decimal check
  })
}

const equalDiv = document.querySelector(".equal");
equalDiv.addEventListener("click", e => {
  /* console.log(`first number: ${firstNumber} type: ${typeof(firstNumber)}`);
  console.log(`second number: ${secondNumber} type: ${typeof(secondNumber)}`);
  console.log(`operator: ${operator} type: ${typeof(operator)}`); */
  calculate();
})

const clearDiv = document.querySelector(".clear");
clearDiv.addEventListener("click", clearDisplay);

function operatorCheck() {
  if (displayValue.includes("+") ||
  displayValue.includes("-") ||
  displayValue.includes("/") ||
  displayValue.includes("*")) {
    return true;
  }
}

function updateOperator(operator) {
  displayValue = displayValue.slice(0, -1);
  displayValue += operator;
  display.textContent = displayValue;
  console.log(displayValue);
}

function populateDisplay(context) {
  if (display.textContent === initialDisplay) {
    display.textContent = context;
  }
  else {  
    display.textContent += context;
  }
  displayValue = display.textContent;
  console.log(displayValue);
}

function opearate(operator, x, y) {
  console.log("here we go")
  switch (operator) {
    case "+":
      return add(x, y);
    case "-":
      return subtract(x, y);
    case "*":
      return multiply(x, y);
    case "/":
      return divide(x, y);
  }
}

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  if (y === 0) return "Cannot divide by 0"
  return x / y;
}

function calculate() {
  if (firstNumber && secondNumber && operator) {
    const result = parseFloat((opearate(operator, Number(firstNumber), Number(secondNumber))).toFixed(6));
    showResult(result)
    secondNumber = undefined;
    firstNumber = result;
    operator = undefined;
  }
}

function showResult(result) {
  display.textContent = result;
  displayValue = display.textContent;
}

function clearDisplay() {
  display.textContent = initialDisplay;
  displayValue = display.textContent;
  firstNumber = undefined;
  secondNumber = undefined;
  operator = undefined;
}

/* TODO:
limit the decimal numbers
handle the decimal point
handle negative numbers properly
ability to type with numeric keyboard
divide by zero error handler */