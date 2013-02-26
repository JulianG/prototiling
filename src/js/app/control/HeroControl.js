/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 26/02/13
 * Time: 10:41
 * To change this template use File | Settings | File Templates.
 */
define(['lib/KeyPoll', 'lib/SwipePoll'], function (KeyPoll, SwipePoll) {

	function HeroControl(keypoll, swipepoll) {
		this.swipepoll = swipepoll
		this.keypoll = keypoll;
		this.direction = 'x';
	}

	HeroControl.DIR_NORTH = 'n';
	HeroControl.DIR_SOUTH = 's';
	HeroControl.DIR_EAST = 'e';
	HeroControl.DIR_WEST = 'w';
	HeroControl.DIR_NONE = 'x';

	var api = HeroControl.prototype;

	api.processInput = function processInput(x, y, cell, board) {
		this.direction = HeroControl.DIR_NONE;
		if (this.keypoll.isDown(KeyPoll.UP)) this.direction = HeroControl.DIR_NORTH;
		if (this.keypoll.isDown(KeyPoll.DOWN)) this.direction = HeroControl.DIR_SOUTH;
		if (this.keypoll.isDown(KeyPoll.LEFT)) this.direction = HeroControl.DIR_WEST;
		if (this.keypoll.isDown(KeyPoll.RIGHT)) this.direction = HeroControl.DIR_EAST;
		//
		if(this.direction == HeroControl.DIR_NONE){
			// check swipe
			var v = this.swipepoll.getSwipe();
			if(v){
				var dir = v.getDirection();
				this.direction = dir; // SwipePoll direction constants match HeroControl "DIR" constants.
			}
		}
	};

	return HeroControl;
});