console.log(add1(10, 200));

//function declaration
function add1(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}

function add2(firstNumber, secondNumber) {
  console.log(firstNumber + secondNumber);
}

//function expression
const add3 = function (firstNumber, secondNumber) {
  return firstNumber + secondNumber;
};

const add4 = function (firstNumber, secondNumber) {
  console.log(firstNumber + secondNumber);
};

const add5 = (firstNumber, secondNumber) => firstNumber + secondNumber;
const add6 = (firstNumber, secondNumber) =>
  console.log(firstNumber + secondNumber);

console.log(add2(10, 15));
console.log(add3(10, 2));
console.log(add4(10, 2));
console.log(add5(10, 10));
console.log(add6(100, 10));
