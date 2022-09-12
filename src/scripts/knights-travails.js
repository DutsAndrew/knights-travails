import { findCoordinates } from './dom';

export {
  knightsTravails,
}

function knightsTravails() {
  const coordinates = findCoordinates();

  // algorithm for finding the shortest path for knight to reach selected chess board location
  const board = Board;
  board.initializeBoard(coordinates[0], coordinates[1]);
  const path = board.createPath();
  console.log(board, path);
}

// const Board = {
//   currentLocation: null,
//   desiredLocation: null,
//   visitedCells: [],
//   board: {},
//   moves: [],
//   knightMoveSet: [[1,2], [1,-2], [2,1], [2,-1], [-1,2], [-1,-2],[-2,1], [-2,-1]],
//   que: [],
//   previous: [...Array(8)].map(() => Array(8).fill(0)),
//   generate() {
//     return [...Array(8)].map(() => Array(8).fill(''));
//   },
//   initializeBoard(currentCoordinates, desiredCoordinates) {
//     this.currentLocation = currentCoordinates;
//     this.desiredLocation = desiredCoordinates;
//     this.moves.push(this.currentLocation);
//     this.board[JSON.stringify([this.currentLocation])] = 1;
//   },
//   calculatePotentialMoves(coordinates, potentialMoves = []) {
//     if (potentialMoves.length > 0) potentialMoves = [];
//     for (let i = 0; i < 8; i++) {
//       const newX = coordinates[0] + this.knightMoveSet[i][0];
//       const newY = coordinates[1] + this.knightMoveSet[i][1];
//       if (newX >= 1 && newX <= 8 && newY >= 1 && newY <= 8) {
//         potentialMoves.push([newX, newY]);
//       }
//     }
//     return potentialMoves;
//   },
//   createPath() {
//     this.que.push(this.currentLocation);

//     // find desired location
//     while (this.que.length > 0) {
//       const location = this.que.shift();
//       if (location === this.desiredLocation) break;
//       const moves = this.calculatePotentialMoves(location);
//         moves.forEach(move => {
//           if (this.board[JSON.stringify(move)]) return;
//           this.que.push(move);
//           this.board[JSON.stringify(move)] = 1;
//           this.previous[move] = [location];
//         });
//     }
  
//     // connect desired location to start location
//     let path = [];
//     let current = this.desiredLocation;
//     while (current !== this.currentLocation) {
//       path.unshift(current);
//       current = this.previous[current];
//     }
//     path.unshift(this.currentLocation);

//     return path;
//   },
//   setPredecessor(newPred) {
//     this.predecessor = this.predecessor || newPred;
//   }
// }

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
      let newX = x + this.possibleX[i];
      let newY = y + this.possibleY[i];
      if (newX >= 0 && newX <= 7 && newY >= 0 && newY <= 7) {
        potentialMoves.push([newX, newY]);
      }
    }
    return potentialMoves;
  },
  createPath(queue = this.moves) {
    if (this.desiredX === null || this.currentX === null) return;
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
    let path = [];
    let current = [this.desiredX, this.desiredY];
    while (
      current[0] !== this.currentX ||
      current[1] !== this.currentY
    ) {
      path.unshift(current);
      current = this.prev[current[0]][current[1]];
    }
    path.unshift([this.currentX, this.currentY]);
    return path;
  },
};
