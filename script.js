//your JS code here. If required.
const submitBtn = document.getElementById("submit");
    const player1Input = document.getElementById("player-1");
    const player2Input = document.getElementById("player-2");
    const messageDiv = document.querySelector(".message");
    const gameSection = document.getElementById("game-section");
    const inputSection = document.getElementById("input-section");
    const cells = document.querySelectorAll(".cell");

    let player1, player2;
    let currentPlayer;
    let board = Array(9).fill(null);
    let gameActive = true;

    const winningCombinations = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];

    // Start game
    submitBtn.addEventListener("click", () => {
      player1 = player1Input.value.trim();
      player2 = player2Input.value.trim();

      if (!player1 || !player2) {
        alert("Please enter names for both players");
        return;
      }

      inputSection.style.display = "none";
      gameSection.style.display = "block";

      currentPlayer = player1;
      messageDiv.textContent = `${currentPlayer}, you're up`;
    });

    // Handle cell click
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        if (!gameActive || board[index]) return;

        if (currentPlayer === player1) {
          cell.textContent = "X";
          board[index] = "X";
        } else {
          cell.textContent = "O";
          board[index] = "O";
        }

        if (checkWin()) {
          messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
          gameActive = false;
          return;
        }

        if (board.every(cell => cell)) {
          messageDiv.textContent = "It's a draw!";
          gameActive = false;
          return;
        }

        currentPlayer = (currentPlayer === player1) ? player2 : player1;
        messageDiv.textContent = `${currentPlayer}, you're up`;
      });
    });

    // Check win
    function checkWin() {
      return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
      });
    }