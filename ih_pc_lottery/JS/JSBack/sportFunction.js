//全局变量
var playItem			= 1;	//1 单式 7 hhgg 8 gj
var gameLx 				= 1;	//项目类型
var hotFlag				= '';	//热门赛事类型
var tabId				= 2;	//选项卡页面
var timeLx 				= 2;	//1 zc 2 jr 3 zd 其他为0
var pageSize 			= 50;	//默认每页100条数据
var pageNum 			= 1;	//默认共一页
var currPage 			= 1;	//默认当前页为第一页
var GetEventMenuTime	= 0;	//刷新赛事菜单计时器
var GetEventDataTime	= -1;	//刷新赛事数据计时器
var retime 				= 300;	//刷新时间
var waittime 			= 3;	//默认等待刷新时间
var checkBetId			= 0;	//检查状态的注单号
var isCheckBetStatus	= 0;	//是否执行检测注单状态
var checkBetStatusTime 	= 10;	//刷新注单状态计时器变
var currGameTime 		= ''	//赛事日期
var currLnum 			= ''; 	//当前遍处理的联赛
var currTdStr			= '';
var showLnum 			= 0;	//选中联赛
var WinShowGid			= '';	//显示冠军行
var gametable 			= '';	//赛事数据表格
var currTable			= '';	//一个联赛一个表格
var currRow 			= '';	//当前行
var currTd				= '';
var tgcode				= '';	//推广串
var orderBy				= 1;	//排序类型
var pan_type			= 1;	//香港盘 
var isMore				= 0;	//转载更多页面数据
var selectedAction		= '';	//当前选中的赔率action
var account_type 		= 'dq';
var currClassName 		= '';

//顶部变量
var isOnload 			= 1;	//大开新数据页面标志

//左边菜单变量
var liID 				= 0;
var currItem;					//当前选中的项目
var isFirstFlag 		= 1; 	//是否为第一次装载
var itemObject 			= new Object();

//数组 对象
var getData			= new Object();
var orderData		= new Object();
var lname 			= new Array();
var playItemList 	= new Array();
var orderDataGG		= {'action':[], 'betPl':[], 'betPlJs':[], 'betNum': 0 };
var colsWidth		= Array( '190,1,0,0,0,0,0,0', '190,1,*,0,0,0,0,0', '190,1,0,*,0,0,0,0', '190,1,0,0,*,0,0,0', '190,1,0,0,0,*,0,0', '190,1,0,0,0,0,*,0', '190,1,0,0,0,0,0,*' );
var bqcObj			= Array( 0, 'pl_H_H', 'pl_H_N', 'pl_H_C', 'pl_N_H', 'pl_N_N', 'pl_N_C', 'pl_C_H', 'pl_C_N', 'pl_C_C' );
var bdObj			= Array( 0, 'pl_1_0', 'pl_2_0', 'pl_2_1', 'pl_3_0', 'pl_3_1', 'pl_3_2', 'pl_4_0', 'pl_4_1', 'pl_4_2', 'pl_4_3', 'pl_0_0', 'pl_1_1', 'pl_2_2', 'pl_3_3', 'pl_4_4', 'pl_5up', 'pl_0_1', 'pl_0_2', 'pl_1_2', 'pl_0_3', 'pl_1_3', 'pl_2_3', 'pl_0_4', 'pl_1_4', 'pl_2_4', 'pl_3_4' );

var pkWidth = { 'bfTime':45, 'gameName':140, 'dy':45, 'rq':80, 'dx':80, 'ds':80, 'win':45, 'more':25 };
var panTypeObj = { 1:{'value':1, 'txt': UI.XiangGangPan, 'isCurr': 1 }, 2:{ 'value': 2, 'txt': UI.MaLaiPan }, 3:{ 'value': 3, 'txt': UI.OuZhouPan} };
var orderByObj = { 1:{'value':1,'txt': UI.ShiJianPaiXu, 'isCurr': 1 },2:{'value':2,'txt': UI.LianSaiPaiXu }};
var currRowBg = '#D6A063';

var orderClient = {};
var gameDataClient = {};
var userOrderClient = {};


$(document).ready(function(){
	
	//滚动幕
	$(window).scroll( function (){
		if( $('#top10Box').css('display') == 'block' ) return;
		setRightFixedDivPos()
	});
	
});

function initRpcObj(){
	
	gameDataClient = new PHPRPC_Client( 'http://118.184.23.233/memberRPC/phprpcClass/GameDataDq.class.php', ['getGameDataInterface'] );
	orderClient = new PHPRPC_Client( 'http://118.184.23.233/memberRPC/phprpcClass/BetOrder.class.php', ['getOrderUnitary', 'getOrderGG', 'gotoBetingUnitary','checkBetStatus'] );  	
	userOrderClient = new PHPRPC_Client( 'http://118.184.23.233/memberRPC/phprpcClass/userOrder.class.php', ['showOrderTop'] );  
	
	//初始化页面变量
	initPageVar();

}



//主控制计时器, 每秒钟都进行时间检测 并记录时间
function MasterTimer(){
	
	//时钟
	showServerTime();
		
	//顶部公告, 更新UID, 即时时间, 用户信息
	actionHeader();
	
	//左边菜单
	actionLeftItem();
	
	//刷新赛事数据
	actionEventData();
	
}





//左边/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//改变Item
function actionLeftItem(){
	
	if( GetEventMenuTime > 0 ){
		GetEventMenuTime--;
	}else if( GetEventMenuTime == 0 ){
		GetEventMenuTime = 180;	//刷新菜单时间
		getItemList();
	}else{
		//指令执行中
	}
}

//获取项目列表
function getItemList(){
	
	post = {'uid': getCookie('uid'), 'lang': getCookie('lang'), 'actionStr':'item', 'timeLx': 0 };
	gameDataClient.getGameDataInterface( post, function (result, args, output, warning){
		
        //console.log(post)
        //console.log($.parseJSON(result))
		if(output)alert(output);
		eval( 'itemObject='+result );
		if( $( '#itemBox' ).html() == '' ){
			createPlayItem();
			updatePlayItemStatus();
			slideToggleItemMenu(gameLx+''+hotFlag);
		}
		updatePlayItemStatus();

	}, true);
}

//获取资讯
function initPageVar( ){
//	return;
	POST = {
            'uid': getCookie('uid'), 'lang': getCookie('lang'),
            'page_id': 1,
            'actionStr': 'initPageVar',
            'timeLx': 0
	};
	
	gameDataClient.getGameDataInterface( POST, function ( result, args, output, warning ){
		
            console.log(POST);
            console.log(result);
		if(output)alert(output);
			return;
			eval( 'result = '+ result )
			showHomeNews( result );		
	}, true);
	
}

//首页最新赛事资讯
function showHomeNews( result ){

	if( typeof( result ) == 'undefined' ) return;

	if( result)
	var pageOBJ = [];
	var currPage;
	var playID;
	var html = Array('<div id="xuanChuanBox">');
	for( pageID in result ){
		
		switch( parseInt(pageID) ){
		case 1:
			pageOBJ.push('topLunBopage'+pageID);
			html.push('<div id="topLunBopage'+ pageID +'" class="lunboBox">');
			for( var id in result[pageID] ){
				var row = result[pageID][id];
				html.push('<div class="eventNews" onclick="linkLnum('+ row['game_lx'] +','+ row['lnum'] +')">' );
				html.push('<div class="eventImg"><img src="http://image.'+ getCookie('mainHost') +'/member/'+ row['pic_name'] +'"/></div>' );
				html.push('<div><p class="text1">'+ row['title'] +'</p><p class="text2">'+ row['text'] +'</p></div>' );
				html.push('</div>');
			}
			html.push( '</div>' );
		break;
		case 2:
			for( var id in result[pageID] ){
				var row = result[pageID][id];
				pageOBJ.push('topLunBopage'+pageID+id);
				html.push('<div id="topLunBopage'+ pageID + id +'" class="lunboBox">');
				html.push( '<img src="http://image.'+ getCookie('mainHost') +'/member/'+ row['pic_name'] +'" onclick="'+ row['function_name'] +'" />' );
				html.push( '</div>' );
			}
		break;
		}
	}
		
	html.push( '</div>' );
	html.push( '<div id="Stretchbox" class="stretch" onclick="streBtn()"></div>' );
	//html = '<textarea name="" cols="" rows="">'+ html +'</textarea>'; 
	$b('homeNewsBox').innerHTML = html.join('');
	
	//初始化轮播
	initPagePlayer(0);
	
	//初始化轮播
	function initPagePlayer( selectedIndex ){
		
		if(currPage)currPage.fadeOut('fast'); 
		currPage = $('#'+pageOBJ[selectedIndex]);
		currPage.fadeIn('slow'); 
		
		//自动播放
		clearInterval(playID); 	
		playID = setInterval(function(){ 
				var index = selectedIndex+1; 
				if( index > pageOBJ.length - 1 ) index = 0; 
				initPagePlayer(index); 
		},5000); 
		
	}
	
	//宣传隐藏/显示按钮
	if( getCookie( 'uid' ) ){
		streBtn();
		$('#agentAdBox' ).hide();
	}
		
}



function streBtn(){
	var box = $b("xuanChuanBox"),
	btn = $b("Stretchbox");
	if(btn.className =="stretch"){
		box.style.display = "none";
		btn.className = "shrink";
		setRightFixedDivPos();
	}else{
	 	box.style.display = "block";
	 	btn.className = "stretch";
	  	setRightFixedDivPos();
	}
}


//投注单及最近10注却换
function changBetingBox( tabID, self ){
	
	if( !getCookie( 'uid' ) ) return;
	if( tabID == 1 ){
		$('#betingBox').show();
		$('#top10Box').hide();
	}else{
		$('#betingBox').hide();
		$('#top10Box').show();
		
		mainTableTop = $("#mainMiddleBox").offset().top;
		$("#rightFixedDiv").animate({top : mainTableTop },{ duration:600 , queue:false });
		
		POST = { 'uid': uid,'lang': lang, 'account_type':'dq' };
		userOrderClient.showOrderTop( POST, function ( result, args, output, warning ){
			if( output ) alert(output);
			$b('top10Box').innerHTML = result.html;
		}, true);
		
	}
	
	$('td.currItem').addClass('item');
	$('td.currItem').removeClass('currItem');
	
	$(self).removeClass('item');
	$(self).addClass('currItem');
	
}




