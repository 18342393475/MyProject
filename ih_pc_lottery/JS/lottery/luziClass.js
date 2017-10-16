define(function(require,exports,module){
	var lottery=require('./lottery');
	var lotterys188=require("./lotterys188Template");//dom结构
	var top=require("../top.js");
	var isConsole=lottery["isConsole"];
	var current=lottery["current"];
	if(!window.console){window.console={log:function(){}}}
	
	function getMidResult(){			
		var cp_type=current["cp_type"];
		var gamelx=current["game_lx"];							
		var panType=current["panType"];

		var post = {
			'fn':"getLuzi",
			'game_lx':gamelx, 
			'accountType':'cp',
			'cp_type':cp_type=="k3"?'ks':cp_type,
			'panType':cp_type=="k3"?"zsp":panType,
			'msTime': top["getCookie"]( 'msTime' )
		};	
		if(cp_type=="bjkl8" && panType=="zsp"){
			post["panType"]="qt";
		}
		
		reloadMidPanData(post,function(result){
			
			var render=template.compile(lotterys188["midResult"]);
			var html=render(result);

			$(".mid-Result").html(html);
			
			$(".mid_center_box").customScrollbar("resize", true);
			
			clickMidResultTabLeftChild(result["luzi"]["luType"],result);

		});		
	}
	//生成  luzi 路子
    function reloadMidPanData(post,funName){

		var luzi = new PHPRPC_Client( 'http://118.184.23.233/memberRPC/phprpcClass/PCluzi.class.php', ['get_luzi_interface']);
        isConsole()?console.log(post):'';
		luzi.get_luzi_interface(post,function(result,output){
			
			result=jQuery.parseJSON(result);
			isConsole()?console.log(result):'';
			
			if (output){ console.log(output); 
			}
			if(!result){return false}
			
			
			funName && funName(result);
		},true);
    };
		
	
	
	exports.getMidResult=getMidResult;
	
	
	
	
	
	
	/*********下方路子的点击事件***********/
		//日期下拉框
		$(document).on("change",".midResult_tab_rightSelect",function(){
			var lutype=$(".midResult_tab_left .active").attr("lutype");
			var showRows=$("#showRows").val();
	
			var cp_type=current["cp_type"];
			var gamelx=current["game_lx"];							
			var panType=current["panType"];
		
			var post = {
					'fn':lutype!=5?"getLuzi":'getLeiXing',
					'game_lx':gamelx, 
					'accountType':'cp',
					'cp_type':cp_type=="k3"?'ks':cp_type,
					'panType':cp_type=="k3"?"zsp":panType,
					'msTime': top["getCookie"]( 'msTime' ),
					'X':$(".midResult_tag").find(".active").attr("value"),
					luType:lutype,
					luziName:$(".midResult_content_left .midResult_content_leftChildAct").attr("y"),
					periods:$(".midResult_tab_rightSelect").val(),
					showRows:showRows
			};	
			if(cp_type=="bjkl8" && panType=="zsp"){
				post["panType"]="qt";
			}
			if(lutype==3){
				var luziName=new Array();
				$(".midResult_tag .midResult_tag_child_lutype3 input[type=checkbox]").each(function(){
					if($(this).attr("checked")){
						luziName.push( $(this).closest(".midResult_tag_child_lutype3").attr("value") );
					}
				});
				luziName.length==0?luziName.push( "WDW" ):'';
	
				post["luziName"]=luziName;
			}			
			reloadMidPanData(post,function(result){
				
				if(lutype==1 || lutype==2){
					var render=template.compile(lotterys188["midResult_content_right_sub_luType_1"]);
					var html=render(result);
					
					$(".midResult_content_right_sub").html(html);
					$(".midResult_content_right_sub").css("width",30*$(".lz_line_box").length+'px');
					$(".midResult_content_sub").customScrollbar('resize',true);
					
				}else if(lutype==4){
	
					var render=template.compile(lotterys188["midResult_content_right_sub_luType_4"]);
					var html=render(result);
					$(".midResult_content_right_sub").html(html);
					$(".midResult_content_sub").customScrollbar('resize',true);
				}else if(lutype==3){
	
					var render=template.compile(lotterys188["midResult_content_luType_3"]);
					var html=render(result);
					$(".midResult_content").html(html);
					
					$(".midResult_content_right_sub").css("width",30*$(".lz_line_box").length+'px');
					var len=result["luzi"]["XYobj"]["Y"].length;
					if( len>10 ){
						$(".midResult_content_sub,.midResult_content_right_sub").height(len*30);
						
					}
					$(".midResult_content_sub").addClass("midResult_content_right_lutype3").customScrollbar();
					
				}else if(lutype==5){
					$(".midResult_tag").html("");
					result.gameLx=gamelx;
					var render=template.compile(lotterys188["midResult_content_luType_5"]);
					var html=render(result);
					$(".midResult_content").html(html);
					$(".midResult_content_right_sub").css("backgroundImage",'none');
					$(".midResult_content_sub").addClass('midResult_content_scrollX_box_sub_lutype5').customScrollbar();
						
				}
				if(lutype==4 || lutype==5 ){
					$(".midResult_content_right_sub").css("background-image","none");
					
				}else{
					$(".midResult_content_right_sub").css("background-image",'url(images2/lz_bj.png)');
				}
				
			});		
			
		})
		//路珠下拉框
		$(document).on("change","#showRows",function(){
			var showRows=$(this).val();
	
			var cp_type=current["cp_type"];
			var gamelx=current["game_lx"];							
			var panType=current["panType"];
			
			var luziName=$(".midResult_content_leftChildAct").attr("y");
			var luType=$(".midResult_tab_left .active").attr("lutype");
			var X=$(".midResult_tag .active").attr("value");
			var showRows=$("#showRows").val();
	
			var post = {
				'fn':"getLuzi",
				'game_lx':gamelx, 
				'accountType':'cp',
				'cp_type':cp_type=="k3"?'ks':cp_type,
				'panType':cp_type=="k3"?"zsp":panType,
				'msTime': top["getCookie"]( 'msTime' ),
				'X':X,
				luType:luType,
				showRows:showRows,
				periods:$(".midResult_tab_rightSelect").val()
			};
			if(cp_type=="bjkl8" && panType=="zsp"){
				post["panType"]="qt";
			}
			reloadMidPanData(post,function(result){	
				var render=template.compile(lotterys188["midResult_content_right_sub_luType_1"]);
				var html=render(result);
				
				$(".midResult_content_right_sub").html(html);
				$(".midResult_content_right_sub").css("width",30*$(".lz_line_box").length+'px');
				
				$(".midResult_content_sub").customScrollbar('resize',true);
			})	
		})
		//左侧 大小 单双 质和 
		$(document).on("click",".midResult_content_left li",function(){
			
			$(this).addClass("midResult_content_leftChildAct").siblings().removeClass("midResult_content_leftChildAct");
	
			var luziName=$(this).attr("y");
			var luType=$(".midResult_tab_left .active").attr("lutype");
			var X=$(".midResult_tag .active").attr("value");
			var showRows=$("#showRows").val();
	
			var cp_type=current["cp_type"];
			var gamelx=current["game_lx"];							
			var panType=current["panType"];
	
			var post = {
				'fn':"getLuzi",
				'game_lx':gamelx, 
				'accountType':'cp',
				'cp_type':cp_type=="k3"?'ks':cp_type,
				'panType':cp_type=="k3"?"zsp":panType,
				'msTime': top["getCookie"]( 'msTime' ),
				'X':X,
				luType:luType,
				luziName:luziName,
				periods:$(".midResult_tab_rightSelect").val(),
				showRows:showRows
			};
			if(cp_type=="bjkl8" && panType=="zsp"){
				post["panType"]="qt";
			}
			reloadMidPanData(post,function(result){
				
				
				if(luType==4){
					var render=template.compile(lotterys188["midResult_content_right_sub_luType_4"]);
					var html=render(result);
					$(".midResult_content_right_sub").html(html);
	
				}else if(luType==1 || luType==2 ){
					var render=template.compile(lotterys188["midResult_content_right_sub_luType_1"]);
					var html=render(result);
				
					$(".midResult_content_right_sub").html(html);
					$(".midResult_content_right_sub").css("width",30*$(".lz_line_box").length+'px');
				
					
				}
				$(".midResult_content_sub").customScrollbar('resize',true);
			})
			
	
		})
		// 二级导航栏 五字 万 千 百 十 个
		$(document).on("click",".midResult_tag_child",function(){
	
			var luType=$(".midResult_tab_left .active").attr("lutype");
			
			if(luType==3){ //走势
				return false;
			}
	
			$(this).addClass("active").siblings().removeClass("active");
		
			
			var X=$(this).attr("value");
			var showRows=$("#showRows").val();
			
			var cp_type=current["cp_type"];
			var gamelx=current["game_lx"];							
			var panType=current["panType"];
	
			var post = {
				'fn':"getLuzi",
				'game_lx':gamelx, 
				'accountType':'cp',
				'cp_type':cp_type=="k3"?'ks':cp_type,
				'panType':cp_type=="k3"?"zsp":panType,
				'msTime': top["getCookie"]( 'msTime' ),
				'X':X,
				luType:luType,
				showRows:showRows,
				periods:$(".midResult_tab_rightSelect").val()
			};
			if(cp_type=="bjkl8" && panType=="zsp"){
				post["panType"]="qt";
			}
			reloadMidPanData(post,function(result){
				
				if(luType==1 || luType==2){ // 路珠 路子
					var render=template.compile(lotterys188["midResult_content_luType_1"]);
					var html=render(result);
					
					$(".midResult_content").html(html);
					$(".midResult_content_right_sub").css("width",30*$(".lz_line_box").length+'px');
					
				}else if(luType==4){  // 冷热/遗霜
					var render=template.compile(lotterys188["midResult_content_luType_4"]);
					var html=render(result);
					$(".midResult_content").html(html);
					
				}
	
				if(luType==4){
					$(".midResult_content_right_sub").css({"background-image":"none"});
					
				}else{
					$(".midResult_content_right_sub").css({"background-image":'url(images2/lz_bj.png)'});
				}
				$(".midResult_content_sub").customScrollbar();
			})
	
		})
		// 走势中的 二级导航栏 复选框 
		$(document).on("click",".midResult_tag_child_lutype3",function(){
			var luType=$(".midResult_tab_left .active").attr("lutype");
			var showRows=$("#showRows").val();
			
			var luziName=new Array();
			$(".midResult_tag .midResult_tag_child_lutype3 input[type=checkbox]").each(function(){
				if($(this).attr("checked")){
					luziName.push( $(this).closest(".midResult_tag_child_lutype3").attr("value") );
				}
			});
			luziName.length==0?luziName.push( "WDW" ):'';
	
			var cp_type=current["cp_type"];
			var gamelx=current["game_lx"];							
			var panType=current["panType"];
	
			var post = {
				'fn':"getLuzi",
				'game_lx':gamelx, 
				'accountType':'cp',
				'cp_type':cp_type=="k3"?'ks':cp_type,
				'panType':cp_type=="k3"?"zsp":panType,
				'msTime': top["getCookie"]( 'msTime' ),
				luziName:luziName,
				luType:luType,
				showRows:showRows,
				periods:$(".midResult_tab_rightSelect").val()
			};
			if(cp_type=="bjkl8" && panType=="zsp"){
				post["panType"]="qt";
			}
			reloadMidPanData(post,function(result){
				
				var render=template.compile(lotterys188["midResult_content_luType_3"]);
				var html=render(result);
				$(".midResult_content").html(html);
	
				$(".midResult_content_right_sub").css("width",30*$(".lz_line_box").length+'px');
				var len=result["luzi"]["XYobj"]["Y"].length;
				if( len>10 ){
					$(".midResult_content_sub,.midResult_content_right_sub").height(len*30);					
				}
				$(".midResult_content_right_sub").css({"background-image":'url(images2/lz_bj.png)'});
				
				$(".midResult_content_sub").addClass("midResult_content_right_lutype3");
				$(".midResult_content_sub").customScrollbar();
				
			})
	
		})
		//大的导航栏 路子 路珠 冷热/遗霜 
		$(document).on("click",".midResult_tab_leftChild",function(){
			$(this).addClass("active").siblings().removeClass("active");
	
			var luType=$(this).attr("lutype");
			
			var cp_type=current["cp_type"];
			var gamelx=current["game_lx"];							
			var panType=current["panType"];
	
			var post = {
				'fn': luType!=5?"getLuzi":'getLeiXing',
				'game_lx':gamelx, 
				'accountType':'cp',
				'cp_type':cp_type=="k3"?'ks':cp_type,
				'panType':cp_type=="k3"?"zsp":panType,
				'msTime': top["getCookie"]( 'msTime' ),
				
				luType:luType,
				
				periods:$(".midResult_tab_rightSelect").val(),
				showRows:$("#showRows").val()
			};
			if(cp_type=="bjkl8" && panType=="zsp"){
				post["panType"]="qt";
			}
			reloadMidPanData(post,function(result){
				
				clickMidResultTabLeftChild(result["luzi"]["luType"],result);
				
			})
	
	
		})
		//点击 路子 中的 刷新按钮
		$(document).on("click",".midResult_tab_rightBtn",function(){
			var luType=$(".midResult_tab_leftChild.active").attr("lutype");
			
			var cp_type=current["cp_type"];
			var gamelx=current["game_lx"];							
			var panType=current["panType"];
	
			var post = {
				'fn': luType!=5?"getLuzi":'getLeiXing',
				'game_lx':gamelx, 
				'accountType':'cp',
				'cp_type':cp_type=="k3"?'ks':cp_type,
				'panType':cp_type=="k3"?"zsp":panType,
				'msTime': top["getCookie"]( 'msTime' ),			
				luType:luType,	
				periods:$(".midResult_tab_rightSelect").val(),
				showRows:$("#showRows").val()
			};
			if(cp_type=="bjkl8" && panType=="zsp"){
				post["panType"]="qt";
			}
			reloadMidPanData(post,function(result){
				
				clickMidResultTabLeftChild(result["luzi"]["luType"],result);
				
			})
		})
		// 点击弹出详细信息
		$(document).on("click",".mid-Result .div_number",function(){
			
			var X=$(".midResult_tag .active").attr("value");
			var showRows=$("#showRows").val();
			var luType=$(".midResult_tab_left .active").attr("lutype");
	
			var cp_type=current["cp_type"];
			var gamelx=current["game_lx"];							
			var panType=current["panType"];
	
			var post = {
				'fn':"getGameResult",
				'game_lx':gamelx, 
				'accountType':'cp',
				'cp_type':cp_type=="k3"?'ks':cp_type,
				'panType':cp_type=="k3"?"zsp":panType,
				'msTime': top["getCookie"]( 'msTime' ),
				'X':X,
				luType:luType,
				showRows:showRows,
				luziName:$(".midResult_content_leftChildAct").attr("y"),
				periods:$(this).attr("title")
			};
			if(cp_type=="bjkl8" && panType=="zsp"){
				post["panType"]="qt";
			}
			
			reloadMidPanData(post,function(result){
				
				var render=template.compile(lotterys188["midResult_div_number"]);
				var html=render(result);
				$(".midResult_div_number_alertBox").remove();
				$(document).find("body").append(html);
			})
	
		})
		//详细信息关闭按钮
		$(document).on("click",".close_midResult_div_number",function(){
			$(".midResult_div_number_alertBox").remove();
		})
		// 弹出框关闭按钮
		$(document).on("click",".close_alertInfo",function(){
			$(".alertInfo").remove();
			$(".alertOverlay").hide();
		})
		function midResultScroll(str,stry){
			str?"":str="";
			stry?'':stry="";
			$(".midResult_content_scrollX_box_sub,.midResult_content_scrollY_box_sub").remove();
					
			var oDiv=$(".midResult_content_right_sub").get(0);
			var oDivParent=$(".midResult_content_right").get(0);
			
			if(oDiv.offsetWidth>oDivParent.offsetWidth){
				$(".midResult_content_scrollX_box").append('<div class="midResult_content_scrollX_box_sub '+str+'"><div class="midResult_content_scrollX"></div></div>');
				var oScroll=$(".midResult_content_scrollX").get(0);
				var oScrollParent=$(".midResult_content_scrollX_box_sub").get(0);
				var oBox=$(".midResult_content_sub").get(0);
				var scrollObj=scrollObjFn();
				//scrollObj.oBox=oBox;
				scrollObj.init(oScroll,oScrollParent,oDiv,oDivParent);
				scrollObj.drag("x","false");
			}
			if(oDiv.offsetHeight>oDivParent.offsetHeight){
				$(".midResult_content_scrollY_box").append('<div class="midResult_content_scrollY_box_sub '+stry+'" ><div class="midResult_content_scrollY"></div></div>');
				var oScroll=$(".midResult_content_scrollY").get(0);
				var oScrollParent=$(".midResult_content_scrollY_box_sub").get(0);
				var oBox=$(".midResult_content_sub").get(0);
				var scrollObj=scrollObjFn();
				scrollObj.oBox=oBox;
				scrollObj.init(oScroll,oScrollParent,oDiv,oDivParent);
				scrollObj.drag("Y");
			}
		
			
		}
		function clickMidResultTabLeftChild(luType,result){
			if(luType!=2){
				$("#showRows").hide();
			}else{
				$("#showRows").show();
			}
			
			$("#showRows").val( result["luzi"]["showRows"] );
	
			if(luType==1 || luType==2){//路子 路珠
	
				var render=template.compile(lotterys188["midResult_tag"]);
				var html=render(result);
				$(".midResult_tag").html(html);
				
				var render=template.compile(lotterys188["midResult_content_luType_1"]);
				var html=render(result);
				$(".midResult_content").html(html);
				
				$(".midResult_content_right_sub").css("width",30*$(".lz_line_box").length+'px');
				
			}else if(luType==4){//冷热/遗漏
	
				var render=template.compile(lotterys188["midResult_tag"]);
				var html=render(result);
				$(".midResult_tag").html(html);
				
				var render=template.compile(lotterys188["midResult_content_luType_4"]);
				var html=render(result);
				$(".midResult_content").html(html);
				
				
			}else if(luType==3){//走势
				
				var render=template.compile(lotterys188["midResult_tag_lutype_3"]);
				var html=render(result);
				$(".midResult_tag").html(html);
				
				var render=template.compile(lotterys188["midResult_content_luType_3"]);
				var html=render(result);
				$(".midResult_content").html(html);
	
				$(".midResult_content_right_sub").css("width",30*$(".lz_line_box").length+'px');
				var len=result["luzi"]["XYobj"]["Y"].length;
				if( len>10 ){
					$(".midResult_content_sub,.midResult_content_right_sub").height(len*30);
					
				}
				$(".midResult_content_sub").addClass("midResult_content_right_lutype3");
				
			}else if(luType==5){//结果
				$(".midResult_tag").html("");
				var gamelx=current["game_lx"];	
				result.gameLx=gamelx;
				console.log(result);
				var render=template.compile(lotterys188["midResult_content_luType_5"]);
				var html=render(result);
				$(".midResult_content").html(html);
				$(".midResult_content_sub").width("738px");
				//midResultScroll("midResult_content_scrollX_box_sub_lutype5","midResult_content_scrollY_box_sub_lutype5");
			}
	
			if(luType==4 || luType==5 ){
				$(".midResult_content_right_sub").css("background-image","none");
				
			}else{
				$(".midResult_content_right_sub").css("background-image",'url(images2/lz_bj.png)');
			}
			//midCenterScroll();
			$(".midResult_content_sub").customScrollbar();	
			$(".mid_center_box").customScrollbar("resize", true);
		}
	
		
		/*********下方路子的点击事件 end ***********/
	
	
	
	
})
