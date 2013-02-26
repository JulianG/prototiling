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
requirejs(['lib/KeyPoll', 'app/BoulderDashGame', 'app/GameBoard', 'app/control/InputProcessor', 'app/rules/BoardAnalyser', 'app/render/Renderer', 'app/MapParser'],
	function (KeyPoll, BoulderDashGame, GameBoard, InputProcessor, BoardAnalyser, Renderer, MapParser) {
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

			var kp = new KeyPoll(document);
			var mp = new MapParser(kp);
			var cells = mp.parseObject(mapObj);

			var board = new GameBoard();
			board.width = mapObj.width;
			board.height = mapObj.height;
			board.cells = cells;

			var input = new InputProcessor();
			var analyser = new BoardAnalyser();
			var renderer = new Renderer(stage, tileset, 32, 32);

			var game = new BoulderDashGame(board, input, analyser, renderer);
			console.log(game.name);

			game.step();

			// stage updates
			createjs.Ticker.setFPS(32);
			createjs.Ticker.addListener(stage);

			createjs.Ticker.addEventListener("tick", function (event) {
				// Actions carried out each frame
				game.step();

				//console.log(kp.isDown(KeyPoll.UP));
			});


		}

		///////////////////////
		///////////////////////
		///////////////////////

		init('canvas', 'tileset.png', {
			"width":10,
			"height":10,
			"data":[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 1, 4, 4, 4, 4, 2, 2, 4, 7, 4, 1, 4, 4, 4, 4, 2, 2, 4, 4, 4, 5, 4, 4, 4, 4, 2, 2, 4, 4, 4, 5, 4, 4, 4, 4, 2, 2, 4, 4, 4, 5, 4, 4, 4, 4, 2, 2, 4, 4, 4, 5, 4, 4, 4, 4, 2, 2, 4, 4, 4, 5, 4, 4, 4, 4, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
		});

	});