//生成玩法菜单
function createPlayItem(){
	////console.log(itemObject);
	playItemList = Array();
	for( id in itemObject ){
		var gameLx = itemObject[id]['gameLx'];
		var hotFlagIMG = ( parseInt(itemObject[id]['hotFlag']) > 0 )?(itemObject[id]['hotFlag']):('');
		var gamelxID = itemObject[id]['gameLx'] +''+ hotFlagIMG;
		UI['game_lx_'+gameLx] = itemObject[id]['name'];
		playItemList.push( '<div class="itemTitle" id="menugameLxTitle'+ gamelxID +'" onclick="slideToggleItemMenu('+ gamelxID +')">' );
		playItemList.push( '<span id="isLiveBox'+ gamelxID +'" style="float:right;margin-top:10px;margin-right:5px"></span>' );
		playItemList.push( '<img class="liveImg" src="./images/style1/icon-sport-'+ gamelxID +'.png">' );
		playItemList.push( '<span>'+ itemObject[id]['name']  +' </span>' );
		playItemList.push( '<span id="zongNumBox'+ gamelxID +'">'+ itemObject[id][0] +'</span>' );
		playItemList.push( '</div>' );
		playItemList.push( '<ul id="menugameLxUl'+ gamelxID +'">' );
		playItemList.push( '<li id="menugameLxLi'+ gamelxID +'_1" onclick="selectLi('+ gameLx +', 1,\''+ hotFlagIMG +'\')">'+ UI.GunQiu +' <div class="eventNum" id="ZdNumBox'+ gamelxID +'">'+ itemObject[id][1] +'</div></li>' );
		playItemList.push( '<li id="menugameLxLi'+ gamelxID +'_2" onclick="selectLi('+ gameLx +', 2,\''+ hotFlagIMG +'\')">'+ UI.JinRi +' <div class="eventNum" id="JrNumBox'+ gamelxID +'">'+ itemObject[id][2] +'</div></li>' );
		playItemList.push( '<li id="menugameLxLi'+ gamelxID +'_3" onclick="selectLi('+ gameLx +', 3,\''+ hotFlagIMG +'\')">'+ UI.ZaoCan +' <div class="eventNum" id="ZcNumBox'+ gamelxID +'">'+ itemObject[id][3] +'</div></li>' );
		playItemList.push( '<li id="menugameLxLi'+ gamelxID +'_4" onclick="selectLi('+ gameLx +', 4,\''+ hotFlagIMG +'\')">'+ UI.GuoGuan +' <div class="eventNum" id="GgNumBox'+ gamelxID +'">'+ itemObject[id][4] +'</div></li>' );
		playItemList.push( '<li id="menugameLxLi'+ gamelxID +'_5" onclick="selectLi('+ gameLx +', 5,\''+ hotFlagIMG +'\')">'+ UI.GuanJun +' <div class="eventNum" id="GjNumBox'+ gamelxID +'">'+ itemObject[id][5] +'</div></li>' );
		playItemList.push( '</ul>' );	
	}
	
	$( '#itemBox' ).html( playItemList.join('') );
		
}


//静态改变玩法状态及更新数字
function updatePlayItemStatus(){
		
	for( id in itemObject ){
		
		if( liID == 0 ){
			for( var i=1; i<6; i++ ){
				if( itemObject[id][i] > 0 ){
					liID = i;
					gameLx = itemObject[id]['gameLx'];
					hotFlag = itemObject[id]['hotFlag']
					selectLi( gameLx, liID, hotFlag );
					break;
				}
			}
		}
		
		//走地图片
		if( itemObject[id][1] == 0 ){
			$( '#isLiveBox'+id ).html( '' );
		}else{
			$( '#isLiveBox'+id ).html( '<img src="./images/style1/live01.png">' );
		}
		
		$( '#zongNumBox'+id ).html( itemObject[id][0] );
		$( '#ZdNumBox'+id ).html( itemObject[id][1] );
		$( '#JrNumBox'+id ).html( itemObject[id][2] );
		$( '#ZcNumBox'+id ).html( itemObject[id][3] );
		$( '#GgNumBox'+id ).html( itemObject[id][4] );
		$( '#GjNumBox'+id ).html( itemObject[id][5] );
		
	}
		
}


//中部赛事数据动作///////////////////////////////////////////////////////////////////////////////////////////////////////////
//每秒事件
function actionEventData(){	

	if( !$b('gameDataTable') ) return;
		
	if( GetEventDataTime > 0 ){
	
		GetEventDataTime--;
		
		//改变按钮刷新状态
		changeTimeStatus();
		
	}else if( GetEventDataTime == 0 ){//装载数据
		GetEventDataTime--;
		refreshData();
	}else{
		//指令执行中
	}
}	


//@刷新数据 
function refreshData(){
	
	//初始化 变量
	currRowBg = '#D6A063'
	currLnum = '';
	GetEventDataTime = -1;
	isMore = 0
	getData	= new Object();
	if( playItem != 8 ) WinShowGid = '';
		
	//初始化loading状态
	//$b('loading').innerHTML = '<div align="center" whitd="100%"><p><img src="../images/loading01.gif" /></p><p style="color:#CFCFCF; font-size:14">&nbsp;</p></div>';
	//$b('loading').style.display = 'block';
	
	//调用数据接口
	switch( playItem ){
            case 1: getDqDataOu(); break;
            case 7: getDqDataGG(); break;
            case 8: getDqDataWin();break;
	}
	
	switch( timeLx ){
            case 1:	GetEventDataTime 	= 300; retime = 300; break;
            case 2:	GetEventDataTime 	= 180; retime = 180; break;
            case 3:	GetEventDataTime 	= 60;  retime = 60; break;
            default: GetEventDataTime 	= 600; retime = 600; break;
	}
}


//倒计时为0时 刷新
function changeTimeStatus(){
	if( $b('shuaXin') ){
		if( retime - GetEventDataTime < 5 ){
			$b('shuaXin').disabled = true;
		}else{
			$b('shuaXin').disabled = false;
		}
		$b('shuaXin').value = UI.ShuaXin + GetEventDataTime ;//+' '+ ;
	}
}




//数据接口///////////////////////////////////////////////////////////////////////////////////////////////////////
//单式数据接口
function getDqDataOu(){	
	post = {
            'actionStr': 'ou',
            'uid': uid,
            'lang': lang,
            'msTime': getCookie( 'msTime' ),
            'pan_type': pan_type,
            'gameLx': 		gameLx,
            'hotFlag':		hotFlag,
            'timeLx': 		timeLx,
            'orderBy': 		orderBy, 
            'currPage': 	currPage,
            'pageSize': 	pageSize,
            'showLnum': 	showLnum
	};
	
	gameDataClient.getGameDataInterface( post, function (result, args, output, warning) {

                console.log(post);
                console.log($.parseJSON(result));
		if(output) $('#jsonBox').html('<textarea>'+output+'</textarea>');
		eval( 'getData = '+ result );
		if( getData.QequestFlag < 0 ) return;
		showGameData();

	}, true);
}


//过关数据接口
function getDqDataGG(){	
	post = {
	'actionStr': 'gg',
	'uid':uid, 'lang': lang,
	'timeLx': 		0,
	'gameLx': 		gameLx,
	'hotFlag':		hotFlag,
	'gameTime': 	currGameTime,
	'orderBy': 		orderBy, 
	'currPage': 	currPage, 
	'pageSize': 	pageSize,
	'showLnum': 	showLnum
	}
	
	gameDataClient.getGameDataInterface( post, function (result, args, output, warning ) {	
			
            //console.log(post)
            //console.log($.parseJSON(result))
			if( output ) alert(output); 
			eval( 'getData = '+ result );
			showGameData();
	}, true);
}


//冠军数据接口
function getDqDataWin(){	
	post = {
	'actionStr': 'win',
	'timeLx': 		0,
	'uid':uid, 'lang': lang,
	'gameLx': gameLx,
	'hotFlag':		hotFlag,
	'WinShowGid': WinShowGid
	}
	
	gameDataClient.getGameDataInterface( post, function (result, args, output, warning) {
			
            //console.log(post)
            //console.log($.parseJSON(result))
			if( output ) alert( output );
			//$b('jsonBox').innerHTML = '<textarea>'+result+'</textarea>';
			eval( 'getData = '+ result );
			showGameData();
	}, true);
}


//更多玩法数据接口
function getDqDataMore( gameUnique, self ){
	
	//获得对象的绝对位置
	isMore = 1;
	var posy = self.offsetTop; 
	var posx = self.offsetLeft;
    while( self = self.offsetParent ) { 
       posy += self.offsetTop; 
	   posx += self.offsetLeft; 
    }
	var more = $b('moreBox');
	if(isIE) more.style.left = posx-586+'px';
	more.style.top =  posy+29+'px';
	
	
	$('#moreBox').slideDown("fast");
	
	post = {
	'actionStr': 'more',
	'uid':uid, 'lang': lang,
	'pan_type': pan_type,
	'gameUnique': gameUnique,
	'timeLx': 		0,
	'gameLx': 		gameLx,
	'gameTime': 	currGameTime,
	'orderBy': 		orderBy,
	'currPage': 	currPage, 
	'pageSize': 	pageSize,
	'showLnum': 	showLnum
	}
	
	gameDataClient.getGameDataInterface( post, function (result, args, output, warning) {	
		
            //console.log(post)
            //console.log($.parseJSON(result))
		if(output) alert(output);
		//$b('jsonBox').innerHTML = '<textarea>'+result+'</textarea>';
		showGameDataMore( eval( 'GD = '+ result ) );
	}, true);
}


//生成赛事表
function showGameData(){
	
	if( !getData ) return;
	
	gametable = $b('gameDataTable');
	
	//清空內容
	if( WinShowGid == ''  ) gametable.innerHTML = '';
	

	//生成赛事准备工作
	
	//生成联赛列表
	createLeagueList();
	
	//生成页码
	createPageList();
	
	//生成日期列表
	createDateList();
	
	//生成排序
	createSetingMenu();
	
	//创建表头
	createTableTitle();
	
	//无赛事数据
	if( parseInt(getData.rowNum) == 0 ){
		noEventData();
		return;
	}
	
	for( id in getData.gameData ){
		switch ( playItem ){
		case 1:
			createOuEvent( getData.gameData[id] );
		break;
		case 7:
			createGgEvent( getData.gameData[id] );
		break;
		case 8:
			createWinEvent( getData.gameData[id] );
		break;
		}
	}
	
	//$b('loading').style.display = 'none';
}


//显示盘口
function showPK( GD, playLx, halfLx, i ){
	switch( playLx ){
	case 1: pkStr='Dy'+ halfLx; break;
	case 2: pkStr='Rq'+ halfLx; break;
	case 3: pkStr='Dx'+ halfLx; break;
	case 4: pkStr='Ds'+ halfLx; break;
	}

	if( !eval( 'GD.'+ pkStr + i ) ){//盘口不存在
			showEmptyPk( playLx, halfLx, colNum = 1 );	
	}else{
		if( eval( 'GD.'+ pkStr + i +'[1]' ) != 0 ){
			if( playLx == 2 || playLx == 3 ){
				showPkRqDx( GD, i, halfLx, playLx );
			}else{
				showPkDyDs( GD, i, halfLx, playLx );
			}
		}else{
			showEmptyPk( playLx, halfLx, colNum = 1 );	
		}
	}
}


