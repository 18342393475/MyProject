//全局变量
var uid 				= '';	//用户UID
var lang 				= '';	//用户语言
var isLogin				= '';	//是否已经登录
var mcTime 				= 0 ;	//客户段与服务器端的时间差
var GetMsgTime      	= 0;	//刷新公告计时器 -1 指令执行中  0 接受执行指令  大于0 空闲
var sysClient = {};
var langObj = {'zh-tw':{'txt':'繁体中文','value':'zh-tw', 'img':'zh-tw.png','isCurr':1},
			   'zh-cn':{'txt':'简体中文','value':'zh-cn','img':'zh-cn.png'},
			   'en-gb':{'txt':'English','value':'en-gb','img':'en-gb.png'},
			   'ko-kr':{'txt':'한국어','value':'ko-kr','img':'ko-kr.png'}
			   };
var isIE = ( document.all && window.ActiveXObject && !window.opera ) ? true : false
//初始化页面

//初始化
$(document).ready(function(){
		
	lang = getCookie( 'lang' );
	uid = getCookie( 'uid' );
	
	var initObj = init();
	initObj.start();
	/*
	var loginObj = login();
	loginObj.start();
	*/
	var userJoinObj = userJoin();
	userJoinObj.start();
	/*
	var getPasswordObj = getPassword();
	getPasswordObj.start();
	*/
	//var weiXinObj = weiXin();
	//weiXinObj.start();
	
	initRpcObj();
	setInterval(MasterTimer,1000);
	
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//页头动作
function actionHeader(){	
	
	if( GetMsgTime > 0 ){//正在倒计时
		GetMsgTime--;		
	}else if( GetMsgTime == 0 ){//倒计时结束 执行指令
		GetMsgTime = 180;
		topGetUserData();
	}else{
		//指令执行中
	}
	
}


//显示服务器时间
function showServerTime(){
	//得到服务器时间
	if( mcTime == 0 ) return;

	var d, s;  
	var thisd = new Date();          	// 声明变量。
	Dnum = thisd.getTime(); 
	thisd.setTime( Dnum + mcTime );    // 主服务器的时间 = 本地时间+时间差
	if( thisd.getMonth() < 10 ){ thisd_m = '0'+ thisd.getMonth(); }else{ thisd_m = thisd.getMonth(); }
	if( thisd.getDate() < 10 ){ thisd_d = '0'+ thisd.getDate(); }else{ thisd_d = thisd.getDate(); }
	if( thisd.getHours() < 10 ){ thisd_h = '0'+ thisd.getHours(); }else{ thisd_h = thisd.getHours(); }
	if( thisd.getMinutes() < 10 ){ thisd_i = '0'+ thisd.getMinutes(); }else{ thisd_i = thisd.getMinutes(); }
	if( thisd.getSeconds() < 10 ){ thisd_s = '0'+ thisd.getSeconds(); }else{ thisd_s = thisd.getSeconds(); }
	s = thisd.toLocaleString();
	$('#timeBox').html( s );
	//$header('timeBox').innerHTML = thisd.getFullYear() +'-'+ thisd_m +'-'+ thisd_d +'  '+  thisd_h +':'+  thisd_i +':'+  thisd_s;

}

//刷新验证码
function shuaxincodeImg( obj, bgColor, fontColor ){
	$b( obj ).src = getCookie( 'phprpcUrl' )+'/phprpcClass/code.php?uid='+ getCookie( 'uid' ) +'&random='+Math.random()+'&bgColor='+bgColor +'&fontColor='+fontColor;
}


//更新 帐户金额  更新跑马灯  更新在线时间
function topGetUserData(){
	
	if( !getCookie( 'uid' ) ) return
	
	post = { 'uid': getCookie( 'uid' ), 'lang': getCookie( 'lang' ),'account_type': getCookie( 'account_type' ) };

	publicOBJ.userClient.topGetUserData( post, function ( result, args, output, warning ) {
		
		if( output ) alert(output);
		
		//系统维护
		if( parseInt( result.weihu_flag ) == 1 ){
			//history.go(0);
			return;
		}
				
		//用户掉线
		if( parseInt( result.flagID ) == 8888 ){
			location = 'index.php';
		}else if( parseInt( result.flagID ) == 7777 ){
			$( '#userNameBox' ).html( result.userName +'    ' );
			$( '#LabelJinE' ).html( UI.JinE +':  ');
			$( '#userMoneyBox' ).html( ' '+ result.userMoney );
		
			if( result.messageNum > 0 ){
				$('#chatLinkBox').attr('src','http://image.'+ getCookie( 'mainHost' ) +'/member/ad6_msg_'+getCookie( 'lang' )+'.gif') ;
			}else{
				$('#chatLinkBox').attr('src','http://image.'+ getCookie( 'mainHost' ) +'/member/ad6_'+getCookie( 'lang' )+'.gif') ;
			}
			
			//滚动公告		
			if( $( '#mymarquee' )[0] ){
				$( '#mymarquee' ).click(function(){ openWindow( 'index.php?tabID=0' );})
				$( '#mymarquee' ).html( result.message );
			}
			
		}
		
	}, true);
	
}


//会员注册
function userRegister(){
	
	if( !( POST = registerCheckFormValue(18)) ) return;
	
	//alertBox( 5, '', '' );
	publicOBJ.userClient.linkMasterServer( POST, function ( result, args, output, warning ){
		
		//if( output ) alert( output );
		if( parseInt( result.flagID ) == 7777 ){
			closeAlertBox();
			alert( UI.ID10128 );
			emailNet = POST.u_email.split('@');
			window.open( 'http://mail.'+ emailNet[1], "", "");
		}else{
			alert( eval( 'UI.ID'+ result.flagID  ) );
		}

	}, true);
	
}


//检测用户名
function registerCheckFormValue( inputID ){
	
	//账户名称
	if( inputID == 1 || inputID == 18 ){
		var post={'uid': uid,'lang': lang, 'u_name': $b('U_NAME').value };
		if( post.u_name == '' ){ $('#U_NAME_MSG').html( '<span class="alertN">'+ UI.ID10101 +'</span>' ); return false; }
		if( isChinaStr( post.u_name ) ){ $('#U_NAME_MSG').html( '<span class="alertN">'+ UI.ID10129 +'</span>' ); return false; }
		if( post.u_name.length < 6 ){ $('#U_NAME_MSG').html( '<span class="alertN">'+ UI.ID10106 +'</span>' ); return false; }
		if( post.u_name.length > 20 ){ $('#U_NAME_MSG').html( '<span class="alertN">'+ UI.ID10107 +'</span>' ); return false; }
		
		publicOBJ.userClient.checkUserName( post, function ( result, args, output, warning ){
			
			if(output) alert(output);
			if( parseInt( result.flagID ) == 7777 ){
				$('#U_NAME_MSG').html( '<span class="alertY">'+ UI.ID10124 +'</span>' );
			}else if(  parseInt( result.flagID ) == 10125 ){
				$('#U_NAME_MSG').html( '<span class="alertN">'+ UI.ID10125 +'</span>' );
			}else{
				alert( UI.ID10002 );	
			}
			
		}, true);
	}
	
	if( inputID == 6 || inputID == 18 ){
		
		var post={'uid': uid,'lang': lang, 'updateID':943, 'u_email': $b('U_EMAIL').value };
		if( !ismail(post.u_email) ){ $('#U_EMAIL_MSG').html( '<span class="alertN">'+ UI.ID10114 +'</span>' ); return false; }
		$('#U_EMAIL_MSG').html( '<span class="alertY"></span>' );
		publicOBJ.userClient.checkUserMail( post, function ( result, args, output, warning ){
			
			if(output) alert(output);
			if( parseInt( result.flagID ) == 7777 ){
				$('#U_EMAIL_MSG').html( '<span class="alertY"></span>' );
			}else if(  parseInt( result.flagID ) == 10126 ){
				$('#U_EMAIL_MSG').html( '<span class="alertN">'+ UI.ID10126 +'</span>' );
			}else{
				alert( UI.ID10002 );	
			}
			
		}, true);		
	}
	
	if( inputID < 2 ) return false;
	
	var POST = {
		'ac':getCookie('ac'),
		'loginHost': getCookie('loginHost'),
		'uid': uid,'lang': lang,
		'updateID':1003,
		'u_name': $b('U_NAME').value,
		'u_password': $b('U_PASSWORD').value,
		'u_password_re': $b('U_PASSWORD_RE').value,
		'p_password': $b('P_PASSWORD').value,
		'p_password_re': $b('P_PASSWORD_RE').value,
		'u_email': $b('U_EMAIL').value,
		'safe_q1': $b('SAFE_Q1').value,
		'safe_a1': $b('SAFE_A1').value,
		'u_xm': $b('U_XM').value,
		'u_nickname': $b('U_NICKNAME').value,
		'u_birthday': $b('birYear').value+''+$b('birMon').value+''+$b('birDay').value,
		'u_tel': $b('U_TEL').value,
		'u_country': $b('U_COUNTRY').value,
		'u_city': $b('U_CITY').value,
		'u_address': $b('U_ADDRESS').value,
		'u_zip_code': $b('U_ZIP_CODE').value,
		'form_code': $b('FORM_CODE').value,
		'lang': lang
	}
	if( $b('promotions_id') ) POST.promotions_id = $b('promotions_id').value;
	if( $b('is_experience') ) POST.is_experience = $(':radio[name="is_experience"]:checked').val();
	
	if( POST.u_password == '' ){ $('#U_PASSWORD_MSG').html( '<span class="alertN">'+ UI.ID10102 +'</span>' ); return false; }
	if( POST.u_password.length < 6 ){ $('#U_PASSWORD_MSG').html( '<span class="alertN">'+ UI.ID10108 +'</span>' ); return false; }
	if( POST.u_password.length > 20 ){ $('#U_PASSWORD_MSG').html( '<span class="alertN">'+ UI.ID10109 +'</span>' ); return false; }
	$('#U_PASSWORD_MSG').html( '<span class="alertY"></span>' );
		
	if( inputID < 3 ) return false;
	if( POST.u_password_re == '' ){  $('#U_PASSWORD_RE_MSG').html( '<span class="alertN">'+ UI.ID10105 +'</span>' ); return false; }
	if( POST.u_password != POST.u_password_re ){ $('#U_PASSWORD_RE_MSG').html( '<span class="alertN">'+ UI.ID10110 +'</span>' ); return false; }
	$('#U_PASSWORD_RE_MSG').html( '<span class="alertY"></span>' );
	
	if( inputID < 4 ) return false;
	if( POST.p_password == '' ){ $('#P_PASSWORD_MSG').html( '<span class="alertN">'+ UI.ID10103 +'</span>' ); return false; }
	if( POST.p_password.length < 6 ) { $('#P_PASSWORD_MSG').html( '<span class="alertN">'+ UI.ID10111 +'</span>' ); return false; }
	if( POST.p_password.length > 20 ){ $('#P_PASSWORD_MSG').html( '<span class="alertN">'+ UI.ID10112 +'</span>' ); return false; }
	$('#P_PASSWORD_MSG').html( '<span class="alertY"></span>' );
	
	if( inputID < 5 ) return false;	
	if( POST.p_password_re == '' ){  $('#P_PASSWORD_RE_MSG').html( '<span class="alertN">'+ UI.ID10130 +'</span>' ); return false; }
	if( POST.p_password != POST.p_password_re ){ $('#P_PASSWORD_RE_MSG').html( '<span class="alertN">'+ UI.ID10113 +'</span>' ); return false; }
	$('#P_PASSWORD_RE_MSG').html( '<span class="alertY"></span>' );
		
	if( inputID < 7) return false;
	if( POST.safe_q1 == '' ){ $('#SAFE_Q1_MSG').html( '<span class="alertN">'+ UI.ID10115 +'</span>' ); return false; }
	$('#SAFE_Q1_MSG').html( '<span class="alertY"></span>' );
	
	if( inputID < 8) return false;
	if( POST.safe_a1 == '' ){ $('#SAFE_A1_MSG').html( '<span class="alertN">'+ UI.ID10116 +'</span>' ); return false; }
	$('#SAFE_A1_MSG').html( '<span class="alertY"></span>' );
	
	if( inputID < 9 ) return false;
	if( POST.u_xm == '' ){ $('#U_XM_MSG').html( '<span class="alertN">'+ UI.ID10131 +'</span>' ); return false; }	
	$('#U_XM_MSG').html( '<span class="alertY"></span>' );
	
	if( inputID < 10 ) return false;
	if( POST.u_nickname == '' ){ $('#U_NICKNAME_MSG').html( '<span class="alertN">'+ UI.ID10117 +'</span>' ); return false; }
	$('#U_NICKNAME_MSG').html( '<span class="alertY"></span>' );
	
	if( inputID < 11 ) return false;
	if( $('#birYear').val() > (new Date().getFullYear()-18) ){ $('#U_BIRTHDAY_MSG').html( '<span class="alertN">您的出生年月日填写有误，不满18周岁！</span>' ); return false; }
	$('#U_BIRTHDAY_MSG').html( '<span class="alertY"></span>' );
		
	if( inputID < 12 ) return false;
	if( POST.u_tel == '' ){ $('#U_TEL_MSG').html( '<span class="alertN">'+ UI.ID10118 +'</span>' ); return false; }
	$('#U_TEL_MSG').html( '<span class="alertY"></span>' );
	
	if( inputID < 13 ) return false;
	if( POST.u_country == '' ){ $('#U_COUNTRY_MSG').html( '<span class="alertN">'+ UI.ID10119 +'</span>' ); return false; }
	$('#U_COUNTRY_MSG').html( '<span class="alertY"></span>' );
	
	if( inputID < 14 ) return false;
	if( POST.u_city == '' ){ $('#U_CITY_MSG').html( '<span class="alertN">'+ UI.ID10120 +'</span>' ); return false; }
	$('#U_CITY_MSG').html( '<span class="alertY"></span>' );
	
	if( inputID < 15 ) return false;
	if( POST.u_address == '' ){ $('#U_ADDRESS_MSG').html( '<span class="alertN">'+ UI.ID10121 +'</span>' ); return false; }
	$('#U_ADDRESS_MSG').html( '<span class="alertY"></span>' );
	
	if( inputID < 16 ) return false;
	if( POST.u_zip_code == '' ){ $('#U_ZIP_CODE_MSG').html( '<span class="alertN">'+ UI.ID10122 +'</span>' ); return false; }
	$('#U_ZIP_CODE_MSG').html( '<span class="alertY"></span>' );
	
	if( inputID < 17 ) return false;
	if( POST.form_code == '' ){ $('#FORM_CODE_MSG').html( '<span class="alertN">'+ UI.ID10132 +'</span>' ); return false; }
	$('#FORM_CODE_MSG').html( '' );
	
	if( $b('agreeBox').checked == false ){ $('#agreeBox_MSG').html( '<span class="alertN">'+ UI.ID10123 +'</span>' ); return false;}
	$('#agreeBox_MSG').html( '' );
	
	

	return POST;
}


//用户激活
function activateUser( ){
	
	if( getCookie('activateCode') == '' ) return;
	
	post = {
	'uid': uid,'lang': lang,
	'updateID': 998,
	'activateCode':getCookie('activateCode'),
	'debug':0
	}

	publicOBJ.userClient.linkMasterServer( post, function ( result, args, output, warning ){
		if(output)alert(output);
		if( parseInt( result.flagID ) == 7777 ){
			alert( UI.ID10155 );
		}else{ 
			//alert( UI.ID10002 );	
		}
		
	}, true);
	
}

//得到私人安全问题及邮箱
function getSafeQuestion(){
	
	var post = {
	'uid': uid,'lang': lang,
	'updateID': 995,
	'u_name': $b('getPassWord_u_name').value,
	'lang': lang
	}
	
	if( post.u_name == '' ){ alert( UI.ID10101 ); return; }
	
	publicOBJ.userClient.linkMasterServer( post, function ( result, args, output, warning ){
		if(output)alert(output);
		if( parseInt( result.flagID ) == 7777 ){
			$b('getPassWord_safe_q1').value = result.safe_q1;
			$b('getPassWord_u_email').value = result.u_email;
		}else if( parseInt( result.flagID ) == 10201 ){
			alert( UI.ID10201 );
		}else{
			alert( UI.ID10002 );	
		}
	}, true);
	
}


//找回密码
function getPassWord(){
	
	var post = {
	'uid': uid,'lang': lang,
	'updateID': 996,
	'loginHost': getCookie('loginHost'),
	'u_name': $b('getPassWord_u_name').value,
	'safe_q1': $b('getPassWord_safe_q1').value,
	'safe_a1': $b('getPassWord_safe_a1').value,
	'u_email': $b('getPassWord_u_email').value,
	'lang': lang
	}
	
	if( post.u_name == '' ){ alert( UI.ID10101 ); return; }
	if( post.safe_q1 == '' ){ alert( UI.ID10204 ); return; }
	if( post.safe_a1 == '' ){ alert( UI.ID10205 ); return; }
	
	publicOBJ.userClient.linkMasterServer( post, function ( result, args, output, warning ){
		
		if(output)alert(output);
		if( parseInt( result.flagID ) == 7777 ){
			alert( UI.ID10203 +': '+ post.u_email +'!' );
			emailNet = post.u_email.split('@');
			window.open( 'http://mail.'+ emailNet[1], "", "");
			closeAlertBox();			
		}else if( parseInt( result.flagID ) == 10202 ){
			alert( UI.ID10202 );	
		}else if(  parseInt( result.flagID ) == 10201  ){
			alert( UI.ID10201 );	
		}else{
			alert( UI.ID10002 );	
		}
	}, true);
	
}


//登出
function loginOut(){		
	//清除Cookie
	location = '../loginOut.php';
}


//用户登录
function userLogin(){
	
	var POST = {
	'loginHost': getCookie('loginHost'),
	'uid': uid,'lang': lang,
	'updateID':		1000,
	'u_name': 		$b('strUserName').value,
	'u_password': 	$b('strUserPassword').value,
	'form_code': 	$b('intLoginCode').value
	}
	
	if( POST.u_name == '' || POST.u_name == UI.ZhangHu ){
		$b('strUserName').focus();
		alertBox( boxType=0, contentHtml=UI.ID10101, btFunction='' );
		return false;
	}
	
	if( POST.u_password == '' || POST.u_password == UI.MiMa ){
		alertBox( boxType=0, contentHtml=UI.ID10102, btFunction='' );
		return false;
	}
	
	if(  POST.form_code == '' || POST.form_code == UI.YanZhengMa ){
		 $b('intLoginCode').focus();
		 alertBox( boxType=0, contentHtml=UI.ID10104, btFunction='' );
		 return false;
	}
	
	//alertBox( 5, '', '' );
	publicOBJ.userClient.linkMasterServer( POST, function ( result, args, output, warning ){
		if( output ) { window.clipboardData.setData('text', output); }
		
		if( parseInt( result.flagID ) == 7777 ){
			setCookie( 'isLogin', 'YES' );
			setCookie( 'lang', lang );
			location = './';
			return; 
		}else if( parseInt( result.flagID ) == 10152 ){
			//验证码错误，刷新
			shuaxincodeImg( 'codeImg', '171717', 'A0E308' );
		}
		systemAlert( result.flagID );

	}, true);
	return false;
}


//改变语言
function changeLang( value ){
	setCookie( 'lang', value );
	location = './'+ getCookie( 'topItem' ) +'.php';
}


//弹出最新动态
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



//
function getRegisterForm(){
	
	countryLis = Array( "阿联酋","巴林","埃及","以色列","伊朗","黎巴嫩","阿曼","沙特阿拉伯","阿尔及利亚","摩洛哥","毛里求斯","突尼斯","南非","象牙海岸","澳大利亚","新西兰","智利","加拿大","墨西哥","美国","波兰","捷克","斯洛伐克","匈牙利","奥地利","比利时","瑞士","德国","丹麦","西班牙","芬兰","法国","英国","希腊","爱尔兰","冰岛","意大利","卢森堡","土耳其","瑞典","葡萄牙","挪威","荷兰","摩洛哥","马耳他","塞普洛斯","波斯尼亚和黑塞哥维那","保加利亚","白俄罗斯","爱沙尼亚","克罗地亚","匈牙利","立陶宛","拉托维亚","摩尔多瓦","罗马尼亚","俄罗斯","斯洛文尼亚","亚美尼亚","阿塞拜疆","乌克兰","塞尔维亚","乌兹别克斯坦","吉尔吉斯斯坦","哈萨克斯坦","斯里兰卡","马来西亚","菲律宾","新加坡","泰国","中国","日本","香港","台湾");
	var contentHtml = '<div id="joinForm"><form>';
	contentHtml += '<h4>'+ UI.DengLuXinXi +'</h4><div class="hrLine01"></div>';
	contentHtml += '<table style="width:100%;">';
	contentHtml += '<tr><td align="right" width="150">'+ UI.ZhangHuMingCheng +': </td><td><input id="U_NAME" name="U_NAME" type="text" onblur="registerCheckFormValue(1)"/><span class="alertMSG" id="U_NAME_MSG">'+ UI.ZhuCe02 +'</span></td></tr>';
	contentHtml += '<tr><td align="right">'+ UI.DengLuMiMa +': </td><td><input id="U_PASSWORD"  name="U_PASSWORD" type="password" onblur="registerCheckFormValue(2)"/><span class="alertMSG" id="U_PASSWORD_MSG">'+ UI.ZhuCe03 +'</span></td></tr>';
	contentHtml += '<tr><td align="right">'+ UI.QueRenDengLuMiMa +': </td><td><input id="U_PASSWORD_RE"  name="U_PASSWORD_RE" type="password" onblur="registerCheckFormValue(3)"/><span class="alertMSG" id="U_PASSWORD_RE_MSG"></span></td></tr>';
	contentHtml += '</table>';
	contentHtml += '<h4>'+ UI.ZhuCe04 +'</h4><div class="hrLine01"></div>';
	contentHtml += '<table style="width:100%;">';
	contentHtml += '<tr><td align="right" width="150">'+ UI.TiKuanMiMa +': </td><td><input id="P_PASSWORD" name="P_PASSWORD" type="password" onblur="registerCheckFormValue(4)"/><span class="alertMSG" id="P_PASSWORD_MSG">'+ UI.ZhuCe03 +'</span></td></tr>';
	contentHtml += '<tr><td align="right">'+ UI.QueRenTiKuanMiMa +': </td><td><input id="P_PASSWORD_RE"  name="P_PASSWORD_RE" type="password" onblur="registerCheckFormValue(5)"/><span class="alertMSG" id="P_PASSWORD_RE_MSG"></span></td></tr>';
	contentHtml += '<tr><td align="right">'+ UI.YouXiangDiZhi +': </td><td><input id="U_EMAIL"  name="U_EMAIL" type="text" onblur="registerCheckFormValue(6)"/><span class="alertMSG" id="U_EMAIL_MSG">'+ UI.ZhuCe05 +'</span></td></tr>';
	contentHtml += '<tr><td align="right">'+ UI.SiRenWenTi +': </td><td><input id="SAFE_Q1"  name="SAFE_Q1" type="text" onblur="registerCheckFormValue(7)"/><span class="alertMSG" id="SAFE_Q1_MSG"></span></td></tr>';
	contentHtml += '<tr><td align="right">'+ UI.SiRenDaAn +': </td><td><input id="SAFE_A1"  name="SAFE_A1" type="text" onblur="registerCheckFormValue(8)"/><span class="alertMSG" id="SAFE_A1_MSG"></span></td></tr>';
	contentHtml += '</table>';
	contentHtml += '<h4>'+ UI.LianXiXinXi +'</h4><div class="hrLine01"></div>';
	contentHtml += '<table style="width:100%;">';
	contentHtml += '<tr><td align="right" width="150">'+ UI.ZhenShiXingMing +': </td><td><input id="U_XM" name="U_XM" type="text" onblur="registerCheckFormValue(9)"/><span  class="alertMSG" id="U_XM_MSG">'+ UI.ZhuCe06 +'</span></td></tr>';
	contentHtml += '<tr><td align="right">'+ UI.NiCheng +': </td><td><input id="U_NICKNAME" name="U_NICKNAME" type="text" onblur="registerCheckFormValue(10)"/><span class="alertMSG" id="U_NICKNAME_MSG"></span></td></tr>';
	contentHtml += '<tr><td align="right" width="150">出生日期: </td><td><select id="birYear" onchange="birthdayClass.getDayList();registerCheckFormValue(11)"></select>-<select id="birMon" onchange="birthdayClass.getDayList()"></select>-<select id="birDay"></select><span class="alertMSG" id="U_BIRTHDAY_MSG"></span></td></tr>';
	contentHtml += '<tr><td align="right">'+ UI.LianXiDianHua +': </td><td><input id="U_TEL"  name="U_TEL" type="text" onblur="registerCheckFormValue(12)"/><span class="alertMSG" id="U_TEL_MSG"></span></td></tr>';
	contentHtml += '<tr><td align="right">'+ UI.SuoZaiGuoJia +': </td><td>';
	contentHtml += '<select id="U_COUNTRY"  name="U_COUNTRY" >';
	for( id in countryLis ){
	 if( countryLis[id] == '中国' ) contentHtml += '<option value="'+ countryLis[id] +'" selected="selected" >'+ countryLis[id] +'</option>';
	 else  contentHtml += '<option value="'+ countryLis[id] +'">'+ countryLis[id] +'</option>';
	}
	contentHtml += '</select>';
	contentHtml += '</td></tr>';
	contentHtml += '<tr><td align="right">'+ UI.ShengShiQu +': </td><td><input id="U_CITY"  name="U_CITY" type="text" onblur="registerCheckFormValue(14)"/><span class="alertMSG" id="U_CITY_MSG"></span></td></tr>';
	contentHtml += '<tr><td align="right">'+ UI.DiZhi +': </td><td><input id="U_ADDRESS"  name="U_ADDRESS" type="text" onblur="registerCheckFormValue(15)"/><span class="alertMSG" id="U_ADDRESS_MSG"></span></td></tr>';
	contentHtml += '<tr><td align="right">'+ UI.YouZhengBianMa +': </td><td><input id="U_ZIP_CODE"  name="U_ZIP_CODE" type="text" onblur="registerCheckFormValue(16)"/><span class="alertMSG" id="U_ZIP_CODE_MSG"></span></td></tr>';
	contentHtml += '</table>';
	contentHtml += '<h4>'+ UI.YanZhengJiXieYi +'</h4><div class="hrLine01"></div>';
	contentHtml += '<table style="width:100%;" id="couponListTable" style="display:none">';
	contentHtml += '<tr><td align="right" width="150px" id="couponListTr">体验币: </td><td><lable><input id="is_experience" name="is_experience" type="radio" value="1" style="width:20px; height:14px"/>领取1000体验币</lable><br/><lable><input id="is_experience" name="is_experience" type="radio" value="0" checked="checked"  style="width:20px; height:14px"/>不需要</lable><br/><span class="alertMSG">体验币只作试玩使用，体验币及其投注所产生的金额不可提取</span></td></tr>';
	contentHtml += '<tr><td align="right" width="150">'+ UI.YanZhengMa +': </td><td><input id="FORM_CODE"  name="FORM_CODE" type="text" onblur="registerCheckFormValue(17)"/><img src="'+ getCookie( 'phprpcUrl' ) +'/phprpcClass/code.php?bgColor=E6E6E6&fontColor=006600&uid='+ getCookie( 'uid' ) +'" align="absmiddle" id="form_code_img" style="cursor:pointer; margin-left:5px" onclick="shuaxincodeImg(\'form_code_img\',\'E6E6E6\',\'006600\')" title="'+ UI.ShuaXinYanZhengMa +'" /><span class="alertMSG" id="FORM_CODE_MSG"></span></td></tr>';
	contentHtml += '<tr><td align="right"></td><td><lable><input id="agreeBox" name="agreeBox" type="checkbox"/> '+ UI.ZhuCe07 +'<a  href="javascript:void(0)" onclick="openWindow( \'index2.php?tabID=1\' )"> '+ UI.ZhuCe08 +'</a></lable><span class="alertMSG" id="agreeBox_MSG"></span>></td></tr>';
	contentHtml += '</table>';
	contentHtml += '</form></div>';
	return contentHtml;
}

//找回密码
function getZhaoHuiMiMaForm(){
	
	var contentHtml = '<div id="joinForm"><form>';
	contentHtml += '<h4>'+ UI.ZhaoHuiMiMa01 +'</h4><div class="hrLine01"></div>';
	contentHtml += '<table style="width:100%;">';
	contentHtml += '<tr><td align="right" width="220">'+ UI.ZhangHuMingCheng +': </td><td><input id="getPassWord_u_name" name="getPassWord_u_name" type="text"/>';
	contentHtml += '<a href="javascript:void(0)" onclick="getSafeQuestion()">'+ UI.XianShiSiRenWenTi +'</a></td></tr>';
	contentHtml += '<tr><td align="right">'+ UI.SiRenWenTi +': </td><td><input id="getPassWord_safe_q1" name="getPassWord_safe_q1" type="text" disabled="disabled"/></td></tr>';
	contentHtml += '<tr><td align="right">'+ UI.SiRenDaAn +': </td><td><input id="getPassWord_safe_a1" name="getPassWord_safe_a1" type="text"/></td></tr>';
	contentHtml += '<tr><td align="right">'+ UI.ZhaoHuiMiMa02 +': </td><td><input id="getPassWord_u_email" name="getPassWord_u_email" type="text" disabled="disabled"/></td></tr>';
	contentHtml += '</table>';
	contentHtml += '</form></div>';
	return contentHtml;
}

//账户激活，绑定银行账户
function getActivateUserForm(){
	
	var contentHtml = '<div id="joinForm"><form>';
	var POST = {'activateCode':getCookie('activateCode')};
	publicOBJ.userClient.getActivateData( POST, function ( result, args, output, warning ){
		if( output ) alert(output);
		if( parseInt(result.u_on_off) != -1 ){
			return;
			contentHtml += '<h4>谢谢您的支持，您的账户已经激活过！</h4>';
			contentHtml += '</form></div>';
		}else{
			contentHtml += '<h4>請输入用於提款的銀行帳戶</h4><div class="hrLine01"></div>';
			contentHtml += '<table style="width:100%;">';
			contentHtml += '<tr><td align="right" width="220">銀行名稱: </td><td>'+ result['bankCodeList'] +'</td></tr>';						
			contentHtml += '<tr><td align="right">所在城市: </td><td>'+ initChinaCity( 'activate_province', 'activate_city' ) +'<td></td></tr>';	
			contentHtml += '<tr><td align="right">开户支行: </td><td><input id="activate_bank_addr" type="text"/></td></tr>';
			contentHtml += '<tr><td align="right">帳戶姓名: </td><td><input id="activate_bank_pers" type="text" readonly="readonly" value="'+ result['u_xm'] +'"/></td></tr>';
			contentHtml += '<tr><td align="right">銀行帳號: </td><td><input id="activate_bank_no" type="text"/></td></tr>';
			contentHtml += '</table>';
		}
		contentHtml += '</form></div>';
		alertBox( 6, contentHtml, 'activateUser()' );
		
	}, true);
}

//手机投注
function getMobileForm(){
	
	var contentHtml = '<object id="FlashID" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="700" height="600"><param name="movie" value="./style/flash/mobile.swf" /><param name="quality" value="high" /><param name="wmode" value="opaque" /><param name="swfversion" value="8.0.35.0" /><param name="expressinstall" value="/Scripts/expressInstall.swf" /><object type="application/x-shockwave-flash" data="./style/flash/mobile.swf" width="700" height="600"><param name="quality" value="high" /><param name="wmode" value="opaque" /><param name="swfversion" value="8.0.35.0" /><param name="expressinstall" value="/Scripts/expressInstall.swf" /><div></div></object></object>';
	return contentHtml;
}

//弹出遮罩层窗口
function alertBox( boxType, contentHtml, btFunction ){
	
	var closeButton = 1;
	var backButton = 1;
	var marginBox = 1;
	closeAlertBox();
	
	if( boxType == 1 ){//注册
		liteWidth = 600;
		liteHeight = 650;
		titleStr = UI.ZhuCe01;
		contentHtml = getRegisterForm();
	}else if( boxType == 2 ){//找回密码
		liteWidth = 600;
		liteHeight = 300;
		titleStr = UI.ZhaoHuiMiMa;	
		contentHtml = getZhaoHuiMiMaForm();		
	}else if( boxType == 3 ){//系统维护
		closeButton = 0;
		backButton = 0;
		liteWidth = 400;
		liteHeight = 255;
		titleStr = UI.XiTongTiShiXinXi;
	}else if( boxType == 4 ){//手机投注宣传窗口
		marginBox = 0;
		backButton = 0;
		liteWidth = 702;
		liteHeight = 600;
		titleStr = '手机投注';
		contentHtml = getMobileForm();	
	}else if( boxType == 5 ){//数据装载等待窗口
		liteWidth = 250;
		liteHeight = 50;
		titleStr = UI.XiTongTiShiXinXi;	
		contentHtml = getActivateUserForm();
	}else if(  boxType == 6 ){
		liteWidth = 600;
		liteHeight = 400;
		titleStr = '帳戶激活 綁定帳戶銀行';	
	}else{
		liteWidth = 250;
		liteHeight = 50;
		titleStr = UI.XiTongTiShiXinXi;	
	}
	
	marginLeft=-liteWidth/2;
	marginTop=-liteHeight/2+$(window).scrollTop();
	
	//遮罩层
	liteOverlay="<div id='alertOverlay'><div id='liteloading'></div></div>";
	
	//弹出框标题
	var windowTitle = '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td id="td1"></td><td id="td2">'+ titleStr +'</td>';
	if( closeButton == 1 ) windowTitle += '<td id="alertCloseBlack" onClick="closeAlertBox()"></td>';
	windowTitle += '<td id="td3"></td></tr></table>';
				
	//按钮
	contentHtml += '<div id="btBox" class="buttonBox">';
	//确定按钮
	if( btFunction ) contentHtml += '<input type="button" class="buton15" value="'+ UI.QueDing +'" onClick="'+ btFunction +'">';
	//关闭按钮
	if( backButton == 1 ) contentHtml += '<input type="button" class="buton15" value="'+ UI.FanHui +'" onClick="closeAlertBox()">';
	contentHtml += '</div>';
	
	//内容
	if( marginBox == 1 )  contentHtml = '<div class="miniWindowBox">'+ contentHtml +'</div>'; 
	contentHtml = '<div id="contenBox">'+ contentHtml +'</div>'; 
		
	var windowContent = "<div id='alertBox' style='width:"+liteWidth+"px;margin-left:"+marginLeft+"px;margin-top:"+marginTop+"px;width:"+(liteWidth)+"px;'>";
	windowContent += windowTitle;
	windowContent += contentHtml;
	windowContent += '</div>';
	
	$("body").append(liteOverlay);
	$("body").append(windowContent);
	
	
	$("#liteloading").remove();
	$("#alertBox").show();
	$("#liteFrame").contents().find("#alertClose").click(function(){
		$("#alertOverlay").remove();
		$("#alertBox").remove()
	})
	
	if( boxType == 1 ) birthdayClass = new dateSelect( 'birYear', 'birMon', 'birDay', 100, 0 );
	
}

//关闭遮罩层
function closeAlertBox(){
	$("#alertOverlay").remove();
	$("#alertBox").remove()
}

//打开在线咨询窗口
function openConsultingWindow(){
	post = './Consulting/chatForm.php';
	window.open( post, "", "width=600, height=467 top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no'");
}

//打开关于我们窗口
function openWindow( url ){
	post = './ABOUT/'+ url ;
	window.open( post, "", "width=1024, height=700 top=0, left=0, resizable=yes, scrollbars=yes");
}


//是否包含中文字符
function isChinaStr(s){    
    var patrn=/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;    
    if(!patrn.exec(s)){    
    	return false;    
    }else{    
    	return true;    
    }    
} 


//验证EMAIL
function ismail(mail){ 
	return( new RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(mail)); 
} 


//设置右边DIV位置
function setRightFixedDivPos(){
	
	var mainTableTop = $("#mainMiddleBox").offset().top;
	var scrolltop = $(window).scrollTop();
	if( scrolltop < mainTableTop ){
		offsetTop = mainTableTop + "px";
	}else{
		offsetTop = "0px";
	}
	//console.log(scrolltop+'#'+mainTableTop+'#'+offsetTop);
	$("#rightFixedDiv").animate({'top' : offsetTop },{ 'duration': 600, 'queue': false });
	
}


//得到优惠说明
function getPromotionDescription( selfOBJ ){
	
	post = {'uid': getCookie('uid'),'lang': getCookie('lang'),'id': selfOBJ.value}
	if( post.id == '' ) return;
	publicOBJ.userClient.getPromotionDescription( post, function ( result, args, output, warning ) {
		if( !confirm( result ) ) selfOBJ.value = '';
	}, true);
	
}


//129下拉菜单
function createSelectObject129(){

    var obj = new Object();
	obj.createList = function( parentObjectName, ObjectName, selectBoxWidth, listObj ){
		
		this.html = [];
		var listHtml = [ '<dd><ul>' ];
		var currHtml = [];
		for( id in listObj ){
			if( typeof( listObj[id] ) == 'undefined' ) continue;
			var row = listObj[id];
			listHtml.push( '<li><a href="javascript:void(0)">'+ row['txt'] )
			if( typeof( row['img'] ) != 'undefined' ) listHtml.push( '<img class="flag" src="./UI/129/'+ row['img'] +'" alt=""/>' );
			listHtml.push( '<span class="value">'+ row['value'] +'</span></a></li>' );
			
			//默认
			if( row['isCurr'] == 1 ){
				currHtml .push( '<dt><a href="javascript:void(0)"><div>'+ row['txt'] );
				if(  typeof( row['img'] ) != 'undefined' ) currHtml.push( '<img class="flag" src="./UI/129/'+ row['img'] +'" alt=""/>' );
				currHtml.push( '</div></a></dt>' );
			}
			
		}
		this.html.push( '<dl id="'+ ObjectName +'" class="dropdown">' );
		this.html.push( currHtml.join('') );
		this.html.push( listHtml.join('') );
		this.html.push( '</ul></dd></dl>' );
		$( '#'+parentObjectName ).html( this.html.join('') );
		
		//改变长度
		$( '#'+ObjectName+' dt a' ).width( selectBoxWidth + 'px' );
		$( '#'+ObjectName+' dt a div' ).width( selectBoxWidth + 'px ');
		$( '#'+ObjectName+' dd ul' ).width((selectBoxWidth+20) + 'px ');
		
		//
		$( '#'+ ObjectName +' .flag').addClass('flagvisibility');
		$( '#'+ ObjectName +' dt a').click(function() {
			$( '#'+ ObjectName +' dd ul').toggle();
		});
		
		$( '#'+ ObjectName +' dd ul li a').click(function() {
			var text = $(this).html();
			$( '#'+ ObjectName +' dt a div').html(text);
			$( '#'+ ObjectName +' dd ul').hide();
			//alert( getSelectedValue(ObjectName) );
			/*定义改变后的操作*/
			//$('#result').html('Selected value is: ' + getSelectedValue(ObjectName));
			
			onChangeList( ObjectName, getSelectedValue(ObjectName) );
		});
		
		function getSelectedValue(id) {
			return $("#" + id).find("dt a span.value").html();
		}
		
		$(document).bind('click', function(e) {
			var $clicked = $(e.target);
			if (! $clicked.parents().hasClass("dropdown"))
			$( '#'+ ObjectName +' dd ul').hide();
		});
		
		
		$( '#'+ ObjectName +' #flagSwitcher').click(function() {
			$( '#'+ ObjectName +' img.flag').toggleClass('flagvisibility');
			
		});

		
	}
	
	return obj;
}




//用户输入框得到焦点
function textOnfocusUserName(){
	if( $b( 'strUserName' ).value == UI.ZhangHu ) $b( 'strUserName' ).value = '';
}

//用户输入框失去焦点
function textOnblurUserName(){
	if( $b( 'strUserName' ).value == '' ) $b( 'strUserName' ).value = UI.ZhangHu;
}

//密码输入框得到焦点
function textOnfocusUserPassword(){
	$( '#strUserPasswordBox' ).show();
	$( '#tmpUserPasswordBox' ).hide();
	$b( 'strUserPassword' ).focus();
}

//密码输入框失去焦点
function textOnblurUserPassword(){
	if( $b( 'strUserPassword' ).value != '' ) return;
	$( '#strUserPasswordBox' ).hide();
	$( '#tmpUserPasswordBox' ).show();
}

//验证码输入框得到焦点
function textOnfocusLoginCode(){
	if( $b( 'intLoginCode' ).value == UI.YanZhengMa ) $b( 'intLoginCode' ).value = '';
}

//验证码输入框失去焦点
function textOnblurLoginCode(){
	if( $b( 'intLoginCode' ).value == '' ) $b( 'intLoginCode' ).value = UI.YanZhengMa;
}


//@非数字禁止输入
function CheckKey(e){   
	var theEvent = window.event || e;  
	var code = theEvent.keyCode || theEvent.which;  
	//alert(code);
	if(( code < 48 || code > 57 ) && code != 13 && code != 8 ) return false;
}

function countObjLength( obj ){
	if( typeof(obj) == 'string' ){
		return obj.length;
	}else if( typeof(obj) == 'object' ){
		var n = 0;
		for( var id in obj){
			n++;
		}
		return n;
	}
}


//删除数据成员
function deleteArrMember( arr, member ){
	
	var newArr = [];
	for( var id in arr ){
		if( arr[id] == member ) continue;
		newArr.push(arr[id]);
	}
	
	return newArr;
}

//判断数组中是否包含某个值
function inArr( value, arr ){

    for( var id in arr )if( arr[id] == value ) return true;
    return false;

}

//合并数组并去重
function mergerArr( obj ){

    var tempArr = [];
    for( var id in obj ) tempArr = tempArr.concat( obj[id] );

    var resultArr = [];
    for( var id in tempArr ){
         if( !inArr( tempArr[id], resultArr ) )  resultArr.push( tempArr[id] );
    }
     return resultArr;

}

//图片轮播
function initPicPlayer( picObj, picBoxID, w, h ) {
	
	//选中的图片 
	var selectedItem; 
	//选中的按钮 
	var selectedBtn; 
	//自动播放的id 
	var playID; 
	//选中图片的索引 
	var selectedIndex; 
	
	//容器
	var p = $('#'+picBoxID); 
	p.text(''); 
	p.append('<div id="'+ picBoxID +'Piccontent"></div>'); 
	var c = $('#'+ picBoxID +'Piccontent'); 
	for(var i=0;i<picObj.length;i++) { 
		//添加图片到容器中 
		c.append('<a href="'+picObj[i].link+'" target="_blank"><img id="'+ picBoxID +'Picitem'+i+'" style="display: none;z-index:'+i+'" src="'+picObj[i].url+'" /></a>'); 
	} 
	//按钮容器，绝对定位在右下角 
	p.append('<div id="'+ picBoxID +'PicbtnHolder" style="position:absolute;top:'+(h-25)+'px;width:'+w+'px;height:20px;z-index:10000;"></div>'); 
	// 
	var btnHolder = $('#'+ picBoxID +'PicbtnHolder'); 
	btnHolder.append('<div id="'+ picBoxID +'Picbtns" style="float:right; padding-right:1px;"></div>'); 
	var btns = $('#'+ picBoxID +'Picbtns'); 
	// 
	for(var i=0;i<picObj.length;i++){ 
		//增加图片对应的按钮 
		btns.append('<span id="'+ picBoxID +'Picbtn'+i+'" style="cursor:pointer; border:solid 1px #ccc;background-color:#eee; display:inline-block;"> '+(i+1)+' </span> '); 
		$('#'+ picBoxID +'Picbtn'+i).data('index',i); 
		$('#'+ picBoxID +'Picbtn'+i).click( 
			function(event){ 
				if(selectedItem.attr('src') == $('#'+ picBoxID +'Picitem'+$(this).data('index')).attr('src')) return; 
				setSelectedItem($(this).data('index')); 
			} 
		); 
	} 
	btns.append(' '); 
	/// 
	setSelectedItem(0); 
	//显示指定的图片index 
	
	function setSelectedItem(index){ 
		selectedIndex = index; 
		clearInterval(playID);
		//alert(index); 
		if(selectedItem)selectedItem.fadeOut('fast'); 
		selectedItem = $('#'+ picBoxID +'Picitem'+index); 
		selectedItem.fadeIn('slow'); 
		// 
		if(selectedBtn) { 
			selectedBtn.css('backgroundColor','#eee'); 
			selectedBtn.css('color','#000'); 
		} 
		selectedBtn = $('#'+ picBoxID +'Picbtn'+index); 
		selectedBtn.css('backgroundColor','#000'); 
		selectedBtn.css('color','#fff'); 
		//自动播放 
		playID = setInterval(function(){ 
			var index = selectedIndex+1; 
			if(index > picObj.length-1)index=0; 
			setSelectedItem(index); 
		},picObj[index].time); 
	} 
}

//iframe 自动适应高度
function iframeAutoFit( iframeOBJ ){ 
	
	iframeOBJ.height = $(document).height()-$("#mainMiddleBox").offset().top-8;
	//iframeObj.height=(iframeObj.Document?iframeObj.Document.body.scrollHeight:iframeObj.contentDocument.body.offsetHeight); 
}

var lineTab = function( ulID, liOBJ, currli ){
	
	this.ul = $(ulID);
	this.createTab = function(){
		var html = [];
		for( var id in liOBJ ){
			html.push( '<li name="'+ liOBJ[id]['name'] +'">'+ liOBJ[id]['name'] +'</li>' );
		}
		this.ul.html(html.join(''));
		$( ulID +' li' ).click( function(){
			this.className = 'activ';
			
		});
	}	
	
}



