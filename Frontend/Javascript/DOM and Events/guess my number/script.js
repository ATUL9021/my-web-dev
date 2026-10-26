'use strict';

const checkButton = document.querySelector('.check');
const againButton = document.querySelector('.again');

let randomNumber = Math.floor(Math.random() * 20) + 1;

let highScore = 0;
let score = 20;
checkButton.addEventListener('click', function () {
  const inputFieldValue = document.querySelector('.guess').value;

  if (inputFieldValue.length == 0) {
    return;
  }

  const guessedNumber = Number(inputFieldValue);

  if (guessedNumber > randomNumber) {
    document.querySelector('.message').textContent = 'Too High !';
    score--;
  } else if (guessedNumber < randomNumber) {
    document.querySelector('.message').textContent = 'Too Low !';
    score--;
  } else {
    document.querySelector('.message').textContent = 'correct Number !';
    document.querySelector('body').style.backgroundColor = '#60b347';
    if (score > highScore) {
      highScore = score;
    }
  }
});
f;

const againFunction = function () {
  randomNumber = Math.floor(Math.random() * 20) + 1;
  score = 20;
  document.querySelector('.message').textContent = 'Start Guessing';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.guess').value = '';
};
againButton.addEventListener('click', againFunction);
