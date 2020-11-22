import { useState } from 'react';

export default function useBoard() {
  const [board, setBoard] = useState(Array(19).fill(Array(19).fill(null)));
  const [piece, setPiece] = useState('black');
  const [winner, setWinner] = useState();

  const countStepToWin = (
    newBoard,
    positionX,
    positionY,
    directionX,
    directionY
  ) => {
    const currentPosition = newBoard[positionX][positionY];
    let tempX = positionX;
    let tempY = positionY;
    let stepToWin = 0;

    while (stepToWin < 5) {
      tempX += directionX;
      tempY += directionY;

      if (tempX < 0 || tempX > 18 || tempY < 0 || tempY > 18) {
        break;
      }

      if (newBoard[tempX][tempY] === currentPosition) {
        stepToWin += 1;
      } else {
        break;
      }
    }
    return stepToWin;
  };

  const checkWinner = (newBoard, x, y) => {
    if (
      countStepToWin(newBoard, x, y, 1, 0) +
        countStepToWin(newBoard, x, y, -1, 0) >=
        4 ||
      countStepToWin(newBoard, x, y, 0, 1) +
        countStepToWin(newBoard, x, y, 0, -1) >=
        4 ||
      countStepToWin(newBoard, x, y, 1, 1) +
        countStepToWin(newBoard, x, y, -1, -1) >=
        4 ||
      countStepToWin(newBoard, x, y, 1, -1) +
        countStepToWin(newBoard, x, y, -1, 1) >=
        4
    ) {
      setWinner(newBoard[x][y]);
    }
  };

  const handleGameClick = (x, y, piece) => () => {
    const newBoard = JSON.parse(JSON.stringify(board)); // deep copy
    if (board[x][y] === null && !winner) {
      newBoard[x][y] = piece;
    } else {
      return;
    }
    setBoard(newBoard);
    setPiece(piece === 'black' ? 'white' : 'black');
    checkWinner(newBoard, x, y);
  };

  const handleRestart = () => {
    setBoard(Array(19).fill(Array(19).fill(null)));
    setPiece('black');
    setWinner();
  };

  return {
    board,
    piece,
    winner,
    handleGameClick,
    handleRestart,
  };
}
