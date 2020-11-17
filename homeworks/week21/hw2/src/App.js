import React from 'react';
import useBoard from './useBoard';
import Game from './Game';
import './styles.css';

function App() {
  const { board, piece, winner, handleGameClick, handleRestart } = useBoard();
  return (
    <div className='App'>
      <Game
        handleGameClick={handleGameClick}
        winner={winner}
        piece={piece}
        board={board}
        handleRestart={handleRestart}
      />
    </div>
  );
}

export default App;
