requirejs.config({
	//By default load any module IDs from js/lib
	//baseUrl: './lib',

	//except, if the module ID starts with "app",
	//load it from the js/app directory. paths
	//config is relative to the baseUrl, and
	//never includes a ".js" extension since
	//the paths config could be for a directory.
	//paths: { app: './app' }
});

// Start the main app logic.
requirejs(['app/BoulderDashGame', 'app/GameBoard', 'app/InputProcessor', 'app/BoardAnalyser', 'app/Renderer', 'app/MapParser'],
	function (BoulderDashGame, GameBoard, InputProcessor, BoardAnalyser, Renderer, MapParser) {
		console.log("Main");

		var stage;
		var tileset;
		var tilesetSheet;
		var mapObj;


		function init(canvas_id, url, map_obj) {
			mapObj = map_obj;
			stage = new createjs.Stage(canvas_id);
			loadTileset(url);
		}

		function loadTileset(url) {
			tileset = new Image();
			// getting imagefile from first tileset
			tileset.src = url;
			// callback for loading layers after tileset is loaded
			tileset.onLoad = initGame();

		}

		function initGame() {

			var mp = new MapParser();
			var cells = mp.parseObject(mapObj);

			var board = new GameBoard();
			board.width = mapObj.width;
			board.height = mapObj.height;
			board.cells = cells;

			var input = new InputProcessor();
			var analyser = new BoardAnalyser();
			var renderer = new Renderer(stage, tileset, 16, 16);

			var game = new BoulderDashGame(board, input, analyser, renderer);
			console.log(game.name);

			for (i = 0; i < 1; i++) {

				console.log("___________");
				game.step();
			}

			// stage updates
			createjs.Ticker.setFPS(25);
			createjs.Ticker.addListener(stage);

		}

		///////////////////////
		///////////////////////
		///////////////////////

		init('canvas', 'tileset.png', {
			"width":10,
			"height":10,
			"data":[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 3, 4, 4, 4, 5, 4, 2, 4, 7, 4, 3, 4, 4, 4, 6, 4, 2, 4, 4, 4, 3, 4, 4, 4, 4, 5, 2, 4, 4, 4, 3, 4, 4, 4, 4, 6, 2, 4, 4, 4, 3, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4, 3, 4, 4, 4, 4, 4, 2, 4, 4, 4, 3, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4]
		});

	});