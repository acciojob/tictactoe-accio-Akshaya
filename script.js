const submitBtn = document.getElementById("submit");
const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const gameArea = document.querySelector(".game-area");
const inputArea = document.querySelector(".input-area");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "x";
let board = Array(9).fill("");
let gameOver = false;

submitBtn.addEventListener("click", () => {
  player1 = player1Input.value.trim();
  player2 = player2Input.value.trim();

  if (player1 && player2) {
    inputArea.style.display = "none";
    gameArea.style.display = "block";
    currentPlayer = player1;
    messageDiv.textContent = `${currentPlayer}, you're up`;
  }
});

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (cell.textContent === "" && !gameOver) {
      cell.textContent = currentSymbol;
      board[index] = currentSymbol;

      if (checkWinner(currentSymbol)) {
        messageDiv.textContent = `${currentPlayer} congratulations you won!`;
        gameOver = true;
        return;
      }

      togglePlayer();
    }
  });
});

function togglePlayer() {
  if (currentPlayer === player1) {
    currentPlayer = player2;
    currentSymbol = "o";
  } else {
    currentPlayer = player1;
    currentSymbol = "x";
  }
  messageDiv.textContent = `${currentPlayer}, you're up`;
}

function checkWinner(symbol) {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winPatterns.some(pattern =>
    pattern.every(index => board[index] === symbol)
  );
}
