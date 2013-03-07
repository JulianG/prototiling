/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 01/03/13
 * Time: 16:44
 * To change this template use File | Settings | File Templates.
 */
define(['lib/KeyPoll', 'lib/SwipePoll', 'app/LevelLoader', 'app/GameLoop', 'app/GameBoard', 'app/control/InputProcessor', 'app/rules/BoardAnalyser', 'app/render/Renderer', 'app/MapParser'
], function (KeyPoll, SwipePoll, LevelLoader, GameLoop, GameBoard, InputProcessor, BoardAnalyser, Renderer, MapParser) {

		function BoulderDashGame() {
			this.stage = null;
			this.tileset = null;
			this.tilesetSheet = null;
			this.levelMap = null;
		}

		var api = BoulderDashGame.prototype;

		api.init = function init(canvas_id, level_filename) {

			this.stage = new createjs.Stage(canvas_id);
			var ll = new LevelLoader();
			var self = this;
			ll.load(level_filename, function (level) {
				console.log(level);
				self.levelMap = level.layers[0];
				self._loadTileset('tileset.png');
			});
		};

		api._loadTileset = function _loadTileset(url) {
			this.tileset = new Image();
			this.tileset.src = url; // getting imagefile from first tileset
			this.tileset.onLoad = this._initGame(); // callback for loading layers after tileset is loaded
		};

		api._initGame = function _initGame() {
			var kp = new KeyPoll(document);
			var sp = new SwipePoll(this.stage);
			var mp = new MapParser(kp, sp);
			var cells = mp.parseObject(this.levelMap);
			var board = new GameBoard();
			board.width = this.levelMap.width;
			board.height = this.levelMap.height;
			board.cells = cells;
			var input = new InputProcessor();
			var analyser = new BoardAnalyser();
			var renderer = new Renderer(this.stage, this.tileset, 32, 32);
			var game = new GameLoop(board, input, analyser, renderer);
			console.log(game.name);
			game.step();
			// stage updates
			createjs.Ticker.setFPS(32);
			createjs.Ticker.addListener(this.stage);
			createjs.Ticker.addEventListener("tick", function (event) {
				// Actions carried out each frame
				game.step();
			});
		};

		return BoulderDashGame;
	}
);