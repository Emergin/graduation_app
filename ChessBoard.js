// // // ChessBoard.js
// // import React, { useState, useEffect } from "react";
// // import {
// //   initialBoard,
// //   isValidMove,
// //   makeMove,
// //   isCheckmateOrStalemate,
// //   isInCheck,
// //   generateValidMoves,
// // } from "./chessUtils";
// // import ChessAI from "./ChessAI";
// // import "./ChessBoard.css";

// // const DIMENSION = 8;
// // const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];

// // function ChessBoard() {
// //   const [board, setBoard] = useState(initialBoard);
// //   const [selectedSquare, setSelectedSquare] = useState(null);
// //   const [player, setPlayer] = useState("w");
// //   const [gameStatus, setGameStatus] = useState("ongoing");
// //   const [validMoves, setValidMoves] = useState([]);

// //   useEffect(() => {
// //     checkGameStatus();
// //   }, [board, player]);

// //   const checkGameStatus = () => {
// //     if (isInCheck(board, player)) {
// //       if (isCheckmateOrStalemate(board, player)) {
// //         setGameStatus(`checkmate_${player === "w" ? "b" : "w"}`);
// //       } else {
// //         setGameStatus(`check_${player}`);
// //       }
// //     } else if (isCheckmateOrStalemate(board, player)) {
// //       setGameStatus("stalemate");
// //     } else {
// //       setGameStatus("ongoing");
// //     }
// //   };

// //   const handleSquareClick = (row, col) => {
// //     if (gameStatus.includes("checkmate") || gameStatus === "stalemate") return;

// //     if (selectedSquare) {
// //       const start = selectedSquare;
// //       const end = [row, col];

// //       if (isValidMove(board, start, end, player)) {
// //         const newBoard = makeMove(board, start, end);
// //         setBoard(newBoard);
// //         setSelectedSquare(null);
// //         setValidMoves([]);
// //         setPlayer(player === "w" ? "b" : "w");
// //       } else {
// //         setSelectedSquare(null);
// //         setValidMoves([]);
// //       }
// //     } else {
// //       if (board[row][col][0] === player) {
// //         setSelectedSquare([row, col]);
// //         setValidMoves(generateValidMoves(board, [row, col]));
// //       }
// //     }
// //   };

// //   const renderSquare = (row, col) => {
// //     const piece = board[row][col];
// //     const isSelected =
// //       selectedSquare && selectedSquare[0] === row && selectedSquare[1] === col;
// //     const isValidMove = validMoves.some(
// //       (move) => move[0] === row && move[1] === col
// //     );
// //     const squareColor = (row + col) % 2 === 0 ? "light" : "dark";

// //     return (
// //       <div
// //         key={`${row}-${col}`}
// //         className={`square ${squareColor} ${isSelected ? "selected" : ""} ${
// //           isValidMove ? "valid-move" : ""
// //         }`}
// //         onClick={() => handleSquareClick(row, col)}
// //       >
// //         {piece !== "--" && <img src={`/images/${piece}.png`} alt={piece} />}
// //         {row === 7 && <div className="file-label">{FILES[col]}</div>}
// //         {col === 0 && <div className="rank-label">{8 - row}</div>}
// //       </div>
// //     );
// //   };

// //   const renderBoard = () => {
// //     let squares = [];
// //     for (let r = 0; r < DIMENSION; r++) {
// //       for (let c = 0; c < DIMENSION; c++) {
// //         squares.push(renderSquare(r, c));
// //       }
// //     }
// //     return squares;
// //   };

// //   const renderStatus = () => {
// //     switch (gameStatus) {
// //       case "check_w":
// //         return "White is in check!";
// //       case "check_b":
// //         return "Black is in check!";
// //       case "checkmate_w":
// //         return "Checkmate! White wins!";
// //       case "checkmate_b":
// //         return "Checkmate! Black wins!";
// //       case "stalemate":
// //         return "Stalemate! The game is a draw.";
// //       default:
// //         return `${player === "w" ? "White" : "Black"}'s turn`;
// //     }
// //   };

// //   return (
// //     <div className="chess-container">
// //       <div className="board-wrapper">
// //         <div className="board">{renderBoard()}</div>
// //       </div>
// //       <div className="game-info">
// //         <div className="status">{renderStatus()}</div>
// //       </div>
// //       <ChessAI
// //         board={board}
// //         player={player}
// //         setBoard={setBoard}
// //         setPlayer={setPlayer}
// //       />
// //     </div>
// //   );
// // }

