define(function(require,exports,module){
	
	var dialongTimer;
	var tellReg=/^(\+86|0086)?\s*1[34578]\d{9}$/; //手机正则
	var smsTime=60;
	var smsTimer=null;
	
	
	
	//页面初始化类
	var publicOBJ = {
		
		userClient: new PHPRPC_Client( 'http://118.184.23.233/memberRPC/phprpcClass/UserData.class.php', ['linkMasterServer','topGetUserData','getNews','checkUserName','checkUserMail','checkUserPhone','user_register'] )
		
	};
	
	exports.isConsole=function(value){
		var search=window.location.search;
		if(search.indexOf("?t")!=-1){
			//ie 7 不支持 console.log 会报错
			if(!window.console){window.console={};window.console["log"]=function(){}}
			
			console.log(value)
		}
	}
	
	function dialong(obj,functionName,closeFn){
		/*
		var obj={
			
			title:'你好',
			html:'哈哈哈哈我勒个去 你说啊 嗯嗯嗯',
			btn:["确定",'取消'],
			autonone:2000
			
		}
		 	functionName 点击按钮之后的回调函数
		 	closeFn 点击关闭按钮之后的回调函数
		*/
		
		
		var fadeInTime=100;
		
		clearTimeout(dialongTimer);
		
		$(document).find("body").children(".dialong").remove();
		$("body").append("<div class='dialong'></div>");
		
		var str="<div class='dialong_zhezhao'></div><div class='dialong_box'>"
					+'{{if title}}<div class="dialong_header">{{title}}<div class="close_alert_box"></div></div>{{/if}}'
					+'<div class="dialong_content">{{if autonone}}<div class="close_alert_box"></div> {{/if}} {{#html}}</div>'
					+'{{if btn}}<div class="dialong_footer">'
						+'{{each btn as value i}}'
							+'<input type=button value={{value}} class="dialong_footer_{{i}}" >'
						+'{{/each}}'
					+'</div>{{/if}}'
				+"</div>";
				
		var render=template.compile(str);
		var html=render(obj);
		
		
		$(".dialong").html(html).fadeIn(fadeInTime);
		var h=$('.dialong_box').height();
		var w=$('.dialong_box').width();
		$(".dialong_box").css({marginTop:-h/2+'px',marginLeft:-w/2+'px'})
		
		$(".dialong_box").on("click",".close_alert_box,input[type=button]",function(){
			$(".dialong").fadeOut(fadeInTime,function(){$(this).remove();})
		})
		
		if(functionName){
			$(".dialong_footer").on("click","input[type=button]",functionName)
		}
		if(closeFn){
			$(".dialong_box").on("click",".close_alert_box",closeFn)
		}
		
		if(obj.autonone){
			dialongTimer=setTimeout(function(){
				$(".dialong").fadeOut(fadeInTime,function(){$(this).remove();closeFn&& closeFn()});
			},obj.autonone)
			
			$(".dialong_box").on("mouseover",function(){
				clearTimeout(dialongTimer);
			}).on("mouseout",function(){
				dialongTimer=setTimeout(function(){
					$(".dialong").fadeOut(fadeInTime,function(){$(this).remove();});
				},obj.autonone)
			})
			
			$(".close_alert_box").on("click",function(){
				clearTimeout(dialongTimer);
				$(".dialong").fadeOut(20);
			})
			
		}
		
	}
	
	
	
	
	function init(){
		var bool=isMobile();
		if(bool){return false;}
		getPHPRPcurl();
		getUserData();
		lang();
	}
	
	function setCookie(name,value){
		name=name.replace(/^\s|\s$/ig,'');
		
		document.cookie=name+"="+escape(value);
	}
	function getCookie(name){
		var arrstr=document.cookie.split(";");
		
		for(var i=0;i<arrstr.length;i++){
			arrstr[i]=arrstr[i].replace(/^\s|\s$/ig,"");
			
			var arr=arrstr[i].split("=");
			if(arr[0]==name ){
				return unescape(arr[1]);
			}
	
		}
	}
	
	
	//检测是否为移动端
	function isMobile(){
		var device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|operi mini/i.test(navigator.userAgent.toLowerCase()));
		//跳转语句
		if( !device ){
			//电脑设备
			return false;
		}else{
			//非电脑设备
			window.location.href="http://118.184.23.233/m";	
			return true;
		}
	}
	
	function getPHPRPcurl(){		
		var sysClient = new PHPRPC_Client( 'http://118.184.23.233/ihbet/phprpcClass/index.class.php', ['getMasterStatus'] );	
		//获取系统状态,得到部署变量
		var post={};
		exports["isConsole"](post);
		sysClient.getMasterStatus( post, function ( result, args, output, warning ) {
			exports["isConsole"](result);
			
			if( output ) alert(output);
			var d = new Date();
			var mcTime = Math.round( parseInt(result.masterTime) - d.getTime()*0.001 ) * 1000; //客户段与主服务器端的时间差
			setCookie( 'mcTime',  parseInt(mcTime) );//从服务器与主服务器的时间差
			setCookie( 'msTime',  parseInt(result.msTime) );//从服务器与主服务器的时间差
			setCookie( 'phprpcUrl', result.phprpcUrl );
			
			if(!result){
				
				dialong({
					title:'友情提示',
					html:"系統維護中，請稍後再試！<br>System maintenance. Please try again later!"
					
				})
			
			}else{				
				//维护
				switch( parseInt( result.upFlag ) ){
					case 0:						
						break;
					default:
						upWindow( result.upFlag, result.upMsg );
						break
				}
			}
		}, true);
	}
	
	//维护
	function upWindow( upFlag, upMsg ){
		
		switch( upFlag ){
			case -1:
				dialong({
					title:'友情提示',
					html:"系統維護中，請稍後再試！<br>System maintenance. Please try again later!"
					
				})
				break;
			case 1:
				if( getCookie('account_type') == 'cp' )return;
				dialong({
					title:'友情提示',
					html:upMsg+'\n\n您可以进入快乐彩或娱乐场继续投注\n\n更多是游戏项目等着你喔！',
					btn:["确定","取消"]
					
				},function(){
					if($(this).index()==0){
						window.location.href = "./lottery.php";
					}
				})
				
				break;
			case 2:
				if( getCookie('account_type') == 'dq' )return;
				dialong({
					title:'友情提示',
					html:upMsg+'\n\n您可以进入汇博体育场或娱乐场继续投注\n\n更多是游戏项目等着你喔！',
					btn:["确定","取消"]
					
				},function(){
					if($(this).index()==0){
						window.location.href = "./sport.php";
					}
				})
				
				break;		
		}	
	}
	
	
	
	//账户信息
	function getUserData(){
		
		if( !getCookie('uid') ){
			loginOut();
			return;
		}
		var post={'uid':getCookie('uid'),'account_type':getCookie('account_type')};

		exports["isConsole"](post);

		publicOBJ.userClient.topGetUserData( post, function ( result, args, output, warning ){
			
			exports["isConsole"](result);
			
			if( !parseInt(result['flagID']) || parseInt(result['flagID']) == 8888){
				
				if( $(".loginBtn").length ){
					$(".loginBtn").removeAttr("disabled").val("登录");
				}
				dialong({
					autonone:3000,
					html:'服务器连接异常,请稍后再试'
				})
				loginOut();
				return false;
			}
			var arr = [ '<div class="userLink"><span>你好!&nbsp;'+ result['userName']+'</span>&nbsp;&nbsp;' ];
			if( getCookie('account_type') ) arr.push( '<a href="javascript:void(0)" class="shuaxinMoneyLink" title="刷新金额">¥ '+result['userMoney'] + '</a><span>|</span>' );
			arr.push( '<a href="./ABOUT/index.php?tabID=0" target="blank">账户</a><span>|</span><a href="about.php">资讯</a><span>|</span><a href="#" class="loginOut">登出</a></div>' );
			$('.login_box').html( arr.join('') );
			
			$('.login_box .loginOut').click( function () {				
				loginOut();
			});			
			$('.login_box .shuaxinMoneyLink').click( function () {
				getUserData();
			});										
		}, true);		
	}
		
	
	var createHtml={
		zhuce:''
			+'<div class="windowBox_titleBox top_box_border_bottom_color"><div class="title_text title_text_color left">注册账号</div><div class="close_windowBox right"></div></div>'
			+'<div class="windowBox_content">'
				+'<table cellspacing=0 cellpadding=0 ><tbody>'
					+'<tr><td class="titleTD" width="80px">账户名:</td><td width="180px"><input id="join_u_name" name="join_u_name" type="text" autocomplete="off"></td><td width="180px" id="join_u_name_msg"></td></tr>'
					+'<tr><td class="titleTD">登录密码:</td><td><input id="join_u_password" name="join_u_password" type="password" autocomplete="off"></td><td id="join_u_password_msg"></td></tr>'
					+'<tr><td class="titleTD">确认密码:</td><td><input id="join_u_password_re" name="join_u_password_re" type="password" autocomplete="off"></td><td id="join_u_password_re_msg" class="msgTD"></td></tr>'
					+'<tr><td class="titleTD">手机(大陆):</td><td><input id="join_u_email" name="join_u_email" type="text" autocomplete="off"></td><td id="join_u_email_msg"></td></tr>'
					
					+'<tr><td class="titleTD">验证码:</td><td><input id="join_loginCode" name="join_loginCode" type="text" autocomplete="off"><input type="button" value="发送验证码" class="yanzhengma" title="点击发送验证码"></td><td id="join_loginCode_msg"></td></tr>'
					+'<tr><td class="titleTD"></td><td><input class="mainBtn01" id="joinForm" type="button" value="立即注册"></td><td>&nbsp;</td></tr>'
					+'<tr><td class="titleTD"></td><td colspan="2" class="infoText">点击"立即注册",即表示您同意并愿意遵守<a href="about.php?tab=1" target="_blank">用户协议和隐私条款</a></td></tr>'
				+'</tbody></table>'
			+'</div>',
		
		login_box:''
			+'<ul class="right clearfix">'
				+'<li class="login-user left">'
					+'<input autocomplete="off" type="text" id="u_name" name="u_name" placeholder="账户名">'
				+'</li>'
				+'<li class="login-pwd left">'
					+'<input type="password" id="u_password" placeholder="密码" name="u_password" class="left">'
					+'<div class="getPassword right" id="getPassword">?</div>'
				+'</li>'
				+'<li class="login-btn left">'
					+'<input type="button" value="登录" class="loginBtn denglu">'
				+'</li>'
				
				+'<li class="login-btn left">'
					+'<input type="button" value="注册" class="joinBtn zhuce">'
				+'</li>'
				
			+'</ul>',
		getPassword:''
			+'<div class="windowBox_titleBox top_box_border_bottom_color"><div class="title_text title_text_color left">找回密码</div><div class="close_windowBox right"></div></div>'
			+'<div class="windowBox_content">'
				+'<table cellspacing=0 cellpadding=0><tbody>'
					+'<tr><td class="titleTD" width="80px">账户名:</td><td width="180px"><input id="gpw_u_name" name="gpw_u_name" type="text" autocomplete="off"></td><td width="180px" id="join_u_name_msg"></td></tr>'
					+'<tr><td class="titleTD">手机号:</td><td><input id="gpw_u_email" name="gpw_u_email" type="text" autocomplete="off"></td><td id="join_u_email_msg"></td></tr>'
					+'<tr><td class="titleTD">验证码:</td><td><input id="gpw_loginCode" name="gpw_loginCode" type="text" autocomplete="off"><input type="button"  value="发送验证码"  class="yanzhengma" title="点击发送验证码"></td><td id="gpw_loginCode_msg">&nbsp;</td></tr>'
					+'<tr><td class="titleTD"></td><td><input class="mainBtn01" id="getPasswordForm" type="button" value="找回密码"></td><td>&nbsp;</td></tr>'
				+'</tbody></table>'
			+'</div>'		
	}
	
	//退出登录
	function loginOut(){
		
		setCookie( 'uid', '' );
		var render=template.compile(createHtml["login_box"]);
		var html=render();
		$('.login_box').html( html);
		
	}
	//生成语言
	function lang(){
		var langs={
			china:'简体',
			english:'英文'
		}
		var currentLang=getCookie("currentLang");
		currentLang?'':setCookie("currentLang","china");
		
		currentLang=getCookie("currentLang");

		$(".current_lang_text").html( langs[currentLang] );
		$(".current_lang_pink").addClass( currentLang );
		for(var key in langs){
			if(key==currentLang){
				continue;
			}
			
			$(".lang_choose_sub").append("<li data-lang="+key+">"+langs[key]+"<span class='current_lang_pink "+key+"'></span></li>");
		}
	}
	
	//点击右侧登录按钮
	$(document).on("click",".top_sub_right .loginBtn",function(){ 
		denglu();
	})
	$(document).on("keyup","#u_name,#u_password",function(e){
		if(e.keyCode==13){ //回车键
			denglu();
		}
	})
	function denglu(){
		var pwd=$("#u_password").val();
		var name=$("#u_name").val();
		if( !pwd || !name){
			dialong({
				autonone:3000,
				html:'亲,用户名或密码不能为空哦'
			})
			
			return false;
		}
		var POST = {
			'loginHost': getCookie('loginHost'),
			'updateID':		1000,
			'u_name': 		name,
			'u_password': 	pwd,
			//'loginCode': 	$('#loginCode').val(),
			'st': getCookie('st')
		}
		$(".top_sub_right .loginBtn").attr("disabled",true).val("提交中...");
		exports["isConsole"](POST);
		publicOBJ.userClient.linkMasterServer( POST, function ( result, args, output, warning ){
			$(".loginBtn").removeAttr("disabled").val("登录");			
			if( output ) { window.clipboardData.setData('text', output); }

			exports["isConsole"](result);
			
			switch( parseInt( result.flagID ) ){
				case 7777:
						setCookie( 'uid', result['uid'] );
						//location = './';
						getUserData(); //更新账户信息

				break;
				case 10151:
						
						dialong({
							autonone:3000,
							html:'账户密码错误!'
						})
						//appendloginAlertInfo(timer,str);
				break;
				case 10152:
						//alerts('<div class="login_error_info">验证码错误！</div>','close_login_error_info');
				break;
				case 10153:
						//var str="账户未激活, 请登录注册时所使用邮箱激活!";
						//appendloginAlertInfo(timer,str);
						dialong({
							autonone:3000,
							html:"账户未激活, 请登录注册时所使用邮箱激活!"
						})
				break;
				default:
						
						dialong({
							autonone:3000,
							html:"服务器连接异常,请稍后再试"
						})
						//appendloginAlertInfo(timer,str);
				break;
			}
			
		}, true);
	}
	
	
	//点击右侧注册按钮
	$(document).on("click",".joinBtn",function(){
		
		$(".alertOverlay,.windowBox").show();	
		var render=template.compile(createHtml["zhuce"]);
		var html=render();
		$(".windowBox").html(html);

		//监听账户名
		$('#join_u_name').blur( function(){
			var u_name = $('#join_u_name').val();
			if( u_name == '' || u_name.length < 6 || u_name.length > 20 || isChinaStr( u_name ) ){
				showCheckStatus( '#join_u_name_msg', 1, '由6至20个字母或数字组成' ); return false; 
			}else{
				showCheckStatus( '#join_u_name_msg', 0, '' );
			}
			var post={'u_name':u_name};
			exports["isConsole"](post);
			publicOBJ.userClient.checkUserName(post, function ( result, args, output, warning ){
				
				if( parseInt( result.flagID ) == 10125 ){
					showCheckStatus( '#join_u_name_msg', 1, '很抱歉,账户名已被注册' );
				}else{
					showCheckStatus( '#join_u_name_msg', 0, '' ); 
				}				
			}, true);
		});
		//监听手机
		$('#join_u_email').blur( function(){
			var val=$(this).val();
			$(this).attr("disabled",true);
			phoneBlur(val);
		});
		//监听密码
		$('#join_u_password').blur( function(){
			var u_password = $('#join_u_password').val();
			var u_password_re = $('#join_u_password_re').val();
			if( u_password == '' || u_password.length < 6 || u_password.length > 20 ){
				showCheckStatus( '#join_u_password_msg', 1, '由6至20个字母,数字或符号组成' );
			}else if( u_password_re && ( u_password != u_password_re ) ){
				showCheckStatus( '#join_u_password_re_msg', 1, '两次密码输入不一致,请重新输入!' );
			}else{
				showCheckStatus( '#join_u_password_msg', 0, '' );
			}

			
		});
		//监听确认密码
		$('#join_u_password_re').blur( function(){
			var u_password = $('#join_u_password').val();
			var u_password_re = $('#join_u_password_re').val();
			if(u_password_re == '' || u_password_re.length < 6 || u_password_re.length > 20){
				showCheckStatus( '#join_u_password_re_msg', 1, '由6至20个字母,数字或符号组成' );
				
			}else if( u_password &&  (u_password != u_password_re) ){
			
				//$('#join_u_password').val('');
				//$('#join_u_password_re').val('');
				showCheckStatus( '#join_u_password_re_msg', 1, '两次密码输入不一致,请重新输入!' );
			}else{
				showCheckStatus( '#join_u_password_re_msg', 0, '' );
			}
		});
		//监听验证码
		$('#join_loginCode').blur( function(){
			var loginCode = $('#join_loginCode').val();
			if( !loginCode ){
				showCheckStatus( '#join_loginCode_msg', 1, '请输入验证码!' );
			}else{
				showCheckStatus( '#join_loginCode_msg', 0, '' );
			}
		});


		//监听提交
		$('#joinForm').click( function(){	
			var POST = {
				'loginHost': getCookie('loginHost'),
				'updateID':		1003,
				'u_name': 		$('#join_u_name').val(),
				'u_tel': 	$('#join_u_email').val(),
				'u_password': 	$('#join_u_password').val(),
				'u_password_re': 	$('#join_u_password_re').val(),
				'ver_code': 	$('#join_loginCode').val(),
				'is_experience': $(':radio[name="is_experience"]:checked').val(),
				'st': getCookie('st'),
				'ac': getCookie('ac')
			}
			var _this=$(this);
			if( POST.u_name == '' || POST.u_name.length < 6 || POST.u_name.length > 20 || isChinaStr( POST.u_name ) ){ showCheckStatus( '#join_u_name_msg', 1, '由6至20个字母或数字组成' ); $('#join_u_name').focus(); return false; }			
			if( !tellReg.test(POST.u_tel)){ showCheckStatus( '#join_u_email_msg', 1, '手机格式错误！' ); $('#join_u_email').focus(); return false;}
			if( POST.u_password == '' || POST.u_password.length < 6 || POST.u_password.length > 20 ){ showCheckStatus( '#join_u_password_msg', 1, '由6至20个字母,数字或符号组成' ); $('#join_u_password').focus(); return false; }
			if( POST.u_password != POST.u_password_re ){ showCheckStatus( '#join_u_password_re_msg', 1, '很抱歉，确认密码错误!' ); $('#join_u_password, #join_u_password_re').html(''); $('#join_u_password').focus();return false; }
			if( !POST.ver_code ){ showCheckStatus( '#join_loginCode_msg', 1, '请输入验证码!' ); return false; }
			var bool=false;
			$(".windowBox_content table tbody tr").each(function(){
				if( $(this).index()<4 ){
					var str= $(this).find("td:last span").html();
					if( str ){
						bool=true;
						console.log("禁止注册");
						return false;
					}
				}
			});
			if(bool){return false;}//有信息不正确
			_this.val("提交中...").attr("disabled",true);
			
			console.log(POST);
			$.ajax({
				type:'post',
				url:'http://'+smsUrl+'/sms/check.php',
				data:{result:$('#join_loginCode').val(),phone:POST["u_tel"]},
				dataType:'json',
				success: function(data){
					if( data['status'] == 1 ){
						publicOBJ.userClient.linkMasterServer( POST, function ( result, args, output, warning ){
							console.log(result);
							_this.val("立即注册").attr("disabled",false);
							if( output ) { window.clipboardData.setData('text', output); }
							exports["isConsole"](result);
							switch(  parseInt( result.flagID ) ){
								case 7777:
									$(".close_windowBox").click();
									/*
									var data={
										header:'提示信息',
										content:'恭喜用户名为:'+POST.u_name+'您已经注册成功',
										btn:{
											bet_alert_ok:{text:'确定',fn:'close_bet_alert_box'}
											
										},
										close_btn:{
											clas:'close_bet_alert_box',
											fn:'close_bet_alert_box'
										}
									};
									topAlertFn(data);
									  */
									dialong({
										title:'注册成功!',
										html:'恭喜用户名为:'+POST.u_name+'您已经注册成功',
										btn:["确定"]
									})
								break;
								case 10125:
										showCheckStatus( '#join_u_name_msg', 1, '很抱歉,账户名已被注册' ); 
										return false;
								break;
								case 10126:
										showCheckStatus( '#join_u_email_msg', 1, '很抱歉,手机号已被使用' ); 
										return false;
								break;
								case 10152:
										showCheckStatus( '#join_loginCode_msg', 1, '很抱歉,验证码错误' ); 
										return false;
								break;
								default:
										showCheckStatus( '#join_u_name_msg', 1, '很抱歉，注册失败!' ); 
										
								break;
							}

						}, true);
					}else{						
						showCheckStatus( '#join_loginCode_msg', 1, '验证码错误!' );
						_this.val("立即注册").attr("disabled",false);
					}
				}
			})
			
			
		});



	})
	
	
	//找回密码类	
	$(document).on("click","#getPassword",function(){
		$(".alertOverlay,.windowBox").show();	
		var render=template.compile(createHtml["getPassword"]);
		var html=render();
		$(".windowBox").html(html);
		
		$("#getPasswordForm").off().on("click",function(){
			var POST = {
				'updateID':		996,
				'u_name': 		$('#gpw_u_name').val(),
				'u_tel': 	$('#gpw_u_email').val(),
				'loginCode': 	$('#gpw_loginCode').val(),
				'st': getCookie('st')
			}

			if( POST.u_name == '' || POST.u_name == '账户' ){ $('#gpw_u_name').focus(); return false; }
			if( POST.u_tel == '' || !tellReg.test( POST.u_tel ) ){
				$('#gpw_u_email').focus();
				showCheckStatus( '#join_u_email_msg', 1, '手机格式错误！' ); return false; 
			}else{
				showCheckStatus( '#join_u_email_msg',0,'' );
			}
			if( POST.loginCode == '' || POST.loginCode == '验证码' ){ $('#gpw_loginCode').focus(); return false; }
			$(this).val("提交中...").attr("disabled",true);
			exports["isConsole"](POST);
			
			$.ajax({
				type:'post',
				url:'http://'+smsUrl+'/sms/check.php',
				data:{result:$('#gpw_loginCode').val(),phone:POST["u_tel"]},
				dataType:'json',
				success: function(data){
					exports["isConsole"](data);
					if( data['status'] == 1 ){
												
						publicOBJ.userClient.linkMasterServer( POST, function ( result, args, output, warning ){
							exports["isConsole"](result);
							$("#getPasswordForm").val("找回密码").attr("disabled",false);
							if( output ) { window.clipboardData.setData('text', output); }
							
							switch( parseInt( result.flagID ) ){
								case 7777:
									$(".close_windowBox").click();
									/*
									var data={
										header:'提示信息',
										content:'找回密码成功,新登录、支付密码为&nbsp;111111&nbsp;请尽快修改',
										btn:{
											bet_alert_ok:{text:'确定',fn:'close_bet_alert_box'}
											
										},
										close_btn:{
											clas:'close_bet_alert_box',
											fn:'close_bet_alert_box'
										}
									};
									topAlertFn(data);
									*/
									dialong({
										title:'操作成功',
										html:'找回密码成功,新登录、支付密码为&nbsp;111111&nbsp;请尽快修改',
										btn:["确定"]
									})
								break;
								case 10201:						
									showCheckStatus( '#join_u_name_msg', 1, '很抱歉，你输入的账户名不存在，请重新输入!' );
								break;
								case 10203:
									showCheckStatus( '#join_u_email_msg', 1, '很抱歉，你输入的手机号码有误,请重新输入!' );
								break;
							}
							
						}, true);
						
					}else{
						
						showCheckStatus( '#gpw_loginCode_msg', 1, '验证码错误!' );
						$("#getPasswordForm").val("找回密码").attr("disabled",false);
					}
				}
			})

		})
	});
	
	var smsUrl="ih.87dy.net.cn"; //发送验证码请求地址
	//点击发送验证码
	$(document).on("click",'.yanzhengma', function(){
		var _this=$(this);
		_this.attr("disabled",true);
		
		if( $("#join_u_email").length ){//注册

			$("#joinWindow input[name='join_u_email']").attr("disabled",true);
			
			var val=$("#joinWindow input[name='join_u_email']").val();		
			phoneBlur(val,true,function(){
				sendInfo(val,_this);
			});
			
		}else{ //找回密码
			$(".windowBox_content #gpw_u_email").attr("disabled",true);

			var val=$(".windowBox_content #gpw_u_email").val();
			
			if( !val || !tellReg.test(val) ){
				showCheckStatus( '#join_u_email_msg', 1, '手机格式错误！' );
				$(".windowBox_content #gpw_u_email").attr("disabled",false);
				_this.attr("disabled",false);
				return false;
			}else {
				showCheckStatus( '#join_u_email_msg', 0, '' );
				sendInfo(val,_this);
			}
		}
		
	});
	
	//发送验证码
	function sendInfo(val,_this){
		// val:手机号
		// _this:发送验证码按钮
		console.log(val);
		
		$.ajax({
			type:'get',
			url:'http://'+smsUrl+'/sms/index.php',
			data:{phonenumber:val},
			dataType:'json',
			success: function(data){
				
				console.log(data);
				if( data['stat'] == 100 ){  //发送成功
					
					_this.val(smsTime+"s后重新发送");
					
					smsTimer=setInterval(function(){
						smsTime--;
						_this.val(smsTime+'s后重新发送');
						if(smsTime<=0){
							smsTime=60;
							_this.removeAttr("disabled").val("发送验证码");
							$("#joinWindow input[name='join_u_email']").removeAttr("disabled");
							$("#gpw_u_email").attr("disabled",false);
							clearInterval(smsTimer);
						}
					},1000);

				}else{
					showCheckStatus( '#join_u_email_msg',1, '验证码发送失败~~' );
					_this.attr("disabled",false);
					$("#gpw_u_email").attr("disabled",false);
					$("#join_u_email").attr("disabled",false);
				}
				
			}
		});
	}
	
	// 监听手机号
	function phoneBlur(val,bool,funName){
		//  val  手机号
		//  bool 注册时 是否发送验证吗
		//  funName  发送短信

		var u_email = val;
			
		if( !tellReg.test(u_email) ){
			showCheckStatus( '#join_u_email_msg', 1, '请输入正确的电话！' );
			$("#joinWindow input[name='join_u_email']").attr("disabled",false);
			$("#gpw_u_email").attr("disabled",false);
			$(".yanzhengma").attr("disabled",false);

			return false;
		}else{
			showCheckStatus( '#join_u_email_msg', 0, '' );
			
		}
		var post={'u_tel':u_email};
		exports["isConsole"](post);
		publicOBJ.userClient.checkUserPhone( post, function ( result, args, output, warning ){
			exports["isConsole"](result);
			if( parseInt( result.flagID ) == 10126 ){
				showCheckStatus( '#join_u_email_msg', 1, '很抱歉,该手机号已被注册' );
				$("#joinWindow input[name='join_u_email']").attr("disabled",false);
				$(".yanzhengma").attr("disabled",false);
			}else{
				showCheckStatus( '#join_u_email_msg', 0, '' ); 
				if(bool){ //发送验证码
					funName && funName();//发送短信的函数
				}else{
					$("#joinWindow input[name='join_u_email']").attr("disabled",false);
					$("#gpw_u_email").attr("disabled",false);
					$(".yanzhengma").attr("disabled",false);
				}
			}	
		}, true);	
	}
	
	
	
	
	//改变检测状态
	function showCheckStatus( objBox, status, text ){
		$(objBox).html('<span class="info'+ status +'">'+ text +'</span>');
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
	
	//关闭按钮
	$(document).on("click",".close_windowBox",function(){
		
		clearInterval(smsTimer);
		smsTime=60;
		$(".windowBox,.alertOverlay").hide().html("");
		
	})
	
	//设置当前页面 颜色
	exports.setCurrentColor=function(){
		var currentColor=getCookie("currentColor");
		currentColor?"":currentColor="Green";
		$(".sportsColor_choose span[data-color="+currentColor+"]").addClass("current").parent().siblings().find("span").removeClass("current");
		$(".sportsColor_choose .current").parent().addClass("active").siblings().removeClass("active");
		$("#sportsColor").attr("href","css/sportsColor"+currentColor+'.css');
	}
	
	
	
	$(".btn").click(function(){
		dialong({
			html:'网络错误',
			autonone:3000
		},function(){
			console.log($(this));
			console.log($(this).index());
		},function(){
			console.log("点了 x");
			console.log($(this))
		});
	})
	
	function myAddEvent(obj,sEvent,fn){
				
		if( obj.addEventListener ){
			obj.addEventListener(sEvent,fn,false); //false 不在捕获阶段触发
		}else{
			obj.attachEvent("on"+sEvent,fn);
		}

	}
	
	
	exports.setCookie=setCookie;
	exports.getCookie=getCookie;
	exports.init=init;
	exports.myAddEvent=myAddEvent;
	exports.getUserData=getUserData;
	exports.loginOut=loginOut;
	exports.dialong=dialong;
})
