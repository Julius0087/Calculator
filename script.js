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
    const number = e.target.textContent;
    // check for display lenght and adjust the size
    if (sizeCheck() === false) return;

    // assign the second number if operator exists
    if (operator && secondNumber === undefined) secondNumber = number; 
    else if (operator) {
      secondNumber += number;
    }
    // populate the display and assing the context to the first number
    if (firstNumber === undefined) firstNumber = number;
    else if (!operator) firstNumber += number;
    
    populateDisplay(number);
  })
}

const operatorDiv = document.querySelectorAll(".operator");
for (i of operatorDiv) {
  i.addEventListener("click", e => {
    calculate();
    // check for display lenght and adjust the size
    if (sizeCheck() === false) return;

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

  // check for display lenght and adjust the size
  if (sizeCheck() === false) return;
})

const decimal = document.querySelector(".decimal")
decimal.addEventListener("click", () => {
  if (operatorCheck() || decimalCheck()) return;
  // check for display length and adjust the size
  if (sizeCheck() === false) return;

  // populate the display
  if (secondNumber === undefined) firstNumber += ".";
  else secondNumber += ".";
  
  populateDisplay(".");
})

const clearDiv = document.querySelector(".clear");
clearDiv.addEventListener("click", clearDisplay);

function operatorCheck() {
  switch (displayValue.slice(-1)) {
    case "+":
      return true;
    case "-":
      return true;
    case "*":
      return true;
    case "/":
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
  if (y === 0) return false;
  return x / y;
}

function calculate() {
  if (firstNumber && secondNumber && operator) {
    let result = opearate(operator, Number(firstNumber), Number(secondNumber));
    if (result === false) result = divZeroErr();
    else result = parseFloat(result.toFixed(6));
    
    console.log(result);
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

function divZeroErr() {
  display.style.fontSize = "16px";
  return "Cannot divide by 0";
}

function sizeCheck() {
  let displayLength = display.textContent.length;

  if (displayLength <= 10) display.style.fontSize = "30px";
  if (displayLength > 10 && displayLength <=13) display.style.fontSize = "25px";
  if (displayLength > 13 && displayLength <=17) display.style.fontSize = "20px";
  if (displayLength > 17) return false;
}

function decimalCheck() {
  if (firstNumber !== undefined && secondNumber === undefined) {
    // cases where a decimal will not be printed
    if (firstNumber.toString().includes(".")) return true;
    return false;
  }
  else if (secondNumber !== undefined) {
    if (secondNumber.toString().includes(".")) return true;
    return false;
  }
  else return true;
  
}

/* TODO:
-more testing
ability to type with numeric keyboard */