<?php	
	error_reporting(0);
	//环境变量
	setcookie( 'loginHost', $_SERVER['SERVER_NAME'] );
	preg_match( '|\.(.*)|is', $_SERVER['SERVER_NAME'], $hostArr );
	$serverName = explode('.', $_SERVER['SERVER_NAME'] );
	$mainHost = $serverName[count($serverName)-2] .'.'. $serverName[count($serverName)-1];
	setcookie( 'mainHost', $mainHost );
	
	//推广者
	if( $_REQUEST['ac'] ) setcookie( 'ac', $_REQUEST['ac'] );
	if( $_REQUEST['activateCode'] ) setcookie( 'activateCode', $_REQUEST['activateCode'] );
	
	$filename = end(explode('/', $_SERVER['PHP_SELF']));
	$currActiv = array( $filename=>'class="activ"' );
	
	setcookie( 'lang', 'zh-cn' );
	setcookie( 'account_type', 'cp');	
?>
<!DOCTYPE HTML>
<html>
	<head>
	    <meta charset="UTF-8">
	    <title>彩票</title>
	    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta name="renderer" content="webkit"/>
	    <link href="css/top188.css"  rel="stylesheet" />
		<link href="css/sportsColorGreen.css"  rel="stylesheet" />
		<link href="css/jquery.custom-scrollbar.css" rel="stylesheet">

	    <link href="css/lotteryss01.css" type="text/css" rel="stylesheet" />
		<script src="JS/template.js"></script>
		<script src="JS/jquery-1.8.3.min.js"></script>
		<script src="JS/jquery.custom-scrollbar.js"></script>
		<script src="JS/phprpc_client.js"></script>

		<script src="JS/lotteryssOddsOBJ.js"></script>
		
		<script src="JS/sea.js" id="seajsnode" type="text/javascript" charset="utf-8"></script>
	</head>
	<body>
		<?php include './top188.php';?>
			
		<div id="content" class="clearfix">
			<div class="article left">
				<div class="article_top"></div>
				<div class="article_middle clearfix"></div>		
				
			</div>
			<div class="mid_nav left">
				<div class="mid-top clearfix">
				
				</div>
				<div class="mid-Tab">
					
				</div>
					
				<div class="mid-Tag">
					
				</div>
			</div>
	
			<div id="mid" class="mid left clearfix">
							
					<div id="mid_center_box" class="default-skin mid_center_box left">
						<div class="mid_center left">
							<div class="mid-Content"></div>
							<div class="mid-Result"></div>
						</div>
					</div>
					
					<div id="content_right" class="content_right default-skin  left">
						<div class="quick_bet"> </div>
						
						<div class="long_queue"> </div>
						
					</div>
				
			</div>
			
			
			<!--更多 长龙 弹出框 start-->
			<div class="allChangLong"></div>
			<!--更多 长龙 弹出框 end-->
		</div>
		
		<div class="load_box"></div>	
			
		<script type="text/javascript">
			seajs.use(["lottery/lottery"])
		</script>
			
	</body>
</html>
