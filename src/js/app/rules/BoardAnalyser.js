/**
 * GameBoard
 * @author Julian
 */
define(['app/CellTypes', 'app/rules/HeroRules', 'app/rules/RockRules'], function (CellTypes, HeroRules, RockRules) {

		function BoardAnalyser() {

			this.heroRules = new HeroRules();
			this.rockRules = new RockRules();
			this.rockRules.crushHero = true;
			this.diamondRules = new RockRules();
			this.diamondRules.crushHero = false;

			this.rules = {};
			this.rules[CellTypes.AIR] = null;
			this.rules[CellTypes.METAL] = null;
			this.rules[CellTypes.BRICK] = null;
			this.rules[CellTypes.SOIL] = null;
			this.rules[CellTypes.ROCK] = this.rockRules;
			this.rules[CellTypes.DIAMOND] = this.diamondRules;
			this.rules[CellTypes.HERO] = this.heroRules;
			this.rules[CellTypes.EXIT] = null;
		}

		var api = BoardAnalyser.prototype;

		api.analyse = function analyse(board) {
			//console.log('BoardAnalyser.analyse...');

			var rock_commands = this._applyRules(CellTypes.ROCK, board);
			this._executeCommands(rock_commands, board);

			var diamond_commands = this._applyRules(CellTypes.DIAMOND, board);
			this._executeCommands(diamond_commands, board);

			var hero_commands = this._applyRules(CellTypes.HERO, board);
			this._executeCommands(hero_commands, board);

		};

		api._applyRules = function _applyRules(type, board) {
			var commands = [];
			var n = board.cells.length;
			for (var i = n - 1; i >= 0; i--) {

				var cell = board.cells[i];
				if(cell.type==type)
				{
					var coords = board.getCoordinates(i);
					var rules = this._getRulesByType(cell.type);

					if (rules) {
						var rule_commands = rules.processRules(coords.x, coords.y, cell, board);
						var m = rule_commands.length;
						for (var j = 0; j < m; j++) {
							commands.push(rule_commands[j]);
						}
					}
				}
			}
			return commands;
		};

		api._getRulesByType = function _getRulesByType(type) {
			return this.rules[type];
		};

		api._executeCommands = function _executeCommands(commands, board) {
			var n = commands.length;
			for (var i = 0; i < n; i++) {
				var cmd = commands[i];
				if (cmd) cmd.execute(board);
			}
		};

		return BoardAnalyser;

	}
)
;