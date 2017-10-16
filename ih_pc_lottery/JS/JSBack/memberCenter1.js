// JavaScript Document
var where = new Array(35);
function comefrom(loca,locacity) { this.loca = loca; this.locacity = locacity; }
where[0] = new comefrom("北京","东城|西城|崇文|宣武|朝阳|丰台|石景山|海淀|门头沟|房山|通州|顺义|昌平|大兴|平谷|怀柔|密云|延庆");
where[1] = new comefrom("上海","黄浦|卢湾|徐汇|长宁|静安|普陀|闸北|虹口|杨浦|闵行|宝山|嘉定|浦东|金山|松江|青浦|南汇|奉贤|崇明");
where[2] = new comefrom("天津","和平|东丽|河东|西青|河西|津南|南开|北辰|河北|武清|红挢|塘沽|汉沽|大港|宁河|静海|宝坻|蓟县");
where[3] = new comefrom("重庆","万州|涪陵|渝中|大渡口|江北|沙坪坝|九龙坡|南岸|北碚|万盛|双挢|渝北|巴南|黔江|长寿|綦江|潼南|铜梁|大足|荣昌|壁山|梁平|城口|丰都|垫江|武隆|忠县|开县|云阳|奉节|巫山|巫溪|石柱|秀山|酉阳|彭水|江津|合川|永川|南川");
where[4] = new comefrom("河北","石家庄|邯郸|邢台|保定|张家口|承德|廊坊|唐山|秦皇岛|沧州|衡水");
where[5] = new comefrom("山西","太原|大同|阳泉|长治|晋城|朔州|吕梁|忻州|晋中|临汾|运城");
where[6] = new comefrom("内蒙古","呼和浩特|包头|乌海|赤峰|呼伦贝尔盟|阿拉善盟|哲里木盟|兴安盟|乌兰察布盟|锡林郭勒盟|巴彦淖尔盟|伊克昭盟");
where[7] = new comefrom("辽宁","沈阳|大连|鞍山|抚顺|本溪|丹东|锦州|营口|阜新|辽阳|盘锦|铁岭|朝阳|葫芦岛");
where[8] = new comefrom("吉林","长春|吉林|四平|辽源|通化|白山|松原|白城|延边");
where[9] = new comefrom("黑龙江","哈尔滨|齐齐哈尔|牡丹江|佳木斯|大庆|绥化|鹤岗|鸡西|黑河|双鸭山|伊春|七台河|大兴安岭");
where[10] = new comefrom("江苏","南京|镇江|苏州|南通|扬州|盐城|徐州|连云港|常州|无锡|宿迁|泰州|淮安");
where[11] = new comefrom("浙江","杭州|宁波|温州|嘉兴|湖州|绍兴|金华|衢州|舟山|台州|丽水");
where[12] = new comefrom("安徽","合肥|芜湖|蚌埠|马鞍山|淮北|铜陵|安庆|黄山|滁州|宿州|池州|淮南|巢湖|阜阳|六安|宣城|亳州");
where[13] = new comefrom("福建","福州|厦门|莆田|三明|泉州|漳州|南平|龙岩|宁德");
where[14] = new comefrom("江西","南昌市|景德镇|九江|鹰潭|萍乡|新馀|赣州|吉安|宜春|抚州|上饶");
where[15] = new comefrom("山东","济南|青岛|淄博|枣庄|东营|烟台|潍坊|济宁|泰安|威海|日照|莱芜|临沂|德州|聊城|滨州|菏泽");
where[16] = new comefrom("河南","郑州|开封|洛阳|平顶山|安阳|鹤壁|新乡|焦作|濮阳|许昌|漯河|三门峡|南阳|商丘|信阳|周口|驻马店|济源");
where[17] = new comefrom("湖北","武汉|宜昌|荆州|襄樊|黄石|荆门|黄冈|十堰|恩施|潜江|天门|仙桃|随州|咸宁|孝感|鄂州");
where[18] = new comefrom("湖南","长沙|常德|株洲|湘潭|衡阳|岳阳|邵阳|益阳|娄底|怀化|郴州|永州|湘西|张家界");
where[19] = new comefrom("广东","广州|深圳|珠海|汕头|东莞|中山|佛山|韶关|江门|湛江|茂名|肇庆|惠州|梅州|汕尾|河源|阳江|清远|潮州|揭阳|云浮");
where[20] = new comefrom("广西","南宁|柳州|桂林|梧州|北海|防城港|钦州|贵港|玉林|南宁地区|柳州地区|贺州|百色|河池");
where[21] = new comefrom("海南","海口|三亚");
where[22] = new comefrom("四川","成都|绵阳|德阳|自贡|攀枝花|广元|内江|乐山|南充|宜宾|广安|达川|雅安|眉山|甘孜|凉山|泸州");
where[23] = new comefrom("贵州","贵阳|六盘水|遵义|安顺|铜仁|黔西南|毕节|黔东南|黔南");
where[24] = new comefrom("云南","昆明|大理|曲靖|玉溪|昭通|楚雄|红河|文山|思茅|西双版纳|保山|德宏|丽江|怒江|迪庆|临沧");
where[25] = new comefrom("西藏","拉萨|日喀则|山南|林芝|昌都|阿里|那曲");
where[26] = new comefrom("陕西","西安|宝鸡|咸阳|铜川|渭南|延安|榆林|汉中|安康|商洛");
where[27] = new comefrom("甘肃","兰州|嘉峪关|金昌|白银|天水|酒泉|张掖|武威|定西|陇南|平凉|庆阳|临夏|甘南");
where[28] = new comefrom("宁夏","银川|石嘴山|吴忠|固原");
where[29] = new comefrom("青海","西宁|海东|海南|海北|黄南|玉树|果洛|海西");
where[30] = new comefrom("新疆","乌鲁木齐|石河子|克拉玛依|伊犁|巴音郭勒|昌吉|克孜勒苏柯尔克孜|博尔塔拉|吐鲁番|哈密|喀什|和田|阿克苏");
where[31] = new comefrom("香港","");
where[32] = new comefrom("澳门","");
where[33] = new comefrom("台湾","台北|高雄|台中|台南|屏东|南投|云林|新竹|彰化|苗栗|嘉义|花莲|桃园|宜兰|基隆|台东|金门|马祖|澎湖");
where[34] = new comefrom("其它","北美洲|南美洲|亚洲|非洲|欧洲|大洋洲");

countryLis = Array( "阿联酋","巴林","埃及","以色列","伊朗","黎巴嫩","阿曼","沙特阿拉伯","阿尔及利亚","摩洛哥","毛里求斯","突尼斯","南非","象牙海岸","澳大利亚","新西兰","智利","加拿大","墨西哥","美国","波兰","捷克","斯洛伐克","匈牙利","奥地利","比利时","瑞士","德国","丹麦","西班牙","芬兰","法国","英国","希腊","爱尔兰","冰岛","意大利","卢森堡","土耳其","瑞典","葡萄牙","挪威","荷兰","摩洛哥","马耳他","塞普洛斯","波斯尼亚和黑塞哥维那","保加利亚","白俄罗斯","爱沙尼亚","克罗地亚","匈牙利","立陶宛","拉托维亚","摩尔多瓦","罗马尼亚","俄罗斯","斯洛文尼亚","亚美尼亚","阿塞拜疆","乌克兰","塞尔维亚","乌兹别克斯坦","吉尔吉斯斯坦","哈萨克斯坦","斯里兰卡","马来西亚","菲律宾","新加坡","泰国","中国","日本","香港","台湾");

var uid ='';
var lang = '';
var userClient = new PHPRPC_Client( 'http://118.184.23.233/memberRPC/phprpcClass/UserData.class.php', [ 'linkMasterServer','getGongGao','userInfo','userBill','getResults','getPayType','depositOnlineStep1','depositOnlineStep2','withdrawalStep2','getBankListAndMoneyCode','getCompanyBankAccount','selectUserBankAccount', 'getPromotionDescription','getApplBonusFormData','getBankListAndLocking' ] );
var userOrderClient = new PHPRPC_Client( 'http://118.184.23.233/memberRPC/phprpcClass/userOrder.class.php', ['showOrderRow', 'userReport'] );
var Interface = new PHPRPC_Client( 'http://118.184.23.233/memberRPC/phprpcClass/interface.class.php', ['serverInterface']);
var withdrawal = { 'DQ': 0, 'YX':0, 'CP':0,'minMoney': 0, 'maxMoney':0 };
var withdrawalPOST = {};
var deposit = { 'minMoney': 0, 'maxMoney':0 };
var depositPOST = {};
var withdrawalUserData = {};
var depostitUserData = {};
var isNewBank = 0;
var PromID = '';
function select(str) {

    with( $b( str +'_province' ) ) { var loca2 = options[selectedIndex].value; }
    for(i = 0;i < where.length;i ++) {
        if (where[i].loca == loca2) {
            loca3 = (where[i].locacity).split("|");
            for(j = 0;j < loca3.length;j++) { with(  $b( str +'_city' ) ) { length = loca3.length; options[j].text = loca3[j]; options[j].value = loca3[j]; var loca4=options[selectedIndex].value;}}
            break;
        }}

}

function init( str ) {

    with( $b( str+'_province' ) ) {
        length = where.length;
        for(k=0;k<where.length;k++) {
            options[k].text = where[k].loca;
            options[k].value = where[k].loca;
            if( k == 0 ) options[k].value = 0;
        }
        options[selectedIndex].text = where[0].loca;
        options[selectedIndex].value = where[0].loca;
    }

    with( $b( str+'_city' ) ) {
        loca3 = (where[0].locacity).split("|");
        length = loca3.length;
        for(l=0;l<length;l++) {
            options[l].text = loca3[l];
            options[l].value = loca3[l];
            if( l == 0 ) options[l].value = 0;
        }
        options[selectedIndex].text = loca3[0]; options[selectedIndex].value = loca3[0];
    }

}

//用户未结算注单
function showOrderRow( js_flag, game_time ){

    POST = {
        'uid': getCookie('uid'), 'lang': getCookie('lang'),
        'js_flag': js_flag,
        'game_time': game_time
    }
    userOrderClient.showOrderRow( POST, function ( result, args, output, warning ){
        if(output)alert(output);
        if( js_flag == 0  ){
            $b('about1').innerHTML = '<div class="menuUL129Box" style="overflow: hidden;"></div>'+result.html;
            Csh['menuHtml']({dq: '体育场', pc: '快乐彩'}, 'dq', '#about1 .menuUL129Box', function (){
                getUserOrderCP();
            });
        }else{
            $b('about2').innerHTML = result.html;
        }



    }, true);

}

