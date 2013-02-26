/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 25/02/13
 * Time: 17:10
 * To change this template use File | Settings | File Templates.
 */
define(
	['app/Cell', 'app/CellTypes', 'app/render/CellView', 'app/rules/RockRules', 'app/rules/HeroRules', 'app/control/HeroControl'],
	function (Cell, CellTypes, CellView, RockRules, HeroRules, HeroControl) {

		function MapParser(keypoll, swipepoll) {
			this.keypoll = keypoll;
			this.swipepoll = swipepoll;

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
			cell.control = this._getControl(type);
			cell.view = new CellView(type);

			return cell;
		};

		api._getControl = function _getControl(type) {
			var control = null;
			switch (type) {
				case CellTypes.HERO:
					control = new HeroControl(this.keypoll, this.swipepoll);
					break;
			}
			return control;
		};

		api._getRules = function _getRules(type) {
			var rules = null;
			var rules_dict = [];
			rules_dict[CellTypes.ROCK] = RockRules;
			rules_dict[CellTypes.HERO] = HeroRules;
			var rules_class = rules_dict[type];
			if (rules_class) rules = new rules_class();
			return rules;
		};


		return MapParser;
	}
)
;