import React, { useState, useEffect } from 'react';
import './tictactoe.css';

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function Square(props) {
    return (
        <button className="square" onClick={() => { props.onClick() }}>
            {props.value}
        </button>
    );
}


function Board() {

    var [squares, setSquares] = useState(Array(9).fill(null));
    var [next, setNext] = useState('X');

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + next;
    }

    function resetClick() {
        setSquares(Array(9).fill(null));
        setNext('X')
    }
    
    function handleClick(i) {
        if (squares[i] === null && !winner) {
            const newSquares = squares.slice();
            newSquares[i] = next;
            setNext(next === 'X' ? 'O' : 'X');
            setSquares(newSquares);
        }
    }

    function renderSquare(i) {
        return <Square
            value={squares[i]}
            onClick={() => handleClick(i)}
        />;
    }

    return (
        <div class="game-body">
            <div className="status">{status}</div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
            <button style={{float:"left"}} onClick={() => resetClick()}>Reset Board</button>
        </div>
    );
}

export function Game () {
    return (
        <div className="game">
            <p>This subpage was made using React's beginner tutorial. It wasn't my goal to figure out how their CSS worked, so the board will remain on the left.</p>
            <div className="game-board">
                <Board />
                <p>
                    a<br></br>a<br></br>a<br></br>a<br></br>a<br></br>a<br></br>a<br></br>a<br></br>a<br></br>a<br></br>a<br></br>a<br></br>a<br></br>a<br></br>
                    a<br></br>a<br></br>a<br></br>a<br></br>a<br></br>a<br></br>a<br></br>a<br></br>a<br></br>a<br></br>a<br></br>a<br></br>a<br></br>a<br></br>
                </p>
            </div>
            <div className="game-info">
                <div>{/* status */}</div>
                <ol>{/* TODO */}</ol>
            </div>
        </div>
    );
}

// ========================================

/*ReactDOM.render(
    
    <Game />,
    document.getElementById('root')
);*/
