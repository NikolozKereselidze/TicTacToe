import { useState } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState<string[]>(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState<string>("x");
  const [winner, setWinner] = useState<string | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [turn, setTurn] = useState<number>(0);
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
      } else {
        setTurn((prev) => prev + 1);
        setCurrentPlayer(currentPlayer === "x" ? "o" : "x");
      }
    }
    if (turn === board.length - 1) {
      setWinner("draw");
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "5px",
      }}
    >
      {board.map((cell, index) => (
        <button
          key={index}
          onClick={() => {
            handleClick(index);
          }}
          className={winningLine?.includes(index) ? "winning-cell" : ""}
        >
          {cell}
        </button>
      ))}
    </div>
  );
};

export default TicTacToe;
