/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-7-30
 * Time: 下午5:12
 * To change this template use File | Settings | File Templates.
 */

function initRpcObj(phprpcUrl) {     //初始化远程RPC方法
    Interface = new PHPRPC_Client(phprpcUrl + '/phprpcClass/interface.class.php', ['serverInterface']);
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
            downBox:{
                10: '六合彩', 11: '重庆时时彩', 13: '江西时时彩', 14: '天津时时彩', 15: '新疆时时彩', 12: '福彩时时乐', 47: '快乐3D',
                21: '广东快乐十分', 22: '广西快乐十分', 23: '天津快乐十分', 24: '重庆幸运农场', 31: '广东11选5', 32: '江西11选5', 33: '山东11选5',
                34: '重庆11选5', 41: '北京快乐8', 45: '北京PK拾'
            }
        },

        //共享数据
        GXdata: {}
    };

    //存放事件
    var Events = {
        //彩票赛果游戏类型到服务器里面拿数据
        SGLxHtmlCode: function (){
            var gameLX = $("#SGResult option:selected").val();
            var post = {actID: 502, game_lx: gameLX};
            getServerData(post, "data['SGdata']['SGhtml']", function (){
                $("#SGContent").html(data['SGdata']['SGhtml']['html'].join(''));
            });
        },

        SGKjjgHrmlCode: function (number){
            var gameLX = $("#SGResult option:selected").val();
            var post = {actID: 502, game_lx: gameLX, noResult: number};
            getServerData(post, "data['SGdata']['SGhtml']", function (){
                $("#SGContent").html(data['SGdata']['SGhtml']['html'].join(''));
            });
        }
//        //彩票赛果分页到服务器里面拿数据
//        SGFyHrmlCode: function (number){
//            var gameLX = $("#SGResult option:selected").val();
//            var post = {actID: 502, game_lx: gameLX, page: number};
//            getServerData(post, "data['SGdata']['SGhtml']", function (){
//                $("#SGContent").html(data['SGdata']['SGhtml']['html'].join(''));
//            });
//        }
    };

    //存放HTML代码
    var HTML = {};

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
        html.push('<div style="margin-bottom: 10px;"><select id="SGResult">');
        for (var id in SGdata['downBox']){
            html.push('<option value="'+ id +'">'+ SGdata['downBox'][id] +'</option>');
        }
        html.push('</select></div>');
        html.push('<div id="SGContent"></div>');

        $("#about7").html(html.join(''));

        //选择彩票类型点击事件
        $("#SGResult").change(function (){
            Events['SGLxHtmlCode'](); //彩票赛果到服务器里面拿数据
        });

        Events['SGLxHtmlCode'](); //彩票赛果到服务器里面拿数据
    }

    /***公告API接口********************************************************************************************************************************************/
    //构造函数
    function HanderCP(){};

    //彩票系统公告函数
    HanderCP.prototype.getGongGaoCP = function (){
        $("#about0").html("彩票系统公告函数");
    };

    //彩票未结算注单函数
    HanderCP.prototype.getUserOrderCP = function (){
        $("#about1").html("彩票未结算注单函数");
    };

    //彩票报表函数
    HanderCP.prototype.getUserReportCP = function (){
        $("#about2").html("彩票报表函数");
    };

    //彩票赛果函数
    HanderCP.prototype.getResultCP = function (){ getSaiGuo(); };

    //彩票赛果点击开奖结果标题函数
    HanderCP.prototype.noResult = function (number){
        Events['SGKjjgHrmlCode'](number); //彩票赛果到服务器里面拿数据
    };

    //彩票赛果点击分页函数
    HanderCP.prototype.page = function (number){
        Events['SGFyHrmlCode'](number); //彩票赛果到服务器里面拿数据
    };

    return new HanderCP();
})(jQuery);

