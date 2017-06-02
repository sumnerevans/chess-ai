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
      let checkmate_in_two_situations = [
        'rk6/8/8/8/q7/8/3PPKPP/8 b - - 0 1',
      ];

      for (let position of checkmate_in_two_situations) {
        let game = Chess(position);
        ai.makeMove(game);
        for (let m of game.ugly_moves()) {
          game.ugly_move(m);
          ai.makeMove(game);
          assert(game.in_checkmate() && game.game_over());
          game.undo();
          game.undo();
        }
      }
    });

    it('should detect checkmate in three', function() {
      let checkmate_in_three_situations = [
        '3k1b1r/5b2/5pp1/2p5/ppN5/qPpP1NQ1/P1P1B1PP/KR5R b - - 0 1',
      ];

      for (let position of checkmate_in_three_situations) {
        let game = Chess(position);
        ai.makeMove(game);
        for (let m1 of game.ugly_moves()) {
          game.ugly_move(m1);
          ai.makeMove(game);
          for (let m2 of game.ugly_moves()) {
            game.ugly_move(m2);
            ai.makeMove(game);
            assert(game.in_checkmate() && game.game_over());
            game.undo();
            game.undo();
          }
          game.undo();
          game.undo();
        }
      }
    });

    it('should prevent checkmate in one', function() {
      let immenent_checkmate_situations = [
        'rk6/7Q/2P5/8/8/8/6PK/8 b - - 0 1',
        // '8/8/8/7q/8/3k4/8/4K3 b - - 0 1',
      ];

      for (let position of immenent_checkmate_situations) {
        let game = Chess(position);
        ai.makeMove(game);
        for (let m of game.ugly_moves()) {
          game.ugly_move(m);
          assert(!game.in_checkmate());
          game.undo();
        }
      }
    });
  });
});
