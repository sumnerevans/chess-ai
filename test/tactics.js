let assert = require('assert');
let requirejs = require('requirejs');
requirejs.config({
  baseUrl: 'src',
  nodeRequire: require,
});

let Chess = requirejs('lib/chess');
let SumnersChessAi = requirejs('sumners-chess-ai');

let ai = new SumnersChessAi('b');
let opponentAi = new SumnersChessAi('w');

describe('SumnersChessAi', function() {
  describe('#calculateBestMove()', function() {
    // Checkmate in one
    it('1 should detect checkmate in one', function() {
      let game = Chess('rk6/8/8/8/8/8/6PP/7K b - - 0 1');
      ai.makeMove(game);
      assert(game.in_checkmate());
    });

    it('2 should detect checkmate in one', function() {
      let game = Chess(
        '1k6/p2q1p1p/4bp2/1p2p3/8/PnKPN3/2P1BPPP/1R5R b - - 0 1');
      ai.makeMove(game);
      assert(game.in_checkmate());
    });

    it('3 should detect checkmate in one', function() {
      let game = Chess('r7/8/8/8/8/4k3/8/4K3 b - - 0 1');
      ai.makeMove(game);
      assert(game.in_checkmate());
    });

    // Checkmate in two
    it('should detect checkmate in two', function() {
      let checkmate_in_two_situations = [
        '1kr1qb2/pp3pp1/7p/4pb2/2Bp4/1K3N1P/PP1N1nP1/R1B1Q2R b - - 0 1',
      ];

      for (let position of checkmate_in_two_situations) {
        let game = Chess(position);
        ai.makeMove(game);
        opponentAi.makeMove(game);
        ai.makeMove(game);
        assert(game.in_checkmate());
      }
    });

    it('should detect checkmate in three', function() {
      let checkmate_in_three_situations = [
        '3k1b1r/5b2/5pp1/2p5/ppN5/qPpP1NQ1/P1P1B1PP/KR5R b - - 0 1',
      ];

      for (let position of checkmate_in_three_situations) {
        let game = Chess(position);
        ai.makeMove(game);
        opponentAi.makeMove(game);
        ai.makeMove(game);
        opponentAi.makeMove(game);
        ai.makeMove(game);
        assert(game.in_checkmate());
      }
    });

    it('should prevent checkmate in one', function() {
      let immenent_checkmate_situations = [
        'rk6/7Q/2P5/8/8/8/6PK/8 b - - 0 1',
        'k7/7R/r7/8/8/6R1/6PK/8 b - - 0 1',
      ];

      for (let position of immenent_checkmate_situations) {
        let game = Chess(position);
        ai.makeMove(game);
        opponentAi.makeMove(game);
        assert(!game.in_checkmate());
      }
    });

    it('should prevent checkmate in two', function() {
      let immenent_checkmate_situations = [
        '5rk1/1p6/p1n1rPp1/2p5/2P1p2R/1P2P2P/PBq3P1/5RK1 b - - 0 1',
        'r2Nk2r/ppp5/3p1n2/2b1p3/2B1p1b1/3P2pP/PPPQnPP1/RN3R1K b - - 0 1',
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
