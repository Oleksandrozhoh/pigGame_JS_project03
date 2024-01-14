'use strict';

// elements
const dice = document.querySelector('.dice');
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const btnNew = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const players = document.querySelectorAll('.player');
const activePlayerEl = document.querySelector('.player--active');

// setting initial conditions
let currentScore;
let totalScores;
let activePlayer;
let playing;

const initializingTheGame = function () {
  dice.classList.add('hidden');
  players.forEach(element => {
    element.classList.remove('player--winner');
  });
  player0.classList.add('player--active');
  player1.classList.remove('player--active');

  currentScore = 0;
  totalScores = [0, 0];
  activePlayer = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
};

initializingTheGame();

const switchActivePlayer = function () {
  const activePlayerCurrentScore = document.querySelector(
    `#current--${activePlayer}`
  );
  currentScore = 0;
  activePlayerCurrentScore.textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  players.forEach(element => {
    element.classList.toggle('player--active');
  });
};

// roll dice functionality
btnRollDice.addEventListener('click', function () {
  if (playing) {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    dice.src = `dice-${randomNumber}.png`;
    const activePlayerCurrentScore = document.querySelector(
      `#current--${activePlayer}`
    );

    // check if dice is 1 => switch the player if it is , build the current score if its not
    if (randomNumber !== 1) {
      currentScore += randomNumber;
      activePlayerCurrentScore.textContent = currentScore;
    } else {
      switchActivePlayer();
    }
  }
});

// hold button functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    const activePlayerTotalScore = document.querySelector(
      `#score--${activePlayer}`
    );

    // add points to the active player total score counter and switch the player
    if (activePlayer === 0) {
      totalScores[0] += currentScore;
      activePlayerTotalScore.textContent = totalScores[0];
    } else {
      totalScores[1] += currentScore;
      activePlayerTotalScore.textContent = totalScores[1];
    }

    // check if the player is a winner
    if (Number(activePlayerTotalScore.textContent) >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      dice.classList.add('hidden');
      // btnRollDice.classList.add('hidden');
      // btnHold.classList.add('hidden');
    } else {
      switchActivePlayer();
    }
  }
});

btnNew.addEventListener('click', initializingTheGame);
