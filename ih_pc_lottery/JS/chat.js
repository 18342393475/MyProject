// JavaScript Document
define(function(require,exports,module){
	
	var top=require("./top.js");
	
	var getMessageInter;
	var getIner = 8000;
	var timeout = 600
	var isFirst = 1;
	var reType = 1;
	var kefuOnlineStatus = 0;
	var GuestName = '';
	var isFirstSend = 1;
	var insert_date = '';
	if( !top["getCookie"]( 'phprpcUrl' ) ) top["setCookie"]( 'phprpcUrl', 'http://data.ihbet.com' );
	var sysClient = new PHPRPC_Client( 'http://118.184.23.233/memberRPC/phprpcClass/UserData.class.php', ['checkChatCoke', 'getServiceStatus', 'sendMessage', 'getUserMessageHistory','getUserMessages'] ); 
	
	function $b(str){
		return $("#"+str).get(0);
	}
	
	//检测客服状态
	function getServiceStatus(){        	
		POST ={ 'uid': top["getCookie"]('uid'), 'lang': top["getCookie"]('lang') };
	  	sysClient.getServiceStatus( POST, function ( result, args, output, warning ){
			if(output)alert(output);
			
			if( top["getCookie"]('uid') ){
				$b('reTypeBox').innerHTML = '<input id="reType" type="hidden" value="1"/>在線即時会话</select>';
				$b('typeBox').style.display = "none";
				$b('titleBox').style.display = "none";
			}else{	
				if( parseInt(result.kefuNum) == 0 ){
					$b('reTypeBox').innerHTML = '<input id="reType" type="hidden" value="2"/>给客服人員留言</select>';
					$b('contentBox').innerHTML = '<span>*&nbsp;</span><span>咨询內容:</span><textarea id="content" name="content" cols="30" rows="6"></textarea>';
				}else{
					$b('reTypeBox').innerHTML = '<input id="reType" type="hidden" value="1"/>在線即時会话</select>';	
				}
						
			}
			
			if( top["getCookie"]('uid') ){
				$b('u_name').value = result.u_name;
				$b('u_xm').value = result.u_xm;
				$b('email').value = result.email;
				$b('tel').value = result.tel;
				$b('u_name_box').style.display = "block";
				$b('u_name').readOnly = true;
				$b('u_xm').readOnly = false;
			}else{
				$b('u_name_box').style.display = "none";
				$b('u_xm').readOnly = false;
			}
		}, true);
		
	}
	
	//檢測用戶名是否存在
	function checkChatCoke(){
	
		POST = { 'uid': top["getCookie"]('uid'), 'lang': top["getCookie"]('lang'), 'updateID': 1001, 'u_name': $b('u_name').value };
		if( !top["getCookie"]('uid') ){
			if( $b('type').value == '' ){ alert('請選擇諮詢類型！'); return false; };
			if( $b('title').value == '' ){ alert('請選擇諮詢主題！'); return false;};
		}
		if( $b('u_xm').value == '' ){ alert('請輸入帳戶姓名！'); return false; };
		if( !ismail( $b('email').value) ){ alert('請輸入正確的郵箱地址！'); return false; };
		if( $b('tel').value == '' ){ alert('請輸入聯繫電話！'); return false; };
		
		//检测验证码
		if( parseInt($b('reType').value) == 1 ){
			$b('form1').submit();
		}else{
			sendMessageChat();
		}
				
		return false;
		
	}
	
	
	function sendMessageChat(){
	
		post = {
	            'uid': top["getCookie"]('uid'), 'lang': top["getCookie"]('lang'),
	            'type': $b('type').value,
	            'reType': $b('reType').value,
	            'title': $b('title').value,
	            'content': 	$b('content').value,
	            'u_xm': $b('u_xm').value,
	            'email': $b('email').value,
	            'tel': $b('tel').value,
		}
		
		if( $b('u_name').value == '' ){
			post.u_name = $b('email').value;
		}else{
			post.u_name = $b('u_name').value;
		}
		
		sysClient.sendMessage( post, function ( result, args, output, warning ) {                
	            
			if( output ) alert( output );
			alert('您的咨询信息已提交，客服人员将会及时回复您.\n请留意查收您的电子邮箱！谢谢您的支持！');
			history.go(0);
		}, true);	
	
	}
	
	
	
	
	//提交留言
	
	
	
	//驗證EMAIL
	function ismail(mail){ 
	       return( new RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(mail)); 
	} 
	
	function shuaxincodeImg( obj, bgColor, fontColor ){
		$b( obj ).src = top["getCookie"]( 'phprpcUrl' )+'/phprpcClass/code.php?uid='+ top["getCookie"]( 'uid' ) +'&random='+Math.random()+'&bgColor='+bgColor +'&fontColor='+fontColor;
	}
	
	
	/*****************************************************************************/
	//開始會話
	function openMsg(){	
		//諮詢日期列表
		getUserMessageHistory(0);
		
	}
	
	//關閉回話
	function closeMsg(){
		clearInterval( getMessageInter );
		window.close();	
	}
	
	//曆史咨詢記錄
	function getUserMessageHistory( page ){
		
		post = { 'uid': top["getCookie"]('uid'), 'lang': top["getCookie"]('lang'),'page': page, 'u_name': u_name };
		sysClient.getUserMessageHistory( post, function ( result, args, output, warning ) {
			if(output)alert(output);
			getUserMessages();
			getMessageInter = setInterval( getUserMessages, getIner );
			
			eval( 'result = '+ result );
			
			if( !top["getCookie"]( 'uid' ) ){
				//location="./chatForm.php";
				return;
			}
			
			stringMsg = '';
			for( id in result.msg ){
				row = result.msg[id];
				switch( parseInt(row['user_type']) ){
				case 1:case 2: stringMsg += '<p class="systemMsg">'+ row['r_ad_name'] +' '+ row['t_datetime'] +'<br/>&nbsp;&nbsp;&nbsp;&nbsp;'+ row['content'] +'</p>'; break;
				case 3: stringMsg += '<p class="menberMsg">'+ row['u_name'] +' '+ row['t_datetime'] +'<br/>&nbsp;&nbsp;&nbsp;&nbsp;'+ row['content'] +'</p>'; break;
				}	
			}
			$b('HistoryBox').innerHTML = stringMsg;
			$b('HistoryBox').scrollTop=$b('HistoryBox').scrollHeight;
			
			//頁碼
			stringPage = '';
			stringPage += ' [<a href="javascript:void(0)" onclick="getUserMessageHistory(1)">首頁</a>] ';
			stringPage += ' [<a href="javascript:void(0)" onclick="getUserMessageHistory('+ ( result.page - 1 ) +')">上一頁</a>] ';
			stringPage += result.page +'/'+ result.pages;
			stringPage += ' [<a href="javascript:void(0)" onclick="getUserMessageHistory('+ ( result.page + 1 ) +')">下一頁</a>] ';
			stringPage += ' [<a href="javascript:void(0)" onclick="getUserMessageHistory('+ result.pages +')">末頁</a>] ';
			$b('pageBox').innerHTML = stringPage;
				
		}, true);
		
	}
	
	
	function getUserMessages(){
	
		timeout -= getIner/1000;
		
		//長時間不發送信息,自動關閉會話
		/*
		if( timeout < 0 ){
			alert('很抱歉! 由於您長時間不進行發話操作, 會話已被斷開!');
			closeMsg();
			return;
		}
		*/
		post = { 
	            'uid': top["getCookie"]('uid'), 'lang': top["getCookie"]('lang'),
	            'reType': reType, 
	            'kefuOnlineStatus': kefuOnlineStatus, 
	            'isFirst': isFirst, 
	            'u_name': u_name, 
	            'email': email, 
	            'insert_date':insert_date 
		}
		isFirst = 0;
		
		sysClient.getUserMessages( post, function ( result, args, output, warning ) {
			
			if(output) alert(output);
			if(  result.isUpdate == 0 ) return;
			
			parentDiv 		= $b('currMsgBox');
			nowDIV 			= document.createElement('div'); 
			nowDIV.innerHTML = result.content;
			parentDiv.appendChild(nowDIV);
			parentDiv.scrollTop=parentDiv.scrollHeight;
			
			if( result.kefuOnlineStatus ) kefuOnlineStatus = result.kefuOnlineStatus;
			if( result.GuestName ) GuestName = result.GuestName;
			$('#content')[0].focus();
			
		}, true);
	
	}
	
	//得到指定日期記錄
	function getDateUserMessages( gdate ){
		return;
		$msgFrame('msgBox').innerHTML = '';
		isFirst = 1;
		insert_date = gdate;
		getUserMessages();
	}
	
	function sendMessage(){
	
		post = {'uid': top["getCookie"]('uid'), 'lang': top["getCookie"]('lang')};
		post.content = $('#content').val();	
		post.u_name = u_name;
		post.email = email;
		post.isFirstSend = isFirstSend;
		
		if( post.content == '' ){
			$('#content')[0].focus();
			return;
		}
	
		sysClient.sendMessage( post, function ( result, args, output, warning ) {
			
			if( output ) alert( output );
			isFirstSend = 0;
			timeout = 600;
			
			//禁止發言
			if( result.allowMessageTime > 0 ){
				alert( '<?=getMessageUI(107)?>'+ result.allowMessageTime +'<?=getMessageUI(108)?>' )
				return;
			}
			if( result.isUpdate == 0 ) return;
			parentDiv 		= $('#currMsgBox')[0];
			nowDIV 			= document.createElement('div'); 
			nowDIV.innerHTML = result.content;
			parentDiv.appendChild(nowDIV);
			parentDiv.scrollTop=parentDiv.scrollHeight;
			$('#content').val('');
			$('#content')[0].focus();
		}, true);	
	
	}
	
	//驗證EMAIL
	function ismail(mail){ 
	       return( new RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(mail)); 
	} 
	
	//返回對象
	function $msgFrame( id ){
		return document.getElementById('msgFrame').contentWindow.document.getElementById(id);
	}
	
	//返回頁面
	function $$( id ){
		return document.getElementById( id ).contentWindow;
	}
	
	
	exports.getServiceStatus=getServiceStatus;
	exports.openMsg=openMsg;
	exports.sendMessage=sendMessage;
	exports.checkChatCoke=checkChatCoke;
})