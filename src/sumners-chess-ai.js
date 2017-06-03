define(['lib/js-utils/Array', 'lib/chess', 'ai/position'],
  (array, Chess, Position) => class SumnersChessAi {
    constructor(colour) {
      this._depth = 3;
      this._colour = colour;
    }

    makeMove(game) {
      let bestMove = this.calculateBestMove(game, this._depth, false);
      game.ugly_move(bestMove);
      console.log(
        `Evaluated ${Position.getPositionsEvaluated()} positions.`);
      Position.resetPositionsEvaluated();
    }

    calculateBestMove(game, depth, calculatingOpponent) {
      let moves = game.ugly_moves();
      if (moves.length <= 0) {
        return 0;
      }

      let minMax = 'max';
      if (this._colour === game.BLACK) {
        minMax = 'min';
      }

      return moves[minMax](move => {
        game.ugly_move(move);
        let value = this.doCalculateBestMove(
          game, depth - 1, -10000, 10000, !calculatingOpponent);
        game.undo();
        return value;
      });
    }

    doCalculateBestMove(game, depth, alpha, beta, calculatingOpponent) {
      if (depth === 0 || game.game_over()) {
        return Position.evaluate(game, depth);
      }

      let moves = game.ugly_moves();

      // Maximize the position for whoever we are evaluating for.
      let minMax;
      if (this._colour === Chess.WHITE) {
        minMax = calculatingOpponent ? 'min' : 'max';
      } else {
        minMax = calculatingOpponent ? 'max' : 'min';
      }

      let bestMove = minMax === 'max' ? -9999 : 9999;

      for (let move of moves) {
        game.ugly_move(move);

        let calculatedBestMove = this.doCalculateBestMove(game, depth - 1,
          alpha, beta, !calculatingOpponent);

        bestMove = Math[minMax](bestMove, calculatedBestMove);

        game.undo();

        if (minMax === 'max') {
          alpha = Math.max(alpha, bestMove);
          if (beta <= alpha) {
            return bestMove;
          }
        } else {
          beta = Math.min(beta, bestMove);
          if (beta <= alpha) {
            return bestMove;
          }
        }
      }

      return bestMove;
    }
  }
);
