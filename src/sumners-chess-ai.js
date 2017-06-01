define(['lib/js-utils/Array'], () => class SumnersChessAi {
  constructor(colour) {
    this._pieceValues = {
      'p': 1,
      'n': 3,
      'b': 3,
      'r': 5,
      'q': 9,
      'k': 1,
    };

    this._gamePhases = ['opening', 'midlegame', 'endgame'];
    this._gamePhase = 0;
    this._depth = 1;
    this._colour = colour;
  }

  makeMove(game) {
    game.ugly_move(this.calculateBestMove(game));
  }

  calculateBestMove(game) {
    let moves = game.ugly_moves();

    let move = moves.max(m => {
      game.ugly_move(m);
      let movePositionValue = this.evaluatePosition(game);
      game.undo();

      return movePositionValue * (this._colour === 'b' ? -1 : 1);
    });

    console.log(move);

    return move;
  }

  evaluatePosition(game) {
    let positionValue = 0;

    for (let row of game.board()) {
      for (let col of row) {
        if (col !== null) {
          if (col._colour === 'w') {
            positionValue += this.getPieceValue(col.type);
          } else {
            positionValue -= this.getPieceValue(col.type);
          }
        }
      }
    }

    return positionValue;
  }

  getPieceValue(piece, rank, file) {
    return this._pieceValues[piece];
  }
});
