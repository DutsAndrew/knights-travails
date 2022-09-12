import { findCoordinates } from './dom';
import { displayKnightsTour } from './dom';

export {
  knightsTravails,
}

function knightsTravails() {
  const coordinates = findCoordinates();

  // algorithm for finding the shortest path for knight to reach selected chess board location
  const board = Board;
  board.initializeBoard(coordinates[0], coordinates[1]);
  const path = board.createPath();
  displayKnightsTour(path);
}

const Board = {
  currentX: null,
  currentY: null,
  desiredX: null,
  desiredY: null,
  possibleX: [2, 1, -1, -2, -2, -1, 1, 2],
  possibleY: [1, 2, 2, 1, -1, -2, -2, -1],
  board: {},
  moves: [],
  prev: [...Array(8)].map(() => Array(8).fill(0)),
  generate() {
    return [...Array(8)].map(() => Array(8).fill(''));
  },
  initializeBoard(start, end) {
    this.currentX = start[0];
    this.currentY = start[1];
    this.desiredX = end[0];
    this.desiredY = end[1];
    this.moves = [];
    this.moves.push([this.currentX, this.currentY]);
    this.board[JSON.stringify([this.currentX, this.currentY])] = 1;
  },
  calculateMoves(x, y, potentialMoves = []) {
    for (let i = 0; i < 8; i++) {
      const newX = x + this.possibleX[i];
      const newY = y + this.possibleY[i];
      if (newX >= 0 && newX <= 7 && newY >= 0 && newY <= 8) {
        potentialMoves.push([newX, newY]);
      }
    }
    return potentialMoves;
  },
  createPath(queue = this.moves) {
    if (this.desiredX === null || this.currentX === null) return;

    // create path from current to desired
    while (queue.length) {
      const location = queue.shift();
      if (location[0] === this.desiredX && location[1] === this.desiredY) break;
      const moves = this.calculateMoves(location[0], location[1]);
      moves.forEach(move => {
        if (this.board[JSON.stringify(move)]) return;
        queue.push(move);
        this.board[JSON.stringify(move)] = 1;
        this.prev[move[0]][move[1]] = [location[0], location[1]];
      });
    }

    // connect desired location to current (backtracking)
    let path = [];
    let current = [this.desiredX, this.desiredY];
    while (current[0] !== this.currentX || current[1] !== this.currentY) {
      path.unshift(current);
      current = this.prev[current[0]][current[1]];
    }
    path.unshift([this.currentX, this.currentY]);
    return path;
  },
};
