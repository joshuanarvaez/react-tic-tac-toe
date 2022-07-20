import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css'

const Square = (props) => {
  return (
    <button
      className='square'
      onClick={props.onClickEvent}
    >
      {props.value}
    </button>
  );
};

const Board = () => {
  // const initialSquares = [
  //   null, null, null,
  //   null, null, null,
  //   null, null, null
  // ];  
  const initialSquares = Array(9).fill(null); //shorthand for above 

  const [squares, setSquares] = useState(initialSquares); // initial state of board
  const [xIsNext, setXIsNext] = useState(true); // state of player turns


  // update the state (6 steps) so players can take turns, game ends when it should and only one move per square
  const handleClick = (i) => {
    const newSquares = [...squares]; // 1. Make a copy of square state array
    const winnerDeclared = Boolean(calculateWinner(newSquares)); // 5. cast calculateWinner to boolean and store in variable so game ends when winner is declared
    const squareFilled = Boolean(newSquares[i]); // 6. cast newSquares to boolean and store in variable so only one move per square

    // return early if there is a winner OR if square is filled - one move per square
    if (winnerDeclared || squareFilled) {
      return;
    }

    newSquares[i] = xIsNext ? 'X' : 'O'; // 2. Update copy of array by setting whatever index is clicked to 'X '
    setSquares(newSquares); // 3. Call setSquares function with updated copy
    setXIsNext(!xIsNext); // 4. Flip the boolean to switch to next player
  }

  const renderSquare = (i) => {
    return (
      <Square
        value={squares[i]}
        onClickEvent={() => handleClick(i)}
      />
    );
  };

  const winner = calculateWinner(squares);
  const status = winner ?
    `Winner: ${winner}` : // if we have winner, display on board
    `Player turn: ${xIsNext ? 'X' : 'O'}`; // if no winner display whose turn it is - call at line 59

  return (
    <div className='board'>
      <div className='status'>{status}</div>
      <div className='board-row'>
        {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
      </div>
      <div className='board-row'>
        {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
      </div>
      <div className='board-row'>
        {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
      </div>
    </div>
  );
};

const Game = () => {
  return (
    <div className='game'>
      Tic-Tac-Toe
      <Board />
    </div>
  );
};

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], //row winner [a]
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // column winner [b]
    [0, 4, 8], [2, 4, 6] // diagonal winner [c]
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    // check if value at index a is null && check if value at index a === index b 
    // && check if value at index a is === index c
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // X or O is winner
    }
  }
  return null;
}

