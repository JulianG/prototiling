/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 25/02/13
 * Time: 17:18
 */
define(function () {

	function CellView(id) {

		this.id = id;
		this.sprite;
	}

	var api = CellView.prototype;

	api.disposeSprite = function dispose() {
		if(this.sprite.parent){
			this.sprite.parent.removeChild(this.sprite);
			this.sprite = null;
		}
	};


	return CellView;
});