define(['lib/chess'], function() {
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

  let evaluate = (game) => {
    let positionValue = 0;
    positionsEvaluated++;

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
