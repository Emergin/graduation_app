// // ChessAI.js
// import React, { useEffect } from "react";
// import { generateValidMoves, makeMove, evaluateBoard } from "./chessUtils";

// function ChessAI({ board, player, setBoard, setPlayer }) {
//   useEffect(() => {
//     if (player === "b") {
//       const validMoves = generateValidMoves(board, player);

//       if (validMoves.length > 0) {
//         // Improved AI - evaluate moves and choose the best one
//         let bestMove = null;
//         let bestScore = -Infinity;

//         for (const move of validMoves) {
//           const newBoard = makeMove(board, move.start, move.end);
//           const score = evaluateBoard(newBoard, player);

//           if (score > bestScore) {
//             bestScore = score;
//             bestMove = move;
//           }
//         }

//         if (bestMove) {
//           const newBoard = makeMove(board, bestMove.start, bestMove.end);
//           setBoard(newBoard);
//           setPlayer("w");
//         }
//       }
//     }
//   }, [board, player, setBoard, setPlayer]);

//   return null;
// }

// export default ChessAI;

// ChessAI.js
import { useEffect } from "react";
import {
  generateValidMoves,
  makeMove,
  evaluateBoard,
  isInCheck,
  isCheckmateOrStalemate,
} from "./chessUtils";

function ChessAI({ board, player, setBoard, setPlayer, setGameStatus }) {
  useEffect(() => {
    if (player === "b") {
      const validMoves = generateValidMoves(board, player, [7, 4]);

      if (validMoves.length > 0) {
        // Improved AI - evaluate moves and choose the best one
        let bestMove = null;
        let bestScore = -Infinity;

        for (const move of validMoves) {
          const newBoard = makeMove(board, move.start, move.end);
          const score = evaluateBoard(newBoard, player);

          if (score > bestScore && !isInCheck(newBoard, player)) {
            bestScore = score;
            bestMove = move;
          }
        }

        if (bestMove) {
          const newBoard = makeMove(board, bestMove.start, bestMove.end);
          setBoard(newBoard);
          setPlayer("w");

          // Check for checkmate or stalemate
          if (isCheckmateOrStalemate(newBoard, player === "w" ? "b" : "w")) {
            setGameStatus(`checkmate_${player === "w" ? "b" : "w"}`);
          }
        }
      } else {
        // Check for stalemate
        setGameStatus("stalemate");
      }
    }
  }, [board, player, setBoard, setPlayer, setGameStatus]);

  return null;
}

export default ChessAI;
