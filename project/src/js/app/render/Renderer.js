/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 25/02/13
 * Time: 16:56
 * To change this template use File | Settings | File Templates.
 */
define(function () {

	function Renderer(container, tile_set, tile_width, tile_height) {
		this.container = container;
		//this.tileSet = tile_set;
		this.tileWidth = tile_width;
		this.tileHeight = tile_height;
		//
		var image_data = {
			images:[ tile_set ],
			frames:{ width:tile_width, height:tile_height }
		};
		this.tilesetSheet = new createjs.SpriteSheet(image_data);
	}

	var api = Renderer.prototype;

	api.renderBoard = function renderBoard(board) {
		//console.log("Renderer.renderBoard...");

		var n = board.cells.length;
		for (var i = 0; i < n; i++) {

			var coords = board.getCoordinates(i);

			var cell = board.cells[i];
			var view = cell.view;

			if (cell.view.sprite === null) {
				cell.view.sprite = new createjs.BitmapAnimation(this.tilesetSheet);
				this.container.addChild(cell.view.sprite);
			}
			cell.view.sprite.gotoAndStop(view.id - 1);
			cell.view.sprite.x = coords.x * this.tileWidth;
			cell.view.sprite.y = coords.y * this.tileHeight;


			//console.log( view.id );
		}
	};

	api._getX = function _getX(board, indx) {
		return (indx % board.width);
	};

	api._getY = function _getY(board, indx) {
		return Math.floor(indx / board.width);
	};

	return Renderer;
});