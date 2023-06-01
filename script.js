let firstNumber;
let operator;
let secondNumber;

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

console.log(opearate("+", 20, 20));