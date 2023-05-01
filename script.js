const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = 'X';

  const getBoard = () => board;

  const getCurrentPlayer = () => currentPlayer;

  const makeMove = (index) => {
    if (board[index] === '') {
      board[index] = currentPlayer;
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      return true;
    }
    return false;
  };

  const reset = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = 'X';
  };

  return { getBoard, getCurrentPlayer, makeMove, reset };
})();

const Player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;

  return {
    getName,
    getMarker,
  };
};

const player1 = Player("Player 1", "X");
const player2 = Player("Player 2", "O");

const gameController = (() => {
  const checkWin = (board, player) => {
    // Define all possible winning combinations
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

    // Check if any winning combination is satisfied
    for (let combo of winningCombos) {
      if (board[combo[0]] === player &&
          board[combo[1]] === player &&
          board[combo[2]] === player) {
        // Player has won
        return true;
      }
    }

    // No winner yet
    return false;
    
  };

  const checkTie = (board) => {
    return !board.includes('');
  };
  
  const winnerText = document.querySelector('#winner-text');
  const resetButton = document.querySelector('.reset');
  resetButton.addEventListener('click', () => {
    gameBoard.reset();
    render();
  });

  const cells = document.querySelectorAll('.cell');

  const makeMoveHandler = (index) => {
    if (gameBoard.makeMove(index)) {
    render();
    if (!checkWin(gameBoard.getBoard(), 'O') && !checkTie(gameBoard.getBoard())) {
    setTimeout(() => {
    let randomIndex;
    do {
    randomIndex = Math.floor(Math.random() * 9);
    } while (gameBoard.getBoard()[randomIndex] !== '');
    gameBoard.makeMove(randomIndex);
    render();
    }, 500);
    }
  }
};

  cells.forEach((cell, index) => {
    cell.addEventListener('click', () => makeMoveHandler(index));
  });

  const render = () => {
    const board = gameBoard.getBoard();
  
    cells.forEach((cell, index) => {
      cell.textContent = board[index];
    });
  
    winnerText.style.display = 'none';


    if (checkWin(board, 'X')) {
      showWinnerText(player1);
      gameBoard.reset();
      return;
    }
  
    if (checkWin(board, 'O')) {
      showWinnerText(player2);
      gameBoard.reset();
      return;
    }
  
    if (checkTie(board)) {
      showWinnerText('tie');
      gameBoard.reset();
      return;
    }
  };


  const showWinnerText = (player) => {
    const winnerText = document.getElementById('winner-text');
    const winnerName = document.getElementById('winner-name');
    const continueButton = document.getElementById('continue');
  
    if (player === 'tie') {
      winnerName.textContent = 'Tie game!';
    } else {
      winnerName.textContent = `${player.getName()} wins!`;
    }
  
    winnerText.style.display = 'block';
  
    continueButton.textContent = 'Continue';
    continueButton.addEventListener('click', () => {
      winnerText.style.display = 'none';
    });
  
    winnerText.appendChild(continueButton);
    document.body.appendChild(winnerText); // Append winnerText to the body
  };
})();