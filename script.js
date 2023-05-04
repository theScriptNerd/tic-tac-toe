const X_CLASS = 'x';
const O_CLASS = 'o';
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('game-board');
const winningMessageElement = document.getElementById('winning-message');
const restartButton = document.getElementById('restart-button');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const body = document.body;
let circleTurn;

// startGame();

// restartButton.addEventListener('click', startGame);

body.onclick = startGame;

function startGame() {
  circleTurn = false;
  cellElements.forEach(cell => {
    // let optionIndex = 0;
    let marker = ['0','1','2']
    for (let i = 0; i < marker.length; i++){
      cellElements[i].addEventListener('click',() => {
        if (i == 0){
          cell.innerText = `X`;
          console.log('CHHH');
        } else {
          cell.innerText = `O`;
          console.log('HOLY');
        }
      }, {once: true})

      // optionIndex++;

      // if (optionIndex >= marker.length){
      //   optionIndex = 0
      // }
    }
    // cell.classList.remove(X_CLASS);
    // cell.classList.remove(O_CLASS);
    // cell.removeEventListener('click', handleClick);
    // cell.addEventListener('click', handleClick, { once: true });
  });
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
  // setBoardHoverClass();
  // winningMessageElement.classList.remove('show');
}



function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!';
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  winningMessageElement.classList.add('show');
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

function placeMark(cell, currentClass) {
  if (currentClass === X_CLASS){
    cell.classList.add('x');
  } else {
    cell.classList.add('o');
  }
  // cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
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
