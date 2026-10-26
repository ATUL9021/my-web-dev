console.log('Hey');

export const arr = [];

const name = 'Atul';
let age = 23;
export const myFunction = function () {
  console.log('function inside shopping.js ');
};

export { name as Name, age }; // named export

export function myAdd(value) {
  arr.push(value);
  age = 93;
}
//default export
const myFathersName = 'praksah';
export default myFathersName;
// we can only do export defaut value of a single value
