define([], function() {
  let positionsEvaluated = 0;
  let gamePhases = ['opening', 'midlegame', 'endgame'];
  let gamePhase = 'opening';

  let pieceValues = {
    'p': 1,
    'n': 3,
    'b': 3,
    'r': 5,
    'q': 9,
    'k': 1,
  };

  let getPieceValue = function(piece, rank, file) {
    return pieceValues[piece];
  };

  let evaluate = (game, depth) => {
    let positionValue = 0;
    positionsEvaluated++;

    if (game.in_checkmate()) {
      // This seems backwards, but if it's white's turn and they are in
      // checkmate, it's bad.
      positionValue = game.turn() === 'w' ? -9999 - depth : 9999 + depth;
    } else if (game.in_draw()) {
      // TODO: make smarter
      positionValue = 0;
    }

    for (let row of game.board()) {
      for (let col of row) {
        if (col !== null) {
          if (col.color === game.WHITE) {
            positionValue += getPieceValue(col.type);
          } else {
            positionValue -= getPieceValue(col.type);
          }
        }
      }
    }

    return positionValue;
  };

  return {
    evaluate: evaluate,
    getPositionsEvaluated: () => positionsEvaluated,
    resetPositionsEvaluated: () => {
      positionsEvaluated = 0;
    },
  };
});
