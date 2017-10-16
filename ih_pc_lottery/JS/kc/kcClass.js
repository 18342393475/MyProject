define(function(reqiure,exports,module){


    //计时器
    var timer = null;
    var deskTimer = null;
    var msgTimer = null;
    var reloadTime = 5;

    /**
     * 关闭弹窗的全局
     * @param  {[type]} ){                 } [description]
     * @return {[type]}     [description]
     */
    $('.main').off('click','.close').on('click','.close',function(){

        $('.layout').fadeOut(50,function(){
            $('.mask').fadeOut(50);
        }).remove();
        clearInterval(msgTimer);
        
    }).off('click','.layout .manage_nick,.tablet .nick').on('click','.layout .manage_nick,.tablet .nick',function(){
        var $this = $(this);
        var txt = $this.text().replace('昵称: ','');
        var nick = prompt("请输入要修改的昵称",txt);
        if(nick==null) return;

        nick = nick.replace(/^\s+|\s+$/g, "");

        if(txt==nick || nick.length==0) return;
        var post = {};
        post['u_name_nick'] = nick;
        post['isMaster'] = 1;
        post['CN'] = 'User';
        post['FN'] = 'updateUserNikeName';

            PC.serverInterface(post,function(res){
                if($this.hasClass('manage_nick')){
                    getAccount();
                }
                
                partialLoad();
            });

    });

    //$(window).off('beforeunload unload').on('beforeunload unload',function(e){
    $(window).off('unload').on('unload',function(e){
        outRoom(function(){
            clearInterval(timer);
        });
        return true;
    });



    /**
     * 初始化房间
     * @param  {[type]} id [description]
     * @return {[type]} [description]
     */
    exports.initRooms = function(id){
        loader(true);

        var post = {'CN':'BCgameData','FN':'get_room'};

        PC.serverInterface(post,function(result){

            console.log(result);

            var render = template.compile(KT['roomsBox']);

            var html = render(result);

            $('.main').html(html);

            var curr = $('.rooms-item .rooms li.active'),
                max = curr.attr('max'),
                min = curr.attr('min');

            PC.setCookie('max',max);
            PC.setCookie('min',min);

            exports.initDesks(id,true);

            $('.main').off('click','.rooms li').on('click','.rooms li',function(){

                var $this = $(this),
                    id = $this.attr('id');

                max = $this.attr('max'),
                min = $this.attr('min');

                PC.setCookie('max',max);
                PC.setCookie('min',min);

                // if($this.attr('fp_flag')==0){
                //     alert('当前房已封盘，开盘时间09:00~24:00');
                //     return;
                // }
                if($this.hasClass("active") || $this.hasClass('disabled')) return;

                $this.addClass('active').siblings('li').removeClass('active');

                PC.setCookie('roomId',id);

                exports.initDesks(id,true);
            });

            loader(false);

        });
    };

    /**
     * 初始化桌面
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    exports.initDesks = function(id,isLoad){

        clearInterval(deskTimer);


        if($('.cards-list').length > 0) $('.cards-list').hide().remove();
		/*
        deskTimer = setInterval(function(){
            exports.initDesks(id,false);
        },5000);
		*/
        loader(isLoad);

        //id = id || PC.getCookie('roomId');
		
		var id=id?id:PC.getCookie('roomId');
		if(!id){
			id=1;
			PC.setCookie("roomID",id);
		}
        var post = {'CN':'BCgameData','FN':'get_desk','room_id':id};

        PC.serverInterface(post, function(result){

            console.log(result);
            //result['fp_flag']=0;
            //console.log(result);

            var render = template.compile(KT['desksBox']);

            var html = render(result);

            PC.setCookie('net_no',result['net_no']);

            $('.room-wrap .rooms-list').html(html);
            

            //var myScroll = new IScroll('.rooms-list');

            $('.main').off('click','.rooms-list .list li').on('click','.rooms-list .list li',function(){

                var $this = $(this),
                    id = $this.attr('id');
                    no = $this.attr('net_no');
                    showId = $this.attr('showId');
                
                initSites(id,showId,true);

            }).off('click','.rooms-list .list .report').on('click','.rooms-list .list .report',function(){
                getReport(0);
            });


            loader(false);

            //快捷进入
            // var deskId = PC.getCookie('deskId');
            // var showId = PC.getCookie('showId');
            // deskId != undefined && deskId != 0 && deskId != '' && showId != undefined && showId != 0 && showId != '' && initSites(deskId, showId, true);

        });

    };

    /**
     * 加载位置信息
     * @param  {[type]} deskId [description]
     * @param  {[type]} showId [description]
     * @return {[type]}    [description]
     */
    var initSites = function(deskId, showId, isLoad){

        clearInterval(deskTimer);
        
        loader(isLoad);

        deskId = deskId || PC.getCookie('deskId');
        showId = showId || PC.getCookie('showId');

        PC.setCookie('deskId',deskId);

        PC.setCookie('showId',showId);

        PC.setCookie('isShowCards',0);

        var net_no = PC.getCookie('net_no');

        var post = {'CN':'BCgameData','FN':'getDeskInfo','desk_id':deskId,'show_id':showId};

        //console.log(post);

        PC.serverInterface({'isMaster':1,'CN':'BCbet','FN':'update_two_list','desk_id':deskId},function(){});;
        PC.serverInterface(post,function(result){
			console.log(post);
			console.log(result);

            PC.setCookie('u_m',result['user']['u_money']);
            //设置默认金额
            PC.getCookie('ship')?'':PC.setCookie('ship',result['user']['u_money_default']);

            PC.setCookie('desk_status',result['desk_status']);

            var dt = result['desk_info']['dj_time'],
                dm = parseInt(dt/60) < 10 ? '0' + parseInt(dt/60) : parseInt(dt/60),
                ds = parseInt(dt%60) < 10 ? '0' + dt%60 : dt%60;
            result['time'] = dm+':'+ds;
			console.log('dt:'+dt);
			console.log('dm:'+dm);
			console.log('ds:'+ds);
			
            var render = template.compile(KT['sitesBox']);

            var html = render(result);

            $('.main').html(html);
            
            initItemMenu();

            showCards(result);

            loader(false);

            //console.log(result);

            if(result['desk_status'] == 3){
                setTimeout(function(){
                    $('.menu .btn.next').show();
                },300);

                clearInterval(timer);

                timer = setInterval(function(){

                    if(reloadTime-- == 0){

                        partialLoad();

                        reloadTime = 5;

                        return;

                    }

                    var time = parseInt($('.timer').attr('time'));

                    time++;

                    var minutes = parseInt(time/60) < 10 ? '0' + parseInt(time/60) : parseInt(time/60),
                        seconds = parseInt(time%60) < 10 ? '0' + time%60 : time%60;
                    
                    $('.timer').attr('time',time).html(minutes+':'+seconds);

                }, 1000);

            }else{

                if(result['desk_status'] == 4){
                    $('.main .text').html('当前桌已封盘，请稍后再试。');
                    $('.timer').hide();
                }


                setTimeout(function(){

                    if(result['desk_info'] == 2 && result['allow_kc_name'] == PC.getCookie('u_name')){
                        
                        $('.main .btn.open').attr('site',result['allow_kc_pos']).show();

                    }
                },300);

                clearInterval(timer);

                timer = setInterval(function(){

                    if(reloadTime-- == 0){

                        partialLoad();

                        reloadTime = 5;

                        return;

                    }

                    var time = parseInt($('.timer').attr('time'));

                    if(time-- <= 0){

                        //initSites(deskId, showId, true);
                        partialLoad();

                        return;

                    }

                    var minutes = parseInt(time/60) < 10 ? '0' + parseInt(time/60) : parseInt(time/60),
                        seconds = parseInt(time%60) < 10 ? '0' + time%60 : time%60;
                    
                    $('.timer').attr('time',time).html(minutes+':'+seconds);

                },1000);

            }

            //查看位置信息或下注
            $('.main').off('click','.desk li .sites').on('click','.desk li .sites',function(){
                var $this = $(this);
                
                var siteId = $this.attr('site');

                var post = {
                    'site':siteId,
                    'cp_time_bet_end':$('.timer').attr('fp_time'),
                    'desk_id':deskId,
                    'user':result['user'],
                    'status':PC.getCookie('desk_status'),
                    'periods':$('.periods').attr('periods'),
                    'lastest_periods':$('.periods').attr('lastest_periods')

                };

                getPosDetail(post);

            
            //下一局
            }).off('click','.menu .btn.next').on('click','.menu .btn.next',function(){

                var post = {
                    'CN':'BCbet',
                    'FN':'next',
                    'isMaster':1,
                    'desk_id':deskId,
                    'lastest_periods':$('.main span.periods').attr('lastest_periods')
                };
                loader(true);
                PC.serverInterface(post, function(result){
                    if(result['next_flag'] == 1){
                        clearInterval(timer);
                        PC.setCookie('isShowCards',0);
                        initSites(deskId, showId, true);
                    }

                    loader();
                });
            //开船
            }).off('click','.menu .btn.open').on('click','.menu .btn.open',function(){

                var post = {
                    'CN':'BCbet',
                    'FN':'kc',
                    'isMaster':1,
                    'desk_id':deskId,
                    'show_id':showId,
                    'desk_periods':$('.main span.periods').attr('js'),
                    'site':$(this).attr('site')
                };

                PC.serverInterface(post,function(result){
                    $('.main .btn.open').hide();
                    partialLoad();
                });

            //展示牌
            }).off('click','.show-cards').on('click','.show-cards',function(){

                showCards(result);

            });


        });
    };

    /**
     * 局部刷新
     * @return {[type]}             [description]
     */
    var partialLoad = function(){

        var post = {'CN':'BCgameData','FN':'getDeskInfo','desk_id':PC.getCookie('deskId'),'show_id':PC.getCookie('showId')};
        //PC.serverInterface({'isMaster':1,'CN':'BCbet','FN':'update_two_list','desk_id':deskId,'net_no':no},function(){});;
        PC.serverInterface(post,function(result){

            PC.setCookie('u_m',result['user']['u_money']);

            var dt = result['desk_info']['dj_time'],
                dm = parseInt(dt/60) < 10 ? '0' + parseInt(dt/60) : parseInt(dt/60),
                ds = parseInt(dt%60) < 10 ? '0' + dt%60 : dt%60;
            result['time'] = dm+':'+ds;

            var render = template.compile(KT['partialBox']);

            var html = render(result);

            $('.main .desk').html(html);

            if(result['desk_status'] == 3){
                setTimeout(function(){
                    $('.menu .btn.next').show();
                },300);

                clearInterval(timer);

                timer = setInterval(function(){

                    if(reloadTime-- == 0){

                        partialLoad();

                        reloadTime = 5;

                        return;

                    }

                    var time = parseInt($('.timer').attr('time'));

                    time++;

                    var minutes = parseInt(time/60) < 10 ? '0' + parseInt(time/60) : parseInt(time/60),
                        seconds = parseInt(time%60) < 10 ? '0' + time%60 : time%60;
                    
                    $('.timer').attr('time',time).html(minutes+':'+seconds);

                }, 1000);

            }else{

                if(result['desk_status'] == 4){
                    $('.main .text').html('当前桌已封盘，请稍后再试。');
                    $('.timer').hide();
                }


                setTimeout(function(){

                    if(result['desk_info'] == 2 && result['allow_kc_name'] == PC.getCookie('u_name')){
                        
                        $('.main .btn.open').attr('site',result['allow_kc_pos']).show();

                    }
                },300);

                clearInterval(timer);

                timer = setInterval(function(){

                    if(reloadTime-- == 0){

                        partialLoad();

                        reloadTime = 5;

                        return;

                    }

                    var time = parseInt($('.timer').attr('time'));

                    if(time-- <= 0){

                        //initSites(deskId, showId, true);
                        partialLoad();

                        return;

                    }

                    var minutes = parseInt(time/60) < 10 ? '0' + parseInt(time/60) : parseInt(time/60),
                        seconds = parseInt(time%60) < 10 ? '0' + time%60 : time%60;
                    
                    $('.timer').attr('time',time).html(minutes+':'+seconds);

                },1000);

            }

            changeState(result);


        });

    };

    /**
     * 切换状态和提示语句
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    var changeState = function(res){

        $('.main span.timer').html(res['time']).attr({'time':res['desk_info']['dj_time'],'fp_time':res["desk_info"]["fp_time_index"]});

        $('.main div.sum span').html(res['desk_info']['total_money']);

        $('.main span.periods').attr({'periods':res['desk_info']['periods'],'lastest_periods':res['desk_info']['lastest_periods'],'js':res['desk_info']['current_js']}).html(res['desk_info']["desk_id"]+'号台/'+res['desk_info']["current_js"]+'期');

        $('.main .tablet .nick').attr('title','昵称: '+res['user']['u_name_nick']).html('昵称: '+res['user']['u_name_nick']);
        $('.main .tablet .crowd').attr('title','人数: '+res['cur_user'].length + ' 人').html('人数: '+res['cur_user'].length + ' 人');
        $('.main .tablet .balance').attr('title','余额: '+res['user']['u_money']).html('余额: '+res['user']['u_money']);

        PC.setCookie('desk_status',res['desk_status']);

        
         //展示 牌
        $('.main').off('click','.show-cards').on('click','.show-cards',function(){

            showCards(res);

        });

        if(res['desk_status'] == 1){

            $('.main .text').html('下注中...');

        }else if(res['desk_status'] == 2){

            $('.main .text').html('等开船...');

            if(res['allow_kc_name'] == PC.getCookie('u_name')){

                $('.main .btn.open').attr('site',res['allow_kc_pos']).show();

            }

            $('.layout .new,.ship-list').hide();

        }else if(res['desk_status'] == 3){

            if(res['result']){
                 if($('.cards-list .balls').length ==0 && PC.getCookie('isShowCards') != 1){
                    PC.setCookie('isShowCards',1);
                    showCards(res);
                 }
                $('.main .text').html('最新为'+res['desk_info']['lastest_periods_inner']+'期');

            }else{

                $('.main .text').html('等结果...');

            }
            $('.layout .new,.ship-list').hide();
            //显示下一局按钮
            $('.main .btn.next').show();

        }else if(res['desk_status'] == 4){

            $('.main .text').html('当前桌已封盘，请稍后再试。');

            $('.layout .new,.ship-list').hide();

            $('.main .btn.next').remove();

        }
    };


    /**
     * 查看位置详细信息或下注
     * @param  {[type]} post [description]
     * @return {[type]}      [description]
     */
    var getPosDetail = function(post){

        loader(true);

        post['CN'] = 'BCgameData';
        post['FN'] = 'get_pos_detail';
        post['net_no'] = PC.getCookie('net_no');
        post['show_id'] = PC.getCookie('showId');
        //console.log(post);
        PC.serverInterface(post,function(result){

            var state = PC.getCookie('desk_status');

            if(state != 1 && result['pos_detail'].length == 0){

                loader(false);

                return;
            }

            result['desk_status'] = state;

            //console.log(result);

            var render = template.compile(KT['betBox']);
            var html = render(result);

            $('.main').append(html);

            $('.mask,.layout').fadeIn(50);

            var $that = $('.main .layout .bet .content .bet-list');
            $that.animate({scrollLeft:$that.width()},100);

            loader(false);

            //新增下注
            $('.main').off('mousedown','.layout .bet-list .new .item').on('mousedown','.layout .bet-list .new .item',function(e){

                pushQuota(e, post);

            //切换下注金额
            }).off('mousedown','.layout .ship-list li').on('mousedown','.layout .ship-list li',function(e){

                var ship = $(this).attr('data-limit');

                ship = ship == 'max' ? result['max_bet'] : ship;

                PC.setCookie('ship',ship);

                pushQuota(e ,post);

            //取消下注
            }).off('click','.layout .bet-list .new .cancel').on('click','.layout .bet-list .new .cancel',function(){
                var html = [];

                html.push('<div class="wrap">');
                    html.push('<div class="sites">');
                        html.push('<div class="item"></div>');
                        html.push('<span class="foot">下注到此</span>');
                    html.push('</div>');
                html.push('</div>');

                $('.layout .bet-list .new').html(html.join(''));

            });

        });
    };

    /**
     * 设置下注金额
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    var pushQuota = function(e, post){

        var ship = parseInt(PC.getCookie('ship'));

        if($('.layout .bet-list .new .get').length == 0){

            var render = template.compile(KT['newBetBox']);

            var html = render({'ship':ship});

            $('.layout .bet-list .new').html(html);

        }else{
            var target = $('.layout .bet-list .new .get .item');

            var num = parseInt(target.html());

            //console.log(ship,num);

            if(e.button == 2){
                num = num - ship;
            }else{
                num = num + ship;
            }

            if(num >= 0) target.html(num);
        }

        

        //确定下注
        $('.main').off('click','.layout .bet-list .new .sure').on('click','.layout .bet-list .new .sure',function(){

            var bet = +$('.layout .bet-list .new .get .item').html();
            var max = +PC.getCookie('max');
            var min = +PC.getCookie('min');

            if(bet > max) alert('当前房间最高下注金额为 ' + max);
            else if(bet < min) alert('当前房间最低下注金额为 '+min);
            else if(bet > parseInt(PC.getCookie('u_m'))) alert('您的账户额度不足, 请稍后再试.');
            else{

                post['bet_money'] = bet;

                betSubmit(post);

            }
            
        });

    };

    /**
     * 提交下注
     * @param  {[type]} post [description]
     * @return {[type]}      [description]
     */
    var betSubmit = function(post){
        loader(true);
        post['CN'] = 'BCbet';
        post['FN'] = 'bet';
        post['isMaster'] = 1;
        post['is_sm'] = 0;
        post['show_id'] = PC.getCookie('showId');


        PC.serverInterface(post, function(result){
            //console.log(result);
            loader();
            switch(result['status']){
                case 2: 
                    alert(result['statusInfo']);
                    break;
                case 16:
                    alert('单注金额不能小于'+result['min']+', 不能大于'+result['max']);
                    break;
                case 17:
                    alert('单场限制额度为'+result['u_match_bet']);
                    break;

                case 18: 
                    alert('该房不可使用');
                    //exports.initRooms();
                    break;
                case 19:
                    alert('当前房已封盘，开盘时间09:00~24:00');
                    //exports.initRooms();
                    break;
                case 20:
                    alert('当前桌已封盘，请稍后再试。');
                    //exports.initRooms();
                    break;
                case 22:
                    alert('位置总额不能超过'+result['max']);
                    //exports.initRooms();
                    break;
                default:
                    //$('#maskOverlay,#dialogOverlay').hide().empty();
                    partialLoad();
                    $('.main .close').click();
                    break;
            }
        });

    }



    /**
     * 初始化菜单
     * @return {[type]} [description]
     */
    var initItemMenu = function(){
        
        //var post = {'CN':'BCgameData','FN':'show_info'};

        //PC.serverInterface(post,function(result){
            //console.log(result);
            //result['device'] = detectDevice();
            var render = template.compile(KT['menuBox']),
                html = render({});

            $('.main').append(html);
            
            
            var $ul = $('li.quick.more ul');
            var len = $ul.find('li').length;
            $ul.css({'top':-len*30+'px'});
            
            var $tips = $('.special-tips .sum');
            if($tips.length==0){
                var special = $('.sum,.tips').clone(true);
                $('.special-tips').append(special);
            }

            $('.main').off('click','.quick.more li').on('click','.quick.more li',function(){

                var $this = $(this),
                    url = $this.attr('data-url'),
                    clazz = $this[0].classList[0];
                if($this.hasClass('disabled')){
                    alert('试玩账号无法使用该功能.');
                    return;
                }
                switch(clazz){
                    case 'exit':
                        //退出
                        outRoom(function(){
                            url && (window.location.href = url);
                        });
                        break;
                    case 'account':
                        //账户
                        getAccount();
                        break;
                    case 'service':
                        //客服
                        getService();
                        break;
                    case 'promotion':
                        //推广
                        getPromotion();
                        break;
                }


            //退出房间
            }).off('click','.quick.outroom').on('click','.quick.outroom',function(){

                outRoom(function(){

                    clearInterval(timer);


                    PC.setCookie('deskId','');
                    PC.setCookie('showId','');
                    exports.initRooms();

                    //console.log($('.cards-list').length);

                    $('.cards-list').length > 0  && $('.cards-list').remove();

                });

            //
            }).off('click','.quick.selections li').on('click','.quick.selections li',function(){
                
                var $this = $(this),
                    clazz = $this.attr('class');

                switch(clazz){
                    case 'notice':
                        //公告
                        getNotice();
                        break;
                    case 'report':
                        //报表
                        getReport(0);
                        break;
                    case 'result':
                        //结果
                        getResult();
                        break;
                    case 'rule':
                        //规则
                        getRule();
                        break;
                }

            });

        //});
    };

    /**
     * 客服
     * @return {[type]} [description]
     */
    var getService = function(){

        loader(true);
        var post = {
            'CN':'BCgameData',
            'FN':'get_kefu'
        };
        PC.serverInterface(post,function(res){
            console.log(res);
            var render = template.compile(KT['serviceBox']);
            var html = render(res);
            
            var layout = $('.main .layout');

            if(layout.length>0) $(html).replaceAll(layout);

            else $('.main').append(html);

            $('.mask,.layout').fadeIn(50);

            $('.msgbox').animate({scrollTop:$(this).height()},500);
            loader();
        });

        msgTimer = setInterval(function(){
            getMsg();
        },2000);


        $('.main').off('click','button.send').on('click','button.send',function(){
            var msg = $('textarea.message').val().trim().encodeHTML();
            if(msg){
                sendMsg(msg);
            }
        });
    };

    /**
     * 发送留言
     * @param  {[type]} msg [description]
     * @return {[type]}     [description]
     */
    var sendMsg = function(msg){
        var post = {
            'CN':'bank',
            'FN':'insert_msg',
            'isMaster':1,
            'content':msg
        };
        PC.serverInterface(post,function(res){
            console.log(res);
            getMsg();
        });
    }

    /**
     * 获取聊天信息
     * @return {[type]} [description]
     */
    var getMsg = function(){
        var post = {
            'CN':'BCgameData',
            'FN':'get_kefu'
        };
        PC.serverInterface(post,function(res){
			if(res['msg'].length==0){return;}
            if(res['msg'][res['msg'].length-1]['insert_date'] == $($('.msg')[res['msg'].length-1]).children('.date').text()) return;
            var render = template.compile(KT['serviceBox']);
            var html = render(res);
            
            var layout = $('.main .layout');

            if(layout.length>0) $(html).replaceAll(layout);

            else $('.main').append(html);

            $('.mask,.layout').show();

            $('.msgbox').scrollTop($(this).height());

            loader();
        });
    }

    /**
     * 推广
     * @return {[type]} [description]
     */
    var getPromotion = function(rel){
        rel = rel || 0;
        loader(true);
        var post = {
            'CN':'BCgameData',
            'FN':'get_promotion'
        };
        PC.serverInterface(post,function(res){
            console.log(res);
            res['rel'] = rel;
            var render = template.compile(KT['promotionBox']);
            var html = render(res);
            
            var layout = $('.main .layout');

            if(layout.length>0) $(html).replaceAll(layout);

            else $('.main').append(html);

            $('.mask,.layout').fadeIn(50);

            $('.main .layout .promotion input').focus(function(){
                $(this).select();
            });
            
            $(".yidongduan").unbind().click(function(event){
				event.preventDefault();
			});
			 var device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|operi mini/i.test(navigator.userAgent.toLowerCase()));
			//跳转语句
			if (!device) {
				$(".yidongduan").hide();
				$(".pcduan").show();
			} else {
				//移动设备
				$(".yidongduan").show();
				$(".pcduan").hide();
			}
            var $config = {
                url                 : (res['qr'] && res['qr']['url']), // 网址，默认使用 window.location.href
                source              : window.location.href, // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
                description         : '开船游戏', // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
                title               : '嗨，我发现了一款超好玩的开船游戏，无需下载，点击即玩，你也赶紧去试试吧。→ '+(res['qr'] && res['qr']['url']), // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
                image               :  'http://'+window.location.host +'/'+ (res['qr'] && res['qr']['qrcode']), // 图片, 默认取网页中第一个img标签
                sites               : ['qzone', 'qq','wechat', 'weibo', 'douban'], // 启用的站点
                disabled            : ['google', 'facebook', 'twitter'], // 禁用的站点
                wechatQrcodeTitle   : "请打开微信扫一扫", // 微信二维码提示文字
                wechatQrcodeHelper  : '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>',
            };
            $('.social-share').share($config);

            //tab切换
            $('.main').off('click','.layout .promotion .tab li').on('click','.layout .promotion .tab li',function(){
                var $this = $(this);
                if($this.hasClass('active')) return;
                rel = $this.addClass('active').siblings('li').removeClass('active').end().attr('rel');
                post['level'] = 0;
                switch(rel){
                    case '0':
                        getPromotion(0);
                        break;
                    case '1':
                        post['FN'] = 'get_promotion_jpg';
                        loader(true);
                        PC.serverInterface(post,function(res){
                            
                            res['rel'] = rel;
                            var render = template.compile(KT['promotionBox']);
                            var html = render(res);
                            var layout = $('.main .layout');
                            console.log(res);
                            if(layout.length>0) $(html).replaceAll(layout);

                            else $('.main').append(html);

                            $('.mask,.layout').fadeIn(50);

                            loader();

                            $('.main').off('click','.layout .show_big_pic').on('click','.layout .show_big_pic',function(){
                                loader(true);
                                var $that = $(this);
                                var big = $that.attr('data-url');
                                var img = document.createElement('img');
                                img.src = big;
                                img.setAttribute('class','big_img');
                                img.setAttribute('style','display:none');
                                $config = {
                                    url                 : 'http://'+window.location.host + '?p='+res['user_id'], // 网址，默认使用 window.location.href
                                    source              : window.location.href, // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
                                    title               : '嗨，我发现了一款超好玩的开船游戏，无需下载，点击即玩，你也赶紧去试试吧。→ http://'+window.location.host + '?p='+res['user_id'], // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
                                    description         : '开船游戏', // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
                                    image               :  'http://'+window.location.host + '/' +big, // 图片, 默认取网页中第一个img标签
                                    sites               : ['qzone', 'qq','wechat', 'weibo', 'douban'], // 启用的站点
                                    disabled            : ['google', 'facebook', 'twitter'], // 禁用的站点
                                    wechatQrcodeTitle   : "请打开微信扫一扫", // 微信二维码提示文字
                                    wechatQrcodeHelper  : '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>',
                                };
                                img.onload = function(){
                                    loader();
                                    var $img = $(img);
                                    $('.main').append($('<div class="big_img_wrap"></div>').append($img).append('<div class="pic-tips text-center">赶快拿起手机，扫一扫图中的二维码吧！<div class="social-share"></div></div>'));
                                    $img.fadeIn(250);
                                    
                                    $('.social-share').share($config);
                                    $('.main').on('click','.big_img_wrap',function(){
                                        $(this).remove();
                                    }).on('click','.social-share',function(e){
                                        if (e && e.stopPropagation) {
                                        　　e.stopPropagation(); 
                                        } else{
                                            window.event.cancelBubble = true;
                                        }
                                    });
                                };
                            });
                        });
                        break;
                    case '2':
                        post['FN'] = 'get_game_level';
                        loader(true);
                        PC.serverInterface(post,function(res){
                            res['rel'] = rel;
                            var render = template.compile(KT['promotionBox']);
                            var html = render(res);
                            var layout = $('.main .layout');
                            console.log(res);

                            if(layout.length>0) $(html).replaceAll(layout);

                            else $('.main').append(html);

                            $('.mask,.layout').fadeIn(50);
                            
                            loader();
                        });
                        break;
                    case '3':
                        post['FN'] = 'get_lower';
                        loader(true);
                        PC.serverInterface(post,function(res){
                            res['rel'] = rel;
                            var render = template.compile(KT['promotionBox']);
                            var html = render(res);
                            var layout = $('.main .layout');
                            console.log(res);

                            if(layout.length>0) $(html).replaceAll(layout);

                            else $('.main').append(html);

                            $('.mask,.layout').fadeIn(50);
                            
                            loader();
                        });
                }

            //select切换
            }).off('change','.layout .promotion select').on('change','.layout .promotion select',function(){
                var $this = $(this);
                var val = $this.val();
                var rel = $this.attr('rel');
                if(val == 0 && rel != 3){
                    post['FN'] = 'get_game_level';
                    loader(true);
                    PC.serverInterface(post,function(res){
                        res['rel'] = rel;
                        var render = template.compile(KT['promotionBox']);
                        var html = render(res);
                        var layout = $('.main .layout');
                        console.log(res);

                        if(layout.length>0) $(html).replaceAll(layout);

                        else $('.main').append(html);

                        $('.mask,.layout').fadeIn(50);
                        
                        loader();
                    });
                    return;
                }
                var fn = '';
                if(rel == 1){
                     fn = 'get_prom_yongjin';
                }else if(rel == 2){
                    fn = 'get_game_yongjin';
                }else if(rel == 3){
                    fn = 'get_lower';
                }
                post = {
                    'CN':'BCgameData',
                    'FN':fn,
                    'level':val
                };
                loader(true);
                PC.serverInterface(post,function(result){
                    console.log(result);
                    var htmls = [];
                    $('.total_yongjin').html('当前级佣金总额：'+(result['total_yongjin'] || 0) + '<button class=" button yj2account '+(result['u_money_yongjin'] == 0 ? 'disabled':'')+'" max='+result['u_money_yongjin']+' >佣金入账(可入账金额:'+result['u_money_yongjin']+')</button>');
                    if(result['lowers_yongjin'] && result['lowers_yongjin'].length>0){
                        htmls.push('<tr><th>用户名</th><th>有效金额</th><th>佣金</th></tr>');
                        var yj = result['lowers_yongjin'];
                        for(var i=0,len=yj.length;i<len;i++){
                            var p = yj[i];
                            htmls.push('<tr><td>'+p['parm_xx_name']+'</td><td>'+p['js_money']+'</td><td>'+p['yongjin']+'</td></tr>');
                        }
                    }else if(result['lowers'] && result['lowers'].length>0){
                        htmls.push('<tr><th>序号</th><th>用户名</th>');
                        var lowers = result['lowers'];
                        for(var i=0,len=lowers.length;i<len;i++){
                            var p = lowers[i];
                            htmls.push('<tr><td>'+(i+1)+'</td><td>'+p+'</td></tr>');
                        }
                    }else{
                        htmls.push('<tr><td colspan="3">暂无数据，请稍后再试。</td></tr>');
                    }

                    $('.main .layout tbody[rel='+rel+']').html(htmls.join(''));
                    loader();
                });
            }).off('click','.layout .button.yj2account').on('click','.layout .button.yj2account',function(){
                var $this = $(this);
                var max = Number($this.attr('max'));
                if($this.hasClass('disabled')) return;
                if(max==0) return;
                var money = prompt('请输入要入账的金额(可入账金额:'+max+'):');
                if(money==null || money==0) return;
                if(Number(money) < 0){
                    alert('入账金额不能小于零, 请重试!');
                    return;
                }
                if(Number(money)){
                    var post = {
                        CN:'bank',
                        FN:'yongjin_2_account',
                        yongjin:money,
                        isMaster:1
                    };
                    loader(true);
                    PC.serverInterface(post,function(res){
                        if(res['flag'] == 1){
                            alert('恭喜你操作成功!');
                            $('.layout .promotion select:visible').change();
                        }else{
                            alert(res['error']);
                        }
                        loader();
                    });
                }else{
                    alert('您输入的金额有误，请重新操作.');
                    return;
                }

            });

            loader();
        });
        
        
        var clipboard = new Clipboard('.copy');
        clipboard.on('success', function(e) {
            alert('复制成功，赶紧去和朋友分享分享吧！');
            e.clearSelection();
            clipboard.destroy();
        });

        clipboard.on('error', function(e) {
            prompt('对不起，您的浏览器不支持一键复制\n请长按复制下面的链接，分享给你的朋友吧。',e.trigger.getAttribute('data-clipboard-text'));
        });
    }

    /**
     * 账户
     * @return {[type]} [description]
     */
    var getAccount = function(){
        loader(true);
        post = {'CN':'BCgameData','FN':'get_user_info','desk_id':PC.getCookie('deskId')};
        PC.serverInterface(post,function(res){
            console.log(res);
            var render = template.compile(KT['accountBox']);
            var html = render(res);

            var layout = $('.main .layout');

            if(layout.length>0) $(html).replaceAll(layout);

            else $('.main').append(html);

            $('.mask,.layout').fadeIn(50);

            loader();

            $('.main').off('click','.layout .account .tab li').on('click','.layout .account .tab li',function(){
                
                var $this = $(this).addClass('active').siblings('li').removeClass('active').end();
                var rel = $this.attr('data-rel');
                $('.content[data-rel='+rel+']').show().siblings('.content').hide();
                switch(rel){
                    case 'account':
                        getAccount();
                        break;
                    //存款
                    case 'deposit':
                            loader(true);
                            post = {'CN':'BCgameData','FN':'get_deposit'};
                            PC.serverInterface(post,function(res){
                                console.log(res);
                                render = template.compile(KT['depositBox']);
                                html = render(res);
                                $('.main .layout .content[data-rel='+rel+']').html(html);
                                loader(false);
                            });
                        break;
                    //取款
                    case 'withdrawal':
                            loader(true);
                            post = {'CN':'BCgameData','FN':'get_withdraw'};
                            PC.serverInterface(post,function(res){
                                post['FN'] = 'get_all_bank';
                                PC.serverInterface(post,function(result){
                                    if(result['u_xm'] == ''){
                                        alert('请先在【账户】页面添加您的【真实姓名】!');
                                        loader(false);
                                        return;
                                    }
                                    res['banks'] = result['all_bank'];
                                    console.log(res);
                                    render = template.compile(KT['withdrawalBox']);
                                    html = render(res);
                                    $('.main .layout .content[data-rel='+rel+']').html(html);
                                    loader(false);
                                });
                            });
                        break;
                    case 'details':
                            loader(true);
                            var month = $('.month').val();
                            post = {'CN':'BCgameData','FN':'get_trading_bill','month':month};
                            PC.serverInterface(post,function(res){
                                res['curr'] = month;
                                //console.log(res);
                                render = template.compile(KT['tradingBox']);
                                html = render(res);
                                $('.main .layout .content[data-rel='+rel+']').html(html);
                                loader(false);
                                $('.month').change(function(){
                                    $('.layout .account .tab li[data-rel="details"]').click();
                                });
                            });
                        break;
                }

            //tab切换
            }).off('click','.layout .options li').on('click','.layout .options li',function(){

                var _this = $(this).addClass('active').siblings('li').removeClass('active').end();
                var clazz = _this.attr('class').split(' ')[0];
                var min = _this.attr('min');
                var max = _this.attr('max');
                $('.tabs li[rel='+clazz+']').show().siblings('li').hide();
                $('.money_input').val('').removeAttr('readonly').removeAttr('curr').attr({'min':min,'max':max});
                $('.generate').removeClass('disabled');
                $('.sure').addClass('disabled').removeAttr('id');
                var nbmoney = parseFloat($('.nbmoney').attr('data-money'));
                if(nbmoney==0){
                    $('.sure[rel="submit"]').removeClass('disabled');
                }

            //生成随机金额
            }).off('click','.layout .generate').on('click','.layout .generate',function(){
                if($(this).hasClass('disabled')) return;
                var money_input = $('.money_input');
                var money = money_input.val();
                var max = money_input.attr('max');
                var min = money_input.attr('min');
                var post = {
                    'CN':'bank',
                    'FN':'get_rand_money',
                    'money':money,
                    'isMaster':1
                };
                if(money == ''){
                    alert('请先填写存入的金额，最好是整数。');
                    money_input.focus();
                    return;
                }
                loader(true);
                PC.serverInterface(post,function(res){
                    if(res['rand_money']){
                        money_input.val(res['rand_money']).attr('curr',res['rand_money']);
                        $('.sure[rel=agree]').removeClass('disabled');
                    }else{
                        alert('获取随机金额失败，请重试。');
                    }
                    loader();
                });

            }).off('keyup','.layout .number').on('keyup','.layout .number',function(){
                var $this = $(this);
                $this.val($this.val().replace(/\D+/g,''));
            }).off('blur','.layout .money_input').on('blur','.layout .money_input',function(){
                var $this = $(this);
                var val = $this.val().replace(/[^\.]\D+/g,'');
                if(val == ''){
                    //$this.val(val).focus();
                    return;
                }
                var max = parseInt($this.attr('max'));
                var min = parseInt($this.attr('min'));
                val = parseInt(val);

                if(val < min){
                    alert('金额不能小于'+min);
                    //$this.focus().select();
                    return;
                }

            //存款+交易明细(同意转账/确认已转账)
            }).off('click','.layout button.sure').on('click','.layout button.sure',function(){
                var $this = $(this);
                if($this.hasClass('disabled')) return;
                var rel = $this.attr('rel');

                switch(rel){
                    case 'agree':
                        var id = $('.layout .options li.active').attr('rel');
                        var money_input = $('.layout .money_input').attr('readonly','readonly');
                        $('.layout .generate').addClass('disabled');
                        var post = {
                            'CN':'bank',
                            'FN':'agree_pay',
                            'bank_type':id,
                            'money':money_input.val(),
                            'isMaster':1
                        };
                        loader(true);
                        //console.log(post);
                        PC.serverInterface(post,function(res){
                            if(res['paylist_id']){
                                $this.addClass('disabled');
                                $('.sure[rel=complete]').attr('id',res['paylist_id']).removeClass('disabled');
                            }else{
                                alert('与服务器通信失败，请重试。');
                            }
                            loader();
                        });
                        break;
                    case 'complete':
                            var id = this.id;
                            var post = {
                                'CN':'bank',
                                'FN':'pay_complete',
                                'isMaster':1,
                                'paylist_id':id
                            };
                            loader(true);
                            PC.serverInterface(post,function(res){
                                if(res['application_flag']==1){
                                    alert('操作成功，请等待客服确认。');
                                    $this.addClass('disabled');
                                    $('.money_input').removeAttr('readonly');
                                    $('.generate').removeClass('disabled');
                                }else{
                                    alert('操作失败，请重试。');
                                }
                                loader();
                            });
                        break;
                    case 'submit':
                        var id = $('.layout .options li.active').attr('rel');
                        var bank_id = $('.select select:visible').val();
                        var account = $('.change-account').val();
                        var fn = account == 0 ? 'withdraw_submit' : 'withdraw_yongjin';
                        var out = $('.out');
                        var min = Number(out.attr('min'));
                        var max = Number(out.attr('max'));
                        var money = Number(out.val());
                        if(!money) return;
                        if(money>max){
                            alert('最大可提取额度为：'+max);
                            out.focus().select();
                            return;
                        }
                        if(money<min){
                            alert('最低提取额度为：'+min);
                            out.focus().select();
                            return;
                        }
                        loader(true);
                        var post = {
                            'CN':'bank',
                            'FN':fn,
                            'bank_id':bank_id,
                            'bank_type':id,
                            'money':money,
                            'isMaster':1
                        };
                        PC.serverInterface(post,function(res){
                            loader();
                            console.log(res);
                            $this.addClass('disabled');
                            if(res['error']){
                                alert(res['error']);
                                $this.removeClass('disabled');
                                return;
                            }
                            if(res['paylist_id'] && res['paylist_id']>0){
                                alert('提交成功，请等待客服确认。');
                                $('.layout .money_input').val('');
                                $this.removeClass('disabled');
                            }else{
                                alert('提交失败，请稍后重试。');
                                $this.removeClass('disabled');
                            }
                        });


                        break;
                }

            //显示添加新账户
            }).off('click','.layout .plus').on('click','.layout .plus',function(){
                $(this).hide().next().show();
                var rel = $(this).attr('rel');

            //取消添加新账户
            }).off('click','.layout .cancel').on('click','.layout .cancel',function(){
                $(this).parents('.new_item').hide().prev().show();

            //确认添加新账户
            }).off('click','.layout .submit').on('click','.layout .submit',function(){
                var $this = $(this);
                var rel = $this.attr('rel');
                console.log(rel);
                switch(rel){
                    case 'addmore':
                        var u_xm = $('.realname').attr('real') || $('.realname').val();
                        var u_tel = $('.tel').val();
                        var u_qq_id = $('.qq').val();
                        var u_wx_id = $('.wx').val();
                        var post = {
                            'CN':'User',
                            'FN':'save_user_detail',
                            'isMaster':1,
                            'u_xm':u_xm,
                            'u_tel':u_tel,
                            'u_qq_id':u_qq_id,
                            'u_wx_id':u_wx_id
                        };
                        var oldP = $('.old_password').val().trim();
                        var newP = $('.new_password').val().trim();
                        var conf = $('.confirm_password').val().trim();

                        if(oldP.length>6 && newP.length<6){
                            alert('新密码至少6位。');
                            return;
                        }else if(oldP.length>6 && newP.length>5 && newP != conf){
                            alert('两次新密码不一致，请重新输入。');
                            return;
                        }else{
                            post['u_old_password'] = oldP;
                            post['u_new_password'] = newP;
                            post['u_confirm_password'] = conf;
                        }
                        loader(true);
                        PC.serverInterface(post,function(res){
                            loader();
                            console.log(res);
                            if(res['save_flag'] && res['save_flag'] == 1){
                                alert('修改成功。');
                                $('.layout .account .tab li[data-rel="account"]').click();
                            }else{
                                alert('修改失败，请稍后重试。');
                                return;
                            }
                        });
                        break;
                    case 'bank':
                        var list_id = $('select.list_id').val();
                        var bank_no = $('.bank_no:visible').val().trim();
                        var bank_addr = $('.bank_addr').val().trim();
                        //var bank_pers = $('.bank_pers').val().trim();
                        var province = $('.province').val().trim();
                        var city = $('.city').val().trim();
                        var bank_type = 2;
                        if(!bank_no || !bank_addr || !province || !city){
                            alert('信息未填写好，请确认。');return;
                        }
                        var post = {
                            'CN':'bank',
                            'FN':'save_bank',
                            'list_id':list_id,
                            'bank_no':bank_no,
                            'bank_addr':bank_addr,
                            //'bank_pers':bank_pers,
                            'province':province,
                            'city':city,
                            'bank_type':bank_type,
                            'isMaster':1
                        };
                        loader(true);
                        PC.serverInterface(post,function(res){
                            loader();
                            if(res['save_flag'] && res['save_flag'] == 1){
                                alert('添加成功。');
                                $('.layout .account .tab li[data-rel="withdrawal"]').click();
                            }else{
                                alert('添加失败，请稍后重试。');
                                return;
                            }
                        });
                        break;
                    case 'alipay':
                        var bank_type = 3;
                        var bank_no = $('.bank_no:visible').val().trim();
                        if(!bank_no){
                            alert('信息未填写好，请确认。');return;
                        }
                        var post = {
                            'CN':'bank',
                            'FN':'save_bank',
                            'bank_no':bank_no,
                            'bank_type':bank_type,
                            'isMaster':1
                        };
                        loader(true);
                        PC.serverInterface(post,function(res){
                            loader();
                            if(res['save_flag'] && res['save_flag'] == 1){
                                alert('添加成功。');
                                $('.layout .account .tab li[data-rel="withdrawal"]').click();
                            }else{
                                alert('添加失败，请稍后重试。');
                                return;
                            }
                        });
                        break;
                    case 'weichat':
                        var bank_type = 4;
                        var bank_no = $('.bank_no:visible').val().trim();
                        if(!bank_no){
                            alert('信息未填写好，请确认。');return;
                        }
                        var post = {
                            'CN':'bank',
                            'FN':'save_bank',
                            'bank_no':bank_no,
                            'bank_type':bank_type,
                            'isMaster':1
                        };
                        loader(true);
                        PC.serverInterface(post,function(res){
                            loader();
                            if(res['save_flag'] && res['save_flag'] == 1){
                                alert('添加成功。');
                                $('.layout .account .tab li[data-rel="withdrawal"]').click();
                            }else{
                                alert('添加失败，请稍后重试。');
                                return;
                            }
                        });
                        break;
                }
            })


        });
    };
    
    /**
     * 规则
     * @return {[type]} [description]
     */
    function getRule(){
        loader(true);
        var render = template.compile(KT['ruleBox']);
        var html = render({});
        
        var layout = $('.main .layout');

        if(layout.length>0) $(html).replaceAll(layout);

        else $('.main').append(html);

        $('.mask,.layout').fadeIn(50);

        loader();
    }

    /**
     * 结果
     * @param  {[type]}  periods  [description]
     * @param  {[type]}  deskId   [description]
     * @param  {[type]}  gameTime [description]
     * @param  {Boolean} back     [description]
     * @return {[type]}           [description]
     */
    var getResult = function(periods,deskId, gameTime, back){

        periods = periods || $('.sel-periods').val() || 0;

        deskId = deskId || PC.getCookie('deskId');

        var options = [];

        options.push('<option value=0 >全部</option>');

        for(var i=179;i>0;i--){

            options.push('<option value='+i+' '+(i==periods?'selected':'')+' >'+i+'期</option>');

        }

        loader(true);

        var post = {
            'CN':'BCgameData',
            'FN':'get_history',
            'desk_id':deskId,
            'desk_periods':periods ,
            'show_id':PC.getCookie('showId'),
            'game_time':gameTime
        };

        PC.serverInterface(post,function(result){

            result['target'] = (periods == 0 ? 0 : 1);
            result['back'] = back;

            //console.log(post);
            //console.log(result);

            var render = template.compile(KT['resultBox']),
                html = render(result);

            var layout = $('.main .layout');

            if(layout.length>0) $(html).replaceAll(layout);

            else $('.main').append(html);

            $('.mask,.layout').fadeIn(50);

            loader(false);

            $('.main').off('click','.layout tr[periods]').on('click','.layout tr[periods]',function(){
            
                //$('.layout').hide().remove();
                //$('.main .close').click();

                periods = $(this).attr('periods');

                getResult(periods,deskId,gameTime,1);

            //返回
            }).off('click','.layout .back').on('click','.layout .back',function(){

                //$('.main .close').click();
                //$('.layout').hide().remove();

                if(back == 1) {
                    $('.sel-periods').val(0);
                    getResult(0);
                }
                else if(back == 2) getReportOnDay(gameTime.replace(/-/g,''),back);

            //上下局
            }).off('click','.layout .control.prev,.layout .control.next').on('click','.layout .control.prev,.layout .control.next',function(){

                if($(this).hasClass('prev')) getResult(parseInt($('.sel-periods').val())-1,deskId,gameTime,1);
                else getResult(parseInt($('.sel-periods').val())+1,deskId,gameTime,1);

            });

            $('.main .sel-periods').html(options.join('')).change(function(){
                
                //$('.main .close').click();
                //$('.layout').hide().remove();

                getResult(this.value,deskId,gameTime,1);

            });
        });


        

    };

    /**
     * 获取公告信息
     * @return {[type]} [description]
     */
    var getNotice = function(){

        loader(true);

        var post = {'CN':'BCgameData','FN':'gg','net_no':PC.getCookie('net_no')};

        PC.serverInterface(post,function(result){
			console.log(post);
			console.log(result);
            var render = template.compile(KT['noticeBox']),

                html = render(result);

            $('.main').append(html);

            $('.mask,.layout').fadeIn(50);

            loader(false);

        });

    };

    var getReport = function(weekNum){

        loader(true);

        weekNum = weekNum || PC.getCookie('weekNum') || 0;

        PC.setCookie('weekNum',weekNum);

        var post = { 
            //'CN':'userOrder',
			'CN':'BCgameData',
            'FN':'getReport',
            'accountType':PC.getCookie('account'),
            'weekNum':weekNum 
        };

        PC.serverInterface(post,function(result){

            //console.log(result);

            result['target'] = 0;

            var render = template.compile(KT['reportBox']);

            var html = render(result);

            var layout = $('.main .layout');

            if(layout.length>0) $(html).replaceAll(layout);

            else $('.main').append(html);

            $('.mask,.layout').fadeIn(50);

            loader(false);
        });

        $('.main').off('click','.layout .getWeek').on('click','.layout .getWeek',function(){

            var $this = $(this);

            weekNum = $this.attr('data-week');

            getReport(weekNum);

        }).off('click','.layout tr[data-date]').on('click','.layout tr[data-date]',function(){

            var $this = $(this),
                date = $this.attr('data-date');
            
            getReportOnDay(date,1);

        }).off('click','.layout tr[periods]').on('click','.layout tr[periods]',function(){

            var $this = $(this),
                deskId = $this.attr('deskId'),
                periods = $this.attr('periods'),
                gameTime = $this.attr('gameTime');

            getResult(periods,deskId,gameTime,2);

        });
    };
    
    /**
     * 查询指定日期的报表
     * @param {[[Type]]} gameTime [[Description]]
     * @param {[[Type]]} back     [[Description]]
     */
    var getReportOnDay = function(gameTime,back){

        var post = {
            //'CN':'userOrder', 
            'CN':'BCgameData',
			'FN':'getOrderList', 
            'js_flag':1, 
            'showNum':10000,
            'accountType':PC.getCookie('accountType'), 
            'gameTime':gameTime 
        };

        PC.serverInterface(post,function(result){

            console.log(result);

            result['target']=1;

            result['isBack'] = true;

            result['weekNum'] = PC.getCookie('weekNum');

            var render = template.compile(KT['reportBox']),

                html = render(result);

            var layout = $('.main .layout');

            if(layout.length > 0){

                layout.remove();

            }

            $('.main').append(html);

            $('.mask,.layout').fadeIn(50);

            //返回上级
            $('.main').off('click','.layout li.back').on('click','.layout li.back',function(){
                
                if($(this).attr('isBack')==1) getReport(result['weekNum']);
            });
            // $('tr.res').unbind('click').bind('click',function(){
            //     var _this = $(this),
            //         periods = _this.attr('periods'),
            //         deskId = _this.attr('deskId'),
            //         gameTime = _this.attr('gameTime');
                
            //     getResult(periods,deskId,gameTime,2);
            // });
        });

    }


    /**
     * 检测是手机还是电脑
     * @return {Boolean} true is mobile else is pc
     */
    var detectDevice = function(){
        return (/android|webos|iphone|ipad|ipod|blackberry|iemobile|operi mini/i.test(navigator.userAgent.toLowerCase()));
    };



    /**
     * 加载效果控制
     * @param  {[type]} op [description]
     * @return {[type]}    [description]
     */
    var loader = function(op){
        var loading = $('.loading');
        op && loading.show() || loading.hide();
    };


    /**
     * 展示/收起 牌
     * @param  {[type]} res [description]
     * @return {[type]}    [description]
     */
    var showCards = function(res){

        var isRemove = $('.main .cards-list .balls').length == 0;
        if(isRemove){

            var render = template.compile(KT['cardsBox']);

            var html = render(res);

            $('.main').append(html);
            

        }

        isRemove = $('.main .cards-list .balls').length == 0;

        var cards = $('.cards-list');

        var relHeight = cards.height();

        cards.css('top','0px');

        //console.log($('.cards-list').height());
        //
        var isDown = false;
        var startY = 0;
        var endY = 0;

        $(document).on('mousedown touchstart',function(e){
            //console.log(e);
            isDown = true;

            e = e || window.event;

            startY = e.pageY || e.originalEvent.changedTouches[0].pageY;

        }).on('mouseup touchend touchcancel',function(e){
            cards = $('.cards-list');
            e = e || window.event;
            if(isDown){
                endY = e.pageY || e.originalEvent.changedTouches[0].pageY;

                if(endY - startY < -10){
                    cards.css('top', - cards.height() + 'px');
                    if(isRemove){
                        setTimeout(function(){
                            cards.remove();
                        },500);
                    }
                }
                isDown = false;
            }

        });

    };

    /**
     * 退出房间
     * @param  {[type]} callback   [description]
     * @return {[type]}      [description]
     */
    var outRoom = function( callback){
        //console.log(2);
        var post = {
            'CN':'BCbet',
            'FN':'dec_two_list',
            'desk_id':PC.getCookie('deskId'),
            'isMaster':1
        };
            //console.log(post);
        PC.serverInterface(post,function(result){
            PC.setCookie('deskId','');
            console.log(result);
            
        });
        callback&&callback();
    };

});