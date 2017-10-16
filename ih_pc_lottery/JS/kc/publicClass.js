define(function(require, exports, module) {

    //服务器接口
    var clientRPC = '';
    var PT = require('./publicTemp');

    //连接服务器接口
    exports.serverInterface = function(post, functionName, boxName) {
        if (post['isLoad']) {} else {
            //exports.loader(true);
        }
        //检测登录
        post['isMobile'] = 1;
        post['bet_model'] = 2; //1电脑, 2手机端, 3软件
        post['host'] = "memberrpc.87dy.net.cn";
        post['uid'] = exports.getCookie('uid');
        post['accountType'] = (post['accountType']) ? (post['accountType']) : (exports.getCookie('accountType'));

        if (!exports.getCookie('host')) exports.setCookie('host', post['host']);
        if (getUrlParam('t') == 1) {
            console.log(post);
        }
        if (clientRPC == '') {

			//clientRPC = new PHPRPC_Client('http://' + exports.getCookie('host') + '/memberRPC/phprpcClass/interface.php',['serverInterface']);
			
            clientRPC = new HproseHttpClient('http://' + exports.getCookie('host') + '/phprpcClass/interface.php');
            clientRPC.onError = function(name, error) {
                console.log('test->' + name + ':' + error);
            }
            exports.loader(false);
        }
        clientRPC.invoke('serverInterface',post, function(result, args) {
			
            var result = jQuery.parseJSON(result);
			console.log(post);
			console.log(result);
            if (getUrlParam('t') == 1) {
                console.log(result);
            }
			
            if (typeof(result) != 'object') return;
			
            switch (parseInt(result['sysStatus'], 10)) {
                case 3333:
                    if (typeof(result['host']) == 'undefined') return;
                    clientRPC = '';
                    exports.setCookie('host', result['host']); //Url地址 
                    if (post["FN"] != "getSystemStatus") exports.serverInterface(post, functionName, boxName);
                    break;
                case 8888:
                    console.log(8888);
                    window.location.href = './index.php';
                    return;
                    break;
                case 6666:
                    exports.loader(false);
					
                    alert(result['up'][0]);
                    window.location = 'index.php';
                    return;
                    break
                case 5555:
                    alert('连接服务器失败, 请稍后再试!');
                    exports.loader(false);
                    break;
                case 7777:
                    functionName(result, boxName);
                    exports.loader(false);
                    break;
                default:
                    exports.loader(false);
                    break;
            }
        });

    }

    //登录
    exports.login = function() {
        var POST = {
            'isMaster': 1,
            'CN': 'User',
            'FN': 'userLogin',
            'u_name': $('#u_name').val(),
            'u_password': $('#u_password').val(),
            'accountType': 'p'
        }
        if (POST.u_name == '') {
            $('#u_name')[0].focus();
            return false;
        }
        if (POST.u_password == '') {
            $('#u_password')[0].focus();
            return false;
        }
        exports.serverInterface(POST, function(result) {
            if (parseInt(result['status']) != 7777) {
                alert(result['statusInfo']);
                return;
            }
            var thisd = new Date();
            exports.setCookie('scTime', (parseInt(result['masterTime']) * 1000 - thisd.getTime())); //客户端与主服务器的时间差   
            exports.setCookie('u_name', POST.u_name);
            exports.setCookie('uid', result['uid']);
            window.location.href = './kc.php';
        });
    }

    exports.checkName = function() {
        var uname = $('#new_name').val().trim();

        var post = {
            'isMaster': 1,
            'CN': 'User',
            'FN': 'check_name',
            'u_name': uname,
            'accountType': 'p'
        };

        exports.serverInterface(post, function(result) {
            if (result['name_use_flag'] == 1) {
                alert('用户名' + uname + '已存在');
                $('#new_name').focus();
                return;
            }
        });

    };


    exports.register = function() {
        var uname = $('#new_name').val().trim();
        var pwd = $('#new_pwd').val().trim();
        var comfirm = $('#new_comfirm').val().trim();
        var p = exports.getCookie('p');
        var phone = $('#phone').val().trim();
        var phone_code = $('#phone_code').val().trim();
        if (uname == '') {
            $('#new_name').focus();
            return;
        }
        if (pwd.length < 6) {
            alert('密码最少6位, 请重新输入');
            return;
        }
        if (pwd != comfirm) {
            alert('两次密码不一致，请重新输入.');
            return;
        }
        if (phone == '' || phone.length < 11) {
            alert('您的手机号码有误，请确认!');
            $('#phone').focus();
            return;
        }
        if (phone_code == '' || phone_code.length != 6) {
            alert('请正确输入手机接收到验证码!');
            return;
        }
        $.post('../sms/check.php', {
            'result': phone_code,
            'phonenumber': phone
        }, function(data, status) {
            if (data['status'] == 1) {
                var post = {
                    'isMaster': 1,
                    'CN': 'User',
                    'FN': 'user_register',
                    'u_name': uname,
                    'u_password': pwd,
                    'phone': phone,
                    'accountType': 'p',
                    'p': p
                };

                exports.serverInterface(post, function(result) {
                    if (result['phone_flag'] == 1) {
                        alert('您的手机号已被注册，请换个手机号再试!');
                        return;
                    }
                    if (result['register_flag'] == 1) {
                        alert('注册成功, 请用刚才注册的账户登录.');
                        window.history.go(0);
                        return;
                    } else {
                        alert('注册失败, 请稍后重试.')
                    }
                });
            } else {
                alert('验证码不正确，请重新获取');
                return;
            }

        }, 'json');


    }

    //发送验证码
    exports.sendMsg = function(e) {
        var $that = $('.send');
        if ($that.hasClass('disabled')) {
            return;
        }

        var phone = $('#phone');
        var phonenumber = phone.val().trim();
        if (phonenumber == '' || phonenumber.length < 11) {
            alert('您的手机号码有误，请确认!');
            phone.focus();
            return;
        }

        var i = 60;
        $that.addClass('disabled').text('(60s)获取');
        var timer = setInterval(function() {
            $that.text('(' + (--i) + 's)获取');
            if (i == 0) {
                $that.removeClass('disabled').text('发送验证码');
                clearInterval(timer);
            }
        }, 1000);

        $.get('../sms/index.php', {
            'phonenumber': phonenumber
        }, function(res, status) {
            console.log(res, status);
        }, 'json');

    }

    //检测客户端设备
    exports.checkClient = function() {

        // var system ={ win: false, mac:false, xll: false};
        // //检测平台
        // var p = navigator.platform;
        // system.win = p.indexOf("Win") == 0;
        // system.mac = p.indexOf("Mac") == 0;
        // system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);

        var device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|operi mini/i.test(navigator.userAgent.toLowerCase()));
        //跳转语句
        if (!device) {
            //非电脑设备
            if (getUrlParam('t') == 1) return;
            window.location.href = "http://" + window.location.host;
        } else {
            //移动设备
        }
    }

    //页面头
    exports.getPageHeader = function(backBtn, pageTitle) {
        var render = template.compile(PT['pageHeader']);
        var html = render({
            'backBtn': backBtn,
            'pageTitle': pageTitle
        });
        $('#pageMain #headerBox').html(html).trigger("create");
        //$( '#pageMain #header' ).html( html ).listview("refresh");    
    }

    //生成主页项目
    exports.getHomeImgBtn = function() {
        exports.serverInterface({
            'isMaster': 1,
            'CN': 'User',
            'FN': 'get_user_row'
        }, function(result) {
            var render = template.compile(PT['homeImgBtn']);
            var html = render(result['user_row']);
            $("#itemIcoBtn").html(html);
        });
    }

    //页面底部菜单
    exports.getPageFooter = function() {
        exports.serverInterface({
            'isMaster': 1,
            'CN': 'User',
            'FN': 'get_user_row'
        }, function(result) {
            var render = template.compile(PT['pageFooter']);
            var html = render(result['user_row']);
            $('#footer').html(html);
            $("div.footer['data-role=footer']").trigger("create");
        });
    }

    //遮罩窗口
    exports.getDialogLayer = function(objectName) {

        //显示遮罩层
        $("#maskOverlay, #dialogOverlay").fadeIn('fast');
        var render = template.compile(PT['dialog']);
        var html = render(objectName);
        $("#dialogOverlay").html(html);

        //设置位置
        var top = (objectName['top']) ? (objectName['top']) : (($(window).height() - $("#dialogOverlay").height()) / 2);
        var left = (objectName['left']) ? (objectName['left']) : (($(window).width() - $("#dialogOverlay").width()) / 2);
        $("#dialogOverlay").css({
            top: top + 'px',
            left: left + 'px'
        });

        //给按钮添加点击事件
        $('#dialogOverlay').delegate('.closeBtn,.backBtn,.noData span,.sureBtn', 'click', function() {
            $("#maskOverlay, #dialogOverlay").fadeOut('fast').html('');
        });

        //确定按钮，回调函数
        $("#dialogOverlay #sureBtn").click(function() {
            objectName['callback']();
        });

        if (objectName['addEvent']) objectName['addEvent']();

        if (objectName['downFadeOut']) setTimeout(function() {
            $('#maskOverlay, #dialogOverlay').fadeOut('slow')
        }, 600);

    };


    //创建DOM对象
    var createDOM = function(parentObj, childrenData) {

        /*var icoBtnData = [
        {'l':'a','p':{'href':'sports.html', 'rel':'external'},'c':[{'l':'dd','p':{'id':'sportsIco'}},{'l':'dt','p':{'class':'sportsIco','html':'体育'}}]},
        {'l':'a','p':{'href':'lottery.html', 'rel':'external'},'c':[{'l':'dd','p':{'id':'lotteryIco'}},{'l':'dt','p':{'html':'彩票'}}]},
        {'l':'a','p':{'href':'result.html', 'rel':'external'},'c':[{'l':'dd','p':{'id':'resultIco'}},{'l':'dt','p':{'html':'赛果/开奖'}}]},
        {'l':'a','p':{'href':'report.html', 'rel':'external'},'c':[{'l':'dd','p':{'id':'reportIco'}},{'l':'dt','p':{'html':'注单报表'}}]},
        {'l':'a','p':{'href':'account.html', 'rel':'external'},'c':[{'l':'dd','p':{'id':'accountIco'}},{'l':'dt','p':{'html':'会员中心'}}]},
        {'l':'a','p':{'href':'helf.html', 'rel':'external'},'c':[{'l':'dd','p':{'id':'helfIco'}},{'l':'dt','p':{'html':'常见问题'}}]}
        ]
        */
        if (childrenData.length > 0) {
            for (var id in childrenData) createDOM(parentObj, childrenData[id]);
        } else {
            if (typeof(childrenData['l']) == 'undefined') return;
            var childrenObj = document.createElement(childrenData['l']);
            for (var id in childrenData['p']) {
                if (id == 'html') {
                    childrenObj.innerHTML = childrenData['p'][id];
                } else {
                    childrenObj[id] = childrenData['p'][id];
                }
            }
            parentObj.appendChild(childrenObj);
            if (typeof(childrenData['c']) != 'undefined') createDOM(childrenObj, childrenData['c']);
        }
    }

    //设置Cookie
    exports.setCookie = function(name, value, expiredays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = name + "=" + escape(value) + ((typeof(expiredays) == 'undefined') ? "" : ";expires=" + exdate.toGMTString());
    }

    //获取指定名称的cookie的值
    exports.getCookie = function(objName) {
        var arrStr = document.cookie.split("; ");
        for (var i = 0; i < arrStr.length; i++) {
            var t = arrStr[i].split("=");
            if (t[0] == objName) return unescape(t[1]);
        }
    }

    //
    exports.getUrlParameter = function(param) {
        var query = window.location.search;
        var iLen = param.length;
        var iStart = query.indexOf(param);
        if (iStart == -1) return "";
        iStart += iLen + 1;
        var iEnd = query.indexOf("&", iStart);
        if (iEnd == -1) return query.substring(iStart);
        return query.substring(iStart, iEnd);
    }

    //加载动画
    exports.loader = function(opt) {
        if (opt) {
            $('body').append('<div class="spinner"></div>')
        } else {
            $('.spinner').remove();
        }
    }

    //得到url参数值
    var getUrlParam = function(key) {
        var url = window.location,
            search = url.search,
            param = search.substring(1, search.length).split("&"),
            params = {};
        for (var i = 0; i < param.length; i++) {
            params[param[i].split("=")[0]] = param[i].split("=")[1];
        }
        return params[key];
    }

    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    }
    String.prototype.ltrim = function() {
        return this.replace(/^\s+/g, '');
    }
    String.prototype.rtrim = function() {
        return this.replace(/\s+$/g, '');
    }
    String.prototype.encodeHTML = function() {
        return this.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/ /g, "&nbsp;")
            .replace(/\'/g, "&#39;")
            .replace(/\"/g, "&quot;")
            .replace(/\n/g, "<br>");
    };


    /**
     * 设置URL参数
     * @param [key] 参数名[可以是{key1:val1,key2:val2,...}]
     * @param [val] 参数值
     * @return origin + pathname + params
     */
    
	exports.setLocationParam = function(key,val){

		var hostname = window.location.hostname;
		var pathname = window.location.pathname;
		var search = window.location.search;
		var objs = {};
		var strs = '';
		var param = [];
		var params = [];
		if(search){
			search = search.split('?')[1];
			params = search.split('&');
			for(var i=0,len=params.length;i<len;i++){
				param = params[i].split('=');
				objs[param[0]] = param[1];
			}
		}

		if(typeof(key) === 'string'){
			objs[key] = val;
		}else if(typeof(key) === 'object'){
			for(var i in key){
				objs[i] = key[i];
			}
		}
		for(var i in objs){
			strs += i+'='+objs[i]+'&';
		}

		return pathname + '?' + strs.substring(0,strs.length-1);
	}
	

    /**
     * URL参数转Object
     * @param search : window.location.search
     */
    exports.urlParams2Obj = function(search) {
        var objs = {};
        search.replace(/[?&](\w+)=?([^&]*)/g, function(m, k, v) {
            objs[k] = v;
        });
        return objs;
    }

    function reload() {
        var v = exports.getCookie('version');
        var r = exports.getCookie('r');
        if (exports.getUrlParameter('v') == v || exports.getUrlParameter('r')) return;
        else window.location.href = exports.setLocationParam({
            'v': v
        });
    }
    reload();



});