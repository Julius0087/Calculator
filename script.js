let firstNumber;
let operator;
let secondNumber;

let displayValue;
const operatorArr = ["+", "-", "*", "/"];

const display = document.querySelector(".display");

const digit = document.querySelectorAll(".digit");
for (i of digit) {
  i.addEventListener("click", e => {
    /* console.log(e.target); */
    if (firstNumber && secondNumber === undefined) secondNumber = e.target.textContent; 
    else if (firstNumber) {
      secondNumber += e.target.textContent;
      console.log(secondNumber);
    }
    // populate the display
    populateDisplay(e.target.textContent);
  })
}

const operatorDiv = document.querySelectorAll(".operator");
for (i of operatorDiv) {
  i.addEventListener("click", e => {
    if (secondNumber !== undefined) return;

    // select the operator
    operator = e.target.textContent;
    // check for another operator click
    if (operatorCheck()) updateOperator(operator);// contains any other operator -> update the operator
    else populateDisplay(operator);
    // save the first number
    firstNumber = Number(displayValue.slice(0, -1));

    console.log(firstNumber);
    // TODO: add a decimal check
  })
}

const equalDiv = document.querySelector(".equal");
equalDiv.addEventListener("click", e => {
  if (firstNumber && secondNumber && operator) {
    const result = opearate(operator, firstNumber, Number(secondNumber));
    showResult(result)
  }
})

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
  display.textContent += context;
  displayValue = display.textContent;
}

function opearate(operator, x, y) {
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

function showResult(result) {
  display.textContent = result;
  displayValue = display.textContent;
}