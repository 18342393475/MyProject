define(function(require,exports,module){
	
	var userMoney;//用户账户余额
	var periods;//当前期数
	var current={//存储当前的彩票类型、游戏类型、盘口类型等
		game_lx:null,
		cp_type:null,
		show_type:null
	};
	
	var rpcPost={ //存储正在投注的信息
		betBrders:{}, //非快捷投注对象的存储
		minMoney:{},
		maxMoney:{},
		Frame_05_OBJ:{},
		quick_betBrders:{} //快捷投注对象的数据存储
		
	}
	
	var timers={
		timer1:null,
		betTimer:null,
		oddsTimer:null,// 生成数据时的定时器
		midTabTimer:null // class="mid-Tab" 的定时器
	}
	
	var Interface = new PHPRPC_Client( 'http://118.184.23.233/memberRPC/phprpcClass/interface.class.php', ['serverInterface']);
    
    function isConsole(){
    	var search=window.location.search;
    	if(search.indexOf("?t")!=-1){
    		return true
    	}else{
    		return false
    	}
    }
    
		
	//统一RPC请求入口
	function getServerData(post,funName){
		//var Interface = new PHPRPC_Client( 'http://118.184.23.233/memberRPC/phprpcClass/interface.class.php', ['serverInterface']);
        if(!Interface){
        	Interface = new PHPRPC_Client( 'http://118.184.23.233/memberRPC/phprpcClass/interface.class.php', ['serverInterface']);
        }
        isConsole()?console.log(post):'';
		Interface.serverInterface( post, function ( result, args, output, warning ) {
			result=jQuery.parseJSON(result);
			if (output){ alert(output); }
			if(!result){
				
				return false
			}
			
			isConsole()?console.log(result):'';
 		    switch(parseFloat(result["status"])){				
				case 7777:
					funName&&funName(result);					
					break;
				case 8888:
					
					closeloadFn();
					
					top["dialong"]({
						title:'提示信息',
						html:'登录无效,请登录后再试',
						btn:["确定"]
					})
					
					top["loginOut"](); //退出登录
					
					break;
				default:
					
					closeloadFn();
					
					top["dialong"]({
						title:'提示信息',
						html:'系统维护中,请稍后再试',
						btn:["确定"]
					})
					
					break;
			}				
        }, true);
	};
	
	exports.getServerData=getServerData;
	exports.rpcPost=rpcPost;
	exports.periods=periods;
	exports.isConsole=isConsole;
	exports.current=current;
	var top=require("../top");//顶部公共部分
	var lotterys188=require("./lotterys188Template");//dom结构
	var quickBet=require("./lottery_quick_bet");//快捷投注
	var luziClass=require("./luziClass"); //路子
	var long_queue=require("./long_queue");//长龙
	
	$(function(){
		top["init"]();
		getCp_type();
		
		$(window).resize(function(){
			
			
			var clientH=$(window).height();
			var oMid=$("#mid");
			if(oMid.length){var oMidT=oMid.offset().top}else{return false;}
			
			$(".mid_center_scroll_box,.mid_center_box,.content_right ").height(clientH-oMidT+'px');

			var $article_middle_box=$(".article_middle_box");
			if( $article_middle_box.length ){
				$(".article_middle_box").css("height",clientH-$article_middle_box.offset().top-10+'px');
			
			}
			
		})
		$(".mid_center_box,.content_right").customScrollbar({updateOnWindowResize:true});
		
	})
	
	
	
	//得到彩票大类
	function getCp_type(){
		var post={'actID': 248, 'msTime': top["getCookie"]( 'msTime' )};
		getServerData( post ,function (result){
			var render=template.compile(lotterys188["mid_top"]);
			var html=render(result);
			$(".mid-top").html(html);
			$(".mid-top li").eq(0).addClass("active");
			
			current["show_type"]=result["data"][0];			
			
			getCp_game_lx();
			
			$(".mid-top ul li").off().on("click",function(){
					clearTimeout(timers["midTabTimer"]);
	
					$(this).addClass("active").siblings().removeClass("active");
					var show_type=$(this).attr("show-type");
					current["show_type"]=show_type;
					current["game_lx"]=null;
					current["cp_type"]=null;
					getCp_game_lx();
			})
			
			
		})
				
	}
	
	// 得到彩票小类以及状态
	function getCp_game_lx(){
		
		var post={'actID': 249, 'msTime': top["getCookie"]( 'msTime' ),'show_type':current["show_type"]};
			getServerData( post ,function (result){
				
				var render=template.compile(lotterys188["mid_Tab"]);
				var html=render(result);
				$(".mid-Tab").html(html);
				
				current["game_lx"]?'':current["game_lx"]=result["data"][0]["game_lx"];
				current["cp_type"]?'':current["cp_type"]=result["data"][0]["cp_type"];
				
				$(".mideTab_content_sub li[game_lx="+current["game_lx"]+"]").addClass("active").siblings().removeClass("active");
				
				game_lx_title();
				
				$(".mideTab_content_sub li").off().on("click",function(){
					$(this).addClass("active").siblings().removeClass("active");
					current["cp_type"]=$(this).attr("cp_type");
					current["game_lx"]=$(this).attr("game_lx");
					game_lx_title();
				})
				
				// 定时器刷新状态
				midTabTimerFun();
			})
		
	}
	//得到彩票小类的标题
	function game_lx_title(){
		var cpType=current["cp_type"];
		var render=template.compile(lotterys188["mid_Tag"]);
		var html=render(itemOBJ[cpType]);
		$(".mid-Tag").html(html);
		
		$(".mid-Tag .midTag_child").eq(0).addClass("active");
		current["panType"]=$(".mid-Tag .midTag_child.active").attr("pan_type");
		
		getOdds();
		
		$(".mid-Tag .midTag_child").off().on("click",function(){
			
			$(this).addClass("active").siblings().removeClass("active");
			current["panType"]=$(this).attr("pan_type");
			
			getOdds();
			
		})		
		
		var clientH=$(window).height();
		var oMidT=$("#mid").offset().top;
		$(".mid_center_scroll_box,.mid_center_box,.content_right ").height(clientH-oMidT+'px');
	
	}
	//得到赔率
	function getOdds(){
		var cp_type=current["cp_type"];
		var gamelx=current["game_lx"];							
		var panType=current["panType"];
		
		var post = {
			'actID':201,				
			'game_lx':gamelx, 
			'cp_type':cp_type=="k3"?'ks':cp_type,
			'panType':panType,			
			'msTime': top["getCookie"]( 'msTime' )
		};
		
		getServerData(post, function (result){
			periods=result["data"]["gameStatus"]["periods2"];
			
			gameInfo(result);//左侧 开奖信息
			
			getOdds_sub(result);//赔率
			var inputTextLen=$(".mid-Content").find("input[type=text]:visible").length;
				
			//生成 class="mid-Sure" 的内容
			if( inputTextLen ){
				createMidSureHtml()
			}else{
				$(".mid-Content").find(".mid-Sure").remove();
				
			}
			
			luziClass.getMidResult(); //生成路子
			long_queue.longQueue();//生成长龙
			
			
			$(".mid_center_box,.content_right").customScrollbar('resize',true);
			
			
		})
		
		
	}
	
	
	
	template.helper("hasT",function(value){
		return value.search(/^T/ig)!=-1?true:false;
	});
	template.helper("timeFormat",function(value){
		return  timeFormat(value);
	});
	template.config("cache",false);
	function timeFormat(value){
		var h=parseInt(value/3600);
		var m=parseInt((value-h*3600)/60);		
		var s=parseInt( value-h*3600-m*60);
		h=h<10?'0'+h:h;
		m=m<10?'0'+m:m;
		s=s<10?'0'+s:s;
		return h+":"+m+':'+s;
	}
	function getBgColor(itemID,number){
		var SpanBg="";
		//广西快乐十分 gxklsf
		if(itemID=="GXZM"){
			
			 switch (number){
                case "01": case "04": case "07": case "10": case "13": case "16": case "19":
                SpanBg = 'titleHong';
                break;
                case "02": case "05": case "08": case "11": case "14": case "17": case "20":
                SpanBg = 'titleLan';
                break;
                case "03": case "06": case "09": case "12": case "15": case "18": case "21":
                SpanBg = 'titleLv';
                break;
				default:
					SpanBg="midTWord_child_badges_special";
            }
            
		}else if(itemID=="LHZMT" || itemID=="LHLX" || itemID=="LHLW" || itemID=="LHTBHSX" || itemID=="LHZX" || itemID=="LHYX" || itemID=="TBH" || itemID=="LHZM" || itemID=="LHZXBZ" || itemID=="LHLM"){//六合彩
		
			 switch (number){
                case "01": case "02": case "07": case "08": case "12": case "13": case "18": case "19": case "23": case "24": case "29":
                case "30": case "34": case "35": case "40": case "45": case "46":
                SpanBg = 'titleHong';
                break;
                case "03": case "04": case "09": case "10": case "14": case "15": case "20": case "25": case "26": case "31": case "36":
                case "37": case "41": case "42": case "47":case "48":
                SpanBg = 'titleLan';
                break;
                case "05": case "06": case "11": case "16": case "17": case "21": case "22": case "27": case "28": case "32": case "33":
                case "38": case "39": case "43": case "44":case "49":
                SpanBg = 'titleLv';
                break;
				default:
					SpanBg="midTWord_child_badges_special";
            }
           
		}
		 
		return SpanBg;
	}
	template.helper("midTWord_child_badges",function(number,itemID){
		if(itemID=="SZHS" || itemID=="FCSZHS" || itemID=="EZHS" || itemID=="FCEZHS"){
			return "midTWord_child_badges_special";
		}else if( itemID=="LHTBHTS" || itemID=="LHTBHWS" || itemID=="LHZTWS" ){
			return 'midTWord_child_badges'
		}
		var isNumber=true;
		number=number.toString();
		var arr1=[1,2,3,4,5,6,7,8,9];
		var arr=['01','02','03','04','05','06','07','08','09'];
		
		var reg=new RegExp('['+arr.join("|")+']',"ig");
		var reg1=new RegExp('['+arr.join("|")+']',"ig");
		
		for(var i=0;i<number.length;i++){
			var str=number.charAt(i);
			if( str.match(reg)==null || str.match(reg1)==null ){
				isNumber=false;
			}
		}
		if( isNumber ){
			return "midTWord_child_badges";
		}else{
			return "midTWord_child_badges_special";
		}
	})
	
	template.helper("getBgColor",function(itemID,number){
	
			return getBgColor(itemID,number);
	
	});
	template.helper("getFrame08Bg",function(itemID,str){
		var arr=str.split(",");
		var html="";
		for(var i=0,len=arr.length;i<len;i++){
			
			html+='<div class="left frame_08_number midTWord_child_badges '+getBgColor(itemID,arr[i])+'">'+arr[i]+'</div>';
		
		}
		return html;
	})
	template.helper("getFrame08Number",function(itemID,a,odds){
		var str=odds[a];
		var arr=str.split(",");
		var html="";
		for(var i=0,len=arr.length;i<len;i++){
			
			html+='<div class="left midTWord_child_badges '+getBgColor(itemID,arr[i])+'">'+arr[i]+'</div>';
		
		}
		return html;
	});
	
	
	//生成赔率
	function getOdds_sub(result){
		lotterysEvent["result"]=result;
		
		var status=result["data"]["gameStatus"]["status"];
		if(status!=1){ //非投注时间
			
			if ( status == 2){			
				var render=template.compile(lotterys188["status2"]);
				var html=render(result["data"]["gameStatus"]);           
	        } 
			//数据状态为3
			if (status == 3){
	
				var render=template.compile(lotterys188["status3"]);
				var html=render(result["data"]["gameStatus"]);
			
			}
	
			$(".mid-Content").html(html);
	
			$(".article_middle_nowList_content").html("");
			if( $(".article_middle_nowList_content").css("display")=="block" ){
				$(".nowList_sub01_scroll_box").remove();
			}
			
		
			return false;
		}
		
		
		
		
		//快3
		if(current["cp_type"]=="k3"){
			createK3Odds(result);	
			//生成右侧快捷投注
			quickBet["quick_bet"]["right_quick_bet"]();
		
			return false;	
		}
		
		//非快三
		
		// 得到itemOBJ下面 彩票种类 所对应的 盘口类型 中item集合
        var itemObj = itemOBJ[current['cp_type']]['menu'][current['panType']]['item'];
		var arr=[];
		top["getCookie"]("k8_content_module")?"":top["setCookie"]("k8_content_module","module02");
		for(var itemID in itemObj){
			
			var idOBJ=itemObj[itemID];
			//依据 idOBJ 所对应的Frame_01~Frame_10 来做出内容的划分
			if(idOBJ["Frame_10"]){
				var data={
					odds:result["data"],
					date:PAN[itemID],
					itemID:itemID,
					current:PAN[itemID]["current"],
					title:idOBJ["titleName"],
					show_type:current["show_type"],
					cp_type:current["cp_type"],
					k8_module:top["getCookie"]("k8_content_module")
				}
				var render=template.compile(lotterys188["Frame_10"]);
				var html=render(data);
				arr.push(html);
			}
			if(idOBJ["Frame_09"]){
				var data={
					odds:result["data"],
					date:PAN[itemID],
					itemID:itemID,
					title:idOBJ["titleName"]
				}
				var render=template.compile(lotterys188["Frame_09"]);
				var html=render(data);
				arr.push(html);
			}
			if(idOBJ["Frame_08"]){
				var data={
					odds:result["data"],
					date:PAN[itemID],
					itemID:itemID,
					title:idOBJ["titleName"],
					current:PAN[itemID]["current"]
				}
				
				var render=template.compile(lotterys188["Frame_08"]);
				var html=render(data);
				arr.push(html);
			}
			if(idOBJ["Frame_07"]){
				var data={
					odds:result["data"],
					date:PAN[itemID],
					itemID:itemID,
					title:idOBJ["titleName"],
					current:PAN[itemID]["current"]
				}
				
				var render=template.compile(lotterys188["Frame_07"]);
				var html=render(data);
				arr.push(html);
			}
			if(idOBJ["Frame_06"]){
				var data={
					odds:result["data"],
					date:PAN[itemID],
					itemID:itemID,
					title:idOBJ["titleName"],
					current:PAN[itemID]["current"]
				}
				
				var render=template.compile(lotterys188["Frame_06"]);
				var html=render(data);
				arr.push(html);
			}
			if(idOBJ["Frame_05"]){
				var data={
					odds:result["data"],
					date:PAN[itemID],
					itemID:itemID,
					title:idOBJ["titleName"],
					current:PAN[itemID]["current"]
				}
				
				var render=template.compile(lotterys188["Frame_05"]);
				var html=render(data);
				arr.push(html);
			}
			if(idOBJ["Frame_04"]){
				var data={
					odds:result["data"],
					date:PAN[itemID],
					itemID:itemID,
					title:idOBJ["titleName"]
					
				}
				
				var render=template.compile(lotterys188["Frame_04"]);
				var html=render(data);
				arr.push(html);
			}
			if(idOBJ["Frame_03"]){
				var data={
					odds:result["data"],
					date:PAN[itemID],
					itemID:itemID,
					title:idOBJ["titleName"],
					current:PAN[itemID]["current"]
				}
				
				var render=template.compile(lotterys188["Frame_03"]);
				var html=render(data);
				arr.push(html);
			}
			if(idOBJ["Frame_02"]){
				var data={
					odds:result["data"],
					date:PAN[itemID],
					itemID:itemID,
					title:idOBJ["titleName"],
					current:PAN[itemID]["current"]
				}
				
				var render=template.compile(lotterys188["Frame_02"]);
				var html=render(data);
				arr.push(html);
			}
			if(idOBJ["Frame_01"]){
				var data={
					odds:result["data"],
					date:PAN[itemID],
					itemID:itemID,
					title:idOBJ["titleName"],
					current:PAN[itemID]["play_lx"],
					hasBg:PAN[itemID]["hasBg"],
					show_type:current["show_type"],
					cp_type:current["cp_type"],
					k8_module:top["getCookie"]("k8_content_module")
				}
				
				var render=template.compile(lotterys188["Frame_01"]);
				var html=render(data);
				arr.push(html);
			}
			
		}
		
		// 快8 主勢盤 样式
		if(current["cp_type"]=="bjkl8" && current["panType"]=="zsp" ){
			var k8_module=top["getCookie"]("k8_content_module");
			var str="";
			if(k8_module!="module02"){
				str="<div class='module02_k8' style='display:none;'>";
			}else{
				str="<div class='module02_k8'>";
			}
			arr.push(str);
			for(var itemID in itemObj){
				var idOBJ=itemObj[itemID];				
				if(idOBJ["Frame_01"]){ 
					
					var data={
						odds:result["data"],
						date:PAN[itemID],
						itemID:itemID,
						title:idOBJ["titleName"],
						current:PAN[itemID]["play_lx"],
						hasBg:PAN[itemID]["hasBg"],
						show_type:current["show_type"]
					}
					var render=template.compile(lotterys188["Frame_01_k8_zsp"]);
					var html=render(data);
					arr.push(html);

				}else if(idOBJ["Frame_10"]){
					console.log(PAN[itemID]);
					var data={
						odds:result["data"],
						date:PAN[itemID],
						itemID:itemID,
						current:PAN[itemID]["current"],
						title:idOBJ["titleName"]
					}
					var render=template.compile(lotterys188["Frame_10_k8_zsp"]);
					var html=render(data);
					arr.push(html);
				}
			}
			arr.push('</div>');
		}
		$(".mid-Content").html(arr.join(""));
		
		//生成右侧快捷投注
		quickBet["quick_bet"]["right_quick_bet"]();
		
		
	}
	
	//生成左侧开奖时间 中奖号码等
	function gameInfo(result){
		
		//生成左侧游戏信息 开奖时间 中奖号码等
		var render=template.compile(lotterys188["article_top"]);
		var html=render(result);
		$(".article_top").html(html);
		
		if(!$(".article_middle").html()){
			var render=template.compile(lotterys188["article_middle"]);
			var html=render({});
			$(".article_middle").html(html);
		}else if ( $(".article_middle_nowList_content").css("display")=="block" )
		{
			$(".nowList_sub01_scroll_box").remove();
		}
		
		$(".article_middle_box").css("height",$(window).height()-$(".article_middle_box").offset().top-10+'px');
		$('.article_middle_box').customScrollbar({updateOnWindowResize:true});
		
		//点击规则按钮
		$(".rule").on("click",function(){

			var cp_type=current["cp_type"];
			var gamelx=current["game_lx"];							
			var panType=current["panType"];

			var post={'actID': 602, 'game_lx': gamelx };
			getServerData( post, function (result){
				
				result.panType=gameRuleObj[cp_type][panType];
				
				var render=template.compile(lotterys188["gameRules"]);
				var html=render(result);
				$(".gameRules").remove();
				$(document).find("body").append(html);
				$(".alertOverlay").show();
				
				$(".gameRulesContent").customScrollbar();
				
				$(".closeGameRules").on("click",function(){
					$(".gameRules").remove();
					$(".alertOverlay").hide();
				})
			})
		})
		// 点击 切换
		$(".toggleStyle").on("click",function(){
			$(".module02_k8,.k3_content_module01").toggle();
			$(".module01,.k3_content_module02").toggle();
			
			$(".midSure_show_money").html("0");
			if( $(".mid-Content .k3_content_module02").length ){ //k3切换
				var k3model=top["getCookie"]("k3_content_module");
				if( k3model  ){
					
					if( k3model=="k3_content_module01" ){
						top["setCookie"]("k3_content_module","k3_content_module02");
					}else{
						top["setCookie"]("k3_content_module","k3_content_module01");
					}
				
				}
			}
			if( $(".mid-Content .module02_k8").length  ){
				var k8model=top["getCookie"]("k8_content_module");
				if( k3model  ){
					
					if( k3model=="module01" ){
						top["setCookie"]("k8_content_module","module02");
					}else{
						top["setCookie"]("k8_content_module","module01");
					}
				
				}
			}
			var inputTextLen=$(".mid-Content").find("input[type=text]:visible").length;
			//生成 class="mid-Sure" 的内容
			if( inputTextLen ){
				createMidSureHtml();
				var tolMoney=0;
				$(".mid-Content").find("input[type=text]").each(function(){
					if( $(this).val() ){
						tolMoney+=($(this).val())*100;

					}
				});
				$(".midSure_show_money").html( (tolMoney/100).toFixed(2) );
			}else{
				$(".mid-Content").find(".mid-Sure").remove();
				$(".mid-Sure").html("");
			}
			
		
			$(".mid_center_box").customScrollbar('resize',true);
			
		})
		// 点击刷新按钮
		$(".reload_btn").on("click",function(){
			getOdds();
		})
		
		
		clearBetInfo(true);//清理投注数据
		// 定时器部分
		var time=result["data"]["gameStatus"]["latetime"];
		clearInterval(timers["oddsTimer"]);
		timers["oddsTimer"]=setInterval(function(){
			
			if( isNaN( parseFloat(time)) ){
				time==0;
				clearInterval(timers["oddsTimer"]);
				return false;
			}

			time--;
			if(time<=0){
				$(".shi-jian").html("00:00:00").attr("time",0);
				clearInterval( timers["oddsTimer"] );
				getOdds(); 
			}else{
				$(".shi-jian").html(timeFormat(time)).attr("time",time);
			}
		},1000);
		
	}
	
	
	//清理投注数据
	function clearBetInfo(bool){
		rpcPost['betBrders'] = {}; //清空投注菜单上的数据
		rpcPost["minMoney"]={};
		rpcPost["maxMoney"]={};
		rpcPost["Frame_05_OBJ"]={};

		if(bool){
			$(".article_middle_nowList_content").html("暂无投注信息");
		}
	}
	//生成快三 赔率
	function createK3Odds(result){
			// 快3中游戏赔率
	
			top["getCookie"]("k3_content_module")?"":top["setCookie"]("k3_content_module","k3_content_module01");
				
			
			var arr=[];
			var data1=[];//单选 2同号
			var data2=[];//单选 3不同号
			var n=0;
			for(var key=1;key<7;key++){
				for(var i=1;i<7;i++){
					for(var a=1;a<7;a++){
						arr[0]=key;
						arr[1]=i;
						arr[2]=a;
						if( key!=i && i!=a && key!=a){
							if(key<i&&i<a){
                            
                            data2.push([key,i,a]);
							
                           }
						}
						if((key==i || i==a) && key!=a){
							if(i>=key && a>=i){
								
								data1.push([key,i,a]);
							}
						}
						
					}
				}
			}
			
			var data={
					newOdds:result["data"]["newOdds"],
					ETD:data1,
					SBT:data2,
					ZH:[4,5,6,7,8,9,10,11,12,13,14,15,16,17],
					EBT:['1,2','1,3','1,4','1,5','1,6','2,3','2,4','2,5','2,6','3,4','3,5','3,6','4,5','4,6','5,6'],
					DZ:['1,1','2,2','3,3','4,4','5,5','6,6'],
					BZ:['1,1,1','2,2,2','3,3,3','4,4,4','5,5,5','6,6,6'],
					model:top["getCookie"]("k3_content_module")
					
			}
			
			if(current["panType"]=="zsp"){
				var render=template.compile(lotterys188["k3Contentdata"]);
				var html=render(data);

			}else if(current["panType"]=="rxh"){
				var render=template.compile(lotterys188["k3Contentdata_rxh"]);
				var html=render(data);
			}
			$(".mid-Content").html(html); 
							   
	}
	
	
	
	//生成 class="mid-Sure"的内容
	function createMidSureHtml(){
		
		var render=template.compile(lotterys188["mid_Sure"]);
		var html=render();
		
		/*****在适当位置增加输入框 start************/
		var $len=$(".mid-Content").find(".mid_box").length;
		$(".mid-Content").find(".mid-Sure").remove();
		if($len>1){			
			$(".mid-Content").find(".mid_box:visible").after('<div class="mid-Sure">'+html+'</div>');

		}
		
		/*****在适当位置增加输入框 end************/

		$(".midSure_refreshBtn").off().on("click",function(){
			$(".mid-Content input[type=text]").val("");
			$(".midSure_show_money").html("0");
		})
		$(".midSure_sureBtn").off().on("click",function(){
			
			if( $(".midSure_show_money").html()==0 || !$(".mid-Content").find("input[type=text]").length ){return false;}
			$(".quickMoneyInput").val("");
			
			$(".mid-Content .frame_10,.mid-Content .frame_01,.mid-Content .k3").each(function(){
				
				$(this).find("input[type=text]").each(function(){
					if($(this).val()){
						$(this).siblings(".odds_pl").click();
					}
				});
			});

		})
		
	}
	
		
	/******** class="mid-Tab" 的定时器 start**********/
		
	function midTabTimerFun(){
		var latetime=Number( $(".mideTab_content_sub li").eq(0).attr("latetime") );
		if(!latetime){clearTimeout(timers["midTabTimer"]);return false;}
		$(".mideTab_content_sub li").each(function(){
			var lateTime=Number( $(this).attr("latetime") );
			if(lateTime<latetime){	
				latetime=lateTime;
			}
		});
		
		clearTimeout(timers["midTabTimer"]);	
		timers["midTabTimer"]=setTimeout(function(){			
			var post={'actID': 249, 'msTime': top["getCookie"]( 'msTime' ),'show_type':current["show_type"]};
			getServerData( post ,function (result){
				
				var render=template.compile(lotterys188["mid_Tab"]);
				var html=render(result);
				$(".mid-Tab").html(html);						
				midTabTimerFun();
				
				current["game_lx"]?'':current["game_lx"]=result["data"][0]["game_lx"];
				current["cp_type"]?'':current["cp_type"]=result["data"][0]["cp_type"];
				
				$(".mideTab_content_sub li[game_lx="+current["game_lx"]+"]").addClass("active").siblings().removeClass("active");
				
				$(".mideTab_content_sub li").off().on("click",function(){
					$(this).addClass("active").siblings().removeClass("active");
					current["cp_type"]=$(this).attr("cp_type");
					current["game_lx"]=$(this).attr("game_lx");
					game_lx_title();
				})
				
			});				
		},latetime*1000);
		
	}

	/******** class="mid-Tab" 的定时器 end **********/

	
	
	
	// 点击事件
		var lotterysEvent={
			result:null,
			//点击 class="midTWord_tab_child" 时(点击标题)
			frame_01_title_click:function(elem){
				var result=this.result;
					elem.addClass("midTWord_tab_childAct").siblings().removeClass("midTWord_tab_childAct");
				var clas=elem.closest(".mid_box").attr("class");
				var frame=clas.substr( clas.indexOf("frame"),8 );
				var $midTWord_outer=elem.closest(".midTWord_tab").siblings(".midTWord_outer");
				var current=elem.attr("id");
				
				var itemID=elem.closest(".mid_box").attr("itemid");
				var data={
						odds:result["data"],
						date:PAN[itemID],
						itemID:itemID,
						//title:idOBJ["titleName"],
						current:current,
						hasBg:PAN[itemID]["hasBg"]
				}
				
				var render=template.compile( lotterys188[frame+"_title_click"] );
				var html=render(data);
				$midTWord_outer.html(html);
				
				var $mid_box=elem.closest(".mid_box");
				if( $mid_box.hasClass("frame_01") || $mid_box.hasClass("frame_10") ){
					for(var key in rpcPost["betBrders"]){
						$(".mid-Content").find(".odds_box[name="+key+"]").find(".odds_pl").addClass("checked").end().find("input[type=text]").val( $(".article_middle_nowList_content_sub01").find("#"+key).find("input[type=text]").val()  );
					
					}
					//处理右侧 快捷投注
					$(".right_quick_bet_li_checked").removeClass("right_quick_bet_li_checked");
					$(".right_quick_bet_num,.right_quick_bet_tolMoney").html(0);
					$(".right_quickBet_every_input").val("");
					$(".right_quick_bet_content").html("");
					rpcPost["quick_betBrders"]={};
				}
				$mid_box.hasClass("frame_02")?$mid_box.find(".frame_02_odds_box").html(""):'';
				$mid_box.hasClass("frame_02")?midCenterScroll():'';
				
				
				if( $mid_box.hasClass("frame_03") ){
					if( itemID === 'FCHSZXS' || itemID === 'FCHSZXL' || itemID === 'ZXS' || itemID === 'ZXL' ){
						$mid_box.find(".odds_pl").html("")
					}else if( itemID=="YWRX" ){
						$mid_box.find(".odds_pl").html(result["data"]["newOdds"][current]);	
					}
				}
				if( $mid_box.hasClass("frame_05") ){
					var jsonDataMid=result["data"]["newOdds"];
					if(itemID=="LHZXBZ"){
						$mid_box.find(".odds_pl").html(result["data"]["newOdds"][itemID+current])
					}else if ( itemID === 'LHLM' || itemID === 'KBBJKLXH' ){
						//showOdds = "[ " + jsonDataMid[gamePlay] + " ]";
						showOdds = "[ " + jsonDataMid[current] + " ]";
						if (current === 'LHEZT' || current === 'LHSZE'|| current === 'KBXS'|| current === 'KBXSI'|| current === 'KBXW'){
							var gamePlay=current;
							var sumber = 0;
							var sum = PAN[itemID]['td'];
							showOdds = "[ ";
							for (var id in sum[gamePlay]){
								(sumber === 0) ? showOdds += sum[gamePlay][id] +"："+ jsonDataMid[gamePlay + id] : showOdds += "，" + sum[gamePlay][id] +"："+ jsonDataMid[gamePlay + id];
								sumber++;
							}
							showOdds += " ]";
						}
						$mid_box.find(".odds_pl").html(showOdds);	
					
					}
					
				}
				
				$mid_box.hasClass("frame_07")?$mid_box.find(".odds_pl").html(""):'';
				$mid_box.hasClass("frame_08")?$mid_box.find(".frame_08_odds_box_sub .odds_pl").html(""):'';
				
				if(frame=="frame_02" && PAN[itemID]["current_text"] ){
					
					if(itemID=="FCEZDW" || itemID=="EZDW" || itemID=="SZDW"){
						var reg=/_/ig;
						var str=elem.attr("id");
						var arr=null;
						var arrIndex=[];
						
						while((arr=reg.exec(str))!=null ){
							var i=str.charAt( arr["index"]-1 );
							var i2=str.charAt(reg.lastIndex);
							
							var val1=PAN[itemID]["td"][i];
							var val2=PAN[itemID]["td"][i2];
							if(arrIndex.join().indexOf(val1)==-1){
								arrIndex.push( val1 );
							}
							if(arrIndex.join().indexOf(val2)==-1){
								arrIndex.push( val2 );
							}
						}
						
						$midTWord_outer.find(".frame_02_box_text").each(function(i){
							$(this).html(arrIndex[i]);
						});
						
					}else{
						$midTWord_outer.find(".frame_02_box_text").html(elem.html())
					}
	
				}
				
			},
			frame_02_number_click:function(elem){
				var result=this.result;
				var itemID=elem.closest(".mid_box").attr("itemid");
				elem.toggleClass("titleLv");
				var storageNo = {}, trNo = "", oddsHtml = [], jsonDataMid = result["data"];
				if (itemID === "EZDW" || itemID === "SZDW" || itemID === "FCEZDW" || itemID === 'FCSZDW'){ trNo = this.getPlaylxObj(itemID)['DingWei']; }
				if (itemID === "FCEZZH" || itemID === "FCZZX" || itemID === "SZSXE" || itemID === "SZZX"){ trNo = this.getPlaylxObj(itemID)['ZuHe']; }
				if (itemID === "EZZX" || itemID === 'FCEZZX'){ trNo = this.getPlaylxObj(itemID)['ZuXuan']; }
				for (var i = 0; i < trNo; i++){	
					storageNo[itemID + i] = [];
					var checkNo = elem.closest(".mid_box").find("[name="+itemID+i+"]").find(".titleLv");
					for (var j = 0, len = checkNo.length; j < len; j++){ 
						storageNo[itemID + i].push(checkNo.eq(j).attr("i")); 
					}
				}
				
				for (var id in storageNo){
					if (storageNo[id].length == 0){
						elem.closest(".mid_box").find(".frame_02_odds_box").html("");
						return;
					}
				}
				if (itemID=="EZZX" || itemID=='FCEZZX'){	
					var len=storageNo[itemID+"0"].length;
					if(len<2){
						elem.closest(".mid_box").find(".frame_02_odds_box").html(""); 
						return false;
					}
					var play_lx=elem.closest(".mid_box").find(".midTWord_tab_childAct").attr("id");
					var data={},n=0;
					for (var i = 0, len = storageNo[itemID + "0"].length; i < len; i++){
						for (var j = 0, LEN = storageNo[itemID + "0"].length; j < LEN; j++){
							if (storageNo[itemID + "0"][i] === storageNo[itemID + "0"][j] || storageNo[itemID + "0"][i] > storageNo[itemID + "0"][j]){ continue; }
							odds = result["data"]["newOdds"][elem.closest(".mid_box").find(".midTWord_tab_childAct").attr('id')];			
							data[n]={
										  0:storageNo[itemID + "0"][i],
										  1:storageNo[itemID + "0"][j],
										  odds:odds,
										  play_lx:play_lx
										 };
							n++;
						}
					}
					var render=template.compile(lotterys188["EZZX_click"]);
					var html=render({data:data});									
				}
				if (itemID == "EZDW" || itemID == "SZDW" || itemID == "FCEZDW" || itemID == 'FCSZDW'){
						var data={},NoArr = [],n=0; //存放遍历组合的号码
						var play_lx='';
	
						if (itemID === 'FCSZDW'){
	                        var oddsArr = 'FCSZ';
							play_lx=itemID;
	                    }else {
	                        var oddsArr = elem.closest(".mid_box").find(".midTWord_tab_childAct").attr('id').split('_').join("");
							play_lx=      elem.closest(".mid_box").find(".midTWord_tab_childAct").attr("id");
						}
							
	                    for (var i = 0, len = storageNo[itemID + "0"].length; i < len; i++){
	                        for (var j = 0, Len = storageNo[itemID + "1"].length; j < Len; j++){
	                            if (storageNo[itemID + "2"]){
	                                for (var k = 0, LEN = storageNo[itemID + "2"].length; k < LEN; k++){
	                                   
										data[n]={
										
											0:storageNo[itemID + "0"][i],
											1:storageNo[itemID + "1"][j],
											2:storageNo[itemID+'2'][k],
											odds:result["data"]["newOdds"][oddsArr+'DW'],
											play_lx:play_lx
										}
										n++;
									}
	                            }else{
	                                
									data[n]={
										
										0:storageNo[itemID + "0"][i],
										1:storageNo[itemID + "1"][j],
										odds:result["data"]["newOdds"][oddsArr+'DW'],
										play_lx:play_lx
									}
									n++;
								}
	                        }
	                    }
						var render=template.compile(lotterys188["frame_02_DW"]);
						var html=render({data:data});
						
				}
				if (itemID === "FCEZZH" || itemID === "FCZZX" || itemID === "SZSXE" || itemID === "SZZX"){
					var NoArr = [],data={},n=0; //存放遍历组合的号码和赔率，属性是号码，值是赔率
					var jsonDataMid = result['data']['newOdds'], sumOdds = 0, odds = 0;
					if (itemID === "FCEZZH" || itemID === "FCZZX"){ 
						var play_lx = itemID;
					}else{
						var play_lx=elem.closest(".mid_box").find(".midTWord_tab_childAct").attr("id");
					
					}
					
					for (var i = 0, len = storageNo[itemID + "0"].length; i < len; i++){
						for (var j = 0, Len = storageNo[itemID + "1"].length; j < Len; j++){
							if (itemID == "FCEZZH"){
								if (storageNo[itemID + "0"][i] > storageNo[itemID + "1"][j]){ continue; }
								if (storageNo[itemID + "0"][i] == storageNo[itemID + "1"][j]){ odds = jsonDataMid[itemID + "t"]; };
								if (storageNo[itemID + "0"][i] < storageNo[itemID + "1"][j]){ odds = jsonDataMid[itemID + "y"]; };
							
								data[n]={
									0:storageNo[itemID + "0"][i],
									1:storageNo[itemID + "1"][j],
									odds:odds,
									play_lx:play_lx
								}
								n++;
							}
	
							if (itemID == "SZSXE"){
								if (storageNo[itemID + "0"][i] > storageNo[itemID + "1"][j]){ continue; }
								if (storageNo[itemID + "0"][i] == storageNo[itemID + "1"][j]){ odds = jsonDataMid[ elem.closest(".mid_box").find(".midTWord_tab_childAct").attr('id') + "t"]; };
								if (storageNo[itemID + "0"][i] < storageNo[itemID + "1"][j]){ odds = jsonDataMid[ elem.closest(".mid_box").find(".midTWord_tab_childAct").attr('id') + "y"]; };
								
								data[n]={
									0:storageNo[itemID + "0"][i],
									1:storageNo[itemID + "1"][j],
									odds:odds,
									play_lx:play_lx
								}
								n++;
							}
	
							if (itemID == "FCZZX" || itemID == "SZZX"){
								for (var k = 0, LEN = storageNo[itemID + "2"].length; k < LEN; k++){
									if (storageNo[itemID + "0"][i] > storageNo[itemID + "1"][j] || storageNo[itemID + "0"][i] > storageNo[itemID + "2"][k] || storageNo[itemID + "1"][j] > storageNo[itemID + "2"][k]){ continue; }
									if (storageNo[itemID + "0"][i] === storageNo[itemID + "1"][j] || storageNo[itemID + "1"][j] === storageNo[itemID + "2"][k]){
										odds = jsonDataMid[itemID + "t"];
										if (itemID === "SZZX"){odds = jsonDataMid[elem.closest(".mid_box").find(".midTWord_tab_childAct").attr('id') + "t"]; }
									}
									if (storageNo[itemID + "0"][i] === storageNo[itemID + "1"][j] && storageNo[itemID + "0"][i] === storageNo[itemID + "2"][k]){
										odds = jsonDataMid[itemID + "a"];
										if (itemID === "SZZX"){odds = jsonDataMid[ elem.closest(".mid_box").find(".midTWord_tab_childAct").attr('id')+ "a"]; }
									}
									if (storageNo[itemID + "0"][i] < storageNo[itemID + "1"][j] && storageNo[itemID + "1"][j] < storageNo[itemID + "2"][k]){
										odds = jsonDataMid[itemID + "y"];
										if (itemID === "SZZX"){odds = jsonDataMid[ elem.closest(".mid_box").find(".midTWord_tab_childAct").attr('id') + "y"]; }
									}
									
									data[n]={
										0:storageNo[itemID + "0"][i],
										1:storageNo[itemID + "1"][j],
										2:storageNo[itemID + "2"][k],
										odds:odds,
										play_lx:play_lx
									}
									n++;
								}
							}
						}
					}
					
					var render=template.compile(lotterys188["frame_02_frame_02_number"]);
					var html=render({data:data});
		
				}
				elem.closest(".mid_box").find(".frame_02_odds_box").html(html);
				
			},
			frame_03_number_click:function(elem){
				if( elem.hasClass("titleHui") ){
					return false;
				}
				var result=this.result;
				var itemID=elem.closest(".mid_box").attr("itemid");
	
				elem.toggleClass("titleLv");
				
				var userSelect = elem.closest(".mid_box").find(".titleLv");
	            var jsonDataMid = result['data']['newOdds'];
	           
	            if (itemID === 'FCHSZXS' || itemID === 'FCHSZXL' || itemID === 'ZXS' || itemID === 'ZXL'){
					elem.closest(".mid_box").find(".odds_pl").html("");
					if (userSelect.length < PAN[itemID]['td'][1]){
						elem.closest(".mid_box").find(".frame_03_number").removeClass("titleHui");
					}
					if (userSelect.length >= PAN[itemID]['td'][0] && userSelect.length <= PAN[itemID]['td'][1]){
						var ItemID = itemID;
						if (itemID == 'ZXS' || itemID == 'ZXL'){ 
							ItemID = elem.closest(".mid_box").find(".midTWord_tab_childAct").attr("id");
							
						}
						
						elem.closest(".mid_box").find(".odds_pl").html(jsonDataMid[ItemID + userSelect.length]);
						if (userSelect.length == PAN[itemID]['td'][1]){
							
							elem.closest(".mid_box").find(".frame_03_number:not(.titleLv)").addClass("titleHui");
						}
					}
	            }
				
			},
			frame_04_empty_click:function(elem){
				var result=this.result;
				var itemID=elem.closest(".mid_box").attr("itemid");
				
				elem.closest(".mid_box").find("input[type=radio]").removeAttr("checked");
				elem.closest(".mid_box").find(".odds_pl").html("");
			
			},
			frame_04_radio_click:function(elem){
				
				var result=this.result;
				var itemID=elem.closest(".mid_box").attr("itemid");
	
				var userSelect = elem.closest(".mid_box").find("input[type=radio]:checked");
				if (userSelect.length > 1){
					var bet_obj = new Array(), odds = 1;
					for (var i = 0, len = userSelect.length; i < len; i++){ 
						bet_obj.push( userSelect.eq(i).val() );
						
					}
					var  betObj = "", jsonDataMid = result['data'];
					
					for (var i = 0, len = bet_obj.length; i < len; i++){
						odds *= jsonDataMid['newOdds'][bet_obj[i]];
						var DStr = this['getDaXiaoString'](bet_obj[i], 'd');
						var XStr = this['getDaXiaoString'](bet_obj[i], 'x');
						(i === 0) ? betObj += objName[DStr] + '_' + objName[XStr] : betObj += ('，' + objName[DStr] + '_' + objName[XStr]);
					}
					elem.closest(".mid_box").find(".odds_pl").html(odds.toFixed(2));
				};
				
			},
			frame_05_number_click:function(elem){
				
				if(elem.hasClass("titleHui")){return false;}
				var result=this.result;
				var itemID=elem.closest(".mid_box").attr("itemid");
			
				var jsonDataMid = result['data']['newOdds'];
					
				var $frame_05_number_box=elem.closest(".frame_05_number_box");
				var $mid_box=elem.closest(".mid_box");
				var $midTWord_tab_childAct=$mid_box.find(".midTWord_tab_childAct");
				var itemID=$mid_box.attr("itemid");
				if( itemID!="KBBJKLXH" ){
					elem.toggleClass("titleLv");
				}
	
				if (itemID == 'PKQE' || itemID == 'PKQS' || itemID == 'PKQSI'){
						elem.siblings().removeClass("titleHui");
						var isCheckBox = $mid_box.find(".frame_05_number.titleLv");
						var val=elem.html();
						
						var arr=[];
						isCheckBox.each(function(){
							arr.push($(this).html());
						})
						
						if(arr.length){
							$mid_box.find(".frame_05_number_box").each(function(){
								var bool=true;
								$(this).find(".frame_05_number").each(function(){
									
									if( $(this).hasClass("titleLv") ){
										$(this).parent().siblings().children().addClass("titleHui");
										bool=false;
										return false;
									}
								})
								if(bool){
									$(this).find(".frame_05_number").each(function(){
									
										if( arr.join().match( $(this).html() ) ){
											$(this).addClass("titleHui");
											
										}else{
											$(this).removeClass("titleHui");
										}
									})
								}
							
							})
						}else{
							$mid_box.find(".frame_05_number").removeClass("titleHui");
						}

						var checkObj = {PKQE: 2, PKQS: 3, PKQSI: 4}, showOdds = "", oddsStrObj = {PKQE: ['中二', '中一'], PKQS: ['中三', '中二'], PKQSI: ['中四', '中三', '中二']};
						if (isCheckBox.length == checkObj[itemID]){
							for (var i = 0, len = oddsStrObj[itemID].length; i < len; i++){
								(i === 0) ? showOdds += oddsStrObj[itemID][i] +"："+ jsonDataMid[itemID + i] : showOdds += "，" + oddsStrObj[itemID][i] +"："+ jsonDataMid[itemID + i];
							}
						}
						elem.closest(".mid_box").find(".odds_pl").html(showOdds);
				}else if(itemID=="FCFSZH"){
						var allSelect = $mid_box.find(".frame_05_number");
						var userSelect = $mid_box.find(".titleLv");
						if (userSelect.length >= 9 && userSelect.length <= 21){
							var bool=false;
							var oddsNo=1;
							elem.closest(".mid_box").find(".frame_05_number_box").each(function(){
								if(!$(this).find(".titleLv").length){
									bool=true;
									return false;
								}
								
								oddsNo*=$(this).find(".titleLv").length;
							});
							
							if(bool){return false;}
							var FSZHOdds = (jsonDataMid[itemID]/oddsNo).toFixed(2);
							$mid_box.find(".odds_pl").html(FSZHOdds);
							showOdds = FSZHOdds;
							if (userSelect.length === 21){
								//$("#" + itemID + " input[type='checkbox']:not(:checked)").attr({disabled: 'disabled'});
								$mid_box.find(".frame_05_number:not(.titleLv)").addClass("titleHui");
							}else{
								$mid_box.find(".frame_05_number").removeClass("titleHui");
							}
						}else{
							$mid_box.find(".odds_pl").html('');
							$mid_box.find(".frame_05_number").removeClass("titleHui");	
						}
				}else if(itemID=="KBBJKLXH" ){
					
					var min=PAN[itemID]["min"][$midTWord_tab_childAct.attr("id")];
					var max=PAN[itemID]["max"][$midTWord_tab_childAct.attr("id")];
					
					var $frame_05_box=$mid_box.find(".frame_05_box");
					
					if( !elem.hasClass("titleLv") && $frame_05_box.find(".titleLv").length>(max-1) ){
						
						return false;
					}else{
						elem.toggleClass("titleLv");
					}
					var n=$frame_05_box.find(".titleLv").length;
					var m=min;
					var arr=[];
					$frame_05_box.find(".titleLv").each(function(){
						arr.push($(this).html());
					});
					$mid_box.find(".combination_number").html(arr.join(","));
					if(n<m){		
						$mid_box.find(".combination_num").html(0);
						$mid_box.find(".combination_content_sub").html('');
						return false;
					}			
					var result1=C(arr,m);
					$mid_box.find(".combination_num").html(result1.length);
					$mid_box.find(".combination_content_sub").html("<ul><li>"+result1.join("</li><li>")+'</li></ul>');
				}
				
			},
			frame_05_number_box_sub:function(elem){
				// LHLM LHZXBZ 
				var $frame_05_number_box=elem.closest(".frame_05_number_box");
				var $mid_box=elem.closest(".mid_box");
				var $midTWord_tab_childAct=$mid_box.find(".midTWord_tab_childAct");
				var itemID=$mid_box.attr("itemid");
				
				var max=PAN[itemID]["max"][$midTWord_tab_childAct.attr('id')];
				if( itemID=="LHLM" && $mid_box.find(".frame_05_box_title").find("input[type=radio]:checked").val()=="dt" ){
						// 六合连码 中的胆拖
						var play_lx=$mid_box.find(".midTWord_tab_childAct").attr("id");
						if( play_lx=="LHSIZSI" || play_lx=="LHSZS" || play_lx=="LHSZE" ){
							var maxdm=PAN[itemID]["min"][play_lx];
						}else if( play_lx=="LHEZE" || play_lx=="LHEZT" || play_lx=="LHTC"  ){
							var maxdm=4;
						}
						var dm_arr=[];
						var tm_arr=[];
						if( $frame_05_number_box.hasClass("dm") ){ //胆码
	
							if( ! elem.children("div").eq(0).hasClass("frame_05_checked_bg")){
								var len=$frame_05_number_box.find(".frame_05_checked_bg").length;
								if(len>=maxdm-1){return false;}
							}
							elem.children("div").eq(0).toggleClass("frame_05_checked_bg");
							
							var val=elem.children("div").eq(0).attr("value");
							$mid_box.find(".tm").find("div[value="+val+"]").removeClass("frame_05_checked_bg").parent().toggleClass("opacity");
							
						}else{ //拖码
							if( elem.hasClass("opacity") ){return false;}
							elem.children("div").eq(0).toggleClass("frame_05_checked_bg");
													
						}
	
						$mid_box.find(".dt").find(".dm").find(".frame_05_checked_bg").each(function(){
							dm_arr.push($(this).attr("value"));
						});
						$mid_box.find(".dt").find(".tm").find(".frame_05_checked_bg").each(function(){
							tm_arr.push($(this).attr("value"));
						});
	
						var n=tm_arr.length;
						if( play_lx=="LHSIZSI" || play_lx=="LHSZS" || play_lx=="LHSZE" ){
							
							var m=maxdm-dm_arr.length;
						}else if( play_lx=="LHEZE" || play_lx=="LHEZT" || play_lx=="LHTC" ){
							var m=1;
						}	
						
						
						var dm_join=","+dm_arr.join(",");
						if(n!=0 && dm_arr.length>0 && (n+dm_arr.length)>=maxdm  && n>=m){
							this.bet_number_length=n;
							this.bet_number_filter_length=m;
							
							var result=C(tm_arr,m);
								
							if( play_lx=="LHSIZSI" || play_lx=="LHSZS" || play_lx=="LHSZE" ){
								$mid_box.find(".dt").find(".combination_num").html(result.length);
								$mid_box.find(".dt").find(".combination_content_sub").html('<ul><li>'+result.join(dm_join+'</li><li>')+dm_join+'</li></ul>');
							}else if( play_lx=="LHEZE" || play_lx=="LHEZT" || play_lx=="LHTC" ){
								var result1=[];
								for(var i=0;i<result.length;i++){
									for(var a=0;a<dm_arr.length;a++){
										result1.push([result[i].join(","),dm_arr[a]]);
									}
								}
								
								$mid_box.find(".dt").find(".combination_num").html(result1.length);
								$mid_box.find(".dt").find(".combination_content_sub").html('<ul><li>'+result1.join('</li><li>')+'</li></ul>');
							}
						}else{
							$mid_box.find(".dt").find(".combination_num").html(0);
							$mid_box.find(".dt").find(".combination_content_sub").html("");
						}
	
						$mid_box.find(".dt").find(".combination_number").html("<div>胆码:<div class='dm_number'>"+(dm_arr.length?dm_arr.join(","):'暂无')+"</div></div><div>拖码:<div class='tm_number'>"+(tm_arr.length?tm_arr.join(","):'暂无')+"</div></div>");
						
				}else{
					
					if( ! elem.children("div").eq(0).hasClass("frame_05_checked_bg")){
						var len=$frame_05_number_box.find(".frame_05_checked_bg").length;
						if(len>=max){return false;}
					}
					elem.children("div").eq(0).toggleClass("frame_05_checked_bg");
					var checked_number=new Array();
					$frame_05_number_box.find(".frame_05_checked_bg").each(function(){
						checked_number.push($(this).attr("value"));
					})
					var len=checked_number.length;
					$mid_box.find(".combination_number").html(checked_number.join(" "));
					
					if(itemID=="LHZXBZ"){
						minNum=$midTWord_tab_childAct.attr("id");
					}else if( itemID=="LHLM" ){
						minNum=PAN[itemID]["min"][$midTWord_tab_childAct.attr('id')]
					}
					if(len>=minNum){
						this.bet_number_length=len;
						this.bet_number_filter_length=minNum;
						
						$mid_box.find(".combination_num").html(C(checked_number,minNum).length);						
						$mid_box.find(".combination_content_sub").html('<ul><li>'+C(checked_number,minNum).join("</li><li>")+'</li></ul>');
						
					}else{
						$mid_box.find(".combination_num").html(0);
						$mid_box.find(".combination_content_sub").html('');
					}	
					
				}
			},
			frame_05_number_sure:function(elem){
				
				var bool=this.checkUid();
				if(!bool){return false;}
	
				var $mid_box=elem.closest(".mid_box");
				var itemID=$mid_box.attr("itemid");
				var $midTWord_tab_childAct=$mid_box.find(".midTWord_tab_childAct");
				var len=$mid_box.find(".frame_05_checked_bg").length;
				var minNum=$midTWord_tab_childAct.attr("id");
				if( itemID=="LHZXBZ" || (itemID=="LHLM" && $mid_box.find(".frame_05_box_title").find("input[type=radio]:checked").val()=="zx") ){
					if( itemID=="LHLM" ){minNum=PAN[itemID]["min"][minNum];}
					
					if(len<minNum){return false}
				}else if( itemID=="PKQE" || itemID=="PKQS" || itemID=="PKQSI" ){
					
					if(!$mid_box.find(".odds_pl").html()){return false;}
				}else if( itemID=="KBBJKLXH" ){
					var min=PAN[itemID]["min"][minNum];
					var $frame_05_box=$mid_box.find(".frame_05_box");
					if( $frame_05_box.find(".titleLv").length<min ){
						return false;
					}
				}
				
				
				var playOBJ,play_lx,odds,bet_obj,obj_name;//注单数据
				var ODDS;
				
				if(itemID == 'LHLM' || itemID == 'KBBJKLXH' ){ 
					play_lx = $midTWord_tab_childAct.attr('id');
				}else if(itemID=="LHZXBZ"){
					play_lx=itemID+minNum;
				}else{
					play_lx = itemID;
				}
	
				var jsonDataMid = this.result['data']['newOdds'];
				var periods=this.result["data"]["gameStatus"]["periods2"];
					
				if ( itemID === 'LHLM' || itemID === 'KBBJKLXH' ){
					showOdds = "[ " + jsonDataMid[play_lx] + " ]";
					if (play_lx === 'LHEZT' || play_lx === 'LHSZE'|| play_lx === 'KBXS'|| play_lx === 'KBXSI'|| play_lx === 'KBXW'){
						var gamePlay=play_lx;
						var sumber = 0;
						var sum = PAN[itemID]['td'];
						showOdds = "[ ";
						for (var id in sum[gamePlay]){
							(sumber === 0) ? showOdds += sum[gamePlay][id] +"："+ jsonDataMid[gamePlay + id] : showOdds += "，" + sum[gamePlay][id] +"："+ jsonDataMid[gamePlay + id];
							sumber++;
						}
						showOdds += " ]";
					}
					ODDS=odds=showOdds;
				}else if( itemID=="PKQE" || itemID=="PKQS" || itemID=="PKQSI" ){
					ODDS=odds=$mid_box.find(".odds_pl").html();
				}else{
					ODDS=odds = jsonDataMid[play_lx];
				}
	
				if(itemID=="LHZXBZ" || (itemID=="LHLM" && $mid_box.find(".frame_05_box_title").find("input[type=radio]:checked").val()=="zx" )){
					
					var arrNumber=[];				
					$mid_box.find(".frame_05_checked_bg").each(function(){
						arrNumber.push($(this).attr("value"));
					});
					obj_name=bet_obj=arrNumber.join("_");
	
					playOBJ=play_lx;
					var arr=C(arrNumber,minNum);
					rpcPost["betBrders"][playOBJ]={
						periods:periods, 
						'game_lx': current['game_lx'],
						'play_lx':play_lx,
						'bet_obj':bet_obj,
						'betMoney':0,
						'odds':ODDS, 
						'obj_name':obj_name,
						combination_num:arr.length,
						combination_result:arr,
						'message':'共'+arr.length+'种组合'
					}
					
				}else if( itemID=="LHLM" && $mid_box.find(".frame_05_box_title").find("input[type=radio]:checked").val()=="dt"  ){
					// 六合 连码 中的 胆拖
					
					playOBJ=play_lx;
					var dm_arr=[];
					var tm_arr=[];
					$mid_box.find(".dt").find(".dm").find(".frame_05_checked_bg").each(function(){
						dm_arr.push($(this).attr("value"));
					});
					$mid_box.find(".dt").find(".tm").find(".frame_05_checked_bg").each(function(){
						tm_arr.push($(this).attr("value"));
					});
	
					var n=tm_arr.length;
					if( play_lx=="LHSIZSI" || play_lx=="LHSZS" || play_lx=="LHSZE" ){
						var maxdm=PAN[itemID]["min"][play_lx];
						var m=maxdm-dm_arr.length;
					}else if( play_lx=="LHEZE" || play_lx=="LHEZT" || play_lx=="LHTC" ){
						var maxdm=4;
						var m=1;
					}
					var m=maxdm-dm_arr.length;
					
					var dm_join=","+dm_arr.join(",");
					if(n!=0 && dm_arr.length>0 && (n+dm_arr.length)>=maxdm  && n>=m){
						this.bet_number_length=n;
						this.bet_number_filter_length=m;
						var num=this.combination_num();
						if(num>PAN[itemID]["maxNum"][$midTWord_tab_childAct.attr('id')]){
							top["dialong"]({
								"title":'组合种类太多啦',
								"html":'亲,组合种类不应大于'+PAN[itemID]["maxNum"][$midTWord_tab_childAct.attr('id')],
								"btn":["确定"]
							});
							return false;
						}
						
						var result=C(tm_arr,m);
						
						var result1=[];
						
						if( play_lx=="LHSIZSI" || play_lx=="LHSZS" || play_lx=="LHSZE" ){
							for(var i=0;i<result.length;i++){
								result1.push(result[i].concat(dm_arr));
							}
						}else if( play_lx=="LHEZE" || play_lx=="LHEZT" || play_lx=="LHTC" ){
							for(var i=0;i<result.length;i++){
								for(var a=0;a<dm_arr.length;a++){
									result1.push([result[i].join(","),dm_arr[a]]);
								}
							}
						}
						
					}else{
						return false;
					}
	
					rpcPost["betBrders"][playOBJ]={
						periods:periods, 
						'game_lx': current['game_lx'],
						'play_lx':play_lx,
						'bet_obj':bet_obj,
						'betMoney':0,
						'odds':ODDS, 
						'obj_name':obj_name,
						combination_num:result1.length,
						combination_result:result1,
						play_type:'dt',
						dan:dm_arr,
						tuo:tm_arr,
						'message':'共'+result1.length+'种组合'
					}
				
				}else if( itemID=="PKQE" || itemID=="PKQS" || itemID=="PKQSI" ){
					var arrNumber=[];
				
					$mid_box.find(".titleLv").each(function(){
						arrNumber.push($(this).html());
					});
					obj_name=bet_obj=arrNumber.join("_");
					var playOBJ = play_lx + bet_obj;
					rpcPost["betBrders"][playOBJ]={
						periods:periods, 
						'game_lx': current['game_lx'],
						'play_lx':play_lx,
						'bet_obj':bet_obj,
						'betMoney':0,
						'odds':ODDS, 
						'obj_name':obj_name	
					}
				}else if( itemID=="FCFSZH" ){
						bet_obj = {};var BSG = ["B", "S", "G"];
						var arr=[];
						$mid_box.find(".frame_05_box").each(function(){
							var name=$(this).attr("name");
							bet_obj[name]=new Array();
							$(this).find(".titleLv").each(function(){
								bet_obj[name].push($(this).html());
								arr.push($(this).html());
							});
						});
						obj_name = bet_obj;
		
						ODDS = odds = $mid_box.find(".odds_pl").html();
						var playOBJ = play_lx + arr.join("_");
						
						rpcPost["betBrders"][playOBJ]={
							periods:periods, 
							'game_lx': current['game_lx'],
							'play_lx':play_lx,
							'bet_obj':bet_obj,
							'betMoney':0,
							'odds':ODDS, 
							'obj_name':obj_name	
						}
	
				}else if( itemID=="KBBJKLXH" ){
						var arr=[];
						$frame_05_box.find(".titleLv").each(function(){
							arr.push($(this).html());
						});
						var m=PAN[itemID]["min"][minNum];
						var result=C(arr,m);
						console.log(result);
						playOBJ=play_lx;
						obj_name=bet_obj=arr.join("_");
						
						rpcPost["betBrders"][playOBJ]={
							periods:periods, 
							'game_lx': current['game_lx'],
							'play_lx':play_lx,
							'bet_obj':bet_obj,
							'betMoney':0,
							'odds':ODDS, 
							'obj_name':obj_name,
							combination_num:result.length,
							combination_result:result,
							'message':'共'+result.length+'种组合'
						}
				}
				
				
				//生成页面内容
				var betObj = "";
				if (itemID === 'FCFSZH'){
					var BSGOBJ = {"B": "佰", "S": "拾", "G": "个"}, num = 0;
					for (var id in bet_obj){
						(num === 0) ? betObj += BSGOBJ[id] + ":[" + bet_obj[id] + "] " : betObj += "，" + BSGOBJ[id] + ":[" + bet_obj[id] + "] ";
					}
				}else if( itemID=="LHLM" && $mid_box.find(".frame_05_box_title").find("input[type=radio]:checked").val()=="dt" ){
					
						betObj="胆码:"+dm_arr+"&nbsp;拖码:"+tm_arr
					
				}else{
					var betObjArr = bet_obj.split('_');
					for (var i = 0, len = betObjArr.length; i < len; i++){
						(i === 0) ? betObj += betObjArr[i] : betObj += ('，' + betObjArr[i]);
					}
					obj_name = betObj;
				}
	
				
				
				//把注单数据加载到页面
				objname=bet_obj;
				this.betDataHTML(itemID, playOBJ, play_lx, betObj, odds,objname,rpcPost["betBrders"][playOBJ]["message"]);
				
			},

			frame_05_number_empty:function(elem){
				var $mid_box=elem.closest(".mid_box");
				var itemID=$mid_box.attr("itemid");
				
				$mid_box.find(".frame_05_checked_bg").removeClass("frame_05_checked_bg");
				$mid_box.find(".opacity").removeClass("opacity");
				$mid_box.find(".combination_number").html("");
				$mid_box.find(".combination_num").html(0);
				$mid_box.find(".combination_content_sub").html("");
				$mid_box.find(".titleLv").removeClass("titleLv");
				if( itemID=="PKQE" || itemID=="PKQS" || itemID=="PKQSI" || itemID=="FCFSZH"){
					$mid_box.find(".odds_pl").html("");
					$mid_box.find(".titleLv").removeClass("titleLv");
					$mid_box.find(".titleHui").removeClass("titleHui");
				}
			},
			frame_07_text_click:function(elem){
				var result=this.result;
				var itemID=elem.closest(".mid_box").attr("itemid");
				
				elem.toggleClass("titleLv");
				var jsonDataMid = result['data']['newOdds'];
				var setNo = elem.closest(".mid_box").find(".titleLv");
				var oddsStr = itemID + ( elem.closest(".mid_box").find(".midTWord_tab_childAct").attr('id') ) + setNo.length;
				
				elem.closest(".mid_box").find(".odds_pl").html(jsonDataMid[oddsStr]).attr("name",oddsStr);
				if (setNo.length === 0){ elem.closest(".mid_box").find(".odds_pl").html('').attr("name",''); }
			},
			
			frame_08_checkbox_click:function(elem){
				// LHLX LHLW
				
				var $mid_box=elem.closest(".mid_box");
				var itemID=$mid_box.attr("itemid");
				
				var number = PAN[itemID]['number'];
				var name = $mid_box.find(".midTWord_tab_childAct").attr('id');
				var max=6;
				
				var inputChecked = $mid_box.find("input:checked");
				
				if( inputChecked.length>max ){elem.attr("checked",false);return false;}
				
			},
			frame_08_empty_click:function(elem){
				elem.closest(".mid_box").find("input[type=checkbox]").removeAttr("checked");
			},
			
			getPlaylxObj:function(itemID){
	
				var cp_type=current["cp_type"];
				var gamelx=current["game_lx"];							
				var panType=current["panType"];
				//console.log(itemID);
				return itemOBJ[cp_type]['menu'][panType]['item'][itemID];
				
			},
			 //返回全大写 或全小写字符
	        getDaXiaoString: function (str, getType){
				str=str.replace(/\s/ig,"");
	            var resultStr = '';
	            for( var i=0; i<str.length; i++ ){
	                var c = str.charAt(i);
	                if( c <'A' || c >'Z' ){
						//  A unicode号 65  
						//  Z unicode号 90
						//  a           97
						//  z           122
						//  0           48
						//  9            57
	
						// 数字 小写字母 返回 x
	                    var type = 'x';
	                }else{
						//大写字母返回 d
	                    var type = 'd';
	                }
					
	                if( getType == type ) resultStr += c;
	            }
				
	            return resultStr;
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
			frame_10_odds_pl_click:function(elem){
				if(!this.checkUid()){return false}
				var result=this.result;
				var $mid_box=elem.closest(".mid_box");
				var itemID=$mid_box.attr("itemid");
			
				var playOBJ=elem.attr("name");
				var play_lx=this.getDaXiaoString(playOBJ,'d');
				var bet_obj = "", obj_name = "";
				bet_obj = obj_name = this.getDaXiaoString(playOBJ, 'x');
				var odds = result['data']['newOdds'][playOBJ];
	
				//增加一条注单数据
	            rpcPost['betBrders'][playOBJ] = {periods:periods,'game_lx': current['game_lx'], 'play_lx':play_lx, 'bet_obj':bet_obj, 'betMoney':0,  'odds':odds, 'obj_name':obj_name };
	
				//把注单数据加载到页面
				objname=bet_obj;
				this.betDataHTML(itemID, playOBJ, play_lx, bet_obj, odds,objname);
	
			},
			frame_09_showNum_click:function(elem){
				if(!this.checkUid()){return false}
				var result=this.result;
				var itemID=elem.closest(".mid_box").attr("itemid");
				
	            var playOBJ = $.trim( elem.attr("name") || elem.closest("div").attr('name') || elem.closest("td").attr("name") );
	            var play_lx = this.getDaXiaoString(playOBJ, 'd');
	            var bet_obj = "", obj_name = "";
	            bet_obj = obj_name = this.getDaXiaoString(playOBJ, 'x');
	            var odds = result['data']['newOdds'][playOBJ];
	
				//增加一条注单数据
	            rpcPost['betBrders'][playOBJ] = {periods:periods, 'game_lx': current['game_lx'], 'play_lx':play_lx, 'bet_obj':bet_obj, 'betMoney':0,  'odds':odds, 'obj_name':obj_name };
	
				if (obj_name.search(/_/) !== -1){
					var betObj = "";
					for (var i = 0, len = obj_name.split('_').length; i < len; i++){
						(i === 0) ? betObj += obj_name.split('_')[i] : betObj += "，" + obj_name.split('_')[i];
					}
					bet_obj = betObj;
				}
				objname=bet_obj;
				//把注单数据加载到页面
				this.betDataHTML(itemID, playOBJ, play_lx, bet_obj, odds,objname);
			},
			frame_08_sure_click:function(elem){
				
				var $mid_box=elem.closest(".mid_box");
				var itemID=$mid_box.attr("itemid");
				
				var number = PAN[itemID]['number'];
				var name = $mid_box.find(".midTWord_tab_childAct").attr('id');
				var max=6;
				
				var inputChecked = $mid_box.find("input:checked");
				
				if(  inputChecked.length<number ){
					return false
				}
				var arr=[];
				$mid_box.find("input:checked").each(function(){
					arr.push($(this).attr("data-i"));
				});
				
				var result=C(arr,number[name]);
				
				var jsonDataMid = this.result['data']['newOdds'];
				var periods=this.result["data"]["gameStatus"]["periods2"];
				
				for(var i=0;i<result.length;i++){
					var obj_name=bet_obj=result[i].join("_");
					var play_lx=name;
					var playOBJ=play_lx+obj_name;
					
					var arr1=(name+result[i].join(" "+name)).split(" ");
					
					
					var arr2=[];
					for(var a=0;a<arr1.length;a++){
						arr2.push(jsonDataMid[arr1[a]]);
					}
					
					arr2.sort(function(a,b){
						// 从小到大排序
						return a-b;
					});
					
					if( itemID=="LHLW" ){//最大值
						var odds=ODDS=arr2[arr2.length-1];
					}else if( itemID=="LHLX"){
						var odds=ODDS=arr2[0];
					}
					
					rpcPost["betBrders"][playOBJ]={
						periods:periods, 
						'game_lx': current['game_lx'],
						'play_lx':play_lx,
						'bet_obj':bet_obj,
						'betMoney':0,
						'odds':ODDS, 
						'obj_name':obj_name	
					}
					var objname=obj_name;
					if( itemID=="LHLW" ) {
						betObj=result[i].join(",");
					}else if( itemID=="LHLX" ){
						var arr3=[];
						for(var c=0;c<result[i].length;c++){
							arr3.push(objName[result[i][c]]);
						}
						betObj=arr3.join(",");
					}
	
					this.betDataHTML(itemID, playOBJ, play_lx, betObj, odds,objname,rpcPost["betBrders"][playOBJ]["message"]);
				
				}
				
			},
			
			frame_07_odds_pl_click:function(elem){
				if(!this.checkUid()){return false}
				var result=this.result;
				var itemID=elem.closest(".mid_box").attr("itemid");
	
				var $mid_box=elem.closest(".mid_box");
	
				var $setNo = $mid_box.find(".titleLv");
				var play_lx = itemID + ($mid_box.find(".midTWord_tab_childAct").attr('id'));
	
				var betObj=[],objname=[],playOBJ;
				 
				$setNo.each(function(){
					betObj.push($(this).attr("name"));
					objname.push(objName[ $(this).attr("name") ]);
				});
				playOBJ = play_lx + betObj.join("_");
				var odds = result['data']['newOdds'][play_lx + $setNo.length];
				
				//增加一条注单数据
				rpcPost['betBrders'][playOBJ] = { 
					periods:periods,
					'game_lx': current['game_lx'],
					'play_lx':play_lx,
					'bet_obj':betObj.join("_"),
					'betMoney':0, 
					'odds':odds, 
					'obj_name':betObj.join("_")
				};
				
				//把注单数据加载到页面
	            this.betDataHTML(itemID, playOBJ, play_lx, objname.join(), odds, betObj.join("_") );
	
			},
			frame_06_odds_pl_click:function(elem){
			
				this.frame_09_showNum_click(elem);
			},
			frame_04_sure_click:function(elem){
				if(!this.checkUid()){return false}
				var result=this.result;
				var itemID=elem.closest(".mid_box").attr("itemid");
				$mid_box=elem.closest(".mid_box");
				var userSelect = $mid_box.find("input[type='radio']:checked");
				if(!$mid_box.find(".odds_pl").html() || !userSelect.length){return false;}
	
				var play_lx = itemID, odds = 1;
	
				var bet_obj = "", obj_name = "";
				for (var i = 0, len = userSelect.length; i < len; i++){ (i === 0) ? bet_obj += userSelect.eq(i).val() : bet_obj += ('_' + userSelect.eq(i).val()); }
				obj_name = bet_obj;
				var playOBJ = play_lx + bet_obj;
				
			    var betObjArr = bet_obj.split('_'), betObj = "", jsonDataMid = result['data'];
				for (var i = 0, len = betObjArr.length; i < len; i++){
					odds *= jsonDataMid['newOdds'][betObjArr[i]];
					var DStr = this.getDaXiaoString(betObjArr[i], 'd');
					var XStr = this.getDaXiaoString(betObjArr[i], 'x');
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
				rpcPost['betBrders'][playOBJ] = { 'periods':periods , 'game_lx': current['game_lx'], 'play_lx':play_lx, 'bet_obj':bet_obj, 'betMoney':0,  'odds':odds, 'obj_name':obj_name };
	
				//把注单数据加载到页面
				this.betDataHTML(itemID, playOBJ, play_lx, betObj, odds, objname);
	
			},
			frame_03_odds_pl_click:function(elem){
				if(!this.checkUid()){return false}
				var result=this.result;
				var itemID=elem.closest(".mid_box").attr("itemid");
				$mid_box=elem.closest(".mid_box");
				if( itemID=="YWRX" || itemID=="YWQSZUX" || itemID=="YWQEZUX" || itemID=="YWQSZHX" || itemID=="YWQEZHX" ){return false;}
				var setNo = $mid_box.find(".titleLv");
				var play_lx = $mid_box.find(".midTWord_tab_childAct").attr('id');
				if (play_lx == undefined){ play_lx = itemID; }
	
				var bet_obj = "", obj_name = "";
				for (var i = 0, len = setNo.length; i < len; i++){ (i === 0) ? bet_obj += setNo.eq(i).html() : bet_obj += ('_' + setNo.eq(i).html()); }
				obj_name = bet_obj;
	
				var playOBJ = play_lx + bet_obj;
				var odds = result['data']['newOdds'][play_lx + setNo.length];
				if (itemID === 'YWRX' || itemID === 'YWQEZUX' || itemID === 'YWQSZUX' || itemID === 'YWQSZHX' || itemID === 'YWQEZHX'){ odds = result['data']['newOdds'][play_lx]; }
	
				//增加一条注单数据
				rpcPost['betBrders'][playOBJ] = { 'periods':periods , 'game_lx': current['game_lx'], 'play_lx':play_lx, 'bet_obj':bet_obj, 'betMoney':0,  'odds':odds, 'obj_name':obj_name };
	
				var betObjArr = bet_obj.split('_'), betObj = "";
				for (var i = 0, len = betObjArr.length; i < len; i++){
					(i === 0) ? betObj += betObjArr[i] : betObj += ('，' + betObjArr[i]);
				}
				obj_name = betObj;
				objname= bet_obj;
				//把注单数据加载到页面
				this.betDataHTML(itemID, playOBJ, play_lx, betObj, odds,objname);
				
			},
			frame_03_sure_click:function(elem){
				if(!this.checkUid()){return false}
				var result=this.result;
				var itemID=elem.closest(".mid_box").attr("itemid");
				$mid_box=elem.closest(".mid_box");
				var current_id=$mid_box.find(".midTWord_tab_childAct").attr('id');
				if( current_id==undefined ){current_id=itemID}
				if( itemID=="YWRX" || itemID=="YWQSZUX" || itemID=="YWQEZUX" ){
					var min=PAN[itemID]["min"][current_id];

					var setNo = $mid_box.find(".titleLv");
					if( setNo.length<min ){return false;}

					var play_lx,bet_obj,odds,obj_name;
					var play_lx =current_id ;
					
					var arr=[];
					$mid_box.find(".titleLv").each(function(){
						arr.push($(this).html());

					});
					bet_obj=obj_name=arr.join("_");
					if (itemID === 'YWRX' || itemID === 'YWQEZUX' || itemID === 'YWQSZUX' || itemID === 'YWQSZHX' || itemID === 'YWQEZHX'){ 
						odds = result['data']['newOdds'][play_lx];
					}
					playOBJ=play_lx;
					var result1=C(arr,min);
					//增加一条注单数据
					rpcPost['betBrders'][playOBJ] = {
						'periods':periods , 
						'game_lx': current['game_lx'],
						'play_lx':play_lx, 
						'bet_obj':bet_obj, 
						'betMoney':0, 
						'odds':odds, 
						'obj_name':obj_name,
						combination_num:result1.length,
						combination_result:result1,
						'message':'共'+result1.length+'种组合'
					};
					betObj=arr.join(",");
					objname=obj_name;
					this.betDataHTML(itemID, playOBJ, play_lx, betObj, odds,objname,rpcPost['betBrders'][playOBJ]["message"]);
				
				}else if( itemID=="YWQSZHX" || itemID=="YWQEZHX" ){
					var obj={};
					$mid_box.find(".frame_03_box").each(function(){
						var name=$(this).attr("name");
						obj[name]=[];
						$(this).find(".titleLv").each(function(){
							obj[name].push($(this).html());
						});
					});
					
					var arr=[];
					var arr1=obj["ZXDY"];
					var arr2=obj["ZXDE"];
					
					if( itemID=="YWQSZHX" ){
						var arr3=obj["ZXDS"];
						for(var i=0;i<arr1.length;i++){
							for(var a=0;a<arr2.length;a++){
								for(var b=0;b<arr3.length;b++){
									if( arr1[i]!=arr2[a] && arr2[a]!=arr3[b] && arr1[i]!=arr3[b] ){
										arr.push([arr1[i],arr2[a],arr3[b]]);
									}
								}
							}
						}
					}else if( itemID=="YWQEZHX" ){
						for(var i=0;i<arr1.length;i++){
							for(var a=0;a<arr2.length;a++){
								arr.push([arr1[i],arr2[a]]);
							}
						}
					}
					if(!arr.length){return false;}
					
					var result1=arr;
					var playOBJ=play_lx=current_id;
					var odds = result['data']['newOdds'][play_lx];
					//增加一条注单数据
					rpcPost['betBrders'][playOBJ] = {
						'periods':periods , 
						'game_lx': current['game_lx'],
						'play_lx':play_lx, 
						'bet_obj':bet_obj, 
						'betMoney':0, 
						'odds':odds, 
						'obj_name':obj_name,
						combination_num:result1.length,
						combination_result:result1,
						'message':'共'+result1.length+'种组合',
						'play_type':'ZHX',
						'ZXDY':arr1,
						'ZXDE':arr2
					};
					var betObj="第一位:"+arr1.join(",")+'第二位:'+arr2.join(",");
					var objname="ZXDY:"+arr1.join(",")+'ZXDE:'+arr2.join(",");
					if( itemID=="YWQSZHX" ){ 
						rpcPost['betBrders'][playOBJ]["ZXDS"]=arr3;
						betObj+="第三位:"+arr3.join(",");
						objname+="ZXDS:"+arr3.join(",");
					}
					this.betDataHTML(itemID, playOBJ, play_lx, betObj, odds,objname,rpcPost['betBrders'][playOBJ]["message"]);
			
				}
				
			},
			frame_03_empty_click:function(elem){
				$mid_box=elem.closest(".mid_box");
				var itemID=$mid_box.attr("itemid");
				$mid_box.find(".titleLv").removeClass("titleLv");
			},
			frame_02_odds_pl_click:function(elem){
				if(!this.checkUid()){return false}
				var result=this.result;
				var itemID=elem.closest(".mid_box").attr("itemid");
				$mid_box=elem.closest(".mid_box");
				
				var odds=elem.html().trim();
				var betObjArr=new Array();
				elem.parent().siblings().find("div").each(function(){
					betObjArr.push($(this).html());
				});
				bet_obj=betObjArr.join("_");
	
				var PlayLX = "";
				if (itemID === "EZDW" || itemID === "SZDW" || itemID === "FCEZDW"){
					var play_lx = $mid_box.find(".midTWord_tab_childAct").attr('id');
					
					for (var i = 0, len = play_lx.split('_').length; i < len; i++){
						PlayLX += play_lx.split('_')[i];
					}
					PlayLX += "DW";
				}
	
				if (itemID === "FCEZZH" || itemID === "FCZZX"){ PlayLX=play_lx = itemID; }
	
				if (itemID === "EZZX" || itemID === "SZSXE" || itemID === 'FCEZZX' || itemID === "SZZX"){
					PlayLX = play_lx = $mid_box.find(".midTWord_tab_childAct").attr('id');
					
				}
	
				if (itemID === 'FCSZDW'){
					PlayLX = play_lx = itemID;
				}

				obj_name = bet_obj;
	
				var playOBJ = play_lx + bet_obj;
	
				
				//增加一条注单数据
	            rpcPost['betBrders'][playOBJ] = {periods:periods,  'game_lx': current['game_lx'], 'play_lx':PlayLX, 'bet_obj':bet_obj, 'betMoney':0,  'odds':odds, 'obj_name':obj_name };
			    
				objname=bet_obj;
				bet_obj=betObjArr.join();
	            //把注单数据加载到页面
	            this.betDataHTML(itemID, playOBJ, play_lx, bet_obj, odds,objname);
	
			},
			frame_01_odds_pl_click:function(elem){
				
				this.frame_09_showNum_click(elem);
			},
			module02_k8_frame_01:function(elem){
				this.frame_09_showNum_click(elem);
			},
			module02_k8_frame_10:function(elem){
				this.frame_10_odds_pl_click(elem);
			},
			checkUid:function(){ //有无cookie 注单是否超过十注
				
				var uid=top["getCookie"]("uid");
				
				if(!uid){
					/*
					clearTimeout(timers["timer1"]);
					$(".alertInfo").remove();
	
					$(".mid-Content").append('<div class="alertInfo">请登录以后再进行投注</div>');
					
					
					timers["timer1"]=setTimeout(function(){
						$(".alertInfo").remove();
					},2000);
					*/
					top["dialong"]({
						autonone:3000,
						html:'请登录后再进行投注'
					},'',function(){
						$(".login_box input[name=u_name]").focus();
					})
					if($(".login_box .userLink").length){ //重新写入 登录表头
						top["loginOut"]();
					}
					
					return false;
				}else{
					
					if(!$(".login_box .userLink").length){ //重新写入 用户信息
						top["getUserData"]();
					}
					
					$(".nowList").click();
					if( !$(".beting_success_btn").length ){ //没有 投注成功按钮
						var len=$(".nowList_content_sub01_item .orderRow").length;
						if(len>=15){
							top["dialong"]({
								"title":'提示信息',
								"html":'注单不可超过15注',
								"btn":["确定"]
							});
							/*
							clearTimeout(timers["timer1"]);
							$(".alertInfo").remove();
							$(".mid-Content").append('<div class="alertInfo">投注注单不能超过十注</div>');						
							timers["timer1"]=setTimeout(function(){
								$(".alertInfo").remove();
							},2000);
							*/
							return false;
						}else{
							return true;
						}
					}else{
						return true;
					}
				}
			},
			betDataHTML:function(itemID, playOBJ, play_lx, betObj, odds, objname,message){
				//console.log(itemID, playOBJ, play_lx, betObj, odds, objname,message);
				var _this=this;
				_this.isNew(play_lx,function(){
				
					var post = { 'actID':202, 'game_lx': current['game_lx'], 'play_lx':rpcPost['betBrders'][playOBJ]['play_lx'], 'obj_name':objname };
				
					getServerData( post, function(result){
						
						var titlePlayLx = _this.getPlaylxObj( itemID )['playLx'][play_lx];
						var objMing = objName[betObj];
						if (objMing == undefined){ objMing = betObj; }
						if(itemID=="SH" && betObj=="sh"){ //梭哈 散号
							objMing="散号"; //与水 区分开来
						}
						if($(".orderRow").length==0 || $(".beting_success_btn").length ){
							var render=template.compile(lotterys188["article_middle_nowList_content"]);
							var html=render();
							$(".article_middle_nowList_content").html(html);
	
						}
						var minMoney=rpcPost["minMoney"][play_lx]?rpcPost["minMoney"][play_lx]:5;
						var maxMoney=rpcPost["maxMoney"][play_lx]?rpcPost["maxMoney"][play_lx]:50000;
						var val0= $('.quickMoneyInput').val();
						var val1=$(".mid-Content").find(".odds_box[name="+playOBJ+"]").find("input[type=text]").val();//$(".odds_pl[name="+playOBJ+"]").siblings("input").val();
						var val=val0||val1||'';
						var newOrder=new Array();
						newOrder.push( '<div id="'+ playOBJ +'" class="orderRow clearfix">')
						newOrder.push( '<div class="clearfix"><span class="orderDelete"></span></div>' );
						
						newOrder.push( '<div class="nowList_title clearfix">');
						newOrder.push( '<span class="orderObj left" data-play="'+ play_lx +'" style="color:#2A2A2A;">'+ titlePlayLx +'</span>');
						if(message){
							newOrder.push('<span class="message left" style="font-size:12px;">('+message+')</span>')
						}
						newOrder.push( '<span class="money_range right" style="color:#2A2A2A;">['+minMoney+'~'+maxMoney+']</span>');
						newOrder.push( '</div>' );
						
						newOrder.push( '<div class="orderObj left">');
						newOrder.push( '<span style="color:#AE0F0E;" >'+ objMing +'</span> @<span style="color:#AE0F0E;" id="'+ playOBJ +'Odds">' +  odds +'</span>');
						newOrder.push( '</div>');
						newOrder.push( '<input class="moneyInput right" id="betMoney'+ playOBJ +'" type="text" value="'+ val +'"/>' );
						newOrder.push( '</div>' );
						
						$('.article_middle_nowList_content_sub01  #'+playOBJ).remove();
						$(".nowList_content_sub01_item").prepend( newOrder.join('') );

						$(".mid-Content").find(".odds_box[name="+playOBJ+"]").find(".odds_pl").addClass("checked");
						
						if (odds != result['pl']){
							var timer=null;
							
							$("#" + playOBJ + "Odds").html(result['pl']).css("background-color","#FF855B");
							setTimeout(function(){
								$("#" + playOBJ + "Odds").css("background-color","#d5d5d5");
							},2000);
							rpcPost['betBrders'][playOBJ]['odds'] = result['pl'];
						}
						//console.log(rpcPost['betBrders'][playOBJ]);
						$(".article_middle_box").customScrollbar('resize',true);
	
					});
					
				})	
				
			},
			
			submitData: function (isquick_bet){ //点击投注按钮
				
				if(!top["getCookie"]('uid')){
					return false;
				}
				var beteMoney_str;
	            //把金额存入对象
				if( isquick_bet ){//快捷投注

					var betBrders=rpcPost["quick_betBrders"];
					betMoney_str="#quick_betMoney";
					var playgame=$(".quick_bet_box");
				}else{
					var betBrders = rpcPost['betBrders'];
					betMoney_str="#betMoney";
					var playgame=$(".article_middle_nowList_content");
				}
				var  tolMoney = 0,num=0;
	           
	            for (var playOBJ in betBrders) {
					
	                var betMoney= $(betMoney_str+ playOBJ).val();
	
	                if (betMoney == "") {
						
						top["dialong"]({
							title:'有注单未投注',
							html:'还有注单未投注,请输入金额再进行投注',
							btn:["确定"]
						})
	                    
	                    return false;
	                }
	
	                var minQ = rpcPost['minMoney'][betBrders[playOBJ]['play_lx']],
	                    maxQ = rpcPost['maxMoney'][betBrders[playOBJ]['play_lx']],
	                    playGame = playgame.find("span[data-play='"+ betBrders[playOBJ]['play_lx'] +"']").html();
	              
						minQ?"":minQ=5;
						maxQ?'':maxQ=50000;
					if( parseFloat(betMoney, 10) < parseFloat(minQ, 10) ){ 
						top["dialong"]({
							title:'投注金额不应小于最小金额',
							html:playGame + '</br>投注金额不可小于<b>'+ minQ +'</b>！',
							btn:["确定"]
						})
						return;
	               }	
	                if( parseFloat(betMoney, 10) > parseFloat(maxQ, 10) ){	                    
						top["dialong"]({
							title:'投注金额不可大于最大金额',
							html:playGame + '</br>投注金额不可大于<b>'+ maxQ +'</b>！',
							btn:["确定"]
						})
						return;
	                }
	
	                betBrders[playOBJ]['betMoney'] = betMoney;
					betMoney*=100;
					if(betBrders[playOBJ]['combination_num']){
						betMoney*=betBrders[playOBJ]['combination_num'];
					}
	                tolMoney += betMoney;
					num++;
	            }
				
				if(num==0){return false;}
				tolMoney=(tolMoney/100).toFixed(2);
	            //余额检查
	           
	            if( tolMoney > parseFloat(userMoney) ){
	                
					top["dialong"]({
						title:'账号金额不足',
						html:'总投注金额'+tolMoney+'不可大于账户余额'+userMoney,
						btn:["确定"]
					})
					return;
	            }
	
				var data={
					game_lx:$(".mideTab_content_sub li.active").text(),
					periods:periods,
					num:num,
					tolMoney:tolMoney
				}
				
				if( isquick_bet || !$(".user_choose .user_choose_btn_true").hasClass("user_choose_btn_false")){
					var render=template.compile(lotterys188["article_middle_nowList_content_sub02"]);
					var html=render(data);
					
					top["dialong"]({
						title:'确认投注',
						html:html,
						btn:["确定"]
					},function(){
						lotterysEvent["submitOdds_ok"](isquick_bet);
					})
					
				}else {
					
					lotterysEvent["submitOdds_ok"]();
				}
				
			},
			//投注提示
			bettingAlert:function ( obj ,elem){
				
				switch( obj['status'] ){
					
					case 6001: case 6002: case 6003: 
						var str="暂停下注！";
						
						break;
					case 6666: 
						var str="系统维护中，请稍后再试[5]！";
						
						break;
					case 8001: 
						var str="账户未激活，请激活后再试！"; 
						
						break;
					case 8002: var str="账户已被暂停投注，请与客服联系！" ; break;
					case 8003: var str="很抱歉，单注投注金额小于最低限制！"; break;
					case 8004: var str="很抱歉，单注投注金额大于最高限制！"; break;
					case 8005: var str="很抱歉，已超出单场投注限制！" ; break;
					case 8006: var str="很抱歉，账户余额不足！"; break;
					default: var str="系统维护中，请稍后再试[6]！"; break;
				}
				
				return str;
			},
			
			oddsChange:function(result,isquick_bet){
					
				var betBrders;
				if(isquick_bet){
					
					betBrders= rpcPost["quick_betBrders"];
				}else{
					betBrders= rpcPost['betBrders'];
				}
				var newOdds=result['newOdds'];
				for (var playOBJ in newOdds) {
					betBrders[playOBJ]['odds'] = newOdds[playOBJ];
					if(isquick_bet){
						$(".quick_bet").find("."+playOBJ+'Odds').html(newOdds[playOBJ]).css("backgroundColor",'yellow');
					}else{
						$("#" + playOBJ + "Odds").html(newOdds[playOBJ]);
						$("#" + playOBJ + "Odds").css("background-color","yellow");
					}
				}
				
			},
			submitOdds_ok:function(isquick_bet){
				
				loadFn("投注中...");
	
				var show_type=current["show_type"];
				if( isquick_bet ){
					var betBrders = rpcPost["quick_betBrders"];
				}else{
					var betBrders = rpcPost['betBrders'];
				}
				var gamelx=current["game_lx"];
				
				var n=0;
				for(var key in betBrders){
					if(betBrders[key]){
						n++;
					}
				}
				
				if(!n){
					closeloadFn();
					
					top["dialong"]({
						title:'暂停投注',
						html:'暂停投注',
						btn:["确定"]
					})
					return false;
				}
				
				var post = {'actID':302,'uid': top["getCookie"]('uid'), 'orders': betBrders, path: 1, show_type: show_type};
				
				getServerData( post, function (result){
					
					closeloadFn();
					
					if(result["status"]!=7777){
						
						top["dialong"]({
							title:'投注失败',
							html:lotterysEvent.bettingAlert(result),
							btn:["确定"]
						})
						
						return false;
					}
					
					switch (result['bet_error']) {
						
						case -2:
							lotterysEvent.oddsChange(result,isquick_bet);
							
							top["dialong"]({
								title:'赔率改变',
								html:'赔率改变,是否继续投注?',
								btn:["确定","取消"]
							},function(){
								if($(this).index()==0){
									lotterysEvent["submitOdds_ok"](isquick_bet);
								}
							})
							break;
						case 0:
							if( isquick_bet ){
								//快捷投注
								rpcPost["quick_betBrders"]={};
								$(".right_quick_bet_content_sub>div").each(function(){
									$(this).find(".orderDelete_right_quick").parent().remove();
									var money=$(this).find("input[type=text]").val();
									$(this).find("input[type=text]").replaceWith('<span class="right">金额:'+money+'</span>')
								})
								$(".right_quick_bet_content_sub").prepend('<div style="text-align:center;margin:5px;"><input type="button" value="投注成功!点击关闭" style="width:120px;" class="right_quick_bet_empty beting_success_btn"></div>');
								
								$(".right_quick_bet_li_checked").removeClass("right_quick_bet_li_checked");
								$(".mid-Content .right_quick_bet_checked").removeClass("right_quick_bet_checked");
								$(".content_right ").customScrollbar("resize",true);
								
							}else{
								
								$(".article_middle_nowList_content .orderDelete").parent().remove();
								$(".nowList_content_sub01_item>div").each(function(){
									var boxID=$(this).attr("id");
									
									$(this).find(".moneyInput").replaceWith('<span class="betting_money right">投注金额:'+rpcPost["betBrders"][boxID]["betMoney"]+'</span>');
									$(this).find(".money_range").replaceWith('<span class="periods right">'+rpcPost["betBrders"][boxID]["periods"]+'</span>');
								});
								$(".nowList_content_sub01_item").siblings().remove();
								$(".article_middle_nowList_content_sub01").append('<div class="beting_time">投注时间:'+result["bet_time"]+'</div><input type="button" class="deleteOdds beting_success_btn" value="关闭">');
								
								clearBetInfo(); //清空投注菜单上的数据
								
								$(".mid-Content").find(".odds_box").find(".odds_pl").removeClass("checked").end().find("input[type=text]").val("");
								$(".midSure_show_money").html(0);
								$(".article_middle_box").customScrollbar("resize",true);
							}
							
							top["dialong"]({
								title:'提示信息',
								html:'投注成功',
								btn:["确定"]
							})
								
							$(".shuaxinMoneyLink").html("&yen;"+result["u_money_cp"] );
							
							break;
						default :
							break;
					
					}
				});
			},
			/****快3投注 事件*****/
			k3_click_li:function(elem){
				if(!this.checkUid()){return false}
				var result=this.result;
				//得到要传给服务器的数据
	            //if (!betData['KS' + $(this).attr('id')]){ betData['KS' + $(this).attr('id')] = {}; }
				var  newOdds = result['data']['newOdds'];
				var play_lx = this.getDaXiaoString(elem.attr('id'), 'd');
				var bet_obj = "", obj_name = "";
				bet_obj = obj_name = this.getDaXiaoString(elem.attr('id'), 'x');
				
				var odds = newOdds[elem.attr('id')];
	
				var playOBJ=elem.attr("id");
				
				rpcPost['betBrders'][playOBJ]={
					periods:periods,
					game_lx:current["game_lx"],
					play_lx:play_lx,
					bet_obj:bet_obj, 
					betMoney:0, 
					odds:odds,
					obj_name:obj_name 
				}
				var itemID=play_lx;
				
				this.betDataHTML(itemID, playOBJ, play_lx, bet_obj, odds,obj_name);
	
			},
			k3_click_odds_pl:function(elem){
				if(!this.checkUid()){return false}
				var result=this.result;
				var  newOdds = result['data']['newOdds'];
				elem=elem.closest(".odds_box");
				var play_lx = this.getDaXiaoString(elem.attr('id'), 'd');
				var bet_obj = "", obj_name = "";
				bet_obj = obj_name = this.getDaXiaoString(elem.attr('id'), 'x');
				
				var odds = newOdds[elem.attr('id')];
	
				var playOBJ=elem.attr("id");
				
				rpcPost['betBrders'][playOBJ]={
					periods:periods,
					game_lx:current["game_lx"],
					play_lx:play_lx,
					bet_obj:bet_obj, 
					betMoney:0, 
					odds:odds,
					obj_name:obj_name 
				}
				var itemID=play_lx;
				this.betDataHTML(itemID, playOBJ, play_lx, bet_obj, odds,obj_name);
				
			}
			
		}
		exports.lotterysEvent=lotterysEvent;
		
		
		// 小标题 
		$(document).on("click",".midTWord_tab_child",function(){
			lotterysEvent["frame_01_title_click"]($(this));
		})
		
		// frame_01 投注事件
		$(document).on("click",".frame_01 .odds_pl",function(){
			lotterysEvent["frame_01_odds_pl_click"]($(this));
		})
		
		
		
		
		// 点击 frame_02 中的 球 
		$(document).on("click",".frame_02_number",function(){
			lotterysEvent["frame_02_number_click"]($(this));
			$(".mid_center_box").customScrollbar("resize",true);
		})
		$(document).on("click",".frame_02 .odds_pl",function(){
			lotterysEvent["frame_02_odds_pl_click"]($(this));
		})
		
		
		
		
		// 点击 frame_03 中的球
		$(document).on("click",'.frame_03_number',function(){
			lotterysEvent["frame_03_number_click"]($(this));
		})
		$(document).on("click",".frame_03 .odds_pl",function(){
			lotterysEvent["frame_03_odds_pl_click"]($(this));
		})
		$(document).on("click",".frame_03 .sure",function(){
			lotterysEvent["frame_03_sure_click"]($(this));
		})
		$(document).on("click",".frame_03 .empty",function(){
			lotterysEvent["frame_03_empty_click"]($(this));
		})
		
		
		
		
		
		// 点击frame_04 中的重置按钮
		$(document).on("click",".frame_04 .empty",function(){
			lotterysEvent["frame_04_empty_click"]($(this));
		})
		// 点击frame_04 中的单选框
		$(document).on("click",".frame_04 input[type=radio]",function(){
			
			lotterysEvent["frame_04_radio_click"]($(this));
		})
		// frame_04 中的投注事件
		$(document).on("click",".frame_04 .sure",function(){
			
			lotterysEvent["frame_04_sure_click"]($(this));
		})
		
		
		
		
		
		// frame_05 中的北京pk拾(bjpks)  复式组合(FCFSZH) 快八选号(KBBJKLXH)
		$(document).on("click",".PKQE_box .frame_05_number, .PKQS_box .frame_05_number ,.PKQSI_box .frame_05_number, .FCFSZH_box .frame_05_number ,.KBBJKLXH_box .frame_05_number",function(e){
			
			lotterysEvent["frame_05_number_click"]($(this));
		})
		// lhc 中的 自选不中(LHZXBZ) 连码(LHLM)
		$(document).on("click",".LHZXBZ_box .frame_05_number_box_sub,.LHLM_box .frame_05_number_box_sub",function(){
			lotterysEvent["frame_05_number_box_sub"]($(this));
			$(".mid_center_box").customScrollbar("resize",true);
		})
		// lhc 中的 连码(LHLM) input 单选框
		$(document).on("click",".frame_05_box_title input[type=radio]",function(){
			$(this).closest(".frame_05_box").find("."+$(this).val()).show().siblings().hide();
			$(this).closest(".frame_05_box").find(".frame_05_checked_bg").removeClass("frame_05_checked_bg");
			$(this).closest(".frame_05_box").find(".combination_number").html("");
			$(this).closest(".frame_05_box").find(".combination_num").html(0);
			$(this).closest(".frame_05_box").find(".combination_content_sub").html("");
			$(this).closest(".frame_05_box").find(".opacity").removeClass("opacity");
			$(".mid_center_box").customScrollbar("resize",true);
		})
		// frame_05 中的重置按钮
		$(document).on("click",".frame_05_odds_box .empty",function(){
		
			lotterysEvent["frame_05_number_empty"]($(this));
			$(".mid_center_box").customScrollbar("resize",true);
		})
		// frame_05 中的确定按钮
		$(document).on("click",".frame_05_odds_box .sure",function(){
			
			lotterysEvent["frame_05_number_sure"]($(this));
		})
		
		
		
		
		// frame_06 投注事件
		$(document).on("click",".frame_06 .odds_pl",function(){
			lotterysEvent["frame_06_odds_pl_click"]($(this));
		})
		
		
		
		
		// frame_07 中的点击事件
		$(document).on("click",".frame_07_text",function(){
			
			lotterysEvent["frame_07_text_click"]($(this));
		})
		// frame_07  点击投注事件
		$(document).on("click",".frame_07 .odds_pl",function(){
			lotterysEvent["frame_07_odds_pl_click"]($(this));
		})
		
		
		
		
		
		
		// frame_08 中的复选框
		$(document).on("click",".frame_08 input[type=checkbox]",function(){
			lotterysEvent["frame_08_checkbox_click"]($(this));
		})
		
		// frame_08 中的重置按钮
		$(document).on("click",".frame_08 .empty",function(){
			lotterysEvent["frame_08_empty_click"]($(this));
		})
		// frame_08 中的 快速选择
		$(document).on("click",".frame_08 .quick_choose_btn",function(){
			var _this=$(this);
			var $mid_box=_this.closest(".mid_box");
			var str=_this.attr("data-value");
			var arr=str.split(",");
			$mid_box.find("input[type=checkbox]").attr("checked",false);
			for(var i=0;i<arr.length;i++){
				$mid_box.find("input[type=checkbox][data-i="+arr[i]+"]").attr("checked",true);
			}
		})
		// frame_08中的确定按钮
		$(document).on("click",".frame_08 .sure",function(){
			lotterysEvent["frame_08_sure_click"]($(this));
		})
		
		
		
		// frame_09  投注按钮
		$(document).on("click",".frame_09 .showNum",function(){
			lotterysEvent["frame_09_showNum_click"]($(this));
		})
		
		
		
		// frame_10 投注
		$(document).on("click",".frame_10:not(.module02) .odds_pl",function(){
			lotterysEvent["frame_10_odds_pl_click"]($(this));
		})
		
		
		
		
		$(document).on("click",".module02_k8 .frame_01>div",function(){
			lotterysEvent["module02_k8_frame_01"]($(this).find(".k8_midTWord_child_showNum"));
		})
		$(document).on("click",".module02_k8 .frame_10>div",function(){
			lotterysEvent["module02_k8_frame_10"]($(this).find(".k8_frame10_odds"));
		})
		
		
		/******k3 投注 start***************/
		$(document).on("click",".k3_content_module01 #KSDSdan,.k3_content_module01 #KSDXd,.k3_content_module01 #KSDSs, .k3_content_module01 #KSDXx,.yz li,.dz li,.weigu li,.k3Box02 li,.k3Box03 li,.k3Box04  li",function(){
			lotterysEvent.k3_click_li( $(this) );
		})
		$(document).on("click",".k3 .odds_box .odds_pl",function(){
			lotterysEvent.k3_click_odds_pl( $(this) );
		})
		/******k3 投注 end***************/
		
		
		
	//组合
	function C(arr, num)  
	{  
		var r=[];  
		(function f(t,a,n)  
		{  
			if (n==0)  
			{  
				return r.push(t);  
			}  
			for (var i=0,l=a.length; i<=l-n; i++)  
			{  
				f(t.concat(a[i]), a.slice(i+1), n-1);  
			}  
		})([],arr,num);  
		return r;  
	}  
	
	//排列
	function P(arr, num)  
	{  
		var r=[];  
		(function f(t,a,n)  
		{  
			if (n==0)  
			{  
				return r.push(t);  
			}  
			for (var i=0,l=a.length; i<l; i++)  
			{  
				f(t.concat(a[i]), a.slice(0,i).concat(a.slice(i+1)), n-1);  
			}  
		})([],arr,num);  
		return r;  
	} 
	//数组去重
	Array.prototype.uniquelize = function () {
		var tmp = {},
			ret = [];
		for (var i = 0, j = this.length; i < j; i++) {
			if (!tmp[this[i]]) {
				tmp[this[i]] = 1;
				ret.push(this[i]);
			}
		}

		return ret;
	}
	exports.C=C;
	exports.P=P;
	
	
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
	
	// 中间赔率 输入框金额发生变化
	$(".mid-Content").on("keydown","input[type=text]",function(e){
		if(keyBool){e.preventDefault();return false;}
		keyBool=true;
		var _this=$(this);
		var money=0;
		setTimeout(function(){
			
			var str=_this.val();
			str=moneyCheck(str);
			_this.val(str);
			
			var playOBJ=_this.closest(".odds_box").attr("name");
			$(".article_middle_nowList_content_sub01").find("#"+playOBJ).find("input[type=text]").val(_this.val());
			$(".article_middle_nowList_content_sub01").find(".quickMoneyInput").val("");
			$(".mid-Content").find("input[type=text]").each(function(){
				if( $(this).val() ){
					money+= $(this).val()*100 ;
					
				}
			});
			$(".midSure_show_money").html((money/100).toFixed(2));

		},0);
	}).on("keyup",'input[type=text]',function(){
		keyBool=false;
		
	})
	
	
	
	
	//左侧投注单的一系列事件
	
	
	//左侧投注单金额输入框的变化
	$(document).on("keydown",".moneyInput,.quickMoneyInput",function(e){
		if(keyBool){e.preventDefault();return false;}
		
		var _this=$(this);
		keyBool=true;
		var money=0;
		setTimeout(function(){
			
			var str=_this.val();
			str=moneyCheck(str);
			_this.val(str);
			
			if(_this.hasClass("quickMoneyInput")){
				$(".moneyInput").val(_this.val());
				for(var key in rpcPost["betBrders"]){
					var playOBJ=key;
					$(".mid-Content").find(".odds_box[name="+playOBJ+"]").find("input[type=text]").val(_this.val());
				}
			}else{
				var playOBJ=_this.closest(".orderRow").attr("id");
				$(".mid-Content").find(".odds_box[name="+playOBJ+"]").find("input[type=text]").val(_this.val());
			}
			
			
			$(".mid-Content").find("input[type=text]").each(function(){
				if( $(this).val() ){
					money+= $(this).val()*100 ;
					
				}
			});
			$(".midSure_show_money").html((money/100).toFixed(2));

		},0);
			
	}).on("keyup",'.moneyInput,.quickMoneyInput',function(){
		keyBool=false;
	})
	
	
	
	//左侧投注单 删除按钮
	$(document).on("click",".orderDelete",function(){
		var $orderRow=$(this).closest(".orderRow");
		var playOBJ=$orderRow.attr("id");
		delete rpcPost["betBrders"][playOBJ];
		$(".mid-Content").find(".odds_box[name="+playOBJ+"]").find(".odds_pl").removeClass("checked").end().find("input[type=text]").val("");			
		
		var len=$orderRow.siblings().length;
		$orderRow.remove();
		if(len==0){
			
			$(".article_middle_nowList_content_sub01,.nowList_sub01_scroll_box").remove();
			rpcPost["minMoney"]={};
			rpcPost["maxMoney"]={};
			
		}
		var money=0;
		$(".mid-Content").find("input[type=text]").each(function(){
			if( $(this).val() ){
				money+= $(this).val()*100 ;
				
			}
		});
		$(".midSure_show_money").html((money/100).toFixed(2));
		$(".article_middle_box").customScrollbar("resize", true);
	})
	//左侧投注单 快捷投注按钮 
	$(document).on("click",".quickMoney_btn span",function(){
		$(".moneyInput,.quickMoneyInput").val( $(this).html() );
		var _this=$(this);
		for(var key in rpcPost["betBrders"]){
			var playOBJ=key;
			$(".mid-Content").find(".odds_box[name="+playOBJ+"]").find("input[type=text]").val(_this.html());
		}
		var money=0;
		$(".mid-Content").find("input[type=text]").each(function(){
			if( $(this).val() ){
				money+= $(this).val()*100 ;
				
			}
		});
		$(".midSure_show_money").html((money/100).toFixed(2));
	})
	// 左侧投注单 清除按钮
	$(document).on("click",".clearMoney",function(){ 
		$(".moneyInput,.quickMoneyInput").val("");
		$(".mid-Content").find("input[type=text]").val("");
		$(".midSure_show_money").html(0);
	})
	
	//点击左侧投注单  取消按钮
	$(document).on("click",".deleteOdds",function(){
			
		$(".article_middle_nowList_content_sub01").remove();
		$(".nowList_sub01_scroll_box").remove();
		
		$(".mid-Content").find(".odds_box").find(".odds_pl").removeClass("checked").end().find("input[type=text]").val("");
		$(".midSure_show_money").html(0);

		rpcPost["betBrders"]={};
		$(".article_middle_box").customScrollbar('resize',true);
	})
	//左侧投注单 是否显示确认投注按钮
	$(document).on("click",".user_choose span",function(){
		$(this).toggleClass("user_choose_btn_false");
	})
	//左侧投注单 确定投注按钮
	$(document).on("click",".submitOdds",function(){
		lotterysEvent["submitData"]();
	})
	//左侧  最近十注
	$(document).on("click",".beenList",function(){
		var uid=top["getCookie"]("uid");
		if(!uid){
			return false;
		}
		$(this).addClass("active").siblings().removeClass("active");
		
		var post = { 'actID':401,'uid': uid };
        getServerData( post, function (result){
			delete result["status"];
			if(!result || $.isEmptyObject(result) ){
				$(".article_middle_beenList_content").show().html("暂无信息哦~").siblings().hide();
				$(".article_middle_box").customScrollbar('scrollTo',$(".article_middle_box .overview"));
				$(".article_middle_box").customScrollbar('resize',true);
				return false;
			}
			
			
			for(var key in result){
				var obj=result[key];
				if(obj["play_name"]=="复式组合"){
					var str="";
					var obj_name=jQuery.parseJSON(obj["obj_name"]);
					for(var i in obj_name){
						var str0=i+":["+obj_name[i]+"]<br>";
						str+=str0;
					}
					obj["obj_name"]=str;
				}
			}
			var data={
				result:result
			}
		
			var render=template.compile(lotterys188["article_middle_beenList_content"]);
			var html=render(data);
			
			$(".article_middle_beenList_content").show().html(html).siblings().hide();
			
			$(".article_middle_box").customScrollbar('scrollTo',$(".article_middle_box .overview"));
			$(".article_middle_box").customScrollbar('resize',true);
		});
	})
	// 左侧 投注单 点击
	$(document).on("click",".nowList",function(){//投注单
		$(this).addClass("active").siblings().removeClass("active");
		//$(".beenList_scroll_box").remove();
		$(".article_middle_beenList_content").html("").hide().siblings().show();
		$(".article_middle_box").customScrollbar('scrollTo',$(".article_middle_box .overview"));
		$(".article_middle_box").customScrollbar('resize',true);
	})
	
	
	
	
	
	
	//加载动画
	function loadFn(content){
		$(".load_box").html('<div class="load"><img src="images2/loadingBG.gif" width=50 heihgt=50><div>'+content+'</div></div>');
		$(".alertOverlay").show();
	}
	//关闭加载动画
	function closeloadFn(){
		$(".load_box").html("");
		$(".alertOverlay").hide();
	}
	
})
