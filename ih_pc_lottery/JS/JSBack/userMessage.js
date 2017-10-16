// JavaScript Document
var client = new PHPRPC_Client( '../phprpcClass/userChat.class.php', [ 'kefuOnLine','getNewMessageUserList', 'openUserMessage', 'sendMessage','getUserMessages', 'selectUser', 'banMessage', 'getEmailList' ] ); 
var getMessageInter;
var getUserListInter;
var email = '';
var u_name = '';
var u_xm = '';
var getIner = 8000;
var timeout = 600
var isFirst = 1;
var userPaseSize = 20;
var onlineFlag = 0;
window.onbeforeunload = closeWindow;
//note:正文中的“”应在中文输入法下的.
// ' ',
var messagesObj = {
	0:{
		title:'一般問題', 
		list:[
			'您好！很高興為您服務，有什麼可以幫您嗎？',			
			'請將您的問題的詳細情況留言在這裡，我們核實情況後與您联系，见谅。',
			'请稍等下，为您核实下情况，稍后联系您。',
			'我们已经了解您的问题，有结果后将尽快答复您。',
			'对于您的问题，我們解决后将尽快通知您。',
			'为保障用户帐户使用安全，我们不采用QQ，MSN，SKYPE等第三方聊天系统与客户交互，见谅。',
			'我们可以通过此在线客服平台给您留言，或者您可以选择将处理结果发至你注册时使用的邮箱。',
			'我们将稍后电话联系您。',
			'我们已经将处理结果发至您的邮箱中，请查收。',
			'对于我们的失误给您带来的不便，敬请见谅。',
			'谢谢您使用 IHBET.COM，我们将努力做得更好，再见。',
			'谢谢，再见。'	,
			// ' ',	
		],		
	},
	
	1:{
		title:'平台介绍',
		list: [
			'当前存款活动，包括注册送白菜，首存送10%，25%，50%，100%等，第二次存款和老客户存款都有相应的优惠活动，详细情况以首页中“优惠活动”页面介绍为准。',
			'相关優惠活動详情，以首页中“优惠活动”页面介绍为准。',
			'匯博【IHBET.COM】是 【BETHOO】 在線博彩有限公司屬下娛樂品牌。母公司 【BETHOO】 為伯利茲合法註冊的博彩公司。我們一切的博彩營業行為皆遵從伯利茲政府的博彩條約。',
			'平台提供体育及彩票项目，支持智能手机访问，彩票项目当前暂未开放使用。',
			'关于平台更详细的情况，请参阅首页“关于我们”页面。',		
			'本系统支持智能手機投注,手機访问網址為: m.ihbet.com;',			
			'如果是受国际线路影响不能访问域名，请选择使用以下备用网址：http://ihbet.net; http://ih138.com; http://ih188.com;',
			'我们的优势是提供优惠的水位，以及会员的存取款更快捷，我們鄭重承諾：加入我們，您的選擇絕對正確。',
			// ' ',
		]
	},

	2:{
		title:'賬戶相关',
		list:[
			'相关操作需要核实下您的身份，请提交下你注册时使用的的邮箱，手机。',
			'请问你的帐户的曾用密码有哪些？',	
			'请问您的帐户已经登录使用的域名是？',			
			'新注冊會員賬戶必須激活後方可使用。請登陸您的聯系電子郵箱，點擊鏈接完成激活。如未能收到激活郵件與客服聯繫。',					
			'三次密碼輸入錯誤賬戶會被凍結，請聯系客服。客服會核准您的個人資料，確認身份後會爲您重新啓動賬戶。',
			'請點擊首頁“忘記密碼”。填入相關資料，系統將會即時把新密碼發送到您的帳戶郵箱。',
			'個人資料中，相关帐户安全不可更改，如需更改需與我们聯繫，我们核实后会为您操作。',
			// ' ',
		]		
	},

	
	3:{
		title:'体育投注',
		list:[
			'單式最低投注額為10元，過關最低投注額為2元。',
			'存入体育场帐户的金额，需要投注后方可申请提款，即完成投注流水。',
			'如投注于实际赔率低于香港盘0.75的，不计投注流水；在同一盘口双边都投注的，只计算较先投注的一边的流水。',
			'如果部分赛事下注时，提示“賽事暫停下注”，可能是系統內部盤口調整或賠率調整。',
			'在滚球赛事中，本着公平公正的原則, 凡是現場出現罰球、角球、犯規、紅牌、黃牌等危險球狀況,系統將會檢測非安全時段內投注的注單。並有权不接受此注單的投注。',
			'滚球投注的确认，将在约5~20秒的时间内完成，视具体现场情况而定。',
			'足球赛事是半场结算的，篮球是按节进行结算。赛事一结束，马上有相关半场及单节的比分。',
			'系統的結算是由采用官方公布的赛果數據, 由於某些賽事出現"賽果待定"等情況，造成結算推遲。',			
			'足球赛果是指90分钟（包括补时）的结果，不包括加时，不包括点球的比分。',
			'篮球赛果中，上半场比分是第1，2节比分和； 下半场的比分是指第3，4节，加上加时赛的比分； 全场比分包括加时赛的比分。',
			'如果赛事因故取消，派彩时则返还会员投注金额。',
			'如果赛事因故中断或者腰斩，除了明確輸贏的注單以外，其他注單將一律取消！ 比如:中斷/暫停之前賽果為3比0，投注在大小2球，波膽2比0，總入球0至1球等注单，持續進球也不影響注單結果的，注單將視為有效。而类似大小4球，波胆4比1等投注，则视为无效投注，派彩时返回投注本金。',
			'更详细的体育规则，可参阅前台里面的"规则条款"及"常见问题"。',
			// ' ',
		]		
	},

	4:{
		title:'彩票投注',
		list:[
			'平台提供体育及彩票项目，支持智能手机访问，彩票项目当前暂未开放使用。',
			'彩票项目因故暂停使用，开放时将通知各会员。',	
			// ' ',
		]		
	},

	5:{
		title:'存款問題',
		list:[
			'最低存款額度为100，在存款頁面會有明確提示最低最高额度限制。',
			'本網支持 “在線存款” 和 “公司進款” 兩種存款方式。',
			'“在線存款” 是指用戶使用網上銀行，通過第三方支付公司直接完成付款的方式，付款后自动到帐。用戶只要按“在線存款”頁面提示進行即可。該方式只需幾分鍾即可自動完成賬戶充值。',
			'“公司進款”是指用戶使用網上銀行、atm轉賬、櫃台現存等方式，將款項彙進公司指定銀行賬戶。	用戶只要按“公司進款”頁面提示進行即可。該方式半小時內可完成賬戶充值。',
			'由于不同公司提供的汇款人信息不同，“公司進款” 方式要求用户实际汇款到公司帐户的额度必须包括系统统指定的尾数，我们财务人员才可以快捷得辩认出实际汇款人信息。',
			'“公司進款”方式按存款额度，返还用户千分之5手续费到会员帐户中，最高50元。',
			'当您采用“公司進款”方式时，在您成功转账之后，请点击“款项已经成功转账，提交确认到帐” 按钮，我们财务人员核实到帐后立即为你帐户充值。',
			'綫上銀行支付方式, 為即時到賬, 一般在10分鐘內到賬, 在支付成功後, 請注意點擊 “返回支付網站” 字樣按鈕，查看即時到賬信。',
			'“公司入款” 方式, 在您進行銀行匯款並進行“存款到賬確認”後, 10分鐘內財務專員將會為您進行到賬操作。',
			// ' ',
		]
		
	},
	
	6:{
		title:'提款问题',
		list:[
			'为保证用户资金安全，提款銀行賬戶戶名要求必須與IHBET帳戶姓名一致。',
			'存入的金额必须投注过才可以进行提款，即完成存款的投注流水，否則提款將會扣除提款额度的30%作为行政費用。',
			'如申请过相关优惠，则要求完成优惠提及的流水倍数，方可进行提款申请，否則实际到帐金额将扣去所得优惠，并收取30%行政費用。',
			'累计每天提款额度小于200000无需收取手续费。',
			'線收到你的取款申請很快便會安排彙款。如超出12小時還沒到賬, 请检查银行账户及账户姓名是否填写有误。',
			'收到你的提款申請，我們會即時安排財務進行汇款處理，汇博承諾12小時內款項到賬。'	,
			// ' ',		
		]
	},
	
	
	7:{
		title:'合作伙伴',
		list:[
			'合作伙伴网址，可以在前台点击“合作伙伴”链接进入，或者直接访问网址： http://ag.ihbet.com。',
			'通過合作伙伴推廣鏈接進入到本司網站，并註冊后即成為该合作伙伴的推廣會員。',
			'詳情請參閱合作伙伴協議，网址： http://ag.ihbet.com。',
			// ' ',
			]
	}
}