//@生成一个gameUnique
function createOuEvent( GD ){
	
	//新联赛
	showLname( GD );
	var maxHalfLx = ( gameLx == 1 )?(1):(7);
	for( halfLx=0; halfLx<maxHalfLx; halfLx++ ){
		
		//最多5个盘口
		for( var i=0; i<5; i++ ){
			
			if( eval( 'typeof( GD.Dy'+ halfLx + i +')' ) == 'undefined' && eval( 'typeof( GD.Rq'+ halfLx + i +')' ) == 'undefined' && eval( 'typeof( GD.Dx'+ halfLx + i +')' ) == 'undefined' && eval( 'typeof( GD.Ds'+ halfLx + i +')' ) == 'undefined' ) continue;
				
			//创建行
			currRow = currTable.insertRow(-1); 
			if( currClassName == 'Tdbg11' ){ currClassName ='Tdbg12'; }else{ currClassName = 'Tdbg11';}
			currRow.className = currClassName;
			
			currTd = currRow.insertCell(-1);
			showBfTime( GD ); //生成时间格
			
			currTd = currRow.insertCell(-1);
			currTd.vAlign = 'top';
			showGname( GD, halfLx, i ); //生成主客队名称
			

			//独赢
			if( gameLx != 1 || timeLx == 3 ){
				currTd = currRow.insertCell(-1);
				currTd.width = pkWidth.dy;
				currTd.align = 'center';
				currTd.vAlign = "top"
				currTdStr = new Array();
				showPK( GD, 1, halfLx, i );
				currTd.innerHTML = currTdStr.join('');
			}


			//让球
			currTd = currRow.insertCell(-1);
			currTd.width = pkWidth.rq;
			currTdStr = new Array();
			currTd.align	= 'center';
			currTd.vAlign = 'top';
			showPK( GD, 2, halfLx, i );
			currTd.innerHTML = currTdStr.join('');
			
			//大小
			currTd = currRow.insertCell(-1);
			currTd.width = pkWidth.dx ;
			currTdStr = new Array();
			currTd.align	= 'center';
			currTd.vAlign = 'top';
			showPK( GD, 3, halfLx, i );
			currTd.innerHTML = currTdStr.join('');
			
			
			if( gameLx == 1 ){
				
				//足球只需执行到上半场
				
				//独赢 上半
				if( timeLx == 3 ){
					currTd = currRow.insertCell(-1);
					currTd.width = pkWidth.dy;
					currTd.align = 'center';
					currTd.vAlign = "top";
					if( currRowBg == 1 ){ currTd.className = 'Tdbg14'; }else{ currTd.className = 'Tdbg13'; }
					currTdStr = new Array();
					showPK( GD, 1, 1, i );
					currTd.innerHTML = currTdStr.join('');
				}
				
				//让球 上半
				currTd = currRow.insertCell(-1);
				currTd.vAlign = "top";
				currTd.align	= 'center';
				currTd.width = pkWidth.rq ;
				if( currRowBg == 1 ){ currTd.className = 'Tdbg14'; }else{ currTd.className = 'Tdbg13'; }
				currTdStr = new Array();
				showPK( GD, 2, 1, i );
				currTd.innerHTML = currTdStr.join('');
				
				//大小 上半
				currTd = currRow.insertCell(-1);
				
				currTd.vAlign = "top";
				currTd.align	= 'center';
				currTd.width = pkWidth.dx ;
				if( currRowBg == 1 ){ currTd.className = 'Tdbg14'; }else{ currTd.className = 'Tdbg13'; }
				currTdStr = new Array();
				showPK( GD, 3, 1, i );
				currTd.innerHTML = currTdStr.join('');
								
			}
			
			//单双
			if( gameLx != 1 ){
				currTd = currRow.insertCell(-1);
				currTd.width = pkWidth.ds ;
				currTdStr = new Array();
				currTd.align	= 'center';
				currTd.vAlign = "top";
				showPK( GD, 4, halfLx, i );
				currTd.innerHTML = currTdStr.join('');
			}
			/**/
			
			//更多
			if( gameLx == 1 && timeLx != 3 ) showMore( GD, i );
		}
	}
}


//@生成一个过关赛事（game_unique）
function createGgEvent( GD ){
	//新联赛
	showLname( GD );
	var maxHalfLx = ( gameLx == 1 )?(1):(7);
	for( halfLx=0; halfLx<maxHalfLx; halfLx++ ){	
		
		//最多五个盘口
		for( i=0; i<5; i++ ){
		
			if( eval( 'typeof( GD.Dy'+ halfLx + i +')' ) == 'undefined' && eval( 'typeof( GD.Rq'+ halfLx + i +')' ) == 'undefined' && eval( 'typeof( GD.Dx'+ halfLx + i +')' ) == 'undefined' && eval( 'typeof( GD.Ds'+ halfLx + i +')' ) == 'undefined' ) continue;
							
			//创建行
			currRow = currTable.insertRow(-1); 
			if( currRowBg == '#EEEEEE' ){ currRowBg = '#FFFFFF'; }else{ currRowBg = '#EEEEEE';}
			currRow.style.backgroundColor = currRowBg;			
			currTd = currRow.insertCell(-1);
			showBfTime( GD ); //生成时间格 
			
			//生成主客队名称
			currTd = currRow.insertCell(-1);
			currTd.vAlign = 'top';
			showGname( GD, halfLx, i ); 
	
			//独赢
			currTd = currRow.insertCell(-1);
			currTd.width = pkWidth.dy ;
			currTd.align = 'center';
			currTd.vAlign = 'top';
			currTdStr = new Array();
			showPK( GD, 1, halfLx, i );
			currTd.innerHTML = currTdStr.join('');
	
			//让球
			currTd = currRow.insertCell(-1);
			currTd.width = pkWidth.rq ;
			currTdStr = new Array();
			currTd.align	= 'center';
			currTd.vAlign = 'top';
			showPK( GD, playLx=2, halfLx, i );
			currTd.innerHTML = currTdStr.join('');
			
			//大小
			currTd = currRow.insertCell(-1);
			currTd.width = pkWidth.dx ;
			currTdStr = new Array();
			currTd.align	= 'center';
			currTd.vAlign = 'top';
			showPK( GD, 3, halfLx, i );
			currTd.innerHTML = currTdStr.join('');
			
			//单双
			currTd = currRow.insertCell(-1);
			currTd.width = pkWidth.ds ;
			currTdStr = new Array();
			currTd.align	= 'center';
			currTd.vAlign = 'top';
			showPK( GD, 4, halfLx, i );
			currTd.innerHTML = currTdStr.join('');
		}
	
	}	
}


//@生成一个冠军赛事（杯赛）
function createWinEvent(GD){
		
	//创建表，一个联赛一个表
	var lxTable 		= document.createElement('table');
	lxTable.setAttribute("class", 'winLxTable' );
	lxTable.cellSpacing = 0;
		
	//创建联赛行
	var tr = lxTable.insertRow(-1); 
	var td = tr.insertCell(-1);
	td.setAttribute("class", 'lxBox' );
	td.setAttribute("onclick", 'openWinData("'+ 'lxID'+ GD.lxID +'")' );
	td.innerHTML = '<span class="lxStr">'+ GD.lx +'</span><span class="gameTimeStr">'+ GD.gameTime +'</span>';
	
	//创建内容行
	var tr = lxTable.insertRow(-1); 
	var subBoxTd = tr.insertCell(-1);
	subBoxTd.setAttribute("class", 'lxSubBox' );
	subBoxTd.id = 'lxID'+ GD.lxID
		
	//遍历子联赛
	for( subID in GD['sub'] ){
		var subData = GD['sub'][subID];
		var subTable = document.createElement('table');
		subTable.setAttribute("class", 'winSubTable' );
		subTable.cellSpacing = 0;
				
		//子联赛名
		var tr = subTable.insertRow(-1); 
		var td = tr.insertCell(-1);
		td.setAttribute("class", 'lxSubRow' );
		td.colSpan = 4;
		td.innerHTML = subData['lx_sub'];
		
		//遍历队名
		var TdN0 = 0;
		for( teamID in subData['team'] ){
			TdN0++;
			if( TdN0 == 1  ){	
				var tr = subTable.insertRow(-1);
			}else if(TdN0 == 2 ){
				TdN0=0;
			}
			var teamData = subData['team'][teamID];
			var td = tr.insertCell(-1);
			td.setAttribute("class", 'gname' );
			td.innerHTML = teamData['gname'];
			var td = tr.insertCell(-1);
			td.setAttribute("class", 'pl' );
			td.innerHTML = getAction( GD.timeLx, GD.gameUnique, playLx=10, playObj = teamData.id, '0', '', teamData.pl  ) + teamData.pl +'</a>';
		}
		if( TdN0 == 1 ) cteateCol( tr, colSpan=2, 'winGname', Array( '' ) );
		subBoxTd.appendChild(subTable);		
	}
	gametable.appendChild(lxTable);

}

//@生成联赛
function showLname( GD ){ 

	if( currLnum == GD.lnum && playItem != 8 ) return;
	currLnum = GD.lnum;
	
	currRow = document.createElement('div');
	currRow.setAttribute("class", 'lxBox' );
	
	if( playItem != 1 ){
		gname = GD.Lname;
	}else{
		gname = getData.league[GD.lnum]['txt'];
	}
	
	currRow.innerHTML = '<span><img src="./style/images/button_10.gif" onclick="refreshData()"/></span>'+ gname +'';
	gametable.appendChild(currRow); 
	
	//创建表，一个联赛一个表
	currTable 				= document.createElement('table');
	currTable.id 			= 'eventRow'+GD.gid;
	currTable.width			= '100%';
	currTable.border = 0;
	currTable.cellSpacing  	= 1;
	currTable.bgcolor = '#EFEFEF';
	gametable.appendChild(currTable); 
}


//@比分 时间 信息
function showBfTime( GD ){
	currTd.width	= pkWidth.bfTime ;
	currTd.align	= 'center';
	string 	= '';

	switch( parseInt(GD.timeLx) ){
	case 1: 
		string = '<p>'+ GD.gameTime + '</p><p>'+ GD.time + '</p>'; 
	break;
	case 2: 
		if( playItem == 1 ){
			string = '<p><span class="time">'+ GD.time +'</span></p>';
			if( GD.zdFlag == 1 ){
				string += '<p><img src="images/style1/live01.png"/></p>';
			}
		}else if(  playItem == 7 ){
			string = '<p><span class="time">'+ GD.gameTime +'</span></p>';	
			string += '<p><span class="time">'+ GD.time +'</span></p>';	
		}
	break;
	case 3: 
		if( gameLx == 1 ) string += '<p>'+ GD.time + '</p>';
		string += '<p>';
		if( gameLx == 1 || gameLx == 5){
			if( parseInt(GD.bf1) > 0 ){
				string += '<span class="bifenBox">'+ GD.bf1 +'</span>';
			}else{
				string += GD.bf1;
			}
			string += ' : '; 
			if( parseInt(GD.bf2) > 0 ){
				string += '<span class="bifenBox">'+ GD.bf2 +'</span>';
			}else{
				string += GD.bf2;
			}
		}else{
			string += '<p><img src="images/style1/live01.png"/></p>';
		}
		string += '</p>'; 
	break;
	default : 
		string = '<p>'+ GD.gameTime +'</p><p>'+ GD.time +'</p>'; 
	break;	
	}
	
	currTd.innerHTML = string;
}


//@生成 队名
function showGname( GD, halfLx, i ){
	
	currTd.width = pkWidth.gameName ;
	
	//半场名称
	halfStr = getHalfName( gameLx, halfLx );
		
	//主场、中场
	var HomeCentreStr = '';
	if( GD.place != 1 ) HomeCentreStr = '<span class="banChang">['+ UI.Zhong +']</span>';

	
	//主队
	//pkNum = parseFloat(eval( 'GD.Rq'+ halfLx + '0[3]' ));
	if( GD.strongFlag == 1 ){
		Gname1 = '<p><span style="color:#6C3600">'+ GD.gname1 +'</span>';
	}else{
		Gname1 = '<p>'+ GD.gname1;
	}

	//主队后缀
	Gname1 += HomeCentreStr;
	if( timeLx == 3 && GD.red1 > 0 ) Gname1 += '<img src="../images/style1/red'+ GD.red1 +'.gif" align="absmiddle"/>';
	if( !( gameLx == 1 && playItem == 1 ) ) Gname1 += halfStr;
	Gname1 += '</p>';
	
	//客队
	if( GD.strongFlag == -1 ){
		Gname2 = '<p><span style="color:#6C3600">'+ GD.gname2 +'</span>';
	}else{
		Gname2 = '<p>'+ GD.gname2;
	}

	//客队后缀
	if( timeLx == 3 && GD.red2 > 0 ) Gname2 += '<img src="../images/style1/red'+ GD.red2 +'.gif" align="absmiddle"/>';
	Gname2 += '</p>';
	
	//
	if( gameLx == 1 && ( timeLx == 3 || playItem == 7 )){
		heJu = '<p>' + UI.HeJu +'</p>';
	}else{
		heJu = '';
	}
	
	currTd.innerHTML = '<div class="duiMingBox">'+ Gname1 +  Gname2 + heJu +'</div>';
}

