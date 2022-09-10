import { findCoordinates } from './dom';

export {
  knightsTravails,
}

function knightsTravails() {
  const coordinates = findCoordinates();

  // algorithm for finding the shortest path for knight to reach selected chess board location
  const board = Board;
  board.initializeBoard(coordinates[0], coordinates[1]);
  board.calculatePotentialMoves();
  console.log(board);
}

const Board = {
  currentLocation: null,
  desiredLocation: null,
  visitedCells: [],
  steps: 0,
  moves: [],
  knightMoveSet: [[1,2], [1,-2], [2,1], [2,-1], [-1,2], [-1,-2],[-2,1], [-2,-1]],
  possibleMoves: [],
  que: [],

  initializeBoard(currentCoordinates, desiredCoordinates) {
    this.currentLocation = currentCoordinates;
    this.desiredLocation = desiredCoordinates;
    const cells = document.querySelectorAll('.chess-cell');
      cells.forEach(cell => {
        const coordinates = cell.id.slice(5);
        this.visitedCells.push(`${coordinates}-false`);
      });
    this.moves.push(this.currentLocation);
    return this.visitedCells;
  },
  calculatePotentialMoves() {
    for (let i = 0; i < 8; i++) {
      const newX = this.currentLocation[0] + this.knightMoveSet[i][0];
      const newY = this.currentLocation[1] + this.knightMoveSet[i][1];
      if (newX >= 1 && newX <= 8 && newY >= 1 && newY <= 8) {
        this.possibleMoves.push([newX, newY]);
      }
    }
    return this.possibleMoves;
  }
}