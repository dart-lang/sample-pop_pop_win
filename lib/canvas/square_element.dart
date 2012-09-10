class SquareElement extends PElement {
  static const int _size = 80;
  static const List<String> _numberMap = const["game_board_center",
                                               "number_one", "number_two",
                                               "number_three", "number_four",
                                               "number_five", "number_six",
                                               "number_seven", "number_eight"];

  final int x, y;

  SquareElement(this.x, this.y) : super(_size, _size) {
    ClickManager.setClickable(this, true);
  }

  void drawOverride(CanvasRenderingContext2D ctx) {
    var textureName;
    switch(_squareState) {
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
      ctx.strokeStyle = 'rgb(153, 153, 153)';
      ctx.strokeRect(0.5, 0.5, width, height, 1);
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
    switch(_squareState) {
      case SquareState.safe:
        return 'green';
      default:
        throw 'not supported - $_squareState';
    }
  }
}