//显示 让球大小盘口
function showPkRqDx( GD, i, halfLx, playLx ){	
	if( playLx == 2 ){
		obj = 'Rq'+ halfLx + i;
	}else{
		obj = 'Dx'+ halfLx + i;
	}

	pl1 = eval( 'GD.'+ obj +'[1]' );
	pl2 = eval( 'GD.'+ obj +'[2]' );
	pkNum = eval( 'GD.'+ obj +'[3]' );
	isUpdate = eval( 'GD.'+ obj +'[4]' );
	pl = adjustpl( pl1, pl2, 3 );
	
	if( pkNum == 0 ){
		pkNumStr = '0';
	}else{
		pkNumStr = Math.abs( pkNum );
	}
	
	if( pkNum >= 0 ){
		
		currTdStr.push( '<div class="rangQiuDaXiao">' );
		currTdStr.push( '<p><span class="pankou">'+ pkNumStr +'</span>' );
		currTdStr.push( getAction( timeLx, GD.gameUnique, playLx, 1, halfLx, pkNum, pl[1] ) );
		if( isUpdate == 0 && playItem != 7 ){
			currTdStr.push( '<span class="peilvchange">'+ pl[1] +'</span>' );
		}else{
			currTdStr.push( '<span class="peilv">'+ pl[1] +'</span>' );
		}
		currTdStr.push( '</a></p>' );
		
		currTdStr.push( '<p>' );
		currTdStr.push( getAction( timeLx,  GD.gameUnique, playLx, 2, halfLx, pkNum, pl[2] ) );
		if( isUpdate == 0 && playItem != 7 ){
			currTdStr.push( '<span class="peilvchange">'+ pl[2] +'</span>' );
		}else{
			currTdStr.push( '<span class="peilv">'+ pl[2] +'</span>' );
		}
		currTdStr.push( '</a></p>' );
		currTdStr.push( '</div>' );
	
	}else{
		
		currTdStr.push( '<div class="rangQiuDaXiao">' );
		currTdStr.push( '<p>' );
		currTdStr.push( getAction( timeLx,  GD.gameUnique, playLx, 1, halfLx, pkNum, pl[1] ) );
		if( isUpdate == 0 && playItem != 7 ){
			currTdStr.push( '<span class="peilvchange">'+ pl[1] +'</span>' );
		}else{
			currTdStr.push( '<span class="peilv">'+ pl[1] +'</span>' );
		}
		currTdStr.push( '</a></p>' );
		
		currTdStr.push( '<p><span class="pankou">'+ pkNumStr +'</span>' );
		
		currTdStr.push( getAction( timeLx,  GD.gameUnique, playLx, 2, halfLx, pkNum, pl[2] ) );
		if( isUpdate == 0 && playItem != 7 ){
			currTdStr.push( '<span class="peilvchange">'+ pl[2] +'</span>' );
		}else{
			currTdStr.push( '<span class="peilv">'+ pl[2] +'</span>' );
		}
		currTdStr.push( '</a></p>' );
		currTdStr.push( '</div>' );
		
	}
}


//@显示 独赢单双盘口
function showPkDyDs( GD, i, halfLx, playLx ){
	if( playLx == 1 ){//独赢
		obj = 'Dy' + halfLx + i;
		pl1 = eval( 'GD.'+ obj +'[1]' );
		pl2 = eval( 'GD.'+ obj +'[2]' );
		pl3 = eval( 'GD.'+ obj +'[3]' );
		isUpdate = eval( 'GD.'+ obj +'[4]' );
		if( playItem == 1 && ( gameLx == 1 || gameLx == 26 ) ) currTdStr.push( '<div class="zuqiuduyin">' );
	}else{//单双
		obj = 'Ds' + halfLx + i;
		pl1 = eval( 'GD.'+ obj +'[1]' );
		pl2 = eval( 'GD.'+ obj +'[2]' );
		isUpdate = eval( 'GD.'+ obj +'[3]' );
		if( playItem == 1 && ( gameLx == 1 || gameLx == 26 ) ) currTdStr.push( '<div class="danshuang">' );
	}
	
	currTdStr.push( '<p>' );
	currTdStr.push( getAction( timeLx,  GD.gameUnique, playLx, 1, halfLx, '', pl1 ) );
	if( isUpdate == 0 && playItem != 7 ){
		currTdStr.push( '<span class="peilvchange">'+ pl1 +'</span>' );
	}else{
		currTdStr.push( pl1 );
	}
	currTdStr.push( '</a>' );
	currTdStr.push( '</p>' );
	
	currTdStr.push( '<p>' );
	currTdStr.push( getAction( timeLx,  GD.gameUnique, playLx, 2, halfLx, '', pl2 ) );
	if( isUpdate == 0 && playItem != 7 ){
		currTdStr.push( '<span class="peilvchange">'+ pl2 +'</span>' );
	}else{
		currTdStr.push( pl2 );
	}
	currTdStr.push( '</a>' );
	currTdStr.push( '</p>' );
	
	if( ( gameLx == 1 || gameLx == 26 ) ){
		if( playLx == 1 ){
			currTdStr.push( '<p>' );
			currTdStr.push( getAction( timeLx,  GD.gameUnique, playLx, 3, halfLx, '', pl3 ) );
			if( isUpdate == 0 && playItem != 7 ){
				currTdStr.push( '<span class="peilvchange">'+ pl3 +'</span>' );
			}else{
				currTdStr.push( pl3 );
			}
			currTdStr.push( '</a></p>' );
		}else{
			//currTdStr.push( '<br> ' );	
		}
	}
	currTdStr.push( '</div>' );
}


//@空盘口
function showEmptyPk( playLx, halfLx, colNum ){
	switch( playLx ){
	case 1: currTdStr.push( '<div class="zuqiuduyin"> </div>' );	break;
	case 2: currTdStr.push( '<div class="zuqiurangQiu"> </div>' );	break;
	case 3: currTdStr.push( '<div class="zuqiurangQiu"> </div>' );	break;
	case 4: currTdStr.push( '<div class="danshuang"> </div>' );	break;		
	}
}


//显示更多按钮
function showMore( GD, i ){
	if( gameLx != 1 && gameLx != 26  ) return;
	
	currTd = currRow.insertCell(-1);
	currTdStr = new Array();
	currTd.align = 'center';
	currTd.width = pkWidth.more ;
	if( i == 0 && GD.morePlayNum > 0 && timeLx != 3 ){	
		currTd.innerHTML = '<p><img class="moreBt" onclick="getDqDataMore( '+ GD.gameUnique +', this )" src="../images/style1/more_'+ GD.morePlayNum +'.gif" align="absmiddle" ></p>';
	}else{
		currTd.innerHTML = ' ';
	}
}


//*让球 大小 单双调水*
function adjustpl( pl1, pl2, playLx ){
	var pl = Array();
	pl[1] = parseFloat( pl1 ).toFixed(3);
	pl[2] = parseFloat( pl2 ).toFixed(3);
	return pl;
}



//@转换pk_num
function convpkNum(pk_num){
	var pk_num = Math.abs(pk_num);
	if( (pk_num/0.25)%2 )
	{
		pk_num = (pk_num-0.25) +'/'+ (pk_num+0.25);
		return pk_num;
	}else{
		return pk_num;
	}
}


//显示盘口格式
function shwoPkNum( playObj, pkNum ){	
	if( pkNum >= 0 && playObj == 'rqpl1' ){
		return ' ('+ UI.Rang +'<b>'+ pkNum +'</b>) '; 
	}else if( pkNum >= 0 && playObj == 'rqpl2' ){
		return ' ('+ UI.ShouRang +'<b>'+ pkNum +'</b>) ';
	}else if( pkNum < 0 && playObj == 'rqpl1' ){
		return ' ('+ UI.ShouRang +'<b>'+(-1*pkNum) +'</b>) '; 
	}else if( pkNum < 0 && playObj == 'rqpl2' ){
		return ' ('+ UI.Rang +'<b>'+ (-1*pkNum) +'</b>) ';
	}
}


//更多玩法
function showGameDataMore( GD ){
	
	//创建表格
	var moreBox = $('#moreBox')[0];
	moreBox.innerHTML = '';
		
	//创建头
	var moreTable = document.createElement('table');
	moreTable.setAttribute("class", 'moreTableTitle' );
	moreTable.cellSpacing = 0;
	var tr = moreTable.insertRow(-1);
	var td = tr.insertCell(-1);
	td.setAttribute("class", 'td1' );
	var td = tr.insertCell(-1);
	td.setAttribute("class", 'td2' );
	td.innerHTML = UI.GengDuoWanFa;
	var td = tr.insertCell(-1);
	td.setAttribute("class", 'td3' );
	td.setAttribute("onclick", 'closeDiv()' ); 
	var td = tr.insertCell(-1);
	td.setAttribute("class", 'td4' );
	var tr = moreTable.insertRow(-1);
	var moreTD = tr.insertCell(-1);
	moreTD.setAttribute("class", 'td5' );
	moreTD.setAttribute("colspan",4);
	
	//独赢
	moreTD.appendChild( createMoreDy( GD ) );
	
	//入球数
	moreTD.appendChild( createMoreRqs( GD ) );
	
	//半全场
	moreTD.appendChild( createMoreBqc( GD ) );
	
	//波胆
	moreTD.appendChild( createMoreBd( GD ) );
	
	//特别投注
	moreTD.appendChild( createMoreTeBie( GD ) );
	
	moreBox.appendChild(moreTable);
	
}


