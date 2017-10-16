/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-9-6
 * Time: 上午10:09
 * To change this template use File | Settings | File Templates.
 */
//初始化远程RPC方法
function initRpcObj() {};

//这个函数每一秒都会执行一次
function MasterTimer() { };

//得到容器在浏览器中的位置
function boxPosition(){
    var k3Content = document.getElementById('k3Content'), gao = document.documentElement.clientHeight - 690;
    if (gao < 0){
        //兼容chrome浏览器window.open()参数的差异
        var ua = navigator.userAgent.toLowerCase();
        if (/chrome/.test(ua)){ window.resizeTo(976, 752); }

        k3Content.style.marginTop = "0px";
        return false;
    }else{
        k3Content.style.marginTop = Math.floor(gao/2) + "px";
    }
}

var k3 = (function ($, Csh){

    //这个对象用于存放页面的所有数据
    var k3Data = {
        k3SeverData: {}, //用于存放从服务器里面返回的数据
        localData: {game_lx: 0, updatesTime: 30, periods: 0, u_name: "", u_money_cp: 0, btnKG: true, userSelMoney: 0, newSel: true, subData: true},
        countdown: {}, //用于存放快3的倒数时间
        uesrData:{},
        betData: {}, //用于存放投注的金额、玩法名称等等
        storageData: {}, //存放提交注单后返回的数据
        selBetData: { //存放已选注单的位置的
            KSDX: ['DXSel', '快3大小'], KSYY: ['DXSel', '单选'], KSEBT: ['EBTHSel', '二不同号'], KSDZ: ['ETHDXSel', '二同号单选'], KSETD: ['ETHDXSel', '二同号单选'], KSDS: ['DXSel', '单双'],
            KSDZZ: ['ETHFXSel', '二同号复选'], KSSZ: ['SLHTXSel', '三连号通选'], KSSBT: ['SBTHSel', '三不同号'], KSBZ: ['STHSel', '三同号单选'], KSBZZ: ['STHSel', '三同号通选'], KSZH: ['HZSel', '和值'],
            KSYD: ['DXSel', '有无对']
        },
        ZMChangeZW: { //字母转换中文
            bz: '1-6三同号', z: '复选', d: '大', x: '小', sz: '三连号', dan: '单', s:'双', yd:'有对', wd: '无对'
        }
    };

    //这个对象用于存放内部调用的JS代码
    var internal = {
        //投注提示
        bettingAlert: function (status){
            if( typeof( status ) == 'undefined' ){
                alertBox("", "系统维护中，请稍后再试[4]！", "");
                return false;
            }

            switch(status){
                case 7777: return true; break;
                case 6001: case 6002: case 6003: alertBox( '', contentHtml="暂停下注！", '' ); return false; break;
                case 6666: alertBox( boxType=3, contentHtml="系统维护中，请稍后再试[5]！", btFunction='' ); return false; break;
                case 8001: alertBox( '', contentHtml="账户未激活，请激活后再试！", btFunction='' ); return false; break;
                case 8002: alertBox( '', contentHtml="账户已被暂停投注，请与客服联系！", btFunction='' ); return false; break;
                case 8003: alertBox( '', contentHtml="很抱歉，单注投注金额小于最低限制！", btFunction='' ); return false; break;
                case 8004: alertBox( '', contentHtml="很抱歉，单注投注金额大于最高限制！", btFunction='' ); return false; break;
                case 8005: alertBox( '', contentHtml="很抱歉，已超出单场投注限制！", btFunction='' ); return false; break;
                case 8006: alertBox( '', contentHtml="很抱歉，账户余额不足！", btFunction='' ); return false; break;
                default: alertBox( boxType=3, contentHtml="系统维护中，请稍后再试[6]！", btFunction='' ); return false; break;
            }
        },

        //返回拿到数据的状态
        oddsStatus: function(){
            var ZhuangTai = k3Data['k3SeverData']['data']['gameStatus'], statusHtml = [];
            $("#ksStatus, #KSBG").css({display: "block"});
            if (ZhuangTai['status'] !== 1){
                statusHtml.push('<div class="loadContent">第 <b>'+ ZhuangTai['periods2'] +'</b>期&nbsp&nbsp开盘时间:<b>'+ ZhuangTai['xztime'] +'</b></div>');
                statusHtml.push('<div class="loadBox">');
                statusHtml.push('<div class="loadBox01">第 <b style="color: #d00;">'+ ZhuangTai['periods2'] +'</b> 期</div>');
                statusHtml.push('<div class="loadBox02">盘势准备中. . .</div>');
                statusHtml.push('<img src="style/images/loading02.gif" class="loadBox04" />');
                statusHtml.push('</div>');

                //数据状态为3
                if (ZhuangTai['status'] == 3){
                    statusHtml = [];
                    statusHtml.push('<div style="padding-left: 10px; width: 347px; margin: 0 auto; margin-top: 130px; text-align: center;">第 <b style="color: #d00; font-size: 14px;">'+ ZhuangTai['periods2'] +'</b> 期</div>');
                    statusHtml.push('<div style="padding-left: 10px; width: 500px; margin: 0 auto; margin-top: 4px; text-align: center;">开盘时间：<b style="color: #d00; font-size: 14px;">'+ ZhuangTai['xztime'] +'</b>&nbsp&nbsp&nbsp&nbsp开奖时间：<b style="color: #d00; font-size: 14px;">'+ ZhuangTai['openPantime'] +'</b></div>');
                    statusHtml.push('<div class="loadBox">');
                    statusHtml.push('<div class="loadBox01">游戏结束</div>');
                    statusHtml.push('<div class="loadBox02">等待开始中. . .</div>');
                    statusHtml.push('<img src="style/images/loading02.gif" class="loadBox04" />');
                    statusHtml.push('</div>');
                }

                $("#ksStatus").html(statusHtml.join(''));
                return false;
            }else{
                $("#ksStatus, #KSBG").css({display: "none"});
            }
        },

        //返回全大写 或全小写字符
        getDaXiaoString: function (str, getType){
            var resultStr = '';
            for( var i=0; i<str.length; i++ ){
                var c = str.charAt(i);
                if( c <'A' || c >'Z' ){
                    var type = 'x';
                }else{
                    var type = 'd';
                }
                if( getType == type ) resultStr += c;
            }
            return resultStr;
        },

        //加载选择了的投注到已选菜单
        setBetFn: function (){
            var betData = k3Data['betData'];
            $("#allBetMenu li").html('');
            for (var id in betData){
                var divHtml = [], zw = k3Data['selBetData'][betData[id]['play_lx']][1];
                divHtml.push('<div id="bet'+ id +'" class="betList">');
                divHtml.push('<div title="'+ zw +'" class="betList01">'+ zw +'</div>');
                divHtml.push('<div class="betList03"></div>');

                var betObjStr = /[a-zA-Z]+/.exec(betData[id]['bet_obj']);
                var betObjNo = /[0-9]+/.exec(betData[id]['bet_obj']);
                var betNo = "";
                (!betObjStr) ? betObjStr = "" : betObjStr = k3Data['ZMChangeZW'][betObjStr];

                if (betObjNo){
                    for (var i = 0, len = betObjNo[0].split("").length; i < len; i++){
                        (i === 0) ? betNo += betObjNo[0][i] : betNo += ' ' + betObjNo[0][i];
                    }
                }

                if (betData[id]['play_lx'] === "KSZH"){betNo = betObjNo[0];}
                divHtml.push('<div title="'+ betData[id]['betMoney'] +'" class="betList02">'+ betObjStr + betNo +' @'+ betData[id]['betMoney'] +'</div>');

                divHtml.push('</div>');
                $("#" + k3Data['selBetData'][betData[id]['play_lx']][0]).append(divHtml.join(''));
            }
        },

        //给筹码添加点击事件
        clickMoney: function (){
            var selMoney = $(this).attr('class').match(/\d+/)[0];
            $("#k3Content").css({cursor: "url(../style/images/"+ $(this).attr('class') +".ico), pointer"});

            //safari、opera不支持cursor的url值,做兼容
            var ua = navigator.userAgent.toLowerCase();
            if (/opera/.test(ua) || /version.*safari/.test(ua)){ $("#k3Content").css({cursor: "pointer"}); }

            k3Data['localData']['userSelMoney'] = selMoney;
        },

        //删除已选投注容器中的投注信息
        delBetList: function (){
            var nameId = $(this).parent().attr('id');
            var IDName = nameId.split(/bet/)[1];
            var idName = nameId.split(/betKS/)[1];
            if (IDName == undefined){IDName = nameId.split(/bet/);}
            if (idName == undefined){idName = nameId.split(/betKS/);}

            //删除显示背景颜色的class
            $("#" + idName).removeClass($("#" + idName).attr('class').split(' ')[1]);

            $(this).parent().remove();
            $("#" + IDName).remove();
            delete k3Data['betData'][IDName];   //加载选择了的投注到已选菜单
            $("#selNote").html('已选'+ ($("#betMenu div").length + $("#betMenuRX div").length) +'注');
        },

        //更新彩票数据共用代码
        comData: function (){
            var localData = k3Data['localData'], gameStatus = k3Data['k3SeverData']['data']['gameStatus'];
            localData['game_lx'] = gameStatus['game_lx'];
            localData['periods'] = gameStatus['periods'];

            //开奖结果和开奖期号
            var qerArr = k3Data['k3SeverData']['gameResult']['qer'].split('-');
			var numArr = [];
			var gameResult = k3Data['k3SeverData']['gameResult'];
            $("#gamePeriod").html('第'+ qerArr[1] +'期结果');

            for (var id in gameResult['px']) {
                numArr.push(gameResult['number'][gameResult['px'][id]]['num']);
            }
            $("#lotteryNo").html('<div class="dice'+ numArr[0] +'"></div><div class="dice'+ numArr[1] +'"></div><div class="dice'+ numArr[2] +'"></div>');

            //当前下注的期号
            var periods = gameStatus['periods'].split('-')[1];
            $("#curPeriod").html('第'+ periods +'期' + getGameSatusName(gameStatus['status']));

            //显示当前彩票种类中文名字
            $("#curName").removeClass().addClass('gameName gameName' + k3Data['localData']['game_lx']);

            //加载前10期的开奖结果
            var k3ResultArr = [];
            if (!k3Data['k3SeverData']['ksResult']){
                k3ResultArr.push('<li style="margin-top: 9px;"><div class="k3ResultPer">期数</div><div class="k3ResultPer01">结果</div><div class="k3Mun">点数</div><div class="k3DX">大小</div></li>');
                $("#resultBox").html(k3ResultArr.join(''));
            }else{
                var l = k3Data['k3SeverData']['ksResult']['number'];
                k3ResultArr.push('<li style="margin-top: 9px;"><div class="k3ResultPer">期数</div><div class="k3ResultPer01">结果</div><div class="k3Mun">点数</div><div class="k3DX">大小</div></li>');
                for(var i = 0, len = l['ksperiods'].length; i < len; i++){
                    k3ResultArr.push('<li><div class="k3ResultPer">'+ l['ksperiods'][i] +'</div><div class="k3ResultPer01">'+ l[l['ksperiods'][i]]['Y'] +'&nbsp&nbsp'+ l[l['ksperiods'][i]]['E'] +'&nbsp&nbsp'+ l[l['ksperiods'][i]]['S'] +'</div>');
                    k3ResultArr.push('<div class="k3Mun">'+ l[l['ksperiods'][i]]['H'] +'</div><div class="k3DX">'+ l[l['ksperiods'][i]]['W'] +'</div></li>');
                }
                $("#resultBox").html(k3ResultArr.join(''));
            }

            //初始化倒数时间并且显示快3的种类
            var html = [];
            html.push('<ul>');
            for (var id in gameStatus['gameLX']){
                if (!gameStatus['gameLX'][id]){continue;}
                k3Data['countdown'][id] = gameStatus['gameLX'][id]['latetime'];

                //显示快3的种类
                var ClassName = "k3Box05_btn02";
                if (id == k3Data['localData']['game_lx']){ ClassName = "k3Box05_btn01"; }
                html.push('<li id="YX_'+ id +'" class="'+ ClassName +'">'+ gameStatus['gameLX'][id]['game_name'] +'<div class="k3status'+ gameStatus['gameLX'][id]['status'] +'"></div></li>');
            }
            html.push('</ul>');
            $("#allGame").html(html.join(''));
			

            //彩票种类按钮点击事件
            $("#allGame li").click(internal['clickGameLx']);
            $("#allGame li").mouseover(internal['overGameLx']);
            $("#allGame li").mouseout(internal['outGameLx']);

            //路子点击事件加载
            $("#LuZhi").unbind('click', internal['selLuZhiFn']);
            $("#LuZhi").click(internal['selLuZhiFn']);

            //关闭路子点击事件加载
            $("#colesLZ").unbind('click', internal['colseLuZhiFn']);
            $("#colesLZ").click(internal['colseLuZhiFn']);

            //加载路子结果
            //排列获取到的数据
            //console.log(k3Data)
            var LuZhiArr = [], number = k3Data['k3SeverData']['ksResult']['number'], resylt = "", sum = 0;
            LuZhiArr[sum] = [];
            for (var i = number['periods'].length - 1, len = 0; i >= len; i--){
                var period = number['periods'][i].split('-')[1];
                if (resylt != "" && number[period]['W'] != resylt && number[period]['W'] != "围"){
                    ++sum;
                    LuZhiArr[sum] = [];
                }
                LuZhiArr[sum].push('<a href="javascript:void(0)" name="'+ number['periods'][i] +'">'+ number[period]['W'] +'</a>');
                if (number[period]['W'] !== "围"){ resylt = number[period]['W']; }
            }

            //遍历排列好的数组得到结果
            var liArr = [];
            for (var i = 0, len = LuZhiArr.length; i < len; i++){
                liArr.push('<li>'+ LuZhiArr[i].join('') +'</li>');
            }
            $("#resultLZ").html(liArr.join(''));
            $("#resultLZ").css({width: ($("#resultLZ li").length * 24) + 'px'});

            //路子结果鼠标移入移出事件
            $("#resultLZ a").mouseover(function (){
                var periodArr = $(this).attr('name').split('-')[1];
                $("#mousePeriod").html("第 " + $(this).attr('name') + " 期 ["+ number[periodArr]['Y'] +"]["+ number[periodArr]['E'] +"]["+ number[periodArr]['S'] +"]");
            });
            $("#resultLZ a").mouseout(function (){
                $("#mousePeriod").html('');
            });

            boxPosition();   //得到容器在浏览器中的位置

            internal['oddsStatus'](); //检测返回的数据的状态

            //如果用户名为真
            if (Csh['getCookie']('uid')){
                var post = {'actID':301, 'uid':Csh['getCookie']('uid'), 'game_lx':k3Data['localData']['game_lx'], 'play_lx':'ks' };
				getServerData( post, 'k3Data["uesrData"]', function (){
					console.log(post);
                    $("#userName").html(k3Data["uesrData"]['data']['u_name']);
                    $("#userMoney").html(k3Data["uesrData"]['data']['u_money_cp']);
                    k3Data['localData']['u_name'] = k3Data["uesrData"]['data']['u_name'];
                    k3Data['localData']['u_money_cp'] = k3Data["uesrData"]['data']['u_money_cp'];

                    var userMoney = parseFloat(k3Data['localData']['u_money_cp']);
                    if (userMoney < 5){ $("#chipMoney01").html('<li class="money1"></li>'); }

                    if (userMoney < 10 && userMoney >= 5){ $("#chipMoney01").html('<li class="money5"></li><li class="money1"></li>'); }

                    if (userMoney < 50 && userMoney >= 10){ $("#chipMoney01").html('<li class="money10"></li><li class="money5"></li><li class="money1"></li>'); }

                    if (userMoney < 100 && userMoney >= 50){ $("#chipMoney01").html('<li class="money50"></li><li class="money10"></li><li class="money5"></li><li class="money1"></li>'); }

                    if (userMoney < 1000 && userMoney >= 100){
                        $("#chipMoney01").html('<li class="money50"></li><li class="money10"></li><li class="money5"></li><li class="money1"></li>');
                        $("#chipMoney02").html('<li class="money100"></li>');
                    }

                    if (userMoney < 5000 && userMoney >= 1000){
                        $("#chipMoney01").html('<li class="money50"></li><li class="money10"></li><li class="money5"></li><li class="money1"></li>');
                        $("#chipMoney02").html('<li class="money100"></li><li class="money1000"></li>');
                    }

                    if (userMoney >= 5000){
                        $("#chipMoney01").html('<li class="money50"></li><li class="money10"></li><li class="money5"></li><li class="money1"></li>');
                        $("#chipMoney02").html('<li class="money100"></li><li class="money1000"></li><li class="money5000"></li>');
                    }

                    //给筹码添加点击事件
                    $("#chipMoney01 li, #chipMoney02 li").click(internal['clickMoney']);
                });
            }else{
                $("#chipMoney01").html('<li class="money50"></li><li class="money10"></li><li class="money5"></li><li class="money1"></li>');
                $("#chipMoney02").html('<li class="money100"></li><li class="money1000"></li><li class="money5000"></li>');

                //给筹码添加点击事件
                $("#chipMoney01 li, #chipMoney02 li").click(internal['clickMoney']);
            }
        },

        timer1: null, //一个定时器

        timer2: null, //一个定时器

        timer3: null, //一个定时器

        //任选号码按钮点击事件
        selNumFn: function (){
            if (parseInt($("#OptionalNo").css('top'), 10) <= 272){
                internal['colseFn']();
                return false;
            }

            var speedPx = 14;
            clearInterval(internal['timer1']);
            internal['timer1'] = setInterval(function (){
                var topNo = parseInt($("#OptionalNo").css('top'), 10);
                if (topNo > 272){
                    $("#OptionalNo").css({top: (topNo - speedPx) + "px"});
                }else{
                    $("#OptionalNo").css({top: "272px"});
                    clearInterval(internal['timer1']);
                }
            }, 30);
            $("#OptionalNo").css({zIndex: parseInt($("#betSel").css('zIndex'), 10) + 1});
        },

        //关闭任选号码按钮点击事件
        colseFn: function (){
            var speedPx = -14;
            clearInterval(internal['timer1']);
            internal['timer1'] = setInterval(function (){
                var topNo = parseInt($("#OptionalNo").css('top'), 10);
                if (topNo < 660){
                    $("#OptionalNo").css({top: (topNo - speedPx) + "px"});
                }else{
                    $("#OptionalNo").css({top: "660px"});
                    clearInterval(internal['timer1']);
                }
            }, 30);
        },

        //点击已选X注按钮事件
        selNoteFn: function (){
            if (parseInt($("#betSel").css('top'), 10) <= 272){
                internal['colseSelBtn']();
                return false;
            }

            var speedPx = 14;
            clearInterval(internal['timer2']);
            internal['timer2'] = setInterval(function (){
                var topNo = parseInt($("#betSel").css('top'), 10);
                if (topNo > 272){
                    $("#betSel").css({top: (topNo - speedPx) + "px"});
                }else{
                    $("#betSel").css({top: "272px"});
                    clearInterval(internal['timer2']);
                }
            }, 30);
            $("#betSel").css({zIndex: parseInt($("#OptionalNo").css('zIndex'), 10) + 1});
        },

        //关闭已选注单按钮点击事件
        colseSelBtn: function (){
            var speedPx = -14;
            clearInterval(internal['timer2']);
            internal['timer2'] = setInterval(function (){
                var topNo = parseInt($("#betSel").css('top'), 10);
                if (topNo < 660){
                    $("#betSel").css({top: (topNo - speedPx) + "px"});
                }else{
                    $("#betSel").css({top: "660px"});
                    clearInterval(internal['timer2']);
                }
            }, 30);
        },

        //路子按钮点击事件
        selLuZhiFn: function (){
            if (parseInt($("#lookLuZhi").css('top'), 10) <= 272){
                internal['colseLuZhiFn']();
                return false;
            }

            var speedPx = 14;
            clearInterval(internal['timer3']);
            internal['timer3'] = setInterval(function (){
                var topNo = parseInt($("#lookLuZhi").css('top'), 10);
                if (topNo > 272){
                    $("#lookLuZhi").css({top: (topNo - speedPx) + "px"});
                }else{
                    $("#lookLuZhi").css({top: "272px"});
                    clearInterval(internal['timer3']);
                }
            }, 30);
        },

        //关闭路子按钮点击事件
        colseLuZhiFn: function (){
            var speedPx = -14;
            clearInterval(internal['timer3']);
            internal['timer3'] = setInterval(function (){
                var topNo = parseInt($("#lookLuZhi").css('top'), 10);
                if (topNo < 660){
                    $("#lookLuZhi").css({top: (topNo - speedPx) + "px"});
                }else{
                    $("#lookLuZhi").css({top: "660px"});
                    clearInterval(internal['timer3']);
                }
            }, 30);
        },

        //鼠标移入事件
        overGameLx: function (){
            $(this).css({backgroundPosition: "0px -396px", color: "#FFCC00"});
        },

        //鼠标移出事件
        outGameLx: function (){
            $(this).removeAttr('style');
        },

        //显示筹码删除按钮鼠标移入事件
        showMoneyFn: function (){
            $("#" + $(this).attr("id") + " span").css({display: "block"});
        },

        //显示筹码删除按钮鼠标移出事件
        delMoneyFn: function (){
            $("#" + $(this).attr("id") + " span").css({display: "none"});
        },

        //删除单个投注金额
        delOneBetFn: function (){
            //删除显示背景颜色的class
            var idName = $(this).parent('div').attr('id').split(/KS/)[1];
            if (idName == undefined){idName = $(this).parent('div').attr('id').split(/KS/);}
            $("#" + idName).removeClass($("#" + idName).attr('class').split(' ')[1]);

            $(this).parent().remove();
            delete k3Data['betData'][$(this).parent().attr('id')];   //加载选择了的投注到已选菜单

            internal['setBetFn'](); //加载选择了的投注到已选菜单

            var num = $("#betMenu div").length + $("#betMenuRX div").length
            $("#selNote").html('已选'+ num +'注');

            //改变提交数据按钮的样式
            if (num <= 0){
                $("#btnServer").removeClass().addClass('gameBtn01');
            }

            //添加事件
            internal['betPublicCode01']();
        },

        //彩票种类按钮点击事件
        clickGameLx: function (){
            var gameLx = $(this).attr("id").split('_')[1];

            $("#allGame li").removeClass().addClass('k3Box05_btn02');
            $(this).removeClass().addClass('k3Box05_btn01');
            $("#flicker").css({display: 'block'});
            //console.log(123)
            var post = {'actID': 201, 'game_lx': gameLx, 'cp_type': 'ks', 'panType': 'zsp', 'msTime': Csh['getCookie']( 'msTime' ) }
            getServerData(post, "k3Data['k3SeverData']", function (){
                var localData = k3Data['localData'], gameStatus = k3Data['k3SeverData']['data']['gameStatus'];
                //console.log(k3Data['k3SeverData'])
                internal['comData'](); //调用共用函数

                for (var id in gameStatus['gameLX']){
                    k3Data['countdown'][id] = gameStatus['gameLX'][id]['latetime'];
                }

                //投注注单等清空
                internal['delSelFn']();

                $("#flicker").css({display: 'none'});
            });
        },

        //清空所有已选的投注
        delSelFn: function (){
            var divBoxArr = $("#betMenu div, #betMenuRX div");
            for (var i = 0, len = divBoxArr.length; i < len; i++){
                //删除显示背景颜色的class
                var idName = divBoxArr.eq(i).attr('id').split(/KS/)[1];
                if (idName == undefined){idName = divBoxArr.eq(i).attr('id').split(/KS/);}
                $("#" + idName).removeClass($("#" + idName).attr('class').split(' ')[1]);
            }

            $("#betMenu, #betMenuRX").html('');
            k3Data['betData'] = {};
            $("#btnServer").removeClass().addClass('gameBtn01');
//            $("#k3Content").removeAttr('style');
            boxPosition();   //得到容器在浏览器中的位置
//            k3Data['localData']['userSelMoney'] = 0;
            $("#btnNote").html('<div id="selNote">已选0注</div><div id="delSel">清空已选</div>');
            $("#allBetMenu li").html('');
            internal['colseFn']();
            internal['colseSelBtn']();
        },

        //点击下注公共代码
        betPublicCode: function (){
            //动态添加已选投注
            $("#btnNote").html('<div id="selNote">已选'+ ($("#betMenu div").length + $("#betMenuRX div").length) +'注</div><div id="delSel">清空已选</div>');

            //点击已选X注按钮事件
            $("#selNote").unbind('click', internal['selNoteFn']);
            $("#selNote").click(internal['selNoteFn']);

            //清空所有已选的投注
            $("#delSel").unbind('click', internal['delSelFn']);
            $("#delSel").click(internal['delSelFn']);

            //鼠标移入显示删除交叉
            $("#betMenu div, #betMenuRX div").unbind('mouseover', internal['showMoneyFn']);
            $("#betMenu div, #betMenuRX div").mouseover(internal['showMoneyFn']);

            //鼠标移出隐藏删除交叉
            $("#betMenu div, #betMenuRX div").unbind('mouseout', internal['delMoneyFn']);
            $("#betMenu div, #betMenuRX div").mouseout(internal['delMoneyFn']);
        },

        //点击下注公共代码01
        betPublicCode01: function (){
            //鼠标移到已选投注容器中的投注信息显示背景颜色
            $("#allBetMenu div").mouseover(function (){
                $("#" + $(this).attr('id') + " .betList03").css({display: "block"});
            });

            //鼠标移出已选投注容器中的投注信息显示背景颜色
            $("#allBetMenu div").mouseout(function (){
                $("#" + $(this).attr('id') + " .betList03").css({display: "none"});
            });

            //删除已选投注容器中的投注信息
            $("#allBetMenu .betList03").unbind('click', internal['delBetList']);
            $("#allBetMenu .betList03").click(internal['delBetList']);

            //删除单个投注金额
            $("#betMenu span, #betMenuRX span").unbind('click', internal['delOneBetFn']);
            $("#betMenu span, #betMenuRX span").click(internal['delOneBetFn']);
        },

        //用户点击下注
        userBet: function (){
            var betLength = $("#betMenu div").length;
			var userSelMoney = k3Data['localData']['userSelMoney'];
			var betData = k3Data['betData'];
            var divLength = $("#betMenu div").length + $("#betMenuRX div").length, num = 0;
            if (divLength > 10){
                alertBox( '', '投注列表的注单已超过10注!<br>请先提交注单', '' );
                return false;
            }else if (divLength === 10){
                for (var id in k3Data['betData']){
                    if ('KS' + $(this).attr('id') !== id){num++;}
                }
                if (num >= 10){
                    alertBox( '', '投注列表的注单已超过10注!<br>请先提交注单', '' );
                    return false;
                }
            }

            if (userSelMoney < 1){
                alertBox("", "请选择下面的筹码后在投注!", "");
                return false;
            }

            var gameStatus = k3Data['k3SeverData']['data']['gameStatus'];
            if (gameStatus['status'] != 1){
                alertBox("", "当前不是投注时间，请稍后！", "");
                return false;
            }

            k3Data['localData']['newSel'] = true;
            for(var i = 0; i < betLength; i++){
				console.log($(this));
                if ("KS" + $(this).attr('id') == $("#betMenu div").eq(i).attr('id')){
                    betData['KS' + $(this).attr('id')]['betMoney'] = parseInt(betData['KS' + $(this).attr('id')]['betMoney'], 10) + parseInt(userSelMoney, 10);
                    $("#betMenu div").eq(i).html("<span class='colseMoney'></span>" + betData['KS' + $(this).attr('id')]['betMoney']);
                    k3Data['localData']['newSel'] = false;
					console.log(betData);
                }
            }

            if (k3Data['localData']['newSel']){
                //得到要传给服务器的数据
                if (!betData['KS' + $(this).attr('id')]){ betData['KS' + $(this).attr('id')] = {}; }
                var localData = k3Data['localData'], newOdds = k3Data['k3SeverData']['data']['newOdds'];;
                var play_lx = internal['getDaXiaoString']('KS' + $(this).attr('id'), 'd');
                var bet_obj = "", obj_name = "";
                bet_obj = obj_name = internal['getDaXiaoString']('KS' + $(this).attr('id'), 'x');
                var odds = newOdds['KS' + $(this).attr('id')];

                betData['KS' + $(this).attr('id')] = { 'periods':localData['periods'] , 'game_lx': localData['game_lx'], 'play_lx':play_lx, 'bet_obj':bet_obj, 'betMoney':0,  'odds':odds, 'obj_name':obj_name };
                betData['KS' + $(this).attr('id')]['betMoney'] = userSelMoney;

                var TopNo = ($(this).offset().top - 10) - $("#k3Content").offset().top;
                var LeftNo = ($(this).offset().left + $(this).width() - 30) - $("#k3Content").offset().left;
                $("#betMenu").append('<div style="top: '+ TopNo +'px; left: '+ LeftNo +'px; position:absolute;" class="selMoney" id="KS'+ $(this).attr('id') +'"><span class="colseMoney"></span>'+ userSelMoney +'</div>');

                internal['betPublicCode'](); //添加事件

                //为下注的代码添加背景图片
                $(this).addClass("oddsHo_" + $(this).attr('class').split("_")[1]);
            }

            internal['setBetFn'](); //加载选择了的投注到已选菜单

            internal['betPublicCode01'](); //添加事件01

            //改变提交数据按钮的样式
            if (betLength === 0){
                $("#btnServer").removeClass().addClass('gameBtn02');
            }
        },

        //任选号码下注
        userBetRX: function (){
            var betLength = $("#betMenuRX div").length, userSelMoney = k3Data['localData']['userSelMoney'], betData = k3Data['betData'];
            var divLength = $("#betMenu div").length + $("#betMenuRX div").length, num = 0;
            if (divLength > 10){
                alertBox( '', '投注列表的注单已超过10注!<br>请先提交注单', '' );
                return false;
            }else if (divLength === 10){
                for (var id in k3Data['betData']){
                    if ('KS' + $(this).attr('id') !== id){num++;}
                }
                if (num >= 10){
                    alertBox( '', '投注列表的注单已超过10注!<br>请先提交注单', '' );
                    return false;
                }
            }

            if (userSelMoney < 1){
                alertBox("", "请选择下面的筹码后在投注!", "");
                return false;
            }

            var gameStatus = k3Data['k3SeverData']['data']['gameStatus'];
            if (gameStatus['status'] != 1){
                alertBox("", "当前不是投注时间，请稍后！", "");
                return false;
            }

            k3Data['localData']['newSel'] = true;
            for(var i = 0; i < betLength; i++){
                if ("KS" + $(this).attr('id') == $("#betMenuRX div").eq(i).attr('id')){
                    betData['KS' + $(this).attr('id')]['betMoney'] = parseInt(betData['KS' + $(this).attr('id')]['betMoney'], 10) + parseInt(userSelMoney, 10);
                    $("#betMenuRX div").eq(i).html("<span class='colseMoney'></span>" + betData['KS' + $(this).attr('id')]['betMoney']);
                    k3Data['localData']['newSel'] = false;
                }
            }

            if (k3Data['localData']['newSel']){
                //得到要传给服务器的数据
                if (!betData['KS' + $(this).attr('id')]){ betData['KS' + $(this).attr('id')] = {}; }
                var localData = k3Data['localData'], newOdds = k3Data['k3SeverData']['data']['newOdds'];;
                var play_lx = internal['getDaXiaoString']('KS' + $(this).attr('id'), 'd');
                var bet_obj = "", obj_name = "";
                bet_obj = obj_name = internal['getDaXiaoString']('KS' + $(this).attr('id'), 'x');
                var odds = newOdds['KS' + $(this).attr('id')]
                betData['KS' + $(this).attr('id')] = { 'periods':localData['periods'] , 'game_lx': localData['game_lx'], 'play_lx':play_lx, 'bet_obj':bet_obj, 'betMoney':0,  'odds':odds, 'obj_name':obj_name };
                betData['KS' + $(this).attr('id')]['betMoney'] = userSelMoney;

                var TopNo = ($(this).offset().top - 10) - $("#OptionalNo").offset().top;
                var LeftNo = ($(this).offset().left + $(this).width() - 30) - $("#OptionalNo").offset().left;
                $("#betMenuRX").append('<div style="top: '+ TopNo +'px; left: '+ LeftNo +'px; position:absolute; z-index:100"  class="selMoney" id="KS'+ $(this).attr('id') +'"><span class="colseMoney"></span>'+ userSelMoney +'</div>');

                internal['betPublicCode'](); //添加事件

                //为下注的代码添加背景图片
                $(this).addClass("oddsHo_td");
            }

            internal['setBetFn']();  //加载选择了的投注到已选菜单

            internal['betPublicCode01'](); //添加事件01

            //改变提交数据按钮的样式
            if (betLength === 0){
                $("#btnServer").removeClass().addClass('gameBtn02');
            }
        },

        //提交注单到服务器
        clickBtnFn: function (){
            if (Csh['getCookie']('uid') && $(this).attr('class') == "gameBtn02"){
                //算出总金额
                var allMoney = 0, mun = 0;
                for (var id in k3Data['betData']){
                    allMoney += parseInt(k3Data['betData'][id]['betMoney'], 10);
                    mun++
                }

                //确认对话框
                var gameStatus = k3Data['k3SeverData']['data']['gameStatus'];
                if (allMoney === 0) { alertBox( "", "本次总投注金额：0，请重新投注！", "" ); return false; }
                alertBox( "", "当前投注："+ gameStatus['game_name'] +"<br>期数："+ gameStatus['periods2'] +"<br><br>"+ mun +"注 共"+ allMoney +" 元<br> 是否确定下注？", "k3[\'btnSubmit\']()" );
            }else if($(this).attr('class') == "gameBtn02"){
                alertBox("", "用户没有登录！", "");
            }
        },

        //倒数时间为0后更新页面内容
        updateBox: function (){
            var gameLx = k3Data['localData']['game_lx'];
            if (!gameLx){ gameLx = Csh['getParameter']('game_lx'); }
            var post = {'actID': 201, 'game_lx': gameLx, 'cp_type': 'ks', 'panType': 'zsp', 'msTime': Csh['getCookie']( 'msTime' ) }
            getServerData(post, "k3Data['k3SeverData']", function (){
                var localData = k3Data['localData'], gameStatus = k3Data['k3SeverData']['data']['gameStatus'];
                internal['comData'](); //调用共用函数
				console.log(k3Data['k3SeverData']);
                if (gameStatus['status'] != 1){
                    //投注注单等清空
                    internal['delSelFn']()
                }

                //提交数据按钮事件
                $("#btnServer").unbind('click', internal['clickBtnFn'])
                $("#btnServer").click(internal['clickBtnFn']);

                if (k3Data['localData']['btnKG']){
                    //任选号码按钮点击事件
                    $("#selNumber").click(internal['selNumFn']);

                    //关闭任选号码按钮事件
                    $("#colseWin").click(internal['colseFn']);

                    //关闭任选号码按钮事件
                    $("#colseSelWin").click(internal['colseSelBtn']);

                    //下注点击事件
                    $("#k3Content04 li, #k3Content03 li, #k3Content02 li, #DXd, #DXx, #oddsNo li").click(internal['userBet']);
                    $("#selNoTable td").click(internal['userBetRX']);

                    //我的投注
                    $("#resultsMenu").click(function (){
                        window.open('../ABOUT/index.php?tabID=1', '', 'width=1024, height=700 top=0, left=0, resizable=yes, scrollbars=yes');
                    });

                    //加号按钮=》更多按钮
                    $("#resultAll .ksResultAll").click(function (){
                        window.open('/ABOUT/index.php?tabID=7&game_lx='+ k3Data['localData']['game_lx'], 'AllResult')
                    });

                    //显示和隐藏期数结果按钮事件
                    $("#resultBtn").click(function (){
                        if ($("#resultAll").css('display') == "none"){
                            $("#resultBtn").removeClass('k3Result01').addClass('k3Result02')
                            $("#resultAll").slideDown();
                        }else{
                            $("#resultBtn").removeClass('k3Result02').addClass('k3Result01')
                            $("#resultAll").slideUp();
                        }
                    });

                    k3Data['localData']['btnKG'] = false;
                }
            });
        }
    };

    //**私有API**********************************************************************************************************************************
    //统一RPC请求入口
    var k3Sever;
    function getServerData(post, jsonDataOBJ, fnStr){
        if (!k3Sever){ k3Sever = new PHPRPC_Client( "http://118.184.23.233/memberRPC/phprpcClass/interface.class.php",    /*Csh['getCookie']('phprpcUrl') + '/phprpcClass/interface.class.php',*/ ['serverInterface']); }
        k3Sever.serverInterface( post, function ( result, args, output, warning ) {
            if (output){ alert(output); }
            if (!jsonDataOBJ){ return; }
            if (jsonDataOBJ){ eval( jsonDataOBJ +'='+ result ); }
            if (fnStr){ fnStr(); }
        }, true);
    };

    //服务器里的时间切换成时分秒，这个函数每秒都会执行一次
    function secondToTimeArr(second){
        var secondTime = parseInt(second%60, 10), minuteTime = parseInt((second/60)%60, 10), hourTime = parseInt((second/3600)%600, 10);
        if (secondTime < 10) {secondTime = "0" + secondTime;}
        if (minuteTime < 10) {minuteTime = "0" + minuteTime;}
        if (hourTime < 10) {hourTime = "0" + hourTime;}
        if (second >= 3600){
            return [hourTime, minuteTime];
        }else{
            return [minuteTime, secondTime];
        }
    };

    //得到赛程状态名称
    function getGameSatusName(status){
        switch( status ){
            case 1: return '封盘时间';break;
            case 2:case 3: return '开盘时间';break;
            default: return '暂停投注'; break;
        }
    };

    //更新倒数时间（装载完左边彩票项目后，每一秒都会执行这个函数）
    function updateLeftItemListTime(){
        var Timer = k3Data['countdown'];
		console.log(Timer);
        for( var id in Timer ){      //更新所有游戏类型倒数时间
            if( Timer[id] < 0 ) continue;
            if( Timer[id] == 0 || k3Data['localData']['updatesTime'] == 0 ){
                k3Data['localData']['updatesTime'] = 60;
                internal['updateBox']();
                return;
            }

            if ( $("#countdownTime")[0] ){
                var timeArr = secondToTimeArr(k3Data['countdown'][k3Data['localData']['game_lx']]);
                $("#countdownTime > span").eq(0).html(timeArr[0]);
                $("#countdownTime > span").eq(1).html(timeArr[1]);
            }

            Timer[id] --;
        }
        k3Data['localData']['updatesTime']--;
    };

    //**初始化代码*******************************************************************************************************************************
    internal['updateBox']();

    //**共用API**********************************************************************************************************************************
    function k3(){} //空构造函数

    //用于更新时间，每秒都会执行一次
    k3.prototype.timerFn = function (){ updateLeftItemListTime(); };

    //提交投注信息到服务器
    k3.prototype.btnSubmit = function (){
        if (k3Data['localData']['subData']){
            k3Data['localData']['subData'] = false;
            $("#contenBox").html('正在努力加载数据！...');
            var post = {'actID': 302, 'uid': Csh['getCookie']('uid'), 'orders': k3Data['betData'], path: 1, show_type: 5}
            getServerData(post, "k3Data['storageData']", function (){
                //如果投注成功，执行if语句
                if (internal['bettingAlert'](k3Data['storageData']['data']['status'])){
                    $("#userMoney").html(k3Data['storageData']['data']['u_money_cp']);

                    //投注注单等清空
                    internal['delSelFn']()

                    alertBox("", "下注成功！", "");
                }

                k3Data['localData']['subData'] = true;
            });
        }
    };

    return new k3();
})(jQuery, Csh);

//定时器，每一秒都执行一次
var time = setInterval("k3['timerFn']()", 1000);

window.onresize = function(){ boxPosition(); };