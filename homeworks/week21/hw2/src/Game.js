/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */


import styled from 'styled-components';
import React from 'react';

const Game = styled.div`
  text-align: center;
  margin: 10px;
`;

const Board = styled.div`
  margin: 0 auto;
  background: grey;
  width: 570px;
  height: 570px;
`;

const BoardRow = styled.div`
  width: 100%;
  height: 30px;
  background: #cd853f;
  border: 1px solid black;
  display: flex;
`;

const BoardSquare = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid black;
`;

const Piece = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${props => props.color};
`;

const Description = styled.div`
  font-size: 20px;
`;
const Restart = styled.button`
  margin: 0px 0px 5px 20px;
  padding: 5px 10px;
  background: #ccc;
  border: 0 none;
  cursor: pointer;
  -webkit-border-radius: 5px;
  border-radius: 5px;
`;

const array = Array.from({ length: 19 });

export default function game({
  board,
  piece,
  winner,
  handleGameClick,
  handleRestart,
}) {
  return (
    <Game>
      <Description>
        {winner && `${winner} 贏了`}
        <Restart onClick={handleRestart}>重新開始</Restart>
      </Description>
      <Board>
        {array.map((_, x) => (
          <BoardRow key={x}>
            {array.map((_, y) => (
              <BoardSquare key={y} onClick={handleGameClick(x, y, piece)}>
                <Piece color={board[x][y]} />
              </BoardSquare>
            ))}
          </BoardRow>
        ))}
      </Board>
    </Game>
  );
}
