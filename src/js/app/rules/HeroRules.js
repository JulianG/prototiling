/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 26/02/13
 * Time: 10:42
 * To change this template use File | Settings | File Templates.
 */
define(['app/control/HeroControl', 'app/CellTypes'], function (HeroControl, CellTypes) {

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

			next_cell.type = CellTypes.AIR;
			next_cell.rules = null;
			next_cell.view.disposeSprite();
			next_cell.view.id = CellTypes.AIR;

			board.setCell(x, y, next_cell);
			board.setCell(nx, ny, cell);
		}
	};

	return HeroRules;
});