//關閉窗口
function closeWindow(){
	
	if( onlineFlag == 1){
		
		return '您已為客服在線狀態, 如要關閉, 請先把客服設置為離線!';
	
	}

}

//开始会话
function openMsg(){
	
	getNewMessageUserList();
	getUserListInter = setInterval( getNewMessageUserList, getIner );
	
}




//下离線
function upDownLine( _onlineFlag ){
	onlineFlag = _onlineFlag;
	post = { 'login_code':onlineFlag }
	client.kefuOnLine( post, function ( result, args, output, warning ) {
		if( parseInt(result) == 777 ){
			alert('上線成功! ');
			//$('serviceOnline').checked = true;
		}else if( parseInt(result) == 888 ){
			alert('下線成功! ');
			//$('serviceOnline').checked = false;
		}else if( parseInt(result) == 444 ){
			alert('已有客服人員在線! ');
			//$('serviceOnline').checked = false;
		}
	}, true);

}



//最近諮詢用戶列表
function getNewMessageUserList(){
	
	html = Array();
	post = { 'userPaseSize':userPaseSize,'dateNum': 100 }
	client.getNewMessageUserList( post, function ( result, args, output, warning ) {
		
		if(output) alert(output);
		eval( 'userList = '+ result );
		currDate = '';
		for( date in userList ){
			if( currDate != date ){
				if( currDate ) html.push( '</fieldset>' );
				currDate = date;
			
				html.push( '<fieldset style="margin:1px; padding-top:2px"><legend>'+ currDate +'</legend>' );
			}
			for( curr_u_name in userList[date] ){
				
				html.push( '<div style="color:#666666;cursor:pointer"><a ');
				if( userList[date][curr_u_name].m_num > 0 ) html.push( ' class="newMsg"');
				html.push( ' onclick="parent.openUserMessage( \''+ curr_u_name +'\' )">' );	
				html.push( '('+ userList[date][curr_u_name].m_num +'/'+ userList[date][curr_u_name].t_num +') '+  curr_u_name.substring(0,12) );
				html.push( '</a></div>' );
			
			}		
		}
		html.push( '</fieldset>' );
		$userListFrame( 'userListBox' ).innerHTML = html.join('');    
	}, true);
}

