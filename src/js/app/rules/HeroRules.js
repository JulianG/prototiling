/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 26/02/13
 * Time: 10:42
 * To change this template use File | Settings | File Templates.
 */
define(['app/control/HeroControl', 'app/CellTypes', 'app/rules/Command', 'app/Directions'], function (HeroControl, CellTypes, Command, Directions) {

	function HeroRules() {

	}

	var api = HeroRules.prototype;

	api.processRules = function processRules(x, y, cell, board) {
		//console.log("HeroRules.processRules for x:" + x + ", y:" + y);

		var next_cell;
		var nx = x;
		var ny = y;
		var moving = false;
		switch (cell.state.direction) {
			case Directions.EAST:
				nx++;
				moving = true;
				break;
			case Directions.WEST:
				nx--;
				moving = true;
				break;
			case Directions.NORTH:
				ny--;
				moving = true;
				break;
			case Directions.SOUTH:
				ny++;
				moving = true;
				break;
		}

		if(moving){
			next_cell = board.getCell(nx, ny);
			if (next_cell.type == CellTypes.AIR || next_cell.type == CellTypes.SOIL || next_cell.type == CellTypes.EXIT) {
				return [new Command(Command.MOVE_TO, x, y, nx, ny)];
			}
			if (next_cell.type == CellTypes.DIAMOND) {

				return [new Command(Command.COLLECT, x, y, nx, ny)];
			}
			var push_dir = 0;
			if (next_cell.type == CellTypes.ROCK && cell.control.direction == Directions.EAST) {
				push_dir = 1;
			}
			if (next_cell.type == CellTypes.ROCK && cell.control.direction == Directions.WEST) {
				push_dir = -1;
			}
			if (push_dir != 0) {
				var beyond_cell = board.getCell(nx + push_dir, y);
				var under_next_cell = board.getCell(nx, ny + 1);
				if (under_next_cell.type != CellTypes.AIR) {
					if (beyond_cell.type == CellTypes.AIR) {
						// can push!?
						return [
							new Command(Command.MOVE_TO, nx, ny, nx + push_dir, ny), // move rock
							new Command(Command.MOVE_TO, x, y, nx, ny) // move hero
						];
					}
				}
			}
		}
		return [];
	};

	return HeroRules;
});