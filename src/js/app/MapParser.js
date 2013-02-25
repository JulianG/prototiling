/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 25/02/13
 * Time: 17:10
 * To change this template use File | Settings | File Templates.
 */
define(['app/Cell','app/CellView'], function (Cell, CellView) {

	function MapParser() {

	}

	var api = MapParser.prototype;

	api.parseObject = function parseObject(obj)
	{
		var list = [];
		var n = obj.data.length;
		for (var i = 0; i < n; i++) {
			var char = obj.data[i];
			var cell = this._getCellByChar( char );
			list.push( cell );
		}


		return list;
	};

	api.parseURL = function parseURL(url)
	{

	};

	api._getCellByChar = function _getCellByChar( char ) {

		var cell = new Cell();

		cell.view = new CellView( char );

		return cell;
	};


	return MapParser;
});