// // export default ChessBoard;
// // ChessBoard.js
// import React, { useState, useEffect, useCallback } from "react";
// import {
//   initialBoard,
//   isValidMove,
//   makeMove,
//   isCheckmateOrStalemate,
//   isInCheck,
//   generateValidMoves,
//   canCastle,
//   isEnPassantPossible,
// } from "./chessUtils";
// import ChessAI from "./ChessAI";
// import "./ChessBoard.css";

// const DIMENSION = 8;
// const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];

// function ChessBoard() {
//   const [board, setBoard] = useState(initialBoard);
//   const [selectedSquare, setSelectedSquare] = useState(null);
//   const [player, setPlayer] = useState("w");
//   const [gameStatus, setGameStatus] = useState("ongoing");
//   const [validMoves, setValidMoves] = useState([]);
//   const [enPassantTarget, setEnPassantTarget] = useState(null);

//   useEffect(() => {
//     checkGameStatus();
//   }, [board, player, checkGameStatus]);

//   const checkGameStatus = useCallback(() => {
//     if (isInCheck(board, player)) {
//       if (isCheckmateOrStalemate(board, player)) {
//         setGameStatus(`checkmate_${player === "w" ? "b" : "w"}`);
//       } else {
//         setGameStatus(`check_${player}`);
//       }
//     } else if (isCheckmateOrStalemate(board, player)) {
//       setGameStatus("stalemate");
//     } else {
//       setGameStatus("ongoing");
//     }
//   }, [board, player]);

//   const handleSquareClick = (row, col) => {
//     if (gameStatus.includes("checkmate") || gameStatus === "stalemate") return;

//     if (selectedSquare) {
//       const start = selectedSquare;
//       const end = [row, col];

//       if (isValidMove(board, start, end, player)) {
//         const newBoard = makeMove(board, start, end);
//         setBoard(newBoard);
//         setSelectedSquare(null);
//         setValidMoves([]);
//         setEnPassantTarget(
//           isEnPassantPossible(board, player, start, end) ? end : null
//         );
//         setPlayer(player === "w" ? "b" : "w");
//       } else {
//         setSelectedSquare(null);
//         setValidMoves([]);
//       }
//     } else {
//       if (board[row][col][0] === player) {
//         setSelectedSquare([row, col]);
//         setValidMoves(generateValidMoves(board, player, [row, col]));
//       }
//     }
//   };

//   const renderSquare = (row, col) => {
//     const piece = board[row][col];
//     const isSelected =
//       selectedSquare && selectedSquare[0] === row && selectedSquare[1] === col;
//     const isValidMove = validMoves.some(
//       (move) => move[0] === row && move[1] === col
//     );
//     const canCastleKing = canCastle(board, player, "king");
//     const canCastleQueen = canCastle(board, player, "queen");
//     const squareColor = (row + col) % 2 === 0 ? "light" : "dark";

//     return (
//       <div
//         key={`${row}-${col}`}
//         className={`square ${squareColor} ${isSelected ? "selected" : ""} ${
//           isValidMove ? "valid-move" : ""
//         }`}
//         onClick={() => handleSquareClick(row, col)}
//       >
//         {piece !== "--" && <img src={`/images/${piece}.png`} alt={piece} />}
//         {row === 7 && <div className="file-label">{FILES[col]}</div>}
//         {col === 0 && <div className="rank-label">{8 - row}</div>}
//         {isSelected && (
//           <div className="castling-info">
//             {canCastleKing && <div className="castling-option">O-O</div>}
//             {canCastleQueen && <div className="castling-option">O-O-O</div>}
//           </div>
//         )}
//       </div>
//     );
//   };

//   const renderBoard = () => {
//     let squares = [];
//     for (let r = 0; r < DIMENSION; r++) {
//       for (let c = 0; c < DIMENSION; c++) {
//         squares.push(renderSquare(r, c));
//       }
//     }
//     return squares;
//   };

//   const renderStatus = () => {
//     switch (gameStatus) {
//       case "check_w":
//         return "White is in check!";
//       case "check_b":
//         return "Black is in check!";
//       case "checkmate_w":
//         return "Checkmate! White wins!";
//       case "checkmate_b":
//         return "Checkmate! Black wins!";
//       case "stalemate":
//         return "Stalemate! The game is a draw.";
//       default:
//         return `${player === "w" ? "White" : "Black"}'s turn`;
//     }
//   };

//   return (
//     <div className="chess-container">
//       <div className="board-wrapper">
//         <div className="board">{renderBoard()}</div>
//       </div>
//       <div className="game-info">
//         <div className="status">{renderStatus()}</div>
//       </div>
//       <ChessAI
//         board={board}
//         player={player}
//         setBoard={setBoard}
//         setPlayer={setPlayer}
//         setGameStatus={setGameStatus}
//       />
//     </div>
//   );
// }

