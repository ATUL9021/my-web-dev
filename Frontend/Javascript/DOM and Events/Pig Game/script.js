'use strict';

let turn = 0;

const players = [
  {
    playerScoreElement: document.querySelector('#score--0'),
    currentScoreElement: document.querySelector('#current--0'),
    playerScore: 0,
    currentScore: 0,
    player: document.querySelector('.player--0'),
  },
  {
    playerScoreElement: document.querySelector('#score--1'),
    currentScoreElement: document.querySelector('#current--1'),
    playerScore: 0,
    currentScore: 0,
    player: document.querySelector('.player--1'),
  },
];

function changePlayer() {
  players[turn].player.classList.remove('player--active');
  turn = (turn + 1) % 2;
  players[turn].player.classList.add('player--active');
}
const newGameButton = document.querySelector('.btn--new');
const rollDiceButton = document.querySelector('.btn--roll');
const holdDiceButton = document.querySelector('.btn--hold');
const diceImage = document.querySelector('.dice');

rollDiceButton.addEventListener('click', function () {
  const diceNumber = Math.floor(Math.random() * 6) + 1;
  const imgSource = `dice-${diceNumber}.png`;
  diceImage.src = imgSource;
  if (diceNumber === 1) {
    players[turn].currentScore = 0;
    players[turn].currentScoreElement.textContent = players[turn].currentScore;
    changePlayer();
  } else {
    players[turn].currentScore += diceNumber;
    players[turn].currentScoreElement.textContent = players[turn].currentScore;
    if (players[turn].playerScore + players[turn].currentScore >= 100) {
      players[turn].player.classList.add('player--winner');
      players[turn].playerScore += players[turn].currentScore;
      players[turn].playerScoreElement.textContent = players[turn].playerScore;
      console.log('Player won  :', players[turn]);

      players[turn].player.style.backgroundColor = '#000';

      rollDiceButton.style.pointerEvents = 'none';
      holdDiceButton.style.pointerEvents = 'none';
    }
  }
});

holdDiceButton.addEventListener('click', function () {
  players[turn].playerScore += players[turn].currentScore;
  players[turn].playerScoreElement.textContent = players[turn].playerScore;
  players[turn].currentScore = 0;
  players[turn].currentScoreElement.textContent = players[turn].currentScore;
  changePlayer();
});

function startNewGame() {
  turn = 0;
  for (let i = 0; i < players.length; i++) {
    players[i].currentScore = 0;
    players[i].playerScore = 0;
    players[i].playerScoreElement.textContent = players[i].playerScore;
    players[i].currentScoreElement.textContent = players[i].currentScore;
    players[i].player.classList.toggle('player--winner');
  }

  const imgSource = `dice-${5}.png`;
  diceImage.src = imgSource;

  rollDiceButton.style.pointerEvents = 'auto';
  holdDiceButton.style.pointerEvents = 'auto';
}

newGameButton.addEventListener('click', function () {
  startNewGame();
});

startNewGame();
