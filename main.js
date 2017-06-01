requirejs.config({
  'baseUrl': 'src',
  'paths': {
    'chessboardjs': 'lib/chessboardjs/js/chessboard-0.3.0.min',
    'jquery': 'lib/jquery/jquery-3.2.1.min',
  },
});

requirejs(['app']);
