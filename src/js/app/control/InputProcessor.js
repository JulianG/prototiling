/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 25/02/13
 * Time: 17:04
 * To change this template use File | Settings | File Templates.
 */
define(function () {

	function InputProcessor() {

	}

	var api = InputProcessor.prototype;

	api.processInput = function processInput( board ){
		//console.log('InputProcessor.processInput...' );

		var n = board.cells.length;
		for (var i = n-1; i >= 0; i--) {

			var coords = board.getCoordinates(i);

			var cell = board.cells[i];

			var control = cell.control;

			if (control) {
				control.processInput(coords.x, coords.y, cell, board);
			}
		}


	};

	return InputProcessor;
});