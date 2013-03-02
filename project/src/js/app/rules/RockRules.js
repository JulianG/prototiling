/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 25/02/13
 * Time: 21:40
 * To change this template use File | Settings | File Templates.
 */
define(['app/CellTypes', 'app/rules/Command', 'app/Directions'], function (CellTypes, Command, Directions) {

	function RockRules() {
		this.crushHero = false;
		this.rolling = true;
	}

	var api = RockRules.prototype;

	api.processRules = function processRules(x, y, cell, board) {
		//console.log("RockRules.processRules for x:" + x + ", y:" + y);
		var commands = [];
		var south_cell = board.getCell(x, y + 1);
		if (south_cell.type == CellTypes.AIR) {
			// move rock down if AIR under it
			cell.state.direction = Directions.SOUTH;
			commands.push(new Command(Command.MOVE_TO, x, y, x, y + 1));
			//
		} else if (south_cell.type == CellTypes.HERO && this.crushHero && cell.state.direction == Directions.SOUTH) {
			// crush HERO if possible and allowed
			commands.push(new Command(Command.MOVE_TO, x, y, x, y + 1));
		} else {
			cell.state.direction = Directions.NONE;
			if (this.rolling && (south_cell.type == CellTypes.ROCK || south_cell.type == CellTypes.DIAMOND)) {
				// rollo over other rocks and diamonds
				var north_cell = board.getCell(x, y - 1);
				var northwest_cell = board.getCell(x - 1, y - 1);
				var northeast_cell = board.getCell(x + 1, y - 1);
				var west_cell = board.getCell(x - 1, y);
				var east_cell = board.getCell(x + 1, y);
				var southwest_cell = board.getCell(x - 1, y + 1);
				var southeast_cell = board.getCell(x + 1, y + 1);

				if (west_cell.type == CellTypes.AIR && southwest_cell.type == CellTypes.AIR && northwest_cell.type != CellTypes.ROCK) {
					// roll west
					cell.state.direction = Directions.WEST;
					commands.push(new Command(Command.MOVE_TO, x, y, x - 1, y));
				}
				if (east_cell.type == CellTypes.AIR && southeast_cell.type == CellTypes.AIR && northeast_cell.type != CellTypes.ROCK) {
					// roll east
					cell.state.direction = Directions.EAST;
					commands.push(new Command(Command.MOVE_TO, x, y, x + 1, y));
				}
			}
		}
		return commands;
	};

	return RockRules;
});