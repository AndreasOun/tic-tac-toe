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
      // Check rows
      for (let i = 0; i <= 6; i += 3) {
        if (board[i] === player && board[i + 1] === player && board[i + 2] === player) {
          return true;
        }
      }
    
      // Check columns
      for (let i = 0; i <= 2; i++) {
        if (board[i] === player && board[i + 3] === player && board[i + 6] === player) {
          return true;
        }
      }
    
      // Check diagonals
      if (board[0] === player && board[4] === player && board[8] === player) {
        return true;
      }
      if (board[2] === player && board[4] === player && board[6] === player) {
        return true;
      }
    
      return false;
    };
    
    const checkTie = (board) => {
      return !board.includes('');
    };
  
    const resetButton = document.querySelector('.reset');
    resetButton.addEventListener('click', () => {
      gameBoard.reset();
      render();
    });
  
    const cells = document.querySelectorAll('.cell');
  
    const makeMoveHandler = (index) => {
      if (gameBoard.makeMove(index)) {
        render();
      }
    };
  
    cells.forEach((cell, index) => {
      cell.addEventListener('click', () => makeMoveHandler(index));
    });
  
    const render = () => {
  const board = gameBoard.getBoard();
  const currentPlayer = gameBoard.getCurrentPlayer();
  const currentPlayerDisplay = document.querySelector('.current-player');

  cells.forEach((cell, index) => {
    cell.textContent = board[index];
    cell.removeEventListener('click', makeMoveHandler);
    if (board[index] === '') {
      const makeMoveHandler = () => {
        if (gameBoard.makeMove(index)) {
          render();
        }
      };
      cell.addEventListener('click', makeMoveHandler);
    }
  });

  if (currentPlayerDisplay) {
    currentPlayerDisplay.textContent = `Current player: ${currentPlayer}`;
  }

  if (checkWin(board, currentPlayer)) {
    console.log(`${currentPlayer} wins!`);
  } else if (checkTie(board)) {
    console.log('Tie game!');
  }
};
  
    return { render };
  })();

const checkWin = (board, player) => {
    // Check rows
    for (let i = 0; i <= 6; i += 3) {
      if (board[i] === player && board[i + 1] === player && board[i + 2] === player) {
        return true;
      }
    }
  
    // Check columns
    for (let i = 0; i <= 2; i++) {
      if (board[i] === player && board[i + 3] === player && board[i + 6] === player) {
        return true;
      }
    }
  
    // Check diagonals
    if (board[0] === player && board[4] === player && board[8] === player) {
      return true;
    }
    if (board[2] === player && board[4] === player && board[6] === player) {
      return true;
    }
  
    return false;
  };
  
  const checkTie = (board) => {
    return !board.includes('');
  };