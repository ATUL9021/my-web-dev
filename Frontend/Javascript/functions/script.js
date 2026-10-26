'use strict';

// // function taking argument as another fucntion
// function higherOrderFunction(value, callBackFunction) {
//   if (value === 'click') {
//     callBackFunction();
//     console.log(callBackFunction.name);
//   }
// }

// const callBack = function () {
//   console.log("hey i'm callback");
// };
// higherOrderFunction('click', function () {
//   console.log("hey i'm callback");
// });

//function returning another function

// function greet(greeting) {
//   return function (name) {
//     console.log(greeting + ' ' + name);
//   };
// }

// const anotherGreet = greeting => name => console.log(greeting + ' ' + name);

// greet('Hey')('atul');
// anotherGreet('hey')('bro');

// call and apply method

// function print(a, b) {
//   console.log(`${this.name} and ${a + b} `);
// }

// const obj = { name: 'atul' };

// // print(10,2) -> accessing name on undefined error.
// print.call(obj, 10, 2);
// print.apply(obj, [10, 10]);

// bind method

// const obj = { name: 'atul' };
// const myFunction = function () {
//   console.log(this);
//   console.log(this.name + ' My Function ');
// };

// const bindFunction = myFunction.bind(obj);
// bindFunction();

// const btn = document.querySelector('.buy');

// btn.addEventListener('click', myFunction);
// btn.addEventListener('click', myFunction.bind(obj));

//closures

const outer = function () {
  let count = 0;

  return function () {
    count++;
    console.log(count);
    return count;
  };
};

const inner = outer();

inner();

inner();

console.dir(inner);
