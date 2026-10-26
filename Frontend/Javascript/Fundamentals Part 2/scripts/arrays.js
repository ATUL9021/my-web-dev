// Arrays

// const friends = ["atul", "yelo"];

// console.log(friends.length);
// console.log(friends.push(93));
// console.log(friends);

// console.log(friends.pop());
// console.log(friends.shift());
// console.log(friends);

//Objects

const atul = {
  firstName: "atul",
  birthYear: 2002,
  married: true,
  gender: "male",

  calAge: function () {
    this.age = 2026 - this.birthYear;
    return this.age;
  },
};

console.log(atul.firstName);
console.log(atul["first" + "Name"]);
atul.company = "No company";
atul.calAge();
console.log(atul);

for (let i = 0; i < 10; i++) {
  console.log(`hey bro ${i}`);
}

let i = 3;
while (i < 10) {
  console.log(`atul shende ${i}`);
  i++;
}
