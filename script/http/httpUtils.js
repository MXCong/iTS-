/**
 * 引用前需引用api.js、md5.js
 */
(function(window) {
    var h = {};
    h.version = '1.1'
    function goLogin() {
        api.removePrefs({
            key : 'teacheruserId'
        });
        api.removePrefs({
            key : 'teachertoken'
        });
        api.removePrefs({
            key : 'teacherschoolId'
        });
        api.openWin({
            name : 'login',
            url : api.wgtRootDir + '/html/login/login.html',
            bounces : false,
            animation : {
                type : 'none'
            }
        });
        $BaseUI.closeWin();
    }

    /**
     * 自带默认参数的POST网络请求
     * @author lifei
     * @param {Object} url      访问的接口名称
     * @param {Object} params   需要传递的参数JSON对象
     * @param {Object} fnSuc    成功返回函数  例：function(data){};     data值为返回值，类型为JSON
     * @param {Object} fnErr    失败返回函数  例：function(msg){};        msg值为错误提示，类型为字符串
     */
    h.post = function(url, params, fnSuc, fnErr) {
        if (!params) {
            params = {};
        }
        var myDate = new Date();
        params.appKey = '20161001_ITEACHER';
        if(!params.userId){
        	params.userId = api.getPrefs({
            	sync : true,
            	key : 'teacheruserId'
        	});
        }
        if(!params.token){
	        var token = api.getPrefs({
	            sync : true,
	            key : 'teachertoken'
	        });
	    }else{
	    	var token = params.token;
	    }
        params.timeStamp = myDate.getTime();
        params.signature = hex_md5(token + params.timeStamp);
        params.version = h.version;
        console.log("全部参数："+JSON.stringify(params));
        api.ajax({
            url : 'http://192.168.0.5:8080/eteacher1.1/remote/' + url,
            // url : 'http://60.205.153.22:8080/eteacher/remote/' + url,
            method : 'post',
            data : {
                values : params,
                files : params.files
            }
        }, function(ret, err) {
            if (ret) {//200 500
                switch(ret.result) {
                    case 200:
                        if (fnSuc) {
                            console.log('ret:'+$api.jsonToStr(ret));
                            fnSuc(ret.data);
                        }
                        break;
                    case 900:
                        //请求超时
                        if (fnErr) {
                            fnErr(ret.msg);
                        }
                        break;
                    case 406:
                        //非法请求
                        if (fnErr) {
                            fnErr(ret.msg);
                        }
                        break;
                    case 401:
                        //用户不存在
                        goLogin();
                        if (fnErr) {
                            fnErr(ret.msg);
                        }
                        break;
                    case 400:
                        //请求失败
                        if (fnErr) {
                            fnErr(ret.msg);
                        }
                        break;
                    case 201:
                        //token过期
                        goLogin();
                        if (fnErr) {
                            fnErr(ret.msg);
                        }
                        break;
                }
            } else {
                fnErr('网络访问失败，请检查网络');
            }
        });
    };
    /**
     * 不带默认参数的POST网络请求
     * @author lifei
     * @param {Object} url      访问的接口名称
     * @param {Object} params   需要传递的参数JSON对象
     * @param {Object} fnSuc    成功返回函数  例：function(data){};     data值为返回值，类型为JSON
     * @param {Object} fnErr    失败返回函数  例：function(msg){};        msg值为错误提示，类型为字符串
     */
    h.postNormal = function(url, params, fnSuc, fnErr) {
        if (!params) {
            params = {};
        }
        params.version = h.version;
        api.ajax({
            url : 'http://192.168.0.5:8080/eteacher1.1/remote/' + url,
            //  url : 'http://60.205.153.22:8080/eteacher/remote/' + url,
            method : 'post',
            data : {
                values : params,
                files : params.files
            }
        }, function(ret, err) {
            if (ret) {
                switch(ret.result) {
                    case 200:
                        if (fnSuc) {
                            fnSuc(ret.data);
                        }
                        break;
                    case 900:
                        //请求超时
                        if (fnErr) {
                            fnErr(ret.msg);
                        }
                        break;
                    case 406:
                        //非法请求
                        if (fnErr) {
                            fnErr(ret.msg);
                        }
                        break;
                    case 401:
                        //用户不存在
                        goLogin();
                        if (fnErr) {
                            fnErr(ret.msg);
                        }
                        break;
                    case 400:
                        //请求失败
                        if (fnErr) {
                            fnErr(ret.msg);
                        }
                        break;
                    case 201:
                        //token过期
                        goLogin();
                        if (fnErr) {
                            fnErr(ret.msg);
                        }
                        break;
                }
            } else {
                fnErr('网络访问失败，请检查网络');
            }
        });
    };
    /**
     * 下载文件
     * url 文件路径
     * name 文件名称
     * fnSuc 下载成功返回方法
     * fnErr 下载失败返回方法
     */ 
    h.download = function(url, name, fnSuc, fnErr) {
        if (api.connectionType != 'wifi') {
            api.confirm({
                title : '提示',
                msg : '当前不是WiFi网络,是否继续下载？',
                buttons : ['继续', '取消']
            }, function(ret, err) {
                if (ret.buttonIndex == 2) {
                    return;
                }
            });
        }
        $("body").hide();
        var downloadManager = api.require('downloadManager');
        downloadManager.enqueue({
            url : url,
            cache : true,
            allowResume : true,
            title : name,
            networkTypes : 'wifi'
        }, function(ret, err) {
            if (ret) {
                downloadManager.openDownloadedFile({
                    id : ret.id
                }, function(ret2, err2) {

                });
                downloadManager.openManagerView({
                    title : '下载管理'
                }, function(ret1, err1) {
                    if (ret1) {
                        if (ret1.event == true) {
                            $("body").show();
                        }
                        downloadManager.openDownloadedFile({
                            id : ret1.id
                        }, function(ret2, err2) {

                        });
                    }
                });
            } else {
                alert(JSON.stringify(err));
            }
        });
    };

    /**
     *初始化网络获取列表
     * var configParams = {
            listBody:Obj //列表标签
            dotBody:Obj  //单元标签
            hintPbody:Obj //提示页父标签
            emptyStr:'空数据'   //空数据提示语
            emptyImg:'img.png'  //空数据提示图片
            errorStr:'网络错误'  //网络错误提示语
            errorImg:'img.png'  //网络错误提示图片
            pull2Refresh: true  //是否支持下拉刷新,默认为true
            loadMore:true       //是否支持加载更多,默认为true
        }
     */
    h.initGetList = function(url, httpParams, configParams) {
        $BaseUI.showPrgDlg();
        if (!configParams) {
            console.error("configParams can't be null");
        }
        if (!httpParams) {
            httpParams = {};
        }
        var page = 0;
        //下拉刷新
        var pull2Refresh = configParams.pull2Refresh == false ? configParams.pull2Refresh : true;
        if (pull2Refresh) {
            $BaseUI.setPullRefresh(function() {
                page = 0;
                h.getList(url, httpParams, page, configParams);
            });
        }
        //上拉加载更多
        var loadMore = configParams.loadMore == false ? configParams.loadMore : true;
        if (loadMore) {
            $BaseUI.addPageLoadMore(function() {
                page++;
                h.getList(url, httpParams, page, configParams);
            });
        }
        h.getList(url, httpParams, page, configParams);
    }
    /**
     *封装网络访问获取网络数据 
     * @param {Object} url  网络访问地址
     * @param {Object} httpParams 网络访问参数
     * @param {Object} page 页码
     * @param {Object} configParams 配置参数
     */
    h.getList = function(url, httpParams, page, configParams) {
        httpParams.page = page;
        h.post(url, httpParams, function(ret) {
            $BaseUI.hidePrgDlg();
            $BaseUI.cancelRefresh();
            $BaseUI.hideHint();
            if (page == 0) {
                $(configParams.listBody).html('');
            }
            if (ret.length > 0) {
                $(configParams.listBody).append(configParams.dotBody(ret));
            } else {
                if ($(configParams.listBody).children().length > 0) {
                } else {
                    $BaseUI.showHint(configParams.hintPbody, configParams.emptyImg, configParams.emptyStr, function(){
                        $BaseUI.showPrgDlg();
                        $BaseUI.hideHint();
                        h.getList(url, httpParams, page, configParams);
                    });
                }
            }
        }, function(msg) {
            $BaseUI.hidePrgDlg();
            $BaseUI.cancelRefresh();
            var errorMsg = configParams.errorStr ? configParams.errorStr : '网络错误,请稍后重试！';
            if (msg) {
                errorMsg = msg;
            }
            if ($(configParams.listBody).children().length > 0) {
                if (msg) {
                    api.toast({
                        msg : errorMsg
                    });
                }
            } else {
                $BaseUI.showHint(configParams.hintPbody, configParams.errorImg, errorMsg, function(){
                    $BaseUI.showPrgDlg();
                    $BaseUI.hideHint();
                    h.getList(url, httpParams, page, configParams);
                });
            }
        });

    }
    window.$httpUtils = h;
})(window);
