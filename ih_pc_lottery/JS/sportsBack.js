define(function (require,exports,module){

	var top=require("./top");
	var sportsTemp=require("./sportsBackTemp");
	var UI=require("./zh-cn.js");
	
	var userOrderClient,gameDataClient,orderClient;
	var $clientH=$(window).height();
	var pageTop=$(".page")[0].offsetTop;
	$(".page_left,.page_content,.page_right,.page_left_scroll_box").css("height",$clientH-pageTop+'px');

	if(!window.console){window.console={log:function(value){}}}

	// 得到赔率的接口
	function getPlFn(post,functionName){
		console.log(post);
		if(!gameDataClient){
			gameDataClient = new PHPRPC_Client( 'http://118.184.23.233/memberRPC/phprpcClass/GameDataDq.class_new.php', ['getGameDataInterface'] );
		}
		gameDataClient.getGameDataInterface(post,function(result,args,output,warning){
			console.log(jQuery.parseJSON(result));
			functionName && functionName(result);
		});
	}

	//点击赔率投注调用接口
	function betFn(key,post,functionName){
		
		if(!orderClient){
			orderClient = new PHPRPC_Client( 'http://118.184.23.233/memberRPC/phprpcClass/BetOrder.class.php', ['getOrderUnitary', 'getOrderGG', 'gotoBetingUnitary','checkBetStatus'] );  		
		}
		orderClient[key]( post, function ( result, args, output, warning ) {
			functionName && functionName(result);
		})				
	}
	//得到最近十注的接口
	function getBeenList(post,functionName){
		if(!userOrderClient){
			userOrderClient = new PHPRPC_Client( 'http://118.184.23.233/memberRPC/phprpcClass/userOrder4m.class.php', ['showOrderTop'] );  	
		}
		userOrderClient.showOrderTop(post,function(result){
			
			functionName && functionName(result);
		
		});
	}

	$(".sport_tree_two>div").css("width","25%");
	
	var time_lx=2;  //2:今日 1:早盘 4:过关  3:滚球
	var game_lx="";     // 足球,篮球,手球........
	var playitem=0; // 玩法  1x2/让球/大小  单双 波胆 等
	
	top["setCookie"]("panType",1);//盘口类型   1:香港盘  2:马来盘  3:欧洲盘
	top["setCookie"]("pxType",1);//排序类型    1:联赛排序   2:时间排序
	var currPage=1;//默认页数
	var lnum=[];//存储选中的联赛 (联赛选择);
	var game_time='';//游戏时间
	var game_unique;//收藏的游戏
	var isAll=true;// 全部与收藏的判断条件   默认显示全部.


	var timer;//内容定时器
	
	top["setCurrentColor"]();
	top["init"]();
	leftMenu();
	
	//选择颜色
	$(".sportsColor_choose span").click(function(){
		$(this).parent().addClass("active").siblings().removeClass("active");
		$(this).addClass("current").parent().siblings().find("span").removeClass("current");
		var name=$(this).attr("data-color");
		top["setCookie"]('currentColor',name);
		$("#sportsColor").attr("href","css/sportsColor"+name+'.css');
	})
	//设置当前页面 颜色
	function setCurrentColor(){
		var currentColor=top["getCookie"]("currentColor");
		currentColor?"":currentColor="Green";
		$(".sportsColor_choose span[data-color="+currentColor+"]").addClass("current").parent().siblings().children().removeClass("current");
		$(".sportsColor_choose .current").parent().addClass("active").siblings().removeClass("active");
		$("#sportsColor").attr("href","css/sportsColor"+currentColor+'.css');
	}
	
	
	var timers={
		betStatus:null
	}
	
	//投注时注单等待确认 要用的变量
	var isCheckBetStatus	= 0;	//是否执行检测注单状态
	var checkBetStatusTime 	= 10;	//刷新注单状态计时器变
	var checkBetId;
	


	$(".sport_tree_two").find("div[time_lx="+time_lx+"]").addClass("sport_tree_two_active").siblings().removeClass("sport_tree_two_active");
	
	//在进行过关投注时存储数据用
	var orderDataGG	= {'action':[], 'betPl':[], 'betPlJs':[], 'betNum': 0 };
	
	//在进行非过关投注时存储数据用
	var order=null;

	var orderData = new Object();

	
	function leftMenu(isrefresh){
		
		clearInterval(timer);

		var post={fn:'get_ty','time_lx':time_lx};
		
		getPlFn(post,function(result){
			result=jQuery.parseJSON(result);
			
			if( $.isEmptyObject(result) ){
				$(".sport_tree_content").html("暂无数据...");
				scrollLeft();
				return false;
			}

			if(game_lx=="" || !checkGame_lx(result)){
				game_lx=result[0]["game_lx"];
				playitem=0;
			}
			
			if(time_lx==3){ //滚球
				
				var render=template.compile( sportsTemp["leftMenu_gq"] );
				var html=render({result:result,game_lx:game_lx});
				$(".sport_tree_content").html(html);
				
				scrollLeft();
				
				getContent(isrefresh);
			}else{ //生成二级菜单
				var post01={
					fn:'get_play_item',
					time_lx:time_lx,
					game_lx:game_lx
				}
				
				getPlFn(post01,function(date,args,output,warning){
					date=jQuery.parseJSON(date);
					
					var obj={result:result,date:date,game_lx:game_lx,playitem:playitem};
					
					var render=template.compile( sportsTemp["leftMenu"] );
					var html=render(obj);
					$(".sport_tree_content").html(html);
					
					scrollLeft();

					getContent(isrefresh);
				})
			}

		});
		
	}
	function checkGame_lx(result){ //判断返回的数据中是否有当前选中的game_lx
		var hasGame_lx=false;
		for(var key in result){
			var value=result[key];
			if(value["game_lx"]==game_lx){
				hasGame_lx=true;
				
			}
		}
		return hasGame_lx;
	}
	
	template.helper("tableBg",function(i){
				
		return i%2==0?"bg01":"bg02";
	});
	template.helper("abs",function(value){
		//return Math.abs(value);
		value=Math.abs(value);
		if(value%0.5==0){
			return value;
		}
		var a,b;

		a=value-0.25;
		b=value+0.25;
		return a+'/'+b;
	});
	function getTime_lx(){
		var timeLx=$(".sport_tree_two_active").attr("time_lx");
		var len=$(".page_left_si input[type=radio]:checked").length;
		len?timeLx=3:timeLx; //滚球时为 3
		timeLx==4?timeLx=2:''; //过关时为 2
		$(".itemUl_li_active").attr("playitem")==10?timeLx=2:''; //冠军时为2

		return timeLx;
	}
	//action 值
	template.helper("action",function(  gameUnique, playLx, playObj ,half, pkNum, pl ){
		var timeLx=getTime_lx();

		var arr=["","dy","rqpl","dxpl","dspl"];

		arr[playLx]?playObj=arr[playLx]+playObj:"";

		return timeLx+"*"+gameUnique+"*"+playLx+"*"+playObj+"*"+half+"*"+pkNum+"*"+pl;

	});



	function getContent(isrefresh){ //得到中间部分  isrefresh 判断是否是自动刷新
		clearInterval(timer);
		
		var post={			
			fn:$(".itemUl_li_active").attr("fn"),			
			game_lx:game_lx,
			time_lx:time_lx,
			playitem:playitem,

			currPage:currPage, //当前页数  默认为1
			lnum:lnum.length?lnum.join():'',//选中的联赛
			order_by:top["getCookie"]("pxType"), //排序类型
			panType:top["getCookie"]("panType"), // 盘口类型
			game_time:game_time,          // 选中的游戏时间
			game_unique:isAll?'':getScData().join(), //收藏的联赛
			isAll:isAll
			
		}
		
		
		getPlFn(post,function(result,args,output,warning){
			
			result=jQuery.parseJSON(result);			
			
			if( !isrefresh ){ $(".page_content_sub").css("top",0);$(".more_play_box").remove(); }
			
			//生成顶部导航栏
			var bool=change_menu(result);
			if(bool=='false'){
				console.log("hello world");
				getContent(isrefresh);
				return false;
			}
			
			if( $.isEmptyObject(result["data"]) ){ 
				$(".page_table_box").html("");
				$(".page_content_pl_html").html('<div class="no_data" style="text-align:center;color:#fff;margin-top:60px;font-size:15px;">暂无数据</div>');
				
			}else{
				
				//生成赔率
				odds(result);
			}

			scrollContent();
			
			var refreshTime=Number($(".refreshTime").html());
			timer=setInterval(function(){
				refreshTime--;
				$(".refreshTime").html(refreshTime);
				if( refreshTime<=0 ){
					$(".refresh").html("正在刷新......");
					clearInterval(timer);
					leftMenu(true);//定时器请求										
				}
				
			},1000);						
		})
		
	}

	//生成顶部导航条内容
	function change_menu(result){
		//主要生成联赛名称 以及 页数 日期  收藏的联赛个数
		//  排序方式以及盘口类型 用cookie存储
		
		var pages=result["pages"];
		var one_week=result["one_week"];

		if( pages && pages>0 ){ // 页数
			if( pages<currPage ){
				currPage=1;
				
				return false;
			}
			for(var i=0,pagesArr=[];i<pages;i++){
				pagesArr.push(i+1);
			}
		}
		
		if( (one_week && one_week.length) && game_time){
			var reload=true;
			for(var key in one_week ){
				if( one_week[key]["game_time"]==game_time ){
					reload=false;
				}
			}
			if( reload ){
				game_time="";
				return false;
			}
		}

		var date={
			pagesArr:pagesArr,
			pages:pages,
			currPage:currPage,			
			choose_ls_num:lnum.length?lnum.length:"全部", //选择联赛
			order_by:top["getCookie"]("pxType"),
			panType:top["getCookie"]("panType"),
			refreshTime:120, //刷新时间
			isAll:isAll, //是显示全部联赛还是收藏联赛
			scNum:getScData().length,//返回收藏游戏的个数
			one_week:result["one_week"],
			game_time:game_time?game_time:'' // 选中的日期
		}

		var render=template.compile(sportsTemp["change_menu"]);
		var html=render(date);
		clearInterval(timer);
		$(".change_box_nav").html(html);
		
		
		if( playitem!=0 ){
			$(".change_menu").children("div").eq(0).hide();
		}
		if( !isAll ){
			$(".ls").hide();
		}

		$(".all_ls_box").hide();
		
		
		//联赛
		var allChecked=true;
		if( lnum.length ){
			allChecked=false;
			var str=lnum.join();
		}

			
		for(var key in result["all_ls"]){
			var lnumSub=result["all_ls"][key]["lnum"];
			if(   allChecked ||  str.match( lnumSub )!=null   ){
				result["all_ls"][key]["isChecked"]=true;
			}else{
				result["all_ls"][key]["isChecked"]=false;
			}
		}

		var date={
			ls:result["all_ls"],
			lnum:lnum
		}
		var render=template.compile(sportsTemp["lsType_box"]);
		var html=render(date);
		$(".all_ls_box_content").html(html);
		
		if( $(".all_ls_box").css("display")=="block" ){

			isScroll($(".ls_name_box"),$(".ls_name_box_item"),$(".ls_name_scroll_box"),'<div class="lx_name_scroll_sub"><div class="lx_name_scroll_sub_item"></div></div>');
			top["myAddEvent"]( $(".ls_name_box_item")[0], "mousewheel",function(e){
				fn1(e,$(".lx_name_scroll_sub_item")[0], $(".lx_name_scroll_sub")[0],function(dom2){
					
					var dom2=$(".lx_name_scroll_sub_item")[0];
					var oScrollParent=$(".lx_name_scroll_sub")[0];
					var oDiv=$(".ls_name_box")[0];
					var oDivParent=$(".ls_name_box_item")[0];
					var oScrollH=oScrollParent.offsetHeight-dom2.offsetHeight;
					var oContentScrollH=oDiv.offsetHeight-oDivParent.offsetHeight;
					var scale=dom2.offsetTop/oScrollH;
					oDiv.style.top=-scale*oContentScrollH+'px';
					
				});
			});
			top["myAddEvent"]( $(".page_content_scroll_box")[0], "mousewheel",function(e){
				fn1(e,$(".lx_name_scroll_sub_item")[0], $(".lx_name_scroll_sub")[0],function(dom2){
					var dom2=$(".lx_name_scroll_sub_item")[0];
					var oScrollParent=$(".lx_name_scroll_sub")[0];
					var oDiv=$(".ls_name_box")[0];
					var oDivParent=$(".ls_name_box_item")[0];
					var oScrollH=oScrollParent.offsetHeight-dom2.offsetHeight;
					var oContentScrollH=oDiv.offsetHeight-oDivParent.offsetHeight;
					var scale=dom2.offsetTop/oScrollH;
					oDiv.style.top=-scale*oContentScrollH+'px';
				});
			});

		}
		
		
	}

	//生成赔率
	function odds(result){
		var time_lx_obj={
			2:'今日',
			1:'早盘',
			4:'过关',
			3:'滚球'
		};
		var game_lx_html;
		if( time_lx==3 ){ //滚球
			game_lx_html=$(".itemUl_li_active .page_left_descrite").html();
		}else{
			game_lx_html=$(".item_sub_active  .item_sub_name").html();
		}

		var table_nav={
			time_lx_html:time_lx_obj[time_lx],
			game_lx_html:game_lx_html
		}
		
		if(playitem==0 || time_lx==3){//  1x2/让球/大小 或者滚球时

			if(game_lx==1 ){//足球
				var render=template.compile(sportsTemp["1_0_header_title"]);
				var html=render(table_nav);
				$(".page_table_box").html(html);
				
				var date2={
					result:createHTML["rq_dx_dy"](result["data"])
				}
				
				var render=template.compile(sportsTemp["1_0_content"]);
				var html=render(date2);
				$(".page_content_pl_html").html(html);
				
			}else{//篮球以及其它
				
				var render=template.compile(sportsTemp["2_0_header_title"]);
				var html=render(table_nav);
				$(".page_table_box").html(html);
				
				var date2={
					result:createHTML["rq_dx_dy"](result["data"])
				} 
								
				var render=template.compile(sportsTemp["2_0_content"]);
				var html=render(date2);
				$(".page_content_pl_html").html(html);

			}

		}else if(playitem==4){//单双
			var render=template.compile(sportsTemp["ds_header_title"]);
			var html=render(table_nav);
			$(".page_table_box").html(html);
			
			var date2={
				result:createHTML["1_0_content"](result["data"])
			}
			var render=template.compile(sportsTemp["ds_content"]);
			var html=render(date2); 
			$(".page_content_pl_html").html(html);
			
		}else if(playitem==5){ //入球数

			var render=template.compile(sportsTemp["rqs_header_title"]);
			var html=render(table_nav);
			$(".page_table_box").html(html);
			
			var date2={
				result:createHTML["1_0_content"](result["data"])
			}
			
			var render=template.compile(sportsTemp["rqs_content"]);
			var html=render(date2); 
			$(".page_content_pl_html").html(html);

		}else if(playitem==6){//波胆

			var render=template.compile(sportsTemp["bd_header_title"]);
			var html=render(table_nav);
			$(".page_table_box").html(html);
			var date2={
				result:createHTML["1_0_content"](result["data"])
			}
			
			var render=template.compile(sportsTemp["bd_content"]);
			var html=render(date2); 
			$(".page_content_pl_html").html(html);

		}else if(playitem==7){//半全场
			var render=template.compile(sportsTemp["bqc_header_title"]);
			var html=render(table_nav);
			$(".page_table_box").html(html);
			var date2={
				result:createHTML["1_0_content"](result["data"])
			}
			var render=template.compile(sportsTemp["bqc_content"]);
			var html=render(date2); 
			$(".page_content_pl_html").html(html);

		}else if(playitem==8){ //先后入球
			
			var render=template.compile(sportsTemp["xhrq_header_title"]);
			var html=render(table_nav);
			$(".page_table_box").html(html);

			var date2={
				result:createHTML["1_0_content"](result["data"])
			}
			
			var render=template.compile(sportsTemp["xhrq_content"]);
			var html=render(date2); 
			$(".page_content_pl_html").html(html);

		}else if(playitem==10){//冠军

			result["data"]=createHTML["gj_content"](result["data"]);			
			var render=template.compile(sportsTemp["gj_header_title"]);
			var html=render(table_nav);
			$(".page_table_box").html(html);				
			var render=template.compile(sportsTemp["gj_content"]);
			var html=render(result);
			$(".page_content_pl_html").html(html);			
		}

		
		
		//为选中赔率增加.beting 
		if(order){
			var action=order["action"];
			
			$("table .odds[data-action='"+action+"']").addClass("beting");
		}else if(orderDataGG["betNum"]){
			for(var key in orderDataGG["action"] ){
				var action=orderDataGG["action"][key];
				
				$("table .odds[data-action='"+action+"']").addClass("beting");
			}
		}


	}

	
	// 数据的整理
	var createHTML={
		"1_0_content":function(result){ // 波胆 单双 让球 ......的数据整理
						var arr=[];
						var arrhtml=[],sum=0;
						arrhtml[sum]=[];
						
						for(var key in result){
							var list=result[key];
							if(!arr.length){arr[0]=list["lx"];arrhtml[sum].push(list["lx"]);}
							
							if(list["lx"]!=arr[0]){
								sum++;
								arr[0]=list["lx"];
								arrhtml[sum]=[];
								arrhtml[sum].push(list["lx"]);
							}
							arrhtml[sum].push(list);

						} 
						return arrhtml;
						
					},
		"rq_dx_dy":function(result){ // playitem==0 大小独赢 让球盘
				/*arrhtml 的格式
				var arrhtml=[
								{
									lx:"联赛名称",
									date:[
										{
											dy01:'123',
											dy02:'sdf'
											
										},
										{
											dy01:'123',
											dy02:'sdf'
										}
									]
								},
								{
									lx:"联赛名称",
									date:[
										{
											dy01:'123',
											dy02:'sdf'
											
										},
										{
											dy01:'123',
											dy02:'sdf'
										}
									]
								}
							];
					
				*/
				// 判读有无收藏
				
				var strUnique=getScData();
				
				// 对数据进行整理
				var arr=[];
				var arrhtml=[],sum=0,game_unique="";
				arrhtml[sum]={};

				for(var key in result){
					var list=result[key];
					if(!arr.length){arr[0]=list["lx"];arrhtml[sum]["lx"]=list["lx"];arrhtml[sum]["date"]=[];}
					
					if(list["lx"]!=arr[0]){
						sum++;
						arr[0]=list["lx"];
						arrhtml[sum]={};
						arrhtml[sum]["lx"]=list["lx"];
						arrhtml[sum]["date"]=[];
					}
					if(game_unique!=list["game_unique"]){
						list["hasSC"]=true;
						game_unique=list["game_unique"];
					}else{
						list["hasSC"]=false;
					};
					
					if( strUnique.length ){//判读有无收藏
						
						
						if( strUnique.join().indexOf( list["game_unique"] )!=-1 ){
							
							list["scClass"]=true; //已收藏
						}else{
							list["scClass"]=false; //未收藏
						}
					}
					arrhtml[sum]["date"].push(list);
				}
				for(var key in arrhtml){
					
					var list=arrhtml[key];
					list["scClass"]=true;
					
					
					for(var i in list["date"]){
						
						var value=list["date"][i];
						if(!value["scClass"]){
							list["scClass"]=false;
							continue;
						}
					}

				}
				
				return arrhtml;
			},
		
		'gj_content':function( data ){ //冠军的数据整理
						
				for(var a in data){
					for(var key in data[a]["lx_sub"]){
						var value=data[a]["lx_sub"][key];
						//console.log(value);
						var c=0;
						var num=0;
						var arr=[];
						arr[num]=[];
						
						for( var i in data[a]["lx_sub"][key] ){
							var obj=data[a]["lx_sub"][key][i]; 
							
							if(c<2){
								if(c==0){
									obj.gj_left_div="gj_left_div";
								}
								arr[num].push( obj );
								
							}else{
								c=0;
								num++;
								arr[num]=[];
								if(c==0){
									obj.gj_left_div="gj_left_div";
								}
								arr[num].push( obj );
								
							}
							c++;
							
						}
						for(var s in arr){
							if(arr[s].length<2){
								arr[s].push({});
							}
						}
						data[a]["lx_sub"][key]=arr;
						
					}
				}
				return data;
			}
					
	}
	function getScData(){//得到收藏的联赛
		//收藏 cookie 存储的格式
		//sc:{game_lx:[unique,unique,unique],game_lx:[unique,unique]}
		var data=top["getCookie"]("sc");
		if( data ){ data=JSON.parse(data); }
		var strUnique;
		if( data && data.hasOwnProperty(game_lx) ){
			strUnique=data[game_lx];
		}else{
			strUnique=[];
		}
		
		return strUnique; //数组 形式
	}
	



	
	//切换 time_lx  今日 早盘 过关 滚球
	$(".sport_tree_two").on("click","div",function(){
		var _this=$(this);
		time_lx=_this.attr("time_lx");
		_this.addClass("sport_tree_two_active").siblings().removeClass("sport_tree_two_active");
		game_lx="";
		currPage=1;
		lnum=[];
		game_time='';
		isAll=true;
		
		leftMenu();
	})
	//点击 非滚球 中的 li
	$(".sport_tree_content").on("click",".playitem ",function(){
		var _this=$(this);
		playitem=_this.attr("playitem");
		currPage=1;
		lnum=[];
		game_time='';
		isAll=true;
		
		_this.addClass("itemUl_li_active").siblings().removeClass("itemUl_li_active");
		getContent();
	})
	// 点击 滚球中的li
	$(".sport_tree_content").on("click",".page_left_si",function(){
		var _this=$(this);
		game_lx=_this.attr("game_lx");
		currPage=1;
		lnum=[];
		game_time='';
		isAll=true;
		
		_this.addClass("itemUl_li_active").siblings().removeClass("itemUl_li_active");
		getContent();
	})
	//点击非滚球中的 游戏类型 game_lx
	$(".sport_tree_content").on("click",".item_sub",function(){
		var _this=$(this);
		game_lx=_this.attr("game_lx");
		currPage=1;
		lnum=[];
		game_time='';
		isAll=true;

		_this.parent(".sport_tree_item").addClass("item_sub_active").siblings().removeClass("item_sub_active").find("ul").html("");
		_this.siblings("ul").html("<li>加载中,请稍后......</li>");
		
		//操作滚动条
		scrollLeft();
		clearInterval(timer);

		//进行数据请求
		var post01={
			fn:'get_play_item',
			time_lx:time_lx,
			game_lx:game_lx
		}
		
		getPlFn(post01,function(date,args,output,warning){
			date=jQuery.parseJSON(date);
			
			var bool=true;
			for(var key in date["playMenu"]){
				if( date["playMenu"][key] && bool ){
					bool=false;
					playitem=date["playMenu"][key]["playItem"];
					console.log(playitem);
				}
			}
			var obj={date:date,playitem:playitem};
			console.log(obj);
			var render=template.compile(sportsTemp["itemUl"]);
			var html=render(obj);
			$(".item_sub_active ul").html(html);
			
			//操作滚动条
			scrollLeft();
			//进行数据请求
			getContent();
		
		})

	})
	
	// page_content 顶部选中框

	//点击刷新按钮
	$(".change_box_nav").on("click",".refresh",function(){
		getContent();
	})
	
	// 点击关闭 选择联赛按钮
	$(".all_ls_box").on("click",".close_lsType_box",function(){
		$(".all_ls_box").hide();
		$(this).parent().siblings().find(".choose_box_sub").hide();
	})
	// 点击选择联赛按钮
	$(".change_box_nav").on("click",".lsType",function(){
		$(".all_ls_box").show();
		$(this).parent().siblings().find(".choose_box_sub").hide();

		if( lnum.length ){
			$(".all_ls input[type=checkbox]").attr("checked",false);
			var str=lnum.join();
			$(".ls_name_box .ls_name input[type=checkbox]").each(function(){
				var _this=$(this)
				var value=_this.attr("value");
				if( str.match(value)!=null ){
					_this.attr("checked",true);
				}else{
					_this.attr("checked",false);
				}
			});
		}else{
			$(".all_ls input[type=checkbox]").attr("checked",true);
			$(".ls_name_box").find(".ls_name input[type=checkbox]").attr("checked",true);
		}

		isScroll($(".ls_name_box"),$(".ls_name_box_item"),$(".ls_name_scroll_box"),'<div class="lx_name_scroll_sub"><div class="lx_name_scroll_sub_item"></div></div>');
		
		top["myAddEvent"]( $(".ls_name_box_item")[0], "mousewheel",function(e){
			fn1(e,$(".lx_name_scroll_sub_item")[0], $(".lx_name_scroll_sub")[0],function(dom2){
				
				var dom2=$(".lx_name_scroll_sub_item")[0];
				var oScrollParent=$(".lx_name_scroll_sub")[0];
				var oDiv=$(".ls_name_box")[0];
				var oDivParent=$(".ls_name_box_item")[0];
				var oScrollH=oScrollParent.offsetHeight-dom2.offsetHeight;
				var oContentScrollH=oDiv.offsetHeight-oDivParent.offsetHeight;
				var scale=dom2.offsetTop/oScrollH;
				oDiv.style.top=-scale*oContentScrollH+'px';
				
			});
		});
		top["myAddEvent"]( $(".page_content_scroll_box")[0], "mousewheel",function(e){
			fn1(e,$(".lx_name_scroll_sub_item")[0], $(".lx_name_scroll_sub")[0],function(dom2){
				var dom2=$(".lx_name_scroll_sub_item")[0];
				var oScrollParent=$(".lx_name_scroll_sub")[0];
				var oDiv=$(".ls_name_box")[0];
				var oDivParent=$(".ls_name_box_item")[0];
				var oScrollH=oScrollParent.offsetHeight-dom2.offsetHeight;
				var oContentScrollH=oDiv.offsetHeight-oDivParent.offsetHeight;
				var scale=dom2.offsetTop/oScrollH;
				oDiv.style.top=-scale*oContentScrollH+'px';
			});
		});

	})
	// 点击选择 盘口类型  排序方式   页数   按钮
	$(".change_box_nav").on("click",".panType,.pxType,.pageType",function(e){
		var _this=$(this);
		_this.parent().siblings().find(".choose_box_sub").hide();
		_this.siblings(".choose_box_sub").toggle();
		if(e.stopPropagation){
			e.stopPropagation();
		}else{
			e.cancelBubble=true;
		}
	})
	
	//选择盘口类型
	$(".change_box_nav").on("click",".panType_box  .panType_text",function(){
		var _this=$(this);
		var value=_this.attr("value");
		_this.parent().hide().siblings().attr("value",value).find("span").eq(0).html(_this.html());
		top["setCookie"]("panType",value);
		
	})
	
	//选择排序类型
	$(".change_box_nav").on("click",".pxType_box  .pxType_text",function(){
		var _this=$(this);
		var value=_this.attr("value");
		_this.parent().hide().siblings().attr("value",value).find("span").eq(0).html(_this.html());
		top["setCookie"]("pxType",value);
		getContent();
	})
	// 选择页数
	$(".change_box_nav").on("click",".pageType_box .pageType_text",function(){
		var _this=$(this);
		var value=_this.attr("value");
		_this.parent().hide().siblings().attr("value",value).find("span").eq(0).html(_this.html());
		currPage=value;
		getContent();
	})
	// 选择联赛   总复选框
	$(".all_ls_box").on("click",".all_ls input[type=checkbox]",function(){
		var _this=$(this);
		var $lsType_boxs=$(".lsType_boxs");
		if( _this.attr("checked") ){
			$lsType_boxs.find(".ls_name_box_item input[type=checkbox]").attr("checked",true);
		}else{
			$lsType_boxs.find(".ls_name_box_item input[type=checkbox]").attr("checked",false);		
		}
	})
	
	//选择联赛 单个复选框
	$(".all_ls_box").on("click",".ls_name_box_item input[type=checkbox]",function(){
		var _this=$(this);
		var $lsType_boxs=$(".lsType_boxs");
		if( _this.attr("checked") ){

			var isAllCheck=true;
			$(".ls_name_box_item input[type=checkbox]").each(function(){
				if( !$(this).attr("checked") ){
					isAllCheck=false;
				}
			});
			if( isAllCheck ){
				$lsType_boxs.find(".all_ls  input[type=checkbox]").attr("checked",true);
			}

		}else{
			$lsType_boxs.find(".all_ls  input[type=checkbox]").attr("checked",false);		
		}
	})
	// 点击选择联赛的确定按钮
	$(".all_ls_box").on("click",".lsBtn .lsBtn_choose_ok",function(){
		lnum=[];
		if( !$(".lsType_boxs .all_ls input[type=checkbox]").attr("checked") ){
			$(".ls_name_box_item input[type=checkbox]").each(function(){
				var value=$(this).attr("value");
				if( $(this).attr("checked") && lnum.join().match(value)==null ){
					lnum.push( value );
				}
			});
		}
		$(".all_ls_box").hide();
		getContent();
	})
	// 点击选择时间
	$(".change_box_nav").on("click",".date_content li",function(){
		var _this=$(this);
		game_time=_this.attr("game_time");
		_this.addClass("date_active").siblings().removeClass("date_active ");
		
		currPage=1;//默认页数
		lnum=[];//选择联赛为空


		getContent();
	})

	//点击显示收藏的联赛
	$(".change_box_nav").on("click",".top_nav_sc",function(){
		var _this=$(this);
		if( $(".sc_num").html()==0 ){
			return false;
		}

		
		_this.addClass("top_nav_left_active").siblings().removeClass("top_nav_left_active");
		
		currPage=1;//默认页数
		
		game_time="";//选择的时间
		isAll=false;//显示收藏
		getContent();
	})
	//点击显示全部联赛
	$(".change_box_nav").on("click",".all",function(){
		var _this=$(this);
		
		_this.addClass("top_nav_left_active").siblings().removeClass("top_nav_left_active");
		
		currPage=1;//默认页数
		
		game_time="";//选择的时间
		isAll=true;//显示收藏
		getContent();

	})


	$(document).on("click",".td_sc",function(){ //点击table中的收藏
		
		
		
		var _this=$(this);
		_this.toggleClass("scClass");
		var gameUnique=$(this).attr("game_unique");
		
		var cookies=top["getCookie"]("sc");
		if( cookies ){
			cookies=JSON.parse(cookies);
		}else{
			cookies={};	
		}
		
		var arr=[];
		if( cookies.hasOwnProperty(game_lx) ){
			arr=cookies[game_lx];
		}else{
			cookies[game_lx]=[];
		}

		if( _this.hasClass("scClass") ){
			if(arr.join().match( gameUnique )==null){
				arr.push(gameUnique);
			}
			var isAllCheck=true;
			var $pl_box=_this.closest(".pl_box");
			$pl_box.find(".td_sc").each(function(){
				
				if( !$(this).hasClass("scClass") ){
					isAllCheck=false;
				}
			});
			
			if( isAllCheck ){ $pl_box.siblings().find(".lx_sc").addClass("lx_scClass") }
		}else{
			if(arr.length){
				var index;
				for( var i=0;i<arr.length;i++ ){
					if( arr[i]==gameUnique ){
						index=i;
					}
				}
				arr.splice(index,1);
				
			}
			if( !isAll ){
				var $thisTable=_this.closest("table");
				var $game_unique=$thisTable.attr("game_unique");

				var $thisPl_box=$thisTable.closest(".pl_box");
				$thisPl_box.find("table").each(function(){
					if( $(this).attr("game_unique")==$game_unique ){
						$(this).remove();
					}
				});
				if( !$thisPl_box.find("table").length  ){ $thisPl_box.parent().remove() }
				scrollContent();
			}else{
				_this.closest(".pl_box").siblings().find(".lx_sc").removeClass("lx_scClass");
			}
		}

		cookies[game_lx]=arr;
		$(".sc_num").html(arr.length);
		
		dataString=JSON.stringify(cookies);
		top["setCookie"]("sc",dataString);
		console.log(top["getCookie"]("sc"));
		
		

		if( arr.length==0 && isAll==false ){isAll=true;getContent();}
		
		
	})

	$(document).on("click",".lx_sc",function(e){ // 点击 .lx 中的收藏
		var _this=$(this);
		_this.toggleClass("lx_scClass");
		
		var cookies=top["getCookie"]("sc");
		if( cookies ){
			cookies=JSON.parse(cookies);
		}else{
			cookies={};	
		}
		
		var arr;
		if(cookies.hasOwnProperty(game_lx)){
			arr=cookies[game_lx];
		}else if(!cookies.hasOwnProperty(game_lx)){
			arr=[];
			cookies[game_lx]=arr;
		}
		
		var gameUnique=new Array();
		_this.parent().siblings().find(".td_sc").each(function(){
			gameUnique.push( $(this).attr("game_unique") );
		});
		var str=arr.join();
		if( _this.hasClass("lx_scClass") ){
			
			for(var i=0;i<gameUnique.length;i++){
				if( str.match( gameUnique[i] )==null  ){
					arr.push(gameUnique[i]);
				}
			}
			_this.parent().siblings().find(".td_sc").addClass("scClass");
		}else{
			for(var i=0;i<gameUnique.length;i++){
				var value=gameUnique[i];
				if( str.match( value )!=null ){
					for(var s=0;s<arr.length;s++){
						if( arr[s]==value ){
							arr.splice(s,1);
						}
					}
				}
				
			}
			
			if( !isAll ){
				console.log("非全部,收藏");
				_this.parent().parent().remove();
				scrollContent();
			}else{
				_this.parent().siblings().find(".td_sc").removeClass("scClass");
			}
		}
		
		cookies[game_lx]=arr;
		dataString=JSON.stringify(cookies);
		top["setCookie"]("sc",dataString);
		console.log(top["getCookie"]("sc"));
		
		$(".sc_num").html(arr.length);
		if( arr.length==0 && isAll==false ){isAll=true;getContent();}


	})

	//点击更多玩法
	$(document).on("click",".more_play",function(){
		var _this=$(this);
		var game_unique=_this.attr("game_unique");
		var lx_name=_this.closest(".pl_box").siblings(".lx").text();

		var post={
			time_lx:time_lx,
			game_lx:game_lx,
			playitem:playitem,
			fn:'get_more',
			game_unique:game_unique
		}
		getPlFn(post,function(result,args,output,warning){
			console.log(post);
			result=jQuery.parseJSON(result);
			console.log(result);
			
			for(var key in result){
				var arr=result[key];
				if(arr.length>0){
					var gname1=arr[0]["gname1"];
					var gname2=arr[0]["gname2"];
					
				}
			}
			var date={
				result:result,
				game_lx_html:$(".item_sub_active .item_sub_name").html(),
				time_lx_html:$(".sport_tree_two_active").text(),
				lx_name:lx_name,
				gname1:gname1,
				gname2:gname2
			}
			console.log(date);
			var render=template.compile(sportsTemp["more_play"]);
			var html=render( date );
			$(".more_play_content").remove();
			$(".page").append(html);
			

			var clientH=$(window).height();
			var clientW=$(window).width();
			//拖拽
			var minX=210;
			var maxX=clientW-700;
			var minY=0;			
			var maxY=clientH-71-335;			
			var dom=$(".more_play_content_header_text")[0];
			var dom2=$(".more_play_content")[0];
			drags(minX,minY,maxX,maxY,dom,dom2);
			
			
			isScroll($(".more_play_sub_item"),$(".more_play_content_sub"),$(".more_play_scroll_box"),'<div class="more_play_scroll_sub"><div class="more_play_scroll_sub_item"></div></div>');
			
			top["myAddEvent"]( $(".more_play_content_box")[0], "mousewheel",function(e){
				fn1(e,$(".more_play_scroll_sub_item")[0], $(".more_play_scroll_sub")[0],function(dom2){
					
					var dom2=$(".more_play_scroll_sub_item")[0];
					var oScrollParent=$(".more_play_scroll_sub")[0];
					var oDiv=$(".more_play_sub_item")[0];
					var oDivParent=$(".more_play_content_sub")[0];
					var oScrollH=oScrollParent.offsetHeight-dom2.offsetHeight;
					var oContentScrollH=oDiv.offsetHeight-oDivParent.offsetHeight;
					var scale=dom2.offsetTop/oScrollH;
					oDiv.style.top=-scale*oContentScrollH+'px';
					
				});
			});
			top["myAddEvent"]( $(".page_content_scroll_box")[0], "mousewheel",function(e){
				fn1(e,$(".more_play_scroll_sub_item")[0], $(".more_play_scroll_sub")[0],function(dom2){
					
					var dom2=$(".more_play_scroll_sub_item")[0];
					var oScrollParent=$(".more_play_scroll_sub")[0];
					var oDiv=$(".more_play_sub_item")[0];
					var oDivParent=$(".more_play_content_sub")[0];
					var oScrollH=oScrollParent.offsetHeight-dom2.offsetHeight;
					var oContentScrollH=oDiv.offsetHeight-oDivParent.offsetHeight;
					var scale=dom2.offsetTop/oScrollH;
					oDiv.style.top=-scale*oContentScrollH+'px';
					
				});
			});
			
			$(".close_more_play_box").off().on("click",function(){
				$(".more_play_box").remove();
			})
			
		});
	})
	



	// 投注事件

	//点击赔率 生成页面dom
	$(document).on("click",".odds",function(){
		var uid = top["getCookie"]( 'uid' );
		if(!uid){
			if($(".login_box .userLink").length){
				top["loginOut"]();
			}
			top["dialong"]({
				html:'请先登录再进行投注',
				autonone:3000
			},'',function(){
				
				$(".login_box input[name=u_name]").focus();
			});

			return false;
		}
		if( !$(".login_box .userLink").length ){
			top["getUserData"]();
		}
		
		var _this=$(this);
		var lang = top["getCookie"]( 'lang' );
		var action=_this.attr("data-action");
		var betPl=_this.html();

		var reg=/\*/ig;
		var arr=null;
		var arrIndex=[];
		while( (arr=reg.exec(action))!=null ){
			arrIndex.push(arr["index"]);
		}
		var gameUnique=action.slice(arrIndex[0]+1,arrIndex[1]);
		

		var post = {'uid':uid, 'lang': lang, 'pan_type':top["getCookie"]("panType"), 'action': action};
		
		//$(".menu").hasClass("active")?top["pageLeftSubTop"]=$(".page_left_sub").get(0).offsetTop:'';
			
		_this.toggleClass("beting");
		//过关连串
		if( time_lx==4 ){ 			
			var isBeting=_this.hasClass("beting")?true:false;			
			$("table .odds").each(function(){
				var data_action=$(this).attr("data-action");				
				if(data_action.indexOf(gameUnique)!=-1){
					$(this).removeClass("beting")
				}				
			})
			isBeting?$(this).addClass("beting"):'';
			
			//post["betNum"]=0;
			if(isBeting){ //投注
				//生成左侧过关注单

				top["isConsole"](post);
				betFn("getOrderGG",post,function ( result, args, output, warning ){
					top["isConsole"](result);
					
					if(result["flagID"]!=7777){
						
						top["dialong"]({
							title:'无法投注',
							html:systemAlert(result["flagID"]),
							btn:["确定","取消"]
						})
						_this.removeClass("beting");
						return false;
					}
					
					clearTimeout(timers["betStatus"]);
					
					if( !orderDataGG.betNum ){
						//$(".menu").hasClass("active")?top["pageLeftSubTop"]=$(".page_left_sub").get(0).offsetTop:'';
						
						$(".page_left_sub").css("top",0);
						
						var render=template.compile(sportsTemp["page_left_nowList_content_box"]);
						var html=render(result);
						$(".page_left_nowList").show().html(html);
						$(".page_left_menu,.page_left_bettingRecord").hide();

						orderData.minMoney = result.minMoney;
						orderData.maxMoney = result.maxMoney;
						orderData.minBetNum = result.minBetNum;
						orderData.maxBetNum = result.maxBetNum;
						orderData.maxPaicaiMoney = result.maxPaicaiMoney;
						
						orderDataGG.betNum++;

					}else{
						var $len=$(".page_left_nowList_content_sub[nowlist-gameunique="+result["gameUnique"]+"]").length;
						if($len){
						
							$(".page_left_nowList_content_sub[nowlist-gameunique="+result["gameUnique"]+"]").remove();

						}else{
							orderDataGG.betNum++;
					
						}
						var render=template.compile(sportsTemp["page_left_nowList_content"]);
						var html=render(result);
						$(".page_left_nowList_content").append(html);
						
					}
					$(".betMoney").length?$(".betMoney").get(0).focus():'';
					
					orderDataGG.action[result.gameUnique] = result.action;
					orderDataGG.betPl[result.gameUnique]  = result.betPl;
					//可贏金額計算賠率
					orderDataGG.betPlJs[result.gameUnique]  = result.betPl;
					gainMoney();

					console.log(orderDataGG);
					
					//左侧滚动条
					scrollLeft();

					
				});

			}else{//移除注单
				removeNowListBeting(gameUnique);
			}
			$(".betMoney").length?$(".betMoney").get(0).focus():'';

			
		}else{ //非过关连串

			
			var isBeting=_this.hasClass("beting")?true:false;
			$("table .odds").removeClass("beting");
			isBeting?$(this).addClass("beting"):'';
			if(!$(this).hasClass("beting")){
				menuShow();
				
				return false;
			}

			post["betPl"]=betPl;
			top["isConsole"](post);
			betFn("getOrderUnitary", post, function ( result, args, output, warning ) {
				
				top["isConsole"](result);
				
				if(result["flagID"]!=7777){
					
					top["dialong"]({
						title:'无法投注',
						html:systemAlert(result["flagID"]),
						btn:["确定","取消"]
					})
					_this.removeClass("beting");
					
					return false;
				}
				
				clearTimeout(timers["betStatus"]);
								
				$(".page_left_menu,.page_left_bettingRecord").hide();
				$(".page_left_nowList").show();
				
				var render=template.compile(sportsTemp["page_left_nowList_content_box"]);
				var html=render(result);
				$(".page_left_nowList").html(html);
				$(".betMoney").get(0).focus();
				$(".page_left_sub").css("top",0);
				

				//betOddsChangeFn1(action,betPl);
				order={	//投注时传给后台的参数			
					'uid':top["getCookie"]("uid"),
					'lang': top["getCookie"]("lang"),
					'pan_type':$(".panType").attr("value"), 
					'action': result.action,
					'betPl':  result.betPl,
					'jsBetPl':result.jsBetPl,
					'betMoney': $('.betMoney').val(),
					'bet_model':1
				}
				orderData=result;

				//左侧滚动条
				scrollLeft();
			})					
		
		}

	})
	
	//点击快选金额按钮与清除按钮
	$(document).on("click",".bet_quick_btn_box button",function(){
		$(".betMoney").val( $(this).html() );
		var val=$(".betMoney").val();
		if( time_lx==4 ){
			gainMoney();//过关盈利金额
		}else{
			$(".yingli").val( val?(val*orderData["jsBetPl"]).toFixed(2):"" );
		
		}
		$(".betMoney").get(0).focus();
	})
	$(document).on("click",".clear_money",function(){
		$(".betMoney").val("");
		$(".yingli").val("");
		$(".betMoney").get(0).focus();
	})
	//监听投注按钮金额框的变化
	$(document).on("keydown",".betMoney",function(){
		var $_this=$(this);

		setTimeout(function(){

			
			var val=$_this.val();
			val=val.replace(/^(0)0*/ig,"$1");
			val=val.replace(/^\./i,"");
			val=val.replace(/[^0-9.]/ig,"");
			val=val.replace(/(^[0-9]+\.[0-9]*)\./ig,"$1");
			$_this.val(val);
			
			var reg=/^0+/ig;
			if( reg.test(val) ){
				
				var reg1=/^0+\.[0-9]*$/ig;
				if(reg1.test(val)){
					
					var str=val.replace(/^0+(\.[0-9]{0,2})[0-9]*$/ig,"$1");
					
					$_this.val("0"+str);
					
				}
				var reg2=/^0+([1-9])+$/gi; 
				if(reg2.test(val)){
					console.log("021235");
					
					var str=val.replace(reg2,"$1");
					$_this.val(str);
					
				}
			}else{
				
				var reg3=/(^[1-9][0-9]*\.[0-9]{0,2})[0-9]*$/ig;
				var str=val.replace(reg3,"$1");
				$_this.val(str);
				
			}
			var val=$_this.val();
			//计算盈利
			
			if( time_lx==4 ){
				gainMoney();//过关盈利金额
			}else{
				$(".yingli").val( val?(val*orderData["jsBetPl"]).toFixed(2):"" );		
			}

		},0);
	})
	


	//点击投注 按钮投注
	$(document).on("click",".nowList_btn_ok",function(){ 
		//clearTimeout(timers["nogg_nowList_alert_info"]);
		//$(".nogg_nowList_alert_info").html("");
		
		if(!$(".betMoney").val()){
			
			
			top["dialong"]({
				autonone:3000,
				html:'请输入投注金额再进行投注'
			},'',function(){
				$(".betMoney").focus();
			})
			
			return false;
		}else if($(".betMoney").val()<orderData["minMoney"]){
			
			top["dialong"]({
				autonone:3000,
				html:"投注金额最小为"+orderData["minMoney"]
			},'',function(){
				$(".betMoney").focus();
			})
			return false;
		}else if( $(".betMoney").val()>orderData["maxMoney"]  ){
			
			top["dialong"]({
				autonone:3000,
				html:"投注金额最大为"+orderData["maxMoney"]
			},'',function(){
				$(".betMoney").focus();
			})
			
			return false;

		}else if(time_lx==4 ){//过关
			
			var post=getGGparm();
			if( post.betNum < orderData.minBetNum ){ 
				
				top["dialong"]({
					autonone:3000,
					html:UI.ID10417 + orderData.minBetNum
				})
				
				return false;
			}
			if( post.betNum > orderData.maxBetNum ){ 
				
				top["dialong"]({
					autonone:3000,
					html:UI.ID10418 + orderData.maxBetNum
				})
				return false; 
			}
			
			
		}else if(time_lx!=4){//非过关

			//投注时需要传递给后台的参数
			order={				
				'uid':top["getCookie"]("uid"),
				'lang': top["getCookie"]("lang"),
				'pan_type':$(".panType").attr("value"), 
				'action': orderData.action,
				'betPl':  orderData.betPl,
				'betMoney': $('.betMoney').val(),
				'bet_model':1
			}
		}
			
		console.log(order);

		if( $(".isShow_confirm_beting_btn").hasClass("true") ){ //显示确认投注框
			
			if( time_lx==4  ){
				//过关时
				var content="共"+post.betNum+"注;过关最高派彩金额为:"+orderData.maxPaicaiMoney
			}else{
				var content="";
			}
			content+='<div>投注金额为:'+$(".betMoney").val()+'</div><div>可盈利:'+$(".yingli").val()+'</div>';
			/*
			var date={
				header:'确认投注?',
				content:content,
				btn:{
					bet_alert_ok:{text:'确定',fn:'confirm_bet_fn'},
					bet_alert_false:{text:'取消',fn:'close_bet_alert_box'}
					
				},
				close_btn:{
					clas:'close_bet_alert_box',
					fn:'close_bet_alert_box'
				}
			}
			var render=template.compile(sportsTemp["alert_box"]);
			var html=render(date);
			$(".alert_box").html(html).show();
			$(".alertOverlay").show();
			*/
			top["dialong"]({
				title:'确认投注',
				html:content,
				btn:["确定","取消"]
			},function(){
				if($(this).index()==0){
					confirm_bet_fn()
				}
			})
		}else {

			//直接投注
			confirm_bet_fn();			
		
		}								
	})

	//得到过关中传递给后台的参数
	function getGGparm(){
			var action = '';
			for(var  id in orderDataGG.action ){
				if( action ) action += ';';
				action += orderDataGG.action[id];
			}
			
			betPl = '';
			for(var  id in orderDataGG.betPl ){
				if( betPl ) betPl += ';';
				betPl += orderDataGG.betPl[id];
			}
			var uid=top["getCookie"]("uid");
			var lang=top["getCookie"]("lang");
			var pan_type=$(".panType").attr("value");
			
			var post = {
						'uid':uid, 'lang': lang, 'pan_type':pan_type, 
						'action': 	action,
						'betPl':	betPl,
						'betNum':	orderDataGG.betNum,
						'betMoney': $('.betMoney').val()
			};
			
			console.log(orderData);
			return post;
	}
	
	//点击 正在投注单 的关闭 按钮
	$(document).on("click",".close_nowList_nogg",function(){
		
		var gameunique=game_unique=$(this).closest(".page_left_nowList_content_sub").attr("nowlist-gameunique");
		$("table .odds").each(function(){
				
			var data_action=$(this).attr("data-action");
			if(data_action.indexOf(game_unique)!=-1){
				$(this).removeClass("beting");
			}
		});
		$(this).closest(".page_left_nowList_content_sub").remove();
		if( time_lx==4 ){ //过关
			
			delete orderDataGG["action"][gameunique];
			delete orderDataGG["betPl"][gameunique];
			delete orderDataGG["action"][gameunique];
			delete orderDataGG["betPlJs"][gameunique];
			orderDataGG["betNum"]--;
			orderDataGG["betNum"]<0?orderDataGG["betNum"]=0:'';
			
		
		}else{ //非过关
				
			order=null;
		
		}
		
		
		if( (time_lx==4 && !orderDataGG["betNum"]) ||  ( time_lx!=4 && !order )  ){
			menuShow();
		}else{
			//左侧滚动条
			scrollLeft();
		}
		
	})
	//点击关闭按钮与取消按钮
	$(document).on("click",".nowList_btn_no,.showSportMenu,.menu,.bet_status_btn_close",function(){
		menuShow();
		
	})
	//最近十注
	$(document).on("click",".beenList",function(){
		var post={
			uid:top["getCookie"]('uid'),
			lang:top["getCookie"]('lang'),
			'account_type':'dq',
			bet_model:3
			
		};
		if( !top["getCookie"]("uid") ){
			return false;
		}
		$(this).addClass("active").siblings().removeClass("active");
		$(".page_left_menu,.page_left_nowList").hide();
		$(".page_left_bettingRecord").show().html("加载中......");
		$(".page_left_sub").css("top",0);
		
		$("table .odds").removeClass("beting");
		//存储 过关投注数据
		orderDataGG	= {'action':[], 'betPl':[], 'betPlJs':[], 'betNum': 0 };	
		//存储非过关投注数据
		order  = null;
		orderData= new Object();
		
		clearTimeout(timers["betStatus"]);

		scrollLeft();
		getBeenList(post,function(result){
			console.log(result);
			if( $.isEmptyObject(result) ){
				$(".page_left_bettingRecord").html("暂无数据......");
				return false;
			}
			var render=template.compile( sportsTemp["beenList"] );
			var html=render({result:result});
			$(".page_left_bettingRecord").html(html);
			scrollLeft();
			
		});
	})


	//点击弹出框中的 确定投注按钮
	function confirm_bet_fn(){
		//close_bet_alert_box();
		loadFn('投注中,请等待...');
		
		//过关
		if( time_lx==4  ){

			var post=getGGparm();
			console.log(post);

			if( post.betNum < orderData.minBetNum ){ 
				//alertBox( 0, contentHtml= UI.ID10417 + orderData.minBetNum, ''  );
				/*
				var date={
					header:'提示信息',
					content:
					btn:{
						bet_alert_ok:{text:'确定',fn:'close_bet_alert_box'},
						bet_alert_false:{text:'取消',fn:'close_bet_alert_box'}
						
					},
					close_btn:{
						clas:'close_bet_alert_box',
						fn:'close_bet_alert_box'
					}
				}
				alertFn(date);
				*/
				top["dialong"]({
					title:'提示信息',
					html:UI.ID10417 + orderData.minBetNum,
					btn:["确定"]
				})
				
				return false;
			}
			if( post.betNum > orderData.maxBetNum ){ 
				//alertBox( 0, contentHtml= UI.ID10418 + orderData.maxBetNum, ''  );
				
				top["dialong"]({
					title:'提示信息',
					html:UI.ID10418 + orderData.maxBetNum,
					btn:["确定"]
				})
				return false; 
			}
			


		}else{//非过关
			var post=order;
			
		}
		
		gotoBetingUnitary(post);
	}
	//点击  确认投注  按钮进行投注
	function gotoBetingUnitary(post){
		console.log(post);
		
		betFn('gotoBetingUnitary', post, function ( result, args, output, warning ){
			
			result=jQuery.parseJSON(result);
			thisresult=result;
			
			console.log(result);
			
			closeloadFn();
		
			
			var contentHtml='';
			switch( parseInt( thisresult.flagID ) ){
				case 10409: //赔率改变
					var time_lx=time_lx;
					for( gameUnique in thisresult.newBetPl ){
						//alert(gameUnique);
						var html=$(".page_left_nowList_content_sub[nowlist-gameunique="+gameUnique+"]").find(".betPl").html();
						contentHtml = UI.ID10420 +'<b>'+ html +'</b>'+ UI.ID10421 +'<b>'+ thisresult.newBetPl[gameUnique] +'</b><br/><br/>'+ UI.ID10422 +'？';
						
						$(".page_left_nowList_content_sub[nowlist-gameunique="+gameUnique+"]").find(".betPl").html(thisresult.newBetPl[gameUnique]);
						$(".page_left_nowList_content_sub[nowlist-gameunique="+gameUnique+"]").find(".betPl").css("background-color",'#F0AD4E');

						
						if( time_lx==4 ){//过关
							orderDataGG.betPl[gameUnique] = thisresult.newBetPl[gameUnique];
							if( result.playLx == 1 ){
									orderDataGG.betPlJs[gameUnique] = thisresult.newBetPl[gameUnique]-1;
							}else{
									orderDataGG.betPlJs[gameUnique] = thisresult.newBetPl[gameUnique];
							}
							contentHtml = UI.ID10409 +'<br/><br/>'+ UI.ID10422 +'？';
							//alertBox( 0, contentHtml, 'gotoBetingUnitary(1)' );	
						}else{//非过关
							order.betPl=thisresult.newBetPl[gameUnique];
						}

					}
					
					top["dialong"]({
						title:'赔率改变',
						html:contentHtml+'',
						btn:["确定","取消"]
					},function(){
						if($(this).index()==0){
							confirm_bet_fn()
						}
					})
				break;
				case 7777: 
						
						switch( parseInt( thisresult.betStatus ) ){
							case 0:  
									statusString = UI.XiaZhuChengGong; 
									contentHtml = UI.XiaZhuChengGong +'<br/>'+ UI.ID10415;
							break;
							case -1: 
									statusString = UI.DengDaiQueRen; 
									isCheckBetStatus = 1; 
									checkBetStatusTime = 10; 
									checkBetId =  thisresult.betId; 
									contentHtml = UI.ID10414+'<br/>'+ UI.ID10415; 
							break; 
							case 3:  
									statusString = UI.ZhuDanBuJieShou; 
									contentHtml = UI.ID10414 +'<br/>'+ UI.ID10415; 
							break;
						}
						//statusString += '</div>';
						
						/*
						var date={
							header:'提示信息',
							content:contentHtml,
							btn:{
								bet_alert_ok:{text:'确定',fn:'close_bet_alert_box'}
								
							},
							close_btn:{
								clas:'close_bet_alert_box',
								fn:'close_bet_alert_box'
							}
						}
						alertFn(date);
						//提示成功或状态
						//alertBox( 0, contentHtml, '' );
						*/
						top["dialong"]({
							title:'提示信息',
							html:contentHtml,
							btn:["确定"]
						})
						
						var panType;
						switch( parseInt( thisresult.panType ) ){
							case 1: panType= ' ['+ UI.XiangGangPan +']'; break;
							case 2: panType= ' ['+ UI.MaLaiPan +']'; break;
							case 3: panType= ' ['+ UI.OuZhouPan +']'; break;
						}


						var date={
							status:thisresult.betStatus,
							statusText:statusString,
							betMoney:thisresult.betMoney,
							panType:panType,
							betId:thisresult.betIdAdd,
							betTime:thisresult.betTime
						}
						var render=template.compile(sportsTemp["betStatus"]);
						var html=render(date);
						$(".user_scalable_box").remove();
						$(".page_left_nowList_content .close_nowList_nogg").remove();
						$(".page_left_nowList_content_box").append(html);
						
						
						orderData		= new Object();

						//存储 过关投注数据
						orderDataGG		= {'action':[], 'betPl':[], 'betPlJs':[], 'betNum': 0 };	
						//存储非过关投注数据
						order           = null;
						
						waitConfirm();
						top["getUserData"]();
						$("table .odds").removeClass("beting");

						scrollLeft();

				break;	//状态正常
				default:
					
					top["dialong"]({
						title:'提示信息',
						html:systemAlert( result.flagID ),
						btn:["确定"]
					})
				break;
			}	

		});
	}
	//等待确认中调用的函数
	function waitConfirm(){

		if( isCheckBetStatus == 0 ) return false;


		if( checkBetStatusTime > 0 ){
			checkBetStatusTime--;
			
			$(".bet_status").html(UI.DengDaiQueRen+'....['+checkBetStatusTime+']');
		}else if( checkBetStatusTime == 0 ){

			checkBetStatusTime=10;

			var post = {
				'uid': top["getCookie"]("uid"),
				'lang': top["getCookie"]("lang"),
				'betId': checkBetId
			}		
			betFn('checkBetStatus', post, function ( result, args, output, warning ){
				console.log( post );
				console.log( result );
				switch( parseInt( result.betStatus ) ){
				
					case 0:
						clearTimeout(timers["betStatus"]);
						$(".bet_status").html(UI.XiaZhuChengGong);
						isCheckBetStatus = 0;
						break;
					case -1:
						//checkBetStatusTime = 10;
						break;
					case 1:
						clearTimeout(timers["betStatus"]);
						$(".bet_status").html(UI.ZhuDanBuJieShou);
						isCheckBetStatus = 0;
						break;			
				}
				
			}, true);	
		}
		timers["betStatus"]=setTimeout( function (){ waitConfirm() }, 1000);
	}


	//显示盘口格式
	template.helper("pkName", function(playObj, pkNum ){	
		if( pkNum >= 0 && playObj == 'rqpl1' ){
			return ' (让'+ pkNum +') '; 
		}else if( pkNum >= 0 && playObj == 'rqpl2' ){
			return ' ( 受让'+ pkNum +') ';
		}else if( pkNum < 0 && playObj == 'rqpl1' ){
			return ' (受让'+(-1*pkNum) +') '; 
		}else if( pkNum < 0 && playObj == 'rqpl2' ){
			return ' (让'+ (-1*pkNum) +') ';
		}
	})

	//得到投注对象名称
	template.helper("getName",function( playLx, playObj, gName1, gName2 ){
		
		
		switch( playObj ){
			case 'dy1':  case 'rqpl1': case 'Gj': 
				
				return gName1;
			break;
				
			case 'dy2':  case 'rqpl2':	return gName2; break;
			case 'dy3':					return "和局"; break;
			case 'dxpl1':				return "大"; break;
			case 'dxpl2':				return "小"; break;
			case 'dspl1':				return "单"; break;
			case 'dspl2':				return "双"; break;

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
			
			case 'pl_H_H': return "主/主"; break;
			case 'pl_H_N': return '主/和'; break;
			case 'pl_H_C': return '主/客'; break;
			case 'pl_N_H': return '和/主'; break;
			case 'pl_N_N': return '和/和'; break;
			case 'pl_N_C': return '和/客'; break;
			case 'pl_C_H': return '客/主'; break;
			case 'pl_C_N': return '客/和'; break;
			case 'pl_C_C': return '客/客'; break;

			case 'pl_n': return '没有进球';break;
			case 'pl_h_h':case 'pl_h_c': return '最后进球';break;
			case 'pl_x_h':case 'pl_x_c': return '最先进球';break;
		}

	
	})

	//计算过关盈利金额
	function gainMoney(){
	
		var t_pl = 1;
		for ( game_unique in orderDataGG.betPlJs ){
			t_pl *= parseFloat(orderDataGG.betPlJs[game_unique]);
		}
		
		t_pl = t_pl-1;
		var val=$(".betMoney").val();
		$('.yingli').val(val?(val*t_pl).toFixed(2):'');
	
	}


	//点击过关中已有 .beting 类时
	function removeNowListBeting(gameunique,isRemoveBeting){
		
		$(".page_left_nowList_content_sub[nowlist-gameunique="+gameunique+"]").remove();
		if( !$(".page_left_nowList_content_sub").length){
			menuShow();

		}else if(time_lx==4){
			gainMoney();
			delete orderDataGG["action"][gameunique];
			delete orderDataGG["betPl"][gameunique];
			delete orderDataGG["action"][gameunique];
			delete orderDataGG["betPlJs"][gameunique];
			orderDataGG["betNum"]--;
			orderDataGG["betNum"]<0?orderDataGG["betNum"]=0:'';
			
			scrollLeft();
		}
		

	}

	//左侧 体育菜单显示 其他隐藏
	function menuShow(){
		clearTimeout(timers["betStatus"]);
		$(".beenList").removeClass("active");
		$(".left_change_box>div.menu").addClass("active");
		
		$(".page_left_menu").show();
		$(".page_left_nowList,.page_left_bettingRecord").hide().html("");
		
		$("table .odds").removeClass("beting");
		$(".page_left_sub").css("top",0);
		//存储 过关投注数据
		orderDataGG	= {'action':[], 'betPl':[], 'betPlJs':[], 'betNum': 0 };	
		//存储非过关投注数据
		order  = null;
		orderData= new Object();
		
		//左侧滚动条
		scrollLeft();
	}





	//弹出确定框
	function alertFn(data){
		var render=template.compile(sportsTemp["alert_box"]);
		var html=render(data);
		$(".alert_box").html(html);
		$(".alertOverlay").show();
	}
	function loadFn(content){
		$(".load_box").html('<div class="load"><img src="images2/loadingBG.gif" width=50 heihgt=50><div>'+content+'</div></div>');
		$(".alertOverlay").show();
	}
	function closeloadFn(){
		$(".load_box").html("");
		$(".alertOverlay").hide();
	}

	//检查状态
	function systemAlert( flagID ){ //非 7777时状态
		var str;
		//执行成功
		flagID = parseInt(flagID);
		//if( flagID == 7777 ) return 7777;

		//弹出提示信息
		if( flagID == 10407001 ||  flagID == 10407002 ||  flagID == 10407003 ||  flagID == 10407004 ||  flagID == 10407005 ){
			str= UI.ID10407+'['+flagID+']';
		}else if(flagID==10001){
			str="系统维护";
			top["loginOut"]();
		}else if(flagID==10004){
			str="登录失效";
			top["loginOut"]();
		}else if (flagID == '' || typeof(flagID) == "undefined" || flagID == 0 )
		{
			str=UI.ID10002+'['+flagID+']';
		} else{
			
			str=UI["ID"+flagID]+'['+flagID+']';
		}
		
		//var system="<div class='systemAlert'>"+str+"</div>";
		return str;
		
	}
	$(document).on("click",".alert_box_sub input[type=button],.alert_box_sub button,.alert_box_sub .close_alert_box",function(){
		var funName=$(this).attr("data-fn");
		
		var fn=eval(funName);
		fn();
		//eval(funName+'()');
	})
	function close_bet_alert_box(){
		
		$(".alert_box").html("");
		$(".alertOverlay").hide();
		$(".betMoney").length && $(".betMoney").get(0).focus();
		
	}





	$(window).on("resize",function(){
		var $clientH=$(window).height();
		var pageTop=$(".page")[0].offsetTop;
		$(".page_left,.page_content,.page_right,.page_left_scroll_box").css("height",$clientH-pageTop+'px');
		
		scrollLeft();
		scrollContent();
		

	})


	function scrollLeft(){
		
		isScroll($(".page_left_sub"),$(".page_left"),$(".page_left_scroll_box"),'<div class="page_left_scroll_sub"><div class="page_left_scroll_sub_item"></div></div>');
	}
	function scrollContent(){
		
		isScroll($(".page_content_sub"),$(".page_content_sub_parent"),$(".page_content_scroll_box"),'<div class="page_content_scroll_sub"><div class="page_content_scroll_sub_item"></div></div>');
	}
	

	function isScroll($oDiv,$oDivParent,$oScrollBoxParent,str){
		var $oDivH=$oDiv.height();
		var $oDivParentH=$oDivParent.height();
		var $oScrollBoxParentH=$oScrollBoxParent.height();
		if($oDivH>$oDivParentH){
			if( $oScrollBoxParent.children().length ){
				
			}else{
				$oScrollBoxParent.html(str);
			}

			var $oScroll=$oScrollBoxParent.find("div").eq(1);
			var $oScrollBox=$oScrollBoxParent.find("div").eq(0);

			var $oScrollBoxH=$oScrollBox.height();

			var $oDivT=Math.abs($oDiv.position().top);
			$oScroll.css("height",parseInt($oDivParentH*$oScrollBoxH/$oDivH)+'px');
			var $oScrollH=$oScroll.height();
			
			if( $oDivT!=0 ){
				//top值 大于应该滚动的高度时
				if( $oDivT>$oDivH- $oDivParentH ){ 
					$oDivT=$oDivH- $oDivParentH;
					$oDiv.css("top",-$oDivT+'px')
				}
				var scale=$oDivT/( $oDivH- $oDivParentH );
				$oScroll.css("top",scale*($oScrollBoxH-$oScrollH)+'px');
			}else{
				$oScroll.css("top",0);
			}
		}else{
			$oScrollBoxParent.html("");
			$oDiv.css("top",0);
		}
	}
	
	scroll("Y",".page_left_scroll_sub_item",".page_left_sub",".page_left");	
	scroll("Y",".page_content_scroll_sub_item",".page_content_sub",".page_content_sub_parent");		
	scroll("Y",".lx_name_scroll_sub_item",".ls_name_box",".ls_name_box_item");
	scroll("Y",".more_play_scroll_sub_item",".more_play_sub_item",".more_play_content_sub");	
	
		
	function scroll(direction,scrollClassName,oDivClassName,oDivParentClassName){	
		$(document).on("mousedown",scrollClassName,function(e){
			var $_this=$(this);
			
			var disX=e.clientX-$(this).position().left;
			
			var disY=e.clientY-$(this).position().top;
			if(e.preventDefault){
				e.preventDefault();
			}else{
				e.returnValue=false;
			}
			if(  $_this.get(0).setCapture ){
				$_this.get(0).setCapture();
			}
			
			$(document).on("mousemove",function(e){
				var maxH=$_this.parent().height()-$_this.height();
				var maxW=$_this.parent().width()-$_this.width();
				var l=e.clientX-disX;
				var t=e.clientY-disY;

				var maxX,maxY,minX,minY;			
				
				if(direction=="x" || direction=="X" ){//横向移动
					minX=minY=maxY=0;				
					maxX=maxW;
				}else if( direction=="y" || direction=="Y" ){ //纵向移动
					minY=minX=maxX=0;					
					maxY=maxH;
				}
				
				if(l>maxX){
					l=maxX;
				}else if(l<minX){
					l=minX;
				}

				if(t>maxY){
					t=maxY;
				}else if(t<minY){
					t=minY;
				}
				
				$_this.css({"top":t+'px',"left":l+"px"});
				
				if( direction=="x" || direction=="X" ){ //横向滚动
					var $oDivW=$(oDivClassName).width();
					var $oDivParentW=$(oDivParentClassName).width();
					var left=l/maxX*($oDivW-$oDivParentW);
					$(oDivClassName).css("left",-left+'px');
				}else{
					var $oDivH=$(oDivClassName).height();
					var $oDivParentH=$(oDivParentClassName).height();
					var top=t/maxY*($oDivH-$oDivParentH);
					$(oDivClassName).css("top",-top+'px');
				}
				
				//scrollCall($(".content"),$(".contentBox"),$(".scroll"),$(".scroll_box"),maxH);
			})
			$(document).on("mouseup",function(){
				$(document).off("mousemove");
				$(document).off("mouseup");
				if( $_this.get(0).releaseCapture ){
					$_this.get(0).releaseCapture();
				}
			})
		})
	}	
	


	function scrollCall($oDiv,$oDivParent,$oScroll,$oScrollParent,maxH){
		var scale=$oScroll.position().top/maxH;
		console.log(scale);
		var $oContentSc=$oDiv.height()-$oDivParent.height();
		$oDiv.css("top",-scale*$oContentSc+'px');
	}
	























	/*
	//判断是否需要滚动条
	function isScroll(oDivParent,oDiv,oScrollParentBox,oScrollParentClassName,oScrollClassName,str,fn){
		// oDivParent             需要滚动的父元素 relative
		// oDiv                   需要滚动的元素   absolute
		// oScrolParentBox        需要添加滚动组合的容器
		// oScrollParentClassName 滚动条的父元素的class或id  relative
		// oScrollClassName       滚动条的class或id          absolute     
		// str                    需要动态添加的 滚动条元素  **这里是通过jquery添加的**
		// fn                     最后的回调函数   拖拽的函数
		
		var oDivParentH=oDivParent.offsetHeight;
		var oDivH      =oDiv.offsetHeight;
		
		$(oScrollParentClassName).remove();
		console.log( oDivParentH  );
		console.log( oDivH );
		if( oDivH>oDivParentH ){
			
			$(oScrollParentBox).html(str);
			
			oScrollParent=$(oScrollParentClassName)[0];
			oScroll      =$(oScrollClassName)[0];

			//设置滚动条的高度
			var H=Math.ceil( Math.pow(oDivParentH,2)/oDivH );
			oScroll.style.height=H+'px';
			
			// 计算滚动条应该滚动的高度
			var oScrollH=oScrollParent.offsetHeight-H;
			//得到内容区域应该滚动的高度
			var oContentScrollH=oDivH-oDivParentH;

			// 得到oDiv的top值
			var oDivT=Math.abs( oDiv.offsetTop );

			

			if( oDivT!=0 ){ //div的top值不为0 时
				
				//top值 大于应该滚动的高度时
				if( oDivT>oContentScrollH ){ 
					oDivT=oContentScrollH;
					oDiv.style.top=-oDivT+'px';
					
				}
				// 得到 div的top值与内容区域应该滚动的高度 比值
				var scale=oDivT/oContentScrollH ;
				oScroll.style.top=scale*oScrollH+'px';				
			}
			
			drags(0,0,0,oScrollH,oScroll,oScroll,function(){
				fn && fn();
				
			});

		}else{
			
			oDiv.style.top=0;
		}
	}
	*/
	//左侧鼠标滚轮 滚动事件
	top["myAddEvent"]( $(".page_left")[0], "mousewheel",function(e){
		fn1(e,$(".page_left_scroll_sub_item")[0], $(".page_left_scroll_sub")[0],function(dom2){
			mousewheelCallback();
		});
	});
	top["myAddEvent"]( $(".page_left")[0], "DOMMouseScroll",function(e){
		fn1(e,$(".page_left_scroll_sub_item")[0], $(".page_left_scroll_sub")[0],function(dom2){
			mousewheelCallback();
		});
	});
	top["myAddEvent"]( $(".page_left_scroll_box")[0], "mousewheel",function(e){
		fn1(e,$(".page_left_scroll_sub_item")[0], $(".page_left_scroll_sub")[0],function(dom2){
			mousewheelCallback();
		});
	});
	top["myAddEvent"]( $(".page_left_scroll_box ")[0], "DOMMouseScroll",function(e){
		fn1(e,$(".page_left_scroll_sub_item")[0], $(".page_left_scroll_sub")[0],function(dom2){
			mousewheelCallback();
		});
	});
	function mousewheelCallback(){
		var dom2=$(".page_left_scroll_sub_item")[0]; //滚动条
		var oScrollParent=$(".page_left_scroll_sub")[0]; //滚动条父元素
		var oDiv=$(".page_left_sub")[0];
		var oDivParent=$(".page_left")[0];
		var oScrollH=oScrollParent.offsetHeight-dom2.offsetHeight;
		var oContentScrollH=oDiv.offsetHeight-oDivParent.offsetHeight;
		var scale=dom2.offsetTop/oScrollH;
		oDiv.style.top=-scale*oContentScrollH+'px';
	}
	
	//中间内容滚动条部分 鼠标滚轮事件
	top["myAddEvent"]( $(".page_content_sub_parent")[0], "mousewheel",function(e){
		fn1(e,$(".page_content_scroll_sub_item")[0], $(".page_content_scroll_sub")[0],function(dom2){
			var dom2=$(".page_content_scroll_sub_item")[0];
			var oScrollParent=$(".page_content_scroll_sub")[0];
			var oDiv=$(".page_content_sub")[0];
			var oDivParent=$(".page_content_sub_parent")[0];
			var oScrollH=oScrollParent.offsetHeight-dom2.offsetHeight;
			var oContentScrollH=oDiv.offsetHeight-oDivParent.offsetHeight;
			var scale=dom2.offsetTop/oScrollH;
			oDiv.style.top=-scale*oContentScrollH+'px';
		});
	});
	top["myAddEvent"]( $(".page_content_scroll_box")[0], "mousewheel",function(e){
		fn1(e,$(".page_content_scroll_sub_item")[0], $(".page_content_scroll_sub")[0],function(dom2){
			var dom2=$(".page_content_scroll_sub_item")[0];
			var oScrollParent=$(".page_content_scroll_sub")[0];
			var oDiv=$(".page_content_sub")[0];
			var oDivParent=$(".page_content_sub_parent")[0];
			var oScrollH=oScrollParent.offsetHeight-dom2.offsetHeight;
			var oContentScrollH=oDiv.offsetHeight-oDivParent.offsetHeight;
			var scale=dom2.offsetTop/oScrollH;
			oDiv.style.top=-scale*oContentScrollH+'px';
		});
	});
	
	top["myAddEvent"]( $(".page_content_sub_parent")[0], "DOMMouseScroll",function(e){
		fn1(e,$(".page_content_scroll_sub_item")[0], $(".page_content_scroll_sub")[0],function(dom2){
			var dom2=$(".page_content_scroll_sub_item")[0];
			var oScrollParent=$(".page_content_scroll_sub")[0];
			var oDiv=$(".page_content_sub")[0];
			var oDivParent=$(".page_content_sub_parent")[0];
			var oScrollH=oScrollParent.offsetHeight-dom2.offsetHeight;
			var oContentScrollH=oDiv.offsetHeight-oDivParent.offsetHeight;
			var scale=dom2.offsetTop/oScrollH;
			oDiv.style.top=-scale*oContentScrollH+'px';
		});
	});
	top["myAddEvent"]( $(".page_content_scroll_box")[0], "DOMMouseScroll",function(e){
		fn1(e,$(".page_content_scroll_sub_item")[0], $(".page_content_scroll_sub")[0],function(dom2){
			var dom2=$(".page_content_scroll_sub_item")[0];
			var oScrollParent=$(".page_content_scroll_sub")[0];
			var oDiv=$(".page_content_sub")[0];
			var oDivParent=$(".page_content_sub_parent")[0];
			var oScrollH=oScrollParent.offsetHeight-dom2.offsetHeight;
			var oContentScrollH=oDiv.offsetHeight-oDivParent.offsetHeight;
			var scale=dom2.offsetTop/oScrollH;
			oDiv.style.top=-scale*oContentScrollH+'px';
		});
	});
	//以下  完全是写的拖住滚动这一部分.没有相关数据操作的
	function scrollObjFn(){
		var scrollObj={
			oScroll:null,
			oScrollParent:null,
			oDiv:null,
			oDivParent:null,
			oBox:null,
			maxX:null,
			maxY:null,
			minX:null,
			minY:null,
			clientX:window.innerWidth||document.documentElement.clientWidth,
			clientY:window.innerHeight||document.documentElement.clientHeight,
			init:function(oScroll,oScrollParent,oDiv,oDivParent,oBox){
					this.oScroll=oScroll;
					this.oScrollParent=oScrollParent;
					this.oDiv=oDiv;	
					this.oDivParent=oDivParent;
					this.oBox=oBox;
				},
			drag:function(){
					this.oScroll.onmousedown=function(){
						var e=window.event||arguments[0];
						var oScrollX=e.clientX-this.offsetLeft;
						var oScrollY=e.clientY-this.offsetTop;
						if(this.setCapture){
							this.setCapture();
						}
						
						document.onmousemove=function(){
							var e=window.event||arguments[0];
							var x=e.clientX-oScrollX;
							var y=e.clientY-oScrollY;
							scrollObj.setValue(x,y);
						}
						document.onmouseup=function(){
							this.onmousemove=this.onmouseup=null;
							if(scrollObj.oScroll.releaseCapture){
								scrollObj.oScroll.releaseCapture();
							}
						}
						return false;
					}
				},
			mousewheel:function(sEvent){
					
					if(this.oBox.addEventListener){
						this.oBox.addEventListener(sEvent,this.mousewheelFn,false);
					}else if(this.oBox.attachEvent){
						this.oBox.attachEvent('on'+sEvent,this.mousewheelFn);
					}
				},
			setValue:function(x,y){
					//if( !this.oScrollParent ){
						this.range(0,0,0,this.oScrollParent.offsetHeight-this.oScroll.offsetHeight );
					//}
				
					if(x<this.minX){
						x=this.minX;
					}
					
					if(y<this.minY){
						y=this.minY;
					}
					
				
					if(y>this.maxY){
						
						y=this.maxY;
					}
					if(x>this.maxX){
						
						x=this.maxX;
					}
					this.oScroll.style.left=x+'px';
					this.oScroll.style.top=y+'px';
				
					this.fn(y);
				}, 
			range:function(minX,minY,maxX,maxY){
					this.minX=minX;
					this.minY=minY;
					this.maxX=maxX;
					this.maxY=maxY;
				},
			fn:function(y){
					
				
	
					var scale=parseFloat( y/(this.oScrollParent.offsetHeight-this.oScroll.offsetHeight) );
					
					var height=parseFloat(this.oDiv.offsetHeight-this.oDivParent.offsetHeight);
					var oDivTop=parseFloat(getStyle(this.oDiv,"top"));
					var t=-scale*height;
				
					//console.log( this.oScrollParent.offsetHeight-this.oScroll.offsetHeight  );
					console.log("scale:"+scale);
					
					if( oDivTop!=t ){
						this.oDiv.style["top"]=t+'px';	
					}
				},
			mousewheelFn:function(oScroll,oScrollParent,oDiv,oDivParent,oBox){
	
					var e=window.event||arguments[0];
					/*
					var bDown=true;//向下
					if(e.detail){
						
						console.log(e.detail);
						
						if(e.detail>0){
							bDown=true;
						}else{
							bDown=false;
						}
						
						//bDown=e.detail>0?true:false;
					}else if(e.wheelDelta){
						
						console.log(e.wheelDelta);
						if(e.wheelDelta>0){
							bDown=false;
						}else{
							bDown=true;
						}
						
						//bDown=e.wheelDelta>0?false:true;
					}*/
					bDown=e.wheelDelta?(e.wheelDelta<0):e.detail>0;
					if(bDown){//向下
						y=scrollObj.oScroll.offsetTop+10;
					}else{
						
						y=scrollObj.oScroll.offsetTop-10;
					}
					if(e.preventDefault){
						e.preventDefault(); //阻止默认事件
					}
	
					if(e.stopPropagation){
						e.stopPropagation(); //阻止事件冒泡
					}else{
						e.cancelBubble=true; // ie 阻止事件冒泡
					}
					
					scrollObj.setValue(0,y);
				}
		}
		return scrollObj;
	}
	
	function tuoMove(){//拖拽
		var drg={
			oDiv:null,
			oDivMove:null,
			minTop:null,
			minLeft:null,
			maxTop:null,
			maxLeft:null,
			init:function(oDiv,oDivMove,minTop,minLeft,maxTop,maxLeft){
			
				this.minTop=minTop;
				this.minLeft=minLeft;
				this.maxTop=maxTop;
				this.maxLeft=maxLeft;
	
				this.oDiv=oDiv;
				this.oDivMove=oDivMove;
				
			},
			move:function(){
				this.oDiv.onmousedown=function(){
					
					var e=window.event||arguments[0];
					var disX=e.clientX-drg.oDivMove.offsetLeft;
					var disY=e.clientY-drg.oDivMove.offsetTop;
					if(this.setCapture){
						this.setCapture();
					}
					document.onmousemove=function(){
					
						var e=window.event||arguments[0];
						var x=e.clientX-disX;
						var y=e.clientY-disY;
						drg.range(x,y);
						
						
					}
					document.onmouseup=function(){
						this.onmousemove=this.onmouseup=null;
						if(drg.oDiv.releaseCapture){
							drg.oDiv.releaseCapture();
						}
					}
					return false;
				}
			},
			range:function(x,y){
				if( arguments.length==2 ){}
				if(x<this.minLeft){
					x=this.minLeft
				}else if(x>this.maxLeft){
					x=this.maxLeft;	
				}
				if(y<this.minTop){
					y=this.minTop;
				}else if(y>this.maxTop){
					y=this.maxTop;
				}
				this.fn(x,y);
			},
			fn:function(x,y){
			
				this.oDivMove.style.left=x+'px';
				this.oDivMove.style.top=y+'px';
				
			}
		}
		return drg;
	}
	
	function getStyle(dom,attr){
		if( window.getComputedStyle ){
			return window.getComputedStyle(dom,false)[attr];
		}else{
			return dom.currentStyle[attr];
		}
	}
	
	
	function drags(minX,minY,maxX,maxY,dom,dom2,fn){ //拖拽
				// minX:最小left值
				// minY:     top
				// maxX:   大 left
				// maxY:   大 top
				// dom :   被拖拽的元素
				// dom2:   需要移动的元素
				// fn  :   元素被拖拽到达指定位置以后的回调函数
		dom.onmousedown=function(){
			var e=window.event||arguments[0];
			var disX=e.clientX-dom2.offsetLeft;
			var disY=e.clientY-dom2.offsetTop;
			if( e.preventDefault ){
				e.preventDefault();
			}else{
				e.returnValue=false;
			}
			if( dom.setCapture ){
				dom.setCapture();
			}
			document.onmousemove=function(){
				
				var e=window.event||arguments[0];
				var l=e.clientX-disX;
				var t=e.clientY-disY;
				
				range(l,t,minX,minY,maxX,maxY,dom2,fn );						
			}
			document.onmouseup=function(){
				this.onmousemove=this.onmouseup=null;
				if( dom.releaseCapture ){
					dom.releaseCapture();
				}
			}
		}
		
	}
				
	//限制滚动条的滚动范围 并执行回调函数
	function range(x,y,minX,minY,maxX,maxY,dom2,fn){
		// x：当前被拖拽到达位置   left
		// y：当前被拖拽到达的位置 top
		if(x<minX){
			x=minX;
		}else if(x>maxX){
			x=maxX;
		}
		if( y<minY ){
			y=minY;
		}else if( y>maxY ){
			y=maxY;
		}
		
		dom2.style["left"]=x+'px';
		dom2.style["top"]=y+'px';
		
		fn && fn();
		
	}
	
				
	function fn1(e,dom2,oScrollParent,fn){
		//e        事件对象
		//dom2     需要运动的元素(滚动条)
		//oScrollParent  滚动条父元素
		//fn             最后执行的回调函数
		
		if( !dom2 ){
			return false;
		}
		
		//var e=window.event||arguments[0];
		var bDown=e.wheelDelta?(e.wheelDelta<0):(e.detail>0);
	
		if( bDown ){//向下滚动
			var y=dom2.offsetTop+6;
		}else{
			var y=dom2.offsetTop-6;
		}
		var x=0;
		var minX=0;
		var minY=0;
		var maxX=0;
		var maxY=oScrollParent.offsetHeight-dom2.offsetHeight;
		
		range( dom2.offsetLeft,y,minX,minY,maxX,maxY,dom2,fn );
	
		if(e.preventDefault){
			e.preventDefault();
		}else{
			e.returnValue=false;
		}
	
		if(e.stopPropagation){
			e.stopPropagation();
		}else{
			e.cancelBubble=true;
		}
		
	}
	
	
	
	function callbackFn(){
		var oScrollH=200-20;
		var scale=oScroll.offsetTop/oScrollH;
		var oH=oContent.offsetHeight-oContentBox.offsetHeight;
		oContent.style["top"]=-scale*oH+'px';
	}
	
})