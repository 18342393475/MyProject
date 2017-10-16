define(function(require,exports,module){
	var lottery=require("./lottery.js");
	var rpcPost=lottery["rpcPost"];
	var current=lottery["current"];
	var getServerData=lottery["getServerData"];
	var lotterys188=require("./lotterys188Template");
	var top=require("../top.js");
	
	var quick_bet={
		init:function(){
			this.checkUid=lottery["lotterysEvent"]["checkUid"];
			this.result=lottery["lotterysEvent"]["result"];
			this.isScroll=lottery["lotterysEvent"]["isScroll"];
			this.getPlaylxObj=lottery["lotterysEvent"]["getPlaylxObj"]
			
		},
		
		isNew:function(play_lx,fn){
			var isNews=true;
				
			for(var key in rpcPost["minMoney"]){
				if( key==play_lx && rpcPost["minMoney"][key]){
					isNews=false;
				}
			}
			
			if (isNews){
				var post = {'actID':301,'uid': top["getCookie"]('uid'), 'game_lx':current['game_lx'], 'play_lx':play_lx };
				
				getServerData( post, function (result){
					
					userMoney=result["data"]["u_money_cp"];
					//把最高最低金额添加到对象中
					rpcPost['minMoney'][play_lx] = result['data']['minMoney'];
					rpcPost['maxMoney'][play_lx] = result['data']['maxMoney'];
					fn && fn();
				});
			}else{
				fn && fn();
			}			
		},
		right_quick_bet:function(){
			var obj=itemOBJ[current['cp_type']]['menu'][current['panType']]['quick_bet'];
			if( !obj ){ $(".quick_bet").html(""); return false;}
			this.init();
			var arr=[],titleHong=[],titleLv=[],titleLa=[];

			var str=itemOBJ[current['cp_type']]['menu'][current['panType']]['quick_bet_obj'];
			var quick_bet_obj=itemOBJ[current['cp_type']]['menu'][current['panType']]["quick_bet_obj"];
			
			$("."+str+'_box .odds_box').each(function(){
				if( $(this).find(".titleHong").length ){
					titleHong.push( $(this).find(".titleHong").html() );
				}else if( $(this).find(".titleLan").length ){
					titleLa.push( $(this).find(".titleLan").html() );
				}else if( $(this).find(".titleLv").length ){
					titleLv.push( $(this).find(".titleLv").html() );
				}
			});
			for(var i=1;i<50;i++){
				arr.push( (i.length)<2?'0'+i:i );
			}
			

			for(var key in obj){
				var value1=obj[key];
				
					for(var i in value1){
						var arr1=[];
						var value2=value1[i];
						
						if( value2.fn ){
							var arg
							if( key=="color_ho" ){
								arg=titleHong	
							}else if( key=="color_la" ){
								arg=titleLa	
							}else if( key=="color_v" ){
								arg=titleLv
									
							}
							
							value2.number=value2.fn( arg );
						}else if( key=="sx" ){
							//console.log(i+':'+(this.result["data"][i]));
							value2.number=this.result["data"][i].split(",");
						}
					}
				
			}
			
			var render=template.compile(lotterys188["right_quick_bet"]);
			var html=render({date:obj,quick_bet_obj:quick_bet_obj});
			$(".content_right .quick_bet").html(html);
		},
		getDaXiaoString:function(str,getType){
			//  A unicode号 65  
			//  Z unicode号 90
			//  a           97
			//  z           122
			//  0           48
			//  9            57
			
			str=str.replace(/\s/ig,"");
			
			var arrD=[];//大写 
			var arrd=[];//小写 或者 数字
			
			for(var i=0;i<str.length;i++){
				
				if( str.charCodeAt(i)<65 || str.charCodeAt(i)>90 ){
					
					arrd.push(str.charAt(i));
				}else{
					arrD.push(str.charAt(i));
				}
				
			}
			if(getType=="d"){
				return arrD.join("");
			}else if( getType=="x" ){
				
				return arrd.join("");
			}
		},
		right_quick_bet_click:function(elem){
			
			if(!top["getCookie"]('uid')){
				return false;
			}
			this.init();
			var result=this.result;
			var _this=this;
			var number=elem.attr("data-number").split(",");
			var quick_bet_obj=elem.attr("data-quick-bet-obj").split(" ");
			elem.toggleClass("right_quick_bet_li_checked");
			
			var array=[];			
			$(".quick_bet_sub_item").find("li").each(function(){
				
				if( $(this).hasClass("right_quick_bet_li_checked") ){
					array=array.concat($(this).attr("data-number").split(","));
					array=array.uniquelize();//去重
				}
			});
			
			rpcPost["quick_betBrders"]={};
			if(array.length==0){
				$(".right_quick_bet_num").html(0);
				$(".right_quick_bet_content").html("点击上方文字投注");
				$(".mid-Content").find(".right_quick_bet_checked").removeClass("right_quick_bet_checked");
				$(".content_right ").customScrollbar("resize",true);
				return false;
			}
			var periods=result["data"]["gameStatus"]["periods2"];
			var everyMoney=$(".right_quickBet_every_input").val();
			for(var i=0;i<quick_bet_obj.length;i++){
				var id=quick_bet_obj[i];
				var menu=_this.getPlaylxObj( id );
				$("."+id+'_box').find(".odds_box").each(function(){
					var playOBJ=$(this).attr("name");
					
					var ODDS=result['data']['newOdds'][playOBJ];
					var D=_this.getDaXiaoString(playOBJ,'d');
					var d=_this.getDaXiaoString(playOBJ,'x');
					var titlePlayLx = menu['playLx'][D];
					if( $.inArray(d,array)>=0){
						$(this).addClass("right_quick_bet_checked").find(".showNum_text_box").addClass("right_quick_bet_checked");
						rpcPost["quick_betBrders"][playOBJ]={
							periods:periods, 
							'game_lx': current['game_lx'],
							'play_lx':D,
							'bet_obj':d,
							'betMoney':everyMoney||'',
							'odds':ODDS, 
							'obj_name':d,
							'objMing':objName[d]||d,
							titlePlayLx:titlePlayLx
							//combination_num:arr.length,
							//combination_result:arr,
							//'message':'共'+arr.length+'种组合'
						}
					}else{
						$(this).removeClass("right_quick_bet_checked").find(".showNum_text_box").removeClass("right_quick_bet_checked");
						
					}
					
				});
				
			}
			
			var arr=[];
			var n=0;
			for(var key in rpcPost["quick_betBrders"]){
				var play_lx=rpcPost["quick_betBrders"][key]['play_lx'];
				if( $.inArray(play_lx,arr)<0 && !rpcPost["minMoney"][play_lx]){arr.push(play_lx)}
				n++;
			}
			
			if( everyMoney ){
				$(".right_quick_bet_tolMoney").html((everyMoney*100*n/100).toFixed(2));
			}
			$(".right_quick_bet_num").html(n);
			if( arr.length ){
				var post = {'actID':301,'uid': top["getCookie"]('uid'), 'game_lx':current['game_lx'], 'play_lx':arr,bet_model:3 };	
				getServerData(post,function(date){
					
					userMoney=date["data"]["u_money_cp"];
					//把最高最低金额添加到对象中
					for(var key in date["data"]){
						if(key!="u_money_cp" && key!="u_name" && key!="u_on_off"){
							rpcPost['minMoney'][key] = date['data'][key]['minMoney'];
							rpcPost['maxMoney'][key] = date['data'][key]['maxMoney'];
						}
					}
					
					_this.right_quick_bet_content();
				});
			}else{
				_this.right_quick_bet_content();
			}
			
		},
		right_quick_bet_content:function(){
			var date={quick_betBrders_date:rpcPost["quick_betBrders"],minMoney:rpcPost["minMoney"],maxMoney:rpcPost["maxMoney"]};
			
			var render=template.compile(lotterys188["right_quick_bet_content"]);
			var html=render(date);
			$(".right_quick_bet_content").html(html);
			$(".content_right ").customScrollbar("resize",true);
		
		}

	}
	exports.quick_bet=quick_bet;
	
	// 点击li 
	$(document).on("click",".right_quick_bet_sub li",function(){
		quick_bet["right_quick_bet_click"]($(this));
	})
	//点击 删除按钮 
	$(document).on("click",".orderDelete_right_quick",function(){
		var $parents=$(this).closest(".right_quick_bet_item");
		var playOBJ=$parents.attr("data-playobj");
		$parents.remove();
		delete rpcPost["quick_betBrders"][playOBJ];
		
		var getDaXiaoString=quick_bet["getDaXiaoString"];
		
		$(".mid-Content").find("div[name="+playOBJ+"]").removeClass("right_quick_bet_checked").find(".right_quick_bet_checked").removeClass("right_quick_bet_checked");
		var d=getDaXiaoString(playOBJ,'x');
		$(".right_quick_bet_sub li.right_quick_bet_li_checked").each(function(){
			var number=$(this).attr("data-number").split(",");
			if( $.inArray(d,number)>=0 ){
				$(this).removeClass("right_quick_bet_li_checked");
			}
		});
		var num=0,tolMoney=0;
		for(var key in rpcPost["quick_betBrders"]){
			num++;
			var money=$(".right_quick_bet_content_sub").find("div[data-playobj="+key+"]").find("input[type=text]").val();
			money*=100;
			tolMoney+=parseInt(money);
		}
		$(".right_quick_bet_num").html(num);
		$(".right_quick_bet_tolMoney").html((tolMoney/100).toFixed(2));
		$(".content_right ").customScrollbar("resize",true);
	})

	//点击 取消按钮
	$(document).on("click",".right_quick_bet_empty",function(){//右侧快捷投注取消按钮
		$(".right_quick_bet_li_checked").removeClass("right_quick_bet_li_checked");
		$(".mid-Content .right_quick_bet_checked").removeClass("right_quick_bet_checked");
		$(".right_quick_bet_content").html("");
		$(".right_quick_bet_num,.right_quick_bet_tolMoney").html(0);
		$(".right_quickBet_every_input").val("");
		rpcPost["quick_betBrders"]={};
		$(".content_right ").customScrollbar("resize",true);
	})
	//点击 投注按钮
	$(document).on("click",".right_quick_bet_sure",function(){//右侧快捷投注确定按钮
		lottery["lotterysEvent"]["submitData"](true);
		
								
	})
	
	//金额输入框的限制
	var keyBool=false;
	//金额输入框
	function moneyCheck(value){  
      	var regStrs = [ 
      		['[^\\d\\.]+$', ''], //禁止录入任何非数字和点
      		['^\\.+','0.'],
	        ['^0(\\d+)$', '$1'], //禁止录入整数部分两位以上，但首位为0  
	       
	        ['\\.(\\d?)\\.+', '.$1'], //禁止录入两个以上的点  
	        ['^(\\d+\\.\\d{2}).+', '$1'] //禁止录入小数点后两位以上  
    	];  
	    for(i=0; i<regStrs.length; i++){  
	        var reg = new RegExp(regStrs[i][0]);  
	        value = value.replace(reg, regStrs[i][1]);  
	    }
	    return value;
    }  
	$(document).on("keydown",".quick_bet_box input[type=text]",function(e){//右侧金额输入框
		if(keyBool){e.preventDefault();return false;}
		keyBool=true;
		
		var _this=$(this);
		var money=0;
		setTimeout(function(){
			var val=_this.val();
			val=moneyCheck(val);
			_this.val(val);
			if( _this.hasClass("right_quickBet_every_input") ){
				$(".right_quickBet_moneyInput").val(_this.val());
			}
			
			$(".right_quick_bet_content input[type=text]").each(function(){
				if( $(this).val() ){
					money+= $(this).val()*100 ;
				}
			}); 
			$('.right_quick_bet_tolMoney').html((money/100).toFixed(2));
			
		},0);
	}).on("keyup",'.quick_bet_box input[type=text]',function(){
		keyBool=false;
	})
	
	
	
})
