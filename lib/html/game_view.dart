class GameView extends HtmlView {
  static final String _xKey = 'x';
  static final String _yKey = 'y';

  final Game game;

  GameView(this.game, DivElement node) : super(node) {
    game.updated.add(_gameUpdated);
  }

  void updateElement() {
    node.elements.clear();

    var table = new TableElement();
    table.classes.add('game-table');

    for(int r = 0; r < game.field.rows; r++) {
      TableRowElement row = table.insertRow(-1);

      for(int c = 0; c < game.field.cols; c++) {
        TableCellElement cell = row.insertCell(-1);
        cell.classes.add('game-square');
        cell.on.mouseDown.add(_cellClick);
        cell.dataAttributes[_xKey] = c.toString();
        cell.dataAttributes[_yKey] = r.toString();

        final ss = game.getSquareState(c, r);
        cell.classes.add(ss.name);
        if(ss == SquareState.revealed) {
          final adj = game.field.getAdjacent(c, r);
          assert(adj != null);
          if(adj > 0) {
            cell.innerHTML = adj.toString();
          }
        }
      }
    }

    node.elements.add(table);
  }

  void _cellClick(MouseEvent args) {
    if(args.button == 0) {
      final TableCellElement cell = args.toElement;
      final xStr = cell.dataAttributes[_xKey];
      final yStr = cell.dataAttributes[_yKey];

      final x = math.parseInt(xStr);
      final y = math.parseInt(yStr);
      _click(x, y, args.shiftKey);
    }
  }

  void _click(int x, int y, bool reveal) {
    final ss = game.getSquareState(x, y);

    if(reveal) {
      if(ss == SquareState.hidden) {
        game.setFlag(x, y, true);
      } else if(ss == SquareState.flagged) {
        game.setFlag(x, y, false);
      }
    } else {
      if(ss == SquareState.hidden) {
        game.reveal(x, y);
      }
    }
  }

  void _gameUpdated(args) {
    print(game.state);
    markDirty();
    draw();
  }
}
