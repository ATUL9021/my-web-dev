import { age as myAge, Name, myFunction } from './shopping.js';
import * as shoppingCart from './shopping.js';
import data from './shopping.js'; // it will import that default export .
import dd, { age } from './shopping.js'; // we can also import default export and named export
import { myAdd, arr } from './shopping.js'; // we will see live connection

myAdd(23);
myAdd('atul');
console.log(age);
console.log(arr); // if arr was just copy then it should have printed empty array but it didnt so its live copy;
console.log('atul');

console.log(shoppingCart);

shoppingCart.myFunction();
myFunction();
