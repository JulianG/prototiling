/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 09/03/13
 * Time: 13:27
 * To change this template use File | Settings | File Templates.
 */
define(['lib/loadJSON', 'lib/easeljs/EaselJSAtlas'], function (loadJSON, EaselJSAtlas) {

	function AtlasTest() {
		this.atlas = null;
	}

	var api = AtlasTest.prototype;

	api.init = function init() {

		this.stage = new createjs.Stage('canvas');
		this._load();
	};

	api._load = function _load() {
		var self = this;
		var path = './assets/';
		loadJSON(path + 'atlas.json', function (obj) {
			self._buildAtlas(obj, path);

		});
	};

	api._buildAtlas = function _buildAtlas(obj, path) {
		console.log(obj);

		var bmpa = null;
		createjs.Ticker.setFPS(4);
		createjs.Ticker.addListener(this.stage);
		var frmcnt = 0;
		createjs.Ticker.addEventListener("tick", function (event) {
			// Actions carried out each frame
			frmcnt++;
			if (frmcnt < 10) {
				//console.log('bmpa: currentAnimation:' + bmpa.currentAnimation + ', currentAnimationFrame:' + bmpa.currentAnimationFrame + ', currentFrame:' + bmpa.currentFrame);
			}
		});

		var self = this;
		this.atlas = new EaselJSAtlas();
		this.atlas.completed.add(function () {

			console.log("drawing...");
			console.log(self.atlas.getDisplayObjectList());

			//var bmp = self.atlas.getDisplayObject('air');
			var img = createjs.SpriteSheetUtils.extractFrame(self.atlas.spriteSheet, "air");
			var bmp = new createjs.Bitmap(img);
			self.stage.addChild(bmp);

			//bmpa = new createjs.BitmapAnimation(self.atlas.spriteSheet);
			//bmpa.gotoAndPlay("diamond", 0);
			//self.stage.addChild(bmpa);

			alert("cloning of display objects doesn't seem to work!?")

		});

		this.atlas.init(obj, path, '/');

		console.log("this.atlas.data:");
		console.log(this.atlas.data);

	};

	return AtlasTest;
});