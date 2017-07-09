/**
 * 
 *极光推送消息处理
 * @author lifei
 */
(function(window) {
    var n = {};
    /**
     *处理推送的消息
     */
    n.dealMessage = function(ret) {
        if (ret.notify == 1) {
            n.recivedMessage(ret.action, ret);
            api.notification({
                notify : {
                    title : ret.title,
                    content : ret.content, //通知内容
                    extra : ret
                }
            }, function(ret1, err) {
                var id = ret1.id;
            });
        } else {
            n.dealAction(ret.action, ret);
        }
    };
    /**
     *收到消息后预处理
     */
    n.recivedMessage = function(action, ret) {
        switch(action) {
            case 0:
                //课程前提醒
                break;
            case 1:
                //打开通知详情
                break;
            case 2:
                //签到开启（教师端）
                break;
            case 3:
                //打开作业详情
                break;
            case 4:
                //课程开始签到提醒（学生端）
                break;
            case 5:
                //课程结束签到提醒（学生端）
                break;
            case 6:
                break;
            case 7:
                break;
            case 8:
                break;
            case 9:
                break;
            case 10:
                break;
            case 11:
                break;
            case 12:
                break;
            case 13:
                break;
            case 14:
                break;
        }
    };

    /**
     *通知点击后处理action
     * @param {Object} action
     * @param {Object} ret 消息内容
     */
    n.dealAction = function(action, ret) {
        switch(action) {
            case 0:
                //课程前提醒
                //$BaseUI.openWin('main', api.wgtRootDir + '/html/main.html');
                break;
            case 1:
                //打开通知详情
                break;
            case 2:
                //签到开启（教师端）
                api.sendEvent({
	                name:'courseBegin'
                });
                break;
            case 3:
                //打开作业详情
                break;
            case 4:
                //课程开始签到提醒（学生端）
                break;
            case 5:
                //课程结束签到提醒（学生端）
                break;
            case 6:
                break;
            case 7:
                break;
            case 8:
                break;
            case 9:
                break;
            case 10:
                break;
            case 11:
                break;
            case 12:
                break;
            case 13:
                break;
            case 14:
                break;
        }
    };
    window.$notifyUtils = n;
})(window);
