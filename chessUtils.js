// chessUtils.js
export const initialBoard = [
  ["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"],
  ["bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP"],
  ["--", "--", "--", "--", "--", "--", "--", "--"],
  ["--", "--", "--", "--", "--", "--", "--", "--"],
  ["--", "--", "--", "--", "--", "--", "--", "--"],
  ["--", "--", "--", "--", "--", "--", "--", "--"],
  ["wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP"],
  ["wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"],
];

const pieceMovements = {
  P: [
    [-1, 0],
    [-2, 0],
    [-1, -1],
    [-1, 1],
  ],
  R: [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ],
  N: [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ],
  B: [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ],
  Q: [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ],
  K: [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ],
};

export const isValidMove = (board, start, end, player) => {
  const [startRow, startCol] = start;
  const [endRow, endCol] = end;
  const piece = board[startRow][startCol];

  if (piece[0] !== player) return false;

  const pieceType = piece[1];
  const movement = pieceMovements[pieceType];

  if (!movement) return false;

  const rowDiff = endRow - startRow;
  const colDiff = endCol - startCol;

  // Special case for pawns
  if (pieceType === "P") {
    if (player === "w") {
      if (rowDiff === -1 && colDiff === 0 && board[endRow][endCol] === "--")
        return true;
      if (
        rowDiff === -2 &&
        colDiff === 0 &&
        startRow === 6 &&
        board[endRow][endCol] === "--" &&
        board[endRow + 1][endCol] === "--"
      )
        return true;
      if (
        rowDiff === -1 &&
        Math.abs(colDiff) === 1 &&
        board[endRow][endCol][0] === "b"
      )
        return true;
    } else {
      if (rowDiff === 1 && colDiff === 0 && board[endRow][endCol] === "--")
        return true;
      if (
        rowDiff === 2 &&
        colDiff === 0 &&
        startRow === 1 &&
        board[endRow][endCol] === "--" &&
        board[endRow - 1][endCol] === "--"
      )
        return true;
      if (
        rowDiff === 1 &&
        Math.abs(colDiff) === 1 &&
        board[endRow][endCol][0] === "w"
      )
        return true;
    }
    return false;
  }

  // Check if the move is in the list of possible movements
  for (const [moveRow, moveCol] of movement) {
    if (rowDiff === moveRow && colDiff === moveCol) {
      // Check if the destination is empty or contains an enemy piece
      if (
        board[endRow][endCol] === "--" ||
        board[endRow][endCol][0] !== player
      ) {
        // For sliding pieces (Rook, Bishop, Queen), check if the path is clear
        if (["R", "B", "Q"].includes(pieceType)) {
          const rowStep = Math.sign(rowDiff);
          const colStep = Math.sign(colDiff);
          let currentRow = startRow + rowStep;
          let currentCol = startCol + colStep;
          while (currentRow !== endRow || currentCol !== endCol) {
            if (board[currentRow][currentCol] !== "--") return false;
            currentRow += rowStep;
            currentCol += colStep;
          }
        }
        return true;
      }
    }
  }

  return false;
};

export const makeMove = (board, start, end, player) => {
  const newBoard = board.map((row) => [...row]);
  const [startRow, startCol] = start;
  const [endRow, endCol] = end;
  const piece = newBoard[startRow][startCol];

  // Handle pawn promotion
  if (piece[1] === "P" && (endRow === 0 || endRow === 7)) {
    newBoard[endRow][endCol] = `${piece[0]}Q`;
  } else {
    newBoard[endRow][endCol] = piece;
  }

  newBoard[startRow][startCol] = "--";

  // Handle castling
  if (piece[1] === "K" && Math.abs(startCol - endCol) === 2) {
    if (endCol > startCol) {
      newBoard[startRow][endCol - 1] = `${player}R`;
      newBoard[startRow][7] = "--";
    } else {
      newBoard[startRow][endCol + 1] = `${player}R`;
      newBoard[startRow][0] = "--";
    }
  }

  // Handle en passant
  if (
    piece[1] === "P" &&
    Math.abs(startCol - endCol) === 1 &&
    Math.abs(startRow - endRow) === 1 &&
    board[endRow][endCol] === "--"
  ) {
    const captureRow = player === "w" ? endRow + 1 : endRow - 1;
    newBoard[captureRow][endCol] = "--";
  }

  return newBoard;
};

