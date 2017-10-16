/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-7-30
 * Time: 下午5:12
 * To change this template use File | Settings | File Templates.
 */

function initRpcObj(phprpcUrl) {     //初始化远程RPC方法
    Interface = new PHPRPC_Client(phprpcUrl + '/phprpcClass/interface.class.php', ['serverInterface']);
    Interface.setKeyLength(96);
    Interface.setEncryptMode(3);
};

//彩票系统公告函数
function getGongGaoCP(){ CaiPiaoHander['getGongGaoCP'](); };

//彩票未结算注单函数
function getUserOrderCP(){ CaiPiaoHander['getUserOrderCP'](); };

//彩票报表函数
function getUserReportCP(){ CaiPiaoHander['getUserReportCP'](); };

//彩票赛果函数
function getResultCP(){ CaiPiaoHander['getResultCP'](); };

var CaiPiaoHander = (function ($){
    //所有数据都存放到这个对象中
    var data = {
        //存放彩票赛事结果对象
        SGdata: {
            SGhtml: {},
            selectNo: {
                CQ: {0: '彩球系列', 10: '六合彩', 52: '福彩3D', 62: '体彩PL3', 63: '体彩PL5'},
                SSC: {0: '时时彩系列', 12: '福彩时时乐', 11: '重庆时时彩', 13: '江西时时彩', 14: '天津时时彩', 15: '新疆时时彩'},
                KLSF: {0: '快乐十分系列', 21: '广东快乐十分', 22: '广西快乐十分', 23: '天津快乐十分', 24: '重庆幸运农场', 25: '湖南快乐十分'},
                YYXW: {0: '11选5系列', 31: '广东11选5', 32: '江西11选5', 33: '山东11选5', 34: '重庆11选5', 35: '安徽11选5'},
                KS: {0: '快3系列', 71: '江苏快3', 72: '安徽快3', 73: '河北快3', 74: '吉林快3', 75: '湖北快3', 76: '广西快3', 79: '内蒙古快3'},
                PK: {0: '快乐八', 45: '北京PK拾', 41: '北京快乐8'}

            },
            BetResult: {
                10: 15, 11: 1, 13: 1, 14: 1, 15: 1, 12: 5, 21: 9, 22: 8, 23: 9, 24: 9, 25: 9, 31: 12, 32: 12, 33: 12, 34: 12, 35: 12, 41: 13, 45: 14
            },
            KJJG: 0,
            BBDate: 0,
            BBMonth: 0
        }
    };

    //存放事件
    var Events = {
        //彩票赛果游戏类型到服务器里面拿数据
        SGLxHtmlCode: function (){
            var html = [], SGdata = data['SGdata'];
            for (var id in SGdata['selectNo']){
                if (id !== $(this).attr('id')){ $("#" + id + " option").eq(0).attr({selected: "selected"}); }
                $("#" + id).css({ color: "#000" });
            }
            var gameLX = $(this).val();
            $(this).css({color: "#BF6000"});
            if (gameLX == 0){ return; }
            var post = {actID: 502, game_lx: gameLX};
            data['SGdata']['KJJG'] = data['SGdata']['BetResult'][gameLX];
            getServerData(post, "data['SGdata']['SGhtml']", function (){
                $("#SGContent").html(data['SGdata']['SGhtml']['html'].join(''));
                $("#game_time").change(Events['SGFyHrmlCode']);
            });
        },

        //彩票赛果点击开奖结果
        SGKjjgHrmlCode: function (number){
            var gameSelect = $("#SGResult option:selected");
            for (var i = 0, len = gameSelect.length; i < len; i++){
                if (gameSelect.eq(i).val() == 0){ continue; }
                var gameLX = gameSelect.eq(i).val();
            }
            var post = {actID: 502, game_lx: gameLX, kjjg: number};
            data['SGdata']['KJJG'] = number;
            getServerData(post, "data['SGdata']['SGhtml']", function (){
                $("#SGContent").html(data['SGdata']['SGhtml']['html'].join(''));
                $("#game_time").change(Events['SGFyHrmlCode']);
            });
        },

        //彩票赛果分页到服务器里面拿数据
        SGFyHrmlCode: function (){
            var gameSelect = $("#SGResult option:selected");
            for (var i = 0, len = gameSelect.length; i < len; i++){
                if (gameSelect.eq(i).val() == 0){ continue; }
                var gameLX = gameSelect.eq(i).val();
            }
            var post = {actID: 502, game_lx: gameLX, kjjg: data['SGdata']['KJJG'], game_time: $(this).val()};
            getServerData(post, "data['SGdata']['SGhtml']", function (){
                $("#SGContent").html(data['SGdata']['SGhtml']['html'].join(''));
                $("#game_time").change(Events['SGFyHrmlCode']);
            });
        },

        //历史报表选择游戏类型
        GameLx: function (){

        },

        //点击彩票历史报表页中日期事件
        clickBBDate: function (game_time){
            data['SGdata']['BBDate'] = game_time;
            var post = {actID: 404, uid: getCookie('uid'), game_time: game_time };
            getServerData(post, "data['SGdata']['SGhtml']", function (){
                var html = [], SGhtml = data['SGdata']['SGhtml'];
                html.push('<div id="BBDay">');
                html.push('<a href="javascript:void(0)">歷史報表</a> >> ' + game_time);
                html.push('<select style="margin-left: 10px;">');
                html.push('<option value="allCZ" selected>所有彩种</option>');
                for (var id in SGhtml['game_lx']){
                    html.push('<option value="'+ SGhtml['game_lx'][id]['lx'] +'">'+ SGhtml['game_lx'][id]['name'] +'</option>');
                }
                html.push('</select>');
                html.push('</div>');

                //当天彩种内容
                html.push('<div id="BBBox">'+ HTML['HTMLCode02']() +'</div>');

                $("#about2").html(html.join(''));

                $("#BBDay a").eq(0).click(function (){
                    var gameTimeArr = game_time.split('-');
                    userReport(gameTimeArr[0] + "-" + gameTimeArr[1])
                });

                $("#BBDay select").change(function (){
                    if ($(this).val() === "allCZ"){
                        var post = {actID: 404, uid: getCookie('uid'), game_time: data['SGdata']['BBDate'] };
                        getServerData(post, "data['SGdata']['SGhtml']", function (){ $("#BBBox").html(HTML['HTMLCode02']()); });
                        return;
                    }
                    var post = {actID: 404, uid: getCookie('uid'), game_time: data['SGdata']['BBDate'], game_lx: $(this).val() };
                    getServerData(post, "data['SGdata']['SGhtml']", function (){ $("#BBBox").html(HTML['HTMLCode02']()); });
                });
            });
        }
    };

    //存放HTML代码
    var HTML = {
        HTMLCode01: function (){
            var html = [], SGhtml = data['SGdata']['SGhtml']
            //历史报表内容HTML
            html.push('<table width="100%" cellspacing="0" cellpadding="4" bordercolor="#C0C0C0" border="1" bgcolor="#ffffff" style="BORDER-COLLAPSE: collapse">');

            //表格头部
            var titleBox = ['日期', '注單數', '投注額', '贏利額'];
            html.push('<tr height="25" bgcolor="#f0f0f0" style="color:#B05800">');
            for (var i = 0, len = titleBox.length; i < len; i++){
                html.push('<td>'+ titleBox[i] +'</td>');
            }
            html.push('</tr>');

            //表格内容
            for (var id in SGhtml['play']){
                html.push('<tr height="25" bgcolor="#FFFFFF" onmouseout="this.style.backgroundColor=\'#FFF\'" onmouseover="style.backgroundColor=\'#f6f6f6\'" style="background-color: rgb(255, 255, 255);">');
                html.push('<td><a href="javascript:void(0)" name="'+ SGhtml['play'][id]['game_time'] +'">'+ SGhtml['play'][id]['game_time'] +'</a></td>');
                html.push('<td>'+ SGhtml['play'][id]['amount'] +'</td>');
                html.push('<td>'+ SGhtml['play'][id]['bet_money'] +'</td>');
                html.push('<td>'+ SGhtml['play'][id]['js_money'] +'</td>');
                html.push('</tr>');
            }


            //表格尾部
            html.push('<tr bgcolor="#f0f0f0">');
            html.push('<td>合计</td>');
            html.push('<td>'+ SGhtml['play_all']['amount'] +'</td>');
            html.push('<td>'+ SGhtml['play_all']['bet_money'] +'</td>');
            html.push('<td>'+ SGhtml['play_all']['js_money'] +'</td>');
            html.push('</tr>');

            html.push('</table>');

            if (SGhtml['play'].length <= 0){ html = []; }

            return html.join('');
        },

        HTMLCode02: function (){
            var html = [], SGhtml = data['SGdata']['SGhtml'];
            var betErrorArr = ['', '注单不接受', '无效注单', '系统错误', '赔率错误', '赛前开奖'];
            //历史报表内容HTML
            html.push('<table width="100%" cellspacing="0" cellpadding="4" bordercolor="#C0C0C0" border="1" bgcolor="#ffffff" style="BORDER-COLLAPSE: collapse">');
            //表格头部
            var titleBox = ['流水号/时间', '类型/期号', '投注信息', '开奖结果', '投注额', '盈利额'];
            html.push('<tr height="25" bgcolor="#f0f0f0" style="color:#B05800">');
            for (var i = 0, len = titleBox.length; i < len; i++){
                html.push('<td>'+ titleBox[i] +'</td>');
            }
            html.push('</tr>');

            //表格内容
            for (var id in SGhtml){
                if (id === "status" || id === "game_lx" || id === "periods"){ continue; }
                html.push('<tr height="25" bgcolor="#FFFFFF" onmouseout="this.style.backgroundColor=\'#FFF\'" onmouseover="style.backgroundColor=\'#f6f6f6\'" style="background-color: rgb(255, 255, 255);">');
                html.push('<td>'+ SGhtml[id]['id'] +'<br/>'+ SGhtml[id]['bet_time'] +'</td>');
                html.push('<td><b>'+ SGhtml[id]['game_name'] +'<br/>'+ SGhtml[id]['periods'] +'</b></td>');
                html.push('<td><b>'+ SGhtml[id]['play_name'] +'</b><br/><span style="font-weight: bold; color: #d00;">'+ SGhtml[id]['obj_name'] +'</span> @<span style="font-weight: bold; color: #d00;">'+ SGhtml[id]['bet_pl'] +'</span></td>');
                html.push('<td>');
                var totalnumber = SGhtml[id]['totalnumber'].split(',');
                for (var i = 0, len = totalnumber.length; i < len; i++){
                    if (i === 10 || i === 20 || i === 30 || i === 40){html.push('<br/>');}
                    var resultArr = totalnumber[i].split('|');
                    if (resultArr[1]){
                        html.push('<span class="resultLSNo">'+ resultArr[0] +'</span>');
                        html.push('<span class="resultLSTBNo">'+ resultArr[1] +'</span>');
                    }else{
                        html.push('<span class="resultLSNo">'+ totalnumber[i] +'</span>');
                    }
                }
                html.push('</td>');
                html.push('<td>'+ SGhtml[id]['bet_money'] +'</td>');
                html.push('<td>'+ SGhtml[id]['js_money']);
                if (SGhtml[id]['bet_error'] > 0){ html.push('<br/>(<span style="color: #d00;">'+ betErrorArr[SGhtml[id]['bet_error']] +'</span>)');}
                html.push('</td>');
                html.push('</tr>');
            }
            html.push('</table>');
            return html.join('');
        },
        HTMLCode03: function (){
            var html = [], SGhtml = data['SGdata']['SGhtml'];
            //表格头部
            var titleBox = ['流水号/时间', '类型/期号', '投注信息', '投注金额'];
            html.push('<tr height="25" bgcolor="#f0f0f0" style="color:#B05800">');
            for (var i = 0, len = titleBox.length; i < len; i++){
                html.push('<td>'+ titleBox[i] +'</td>');
            }
            html.push('</tr>');

            //表格内容
            var num = 0;
            for (var id in SGhtml){
                if (id === "status" || id === "allgame" || id === "z_id" || id === "z_money"){ continue; }
                html.push('<tr height="25" bgcolor="#FFFFFF" onmouseout="this.style.backgroundColor=\'#FFF\'" onmouseover="style.backgroundColor=\'#f6f6f6\'" style="background-color: rgb(255, 255, 255);">');
                html.push('<td>'+ SGhtml[id]['id'] +'<br/>'+ SGhtml[id]['bet_time'] +'</td>');
                html.push('<td><span style="font-weight: bold;">'+ SGhtml[id]['game_name'] +'</span><br/>'+ SGhtml[id]['periods'] +'</td>');
                html.push('<td>'+ SGhtml[id]['play_name'] +'<br/><span style="color: #c00;">'+ SGhtml[id]['obj_name'] +'</span> @<span style="color: #C00;">'+ SGhtml[id]['bet_pl'] +'</span></td>');
                html.push('<td><span style="color: #FF6600; font-weight: bold;">'+ SGhtml[id]['bet_money'] +'</span></td>');
                html.push('</tr>');
                num++;
            }
            if (num > 0){
                html.push('<tr height="25" bgcolor="#f0f0f0">');
                html.push('<td>合計</td>');
                html.push('<td></td>');
                html.push('<td>投注额：'+ SGhtml['z_money'] +'<br/>注单数：'+ SGhtml['z_id'] +'</td>');
                html.push('<td></td>');
                html.push('</tr>');
            }
            if (num === 0){
                html.push('<tr height="25" bgcolor="#f0f0f0">');
                html.push('<td colspan="'+ titleBox.length +'" style="font-weight: bold">查询不到相关记录信息！</td>');
                html.push('</tr>');
            }
            return html.join('');
        }
    };

    /***私有API接口*******************************************************************************************************************************************************/
    //统一RPC请求入口
    function getServerData(post, jsonDataOBJ, fnStr){
        Interface.serverInterface( post, function ( result, args, output, warning ) {
            if (output){ alert(output); }
            if (!jsonDataOBJ){ return; }
            if (jsonDataOBJ){ eval( jsonDataOBJ +'='+ result ); }
            if (fnStr){ fnStr(); }
        }, true);
    };

    //赛事结果框架
    function getSaiGuo(){
        //赛事结果HTML框架
        var html = [], SGdata = data['SGdata'];

        //选择彩票或体育按钮
        html.push('<div id="selBtn"></div>');

        html.push('<div id="SGResult" class="SGbox_01">');
        for (var id in SGdata['selectNo']){
            html.push('<select id="'+ id +'" style="margin-right: 10px;">');
            for (var gameID in SGdata['selectNo'][id]){
                html.push('<option value="'+ gameID +'">'+ SGdata['selectNo'][id][gameID] +'</option>');
            }
            html.push('</select>');
        }

        html.push('</div>');
        html.push('<div id="SGContent"></div>');

        $("#about7").html(html.join(''));

        //加载公共导航栏
        Csh['menuHtml']({dqResult: '体育场', pcResult: '快乐彩'}, 'pcResult', '#selBtn', function (){ getResults() });

        //彩票赛果到服务器里面拿数据
        var gameLX = Csh['getParameter']('game_lx');
        if (gameLX){
            $("#SGResult option[value='"+ gameLX +"']").attr({selected: "selected"});
            $("#SGResult option[value='"+ gameLX +"']").parent().css({color: "#BF6000"});
        }else{
            gameLX = $("#CQ option").eq(1).val();
            $("#CQ option").eq(1).attr({selected: "selected"});
            $("#CQ").css({color: "#BF6000"});
        }

        var post = {actID: 502, game_lx: gameLX};
        data['SGdata']['KJJG'] = data['SGdata']['BetResult'][gameLX];
        getServerData(post, "data['SGdata']['SGhtml']", function (){
            $("#SGContent").html(data['SGdata']['SGhtml']['html'].join(''));
            $("#game_time").change(Events['SGFyHrmlCode']);
        });

        //选择彩票类型点击事件,彩票赛果到服务器里面拿数据
        $("#SGResult select").change(Events['SGLxHtmlCode']);
    };

    /***公告API接口********************************************************************************************************************************************/
        //构造函数
    function HanderCP(){};

    //点击历史报表中日期
    HanderCP.prototype.clickHBB = function (game_time){Events['clickBBDate'](game_time);};

    //彩票系统公告函数
    HanderCP.prototype.getGongGaoCP = function (){
        var post = {actID: 406, uid: getCookie('uid') };
        getServerData(post, "data['SGdata']['SGhtml']", function (){
            var html = [], SGhtml = data['SGdata']['SGhtml'];
            //历史报表内容HTML
            html.push('<table width="100%" cellspacing="0" cellpadding="4" bordercolor="#C0C0C0" border="1" bgcolor="#ffffff" style="BORDER-COLLAPSE: collapse">');
            //表格头部
            var titleBox = ['时间', '标题', '简介'];
            html.push('<tr height="25" bgcolor="#f0f0f0" style="color:#B05800">');
            for (var i = 0, len = titleBox.length; i < len; i++){
                html.push('<td>'+ titleBox[i] +'</td>');
            }
            html.push('</tr>');

            //表格内容
            for (var id in SGhtml){
                if (id === "status"){ continue; }
                html.push('<tr height="25" bgcolor="#FFFFFF" onmouseout="this.style.backgroundColor=\'#FFF\'" onmouseover="style.backgroundColor=\'#f6f6f6\'" style="background-color: rgb(255, 255, 255);">');
                html.push('<td>'+ SGhtml[id]['writetime'] +'</td>');
                html.push('<td>'+ SGhtml[id]['title'] +'</td>');
                html.push('<td>'+ SGhtml[id]['note'] +'</td>');
                html.push('</tr>');
            }
            html.push('</table>');
            $("#about0").html(html.join(''));
        });
    };

    //彩票未结算注单函数
    HanderCP.prototype.getUserOrderCP = function (){
        var post = {actID: 402, uid: getCookie('uid') };
        getServerData(post, "data['SGdata']['SGhtml']", function (){
            var html = [], SGhtml = data['SGdata']['SGhtml'];
            //选择彩票或体育按钮
            html.push('<div id="selBtnOrder"></div>');
            //console.log(SGhtml);
            html.push('<div id="WJDay">');
            html.push('<select>');
            html.push('<option value="allCZ" selected>所有彩种</option>');
            for (var id in SGhtml['allgame']){
                html.push('<option value="'+ id +'">'+ SGhtml['allgame'][id] +'</option>');
            }
            html.push('</select>');
            html.push('</div>');

            //历史报表内容HTML
            html.push('<table id="WJBox" width="100%" cellspacing="0" cellpadding="4" bordercolor="#C0C0C0" border="1" bgcolor="#ffffff" style="BORDER-COLLAPSE: collapse">');
            html.push(HTML['HTMLCode03']());
            html.push('</table>');
            $("#about1").html(html.join(''));

            //加载公共导航栏
            Csh['menuHtml']({dqOrder: '体育场', pcOrder: '快乐彩'}, 'pcOrder', '#selBtnOrder', function (){ showOrderRow( 0, '' ); });

            //切换体育赛果按钮
            $("#sportOrder").click(function (){ showOrderRow( 0, '' ) });

            $("#WJDay select").change(function (){
                var post = {actID: 402, uid: getCookie('uid'), game_lx: $(this).val() };
                if ($(this).val() === "allCZ"){post['game_lx'] = '';}
                getServerData(post, "data['SGdata']['SGhtml']", function (){
                    $("#WJBox").html(HTML['HTMLCode03']());
                });
            });
        });
    };

    //彩票报表函数
    HanderCP.prototype.getUserReportCP = function (){
        HistoryReport(); //彩票历史报表到服务器里面拿数据
    };

    //彩票赛果函数
    HanderCP.prototype.getResultCP = function (){ getSaiGuo(); };

    //彩票赛果点击开奖结果标题函数
    HanderCP.prototype.noResult = function (number){
        Events['SGKjjgHrmlCode'](number); //彩票赛果到服务器里面拿数据
    };

    return new HanderCP();
})(jQuery);

