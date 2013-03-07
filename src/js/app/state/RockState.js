/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 28/02/13
 * Time: 11:13
 * To change this template use File | Settings | File Templates.
 */
define(['app/Directions'], function (Directions) {

	function RockState(){
		this.direction = Directions.NONE;
	}

	return RockState;
});