/**
 * 基本UI封装
 * @author lifei
 * @param {Object} id
 */
(function(window) {
    var v = {};
    /**
     *底部带两个按钮的确认框
     * @title 标题
     * @content 内容
     * @btn1 左边按钮文字
     * @btn2 右边按钮文字
     * @func1 左边按钮点击事件
     * @func2 右边按钮点击事件 
     */
    v.confirm = function(title, content, btn1, btn2, func1, func2) {
        if (!btn1) {
            alert("btn1不能为空！");
            return;
        }
        if (!btn2) {
            alert("btn2不能为空！");
            return;
        }
        if (!content) {
            alert("提示内容不能为空！");
            return;
        }
        api.confirm({
            title : title ? title : '提示',
            msg : content,
            buttons : [btn1, btn2]
        }, function(ret, err) {
            switch(ret.buttonIndex) {
                case 1:
                    if (func1) {
                        func1();
                    }
                    break;
                case 2:
                    if (func2) {
                        func2();
                    }
                    break;
            }
        });
    };

    /**
     *底部弹出框
     * @author lifei
     * @param title 标题
     * @param buttons 按钮（字符串数组类型
     * @param cancel 取消按钮（字符串类型
     * @param func 选择回调函数）
     * ret
     * {
     *   buttonIndex:1        //按钮点击序号，从1开始
     * }）
     */
    v.actionSheet = function(title, buttons, cancel, func) {
        api.actionSheet({
            title : title,
            cancelTitle : cancel,
            buttons : buttons,
            style : {
                layerColor : '#C0C0C0', //遮蔽层颜色，仅支持 rgba颜色，默认值：rgba（0, 0, 0, 0.4）
                itemNormalColor : '#FFFFFF', //选项按钮正常状态背景颜色，支持#000、#000000、rgb、rgba，默认值：#F1F1F1
                itemPressColor : '#F5F5F5', //选项按钮按下时背景颜色，支持#000、#000000、rgb、rgba，默认值：#E6E6E6
                fontNormalColor : '#696969', //选项按钮正常状态文字颜色，支持#000、#000000、rgb、rgba，默认值：#007AFF
                fontPressColor : '#D3D3D3', //选项按钮按下时文字颜色，支持#000、#000000、rgb、rgba，默认值：#0060F0
                titleFontColor : '#000000' //标题文字颜色，支持#000、#000000、rgb、rgba，默认值：#8F8F8F
            }
        }, function(ret, err) {
            if (func) {
                if (ret.buttonIndex) {
                    func(ret.buttonIndex);
                }
            }
        });
    }
    /**
     *数据选择器
     * data:数据源 格式参照    http://docs.apicloud.com/Client-API/UI-Layout/UIActionSelector
     * colNum:数据展示列数
     * func:选择数据后调用的函数
     */
    v.showActionSelector = function(data, colNum, func) {
        var actionSelector = api.require('UIActionSelector');
        actionSelector.open({
            datas : data,
            layout : {
                row : 5,
                col : colNum,
                height : 30,
                size : 12,
                sizeActive : 14,
                rowSpacing : 5,
                colSpacing : 10,
                maskBg : 'rgba(0,0,0,0.2)',
                bg : '#fff',
                color : '#888',
                colorActive : '#f00',
                colorSelected : '#f00'
            },
            animation : true,
            cancel : {
                text : '取消',
                size : 12,
                w : 90,
                h : 35,
                bg : '#00ffffff',
                bgActive : '#00ffffff',
                color : '#ccc',
                colorActive : '#ccc'
            },
            ok : {
                text : '确定',
                size : 12,
                w : 90,
                h : 35,
                bg : '#00ffffff',
                bgActive : '#00ffffff',
                color : '#ffc107',
                colorActive : '#ffc107'
            },
            title : {
                text : '请选择',
                size : 20,
                h : 44,
                bg : '#fff',
                color : '#ccc'
            }
        }, function(ret, err) {
            if (ret) {
                if (ret.eventType == "ok") {
                    if (func) {
                        func(ret);
                    }
                }
            } else {
                alert(JSON.stringify(err));
            }
        });
    };
    /**
     * 学期选择器
     * @author
     * data:数据源 格式参照    http://docs.apicloud.com/Client-API/UI-Layout/UICustomPicker
     * data : 数据源
     * func:选择数据后调用的函数
     */
    v.showTermSelector = function(data, func) {

        var UICustomPicker = api.require('UICustomPicker');
        UICustomPicker.open({
            rect : {
                x : 60,
                y : api.frameHeight / 2 - 170,
                w : api.frameWidth - 60,
                h : 360
            },
            styles : {
                bg : 'rgba(0,0,0,0)',
                normalColor : '#959595',
                selectedColor : '#3685dd',
                selectedSize : 20,
                tagColor : '#3685dd',
                tagSize : 10
            },
            data : [{
                tag : '',
                scope : data
            }],
            rows : 3,
            fixedOn : api.frameName,
            fixed : true,
        }, function(ret, err) {
            if (ret) {
                if (ret.eventType == "selected") {
                    if (func) {
                        func(ret);
                    }
                }
            } else {
                alert(JSON.stringify(err));
            }
        });
    };
    /**
     * 展示进度框
     * @author lifei
     * @param {Object} content
     */
    v.showPrgDlg = function(content) {
        api.showProgress({
            style : 'default',
            animationType : 'fade',
            title : content ? content : '加载中...',
            modal : true
        });
    };
    /**
     * 隐藏进度框
     * @author lifei
     */
    v.hidePrgDlg = function() {
        api.hideProgress();
    };
    /**
     * 设置下拉刷新（需要在 apiready 后执行）
     * @author lifei
     * act 下拉刷新时执行的方法
     */
//  v.setPullRefresh = function(act) {
//      api.setCustomRefreshHeaderInfo({
//          bgColor : '#eee',
//          images : ['widget://image/refresh/1.png', 'widget://image/refresh/2.png', 'widget://image/refresh/3.png', 'widget://image/refresh/4.png', 'widget://image/refresh/5.png', 'widget://image/refresh/6.png', 'widget://image/refresh/7.png', 'widget://image/refresh/8.png'],
//          tips : {
//              pull : '下拉刷新',
//              threshold : '松开立即刷新',
//              load : '正在刷新'
//          }
//      }, function() {
//          if (act) {
//              act();
//          }
//          //在这里从服务器加载数据，加载完成后调用api.refreshHeaderLoadDone()方法恢复组件到默认状态
//      });
//  };
    /**
     * 设置下拉刷新（需要在 apiready 后执行）
     * @author lifei
     * act 下拉刷新时执行的方法
     * 使用详情请参考AUI下拉刷新
     */
    v.setPullRefresh = function(func) {
        var pullRefresh = new auiPullToRefresh({
            container : document.querySelector('.aui-refresh-content'),
            triggerDistance : 100
        }, function(ret) {
            if (ret.status == "success") {
                if(func){
                    func();
                }
                //刷新成功后调用此方法隐藏
            }
        });
        window.pr = pullRefresh;
    };

    /**
     * 完成下拉刷新（需要在 apiready 后执行）
     * @author lifei
     */
//  v.cancelRefresh = function() {
//      api.refreshHeaderLoadDone();
//  };
    v.cancelRefresh = function() {
        window.pr.cancelLoading();
    };

    v.addPageLoadMore = function(func) {
        api.addEventListener({
            name : 'scrolltobottom',
            extra : {
                threshold : 0 //设置距离底部多少距离时触发，默认值为0，数字类型
            }
        }, function(ret, err) {
            if (func) {
                func();
            }
        });
    }
    /**
     * 打开Frame
     * @param {Object} _name
     * @param {Object} _url
     */
    v.openFrame = function(_name, _url, param) {
        api.openFrame({
            name : _name,
            url : _url,
            rect : {
                x : 0,
                y : 45,
                w : 'auto',
                h : 'auto'
            },
            pageParam : param
        });
    }
    /**
     * 打开新窗口并关闭本窗口
     * @param {Object} _name
     * @param {Object} _url
     */
    v.closeToWin = function(_name, _url, param) {
        api.openWin({
            name : _name,
            url : _url,
            bounces : false,
            slidBackEnabled : false,
            pageParam : param,
            animation : {
                type : 'ripple'
            }
        });
        api.closeWin();
    }
    /**
     * 打开新窗口
     * @param {Object} _name
     * @param {Object} _url
     */
    v.openWin = function(_name, _url, param) {
        api.openWin({
            name : _name,
            url : _url,
            bounces : false,
            slidBackEnabled : false,
            pageParam : param,
            animation : {
                type : 'none'
            }
        });
    }
    /**
     *关闭窗口 
     */
    v.closeWin = function() {
        api.closeWin();
    }
    /**
     * 显示提示页面
     * @param {Object} pBody    想要展示本页面的容器标签
     * @param {Object} hintImg  提示页面图片
     * @param {Object} hintText 提示页面标题
     * @param {Object} func 提示页面点击事件
     */
    v.showHint = function(pBody,hintImg,hintText,func){
        if($('#hintPage')){
            $('#hintPage').remove();
        }
        if(pBody){
            $(pBody).before(
	"        <div id=\"hintPage\" style=\"width:100%;margin-top:150px;\">"+
	"            <img id=\"hintImage\" src=\"../../image/zanwushuju.png\" style=\"display:block; width:60%; margin:0 auto;\">"+
	"            <p id=\"hintLable\" style=\"display:block; margin:6px auto; text-align:center; font-size:16px;\">"+
	"                暂无数据！"+
	"            </p>"+
	"        </div>");
           $(pBody).hide();
        }else{
            $('body').before(
	"        <div id=\"hintPage\" style=\"width:100%;margin-top:150px;\">"+
	"            <img id=\"hintImage\" src=\"../../image/zanwushuju.png\" style=\"display:block; width:60%; margin:0 auto;\">"+
	"            <p id=\"hintLable\" style=\"display:block; margin:6px auto; text-align:center; font-size:16px;\">"+
	"                暂无数据！"+
	"            </p>"+
	"        </div>"
            );
            $('body').hide();
        }
        if(hintImg){
            $('#hintImage').attr("src",hintImg);
        }
        if(hintText){
            $('#hintLable').html(hintText);
        }
        $("#hintPage").click(function(){
            if(func){
                func();
            }
        });
    }
    /**
     *隐藏提示页面 
     */
    v.hideHint = function(pBody){
        if($('#hintPage')){
            $('#hintPage').remove();
        }
        if(pBody){
        
            $(pBody).show();
        }else{
            $('body').show();
        }
    }
    
    window.$BaseUI = v;
})(window);
