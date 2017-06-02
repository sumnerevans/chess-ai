let assert = require('assert');
let requirejs = require('requirejs');
requirejs.config({
  baseUrl: 'src',
  nodeRequire: require,
});

let Chess = requirejs('lib/chess');
let SumnersChessAi = requirejs('sumners-chess-ai');

let ai = new SumnersChessAi('b');

describe('SumnersChessAi', function() {
  describe('#calculateBestMove()', function() {
    it('should detect checkmate in one', function() {
      let checkmate_in_one_situations = [
        'rk6/8/8/8/8/8/6PP/7K b - - 0 1',
        'r7/8/8/8/8/4k3/8/4K3 b - - 0 1',
        '8/8/8/7q/8/3k4/8/4K3 b - - 0 1',
      ];

      for (let position of checkmate_in_one_situations) {
        let game = Chess(position);
        ai.makeMove(game);
        assert(game.in_checkmate() && game.game_over());
      }
    });

    it('should detect checkmate in two', function() {
      let checkmate_in_one_situations = [
        'rk6/8/8/8/8/8/6PP/7K b - - 0 1',
        'r7/8/8/8/8/4k3/8/4K3 b - - 0 1',
        '8/8/8/7q/8/3k4/8/4K3 b - - 0 1',
      ];

      for (let position of checkmate_in_one_situations) {
        let game = Chess(position);
        ai.makeMove(game);
        assert(game.in_checkmate() && game.game_over());
      }
    });

    it('should detect checkmate in three', function() {
      let checkmate_in_three_situations = [
        'rk6/8/8/8/8/8/6PP/7K b - - 0 1',
        'r7/8/8/8/8/4k3/8/4K3 b - - 0 1',
        '8/8/8/7q/8/3k4/8/4K3 b - - 0 1',
      ];

      for (let position of checkmate_in_three_situations) {
        let game = Chess(position);
        ai.makeMove(game);
        assert(game.in_checkmate() && game.game_over());
      }
    });

  });
});