//用户报表
function userReport( YM ){

    POST = {
        'uid': getCookie('uid'),'lang': getCookie('lang'),
        'YM': YM
    };
    userOrderClient.userReport( POST, function ( result, args, output, warning ){
        if( output ) alert( output );
        if( !result ) return;
        $b('about2').innerHTML = '<div class="menuUL129Box" style="overflow: hidden;"></div>'+result.html;

        Csh['menuHtml'](result['ymObj'], YM, '#about2 .menuUL129Box', function (){
            userReport( $(arguments[0]).attr('name') );
        });


    }, true);

}

//用户资料
function userInfo(){

    post = {'uid': getCookie('uid'),'lang': getCookie('lang')};
    userClient.userInfo( post, function ( result, args, output, warning ){

        if( !result ) return;
        eval( 'result = '+ result );
        var html = '<div class="shadow"><div class="title">用户基本资料</div>';
        html += '<div class="main-content clearfix">';
        html += '<p >'+ UI.ZhangHuMingCheng +': '+ result.userInfo['u_name'] +'</p>';
        html += '<p >'+ UI.ZhangHuMingCheng +': '+ result.userInfo['u_name'] +'</p>';
        html += '<p >'+ UI.ZhangHuXingMing +': '+ result.userInfo['u_xm'] +'</p>';
        html += '<p >'+ UI.NiCheng +': '+ result.userInfo['u_nickname'] +'</p>';
        html += '<p >出生日期:';
        if( result.userInfo['u_birthday'] ){
            html += result.userInfo['u_birthday'] +'</p>';
        }else{
            html += '<button href="javascript:void(0)" onclick="updateBirthday()">补充</button></p>';
        }
        html += '<p >'+ UI.DengLuMiMa +':<button onclick="changePassword(1)">'+ UI.XiuGaiDengLuMiMa +'</button></p>';
        html += '<p >'+ UI.TiKuanMiMa +':<button onclick="changePassword(2)">'+ UI.XiuGaiTiKuanMiMa +'</button></p>';
        html += '</div></div>';

        html += '<div class="shadow"><div class="title">账户余额</div><div class="main-content clearfix">';
        html += '<p >'+ UI[1002] +': '+ result.userInfo['u_money_dq'];
        if( result.userInfo['u_ymoney_dq'] > 0 ) html += '<span style="color:#999"> '+ UI[1003] +' '+ result.userInfo['u_ymoney_dq'] +'</span>';
        html += ' <button onclick="bonus_account_type = \'dq\';menuTab3.setActiveTab(6)">申请体育场优惠</button></p>';
        html += '<p >'+ UI[1005] +': '+ result.userInfo['u_money_cp'];
        if( result.userInfo['u_ymoney_cp'] > 0 ) html += '<span style="color:#999"> '+ UI[1003] +' '+ result.userInfo['u_ymoney_cp'] +'</span>';
        html += ' <button onclick="bonus_account_type = \'cp\'; menuTab3.setActiveTab(6)">申请快乐彩优惠</button></p>';
        html += '<p >'+ UI[1004] +': '+ result.userInfo['u_money_yx'];
        if( result.userInfo['u_ymoney_yx'] > 0 ) html += '<span style="color:#999"> '+ UI[1003] +' '+ result.userInfo['u_ymoney_yx'] +'</span>';
        html += ' <button onclick="bonus_account_type = \'yx\';menuTab3.setActiveTab(6)">申请娱乐场优惠</button></p>';
        html += '</div></div>';

        html += '<div class="shadow"><div class="title">用户联系信息</div><div class="main-content clearfix">';
        html += '<p >'+ UI.DianYouDiZhi +':'+ result.userInfo['u_email'] +'</p>';
        html += '<p >'+ UI.GuoJiaDiQu +':'+ result.userInfo['u_country'] +'</p>';
        html += '<p >'+ UI.DiZhi +':'+ result.userInfo['u_address'] +'</p>';
        html += '<p >'+ UI.ChengShiSheng +':'+ result.userInfo['u_city'] +'</p>';
        html += '<p >'+ UI.YouZhengBianHao +':'+ result.userInfo['u_zip_code'] +'</p>';
        html += '<p >'+ UI.LianXiDianHua +':'+ result.userInfo['u_tel'] +'</p>';
        html += '<p >'+ UI.ShangCiDengLuIP +':'+ result.userInfo['curr_login_ip'] +'</p>';
        html += '<p >'+ UI.ShangCiDengLuShiJian +':'+ result.userInfo['curr_login_time'] +'</p>';
        html += '</div></div>';

        //申请优惠
        if(  result.coupon ){
            html += '<div class="shadow"><div class="title">用户联系信息</div><div class="main-content clearfix">';
            html += '<table><thead>';
            html += '<tr bgcolor="#FFFFFF">';
            html += '<th>'+ UI[1007] +'</th>';
            html += '<th>'+ UI[1008] +'</th>';
            html += '<th>'+ UI[1009] +'</th>';
            html += '<th>'+ UI[1010] +'</th>';
            html += '<th>'+ UI[1011] +'</th>';
            html += '</tr></thead><tbody>';
            for( id in result.coupon ){
                row = result.coupon[id];
                html += '<tr>';
                html += '<td>'+ row['name'] +'</td>';
                html += '<td>'+ row['money_2'] +'</td>';
                html += '<td>'+ row['time_1'] +'</td>';
                html += '<td>'+ row['status'] +'</td>';
                html += '<td>'+ row['description'] +'</td>';
                html += '</tr>';
            }
            html += '</tbody></table>';
        }

        //银行账户
        html += '<div class="shadow"><div class="title">已绑定的提款银行账户</div><div class="main-content clearfix">';
        if( typeof( result.sameNameBankAccount ) == 'object' ){
            html += '<p >'+ UI.YinHangMingCheng +':'+ result.sameNameBankAccount['bank_name'] +'</p>';
            html += '<p >'+ UI.KaiHuZhiHang +':'+ result.sameNameBankAccount['bank_addr'] +'</p>';
            html += '<p >'+ UI.YinHangZhangHao +':'+ result.sameNameBankAccount['bank_no'] +'</p>';
            html += '<p >'+ UI.ZhangHuXingMing +':'+ result.sameNameBankAccount['bank_pers'] +'</p>';
            html += '<p >'+ UI.BangDingZhangHu +':';
            if( result.sameNameBankAccount['locking'] == 1 ) html += UI.Shi;
            html += '</p>';
        }else{
            html += '<p><button><a href="./index.php?tabID=4">绑定银行账户</a></button></p>';
        }
        $b('about0').innerHTML = html;
    }, true);

}


//绑定银行账户
function bankNoLocking(id){

    var POST = {
        'updateID': 1018,
        'uid': getCookie('uid'),'lang': getCookie('lang'),
        'user_bank_account_id':id,
        'locking':1
    }
    if(!confirm('绑定为提款银行账户后，將不可隨意更改，确定要將此账户绑定为提款账户？')) return;

    userClient.linkMasterServer( POST, function ( result, args, output, warning ) {
        if(output)alert(output);
        if( parseInt( result.flagID) == 7777 ){
            alert( '提款银行账户绑定成功！' );
            userInfo();
        }else{
            alert( UI.ID10002 );
        }

    }, true);

}


//交易账单
function userBill( YM ){

    POST = {
        'uid': getCookie('uid'),'lang': getCookie('lang'),
        'YM': YM
    }

    userClient.userBill( POST, function ( result, args, output, warning ){
        if( output ) alert(output);
        if( !result ) return;
        $b('about3').innerHTML = '<div class="menuUL129Box" style="overflow: hidden;"></div>'+result.html;
        Csh['menuHtml'](result['ymObj'], YM, '#about3 .menuUL129Box', function (){
            userBill( $(arguments[0]).attr('name') );
        });
    }, true);

}

//赛果
function getResults(){

    POST = {'uid': getCookie('uid'),'lang': getCookie('lang')};
    if( $b('game_lx') ) { POST.game_lx = $b('game_lx').value; }else{ POST.game_lx = 1; }
    if( $b('game_time') ) POST.game_time = $b('game_time').value;
    if( $b('resultid') ){ POST.resultid = $b('resultid').value; }else{ POST.resultid = 1; }

    userClient.getResults( POST, function ( result, args, output, warning ) {
        //if(warning)alert(warning);
        if(output)alert(output);
        $b('about7').innerHTML = '<div class="menuUL129Box"></div>'+result;
        Csh['menuHtml']({dq: '体育场', pc: '快乐彩'}, 'dq', '#about7 .menuUL129Box', function (){
            getResultCP();
        });

    }, true);

}

//绑定账户
function lockingBankAccout( bankSelect ){
    var html = '';
    html += '<fieldset class="fieldset2" id="lockingBankAccout">';
    html += '<legend>为了您的资金安全，请先绑定银行卡</legend>';
    html += '<table class="fromTable">';
    html += '<tr><td colspan="3"><span class="alertImg"></span><span class="alertInfo">请确保姓名及账户信息的正确性、真实性, 一旦绑定后将不能更改</span></td></tr>';
    html += '<tr><td class="titleTD">银行名称:</td><td><select id="bank_code" name="bank_code"><option value="">银行列表</option>'+ bankSelect +'</select></td><td></td></tr>';
    html += '<tr><td class="titleTD">开户支行:</td><td><input id="bank_addr" name="bank_addr" type="text" /></td><td></td></tr>';
    html += '<tr><td class="titleTD">账户姓名:</td><td><input id="bank_pers" name="bank_pers" type="text" /></td><td></td></tr>';
    html += '<tr><td class="titleTD">银行卡号:</td><td><input id="bank_no" name="bank_no" type="text" /></td><td></td></tr>';
    html += '<tr><td></td><td><button type="button" class="mainBtn01"/>保存</button></td><td></td></tr>';
    html += '</table>';
    html += '</fieldset>';
    $b('about4').innerHTML = html;

    $('#lockingBankAccout button').click( function () {

        var post = {
            'uid': getCookie('uid'),'lang': getCookie('lang'), 'updateID':1018,
            'bank_code': $('#lockingBankAccout #bank_code').val(),
            'bank_name': $("#bank_code").find("option:selected").text(),
            'bank_addr': $('#lockingBankAccout #bank_addr').val(),
            'bank_pers': $('#lockingBankAccout #bank_pers').val(),
            'bank_no': $('#lockingBankAccout #bank_no').val()
        }

        if( post['bank_code'] == '' ){ alert('请选择银行名称！'); return;}
        if( post['bank_addr'] == '' ){ alert('请填写开户支行！'); return;}
        if( post['bank_pers'] == '' ){ alert('请填写账户姓名！'); return;}
        if( post['bank_no'] == '' ){ alert('请填写银行卡号！'); return;}

        userClient.linkMasterServer( post, function ( result, args, output, warning ) {
            if( output ) alert(output);
            if( parseInt( result.flagID) == 7777 ){
                alert('银行卡绑定成功!');
                getPayType();
            }else{
                alert('银行卡绑定失败!');
            }
        }, true);

    });

}


