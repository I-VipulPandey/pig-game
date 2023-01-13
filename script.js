'use strict';

let finalScore0 = document.getElementById('score--0');
let finalScore1 = document.getElementById('score--1');
const player0 = document.querySelector('.player--0')
const player1 = document.querySelector('.player--1')
let currentScore0 = document.querySelector('#current--0')
let currentScore1 = document.querySelector('#current--1')


let dice = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let finalScore, currentScore, activePlayer, playing;

function init() {

    finalScore = [0, 0]
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    finalScore0.textContent = 0;
    finalScore1.textContent = 0;
    currentScore0.textContent = 0;
    currentScore1.textContent = 0;

    dice.classList.add('hidden');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');

    player0.classList.add('player--active')
    player1.classList.remove('player--active')

}

function rollingDice() {
    btnRoll.addEventListener('click', function () {

        if (playing) {
            // dice roll generator
            let diceRoll = Math.floor(Math.random() * 6) + 1;
            dice.classList.remove('hidden');

            dice.src = `dice-${diceRoll}.png`

            if (diceRoll !== 1) {
                currentScore += diceRoll;
                document.getElementById(`current--${activePlayer}`).textContent = currentScore;


            } else {
                //switch player

                currentScore = 0;
                document.getElementById(`current--${activePlayer}`).textContent = currentScore;
                activePlayer = activePlayer === 0 ? 1 : 0;

                player0.classList.toggle('player--active');
                player1.classList.toggle('player--active');


            }
        }

    })
}


function holdDice() {
    btnHold.addEventListener('click', function () {
        if (playing) {
            // final score generator
            finalScore[activePlayer] += currentScore;
            document.getElementById(`score--${activePlayer}`).textContent = finalScore[activePlayer];

            // game win condition   
            if (finalScore[activePlayer] >= 100) {
                playing = false;
                document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
                document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
                dice.classList.add('hidden');



            } else {
                //switch player
                currentScore = 0;
                document.getElementById(`current--${activePlayer}`).textContent = currentScore;
                activePlayer = activePlayer === 0 ? 1 : 0;

                player0.classList.toggle('player--active');
                player1.classList.toggle('player--active');
            }
        }



    })
}

function newGame() {

    btnNew.addEventListener('click', init)
}


init();
rollingDice();
holdDice();
newGame();
