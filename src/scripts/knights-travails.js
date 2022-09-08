export {
  knightsTravailsController,
}

function knightsTravailsController() {
  console.log('hey');
  buildDOM();
}

function buildDOM() {
  const body = document.querySelector('body');

  const gameBoardTitle = document.createElement('title');
    gameBoardTitle.setAttribute('id', 'game-board-title');
    gameBoardTitle.textContent = 'Knights Travails';

  const gameBoardText = document.createElement('header');
    gameBoardText.setAttribute('id', 'game-board-text');
    gameBoardText.textContent = 'Click any chess location below and the shortest possible path will be calculated and displayed below:';

  const gameBoard = document.createElement('div');
    gameBoard.setAttribute('id', 'game-board');

  _buildChessCells(gameBoard);

  function _buildChessCells(gameBoard) {
    for (let row = 0; row < 8; row++) {
      let chessRow = document.createElement('div');
        chessRow.classList.add('chess-row');
      
      for (let cell = 0; cell < 8; cell++) {
        let chessCell = document.createElement('div');
          chessCell.classList.add('chess-cell');

        // procedure for marking chess board cells as black or white
        if (row % 2 === 0) {
          if (cell % 2 === 0) chessCell.classList.add('white-cell');
          if (cell % 2 !== 0) chessCell.classList.add('black-cell');
        } else if (row % 2 !== 0) {
          if (cell % 2 === 0) chessCell.classList.add('black-cell');
          if (cell % 2 !== 0) chessCell.classList.add('white-cell');
        }

        chessRow.appendChild(chessCell);
      }
      gameBoard.appendChild(chessRow);
    }
  }

  body.appendChild(gameBoardTitle);
  body.appendChild(gameBoardText);
  body.appendChild(gameBoard);
}