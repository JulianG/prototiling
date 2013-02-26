/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 26/02/13
 * Time: 19:04
 * To change this template use File | Settings | File Templates.
 */
define(function () {

	function SwipePoll(stage) {

		var begin = {x:-1000, y:-1000};
		var current = {x:0, y:0};
		this.begin = begin;
		this.current = current;
		this.swipe = {
			x:0,
			y:0,
			getLength:function getLength() {
				return Math.sqrt(this.x * this.x + this.y * this.y);
			},
			getDirection:function () {
				var l = this.getLength();
				if (l > 0) {
					if (Math.abs(this.x) > Math.abs(this.y)) {
						// horizontal
						return (this.x > 0) ? SwipePoll.RIGHT : SwipePoll.LEFT;
					} else {
						// vertical
						return (this.y > 0) ? SwipePoll.DOWN : SwipePoll.UP;
					}
				}
				return SwipePoll.NONE;
			}
		};

		stage.onMouseDown = function (e) {
			//console.log("onMouseDown");
			//console.log(e);
			begin.x = e.stageX;
			begin.y = e.stageY;
		};
		stage.onMouseUp = function (e) {
			//console.log("onMouseUp");
			//console.log(e);
			begin.x = -1000;
			begin.y = -1000;
		};
		stage.onMouseMove = function (e) {
			//console.log("onMouseUp");
			//console.log(e);
			current.x = e.stageX;
			current.y = e.stageY;
		};
	}

	SwipePoll.UP = "n";
	SwipePoll.DOWN = "s";
	SwipePoll.LEFT = "w";
	SwipePoll.RIGHT = "e";
	SwipePoll.NONE = "x";

	var api = SwipePoll.prototype;

	api.getSwipe = function getSwipe() {
		if (this.begin.x == -1000 && this.begin.y == -1000) {
			return null;
		} else {
			this.swipe.x = this.current.x - this.begin.x;
			this.swipe.y = this.current.y - this.begin.y;
			return this.swipe;
		}
	};

	return SwipePoll;
});