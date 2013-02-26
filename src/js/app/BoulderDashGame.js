/**
 * BoulderDashGame
 * @author Julian
 */
//define(['app/gameboard','app/gameanalyser'], function ( GameBoard, GameAnalyser ) {
define(function () {
	//Do setup work here

	function BoulderDashGame(game_board, input_processor, game_analyser, render) {
		this.name = "Boulder Dash";
		this.board = game_board;
		this.inputProcessor = input_processor;
		this.analyser = game_analyser
		this.render = render;

		this._elapsedSteps = 0;
	}

	var api = BoulderDashGame.prototype;

	api.step = function step() {

		this.processInput();
		if (this._elapsedSteps % 4 == 0) {
			this.analyseBoard();
		}
		this.renderBoard();
		this._elapsedSteps++;
	};

	api.processInput = function processInput() {
		this.inputProcessor.processInput(this.board);
	};

	api.analyseBoard = function analyseBoard() {
		this.analyser.analyse(this.board);
	};

	api.renderBoard = function renderBoard() {
		this.render.renderBoard(this.board);
	};

	return BoulderDashGame;

});