function closeMsg(){

	clearInterval( getMessageInter );
	window.close();
	
}

//打开用户会话
function openUserMessage( _u_name ){

	u_name = _u_name;
	$('userObj').innerHTML = u_name;
	post = { 'u_name': u_name,'isPC':1 }
	client.openUserMessage( post, function ( result, args, output, warning ) {
		if(output)alert(output);
		$msgFrame('msgBox').innerHTML = result.content;
		msgFrame.window.scrollTo(0,(msgFrame.document.body.scrollHeight));
		$('content').focus();
		email = result.email;
		u_xm = result.u_xm;
		
		//禁止發言狀態
		if( result.ban_message_time > 1 ){
			$( 'ban_message_time' ).value = 86400;
		}else{
			$( 'ban_message_time' ).value = 0;
		}
		
		//初始化选中EMAIL
		changeReType(1,'');
	}, true);
	

		
	//開始定時請求
	getUserMessages();
	getMessageInter = setInterval( getUserMessages, getIner );
	

}

function getUserMessages(){
	
	post = { 'u_name': u_name }
	client.getUserMessages( post, function ( result, args, output, warning ) {
		
		if( output )alert(output);
		eval( 'result = '+ result );
		if( result.flag != 'YES' ) return; 
		content = '';
		for( id in result.content ){
			row = result.content[id];
			content += '<BR/><span class="hyTitle">'+ row.u_name +' '+ row.t_datetime +'<span>';
			content += '<BR/><span id="huiyuanContent">'+ row.content +'</span>';
		}
		
		parentDiv 		= $msgFrame('msgBox');
		nowDIV 			= $$('msgFrame').document.createElement('div'); 
		nowDIV.id 		= 'kefuBox';
		nowDIV.innerHTML = content;
		parentDiv.appendChild(nowDIV);
		msgFrame.window.scrollTo(0,(msgFrame.document.body.scrollHeight));
		$('content').focus();
		if( result.email ) email = result.email;
		
	}, true);

}

