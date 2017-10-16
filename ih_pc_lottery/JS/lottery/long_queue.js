define(function(require,exports,module){
	
	//彩票长龙
	
	var lottery=require('./lottery');
	var lotterys188=require("./lotterys188Template");//dom结构
	var top=require("../top.js");
	var isConsole=lottery["isConsole"];
	var current=lottery["current"];
	var getServerData=lottery["getServerData"];
	if(!window.console){window.console={log:function(){}}}
	
	var lawData={dataStorage: {}, DEThis: 'continueCL', DYThis: 'ShuangMian', DYTitle:{ShuangMian: '双面长龙', QuangBu: '全部长龙'}, DETitle:{continueCL: '连续开奖', notOpenCL: '连续未开'}, DECLTitle:{winCL: '连续开奖', notWinCL: '连续未开'}, TBTitle:{moreCL: '更多长龙'}};
		
	//长龙数据交互
	function getLawData(number,functionName){
		var post = { 'actID':601, 'game_lx': current['game_lx'], 'long': number };
		isConsole()?console.log(post):'';
		getServerData( post, function(result){
			isConsole()?console.log(result):'';
			functionName && functionName(result);
		});
	}
	
	
	function longQueue(){
		var gamelx=current["game_lx"];
		var number=gamelx==41?2:6;
		getLawData(number,function(result){
			
			//开奖规律第一标题
			if (gamelx == 41){ lawData['DYThis'] = "QuangBu"; };
			(gamelx == 41) ? lawData['DYTitle'] = {QuangBu: '全部长龙'} : lawData['DYTitle'] = {ShuangMian: '双面长龙', QuangBu: '全部长龙'};
	  
			var data={
				DYTitle:lawData['DYTitle'],
				DETitle:lawData['DETitle'],
				result:result
			}
			var render=template.compile(lotterys188["long_queue"]);
			var html=render(data);
			$(".long_queue").html(html);
			$("#HeadTitle span").eq(0).addClass("active");
			$("#titleContent span").eq(0).addClass("active");
			$(".content_right").customScrollbar('resize',true);
		
		});
		
	}
	
	exports.longQueue=longQueue;
	
	/*********右侧 长龙 事件 start************/
		$(document).on("click","#HeadTitle span",function(){ //点击开奖规律中的第一标题
			$(this).addClass("active").siblings().removeClass("active");
			var noObj = {ShuangMian: 6, QuangBu: 2, LuZi: 9};
	        lawData['DYThis'] = $(this).attr('id');
			
			getLawData(noObj[$(this).attr('id')], function (result){
				var data={
					DETitle:lawData['DETitle'],
					result:result
				}
				var render=template.compile(lotterys188["lotteryContent"]);
				var html=render(data);
				$("#lotteryContent").html(html);
				$("#titleContent span").eq(0).addClass("active");
	
			});
		})
		$(document).on("click","#titleContent>span",function(){//右侧第二标题
			
			$(this).addClass('active').siblings().removeClass("active");
			
			var noObj = {
				'ShuangMian': { 'continueCL': 6, 'notOpenCL': 8 },
				'QuangBu': { 'continueCL': 2, 'notOpenCL': 4 }
			}
			getLawData(noObj[lawData['DYThis']][$(this).attr('id')], function (result){
				var data={
					//DETitle:lawData['DETitle'],
					result:result
				}
				var render=template.compile(lotterys188["lawContent"]);
				var html=render(data);
				$(".lawContent").html(html);
			});
		})
	
		$(document).on("click","#titleContent a",function(){//右侧第二标题中的 a更多成龙
			var titleName = "", titleNameObj = {ShuangMian: '双面长龙', QuangBu: '全部长龙'};
			
	
			//得到容器的头
			titleName = titleNameObj[lawData['DYThis']];
			if (current['game_lx'] == 41){ titleName = "全部长龙"; };
			
			var data={
				titleName:titleName,
				titleCL:lawData['DECLTitle'],
				active:"winCL"
			};
			var render=template.compile(lotterys188["allChangLong"]);
			var html=render(data);
			$(".allChangLong").html(html).show();
			$(".alertOverlay").show();
			//加载容器内容
			var noObj = {
				'ShuangMian': { 'winCL': 5, 'notWinCL': 7 },
				'QuangBu': { 'winCL': 1, 'notWinCL': 3 }
			}
			
			getLawData(noObj[lawData['DYThis']]['winCL'], function (result){
				var data={
					result:result
					
				};
				//console.log(result);
				var render=template.compile(lotterys188["lawContent"]);
				var html=render(data);
				$(".contentLawCL").html(html);
			})
		})
	
		$(".allChangLong").on("click",".titleCL div",function(){ //更多长龙弹出框中点击小标题
			 var noObj = {
				'ShuangMian': { 'winCL': 5, 'notWinCL': 7 },
				'QuangBu': { 'winCL': 1, 'notWinCL': 3 }
			};
			
			$(".titleCL div").removeClass("active");
			var clas=$(this).attr("data-i");
			$(this).addClass('active').siblings().removeClass("active");
			$(".contentLawCL").html('<img src="images2/loading.gif" style="margin:auto;display:block;width:50px;max-width:100%;">');
			getLawData(noObj[lawData['DYThis']][clas], function (result){
				var data={
					result:result			
				};
				//console.log(result);
				var render=template.compile( lotterys188["lawContent"] );
				var html=render(data);
				$(".contentLawCL").html(html);
			});
		})
		//更多长龙 中的 关闭按钮
		$(".allChangLong").on("click",".closeContentCL",function(){
			$(".allChangLong").html("").hide();
			$(".alertOverlay").hide();
		})
		// 点击 长龙 中的 a 标签
		$(document).on("click",".lawContent_sub a",function(){
	
			$(".allChangLong,.alertOverlay").hide().html("");
	
			var name=$(this).attr("name");
			var len=$(".midTag_child[pan_type="+name+"]").length;
			if( !len ){
				return false;
			}
			$(".midTag_child[pan_type="+name+"]").addClass("active").siblings().removeClass("active");
			
			current["panType"]=name;
			getOdds();
		})
		/**********右侧 长龙 事件 end*************/
	
	
	
})