//存款第一步
function getPayType(){

    post = {'uid': getCookie('uid'),'lang': getCookie('lang')};
    userClient.getPayType( post, function ( result, args, output, warning ) {
        if( output ) alert(output);
        if( !result ) return;
        depostitUserData = result;
        depostitUserData['account_type'] =  getCookie('account_type');

        //绑定银行账户
        if( parseInt(result['locking']) != 1 ){
            lockingBankAccout( result['bankSelect']	);
        }else{
            var html = '';
            var accountTypeChecked = {};
            accountTypeChecked[getCookie('account_type')]= ' checked="checked" ';
            //账户信息
            html += '<fieldset class="fieldset1">';
            html += '<legend>体育场</legend>';
            html += '<p>'+ UI[1013] +': '+ depostitUserData.u_money_dq +'</p>';
            html += '<p>'+ UI[1014] +': '+ depostitUserData.bet_money_dq +'</p>';
            html += '<p>'+ UI[1015] +': '+ depostitUserData.u_nbmoney_dq +'</p>';
            html += '<p><label><input id="deposit_account_type" name="deposit_account_type" type="radio" value="dq" '+ accountTypeChecked['dq'] +'/>'+ UI[1026] +'</label></p>';
            html += '</fieldset>';

            html += '<fieldset class="fieldset1">';
            html += '<legend>快乐彩</legend>';
            html += '<p>'+ UI[1013] +': '+ depostitUserData.u_money_cp +'</p>';
            html += '<p>'+ UI[1014] +': '+ depostitUserData.bet_money_cp +'</p>';
            html += '<p>'+ UI[1015] +': '+ depostitUserData.u_nbmoney_cp +'</p>';
            html += '<p><label><input id="deposit_account_type" name="deposit_account_type" type="radio" value="cp" '+ accountTypeChecked['cp'] +'/>'+ UI[1028] +'</label></p>';
            html += '</fieldset>';

            html += '<fieldset class="fieldset1">';
            html += '<legend>娱乐场</legend>';
            html += '<p>'+ UI[1013] +': '+ depostitUserData.u_money_yx +'</p>';
            html += '<p>'+ UI[1014] +': '+ depostitUserData.bet_money_yx +'</p>';
            html += '<p>'+ UI[1015] +': '+ depostitUserData.u_nbmoney_yx +'</p>';
            html += '<p><label><input id="deposit_account_type" name="deposit_account_type" type="radio" value="yx" '+ accountTypeChecked['yx'] +' disabled="disabled"/>'+ UI[1027] +'</label></p>';
            html += '</fieldset>';


            if( depostitUserData.payType2 == 1 ){//在线支付
                html += '<fieldset class="fieldset2">';
                html += '<legend>'+ UI.ZaiXianZhiFu +'</legend>';
                html += '<div id="imgPay01" onclick="depositOnlineStep1()"></div>';
                html += '<div class="cunKuanShuoMing">';
                html += '<a class="btn" href="javascript:void(0)" onclick="depositOnlineStep1()">'+ UI.ZaiXianZhiFu01 +'(在线支付)</a>';
                html += '<p>'+ UI.ZaiXianZhiFu02 +'</p>';
                html += '<p>'+ UI.ZaiXianZhiFu03 +'</p>';
                html += '<p>'+ UI.ZaiXianZhiFu04 +'</p>';
                html += '</div>';
                html += '</fieldset>';
            }

            if( depostitUserData.payType1 == 1 ){//银行转账
                html += '<fieldset class="fieldset2">';
                html += '<legend>'+ UI.YinHangZhuanZhang +'</legend>';
                html += '<div id="imgPay02" onclick="depositUnlineStep1()"></div>';
                html += '<div class="cunKuanShuoMing">';
                html += '<a class="btn" href="javascript:void(0)"  onclick="depositUnlineStep1()">'+ UI.YinHangZhuanZhang01 +'(快捷转账)</a>';
                html += '<p>'+ UI.YinHangZhuanZhang02 +'</p>';
                html += '<p>'+ UI.YinHangZhuanZhang03 +'</p>';
                html += '<p>'+ UI.YinHangZhuanZhang04 +'</p>';
                html += '</div>';
                html += '</fieldset>';
            }

            //网内转账
            html += '<fieldset class="fieldset2">';
            html += '<legend>网内互转</legend>';
            html += '<div id="imgPay03" onclick="internalTran1()"></div>';
            html += '<div class="cunKuanShuoMing">';
            html += '<a class="btn" href="javascript:void(0)" onclick="internalTran1()">网内游戏场互转</a>';
            html += '<p>即时到帐, 不收取任何费用</p>';
            html += '<p>如果转出账户当前已享受了红利,且未完成流水时不可以进行出账操作。</p>';
            html += '</div>';
            html += '</fieldset>';
            $b('about4').innerHTML = html;

            $('#about4 .fieldset1 input[type="radio"]').click( function(){
                depostitUserData['account_type'] = $(this).val();
            });
        }


    }, true);

}


//提款提示
function depositOnlineStep1Alert(){

    if( depostitUserData['u_nbmoney_'+ depostitUserData['account_type']] > 0 &&  parseInt( depostitUserData['u_money_'+depostitUserData['account_type']] ) > parseInt(depostitUserData.maxLiushui) ){
        var alertMSG = ( depostitUserData['account_type'] == 'dq')?( UI[1012]+UI[1019] ):( UI[1017]+UI[1019]);
        if( !confirm( alertMSG )) return false;
    }
    return true;

}

//网内转账第一步
function internalTran1(){

    var listStr = '<option value="dq">体育场</option><option value="cp">快乐彩</option><option value="yx">娱乐场</option></select>';
    var html = '<span class="fromTable"><p class="pTitle1">网內账户互转</p>';
    html += '<p class="pLable">出账账户:<br/><select id="fromAccount">'+ listStr +'</p>';
    html += '<p class="pLable">入账账户:<br/><select id="toAccount">'+ listStr +'</p>';
    html += '<p class="pLable">转账金额:<br/><input id="tranMoney" name="depositMoney" type="text" onKeyPress="return CheckKey(event)"/></p>';
    html += '<p class="pTitle1"><button type="button" class="mainBtn01" onclick="internalTran2()">下一步</button><br/></p>';
    html += '<p class="pDesc">溫馨提示: <br/>';
    html += '如果转出账户当前已享受了红利,且未完成流水时不可以进行出账操作.<br/>';
    html += '没享受红利时，体育场账户、快乐彩账户、娱乐场账户可以随意互相转账<br/>';
    html += '转出账户已完成流水时，转入账户不需累加水流<br/>';
    html += '</p></span>';
    $('#about4').html(html);

}

//网内转账第二步
function internalTran2(){

    var html = '<p class="pTitle1">系统提示信息</p>';
    var post = {
        'uid': getCookie('uid'),'lang': getCookie('lang'), 'updateID':1013,
        'fromAccount':$('#fromAccount').val(),
        'toAccount':$('#toAccount').val(),
        'tranMoney':$('#tranMoney').val()
    };

    if(post['fromAccount'] == post['toAccount'] ){ alert('请选择不同的出账及入账户口'); return;}
    if( parseInt(post['tranMoney']) <= 0 ){ alert('请输入转账金额！'); return;}
    userClient.linkMasterServer( post, function ( result, args, output, warning ) {
        if( output ) alert(output);
        if( !result ) return;
        switch( parseInt( result.flagID ) ){
            case 7777 :
                html += '<p class="pTitle1">网内转账成功</p>';
                html += '<p class="pDesc">详情请查看<a class="btn" href="index.php?tabID=3">交易账单</a>, 如有问题请联系在线客服。</p>';
                break;
            case 1013001: html += '<p class="pDesc">很抱歉,此项目暂未接受相关款项操作！'; break;
            case 1013002: html += '<p class="pDesc">出账账户与入账账户不可相同！'; break;
            case 1013003: html += '<p class="pDesc">很抱歉, 转账金额不合法！'; break;
            case 1013004: html += '<p class="pDesc">出款账户当前参加了红利活动,且尚未完成水流，所以无法进行转账操作！'; break;
            case 1013005: html += '<p class="pDesc">出款账户余额不足！'; break;
            case 1013006: html += '<p class="pDesc">特别提示：体验币不可用于转账及提款！'; break;
            default:
                html += '<p class="pTitle1">很抱歉，与服务器连接超时</p>';
                html += '<p class="pDesc">由于网路原因，有可能造成本次操作出現异常。</p>';
                html += '<br/>到账详情请查看<a class="btn" href="index.php?tabID=3">交易账单</a>, 如有问题请联系在线客服。</p>';
                $b('about4').innerHTML = html;
                break;
        }
        $b('about4').innerHTML = html;
    }, true);

}

//在线支付第一步
function depositOnlineStep1(){

    var accountTypeChecked = {};
    accountTypeChecked[depostitUserData['account_type']]= ' selected="selected" ';
    if( depositOnlineStep1Alert() == false ) return;	//确认提示

    post = {
        'uid': getCookie('uid'),'lang': getCookie('lang'),
        'account_type':depostitUserData['account_type']
    };

    userClient.depositOnlineStep1( post, function ( result, args, output, warning ) {
        if( output ) alert(output);
        if( !result ) return;
        deposit = result;
        var html = '<form id="onlineDepositForm" target="_blank" method="POST">';

        html += '<sapn class="fromTable">';
        html += '<p class="pTitle1">'+ UI.ZaiXianZhiFu +'</p>';
        html += '<p class="pLable">'+ UI.HuoBiZhongLei +':<br/>' +'<input name="" type="text" value="RMB" disabled="disabled"/></p>';
        html += '<p class="pLable">'+ UI[1020] +':<br/><select id="depositOnlineAccountType" name="depositOnlineAccountType" onchange="getPromList(this.value,\'\')"><option value="dq" '+ accountTypeChecked['dq'] +'>'+ UI[1012] +'</option><option value="cp" '+ accountTypeChecked['cp'] +'>'+ UI[1017] +'</option></select></p>';
        html += '<p class="pLable">'+ UI.YinHangMingCheng +':<br/>';
        html += '<select id="depositOnline_bank_code" name="depositOnline_bank_code">'+result.bankSelect +'</select></p>';
        html += '<p class="pLable">'+ UI.CunKuanJinE +':<br/>';
        html += '<input id="depositOnlineMoney" name="depositOnlineMoney" type="text" onKeyPress="return CheckKey(event)"/><span class="spanDesc" >'+ UI[1029] +':'+ result.minMoney +'; '+ UI[1030] +':'+ result.maxMoney +'</span></p>';
        if( deposit.promList ){
            html += '<p class="pTitle1">申请存款红利</p>';
            html += '<p class="pLable">优惠项目:</p>';
            html += '<p><lable><input id="depositOnline_prom_id" name="depositOnline_prom_id" type="radio" value="0" checked="checked" onclick="getPromotionDescription(this.value,\'deposit_prom_id_DescBox\')"/>不申请优惠</lable>';
            html += deposit.promList +'</p>';
            html += '<p class="pDesc" id="depositOnline_prom_id_DescBox"></p>';
            html +='<p class="pDesc"><b>申请优惠须知</b>: 申请优惠提交后，可前往<a href="index.php?tabID=0">账户资料</a>中查看申请审核情況，审核程序將在24小时内完成。<br/>请务必填写用户真实资料，每一地址用户只能一次申请，重复申请将被取消资格。<br/>如果审核不予通过，將不另行通知，不做任何解析！</p>';
        }
        html += '<p id="toPayBox"><br/><input id="uid" name="uid" type="hidden"/><button type="button" class="mainBtn01" onclick="depositOnlineStep2()">下一步</button></p>';
        html += '</sapn>';
        $('#about4').html(html);

        $('#about4 #depositOnlineAccountType').change( function(){
            depostitUserData['account_type'] = $('#about4 #depositOnlineAccountType option:selected').val();
            depositOnlineStep1();
        });

    }, true);

}


