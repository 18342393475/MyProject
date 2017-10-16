/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-9-4
 * Time: 上午11:53
 * To change this template use File | Settings | File Templates.
 */
var Csh = (function (){

    //**外部调用API*********************************************************************************************************************
    function Csh(){} //声明一个空的构造函数

    //为添加cookie
    Csh.prototype.addCookie = function (objName,objValue,objHours){
        var str = objName + "=" + escape(objValue);
        if(objHours > 0){//为0时不设定过期时间，浏览器关闭时cookie自动消失
            var date = new Date();
            var ms = objHours*3600*1000;
            date.setTime(date.getTime() + ms);
            str += "; expires=" + date.toString();
        }
        document.cookie = str;
    };

    //获取指定名称的cookie的值
    Csh.prototype.getCookie = function (objName){
        var arrStr = document.cookie.split("; ");
        for(var i = 0;i < arrStr.length;i ++){
            var temp = arrStr[i].split("=");
            if(temp[0] == objName) return unescape(temp[1]);
        }
    };

    //为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间
    Csh.prototype.delCookie = function (name){
        var date = new Date();
        date.setTime(date.getTime() - 10000);
        document.cookie = name + "=a; expires=" + date.toString();
    };

    //获得网站域名，并从域名中得到参数，接收html参数值
    Csh.prototype.getParameter = function (param){
        var query = window.location.search;
        var iLen = param.length;
        var iStart = query.indexOf(param);
        if (iStart == -1) return "";
        iStart += iLen + 1;
        var iEnd = query.indexOf("&", iStart);
        if (iEnd == -1) return query.substring(iStart);
        return query.substring(iStart, iEnd);
    };

    //以一个对象的X和Y属性的方式返回滚动条的偏移量
    Csh.prototype.getScrollOffsets = function (w){
        //使用指定的窗口，如果不带参数则使用当前窗口
        var w = w || window;

        //除了IE8以及更早的版本以外，其他浏览器都能用到
        if (w.pageXOffset != null){ return {x: w.pageXOffset, y: w.pageYOffset} };

        //对标准模式下的IE（或任何浏览器）
        var d = w.document;
        if (document.compatMode == "CSS1Compat"){ return {x: d.documentElement.scrollLeft, y: d.documentElement.scrollTop} }

        //对怪异模式下的浏览器
        return {x: d.body.scrollLeft, y: d.body.scrollTop}
    };

    //异步载入并执行一个指定的URL中的脚本,这个函数会动态地载入脚本，成为正在执行的JS程序的一部分
    Csh.prototype.loadasync = function (url){
        var head = document.getElementsByTagName("head")[0]; //找到<head>标签
        var s = document.createElement("script"); //创建一个<script>标签
        s.src = url; //设置其src属性
        head.appendChild(s); //将script元素插入head标签中
    };

    //一个公用导航条
    //obj：导航条有多少个按钮
    //thisBtn：初始化的时候，默认的按钮
    //eleBox： 要加载到那个ID元素中
    //runFn：这是一个函数，用户每点击一次导航条的按钮都会执行这个函数
    Csh.prototype.menuHtml = function (obj, thisBtn, eleBox, runFn){
        var l = [], mun = 0;
        l.push('<ul class="menuUL129">');
        for (var id in obj){
            var addStyle = '';
            if ( ((id === thisBtn) && (thisBtn)) || ((!thisBtn) && (mun === 0)) ) addStyle = 'activTab';
            l.push('<li name="'+ id +'" class="'+ addStyle +'">'+ obj[id] +'</li>');
            mun++;
        }
        l.push('</ul>');
		l.push('<div class="emptyBg129"></div>' );
       
	    $(eleBox).html(l.join(''));

        $(".menuUL129 li").click(function (){
            if ($(this).attr('class') == 'activTab'){return false;} //如果重复点击现有的，将不执行函数
            $(".menuUL129 li").removeAttr('class');
            $(this).addClass('activTab');
            runFn(this); //this是指用户点击的当前元素
        });

    };

    return new Csh();
})();





























































