/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 25/02/13
 * Time: 17:10
 * To change this template use File | Settings | File Templates.
 */
define(['app/Cell', 'app/render/CellView', 'app/CellTypes', 'app/rules/RockRules'], function (Cell, CellView, CellTypes, RockRules) {

	function MapParser() {

	}

	var api = MapParser.prototype;

	api.parseObject = function parseObject(obj) {
		var list = [];
		var n = obj.data.length;
		for (var i = 0; i < n; i++) {
			var char = obj.data[i];
			var cell = this._getCellByChar(char);
			list.push(cell);
		}


		return list;
	};

	api.parseURL = function parseURL(url) {

	};

	api._getCellByChar = function _getCellByChar(type) {

		var cell = new Cell(type);

		cell.rules = this._getRules(type);
		cell.view = new CellView(type);

		return cell;
	};

	api._getRules = function _getRules(type) {
		var rules = null;
		var rules_dict = [];
		rules_dict[CellTypes.ROCK] = RockRules;
		var rules_class = rules_dict[type];
		if (rules_class) {
			rules = new rules_class();
		}
		return rules;
	};


	return MapParser;
});