//發送信息
function sendMessage(){
	
	content = $('content').innerHTML;
	if( content == '' ){
		alert('請輸入發送內容');
		return;
	}
	
	
	post = { 'u_name': u_name, 'content': content, 'reType': $('reType').value }
	 
	if( post.reType == 2 ){
		post.u_name = $('u_name').value;
		post.fromEmail = $('fromEmail').value;
		post.email = $('email').value;
		post.mobanNo = $('mobanNo').value;
		if( post.email == '' ) alert('用戶沒留下有效的Email地址');
		if( !ismail(post.email) ){ alert('Please enter a valid e-mail address \n 請輸入一個有效的e - mail地址'); return false;  }
	}else if( post.reType == 3 ){
		val = confirm('您将要进行群发操作，真的要群发？');
		if( val == false ) return;
	}
	
	if( post.u_name == '' ){
		alert('請選擇或输入接受人名称');
		return;
	}
	
	$('content').innerHTML = '';
	client.sendMessage( post, function ( result, args, output, warning ) {
		if(output) alert(output);
		
		if( result.flag != 'YES' ){
			alert('信息发送失败！');
			return;
		}
				
		parentDiv 		= $msgFrame('msgBox');
		nowDIV 			= $$('msgFrame').document.createElement('div'); 
		nowDIV.id 		= 'kefuBox';
		nowDIV.innerHTML = '<br/><span class="kfTitle">'+ result.r_ad_name +' '+ result.t_datetime +'</span><br/><span id="kefuContent">'+ result.content +'</span>';
		parentDiv.appendChild(nowDIV);
		msgFrame.window.scrollTo(0,(msgFrame.document.body.scrollHeight));
		$('content').focus();
		
	}, true);	

}

//返回对象
function $msgFrame( id ){
	return document.getElementById('msgFrame').contentWindow.document.getElementById(id);
}

//返回对象
function $userListFrame( id ){
	return document.getElementById('userListFrame').contentWindow.document.getElementById(id);
}

//返回页面
function $$( id ){
	return document.getElementById( id ).contentWindow;
}

//改變回複類型
function changeReType( selectValue, n_email ){
	
	if( selectValue > 0  ) $('reType').value = selectValue;
	if( n_email ) email = n_email;
	if( $('reType').value == 2 ){
		$('u_name').value = u_xm;
		$('email').value = email;
		$( 'emailBox' ).style.display = "block";
		post = { 'email': email };
		client.getEmailList( post, function ( result, args, output, warning ) {
			if( output ) alert(output);
			$( 'fromEmailBox' ).innerHTML = result;
		}, true);
	}else{
		$('reType').value = 1;
		$( 'emailBox' ).style.display = "none";
	}

}


//清空内容
function qingkong( neirong ){

	if( neirong == '帐户名称' ) $('u_name').value = '';

}

//查找用户
function selectUser(){

	post = { 'u_name': $('cz_u_name').value }
	client.selectUser( post, function ( result, args, output, warning ) {
		if( parseInt(result) == 7777 ){
			u_name = $('cz_u_name').value;
			$('userObj').innerHTML = u_name;
			openUserMessage( u_name );			
		}
		
	}, true);	

}

//验证EMAIL
function ismail(mail){ 
       return( new RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(mail)); 
} 




//得到答案列表
function getAnswer( typeID ){
	
	if( typeID == -1 ) return;
	
	html = '<select onChange="gotoAnswer( this.value )" style="font-size:12px;width:640px">';
	html += '<option value="0">請選擇內容</option>';

	for( answerID  in messagesObj[typeID]['list'] ){
		html += '<option value="'+ messagesObj[typeID]['list'][answerID] +'">'+ messagesObj[typeID]['list'][answerID] +'</option>';
	}
	html += '</select>';
	
	$('answerList').innerHTML = html;
	
}

//得到答案
function gotoAnswer( answer ){

	$('content').innerHTML = answer;

}

//禁止發言
function banMessage(){
	
	post = { 
	'u_name': u_name,
	'ban_message_time': $('ban_message_time').value
	}
	client.banMessage( post, function ( result, args, output, warning ) {
		if( parseInt(result) == 7777 ){
			alert('發言狀態更改成功');			
		}
	}, true);
	
}


