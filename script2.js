const X_CLASS = 'x';
const O_CLASS = 'o';
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('game-board');
const winningMessageElement = document.getElementById('winning-message');
const restartButton = document.getElementById('restart-button');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const body = document.body;
let circleTurn;

body.onclick = startGame;

// function startGame() {
//   circleTurn = false;
//   cellElements.forEach(cell => {
//     cell.addEventListener('click', handleClick, { once: true });
//   });
//   setBoardHoverClass();
// }

function startGame() {
    circleTurn = false;
    cellElements.forEach((cell, i) => {
      let marker = ['X', 'O'];
      let markerIndex = 0;
      cell.addEventListener('click', () => {
        cell.innerText = marker[markerIndex];
        markerIndex = (markerIndex + 1) % marker.length;
      }, {once: true})
    });
}
  

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.innerText = currentClass;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);
  if (circleTurn) {
    board.classList.add(O_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function isDraw() {
    return [...cellElements].every(cell => {
      return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function endGame(draw) {
    if (draw) {
      winningMessageTextElement.innerText = 'Draw!';
    } else {
      winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
    }
    winningMessageElement.classList.add('show');
}