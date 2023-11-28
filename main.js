let playerText = document.getElementById("playerText");
let restartBtn = document.getElementById("restartBtn");
let boxes = Array.from(document.getElementsByClassName("box"));

let winnerIndicator = getComputedStyle(document.body).getPropertyValue(
  "--winning-blocks"
);
// to use the css variable style in root css inside the js file.

// the two players O AND X
const O_TEXT = "O";
const X_TEXT = "X";

let currentPlayer = X_TEXT; // playing first.
let spaces = Array(9).fill(null); // to fill the empty divs/ arrays with null in the console.

// start game function.
const startGame = () => {
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
};

function boxClicked(e) {
  const id = e.target.id; // target the id of the div box clicked.

  if (!spaces[id]) {
    // if spaces is null or spaces which is the a box has been targetted yet
    spaces[id] = currentPlayer; // current player can be here
    e.target.innerText = currentPlayer; // inside the space should be filled with current player value.

    if (playerHasWon() !== false) {
      playerText.innerHTML = `${currentPlayer} has won!`;
      let winning_blocks = playerHasWon();

      winning_blocks.map(
        (box) => (boxes[box].style.backgroundColor = winnerIndicator)
      );
    }

    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT; // ternary for if current player = X text then render O text else render X and assign to current player
  }
}

//  first we need to define the winning combinations
// // lets make an array of the various combination of the indeces or divs that makes one win.
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// player has won function
function playerHasWon() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition; // array destructured

    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
      // Check if the event listeners should be removed
      if (!gameIsOver) {
        // Set gameIsOver to true to prevent further moves
        gameIsOver = true;

        // Remove the click event listener from all boxes
        boxes.forEach((box) => box.removeEventListener("click", boxClicked));
      }
      return [a, b, c];
    }
  }

  return false;
}

// restartbtn event listenr
restartBtn.addEventListener("click", restart);

let gameIsOver = false;
// restart function
function restart() {
  spaces.fill(null);

  boxes.forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = "";
  });

  playerText.innerHTML = "Tic Tac Toe"; // playerText reset to original

  currentPlayer = X_TEXT; // after a player has won the player will be set to original when restart button is clicked.

  // Reset the gameIsOver variable
  gameIsOver = false;

  // Re-add event listeners
  startGame();
}

startGame();
