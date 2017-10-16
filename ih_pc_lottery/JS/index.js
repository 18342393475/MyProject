define(function (require,exports,module){
	
		
	var i=0;
	var len=$(".banner_box_sub div").length;
	
	function auto(){
		timer=setInterval(function(){
			
			$(".banner_box_sub div").eq(i).stop(true,false).fadeOut(200,function(){
				$(this).removeClass("active");
			});
			++i>len-1?i=0:'';
			$(".banner_box_sub div").eq(i).stop(true,false).fadeIn(200,function(){
				$(this).addClass("active");
			});
			
			$(".banner_bottom li").eq(i).addClass("cur").siblings().removeClass("cur");

		},6000)
		
	}

	$(".banner_bottom li span").click(function(){
		clearInterval(timer);
		var $li=$(this).closest("li");

		i=$li.index();
		$(".banner_box_sub div").eq(i).stop(true,false).fadeIn(200,function(){
			$(this).addClass("active").siblings().removeClass("active");
		}).siblings().stop(true,false).fadeOut(200);
		
		$(".banner_bottom li").eq(i).addClass("cur").siblings().removeClass("cur");

		auto();
	});
	
	$(".banner_box").mouseover(function(){
			
		clearInterval(timer);

	}).mouseout(function(){
	
		auto();

	});
	
	exports.auto=auto;
})
