const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
const popup = document.getElementById('popup');
const winnerMessage = document.getElementById('winner-message');

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function checkWinner() {
  let winner = null;
  winningCombos.forEach((combo) => {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = board[a];
    }
  });
  return winner;
}

function checkDraw() {
  return board.every(cell => cell);
}

function handleClick(event) {
  const index = event.target.getAttribute('data-index');
  if (board[index] || checkWinner()) return;

  board[index] = currentPlayer;
  event.target.innerText = currentPlayer;

  const winner = checkWinner();
  if (winner) {
    showPopup(`${winner} Wins!`);
  } else if (checkDraw()) {
    showPopup('Draw!');
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function showPopup(message) {
  winnerMessage.innerText = message;
  popup.classList.add('show');
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => {
    cell.innerText = '';
  });
  currentPlayer = 'X';
  popup.classList.remove('show');
}

cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});
