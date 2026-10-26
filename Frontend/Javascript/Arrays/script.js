'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const insertData = function (movementArray, sort = false) {
  containerMovements.innerHTML = '';
  movementArray.forEach(function (value, index, array) {
    const type = value > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
          <div class="movements__type movements__type--${type}">${index + 1} ${type}</div>
          <div class="movements__date"></div>
          <div class="movements__value">${value}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const getUserName = function (name) {
  return name
    .toLowerCase()
    .split(' ')
    .map(function (value) {
      return value.at(0);
    })
    .join('');
};

const createUserNames = function (acc) {
  acc.forEach(function (value, index, array) {
    value.userName = getUserName(value.owner);
  });
};

function calculateTotalSum(account) {
  const mov = account.movements;
  labelBalance.textContent = account.totalSum = mov.reduce(
    (acc, value) => acc + value,
    0,
  );
}

function calculateDisplaySummary(movement, interestRate) {
  const income = movement
    .filter(value => value > 0)
    .reduce((acc, value) => acc + value);
  const out = movement
    .filter(value => value < 0)
    .reduce((acc, value) => acc + value);
  const interest = movement
    .filter(value => value > 0)
    .reduce((acc, value) => acc + value * (interestRate / 100), 0);

  labelSumIn.textContent = income;
  labelSumOut.textContent = Math.abs(out);
  labelSumInterest.textContent = interest;
}

createUserNames(accounts);

console.log(accounts);

function updateUI(account) {
  insertData(account.movements);
  calculateTotalSum(account);
  calculateDisplaySummary(account.movements, account.interestRate);
}

let currentAccount;
//do login;
btnLogin.addEventListener('click', function (event) {
  // if we use button inside form , page will reload whenever we will click it so preventDefault() method stops that behavior
  event.preventDefault();
  const userName = inputLoginUsername.value;
  const inputPin = inputLoginPin.value;
  console.log('button pressed');

  const account = accounts.find(
    account =>
      account.userName === userName && account.pin === Number(inputPin),
  );
  console.log(account);
  currentAccount = account;
  if (account) {
    labelWelcome.textContent = `welcome back ${account.owner.split(' ')[0]}`;
    updateUI(currentAccount);
    containerApp.style.opacity = '1';

    inputLoginUsername.value = inputLoginPin.values = '';
    inputLoginPin.blur(); // input field losses focus
  }
});

btnTransfer.addEventListener('click', function (event) {
  event.preventDefault();
  const userName = inputTransferTo.value;
  const money = Number(inputTransferAmount.value);

  const accountToSendMoney = accounts.find(
    account => account.userName === userName,
  );

  if (accountToSendMoney && currentAccount.totalSum >= money) {
    currentAccount.movements.push(-money);

    accountToSendMoney.movements.push(money);

    updateUI(currentAccount);
  }

  inputTransferTo.value = '';
  inputTransferAmount.value = '';
});

btnClose.addEventListener('click', function () {
  const userName = inputCloseUsername.value;
  const pin = Number(inputClosePin.value);

  if (currentAccount.userName === userName && pin == currentAccount.pin) {
    const index = accounts.find(acc => acc === currentAccount);
    accounts.splice(index, 1);
    containerApp.style.opacity = '0';
  }
});

const isSorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  if (!isSorted) {
    [...currentAccount.movements].sort((a, b) => a - b);
    isSorted = true;
  } else {
    insertData(currentAccount.movements);
    isSorted = false;
  }
});

btnLoan.addEventListener('click', function (event) {
  event.preventDefault();

  const loanAmount = inputLoanAmount.value;
  const is = currentAccount.movements.some(function (value) {
    return value > loanAmount * 0.1;
  });

  if (is) {
    currentAccount.movements.push(loanAmount);
    updateUI(currentAccount);
    inputLoanAmount.value = '';
  }
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

//Array Methods

// let a = ['a', ' b', 'c', 'atul'];

// console.log(a.slice(2));
// console.log(a.splice(1, 2));
// console.log(a);

// a = ['a', ' b', 'c', 'atul'];

// a.reverse();
// console.log(a);

// console.log(a.join('#'));
// console.log(a.concat(['shende']));

//for each

// const mov = [1, 2, 3, 4, 5];

// for (const [index, item] of mov.entries()) {
//   console.log(index, item);
// }

// mov.forEach(function (element, index, array) {
//   console.log(element, index, array);
// });

// map method;

// const a = [1, 2, 3, 4, 5];

// const b = a.map(function (value, index, arr) {
//   return value * 10;
// });
// console.log(b);
// console.log(a);

// //similar we can do using for of or foreach

// const newArray = [];

// for (const ele of a) {
//   newArray.push(ele * 10);
// }

// console.log(newArray);

//filter method

// const a = [101, 2, 3, 1220, 440];

// const b = a.filter(value => value > 100);
// console.log(b);

//reduce method
