'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////

//old way
// const request = new XMLHttpRequest();
// request.open('GET', 'https://api.agify.io?name=atul');
// request.send();

// request.addEventListener('load', function () {
//   const obj = JSON.parse(this.responseText);
//   console.log(obj);
// });

// const request = fetch('https://api.agify.io?name=rupali');
// console.log(request);
// request
//   .then(response => {
//     if (response.status != 202) throw new Error('why ');
//     return response.json();
//   })
//   .then(data => {
//     console.log(data);
//     return fetch('https://api.agify.io?name=atul');
//   })
//   .then(response => {
//     return response.json();
//   })
//   .then(data => console.log(data))
//   .catch(err => console.error(err))
//   .finally(() => console.log('Nice'));

///building a promise

// const p = new Promise(function (resolve, reject) {
//   resolve(5);
// });

// Promise.resolve(9);
// Promise.reject(new Error("Hey"));

//async and await

// async function fetchDate() {
//   throw new Error('HEY ss');
// }

// fetchDate().then(
//   () => {},
//   someting => {
//     console.log(someting.message);
//   },
// );
// console.log('HEy');

//promise combinators

async function myFunction() {
  //   const res1 = await Promise.all([Promise.resolve(1), Promise.resolve(33)]);
  //   const res1 = await Promise.all([Promise.resolve(1), Promise.reject('33')]);
  //   const res1 = await Promise.race([Promise.reject(33), Promise.reject('33')]);
  //   const res1 = await Promise.allSettled([
  //     Promise.reject(new Error('why')),
  //     Promise.resolve('33'),
  //   ]);
  //   const res1 = await Promise.any([Promise.reject(33), Promise.resolve('33')]);
  //   console.log(res1);
}

myFunction();
