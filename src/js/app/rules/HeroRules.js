/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 26/02/13
 * Time: 10:42
 * To change this template use File | Settings | File Templates.
 */
define(['app/control/HeroControl', 'app/CellTypes', 'app/rules/Command'], function (HeroControl, CellTypes, Command) {

	function HeroRules() {

	}

	var api = HeroRules.prototype;

	api.processRules = function processRules(x, y, cell, board) {
		//console.log("HeroRules.processRules for x:" + x + ", y:" + y);

		var next_cell;
		var nx = x;
		var ny = y;

		switch (cell.control.direction) {
			case HeroControl.DIR_EAST:
				console.log("HeroRules.processRules for x:" + x + ", y:" + y);
				nx++;
				break;
			case HeroControl.DIR_WEST:
				nx--;
				break;
			case HeroControl.DIR_NORTH:
				ny--;
				break;
			case HeroControl.DIR_SOUTH:
				ny++;
				break;
		}

		next_cell = board.getCell(nx, ny);

		if (next_cell.type == CellTypes.AIR || next_cell.type == CellTypes.SOIL) {
			console.log("  walk east");
			return [new Command(Command.MOVE_TO, x, y, nx, ny)];
		}
		var push_dir = 0;
		if (next_cell.type == CellTypes.ROCK && cell.control.direction == HeroControl.DIR_EAST){
			push_dir = 1;
		}
		if (next_cell.type == CellTypes.ROCK && cell.control.direction == HeroControl.DIR_WEST){
			push_dir = -1;
		}
		if(push_dir!=0){
			var beyond_cell = board.getCell(nx+push_dir, y);
			if(beyond_cell.type == CellTypes.AIR){
				// can push!?
				return [
					new Command(Command.MOVE_TO, nx, ny, nx+push_dir, ny), // move hero
					new Command(Command.MOVE_TO, x, y, nx, ny) // move hero
				];
			}
		}
		return [];
	};

	return HeroRules;
});