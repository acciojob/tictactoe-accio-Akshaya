const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");
const submitBtn = document.getElementById("submit");
const playerForm = document.getElementById("player-form");
const gameBoard = document.getElementById("game-board");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let currentPlayer = "X";
let player1 = "";
let player2 = "";
let gameActive = true;

submitBtn.addEventListener("click",()=>{
	player1 = player1Input.value.trim();
	player2 = player2Input.value.trim();

	if(player1 && player2){
		playerForm.classList.add("hidden");
		gameBoard.classList.remove("hidden");
		updateMessage();
	}else{
		alert("Please enter names for both players.")
	}
});

cells.forEach(cell => {
	cell.addEventListener("click", ()=>{
		if(!gameActive || cell.textContent !=="")return;

		cell.textContent = currentPlayer;

    if (checkWinner()) {
      const winnerName = currentPlayer === "X" ? player1 : player2;
      messageDiv.textContent = `${winnerName}, congratulations you won!`;
      gameActive = false;
      return;
    }

	currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateMessage();
  });
});

function updateMessage() {
  const name = currentPlayer === "X" ? player1 : player2;
  messageDiv.textContent = `${name}, you're up`;
}

function checkWinner() {
  const winCombos = [
    [1,2,3], [4,5,6], [7,8,9],
    [1,4,7], [2,5,8], [3,6,9],
    [1,5,9], [3,5,7]
  ];

  return winCombos.some(combo => {
    const [a, b, c] = combo;
    const cellA = document.getElementById(String(a)).textContent;
    const cellB = document.getElementById(String(b)).textContent;
    const cellC = document.getElementById(String(c)).textContent;
    return cellA && cellA === cellB && cellA === cellC;
  });
}
	})
})