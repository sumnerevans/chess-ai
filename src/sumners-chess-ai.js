define(['lib/js-utils/Array', 'lib/chess', 'ai/position'],
  (array, Chess, Position) => class SumnersChessAi {
    constructor(colour) {
      this._depth = 3;
      this._colour = colour;
    }

    makeMove(game) {
      let move = this.calculateBestMove(game, this._depth, false);
      game.ugly_move(move);
      console.log(
        `Evaluated ${Position.getPositionsEvaluated()} positions.`);
      Position.resetPositionsEvaluated();
    }

    calculateBestMove(game, depth, calculatingOpponent) {
      let moves = game.ugly_moves();
      if (moves.length <= 0) {
        return 0;
      }

      // Maximize the position for whoever we are evaluating for.
      let minMax = null;
      if (this._colour === Chess.WHITE) {
        minMax = calculatingOpponent ? 'min' : 'max';
      } else {
        minMax = calculatingOpponent ? 'max' : 'min';
      }

      let [move, movePositionValue] = moves[minMax](move => {
        game.ugly_move(move);
        let positionValue = 0;

        if (game.in_checkmate()) {
          // This seems backwards, but if it's white't turn and they are in
          // checkmate, it's bad.
          positionValue = game.turn() === 'w' ? -1000 : 1000;
          game.undo();
          return [false, positionValue];
        } else if (game.in_draw()) {
          // TODO: make smarter
          positionValue = 0;
        } else {
          if (depth <= 1) {
            positionValue = Position.evaluate(game);
          } else {
            positionValue = this.calculateBestMove(game,
              depth - 1, !calculatingOpponent)[1];
          }
        }

        game.undo();
        return positionValue;
      });

      return [move, movePositionValue];
    }

    doCalculateBestMove(game, depth, alpha, beta, calculatingOpponent) {
      let moves = game.ugly_moves();
      if (moves.length <= 0) {
        return 0;
      }

      // Maximize the position for whoever we are evaluating for.
      let minMax = null;
      if (this._colour === Chess.WHITE) {
        minMax = calculatingOpponent ? 'min' : 'max';
      } else {
        minMax = calculatingOpponent ? 'max' : 'min';
      }

      let [move, movePositionValue] = moves[minMax](move => {
        game.ugly_move(move);
        let positionValue = 0;

        if (game.in_checkmate()) {
          // This seems backwards, but if it's white't turn and they are in
          // checkmate, it's bad.
          positionValue = game.turn() === 'w' ? -1000 : 1000;
          game.undo();
          return [false, positionValue];
        } else if (game.in_draw()) {
          // TODO: make smarter
          positionValue = 0;
        } else {
          if (depth <= 1) {
            positionValue = Position.evaluate(game);
          } else {
            positionValue = this.calculateBestMove(game,
              depth - 1, !calculatingOpponent)[1];
          }
        }

        game.undo();
        return positionValue;
      });

      return [move, movePositionValue];
    }

  }
);
