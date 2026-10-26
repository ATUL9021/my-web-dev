// // type conversion

const age = "1992";
console.log(age + 8);
console.log(Number(age) + 8);

//type coercion

console.log("hey" + 10); //js is automoatically convert 10 to string so its basically doing hey + String(10);

console.log("20" - 10); // js will convert '20' into number so it depends on operator we are using.

console.log(20 - "1" + "10"); //output : 1910;

console.log("20" * 2);

console.log("20" * "2");

// // // output :
// // type_conversion_coercion.js:4 19928
// // type_conversion_coercion.js:5 2000
// // type_conversion_coercion.js:9 hey10
// // type_conversion_coercion.js:11 10
// // type_conversion_coercion.js:13 1910
// // type_conversion_coercion.js:15 40
// // type_conversion_coercion.js:17 40

//truthy and falsy values

// 5 falsy values  : 0, undefined , '', null , NaN

console.log(Boolean(10));
console.log(Boolean(""));
console.log(Boolean(0));

let money;
console.log("hey ", money > 10);
if (money) {
  console.log("Money is  defined");
} else if (money > 10) {
  console.log("Money is defined and  >10");
} else {
  console.log("Money is not defined");
}
//  money is undefined so js will convert it into false automatically

// output :

// true
// false
// type_conversion_coercion.js:34 false
// type_conversion_coercion.js:37 hey  false
// type_conversion_coercion.js:43 Money is not defined