function createMoreDy( GD ){
	
	if( typeof( GD['odds'][1] ) == 'undefined' ) return document.createElement('span');

	tdData=Array('&nbsp;','&nbsp;','&nbsp;','&nbsp;','&nbsp;','&nbsp;');
	for( hl in GD['odds'][1] ){
		if( parseInt(hl) == 0  ){
			tdData[0] = getAction( GD['info']['timeLx'],  GD['info']['gameUnique'], playLx=1, playObj=1, 0, '', GD['odds'][1][hl][0][1] ) +  GD['odds'][1][hl][0][1] +'</a>';
			tdData[1] = getAction( GD['info']['timeLx'],  GD['info']['gameUnique'], playLx=1, playObj=3, 0, '', GD['odds'][1][hl][0][3] ) +  GD['odds'][1][hl][0][3] +'</a>';
			tdData[2] = getAction( GD['info']['timeLx'],  GD['info']['gameUnique'], playLx=1, playObj=2, 0, '', GD['odds'][1][hl][0][2] ) +  GD['odds'][1][hl][0][2] +'</a>';
		}else if( parseInt(hl) == 1 ){
			tdData[3] = getAction( GD['info']['timeLx'],  GD['info']['gameUnique'], playLx=1, playObj=1, 1, '', GD['odds'][1][hl][0][1] ) +  GD['odds'][1][hl][0][1] +'</a>';
			tdData[4] = getAction( GD['info']['timeLx'],  GD['info']['gameUnique'], playLx=1, playObj=3, 1, '', GD['odds'][1][hl][0][3] ) +  GD['odds'][1][hl][0][3] +'</a>';
			tdData[5] = getAction( GD['info']['timeLx'],  GD['info']['gameUnique'], playLx=1, playObj=2, 1, '', GD['odds'][1][hl][0][2] ) +  GD['odds'][1][hl][0][2] +'</a>';
		}
	}
	console.log(tdData[0],tdData[1],tdData[2],tdData[3],tdData[4],tdData[5]);
	//创建独赢表	
	var table = document.createElement('table');
	table.setAttribute("class", 'moreTable' );
	table.cellSpacing = 0;

	//独赢标题
	var tr = table.insertRow(-1);
	cteateCol( tr, colSpan=6, 'titletd1', Array(UI.DuYing) );
	var tr = table.insertRow(-1);
	cteateCol( tr, colSpan=0, 'titletd2', tdArr=Array(UI.ZhuYing, UI.HeJu, UI.KeYing, UI.ShangBanChang + UI.ZhuYing, UI.ShangBanChang + UI.HeJu, UI.ShangBanChang + UI.KeYing  ) );
	
	//独赢盘口行
	var tr = table.insertRow(-1);
	cteateCol( tr, '', colSpan=0, tdData );
	return table;
	
}
	
function createMoreRqs( GD ){	
	
	if( typeof( GD['odds'][5] ) == 'undefined' ) return document.createElement('span');
	var table = document.createElement('table');
	table.setAttribute("class", 'moreTable' );
	table.cellSpacing = 0;
	
	//单双入球数标题
	var tr = table.insertRow(-1);
	cteateCol( tr, colSpan=6, 'titletd1', tdArr=Array( UI.DanShuang +' / '+  UI.RuQiuShu ) ,'titletd1' );
	
	//单双入球数副标题
	var tr = table.insertRow(-1);
	cteateCol( tr, colSpan=0, 'titletd2', tdArr=Array(UI.Dan, UI.Shuang, '0 ~ 1', '2 ~ 3', '4 ~ 6', 'UP7' ) ,'titletd2' );
	
	//单双入球数盘口行
	var tr = table.insertRow(-1);
	
	//单双
	var tdArr=Array('&nbsp;','&nbsp;');
	if( GD['odds'][5][1] != 0 ){
		tdArr=Array(
		getAction( GD['info']['timeLx'],  GD['info']['gameUnique'], playLx=4, playObj=1, 0, '', GD['odds'][5][1] ) + GD['odds'][5][1] +'</a>',
		getAction( GD['info']['timeLx'],  GD['info']['gameUnique'], playLx=4, playObj=2, 0, '', GD['odds'][5][2] ) + GD['odds'][5][2] +'</a>');
	}
	cteateCol( tr, colSpan=0, '', tdArr );
	
	tdArr=Array('&nbsp;','&nbsp;','&nbsp;','&nbsp;');
	if( GD['odds'][5][3]>0 ){
		tdArr=Array(
		getAction( GD['info']['timeLx'],  GD['info']['gameUnique'], playLx=5, playObj='pl_0_1', 0, '', GD['odds'][5][3] ) + GD['odds'][5][3] +'</a>',
		getAction( GD['info']['timeLx'],  GD['info']['gameUnique'], playLx=5, playObj='pl_2_3', 0, '', GD['odds'][5][4] ) + GD['odds'][5][4] +'</a>',
		getAction( GD['info']['timeLx'],  GD['info']['gameUnique'], playLx=5, playObj='pl_4_6', 0, '', GD['odds'][5][5] ) + GD['odds'][5][5] +'</a>',
		getAction( GD['info']['timeLx'],  GD['info']['gameUnique'], playLx=5, playObj='pl_7up', 0, '', GD['odds'][5][6] ) + GD['odds'][5][6] +'</a>');
	}
	cteateCol( tr, colSpan=0, '', tdArr );
	return table;

}

//半全场
function createMoreBqc( GD ){
	
	if( typeof( GD['odds'][7] ) == 'undefined' ) return document.createElement('span');
	
	var table = document.createElement('table');
	table.setAttribute("class", 'moreTable' );
	table.cellSpacing = 0;
	
	//半全场标题
	var tr = table.insertRow(-1);
	tr.setAttribute("class", 'tableTitle' );
	cteateCol( tr, colSpan=9, 'titletd1', Array(UI.BanQuanChang) );
	
	//半全场副标题
	var tr = table.insertRow(-1);
	cteateCol( tr, colSpan=0, 'titletd2', Array(UI.Zhu +'/'+ UI.Zhu, UI.Zhu +'/'+ UI.He, UI.Zhu +'/'+ UI.Ke, UI.He +'/'+ UI.Zhu, UI.He +'/'+ UI.He, UI.He +'/'+ UI.Ke, UI.Ke +'/'+ UI.Zhu, UI.Ke +'/'+ UI.He, UI.Ke +'/'+ UI.Ke  ) );
	
	//半全场盘口
	var tr = table.insertRow(-1);
	tdArr=Array();
	for( n=1; n<=9; n++ ) tdArr[n] = getAction( GD['info']['timeLx'],  GD['info']['gameUnique'], playLx=7, bqcObj[n], 0, '', GD['odds'][7][n] ) + GD['odds'][7][n] +'</a>';		
	cteateCol( tr, colSpan=0, '', tdArr );
	
	return table;	
}

//波胆
function createMoreBd( GD ){
	
	if( typeof( GD['odds'][6] ) == 'undefined' ) return document.createElement('span');
	
	var table = document.createElement('table');
	table.setAttribute("class", 'moreTable' );
	table.cellSpacing = 0;
	
	//波胆标题
	var tr = table.insertRow(-1);
	tr.setAttribute("class", 'tableTitle' );
	cteateCol( tr, colSpan=16, 'titletd1', tdArr=Array(UI.BoDan) );
	
	//波胆副标题
	var tr = table.insertRow(-1);
	cteateCol( tr, colSpan=0, 'titletd2', tdArr=Array('1:0', '2:0', '2:1', '3:0', '3:1', '3:2', '4:0', '4:1', '4:2', '4:3', '0:0', '1:1', '2:2', '3:3', '4:4', UI.QiTa ) );
	
	//波胆盘口
	var tr = table.insertRow(-1);	
	//第一行
	for( n=1; n<=16; n++ ){
		var td = tr.insertCell(-1);
		if( n > 10 ) td.rowSpan = "2";
		td.innerHTML = getAction( GD['info']['timeLx'],  GD['info']['gameUnique'], playLx=6, bdObj[n], 0, '', GD['odds'][6][n] ) + GD['odds'][6][n] +'</a>';
	}
		
	//第二行
	var tr = table.insertRow(-1);
	for( n=17; n<=26; n++ ){
		var td = tr.insertCell(-1);
		td.innerHTML = getAction( GD['info']['timeLx'], GD['info']['gameUnique'], playLx=6, bdObj[n], 0, '', GD['odds'][6][n] ) + GD['odds'][6][n] +'</a>';
	}
	
	return table;	

}

//特别投注
function createMoreTeBie( GD ){
	
	if( typeof( GD['odds'][10] ) == 'undefined' ) return document.createElement('span');
	var table = document.createElement('table');
	table.setAttribute("class", 'moreTable' );
	table.cellSpacing = 0;
	
	//标题
	var tr = table.insertRow(-1);
	tr.setAttribute("class", 'tableTitle' );
	cteateCol( tr, colSpan=4, 'titletd1', Array('冠軍-特別投注') );
	
	for( id in GD['odds'][10] ){
		lxSub = GD['odds'][10][id];
		var tr = table.insertRow(-1);
		cteateCol( tr, colSpan=4, 'winSubLx', Array( lxSub['lx_sub'] ) );
		
		var TdN0 = 0;
		for( it in lxSub['team'] ){
			TdN0++;
			if( TdN0 == 1  ){	
				var tr = table.insertRow(-1);
			}else if( TdN0 == 2 ){
				TdN0=0;
			}
			var teamData = lxSub['team'][it];
			cteateCol( tr, colSpan=0, 'winGname', Array( teamData['gname'] ) );
 			cteateCol( tr, colSpan=0, 'winPl',  Array( getAction( GD['info']['timeLx'], GD['info']['gameUnique'], playLx=10, playObj = teamData.id, '0', '', teamData.pl  ) + teamData.pl +'</a>') );
		}
		if( TdN0 == 1 ) cteateCol( tr, colSpan=2, 'winGname', Array( '' ) );
		
		
	}
	
	return table;	
}



//生成盘口类型 排序
function createSetingMenu(){
	
	if( playItem != 8  ){
				
		var orderByObject = createSelectObject129();
		console.log(orderByObj);
		orderByObject.createList( parentObjectName='orderByBox', ObjectName='orderBySelectList', selectBoxWidth = 60, orderByObj );	
		$("#orderByBox").show();
		
	}else{
		$("#orderByBox").hide();
	}
	
	if( playItem == 1 ){

		var panTypeObject = createSelectObject129();
		panTypeObject.createList( parentObjectName='panTypeBox', ObjectName='panTypeSelectList', selectBoxWidth = 60, panTypeObj );	
		$("#panTypeBox").show();
		
	}else{
		$("#panTypeBox").hide();
	}	
	
}

//生成联赛列表
function createLeagueList(){
	
	if( playItem != 1 || !getData.league ){
		$("#leagueListBox").hide();
		return;
	}
	
	var leagueObject = createSelectObject129();
	if( timeLx != 0 ){	
		
		getData.league[0] = {'value':'','txt':UI.QuanBuLianSai};
		if( showLnum == '' ){
			getData.league[0]['isCurr'] = 1;	
		}else{
			getData.league[0]['isCurr'] = 0;	
		}
	}
	leagueObject.createList( parentObjectName='leagueListBox', ObjectName='leagueSelectList', selectBoxWidth = 180, getData.league );	
	$("#leagueListBox").show();
	
}

//生成页码
function createPageList(){
	
	if( playItem != 1 || timeLx == 3 || !getData.pageNum ){
		$("#pageListBox").hide();
		return;
	}
	
	pageObj = {};
	for( var i=1; i<=getData.pageNum; i++ ){
		pageObj[i] = {'value':i, 'txt':i+'/'+getData.pageNum}
		if( currPage == i ) pageObj[i]['isCurr'] = 1;
	}

	var pageObject = createSelectObject129();
	pageObject.createList( parentObjectName='pageListBox', ObjectName='pageSelectList', selectBoxWidth = 60, pageObj );		
	$("#pageListBox").show();
}


//生成日期列表
function createDateList(){
	
	if( playItem != 7 || !getData.dateTimeList ){
		$("#dateListBox").hide();
		return;
	}
	for( id in getData.dateTimeList ){
		if( currGameTime == '') currGameTime = id;
	break;	
	}
	var dateListObject = createSelectObject129();
	dateListObject.createList( parentObjectName='dateListBox', ObjectName='dateSelectList', selectBoxWidth = 70, getData.dateTimeList );		
	$("#dateListBox").show();
}


