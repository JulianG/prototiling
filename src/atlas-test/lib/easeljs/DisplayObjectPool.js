/**
 * Created with JetBrains WebStorm.
 * User: julian
 * Date: 12/03/13
 * Time: 09:21
 * To change this template use File | Settings | File Templates.
 */
define(function () {

	function DisplayObjectPool(proto) {
		this._proto = proto;
		this.availableObjects = [];
	}

	var api = DisplayObjectPool.prototype;

	api.init = function init(qty) {
		for (var i = 0; i < qty; i++) {
			var obj = this.getObject();
			this.disposeObject(obj);
		}
	};

	api.getObject = function getObject() {
		var obj = null;
		if (this.availableObjects.length > 0) {
			obj = this.availableObjects.pop();
		} else {
			obj = this._proto.clone();
		}
		return obj;
	};

	api.disposeObject = function disposeObject(obj) {
		this.availableObjects.push(obj);
	};

	return DisplayObjectPool;
});