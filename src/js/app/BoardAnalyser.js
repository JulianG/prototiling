/**
 * GameBoard
 * @author Julian
 */
define(['app/GameBoard'], function (GameBoard) {

	function BoardAnalyser() {
	}

	var api = BoardAnalyser.prototype;

	api.analyse = function analyse(board) {
		console.log('BoardAnalyser.analyse...');
		var new_board = new GameBoard();
		return new_board;
	}

	return BoardAnalyser;

});