//创建表头
function createTableTitle(){	
	
	
	titleTableStr = Array();
	titleTableStr.push( '<table id="dataTableTitle" border="0" cellspacing="0" cellpadding="0">' );
	titleTableStr.push( '<tr>' );
	
	//时间
	if( playItem != 8 ) titleTableStr.push( '<td width="'+ pkWidth.bfTime +'">' + UI.ShiJian + '</td>' );
	
	//队名
	titleTableStr.push( '<td align="left" width="'+ pkWidth.gameName +'"><div id="palyItemtitle">'+ eval( 'UI.game_lx_'+ gameLx  ) );
	
	if( !showLnum ){
		switch( liID ){
		case 1: titleTableStr.push( ' * '+ UI.GunQiu ); break;
		case 2: titleTableStr.push( ' * '+ UI.JinRi ); break;
		case 3: titleTableStr.push( ' * '+ UI.ZaoCan ); break;
		case 4: titleTableStr.push( ' * '+ UI.GuoGuan ); break;
		case 5: titleTableStr.push( ' * '+ UI.GuanJun ); break;
		}
	}else{
		
	}
	
	switch( playItem ){
	case 1: 
	
		titleTableStr.push( '</div></td>' );
		//独赢
		if( gameLx != 1 || timeLx == 3 ) titleTableStr.push( '<td width="'+ pkWidth.dy +'">' + UI.DuYing + '</td>' );
		//让球
		titleTableStr.push( '<td width="'+ pkWidth.rq +'">' + UI.RangQiu + '</td>' );
		//大小
		titleTableStr.push( '<td width="'+ pkWidth.dx +'">' + UI.DaXiao + '</td>' );
		//独赢 上半
		if( gameLx == 1 && timeLx == 3 ) titleTableStr.push( '<td width="'+ pkWidth.dy +'">' + UI.DuYing +'FH</td>' );
		//让球  上半
		if( gameLx == 1 ) titleTableStr.push( '<td width="'+ pkWidth.rq +'">' + UI.RangQiu +'FH</td>' );
		//大小  上半
		if( gameLx == 1 ) titleTableStr.push( '<td width="'+ pkWidth.dx +'">' + UI.DaXiao +'FH</td>' );
		//单双
		if( gameLx != 1 ) titleTableStr.push( '<td width="'+ pkWidth.ds +'">' + UI.DanShuang + '</td>' );
	
	break;
	case 7:
		titleTableStr.push( '</div></td>' );
		titleTableStr.push( '<td width="'+ pkWidth.dy +'">' + UI.DuYing + '</td>' );		
		//让球
		titleTableStr.push( '<td width="'+ pkWidth.rq +'">' + UI.RangQiu + '</td>' );
		//大小
		titleTableStr.push( '<td width="'+ pkWidth.dx +'">' + UI.DaXiao + '</td>' );
		//单双
		titleTableStr.push( '<td width="'+ pkWidth.ds +'">' + UI.DanShuang + '</td>' );
		
	
	break;
	case 8:
	
		
	
	break;		
	}
	
	//更多
	if( playItem == 1 && gameLx == 1 && timeLx != 3 )
	titleTableStr.push( '<td width="'+ pkWidth.more +'">&nbsp;</td>' );
	
	$b('dataTitle').innerHTML = titleTableStr.join('');	
	
}

//无赛程
function noEventData(){
		switch( liID ){
		case 1: titleStr = eval( 'UI.game_lx_'+ gameLx  )  +' * '+ UI.GunQiu; break;
		case 2: titleStr = eval( 'UI.game_lx_'+ gameLx  )  +' * '+  UI.JinRi; break;
		case 3: titleStr = eval( 'UI.game_lx_'+ gameLx  )  +' * '+  UI.ZaoCan; break;
		case 4: titleStr = eval( 'UI.game_lx_'+ gameLx  )  +' * '+  UI.GuoGuan; break;
		case 5: titleStr = eval( 'UI.game_lx_'+ gameLx  )  +' * '+  UI.GuanJun; break;
		}
	 $b('gameDataTable').innerHTML  = '<div id="noEventData">'+ titleStr +'<br>'+ UI.WuSaiCheng +'</div>';
}

//@选择排序方式
function changeOrderBy( value ){
	orderBy = parseInt(value);	
	orderByObj[1]['isCurr'] = 0;
	orderByObj[2]['isCurr'] = 0;
	orderByObj[value]['isCurr'] = 1;
	refreshData();
}


//改变盘类型
function changeplayItem( _playItem ){
	//清空內容
	$b('dataTitle').innerHTML = '';
	$b('gameDataTable').innerHTML = '';
	playItem = parseInt(_playItem);
	refreshData();
}


//改变盘类型 香港盘 马来盘
function changePanType( value ){
	pan_type = value;
	panTypeObj[1]['isCurr'] = 0;
	panTypeObj[2]['isCurr'] = 0;
	panTypeObj[3]['isCurr'] = 0;
	panTypeObj[value]['isCurr'] = 1;
	refreshData();
}

//通过宣传链接进入
function linkLnum( game_lx, lnum ){
	
	allTimeEvent = 1;
	playItem = 1;
	currGameTime = 0;
	timeLx = 0;
	currPage = 	0;
	gameLx = game_lx;
	showLnum = 	lnum;
	refreshData();
	
	tag=$("#itemBox li").toArray();
 	for( i=0; i<tag.length; i++ ) tag[i].className = '';
	$( '#itemBox ul' ).hide(30);
	
}

//选择联赛
function changeLeague( lnum ){
	showLnum = lnum;
	refreshData();
}

//@選擇頁碼
function changePage( page ){
	currPage = page;
	refreshData();
}



//上一页 下一页
function nextPage( num ){
	page = currPage + num;
	if( page <= 0 ) return;
	changePage( page );	
}

//@选择日期
function changeGametime( game_time_new ){	
	currGameTime = game_time_new;
	backItemPage();
	refreshData();
}

//冠军打开一个赛事
function openWinData( subOBJ ){
	$('#'+subOBJ ).toggle();
}

//currTdStr.push( getAction( timeLx,  GD.gameUnique, playLx, 1, halfLx, '', pl1 ) );
//getAction( timeLx, GD.gameUnique, playLx, 1, halfLx, pkNum, pl[1]
//@得到action 串
function getAction( time_lx, gameUnique, playLx, playObj ,halfLx, pkNum, pl ){
	switch( playLx ){
	case 1: playObj = 'dy'+ playObj; break;
	case 2: playObj = 'rqpl'+ playObj; break;
	case 3: playObj = 'dxpl'+ playObj; break;
	case 4: playObj = 'dspl'+ playObj; break;
	default: break;
	}
	
	//记录timeLx + ID + playLx + playObj + halfLx + pkNum
	if( getCookie( 'uid' ) ){
		action = time_lx +'*'+ gameUnique +'*'+ playLx +'*'+ playObj +'*'+ halfLx + '*' + pkNum +'*'+ pl;
		if( isMore == 1 ){
			action_str = '<a  href="javascript:void(0)"  class="morePl" onClick="openForm(\''+ action +'\')" >';
		}else{
			selectedClass = ( selectedAction == action )?('class="selectedAction"'):('');
			action_str = '<a  href="javascript:void(0)" '+ selectedClass +' onClick="openForm(\''+ action +'\');setSelectedAction(\''+ action +'\',this)" >';
		}
	}else{
		action_str = '<a style="font-weight:bold">';
	}
	return 	action_str;
	
}


function setSelectedAction( action, self ){
	
	selectedAction = action;
	$('a.selectedAction').removeClass('selectedAction');
	$(self).addClass('selectedAction');
		
}


//打开下注页面
function openForm( action ){  
	
	//界面状态
	isCheckBetStatus = 0;
	$b( 'orderStatus' ).innerHTML = ''; 
	
	if( playItem == 7 ){
		getOrderGG(action); //单式下注表单
	}else{
		getOrderUnitary(action); //单式下注表单
	}
}


//返回項目頁面
function backItemPage(){	
	orderData		= new Object();
	orderDataGG		= {'action':[], 'betPl':[], 'betPlJs':[], 'betNum': 0 };
	isCheckBetStatus = 0;
	$b( 'orderInfo' ).innerHTML = ''; 
	$b( 'orderForm' ).innerHTML = ''; 
	$b( 'orderStatus' ).innerHTML = '';
	$b( 'betbutton' ).innerHTML = '';
	$( '#betingAlertBox' ).show();
	
	setSelectedAction( '', null )
	
}


//关闭MORE DIV层
function closeDiv(){
	//$('moreBox').html( '<div align="center" style="margin:50"><img  src="../images/loading01.gif"></div>');
	$('#moreBox').slideUp("fast");
}

//////////////////////////////////////////////////////////////////////////////////////////////
//请求单式注单
function getOrderUnitary( action ){
	
	post = {
            'uid':uid, 'lang': lang, 'pan_type':pan_type, 
            'action': action,
	}
	
	changBetingBox( 1, '#bettingTitleMenu' );
	orderClient.getOrderUnitary( post, function ( result, args, output, warning ) {

		//console.log(post);
		//console.log(result);
		if( output ) alert(output);
		//返回数组，JS生成注单
		orderData = result;
                
		printOrder();
		
	}, true);
}


//请求过关子注单
function getOrderGG( action ){
	post = {
	'uid':uid, 'lang': lang, 'pan_type':pan_type, 
	'action': action,
	'betNum': orderDataGG.betNum
	}
	
	changBetingBox( 1, '#bettingTitleMenu' );
	orderClient.getOrderGG( post, function ( result, args, output, warning ) {
		

		console.log(post);
		console.log(result);
		if(output) alert(output);
		//alert(warning);
		////返回数组，JS生成注单
		printOrderGG( result );
		
	}, true);

}


//返回数组，JS生成注单	
function printOrder(){
	//console.log(orderData);
	//检查返回结果
	systemAlert( orderData.flagID );
        
	if( orderData.flagID != 7777 ) return;
		
	if( parseInt( orderData.playLx ) == 10  ){
		 gName = '';
		 orderData.playObj = 'GJ';
	}else{
		gName = '<span>'+ orderData.gName1;
		if( orderData.timeLx == 3 ) gName += '['+ orderData.bifen1 +'] ';
		gName += '</span><b> VS </b>';
		gName += '<span>'+ orderData.gName2 +'</span>';
		if( orderData.timeLx == 3 ) gName += '['+ orderData.bifen2 +'] ';
	}
	
	//玩法
	Info = '<div id="betTitle">'+ orderData.title +'</div>';
	
	//联赛
	Info += '<div id="betLx">'+ orderData.lxName +'</div>';
			
	//赛事
	Info += '<div id="betGname">'+  gName +'</div>';	

	//投注对象
	Info += '<div id="betObj">';
	
	//投注对象
	Info += getBetObjName( orderData.playLx, orderData.playObj ,orderData.gName1, orderData.gName2  );

	if( orderData.playLx == 2  ){
		Info += '<span> '+ shwoPkNum( orderData.playObj, orderData.pkNum ) +' </span> ';
	}else if( orderData.playLx == 3 ){
		Info += '<span> '+ orderData.pkNum +' </span> ';
	}
	Info += '<br/>@ <span class="betPlBox" id="betPlBox'+ orderData.gameUnique +'">'+ orderData.betPl +'</span></div>';
	
	if( orderData.plChange == 1 )
	Info += '<div class="betStatus" id="betPlChangeBox">'+ UI.ID10409 +'</div>';
	
	$b( 'orderInfo' ).innerHTML = Info;
	
	form	= '<div id="betMoneyBox">'+ UI.JinE +': <input id="betMoney" type="text" class="title5" onKeyPress="return CheckKey(event)" onKeyUp="getWinMoney()"/></div>';
	form	+= '<div>'+ UI.YingLi +': <span id="yingliBox">0</span></div>';
	form	+= '<div>'+ UI.ZuiDi +': '+ orderData.minMoney +'</div>';
	form	+= '<div>'+ UI.ZuiGao +': '+ orderData.maxMoney +'</div>';
	
	$b( 'orderForm' ).innerHTML = form;
	
	$b( 'betbutton' ).innerHTML = '<div id="btBox"><input type="button" class="buton15" value="'+ UI.TiJiao +'" onClick="gotoBetingUnitary(0)"><input type="button" class="buton15" value="'+ UI.FanHui +'" onClick="backItemPage()"></div>';
	
	$('#betingAlertBox').hide();
	$b('betMoney').focus();
	document.getElementById('betMoney').focus();
}


