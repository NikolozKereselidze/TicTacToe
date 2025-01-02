import { useState } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState<string[]>(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState<string>("x");
  const [winner, setWinner] = useState<string | null>(null);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Row
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columng
    [0, 4, 8],
    [2, 4, 6], // Diagonal
  ];

  const handleClick = (index: number) => {
    if (board[index] === "" && !winner) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === "x" ? "o" : "x");
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
        >
          {cell}
        </button>
      ))}
    </div>
  );
};

export default TicTacToe;