//在线支付第二步
function depositOnlineStep2(){

    var POST = {
        'uid': getCookie('uid'),'lang': getCookie('lang'),
        'account_type': $('#depositOnlineAccountType').val(),
        'money': $('#depositOnlineMoney').val(),
        'bank_code': $('#depositOnline_bank_code').val()
    };

    if( $b('deposit_prom_id') ) depositPOST.prom_id = $b('deposit_prom_id').value;
    if( $('#depositOnlineMoney').val() == '' ){ alert( '请输入存款金额！' ); return;}
    if( parseInt( POST.money, 10 ) < deposit.minMoney ){ alert( UI[1021]+deposit.minMoney ); return;}
    if( parseInt( POST.money, 10 ) > deposit.maxMoney ){ alert( UI[1022]+deposit.maxMoney ); return;}


    //确定使用哪个银行接口,使用哪个网址访问
    userClient.depositOnlineStep2( POST, function ( result, args, output, warning ) {
        if(output) alert(output);
        if( result.flagID == 7777 ){

            var url = result.shop_addr + '?uid='+POST['uid']+'&depositOnlineAccountType='+ POST['account_type'] +'&depositOnlineMoney='+POST['money']+'&depositOnline_bank_code='+POST['bank_code']+'&depositOnline_prom_id='+PromID;
            var html = '<p class="pDesc">溫馨提示: <br/>';
            html += '请点击"去付款"按钮，并在新打开的页面上完成付款.<br/>';
            html += '在您付款完成后,系统將会在10分钟內自动为你充值，到账情況请前往<a class="btn" href="./index.php?tabID=3">交易账单</a>查看, 如有问题请联系在线客服！<br/>';
            html += '</p>';
            html += '<p class="pTitle1"><a href="'+ url +'" id="toPayLink" class="mainBtn01" target="_new" style="padding:5px 25px">去付款<a/></p>';
            $('#toPayBox').html(html);

            $('#depositOnlineAccountType').attr({'disabled':true});
            $('#depositOnline_bank_code').attr({'disabled':true});
            $('#depositOnlineMoney').attr({'disabled':true});

            $('#toPayLink').click( function(){
                //setTimeout( $(this).attr({'href':'#'}), 10000);
            });
        }else{
            //支付接口维护
            alert(UI[1023]);
            getPayType();
        }
    }, true);
}

//线下转账第一步( 填写金额，提价存款信息 )
function depositUnlineStep1(){

    var accountTypeChecked = {};
    accountTypeChecked[depostitUserData['account_type']]= ' selected="selected" ';
    if( depositOnlineStep1Alert() == false ) return;	//确认提示
    post = {
        'uid': getCookie('uid'),'lang': getCookie('lang'),
        'account_type':depostitUserData['account_type']
    };

    userClient.getBankListAndMoneyCode( post, function ( result, args, output, warning ) {
        if( !result ) return;
        deposit = result;
        var html = '<sapn class="fromTable">';
        html += '<p class="pTitle1">账户选择及存入金额</p>';
        html += '<p class="pLable">'+ UI.HuoBiZhongLei +':<br/>' +'<input name="" type="text" value="'+ result.u_money_code +'" disabled="disabled"/></p>';
        html += '<p class="pLable">'+ UI[1020] +':<br/><select id="deposit_account_type" name="deposit_account_type"><option value="dq" '+ accountTypeChecked['dq'] +'>'+ UI[1012] +'</option><option value="cp" '+ accountTypeChecked['cp'] +'>'+ UI[1017] +'</option></select></p>';
        html += '<p class="pLable">'+ UI.CunKuanJinE +':<br/> <input id="depositMoney" name="depositMoney" type="text" onKeyPress="return CheckKey(event)"/><span class="spanDesc">'+ UI[1031] +':'+ result.minMoney +'; '+ UI[1032] +':'+ result.maxMoney +'</span></p>';
        html += '<p><br/><button type="button" class="mainBtn01" onclick="menuTab3.setActiveTab(3)">上一步</button>';
        html += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" class="mainBtn01" onclick="depositUnlineStep2()">下一步</button></p>';
        html += '</sapn>';
        $b('about4').innerHTML = html;
        $('#about4 #deposit_account_type').change( function(){
            depostitUserData['account_type'] = $('#about4 #deposit_account_type option:selected').val();
            depositUnlineStep1();
        });

    }, true);

}

//选择存款银行，参加优惠
function depositUnlineStep2(){

    depositPOST = {
        'uid': getCookie('uid'),'lang': getCookie('lang'),
        'updateID': 1008,
        'bank_type': 1,	//1银行转帐 2网上第三方支付
        'money': $('#depositMoney').val(),
        'account_type':$('#deposit_account_type').val()
    };

    //存款金额
    if( depositPOST.money == '' || depositPOST.money == 0 ){ alert( UI.ID10251 ); return; }
    if( parseInt( depositPOST.money, 10 ) < deposit.minMoney ){ alert(  UI[1036]+deposit.minMoney ); return;}
    if( parseInt( depositPOST.money, 10 ) > deposit.maxMoney ){ alert( UI[1037]+deposit.maxMoney ); return;}


    var html = '<sapn class="fromTable">';
    if( deposit.bankAccount ){
        html += '<p class="pTitle1" id="deposit_title_box"><a href="javascript:void(0)" onclick="changeBankAccoun(this,0,\'deposit\')" style="background-color:#B55A00;color:#FFF" class="btn">最近使用过的银行账户</a><a href="javascript:void(0)" onclick="changeBankAccoun(this,1,\'deposit\')" class="btn">新增银行账户</a></p>';
        html += '<p class="pLable" id="deposit_xzyhBox">银行账户: <br/>';
        html += '<select id="deposit_user_bank_account_id" onchange="selectUserBankAccount(\'deposit\')">';
        html += deposit.bankAccount +'</select></p>';
    }else{
        html += '<p class="pTitle1">填写您的转账银行账户</p>';
    }
    html += '<p class="pLable">'+ UI.YinHangMingCheng +':<br/><select id="deposit_bank_code">'+ deposit.depositBankStr +'</select></p>';
    html += '<p class="pLable">'+ UI.KaiHuZhiHang +':<br/><input id="deposit_bank_addr" type="text" /></p>';
    html += '<p class="pLable">'+ UI.ZhangHuXingMing +':<br/><input id="deposit_bank_pers" type="text"/></p>';
    html += '<p class="pLable">'+ UI.YinHangZhangHao +':<br/><input id="deposit_bank_no" type="text" onkeypress="return CheckKey(event)"/></p>';
    html += '<p><br/><button type="button" class="mainBtn01" value="上一步" onclick="depositUnlineStep1()"/>上一步</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" class="mainBtn01" onclick="depositUnlineStep3()">下一步</button></p>';
    html += '</sapn>';
    $b('about4').innerHTML = html;
    if( deposit.bankAccount ) selectUserBankAccount('deposit');


}

//使用旧的银行账户
function changeBankAccoun( self, type, str ){

    isNewBank = type;
    if( isNewBank == 0 ){
        $('#'+ str +'_xzyhBox').show();
        selectUserBankAccount(str);
    }else if( isNewBank == 1 ){
        $('#'+ str +'_xzyhBox').hide();

        $('#'+str+'_bank_code').removeAttr('disabled');
        $('#'+str+'_bank_addr').removeAttr('disabled');
        $('#'+str+'_bank_pers').removeAttr('disabled');
        $('#'+str+'_bank_no').removeAttr('disabled');

        $('#'+ str +'_bank_addr').val('');
        if( str == 'deposit' ) $('#'+ str +'_bank_pers').val('');
        $('#'+ str +'_bank_no').val('');
    }
    $('#'+ str +'_title_box a').css("background-color","#FFF");
    $('#'+ str +'_title_box a').css("color","#B55A00");
    $('#'+ str +'_title_box a').css("font-size","12px");
    self.style.background = '#B55A00';
    self.style.color = '#FFF';
}


//参加存款优惠
function depositUnlineStep3(){
    if( isNewBank == 0 ) depositPOST['user_bank_account_id'] = $('#deposit_user_bank_account_id').val();
    depositPOST.bank_code = $('#deposit_bank_code').val();
    depositPOST.bank_addr = $('#deposit_bank_addr').val();
    depositPOST.bank_pers = $('#deposit_bank_pers').val();
    depositPOST.bank_no = $('#deposit_bank_no').val();

    //请填写完整银行信息; 或选择已有的银行账户
    if( depositPOST.bank_addr == '' ){ alert('请输入开户支行');return;}
    if( depositPOST.bank_pers == '' ){ alert('请输入银行账户姓名');return;}
    if( depositPOST.bank_no == '' ){ alert('请输入银行账号');return;}


    var html = '';
    if( deposit.promList ){
        html += '<p class="pTitle1">申请存款紅利</p>';
        html += '<p class="pLable">优惠项目:</p>';
        html += '<p><lable><input id="deposit_prom_id" name="deposit_prom_id" type="radio" value="0" checked="checked" onclick="getPromotionDescription(this.value,\'deposit_prom_id_DescBox\')"/>不申请优惠</lable>';
        html += deposit.promList +'</p>';
        html += '<span id="deposit_prom_id_DescBox"></span>';
        html += '<p><input type="button" class="bigBtn" value="上一步" onclick="depositUnlineStep2()"/> <input type="button" class="bigBtn" value="下一步" onclick="depositUnlineStep4()"/></p>';
        html +='<p class="pDesc"><b>申请优惠须知</b>: 申请优惠提交后，可在"账户资料"中查看申请审核情況，审核程序將在24小时内完成。<br/>请务必填写用户真实资料，每一地址用户只能一次申请，重复申请将被取消资格。<br/>如果审核不予通过，將不另行通知，不做任何解析！</p>';

        $b('about4').innerHTML = html;
    }else{
        depositUnlineStep4();
    }
}