//返回子注单数组 生成子注单
function printOrderGG( result ){
	
	//检查返回结果
	systemAlert( result.flagID );	
	
	if( result.flagID != 7777 ) return;
		
	//对阵
	gName = '<span>'+ result.gName1 +'</span><span class="title1"> VS </span><span>'+ result.gName2 +'</span>';
	
	//注单信息
	if( orderDataGG.betNum == 0 ){
		orderData.minMoney = result.minMoney;
		orderData.maxMoney = result.maxMoney;
		orderData.minBetNum = result.minBetNum;
		orderData.maxBetNum = result.maxBetNum;
		orderData.maxPaicaiMoney = result.maxPaicaiMoney;

		$b('orderInfo').innerHTML = '';
		form = '<div style="margin-top:10">'+ UI.JinE +': </span>';
		form += '<input id="betMoney" type="text" onKeyPress="return CheckKey(event)" onKeyUp="getSunMoney()"/> <span id="chuanNum">1</span> '+ UI.Chuan +' 1<div>';
		form += '<div>'+ UI.YingLi +': </span><span id="yingliBox">0</span></div>';
		form += '<div>'+ UI.ZuiDi +': </span>'+ result.minMoney + '</div>';
		form += '<div>'+ UI.ZuiGao +': </span>'+ result.maxMoney + '</div>';
		$b('orderForm').innerHTML = form;
		$b( 'betbutton' ).innerHTML = '<div id="btBox"><input type="button" class="buton15" value="'+ UI.TiJiao +'" onClick="gotoBetingUnitary(0)"> <input type="button" class="buton15" value="'+ UI.FanHui +'" onClick="backItemPage()"></div>';
	}
	
	//投注对象
	Info  = '<div id="ggSubBox" class="bgBlack12">';
	Info += '<div id="gameEventBox"><span class="ggSubClose" onclick="deleteSubOrder('+ result.gameUnique +')">×</span><span class="title1">'+ gName +'</span></div>';
	
	Info += '<div class="betObjBox">'+ getBetObjName( result.playLx, result.playObj, result.gName1, result.gName2 );
	if( result.playLx == 2  ){
		Info += '<span> '+ shwoPkNum( result.playObj, result.pkNum ) +' </span> ';
	}else if( result.playLx == 3 ){
		Info += '<span> '+ result.pkNum +' </span> ';
	}
	
	Info += '@<span class="class="betPlBox"" id="betPlBox'+ result.gameUnique +'">'+ result.betPl +'</span></div>';
	
	Info += '</div>';
	
	//新增一个子注单
	divObj = 'order'+ result.gameUnique;
	if( $b( divObj ) ){
		$b( divObj ).innerHTML = Info;
	}else{
		parentDiv 		= $b('orderInfo');
		nowDIV 			= document.createElement('div'); 
		nowDIV.id 		= divObj;
		nowDIV.innerHTML = Info;
		parentDiv.appendChild(nowDIV);
		orderDataGG.betNum++;
	}
	
	$b('chuanNum').innerHTML = orderDataGG.betNum;
	orderDataGG.action[result.gameUnique] = result.action;
	orderDataGG.betPl[result.gameUnique]  = result.betPl;
	
	//可贏金額計算賠率
	orderDataGG.betPlJs[result.gameUnique]  = result.betPl;
	
	$('#betingAlertBox').hide();
	document.getElementById('betMoney').focus();
	getSunMoney();
	
}


//下注
function gotoBetingUnitary( isAlert ){
	
	if( playItem == 7 ){//过关
		action = '';
		for( id in orderDataGG.action ){
			if( action ) action += ';';
			action += orderDataGG.action[id];
		}
		
		betPl = '';
		for( id in orderDataGG.betPl ){
			if( betPl ) betPl += ';';
			betPl += orderDataGG.betPl[id];
		}
		
		post = {
                    'uid':uid, 'lang': lang, 'pan_type':pan_type, 
                    'action': 	action,
                    'betPl':	betPl,
                    'betNum':	orderDataGG.betNum,
                    'betMoney': $b('betMoney').value
		};
		console.log("this is orderData:");
		console.log(orderData);
		if( post.betNum < orderData.minBetNum ){ alertBox( 0, contentHtml= UI.ID10417 + orderData.minBetNum, ''  );return false; }
		if( post.betNum > orderData.maxBetNum ){ alertBox( 0, contentHtml= UI.ID10418 + orderData.maxBetNum, ''  );return false; }
		
	}else{
		post = {
                    'uid':uid, 'lang': lang, 'pan_type':pan_type, 
                    'action': orderData.action,
                    'betPl':  orderData.betPl,
                    'betMoney': $b('betMoney').value,
                    'bet_model':1
		}
	}
	
	//最低
	if( parseInt(post.betMoney) <= 0 ){
		return false;
	}
	
	console.log(orderData);
	//余额不足
	if( orderData.minMoney > orderData.maxMoney ){
		contentHtml = UI.ID10403;
		alertBox( 0, contentHtml, ''  );
		return false;
	}
	
	//最低
	if( post.betMoney < orderData.minMoney ){
		contentHtml= UI.ID10402 + orderData.minMoney;
		alertBox( 0, contentHtml, ''  );
		return false;
	}
	
	//最高
	if( post.betMoney > orderData.maxMoney ){
		contentHtml=  UI.ID10404 + orderData.maxMoney
		alertBox( 0, contentHtml, ''  );
		return false;
	}
	
	if( isAlert == 0 ){
		contentHtml =  UI.ID10405 +': <b>'+ post.betMoney +'</b>';
		contentHtml += '</br></br>'+ UI.ID10416 +': <b>'+ $b('yingliBox').innerHTML  +'</b>';
		if( playItem == 7 ) contentHtml += '</br></br>'+ UI.ID10419 +': <b>'+ orderData.maxPaicaiMoney +'</b>';
		contentHtml += '</br></br>'+ UI.ID10406 +'?';
		contentHtml +=
		alertBox( 0, contentHtml, 'gotoBetingUnitary(1)' );	
		return false;
	}else{
		closeAlertBox();	
	}
	
		
	orderClient.gotoBetingUnitary( post, function ( result, args, output, warning ){
		
		if( output ){
			alert( output );
			//window.clipboardData.setData('text', output);
		}
//                console.log(post);
//		console.log(result);
//                return;
		eval( 'thisresult=' + result );
		console.log(post);
		console.log(jQuery.parseJSON(result));
		//alert(result);
		switch( parseInt( thisresult.flagID ) ){
                    case 10409: //赔率改变
                            for( gameUnique in thisresult.newBetPl ){
                                    //alert(gameUnique);
                                    contentHtml = UI.ID10420 +'<b>'+ $b('betPlBox'+ gameUnique).innerHTML +'</b>'+ UI.ID10421 +'<b>'+ thisresult.newBetPl[gameUnique] +'</b><br/><br/>'+ UI.ID10422 +'？';
                                    alertBox( 0, contentHtml, 'gotoBetingUnitary(1)' );	

                                    $b('betPlBox'+ gameUnique).innerHTML = thisresult.newBetPl[gameUnique];
                                    $b('betPlBox'+ gameUnique).style.backgroundColor = '#FFFF00';
                                    if( orderDataGG.betNum == 0 ){
                                            orderData.betPl = thisresult.newBetPl[gameUnique];
                                    }else{

                                            orderDataGG.betPl[gameUnique] = thisresult.newBetPl[gameUnique];
                                            if( result.playLx == 1 ){
                                                    orderDataGG.betPlJs[gameUnique] = thisresult.newBetPl[gameUnique]-1;
                                            }else{
                                                    orderDataGG.betPlJs[gameUnique] = thisresult.newBetPl[gameUnique];
                                            }
                                            contentHtml = UI.ID10409 +'<br/><br/>'+ UI.ID10422 +'？';
                                            alertBox( 0, contentHtml, 'gotoBetingUnitary(1)' );	
                                    }


                            }				
                    break;
                    case 7777: 
                            $('.ggSubClose').remove();
                            $('#betPlChangeBox').hide();
                            $b( 'orderForm' ).innerHTML = '';
                            //状态
                            statusString = '<div class="betStatus" id="betStatus">';
                            switch( parseInt( thisresult.betStatus ) ){
                            case 0:  
                                    statusString += UI.XiaZhuChengGong; 
                                    contentHtml = UI.XiaZhuChengGong +'<br/><br/>'+ UI.ID10415;
                            break;
                            case -1: 
                                    statusString += UI.DengDaiQueRen; 
                                    isCheckBetStatus = 1; 
                                    checkBetStatusTime = 10; 
                                    checkBetId =  thisresult.betId; 
                                    contentHtml = UI.ID10414 +'<br/><br/>'+ UI.ID10415; 
                            break; 
                            case 3:  
                                    statusString += UI.ZhuDanBuJieShou; 
                                    contentHtml = UI.ID10414 +'<br/><br/>'+ UI.ID10415; 
                            break;
                            }
                            statusString += '</div>';

                            //提示成功或状态
                            alertBox( 0, contentHtml, '' );

                            //下注金额
                            statusString += '<div>'+ UI.JinE +': <span class="betMoneyBox"><b>'+ thisresult.betMoney +'</b></span></div>';

                            //盘类型
                            if( thisresult.panType ){
                                    statusString += '<div>'+ UI.PanKou +': </span>';
                                    switch( parseInt( thisresult.panType ) ){
                                    case 1: statusString += ' ['+ UI.XiangGangPan +']'; break;
                                    case 2: statusString += ' ['+ UI.MaLaiPan +']'; break;
                                    case 3: statusString += ' ['+ UI.OuZhouPan +']'; break;
                                    }
                                    statusString += '</div>';
                            }

                            //下注流水号
                            statusString += '<div>'+ UI.DanHao +': '+ thisresult.betIdAdd +'</div>';

                            //下注时间
                            statusString += '<div>'+ UI.ShiJian +': '+ thisresult.betTime +'</div>';

                            //返回按钮
                            $b( 'betbutton' ).innerHTML = '<div id="btBox"><input type="button" class="buton15" value="'+ UI.FanHui +'" onClick="backItemPage()"></div>';

                            $b( 'orderStatus' ).innerHTML = statusString;

                            orderData		= new Object();
                            orderDataGG		= {'action':[], 'betPl':[], 'betPlJs':[], 'betNum': 0 };	

                            //更新帐户金额
                            topGetUserData();

                            //检测注单状态
                            checkBetStatus();

                            setSelectedAction( '', null )
                            /**/
                    break;	//状态正常
                    default:
                            systemAlert( thisresult.flagID );
                    break;
		}	
		
	}, true);
	return false;
}

