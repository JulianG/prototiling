/**
 * GameBoard
 * @author Julian
 */
define(function () {

	function BoardAnalyser() {
	}

	var api = BoardAnalyser.prototype;

	api.analyse = function analyse(board) {
		console.log('BoardAnalyser.analyse...');

		var n = board.cells.length;
		for (var i = n-1; i >= 0; i--) {

			var coords = board.getCoordinates(i);

			var cell = board.cells[i];

			var rules = cell.rules;

			if (rules) {
				rules.processRules(coords.x, coords.y, cell, board);
			}
		}
	};

	return BoardAnalyser;

});