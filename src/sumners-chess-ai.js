define(['lib/js-utils/Array', 'lib/chess'],
  (array, Chess) => class SumnersChessAi {
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
      this._depth = 2;
      this._colour = colour;
    }

    makeMove(game) {
      let move = this.calculateBestMove(game, this._depth, false)[0];
      game.ugly_move(move);
    }

    calculateBestMove(game, depth, calculatingOpponent) {
      let moves = game.ugly_moves();
      if (moves.length <= 0) {
        return;
      }

      let minMax = null;
      if (this._colour === Chess.WHITE) {
        minMax = calculatingOpponent ? 'min' : 'max';
      } else {
        minMax = calculatingOpponent ? 'max' : 'min';
      }

      let [move, movePositionValue] = moves[minMax](move => {
        game.ugly_move(move);
        let movePositionValue = null;

        if (depth <= 0) {
          movePositionValue = this.evaluatePosition(game);
        } else {
          movePositionValue = this.calculateBestMove(game,
            depth - 1, !calculatingOpponent)[1] || 0;
        }

        game.undo();
        return movePositionValue;
      });

      return [move, movePositionValue];
    }

    evaluatePosition(game) {
      let positionValue = 0;

      for (let row of game.board()) {
        for (let col of row) {
          if (col !== null) {
            if (col.color === game.WHITE) {
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
  }
);