//@计算可赢金额
function getWinMoney(){
	
	if( $b('betMoney').value == '' ) $b('betMoney').value = 0
	if( parseInt( $b('betMoney').value ) <= 0 ) $b('betMoney').value = 0;
	$b('betMoney').value = parseInt( $b('betMoney').value );
	if( parseInt( $b('betMoney').value ) >= orderData.maxMoney ) $b('betMoney').value = orderData.maxMoney;
	$b('yingliBox').innerHTML = ( orderData.jsBetPl * parseInt( $b('betMoney').value ) ).toFixed(2);
	
}


//@计算可赢金额 - 過關
function getSunMoney(){

	t_pl = 1;
	for ( game_unique in orderDataGG.betPlJs ){
		t_pl *= parseFloat(orderDataGG.betPlJs[game_unique]);
	}
	console.log(orderDataGG);
	console.log(t_pl);
	if( $b('betMoney').value == '' ){
		betMoney = 0;
	}else{
		betMoney = parseInt( $b('betMoney').value );
	}
	
	t_pl = t_pl-1;
	$b('yingliBox').innerHTML =  ( betMoney * t_pl ).toFixed(2);
	
}

//@过关删除子注單
function deleteSubOrder( gameUnique ){
	
	if( orderDataGG.betNum == 0 ) return;
	delete orderDataGG.action[gameUnique];
	delete orderDataGG.betPl[gameUnique];
	delete orderDataGG.betPlJs[gameUnique];
	orderDataGG.betNum--;
	
	//$b('order'+ gameUnique ).removeNode(true);
	$('#order'+ gameUnique).remove();
	$b('betMoney').focus();
	$b('chuanNum').innerHTML = orderDataGG.betNum;
	
	getSunMoney();
	
	if( orderDataGG.betNum <= 0 ) backItemPage();
}

//检查状态
function systemAlert( flagID ){
	
	//执行成功
	flagID = parseInt(flagID);
	if( flagID == 7777 ) return 7777;
	
	backItemPage();
	
	//无数据返回,提示连接超时
	if( flagID == '' || typeof(flagID) == "undefined" || flagID == 0 ){ alertBox( 0, contentHtml= UI.ID10002 +'['+ flagID +']', '' ); return; }
			
	//弹出提示信息
	if( flagID == 10407001 ||  flagID == 10407002 ||  flagID == 10407003 ||  flagID == 10407004 ||  flagID == 10407005 ){
		alertBox( 0, contentHtml= UI.ID10407 +'['+ flagID +']', '' );	
	}else{
		alertBox( 0, contentHtml= eval( 'UI.ID'+ flagID )+'['+ flagID +']', '' );	
	}
	
	
	//根据不同情况进行不同操作
	switch( flagID ){
	case 10001: loginOut(); break;	//系统维护
	case 10004: loginOut(); break;	//登录失效
	}
	
}

//检查危险球
function checkBetStatus(){
	
	if( isCheckBetStatus == 0 ) return;
	
	if( checkBetStatusTime > 0 ){
		checkBetStatusTime--;
		$b('betStatus').innerHTML = '<span style="color:#FF6600">'+UI.DengDaiQueRen+'……</span>['+ checkBetStatusTime +']';
	}else if( checkBetStatusTime == 0 ){
		
		checkBetStatusTime--;
		post = {
		'uid': uid,'lang': lang,
		'betId': checkBetId
		}
		
		orderClient.checkBetStatus( post, function ( result, args, output, warning ){
			console.log(post);
			console.log(result);
			switch( parseInt( result.betStatus ) ){
			case 0: $b('betStatus').innerHTML = '<span style="color:#006600">'+ UI.XiaZhuChengGong +'</span>'; isCheckBetStatus = 0; break;
			case -1: checkBetStatusTime = 10; break; 
			case 1: $b('betStatus').innerHTML = '<span style="color:#CC0000">'+ UI.ZhuDanBuJieShou +'</span>'; isCheckBetStatus = 0; break;
			}
			
		}, true);	
	}else{
		//正在执行命令中
	}
	
	setTimeout( checkBetStatus, 1000);
}

//得到投注对象名称
function getBetObjName( playLx, playObj, gName1, gName2 ){
		
	switch( playObj ){
		case 'dy1':  case 'rqpl1': case 'GJ': return gName1; break;
		case 'dy2':  case 'rqpl2':	return gName2; break;
		case 'dy3':					return UI.HeJu; break;
		case 'dxpl1':				return UI.Da; break;
		case 'dxpl2':				return UI.Xiao; break;
		case 'dspl1':				return UI.Dan; break;
		case 'dspl2':				return UI.Shuang; break;

		case 'pl_1_0': return '1:0';
		case 'pl_2_0': return '2:0';
		case 'pl_2_1': return '2:1';
		case 'pl_3_0': return '3:0';
		case 'pl_3_1': return '3:1';
		case 'pl_3_2': return '3:2';
		case 'pl_4_0': return '4:0';
		case 'pl_4_1': return '4:1';
		case 'pl_4_2': return '4:2';
		case 'pl_4_3': return '4:3';
		case 'pl_0_0': return '0:0';
		case 'pl_1_1': return '1:1';
		case 'pl_2_2': return '2:2';
		case 'pl_3_3': return '3:3';
		case 'pl_4_4': return '4:4';
		case 'pl_5up': return 'UP5';
		
		case 'pl_0_1': if( playLx == 5 ){ return '0~1'; }else if( playLx == 6 ){ return '0:1'; } break;
		case 'pl_0_2': return '0:2'; break;
		case 'pl_1_2': return '1:2'; break;
		case 'pl_0_3': return '0:3'; break;
		case 'pl_1_3': return '1:3'; break;
		case 'pl_2_3': if( playLx == 5 ){ return '2~3'; }else if( playLx == 6 ){ return '2:3'; } break;
		case 'pl_0_4': return '0:4'; break;
		case 'pl_1_4': return '1:4'; break;
		case 'pl_2_4': return '2:4'; break;
		case 'pl_3_4': return '3:4'; break;
		
		case 'pl_0_1': return '0~1'; break;
		case 'pl_2_3': return '2~3'; break;
		case 'pl_4_6': return '4~6'; break;
		case 'pl_7up': return 'UP7'; break;
		
		case 'pl_H_H': return (UI.Zhu +'/'+ UI.Zhu); break;
		case 'pl_H_N': return (UI.Zhu +'/'+ UI.He); break;
		case 'pl_H_C': return (UI.Zhu +'/'+ UI.Ke); break;
		case 'pl_N_H': return (UI.He  +'/'+ UI.Zhu); break;
		case 'pl_N_N': return (UI.He  +'/'+ UI.He); break;
		case 'pl_N_C': return (UI.He  +'/'+ UI.Ke); break;
		case 'pl_C_H': return (UI.Ke  +'/'+ UI.Zhu); break;
		case 'pl_C_N': return (UI.Ke  +'/'+ UI.He); break;
		case 'pl_C_C': return (UI.Ke  +'/'+ UI.Ke); break;
	}
}

// cteateCol( tr, colSpan=2, 'winGname', Array( '' ) )

//创建单元格
function cteateCol( row, colSpan, className, tdArr ){
	
	for( id in tdArr){
		var col = row.insertCell(-1);
		//col.colSpan = colSpan;
		if( className != '' ) col.setAttribute("class",className);
		if( colSpan > 1 )col.setAttribute("colspan",colSpan);
		col.innerHTML = tdArr[id]; 
	}
	
}


//得到玩法名称
function getPlayName( playLx ){
	switch( parseInt(playLx) ){
	case 1: return UI.DuYing; break;
	case 2: return UI.RangQiu; break;
	case 3: return UI.DaXiao; break;
	case 4: return UI.DanShuang; break;
	case 5: return UI.RuQiuShu; break;
	case 6: return UI.BoDan; break;
	case 7: return UI.BanQuanChang; break;
	case 10: return UI.GuanJun; break;		
	}
}

//得到半场名称
function getHalfName( gameLx, halfLx ){	
	if( gameLx == 3 ){
		switch( halfLx ){//半场类型
		case 0: return '<span class="banChang">['+ UI.PanShu +']</span>'; break;
		case 1: return '<span class="banChang">['+ UI.DiYiJu +']</span>'; break;
		case 2: return '<span class="banChang">['+ UI.DiErJu +' ]</span>'; break;
		case 3: return '<span class="banChang">['+ UI.DiSanJu +']</span>'; break;
		case 4: return '<span class="banChang">['+ UI.DiSiJu +']</span>'; break;
		case 5: return '<span class="banChang">['+ UI.DiWuJu +']</span>'; break;
		case 6: return '<span class="banChang">['+ UI.JuShu +']</span>'; break;
		}
	}else if( gameLx == 5 ){
		switch( halfLx ){//半场类型
		case 0: return ''; break;
		case 1: return '<span class="banChang">['+ UI.QianWuJu +']</span>'; break;
		}
	}else{
		switch( halfLx ){//半场类型
		case 0: return ''; break;
		case 1: return '<span class="banChang">['+ UI.ShangBanChang +']</span>'; break;
		case 2: return '<span class="banChang">['+ UI.XiaBanChang +' ]</span>'; break;
		case 3: return '<span class="banChang">['+ UI.DiYiJie +']</span>'; break;
		case 4: return '<span class="banChang">['+ UI.DiErJie +']</span>'; break;
		case 5: return '<span class="banChang">['+ UI.DiSanJie +']</span>'; break;
		case 6: return '<span class="banChang">['+ UI.DiSiJie +']</span>'; break;
		}	
	}
	
	return halfStr;
}


/****************************************************JS 控制效果***********************************************************/
//打开或收缩球类
function slideToggleItemMenu( itemID ){
	
	$( '#itemBox ul[id!="menugameLxUl'+ itemID +'"]' ).slideUp(100);
	$( "#menugameLxUl" + itemID ).slideDown(100);
	//$( '#itemBox ul' ).hide( 30 );
	//$( "#menugameLxUl" + itemID ).show(30);	
	
}

//选中玩法
function selectLi( _gameLx, _liID, _hotFlag ){
	
	closeDiv();
	gameLx = _gameLx;
	liID = _liID;
	hotFlag = _hotFlag;
	switch( liID ){
            case 1: timeLx = 3; playItem = 1; break;
            case 2: timeLx = 2; playItem = 1; break;
            case 3: timeLx = 1; playItem = 1; break;
            case 4: timeLx = 2; playItem = 7; break;
            case 5: timeLx = 2; playItem = 8; break;		
	}
	
	 tag=$("#itemBox li").toArray()
 	 for( i=0; i<tag.length; i++ ) tag[i].className = '';
	 $( '#menugameLxLi'+ gameLx +''+ hotFlag +'_'+ liID ).attr({'class':'currentLi'});
	
	//清空選中的值
	currGameTime = 0;
	showLnum = 0;
	currPage = 1;	
	//刷新中部数据
	refreshData();
	
}


//选择下拉菜单触发事件
function onChangeList( ObjectName, value ){

	switch( ObjectName ){
	case 'langSelectList':
		changeLang( value );
	break;	
	case 'panTypeSelectList':
		changePanType( value );
	break;
	case 'orderBySelectList':
		changeOrderBy( value );
	break;
	case 'leagueSelectList':
		changeLeague( value );
	break;
	case 'pageSelectList':
		changePage( value );
	break;
	case 'dateSelectList':
		changeGametime( value );
	break;
	}
	
}