//收集优惠ID
function depositUnlineStep4(){
    //参加优惠
    if( $(':radio[name="deposit_prom_id"]:checked').val() > 0 ){
        depositPOST.prom_id = $(':radio[name="deposit_prom_id"]:checked').val();
    }

    depositUnlineStep5();

}

//生成公司银行信息
function depositUnlineStep5(){

    userClient.linkMasterServer( depositPOST, function ( result, args, output, warning ) {
        if(output)alert(output);
        depositPOST['id'] = result['id'];
        depositPOST['money'] = result['money'];
        //分配账户
        var html = '<sapn class="fromTable"><p class="pTitle1">公司入账银行卡号信息</p>';
        html += '<p class="pLable">'+ UI.YinHangMingCheng +': <span class="spanDesc">'+ result['comp_bank_name'] +'</span></p>';
        html += '<p class="pLable">'+ UI.KaiHuZhiHang +': <span class="spanDesc">'+ result['comp_bank_pcity'] +'</span></p>';
        html += '<p class="pLable">'+ UI.ZhangHuXingMing +': <span class="spanDesc">'+ result['comp_bank_pers'] +'</span></p>';
        html += '<p class="pLable">'+ UI.YinHangZhangHao +': <span class="spanDesc">'+ result['comp_bank_no'] +'</span></p>';
        html += '<p class="pLable">'+ UI.ZhiDingCunKuanJinE +': <span class="spanDesc"><b>'+ result['money'] +'</b></span></p>';
        html += '<p class="pLable">'+ UI.WangShangYinHangWangZhi +':<span><a class="btn" href="'+ result['netBankLink'] +'" target="_blank" >进入“'+ result['user_bank_name'] +'”网上银行</a></span></p>';
        html += '<p class="pDesc">溫馨提示：<br/>';
        html += '1. '+ UI.YinHangZhuanZhang08 +'</br>';
        html += '2. '+ UI.YinHangZhuanZhang09 +'</br>';
        html += '3. '+ UI.YinHangZhuanZhang10 +'</br>';
        html += '4. '+ UI.YinHangZhuanZhang11 +'</br>';
        html += '5. 请确认您已通过网上银行或ATM转账成功后才进行“下一步”操作</p>';
        html += '<p><br/><button type="button" class="mainBtn01"  onclick="depositUnlineStep6()">下一步</button></p>';
        html += '</span>';
        $('#about4').html(html);
    }, true);

}


//提交存款申请
function depositUnlineStep6(){

    if( !confirm( '请确认您的申请款项：'+ depositPOST.money +'元; \n\n已成功转入本公司的银行账户?' ) ) return;
    $('#about4').html('<p class="pDesc">数据装载中……</p>');
    userClient.linkMasterServer( {'updateID':1014,'id':depositPOST['id'],'uid':getCookie('uid')}, function ( result, args, output, warning ) {

        //console.log(result);

        if( output ) alert(output);
        if( parseInt( result['status'] ) == 7777 ){
            html = '<p class="pTitle1">存款申请完毕</p>';
            html += '<p class="pDesc">溫馨提示: <br/>'+ UI.YinHangZhuanZhang12;
            html += '<br/>详情请查看<a class="btn" href="./index.php?tabID=3">交易账单</a>, 如有问题请联系在线客服。</p>';
        }else{
            html = '<p class="pTitle1">很抱歉！连接超时</p>';
            html += '<p class="pDesc">由于网路数据传输原因，有可能造成本次操作出現异常。</p>';
            html += '<br/>详情请查看<a class="btn"  href="./index.php?tabID=3">交易账单</a>, 如有问题请联系在线客服。</p>';
        }
        $b('about4').innerHTML = html;
    }, true);

}

//存款确认
function depositUnlineConfirm(id){

    if( !confirm( '请确认您的申请款项已成功转入本司账户?' ) ) return;
    userClient.linkMasterServer( {'updateID':1014,'id':id,'uid':getCookie('uid')}, function ( result, args, output, warning ) {
        if(  parseInt( result['status'] ) == 7777 ){
            alert('存款确认已提交，我们将在10分钟内为您到账。请耐心等待！');
        }else{
            alert('很抱歉！操作失败！\n由于网路数据传输原因，有可能造成本次操作出現异常.\n如有问题请联系在线客服');
        }
    }, true);

}



//选择已有的用户银行账户
function selectUserBankAccount( str ){

    POST = {
        'uid': getCookie('uid'),'lang': getCookie('lang'),
        'user_bank_account_id': $b( str+'_user_bank_account_id').value
    };

    userClient.selectUserBankAccount( POST, function ( result, args, output, warning ) {

        $('#'+str+'_bank_code').val( result.bank_code );
        $('#'+str+'_bank_code').attr({'disabled':'disabled'});
        $('#'+str+'_bank_addr').val( result.bank_addr );
        $('#'+str+'_bank_addr').attr({'disabled':'disabled'});
        $('#'+str+'_bank_pers').val( result.bank_pers );
        $('#'+str+'_bank_pers').attr({'disabled':'disabled'});
        $('#'+str+'_bank_no').val( result.bank_no );
        $('#'+str+'_bank_no').attr({'disabled':'disabled'});

    }, true);

}

//提款第一步
function withdrawalStep1(){

    var html = '<fieldset class="fieldset2">';
    html += '<legend>我要提款</legend>';
    html += '<div id="imgPay02" onclick="withdrawalStep2()"></div>';
    html += '<div class="cunKuanShuoMing">';
    html += '<p><a class="btn" href="javascript:void(0)" onclick="withdrawalStep2()">'+ UI.TiKuan01 +'</a></p>';
    html += '<p>'+ UI.TiKuan02 +'</p>';
    html += '<p>'+ UI.TiKuan03 +'</p>';
    html += '</div>';
    html += '</fieldset>';
    $b('about5').innerHTML = html;

}

//提款第二步 (得到可以用于提款的银行账户)
function withdrawalStep2(){

    post ={ 'uid': getCookie('uid'),'lang': getCookie('lang'), 'payTye': 'withdrawal' };
    userClient.withdrawalStep2( post, function ( result, args, output, warning ) {

        if(output)alert(output);
        if( !result ) return;
        withdrawal = result;
        var tiKuan = 0;

        if( parseInt(result['is_experience']) == 1 ){
            var html = '<p class="pTitle1">系统提示信息</p>';
            html += '<p class="pDesc"><b>特别提示:</b> 体验币及其投注所产生的金额只作为试玩使用，不可以提取及交易</p>';
            $('#about5').html(html);
            return;
        }

        //账户信息
        var html = '<span class="fromTable"><p class="pTitle1">'+ UI[1018] +'</p>';
        html += '<p class="pLable">选择出款账户:<br/>';
        html += '<select id="withdrawal_account_type" onchange="changeAccountType(this.value)">';
        html += '<option value="dq">'+ UI[1012] +'</option>';
        html += '<option value="cp">'+ UI[1017] +'</option>';
        html += '<option value="yx">'+ UI[1016] +'</option>';
        html += '</select></p>';

        html += '<p class="pLable">'+ UI[1013] +': <br/><span class="spanDesc" id="u_money_box">'+ withdrawal.u_money_dq +'</span></p>';
        html += '<p class="pLable">'+ UI[1015] +': <br/><span class="spanDesc" id="u_nbmoney_box">'+ withdrawal.u_nbmoney_dq +'</span></p>';
        html += '<p id="submitBox"></p></span>';
        $('#about5').html(html);
        changeAccountType('dq');

    }, true);
}

//改变提款账户
function changeAccountType( account_type ){

    var html = '<span class="fromTable">';
    withdrawalPOST = {
        'uid': getCookie('uid'),'lang': getCookie('lang'),
        'updateID': 1012,
        'account_type':account_type,
    }

    $( '#u_money_box' ).html( withdrawal['u_money_'+account_type] );
    $( '#u_nbmoney_box' ).html( withdrawal['u_nbmoney_'+account_type] );

    //余额不足
    if( parseInt(withdrawal['u_money_'+account_type]) < withdrawal['minMoney'] ){
        $('#submitBox').html('');
        return;
    }

    //未完成流水并且申请了红利
    if( withdrawal['u_nbmoney_'+account_type] > 0 && withdrawal['u_money_bonus_'+account_type] > 0 ){
        html += '<p class="pDesc"><b>特别警示:</b> 因閣下申请了优惠红利, 完成水流后才能進行提款操作!</p>';
    }else{
        html += '<p class="pLable">'+ UI[1018] +': <br/><input id="withdrawalMoney" type="text" onKeyPress="return CheckKey(event)" value=""/></p>';
        html += '<p class="pDesc">溫馨提示: <br/>';
        html += '1. '+ UI[1047] + '<br/>2. '+ UI[1048] +withdrawal.rate2 +'%'+ UI[1049] +'.<br/>3. '+ UI[1050] +': '+ withdrawal.minMoney +'; '+ UI[1051] +': '+ withdrawal.maxMoney +'</p>';
        html += '</p>';
        html += '<p><button type="button" class="mainBtn01" onclick="withdrawalStep3()">下一步<button/></p>';
    }
    html += '</sapn>';


    $('#submitBox').html(html);

    return;


}


