define([
    'lib/chess',
    'jquery',
    'lib/chessboard',
    'sumners-chess-ai',
  ],
  function(Chess, $, ChessBoard, SumnersChessAi) {
    let game = new Chess();
    let chessAi = new SumnersChessAi(game.BLACK);

    // Styling Squares ======================================================
    let removeGreySquares = () =>
      $('#board .square-55d63').css('background', '');

    let greySquare = (square) => {
      let squareEl = $('#board .square-' + square);

      let background = '#a9a9a9';
      if (squareEl.hasClass('black-3c85d') === true) {
        background = '#696969';
      }

      squareEl.css('background', background);
    };

    let renderMoveHistory = (moves) => {
      let historyElement = $('#move-history').empty();
      for (var i = 0; i < moves.length; i = i + 2) {
        historyElement.append('<span>' + moves[i] + ' ' + (moves[i + 1] ?
          moves[i + 1] : ' ') + '</span><br>');
      }
      historyElement.scrollTop(historyElement[0].scrollHeight);
    };

    let handleGameOver = () => {
      setTimeout(() => alert('Game Over'), 200);
    };

    let board = ChessBoard('board', {
      draggable: true,
      position: 'start',

      // Event Handlers ===================================================
      onDragStart: (source, piece) => {
        if (game.in_checkmate() || game.in_draw() ||
          piece.search(/^b/) !== -1) {
          return false;
        }
      },

      onDrop: (source, target) => {
        let move = game.move({
          from: source,
          to: target,
          promotion: 'q'
        });

        removeGreySquares();
        if (move === null) {
          return 'snapback';
        }

        if (game.game_over()) {
          handleGameOver();
          return;
        }

        renderMoveHistory(game.history());
        setTimeout(() => {
          chessAi.makeMove(game);
          board.position(game.fen());

          if (game.game_over()) {
            handleGameOver();
          }
        }, 250);
      },

      onMouseoutSquare: () => removeGreySquares(),

      onMouseoverSquare: (square) => {
        var moves = game.moves({
          square: square,
          verbose: true,
        });

        if (moves.length === 0) {
          return;
        }

        greySquare(square);

        for (var i = 0; i < moves.length; i++) {
          greySquare(moves[i].to);
        }
      },

      onSnapEnd: () => board.position(game.fen()),
    });

    $(window).resize(board.resize);
  });
