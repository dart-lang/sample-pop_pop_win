class GameView {
  static final String _xKey = 'x';
  static final String _yKey = 'y';

  final TableElement _table;
  final DivElement _leftCountDiv;
  final DivElement _gameStateDiv;

  Game game;
  dartlib.GlobalId _updatedEventId;

  GameView(this._table, this._leftCountDiv, this._gameStateDiv) {
    newGame();
  }

  void updateElement() {
    _gameStateDiv.innerHTML = game.state.name;
    _leftCountDiv.innerHTML = game.minesLeft.toString();

    if(_table.elements.length == 0) {

      for(int r = 0; r < game.field.rows; r++) {
        TableRowElement row = _table.insertRow(-1);

        for(int c = 0; c < game.field.cols; c++) {
          TableCellElement cell = row.insertCell(-1);
          cell.on.mouseDown.add(_cellClick);
          cell.dataAttributes[_xKey] = c.toString();
          cell.dataAttributes[_yKey] = r.toString();
        }
      }
    }

    for(int r = 0; r < game.field.rows; r++) {
      for(int c = 0; c < game.field.cols; c++) {
        TableRowElement row = _table.rows[r];
        TableCellElement cell = row.cells[c];

        cell.classes.clear();
        cell.classes.add('game-square');
        final ss = game.getSquareState(c, r);
        cell.classes.add(ss.name);
        if(ss == SquareState.revealed) {
          final adj = game.field.getAdjacentCount(c, r);
          assert(adj != null);
          if(adj > 0) {
            cell.innerHTML = adj.toString();
          }
        }
      }
    }

  }

  void newGame() {
    if(_updatedEventId != null) {
      assert(game != null);
      game.updated.remove(_updatedEventId);
    }
    final f = new Field();
    game = new Game(f);
    _updatedEventId = game.updated.add(_gameUpdated);
    _table.elements.clear();
    updateElement();
  }

  bool get _canClick() {
    return game.state == GameState.notStarted ||
        game.state == GameState.started;
  }

  void _cellClick(MouseEvent args) {
    if(args.button == 0 && _canClick) {
      final TableCellElement cell = args.toElement;
      final xStr = cell.dataAttributes[_xKey];
      final yStr = cell.dataAttributes[_yKey];

      final x = math.parseInt(xStr);
      final y = math.parseInt(yStr);
      _click(x, y, args.shiftKey);
    }
  }

  void _click(int x, int y, bool alt) {
    final ss = game.getSquareState(x, y);

    if(alt) {
      if(ss == SquareState.hidden) {
        game.setFlag(x, y, true);
      } else if(ss == SquareState.flagged) {
        game.setFlag(x, y, false);
      } else if(ss == SquareState.revealed) {
        game.reveal(x, y);
      }
    } else {
      if(ss == SquareState.hidden) {
        game.reveal(x, y);
      }
    }
  }

  void _gameUpdated(args) {
    updateElement();
  }
}
