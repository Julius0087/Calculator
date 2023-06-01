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
    // populate the display
    populateDisplay(e.target.textContent);
  })
}

const operatorDiv = document.querySelectorAll(".operator");
for (i of operatorDiv) {
  i.addEventListener("click", e => {
    // select the operator
    operator = e.target.textContent;
    if (operatorCheck()) updateOperator(operator); // contains any other operator -> update the operator
    else {
      populateDisplay(operator);
    }
  })
}

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
}

function populateDisplay(context) {
  display.textContent += context;
  displayValue = display.textContent;
}

function opearate(operator, x, y) {
  if (operator === "+") return add(x, y)
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