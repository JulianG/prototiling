/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 25/02/13
 * Time: 17:04
 * To change this template use File | Settings | File Templates.
 */
define(function () {

	function InputProcessor() {

	}

	var api = InputProcessor.prototype;

	api.processInput = function processInput( board ){
		console.log('InputProcessor.processInput...' );
	};

	return InputProcessor;
});