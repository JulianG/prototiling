/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 26/02/13
 * Time: 15:21
 * To change this template use File | Settings | File Templates.
 */
define(['app/CellTypes'], function (CellTypes) {

	function Command( action, source_x, source_y, target_x, target_y) {

		this.action = action;
		this.sourceX = source_x;
		this.sourceY = source_y;
		this.targetX = target_x;
		this.targetY = target_y;
	}

	Command.SWAP = "swap";
	Command.MOVE_TO = "move_to";
	Command.COLLECT = "collect";

	var api = Command.prototype;

	api.execute = function execute(board) {

		var sourceCell = board.getCell(this.sourceX, this.sourceY);
		var targetCell = board.getCell(this.targetX, this.targetY);

		if (this.action == Command.COLLECT) {
			board.collected.dispatch(targetCell);
			board.setCell(this.targetX, this.targetY, sourceCell);
			board.setCell(this.sourceX, this.sourceY, targetCell);
			targetCell.type = CellTypes.AIR;
			targetCell.rules = null;
			targetCell.view.disposeSprite();
			targetCell.view.id = CellTypes.AIR;
		} else if (this.action == Command.MOVE_TO) {
			board.setCell(this.targetX, this.targetY, sourceCell);
			board.setCell(this.sourceX, this.sourceY, targetCell);
			targetCell.type = CellTypes.AIR;
			targetCell.rules = null;
			targetCell.view.disposeSprite();
			targetCell.view.id = CellTypes.AIR;
		}
	};

	return Command;
});