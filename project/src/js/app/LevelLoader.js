/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 01/03/13
 * Time: 11:42
 * To change this template use File | Settings | File Templates.
 */
define(function () {

	function LevelLoader() {

	}

	var api = LevelLoader.prototype;

	api.load = function load(url, callback) {

		var http_request = new XMLHttpRequest();
		http_request.open("GET", url, true);
		http_request.onreadystatechange = function () {

			//console.log("http_request.readyState:" + http_request.readyState);
			//console.log("http_request.status:" + http_request.status);

			if (http_request.readyState == 4 && http_request.status == 200) {
				if (callback) callback(JSON.parse(http_request.responseText));
			}
		};
		http_request.send(null);
	};

	return LevelLoader;
});