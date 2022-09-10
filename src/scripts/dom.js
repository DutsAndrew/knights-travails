import { doc } from "prettier";
import { knightsTravails } from './knights-travails';

export {
  knightsTravailsController,
  findCoordinates
}

function knightsTravailsController() {
  buildDOM();
  _placeKnight();
}

function buildDOM() {
  const body = document.querySelector('body');

  const gameBoardTitle = document.createElement('title');
    gameBoardTitle.setAttribute('id', 'game-board-title');
    gameBoardTitle.textContent = 'Knights Travails';

  const gameBoardText = document.createElement('header');
    gameBoardText.setAttribute('id', 'game-board-text');
    gameBoardText.textContent = 'Click any chess location below and the shortest possible path will be calculated and displayed below:';

  const locationContainer = document.createElement('div');
    locationContainer.setAttribute('id', 'location-container');

    const currentLocation = document.createElement('caption');
      currentLocation.setAttribute('id', 'current-location');
      currentLocation.textContent = 'Current Location: [5, 4]';

    const desiredLocation = document.createElement('caption');
      desiredLocation.setAttribute('id', 'desired-location');
      desiredLocation.textContent = 'Desired Location:';

    locationContainer.appendChild(currentLocation);
    locationContainer.appendChild(desiredLocation);

  const gameBoard = document.createElement('div');
    gameBoard.setAttribute('id', 'game-board');

  _buildChessCells(gameBoard);

  function _buildChessCells(gameBoard) {
    for (let row = 0; row < 8; row++) {
      let chessRow = document.createElement('div');
        chessRow.setAttribute('id', `row-${row + 1}`)
        chessRow.classList.add('chess-row');
      
      for (let cell = 0; cell < 8; cell++) {
        let chessCell = document.createElement('div');
          chessCell.setAttribute('id', `cell-[${row + 1},${cell + 1}]`);
          chessCell.classList.add('chess-cell');
          chessCell.addEventListener('click', (e) =>  {
            displaySelected(e);
            displayDesiredLocation();
            knightsTravails(e)
          });

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

  const outputBox = document.createElement('caption');
    outputBox.setAttribute('id', 'output-box');
    outputBox.textContent = 'Moves needed to get to selected square:';

  body.appendChild(gameBoardTitle);
  body.appendChild(gameBoardText);
  body.appendChild(locationContainer);
  body.appendChild(gameBoard);
  body.appendChild(outputBox);
}

function _placeKnight() {
  const knight = document.getElementById('cell-[5,4]');
  knight.classList.add('knight-current');
}

function displaySelected(e) {
  if (document.querySelector('.selected-cell')) {
    const currentActive = document.querySelector('.selected-cell');
    currentActive.classList.remove('selected-cell');
  }
  const selectedCell = e.composedPath()[0];
  selectedCell.classList.add('selected-cell');
}

function displayDesiredLocation() {
  const currentActive = document.querySelector('.selected-cell');
  const firstCoordinate = currentActive.id.slice(6, 7);
  const secondCoordinate = currentActive.id.slice(-2, -1);
  const desiredCoordinates = `[${firstCoordinate}, ${secondCoordinate}]`;

  const desiredLocationContainer = document.querySelector('#desired-location');
  desiredLocationContainer.textContent = '';
  desiredLocationContainer.textContent = `Desired Location: ${desiredCoordinates}`;
}

function findCoordinates() {
  const knightCurrent = document.querySelector('#current-location');
  const currentCoordinates = JSON.parse(knightCurrent.textContent.slice(-6));

  const knightDesired = document.querySelector('#desired-location');
  const desiredCoordinates = JSON.parse(knightDesired.textContent.slice(-6));
  return [currentCoordinates, desiredCoordinates];
}