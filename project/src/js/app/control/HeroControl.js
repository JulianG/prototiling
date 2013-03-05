/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 26/02/13
 * Time: 10:41
 * To change this template use File | Settings | File Templates.
 */
define(['lib/KeyPoll', 'lib/SwipePoll', 'app/Directions'], function (KeyPoll, SwipePoll, Directions) {

	function HeroControl(keypoll, swipepoll) {
		this.swipepoll = swipepoll;
		this.keypoll = keypoll;
	}

	var api = HeroControl.prototype;

	api.processInput = function processInput(x, y, cell, board) {
		cell.state.direction = Directions.NONE;
		if (this.keypoll.isDown(KeyPoll.UP)) cell.state.direction = Directions.NORTH;
		if (this.keypoll.isDown(KeyPoll.DOWN)) cell.state.direction = Directions.SOUTH;
		if (this.keypoll.isDown(KeyPoll.LEFT)) cell.state.direction = Directions.WEST;
		if (this.keypoll.isDown(KeyPoll.RIGHT)) cell.state.direction = Directions.EAST;
		//
		if (cell.state.direction == Directions.NONE) {
			// check swipe
			var v = this.swipepoll.getSwipe();
			if (v) {
				var dir = v.getDirection();
				cell.state.direction = dir; // SwipePoll direction constants match HeroControl "DIR" constants.
			}
		}
	};

	return HeroControl;
});