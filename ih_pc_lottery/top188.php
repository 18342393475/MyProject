<?php
	 preg_match('/.*?(index|sports188|lotteryss|resort188|mobile188|about)\.php$/is',$_SERVER['SCRIPT_NAME'],$active);
    $active = strtolower($active[1]);
?>
<div class="top_box top_box_border_bottom_color">
	<div class="top">
		<div class="top_sub_left left">
			<div class="logo">
				<img src="images2/cunti_05.png">
			</div>
		</div>
		<div class="top_sub_content left">
			<ul class="clearfix">
				<li class="left <?php echo $active == 'index'?'active':''; ?>">
					<a href="index.php">首页</a>
				</li>
				<li class="left <?php echo $active == 'sports188'?'active':''; ?>">
					<a href="sports188.php">体育</a>
				</li>
				<li class="left <?php echo $active == 'lotteryss'?'active':''; ?>">
					<a href="lotteryss.php">彩票</a>
				</li>
				<li class="left <?php echo $active == 'resort188'?'active':''; ?>">
					<a href="resort188.php">娱乐场</a>
				</li>
				<li class="left <?php echo $active == 'mobile188'?'active':''; ?>">
					<a href="mobile188.php">手机投注</a>
				</li>
				<li class="left <?php echo $active == 'about'?'active':''; ?>">
					<a href="about.php?tab=3">优惠活动</a>
				</li>
				<li class="left">					
					<a href="http://ag.ih.87dy.net.cn" target="_blank">合作伙伴</a>
				</li>
				<li class="left">
					<a href="Consulting/chatForm.php">在线客服</a>
				</li>
				
			</ul>
		</div>
		<div class="top_sub_right right">
			<div class="lang_color_box clearfix ">
				<div class="right">
				<div class="sportsColor_choose left clearfix" <?php echo $active == 'sports188'?' style="display:block;" ':' style="display:none;" '; ?> >
				    <div class="left color_box">
						<span data-color="QianBlue" class="qianblue"></span>
					</div>					
					<div class="left color_box active">
						<span data-color="Green" class="green current"></span>
					</div>
					<div class="left color_box">
						<span data-color="MoGreen" class="mogreen"></span>
					</div>
					<div class="left color_box">
						<span data-color="Blue" class="blue"></span>
					</div>
					
				</div>

				<div class="lang_choose left">
					<div class="current_lang">
						<span class="current_lang_text">中文</span>
						<span class="current_lang_pink china"></span>
						<span class="lang_choose_jtdown"></span>
					</div>
					<ul class="lang_choose_sub">
						
					</ul>
				</div>
				</div>
			</div>
			<div class="login_box">
				
			</div>
		</div>
	</div>
</div>
<div class="alertOverlay"></div>
<!--注册-->
<div class="windowBox" id="joinWindow"></div>
<div class="alert_box"></div>