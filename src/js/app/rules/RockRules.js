/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 25/02/13
 * Time: 21:40
 * To change this template use File | Settings | File Templates.
 */
define(['app/CellTypes', 'app/rules/Command'], function (CellTypes, Command) {

	function RockRules() {
	}

	var api = RockRules.prototype;

	api.processRules = function processRules(x, y, cell, board) {
		//console.log("RockRules.processRules for x:" + x + ", y:" + y);
		var south_cell = board.getCell(x, y + 1);
		if (south_cell.type == CellTypes.AIR) {
			// move rock down!
			console.log("  move rock down!");
			return new Command(Command.MOVE_TO, x, y, x, y + 1);
		}
		if (south_cell.type == CellTypes.ROCK) {
			var north_cell = board.getCell(x, y - 1);
			var northwest_cell = board.getCell(x - 1, y - 1);
			var northeast_cell = board.getCell(x + 1, y - 1);
			var west_cell = board.getCell(x - 1, y);
			var east_cell = board.getCell(x + 1, y);
			var southwest_cell = board.getCell(x - 1, y + 1);
			var southeast_cell = board.getCell(x + 1, y + 1);

			//if (north_cell.type != CellTypes.ROCK) {
			if (true) {

				if (west_cell.type == CellTypes.AIR && southwest_cell.type == CellTypes.AIR && northwest_cell.type != CellTypes.ROCK) {
					return new Command(Command.MOVE_TO, x, y, x - 1, y);
				}
				if (east_cell.type == CellTypes.AIR && southeast_cell.type == CellTypes.AIR && northeast_cell.type != CellTypes.ROCK) {
					return new Command(Command.MOVE_TO, x, y, x + 1, y);
				}
			}

		}
		return null;
	};

	return RockRules;
});