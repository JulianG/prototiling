/**
 * GameBoard
 * @author Julian
 */
define(function () {

	function BoardAnalyser() {
	}

	var api = BoardAnalyser.prototype;

	api.analyse = function analyse(board) {
		//console.log('BoardAnalyser.analyse...');

		var commands = [];

		var n = board.cells.length;
		for (var i = n - 1; i >= 0; i--) {

			var coords = board.getCoordinates(i);

			var cell = board.cells[i];

			var rules = cell.rules;

			if (rules) {
				var cmd = rules.processRules(coords.x, coords.y, cell, board);
				commands.push(cmd);
			}
		}

		this._executeCommands(commands, board);
	};

	api._executeCommands = function _executeCommands(commands, board) {
		var n = commands.length;
		for (var i = 0; i < n; i++) {
			var cmd = commands[i];
			if (cmd) cmd.execute(board);
		}
	};

	return BoardAnalyser;

});