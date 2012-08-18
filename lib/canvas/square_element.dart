class SquareElement extends PElement {
  final int x, y;

  SquareElement(int size, this.x, this.y) : super(size, size) {
    ClickManager.setClickable(this, true);
  }

  void drawOverride(CanvasRenderingContext2D ctx) {
    ctx.fillStyle = _fillStyle;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(153, 153, 153, 0.5)';
    ctx.strokeRect(0, 0, width, height, 1);

    if(_squareState == SquareState.revealed) {
      final adjCount = _adjacentCount;
      if(adjCount > 0) {
        ctx.font = '15px Helvetica';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.fillText(adjCount.toString(), width / 2, 20, 30);
      }
    }

  }

  String toString() => 'Square at [$x, $y]';

  SquareState get _squareState() => _game.getSquareState(x, y);

  int get _adjacentCount() => _game.field.getAdjacentCount(x, y);

  Game get _game() {
    final GameElement p = this.parent;
    return p.game;
  }

  Dynamic get _fillStyle() {
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