//提款第三步
function withdrawalStep3(){

    withdrawalPOST['withdrawalMoney'] = parseInt($('#withdrawalMoney').val());

    if( $('#withdrawalMoney').val() == '' ){ alert( '请输入提款金额！' ); return;}
    if( withdrawalPOST['withdrawalMoney'] < withdrawal.minMoney ){ alert( UI[1054] +':'+withdrawal.minMoney ); return;}
    if( withdrawalPOST['withdrawalMoney'] > withdrawal.maxMoney ){ alert( UI[1055] +':'+withdrawal.maxMoney ); return;}

    if(  withdrawal['u_nbmoney_'+withdrawalPOST['account_type']] > 0 ){

        xingzhengMoney = withdrawalPOST['withdrawalMoney'] * withdrawal.rate2 * 0.01;
        shijiMoney = withdrawalPOST['withdrawalMoney'] - xingzhengMoney;

        var alertMsg = UI[1063]+': '+withdrawal['u_nbmoney_'+withdrawalPOST['account_type']] +'\n\n' + UI[1065]+', '+ UI[1066] +': ';
        alertMsg += '\n\n'+ UI[1018] +': '+ withdrawalPOST['withdrawalMoney'];
        alertMsg += '\n\n'+ UI[1068] +': '+ xingzhengMoney.toFixed(2);
        alertMsg += '\n\n'+ UI[1069] +': '+ shijiMoney.toFixed(2);
        alertMsg += '\n\n'+ UI[1070] +'？';
        if( !confirm( alertMsg ) ) return;

    }

    var html = '<span class="fromTable">';
    //已绑定账户
    if( withdrawal.locking == 1 ){
        html += '<p><input id="withdrawal_user_bank_account_id" type="hidden" value="'+ withdrawal.lockingBankAccountID +'" />';
        html += '<input id="withdrawal_bank_code" type="hidden" value="'+ withdrawal.bank_code +'" />';
        html += '<input id="withdrawal_province" type="hidden" value="'+ withdrawal.province +'" />';
        html += '<input id="withdrawal_city" type="hidden" value="'+ withdrawal.city +'" />';
        html += '</p>';
        html += '<p class="pLable">'+ UI.YinHangMingCheng +': <br/><input id="withdrawal_bank_name" type="text" value="'+ withdrawal.bank_name +'" disabled="disabled"/></p>';
        html += '<p class="pLable">'+ UI.KaiHuZhiHang +':<br/><input id="withdrawal_bank_addr" type="text" value="'+ withdrawal.bank_addr +'" disabled="disabled"/></p>';
        html += '<p class="pLable">'+ UI.ZhangHuXingMing +':<br/><input id="withdrawal_bank_pers" type="text" value="'+ withdrawal.bank_pers +'" disabled="disabled"/></p>';
        html += '<p class="pLable">'+ UI.YinHangZhangHao +':<br/><input id="withdrawal_bank_no" type="text" value="'+ withdrawal.bank_no +'" disabled="disabled"/></p>';
    }else{

        if( withdrawal.sameNameBankAccount ){
            html += '<p class="pTitle1" id="withdrawal_title_box"><a class="btn" href="javascript:void(0)" onclick="changeBankAccoun(this,0,\'withdrawal\')" style="background-color:#B55A00;color:#FFF">可以用于绑定的银行账户</a><a class="btn" href="javascript:void(0)" onclick="changeBankAccoun(this,1,\'withdrawal\')">填写提款银行账户</a></p>';
            html += '<p class="pDesc">溫馨提示：请选择已登記账户或新錄入账户進行提款银行绑定操作，绑定后將不可隨意更改</p>';
            html += '<p class="pLable" id="withdrawal_xzyhBox">银行账户: <br/>';
            html += '<select id="withdrawal_user_bank_account_id" onchange="selectUserBankAccount(\'withdrawal\')">';
            html += withdrawal.sameNameBankAccount +'</select></p>';
        }else{
            html += '<p class="pTitle1">填写您的提款银行账户</p>';
            html += '<p class="pDesc">溫馨提示：请錄入账户進行提款银行绑定操作，绑定后將不可隨意更改</p>';
        }
        html += '<p class="pLable">'+ UI.YinHangMingCheng +':<br/><select id="withdrawal_bank_code">'+ withdrawal.compBankAccount +'</select></p>';
        html += '<p class="pLable">'+ UI.ShengShiQu +':<br/>'+ initChinaCity( 'withdrawal_province', 'withdrawal_city' ) +'</p>';
        html += '<p class="pLable">'+ UI.KaiHuZhiHang +':<br/><input id="withdrawal_bank_addr" type="text" /></p>';
        html += '<p class="pLable">'+ UI.ZhangHuXingMing +':<br/><input id="withdrawal_bank_pers" disabled="disabled" type="text" value="'+ withdrawal.u_xm +'"/></p>';
        html += '<p class="pLable">'+ UI.YinHangZhangHao +':<br/><input id="withdrawal_bank_no" type="text" onkeypress="return CheckKey(event)"/></p>';
        html += '<p><input id="withdrawal_locking" type="checkbox" checked="checked" disabled="disabled"/>绑定为提款账户</p>';

    }

    html += '<p class="pLable">'+ UI.TiKuanMiMa +':<br/><input id="u_password_pay" type="password"/></p>';
    html += '<p><br/><button type="button" class="mainBtn01" onclick="withdrawalStep4()">下一步</button></p>';
    html += '</span>';
    $b('about5').innerHTML = html;
    if( withdrawal.sameNameBankAccount ) selectUserBankAccount('withdrawal');

}

//提款第四步 提交提款申请
function withdrawalStep4(){
    if( isNewBank == 0 ) withdrawalPOST['user_bank_account_id'] = $('#withdrawal_user_bank_account_id').val();
    withdrawalPOST['bank_code'] = $('#withdrawal_bank_code').val();
    withdrawalPOST['province'] = $('#withdrawal_province').val();
    withdrawalPOST['city'] = $('#withdrawal_city').val();
    withdrawalPOST['bank_addr'] = $('#withdrawal_bank_addr').val();
    withdrawalPOST['bank_pers'] = $('#withdrawal_bank_pers').val();
    withdrawalPOST['bank_no'] = $('#withdrawal_bank_no').val();
    withdrawalPOST['u_password_pay'] = $('#u_password_pay').val();
    withdrawalPOST['locking'] = 1;

    if( withdrawalPOST['bank_addr'] == '' ){ alert( UI[1058] ); return; }
    if( withdrawalPOST['bank_no'] == '' ){ alert( UI[1059] ); return; }

    userClient.linkMasterServer( withdrawalPOST, function ( result, args, output, warning ) {
        if(output) alert(output);
        if( parseInt( result.flagID, 10 ) == 7777 ){
            var html = '<p class="pTitle1">提款申请完毕</p>';
            html += '<p class="pDesc">提款申请已提交, 财务將在24小時內爲您進行到账.<br/>';
            html += '请進入<a class="btn" href="index.php?tabID=3">交易账单</a>參看详情，如有問題请与客服聯系.</p>'
        }else{
            alert('提款申请遇到問題:\n\n'+eval( 'UI.ID'+ result.flagID  ));
        }
        $('#about5').html( html );
    }, true);

}


//统计提款金额
function sumWithdrawalMoney(){

    var withdrawalMoney_dq = 0;
    if( $b('withdrawalMoney_dq') ) withdrawalMoney_dq = parseInt ( $b('withdrawalMoney_dq').value );

    var withdrawalMoney_yx = 0;
    if( $b('withdrawalMoney_yx') ) withdrawalMoney_yx = parseInt ( $b('withdrawalMoney_yx').value );

    var withdrawalMoney_cp = 0;
    if( $b('withdrawalMoney_cp') ) withdrawalMoney_cp = parseInt ( $b('withdrawalMoney_cp').value );

    $b('withdrawal_Money').value = withdrawalMoney_dq+withdrawalMoney_yx+withdrawalMoney_cp;

}

function alertInputMoney( account_type, u_money_deposit ){

    switch( account_type ){
        case 'dq':

            if( parseInt($b('withdrawalMoney_dq').value) == 0 ) return;

            //提款金额小于优惠红利
            if( parseInt( $b('withdrawalMoney_dq').value ) <= parseInt(withdrawalUserData.u_money_bonus_dq) ){
                shijiMoney = parseInt( $b('withdrawalMoney_dq').value ) - parseInt(withdrawalUserData.u_money_bonus_dq);
                xingzhengMoney = 0;
            }else{
                //行政费用
                xingzhengMoney = ( parseInt( $b('withdrawalMoney_dq').value ) - parseInt(withdrawalUserData.u_money_bonus_dq)) * withdrawalUserData.rate2 * 0.01;
                shijiMoney = parseInt( $b('withdrawalMoney_dq').value ) - parseInt(withdrawalUserData.u_money_bonus_dq) - xingzhengMoney;
            }

            if( parseInt( $b('withdrawalMoney_dq').value ) > parseInt(withdrawalUserData.u_money_dq) ){ alert( UI[1060] ); $b('withdrawalMoney_dq').value = 0; return; }
            if( shijiMoney == 0 ){
                alert( UI[1061]+': '+ withdrawalUserData.u_money_bonus_dq +'\n\n'+ UI[1062] +': '+ withdrawalUserData.u_money_bonus_dq );
                $b('withdrawalMoney_dq').value = 0;
                return;
            }

            //未完成流水
            if(  withdrawalUserData.u_nbmoney_dq > 10 ){

                if( parseInt(withdrawalUserData.u_money_bonus_dq) > 0 && u_money_deposit == 0 ){
                    alert( '因閣下申请了白菜优惠, 请完成水流后再進行提款操作！' );
                    $('#withdrawalMoney_dq').value = 0;
                    $('#withdrawal_submit')[0].disabled = true;
                    return;
                }

                alertMsg = UI[1063]+': '+withdrawalUserData.u_nbmoney_dq;
                if( parseInt(withdrawalUserData.u_money_bonus_dq) > 0 ) alertMsg += '\n\n'+ UI[1064]+',';
                alertMsg += UI[1065];
                alertMsg += '\n\n'+ UI[1066] +'：';
                alertMsg += '\n\n'+ UI[1018] +': '+ parseInt( $b('withdrawalMoney_dq').value );
                if( parseInt(withdrawalUserData.u_money_bonus_dq) > 0 ) alertMsg += '\n\n'+ UI[1067] +': '+ withdrawalUserData.u_money_bonus_dq;
                alertMsg += '\n\n'+ UI[1068] +': '+ xingzhengMoney.toFixed(2);
                alertMsg += '\n\n'+ UI[1069] +': '+ shijiMoney.toFixed(2);
                if( parseInt(withdrawalUserData.u_money_bonus_dq) == 0 ||  parseInt( $b('withdrawalMoney_dq').value ) > parseInt(withdrawalUserData.u_money_bonus_dq) ){
                    alertMsg += '\n\n'+ UI[1070] +'？';
                    if( !confirm( alertMsg ) ) $b('withdrawalMoney_dq').value = 0;
                }else{
                    alertMsg += '\n\n'+ UI[1071] +'！';
                    alert( alertMsg );
                    $b('withdrawalMoney_dq').value = 0;

                }


            }

            break;
        case 'yx':
            //if( withdrawalUserData.u_money_yx < parseInt( $b('withdrawalMoney_yx').value ) ){ alert('娱乐场账户余额不足!'); $b('withdrawalMoney_yx').value = withdrawalUserData.u_money_yx; }
            break;
        case 'cp':
            //if( withdrawalUserData.u_money_cp < parseInt( $b('withdrawalMoney_cp').value ) ){ alert('快乐彩账户余额不足!'); $b('withdrawalMoney_cp').value = withdrawalUserData.u_money_cp; }
            break;
    }

}


//@非数字禁止输入
function CheckKey(e){
    var theEvent = window.event || e;
    var code = theEvent.keyCode || theEvent.which;
    //alert(code);
    if(( code < 48 || code > 57 ) && code != 13 && code != 8 ) return false;
}


