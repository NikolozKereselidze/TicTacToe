import { useState } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState<string[]>(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState<string>("x");
  const [winner, setWinner] = useState<string | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [turn, setTurn] = useState<number>(0);
  const [xScore, setXScore] = useState<number>(0);
  const [drawScore, setDrawScore] = useState<number>(0);
  const [yScore, setYScore] = useState<number>(0);
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Row
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Column
    [0, 4, 8],
    [2, 4, 6], // Diagonal
  ];

  const checkWinner = (board: string[]) => {
    for (const [a, b, c] of winningCombinations) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinningLine([a, b, c]);
        return board[a];
      }
    }
  };

  const handleClick = (index: number) => {
    if (board[index] === "" && !winner) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);

      const result = checkWinner(newBoard);

      if (result) {
        setWinner(result);
        if (result === "x") {
          setXScore((x) => x + 1);
        } else if (result === "o") {
          setYScore((y) => y + 1);
        }
      } else if (turn + 1 === board.length) {
        setWinner("draw");
        setDrawScore((draw) => draw + 1);
      } else {
        setTurn((prev) => prev + 1);
        setCurrentPlayer(currentPlayer === "x" ? "o" : "x");
      }
    }
  };

  const newGame = () => {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("x");
    setWinner(null);
    setWinningLine(null);
    setTurn(0);
  };

  return (
    <div className="wrapper">
      <div className="board">
        <div className="gameWrapper">
          <div className="resultsContainer">
            <div className="result playerX">
              <p className="player">Player X </p>
              <span className="score">{xScore}</span>
            </div>
            <div className="result draw">
              <p className="player">Draw </p>
              <span className="score">{drawScore}</span>
            </div>
            <div className="result playerO">
              <p className="player">Player O </p>
              <span className="score">{yScore}</span>
            </div>
          </div>
          <div className="gridContainer">
            {board.map((cell, index) => (
              <div
                key={`${cell}-${index}`}
                className={`cell ${
                  winningLine?.includes(index) ? "winning-cell" : ""
                } ${winner === "draw" && "draw"}`}
                onClick={() => {
                  handleClick(index);
                }}
              >
                <button
                  key={index}
                  onClick={() => {
                    handleClick(index);
                  }}
                  className={`cellButton ${
                    cell ? `cell${cell.toUpperCase()}` : ""
                  }`}
                >
                  {cell}
                </button>
              </div>
            ))}
          </div>
        </div>
        <button className="newGame" onClick={newGame}>
          New Game
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
