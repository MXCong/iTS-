(function(window) {
	var p = {};
	var tag = "teacher";
	/**
	 * 配置文件中保存数据
	 * @param {Object} k 名称
	 * @param {Object} v 内容
	 */
	p.savePref = function(k, v) {
		if (!k) {
			alert("key不能为空！");
			return;
		}
		if (!v) {
			alert("value不能为空！");
			return;
		}
		api.setPrefs({
			key : tag + k,
			value : v,
		});
	}
	/**
	 * 获取配置文件中的数据
	 * @param {Object} k 名称
	 */
	p.getPref = function(k) {
		if (!k) {
			return;
		}
		var value = api.getPrefs({
			sync : true,
			key : tag + k
		});
		return value;
	}

	/**
	 * 删除配置文件中的对应的数据
	 * @param {Object} k 名称
	 */
	p.remValue = function(k) {
		if (!k) {
			alert("key不能为空！");
			return;
		}
		api.removePrefs({
			key : tag + k
		});
	}

	window.$PrefsUtils = p;
})(window);