//打开修改密码
function changePassword( passwordType ){

    var html = '<fieldset class="fieldset2">';
    if( passwordType == 1 ){
        html += '<legend>'+ UI.XiuGaiDengLuMiMa +'</legend>';
    }else{
        html += '<legend>'+ UI.XiuGaiTiKuanMiMa +'</legend>';
    }
    html += '<table style="margin-top:10px; width:100%; margin-left:15px;" class="fromTable">';
    if( passwordType == 1 ){
        html += '<tr><td align="right">'+ UI.YuanDengLuMiMa +':</td><td><input id="u_password_old" name="u_password_old" type="password" /></td></tr>';
        html += '<tr><td align="right">'+ UI.XinDengLuMiMa +':</td><td><input id="u_password_new" name="u_password_new" type="password" /></td></tr>';
        html += '<tr><td align="right">'+ UI.QueRenXinMiMa +':</td><td><input id="u_password_re" name="u_password_re" type="password" /></td></tr>';
    }else{
        html += '<tr><td align="right">'+ UI.YuanTiKuanMiMa +':</td><td><input id="u_password_pay_old" name="u_password_pay_old" type="password" /></td></tr>';
        html += '<tr><td align="right">'+ UI.XinTiKuanMiMa +':</td><td><input id="u_password_pay_new" name="u_password_pay_new" type="password" /></td></tr>';
        html += '<tr><td align="right">'+ UI.QueRenXinMiMa +':</td><td><input id="u_password_pay_re" name="u_password_pay_re" type="password" /></td></tr>';
    }
    html += '<tr><td align="right"></td><td><button type="button" class="mainBtn01" onclick="changePasswordSubmit('+ passwordType +')">保存</button></td></tr>';
    //html += '</table><p></p></fieldset><a class="btn" href="javascript:void(0)" onclick="userInfo()"><h4 align="center">'+ UI.FanHuiShangYiBu +'</h4></a>';

    $b('about0').innerHTML = html;

}

//补充生日
function updateBirthday(){

    // var html = '<fieldset class="fieldset2">';
    //
    // html += '<legend>補充出生年月日</legend>';
    // html += '<table style="margin-top:10px; width:100%; margin-left:15px;">';
    // html += '<tr><td>出生年月日: <select id="birYear" onchange="birthdayClass.getDayList()"></select>-<select id="birMon" onchange="birthdayClass.getDayList()"></select>-<select id="birDay"></select></td></tr>';
    // html += '<tr><td style="color:#666">由于公司会不定期推出一些生日紅利及优惠活动<br/>为了避免給你帶來不必要的麻煩，请务必填写真实的出生年月日</td></tr>';
    //
    // html += '<tr><td><input name="" type="button" value="'+ UI.TiJiao +'" onclick="updateBirthdaySubmit()"/></td></tr>';

    var html = '<div class="shadow">';
    html += '<div class="title">補充出生年月日</div>';
    html += '<div class="main-content clearfix">';
    html += '<p>出生年月日:  <select id="birYear" onchange="birthdayClass.getDayList()"></select>-<select id="birMon" onchange="birthdayClass.getDayList()"></select>-<select id="birDay"></select></p>';
    html += '<p>由于公司会不定期推出一些生日紅利及优惠活动</p>';
    html += '<p>为了避免給你帶來不必要的麻煩，请务必填写真实的出生年月日</p>';
    html += '<p><input name="" type="button" value="'+ UI.TiJiao +'" onclick="updateBirthdaySubmit()"/></p>';
    // html += '<p>登录密码:<button>修改登录密码</button></p>';
    // html += '<p>提款密码:<button>修改提款密码</button></p>';
    html += '</div>';
    html += '</div>';
    $b('about0').innerHTML = html;
    birthdayClass = new dateSelect( 'birYear', 'birMon', 'birDay', 100, 0 );

}

//补充生日
function updateBirthdaySubmit(){
    var POST = {
        'updateID': 1032,
        'uid': getCookie('uid'),'lang': getCookie('lang'),
        'u_birthday':( $('#birYear').val()+''+$('#birMon').val()+''+$('#birDay').val())
    }
    userClient.linkMasterServer( POST, function ( result, args, output, warning ) {
        if(output)alert(output);
        if( parseInt( result.flagID) == 7777 ){
            alert( '出生年月日更新成功！' );
            userInfo();
        }else{
            alert( UI.ID10002 );
        }

    }, true);
}

//增加银行账户表单
function insertsBankNoForm(){

    var POST = {'uid': getCookie('uid'), 'lang': getCookie('lang') };
    userClient.getBankListAndLocking( POST, function ( result, args, output, warning ) {
        if(output)alert(output);
        if( result.locking > 0 ){
            $b('about0').innerHTML = '<p class="pDesc">绑定账户已存在，不可重复操作！</p>';
            return;
        }
        var html = '';
        if( result.sameNameBankAccount ){
            html += '<p class="pTitle1" id="addBankNo_title_box"><a class="btn" href="javascript:void(0)" onclick="changeBankAccoun(this,0,\'addBankNo\')" style="background-color:#B55A00;color:#FFF">可以用于绑定的银行账户</a><a class="btn" href="javascript:void(0)" onclick="changeBankAccoun(this,1,\'addBankNo\')">填写提款银行账户</a></p>';
            html += '<p class="pDesc">溫馨提示：请选择已登記账户或新錄入账户進行提款银行绑定操作，绑定后將不可隨意更改</p>';
            html += '<p class="pLable" id="addBankNo_xzyhBox">银行账户: <br/>';
            html += '<select id="addBankNo_user_bank_account_id" onchange="selectUserBankAccount(\'addBankNo\')">';
            html += result.sameNameBankAccount +'</select></p>';
        }else{
            html += '<p class="pTitle1">填写您的提款银行账户</p>';
            html += '<p class="pDesc">溫馨提示：请錄入账户進行提款银行绑定操作，绑定后將不可隨意更改</p>';
        }
        html += '<p class="pLable">'+ UI.YinHangMingCheng +':<br/><select id="addBankNo_bank_code">'+ result.compBankAccount +'</select></p>';
        html += '<p class="pLable">'+ UI.ShengShiQu +':<br/>'+ initChinaCity( 'addBankNo_province', 'addBankNo_city' ) +'</p>';
        html += '<p class="pLable">'+ UI.KaiHuZhiHang +':<br/><input id="addBankNo_bank_addr" type="text" /></p>';
        html += '<p class="pLable">'+ UI.ZhangHuXingMing +':<br/><input id="addBankNo_bank_pers" disabled="disabled" type="text" value="'+ result.u_xm +'"/></p>';
        html += '<p class="pLable">'+ UI.YinHangZhangHao +':<br/><input id="addBankNo_bank_no" type="text" onkeypress="return CheckKey(event)"/></p>';
        html += '<p><input id="addBankNo_locking" type="checkbox" checked="checked" disabled="disabled"/>绑定为提款账户</p>';
        html += '<p><input class="bigBtn" type="button" value="'+ UI.TiJiao +'" onclick="insertsBankNo(\''+ result['u_xm'] +'\')"/></p>';
        html +='<p class="pDesc"><b>溫馨提示</b>:<br/> 1. 存款時所使用的转账账户可以使用非绑定或绑定的银行账户，但提款時必须使用绑定提款账户進行提款<br/>2. 绑定的用银行账户姓名必须与本网账户姓名一致<br/>3. 提款账户绑定后不可隨意更改，如需更改请联系客服。</p>';
        $b('about0').innerHTML = html;
        if( result.sameNameBankAccount ) selectUserBankAccount('addBankNo');
    }, true);

}

//检测输入的姓名与本网账户姓名是否一致
function checkRealName( u_xm ){

    if( $('#addBankNo_locking').attr('checked') == false ) return;
    if( $('#addBankNo_bank_pers').val() != u_xm ){
        alert('您所填写的账户姓名与本网账户姓名不一致，無法绑定此银行账户为提款账户！');
        $('#addBankNo_locking').attr('checked',false);
    }
}

////增加银行账户
function insertsBankNo( u_xm ){

    var POST = {
        'updateID': 1018,
        'uid': getCookie('uid'),'lang': getCookie('lang'),
        'bank_code': $('#addBankNo_bank_code').val(),
        'province': $('#addBankNo_province').val(),
        'city': $('#addBankNo_city').val(),
        'bank_addr': $('#addBankNo_bank_addr').val(),
        'bank_pers': $('#addBankNo_bank_pers').val(),
        'bank_no': $('#addBankNo_bank_no').val(),
        'locking':1
    }

    if( isNewBank == 0 ) POST['user_bank_account_id'] = $('#addBankNo_user_bank_account_id').val();
    if( $('#addBankNo_bank_pers').val() != u_xm ){ alert('您所填写的账户姓名与本网账户姓名不一致，無法绑定此银行账户为提款账户！'); return; }

    userClient.linkMasterServer( POST, function ( result, args, output, warning ) {
        if(output)alert(output);
        if( parseInt( result.flagID) == 7777 ){
            alert( '绑定银行账户成功！' );
            userInfo();
        }else{
            alert( UI.ID10002 );
        }

    }, true);

}

//提交修改密码
function changePasswordSubmit( passwordType ){

    if( passwordType == 1 ){
        POST = {
            'uid': getCookie('uid'),'lang': getCookie('lang'),
            'updateID': 1005,
            'passwordType': passwordType,
            'u_password_old': $b('u_password_old').value,
            'u_password_new': $b('u_password_new').value,
            'u_password_new_re': $b('u_password_re').value
        };

        if( POST.u_password_old == '' ){ alert( UI.ID10351 ); return; }
        if( POST.u_password_new == '' ){ alert( UI.ID10352 ); return; }
        if( POST.u_password_new != POST.u_password_new_re ){ alert( UI.ID10354 ); return; }

    }else{
        POST = {
            'uid': getCookie('uid'),'lang': getCookie('lang'),
            'updateID': 1005,
            'passwordType': passwordType,
            'u_password_pay_old': $b('u_password_pay_old').value,
            'u_password_pay_new': $b('u_password_pay_new').value,
            'u_password_pay_new_re': $b('u_password_pay_re').value
        };

        if( POST.u_password_pay_old == '' ){ alert( UI.ID10351 ); return; }
        if( POST.u_password_pay_new == '' ){ alert( UI.ID10352 ); return; }
        if( POST.u_password_pay_new != POST.u_password_pay_new_re ){ alert( UI.ID10354  ); return; }

    }

    userClient.linkMasterServer( POST, function ( result, args, output, warning ) {
        //alert(output);
        switch( parseInt( result.flagID, 10 ) ){
            case 7777:
                alert( UI.ID10356 );
                userInfo();
                break;
            case 10355:
                alert( UI.ID10355 );
                break;
            default:
                alert( UI.ID10001 );
                break;
        }

    }, true);

}

function getPromotionDescription( id, infoBox ){

    PromID = id;
    if( parseInt(id) == 0 ){ $('#'+infoBox).html(''); return;}
    post = {'uid': getCookie('uid'),'lang': getCookie('lang'),'id': id }
    if( post.id == '' ) return;
    userClient.getPromotionDescription( post, function ( result, args, output, warning ) {
        $('#'+infoBox).html( '<b>描述</b>: '+ result );
    }, true);

}

