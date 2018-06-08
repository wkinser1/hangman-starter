/**
 * Hangman!
 * ===
 * Setup the variables and functions needed to create gameplay
 */

const word = "supercalafragilisticexpialidocious",
  correctLetters = [],
  incorrectLetters = [],
  guessesAllowed = 5;

let didWin = false,
  didLose = false;

function findLetter(letter) {
  if (word.indexOf(letter) > -1 && correctLetters.indexOf(letter) === -1) {
    correctLetters.push(letter)
  } else if (word.indexOf(letter) === -1 && incorrectLetters.indexOf(letter) === -1) {
    incorrectLetters.push(letter);
  } else {
    console.log("Already guessed that letter!");
  }
  updateGameProgressAndReturnRevealed();
}

function updateGameProgressAndReturnRevealed() {
  // How many correctly guessed letters should we reveal?
  let revealed = [];
  
  for (var i = 0; i < word.length; i++) {
    if (correctLetters.indexOf(word[i]) > -1) {
      revealed.push(word[i]);
    } else {
      revealed.push("_");
    }
  }

  // Did we win? Lose? Continue on?
  if (incorrectLetters.length === guessesAllowed) {
    didLose = true;
    console.log("*** Too many guesses! You lose. ***");
  } else if (revealed.join('') === word) {
    didWin = true;
    console.log("*** You won! Game over. ***");
  } else {
    console.log(revealed);
  }

  // return the revealed letters to display elsewhere
  return revealed.join('');
}

// run once to update/initiate the board
updateGameProgressAndReturnRevealed()

/**
 * Setup interactions with the DOM
 */

const progress = document.getElementById('hangmanProgress'),
  wordStats = document.getElementById('wordStats'),
  letterInput = document.getElementById('letterInput'),
  submitGuess = document.getElementById('submitGuess'),
  correct = document.getElementById('correctGuesses'),
  incorrect = document.getElementById('incorrectGuesses');

progress.innerText = updateGameProgressAndReturnRevealed();
wordStats.innerText = `${progress.innerText.length} letters`;

submitGuess.addEventListener('click', () => {
  findLetter(letterInput.value.toLowerCase());
  progress.innerText = updateGameProgressAndReturnRevealed();
  letterInput.value = '';

  correct.innerText = correctLetters.join(", ");
  incorrect.innerText = incorrectLetters.join(", ");

  if (didWin) {
    alert("You won!");
  }

  if (didLose) {
    alert(`You lost! Too bad. The word was: ${word}`);
  }
});