// export default ChessBoard;

import React, { useState, useEffect, useCallback } from "react";
import {
  initialBoard,
  isValidMove,
  makeMove,
  isCheckmateOrStalemate,
  isInCheck,
  generateValidMoves,
  canCastle,
  isEnPassantPossible,
} from "./chessUtils";
import ChessAI from "./ChessAI";
import "./ChessBoard.css";

const DIMENSION = 8;
const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];

function ChessBoard() {
  const [board, setBoard] = useState(initialBoard);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [player, setPlayer] = useState("w");
  const [gameStatus, setGameStatus] = useState("ongoing");
  const [validMoves, setValidMoves] = useState([]);
  const [enPassantTarget, setEnPassantTarget] = useState(null);

  // Define checkGameStatus using useCallback to memoize it
  const checkGameStatus = useCallback(() => {
    if (isInCheck(board, player)) {
      if (isCheckmateOrStalemate(board, player)) {
        setGameStatus(`checkmate_${player === "w" ? "b" : "w"}`);
      } else {
        setGameStatus(`check_${player}`);
      }
    } else if (isCheckmateOrStalemate(board, player)) {
      setGameStatus("stalemate");
    } else {
      setGameStatus("ongoing");
    }
  }, [board, player]);

  // Use the memoized checkGameStatus function in useEffect
  useEffect(() => {
    checkGameStatus();
  }, [board, player, checkGameStatus]);

  const handleSquareClick = (row, col) => {
    if (gameStatus.includes("checkmate") || gameStatus === "stalemate") return;

    if (selectedSquare) {
      const start = selectedSquare;
      const end = [row, col];

      if (isValidMove(board, start, end, player)) {
        const newBoard = makeMove(board, start, end);
        setBoard(newBoard);
        setSelectedSquare(null);
        setValidMoves([]);
        setEnPassantTarget(
          isEnPassantPossible(board, player, start, end) ? end : null
        );
        setPlayer(player === "w" ? "b" : "w");
      } else {
        setSelectedSquare(null);
        setValidMoves([]);
      }
    } else {
      if (board[row][col][0] === player) {
        setSelectedSquare([row, col]);
        setValidMoves(generateValidMoves(board, player, [row, col]));
      }
    }
  };

  const renderSquare = (row, col) => {
    const piece = board[row][col];
    const isSelected =
      selectedSquare && selectedSquare[0] === row && selectedSquare[1] === col;
    const isValidMove = validMoves.some(
      (move) => move[0] === row && move[1] === col
    );
    const canCastleKing = canCastle(board, player, "king");
    const canCastleQueen = canCastle(board, player, "queen");
    const squareColor = (row + col) % 2 === 0 ? "light" : "dark";

    return (
      <div
        key={`${row}-${col}`}
        className={`square ${squareColor} ${isSelected ? "selected" : ""} ${
          isValidMove ? "valid-move" : ""
        }`}
        onClick={() => handleSquareClick(row, col)}
      >
        {piece !== "--" && <img src={`/images/${piece}.png`} alt={piece} />}
        {row === 7 && <div className="file-label">{FILES[col]}</div>}
        {col === 0 && <div className="rank-label">{8 - row}</div>}
        {isSelected && (
          <div className="castling-info">
            {canCastleKing && <div className="castling-option">O-O</div>}
            {canCastleQueen && <div className="castling-option">O-O-O</div>}
          </div>
        )}
      </div>
    );
  };

  const renderBoard = () => {
    let squares = [];
    for (let r = 0; r < DIMENSION; r++) {
      for (let c = 0; c < DIMENSION; c++) {
        squares.push(renderSquare(r, c));
      }
    }
    return squares;
  };

  const renderStatus = () => {
    switch (gameStatus) {
      case "check_w":
        return "White is in check!";
      case "check_b":
        return "Black is in check!";
      case "checkmate_w":
        return "Checkmate! White wins!";
      case "checkmate_b":
        return "Checkmate! Black wins!";
      case "stalemate":
        return "Stalemate! The game is a draw.";
      default:
        return `${player === "w" ? "White" : "Black"}'s turn`;
    }
  };

  return (
    <div className="chess-container">
      <div className="board-wrapper">
        <div className="board">{renderBoard()}</div>
      </div>
      <div className="game-info">
        <div className="status">{renderStatus()}</div>
      </div>
      <ChessAI
        board={board}
        player={player}
        setBoard={setBoard}
        setPlayer={setPlayer}
        setGameStatus={setGameStatus}
      />
    </div>
  );
}

export default ChessBoard;
