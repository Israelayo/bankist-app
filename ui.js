'use strict';

// Presentation adapter: the original banking script owns authentication and data.
const dashboard = document.querySelector('.app');
const loginScreen = document.querySelector('.welcome-screen');
const loginFeedback = document.querySelector('.login-feedback');

function syncScreen() {
  const signedIn = Number(dashboard.style.opacity) > 0;
  document.body.classList.toggle('is-authenticated', signedIn);
  dashboard.inert = !signedIn;
  loginScreen.inert = signedIn;
  if (signedIn) loginFeedback.textContent = '';
}
new MutationObserver(syncScreen).observe(dashboard, {
  attributes: true,
  attributeFilter: ['style'],
});
syncScreen();

// Runs after the existing login handler; does not change credential checks.
document.querySelector('.login__btn').addEventListener('click', () => {
  if (Number(dashboard.style.opacity) > 0) {
    document.querySelector('.switch-account').focus();
  } else {
    loginFeedback.textContent = 'Username or PIN not recognised. Try one of the demo accounts below.';
  }
});

document.querySelector('.switch-account').addEventListener('click', () => {
  // Use the existing session timer and visibility contract.
  clearInterval(timer);
  dashboard.style.opacity = 0;
  syncScreen();
  document.querySelector('.login__input--user').focus();
});
