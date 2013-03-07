/**
 * GameBoard
 * @author Julian
 */
define(function () {

	function GameBoard() {

		this.collected = new signals.Signal();
		this.width = null;
		this.height = null;
		this.cells = [];
	}

	var api = GameBoard.prototype;

	api.getCell = function getCell(x, y) {
		var cell = null;
		if(x<this.width && y<this.height)
		{
			var indx = y * this.width + x;
			cell = this.cells[indx];
		}
		return cell;
	};

	api.setCell = function setCell(x, y, cell) {
		var indx = y * this.width + x;
		if (indx < this.cells.length - 1) {
			this.cells[indx] = cell;
		}
	};

	api.getCoordinates = function getCoordinates(indx) {
		return {x:this._getX(indx), y:this._getY(indx) };
	};

	api._getX = function _getX(indx) {
		return (indx % this.width);
	};

	api._getY = function _getY(indx) {
		return Math.floor(indx / this.width);
	};

	return GameBoard;


});