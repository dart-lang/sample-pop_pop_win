class SquareElement extends PElement {
  static const int _size = 80;
  static const List<String> _numberMap = const["game_board_center",
                                               "number_one", "number_two",
                                               "number_three", "number_four",
                                               "number_five", "number_six",
                                               "number_seven", "number_eight"];

  final int x, y;

  SquareState _lastDrawingState;

  SquareElement(this.x, this.y) : super(_size, _size, true) {
    ClickManager.setClickable(this, true);
  }

  void update() {
    if(_lastDrawingState != _squareState) {
      _lastDrawingState = _squareState;
      invalidateDraw();
    }
  }

  void drawOverride(CanvasRenderingContext2D ctx) {
    var textureName;
    switch(_lastDrawingState) {
      case SquareState.hidden:
        textureName = "balloon.png";
        break;
      case SquareState.flagged:
        textureName = 'balloon_tagged_!.png';
        break;
      case SquareState.revealed:
        final prefix = _numberMap[_adjacentCount];
        textureName = '$prefix.png';
        break;
      case SquareState.mine:
        textureName = 'balloon_tagged_bomb.png';
        break;
    }

    if(textureName == null) {
      ctx.fillStyle = _fillStyle;
      ctx.fillRect(0, 0, width, height);
    } else {
      drawTextureKeyAt(ctx, textureName);
    }
  }

  String toString() => 'Square at [$x, $y]';

  SquareState get _squareState => _game.getSquareState(x, y);

  int get _adjacentCount => _game.field.getAdjacentCount(x, y);

  Game get _game {
    final GameElement p = this.parent;
    return p.game;
  }

  Dynamic get _fillStyle {
    switch(_lastDrawingState) {
      case SquareState.safe:
        return 'green';
      default:
        throw 'not supported - $_lastDrawingState';
    }
  }
}
