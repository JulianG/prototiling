/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 25/02/13
 * Time: 21:40
 * To change this template use File | Settings | File Templates.
 */
define(['app/CellTypes'], function (CellTypes) {

	function RockRules() {
	}

	var api = RockRules.prototype;

	api.processRules = function processRules(x, y, cell, board) {
		console.log("RockRules.processRules for x:" + x + ", y:" + y);
		var south_cell = board.getCell(x, y + 1);
		if (south_cell.type == CellTypes.AIR) {
			// move rock down!
			console.log("  move rock down!");
			board.setCell(x, y, south_cell);
			board.setCell(x, y + 1, cell);
		}
	};

	return RockRules;
});