'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data

const daysAgo = n =>
  new Date(Date.now() - n * 24 * 60 * 60 * 1000).toISOString();

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  // movementsDates: [
  //   '2019-11-18T21:31:17.178Z',
  //   '2019-12-23T07:42:02.383Z',
  //   '2020-01-28T09:15:04.904Z',
  //   '2020-04-01T10:17:24.185Z',
  //   '2020-05-08T14:11:59.604Z',
  //   '2020-07-26T17:01:17.194Z',
  //   '2020-07-28T23:36:17.929Z',
  //   '2026-08-31T10:51:36.790Z',
  // ],
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    daysAgo(3), // 3 days ago
    daysAgo(2), // 2 days ago
    daysAgo(1), // yesterday
    daysAgo(0), // today
  ],
  currency: 'RUB',
  locale: 'ru-RU', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  // movementsDates: [
  //   '2019-11-01T13:15:33.035Z',
  //   '2019-11-30T09:48:16.867Z',
  //   '2019-12-25T06:04:23.907Z',
  //   '2020-01-25T14:18:46.235Z',
  //   '2020-02-05T16:33:06.386Z',
  //   '2020-04-10T14:43:26.374Z',
  //   '2020-06-25T18:49:59.371Z',
  //   '2020-07-26T12:01:20.894Z',
  // ],
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-05-08T14:11:59.604Z',
    daysAgo(3), // 3 days ago
    daysAgo(2), // 2 days ago
    daysAgo(1), // yesterday
    daysAgo(0), // today
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

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

const formatDate = function (date, locale) {
  const calcDayPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const dayPassed = calcDayPassed(new Date(), date);

  if (dayPassed === 0) return 'Today';
  if (dayPassed === 1) return 'Yesterday';
  if (dayPassed <= 7) return `${dayPassed} days ago`;
  else {
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();

    // return `${day}/${month}/${year}`;

    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const formatCurFunc = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};
const displayMovement = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  const combinedMovements = acc.movements.map((mov, i) => ({
    movement: mov,
    movementDate: acc.movementsDates.at(i),
  }));

  if (sort) combinedMovements.sort((a, b) => a.movement - b.movement);
  // const movs = sort
  //   ? acc.movements.slice().sort((a, b) => a - b)
  //   : acc.movements;
  combinedMovements.forEach(function (obj, i) {
    const { movement, movementDate } = obj;

    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(movementDate);
    const displayDate = formatDate(date, acc.locale);

    const formatCur = formatCurFunc(movement, acc.locale, acc.currency);

    const html = ` <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formatCur}</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const createUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsername(accounts);
//console.log(accounts);

const calcPrintBalance = function (account) {
  account.balance = account.movements.reduce((acc, cur) => acc + cur, 0);
  //console.log(balance);
  labelBalance.textContent = formatCurFunc(
    account.balance,
    account.locale,
    account.currency,
  );
};

const calcDisplaySummary = function (account) {
  const moneyIn = account.movements
    .filter(dep => dep > 0)
    .reduce((acc, cur) => acc + cur, 0);
  // console.log(moneyIn);
  labelSumIn.textContent = formatCurFunc(
    moneyIn,
    account.locale,
    account.currency,
  );

  const moneyOut = account.movements
    .filter(dep => dep < 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumOut.textContent = formatCurFunc(
    Math.abs(moneyOut),
    account.locale,
    account.currency,
  );

  const interest = account.movements
    .filter(dep => dep > 0)
    .map(dep => (dep * account.interestRate) / 100)
    .filter(dep => dep >= 1)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumInterest.textContent = formatCurFunc(
    interest,
    account.locale,
    account.currency,
  );
};

const updateUi = function (acc) {
  displayMovement(acc);
  calcPrintBalance(acc);
  calcDisplaySummary(acc);
};

const startTimeOut = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(Math.trunc(time % 60)).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }
    time--;
  };
  let time = 300;
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

let currentAccount, timer;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  const username = inputLoginUsername.value;

  currentAccount = accounts.find(acc => acc.username === username);

  const pin = +inputLoginPin.value;
  if (currentAccount?.pin === pin) {
    // console.log(currentAccount);

    labelWelcome.textContent = `Welcome ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = '';
    if (timer) {
      clearInterval(timer);
    }
    timer = startTimeOut();
    updateUi(currentAccount);

    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    };
    // const locale = navigator.language;

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options,
    ).format(now);
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = String(now.getHours()).padStart(2, 0);
    // const minute = String(now.getMinutes()).padStart(2, 0);

    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minute}`;
  }
  // console.log(currentAccount);
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value,
  );
  inputTransferTo.value = inputTransferAmount.value = '';
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc.username !== currentAccount.username
  ) {
    receiverAcc.movements.push(amount);
    currentAccount.movements.push(-amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    updateUi(currentAccount);
    clearInterval(timer);

    timer = startTimeOut();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(+inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some(move => move >= amount * 0.1)
  ) {
    const requestingAccount = currentAccount;
    inputLoanAmount.value = '';
    setTimeout(function () {
      requestingAccount.movements.push(amount);
      requestingAccount.movementsDates.push(new Date().toISOString());
      if (currentAccount === requestingAccount && +containerApp.style.opacity > 0) {
        updateUi(requestingAccount);
        clearInterval(timer);

        timer = startTimeOut();
      }
    }, 2500);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === +inputClosePin.value
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username,
    );
    accounts.splice(index, 1);
    inputCloseUsername.value = inputClosePin.value = '';
    containerApp.style.opacity = 0;
    alert('Account Deleted');
  }
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  sorted = !sorted;
  displayMovement(currentAccount, sorted);
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
