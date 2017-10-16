function initRpcObj() {     //初始化远程RPC方法
    Interface = new PHPRPC_Client( 'http://118.184.23.233/memberRPC/phprpcClass/interface.class.php', ['serverInterface']);
};

function MasterTimer() { //这个函数每一秒都会执行一次
    showServerTime(); //即时时钟

    actionHeader(); //更新UID, 即时时间, 用户信息

    CaiPiao['reloadLeftItemList']();  //生成左边彩票项目

    CaiPiao['reloadMidPanData'](); //装载中间的盘口数据

};
//所有游戏类型的倒数时间都是用这个函数来把时间转换成时、分、秒（页面初始化完之后，这个函数每秒都会执行一次）
function secondTOTime( second ){
    var time = '',
        secondTime = parseInt(second%60, 10),
        minuteTime = parseInt((second/60)%60, 10),
        hourTime = parseInt((second/3600)%600, 10);
    if (secondTime < 10) {secondTime = "0" + secondTime;}
    if (minuteTime < 10) {minuteTime = "0" + minuteTime;}
    if (hourTime < 10) {hourTime = "0" + hourTime;}
    if (hourTime != 0) time += hourTime + "时";
    if (minuteTime != "00") time += minuteTime + "分";
    if (secondTime != "00") time += secondTime + "秒";
    return time;
}

function secondToTimeArr(second){
    var secondTime = parseInt(second%60, 10), minuteTime = parseInt((second/60)%60, 10), hourTime = parseInt((second/3600)%600, 10);
    if (secondTime < 10) {secondTime = "0" + secondTime;}
    if (minuteTime < 10) {minuteTime = "0" + minuteTime;}
    if (hourTime < 10) {hourTime = "0" + hourTime;}
    if (hourTime > 99){
        return ['99', '00'];
    }else{
        if (second >= 3600){
            return [hourTime, minuteTime];
        }else{
            return [minuteTime, secondTime];
        }
    }
}

