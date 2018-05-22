define(['ai/piece-value'], function(pieceValue) {
  let positionsEvaluated = 0;
  let cacheUsed = 0;
  let evaluationCache = {};

  let evaluate = (game, depth) => {
    if (evaluationCache[game.fen()]) {
      cacheUsed++;
      return evaluationCache[game.fen()];
    }

    // This should be smarter...
    let gamePhase = 'opening';
    if (game.history() > 10) {
      game.gamePhase = 'middlegame';
      if (!/Qq/.test(game.fen)) {
        game.gamePhase = 'endgame';
      }
    }

    let positionValue = 0;
    positionsEvaluated++;

    for (let [rank, row] of game.board().enumerate()) {
      for (let [file, col] of row.enumerate()) {
        if (col !== null) {
          if (col.color === game.WHITE) {
            positionValue += pieceValue.getPieceValue(col.type, rank,
              file, game.turn(), gamePhase);
          } else {
            positionValue -= pieceValue.getPieceValue(col.type, rank,
              file, game.turn(), gamePhase);
          }
        }
      }
    }

    let isWhite = game.turn() === 'w';
    if (game.in_checkmate()) {
      // This seems backwards, but if it's white's turn and they are in
      // checkmate, it's bad.
      // The position is better if checkmate will occur at a higher depth.
      positionValue = isWhite ? -9999 - depth : 9999 + depth;
    } else if (game.in_draw()) {
      // If white is loosing by more than a piece and a pawn, a draw is good.
      if (isWhite) {
        if (positionValue < -400) {
          positionValue = 9999;
        }
      } else {
        if (positionValue > 400) {
          positionValue = -9999;
        }
      }

      // Only cache the evaluation if this is not checkmate.
      evaluationCache[game.fen()] = positionValue;
    }

    return positionValue;
  };

  return {
    evaluate: evaluate,
    getPositionsEvaluated: () => positionsEvaluated,
    resetPositionsEvaluated: () => positionsEvaluated = 0,
    getCacheUsed: () => cacheUsed,
    resetCacheUsed: () => cacheUsed = 0,
  };
});