//系统公告
function getGongGao( account_type  ){

    POST = {'uid': getCookie('uid'),'lang': getCookie('lang'), 'account_type':account_type};
    userClient.getGongGao( POST, function ( result, args, output, warning ){
        if(output) console.log(output);
        $b('about8').innerHTML = '<div class="menuUL129Box"></div>'+result;
        Csh['menuHtml']({dq: '体育场', cp: '快乐彩'}, account_type, '#about8 .menuUL129Box', function (){
            getGongGao( $(arguments[0]).attr('name') );
        });
    }, true);


}

//注册代理
function registerAgent(){

    POST = {
        'uid': getCookie('uid'),'lang': getCookie('lang'),
        'updateID': 1003,
        'isAgent': 1,
        'u_name': $b('u_name').value,
        'a_password': $b('a_password').value,
        'a_password_re': $b('a_password_re').value,
        'u_nickname': $b('u_nickname').value,
        'u_xm': $b('u_xm').value,
        'u_id_number': $b('u_id_number').value,
        'u_email': $b('u_email').value,
        'bank_name': $b('bank_name').text,
        'bank_code': $b('bank_name').value,
        'bank_addr': $b('bank_addr').value,
        'bank_id': $b('bank_id').value,
        'u_tel': $b('u_tel').value,
        'chat_id': $b('chat_id').value,
        'u_country': $b('u_country').value,
        'u_city': $b('u_city').value,
        'u_address': $b('u_address').value,
        'u_zip_code': $b('u_zip_code').value,
        'form_code': $b('form_code').value
    }

    if( POST.u_name == '' ){ alert( UI.ID10101 ); return false; }
    if( isChinaStr(POST.u_name) ){ alert( UI.ID10129 ); return false; }
    if( POST.u_name.length < 6 ){ alert( UI.ID10106 ); return false; }
    if( POST.u_name.length > 20 ){ alert( UI.ID10107 ); return false; }

    if( POST.a_password == '' ){ alert( UI.ID10102 ); return false; }
    if( POST.a_password.length < 6 ){ alert( UI.ID10108 ); return false; }
    if( POST.a_password.length > 20 ){ alert( UI.ID10109 ); return false; }

    if( POST.a_password_re == '' ){ alert( UI.ID10105 ); return false; }
    if( POST.a_password != POST.a_password_re ){ alert( UI.ID10110 ); return false; }

    if( POST.u_nickname == '' ){ alert( UI.ID10117 ); return false; }
    if( POST.u_xm == '' ){ alert( UI.ID10131 ); return false; }
    if( POST.u_id_number == '' ){ alert( UI.ID10133 ); return false; }

    if( !ismail(POST.u_email) ){ alert( UI.ID10114 ); return false;  }

    if( POST.bank_name == '' ){ alert( UI.ID10134 ); return false; }
    if( POST.bank_addr == '' ){ alert( UI.ID10135 ); return false; }
    if( POST.bank_id == '' ){ alert( UI.ID10136 ); return false; }
    if( POST.u_tel == '' ){ alert( UI.ID10118 ); return false; }
    if( POST.chat_id == '' ){ alert( UI.ID10138 ); return false; }

    if( POST.u_tel == '' ){ alert( UI.ID10118 ); return false; }
    if( POST.u_country == '' ){ alert( UI.ID10119 ); return false; }
    if( POST.u_city == '' ){ alert( UI.ID10120 ); return false; }
    if( POST.u_address == '' ){ alert( UI.ID10121 ); return false; }
    if( POST.u_zip_code == '' ){ alert( UI.ID10122 ); return false; }
    if( POST.form_code == '' ){ alert( UI.ID10132 ); return false; }

    userClient.linkMasterServer( POST, function ( result, args, output, warning ) {
        if( parseInt( result.flagID ) == 7777 ){
            alert( UI.ID10139 );
            location = 'http://agent.IHbet.com/login.php?u_name='+ POST.u_name +'&a_password='+ POST.a_password;
        }else{
            alert( eval( 'UI.ID'+ result.flagID  ) );
        }
    }, true);


}

//生成申请红利表单
function getApplBonusForm(){

    var html = '';
    var account_type={'dq':'','cp':'','yx':''};
    if( typeof(bonus_account_type) == 'undefined' ) bonus_account_type = 'dq';
    account_type[bonus_account_type] = 'checked="checked"';
    html +='<p class="pTitle1">选定投注场</p>';
    html +='<p><form id="bonus"><label>';
    html +='<input id="account_type" name="account_type" type="radio" value="dq" '+ account_type['dq'] +' onclick="bonus_account_type=\'dq\';getApplBonusFormData()"/> 体育场</label><br/>';
    html +='<input id="account_type" name="account_type" type="radio" value="cp" '+ account_type['cp'] +' onclick="bonus_account_type=\'cp\';getApplBonusFormData()"/> 快乐彩</label><br/>';
    html +='<input id="account_type" name="account_type" type="radio" value="yx" '+ account_type['yx'] +' onclick="bonus_account_type=\'yx\';getApplBonusFormData()"/> 娱乐场</label></form></p>';
    html +='<p id="bonusListDataBox"></p>';
    $('#about6').html(html);
    getApplBonusFormData();

}

//得到申请红利数据
function getApplBonusFormData(){

    var	html ='';
    var POST = {'uid': getCookie('uid'), 'lang': getCookie('lang'),'account_type':bonus_account_type };
    userClient.getApplBonusFormData( POST, function ( result, args, output, warning ) {
        if( output ) alert(output);
        if( parseInt(result['flagID']) == 88 ){
            $('#about6').html('<p class="pDesc">很抱歉！ 请登录后再进行申请操作。</p>');
            return;
        }
        if( result['promList'] == '' ){
            html +='<p class="pTitle1">系统提示信息</p>';
            html += '<p class="pDesc">很抱歉！暂时没有可申请的优惠项目。</p>';
            $('#bonusListDataBox').html(html);
            return;
        }

        html +='<p class="pLable">选定优惠项目: <br/><select id="bonus_promID" onchange="getPromotionDescription( this.value, \'descriptionBox\' )">'+ result['promList'] +'</select></p>';
        html +='<p id="descriptionBox" class="pDesc"><b>描述</b>:'+ result['description'] +'</p>';

        //未绑定银行账户
        if(  parseInt(result['bangdingFlag']) == 0 ){
            html +='<p class="pTitle1">绑定提款银行账户资料</p>';
            html +='<p class="pLable">银行名称: <br/><span id="bankNameBox">'+ result['bankList'] +'</span></p>';
            html +='<p class="pLable">开户支行: <br/><input id="bonus_bank_addr" type="text"/><span class="spanDesc">必须填写完整的开户支行信息</span></p>';
            html +='<p class="pLable">账户姓名: <br/><input id="bonus_u_xm" type="text" value="'+ result['u_xm'] +'" readonly="readonly"/><span class="spanDesc">账户姓名必须与本网註冊時时填写的一致</span></p>';
            html +='<p class="pLable">银行账号: <br/><input id="bonus_bank_no" type="text" onkeypress="return CheckKey(event)"/><span class="spanDesc">银行账号只能绑定一次，此後不可隨意更改</span></p>';
        }

        //未填写个人身份证号码
        if( result['u_id_number'] == '' ){
            html +='<p class="pLable">身份证号码: <br/><input id="u_id_number" type="text"/><span class="spanDesc">请填写真实正确的身份证号码，否则会影响提款</span></p>';
        }

        html +='<p class="pLable">备注: <br/><textarea id="remark" cols="40" rows="4"></textarea><span class="spanDesc">备注内容不可大于50个中文字符</span>';

        html +='<p><input class="bigBtn" type="button" value="提交申请" onclick="ApplBonus()"/></p>';
        html +='<p class="pDesc"><b>申请优惠须知</b>: 申请优惠提交后，可在"账户资料"中查看申请审核情況，审核程序將在24小时内完成。<br/>请务必填写用户真实资料，每一地址用户只能一次申请，重复申请将被取消资格。<br/>如果审核不予通过，將不另行通知，不做任何解析！</p>';

        $('#bonusListDataBox').html(html);
    }, true);

}

//申请优惠
function ApplBonus( bangdingFlag ){

    var POST = {'updateID':1011, 'uid': getCookie('uid'), 'lang': getCookie('lang'), 'promotions_id':$('#bonus_promID').val(), 'remark':$('#remark').val() };
    if( $('#bonus_bank_code') ){
        POST.bank_code = $('#bonus_bank_code').val();
        POST.province = $('#bonus_province').val();
        POST.city = $('#bonus_city').val();
        POST.bank_addr = $('#bonus_bank_addr').val();
        POST.u_xm = $('#bonus_u_xm').val();
        POST.bank_no = $('#bonus_bank_no').val();

        if( POST.bank_addr == ''){ alert('请输入开户支行！'); return;}
        if( POST.bank_no == ''){ alert('请输入银行账号！'); return;}
    }

    if( typeof($('#u_id_number').val()) != 'undefined' ){
        POST.u_id_number = $('#u_id_number').val();
        if ((POST.u_id_number.length != 15) && (POST.u_id_number.length != 18)){ alert('请输入正确的身份证号码！'); return;}
    }

    userClient.linkMasterServer( POST, function ( result, args, output, warning ) {

        if( output ) alert(output);
        switch( parseInt(result['flagID']) ){
            case 7777:
                $('#about6').html('<p class="pDesc">优惠已申请成功！ 我们的推广部將会尽快为你审核！<br/>审核结果请查看<a class="btn" href="javascript:void(0)" onclick="menuTab3.setActiveTab(6)">"账户资料"中的"申请优惠記錄"</a>欄目如有问题请联系在线客服！</p>');
                break;
            case 1011001:
                $('#about6').html('<p class="pDesc">很抱歉！此优惠项目已关闭</p>');
                break;
            case 1011006: case 1011007:
            $('#about6').html('<p class="pDesc">很抱歉！此优惠项目不能在规定活动时间外使用！</p>');
            break;
            case 1011008:
                $('#about6').html('<p class="pDesc">很抱歉！此优惠项目不能重复申请！</p>');
                break;
            default:
                alert(UI.ID10002);
        }
    }, true);


}


//自动填充账户姓名
function inputUXM(){
    $b('bank_u_xm').value = $b('u_xm').value;
}

//刷新验证码
function shuaxincodeImg( obj, bgColor, fontColor ){
    $b( obj ).src = '../phprclass/code.php?uid='+ getCookie( 'uid' ) +'&random='+Math.random()+'&bgColor='+bgColor +'&fontColor='+fontColor;
}


//是否包含中文字符
function isChinaStr(s){
    var patrn=/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
    if(!patrn.exec(s)){
        return false;
    }else{
        return true;
    }
}


//验证EMAIL
function ismail(mail){
    return( new RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(mail));
}

