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
			return new Command(Command.MOVE_TO, x, y, nx, ny);
		}
	};

	return HeroRules;
});