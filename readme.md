# Bankist

A responsive, interactive banking application built with **HTML, CSS, and vanilla JavaScript**.

The project simulates a modern online banking experience and demonstrates practical JavaScript concepts including **DOM manipulation, array methods, objects, dates, internationalization, timers, form handling, and application state management**.

## Features

- User login with account-specific credentials
- Dynamic balance and transaction history
- Money transfers between accounts
- Loan requests with delayed processing
- Account closure with username and PIN verification
- Transaction sorting
- Dynamic relative dates such as **Today, Yesterday, 3 days ago**, etc.
- Locale-aware date and currency formatting using the **Intl API**
- Automatic logout after **5 minutes**
- Live session countdown timer

## Demo Accounts

| Username |    PIN | Currency | Locale       |
| -------- | -----: | -------- | ------------ |
| `js`     | `1111` | RUB      | Russian      |
| `jd`     | `2222` | USD      | English (US) |

### Transfers

The recipient username must be either:

- `js`
- `jd`

You can transfer money between the two demo accounts.

## Dynamic Dates

Transaction dates are based on actual date/time values rather than hardcoded labels. The application calculates the difference from the current date and automatically displays values such as:

`Today` · `Yesterday` · `3 days ago` · `7 days ago`

Older transactions are displayed using locale-aware date formatting.

## Technologies

- HTML5
- CSS3
- JavaScript (ES6+)
- DOM API
- Date API
- Intl API
- Browser Timer APIs

## JavaScript Concepts Demonstrated

This project applies concepts such as:

`map()` · `filter()` · `reduce()` · `find()` · `some()` · `forEach()` · `sort()` · `slice()` · `splice()` · destructuring · spread syntax · optional chaining · default parameters · ternary operators · `setTimeout()` · `setInterval()` · `Date` · `Intl.DateTimeFormat()` · `Intl.NumberFormat()` · dynamic DOM updates

## ⚠️ Disclaimer

This is a **fictional banking application created for educational and portfolio purposes**. It does not connect to real banking services or process real money.
