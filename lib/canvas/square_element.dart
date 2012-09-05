class SquareElement extends PElement {
  static const int _size = 80;
  static const String _textureName = "balloon.png";
  final int x, y;

  SquareElement(this.x, this.y) : super(_size, _size) {
    ClickManager.setClickable(this, true);
  }

  void drawOverride(CanvasRenderingContext2D ctx) {
    if(_squareState == SquareState.hidden) {
      drawTextureAt(ctx, _textureName,
          const dartlib.Coordinate(_size ~/ 2, _size ~/ 2));

    } else {
      ctx.fillStyle = _fillStyle;
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = 'rgb(153, 153, 153)';
      ctx.strokeRect(0.5, 0.5, width, height, 1);
    }

    if(_squareState == SquareState.revealed) {
      final adjCount = _adjacentCount;
      if(adjCount > 0) {
        final halfSize = _size ~/ 2;
        ctx.textBaseline = 'middle';
        ctx.font = '${halfSize}px Helvetica';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.fillText(adjCount.toString(), halfSize, halfSize, _size);
      }
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
      case SquareState.flagged:
        return 'orange';
      case SquareState.revealed:
        return 'white';
      case SquareState.mine:
        return 'red';
      case SquareState.safe:
        return 'green';
      case SquareState.hidden:
        return '#6666CC';
      default:
        throw 'not supported';
    }
  }
}
