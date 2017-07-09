/**
 * 数据初始化配置文件
 * @author lifei
 * 注：1、使用本文件需依次引入api.js、PrefsUtils.js、 md5.js、httpUtils.js
 *
 */
(function(window) {
    var c = {};
    /**
     *获取学期列表配置
     */
    c.initTermConfig = function() {
        $httpUtils.post('teacher/v1/getTermList', null, function(ret) {
            if (ret && ret.length > 0) {
                for (var i = 0; i < ret.length; i++) {
                    if(ret[i].isDefult == 1){
                        $PrefsUtils.savePref('defultTerm',$api.jsonToStr(ret[i]));
                    }
                }
            }
        }, function(msg) {

        });
    }
    /**
     *获取个人的配置
     */
    c.initUserConfig = function() {

    }
    /**
     *获取软件的配置
     */
    c.initAppConfig = function() {

    }
    /**
     *清除用户本地缓存
     */
    c.clearCatch = function() {
        $PrefsUtils.remValue('token');
        $PrefsUtils.remValue('schoolId');
        $PrefsUtils.remValue('userId');
        $PrefsUtils.remValue('termList');
        $PrefsUtils.remValue('schoolId');
        $PrefsUtils.remValue('name');
        $PrefsUtils.remValue('icon');
        $PrefsUtils.remValue('homeWorkRing');
        $PrefsUtils.remValue('homeWorkVibe');
        $PrefsUtils.remValue('courseRing');
        $PrefsUtils.remValue('courseVibe');
        $PrefsUtils.remValue('messageRing');
        $PrefsUtils.remValue('messageVibe');
    }
    /**
     *上报数据
     */
    c.report = function() {
        var jpushId = $PrefsUtils.getPref('jPushId');
        var params = {};
        params.jpushId = jpushId;
        $httpUtils.post('report', params, function(ret) {

        }, function(msg) {

        });
    }
    window.$ConfigUtils = c;
})(window);
