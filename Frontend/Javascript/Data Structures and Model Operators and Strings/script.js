'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const italianFoods = new Set([
  'pasta',
  'gnocchi',
  'tomatoes',
  'olive oil',
  'garlic',
  'basil',
]);

const mexicanFoods = new Set([
  'tortillas',
  'beans',
  'rice',
  'tomatoes',
  'avocado',
  'garlic',
]);

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

// //Array Destructuring

// let [first, , , second] = restaurant.categories;

// console.log(first, second);

// // swap without using the temp variable;
// [second, first] = [first, second];

// //default value

// const [x = 1, y = 1, z = 1] = [10, 29];
// console.log(x, y, z);

// const [a, [b]] = [10, [2]];

// ----------------------------------------------------------------------------------------
//object destructuring

// const { name, location, openingHours } = restaurant;
// console.log(name, location, openingHours);

// with diff names

// const { name: myName, location: myLocation, openingHours: hours } = restaurant;
// console.log('renamed', myName, myLocation, hours);

// // with default values

// const {
//   name: myName = ' ',
//   location: myLocation = '2:00',
//   openingHours: hours = [],
// } = restaurant;
// // console.log('renamed', myName, myLocation, hours);

// // nested destructuring

// const {
//   thu: { open: myOpen, close: myClose },
//   fri,
//   sat,
// } = hours;

// console.log(myOpen, myClose, fri, sat);

//---------------------------------------------------------------------

//spread operator

// const a = [1, 2, 3, 4, 5, 6];
// const newA = [...a];
// console.log(newA);

// const restaurantCopy = { ...restaurant }; // shallow copy
// restaurantCopy.categories.push('Atul');
// console.log(restaurantCopy, restaurant);

//--------------------------------------------------------------

//Rest Pattern

// const [a, b, ...rest] = [1, 2, 3, 4, 5];
// console.log(a, b, rest);

// we can also use rest pattern in function parameter

// -------------------------------------------------------

// short circuiting .

// console.log(1 || 2 || 3 || 'atul');
// console.log(1 && 2 && 3 && 4 && ' as');
// // console.log(undefined ?? 3 ?? 4);  3 is first non nullish value that is why it is return;
// console.log(null ?? undefined);
// console.log(undefined ?? null);

// let value = 10;
// value ||= 1 || 2 || 3 || 'atul';
// console.log(value);

//----------------------------------------------

// for over arrays

// for (const item of restaurant.mainMenu) {
//   console.log(item);
// }
// for (const item of restaurant.mainMenu.entries()) {
//   console.log(item);
// }
// for (const [index, value] of restaurant.mainMenu.entries()) {
//   console.log('destructuring', index, value);
// }

/// ------------------------------------------------------

// looping over objects

// for (const key of Object.keys(restaurant.openingHours)) {
//   console.log('keys ', key);
// }
// for (const key of Object.values(restaurant.openingHours)) {
//   console.log('values ', key);
// }
// for (const key of Object.entries(restaurant.openingHours)) {
//   console.log('entries ', key);
// }
// for (const [key, { open, close }] of Object.entries(restaurant.openingHours)) {
//   console.log('values destr ', key, open, close);
// }

///-------------------         -------------------

// sets and maps

const mySet = new Set(['hey', '1', '2', 1001]);
mySet.add(3);
console.log(mySet);

const myMap = new Map();

myMap.set(1, 2).set('atul', 'name');
console.log(myMap);

for (const pair of myMap) {
  console.log(pair);
}

const myNewMap = new Map([
  [1, 2],
  [3, 4],
  [5, 6],
]);

console.log(myNewMap);
