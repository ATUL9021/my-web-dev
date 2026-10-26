'use strict';

// const Person = function (firstName, age) {
//   this.firstName = firstName;
//   this.age = age;

//   //bad practice , cause if we do all objects with have this method, and will consume memory
//   //   this.calAge = function () {
//   //     console.log('my age', this.age);
//   //   };
// };

// const atul = new Person('atul', 22);
// const rupali = new Person('rupali', 22);

// console.log(atul);
// console.log(rupali);
// console.log(atul instanceof Person);

//prototypes

// Person.prototype.calAge = function () {
//   return this.age;
// };

// console.log(atul.calAge());
// console.log(Person.prototype);

// console.log(atul);
// console.log(atul.__proto__);
// console.log(Person.prototype.isPrototypeOf(atul));
// console.log(Person.prototype.isPrototypeOf(rupali));
// console.log(Person.prototype.isPrototypeOf(Person));
// console.log(Person.prototype.constructor === Person);

//ES6 classes

// console.log(Object.getPrototypeOf(new MyPerson()) === MyPerson.prototype);
// class Human {
//   constructor() {}
//   getAge() {}
// }
// class Person extends Human {
//   constructor(firstName, age) {
//     super();
//     this.firstName = firstName;
//     this.age = age;
//   }

//   calAge() {
//     return this.age;
//   }
// }

// const atul = new Person();
// console.dir(atul);

//inheritance using constructor function

// function Person(firstName, age) {
//   this.firstName = firstName;
//   this.age = age;
// }

// Person.prototype.walk = function () {
//   console.log("I'm walking");
// };
// function Student(firstName, age, college) {
//   Person.call(this, firstName, age);
//   this.college = college;
// }

// Student.prototype = Object.create(Person.prototype);
// // Student.prototype.constructor = Student;

// Student.prototype.doStudy = function () {
//   console.log("I'm styding");
// };

// const student = new Student('atul', 23, 'VNIT');
// student.walk();
// student.doStudy();
// console.log(student.__proto__);
// console.log(student.__proto__.constructor);
// console.log(student.__proto__.__proto__);
// console.log(student.__proto__.__proto__.__proto__);
// console.log(student.__proto__.__proto__.__proto__.__proto__);

//inheritance using classes

// class Person {
//   constructor(firstName) {
//     this.firstName = firstName;
//   }
// }

// class Student extends Person {
//   constructor() {}
// }

// const student = new Student('Atul', 3);
// console.log(student);

//Encapsulation

class Person {
  constructor(firstName, age) {
    this.firstName = firstName;
    this.age = age;
  }

  #surname = 'shende';
  mySurname = 'bro';

  #getFood() {
    console.log('getFood');
  }

  dontGetFood() {
    console.log(' dont get food');
  }

  static atulIs() {
    this.mySurname = '33';
    console.log('atulIs');
  }
}

const atul = new Person('atul', 23);

// console.log(atul);
Person.atulIs();
console.log(Person.mySurname);