//彩票模块
var CaiPiao = (function ($){
    //这个对象用于存放页面的所有数据
    var SaveData = {
        jsonDataLeft: {},  //对象存储左边高低频彩票项目数据

        jsonDataMid: {}, //对象存储右边导航条项目数据

        gameRule: {}, //存放游戏规则返回数据

        //对象存储开奖规律返回的数据
        lawData: {lawResult: true, LuZiID: "", dataStorage: {}, DEThis: 'continueCL', DYThis: 'ShuangMian', DYTitle:{ShuangMian: '双面长龙', QuangBu: '全部长龙', LuZi: '路子'}, DETitle:{continueCL: '连续开奖', notOpenCL: '连续未开'}, DECLTitle:{winCL: '连续开奖', notWinCL: '连续未开'}, TBTitle:{moreCL: '更多长龙'}},

        moneyGD: {},  //对象存储最高最低投注金额

        afterTenNote: {},  //用户最后十注列表

        betData: {}, //用户投注后返回的数据

        gameResultObj: {}, //存放上一期游戏开解结果

        oddsOBJ: {}, //存放最新点击赔率

        //用于快选金额存储
        quickPickStatus: {tagID: "", 'flag': 0, 'statusArr': {'0': '停用', '1': '启动'}, 'moneyArr': ['', '', '', '', ''], 'user_stting': {}, 'userData': 0, quickPickKG: true },

        attrData: {  //对象存储属性数据
            Timer: {  //Timer用于存储倒数时间
                item: {reloadSpan: 180, currTime: 0 }, panData: {reloadSpan: 60, currTime: 60 }, gameStatus: {currTime: 10 }, countdown: {}
            },

            rpcPost: {  //rpcPost用于存储数据
                frequencyGD: 2, game_lx: 0, panType: 0, cp_type: 0, FirstExecutive: true, CSHGameLx: true, FirstGameLx: true, GDP: true, itemID: [], betBrders: {},
                MoneyDX: {minMoney: {}, maxMoney: {}}, upData: true, Frame_05_OBJ: {}, BetContainer: true, DataKG: true,
                bigGameLx: {2: '时时彩系列', 3: '快乐十分系列', 4: '11选5系列', 5: '快3骰宝', 6: '快乐八系列', 7: '低频系列',8:'其他'}, bigGameKG: true, item: "", show_type: 2
            },

            EventList: { //事件监听开关
                EventGameLx: true, changePanType: true
            }
        }
    };

    /**********共享的HTML代码*********************************************************************************************************************************************/
    //该对象存放共享的HTML代码
    var CodeHTML = {
        createHTML_01: function (itemID, playLx){  //加载HTML代码_01
            var titleName = "";
            (playLx) ? titleName = getPlaylxObj( itemID ).playLx[playLx] : titleName = getPlaylxObj( itemID ).titleName;

            var html = [];
            html.push( '<div class="box01Title">'+ titleName +'</div><div class="box01Content">' );
            html.push( '</div><div class="box01Bottom"></div>');
            return html;
        },

        createHTML_02: function (itemID){  //加载HTML代码_02
            var html = [];
            html.push( '<table id="'+ itemID +'" class="oddsTable" cellpadding="0" cellspacing="1" >' );
            html.push( '</table>' );
            return html;
        },

        createHTML_03: function (row){  //加载HTML代码_03
            return '<td class="oddsTitle">'+ row +'</td>';
        },

        createHTML_04: function (itemID, row, andNo){ //加载HTML代码_04
            var html = [], rpcPost = SaveData['attrData']['rpcPost'];

            if (SaveData['jsonDataMid']['data']['gameStatus']['status'] != 1){ return; }

            for (var id in row['td']){
                var SpanBg = row['td'][id];

                if (row['td'][id].toString().search(/^\d{1}$/i) != -1 && !andNo){ SpanBg = '<span class="checkBox01">'+ row['td'][id] +'</span>'; }

                if (
                    rpcPost['game_lx'] == 21 || rpcPost['game_lx'] == 23 || rpcPost['game_lx'] == 24 || itemID === 'PKDM' ||
                    rpcPost['game_lx'] == 31 || rpcPost['game_lx'] == 32 || rpcPost['game_lx'] == 33 || rpcPost['game_lx'] == 34
                    ){ if (row['td'][id].toString().search(/^\d{2}$/i) != -1){ SpanBg = '<span class="checkBox01">'+ row['td'][id] +'</span>'; } }

                if (rpcPost['game_lx'] == 22 && row['td'][id].toString().search(/^\d{2}$/i) != -1){ SpanBg = Event['getGXKLSFBG'](row['td'][id]); }

                if (rpcPost['game_lx'] == 10 && row['td'][id].toString().search(/^\d{2}$/i) != -1){ SpanBg = Event['getLHCBG'](row['td'][id]); }

                if (itemID === 'KLSFSIWX' || itemID === 'KLSFFW' || itemID === 'GDSJWX' || itemID === 'FWZFB'){
                    var tdNoArr = row['tdNo'][id].split(','), SpanBg = row['td'][id] + ":";
                    for (var i = 0, len = tdNoArr.length; i < len; i++){
                        SpanBg += '<span class="checkBox01" style="margin-left: 4px;">'+ tdNoArr[i] +'</span>';
                        if (tdNoArr[i] == ""){ SpanBg = ""; }
                    }
                }

                if (itemID === 'GXSJWX'){
                    var tdNoArr = row['tdNo'][id].split(','), SpanBg = row['td'][id] + ":";
                    for (var i = 0, len = tdNoArr.length; i < len; i++){
                        SpanBg += Event['getGXKLSFBG'](tdNoArr[i]);
                        if (tdNoArr[i] == ""){ SpanBg = ""; }
                    }
                }

                html.push('<td class="oddsTitle">'+ SpanBg +'</td>');
            }
            return html.join('');
        },

        createHTML_05: function (tdArr, play_lx){  //加载HTML代码_05
            var jsonDataMid = SaveData['jsonDataMid'], html = [];
            for (var i = 0, len = tdArr.length; i < len; i++){
                var currentOdds = jsonDataMid['data']['newOdds'][play_lx + tdArr[i]];
                if (currentOdds === undefined){ currentOdds = ""; }
                html.push('<td class="oddsBox"><a name="'+ play_lx + tdArr[i] +'">'+ currentOdds +'</a></td>');
            }
            return html.join('');
        },

        createHTML_06: function (playLxArr){   //加载HTML代码_06
            var jsonDataMid = SaveData['jsonDataMid'], html = [];
            for (var i = 0, len = playLxArr.length; i < len; i++){
                var currentOdds = jsonDataMid['data']['newOdds'][playLxArr[i]];
                if (currentOdds === undefined){ currentOdds = ""; }
                html.push('<td class="oddsBox"><a name="'+ playLxArr[i] +'">'+ currentOdds +'</a></td>');
            }
            return html.join('');
        },

        clickshowType: function (DOMself){ //添加大类选择点击事件
            var This = $(DOMself).attr("id"), rpcPost = SaveData['attrData']['rpcPost'];

            $("#leftItemBox ul[id!=ul"+ This +"]").slideUp(100);
            $( "#ul"+ This ).slideDown(100);
            $("#leftItemBox .itemTitle").removeAttr('style');
            $(DOMself).css({color: "#F79400"});
        },

        createHTML_07: function (){   //加载HTML代码_07
            var id = "", LeftData = SaveData['jsonDataLeft']['data'], html = [], number = "", Timer = SaveData['attrData']['Timer'], rpcPost = SaveData['attrData']['rpcPost'];
            var shownow = SaveData['jsonDataLeft']['shownow'];
            Timer['countdown'] = {}; //清空保存的所有游戏类型的倒数时间
            for (id in LeftData){
                var row = LeftData[id];
                //这个对象保存所有游戏类型的倒数时间
                Timer['countdown'][row['game_lx']] = row['latetime'];

                var ns = shownow['ns'][row['show_type']], zs = shownow['zs'][row['show_type']];
                if (!ns){ns = 0;}
                if (!zs){zs = 0;}

                //初始化游戏类型
                if (rpcPost['CSHGameLx']){
                    //返回来的数据中遍历到的第一个游戏类型状态是1，执行if语句
                    if (rpcPost['FirstExecutive'] === true && row['status'] === 1){
                        rpcPost['game_lx'] = row['game_lx'];
                        rpcPost['cp_type'] = row['cp_type'];

                        var PanType = true;
                        for (var id in itemOBJ[rpcPost['cp_type']]['menu']){
                            if (PanType){
                                rpcPost['panType'] = id;
                                PanType = false;
                            }
                            continue;
                        }
                        rpcPost['item'] = "item" + row['show_type'];
                        rpcPost['FirstExecutive'] = false;
                        rpcPost['show_type'] = row['show_type'];
                    }

                    //当所有游戏类型状态都不为1的时候，执行if语句
                    if (rpcPost['FirstGameLx']){
                        rpcPost['game_lx'] = row['game_lx'];
                        rpcPost['cp_type'] = row['cp_type'];

                        var PanType = true;
                        for (var id in itemOBJ[rpcPost['cp_type']]['menu']){
                            if (PanType){
                                rpcPost['panType'] = id;
                                PanType = false;
                            }
                            continue;
                        }
                        rpcPost['item'] = "item" + row['show_type'];
                        rpcPost['FirstGameLx'] = false;
                    }

                    //左边彩票项目的HTML代码
                    if (!$("#item" + row['show_type'])[0]){
                        html = [];
                        html.push('<div class="itemTitle" id="item'+ row['show_type'] +'">'+ rpcPost['bigGameLx'][row['show_type']] +'<span style="float: right; color: #fff; margin-right: 10px;">'+ ns +'/'+ zs +'</span></div>');
                        html.push('<ul id="ulitem'+ row['show_type'] +'">');
                        html.push('<li id="'+ row['cp_type'] +'_'+ row['game_lx'] +'"><div class="icoGameLX ico'+ row['game_lx'] +'"></div><div id="'+ row['cp_type'] + row['game_lx'] +'" class="statusBox">');
                        html.push('<div class="gameStatusIco'+ row['status'] +'">'+ row['game_name'] +'</div>');
                        html.push('<div style="color: #666">第 '+ row['periods2'] +' 期</div>');
                        html.push('</div></li></ul>');

                        //把左边彩票项目的HTML代码动态添加到ID为leftItemBox的HTML标签元素内
                        $('#leftItemBox').append( html.join('') );
                    }else{
                        $("#ulitem" + row['show_type']).append(
                            '<li id="'+ row['cp_type'] +'_'+ row['game_lx'] +'">' +
                                '<div class="icoGameLX ico'+ row['game_lx'] +'"></div>' +
                                '<div id="'+ row['cp_type'] + row['game_lx'] +'" class="statusBox">' +
                                '<div class="gameStatusIco'+ row['status'] +'">'+ row['game_name'] +'</div>' +
                                '<div style="color: #666">第 '+ row['periods2'] +' 期</div></div>' +
                                '</li>');
                    };
                }else{
                    //更新左边彩票项目数据
                    $("#" + row['cp_type'] + row['game_lx'] +" div").eq(0).removeAttr('class').addClass('gameStatusIco' + row['status']);
                    $("#" + row['cp_type'] + row['game_lx'] +" div").eq(0).html(row['game_name']);
                    $("#" + row['cp_type'] + row['game_lx'] +" div").eq(1).html('第 '+ row['periods2'] +' 期');
                    $('#item'+ row['show_type'] + ' span').html(ns +'/'+ zs);
                }

            }

            //初始化打开游戏大类
            if (rpcPost['bigGameKG']){

                $("#" + rpcPost['item']).css({color: "#F79400"});
                var gameLXID = rpcPost['cp_type'] + rpcPost['game_lx'];
                $("#" + gameLXID + " .gameStatusIco1").css({color: "#F79400"});
                $("#" + gameLXID + " .gameStatusIco2").css({color: "#F79400"});
                $("#" + gameLXID + " .gameStatusIco3").css({color: "#F79400"});
                $("#ul" + rpcPost['item']).css({display: "block"});

                //添加大类选择点击事件
                $("#leftItemBox .itemTitle").click(function(){ CodeHTML['clickshowType'](this) });
                $("#leftItemBox ul li").mouseover(function (){
                    $(this).css({background:'#f4f4f4'});
                }).mouseout(function (){
                        $(this).removeAttr('style');
                    })
                rpcPost['bigGameKG'] = false;
            }

            //初始化游戏类型开关
            rpcPost['CSHGameLx'] = false;

            Timer['panData']['currTime'] = 0;   //把Timer['panData']['currTime']的值该为0（默认是60）
            CaiPiao['reloadMidPanData'](); //加载右边彩票项目内容（相当于初始化右边彩票项目内容）

            //加载项目右边投注单和最近十住
            if (rpcPost['BetContainer']){
                var userBetTop = '<div class="box04Back"><span id="betMune" class="box04TitleCurrTab">投注单</span></div><div><span id="tenNote">最近十注</span></div>';
                $("#userBetTop").html(userBetTop);
                rpcPost['BetContainer'] = false;
            }

            //初始化页面的时候加载开奖规律
            if (SaveData['lawData']['lawResult']){
                //初始化右边彩票的规则和金额
                $("#ruleAndMoney").html('<div id="GameRules">游戏规则</div><div id="SecletMoney">快选金额</div>');

                (rpcPost['game_lx'] === 41) ? number = 2 : number = 6;
                getLawData(number, function (){ getLawsData() });
                SaveData['lawData']['lawResult'] = false;
            }
        },

        createHTML_08: function (itemID, tdArr, colspan){ //加载HTML代码08
            var html = [], sum = 0;
            html.push('<td class="titleBox_01" id="'+ itemID +'Title" colspan="'+ colspan +'">');
            html.push('<div class="titleBox_02">');
            for (var id in tdArr){
                if (sum === 0){
                    html.push('<div class="titleBox_03" id="'+ id +'"><div class="playBtn04"></div><a name="'+ id +'" href="javascript:void(0)" class="playBtn05">'+ tdArr[id] +'</a><div class="playBtn06"></div></div>');
                }else{
                    html.push('<div class="titleBox_03" id="'+ id +'"><div class="playBtn01"></div><a name="'+ id +'" href="javascript:void(0)" class="playBtn02">'+ tdArr[id] +'</a><div class="playBtn03"></div></div>');
                }
                sum++;
            }
            html.push('</div>');
            html.push('</td>');
            return html.join('');
        },

        createHTML_09: function (tdArr){  //加载HTML代码09
            var html = [];
            for (var i = 0, len = tdArr.length; i < len; i++){
                html.push('<td class="oddsTitle"><div style="width: 40px; height: 20px; display: inline-block; overflow: hidden;"><div class="checkBox">'+ tdArr[i] +'</div><div style="float: right;"><input type="checkbox" value="'+ tdArr[i] +'" /></div></div></td>');
            }
            return html.join('');
        },

        createHTML_10: function (itemID, tdArr, colspan, lable){  //加载HTML代码10
            var html = [], sum = 0;
            html.push('<td class="titleBox_01" id="'+ itemID +'Title" colspan="'+ colspan +'">');
            html.push('<div class="titleBox_02">');
            for (var id in tdArr){
                if (sum === 0){
                    html.push('<div class="titleBox_03" id="'+ id +'"><div class="playBtn04"></div><a name="'+ id +'" href="javascript:void(0)" class="playBtn05">'+ tdArr[id] +'</a><div class="playBtn06"></div></div>');
                }else{
                    html.push('<div class="titleBox_03" id="'+ id +'"><div class="playBtn01"></div><a name="'+ id +'" href="javascript:void(0)" class="playBtn02">'+ tdArr[id] +'</a><div class="playBtn03"></div></div>');
                }
                sum++;
            }
            html.push('</div>');
            html.push('</td>');
            html.push(CodeHTML['createHTML_03'](lable));
            return html.join('');
        },

        createHTML_11: function (itemID, tdArr, colspan, lable, rowspan){ //加载HTML代码11
            var html = [];
            html.push('<td id="play'+ itemID +'" class="oddsTitle">'+ lable +'</td>');
            html.push(CodeHTML['createHTML_09'](tdArr));
            if (rowspan){ html.push('<td class="oddsBox" rowspan="'+ rowspan +'"><a id="'+ itemID +'Odds"></a></td>'); }
            return html.join('');
        },

        createHTML_12: function (arr, isTitleGG){ //加载HTML代码12
            var html = [];

            for (var i = 0, len = arr.length; i < len; i++){
                (isTitleGG) ? html.push('<td class="oddsTitle">'+ arr[i] +'</td>') : html.push('<td>'+ arr[i] +'</td>');
            }

            return html.join('');
        },

        createHTML_13: function (itemID, playLxArr){ //加载HTML代码12
            var html = [], jsonDataMid = SaveData['jsonDataMid']['data']['newOdds'];

            for (var i = 0, len = playLxArr.length; i < len; i++){
                html.push('<td><label><input type="radio" value="'+ playLxArr[i] +'" name="'+ itemID + i +'"/>'+ jsonDataMid[playLxArr[i]] +'</label></td>');
            }

            return html.join('');
        },

        createHTML_14: function (colspan, td, itemID){
            var html = [];

            html.push('<td class="oddsTitle" colspan="'+ colspan +'">');
            html.push('<div id="'+ itemID +'Odds" style="width:320px; height: 32px; line-height: 32px; float: left;"></div>');
            html.push('<div style="float: right; width: 150px;">');
            for (var id in td){ html.push('<input type="button" style="margin: 5px;" value="'+ td[id] +'" id="'+ itemID + id +'" />'); }
            html.push('</div>');
            html.push('</td>');

            return html.join('');
        },

        createHTML_15: function (td){
            var html = [], rpcPost = SaveData['attrData']['rpcPost'], number = "";
            for (var i = 0, len = td.length; i < len; i++){
                if (td[i] === ""){
                    html.push('<td></td>');
                    continue;
                }
                number = td[i];
                if (rpcPost['game_lx'] == 10){ number = Event['getLHCBG'](td[i]); }
                html.push('<td class="oddsTitle"><div style="width: 40px; display: inline-block; overflow: hidden;"><div class="checkBox">'+ number  +'</div><div style="float: right;"><input type="checkbox" value="'+ td[i] +'" /></div></div></td>');
            }
            return html.join('');
        },

        createHTML_16: function (lotteryNo, playLx){
            var html = [], jsonDataMid = SaveData['jsonDataMid']['data'];
            for (var id in lotteryNo){
                html.push('<td class="oddsBox">');
                var noArr = jsonDataMid[[id]].split(','), noStr = "";
                for (var i = 0, len = noArr.length; i < len; i++){
                    noStr += Event['getLHCBG'](noArr[i]);
                }
                html.push('<div style="color: #A25100;">' + lotteryNo[id] + '：'+ noStr +'</div>');
                html.push('<a name="'+ playLx[id] +'">'+ jsonDataMid['newOdds'][playLx[id]] +'</a>');
                html.push('</td>');
            }
            return html.join('');
        },

        createHTML_17: function (lotteryNo){
            var html = [], jsonDataMid = SaveData['jsonDataMid']['data'];
            for (var id in lotteryNo){
                html.push('<td class="oddsBox">');
                html.push('<label><input type="checkbox" value="'+ id +'" /><a>'+ lotteryNo[id] +'：'+ jsonDataMid[[id]] +'</a></lable>');
                html.push('</td>');
            }
            return html.join('');
        },
        createHTML_18: function (itemID, row){
            var html = [], jsonDataMid = SaveData['jsonDataMid']['data'];
            for (var id in row['tdNo']){
                if (id === 'Air'){
                    html.push('<td></td>');
                    continue;
                }
                var tdName = '', tdArr = row['tdNo01'][id].split(',');
                for (var i = 0; i < tdArr.length; i++){
                    tdName += '[<b>'+ tdArr[i] +'</b>] ';
                }
                html.push('<td class="oddsBox"><span class="oddsName">'+ row['tdNo'][id] +'：'+ tdName +'</span><a href="javascript:void(0)"  style="float:right; margin-right: 10px;" name="'+ id +'">'+ jsonDataMid['newOdds'][row['default'] + id] +'</a></td>');
            }
            return html.join('');
        }
    };

    /**********存放页面中的事件监听函数*********************************************************************************************************************************************/
    //该对象存放事件监听函数
    var Event = {
        //返回全大写 或全小写字符
        getDaXiaoString: function (str, getType){
            var resultStr = '';
            for( var i=0; i<str.length; i++ ){
                var c = str.charAt(i);
                if( c <'A' || c >'Z' ){
					//  A unicode号 65  
					//  Z unicode号 90
					//  a           97
					//  z           122
                    var type = 'x';
                }else{
                    var type = 'd';
                }
                if( getType == type ) resultStr += c;
            }
            return resultStr;
        },

        //六合彩球号背景颜色
        getLHCBG: function (number){
            var SpanBg = ""
            switch (number){
                case "01": case "02": case "07": case "08": case "12": case "13": case "18": case "19": case "23": case "24": case "29":
                case "30": case "34": case "35": case "40": case "45": case "46":
                SpanBg = '<span class="titleHong">'+ number +'</span>';
                break;
                case "03": case "04": case "09": case "10": case "14": case "15": case "20": case "25": case "26": case "31": case "36":
                case "37": case "41": case "42": case "47":case "48":
                SpanBg = '<span class="titleLan">'+ number +'</span>';
                break;
                case "05": case "06": case "11": case "16": case "17": case "21": case "22": case "27": case "28": case "32": case "33":
                case "38": case "39": case "43": case "44":case "49":
                SpanBg = '<span class="titleLv">'+ number +'</span>';
                break;
            }
            return SpanBg;
        },

        //广西快乐十分球号背景颜色
        getGXKLSFBG: function (number){
            var SpanBg = ""
            switch (number){
                case "01": case "04": case "07": case "10": case "13": case "16": case "19":
                SpanBg = '<span class="titleHong01">'+ number +'</span>';
                break;
                case "02": case "05": case "08": case "11": case "14": case "17": case "20":
                SpanBg = '<span class="titleLan01">'+ number +'</span>';
                break;
                case "03": case "06": case "09": case "12": case "15": case "18": case "21":
                SpanBg = '<span class="titleLv01">'+ number +'</span>';
                break;
            }
            return SpanBg;
        },

        //二级导航栏点击事件
        getTwoClick: function (itemID, thisDom){
            $("#" + itemID +"Title .playBtn04").removeClass('playBtn04').addClass('playBtn01');
            $("#" + itemID +"Title .playBtn05").removeClass('playBtn05').addClass('playBtn02');
            $("#" + itemID +"Title .playBtn06").removeClass('playBtn06').addClass('playBtn03');
            $("#" + $(thisDom).parent('div').attr('id') + " div").eq(0).removeClass('playBtn01').addClass('playBtn04');
            $(thisDom).removeClass('playBtn02').addClass('playBtn05');
            $("#" + $(thisDom).parent('div').attr('id') + " div").eq(1).removeClass('playBtn03').addClass('playBtn06');

            var nameID = $("#" + itemID + " tr:gt(1) a"), newOdds = SaveData['jsonDataMid']['data']['newOdds'];
            for (var i = 0, len = nameID.length; i < len; i++){
                nameID.eq(i).html(newOdds[$(thisDom).attr('name') + nameID.eq(i).attr('name')]);
            }
        },

        //Frame_08加载下注赔率到投注单
        getOdds08: function (itemID, thisDom){
            if (getCookie('uid')){
                //判断投注列表的注单是否超过10注
                if ($("#orderList .orderDelete").length === 10) {
                    alertBox( '', '投注列表的注单已超过10注!<br>请先提交注单', '' );
                    return;
                }

                //点击赔率改变class
                ($(thisDom).attr('class') == 'showOdds') ? $(thisDom).removeClass().addClass('showOdds01') : $(thisDom).removeClass().addClass('showOdds');

                var play_lx = Event['getDaXiaoString']($(thisDom).attr('name'), 'd'), eleName = $("#" + itemID + " .showOdds01");
                var newOdds = SaveData['jsonDataMid']['data']['newOdds'];
                if (eleName.length === PAN[itemID]['tr']['tr0']['number'][play_lx]){
                    var rpcPost = SaveData['attrData']['rpcPost']
                    var bet_obj = "", obj_name = "", odds = 0;
                    for (var i = 0, len = eleName.length; i < len; i++){
                        var nameMing = eleName.eq(i).attr('name');
                        (i === 0) ? bet_obj += Event['getDaXiaoString'](nameMing, 'x') : bet_obj += '_' + Event['getDaXiaoString'](nameMing, 'x');
                        if (odds === 0){
                            odds = newOdds[nameMing];
                        }else{
                            if (itemID == 'LHLX' && (parseInt(odds, 10) > parseInt(newOdds[nameMing], 10)) ){ odds = newOdds[nameMing]; }
                            if (itemID == 'LHLW' && (parseInt(odds, 10) < parseInt(newOdds[nameMing], 10)) ){ odds = newOdds[nameMing]; }
                        }
                    }
                    obj_name = bet_obj;
                    var playOBJ = play_lx + bet_obj;

                    //判断是否新增玩法
                    var isNew = true;
                    for( var id in rpcPost['betBrders'] ){
                        if(typeof(rpcPost['betBrders'][id]) == "undefined"){ continue; }
                        if( rpcPost['betBrders'][id]['play_lx'] == play_lx ){ isNew = false; }
                    }
					console.log(isNew);
                    //如果是新增的玩法执行if语句
                    if (isNew){
                        var post = {'actID':301,'uid': getCookie('uid'), 'game_lx':rpcPost['game_lx'], 'play_lx':play_lx };
                        getServerData( post, 'SaveData["moneyGD"]', function (){ 
							
							intBetFormData(play_lx);
						});
						
					}

                    //判断用户点击的是否是同一彩票种类
                    for (var id in rpcPost['betBrders']){
                        if (rpcPost['betBrders'][id] == undefined){ continue; }
                        if (rpcPost['betBrders'][id]['game_lx'] !== rpcPost['game_lx']){ rpcPost['betBrders'] = {}; }
                    }

                    //增加一条注单数据
                    rpcPost['betBrders'][playOBJ] = { 'periods':rpcPost['newPeriods'] , 'game_lx': rpcPost['game_lx'], 'play_lx':play_lx, 'bet_obj':bet_obj, 'betMoney':0,  'odds':odds, 'obj_name':obj_name };

                    var betObjArr = bet_obj.split('_'), betObj = "";
                    for (var i = 0, len = betObjArr.length; i < len; i++){
                        if (itemID == 'LHLX'){
                            (i === 0) ? betObj += objName[betObjArr[i]] : betObj += ('，' + objName[betObjArr[i]]);
                        }else{
                            (i === 0) ? betObj += betObjArr[i] : betObj += ('，' + betObjArr[i]);
                        }
                    }
                    bet_obj = obj_name = betObj;
					objname=bet_obj;
                    //把注单数据加载到页面
                    betDataHTML(itemID, playOBJ, play_lx, bet_obj, odds,objname);

                    $("#" + itemID + " .showOdds01").removeClass().addClass('showOdds');
                }
            }else{
                alertBox( '', '用户还没登陆账户！', '' );
                return;
            }
        },

        //加载下注赔率到投注单
        getOdds: function (itemID, thisDom){

            if ( getCookie('uid') ){
                //判断投注列表的注单是否超过10注
                if ($("#orderList .orderDelete").length === 10) {
                    alertBox( '', '投注列表的注单已超过10注!<br>请先提交注单', '' );
                    return;
                }

                var rpcPost = SaveData['attrData']['rpcPost']
                var playOBJ = $(thisDom).attr('name');
                var play_lx = Event['getDaXiaoString'](playOBJ, 'd');
                var bet_obj = "", obj_name = "";
                bet_obj = obj_name = Event['getDaXiaoString'](playOBJ, 'x');
                var odds = SaveData['jsonDataMid']['data']['newOdds'][playOBJ];

                //判断是否新增玩法
                var isNew = true;
                for( var id in rpcPost['betBrders'] ){
                    if(typeof(rpcPost['betBrders'][id]) == "undefined"){ continue; }
                    if( rpcPost['betBrders'][id]['play_lx'] == play_lx ){ isNew = false; }
                }

                //如果是新增的玩法执行if语句
                if (isNew){
                    var post = {'actID':301,'uid': getCookie('uid'), 'game_lx':rpcPost['game_lx'], 'play_lx':play_lx };
                    getServerData( post, 'SaveData["moneyGD"]', function (){ intBetFormData(play_lx); });
                }

                //判断用户点击的是否是同一彩票种类
                for (var id in rpcPost['betBrders']){
                    if (rpcPost['betBrders'][id] == undefined){ continue; }
                    if (rpcPost['betBrders'][id]['game_lx'] !== rpcPost['game_lx']){ rpcPost['betBrders'] = {}; }
                }


                //增加一条注单数据
                rpcPost['betBrders'][playOBJ] = { 'periods':rpcPost['newPeriods'] , 'game_lx': rpcPost['game_lx'], 'play_lx':play_lx, 'bet_obj':bet_obj, 'betMoney':0,  'odds':odds, 'obj_name':obj_name };

                if (obj_name.search(/_/) !== -1){
                    var betObj = "";
                    for (var i = 0, len = obj_name.split('_').length; i < len; i++){
                        (i === 0) ? betObj += obj_name.split('_')[i] : betObj += "，" + obj_name.split('_')[i];
                    }
                    bet_obj = betObj;
                }
				objname=bet_obj;
                //把注单数据加载到页面
                betDataHTML(itemID, playOBJ, play_lx, bet_obj, odds,objname);
            }else{
                alertBox( '', '用户还没登陆账户！', '' );
                return;
            }
        },

        //点击快3彩种类型
        k3ClickFn: function (game_lx){
            var rpcPost = SaveData['attrData']['rpcPost'];
            getServerData( {'actID': 602, 'game_lx': game_lx}, 'SaveData["gameRule"]', function (){
                $("#stopKS").css({display: "block"});  //快3遮挡层显示

                var ruleArr = [], gameRule = SaveData["gameRule"];
                ruleArr.push('<div class="ruleBox02">');
                ruleArr.push('<div class="ruleBox03"></div>');
                ruleArr.push('<div class="ruleBox04" style="width:792px;">快3游戏规则</div>');
                ruleArr.push('<div class="ruleBox05"></div>');
                ruleArr.push('</div>');

                //游戏规则容器的内容
                ruleArr.push('<div id="KSRule">');
                ruleArr.push('<table cellspacing="0" cellpadding="0">');
                ruleArr.push('<tr><td class="officialWebsite"><a href="'+ gameRule['refer_url'] +'" target="_black">进入官网</a></td><td>介绍：<span style="color: #d00; font-weight: bold;">'+ gameRule['bet_info'] +'</span></td></tr>');
                var panType = gameRuleObj['k3']['k3Rule'];
                for (id in panType['ruleName']){
                    ruleArr.push('<tr>');
                    ruleArr.push('<td colspan="2" class="tableBox01"><span style="color: #000; font-weight: bold">'+ panType['ruleName'][id] +'</span>：<span style="color: #333;">'+ panType['ruleBox'][id] +'</span></td>');
                    ruleArr.push('</tr>');
                }

                ruleArr.push('</table>');
                ruleArr.push('</div>');

                $("#ruleTagKS").html(ruleArr.join(''));
                return false;
            });
        },

        //改变采种（当点击左边彩票项目中的那些游戏类型的时候就执行这个函数）
        EventGameLx: function (){
            $("#leftItemBox").delegate("li", "click", function (){

                var rpcPost = SaveData['attrData']['rpcPost'], Timer = SaveData['attrData']['Timer'];
                var lxTypeArr = $(this).attr("id").split('_');

                //获得系列值
                rpcPost['show_type'] = $(this).parent('ul').attr('id').match(/\d+/)[0];

                if (lxTypeArr[0] === 'k3'){
                    window.open('k3.html?game_lx='+ lxTypeArr[1], 'K3WIN', 'innerHeight=690, height=690px, width=960px, top=0px, left=0px, location=yes,menubar=no,resizable=yes,scrollbars=yes,status=no,toolbar=no');
                    Event['k3ClickFn'](lxTypeArr[1]);
                }

                $("#stopKS").css({display: "none"}); //快3遮挡层隐藏

                $("#userCathectic").html('<div style="text-align: center; width: 100%; padding-bottom: 8px;">点击页面中的赔率可以投注！</div>'); //清空用户的投注菜单
                SaveData['attrData']['rpcPost']['betBrders'] = {}; //清空投注菜单上的数据

                //改变点击的彩票类型字体颜色
                $("#leftItemBox .gameStatusIco1").removeAttr('style');
                $("#leftItemBox .gameStatusIco2").removeAttr('style');
                $("#leftItemBox .gameStatusIco3").removeAttr('style');
                var gameTypeArr = $(this).attr('id').split('_'), gameLXID = gameTypeArr[0] + gameTypeArr[1];
                $("#" + gameLXID + " .gameStatusIco1").css({color: "#F79400"});
                $("#" + gameLXID + " .gameStatusIco2").css({color: "#F79400"});
                $("#" + gameLXID + " .gameStatusIco3").css({color: "#F79400"});

                //改变rpcPost对象中game_lx、cp_type和panType属性的值为点击的那个游戏类型的值
                rpcPost['cp_type'] = lxTypeArr[0];
                rpcPost['game_lx'] = lxTypeArr[1];
                var PanType = true;
                for (var id in itemOBJ[rpcPost['cp_type']]['menu']){
                    if (PanType){
                        rpcPost['panType'] = id;
                        PanType = false;
                    }
                    continue;
                }

                Timer['panData']['currTime'] = 0;    //把Timer['panData']['currTime']的值该为0（默认情况下是10）

                rpcPost['upData'] = true;   //特定采种不更新数据

                CaiPiao['reloadMidPanData']();  //这个函数主要是把点击的游戏类型的导航栏内容动态加载到HTML页面中

                //重新加载开奖规律
                var number = "";
                (rpcPost['game_lx'] === 41) ? number = 2 : number = 6;
                getLawData(number, function (){ getLawsData() });
            });
        },

        //点击玩法导航条触发该事件改变玩法(panType)
        changePanType: function (playLx){
            var rpcPost = SaveData['attrData']['rpcPost'], Timer = SaveData['attrData']['Timer'];
            rpcPost['panType'] = playLx;
            Timer['panData']['currTime'] = 0;
            rpcPost['upData'] = true;   //特定采种不更新数据
            CaiPiao['reloadMidPanData']();  //这个函数主要是把点击的游戏类型的导航栏内容动态加载到HTML页面中
        },

        //小框架01下注点击事件
        ClickFrame_01: function (itemID){ $("#" + itemID).delegate("a", "click", function (){ Event['getOdds'](itemID, this); }); },

        //小框架02下注点击事件_01
        ClickFrame_02_01: function (itemID){
            $("#" + itemID + "Title").delegate("a", "click", function (){
                var rpcPost = SaveData['attrData']['rpcPost']

                Event['getTwoClick'](itemID, this);

                if ($("#DivOdds" + itemID)[0]){ $("#DivOdds" + itemID).remove(); }
                if (itemID === 'EZZX' || itemID === 'FCEZZX'){ $("#" + itemID + "_0").html(PAN[itemID]['td'][$(this).attr('name')]); }
                if (itemID === 'EZDW' || itemID === 'SZDW' || itemID === 'FCEZDW' || itemID === 'FCSZDW'){
                    var title = $(this).attr('name').split('_');
                    for (var i = 0, len = title.length; i <= len; i++){
                        $("#" + itemID + "_" + i).html(PAN[itemID]['td'][title[i]]);
                    }
                }
                $("#" + itemID +" :checkbox").removeAttr('checked');
            });
        },

        //小框架02下注点击事件_02
        ClickFrame_02_02: function (itemID){
            $("#" + itemID + " :checkbox").click(function (){
                var storageNo = {}, trNo = "", oddsHtml = [], jsonDataMid = SaveData['jsonDataMid']['data'];
                if (itemID === "EZDW" || itemID === "SZDW" || itemID === "FCEZDW" || itemID === 'FCSZDW'){ trNo = getPlaylxObj(itemID)['DingWei']; }
                if (itemID === "FCEZZH" || itemID === "FCZZX" || itemID === "SZSXE" || itemID === "SZZX"){ trNo = getPlaylxObj(itemID)['ZuHe']; }
                if (itemID === "EZZX" || itemID === 'FCEZZX'){ trNo = getPlaylxObj(itemID)['ZuXuan']; }
                for (var i = 0; i < trNo; i++){
                    var checkNo = $("#" + itemID + i + " input:checked");
                    storageNo[itemID + i] = [];
                    for (var j = 0, len = checkNo.length; j < len; j++){ storageNo[itemID + i].push(checkNo.eq(j).val()); }
                }
				console.log(storageNo);
                for (var id in storageNo){
                    if (storageNo[id].length === 0){
                        $("#DivOdds" + itemID).remove();
                        return;
                    }
                }

                if (itemID === "EZDW" || itemID === "SZDW" || itemID === "FCEZDW" || itemID === 'FCSZDW'){
                    var NoArr = []; //存放遍历组合的号码
                    for (var i = 0, len = storageNo[itemID + "0"].length; i < len; i++){
                        for (var j = 0, Len = storageNo[itemID + "1"].length; j < Len; j++){
                            if (storageNo[itemID + "2"]){
                                for (var k = 0, LEN = storageNo[itemID + "2"].length; k < LEN; k++){
                                    NoArr.push(storageNo[itemID + "0"][i] + " " + storageNo[itemID + "1"][j] + " " + storageNo[itemID + "2"][k]);
                                }
                            }else{
                                NoArr.push(storageNo[itemID + "0"][i] + " " + storageNo[itemID + "1"][j]);
                            }
                        }
                    }

                    var tdNum = 4, trNUm = Math.ceil( NoArr.length /tdNum);
                    if (itemID === 'FCSZDW'){
                        var oddsArr = 'FCSZ';
                    }else {
                        var oddsArr = $("#" + itemID + " .playBtn05").attr('name').split('_')
                    }
                    var oddsStr = "", sum = 0;
                    for (var i = 0, len = oddsArr.length; i < len; i++){ oddsStr += oddsArr[i]; };
                    for (var i = 0; i < trNUm; i++){
                        oddsHtml.push('<tr>');
                        for (var j = 0; j < tdNum; j++){
                            if (!NoArr[sum]){
                                oddsHtml.push('<td>&nbsp;&nbsp;</td>');
                            }else{
                                var NoStr = NoArr[sum].split(' '), numArr = [];
                                for (var k = 0, len = NoStr.length; k < len; k++){
                                    numArr.push('<span class="titleHong">'+ NoStr[k] +'</span>');
                                }
                                oddsHtml.push('<td class="oddsBox" style="width: 130px;"><span class="NumBox">'+ numArr.join('') +'</span><a name="'+ NoArr[sum] +'" style="float: right; margin-right: 6px;">'+ jsonDataMid['newOdds'][oddsStr + "DW"] +'</a></td>');
                            }
                            sum++;
                        }
                        oddsHtml.push('</tr>');
                    }

                    var odds = jsonDataMid['newOdds'][oddsStr + "DW"];
                }

                if (itemID === "FCEZZH" || itemID === "FCZZX" || itemID === "SZSXE" || itemID === "SZZX"){
                    var NoArr = []; //存放遍历组合的号码和赔率，属性是号码，值是赔率
                    var jsonDataMid = SaveData['jsonDataMid']['data']['newOdds'], sumOdds = 0, odds = 0;
                    for (var i = 0, len = storageNo[itemID + "0"].length; i < len; i++){
                        for (var j = 0, Len = storageNo[itemID + "1"].length; j < Len; j++){
                            if (itemID === "FCEZZH"){
                                if (storageNo[itemID + "0"][i] > storageNo[itemID + "1"][j]){ continue; }
                                if (storageNo[itemID + "0"][i] === storageNo[itemID + "1"][j]){ odds = jsonDataMid[itemID + "t"]; };
                                if (storageNo[itemID + "0"][i] < storageNo[itemID + "1"][j]){ odds = jsonDataMid[itemID + "y"]; };
                                NoArr[sumOdds] = [];
                                NoArr[sumOdds][0] = storageNo[itemID + "0"][i] + " " + storageNo[itemID + "1"][j];
                                NoArr[sumOdds][1] = odds;
                                sumOdds++;
                            }

                            if (itemID === "SZSXE"){
                                if (storageNo[itemID + "0"][i] > storageNo[itemID + "1"][j]){ continue; }
                                if (storageNo[itemID + "0"][i] === storageNo[itemID + "1"][j]){ odds = jsonDataMid[$("#" + itemID + "Title .playBtn05").eq(0).attr('name') + "t"]; };
                                if (storageNo[itemID + "0"][i] < storageNo[itemID + "1"][j]){ odds = jsonDataMid[$("#" + itemID + "Title .playBtn05").eq(0).attr('name') + "y"]; };
                                NoArr[sumOdds] = [];
                                NoArr[sumOdds][0] = storageNo[itemID + "0"][i] + " " + storageNo[itemID + "1"][j];
                                NoArr[sumOdds][1] = odds;
                                sumOdds++;
                            }

                            if (itemID === "FCZZX" || itemID === "SZZX"){
                                for (var k = 0, LEN = storageNo[itemID + "2"].length; k < LEN; k++){
                                    if (storageNo[itemID + "0"][i] > storageNo[itemID + "1"][j] || storageNo[itemID + "0"][i] > storageNo[itemID + "2"][k] || storageNo[itemID + "1"][j] > storageNo[itemID + "2"][k]){ continue; }
                                    if (storageNo[itemID + "0"][i] === storageNo[itemID + "1"][j] || storageNo[itemID + "1"][j] === storageNo[itemID + "2"][k]){
                                        odds = jsonDataMid[itemID + "t"];
                                        if (itemID === "SZZX"){odds = jsonDataMid[$("#" + itemID + "Title .playBtn05").eq(0).attr('name') + "t"]; }
                                    }
                                    if (storageNo[itemID + "0"][i] === storageNo[itemID + "1"][j] && storageNo[itemID + "0"][i] === storageNo[itemID + "2"][k]){
                                        odds = jsonDataMid[itemID + "a"];
                                        if (itemID === "SZZX"){odds = jsonDataMid[$("#" + itemID + "Title .playBtn05").eq(0).attr('name') + "a"]; }
                                    }
                                    if (storageNo[itemID + "0"][i] < storageNo[itemID + "1"][j] && storageNo[itemID + "1"][j] < storageNo[itemID + "2"][k]){
                                        odds = jsonDataMid[itemID + "y"];
                                        if (itemID === "SZZX"){odds = jsonDataMid[$("#" + itemID + "Title .playBtn05").eq(0).attr('name') + "y"]; }
                                    }
                                    NoArr[sumOdds] = [];
                                    NoArr[sumOdds][0] = storageNo[itemID + "0"][i] + " " + storageNo[itemID + "1"][j] + " " + storageNo[itemID + "2"][k];
                                    NoArr[sumOdds][1] = odds;
                                    sumOdds++;
                                }
                            }
                        }
                    }

 				
                    var tdNum = 4, trNUm = Math.ceil( NoArr.length /tdNum), numBer = 0;
                    for (var i = 0; i < trNUm; i++){
                        oddsHtml.push('<tr>');
                        for (var j = 0; j < tdNum; j++){
                            if (!NoArr[numBer]){
                                oddsHtml.push('<td>&nbsp;&nbsp;</td>');
                            }else{
                                var NoStr01 = NoArr[numBer][0].split(' '), numArr01 = "";
                                for (var k = 0, len = NoStr01.length; k < len; k++){
                                    numArr01 += '<span class="titleHong">'+ NoStr01[k] +'</span>'
                                }
								 if ((itemID === "SZZX" || itemID === "FCZZX") && NoStr01[0] === NoStr01[1] && NoStr01[0] === NoStr01[2]){
									 j=j-1;
								 }else{
                               		 oddsHtml.push('<td class="oddsBox" style="width: 130px;"><span class="NumBox">'+ numArr01 +'</span><a name="'+ NoArr[numBer][0] +'" style="float: right; margin-right: 6px;">'+ NoArr[numBer][1] +'</a></td>');
								 }
                            }
                            numBer++;
                        }
                        oddsHtml.push('</tr>');
                    }
					
					

					
                }

                if (itemID === "EZZX" || itemID === 'FCEZZX'){
                    var NoArr = []; //存放遍历组合的号码和赔率，属性是号码，值是赔率
                    var jsonDataMid = SaveData['jsonDataMid']['data']['newOdds'], sumOdds = 0, odds = 0;
                    if ($("#" + itemID + " input:checked").length < getPlaylxObj(itemID)['noSelect']){$("#DivOdds" + itemID).remove(); return;};
                    if (itemID === "EZZX" || itemID === 'FCEZZX'){
                        for (var i = 0, len = storageNo[itemID + "0"].length; i < len; i++){
                            for (var j = 0, LEN = storageNo[itemID + "0"].length; j < LEN; j++){
                                if (storageNo[itemID + "0"][i] === storageNo[itemID + "0"][j] || storageNo[itemID + "0"][i] > storageNo[itemID + "0"][j]){ continue; }
                                odds = jsonDataMid[$("#" + itemID + "Title .playBtn05").eq(0).attr('name')];
                                NoArr[sumOdds] = [];
                                NoArr[sumOdds][0] = storageNo[itemID + "0"][i] + " " + storageNo[itemID + "0"][j];
                                NoArr[sumOdds][1] = odds;
                                sumOdds++;
                            }
                        }
                    }

                    var tdNum = 4, trNUm = Math.ceil( NoArr.length /tdNum), numBer = 0;
                    for (var i = 0; i < trNUm; i++){
                        oddsHtml.push('<tr>');
                        for (var j = 0; j < tdNum; j++){
                            if (!NoArr[numBer]){
                                oddsHtml.push('<td>&nbsp;&nbsp;</td>');
                            }else{
                                var NoStr02 = NoArr[numBer][0].split(' '), numArr02 = "";
                                for (var k = 0, len = NoStr02.length; k < len; k++){
                                    numArr02 += '<span class="titleHong">'+ NoStr02[k] +'</span>'
                                }
                                oddsHtml.push('<td class="oddsBox" style="width: 130px;"><span class="NumBox">'+ numArr02 +'</span><a name="'+ NoArr[numBer][0] +'" style="float: right; margin-right: 6px;">'+ NoArr[numBer][1] +'</a></td>');
                            }
                            numBer++;
                        }
                        oddsHtml.push('</tr>');
                    }
                }

                if (!$("#DivOdds" + itemID)[0]){
                    var html = [];
                    var boxHtml = CodeHTML['createHTML_01']( itemID, $("#" + itemID + "Title .playBtn05").attr('name') );  //加载HTML代码_01
                    var tableHtml = CodeHTML['createHTML_02'](itemID + "DW");    //加载HTML代码_02
                    html.push(boxHtml[0]);
                    html.push(tableHtml[0]);
                    html.push(oddsHtml.join(''));
                    html.push(tableHtml[1]);
                    html.push(boxHtml[1]);
                    $('#' + itemID + '_box').after('<div id="DivOdds'+ itemID +'">'+ html.join('') +'</div>');
                }else{
                    $("#" + itemID + "DW").html(oddsHtml.join(''));
                }

                if ($("#" + itemID + "DW")[0]){ $("#" + itemID + "DW a").click(function (){ Event['ClickFrame_02_03'](itemID, $(this).html(), $(this).attr('name')) }); }
            });
        },

        //小框架02下注点击事件_03
        ClickFrame_02_03: function (itemID, odds, betObj){
			console.log(itemID,odds,betObj);
            if (getCookie('uid')){
                //判断投注列表的注单是否超过10注
                if ($("#orderList .orderDelete").length === 10) {
                    alertBox( '', '投注列表的注单已超过10注!<br>请先提交注单', '' );
                    return;
                }

                var rpcPost = SaveData['attrData']['rpcPost'], PlayLX = "";

                if (itemID === "EZDW" || itemID === "SZDW" || itemID === "FCEZDW"){
                    var play_lx = $("#" + itemID + "Title .playBtn05").attr('name')
                    var playLX = "";
                    for (var i = 0, len = play_lx.split('_').length; i < len; i++){
                        playLX += play_lx.split('_')[i];
                    }
                    PlayLX = playLX + "DW";
                }

                if (itemID === "FCEZZH" || itemID === "FCZZX"){ play_lx = itemID; PlayLX = itemID; }

                if (itemID === "EZZX" || itemID === "SZSXE" || itemID === 'FCEZZX' || itemID === "SZZX"){
                    play_lx = $("#" + itemID + "Title .playBtn05").attr('name');
                    PlayLX = play_lx;
                }

                if (itemID === 'FCSZDW'){
                    PlayLX = play_lx = itemID;
                }

                var bet_obj = "", obj_name = "";
                for (var i = 0, len = betObj.split(' ').length; i < len; i++){
                    (i === 0) ? bet_obj += betObj.split(' ')[i] : bet_obj += "_" + betObj.split(' ')[i]
                }
                obj_name = bet_obj;

                var playOBJ = play_lx + bet_obj;

                //判断是否新增玩法
                var isNew = true;
                for( var id in rpcPost['betBrders'] ){
                    if(typeof(rpcPost['betBrders'][id]) == "undefined"){ continue; }
                    if( rpcPost['betBrders'][id]['play_lx'] == play_lx ){ isNew = false; }
                }

                //如果是新增的玩法执行if语句
                if (isNew){
                    var post = {'actID':301,'uid': getCookie('uid'), 'game_lx':rpcPost['game_lx'], 'play_lx': PlayLX};
                    getServerData( post, 'SaveData["moneyGD"]', function (){ intBetFormData(play_lx); });
                }

                //判断用户点击的是否是同一彩票种类
                for (var id in rpcPost['betBrders']){
                    if (rpcPost['betBrders'][id] == undefined){ continue; }
                    if (rpcPost['betBrders'][id]['game_lx'] !== rpcPost['game_lx']){ rpcPost['betBrders'] = {}; }
                }

                //增加一条注单数据
                rpcPost['betBrders'][playOBJ] = { 'periods':rpcPost['newPeriods'] , 'game_lx': rpcPost['game_lx'], 'play_lx':PlayLX, 'bet_obj':bet_obj, 'betMoney':0,  'odds':odds, 'obj_name':obj_name };
				objname=bet_obj;
                //把注单数据加载到页面
                betDataHTML(itemID, playOBJ, play_lx, bet_obj, odds,objname);
            }else{
                alertBox( '', '用户还没登陆账户！', '' );
                return;
            }
        },

        //小框架03下注点击事件_01
        ClickFrame_03_01: function (itemID){
            if ($("#" + itemID + "Title")[0]){
                $("#" + itemID +"Title a").click(function (){
                    Event['getTwoClick'](itemID, this);
                    $("#" + itemID + " :checkbox").removeAttr('checked');
                    $("#" + itemID + " :checkbox").removeAttr('disabled');
                    $("#" + itemID + "Odds").html('');
                    $("#play" + itemID).html(PAN[itemID]['tr']['tr0']['td'][$(this).attr('name')]);
                });
            }

            $("#" + itemID + " :checkbox").click(function (){
                var userSelect = $("#" + itemID + " input:checked");
                var jsonDataMid = SaveData['jsonDataMid']['data']['newOdds'];
                $("#" + itemID + "Odds").html('');
                if (itemID === 'FCHSZXS' || itemID === 'FCHSZXL' || itemID === 'ZXS' || itemID === 'ZXL'){
                    if (userSelect.length < PAN[itemID]['td'][1]){$("#" + itemID + " :checkbox").removeAttr('disabled');}
                    if (userSelect.length >= PAN[itemID]['td'][0] && userSelect.length <= PAN[itemID]['td'][1]){
                        var ItemID = itemID;
                        if (itemID === 'ZXS' || itemID === 'ZXL'){ ItemID = $("#" + itemID +" .playBtn05").attr('name') }
                        $("#" + itemID +"Odds").html(jsonDataMid[ItemID + userSelect.length]);
                        if (userSelect.length == PAN[itemID]['td'][1]){ $("#" + itemID + " :not(:checked)").attr({'disabled': 'disabled'}); }
                    }
                }

                if (itemID === 'YWRX' || itemID === 'YWQEZUX' || itemID === 'YWQSZUX'){
                    var numberObj = {YWXEZE: 2, YWXSZS: 3, YWXSIZSI: 4, YWXWZW: 5, YWXLZW: 6, YWXQZW: 7, YWXBZW: 8, YWQSZUX: 3, YWQEZUX: 2};
                    var playStr = $("#" + itemID + " .playBtn05").attr('name');
                    if (itemID === 'YWQEZUX' || itemID === 'YWQSZUX'){ playStr = itemID; }

                    $("#" + itemID + " :checkbox").removeAttr('disabled');
                    if (userSelect.length === numberObj[playStr]){
                        $("#" + itemID +"Odds").html(jsonDataMid[playStr]);
                        $("#" + itemID + " input[type='checkbox']:not(:checked)").attr({disabled: 'disabled'});
                    }
                }

                if (itemID === "YWQSZHX" || itemID === "YWQEZHX"){
                    var current = $(this).parent('lable').parent('td').parent().attr('id');
                    console.log(current);
					var checkBoxNot = $("#" + current + " input[type='checkbox']:not(:checked)");
                    var isCheckBox = $("#" + itemID + " input[type='checkbox']:checked");
                    var checkBox = $("#" + itemID + " :checkbox");
                    checkBox.removeAttr('disabled');
                    var checkVal = {};
                    for (var i = 0, len = isCheckBox.length; i < len; i++){
                        if (!isCheckBox[i]){ continue; }
                        checkVal[isCheckBox.eq(i).parent().parent().parent().parent().attr('id')] = isCheckBox.eq(i).val();

                    }
					console.log(isCheckBox);
                    for (var id in checkVal){
                        $("#"+ id + " input[type='checkbox']:not(:checked)").attr({disabled: 'disabled'});
                        $("#" + itemID + " input[value='"+ checkVal[id] +"']").attr({disabled: 'disabled'});
                        $("#" + itemID + " input[value='"+ checkVal[id] +"']:checked").removeAttr('disabled');
                    }

                    var CDObj = {YWQSZHX: 3, YWQEZHX: 2}
                    if (isCheckBox.length === CDObj[itemID]){
                        var jsonDataMid = SaveData['jsonDataMid']['data']['newOdds'];
                        var showOdds = jsonDataMid[itemID];
                        $("#" + itemID + "Odds").html(showOdds);
                    }

                }
				
            });

            $("#" + itemID + "Odds").click(function (){
                if (getCookie('uid')){
                    //判断投注列表的注单是否超过10注
                    if ($("#orderList .orderDelete").length === 10) {
                        alertBox( '', '投注列表的注单已超过10注!<br>请先提交注单', '' );
                        return;
                    }

                    if ($("#" + itemID + "Odds").html() !== ""){
                        var rpcPost = SaveData['attrData']['rpcPost'];
                        var setNo = $("#" + itemID + " input:checked");
                        var play_lx = $("#" + itemID + " .playBtn05").attr('name');
                        if (play_lx == undefined){ play_lx = itemID; }

                        var bet_obj = "", obj_name = "";
                        for (var i = 0, len = setNo.length; i < len; i++){ (i === 0) ? bet_obj += setNo.eq(i).val() : bet_obj += ('_' + setNo.eq(i).val()); }
                        obj_name = bet_obj;

                        var playOBJ = play_lx + bet_obj;
                        var odds = SaveData['jsonDataMid']['data']['newOdds'][play_lx + setNo.length];
                        if (itemID === 'YWRX' || itemID === 'YWQEZUX' || itemID === 'YWQSZUX' || itemID === 'YWQSZHX' || itemID === 'YWQEZHX'){ odds = SaveData['jsonDataMid']['data']['newOdds'][play_lx]; }

                        //判断是否新增玩法
                        var isNew = true;
                        for( var id in rpcPost['betBrders'] ){
                            if(typeof(rpcPost['betBrders'][id]) == "undefined"){ continue; }
                            if( rpcPost['betBrders'][id]['play_lx'] == play_lx ){ isNew = false; }
                        }

                        //如果是新增的玩法执行if语句
                        if (isNew){
                            var post = {'actID':301,'uid': getCookie('uid'), 'game_lx':rpcPost['game_lx'], 'play_lx':play_lx };
                            getServerData( post, 'SaveData["moneyGD"]', function (){ intBetFormData(play_lx); });
                        }

                        //判断用户点击的是否是同一彩票种类
                        for (var id in rpcPost['betBrders']){
                            if (rpcPost['betBrders'][id] == undefined){ continue; }
                            if (rpcPost['betBrders'][id]['game_lx'] !== rpcPost['game_lx']){ rpcPost['betBrders'] = {}; }
                        }

                        //增加一条注单数据
                        rpcPost['betBrders'][playOBJ] = { 'periods':rpcPost['newPeriods'] , 'game_lx': rpcPost['game_lx'], 'play_lx':play_lx, 'bet_obj':bet_obj, 'betMoney':0,  'odds':odds, 'obj_name':obj_name };

                        var betObjArr = bet_obj.split('_'), betObj = "";
                        for (var i = 0, len = betObjArr.length; i < len; i++){
                            (i === 0) ? betObj += betObjArr[i] : betObj += ('，' + betObjArr[i]);
                        }
                        obj_name = betObj;
						objname= bet_obj;
                        //把注单数据加载到页面
                        betDataHTML(itemID, playOBJ, play_lx, betObj, odds,objname);
                    };
                }else{
                    alertBox( '', '用户还没登陆账户！', '' );
                    return;
                }
            });
        },

        //小框架04下注点击事件_01
        ClickFrame_04_01: function (itemID){
            $("#" + itemID + "empty").click(function (){
                $("#" + itemID + " input[type='radio']").removeAttr('checked');
                $("#"+ itemID +"Odds").html('');
            });

            $("#" + itemID + " input[type='radio']").click(function (){
                    var userSelect = $("#" + itemID + " input[type='radio']:checked");
                    if (userSelect.length > 1){
                        var bet_obj = "", odds = 1;
                        for (var i = 0, len = userSelect.length; i < len; i++){ (i === 0) ? bet_obj += userSelect.eq(i).val() : bet_obj += ('_' + userSelect.eq(i).val()); }
                        var betObjArr = bet_obj.split('_'), betObj = "", jsonDataMid = SaveData['jsonDataMid']['data'];
                        for (var i = 0, len = betObjArr.length; i < len; i++){
                            odds *= jsonDataMid['newOdds'][betObjArr[i]];
                            var DStr = Event['getDaXiaoString'](betObjArr[i], 'd');
                            var XStr = Event['getDaXiaoString'](betObjArr[i], 'x');
                            (i === 0) ? betObj += objName[DStr] + '_' + objName[XStr] : betObj += ('，' + objName[DStr] + '_' + objName[XStr]);
                        }
                        $("#"+ itemID +"Odds").html(odds.toFixed(2));
                    };
            });

            $("#" + itemID + "sure").click(function (){
                if (getCookie('uid')){
                    //判断投注列表的注单是否超过10注
                    if ($("#orderList .orderDelete").length === 10) {
                        alertBox( '', '投注列表的注单已超过10注!<br>请先提交注单', '' );
                        return;
                    }

                    jsonDataMid = SaveData['jsonDataMid']['data'];
                    var userSelect = $("#" + itemID + " input[type='radio']:checked");
                    if (userSelect.length > 1){
                        var rpcPost = SaveData['attrData']['rpcPost'];
                        var play_lx = itemID, odds = 1;

                        var bet_obj = "", obj_name = "";
                        for (var i = 0, len = userSelect.length; i < len; i++){ (i === 0) ? bet_obj += userSelect.eq(i).val() : bet_obj += ('_' + userSelect.eq(i).val()); }
                        obj_name = bet_obj;
                        var playOBJ = play_lx + bet_obj;

                        //判断是否新增玩法
                        var isNew = true;
                        for( var id in rpcPost['betBrders'] ){
                            if(typeof(rpcPost['betBrders'][id]) == "undefined"){ continue; }
                            if( rpcPost['betBrders'][id]['play_lx'] == play_lx ){ isNew = false; }
                        }

                        //如果是新增的玩法执行if语句
                        if (isNew){
                            var post = {'actID':301,'uid': getCookie('uid'), 'game_lx':rpcPost['game_lx'], 'play_lx':play_lx };
                            getServerData( post, 'SaveData["moneyGD"]', function (){ intBetFormData(play_lx); });
                        }

                        //判断用户点击的是否是同一彩票种类
                        for (var id in rpcPost['betBrders']){
                            if (rpcPost['betBrders'][id] == undefined){ continue; }
                            if (rpcPost['betBrders'][id]['game_lx'] !== rpcPost['game_lx']){ rpcPost['betBrders'] = {}; }
                        }

                        var betObjArr = bet_obj.split('_'), betObj = "", jsonDataMid = SaveData['jsonDataMid']['data'];
                        for (var i = 0, len = betObjArr.length; i < len; i++){
                            odds *= jsonDataMid['newOdds'][betObjArr[i]];
                            var DStr = Event['getDaXiaoString'](betObjArr[i], 'd');
                            var XStr = Event['getDaXiaoString'](betObjArr[i], 'x');
                            (i === 0) ? betObj += objName[DStr] + '_' + objName[XStr] : betObj += ('，' + objName[DStr] + '_' + objName[XStr]);
                        }

                        odds = odds.toFixed(2);

                        if (play_lx === "FCYZGG" || play_lx === "LHGG"){
                            bet_obj = bet_obj.split(/'+ play_lx +'/gim).join('');
                            if (play_lx === "FCYZGG"){bet_obj = bet_obj.replace(/FCYZGG/gim,'')}
                            if (play_lx === "LHGG"){bet_obj = bet_obj.replace(/LHGG/gim,'')}
                            obj_name = bet_obj;
							objname=bet_obj;
                        }

                        //增加一条注单数据
                        rpcPost['betBrders'][playOBJ] = { 'periods':rpcPost['newPeriods'] , 'game_lx': rpcPost['game_lx'], 'play_lx':play_lx, 'bet_obj':bet_obj, 'betMoney':0,  'odds':odds, 'obj_name':obj_name };

                        //把注单数据加载到页面
                        betDataHTML(itemID, playOBJ, play_lx, betObj, odds, objname);

                        $("#"+ itemID +"Odds").html(''); //清空显示在六合彩过关的赔率
                    }else{
                        alertBox( '', '至少选择2个赔率以上才能投票！', '' );
                        return;
                    }
                }else{
                    alertBox( '', '用户还没登陆账户！', '' );
                    return;
                }
            });
        },

        //小框架05下注点击事件_05
        ClickFrame_05_01: function (itemID){
            if ($("#" + itemID + "Title")[0]){
                $("#" + itemID +"Title a").click(function (){
                    Event['getTwoClick'](itemID, this);
                    $("#" + itemID + " :checkbox").removeAttr('checked');
                    $("#" + itemID + " :checkbox").removeAttr('disabled');
                    $("#" + itemID + "Odds").html('');
                    if (itemID === 'LHZXBZ' || itemID === 'LHLM'|| itemID === 'KBBJKLXH'){
                        $("#" + itemID + " .playTitle").html(PAN[itemID]['tr']['tr0']['td'][$(this).attr('name')]);
                    }
                });
            }
        },

        //小框架05下注点击事件_05
        ClickFrame_05_02: function (itemID){
            $("#" + itemID + " :checkbox").click(function (){
                var jsonDataMid = SaveData['jsonDataMid']['data']['newOdds'], rpcPost = SaveData['attrData']['rpcPost'];
                if (itemID === 'LHZXBZ' || itemID === 'LHLM'|| itemID === 'KBBJKLXH'){
                    var gamePlay = $("#" + itemID + " .playBtn05").eq(0).attr('name'), showOdds = "";
                    var sum = PAN[itemID]['tr']['tr0'];
                    var userSelect = $("#" + itemID + " input:checked");
                    $("#" + itemID + " :checkbox").removeAttr('disabled');
                    if (userSelect.length >= sum['oddsNo'][gamePlay]){ $("#" + itemID + " input[type='checkbox']:not(:checked)").attr({disabled: 'disabled'}); }
                    if (itemID === 'LHZXBZ' && userSelect.length === sum['oddsNo'][gamePlay]){ showOdds = jsonDataMid[itemID + userSelect.length]; }
                    if ((itemID === 'LHLM' || itemID === 'KBBJKLXH') && userSelect.length === sum['oddsNo'][gamePlay]){
                        showOdds = "[ " + jsonDataMid[gamePlay] + " ]";
                        if (gamePlay === 'LHEZT' || gamePlay === 'LHSZE'|| gamePlay === 'KBXS'|| gamePlay === 'KBXSI'|| gamePlay === 'KBXW'){
                            var sumber = 0;
                            showOdds = "[ "
                            for (var id in sum[gamePlay]){
                                (sumber === 0) ? showOdds += sum[gamePlay][id] +"："+ jsonDataMid[gamePlay + id] : showOdds += "，" + sum[gamePlay][id] +"："+ jsonDataMid[gamePlay + id];
                                sumber++;
                            }
                            showOdds += " ]"
                        }
                    }
                    $("#" + itemID + "Odds").html(showOdds);
                }

                if (itemID === 'FCFSZH'){
                    var allSelect = $("#" + itemID + " input:checkbox")
                    var userSelect = $("#" + itemID + " input:checked");
                    if (userSelect.length >= 9 && userSelect.length <= 21){
                        for (var i = 0, len = PAN[itemID]['td'].length; i < len; i++){
                            if ($("#" + PAN[itemID]['td'][i] + " input[type='checkbox']:not(:checked)").length === 10){
                                alertBox( '', '下注错误！请查看投注规则', '' );
                                return;
                            }
                        }
                        $("#" + itemID + " :checkbox").removeAttr('disabled');
                        var oddsNo = $("#B input:checked").length * $("#S input:checked").length * $("#G input:checked").length;
                        var FSZHOdds = (jsonDataMid[itemID]/oddsNo).toFixed(2);
                        $("#" + itemID + "Odds").html(FSZHOdds);
                        showOdds = FSZHOdds;
                        if (userSelect.length === 21){ $("#" + itemID + " input[type='checkbox']:not(:checked)").attr({disabled: 'disabled'}); }
                    }else{
                        $("#" + itemID + "Odds").html('');
                    }
                }

                if (itemID === 'PKQE' || itemID === 'PKQS' || itemID === 'PKQSI'){
                    var current = $(this).parent('lable').parent('td').parent().attr('id');
                    var checkBoxNot = $("#" + current + " input[type='checkbox']:not(:checked)");
                    var isCheckBox = $("#" + itemID + " input[type='checkbox']:checked");
                    var checkBox = $("#" + itemID + " :checkbox");
                    checkBox.removeAttr('disabled');
                    var checkVal = {};
                    for (var i = 0, len = isCheckBox.length; i < len; i++){
                        if (!isCheckBox[i]){ continue; }
                        checkVal[isCheckBox.eq(i).parent().parent().parent().parent().attr('id')] = isCheckBox.eq(i).val();

                    }
                    for (var id in checkVal){
                        $("#"+ id + " input[type='checkbox']:not(:checked)").attr({disabled: 'disabled'});
                        $("#" + itemID + " input[value='"+ checkVal[id] +"']").attr({disabled: 'disabled'});
                        $("#" + itemID + " input[value='"+ checkVal[id] +"']:checked").removeAttr('disabled');
                    }

                    var checkObj = {PKQE: 2, PKQS: 3, PKQSI: 4}, showOdds = "", oddsStrObj = {PKQE: ['中二', '中一'], PKQS: ['中三', '中二'], PKQSI: ['中四', '中三', '中二']};
                    if (isCheckBox.length === checkObj[itemID]){
                        for (var i = 0, len = oddsStrObj[itemID].length; i < len; i++){
                            (i === 0) ? showOdds += oddsStrObj[itemID][i] +"："+ jsonDataMid[itemID + i] : showOdds += "，" + oddsStrObj[itemID][i] +"："+ jsonDataMid[itemID + i];
                        }
                    }
                    $("#" + itemID + "Odds").html(showOdds);
                }
                rpcPost['Frame_05_OBJ'][itemID] = showOdds; //存放当前赔率
            });
        },

        //选号重置按钮
        selBtnFn: function (itemID){
            $("#" + itemID + " :checkbox").removeAttr('checked');
            $("#" + itemID + " :checkbox").removeAttr('disabled');
            $("#" + itemID + "Odds").html('');
        },

        //小框架05下注点击事件_05
        ClickFrame_05_03: function (itemID){
            $("#"+ itemID +"empty").click(function (){Event['selBtnFn'](itemID)});

            $("#"+ itemID +"sure").click(function (){
                if (getCookie('uid')){
                    //判断投注列表的注单是否超过10注
                    if ($("#orderList .orderDelete").length === 10) {
                        alertBox( '', '投注列表的注单已超过10注!<br>请先提交注单', '' );
                        return;
                    }

                    if ($("#" + itemID + "Odds").html() !== ""){
                        var userSelect = $("#" + itemID + " input:checked");
                        var rpcPost = SaveData['attrData']['rpcPost'];
                        var play_lx, odds;

                        if (itemID === 'FCFSZH' || itemID === 'PKQE' || itemID === 'PKQS' || itemID === 'PKQSI'){ play_lx = itemID; }

                        if (itemID === 'LHZXBZ'){ play_lx = itemID; }

                        if (itemID === 'LHLM' || itemID === 'KBBJKLXH'){ play_lx = $("#" + itemID + " .playBtn05").eq(0).attr('name'); }

                        var bet_obj = "", obj_name = "";
                        for (var i = 0, len = userSelect.length; i < len; i++){ (i === 0) ? bet_obj += userSelect.eq(i).val() : bet_obj += ('_' + userSelect.eq(i).val()); }
                        obj_name = bet_obj;

                        var playOBJ = play_lx + bet_obj;

                        var ODDS = odds = rpcPost['Frame_05_OBJ'][itemID];

                        if (itemID === 'FCFSZH'){
                            var bet_obj = {}, obj_name = "", BSG = ["B", "S", "G"];
                            for (var i = 0, len = BSG.length; i < len; i++){
                                bet_obj[BSG[i]] = [];
                                for (var j = 0, LEN = $("#"+ BSG[i] +" input:checked").length; j < LEN; j++){
                                    bet_obj[BSG[i]].push($("#"+ BSG[i] +" input:checked").eq(j).val());
                                }
                            }
                            obj_name = bet_obj;

                            ODDS = odds = $("#" + itemID +"Odds").html();
                        }

                        //判断是否新增玩法
                        var isNew = true;
                        for( var id in rpcPost['betBrders'] ){
                            if(typeof(rpcPost['betBrders'][id]) == "undefined"){ continue; }
                            if( rpcPost['betBrders'][id]['play_lx'] == play_lx ){ isNew = false; }
                        }

                        //如果是新增的玩法执行if语句
                        if (isNew){
                            var post = {'actID':301,'uid': getCookie('uid'), 'game_lx':rpcPost['game_lx'], 'play_lx':play_lx };
                            getServerData( post, 'SaveData["moneyGD"]', function (){ intBetFormData(play_lx); });
                        }

                        //判断用户点击的是否是同一彩票种类
                        for (var id in rpcPost['betBrders']){
                            if (rpcPost['betBrders'][id] == undefined){ continue; }
                            if (rpcPost['betBrders'][id]['game_lx'] !== rpcPost['game_lx']){ rpcPost['betBrders'] = {}; }
                        }

                        //特殊玩法
                        if (itemID === 'LHLM' || itemID === 'KBBJKLXH' || itemID === 'PKQE' || itemID === 'PKQS' || itemID === 'PKQSI'){ ODDS = 1; }

                        //增加一条注单数据
                        rpcPost['betBrders'][playOBJ] = { 'periods':rpcPost['newPeriods'] , 'game_lx': rpcPost['game_lx'], 'play_lx':play_lx, 'bet_obj':bet_obj, 'betMoney':0,  'odds':ODDS, 'obj_name':obj_name };

                        var betObj = "";
                        if (itemID === 'FCFSZH'){
                            var BSGOBJ = {"B": "佰", "S": "拾", "G": "个"}, num = 0;
                            for (var id in bet_obj){
                                (num === 0) ? betObj += BSGOBJ[id] + ":[" + bet_obj[id] + "] " : betObj += "，" + BSGOBJ[id] + ":[" + bet_obj[id] + "] ";
                            }
                        }else{
                            var betObjArr = bet_obj.split('_');
                            for (var i = 0, len = betObjArr.length; i < len; i++){
                                (i === 0) ? betObj += betObjArr[i] : betObj += ('，' + betObjArr[i]);
                            }
                            obj_name = betObj;
                        }


                        if (itemID === 'LHZXBZ'){ play_lx = itemID + $("#" + itemID + " .playBtn05").eq(0).attr('name'); }

                        //把注单数据加载到页面
						objname=bet_obj;
                        betDataHTML(itemID, playOBJ, play_lx, betObj, odds,objname);

                        Event['selBtnFn'](itemID);
                    }
                }else{
                    alertBox( '', '用户还没登陆账户！', '' );
                    return;
                }
            });
        },

        //小框架06下注点击事件_06
        ClickFrame_06_01: function (itemID){ $("#" + itemID).delegate("a", "click", function (){ Event['getOdds'](itemID, this); }); },

        //小框架07下注点击事件_07
        ClickFrame_07_01: function (itemID){
            $("#" + itemID + "Title").delegate("a", "click", function (){
                Event['getTwoClick'](itemID, this);
                $("#" + itemID + "Odds").html('');
                $("#" + itemID + " :checkbox").removeAttr('checked');
            });
        },

        //小框架07下注点击事件_07
        ClickFrame_07_02: function (itemID){
            $("#" + itemID + " :checkbox").click(function (){
                var jsonDataMid = SaveData['jsonDataMid']['data']['newOdds'];
                var setNo = $("#" + itemID + " input:checked");
                var oddsStr = itemID + ($("#" + itemID + " .playBtn05").attr('name')) + setNo.length
                if (setNo.length > 11){
                    $("#" + itemID + " not(:checkbox)").css({disabled: "disabled"});
                    return false;
                }

                $("#" + itemID + "Odds").attr({name: oddsStr});
                $("#" + itemID + "Odds").html(jsonDataMid[oddsStr]);
                if (setNo.length === 0){ $("#" + itemID + "Odds").html(''); }
            });
        },

        //小框架07下注点击事件_07
        ClickFrame_07_03: function (itemID){
            $("#"+ itemID +"Odds").click(function (){
                if (getCookie('uid')){
                    //判断投注列表的注单是否超过10注
                    if ($("#orderList .orderDelete").length === 10) {
                        alertBox( '', '投注列表的注单已超过10注!<br>请先提交注单', '' );
                        return;
                    }

                    var rpcPost = SaveData['attrData']['rpcPost'];
                    var setNo = $("#" + itemID + " input:checked");
                    var play_lx = itemID + ($("#" + itemID + " .playBtn05").attr('name'));

                    var bet_obj = "", obj_name = "";
                    for (var i = 0, len = setNo.length; i < len; i++){ (i === 0) ? bet_obj += setNo.eq(i).val() : bet_obj += ('_' + setNo.eq(i).val()); }
                    obj_name = bet_obj;

                    var playOBJ = play_lx + bet_obj;
                    var odds = SaveData['jsonDataMid']['data']['newOdds'][play_lx + setNo.length];

                    //判断是否新增玩法
                    var isNew = true;
                    for( var id in rpcPost['betBrders'] ){
                        if(typeof(rpcPost['betBrders'][id]) == "undefined"){ continue; }
                        if( rpcPost['betBrders'][id]['play_lx'] == play_lx ){
							isNew = false;
						}
                    }

                    //如果是新增的玩法执行if语句
                    if (isNew){
                        var post = {'actID':301,'uid': getCookie('uid'), 'game_lx':rpcPost['game_lx'], 'play_lx':play_lx };
                        getServerData( post, 'SaveData["moneyGD"]', function (result){
							intBetFormData(play_lx); 
							console.log(post);
							console.log(SaveData["moneyGD"]);
						});
                    }
					console.log(rpcPost);
                    //判断用户点击的是否是同一彩票种类
                    for (var id in rpcPost['betBrders']){
                        if (rpcPost['betBrders'][id] == undefined){ continue; }
                        if (rpcPost['betBrders'][id]['game_lx'] !== rpcPost['game_lx']){
							rpcPost['betBrders'] = {};
						}
                    }

                    //增加一条注单数据
                    rpcPost['betBrders'][playOBJ] = { 'periods':rpcPost['newPeriods'] , 'game_lx': rpcPost['game_lx'], 'play_lx':play_lx, 'bet_obj':bet_obj, 'betMoney':0,  'odds':odds, 'obj_name':obj_name };
					console.log(rpcPost['betBrders'][playOBJ]);
                    var betObjArr = bet_obj.split('_'), betObj = "";
                    for (var i = 0, len = betObjArr.length; i < len; i++){
                        (i === 0) ? betObj += objName[betObjArr[i]] : betObj += ('，' + objName[betObjArr[i]]);
                    }
                    obj_name = betObj;
					objname=bet_obj;
					
                    //把注单数据加载到页面
                    betDataHTML(itemID, playOBJ, play_lx, betObj, odds,objname);
					console.log(itemID, playOBJ, play_lx, betObj, odds,objname);
                }else{
                    alertBox( '', '用户还没登陆账户！', '' );
                    return;
                }
            });
        },

        //小框架08下注点击事件_08
        ClickFrame_08_01: function (itemID){
            $("#" + itemID + "Title").delegate("a", "click", function (){
                var jsonDataMid = SaveData['jsonDataMid'], sum = 0;
                Event['getTwoClick'](itemID, this); //导航栏改变class
                //用于更新赔率
                for( var id in PAN[itemID]['tr'] ){
                    var row = PAN[itemID]['tr'][id];
                    if (row['title_odds_box'] || row['title_box']){
                        for (var id in row['lotteryNo']){
                            $("#" + itemID + " .showOdds, #" + itemID + " .showOdds01").eq(sum).html(jsonDataMid['data']['newOdds'][($(this).attr('name')) + id]);
                            $("#" + itemID + " input[type='checkbox']").eq(sum).val($(this).attr('name') + id);
                            sum++;
                        }
                    };
                }
                $("#" + itemID + " .showOdds01").removeClass().addClass('showOdds');

                //清空点击了的复选框
                $("#" + itemID + " input[type='checkbox']").removeAttr('checked').removeAttr('disabled')
            });
        },

        //小框架08下注点击事件_08
        ClickFrame_08_02: function (itemID){
            $("#" + itemID + " input[type='checkbox']").click(function (){
                var number = PAN[itemID]['tr']['tr0']['number'], name = $("#" + itemID + "Title .playBtn05").attr('name');
                var inputChecked = $("#" + itemID + " input:checked");
                $("#" + itemID + " input[type='checkbox']").removeAttr('disabled')
                if (inputChecked.length >= number[name]){ $("#" + itemID + " input[type='checkbox']:not(:checked)").attr({disabled: 'disabled'}); }
            });

            //重置按钮点击事件
            $("#" + itemID + "empty").click(function (){
                $("#" + itemID + " input[type='checkbox']").removeAttr('checked').removeAttr('disabled');
            });

            //确定按钮点击事件
            $("#" + itemID + "sure").click(function (){
                if (getCookie('uid')){
                    //判断投注列表的注单是否超过10注
                    if ($("#orderList .orderDelete").length === 10) {
                        alertBox( '', '投注列表的注单已超过10注!<br>请先提交注单', '' ); return;
                    }

                    var number = PAN[itemID]['tr']['tr0']['number'], name = $("#" + itemID + "Title .playBtn05").attr('name');
                    var inputChecked = $("#" + itemID + " input:checked");
                    if (inputChecked.length === number[name]){
                        var newOdds = SaveData['jsonDataMid']['data']['newOdds'];
                        var rpcPost = SaveData['attrData']['rpcPost'], checked = $("#" + itemID + " input:checked");
                        var play_lx = Event['getDaXiaoString'](checked.eq(0).val(), 'd');
                        var bet_obj = "", obj_name = "", odds = 0;
                        for (var i = 0, len = checked.length; i < len; i++){
                            var nameMing = checked.eq(i).val();
                            (i === 0) ? bet_obj += Event['getDaXiaoString'](nameMing, 'x') : bet_obj += '_' + Event['getDaXiaoString'](nameMing, 'x');
                            if (odds === 0){
                                odds = newOdds[nameMing];
                            }else{
                                if (itemID == 'LHLX' && (parseInt(odds, 10) > parseInt(newOdds[nameMing], 10)) ){ odds = newOdds[nameMing]; }
                                if (itemID == 'LHLW' && (parseInt(odds, 10) < parseInt(newOdds[nameMing], 10)) ){ odds = newOdds[nameMing]; }
                            }
                        }
                        obj_name = bet_obj;
                        var playOBJ = play_lx + bet_obj;
						console.log(playOBJ);
                        //判断是否新增玩法
                        var isNew = true;
                        for( var id in rpcPost['betBrders'] ){
                            if(typeof(rpcPost['betBrders'][id]) == "undefined"){ continue; }
                            if( rpcPost['betBrders'][id]['play_lx'] == play_lx ){ isNew = false; }
                        }

                        //如果是新增的玩法执行if语句
                        if (isNew){
                            var post = {'actID':301,'uid': getCookie('uid'), 'game_lx':rpcPost['game_lx'], 'play_lx':play_lx };
                            getServerData( post, 'SaveData["moneyGD"]', function (){ intBetFormData(play_lx); });
                        }

                        //判断用户点击的是否是同一彩票种类
                        for (var id in rpcPost['betBrders']){
                            if (rpcPost['betBrders'][id] == undefined){ continue; }
                            if (rpcPost['betBrders'][id]['game_lx'] !== rpcPost['game_lx']){ rpcPost['betBrders'] = {}; }
                        }

                        //增加一条注单数据
                        rpcPost['betBrders'][playOBJ] = { 'periods':rpcPost['newPeriods'] , 'game_lx': rpcPost['game_lx'], 'play_lx':play_lx, 'bet_obj':bet_obj, 'betMoney':0,  'odds':odds, 'obj_name':obj_name };

                        var betObjArr = bet_obj.split('_'), betObj = "";
                        for (var i = 0, len = betObjArr.length; i < len; i++){
                            if (itemID == 'LHLX'){
                                (i === 0) ? betObj += objName[betObjArr[i]] : betObj += ('，' + objName[betObjArr[i]]);
                            }else{
                                (i === 0) ? betObj += betObjArr[i] : betObj += ('，' + betObjArr[i]);
                            }
                        }
                        obj_name = betObj;
						objname=bet_obj;
                        //把注单数据加载到页面
                        betDataHTML(itemID, playOBJ, play_lx, betObj, odds,objname);
                    }
                }else{
                    alertBox( '', '用户还没登陆账户！', '' ); return;
                }
            });
        },

        //小框架09下注点击事件_09
        ClickFrame_09_01: function (itemID){ $("#" + itemID).delegate("a", "click", function (){ Event['getOdds'](itemID, this); }); },

        //小框架10下注点击事件_10
        ClickFrame_10_01: function (itemID){
            if ($("#" + itemID + "Title")[0]){
                $("#" + itemID +"Title a").click(function (){
                    $("#" + itemID + " .playTitle").html(PAN[itemID]['tr']['tr0']['td'][$(this).attr('name')]);
                    Event['getTwoClick'](itemID, this);
                });
            }

            $("#" + itemID +" .oddsBox a").click(function (){
                if (getCookie('uid')){
                    //判断投注列表的注单是否超过10注
                    if ($("#orderList .orderDelete").length === 10) {
                        alertBox( '', '投注列表的注单已超过10注!<br>请先提交注单', '' );
                        return;
                    }

                    var setTitle = $("#" + itemID + " .playBtn05").attr("name");
                    if ( !setTitle && (itemID == 'KBWX') ){setTitle = 'KB';}
                    var rpcPost = SaveData['attrData']['rpcPost']
                    var playOBJ = setTitle + $(this).attr('name');
                    var play_lx = Event['getDaXiaoString'](playOBJ, 'd');
                    var bet_obj = "", obj_name = "";
                    bet_obj = obj_name = Event['getDaXiaoString'](playOBJ, 'x');
                    var odds = SaveData['jsonDataMid']['data']['newOdds'][playOBJ];

                    //判断是否新增玩法
                    var isNew = true;
                    for( var id in rpcPost['betBrders'] ){
                        if(typeof(rpcPost['betBrders'][id]) == "undefined"){ continue; }
                        if( rpcPost['betBrders'][id]['play_lx'] == play_lx ){ isNew = false; }
                    }

                    //如果是新增的玩法执行if语句
                    if (isNew){
                        var post = {'actID':301,'uid': getCookie('uid'), 'game_lx':rpcPost['game_lx'], 'play_lx':play_lx };
                        getServerData( post, 'SaveData["moneyGD"]', function (){ intBetFormData(play_lx); });
                    }

                    //判断用户点击的是否是同一彩票种类
                    for (var id in rpcPost['betBrders']){
                        if (rpcPost['betBrders'][id] == undefined){ continue; }
                        if (rpcPost['betBrders'][id]['game_lx'] !== rpcPost['game_lx']){ rpcPost['betBrders'] = {}; }
                    }

                    //增加一条注单数据
                    rpcPost['betBrders'][playOBJ] = { 'periods':rpcPost['newPeriods'] , 'game_lx': rpcPost['game_lx'], 'play_lx':play_lx, 'bet_obj':bet_obj, 'betMoney':0,  'odds':odds, 'obj_name':obj_name };

                    //把注单数据加载到页面
					objname=bet_obj;
                    betDataHTML(itemID, playOBJ, play_lx, bet_obj, odds,objname);
                }else{
                    alertBox( '', '用户还没登陆账户！', '' );
                    return;
                }
            });
        },

        //投注单和最近十住切换事件
        menuSwitch_01: function (){
            $("#userBetTop div span").click(function (){
                var IdObj = {betMune: '#userCathectic', tenNote: '#AfterTenNote'};
                $("#userBetTop div span, #userBetTop div").removeClass();
                (IdObj[$(this).attr('id')] == '#userCathectic') ? $("#userBetTop").removeClass().addClass('box04Title') : $("#userBetTop").removeClass().addClass('box05Title');
                $("#userCathectic, #AfterTenNote").css({display: "none"});
                $(IdObj[$(this).attr('id')]).css({display: "block"});
                $(this).addClass("box04TitleCurrTab");
                $(this).parent('div').addClass("box04Back");

                //当点击最近十住的时候到服务器拿数据
                if ($(this).attr('id') === 'tenNote'){
                    var post = { 'actID':401,'uid': getCookie('uid') };
                    getServerData( post, 'SaveData["afterTenNote"]', function (){ NoteContent(); });
                }
            });
        },

        //游戏规则按钮事件
        GameRule: function (){
            $("#GameRules").click(function (){
                var ruleArr = [], oTop = "", oLeft = "", ruleTag = "", id = "", rpcPost = SaveData['attrData']['rpcPost'];
                getServerData( {'actID': 602, 'game_lx': rpcPost['game_lx']}, 'SaveData["gameRule"]', function (){
                    $("#ruleContent").css({display:"block"});
                    var gameRule = SaveData["gameRule"];
                    //游戏规则容器的头部
                    ruleArr.push(getTitleBox("游戏规则", "ruleCon").join(''));

                    //游戏规则容器的内容
                    ruleArr.push('<div id="ruleBox">');
                    ruleArr.push('<table cellspacing="0" cellpadding="0">');
                    ruleArr.push('<tr><td class="officialWebsite"><a href="'+ gameRule['refer_url'] +'" target="_black">进入官网</a></td><td>介绍：<span style="color: #d00; font-weight: bold;">'+ gameRule['bet_info'] +'</span></td></tr>');
                    var panType = gameRuleObj[rpcPost['cp_type']][rpcPost['panType']];
                    for (id in gameRuleObj[rpcPost['cp_type']][rpcPost['panType']]['ruleName']){
                        ruleArr.push('<tr>');
                        ruleArr.push('<td colspan="2" class="tableBox01"><span style="color: #000; font-weight: bold">'+ panType['ruleName'][id] +'</span>：<span style="color: #333;">'+ panType['ruleBox'][id] +'</span></td>');
                        ruleArr.push('</tr>');
                    }

                    ruleArr.push('</table>');
                    ruleArr.push('</div>');

                    $("#ruleTag").html(ruleArr.join(''));

                    //让弹出层固定在页面中间
                    var top = ($(window).height() - $("#ruleTag").height())/2;
                    var left = ($(window).width() - $("#ruleTag").width())/2;
                    $("#ruleTag").css( {position : 'absolute', top : top + 'px', left : left + 'px' } );
                    if ($(window).height() < $("#ruleTag").height()){
                        $("#ruleTag").css( {position : 'absolute', top : 10 + 'px', left : left + 'px' } );
                        $("#ruleBox").css({height: 400 + 'px', overflow: 'auto'});
                    }

                    //关闭按钮事件添加
                    $("#ruleCon").click(function (){ CaiPiao['closeWindow']("ruleContent"); });
                });
            });
        },

        //快选金额按钮事件
        ClickMoney: function (){
            $("#SecletMoney").click(function (){
                //到服务器里面拿数据
                var post = {'actID':304,'uid': getCookie('uid') };
                getServerData(post, 'SaveData["quickPickStatus"]["user_stting"]', function (){ clickMoney(); });
            });
        },

        //开奖规律路子点击事件01
        LuZiBlcok: function (){
            if ($(this).attr('id') != undefined){
                var dataStorage = SaveData["lawData"]["dataStorage"];
                if ($("#" + $(this).attr('id') + "Box").css('display') === 'block' ){ return; }
                for (var id in dataStorage['stlyname']){
                    $("#" + id + "Box").fadeOut("slow");
                    $("#" + id).removeAttr('class');
                }
                $(this).addClass('titleBox01');
                $("#" + $(this).attr('id') + "Box").fadeIn("slow");

                SaveData['lawData']['LuZiID'] = $(this).attr('id');

                //显示结果期数鼠标移入事件
                $("#" + $(this).attr('id') + "Box a").mouseover(function (){
                    $("#" + SaveData['lawData']['LuZiID'] + "Period").html('第<span class="IssueBox01">'+ $(this).attr('name') +'</span>期');
                });

                //显示结果期数鼠标移出事件
                $("#" + $(this).attr('id') + "Box a").mouseout(function (){
                    $("#" + SaveData['lawData']['LuZiID'] + "Period").html('');
                });
            }
        },

        //点击开奖规律路子
        ClickLuZi: function (){
            var dataStorage = SaveData["lawData"]["dataStorage"], html = [], mun = 0;
            html.push('<ul id="LuZiBox">');
            for (var id in dataStorage['stlyname']){
                var styleBG = "";
                if (mun === 0){ styleBG = "style='border-top: 1px solid #999;'" }
                html.push('<li>');
                html.push('<a '+ styleBG +' id="'+ id +'" href="javascript:void(0)">'+ dataStorage['stlyname'][id] +'</a>');
                html.push('<div class="ResultBox" id="'+ id +'Box"><div class="IssueBox" id="'+ id +'Period"></div>');
                html.push('<div class="IssueBox02">');
                mun++;

                //排列获取到的数据
                var  resylt = "", resultArr = [], sum = 0;
                resultArr[sum] = [];
                for (var JG in dataStorage[id]){
                    if (resylt == "" || dataStorage[id][JG] == resylt){
                        resultArr[sum].push('<a href="javascript:void(0)" name="'+ JG +'">' + dataStorage[id][JG] + '</a>');
                    }else{
                        ++sum;
                        resultArr[sum] = [];
                        resultArr[sum].push('<a href="javascript:void(0)" name="'+ JG +'">' + dataStorage[id][JG] + '</a>');
                    }
                    resylt = dataStorage[id][JG];
                }

                //遍历排列好的数组得到结果
                for (var i = resultArr.length - 1, len = resultArr.length - 7; i > len; i--){
                    html.push('<div class="IssueBox03">');
                    for (var j = resultArr[i].length - 1, LEN = resultArr[i].length - 7; j > LEN; j--){
                        html.push(resultArr[i][j]);
                    }
                    html.push('</div>');
                }

                html.push('</div></div>');
                html.push('</li>');
            }
            html.push('</ul>');
            $("#lotteryContent").html(html.join(''));

            //给加载好的HTML代码添加点击事件
            $("#LuZiBox a").click(Event['LuZiBlcok']);
        },

        //开奖规律点击事件01
        RuseLottery_01: function (){
            $("#HeadTitle span").removeAttr('class');
            $(this).addClass('titleClass');

            var noObj = {ShuangMian: 6, QuangBu: 2, LuZi: 9}, lawData = SaveData['lawData'];
            lawData['DYThis'] = $(this).attr('id');
            if ($(this).attr('id') === "LuZi"){
                getLawData(noObj[$(this).attr('id')], function (){ Event['ClickLuZi'](); });
                return;
            }

            getLawData(noObj[$(this).attr('id')], function (){
                var html = [];

                //开奖规律第二标题
                html.push('<div id="titleContent" class="lotteryBox03">'+ getLawTitle(lawData['DETitle']).join('') +'<a id="moreCL" class="allCL">更多长龙</a></div>');

                //开奖规律内容
                html.push('<div id="lawContent">'+ getLawsContent().join('') +'</div>');

                $("#lotteryContent").html(html.join(''));

                //给开奖规律第二标题添加点击事件02
                $("#titleContent span").click(Event['RuseLottery_02']);

                //给开奖规律更多长龙添加点击事件03
                $("#moreCL").click(Event['RuseLottery_03']);

                //给开奖规律更多长龙添加点击事件05
                $("#lawContent a").click(function (){ Event['changePanType']($(this).attr('name')); });
            });
        },

        //开奖规律点击事件02
        RuseLottery_02: function (){
            $("#titleContent span").removeAttr('class');
            $(this).addClass('titleClass');
            if ($(this).attr('id') == "notOpenCL"){
                $("#titleContent").removeClass('lotteryBox03').addClass('lotteryBox04');
            }else{
                $("#titleContent").removeClass('lotteryBox04').addClass('lotteryBox03')
            }

            var lawData = SaveData['lawData'];
            var noObj = {
                'ShuangMian': { 'continueCL': 6, 'notOpenCL': 8 },
                'QuangBu': { 'continueCL': 2, 'notOpenCL': 4 }
            }
            getLawData(noObj[lawData['DYThis']][$(this).attr('id')], function (){
                $("#lawContent").html(getLawsContent().join(''));

                //给开奖规律更多长龙添加点击事件05
                $("#lawContent a").click(function (){ Event['changePanType']($(this).attr('name')); });
            });
        },

        //开奖规律点击事件03
        RuseLottery_03: function (){
            var htmlCL = [], titleName = "", titleNameObj = {ShuangMian: '双面长龙', QuangBu: '全部长龙'}, rpcPost = SaveData['attrData']['rpcPost'];
            var lawData = SaveData['lawData'];

            //得到容器的头
            titleName = titleNameObj[lawData['DYThis']];
            if (rpcPost['game_lx'] === 41){ titleName = "全部长龙"; };
            htmlCL.push(getTitleBox(titleName, 'AllCL').join(''));

            //更多长龙容器
            htmlCL.push('<div id="ChangLongBox"></div>');
            $("#contentCL").html(htmlCL.join(''));

            //加载容器内容
            var noObj = {
                'ShuangMian': { 'winCL': 5, 'notWinCL': 7 },
                'QuangBu': { 'winCL': 1, 'notWinCL': 3 }
            }
            getLawData(noObj[lawData['DYThis']]['winCL'], function (){
                var html = [];

                //更多长龙容器标题
                html.push('<div id="titleCL">'+ getLawTitle(lawData['DECLTitle']).join('') +'</div>');

                //更多长龙容器内容
                html.push('<div id="contentLawCL">'+ getLawsContent().join('') +'</div>');

                $("#ChangLongBox").html(html.join(''));

                //更多长龙标题添加点击事件
                $("#titleCL span").click(Event['RuseLottery_04']);

                //给开奖规律更多长龙添加点击事件05
                $("#lawContent a").click(function (){ Event['changePanType']($(this).attr('name')); });
            });


            //显示更多长龙容器
            $("#allChangLong").css({display: "block"});

            getPopUp("contentCL");

            //关闭按钮事件添加
            $("#AllCL").click(function (){
                CaiPiao['closeWindow']("allChangLong");
            });
        },

        //开奖规律更多长龙点击事件04
        RuseLottery_04: function (){
            var noObj = {
                'ShuangMian': { 'winCL': 5, 'notWinCL': 7 },
                'QuangBu': { 'winCL': 1, 'notWinCL': 3 }
            };
            var lawData = SaveData['lawData'];

            $("#titleCL span").removeAttr('class');
            $(this).addClass('titleClass');

            getLawData(noObj[lawData['DYThis']][$(this).attr('id')], function (){
                //更多长龙容器内容
                $("#contentLawCL").html(getLawsContent().join(''));

                //给开奖规律更多长龙添加点击事件05
                $("#contentLawCL a").click(function (){ Event['changePanType']($(this).attr('name')); });
            });
        },

        //投注单返回按钮点击事件
        betEmptyBtn: function (){
            $("#userCathectic").html('<div style="text-align: center; width: 100%; padding-bottom: 8px;">点击页面中的赔率可以投注！</div>');
            SaveData['attrData']['rpcPost']['betBrders'] = {}; //清空投注菜单上的数据
        },

        //提交投注单到服务器按钮事件
        submitData: function (){

            //把金额存入对象
            var betBrders = SaveData['attrData']['rpcPost']['betBrders'], tolMoney = 0;
            var MoneyDX = SaveData['attrData']['rpcPost']['MoneyDX'];
            for (var playOBJ in betBrders) {
                var betMoney = $("#betMoney"+ playOBJ).val();

                if (betMoney === "") {
                    alertBox( '', '还有注单没有投注！', '' );
                    return;
                }

                var minQ = MoneyDX['minMoney'][betBrders[playOBJ]['play_lx']],
                    maxQ = MoneyDX['maxMoney'][betBrders[playOBJ]['play_lx']],
                    playGame = $("#orderList span[data-play='"+ betBrders[playOBJ]['play_lx'] +"']").html();
                if( parseInt(betMoney, 10) < parseInt(minQ, 10) ){
                    alertBox( '', '<b style="color:#d00">'+ playGame + '</b>投注金额不可小于<b style="color:#d00">'+ minQ +'</b>！', '' );
                    return;
                }

                if( parseInt(betMoney, 10) > parseInt(maxQ, 10) ){
                    alertBox( '', '<b style="color:#d00">'+ playGame + '</b>投注金额不可大于<b style="color:#d00">'+ maxQ +'</b>！', '' );
                    return;
                }

                betBrders[playOBJ]['betMoney'] = betMoney;

                tolMoney += parseInt(betMoney);
            }

            //余额检查
            var userMoney = SaveData['moneyGD']['data']['u_money_cp'];
            if( tolMoney > parseFloat(userMoney) ){
                alertBox( '', '总投注金额不可大于账户余额'+ userMoney +'！', '' );
                return;
            }

            //确认对话框
            var gameStatus = SaveData['jsonDataMid']['data']['gameStatus'], mun = 0;
            for (var id in betBrders){mun++}
            if (tolMoney === 0) { alertBox( "", "本次总投注金额：0，请重新投注！", "" ); return false; }
            alertBox( "", "当前投注："+ gameStatus['game_name'] +"<br>期数："+ gameStatus['periods2'] +"<br><br>"+ mun +"注 共"+ tolMoney +" 元<br> 是否确定下注？", "CaiPiao[\'btnSubmit\']()" );
        },

        //投注单删除按钮点击事件
        betDeleteBtn: function (){
            var rpcPost = SaveData['attrData']['rpcPost'];
            var play_lx = Event['getDaXiaoString']($(this).parent().parent().attr('id'), 'd');

            $(this).parent().parent().remove();
            delete rpcPost['betBrders'][$(this).parent().parent().attr('id')];

            //去掉被删除数据的最高最低金额
            var betID = $("#orderList .orderRow"), betIDArr = [],sum = 0;
            for (var i = 0, len = betID.length; i < len; i++){
                betIDArr.push(Event['getDaXiaoString'](betID.eq(i).attr('id'), 'd'));
            }
            for (var i = 0, len = betIDArr.length; i < len; i++){
                if (betIDArr[i] == play_lx){ sum++; }
            }
            if (sum == 0){
                delete rpcPost['MoneyDX']['minMoney'][play_lx];
                delete rpcPost['MoneyDX']['maxMoney'][play_lx];
            }
            intBetFormData();

            //当投注单为0的时候，清空投注单
            if ($("#orderList input[type='text']").length == 0) {
                $("#userCathectic").html('<div style="text-align: center; width: 100%; padding-bottom: 8px;">点击页面中的赔率可以投注！</div>');
                SaveData['attrData']['rpcPost']['betBrders'] = {}; //清空投注菜单上的数据
            }
        },

        //投注窗口显示快选金额
        quickPickAmount: function (){
            var html = [], i = 0, len = 0, NoLength = 0, userData = SaveData['quickPickStatus']['user_stting']['users_setting'];
			console.log(SaveData['quickPickStatus']['user_stting']);
            //判断用户是否停用快选金额
            if (userData["is_using"] == 0){ return; }

            //得到显示投注窗口的位置
            $("#quickPick").css({top: $(this).offset().top, left: $(this).offset().left - 100});

            //投注窗口的头部
            html.push('<div id="closeQuick">下注金额<a href="javascript:void(0)" id="closeKX">停用</a></div>');

            //用户设置好的金额
            html.push('<div id="selectMoney">');
            for (i = 0, len = userData['set_value'].length; i < len; i++){
                if (userData['set_value'][i] === ""){
                    NoLength += 1;
                    continue;
                }
                html.push('<a href="javascript:void(0)" name="'+ userData['set_value'][i] +'">'+ userData['set_value'][i] +' 元</a>');
            }
            html.push('</div>');

            //判断用户设置的金额是否都是空
            if (NoLength === userData['set_value'].length){
                $("#quickPick").html('');
                $("#quickPick").css({top: "-9999px"});
                return;
            }

            //加载HTML代码到ID为quickPick的容器
            $("#quickPick").html(html.join(''));

            //当点击的焦点不在容器内的时候，容器隐藏
            $(this).blur(function (){
                if (SaveData['quickPickStatus']['flag'] === 0){ $("#quickPick").css({top: "-9000px"}); }
                return false;
            });

            //快选金额容器停用按钮事件
            $("#closeKX").click(function (){ alertBox( '', '确定要停用快选金额？', 'closeAlertBox();CaiPiao[\'closeQuickPick\']()' ); });

            //选择金额点击事件
            SaveData['quickPickStatus']['tagID'] = $(this).attr('id');
            $("#selectMoney a").click(function (){
                var userSelect = parseInt($(this).attr('name'), 10);
                var tagID = SaveData['quickPickStatus']['tagID'];
                $("#" + tagID).val(userSelect);
                if (tagID == "halfMoney"){
                    $("#orderList input[type='text']").val(userSelect);
                }
                $("#quickPick").css({top: "-9000px"});
            });

            //当用户点击容器的时候，输入框得到焦点
            $("#quickPick").click(function (){
                $("#" + SaveData['quickPickStatus']['tagID']).focus();
                return false;
            });

            //鼠标移动事件
            $("#quickPick").mouseover(function (){ SaveData['quickPickStatus']['flag'] = 1; });
            $("#quickPick").mouseout(function (){ SaveData['quickPickStatus']['flag'] = 0; });
        }
    };

    /**********彩票玩法HTML小框架*********************************************************************************************************************************************/
    //该对象存放彩票玩法JS小框架
    var FrameHTML = {
        Frame_01: function (itemID){ //彩票玩法小框架_01
            var html = [];

            for( var id in PAN[itemID]['tr'] ){
                var row = PAN[itemID]['tr'][id];
                html.push('<tr>');
                if ((row['lable']) || row['lable'] === ""){  //判断对象中有没有lable属性，加载HTML代码_03
                    //用于平均td窗口的宽高
                    var tdClass = "oddsTitle";
                    if (itemID === "FCEZHS" || itemID === "FCSZHS" || itemID === "WZHS" || itemID === "GYJH" || itemID === "zspZH" || itemID === "zspDMSM"){ tdClass = "oddsTitle tdWH" };

                    html.push('<td class="'+ tdClass +'">'+ row['lable'] +'</td>');
                }

                //玩法头部是按钮，加载HTML代码08
                if (row['isButton']){ html.push(CodeHTML['createHTML_08'](itemID, row['td'], row['colspan'])) }

                //tr是标题的时候执行这个if语句，加载HTML代码_04
                if (row['isTitle']){ html.push(CodeHTML['createHTML_04'](itemID, row, row['andNo'])); }

                //tr直接显示赔率，加载HTML代码_05
                if (row['merger_odds']){ html.push(CodeHTML['createHTML_05'](PAN[itemID]['td'], row['play_lx'])); }

                //tr直接显示赔率，加载HTML代码_06
                if (row['direct_odds']){ html.push(CodeHTML['createHTML_06'](row['play_lx'])); }
                html.push('</tr>');
            }

            return html.join('');
        },

        Frame_02: function (itemID){   //彩票玩法小框架_02
            var html = [];

            for( var id in PAN[itemID]['tr'] ){
                var row = PAN[itemID]['tr'][id], trIDName = "";
                if (row['TrIDName']){ trIDName = "id='"+ row['TrIDName'] +"'"; }
                html.push('<tr '+ trIDName +'>')

                //玩法头部是按钮，加载HTML代码08
                if (row['isButton']){ html.push(CodeHTML['createHTML_08'](itemID, row['td'], row['colspan'])) }

                if ((row['lable']) || row['lable'] === ""){  //判断对象中有没有lable属性，加载HTML代码_03
                    html.push('<td class="oddsTitle" id="'+ row['idName'] +'">'+ row['lable'] +'</td>');
                }

                //组合代码中用户选择的数据，加载HTML代码09
                if (row['isNo']){ html.push(CodeHTML['createHTML_09'](row['td'])); }
                html.push('</tr>');
            }

            return html.join('');
        },

        Frame_03: function (itemID){ //彩票玩法小框架_03
            var html = [];

            for( var id in PAN[itemID]['tr'] ){
                var row = PAN[itemID]['tr'][id], trIDName = "";
                if (row['TrIDName']){ trIDName = "id='"+ row['TrIDName'] +"'"; }
                html.push('<tr '+ trIDName +'>');

                //玩法头部是按钮，赔率在行尾，加载HTML代码10
                if (row['isBtnTab']){ html.push(CodeHTML['createHTML_10'](itemID, row['td'], row['colspan'], row['lable'])) }

                //玩法头部是按钮，赔率在行尾，加载HTML代码11
                if (row['isNoOdds']){ html.push(CodeHTML['createHTML_11'](itemID, row['td'], row['colspan'], row['lable'], row['rowspan'])) }

                html.push('</tr>');
            }

            return html.join('');
        },

        Frame_04: function (itemID){  //彩票玩法小框架_04
            var html = [];

            for( var id in PAN[itemID]['tr'] ){
                var row = PAN[itemID]['tr'][id];
                html.push('<tr>');

                if ((row['lable']) || row['lable'] === ""){  //判断对象中有没有lable属性，加载HTML代码_03
                    html.push('<td class="oddsTitle">'+ row['lable'] +'</td>');
                }

                if (row['isTitleGG']){ html.push( CodeHTML['createHTML_12'](row['td'], row['isTitleGG']) ) }

                if (row['isPlay']){ html.push( CodeHTML['createHTML_13'](itemID, row['play_lx']) )}

                //显示赔率部分
                if (row['isSure']){ html.push(CodeHTML['createHTML_14'](row['colspan'], row['td'], itemID)) }

                html.push('</tr>');
            }

            return html.join('');
        },

        Frame_05: function (itemID){
            var html = [];

            for( var id in PAN[itemID]['tr'] ){
                var row = PAN[itemID]['tr'][id], trIDName = "";
                if (row['TrIDName']){ trIDName = "id='"+ row['TrIDName'] +"'"; }
                html.push('<tr '+ trIDName +'>');

                if ((row['lable']) || row['lable'] === ""){  //判断对象中有没有lable属性，加载HTML代码_03
                    html.push('<td class="oddsTitle">'+ row['lable'] +'</td>');
                }else if (row['currentPlay']){
                    html.push('<td class="playTitle">'+ row['currentPlay'] +'</td>');
                }

                //玩法头部是按钮，加载HTML代码08
                if (row['isBtnTab']){ html.push(CodeHTML['createHTML_08'](itemID, row['td'], row['colspan'])) }

                //玩法内容部分
                if (row['isNoOdds']){ html.push(CodeHTML['createHTML_15'](row['td'])) }

                //显示赔率部分
                if (row['isSure']){ html.push(CodeHTML['createHTML_14'](row['colspan'], row['td'], itemID)) }

                html.push('</tr>');
            }

            return html.join('');
        },

        Frame_06: function (itemID){
            var html = [];

            for( var id in PAN[itemID]['tr'] ){
                var row = PAN[itemID]['tr'][id];
                html.push('<tr>');

                //显示内容
                if (row['title_odds']){ html.push(CodeHTML['createHTML_16'](row['lotteryNo'], row['play_lx'])) };

                html.push('</tr>');
            }

            return html.join('');
        },

        Frame_07: function (itemID){      
			
			var html = [];

            for( var id in PAN[itemID]['tr'] ){
                var row = PAN[itemID]['tr'][id];
                html.push('<tr>');

                //显示赔率和选择按钮，加载HTML代码08
                if (row['isBtnTab']){
                    html.push(CodeHTML['createHTML_08'](itemID, row['td'], row['colspan']));
                    html.push('<td class="oddsBox"><span style="color: #a25100">'+ row['lable'] +'</span>：<a id="'+ itemID +'Odds"></a></td>');
                }

                //显示内容
                if (row['title_odds_content']){
                    html.push(CodeHTML['createHTML_17'](row['lotteryNo']));
                };

                html.push('</tr>');
            }

            return html.join('');
        },

        Frame_08: function (itemID){
            var html = [], jsonDataMid = SaveData['jsonDataMid'];

            for( var id in PAN[itemID]['tr'] ){
                var row = PAN[itemID]['tr'][id];
                html.push('<tr>');

                //玩法头部是按钮，加载HTML代码08
                if (row['isButton']){ html.push(CodeHTML['createHTML_08'](itemID, row['td'], row['colspan'])) }

                //显示内容
                if (row['title_odds_box']){
                    for (var id in row['lotteryNo']){
                        html.push('<td class="oddsBox">');
                        var noArr = jsonDataMid['data'][id].split(','), noStr = "";
                        for (var i = 0, len = noArr.length; i < len; i++){
                            noStr += Event['getLHCBG'](noArr[i]);
                        }
                        html.push('<div style="color: #a25100; float: left; margin-left: 2px;">'+ row['lotteryNo'][id] + '：' + noStr +'</div>');
                        html.push('<input type="checkbox" value="LHEXP'+ id +'" style="float: right" />');
                        html.push('<span class="showOdds">'+ jsonDataMid['data']['newOdds']['LHEXP' + id] +'</span>');
                        html.push('</td>');
                    }
                };

                //显示内容
                if (row['title_box']){
                    for (var id in row['lotteryNo']){
                        if (row['lotteryNo'][id] === ""){
                            html.push('<td></td>');
                            continue;
                        }
                        html.push('<td class="oddsBox">');
                        var noArr01 = row['lotteryNumber'][id].split(','), noStr01 = "";
                        for (var i = 0, len = noArr01.length; i < len; i++){ noStr01 += Event['getLHCBG'](noArr01[i]); }
                        html.push('<div style="color: #a25100; float: left; margin-left: 2px;">'+ row['lotteryNo'][id] +':' + noStr01 +'</div>');
                        html.push('<input type="checkbox" value="LHEWP'+ id +'" style="float: right" />');
                        html.push('<span class="showOdds">'+ jsonDataMid['data']['newOdds']['LHEWP' + id] +'</span>');
                        html.push('</td>');
                    }
                };
                html.push('</tr>');
            }
            html.push('<tr><td colspan="3">');
            html.push('<div style="margin:0 auto; width: 150px;"><input id="'+ itemID +'sure" type="button" value="确定" style="margin: 5px;"><input id="'+ itemID +'empty" type="button" value="重置" style="margin: 5px;"></div>');
            html.push('</td></tr>');
            return html.join('');
        },

        Frame_09: function (itemID){
            var html = [], jsonDataMid = SaveData['jsonDataMid']['data']['newOdds'];
            for( var id in PAN[itemID]['tr'] ){
                var row = PAN[itemID]['tr'][id];
                html.push('<tr>');

                if (row['isPlayOdds']){
                    html.push('<td class="oddsTitle">'+ row['lable'] +'</td>');
                    for (var id in row['play_lx']){
                        html.push('<td class="oddsBox"><span style="color: #a25100;">'+ row['play_lx'][id] +'：</span><a name="'+ id +'">'+ jsonDataMid[id] +'</a></td>');
                    }
                }

                html.push('</tr>');
            }

            return html.join('');
        },

        Frame_10: function (itemID){
            var html = [], jsonDataMid = SaveData['jsonDataMid']['data']['newOdds'];

            for( var id in PAN[itemID]['tr'] ){
                var row = PAN[itemID]['tr'][id];
                html.push('<tr>');
                if ((row['lable']) || row['lable'] === ""){  //判断对象中有没有lable属性，加载HTML代码_03
                    html.push('<td class="oddsTitle">'+ row['lable'] +'</td>');
                }else if (row['currentPlay']){
                    html.push('<td class="playTitle">'+ row['currentPlay'] +'</td>');
                }

                //玩法头部是按钮，加载HTML代码08
                if (row['isButton']){ html.push(CodeHTML['createHTML_08'](itemID, row['td'], row['colspan'])) }

                //tr是标题的时候执行这个if语句，加载HTML代码_04
                if (row['isTitle']){ html.push(CodeHTML['createHTML_04'](itemID, row)); }

                //tr是标题的时候执行这个if语句，加载HTML代码_04
                if (row['isBox']){ html.push(CodeHTML['createHTML_18'](itemID, row)); }

                //tr直接显示赔率，加载HTML代码_06
                if (row['showOdds']){
                    for (var i = 0, len = row['play_lx'].length; i < len; i++){
                        var odds = "";
                        if (row['play_lx'][i] === ""){
                            html.push('<td></td>');
                            continue;
                        }

                        if (itemID === "LHZMT"){ odds = jsonDataMid["LHTBH" + row['play_lx'][i]]; }
                        if (itemID === "YZZH"){ odds = jsonDataMid["QSYZZH" + row['play_lx'][i]]; }
                        if (itemID === "KD"){ odds = jsonDataMid["QSKD" + row['play_lx'][i]]; }
                        if (itemID === "SZHSWS"){ odds = jsonDataMid["WQBHSWS" + row['play_lx'][i]]; }
                        if (itemID === "SZHS"){ odds = jsonDataMid["WQBHS" + row['play_lx'][i]]; }
                        if (itemID === "KLSFDM" || itemID === "GDDMSM" || itemID === "GDSJWX" || itemID === "FWZFB"){ odds = jsonDataMid["KLDYH" + row['play_lx'][i]]; }
                        if (itemID === "KLSFSIWX" || itemID === "KLSFFW"){ odds = jsonDataMid["KLTBH" + row['play_lx'][i]]; }
                        if (itemID === "GXSJWX"){ odds = jsonDataMid["GXTBH" + row['play_lx'][i]]; }
                        if (itemID === "GXZM"){ odds = jsonDataMid["GXDYH" + row['play_lx'][i]]; }
                        if (itemID === "YYXWDMSM"){ odds = jsonDataMid["YWDYH" + row['play_lx'][i]]; }
                        if (itemID === "PKDM"){ odds = jsonDataMid["PKDYH" + row['play_lx'][i]]; }
                        html.push('<td class="oddsBox"><a name="'+ row['play_lx'][i] +'">'+odds  +'</a></td>');
                    }
                }
                html.push('</tr>');
            }
            return html.join('');
        }
    };

    /**********私有API开始**********************************************************************************************************************************************/
    //得到当前玩法的深度
    function getPlaylxObj(itemID){
        var rpcPost = SaveData['attrData']['rpcPost'];
			
        return itemOBJ[rpcPost['cp_type']]['menu'][rpcPost['panType']]['item'][itemID];
    };

    //统一RPC请求入口
    function getServerData(post, jsonDataOBJ, fnStr){
        Interface.serverInterface( post, function ( result, args, output, warning ) {
            
            //console.log(post)
            //console.log($.parseJSON(result))
            if (output){ alert(output); }
            if (!jsonDataOBJ){ return; }
            if (jsonDataOBJ){ eval( jsonDataOBJ +'='+ result ); }
            if ( systemAlert(jsonDataOBJ) == false ){ return; }
            if (typeof fnStr === 'function'){ fnStr(); }
        }, true);
    };

    //更新倒数时间（装载完左边彩票项目后，每一秒都会执行这个函数）
    function updateLeftItemListTime(){
        var Timer = SaveData['attrData']['Timer'];

        for( var id in Timer['countdown'] ){      //更新所有游戏类型倒数时间
            if( Timer['countdown'][id] < 0 ) continue;
            if( Timer['countdown'][id] == 0 ){
                Timer['item']['currTime'] = 0;
                CaiPiao['reloadLeftItemList']();
                return;
            }
            if( $('#daoShuTimeBox' +id)[0] ){ $('#daoShuTimeBox'+id ).html( secondTOTime( Timer['countdown'][id] ) ) };

            if ( $("#RecTime")[0] ){
                var timeArr = secondToTimeArr(Timer['gameStatus']['currTime']);
                $("#RecTime > span").eq(0).html(timeArr[0]);
                $("#RecTime > span").eq(1).html(timeArr[1]);
            }

            Timer['countdown'][id] --;
        }
    };

    //返回右边赛程赔率数据后执行的函数，创建右边赛程状态
    function createMidPanHtml(){
        var html = [], playLx = "", rpcPost = SaveData['attrData']['rpcPost'];
        var ZhuangTai = SaveData['jsonDataMid']['data']['gameStatus'];

        if (rpcPost['panType'] != ZhuangTai['panType']) { return false; }

        //特定采种不更新数据
        //if (ZhuangTai['status'] === 1 && !rpcPost['upData']){ return; }

        //快3不更新数据
        if (rpcPost['cp_type'] == "k3"){ Event['k3ClickFn'](rpcPost['game_lx']); return; }

        createRightGameStatus(); //加载当前游戏玩法

        //清空彩票类型的itemID
        rpcPost['itemID'] = [];

        //创建盘口赔率Table
        var itemObj = itemOBJ[rpcPost['cp_type']]['menu'][rpcPost['panType']]['item'];
        for( var itemID in  itemObj){
            var idOBJ = itemObj[itemID];
            var boxHtml = CodeHTML['createHTML_01']( itemID, playLx );  //加载HTML代码_01
            var tableHtml = CodeHTML['createHTML_02'](itemID);    //加载HTML代码_02
            html.push('<div id="'+ itemID +'_box">');
            html.push(boxHtml[0]);
            html.push(tableHtml[0]);
            if (idOBJ['Frame_01']){ html.push(FrameHTML['Frame_01'](itemID)); } //彩票玩法小框架_01
            if (idOBJ['Frame_06']){ html.push(FrameHTML['Frame_06'](itemID)); } //彩票玩法小框架_06
            if (idOBJ['Frame_09']){ html.push(FrameHTML['Frame_09'](itemID)); } //彩票玩法小框架_09
            if (idOBJ['Frame_02']){ html.push(FrameHTML['Frame_02'](itemID)); } //彩票玩法小框架_02
            if (idOBJ['Frame_03']){ html.push(FrameHTML['Frame_03'](itemID)); } //彩票玩法小框架_03
            if (idOBJ['Frame_04']){ html.push(FrameHTML['Frame_04'](itemID)); } //彩票玩法小框架_04
            if (idOBJ['Frame_05']){ html.push(FrameHTML['Frame_05'](itemID)); } //彩票玩法小框架_05
            if (idOBJ['Frame_07']){ html.push(FrameHTML['Frame_07'](itemID)); } //彩票玩法小框架_07
            if (idOBJ['Frame_08']){ html.push(FrameHTML['Frame_08'](itemID)); } //彩票玩法小框架_08
            if (idOBJ['Frame_10']){ html.push(FrameHTML['Frame_10'](itemID)); } //彩票玩法小框架_10
            if (idOBJ['Frame_02'] || idOBJ['Frame_03'] || idOBJ['Frame_04'] || idOBJ['Frame_05'] || idOBJ['Frame_07'] || idOBJ['Frame_08'] || idOBJ['Frame_10']){
                //特定采种不更新数据
                rpcPost['upData'] = false;
                if (ZhuangTai['status'] !== 1){ rpcPost['upData'] = true; }
            }
            html.push(tableHtml[1]);
            html.push(boxHtml[1]);
            html.push('</div>');

            //收集彩票类型的itemID
            rpcPost['itemID'].push(itemID);
        }

        $('#lotteryMainMid').html(html.join(''));

        oddsStatus(); //得到当前采种的返回状态

        //给投注号码添加事件
        for (var i = 0, len = rpcPost['itemID'].length; i < len; i++){

            if (itemObj[rpcPost['itemID'][i]]['Frame_01']){ Event['ClickFrame_01'](rpcPost['itemID'][i]) }
            if (itemObj[rpcPost['itemID'][i]]['Frame_03']){ Event['ClickFrame_03_01'](rpcPost['itemID'][i]); }
            if (itemObj[rpcPost['itemID'][i]]['Frame_04']){ Event['ClickFrame_04_01'](rpcPost['itemID'][i]); }
            if (itemObj[rpcPost['itemID'][i]]['Frame_05']){
                Event['ClickFrame_05_01'](rpcPost['itemID'][i]);
                Event['ClickFrame_05_02'](rpcPost['itemID'][i]);
                Event['ClickFrame_05_03'](rpcPost['itemID'][i]);
            }
            if (itemObj[rpcPost['itemID'][i]]['Frame_06']){ Event['ClickFrame_06_01'](rpcPost['itemID'][i]); }
            if (itemObj[rpcPost['itemID'][i]]['Frame_07']){
                Event['ClickFrame_07_01'](rpcPost['itemID'][i]);
                Event['ClickFrame_07_02'](rpcPost['itemID'][i]);
                Event['ClickFrame_07_03'](rpcPost['itemID'][i]);
            }
            if (itemObj[rpcPost['itemID'][i]]['Frame_08']){
                Event['ClickFrame_08_01'](rpcPost['itemID'][i]);
                Event['ClickFrame_08_02'](rpcPost['itemID'][i]);
            }
            if (itemObj[rpcPost['itemID'][i]]['Frame_09']){ Event['ClickFrame_09_01'](rpcPost['itemID'][i]); }
            if (itemObj[rpcPost['itemID'][i]]['Frame_02']){
                Event['ClickFrame_02_01'](rpcPost['itemID'][i]);
                Event['ClickFrame_02_02'](rpcPost['itemID'][i]);
            }
            if (itemObj[rpcPost['itemID'][i]]['Frame_10']){ Event['ClickFrame_10_01'](rpcPost['itemID'][i]); }

        }

        //必须要用户登录后才能添加的事件
        if(getCookie('uid')){
            //投注单和最近十住按钮切换
            if ($("#userBetTop")[0]){ Event['menuSwitch_01'](); }

            //快选金额按钮点击事件
            Event['ClickMoney']();
        }

        Event['GameRule']();

        //彩票玩法导航条点击事件监听和游戏规则按钮添加事件
        var EventList = SaveData['attrData']['EventList'];
        if (EventList['changePanType']){
            $("#midTopMenu").delegate(".item", "click", function (){
                $("#lotteryMainMid").html('<div id="loadingBG"></div>');
                Event['changePanType'](($(this).attr('class').split(' '))[1]);
            });

            EventList['changePanType'] = false;
        }

    };

    //创建当前游戏玩法状态
    function createRightGameStatus(){
        var html = [], qer2sName = '', jsonDataMid = SaveData['jsonDataMid'], rpcPost = SaveData['attrData']['rpcPost'], Timer = SaveData['attrData']['Timer'];
        var qer2s = jsonDataMid['gameResult']['qer2s'];
        if (qer2s){qer2sName = '<span style="color: #d00;">'+ qer2s +'</span>';}
        $("#gameNP").html('<span style="color: #fff; float: left; margin-left: 10px;">'+ jsonDataMid['data']['gameStatus']['game_name'] +'</span><span class="refreshBtn" title="刷新赛事结果">刷新</span><span  style="margin-right: 10px; color: #fff; float: right;"><b style="color: #d00;">'+ jsonDataMid['gameResult']['qer2'] +'</b> 期'+ qer2sName +'</span>');
        $("#gameNP .refreshBtn").click(function (){
            Timer['panData']['currTime'] = 0;
        });

        $("#gameIco").removeAttr('class').addClass('gameLxBox02 newGame newGame' + rpcPost['game_lx'])

        var number = jsonDataMid['gameResult']['number'], px = jsonDataMid['gameResult']['px'], gameNoArr = [];
        gameNoArr.push('<div style="display: inline-block; overflow: hidden;">');
        ////console.log(jsonDataMid);
        for (var i = 0 ,len = px.length; i < len; i++){
            if (px[i].search(/^T/gi) !== -1){
                if (rpcPost['game_lx'] == 22 || rpcPost['game_lx'] == 10){
					gameNoArr.push('<div class="crossbar">▬</div>');
				}
                gameNoArr.push('<div class="lanBox">'+ number[px[i]]['num'] +'</div>');
            }else{
                gameNoArr.push('<div class="'+ number[px[i]]['coler'] +'Box">'+ number[px[i]]['num'] +'</div>');
            }
        }
        gameNoArr.push('</div>');
        $("#gameLxZ").html(gameNoArr.join(''));
        if (px.length > 8){ $("#gameLxZ > div").eq(0).css({marginLeft: '6px'}); }

        $("#gameLxX > div").eq(0).html('<div style="text-align: center; line-height: 60px; font-weight: bold; color: #fff;">距<b style="color: #d00;"> '+ jsonDataMid['data']['gameStatus']['periods'] + ' </b>期' + getGameSatusName(jsonDataMid['data']['gameStatus']['status']) +'<div>');

        Timer['gameStatus']['currTime'] = jsonDataMid['data']['gameStatus']['latetime'];
        rpcPost['newPeriods'] = jsonDataMid['data']['gameStatus']['periods2'];
    };

    //创建玩法导航条
    function createPlayMenu(){
        var html = [], isFirst = 1;
        var rpcPost = SaveData['attrData']['rpcPost'];
        html.push('<dl>');
        for( var id in itemOBJ[rpcPost['cp_type']]['menu'] ){
            var row = itemOBJ[rpcPost['cp_type']]['menu'][id];
            if( isFirst != 1 ){ html.push( '<dt class="spanLine"></dt>' ); }
            isFirst = 0;
            (id == rpcPost['panType']) ? html.push( '<dt class="currItem">'+ row['actName'] +'</dt>' ) : html.push( '<dt class="item '+ id +'" style="cursor: pointer;">'+ row['actName'] +'</dt>' );
        }
        html.push('</dl>');

        $('#midTopMenu').html( html.join('') );

        //给游戏类型条添加事件监听
        var EventList = SaveData['attrData']['EventList'];
        if (EventList['EventGameLx']){
            Event['EventGameLx']();
            EventList['EventGameLx'] = false;
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

    //初始化下注Form
    function intBetFormData(play_lx){
        var MoneyDX = SaveData['attrData']['rpcPost']['MoneyDX'], minMoney = 0, maxMoney = 0;
        //到服务器里面那用户设置好的快选金额的数据
        var quickPickStatus = SaveData['quickPickStatus'];
        if (quickPickStatus['quickPickKG'] === true){
            var post = {'actID':304,'uid': getCookie('uid') };
            getServerData(post, 'SaveData["quickPickStatus"]["user_stting"]');
			console.log("************");
			console.log(post);
			console.log(SaveData["quickPickStatus"]["user_stting"]);
			console.log("************");
            quickPickStatus['quickPickKG'] = false;
        }

        //把最高最低金额添加到对象中
        MoneyDX['minMoney'][play_lx] = SaveData["moneyGD"]['data']['minMoney'];
        MoneyDX['maxMoney'][play_lx] = SaveData["moneyGD"]['data']['maxMoney'];
    };

    //把注单的数据加载到HTML页面
    function betDataHTML(itemID, playOBJ, play_lx, bet_obj, odds,objname){
		console.log(itemID, playOBJ, play_lx, bet_obj, odds,objname);
        var rpcPost = SaveData['attrData']['rpcPost'];
        var MoneyDX = SaveData['attrData']['rpcPost']['MoneyDX']
        var post = { 'actID':202, 'game_lx': rpcPost['game_lx'], 'play_lx': rpcPost['betBrders'][playOBJ]['play_lx'], 'obj_name':objname };
		function duibi202pl(){
			console.log(SaveData["oddsOBJ"]);
            var newOrder = [];
			console.log("bet_obj:"+bet_obj);
            var betObjArr = bet_obj.split('_'), betObj = "";
            for (var i = 0, len = betObjArr.length; i < len; i++){
                (i === 0) ? betObj += betObjArr[i] : betObj += ('，' + betObjArr[i]);
            }
            bet_obj = betObj;

            //清空投注列表
            if (!$("#submitOdds")[0]){ $("#userCathectic").html(''); };

            //改变投注单列表样式
            $("#userBetTop div span, #userBetTop div").removeClass();
            $("#AfterTenNote").css({display: "none"});
            $("#userCathectic").css({display: "block"});
            $("#userBetTop div span").eq(0).addClass("box04TitleCurrTab");
            $("#userBetTop div").eq(0).addClass("box04Back");

            //如果注单列表不存在
            if(!$("#orderList")[0]){
                var html = [];
                html.push( '<div id="orderList"></div>' );
                html.push( '<div id="formVar">');
                html.push( '<div id="totalMoney">每注: <input onKeyPress="return CheckKey(event)" id="halfMoney" maxlength="5" type="text"/></div>' );
                html.push( '<div id="orderRule"></div>' );
                html.push( '<div id="orderBtns"><div id="submitOdds">确定</div><div id="deleteOdds">返回</div></div>' );
                html.push( '</div>' );
                $( '#userCathectic' ).html(html.join(''));

                //确定提交按钮
                $("#submitOdds").click(Event['submitData']);

                //投注单返回按钮
                $("#deleteOdds").click(Event['betEmptyBtn']);
            }

            var titlePlayLx = getPlaylxObj( itemID )['playLx'][play_lx];
            var objMing = objName[getDouHaoGai_(bet_obj)];
            if (objMing == undefined){ objMing = bet_obj; }
            newOrder.push( '<div id="'+ playOBJ +'" class="orderRow">' );
            newOrder.push( '<div><span class="orderObj" data-play="'+ play_lx +'" style="font-weight: bold;">'+ titlePlayLx +'</span><span class="orderDelete"></span></div>' );
            newOrder.push( '<div class="orderObj"><span style="color: #c00">'+ objMing +'</span>    @<span style="color: #c00;" id="'+ playOBJ +'Odds">' +  odds +'</span></div><div><input onKeyPress="return CheckKey(event)" id="betMoney'+ playOBJ +'" maxlength="5" type="text" value="'+ $('#halfMoney').val() +'"/></div>' );
            newOrder.push( '</div>' );
            //判断用户当前点击的数据是否重复
            $('#'+playOBJ).remove();
            $("#orderList").prepend( newOrder.join('') );
            if (odds != SaveData["oddsOBJ"]['pl']){
                $("#lotteryMainMid a[name='"+ bet_obj +"']").html(SaveData["oddsOBJ"]['pl'])
                $("#" + playOBJ + "Odds").html(SaveData["oddsOBJ"]['pl']).css("background-color","yellow");
                rpcPost['betBrders'][playOBJ]['odds'] = SaveData["oddsOBJ"]['pl'];
            }

            //让当前的投注列表中输入金钱的输入框获得焦点
            $('#betMoney' + playOBJ)[0].focus();

            //投注单删除按钮
            $("#orderList .orderDelete").click(Event['betDeleteBtn']);

            //填写平均每注金额
            $("#halfMoney").keyup(function () { $("#orderList input[type='text']").val($(this).val()); });

            //投注窗口显示快选金额
            $("#userCathectic input[type='text']").click(Event['quickPickAmount']);
        }
        getServerData( post, 'SaveData["oddsOBJ"]', duibi202pl);
		console.log(post);
    };

    //传入一个字符串，如果字符串中有‘_’则将其该为‘,’号
    function getDouHaoGai_(str) {
        var resultStr = [];
        resultStr = str.split('_');
        return resultStr;
    }

    /**********开奖规律小模块代码*********************************************************************************************************************/
    //得到开奖结果规律数据
    function getLawData(number, fnStr){
        var rpcPost = SaveData['attrData']['rpcPost'];
        var post = { 'actID':601, 'game_lx': rpcPost['game_lx'], 'long': number };
        getServerData( post, 'SaveData["lawData"]["dataStorage"]', fnStr);
    };

    //开奖结果规律第一标题
    function getLawTitle(contentObj){
        var titleHtml = [], ID = "", sum = 0, Class = "";
        for (var id in contentObj){
            (sum === 0) ? Class = "class='titleClass'" : Class = "";
            if (id !== ""){ ID = 'id="'+ id +'"' }
            titleHtml.push('<span '+ ID +' '+ Class +'>'+ contentObj[id] +'</span>');
            sum++;
        }
        return titleHtml;
    };

    //开奖结果规律内容
    function getLawsContent(){
        var contentHtml = [], id = "", dataStorage = SaveData["lawData"]["dataStorage"];
        for (id in dataStorage){
            if (id === "status"){ continue; }
            contentHtml.push('<div>');
            contentHtml.push('<a name="'+ dataStorage[id]['play'] +'" href="javascript: void(0)">'+ dataStorage[id]['play_name'] +'['+ dataStorage[id]['wave'] +']</a>');
            contentHtml.push('<span>'+ dataStorage[id]['connecting'] +'期</span>');
            contentHtml.push('</div>');
        }
        return contentHtml;
    };

    //初始化开奖结果规律
    function getLawsData(){
        var rpcPost = SaveData['attrData']['rpcPost'], dataStorage = SaveData['lawData']['dataStorage'], lawHTML = [];
        var lawData = SaveData['lawData'];

        //开奖规律第一标题
        if (rpcPost['game_lx'] === 41){ lawData['DYThis'] = "QuangBu"; };
        (rpcPost['game_lx'] == 41) ? lawData['DYTitle'] = {QuangBu: '全部长龙', LuZi: '路子'} : lawData['DYTitle'] = {ShuangMian: '双面长龙', QuangBu: '全部长龙', LuZi: '路子'};
        lawHTML.push('<div id="HeadTitle" class="lotteryBox01">'+ getLawTitle(lawData['DYTitle']).join('') +'</div>');

        //开奖规律内容
        lawHTML.push('<div id="lotteryContent">');

        //开奖规律第二标题
        lawHTML.push('<div id="titleContent" class="lotteryBox03">'+ getLawTitle(lawData['DETitle']).join('') +'<a id="moreCL" class="allCL">更多长龙</a></div>');

        //开奖规律内容
        lawHTML.push('<div id="lawContent">'+ getLawsContent().join('') +'</div>');

        lawHTML.push('</div>');
        lawHTML.push('<div class="lotteryBox02"></div>');

        $("#lotteryNo").html(lawHTML.join(''));

        //给开奖规律添加点击事件01
        $("#HeadTitle span").click(Event['RuseLottery_01']);

        //给开奖规律添加点击事件02
        $("#titleContent span").click(Event['RuseLottery_02']);

        //给开奖规律添加点击事件03
        $("#moreCL").click(Event['RuseLottery_03']);

        //给开奖规律更多长龙添加点击事件05
        $("#lawContent a").click(function (){ Event['changePanType']($(this).attr('name')); });
    };

    /**********系统提示代码开始******************************************************************************************************************************************************************/
    //系统维护
    function systemAlert(jsonDataOBJ){
        var status = eval( jsonDataOBJ+'.status' );
        if( typeof( status ) == 'undefined' ){
            alertBox( boxType=3, contentHtml="系统维护中，请稍后再试[1]！", btFunction='' );
            return false;
        }

        switch( status ){
            case 7777: return true; break;
            case 6666: alertBox( boxType=3, contentHtml="系统维护中，请稍后再试[2]！", btFunction='' ); return false; break;
            case 8888: alertBox( '', contentHtml="登录无效，请登陆后再试！", btFunction='' ); return false; break;
            default: alertBox( boxType=3, contentHtml="系统维护中，请稍后再试[3]！", btFunction='' ); return false; break;
        }
    };

    //返回拿到数据的状态
    function oddsStatus(){
        var ZhuangTai = SaveData['jsonDataMid']['data']['gameStatus'], statusHtml = [];
		console.log(SaveData['jsonDataMid']);
        if (ZhuangTai['status'] !== 1){
            statusHtml.push('<div style="padding-left: 10px; width: 347px; margin: 0 auto; margin-top: 130px; text-align: left;">第 <b style="color: #d00; font-size: 14px;">'+ ZhuangTai['periods2'] +'</b> 期&nbsp&nbsp&nbsp&nbsp开盘时间：<b style="color: #d00; font-size: 14px;">'+ ZhuangTai['xztime'] +'</b></div>');
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

            $("#lotteryMainMid").html(statusHtml.join(''));
            $("#userCathectic").html('<div style="text-align: center; width: 100%; padding-bottom: 8px;">点击页面中的赔率可以投注！</div>'); //清空投注单列表
            SaveData['attrData']['rpcPost']['betBrders'] = {};  //清空投注菜单上的数据
            $("#quickPick").html('');
            $("#quickPick").css({top: "-9999px"});
            return;
        }
    };

    //投注提示
    function bettingAlert( obj ){
        if( typeof( obj['status'] ) == 'undefined' ){
            alertBox( boxType=3, contentHtml="系统维护中，请稍后再试[4]！", btFunction='' );
            return false;
        }

        var rpcPost = SaveData['attrData']['rpcPost'];
        rpcPost['DataKG'] = true;

        switch( obj['status'] ){
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
    };

    //投注菜单中点击返回按钮清空投注菜单
    function deleteOdds() {
        //清空投注菜单
        $("#userCathectic").html('<div style="text-align: center; width: 100%; padding-bottom: 8px;">点击页面中的赔率可以投注！</div>');
        SaveData['attrData']['rpcPost']['betBrders'] = {}; //清空投注菜单上的数据

        //如果启用了快选金额，则隐藏快选金额容器
        $("#quickPick").css({top: "-9000px"});
    };

    /**********最后十住*******************************************************************************************/
    //把用户的最后十注投注返回到页面
    function NoteContent(){
        var noteContent = [];
        for (var id in SaveData['afterTenNote']){
            if (id === 'status'){continue;}
            noteContent.push('<div class="noteContent01">');
            noteContent.push('<p><span style="font-weight: bold;">'+ SaveData['afterTenNote'][id]["game_name"] + '</span>-[' + SaveData['afterTenNote'][id]["periods"] +']</p>');
            noteContent.push('<p>'+ SaveData['afterTenNote'][id]["play_name"] +'</p>');
            noteContent.push('<p><span style="color: #c00;">'+ SaveData['afterTenNote'][id]["obj_name"] +'</span> @<span style="color: #C00;">'+ SaveData['afterTenNote'][id]["bet_pl"] +'<span></p>');
            noteContent.push('<p>[<span style="color: #FF6600; font-weight: bold;">'+ SaveData['afterTenNote'][id]["bet_money"] +'</span>]</p>');
            noteContent.push('<p>'+ SaveData['afterTenNote'][id]["id"] +'</p>');
            noteContent.push('<p>'+ SaveData['afterTenNote'][id]["bet_time"] +'</p>');
            noteContent.push('</div>');
        }
        $("#AfterTenNote").html(noteContent.join(''));
    };

    //让弹出层固定在页面中间
    function getPopUp(boxID){
        var top = ($(window).height() - $("#"+ boxID).height())/2;
        var left = ($(window).width() - $("#"+ boxID).width())/2;
        $("#"+ boxID).css( {position : 'absolute', top : top + 'px', left : left + 'px' } );
    };

    //容器的头部
    function getTitleBox(titleContent, ID){
        var html = [];
        html.push('<div class="ruleBox02">');
        html.push('<div class="ruleBox03"></div>');
        html.push('<div class="ruleBox04">'+ titleContent +'</div>');
        html.push('<div class="ruleBox06" id="'+ ID +'"></div>');
        html.push('<div class="ruleBox05"></div>');
        html.push('</div>');
        return html;
    };

    //快选金额
    function clickMoney(){
        var quickPickStatus = SaveData["quickPickStatus"];
        var ruleArr = [], oTop = "", oLeft = "", ruleTag = "", id = "", i = 0, userData = quickPickStatus['user_stting']['users_setting'];
        $("#moneySelect").css({display:"block"});

        //快选金额容器的头部
        ruleArr.push(getTitleBox("快选金额", "SelMoney").join(''));

        //快选金额容器的内容
        ruleArr.push('<div id="fastSelect">');
        ruleArr.push('<table cellspacing="0" cellpadding="0" style="width: 100%;">');

        ruleArr.push('<tr style="height: 24px;">');
        ruleArr.push('<td>目前状态:<input type="radio" value="1" name="status">启用<input type="radio" value="0" name="status">停用</td>');
        ruleArr.push('</tr>');

        for (i = 0; i < userData['set_value'].length; i++){
            ruleArr.push('<tr style="height: 24px;">');
            ruleArr.push('<td>快选金额：<input style="width: 75px; text-align: center; font-weight: bold; color: #FF6600;" onkeypress="return CheckKey(event)" maxlength="4" type="text" value="'+ userData['set_value'][i] +'" id="enterMoney'+ i +'"></td>');
            ruleArr.push('</tr>');
        }

        ruleArr.push('<tr style="height: 24px;">');
        ruleArr.push('<td colspan="2"><button id="changeMoney">更改</button><button style="margin-left: 30px;" id="emptyMoney">重置</button></td>');
        ruleArr.push('</tr>');

        ruleArr.push('</table>');
        ruleArr.push('</div>');

        //加载HTML带ID为selectTag的容器中
        $("#selectTag").html(ruleArr.join(''));

        //改变用户选择的启用或停用状态
        $("#fastSelect td input[type='radio'][value='"+ userData['is_using'] +"']").attr({checked:true});

        //让弹出层固定在页面中间
        getPopUp("selectTag");

        //让快选金额容器隐藏
        $("#quickPick").css({top: "-9000px"});

        //关闭按钮事件添加
        $("#SelMoney").click(function (){
            CaiPiao['closeWindow']("moneySelect");
        });

        //重置金额按钮事件，清空用户输入的金额
        $("#emptyMoney").click(function (){ $("#fastSelect input[type='text']").val(""); });


        //点击设置快选金额页面的更改按钮
        $("#changeMoney").click(function (){
            var quickPickStatus = SaveData["quickPickStatus"];
            var userSelect = $("#fastSelect td input[type='radio']:checked").val(), i = 0;
            $("#fastSelect input[type='text']").each(function (i){
                quickPickStatus['moneyArr'][i] = $("#fastSelect input[type='text']").eq(i).val();
            })

            alertBox( '', '确定改变快选金额？', 'closeAlertBox();CaiPiao[\'closeWindow\'](\'moneySelect\');CaiPiao[\'conveyMoney\']()' );
        });
    };

    //点击快选金额停用按钮
    function disabledQuickPick(){ alertBox( '', '确定要停用快选金额？', 'closeAlertBox();CaiPiao[\'closeQuickPick\']()' ); }

    //用户选择设置好的金额
    function getThisMoney(money, tagID){
        var quickPickStatus = SaveData["quickPickStatus"];
        $(quickPickStatus['DOMThis']).val(money);
        if (tagID == "halfMoney"){
            $("#orderList input[type='text']").val(money);
        }
        $("#quickPick").css({top: "-9000px"});
    }

    /**********公有API开始******************************************************************************************************************************************/
    //一个空的构造函数
    function Lottery(){}

    //生成左边彩票项目
    Lottery.prototype.reloadLeftItemList = function (){
        var currTime = SaveData['attrData']['Timer']['item'];
        var rpcPost = SaveData['attrData']['rpcPost'];

        if( currTime['currTime'] > 0){

            //更新倒数时间
            updateLeftItemListTime();
        }else if( currTime['currTime'] == 0 ){//装载数据

            //执行getServerData这个函数到服务器上拿数据到客户端，并且执行createHTML_07这个函数
            getServerData( {'actID': 250, 'msTime': getCookie( 'msTime' )}, 'SaveData["jsonDataLeft"]', function (){
                CodeHTML['createHTML_07'](); //加载初始化代码，加载HTML代码_07
            });

            //这是一个计时器Timer['item']['reloadSpan'] = 180，当Timer['item']['currTime']等于0的时候到服务器上拿数据
            currTime['currTime'] = currTime['reloadSpan'];
        }
        currTime['currTime']--;
    };

    //生成右边彩票项目
    Lottery.prototype.reloadMidPanData = function (){
        
        var Timer =SaveData['attrData']['Timer'];
        var rpcPost =SaveData['attrData']['rpcPost'];
//        console.log(rpcPost);
        if( Timer['panData']['currTime'] > 0 ){
            //更新赛程状态倒数时间
            if( Timer['gameStatus']['currTime'] > 0 ){
                $('#daoShuTime').html( secondTOTime( Timer['gameStatus']['currTime'] ) );
            }else if( Timer['gameStatus']['currTime'] === 0 ){
                Timer['panData']['currTime'] = 0;
                CaiPiao['reloadMidPanData']();
            }
            Timer['gameStatus']['currTime']--;
        }else if( Timer['panData']['currTime'] <= 0 ){
            createPlayMenu();
            var post = {'actID':201,'game_lx':rpcPost['game_lx'], 'cp_type':rpcPost['cp_type'], 'panType':rpcPost['panType'], 'msTime': getCookie( 'msTime' )};
            getServerData(post, 'SaveData["jsonDataMid"]', function (){createMidPanHtml(); });
            Timer['panData']['currTime'] = Timer['panData']['reloadSpan'];
        }

        Timer['panData']['currTime']--;
    };

    //关闭游戏规则窗口
    Lottery.prototype.closeWindow = function (objID){ $("#"+ objID).css({display: "none"}); };

    //把快选金额的数据传到服务器上
    Lottery.prototype.conveyMoney = function (){
        var quickPickStatus = SaveData["quickPickStatus"];
        var post = { 'actID':303,'uid': getCookie('uid'), 'is_using': $("#fastSelect td input[type='radio']:checked").val(), 'set_value': quickPickStatus['moneyArr'].toString() };
        getServerData( post );
		console.log(post);

        //更改本地数据
        quickPickStatus["user_stting"]["users_setting"]["is_using"] = $("#fastSelect td input[type='radio']:checked").val();
        quickPickStatus["user_stting"]["users_setting"]["set_value"] = quickPickStatus['moneyArr'];
    };

    //用户点击快选金额停用按钮后，执行这个函数
    Lottery.prototype.closeQuickPick = function (){
        var quickPickStatus = SaveData["quickPickStatus"];
        var post = { 'actID':303,'uid': getCookie('uid'), 'is_using': '0' };
        getServerData( post );
        quickPickStatus["user_stting"]["users_setting"]["is_using"] = "0";
        $("#quickPick").css({top: "-9000px"});
    };

    //提交投注菜单，如果赔率发生了改变执行这个函数
    Lottery.prototype.oddsChange = function (){
        var betBrders = SaveData['attrData']['rpcPost']['betBrders'];
        var returnData = SaveData["betData"]['data'];

        for (var playOBJ in returnData['newOdds']) {
            betBrders[playOBJ]['odds'] = returnData['newOdds'][playOBJ];
            $("#" + playOBJ + "Odds").html(returnData['newOdds'][playOBJ]);
            $("#" + playOBJ + "Odds").css("background-color","yellow");
        }
    }

    //投注数据提交到服务器
    Lottery.prototype.btnSubmit = function (){
        var rpcPost = SaveData['attrData']['rpcPost'];
        if (!rpcPost['DataKG']){ return; }
        rpcPost['DataKG'] = false;
        //提交到服务器
        $("#contenBox").html('正在加载数据.....');
        var betBrders = SaveData['attrData']['rpcPost']['betBrders'];
        var post = {'actID':302,'uid': getCookie('uid'), 'orders': betBrders, path: 1, show_type: rpcPost['show_type']};
        getServerData( post, 'SaveData["betData"]', function (){
			console.log(post);
			console.log(SaveData["betData"]);
            if ( bettingAlert(SaveData["betData"]['data']) !== true ) return;

            var rpcPost = SaveData['attrData']['rpcPost'];
            //清空投注菜单上的最高最低金额
            var MoneyDX = SaveData['attrData']['rpcPost']['MoneyDX'];
            MoneyDX['minMoney'] = {};
            MoneyDX['maxMoney'] = {};

            rpcPost['DataKG'] = true;

            //判断提交投注数据后，返回的状态
            var returnData = SaveData["betData"]['data'];
            switch (returnData['bet_error']) {
                case -2:
                    alertBox( '', '投注赔率发生了改变，是否继续投注！', 'closeAlertBox();CaiPiao[\'oddsChange\']();' );
                    break;
                case 0:
                    var gameStatus = SaveData['jsonDataMid']['data']['gameStatus'];
                    $("#orderList .orderDelete").remove();
                    for (var i = 0, len = $("#orderList > div").length; i < len; i++){
                        var BoxID = $("#orderList > div").eq(i).attr('id');
                        $("#" + BoxID).prepend('<div><span style="font-weight: bold;">'+ gameStatus['game_name'] + '</span>-[' + gameStatus["periods2"] +']</div>');
                        $("#" + BoxID).append('<div><span class="orderObj" style="color: #FF6600; font-weight: bold;">'+ $("#"+ BoxID +" input[type='text']").eq(0).val() +' </span></div>');
                        $("#betMoney" + BoxID).remove();
                    };
                    $("#orderList input[type='text']").attr({disabled : "disabled"});
                    $("#totalMoney").remove();
                    $("#orderRule").html('下注成功！<br/>投注时间：' + returnData['bet_time']);
                    $("#orderBtns").html('<div id="deleteOdds">返回</div>');

                    $("#deleteOdds").click(Event['betEmptyBtn']);  //投注单返回按钮

                    SaveData['attrData']['rpcPost']['betBrders'] = {}; //清空投注菜单上的数据

                    //如果启用了快选金额，则隐藏快选金额容器
                    $("#quickPick").css({top: "-9000px"});

                    topGetUserData();  //刷新用户金额
                    alertBox( '', '下注成功<br><br>請查看注單信息及投注狀態', '' );
                    break;
                default :
                    break;
            }
        });
    };

    //外部统一RPC请求入口
    Lottery.prototype.comSeverData = function (post, jsonDataOBJ, fnStr){
        getServerData(post, jsonDataOBJ, fnStr);
    };

    return new Lottery();
})(jQuery);


