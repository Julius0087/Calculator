let firstNumber;
let operator;
let secondNumber;

let displayValue;
const operatorArr = ["+", "-", "*", "/"];

const display = document.querySelector(".display");
const initialDisplay = display.textContent;

// digit event listener for mouse
const digit = document.querySelectorAll(".digit");
for (i of digit) {
  i.addEventListener("click", e => {
    const number = e.target.textContent;
    digitEval(number);
  })
}
// digit event listener for keyboard
document.addEventListener("keydown", e => {
  try {
    const digit = document.querySelector(`#d${e.key}`);
  digitEval(digit.textContent);
  }
  catch(err) {
    void 0;
  }
})

// operator event listener for mouse
const operatorDiv = document.querySelectorAll(".operator");
for (i of operatorDiv) {
  i.addEventListener("click", e => {
    const op = e.target.textContent;
    operatorEval(op);
  })
}
// operator event listener for keyboard
document.addEventListener("keydown", e => {
  const operators = document.querySelectorAll(".operator");
  for (i of operators) {
    if (i.textContent === e.key) {
      operatorEval(i.textContent);
    }
  }
})

// equal event listener for mouse
const equalDiv = document.querySelector(".equal");
equalDiv.addEventListener("click", calculate);
// equal event listener for keyboard
document.addEventListener("keydown", e => {
  if (e.key === "Enter") calculate();
})

// decimal event listener for mouse
const decimal = document.querySelector(".decimal")
decimal.addEventListener("click", () => {
  decimalEval();
})
// decimal event listener for keyboard
document.addEventListener("keydown", e => {
  if (e.key === ".") decimalEval();
})

// clear event listener for mouse
const clearDiv = document.querySelector(".clear");
clearDiv.addEventListener("click", clearEval);
// clear event listener for keyboard
document.addEventListener("keydown", e => {
  if (e.key === "Backspace") clearEval();
})


function digitEval(number) {
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
}

function operatorEval(op) {
  calculate();
  // check for display lenght and adjust the size
  if (sizeCheck() === false) return;

  if (secondNumber !== undefined || display.textContent === initialDisplay) return;
  operator = op;
  
  // check for another operator click
  if (operatorCheck()) updateOperator(operator);// contains any other operator -> update the operator
  else populateDisplay(operator);
  // save the first number
  firstNumber = displayValue.slice(0, -1);
}

function decimalEval() {
  if (operatorCheck() || decimalCheck()) return;
  // check for display length and adjust the size
  if (sizeCheck() === false) return;

  // populate the display
  if (secondNumber === undefined) firstNumber += ".";
  else secondNumber += ".";
  
  populateDisplay(".");
}

function clearEval() {
  display.textContent = initialDisplay;
  displayValue = display.textContent;
  firstNumber = undefined;
  secondNumber = undefined;
  operator = undefined;
}

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
      return x + y;
    case "-":
      return x - y;
    case "*":
      return x * y;
    case "/":
      if (y === 0) return false;
      return x / y;;
  }
}

function calculate() {
  if (firstNumber && secondNumber && operator) {
    let result = opearate(operator, Number(firstNumber), Number(secondNumber));
    if (result === false) result = divZeroErr();
    else result = parseFloat(result.toFixed(8));
    
    console.log(result);
    showResult(result);
    secondNumber = undefined;
    firstNumber = result;
    operator = undefined;

    // check for display lenght and adjust the size
    if (sizeCheck() === false) return;
  }
}

function showResult(result) {
  display.textContent = result;
  displayValue = display.textContent;
}

function divZeroErr() {
  display.style.fontSize = "18px";
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

