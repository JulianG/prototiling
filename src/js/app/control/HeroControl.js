/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 26/02/13
 * Time: 10:41
 * To change this template use File | Settings | File Templates.
 */
define(['lib/KeyPoll'], function (KeyPoll) {

	function HeroControl(keypoll) {
		this.keypoll = keypoll;
		this.direction = 'e';
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
	};

	return HeroControl;
});