export const isInCheck = (board, player) => {
  // Find the king's position
  let kingPosition;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i][j] === `${player}K`) {
        kingPosition = [i, j];
        break;
      }
    }
    if (kingPosition) break;
  }

  // Check if any opponent's piece can attack the king
  const opponentPlayer = player === "w" ? "b" : "w";
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i][j][0] === opponentPlayer) {
        if (isValidMove(board, [i, j], kingPosition, opponentPlayer)) {
          return true;
        }
      }
    }
  }

  return false;
};

export const isCheckmateOrStalemate = (board, player) => {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i][j][0] === player) {
        const moves = generateValidMoves(board, player, [i, j]);
        for (const move of moves) {
          const newBoard = makeMove(board, [i, j], move.end, player);
          if (!isInCheck(newBoard, player)) {
            return false;
          }
        }
      }
    }
  }
  return true;
};

export const getCastlingRights = (board, player) => {
  let kingRook = null;
  let queenRook = null;

  for (let i = 0; i < 8; i++) {
    if (board[player === "w" ? 7 : 0][i] === `${player}R`) {
      if (i === 7) {
        kingRook = [player === "w" ? 7 : 0, 7];
      } else if (i === 0) {
        queenRook = [player === "w" ? 7 : 0, 0];
      }
    }
  }

  return { kingRook, queenRook };
};

export const canCastle = (board, player, side) => {
  const { kingRook, queenRook } = getCastlingRights(board, player);
  const kingPosition = [player === "w" ? 7 : 0, 4];

  if (side === "king") {
    if (
      !kingRook ||
      board[kingPosition[0]][5] !== "--" ||
      board[kingPosition[0]][6] !== "--" ||
      isInCheck(board, player) ||
      isInCheck(board, player, [kingPosition[0], 5]) ||
      isInCheck(board, player, [kingPosition[0], 6])
    ) {
      return false;
    }
    return true;
  } else {
    if (
      !queenRook ||
      board[kingPosition[0]][1] !== "--" ||
      board[kingPosition[0]][2] !== "--" ||
      board[kingPosition[0]][3] !== "--" ||
      isInCheck(board, player) ||
      isInCheck(board, player, [kingPosition[0], 2]) ||
      isInCheck(board, player, [kingPosition[0], 3])
    ) {
      return false;
    }
    return true;
  }
};

export const isEnPassantPossible = (board, player, start, end) => {
  const [startRow, startCol] = start;
  const [endRow, endCol] = end;

  if (
    board[startRow][startCol][1] === "P" &&
    Math.abs(startRow - endRow) === 1 &&
    Math.abs(startCol - endCol) === 1
  ) {
    const captureRow = player === "w" ? endRow + 1 : endRow - 1;
    if (
      board[endRow][endCol] === "--" &&
      board[captureRow][endCol] === `${player === "w" ? "b" : "w"}P`
    ) {
      return true;
    }
  }

  return false;
};

export const generateValidMoves = (board, player, position) => {
  const [row, col] = position;
  const piece = board[row][col];
  const pieceType = piece[1];
  const moves = [];

  if (pieceType === "P") {
    const directions =
      player === "w"
        ? [
            [-1, 0],
            [-1, -1],
            [-1, 1],
          ]
        : [
            [1, 0],
            [1, -1],
            [1, 1],
          ];
    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;
      if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        if (isValidMove(board, position, [newRow, newCol], player)) {
          moves.push({ start: position, end: [newRow, newCol] });
        }
      }
    }
  } else {
    for (const [dr, dc] of pieceMovements[pieceType]) {
      const newRow = row + dr;
      const newCol = col + dc;
      if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        if (isValidMove(board, position, [newRow, newCol], player)) {
          moves.push({ start: position, end: [newRow, newCol] });
        }
      }
    }
  }

  return moves;
};
export const evaluateBoard = (board) => {
  let score = 0;
  const pieceValues = {
    P: 1,
    N: 3,
    B: 3,
    R: 5,
    Q: 9,
    K: 0, // King has no value, but losing it ends the game
  };

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j];
      if (piece !== "--") {
        const value = pieceValues[piece[1]];
        score += piece[0] === "w" ? value : -value;
      }
    }
  }

  return score;
};
