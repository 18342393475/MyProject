
	var PAN={
		/*****frame_10 start ***/
		'YZZH': {
			isSpecial:false,
			title:{
						'QSYZZH': '前三一字组合',
						'ZSYZZH': '中三一字组合',
						'HSYZZH': '后三一字组合',
						'QWYZZH': '全五一字组合'
					},
			index:[0,1,2,3,4,5,6,7,8,9],
			content:[0,1,2,3,4,5,6,7,8,9],
			current:"QSYZZH",
			hasBg:true
	    },
		'SZHS': {
			isSpecial:false,
			title:{
					'WQBHS': '万仟佰和数', 'QBSHS': '仟佰拾和数', 'BSGHS': '佰拾个和数'
				},
			index:['0-6', '7', '8', '9', '10', '11', '12', '13','14', '15', '16', '17', '18', '19', '20', '21-27'],
			content:['0-6', '7', '8', '9', '10', '11', '12', '13','14', '15', '16', '17', '18', '19', '20', '21-27'],
			current:"WQBHS",
			hasBg:false
		},
		'SZHSWS': {
			isSpecial:false,
			title:{
					'WQBHSWS': '万仟佰和数尾数', 'QBSHSWS': '仟佰拾和数尾数', 'BSGHSWS': '佰拾个和数尾数'
				},
			index:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
			content:['0尾', '1尾', '2尾', '3尾', '4尾', '5尾', '6尾', '7尾', '8尾', '9尾'],
			current:'WQBHSWS',
			hasBg:false
	    },
		'KD': {
			isSpecial:false,
			title:{
					'QSKD': '前三跨度', 'ZSKD': '中三跨度', 'HSKD': '后三跨度'
				},
			index:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
			content:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
			current:'QSKD',
			hasBg:true
	    },
		'GXSJWX': {
			isSpecial:true,
			sjwx:true,
			title:{'GXTBH': '特别号', 'GXDYH': '正码一', 'GXDEH': '正码二', 'GXDSH': '正码三', 'GXDSIH': '正码四'}, 
			content:{
				WXj:	{name:'金',  number:'05,10,15,20'},
				SJc:	{name:'春',  number:'01,02,03,04,05'},
				WXm:	{name:'木',  number:'01,06,11,16,21'},
				SJxia:	{name:'夏',  number:'06,07,08,09,10'},
				WXsh:	{name:'水',  number:'02,07,12,17'},
				SJq:	{name:'秋',  number:'11,12,13,14,15'},
				WXhuo:	{name:'火',  number:'03,08,13,18'},
				SJdo:	{name:'冬',  number:'16,17,18,19,20'},
				WXt:	{name:'土',  number:'04,09,14,19'}
			},
			current:'GXTBH'
	    },
		'GXZM': {
			
			isSpecial:false,
			title:{'GXDYH': '正码1特', 'GXDEH': '正码2特', 'GXDSH': '正码3特', 'GXDSIH': '正码4特'},
			content:['01', '02', '03', '04', '05', '06', '07', '08','09', '10', '11', '12', '13', '14', '15', '16','17', '18', '19', '20', '21','特大','特小','特单','特双','合单','合双','特尾大','特尾小','大单','大双','小单','小双','红波','蓝波','绿波'],
			index:  ['01', '02', '03', '04', '05', '06', '07', '08','09', '10', '11', '12', '13', '14', '15', '16','17', '18', '19', '20', '21','DXd', 'DXx', 'DSdan', 'DSs', 'HDSdan', 'HDSs', 'WDXd', 'WDXx','DXDSddan', 'DXDSds', 'DXDSxdan', 'DXDSxs', 'Cho', 'Cla', 'Cv'],
			current:'GXDYH'
		},
		'GDDMSM': {
			isSpecial:false,
			title:{'KLDYH': '第一球', 'KLDEH': '第二球', 'KLDSH': '第三球', 'KLDSIH': '第四球', 'KLDWH': '第五球', 'KLDLH': '第六球', 'KLDQH': '第七球', 'KLDBH': '第八球'},
			index:['01', '02', '03', '04', '05', '06', '07', '08', '09', '10','11', '12', '13', '14', '15', '16', '17', '18', '19', '20','DXd','DXx','DSdan','DSs','HDSdan', 'HDSs', 'WDXd', 'WDXx'],
			content:['01', '02', '03', '04', '05', '06', '07', '08', '09', '10','11', '12', '13', '14', '15', '16', '17', '18', '19', '20','大','小','单','双','合单', '合双', '尾大', '尾小'],
			current:'KLDYH'
		},
		'GDSJWX': {
			isSpecial:true,
			sjwx:true,
			title:{'KLDYH': '第一球', 'KLDEH': '第二球', 'KLDSH': '第三球', 'KLDSIH': '第四球', 'KLDWH': '第五球', 'KLDLH': '第六球', 'KLDQH': '第七球', 'KLDBH': '第八球'},
			content:{
				
				 WXj:	{name:'金', number:'05,10,15,20'},
				 SJc:	{name:'春', number:'01,02,03,04,05'},
				 WXm:	{name:'木', number:'01,06,11,16'}, 
				 SJxia: {name:'夏', number:'06,07,08,09,10'},
				 WXsh:  {name:'水', number:'02,07,12,17'},	 
				 SJq:	{name:'秋', number:'11,12,13,14,15'},	
				 WXhuo: {name:'火', number:'03,08,13,18'},
				 SJdo:  {name:'冬', number:'16,17,18,19,20'},
				 WXt:	{name:'土', number: '04,09,14,19'}
			},
			current:'KLDYH'
	    },
	
		'FWZFB': {
			isSpecial:true,
			zfb:true,
			title:{'KLDYH': '第一球', 'KLDEH': '第二球', 'KLDSH': '第三球', 'KLDSIH': '第四球', 'KLDWH': '第五球', 'KLDLH': '第六球', 'KLDQH': '第七球', 'KLDBH': '第八球'},
			content:{
				
				Fdong:  {name:'东',  number: '01,05,09,13,17'},
				Mzh:	{name:'中',  number:'01,02,03,04,05,06,07'},
				Fn:		{name:'南',  number:'02,06,10,14,18'}, 
				Mf:		{name:'發',  number:'08,09,10,11,12,13,14'},
				Fxi:	{name:'西',  number:'03,07,11,15,19'},
				Mb:		{name:'白',  number:'15,16,17,18,19,20'},
				Fbei:   {name:'北',  number:'04,08,12,16,20'}
			
			},
			current:'KLDYH'
	
	    },
		'KLSFDM': {
			isSpecial:false,
			title:{'KLDYH': '第一球', 'KLDEH': '第二球', 'KLDSH': '第三球', 'KLDSIH': '第四球', 'KLDWH': '第五球', 'KLDLH': '第六球', 'KLDQH': '第七球'},
			content:['01', '02', '03', '04', '05', '06', '07', '08', '09', '10','11', '12', '13', '14', '15', '16', '17', '18', '19', '20','大', '小','单', '双', '合单', '合双','尾大','尾小'],
			index:['01', '02', '03', '04', '05', '06', '07', '08', '09', '10','11', '12', '13', '14', '15', '16', '17', '18', '19', '20','DXd', 'DXx','DSdan', 'DSs', 'HDSdan', 'HDSs','WDXd','WDXx'],
			current:'KLDYH'
			
		},
		'KLSFSIWX': {
			isSpecial:true,
			sjwx:true,
			title:{'KLTBH': '特别号', 'KLDYH': '第一球', 'KLDEH': '第二球', 'KLDSH': '第三球', 'KLDSIH': '第四球', 'KLDWH': '第五球', 'KLDLH': '第六球', 'KLDQH': '第七球'},
			content:{	
						WXj:	{name:'金',number: '05,10,15,20'},
						SJc:	{name:'春',number: '01,02,03,04,05'},
						WXm:	{name:'木',number:'01,06,11,16'},
						SJxia:	{name:'夏',number: '06,07,08,09,10'},
						WXsh:	{name:'水',number: '02,07,12,17'}, 
						SJq:	{name:'秋',number:'11,12,13,14,15'},
						WXhuo:	{name:'火',number: '03,08,13,18'},
						SJdo:	{name:'冬',number: '16,17,18,19,20'},
						WXt:	{name:'土',number:'04,09,14,19'}	
						
					},
			current:'KLTBH'
	    },
		'KLSFFW': {
			isSpecial:true,
			zfb:true,
			title:{
				'KLTBH': '特别号', 'KLDYH': '第一球', 'KLDEH': '第二球', 'KLDSH': '第三球', 'KLDSIH': '第四球', 'KLDWH': '第五球', 'KLDLH': '第六球', 'KLDQH': '第七球'
			},
			content:{
						
					Fdong:{name:'东', number: '01,05,09,13,17'},
					Mzh:  {name:'中', number: '01,02,03,04,05,06,07'},
					Fn:	  {name:'南', number:'02,06,10,14,18'},
					Mf:   {name:'发', number:'08,09,10,11,12,13,14'},
					Fxi:  {name:'西', number:'03,07,11,15,19'},
					Mb:	  {name:'白', number:'15,16,17,18,19,20'},
					Fbei: {name:'北', number:'04,08,12,16,20'}	
	
					},
			current:'KLTBH'
	    },
		'YYXWDMSM': {
			isSpecial:false,
			title:{'YWDYH': '第一球', 'YWDEH': '第二球', 'YWDSH': '第三球', 'YWDSIH': '第四球', 'YWDWH': '第五球'},
			content:['01', '02', '03', '04', '05', '06', '07', '08','09', '10', '11','大','小','单','双'],
			index:['01', '02', '03', '04', '05', '06', '07', '08','09', '10', '11','DXd', 'DXx','DSdan','DSs'],
			current:'YWDYH'
	    },
		'KBWX': {
			isSpecial:true,
			sjwx:true,
			title:null,
			content:{
						
					WXj: {name:'金',number:'05,10,15,20'},
					WXm: {name:'木',number:'01,06,11,16,21'},
					WXsh: {name:'水',number:'02,07,12,17'},
					WXhuo:{name:'火',number: '03,08,13,18'},
					WXt:  {name:'土',number:'04,09,14,19'}
	
					},
			current:'KB'
	    },
		'PKDM': {
			isSpecial:true,
			title:{'kong':'','PKDYH': '冠军', 'PKDEH': '亚军', 'PKDSH': '季军', 'PKDSIH': '第四名', 'PKDWH': '第五名', 'PKDLH': '第六名', 'PKDQH': '第七名', 'PKDBH': '第八名', 'PKDJH': '第九名', 'PKDSHIH': '第十名'},
			content:[1,2,3,4,5,6,7,8,9,10]
			
		},
		'LHZMT': {
			isSpecial:false,
			lhcBg:true,
			title:{'LHTBH': '特别号','LHZM':'正码', 'LHDYH': '正码一特', 'LHDEH': '正码二特', 'LHDSH': '正码三特', 'LHDSIH': '正码四特', 'LHDWH': '正码五特', 'LHDLH': '正码六特'},
			index:["01", "11", "21", "31", "41", "02", "12", "22", "32", "42", "03", "13", "23", "33", "43", "04", "14", "24", "34", "44", "05", "15", "25", "35", "45", "06", "16", "26", "36", "46", "07", "17", "27", "37", "47", "08", "18", "28", "38", "48", "09", "19", "29", "39", "49", "10", "20", "30", "40"/*,'DXd', 'DXx', 'DSdan','DSs','HSDXd','HSDXx','HSDSdan', 'HSDSs','WDXd','WDXx','DXDSxdan', 'DXDSxs', 'DXDSddan','DXDSds'*/],
			content:["01", "11", "21", "31", "41", "02", "12", "22", "32", "42", "03", "13", "23", "33", "43", "04", "14", "24", "34", "44", "05", "15", "25", "35", "45", "06", "16", "26", "36", "46", "07", "17", "27", "37", "47", "08", "18", "28", "38", "48", "09", "19", "29", "39", "49", "10", "20", "30", "40"/*,'大', '小','单','双','合大','合小','合单','合双','尾大','尾小','小单','小双','大单','大双'*/],
			current:'LHTBH'
		},
		/*****frame_10 end *****/
	
		/*****frame_09 start*****/
		'ZHLH': {
	        'tr': {
	            'tr0': {'lable': '总和大小', 'play_lx': {'KLZHDXd': '大', 'KLZHDXx': '小'}, 'isPlayOdds': true},
	            'tr1': {'lable': '总和单双', 'play_lx': {'KLZHDSdan': '单', 'KLZHDSs': '双'}, 'isPlayOdds': true},
	            'tr2': {'lable': '总和尾数大小', 'play_lx': {'KLZHWSDXd': '大', 'KLZHWSDXx': '小'}, 'isPlayOdds': true},
	            'tr3': {'lable': '龙虎', 'play_lx': {'KLLHl': '龙', 'KLLHhu': '虎'}, 'isPlayOdds': true}
	        }
	    },
		'KLSFZHLH': {
	        'tr': {
	            'tr0': {'lable': '总和大小', 'play_lx': {'KLZHDXd': '大', 'KLZHDXx': '小'}, 'isPlayOdds': true},
	            'tr1': {'lable': '总和单双', 'play_lx': {'KLZHDSdan': '单', 'KLZHDSs': '双'}, 'isPlayOdds': true},
	            'tr2': {'lable': '总和尾数大小', 'play_lx': {'KLZHWSDXd': '大', 'KLZHWSDXx': '小'}, 'isPlayOdds': true},
	            'tr3': {'lable': '龙虎', 'play_lx': {'KLLHl': '龙', 'KLLHhu': '虎'}, 'isPlayOdds': true}
	        }
	    },  
		'YWZHLH': {
	        'tr': {
	            'tr0': {'lable': '总和大小', 'play_lx': {'YWZHDXd': '大', 'YWZHDXx': '小'}, 'isPlayOdds': true},
	            'tr1': {'lable': '总和单双', 'play_lx': {'YWZHDSdan': '单', 'YWZHDSs': '双'}, 'isPlayOdds': true},
	            'tr2': {'lable': '总和尾数大小', 'play_lx': {'YWZHWSDXd': '大', 'YWZHWSDXx': '小'}, 'isPlayOdds': true},
	            'tr3': {'lable': '龙虎', 'play_lx': {'YWLHl': '龙', 'YWLHhu': '虎'}, 'isPlayOdds': true}
	        }
	    },
		/*****frame_09 end*****/
	
		/*****frame_08 start**/
		'LHLX': {
		
			title:{'LHEXP': '二肖碰', 'LHSXP': '三肖碰', 'LHSIXP': '四肖碰', 'LHWXP': '五肖碰'},
			content:{
				'tr1': {'lotteryNo': {'shu': '鼠', 'niu': '牛', 'hu': '虎'}},
	            'tr2': {'lotteryNo': {'tu': '兔', 'long': '龙', 'she': '蛇'}},
	            'tr3': {'lotteryNo': {'ma': '马', 'yang': '羊', 'hou': '猴'}},
	            'tr4': {'lotteryNo': {'jj': '鸡', 'gou': '狗', 'zhu': '猪'}}
	       
			},
			current:'LHEXP',
			quick_choose:{'前肖':['shu','niu','hu','tu','long','she'],"后肖":['ma','yang','hou','jj','gou','zhu'],"天肖":['ma','niu','hou','tu','long','zhu'],"地肖":['shu','yang','hu','ji','gou','she'],"野兽":['shu','hu','hou','tu','long','she'],"家禽":['ma','niu','yang','ji','gou','zhu'],"单":['niu','tu','she','yang','ji','zhu'],"双":['shu','hu','long','ma','hou','gou']},
			'number': {'LHEXP': 2, 'LHSXP': 3, 'LHSIXP': 4, 'LHWXP': 5}
	    },
		'LHLW': {
			
			title:{'LHEWP': '二尾碰', 'LHSWP': '三尾碰', 'LHSIWP': '四尾碰', 'LHWWP': '五尾碰'},
			content:{
	
				'tr1': {'lotteryNo': {0: '0尾', 1: '1尾', 2: '2尾'}, 'lotteryNumber': {0: '10,20,30,40', 1: '01,11,21,31,41', 2: '02,12,22,32,42'}, 'title_box': true},
	            'tr2': {'lotteryNo': {3: '3尾', 4: '4尾', 5: '5尾'}, 'lotteryNumber': {3: '03,13,23,33,43', 4: '04,14,24,34,44', 5: '05,15,25,35,45'}, 'title_box': true},
	            'tr3': {'lotteryNo': {6: '6尾', 7: '7尾', 8: '8尾'}, 'lotteryNumber': {6: '06,16,26,36,46', 7: '07,17,27,37,47', 8: '08,18,28,38,48'}, 'title_box': true},
	            'tr4': {'lotteryNo': {9: '9尾', 10: '', 11: ''},     'lotteryNumber': {9: '09,19,29,39,49', 10: '', 11: ''}, 'title_box': true}
	        
			},
			current:'LHEWP',
			'number': {'LHEWP': 2, 'LHSWP': 3, 'LHSIWP': 4, 'LHWWP': 5}
			
	    },
		/*****frame_08 end*********/
		/*****frame_07 start*********/
		'LHTBHHX': {
			title: {'Z': '中', 'BZ': '不中'},
			content:{
				
				'tr1': {'lotteryNo': {'shu2': '鼠', 'niu2': '牛', 'hu2': '虎'}, 'title_odds_content': true},
	            'tr2': {'lotteryNo': {'tu2': '兔', 'long2': '龙', 'she2': '蛇'}, 'title_odds_content': true},
	            'tr3': {'lotteryNo': {'ma2': '马', 'yang2': '羊', 'hou2': '猴'}, 'title_odds_content': true},
	            'tr4': {'lotteryNo': {'jj2': '鸡', 'gou2': '狗', 'zhu2': '猪'}, 'title_odds_content': true}
	
			},
			current:'Z'
	    },
		/*****frame_07 end************/
		/*****frame_06 start************/
		'LHTBHSX': {
	        'content': {
	            'tr0': {'lotteryNo': {'shu': '鼠', 'niu': '牛', 'hu': '虎'}, 'play_lx': {'shu': 'LHTBHSXshu', 'niu': 'LHTBHSXniu', 'hu': 'LHTBHSXhu'}, 'title_odds': true},
	            'tr1': {'lotteryNo': {'tu': '兔', 'long': '龙', 'she': '蛇'}, 'play_lx': {'tu': 'LHTBHSXtu', 'long': 'LHTBHSXlong', 'she': 'LHTBHSXshe'}, 'title_odds': true},
	            'tr2': {'lotteryNo': {'ma': '马', 'yang': '羊', 'hou': '猴'}, 'play_lx': {'ma': 'LHTBHSXma', 'yang': 'LHTBHSXyang', 'hou': 'LHTBHSXhou'}, 'title_odds': true},
	            'tr3': {'lotteryNo': {'jj': '鸡', 'gou': '狗', 'zhu': '猪'}, 'play_lx': {'jj': 'LHTBHSXjj', 'gou': 'LHTBHSXgou', 'zhu': 'LHTBHSXzhu'}, 'title_odds': true}
	        },
			current:'LHTBHSX'
	    },
		'LHZX': {
	        'content': {
	            'tr0': {'lotteryNo': {'shu': '鼠', 'niu': '牛', 'hu': '虎'}, 'play_lx': {'shu': 'LHZXshu', 'niu': 'LHZXniu', 'hu': 'LHZXhu'}, 'title_odds': true},
	            'tr1': {'lotteryNo': {'tu': '兔', 'long': '龙', 'she': '蛇'}, 'play_lx': {'tu': 'LHZXtu', 'long': 'LHZXlong', 'she': 'LHZXshe'}, 'title_odds': true},
	            'tr2': {'lotteryNo': {'ma': '马', 'yang': '羊', 'hou': '猴'}, 'play_lx': {'ma': 'LHZXma', 'yang': 'LHZXyang', 'hou': 'LHZXhou'}, 'title_odds': true},
	            'tr3': {'lotteryNo': {'jj': '鸡', 'gou': '狗', 'zhu': '猪'}, 'play_lx': {'jj': 'LHZXjj', 'gou': 'LHZXgou', 'zhu': 'LHZXzhu'}, 'title_odds': true}
	        },
			current:'LHZX'
	    },
		'LHYX': {
	        'content': {
	            'tr0': {'lotteryNo': {'shu': '鼠', 'niu': '牛', 'hu': '虎'}, 'play_lx': {'shu': 'LHYXshu', 'niu': 'LHYXniu', 'hu': 'LHYXhu'}, 'title_odds': true},
	            'tr1': {'lotteryNo': {'tu': '兔', 'long': '龙', 'she': '蛇'}, 'play_lx': {'tu': 'LHYXtu', 'long': 'LHYXlong', 'she': 'LHYXshe'}, 'title_odds': true},
	            'tr2': {'lotteryNo': {'ma': '马', 'yang': '羊', 'hou': '猴'}, 'play_lx': {'ma': 'LHYXma', 'yang': 'LHYXyang', 'hou': 'LHYXhou'}, 'title_odds': true},
	            'tr3': {'lotteryNo': {'jj': '鸡', 'gou': '狗', 'zhu': '猪'}, 'play_lx': {'jj': 'LHYXjj', 'gou': 'LHYXgou', 'zhu': 'LHYXzhu'}, 'title_odds': true}
	        },
			current:'LHYX'
	    },
		/********frame_06 end*******************/
		/********frame_05 start*******************/
		'FCFSZH': {
			
			content:{
				'tr0': {'lable': '佰', 'td': ['0', 1, 2, 3, 4, 5, 6, 7, 8, 9],'TrIDName': 'B'},
	            'tr1': {'lable': '拾', 'td': ['0', 1, 2, 3, 4, 5, 6, 7, 8, 9],'TrIDName': 'S'},
	            'tr2': {'lable': '个', 'td': ['0', 1, 2, 3, 4, 5, 6, 7, 8, 9],'TrIDName': 'G'}
	            	
			},
			'td': ['B', 'S', 'G']
	    },
		'KBBJKLXH': {
			
			title:{'KBXY': '选一', 'KBXE': '选二', 'KBXS': '选三', 'KBXSI': '选四', 'KBXW': '选五'},
			content:{
				'tr1': {'td': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10']},
	            'tr2': {'td': ['11', '12', '13', '14', '15', '16', '17', '18', '19', '20']},
	            'tr3': {'td': ['21', '22', '23', '24', '25', '26', '27', '28', '29', '30']},
	            'tr4': {'td': ['31', '32', '33', '34', '35', '36', '37', '38', '39', '40']},
	            'tr5': {'td': ['41', '42', '43', '44', '45', '46', '47', '48', '49', '50']},
	            'tr6': {'td': ['51', '52', '53', '54', '55', '56', '57', '58', '59', '60']},
	            'tr7': {'td': ['61', '62', '63', '64', '65', '66', '67', '68', '69', '70']},
	            'tr8': {'td': ['71', '72', '73', '74', '75', '76', '77', '78', '79', '80']}
			},
			current:'KBXY',
			'td':{
				
				'oddsNo': {'KBXY': 1, 'KBXE': 2, 'KBXS': 3, 'KBXSI': 4, 'KBXW': 5},
				'KBXS': {1: '中三', 2: '中二'}, 
				'KBXSI': {1: '中四', 2: '中三', 3: '中二'}, 
				'KBXW': {1: '中五', 2: '中四', 3: '中三'}
				
			},
			max:{KBXY:80,KBXE:32,KBXS:15,KBXSI:12,KBXW:11},
			min:{KBXY:1,KBXE:2,KBXS:3,KBXSI:4,KBXW:5},
			maxNum:{KBXY:80,KBXE:496,KBXS:455,KBXSI:495,KBXW:462}
	    },
		'PKQE': {
			
			content:{
				'tr0': {'lable': '冠军', 'td': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'], 'TrIDName': 'QEDY'},
	            'tr1': {'lable': '亚军', 'td': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'], 'TrIDName': 'QEDE'}
			}
	    },
	
	    'PKQS': {
			
			content:{
				
				'tr0': {'lable': '冠军', 'td': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'], 'TrIDName': 'QSDY'},
	            'tr1': {'lable': '亚军', 'td': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'], 'TrIDName': 'QSDE'},
	            'tr2': {'lable': '季军', 'td': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'], 'TrIDName': 'QSDS'}
			}
	    },
	
	    'PKQSI': {
			
			content:{
				'tr0': {'lable': '冠军', 'td': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'], 'TrIDName': 'QSIDY'},
	            'tr1': {'lable': '亚军', 'td': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'], 'TrIDName': 'QSIDE'},
	            'tr2': {'lable': '季军', 'td': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'], 'TrIDName': 'QSIDS'},
	            'tr3': {'lable': '第四名','td': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'], 'TrIDName': 'QSIDSI'}   
			}
	    },
		'LHLM': {
			
			title:{'LHSIZSI': '四全中', 'LHSZS': '三全中', 'LHSZE': '三中二', 'LHEZE': '二中二', 'LHEZT': '二中特', 'LHTC': '特串'},
			content:{
	            'tr1': {'td': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10','11', '12', '13', '14', '15', '16', '17', '18', '19', '20','21', '22', '23', '24', '25', '26', '27', '28', '29', '30','31', '32', '33', '34', '35', '36', '37', '38', '39', '40','41', '42', '43', '44', '45', '46', '47', '48', '49']}
	            
			},
			current:'LHSIZSI',
			'td':{
				'oddsNo': {'LHSIZSI': 4, 'LHSZS': 3, 'LHSZE': 3, 'LHEZE': 2, 'LHEZT': 2, 'LHTC': 2}, 
				'LHEZT': {'z2': '中二', 'zt': '中特'},
				'LHSZE': {'z2': '中二', 'z3': '中三'}
			},
			max:{LHSIZSI:10,LHSZS:13,LHSZE:13,LHEZE:23,LHEZT:23,LHTC:23},
			min:{LHSIZSI:4,LHSZS:3,LHSZE:3,LHEZE:2,LHEZT:2,LHTC:2},
			maxNum:{LHSIZSI:286,LHSZS:286,LHSZE:286,LHEZE:253,LHEZT:253,LHTC:253}
	    },
	
	    'LHZXBZ': {
			
			title:{5: '五不中', 6: '六不中', 7: '七不中', 8: '八不中', 9: '九不中', 10: '十不中', 11: '十一不中', 12: '十二不中'},
			max:{5:'10',6:'10',7:10,8:11,9:12,10:13,11:13,12:14},
			content:{
				'tr1': {'td': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10','11', '12', '13', '14', '15', '16', '17', '18', '19', '20','21', '22', '23', '24', '25', '26', '27', '28', '29', '30','31', '32', '33', '34', '35', '36', '37', '38', '39', '40','41', '42', '43', '44', '45', '46', '47', '48', '49']}   
			},
			current:5,
			'td':{
				'oddsNo': {5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12}	
			},
			maxNum:{5:252,6:210,7:120,8:165,9:220,10:286,11:78,12:91}

	    },
		/********frame_05 end*********/
		/********frame_04 start*********/
		'FCYZGG': {
			
			title:['佰', '拾', '个'],
			content:{		
				'tr1': {'lable': '大', 'play_lx': ['FCYZGGBd', 'FCYZGGSd', 'FCYZGGGd'], 'isPlay': true},
	            'tr2': {'lable': '小', 'play_lx': ['FCYZGGBx', 'FCYZGGSx', 'FCYZGGGx'], 'isPlay': true},
	            'tr3': {'lable': '单', 'play_lx': ['FCYZGGBdan', 'FCYZGGSdan', 'FCYZGGGdan'], 'isPlay': true},
	            'tr4': {'lable': '双', 'play_lx': ['FCYZGGBs', 'FCYZGGSs', 'FCYZGGGs'], 'isPlay': true},
	            'tr5': {'lable': '质', 'play_lx': ['FCYZGGBz', 'FCYZGGSz', 'FCYZGGGz'], 'isPlay': true},
	            'tr6': {'lable': '合', 'play_lx': ['FCYZGGBh', 'FCYZGGSh', 'FCYZGGGh'], 'isPlay': true},
	            'tr7': {'lable': '赔率', 'colspan': 2, 'td': {'sure': '确定', 'empty': '重置'}, 'isSure': true}			
			}
	    },
		'LHGG': {
			
			title:['正码一', '正码二', '正码三', '正码四', '正码五', '正码六'],
			content:{
				
				'tr1': {'lable': '大', 'isPlay': true, 'play_lx': ['LHGGZ1d', 'LHGGZ2d', 'LHGGZ3d', 'LHGGZ4d', 'LHGGZ5d', 'LHGGZ6d']},
	            'tr2': {'lable': '小', 'isPlay': true, 'play_lx': ['LHGGZ1x', 'LHGGZ2x', 'LHGGZ3x', 'LHGGZ4x', 'LHGGZ5x', 'LHGGZ6x']},
	            'tr3': {'lable': '单', 'isPlay': true, 'play_lx': ['LHGGZ1dan', 'LHGGZ2dan', 'LHGGZ3dan', 'LHGGZ4dan', 'LHGGZ5dan', 'LHGGZ6dan']},
	            'tr4': {'lable': '双', 'isPlay': true, 'play_lx': ['LHGGZ1s', 'LHGGZ2s', 'LHGGZ3s', 'LHGGZ4s', 'LHGGZ5s', 'LHGGZ6s']},
	            'tr5': {'lable': '合大', 'isPlay': true, 'play_lx': ['LHGGZ1hd', 'LHGGZ2hd', 'LHGGZ3hd', 'LHGGZ4hd', 'LHGGZ5hd', 'LHGGZ6hd']},
	            'tr6': {'lable': '合小', 'isPlay': true, 'play_lx': ['LHGGZ1hx', 'LHGGZ2hx', 'LHGGZ3hx', 'LHGGZ4hx', 'LHGGZ5hx', 'LHGGZ6hx']},
	            'tr7': {'lable': '合单', 'isPlay': true, 'play_lx': ['LHGGZ1hdan', 'LHGGZ2hdan', 'LHGGZ3hdan', 'LHGGZ4hdan', 'LHGGZ5hdan', 'LHGGZ6hdan']},
	            'tr8': {'lable': '合双', 'isPlay': true, 'play_lx': ['LHGGZ1hs', 'LHGGZ2hs', 'LHGGZ3hs', 'LHGGZ4hs', 'LHGGZ5hs', 'LHGGZ6hs']},
	            'tr9': {'lable': '尾大', 'isPlay': true, 'play_lx': ['LHGGZ1wd', 'LHGGZ2wd', 'LHGGZ3wd', 'LHGGZ4wd', 'LHGGZ5wd', 'LHGGZ6wd']},
	            'tr10': {'lable': '尾小', 'isPlay': true, 'play_lx': ['LHGGZ1wx', 'LHGGZ2wx', 'LHGGZ3wx', 'LHGGZ4wx', 'LHGGZ5wx', 'LHGGZ6wx']},
	            'tr11': {'lable': '红波', 'isPlay': true, 'play_lx': ['LHGGZ1ho', 'LHGGZ2ho', 'LHGGZ3ho', 'LHGGZ4ho', 'LHGGZ5ho', 'LHGGZ6ho']},
	            'tr12': {'lable': '蓝波', 'isPlay': true, 'play_lx': ['LHGGZ1la', 'LHGGZ2la', 'LHGGZ3la', 'LHGGZ4la', 'LHGGZ5la', 'LHGGZ6la']},
	            'tr13': {'lable': '绿波', 'isPlay': true, 'play_lx': ['LHGGZ1lv', 'LHGGZ2lv', 'LHGGZ3lv', 'LHGGZ4lv', 'LHGGZ5lv', 'LHGGZ6lv']},
	            'tr14': {'lable': '赔率', 'colspan': 5, 'td': {'sure': '确定', 'empty': '重置'}, 'isSure': true}
			}
	    },
		/******frame_04 end*********/
	
		/******frame_03 start**********/
		'FCHSZXS': {
			
			content:{
				tr:{td:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
			},
			'td': [5, 10]
	    },
		'FCHSZXL': {
		
			content:{
				tr:{'td': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
			},
			'td': [4, 8]
	    },
		'ZXS': {
			
			title:{'QSZXS': '前三组选三', 'ZSZXS': '中三组选三', 'HSZXS': '后三组选三'},
			content:{
				tr:{'td': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
			},
			current:'QSZXS',
			'td': [5, 10]
	    },
	
	    'ZXL': {
			
			title:{'QSZXL': '前三组选六', 'ZSZXL': '中三组选六', 'HSZXL': '后三组选六'},
			content:{
				tr:{'td': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}	
			},
			current:'QSZXL',
			'td': [4, 8]
	    },
		'YWRX': {
			
			title:{'YWXEZE': '选二中2', 'YWXSZS': '选三中3', 'YWXSIZSI': '选四中4', 'YWXWZW': '选五中5', 'YWXLZW': '选六中5', 'YWXQZW': '选七中5', 'YWXBZW': '选八中5'},
			content:{
				tr:{'td': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']}
			},
			current:'YWXEZE',
			min:{'YWXEZE': 2, 'YWXSZS': 3, 'YWXSIZSI': 4, 'YWXWZW': 5, 'YWXLZW': 6, 'YWXQZW': 7, 'YWXBZW': 8}
			
	    },
		'YWQSZHX': {
			
			content:{
				'tr0': {'lable': '第一位', 'td': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'], 'TrIDName': 'ZXDY', 'rowspan': 3, 'isNoOdds': true},
	            'tr1': {'lable': '第二位', 'td': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'], 'TrIDName': 'ZXDE', 'isNoOdds': true},
	            'tr2': {'lable': '第三位', 'td': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'], 'TrIDName': 'ZXDS', 'isNoOdds': true}
	        
			}
	    },
	
	    'YWQSZUX': {
			
			content:{
				tr:{'td': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']}
			},
			min:{YWQSZUX:3}
			
	    },
	
	    'YWQEZHX': {
			
			content:{
				'tr0': {'lable': '第一位', 'td': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'], 'TrIDName': 'ZXDY', 'rowspan': 3, 'isNoOdds': true},
	            'tr1': {'lable': '第二位', 'td': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'], 'TrIDName': 'ZXDE', 'isNoOdds': true}
	      
			}
	    },
	
	    'YWQEZUX': {
			
			content:{
				tr:{'td': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']}
			},
			min:{YWQEZUX:2}
	    },
		/**********frame_03 end********************/
		/**********frame_02 start********************/
		'FCEZZH': {
			
			content:{
				
				 'tr0': {'lable': '数一', 'TrIDName': 'FCEZZH0', 'idName': 'FCEZZH_0', 'td':  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
	             'tr1': {'lable': '数二', 'TrIDName': 'FCEZZH1', 'idName': 'FCEZZH_1', 'td':  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
	
			}
	    },
	
	    'FCEZZX': {
		
			title:{'FCBSZX': '百拾组选', 'FCBGZX': '百个组选', 'FCSGZX': '拾个组选'},
			content:{
			
				tr:{'lable': '百拾组选', 'TrIDName': 'FCEZZX0', 'idName': 'FCEZZX_0','td': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
			
			},
			current:'FCBSZX',
			current_text:{tr:'百拾组选'}
	    },
	
	    'FCEZDW': {
			
			title:{'FCB_S': '佰拾定位', 'FCB_G': '佰个定位', 'FCS_G': '拾个定位'},
			content:{
				 'tr1': {'lable': '佰', 'TrIDName': 'FCEZDW0', 'idName': 'FCEZDW_0', 'td': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
	             'tr2': {'lable': '拾', 'TrIDName': 'FCEZDW1', 'idName': 'FCEZDW_1', 'td': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
	        
			},
			td:{'FCB': '佰', 'FCS': '拾', 'FCG': '个', 'B': '佰', 'S': '拾', 'G': '个'},
			current:'FCB_S',
			current_text:{tr1:'佰',tr2:'拾'}
	    },
		'FCZZX': {
			
			content: {
				'tr0': {'lable': '数一', 'TrIDName': 'FCZZX0', 'idName': 'FCZZX_0', 'td': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
	            'tr1': {'lable': '数二', 'TrIDName': 'FCZZX1', 'idName': 'FCZZX_1', 'td': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
	            'tr2': {'lable': '数三', 'TrIDName': 'FCZZX2', 'idName': 'FCZZX_2', 'td': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
	        }
	    },
		'FCSZDW': {
			
			content:{
				
				'tr0': {'lable': '佰', 'TrIDName': 'FCSZDW0', 'idName': 'FCSZDW_0', 'td': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
	            'tr1': {'lable': '拾', 'TrIDName': 'FCSZDW1', 'idName': 'FCSZDW_1', 'td': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
	            'tr2': {'lable': '个', 'TrIDName': 'FCSZDW2', 'idName': 'FCSZDW_2', 'td': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
	        
			},
			td:{'B': '佰', 'S': '拾', 'G': '个'}
	    },
		'SZSXE': {
			
			title:{'QSEZZH': '前三选二', 'ZSEZZH': '中三选二', 'HSEZZH': '后三选二'},
			content:{
			
				'tr1': {'lable': '数一', 'TrIDName': 'SZSXE0', 'idName': 'SZSXE_0', 'td': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
	            'tr2': {'lable': '数二', 'TrIDName': 'SZSXE1', 'idName': 'SZSXE_1', 'td': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}	
			},
			current:'QSEZZH'
	    },
		'EZZX': {
			
			title: {'WQZX': '万仟', 'WBZX': '万百', 'WSZX': '万拾', 'WGZX': '万个', 'QBZX': '千百', 'QSZX': '千拾', 'QGZX': '千个', 'BSZX': '百拾', 'BGZX': '百个', 'SGZX': '拾个'},
			content:{
			
				  'tr1': { 'lable':'万仟','TrIDName': 'EZZX0', 'idName': 'EZZX_0', 'td': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 'isNo': true}
	       
			},
			current:'WQZX',
			current_text:{tr1:'万仟'}
	
		},
		'EZDW': {
			
			title:{'W_Q': '万仟', 'W_B': '万百', 'W_S': '万拾', 'W_G': '万个', 'Q_B': '仟百', 'Q_S': '仟拾', 'Q_G': '仟个', 'B_S': '百拾', 'B_G': '百个', 'S_G': '拾个'},
			content:{
			
				'tr1': {'lable': '万', 'TrIDName': 'EZDW0', 'idName': 'EZDW_0', 'td': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
	            'tr2': {'lable': '仟', 'TrIDName': 'EZDW1', 'idName': 'EZDW_1', 'td': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
	       	
			
			},
			'td': {'W': '万', 'Q': '仟', 'B': '佰', 'S': '拾', 'G': '个'},
			current:'W_Q',
			current_text:{
				tr1:'万',
				tr2:'仟'
			}
	
	
	    },
		'SZZX': {
			
			title:{'WQBZX': '万仟佰组选', 'QBSZX': '仟佰拾组选', 'BSGZX': '佰拾个组选'},
			content:{
				'tr1': {'lable': '数一', 'TrIDName': 'SZZX0', 'idName': 'SZZX_0', 'td': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
	            'tr2': {'lable': '数二', 'TrIDName': 'SZZX1', 'idName': 'SZZX_1', 'td': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
	            'tr3': {'lable': '数三', 'TrIDName': 'SZZX2', 'idName': 'SZZX_2', 'td': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
			},
			current:'WQBZX'
	    },
		'SZDW': {
			
			title:{'W_Q_B': '万仟佰定位', 'Q_B_S': '仟佰拾定位', 'B_S_G': '佰拾个定位'},
			content:{
			
				'tr1': {'lable': '万', 'TrIDName': 'SZDW0', 'idName': 'SZDW_0', 'td': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
	            'tr2': {'lable': '仟', 'TrIDName': 'SZDW1', 'idName': 'SZDW_1', 'td': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
	            'tr3': {'lable': '佰', 'TrIDName': 'SZDW2', 'idName': 'SZDW_2', 'td': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
	       
			
			},
			'td': {'W': '万', 'Q': '仟', 'B': '佰', 'S': '拾', 'G': '个'},
			current:'W_Q_B',
			current_text:{
				tr1:'万',
				tr2:'仟',
				tr3:'佰'
			}
	    },
	
		/**********frame_02 end********************/
		/**********frame_01  start********************/
		'FCYZZH': {
			
			isTable:false,
			title:null,
			content:{
				tr: {'td': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
			},
			play_lx:'FCHSYZZH'
	    },
		'FCSM': {
			
			isTable:true,
			title:{'DXd':'大', 'DXx':'小', 'DSdan':'单', 'DSs':'双', 'ZHz':'质', 'ZHh':'合'},
			content:{
				'tr1': {'lable': '佰', 'merger_odds': true, 'play_lx': 'FCB'},
	            'tr2': {'lable': '拾', 'merger_odds': true, 'play_lx': 'FCS'},
	            'tr3': {'lable': '个', 'merger_odds': true, 'play_lx': 'FCG'},
	            'tr4': {'lable': '佰拾和数', 'merger_odds': true, 'play_lx': 'FCBSHS'},
	            'tr5': {'lable': '佰个和数', 'merger_odds': true, 'play_lx': 'FCBGHS'},
	            'tr6': {'lable': '拾个和数', 'merger_odds': true, 'play_lx': 'FCSGHS'},
	            'tr7': {'lable': '佰拾和数尾数', 'merger_odds': true, 'play_lx': 'FCBSHSWS'},
	            'tr8': {'lable': '佰个和数尾数', 'merger_odds': true, 'play_lx': 'FCBGHSWS'},
	            'tr9': {'lable': '拾个和数尾数', 'merger_odds': true, 'play_lx': 'FCSGHSWS'},
	            'tr10': {'lable': '佰拾个和数', 'merger_odds': true, 'play_lx': 'FCZHS'},
	            'tr11': {'lable': '佰拾个和数尾数', 'merger_odds': true, 'play_lx': 'FCZHSWS'}
			}
	    },
		'FCZDW': {
			
			isTable:false,
			title:{'FCBDW':'佰定位','FCSDW':'拾定位','FCGDW':'个定位'},
			content:{
			
				tr:{'td': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
	
			},
			play_lx:'FCBDW'
	    },
	
	    'FCZSM': {
			
			isTable:true,
			title:{'DXd':'大', 'DXx':'小', 'DSdan':'单', 'DSs':'双', 'ZHz':'质', 'ZHh':'合'},
			content:{
				'tr1': {'lable': '佰双面', 'merger_odds': true, 'play_lx': 'FCB'},
	            'tr2': {'lable': '拾双面', 'merger_odds': true, 'play_lx': 'FCS'},
	            'tr3': {'lable': '个双面', 'merger_odds': true, 'play_lx': 'FCG'}
			}
	    },
		'FCEZHS': {
			
			isTable:false,
			title:{'FCBSHS':'佰拾和数','FCBGHS':'佰个和数','FCSGHS':'拾个和数'},
			content:{
	
				'tr0': {'td': ['0-4', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14-18']}
			},
			index:[ '0-4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14-18'],
			'play_lx':'FCBSHS'
	    },
	
	    'FCEZHSWS': {
			
			isTable:false,
			title:{'FCBSHSWS':'佰拾和数尾数','FCBGHSWS':'佰个和数尾数','FCSGHSWS':'拾个和数尾数'},
			content:{
				tr:{'td': ['0尾', '1尾', '2尾', '3尾', '4尾', '5尾', '6尾', '7尾', '8尾', '9尾']}
			},
			'play_lx':'FCBSHSWS'
	    },
	
	    'FCEZHSSM': {
			
			isTable:true,
			title:{'DXd':'大', 'DXx':'小', 'DSdan':'单', 'DSs':'双', 'ZHz':'质', 'ZHh':'合'},
			content:{
				'tr1': {'lable': '佰拾和数', 'merger_odds': true, 'play_lx': 'FCBSHS'},
	            'tr2': {'lable': '佰拾和数尾数', 'merger_odds': true, 'play_lx': 'FCBSHSWS'},
	            'tr3': {'lable': '佰个和数', 'merger_odds': true, 'play_lx': 'FCBGHS'},
	            'tr4': {'lable': '佰个和数尾数', 'merger_odds': true, 'play_lx': 'FCBGHSWS'},
	            'tr5': {'lable': '拾个和数', 'merger_odds': true, 'play_lx': 'FCSGHS'},
	            'tr6': {'lable': '拾个和数尾数', 'merger_odds': true, 'play_lx': 'FCSGHSWS'}  
			}
	    },
		'FCSZHS': {
			
			isTable:false,
			title:null,
			content:{
				tr0: {
					'td': ['0-6', '07', '08', '09', '10', '11', '12', '13','14', '15', '16', '17', '18', '19', '20', '21-27']
				}
			},
			index:['0-6', '7', '8', '9', '10', '11', '12', '13','14', '15', '16', '17', '18', '19', '20', '21-27'],
			play_lx:'FCZHS'
		},
	
	    'FCSZHSWS': {
			
			isTable:false,
			title:null,
			content:{
				'tr0': {'td': ['0尾', '1尾', '2尾', '3尾', '4尾', '5尾', '6尾', '7尾', '8尾', '9尾']}    
			},
			play_lx:'FCZHSWS'
	    },
		'FCSZHSSM': {
			
			isTable:true,
			title:{'DXd':'大', 'DXx':'小', 'DSdan':'单', 'DSs':'双', 'ZHz':'质', 'ZHh':'合'},
			content:{
				'tr1': {'lable': '佰拾个和数', 'merger_odds': true, 'play_lx': 'FCZHS'},
	            'tr2': {'lable': '佰拾个和数尾', 'merger_odds': true, 'play_lx': 'FCZHSWS'}
	        
			}
	    },
		'FCKD': {
			
			isTable:false,
			title:null,
			content:{
				
				'tr0': {'td': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
	
			},
			play_lx:'FCHSKD'
	    },
	
	    'FCZD': {
			
			isTable:false,
			title:null,
			content:{
				'tr0': {'td': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
			},
			play_lx: 'FCZZD'
	    },
	
	    'FCBC': {
			
			isTable:false,
			title:null,
			content:{
				'tr0': {'td': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}  
			},
			'play_lx':'FCZBC'
	    },
	
	    'FCQT': {
			
			isTable:false,
			title:null,
			content:{
				tr0: {'td':["豹子", "顺子", "对子", "半顺", "杂六"]}  
			},
			index:['BZbz', 'SZsz', 'DZdz', 'BSbs', 'ZLzl'],
			'play_lx':'FCZ'
	
	    },
	
		'YZDWSM': {
		
			isTable:true,
			title:{'DXd':'大', 'DXx':'小', 'DSdan':'单', 'DSs':'双', 'ZHz':'质', 'ZHh':'合'},
			content:{
				'tr1': {'lable': '万', 'play_lx': 'W', 'merger_odds': true},
	            'tr2': {'lable': '仟', 'play_lx': 'Q', 'merger_odds': true},
	            'tr3': {'lable': '佰', 'play_lx': 'B', 'merger_odds': true},
	            'tr4': {'lable': '十', 'play_lx': 'S', 'merger_odds': true},
	            'tr5': {'lable': '个', 'play_lx': 'G', 'merger_odds': true}
			}
	    },
		'EZHSDS': {
				
			isTable:true,
			title:null,
			content: {
	            'tr0': {'lable': '', 'td': ['万仟和数', '万佰和数', '万拾和数', '万个和数', '仟佰和数'], 'isTitle': true},
	            'tr1': {'lable': '单', 'direct_odds': true, 'play_lx': ['WQHSDSdan', 'WBHSDSdan', 'WSHSDSdan', 'WGHSDSdan', 'QBHSDSdan']},
	            'tr2': {'lable': '双', 'direct_odds': true, 'play_lx': ['WQHSDSs', 'WBHSDSs', 'WSHSDSs', 'WGHSDSs', 'QBHSDSs']},
	            'tr3': {'lable': '', 'td': ['仟拾和数', '仟个和数', '佰拾和数', '佰个和数', '拾个和数'], 'isTitle': true},
	            'tr4': {'lable': '单', 'direct_odds': true, 'play_lx': ['QSHSDSdan', 'QGHSDSdan', 'BSHSDSdan', 'BGHSDSdan', 'SGHSDSdan']},
	            'tr5': {'lable': '双', 'direct_odds': true, 'play_lx': ['QSHSDSs', 'QGHSDSs', 'BSHSDSs', 'BGHSDSs', 'SGHSDSs']}
	        }
	
	    },
		'SZHSSM': {
			
			isTable:true,
			title:{'DXd':'大', 'DXx':'小', 'DSdan':'单', 'DSs':'双', 'ZHz':'质', 'ZHh':'合'},
			content:{		
				tr1: {'lable': '万仟佰和数', 'play_lx': 'WQBHS', 'merger_odds': true},
	            tr2: {'lable': '万仟佰和数尾', 'play_lx': 'WQBHSWS', 'merger_odds': true},
	            tr3: {'lable': '仟佰拾和数', 'play_lx': 'QBSHS', 'merger_odds': true},
	            tr4: {'lable': '仟佰拾和数尾', 'play_lx': 'QBSHSWS', 'merger_odds': true},
	            tr5: {'lable': '佰拾个和数', 'play_lx': 'BSGHS', 'merger_odds': true},
	            tr6: {'lable': '佰拾个和数尾', 'play_lx': 'BSGHSWS', 'merger_odds': true}
	       
			}
	    },
		'YZDW': {
			
			isTable:false,
			title:{'WDW':'万','QDW':'仟','BDW':'佰','SDW':'拾','GDW':'个'},
			content:{
				'tr0': {'td': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
			},
			play_lx:'WDW'
			
	    },
		'EZHSWSDX': {
			
			isTable:true,
			title:null,
			content: {
	            'tr0': {'lable': '', 'td': ['万仟和数尾数', '万佰和数尾数', '万拾和数尾数', '万个和数尾数', '仟佰和数尾数'], 'isTitle': true},
	            'tr1': {'lable': '大', 'direct_odds': true, 'play_lx': ['WQHSWSDXd', 'WBHSWSDXd', 'WSHSWSDXd', 'WGHSWSDXd', 'QBHSWSDXd']},
	            'tr2': {'lable': '小', 'direct_odds': true, 'play_lx': ['WQHSWSDXx', 'WBHSWSDXx', 'WSHSWSDXx', 'WGHSWSDXx', 'QBHSWSDXx']},
	            'tr3': {'lable': '', 'td': ['仟拾和数尾数', '仟个和数尾数', '佰拾和数尾数', '佰个和数尾数', '拾个和数尾数'], 'isTitle': true},
	            'tr4': {'lable': '大', 'direct_odds': true, 'play_lx': ['QSHSWSDXd', 'QGHSWSDXd', 'BSHSWSDXd', 'BGHSWSDXd', 'SGHSWSDXd']},
	            'tr5': {'lable': '小', 'direct_odds': true, 'play_lx': ['QSHSWSDXx', 'QGHSWSDXx', 'BSHSWSDXx', 'BGHSWSDXx', 'SGHSWSDXx']}
	        }
	    },
		'EZHSWSZH': {
			
			isTable:true,
			title:null,
			content:{
			
				'tr0': {'lable': '', 'td': ['万仟和数质合', '万佰和数质合', '万拾和数质合', '万个和数质合', '仟佰和数质合'], 'isTitle': true},
	            'tr1': {'lable': '质', 'direct_odds': true, 'play_lx': ['WQHSWSZHz', 'WBHSWSZHz', 'WSHSWSZHz', 'WGHSWSZHz', 'QBHSWSZHz']},
	            'tr2': {'lable': '合', 'direct_odds': true, 'play_lx': ['WQHSWSZHh', 'WBHSWSZHh', 'WSHSWSZHh', 'WGHSWSZHh', 'QBHSWSZHh']},
	            'tr3': {'lable': '', 'td': ['仟拾和数质合', '仟个和数质合', '佰拾和数质合', '佰个和数质合', '拾个和数质合'], 'isTitle': true},
	            'tr4': {'lable': '质', 'direct_odds': true, 'play_lx': ['QSHSWSZHz', 'QGHSWSZHz', 'BSHSWSZHz', 'BGHSWSZHz', 'SGHSWSZHz']},
	            'tr5': {'lable': '合', 'direct_odds': true, 'play_lx': ['QSHSWSZHh', 'QGHSWSZHh', 'BSHSWSZHh', 'BGHSWSZHh', 'SGHSWSZHh']}
	        		
			}
	    },
		'WZHS': {
			
			isTable:false,
			title:null,
			content:{
				'tr0': {'td': ['0-15', '16', '17', '18', '19', '20', '21', '22','23', '24', '25', '26', '27', '28', '29', '30-45']}  
			},
			index:['0-15', '16', '17', '18', '19', '20', '21', '22','23', '24', '25', '26', '27', '28', '29', '30-45'],
			play_lx:'WZHS'
	    },
		'WZHSWS': {
			
			isTable:false,
			title:null,
			content:{
				
				'tr0': {'td': ['0尾', '1尾', '2尾', '3尾', '4尾', '5尾', '6尾', '7尾', '8尾', '9尾']}
	         
			},
			'play_lx':'WZHSWS'
	    },
		'SM': {
			
			isTable:true,
			title:{'DXd':'大', 'DXx':'小', 'DSdan':'单', 'DSs':'双', 'ZHz':'质', 'ZHh':'合'},
			content:{
	
				'tr1': {'lable': '五字和数', 'merger_odds': true, 'play_lx': 'WZHS'},
	            'tr2': {'lable': '五字和数尾', 'merger_odds': true, 'play_lx': 'WZHSWS'}
			}
	    },
		'WZLH': {
			
			isTable:false,
			title:null,
			content:{
				'tr0': {'td': ['龙', '虎', '和']} 
			},
			index:["l", "hu", "he"],
			play_lx:'WZLH'
	    },
		'NN': {
		
			isTable:false,
			title:null,
			content:{
				'tr0': {'td': ['牛1', '牛2', '牛3', '牛4', '牛5', '牛6', '牛7', '牛8', '牛9', '牛牛', '无牛']}  
			},
			index:['NNn1', 'NNn2', 'NNn3', 'NNn4', 'NNn5', 'NNn6', 'NNn7', 'NNn8', 'NNn9', 'NNnn', 'NNw'],
			play_lx:''
		},
		'NNSM': {
			
			isTable:false,
			title:null,
			content:{
				'tr0': {'td': ['牛大', '牛小', '牛单', '牛双', '牛质', '牛合']}
			},
			index:['NNDXd', 'NNDXx', 'NNDSdan', 'NNDSs', 'NNZHz', 'NNZHh'],
			play_lx:''
	    },
		'SH': {
			
			isTable:false,
			title:null,
			content:{
			
				 'tr0': {'td': ['炸弹', '葫芦', '顺子', '三条', '两对', '单对', '散号']}
	        	
			},
			index:['SHZDzd', 'SHHLhl', 'SHSZsz', 'SHSTst', 'SHLDld', 'SHDDdd', 'SHSHsh'],
			'play_lx':''
	    },
		'ZD': {
			
			isTable:false,
			title:{'WQBZD':'万仟佰准对','QBSZD':'仟佰拾准对','BSGZD':'佰拾个准对'},
			content:{
				'tr0': {'td': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
			},
			'play_lx':'WQBZD'
	    },
	
	    'BC': {
			
			isTable:false,
			title:{'WQBBC':'万仟佰不出','QBSBC':'仟佰拾不出','BSGBC':'佰拾个不出'},
			content:{
				'tr0': {'td': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
	          
			},
			'play_lx':'WQBBC'
	    },
	
	    'QT': {
			
			isTable:false,
			title:{'WQB':'万仟佰其它','QBS':'仟佰拾其它','BSG':'佰拾个其它'},
			content:{
				'tr0': {'td': ["豹子", "顺子", "对子", "半顺", "杂六"]}
	           
			},
			index:['BZbz', 'SZsz', 'DZdz', 'BSbs', 'ZLzl'],
			play_lx:'WQB'
	
	    },
		'zspZH': {
			
			isTable:false,
			title:null,
			content:{
				tr:{'td': ['大', '小', '单', '双', '尾大', '尾小', '龙', '虎']}
			},
			index:['KLZHDXd', 'KLZHDXx', 'KLZHDSdan', 'KLZHDSs', 'KLZHWSDXd', 'KLZHWSDXx', 'KLLHl', 'KLLHhu'],
			play_lx:''
	
	    },
		'zspDMSM': {
			
			isTable:false,
			title:{'KLDYH':'第一球','KLDEH':'第二球','KLDSH':'第三球','KLDSIH':'第四球','KLDWH':'第五球','KLDLH':'第六球','KLDQH':'第七球','KLDBH':'第八球'},
			content:{
				 'tr0': {'td': ['大', '小', '单', '双', '合单', '合双', '尾大', '尾小']}
	       
			},
			index:['DXd', 'DXx', 'DSdan', 'DSs', 'HDSdan', 'HDSs', 'WDXd', 'WDXx'],
			play_lx:'KLDYH'
	    }, 
		'GDYZY': {
			
			isTable:false,
			title:null,
			content:{
				'tr0': {'td': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10','11', '12', '13', '14', '15', '16', '17', '18', '19', '20']}
				
			},
			index:['KLXYZY01', 'KLXYZY02', 'KLXYZY03', 'KLXYZY04', 'KLXYZY05', 'KLXYZY06', 'KLXYZY07', 'KLXYZY08', 'KLXYZY09', 'KLXYZY10','KLXYZY11', 'KLXYZY12', 'KLXYZY13', 'KLXYZY14', 'KLXYZY15', 'KLXYZY16', 'KLXYZY17', 'KLXYZY18', 'KLXYZY19', 'KLXYZY20'],
			play_lx:''
		},
		'KLSFZH': {
			
			isTable:false,
			title:null,
			content:{
				'tr0': {'td': ['大', '小', '单', '双', '尾大', '尾小', '龙', '虎']}
			},
			index:['KLZHDXd', 'KLZHDXx', 'KLZHDSdan', 'KLZHDSs', 'KLZHWSDXd', 'KLZHWSDXx', 'KLLHl', 'KLLHhu'],
			play_lx:''
	    }, 
		'KLSFDMSM': {
			
			isTable:false,
			title:{'KLDYH':'第一球','KLDEH':'第二球','KLDSH':'第三球','KLDSIH':'第四球','KLDWH':'第五球', 'KLDLH':'第六球','KLDQH':'第七球','KLTBH':'特别号'},
			content:{
			
				  'tr0': {'td': ['大', '小', '单', '双', '合单', '合双', '尾大', '尾小']}    
			
			},
			index:['DXd', 'DXx', 'DSdan', 'DSs', 'HDSdan', 'HDSs', 'WDXd', 'WDXx'],
			play_lx:'KLDYH'
	    },
		'KLSFTBH': {
			
			isTable:false,
			title:null,
			content:{
				'tr0': {'td': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10','11', '12', '13', '14', '15', '16', '17', '18', '19', '20','大', '小', '单', '双', '合单', '合双', '尾大', '尾小']}
			},
			index:['KLTBH01', 'KLTBH02', 'KLTBH03', 'KLTBH04', 'KLTBH05', 'KLTBH06', 'KLTBH07', 'KLTBH08', 'KLTBH09', 'KLTBH10','KLTBH11', 'KLTBH12', 'KLTBH13', 'KLTBH14', 'KLTBH15', 'KLTBH16', 'KLTBH17', 'KLTBH18', 'KLTBH19', 'KLTBH20','KLTBHDXd', 'KLTBHDXx', 'KLTBHDSdan', 'KLTBHDSs', 'KLTBHHDSdan', 'KLTBHHDSs', 'KLTBHWDXd', 'KLTBHWDXx'],
			play_lx:''
		}, 
		'KLSFYZY': {
			
			isTable:false,
			title:null,
			content:{
			
				'tr0': {'td': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10','11', '12', '13', '14', '15', '16', '17', '18', '19', '20']}
			
			},
			index:['KLXYZY01', 'KLXYZY02', 'KLXYZY03', 'KLXYZY04', 'KLXYZY05', 'KLXYZY06', 'KLXYZY07', 'KLXYZY08', 'KLXYZY09', 'KLXYZY10','KLXYZY11', 'KLXYZY12', 'KLXYZY13', 'KLXYZY14', 'KLXYZY15', 'KLXYZY16', 'KLXYZY17', 'KLXYZY18', 'KLXYZY19', 'KLXYZY20'],
			play_lx:''
	    }, 
		'YWZH': {
			
			isTable:false,
			title:null,
			content:{
				 'tr0': {'td': ['大', '小', '单', '双', '尾大', '尾小', '龙', '虎']}
			},
			index:['YWZHDXd', 'YWZHDXx', 'YWZHDSdan', 'YWZHDSs', 'YWZHWSDXd', 'YWZHWSDXx', 'YWLHl', 'YWLHhu'],
			play_lx:''
	    },
	    'YWDMSM': {
			
			isTable:true,
			title:{'DXd':'大', 'DXx':'小', 'DSdan':'单', 'DSs':'双'},
			content:{
			
				'tr1': {'lable': '第一球', 'merger_odds': true, 'play_lx': 'YWDYH'},
	            'tr2': {'lable': '第二球', 'merger_odds': true, 'play_lx': 'YWDEH'},
	            'tr3': {'lable': '第三球', 'merger_odds': true, 'play_lx': 'YWDSH'},
	            'tr4': {'lable': '第四球', 'merger_odds': true, 'play_lx': 'YWDSIH'},
	            'tr5': {'lable': '第五球', 'merger_odds': true, 'play_lx': 'YWDWH'}
			
			}
	    },
		'YWYZY': {
			
			isTable:false,
			title:null,
			content:{
				
				'tr0': {'td': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']}
			},
			index:['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'],
			play_lx:'YWXYZY'
	    },
		'KBSXP': {
			
			isTable:false,
			title:null,
			content:{
				 'tr0': {'td': ['上', '中', '下']}
			},
			index: ['KBSXPsp', 'KBSXPzp', 'KBSXPxp'],
			play_lx:''
	    },
		'KBJOP': {
			
			isTable:false,
			title:null,
			content:{
				 'tr0': {'td': ['奇', '和', '偶']}
			},
			index:['KBJOPji', 'KBJOPhe', 'KBJOPou'],
			play_lx:''
	    }, 
		'KBDX': {
			
			isTable:false,
			title:null,
			content:{
				 'tr0': {'td': ['大', '和', '小']}
			
			},
			index:['KBDXd', 'KBDXhe', 'KBDXx'],
			play_lx:''
	    },
		'KBDS': {
			
			isTable:false,
			title:null,
			content:{
				 'tr0': {'td': ['单', '双']}
			},
			index:['KBDSdan', 'KBDSs'],
			play_lx:''
	    },
		'KBDXDS': {
			
			isTable:false,
			title:null,
			content:{
			
				 'tr0': {'td': ['大单', '大双', '小单', '小双']}
			
			},
			index:['KBDXDSddan', 'KBDXDSds', 'KBDXDSxdan', 'KBDXDSxs'],
			play_lx:''
	    },
		'BJPKZPS': {
			
			isTable:true,
			title:{'DXd':'大', 'DXx':'小', 'DSdan':'单', 'DSs':'双', 'LHl':'龙', 'LHhu':'虎'},
			content:{
			
				 'tr1': {'lable': '冠军', 'merger_odds': true, 'play_lx': 'PKDYH'},
	            'tr2': {'lable': '亚军', 'merger_odds': true, 'play_lx': 'PKDEH'},
	            'tr3': {'lable': '季军', 'merger_odds': true, 'play_lx': 'PKDSH'},
	            'tr4': {'lable': '第四名', 'merger_odds': true, 'play_lx': 'PKDSIH'},
	            'tr5': {'lable': '第五名', 'merger_odds': true, 'play_lx': 'PKDWH'},
	            'tr6': {'lable': '第六名', 'merger_odds': true, 'play_lx': 'PKDLH'},
	            'tr7': {'lable': '第七名', 'merger_odds': true, 'play_lx': 'PKDQH'},
	            'tr8': {'lable': '第八名', 'merger_odds': true, 'play_lx': 'PKDBH'},
	            'tr9': {'lable': '第九名', 'merger_odds': true, 'play_lx': 'PKDJH'},
	            'tr10': {'lable': '第十名', 'merger_odds': true, 'play_lx': 'PKDSHIH'}
			
			}
	    },
		'GYJH': {
			
			isTable:false,
			title:null,
			content:{
			
				  'tr0': {'td': ['3, 4, 18, 19', '5, 6, 16, 17', '7, 8, 14, 15', '9, 10, 12, 13', '11']}
			
			},
			index:['3_4_18_19', '5_6_16_17', '7_8_14_15', '9_10_12_13', '11'],
			play_lx:'PKGYJH'
	    },
	
		'zspTBH': {
			
			isTable:false,
			title:null,
			content:{
			
				'tr0': {'td': ['特大', '特小', '特单', '特双', '合单', '合双', '特尾大', '特尾小']}	
			
			},
			index:['GXTBHDSs', 'GXTBHDXx', 'GXTBHDSdan', 'GXTBHDSs', 'GXTBHHDSdan', 'GXTBHHDSs', 'GXTBHWDXd', 'GXTBHWDXx'],
			play_lx:''
		},
	
	    'ZM14': {
			
			isTable:false,
			title:{'GXDYH':'正码一','GXDEH':'正码二','GXDSH':'正码三','GXDSIH':'正码四'},
			content:{
			
				 'tr0': {'td': ['大', '小', '单', '双', '合单', '合双', '尾大', '尾小']}  
			
			},
			index:[ 'DXd', 'DXx', 'DSdan', 'DSs', 'HDSdan', 'HDSs', 'WDXd', 'WDXx'],
			play_lx:'GXDYH'
	    },
		'TBH':{
			
			isTable:false,
			title:null,
			content:{
				'tr0':{'td':['01', '02', '03', '04', '05', '06', '07', '08','09', '10', '11', '12', '13', '14', '15', '16','17', '18', '19', '20', '21','特大', '特小', '特单', '特双', '合单', '合双', '特尾大', '特尾小','大单', '大双', '小单', '小双', '红波', '蓝波', '绿波']}
			},
			index:['GXTBH01', 'GXTBH02', 'GXTBH03', 'GXTBH04', 'GXTBH05', 'GXTBH06', 'GXTBH07', 'GXTBH08','GXTBH09', 'GXTBH10', 'GXTBH11', 'GXTBH12', 'GXTBH13', 'GXTBH14', 'GXTBH15', 'GXTBH16','GXTBH17', 'GXTBH18', 'GXTBH19', 'GXTBH20', 'GXTBH21','GXTBHDXd', 'GXTBHDXx', 'GXTBHDSdan', 'GXTBHDSs', 'GXTBHHDSdan', 'GXTBHHDSs', 'GXTBHWDXd', 'GXTBHWDXx','GXTBHDXDSddan', 'GXTBHDXDSds', 'GXTBHDXDSxdan', 'GXTBHDXDSxs', 'GXTBHCho', 'GXTBHCla', 'GXTBHCv'],
			play_lx:'',
			hasBg:true
		},
		'GXYZY': {
			
			isTable:false,
			title:null,
			content:{
				'tr0': {'td': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11','12', '13', '14', '15', '16', '17', '18', '19', '20','21']}
	           
			},
			index:['GXXYZY01', 'GXXYZY02', 'GXXYZY03', 'GXXYZY04', 'GXXYZY05', 'GXXYZY06', 'GXXYZY07', 'GXXYZY08', 'GXXYZY09', 'GXXYZY10', 'GXXYZY11','GXXYZY12', 'GXXYZY13', 'GXXYZY14', 'GXXYZY15', 'GXXYZY16', 'GXXYZY17', 'GXXYZY18', 'GXXYZY19', 'GXXYZY20', 'GXXYZY21', 'GXXYZY22'],
			play_lx:''
		},
	
		'LHZMZHDXDS': {
			
			isTable:false,
			title:null,
			content:{
				'tr0': {'td': ['正码总大', '正码总小', '正码总单', '正码总双']}
			},
			index:['LHZHDXd', 'LHZHDXx', 'LHZHDSdan', 'LHZHDSs'],
			play_lx:''
	    },
		'LHTBH': {
			
			isTable:false,
			title:null,
			content:{
			
				 'tr0': {'td': ['特大', '特小', '特单', '特双', '合大', '合小', '合单', '合双', '尾大', '尾小']}
					
			},
			index:['LHTBHDXd', 'LHTBHDXx', 'LHTBHDSdan', 'LHTBHDSs', 'LHTBHHSDXd', 'LHTBHHSDXx', 'LHTBHHSDSdan', 'LHTBHHSDSs', 'LHTBHWDXd', 'LHTBHWDXx'],
			play_lx:''
	    },
		'LHZM1-6': {
			
			isTable:false,
			title:{'LHTBH':'特别号','LHDYH':'正码一','LHDEH':'正码二','LHDSH':'正码三','LHDSIH':'正码四','LHDWH':'正码五','LHDLH':'正码六' },
			content:{
				 'tr0': {'td': ['大', '小', '单', '双', '合大', '合小', '合单', '合双', '尾大', '尾小']}
	            
			},
			index:['DXd', 'DXx', 'DSdan', 'DSs', 'HSDXd', 'HSDXx', 'HSDSdan', 'HSDSs', 'WDXd', 'WDXx'],
			play_lx:'LHTBH'
		}, 
		'LHTBHTS': {
			
			isTable:false,
			title:null,
			content:{
				 'tr0': {'td': ['0头', '1头', '2头', '3头', '4头']}  
			},
			play_lx:'LHTBHTS'
	    },
		'LHTBHWS': {
			
			isTable:false,
			title:null,
			content:{
				 'tr0': {'td': ['0尾', '1尾', '2尾', '3尾', '4尾', '5尾', '6尾', '7尾', '8尾', '9尾']}
			},
			play_lx:'LHTBHWS'
	    }, 
		'LHZMYL': {
			
			isTable:false,
			title:{'LHDYH':'正码一', 'LHDEH':'正码二','LHDSH':'正码三', 'LHDSH':'正码四', 'LHDWH':'正码五', 'LHDLH':'正码六'},
			content:{
				 'tr00':{'td':['大','小','单','双','红波','蓝波','绿波','合大','合小','尾大','尾小','合单', '合双']}
			},
			index:['DXd','DXx','DSdan','DSs','Cho','Cla','Cv','HSDXd','HSDXx','WDXd','WDXx','HSDSdan','HSDSs'],
			play_lx:'LHDYH'
		},
		'LHTBHSB': {
			
			isTable:false,
			title:{
				'LHTBHC': '特别号色波',
				'LHDYHC': '正码一特',
				'LHDEHC': '正码二特',
				'LHDSHC': '正码三特',
				'LHDSIHC': '正码四特',
				'LHDWHC': '正码五特',
				'LHDLHC': '正码六特'
			},
			content:{
				'tr0': {'td': ['红波', '蓝波', '绿波']}   
			},
			index:['ho', 'la', 'v'],
			play_lx:'LHTBHC'
	    },
		'LHTBHBSB': {
			
			isTable:false,
			title:null,
			content:{
				'tr0': {'lable':'赔率','td': ['红大', '红小', '红单', '红双','蓝大', '蓝小', '蓝单', '蓝双','绿大', '绿小', '绿单', '绿双']}            
	       	
			},
			index:['LHTBHBDXhd', 'LHTBHBDXhx', 'LHTBHBDShdan', 'LHTBHBDShs','LHTBHBDXld', 'LHTBHBDXlx', 'LHTBHBDSldan', 'LHTBHBDSls','LHTBHBDXvd', 'LHTBHBDXvx', 'LHTBHBDSvdan', 'LHTBHBDSvs'],
			play_lx:''
		}, 
		'LHTBHBBSB': {
			
			isTable:false,
			title:null,
			content:{
	            'tr0': {'td': ['红大单', '红大双', '红小单', '红小双','蓝大单', '蓝大双', '蓝小单', '蓝小双','绿大单', '绿大双', '绿小单', '绿小双']}
			},
			index:['LHTBHBBhddan', 'LHTBHBBhds', 'LHTBHBBhxdan', 'LHTBHBBhxs','LHTBHBBlddan', 'LHTBHBBlds', 'LHTBHBBlxdan', 'LHTBHBBlxs','LHTBHBBvddan', 'LHTBHBBvds', 'LHTBHBBvxdan', 'LHTBHBBvxs'],
			play_lx:''
		},
		'LHQSB':{
			isTable:false,
			title:null,
			content:{
				 'tr0': {'td': ['红波','蓝波','绿波','和局']}
			
			},
			index:['LHQSBho','LHQSBla','LHQSBv','LHQSBhe'],
			play_lx:''
		},
		'LHZM': {
			
			isTable:false,
			title:null,
			content:{
				'tr0': {'td': ["01", "11", "21", "31", "41", "02", "12", "22", "32", "42", "03", "13", "23", "33", "43", "04", "14", "24", "34", "44", "05", "15", "25", "35", "45", "06", "16", "26", "36", "46", "07", "17", "27", "37", "47", "08", "18", "28", "38", "48", "09", "19", "29", "39", "49", "10", "20", "30", "40",'总大', '总小', '总单', '总双']}  
			},
			index:["LHZM01", "LHZM11", "LHZM21", "LHZM31", "LHZM41", "LHZM02", "LHZM12", "LHZM22", "LHZM32", "LHZM42", "LHZM03", "LHZM13", "LHZM23", "LHZM33", "LHZM43", "LHZM04", "LHZM14", "LHZM24", "LHZM34", "LHZM44", "LHZM05", "LHZM15", "LHZM25", "LHZM35", "LHZM45", "LHZM06", "LHZM16", "LHZM26", "LHZM36", "LHZM46", "LHZM07", "LHZM17", "LHZM27", "LHZM37", "LHZM47", "LHZM08", "LHZM18", "LHZM28", "LHZM38", "LHZM48", "LHZM09", "LHZM19", "LHZM29", "LHZM39", "LHZM49", "LHZM10", "LHZM20", "LHZM30", "LHZM40",'LHZHDXd', 'LHZHDXx', 'LHZHDSdan', 'LHZHDSs'],
			play_lx:'',
			hasBg:true
		},
		'LHZTWS': {
			
			isTable:false,
			title:null,
			content:{
				'tr0': {'td': ['0尾', '1尾', '2尾', '3尾', '4尾', '5尾', '6尾', '7尾', '8尾', '9尾']}  
				
			},
			play_lx:'LHZTWS'
	    },
		'LHPTZX': {
			
			isTable:false,
			title:null,
			content:{
				'tr0': {'td': ['234肖', '5肖', '6肖', '7肖']}  
			},
			index:['234', '5', '6', '7'],
			play_lx:'LHZXS'
	    },
		'LHZXDS': {
			
			isTable:false,
			title:null,
			content:{
				 'tr0': {'td': ['总肖单', '总肖双']}   
			},
			index:['LHZXDSdan', 'LHZXDSs'],
			play_lx:''
	    }
		/**********frame_01 end********************/
	
	}
	var itemOBJ = {
	    'fcssl': {
	        'menu': {
	            'zsp': {
	                'actName': '主勢盤',
	                'item': {
	                    'FCYZZH': {
	                        'titleName': '一字组合', 
							'Frame_01': true,
	                        'playLx': {'FCHSYZZH': '一字组合'}
	                    },
	                    'FCSM': {
	                        'titleName': '双面', 'Frame_01': true,
	                        'playLx': {
	                            'FCBDX': '佰大小', 'FCBDS': '佰单双', 'FCBZH': '佰质合', 'FCSDX': '拾大小', 'FCSDS': '拾单双', 'FCSZH': '拾质合', 'FCGDX': '个大小', 'FCGDS': '个单双',
	                            'FCGZH': '个质合', 'FCBSHSDS': '佰拾和数单双', 'FCSGHSDS': '拾个和数单双', 'FCBGHSDS': '佰个和数单双', 'FCBSHSWSDX': '佰拾和数尾数大小', 'FCBSHSWSZH': '佰拾和数尾数质合',
	                            'FCBGHSWSDX': '佰个和数尾数大小', 'FCBGHSWSZH': '佰个和数尾数质合', 'FCSGHSWSDX': '拾个和数尾数大小', 'FCSGHSWSZH': '拾个和数尾数质合', 'FCZHSDX': '佰拾个和数大小',
	                            'FCZHSWSDX': '佰拾个和数尾数大小', 'FCZHSDS': '佰拾个和数单双', 'FCZHSWSZH': '佰拾个和数尾数质合'
	                        }
	                    }
	                }
	            },
	            'yz': {
	                'actName': '一字',
	                'item': {
	                    'FCYZZH': {
	                        'titleName': '一字组合', 'Frame_01': true,
	                        'playLx': {'FCHSYZZH': '一字组合'}
	                    },
	                    'FCZDW': {
	                        'titleName': '一字定位', 'Frame_01': true,
	                        'playLx': {'FCBDW': '佰定位', 'FCSDW': '拾定位', 'FCGDW': '个定位'}
	                    },
	                    'FCZSM': {'titleName': '一字双面', 'Frame_01': true, 'playLx': {'FCBDX': '佰大小', 'FCBDS': '佰单双', 'FCBZH': '佰质合', 'FCSDX': '拾大小', 'FCSDS': '拾单双', 'FCSZH': '拾质合', 'FCGDX': '个大小', 'FCGDS': '个单双', 'FCGZH': '个质合'}}}},
	            'ez': {
	                'actName': '二字',
	                'item': {
	                    'FCEZZH': {'titleName': '三选二', 'Frame_02': true, 'ZuHe': 2, 'playLx': {'FCEZZH': '三选二'}},
	                    'FCEZZX': {'titleName': '二字组选', 'Frame_02': true, 'ZuXuan': 1, 'noSelect': 2, 'playLx': {'FCBSZX': '百拾组选', 'FCBGZX': '百个组选', 'FCSGZX': '拾个组选'}},
	                    'FCEZDW': {'titleName': '二字定位', 'Frame_02': true, 'DingWei': 2, 'playLx': {'FCB_S': '佰拾定位', 'FCB_G': '佰个定位', 'FCS_G': '拾个定位'}}
	                }
	            },
	            'ezhs': {'actName': '二字和数',
	                'item': {
	                    'FCEZHS': {'titleName': '二字和数', 'Frame_01': true, 'playLx': {'FCBSHS': '佰拾和数', 'FCBGHS': '佰个和数', 'FCSGHS': '拾个和数'}},
	                    'FCEZHSWS': {'titleName': '二字和数尾数', 'Frame_01': true, 'playLx': {'FCBSHSWS': '佰拾和数尾数', 'FCBGHSWS': '佰个和数尾数', 'FCSGHSWS': '拾个和数尾数'}},
	                    'FCEZHSSM': {
	                        'titleName': '二字和数双面', 'Frame_01': true, 'playLx': {'FCBSHSDS': '佰拾和数单双', 'FCBSHSWSDX': '佰拾和数尾数大小', 'FCBSHSWSZH': '佰拾和数尾数质合',
	                        'FCBGHSDS': '佰个和数单双', 'FCBGHSWSDX': '佰个和数尾数大小', 'FCBGHSWSZH': '佰个和数尾数质合',
	                        'FCSGHSDS': '拾个和数单双', 'FCSGHSWSDX': '拾个和数尾数大小', 'FCSGHSWSZH': '拾个和数尾数质合'}
	                    }
	                }
	            },
	            'sz': {'actName': '三字',
	                'item': {
	                    'FCZZX': {'titleName': '三字组选', 'Frame_02': true, 'ZuHe': 3, 'playLx': {'FCZZX': '三字组选'}},
	                    'FCSZDW': {'titleName': '三字定位', 'Frame_02': true, 'DingWei': 3, 'playLx': {'FCSZDW': '三字定位'}}
	                }
	            },
	            'szhs': {
	                'actName': '三字和数',
	                'item': {
	                    'FCSZHS': {'titleName': '佰拾个和数', 'Frame_01': true, 'playLx': {'FCZHS': '佰拾个和数'}},
	                    'FCSZHSWS': {'titleName': '佰拾个和数尾数', 'Frame_01': true, 'playLx': {'FCZHSWS': '佰拾个和数尾数'}},
	                    'FCSZHSSM': {'titleName': '佰拾个双面', 'Frame_01': true, 'playLx': {'FCZHSDX': '佰拾个和数大小', 'FCZHSDS': '佰拾个和数单双', 'FCZHSWSDX': '佰拾个和数尾数大小', 'FCZHSWSZH': '佰拾个和数尾数质合'}}
	                }
	            },
	            'zxs': {'actName': '組選三',
	                'item': {'FCHSZXS': {'titleName': ''/*'组选三'*/, 'Frame_03': true, 'playLx': {'FCHSZXS': '组选三'}}}},
	            'zxl': {'actName': '組選六',
	                'item': {'FCHSZXL': {'titleName': ''/*'组选六'*/, 'Frame_03': true, 'playLx': {'FCHSZXL': '组选六'}}}},
	            'fszh': {'actName': '複式組合',
	                'item': {'FCFSZH': {'titleName': ''/*'複式組合'*/, 'Frame_05': true, 'playLx': {'FCFSZH': '複式組合'}}}},
	            'yzgg': {'actName': '一字过关',
	                'item': {'FCYZGG': {'titleName': ''/*'一字过关'*/, 'Frame_04': true, 'playLx': {'FCYZGG': '一字过关'}}}},
	            'kd': {'actName': '跨度',
	                'item': {'FCKD': {'titleName': ''/*'跨度'*/, 'Frame_01': true, 'playLx': {'FCHSKD': '跨度'}}}},
	            'qt': {'actName': '其他',
	                'item': {'FCZD': {'titleName': '准对', 'Frame_01': true, 'playLx': {'FCZZD': '准对'}},
	                    'FCBC': {'titleName': '不出', 'Frame_01': true, 'playLx': {'FCZBC': '不出'}},
	                    'FCQT': {'titleName': '其它', 'Frame_01': true, 'playLx': {'FCZBZ': '其它豹子', 'FCZDZ': '其它对子', 'FCZSZ': '其它顺子', 'FCZBS': '其它半顺', 'FCZZL': '其它杂六'}}}}},
	        'gameLx': {12: {'gameName': "福彩时时乐"}, 52: {'gameName': "福彩3D"}, 62: {'gameName': "排列3"}}},
	
	    'ssc': {'menu': {'zsp': {'actName': '主勢盤',
	        'item': {
	            'YZZH': {'titleName': '一字组合', 'Frame_10': true, 'playLx': {'QSYZZH': '前三一字组合', 'ZSYZZH': '中三一字组合', 'HSYZZH': '后三一字组合', 'QWYZZH': '全五一字组合'}},
	            'YZDWSM': {'titleName': '一字双面', 'Frame_01': true, 'playLx': {'WDX': '万大小', 'QDX': '仟大小', 'BDX': '佰大小', 'SDX': '拾大小', 'GDX': '个大小', 'WDS': '万单双', 'QDS': '仟单双', 'BDS': '佰单双', 'SDS': '拾单双', 'GDS': '个单双', 'WZH': '万质合', 'QZH': '仟质合', 'BZH': '佰质合', 'SZH': '拾质合', 'GZH': '个质合'}},
	            'EZHSDS': {'titleName': '二字和数单双', 'Frame_01': true, 'playLx': {'WQHSDS': '万仟和数单双', 'WBHSDS': '万佰和数单双', 'WSHSDS': '万拾和数单双', 'WGHSDS': '万个和数单双', 'QBHSDS': '仟佰和数单双', 'QSHSDS': '仟拾和数单双', 'QGHSDS': '仟个和数单双', 'BSHSDS': '佰拾和数单双', 'BGHSDS': '佰个和数单双', 'SGHSDS': '拾个和数单双'}},
	            'SZHSSM': {'titleName': '三字和数双面', 'Frame_01': true, 'playLx': {'WQBHSDX': '万仟佰和数大小', 'WQBHSDS': '万仟佰和数单双', 'WQBHSWSDX': '万仟佰和数尾大小', 'WQBHSWSZH': '万仟佰和数尾质合', 'QBSHSDX': '仟佰拾和数大小', 'QBSHSDS': '仟佰拾和数单双', 'QBSHSWSDX': '仟佰拾和数尾大小', 'QBSHSWSZH': '仟佰拾和数尾质合', 'BSGHSDX': '佰拾个和数大小', 'BSGHSDS': '佰拾个和数单双', 'BSGHSWSDX': '佰拾个和数尾大小', 'BSGHSWSZH': '佰拾个和数尾质合'}}}},
	        'yz': {
	            'actName': '一字',
	            'item': {
	                'YZZH': {'titleName': '一字组合', 'Frame_10': true, 'playLx': {'QSYZZH': '前三一字组合', 'ZSYZZH': '中三一字组合', 'HSYZZH': '后三一字组合', 'QWYZZH': '全五一字组合'}},
	                'YZDW': {'titleName': '一字定位', 'Frame_01': true, 'playLx': {'WDW': '万定位', 'QDW': '仟定位', 'BDW': '佰定位', 'SDW': '拾定位', 'GDW': '个定位'}},
	                'YZDWSM': {'titleName': '一字双面', 'Frame_01': true, 'playLx': {'WDX': '万大小', 'QDX': '仟大小', 'BDX': '佰大小', 'SDX': '拾大小', 'GDX': '个大小', 'WDS': '万单双', 'QDS': '仟单双', 'BDS': '佰单双', 'SDS': '拾单双', 'GDS': '个单双', 'WZH': '万质合', 'QZH': '仟质合', 'BZH': '佰质合', 'SZH': '拾质合', 'GZH': '个质合'}}
	            }
	        },
	        'ez': {
	            'actName': '二字',
	            'item': {
	                'SZSXE': {'titleName': '三选二', 'Frame_02': true, 'ZuHe': 2, 'playLx': {'QSEZZH': '前三选二', 'ZSEZZH': '中三选二', 'HSEZZH': '后三选二'}},
	                'EZZX': {'titleName': '二字组选', 'Frame_02': true, 'ZuXuan': 1, 'noSelect': 2, 'playLx': {'WQZX': '万千组选', 'WBZX': '万百组选', 'WSZX': '万拾组选', 'WGZX': '万个组选', 'QBZX': '千百组选', 'QSZX': '千拾组选', 'QGZX': '千个组选', 'BSZX': '百拾组选', 'BGZX': '百个组选', 'SGZX': '拾个组选'}},
	                'EZDW': {'titleName': '二字定位', 'Frame_02': true, 'DingWei': 2, 'playLx': {'W_Q': '万仟定位', 'W_B': '万百定位', 'W_S': '万拾定位', 'W_G': '万个定位', 'Q_B': '仟百定位', 'Q_S': '仟拾定位', 'Q_G': '仟个定位', 'B_S': '百拾定位', 'B_G': '百个定位', 'S_G': '拾个定位'}}
	            }
	        },
	        'ezhs': {'actName': '二字和数',
	            'item': {
	                'EZHSDS': {'titleName': '二字和数单双', 'Frame_01': true, 'playLx': {'WQHSDS': '万仟和数单双', 'WBHSDS': '万佰和数单双', 'WSHSDS': '万拾和数单双', 'WGHSDS': '万个和数单双', 'QBHSDS': '仟佰和数单双', 'QSHSDS': '仟拾和数单双', 'QGHSDS': '仟个和数单双', 'BSHSDS': '佰拾和数单双', 'BGHSDS': '佰个和数单双', 'SGHSDS': '拾个和数单双'}},
	                'EZHSWSDX': {'titleName': '二字和数尾数大小', 'Frame_01': true, 'playLx': {'WQHSWSDX': '万仟数尾数大小', 'WBHSWSDX': '万佰数尾数大小', 'WSHSWSDX': '万拾数尾数大小', 'WGHSWSDX': '万个数尾数大小', 'QBHSWSDX': '仟佰数尾数大小', 'QSHSWSDX': '仟拾数尾数大小', 'QGHSWSDX': '仟个数尾数大小', 'BSHSWSDX': '佰拾数尾数大小', 'BGHSWSDX': '佰个数尾数大小', 'SGHSWSDX': '拾个数尾数大小'}},
	                'EZHSWSZH': {'titleName': '二字和数尾数质合', 'Frame_01': true, 'playLx': {'WQHSWSZH': '万仟数尾数质合', 'WBHSWSZH': '万佰数尾数质合', 'WSHSWSZH': '万拾数尾数质合', 'WGHSWSZH': '万个数尾数质合', 'QBHSWSZH': '仟佰数尾数质合', 'QSHSWSZH': '仟拾数尾数质合', 'QGHSWSZH': '仟个数尾数质合', 'BSHSWSZH': '佰拾数尾数质合', 'BGHSWSZH': '佰个数尾数质合', 'SGHSWSZH': '拾个数尾数质合'}}
	            }
	        },
	        'sz': {'actName': '三字',
	            'item': {
	                'SZZX': {'titleName': '三字组选', 'Frame_02': true, 'ZuHe': 3, 'playLx': {'WQBZX': '万仟佰组选', 'QBSZX': '仟佰拾组选', 'BSGZX': '佰拾个组选'}},
	                'SZDW': { 'titleName': '三字定位', 'Frame_02': true, 'DingWei': 3, 'playLx': {'W_Q_B': '万仟佰定位', 'Q_B_S': '仟佰拾定位', 'B_S_G': '佰拾个定位'}}
	            }
	        },
	        'szhs': {'actName': '三字和数',
	            'item': {
	                'SZHS': {'titleName':'' /*'三字和数'*/, 'Frame_10': true, 'playLx': {'WQBHS': '万仟佰和数', 'QBSHS': '仟佰拾和数', 'BSGHS': '佰拾个和数'}},
	                'SZHSWS': {'titleName': '三字和数尾数', 'Frame_10': true, 'playLx': {'WQBHSWS': '万仟佰和数尾数', 'QBSHSWS': '仟佰拾和数尾数', 'BSGHSWS': '佰拾个和数尾数'}},
	                'SZHSSM': {'titleName': '三字和数双面', 'Frame_01': true, 'playLx': {'WQBHSDX': '万仟佰和数大小', 'WQBHSDS': '万仟佰和数单双', 'WQBHSWSDX': '万仟佰和数尾大小', 'WQBHSWSZH': '万仟佰和数尾质合', 'QBSHSDX': '仟佰拾和数大小', 'QBSHSDS': '仟佰拾和数单双', 'QBSHSWSDX': '仟佰拾和数尾大小', 'QBSHSWSZH': '仟佰拾和数尾质合', 'BSGHSDX': '佰拾个和数大小', 'BSGHSDS': '佰拾个和数单双', 'BSGHSWSDX': '佰拾个和数尾大小', 'BSGHSWSZH': '佰拾个和数尾质合'}}
	            }},
	        'wz': {'actName': '五字',
	            'item': {'WZHS': {'titleName': '五字和数', 'Frame_01': true, 'playLx': {'WZHS': '五字和数'}},
	                'WZHSWS': {'titleName': '五字和数尾数', 'Frame_01': true, 'playLx': {'WZHSWS': '五字和数尾数'}},
	                'SM': {'titleName': '双面', 'Frame_01': true, 'playLx': {'WZHSDX': '五字和数大小', 'WZHSDS': '五字和数单双', 'WZHSWSDX': '五字和数尾数大小', 'WZHSWSZH': '五字和数尾数质合'}},
	                'WZLH': {'titleName': '龙虎', 'Frame_01': true, 'playLx': {'WZLH': '龙虎'}}}},
	        'zxs': {'actName': '组选三',
	            'item': {'ZXS': {'titleName': ''/*'组选三'*/, 'Frame_03': true, 'playLx': {'QSZXS': '前三组选三', 'ZSZXS': '中三组选三', 'HSZXS': '后三组选三'}}}},
	        'zxl': {'actName': '组选六',
	            'item': {'ZXL': {'titleName':'' /*'组选六'*/, 'Frame_03': true, 'playLx': {'QSZXL': '前三组选六', 'ZSZXL': '中三组选六', 'HSZXL': '后三组选六'}}}},
	        'kd': {'actName': '跨度',
	            'item': {
	                'KD': {'titleName': ''/*'跨度'*/, 'Frame_10': true, 'playLx': {'QSKD': '前三跨度', 'ZSKD': '中三跨度', 'HSKD': '后三跨度'}}
	            }},
	        'nn': {
	            'actName': '牛牛/梭哈',
	            'item': {
	                'NN': {'titleName': '牛牛', 'Frame_01': true, 'playLx': {NN: '牛牛'}},
	                'NNSM': {'titleName': '牛牛双面', 'Frame_01': true, 'playLx': {NNDX: '牛牛大小', NNDS: '牛牛单双', NNZH: '牛牛质合'}},
	                'SH': {'titleName': '梭哈', 'Frame_01': true, 'playLx': {SHZD: '梭哈', SHHL: '梭哈', SHSZ: '梭哈', SHST: '梭哈', SHLD: '梭哈', SHDD: '梭哈', SHSH: '梭哈'}
	                }
	            }
	        },
	        'qt': {'actName': '其它',
	            'item': {
					'QT': {'titleName':'' /*'其它'*/,
						'Frame_01': true, 
						'playLx': {'WQBDZ': '万仟佰其它', 'WQBBZ': '万仟佰其它', 'WQBSZ': '万仟佰其它', 'WQBBS': '万仟佰其它', 'WQBZL': '万仟佰其它', 'QBSDZ': '仟佰拾其它', 'QBSBZ': '仟佰拾其它', 'QBSSZ': '仟佰拾其它', 'QBSBS': '仟佰拾其它', 'QBSZL': '仟佰拾其它', 'BSGDZ': '佰拾个其它', 'BSGBZ': '佰拾个其它', 'BSGSZ': '佰拾个其它', 'BSGBS': '佰拾个其它', 'BSGZL': '佰拾个其它'}
	                },
					'ZD': {'titleName': '组三准对', 'Frame_01': true, 'playLx': {'WQBZD': '万仟佰准对', 'QBSZD': '仟佰拾准对', 'BSGZD': '佰拾个准对'}},
	                'BC': {'titleName': '组三不出', 'Frame_01': true, 'playLx': {'WQBBC': '万仟佰不出', 'QBSBC': '仟佰拾不出', 'BSGBC': '佰拾个不出'}}
	                
	            }
	        }
	    },
	        'gameLx': {11: {'gameName': '重庆时时彩'}, 13: {'gameName': '江西时时彩'}, 14: {'gameName': '天津时时彩'}, 15: {'gameName': '新疆时时彩'}, 63: {'gameName': '排列5'}}},
	    'gxklsf': {'menu': {'zsp': {'actName': '主勢盤',
	        'item': {'zspTBH': {'titleName': '特别号', 'Frame_01': true, 'playLx': {'GXTBHDX': '特别号特大小', 'GXTBHDS': '特别号特单双', 'GXTBHWDX': '特别号特尾大小', 'GXTBHHDS': '特别号合单双'}},
	            'ZM14': {'titleName': '正码1-4', 'Frame_01': true, 'playLx': {'GXDYHDX': '正码1大小', 'GXDYHDS': '正码1单双', 'GXDYHHDS': '正码1合单双', 'GXDYHWDX': '正码1尾大小',
	                'GXDEHDX': '正码2大小', 'GXDEHDS': '正码2单双', 'GXDEHHDS': '正码2合单双', 'GXDEHWDX': '正码2尾大小',
	                'GXDSHDX': '正码3大小', 'GXDSHDS': '正码3单双', 'GXDSHHDS': '正码3合单双', 'GXDSHWDX': '正码3尾大小',
	                'GXDSIHDX': '正码4大小', 'GXDSIHDS': '正码4单双', 'GXDSIHHDS': '正码4合单双', 'GXDSIHWDX': '正码4尾大小'}}}},
	        'tbh': {'actName': '特别号',
	            'item': {'TBH': {'titleName': ''/*'特别号'*/, 'Frame_01': true, 'playLx': {'GXTBH': '特别号', 'GXTBHC': '特别号红蓝绿', 'GXTBHDX': '特别号特大小', 'GXTBHDS': '特别号特单双', 'GXTBHWDX': '特别号特尾大小', 'GXTBHHDS': '特别号合单双', 'GXTBHDXDS': '特别号大小单双'}}}},
	        'sjwx': {'actName': '四季/五行',
	            'item': {
	                'GXSJWX': {
	                    'titleName': ''/*'四季/五行'*/,
	                    'Frame_10': true,
	                    'playLx': {
	                        'GXDYHWX': '正码1五行', 'GXDYHSJ': '正码1四季', 'GXDEHWX': '正码2五行', 'GXDEHSJ': '正码2四季',
	                        'GXDSHWX': '正码3五行', 'GXDSHSJ': '正码3四季', 'GXDSIHWX': '正码4五行', 'GXDSIHSJ': '正码4四季',
	                        'GXTBHWX': '特别号五行', 'GXTBHSJ': '特别号四季'
	                    }
	                }
	            }},
	        'zmt': {'actName': '正码特',
	            'item': {
	                'GXZM': {
	                    'titleName':'' /*'正码特'*/,
	                    'Frame_10': true,
	                    'playLx': {
	                        'GXDYH': '正码1特', 'GXDYHC': '正码1特红蓝绿', 'GXDYHDX': '正码1特特大小', 'GXDYHDS': '正码1特特单双', 'GXDYHHDS': '正码1特合单双', 'GXDYHWDX': '正码1特特尾大小', 'GXDYHDXDS': '正码1特大小单双',
	                        'GXDEH': '正码2特', 'GXDEHC': '正码2特红蓝绿', 'GXDEHDX': '正码2特特大小', 'GXDEHDS': '正码2特特单双', 'GXDEHHDS': '正码2特合单双', 'GXDEHWDX': '正码2特特尾大小', 'GXDEHDXDS': '正码2特大小单双',
	                        'GXDSH': '正码3特', 'GXDSHC': '正码3特红蓝绿', 'GXDSHDX': '正码3特特大小', 'GXDSHDS': '正码3特特单双', 'GXDSHHDS': '正码3特合单双', 'GXDSHWDX': '正码3特特尾大小', 'GXDSHDXDS': '正码3特大小单双',
	                        'GXDSIH': '正码4特', 'GXDSIHC': '正码4特红蓝绿', 'GXDSIHDX': '正码4特特大小', 'GXDSIHDS': '正码4特特单双', 'GXDSIHHDS': '正码4特合单双', 'GXDSIHWDX': '正码4特特尾大小', 'GXDSIHDXDS': '正码4特大小单双'
	                    }
	                }
	            }},
	        'yzy': {'actName': '一中一',
	            'item': {'GXYZY': {'titleName': ''/*'一中一'*/, 'Frame_01': true, 'playLx': {'GXXYZY': '广西一中一'}}}}},
	        'gameLx': {22: {'gameName': "广西快乐十分"}}},
	    'gdklsf': {'menu': {'zsp': {'actName': '主勢盤',
	        'item': {'zspZH': {'titleName': '总和', 'Frame_01': true, 'playLx': {'KLZHDX': '总和大小', 'KLZHDS': '总和单双', 'KLZHWSDX': '总和尾大小', 'KLLH': '总和龙虎'}},
	            'zspDMSM': {'titleName': '单码/双面', 'Frame_01': true, 'playLx': {'KLDYHDX': '第一球大小', 'KLDYHDS': '第一球单双', 'KLDYHHDS': '第一球合单双', 'KLDYHWDX': '第一球尾大小',
	                'KLDEHDX': '第二球大小', 'KLDEHDS': '第二球单双', 'KLDEHHDS': '第二球合单双', 'KLDEHWDX': '第二球尾大小',
	                'KLDSHDX': '第三球大小', 'KLDSHDS': '第三球单双', 'KLDSHHDS': '第三球合单双', 'KLDSHWDX': '第三球尾大小',
	                'KLDSIHDX': '第四球大小', 'KLDSIHDS': '第四球单双', 'KLDSIHHDS': '第四球合单双', 'KLDSIHWDX': '第四球尾大小',
	                'KLDWHDX': '第五球大小', 'KLDWHDS': '第五球单双', 'KLDWHHDS': '第五球合单双', 'KLDWHWDX': '第五球尾大小',
	                'KLDLHDX': '第六球大小', 'KLDLHDS': '第六球单双', 'KLDLHHDS': '第六球合单双', 'KLDLHWDX': '第六球尾大小',
	                'KLDQHDX': '第七球大小', 'KLDQHDS': '第七球单双', 'KLDQHHDS': '第七球合单双', 'KLDQHWDX': '第七球尾大小',
	                'KLDBHDX': '第八球大小', 'KLDBHDS': '第八球单双', 'KLDBHHDS': '第八球合单双', 'KLDBHWDX': '第八球尾大小'}}}},
	        'dmsm': {'actName': '单码/双面',
	            'item': {
	                'GDDMSM': {
	                    'titleName': ''/*'单码/双面'*/,
	                    'Frame_10': true,
	                    'playLx': {
	                        'KLDYH': '第一球', 'KLDYHDX': '第一球大小', 'KLDYHDS': '第一球单双', 'KLDYHHDS': '第一球合单双', 'KLDYHWDX': '第一球尾大小',
	                        'KLDEH': '第二球', 'KLDEHDX': '第二球大小', 'KLDEHDS': '第二球单双', 'KLDEHHDS': '第二球合单双', 'KLDEHWDX': '第二球尾大小',
	                        'KLDSH': '第三球', 'KLDSHDX': '第三球大小', 'KLDSHDS': '第三球单双', 'KLDSHHDS': '第三球合单双', 'KLDSHWDX': '第三球尾大小',
	                        'KLDSIH': '第四球', 'KLDSIHDX': '第四球大小', 'KLDSIHDS': '第四球单双', 'KLDSIHHDS': '第四球合单双', 'KLDSIHWDX': '第四球尾大小',
	                        'KLDWH': '第五球', 'KLDWHDX': '第五球大小', 'KLDWHDS': '第五球单双', 'KLDWHHDS': '第五球合单双', 'KLDWHWDX': '第五球尾大小',
	                        'KLDLH': '第六球', 'KLDLHDX': '第六球大小', 'KLDLHDS': '第六球单双', 'KLDLHHDS': '第六球合单双', 'KLDLHWDX': '第六球尾大小',
	                        'KLDQH': '第七球', 'KLDQHDX': '第七球大小', 'KLDQHDS': '第七球单双', 'KLDQHHDS': '第七球合单双', 'KLDQHWDX': '第七球尾大小',
	                        'KLDBH': '第八球', 'KLDBHDX': '第八球大小', 'KLDBHDS': '第八球单双', 'KLDBHHDS': '第八球合单双', 'KLDBHWDX': '第八球尾大小'
	                    }
	                }
	            }},
	        'sjwx': {
	            'actName': '四季/五行',
	            'item': {
	                'GDSJWX': {
	                    'titleName':'' /*'四季/五行'*/,
	                    'Frame_10': true,
	                    'playLx': {
	                        'KLDYHWX': '第一球五行', 'KLDYHSJ': '第一球四季', 'KLDEHWX': '第二球五行', 'KLDEHSJ': '第二球四季', 'KLDSHWX': '第三球五行', 'KLDSHSJ': '第三球四季',
	                        'KLDSIHWX': '第四球五行', 'KLDSIHSJ': '第四球四季', 'KLDWHWX': '第五球五行', 'KLDWHSJ': '第五球四季', 'KLDLHWX': '第六球五行', 'KLDLHSJ': '第六球四季',
	                        'KLDQHWX': '第七球五行', 'KLDQHSJ': '第七球四季', 'KLDBHWX': '第八球五行', 'KLDBHSJ': '第八球四季'
	                    }
	                }
	            }
	        },
	        'fwzfb': {'actName': '方位/中发白',
	            'item': {
	                'FWZFB': {
	                    'titleName': ''/*'方位/中发白'*/,
	                    'Frame_10': true,
	                    'playLx': {
	                        'KLDYHF': '东南西北第一球', 'KLDYHM': '中发白第一球', 'KLDEHF': '东南西北第二球', 'KLDEHM': '中发白第二球',
	                        'KLDSHF': '东南西北第三球', 'KLDSHM': '中发白第三球', 'KLDSIHF': '东南西北第四球', 'KLDSIHM': '中发白第四球',
	                        'KLDWHF': '东南西北第五球', 'KLDWHM': '中发白第五球', 'KLDLHF': '东南西北第六球', 'KLDLHM': '中发白第六球',
	                        'KLDQHF': '东南西北第七球', 'KLDQHM': '中发白第七球', 'KLDBHF': '第八球东南西北', 'KLDBHM': '第八球中发白'
	                    }
	                }
	            }},
	        'zhlh': {'actName': '总和/龙虎',
	            'item': {'ZHLH': {'titleName':'' /*'总和/龙虎'*/, Frame_09: true, 'playLx': {'KLZHDX': '总和大小', 'KLZHDS': '总和单双', 'KLZHWSDX': '总和尾大小', 'KLLH': '龙虎'}}}},
	        'yzy': {'actName': '一中一',
	            'item': {'GDYZY': {'titleName': ''/*'一中一'*/, 'Frame_01': true, 'playLx': {'KLXYZY': '广东一中一'}}}}},
	        'gameLx': {21: {'gameName': "广东快乐十分"}, 25: {'gameName': "湖南快乐十分"}}},
	    'klsf': {'menu': {'zsp': {'actName': '主勢盤',
	        'item': {'KLSFZH': {'titleName': '总和', 'Frame_01': true, 'playLx': {'KLZHDX': '总和大小', 'KLZHDS': '总和单双', 'KLZHWSDX': '总和尾大小', 'KLLH': '总和龙虎'}},
	            'KLSFDMSM': {'titleName': '单码/双面', 'Frame_01': true, 'playLx': {'KLDYHDX': '第一球大小', 'KLDYHDS': '第一球单双', 'KLDYHHDS': '第一球合单双', 'KLDYHWDX': '第一球尾大小',
	                'KLDEHDX': '第二球大小', 'KLDEHDS': '第二球单双', 'KLDEHHDS': '第二球合单双', 'KLDEHWDX': '第二球尾大小',
	                'KLDSHDX': '第三球大小', 'KLDSHDS': '第三球单双', 'KLDSHHDS': '第三球合单双', 'KLDSHWDX': '第三球尾大小',
	                'KLDSIHDX': '第四球大小', 'KLDSIHDS': '第四球单双', 'KLDSIHHDS': '第四球合单双', 'KLDSIHWDX': '第四球尾大小',
	                'KLDWHDX': '第五球大小', 'KLDWHDS': '第五球单双', 'KLDWHHDS': '第五球合单双', 'KLDWHWDX': '第五球尾大小',
	                'KLDLHDX': '第六球大小', 'KLDLHDS': '第六球单双', 'KLDLHHDS': '第六球合单双', 'KLDLHWDX': '第六球尾大小',
	                'KLDQHDX': '第七球大小', 'KLDQHDS': '第七球单双', 'KLDQHHDS': '第七球合单双', 'KLDQHWDX': '第七球尾大小',
	                'KLTBHDX': '特别号大小', 'KLTBHDS': '特别号单双', 'KLTBHHDS': '特别号合单双', 'KLTBHWDX': '特别号尾大小'}}}},
	        'tbh': {'actName': '特别号',
	            'item': {'KLSFTBH': {'titleName': ''/*'特别号'*/, 'Frame_01': true, 'playLx': {'KLTBH': '特别号', 'KLTBHDX': '特别号大小', 'KLTBHDS': '特别号单双', 'KLTBHHDS': '特别号合单双', 'KLTBHWDX': '特别号尾大小'}}}},
	        'dmsm': {'actName': '单码/双面',
	            'item': {
	                'KLSFDM': {
	                    'titleName': '第一球',
	                    'Frame_10': true,
	                    'playLx': {
	                        'KLDYH': '第一球', 'KLDYHDX': '第一球大小', 'KLDYHDS': '第一球单双', 'KLDYHHDS': '第一球合单双', 'KLDYHWDX': '第一球尾大小',
	                        'KLDEH': '第二球', 'KLDEHDX': '第二球大小', 'KLDEHDS': '第二球单双', 'KLDEHHDS': '第二球合单双', 'KLDEHWDX': '第二球尾大小',
	                        'KLDSH': '第三球', 'KLDSHDX': '第三球大小', 'KLDSHDS': '第三球单双', 'KLDSHHDS': '第三球合单双', 'KLDSHWDX': '第三球尾大小',
	                        'KLDSIH': '第四球', 'KLDSIHDX': '第四球大小', 'KLDSIHDS': '第四球单双', 'KLDSIHHDS': '第四球合单双', 'KLDSIHWDX': '第四球尾大小',
	                        'KLDWH': '第五球', 'KLDWHDX': '第五球大小', 'KLDWHDS': '第五球单双', 'KLDWHHDS': '第五球合单双', 'KLDWHWDX': '第五球尾大小',
	                        'KLDLH': '第六球', 'KLDLHDX': '第六球大小', 'KLDLHDS': '第六球单双', 'KLDLHHDS': '第六球合单双', 'KLDLHWDX': '第六球尾大小',
	                        'KLDQH': '第七球', 'KLDQHDX': '第七球大小', 'KLDQHDS': '第七球单双', 'KLDQHHDS': '第七球合单双', 'KLDQHWDX': '第七球尾大小'
	                    }
	                }
	            }},
	        'sjwx': {'actName': '四季/五行',
	            'item': {
	                'KLSFSIWX': {
	                    'titleName': ''/*'四季/五行'*/,
	                    'Frame_10': true,
	                    'playLx': {
	                        'KLDYHWX': '第一球五行', 'KLDYHSJ': '第一球四季', 'KLDEHWX': '第二球五行', 'KLDEHSJ': '第二球四季', 'KLDSHWX': '第三球五行', 'KLDSHSJ': '第三球四季',
	                        'KLDSIHWX': '第四球五行', 'KLDSIHSJ': '第四球四季', 'KLDWHWX': '第五球五行', 'KLDWHSJ': '第五球四季', 'KLDLHWX': '第六球五行', 'KLDLHSJ': '第六球四季',
	                        'KLDQHWX': '第七球五行', 'KLDQHSJ': '第七球四季', 'KLTBHWX': '特别号五行', 'KLTBHSJ': '特别号四季'
	                    }
	                }
	            }},
	        'fwzfb': {'actName': '方位/中发白',
	            'item': {
	                'KLSFFW': {
	                    'titleName': ''/*'方位/中发白'*/,
	                    'Frame_10': true,
	                    'playLx': {
	                        'KLDYHF': '东南西北第一球', 'KLDYHM': '中发白第一球', 'KLDEHF': '东南西北第二球', 'KLDEHM': '中发白第二球',
	                        'KLDSHF': '东南西北第三球', 'KLDSHM': '中发白第三球', 'KLDSIHF': '东南西北第四球', 'KLDSIHM': '中发白第四球',
	                        'KLDWHF': '东南西北第五球', 'KLDWHM': '中发白第五球', 'KLDLHF': '东南西北第六球', 'KLDLHM': '中发白第六球',
	                        'KLDQHF': '东南西北第七球', 'KLDQHM': '中发白第七球', 'KLTBHF': '东南西北特别号', 'KLTBHM': '中发白特别号'
	                    }
	                }
	            }},
	        'zhlh': {'actName': '总和/龙虎',
	            'item': {'KLSFZHLH': {'titleName':'' /*'总和/龙虎'*/, Frame_09: true, 'playLx': {'KLZHDX': '总和大小', 'KLZHDS': '总和单双', 'KLZHWSDX': '总和尾大小', 'KLLH': '龙虎'}}}},
	        'yzy': {'actName': '一中一',
	            'item': {'KLSFYZY': {'titleName': ''/*'一中一'*/, 'Frame_01': true, 'playLx': {'KLXYZY': '一中一'}}}}},
	        'gameLx': {23: {'gameName': "天津快乐十分"}, 24: {'gameName': "重庆幸运农场"}}},
	    'yyxw': {'menu': {'zsp': {'actName': '主勢盤',
	        'item': {'YWZH': {'titleName': '总和', 'Frame_01': true, 'playLx': {'YWZHDX': '总和大小', 'YWZHDS': '总和单双', 'YWZHWSDX': '总和尾大小', 'YWLH': '总和龙虎'}},
	            'YWDMSM': {
	                'titleName': '单码/双面',
	                'Frame_01': true,
	                'playLx': {
	                    'YWDYHDX': '第一球大小', 'YWDYHDS': '第一球单双',
	                    'YWDEHDX': '第二球大小', 'YWDEHDS': '第二球单双',
	                    'YWDSHDX': '第三球大小', 'YWDSHDS': '第三球单双',
	                    'YWDSIHDX': '第四球大小', 'YWDSIHDS': '第四球单双',
	                    'YWDWHDX': '第五球大小', 'YWDWHDS': '第五球单双'
	                }
	            }
	        }},
	        'dmsm': {'actName': '单码/双面',
	            'item': {
	                'YYXWDMSM': {
	                    'titleName': ''/*'单码/双面'*/,
	                    'Frame_10': true,
	                    'playLx': {
	                        'YWDYH': '第一球', 'YWDYHDX': '第一球大小', 'YWDYHDS': '第一球单双',
	                        'YWDEH': '第二球', 'YWDEHDX': '第二球大小', 'YWDEHDS': '第二球单双',
	                        'YWDSH': '第三球', 'YWDSHDX': '第三球大小', 'YWDSHDS': '第三球单双',
	                        'YWDSIH': '第四球', 'YWDSIHDX': '第四球大小', 'YWDSIHDS': '第四球单双',
	                        'YWDWH': '第五球', 'YWDWHDX': '第五球大小', 'YWDWHDS': '第五球单双'
	                    }
	                }
	            }},
	        'zhlh': {'actName': '总和/龙虎',
	            'item': {'YWZHLH': {'titleName': ''/*'总和/龙虎'*/, 'Frame_09': true, 'playLx': {'YWZHDX': '总和大小', 'YWZHDS': '总和单双', 'YWZHWSDX': '总和尾大小', 'YWLH': '龙虎'}}}},
	        'rxyb': {'actName': '任选1-8',
	            'item': { 'YWYZY': {'titleName': '一中一', 'Frame_01': true, 'playLx': {'YWXYZY': '任选1-8一中一'}},
	                'YWRX': {'titleName': '任选', 'Frame_03': true, 'playLx': {'YWXEZE': '选二中2', 'YWXSZS': '选三中3', 'YWXSIZSI': '选四中4', 'YWXWZW': '选五中5', 'YWXLZW': '选六中5', 'YWXQZW': '选七中5', 'YWXBZW': '选八中5'}}}},
	        'qszhxzux': {'actName': '前三直选/组选',
	            'item': {'YWQSZHX': {'titleName': '选前三直选', 'Frame_03': true, 'playLx': {'YWQSZHX': '选前三直选'}},
	                'YWQSZUX': {'titleName': '选前三组选', 'Frame_03': true, 'playLx': {'YWQSZUX': '选前三组选'}}}},
	        'qezhxzux': {'actName': '前二直选/组选',
	            'item': {'YWQEZHX': {'titleName': '选前二直选', 'Frame_03': true, 'playLx': {'YWQEZHX': '选前二直选'}},
	                'YWQEZUX': {'titleName': '选前二组选', 'Frame_03': true, 'playLx': {'YWQEZUX': '选前二组选'}}}}},
	        'gameLx': {33: {'gameName': "山东11选5"}, 34: {'gameName': "重庆11选5"}, 32: {'gameName': "江西11选5"}, 31: {'gameName': "广东11选5"}, 35: {'gameName': "安徽11选5"}}},
	    'bjkl8': {
	        'menu': {
	            'zsp': {'actName': '主势盘',
	                'item': {
	                    'KBSXP': {'titleName': '上下盘', 'Frame_01': true, 'playLx': {'KBSXP': '上下盘'}},
	                    'KBJOP': {'titleName': '奇偶盘', 'Frame_01': true, 'playLx': {'KBJOP': '奇偶盘'}},
	                    'KBDX': {'titleName': '大小盘', 'Frame_01': true, 'playLx': {'KBDX': '大小盘'}},
	                    'KBDS': {'titleName': '单双盘', 'Frame_01': true, 'playLx': {'KBDS': '单双盘'}},
	                    'KBDXDS': {'titleName': '大小单双盘', 'Frame_01': true, 'playLx': {'KBDXDS': '大小单双盘'}},
	                    'KBWX': {'titleName': '快8五行', 'Frame_10': true, 'playLx': {'KBWX': '快8五行'}}
	                }},
	            'xh': {'actName': '选号', 'item': {'KBBJKLXH': {'titleName':''/* '选号'*/, 'Frame_05': true, 'playLx': {'KBXY': '选号一', 'KBXE': '选号二', 'KBXS': '选号三', 'KBXSI': '选号四', 'KBXW': '选号五'}}}}},
	        'gameLx': {41: {'gameName': "北京快乐8"}}},
	    'bjpks': {'menu': {
			/*
			'zsp': {'actName': '主勢盤',
					'item': {
							'BJPKZPS': {
											'titleName': '主勢盤',
											'Frame_01': true, 
											'playLx': {
												'PKDYHDX': '冠军大小', 'PKDYHDS': '冠军单双', 'PKDYHLH': '冠军龙虎',
												'PKDEHDX': '亚军大小', 'PKDEHDS': '亚军单双', 'PKDEHLH': '亚军龙虎',
												'PKDSHDX': '季军大小', 'PKDSHDS': '季军单双', 'PKDSHLH': '季军龙虎',
												'PKDSIHDX': '第四名大小', 'PKDSIHDS': '第四名单双', 'PKDSIHLH': '第四名龙虎',
												'PKDWHDX': '第五名大小', 'PKDWHDS': '第五名单双', 'PKDWHLH': '第五名龙虎',
												'PKDLHDX': '第六名大小', 'PKDLHDS': '第六名单双', 'PKDLHLH': '第六名龙虎',
												'PKDQHDX': '第七名大小', 'PKDQHDS': '第七名单双', 'PKDQHLH': '第七名龙虎',
												'PKDBHDX': '第八名大小', 'PKDBHDS': '第八名单双', 'PKDBHLH': '第八名龙虎',
												'PKDJHDX': '第九名大小', 'PKDJHDS': '第九名单双', 'PKDJHLH': '第九名龙虎',
												'PKDSHIHDX': '第十名大小', 'PKDSHIHDS': '第十名单双', 'PKDSHIHLH': '第十名龙虎'
											}
										}
							}
			},
			*/
	        'dmsm': {'actName': '单码/双面',
	            'item': {
	                'PKDM': {
	                    'titleName': ''/*'单码'*/,
	                    'Frame_10': true,
	                    'playLx': {
	                        'PKDYH': '冠军', 'PKDEH': '亚军', 'PKDSH': '季军', 'PKDSIH': '第四名', 'PKDWH': '第五名',
	                        'PKDLH': '第六名', 'PKDQH': '第七名', 'PKDBH': '第八名', 'PKDJH': '第九名', 'PKDSHIH': '第十名'
	                    }
	                },
	                'BJPKZPS': {
	                    'titleName': '主勢盤', 'Frame_01': true,
	                    'playLx': {
	                        'PKDYHDX': '冠军大小', 'PKDYHDS': '冠军单双', 'PKDYHLH': '冠军龙虎',
	                        'PKDEHDX': '亚军大小', 'PKDEHDS': '亚军单双', 'PKDEHLH': '亚军龙虎',
	                        'PKDSHDX': '季军大小', 'PKDSHDS': '季军单双', 'PKDSHLH': '季军龙虎',
	                        'PKDSIHDX': '第四名大小', 'PKDSIHDS': '第四名单双', 'PKDSIHLH': '第四名龙虎',
	                        'PKDWHDX': '第五名大小', 'PKDWHDS': '第五名单双', 'PKDWHLH': '第五名龙虎',
	                        'PKDLHDX': '第六名大小', 'PKDLHDS': '第六名单双', 'PKDLHLH': '第六名龙虎',
	                        'PKDQHDX': '第七名大小', 'PKDQHDS': '第七名单双', 'PKDQHLH': '第七名龙虎',
	                        'PKDBHDX': '第八名大小', 'PKDBHDS': '第八名单双', 'PKDBHLH': '第八名龙虎',
	                        'PKDJHDX': '第九名大小', 'PKDJHDS': '第九名单双', 'PKDJHLH': '第九名龙虎',
	                        'PKDSHIHDX': '第十名大小', 'PKDSHIHDS': '第十名单双', 'PKDSHIHLH': '第十名龙虎'
	                    }
	                }
	            }
	        },
	        'gyjh': {'actName': '冠亚军和',
	            'item': {'GYJH': {'titleName':'' /*'冠亚军和'*/, Frame_01: true, 'playLx': {'PKGYJH': '冠亚军和'}}}},
	        'xh': {'actName': '选号',
	            'item': {'PKQE': {'titleName': '前二', 'Frame_05': true, 'playLx': {'PKQE': '选号前二'}},
	                'PKQS': {'titleName': '前三', 'Frame_05': true, 'playLx': {'PKQS': '选号前三'}},
	                'PKQSI': {'titleName': '前四', 'Frame_05': true, 'playLx': {'PKQSI': '选号前四'}}}}},
	        'gameLx': {45: {'gameName': "北京PK拾"}}},
	    'lhc': {
	        'menu': {
				
				'dmsm':{
					'actName': '单码双面',
	                'item': {
	                    'LHZMT': {'titleName': '正码特', 'Frame_10': true,
	                        'playLx': {
	                            'LHDYH': '正码一特', 'LHDEH': '正码二特', 'LHDSH': '正码三特', 'LHDSIH': '正码四特', 'LHDWH': '正码五特', 'LHDLH': '正码六特', 'LHTBH': '特别号',
	                            'LHTBHDX': '特别号大小', 'LHTBHDS': '特别号单双', 'LHTBHHSDX': '特别号合大小', 'LHTBHHSDS': '特别号合大小单双', 'LHTBHWDX': '特别号尾数大小', 'LHTBHDXDS': '特别号大小单双',
	                            'LHDYHDX': '正码一特大小', 'LHDYHDS': '正码一特单双', 'LHDYHHSDX': '正码一特合大小', 'LHDYHHSDS': '正码一特合单双', 'LHDYHWDX': '正码一特尾大小', 'LHDYHDXDS': '正码一特大小单双',
	                            'LHDEHDX': '正码二特大小', 'LHDEHDS': '正码二特单双', 'LHDEHHSDX': '正码二特合大小', 'LHDEHHSDS': '正码二特合单双', 'LHDEHWDX': '正码二特尾大小', 'LHDEHDXDS': '正码二特大小单双',
	                            'LHDSHDX': '正码三特大小', 'LHDSHDS': '正码三特单双', 'LHDSHHSDX': '正码三特合大小', 'LHDSHHSDS': '正码三特合单双', 'LHDSHWDX': '正码三特尾大小', 'LHDSHDXDS': '正码三特大小单双',
	                            'LHDSIHDX': '正码四特大小', 'LHDSIHDS': '正码四特单双', 'LHDSIHHSDX': '正码四特合大小', 'LHDSIHHSDS': '正码四特合单双', 'LHDSIHWDX': '正码四特尾大小', 'LHDSIHDXDS': '正码四特大小单双',
	                            'LHDWHDX': '正码五特大小', 'LHDWHDS': '正码五特单双', 'LHDWHHSDX': '正码五特合大小', 'LHDWHHSDS': '正码五特合单双', 'LHDWHWDX': '正码五特尾大小', 'LHDWHDXDS': '正码五特大小单双',
	                            'LHDLHDX': '正码六特大小', 'LHDLHDS': '正码六特单双', 'LHDLHHSDX': '正码六特合大小', 'LHDLHHSDS': '正码六特合单双', 'LHDLHWDX': '正码六特尾大小', 'LHDLHDXDS': '正码六特大小单双',
								'LHZM':'正码'
							}
						},
						'LHZM1-6': {
	                        'titleName': '正特1-6',
	                        'Frame_01': true,
	                        'playLx': {
								'LHTBHDX':'特别号大小',  'LHTBHDS': '特别号单双', 'LHTBHHSDX': '特别号合大小', 'LHTBHHSDS': '特别号合单双', 'LHTBHWDX': '特别号尾大小',
	                            'LHDYHDX': '正码一大小', 'LHDYHDS': '正码一单双', 'LHDYHHSDX': '正码一合大小', 'LHDYHHSDS': '正码一合单双', 'LHDYHWDX': '正码一尾大小',
	                            'LHDEHDX': '正码二大小', 'LHDEHDS': '正码二单双', 'LHDEHHSDX': '正码二合大小', 'LHDEHHSDS': '正码二合单双', 'LHDEHWDX': '正码二尾大小',
	                            'LHDSHDX': '正码三大小', 'LHDSHDS': '正码三单双', 'LHDSHHSDX': '正码三合大小', 'LHDSHHSDS': '正码三合单双', 'LHDSHWDX': '正码三尾大小',
	                            'LHDSIHDX': '正码四大小', 'LHDSIHDS': '正码四单双', 'LHDSIHHSDX': '正码四合大小', 'LHDSIHHSDS': '正码四合单双', 'LHDSIHWDX': '正码四尾大小',
	                            'LHDWHDX': '正码五大小', 'LHDWHDS': '正码五单双', 'LHDWHHSDX': '正码五合大小', 'LHDWHHSDS': '正码五合单双', 'LHDWHWDX': '正码五尾大小',
	                            'LHDLHDX': '正码六大小', 'LHDLHDS': '正码六单双', 'LHDLHHSDX': '正码六合大小', 'LHDLHHSDS': '正码六合单双', 'LHDLHWDX': '正码六尾大小'
	                        }
	                    }
						
	                },
					'quick_bet':{
						'd_x_dan_s':{
							'd':{
								'name':'大',
								'isd':true,
								fn:function(){
									var arr=[];
									for(var i=25;i<50;i++){
										arr.push(i);
									}
									return arr;
								}

							},
							'x':{
								'name':'小',
								'isx':true,
								fn:function(){
									var arr=[];
									for(var i=1;i<25;i++){
										arr.push( i.toString().length<2?'0'+i:i );
									}
									return arr;
								}
							},
							'dan':{
								'name':'单',
								'isdan':true,
								fn:function(){
									var arr=[];
									for(var i=1;i<50;i++){
										if( i%2!=0 ){
											arr.push(i.toString().length<2?'0'+i:i);
										}
									}
									return arr
								}
							},
							's':{
								'name':'双',
								'iss':true,
								fn:function(){
									var arr=[];
									for(var i=1;i<50;i++){
										if( i%2==0 ){
											arr.push(i.toString().length<2?'0'+i:i);
										}
									}
									return arr
								}
							},
							'and_d':{
								'name':'和大',
								'isand_d':true,
								fn:function(){
									var arr=[];
									
									for(var i=1;i<50;i++){
										var str=i.toString();
										var a=str.length<2?i:(parseInt(str.charAt(0))+parseInt(str.charAt(1)));
										if(a>=7){
											arr.push(str.length<2?"0"+i:i);
										}
									}
									return arr;
								}
								
							},
							'and_x':{
								'name':'和小',
								'isand_x':true,
								fn:function(){
									var arr=[];
									
									for(var i=1;i<50;i++){
										var str=i.toString();
										var a=str.length<2?i:(parseInt(str.charAt(0))+parseInt(str.charAt(1)));
										if(a<7){
											arr.push(str.length<2?"0"+i:i);
										}
									}
									return arr;
								}
							},
							'and_dan':{
								'name':'和单',
								'isand_dan':true,
								fn:function(){
									var arr=[];
									
									for(var i=1;i<50;i++){
										var str=i.toString();
										var a=str.length<2?i:(parseInt(str.charAt(0))+parseInt(str.charAt(1)));
										if(a%2!=0){
											arr.push(str.length<2?"0"+i:i);
										}
									}
									return arr;
								}
								
							},
							'and_s':{
								'name':'和双',
								'isand_s':true,
								fn:function(){
									var arr=[];
									
									for(var i=1;i<50;i++){
										var str=i.toString();
										var a=str.length<2?i:(parseInt(str.charAt(0))+parseInt(str.charAt(1)));
										if(a%2==0){
											arr.push(str.length<2?"0"+i:i);
										}
									}
									return arr;
								}
								
							}
						},
						'sx':{
							'shu':{'name':'鼠'},
							'niu':{'name':'牛'},
							'hu':{'name':'虎'},
							'tu':{'name':'兔'},
							'long':{'name':'龙'},
							'she':{'name':'蛇'},
							'ma':{'name':'马'},
							'yang':{'name':'羊'},
							'hou':{'name':'猴'},
							'jj':{'name':'鸡'},
							'gou':{'name':'狗'},
							'zhu':{'name':'猪'}							
						},
						'ws':{
							'0':{
								'name':'0尾',
								'number':[10,20,30,40]
								
							},
							'1':{'name':'1尾',
								'number':['01',11,21,31,41]
							},
							'2':{'name':'2尾',
								'number':['02',12,22,32,42]
							},
							'3':{'name':'3尾',
								'number':['03',13,23,33,43]
							},
							'4':{'name':'4尾',
								'number':['04',14,24,34,44]
							},

							'5':{'name':'5尾',
								'number':['05',15,25,35,45]	
							},
							'6':{'name':'6尾',
								'number':['06',16,26,36,46]	
							},
							'7':{'name':'7尾',
								'number':['07',17,27,37,47]	
							},
							'8':{'name':'8尾',
								'number':['08',18,28,38,48]	
							},
							'9':{'name':'9尾',
								'number':['09',19,29,39,49]	
							}
						},
						'ts':{
							'0':{
								'name':'0头',
								'number':['01','02','03','04','05','06','07','08','09']
							},
							'1':{'name':'1头',
								'number':[10,11,12,13,14,15,16,17,18,19]
							},
							'2':{'name':'2头',
								'number':[20,21,22,23,24,25,26,27,28,29]	
							},
							'3':{'name':'3头',
								'number':[30,31,32,33,34,35,36,37,38,39]
							},
							'4':{'name':'4头',
								'number':[40,41,42,43,44,45,46,47,48,49]
							}

						},
						'color_ho':{
							'ho':{
								'name':'红波',
								'reg':'titleHong',
								fn:function(arr){
									return arr;
								}
							},
							'ho_dan':{
								'name':'红单',
								'reg':'titleHong',
								'isdan':true,
								fn:function(arr1){
									var arr=[];
									for(var i=0;i<arr1.length;i++){
										if( arr1[i]%2!=0 ){
											arr.push(arr1[i]);
										}
									}
									return arr
								}
							},
							'ho_s':{
								'name':'红双',
								'reg':'titleHong',
								'iss':true,
								fn:function(arr1){
									var arr=[];
									for(var i=0;i<arr1.length;i++){
										if( arr1[i]%2==0 ){
											arr.push(arr1[i]);
										}
									}
									return arr
								}
							},
							'ho_d':{
								'name':'红大',
								'reg':'titleHong',
								'isd':true,
								fn:function(arr1){
									var arr=[];
									for(var i=0;i<arr1.length;i++){
										if( arr1[i]>=25 ){
											arr.push(arr1[i]);
										}
									}
									return arr
								}
							},
							'ho_x':{
								'name':'红小',
								'reg':'titleHong',
								'isx':true,
								fn:function(arr1){
									var arr=[];
									for(var i=0;i<arr1.length;i++){
										if( arr1[i]<25 ){
											arr.push(arr1[i]);
										}
									}
									return arr
								}
							},
							'ho_d_dan':{
								'name':'红大单',
								'reg':'titleHong',
								'isd':true,
								'isdan':true,
								fn:function(arr1){
									var arr=[];
									for(var i=0;i<arr1.length;i++){
										if( arr1[i]>=25 && arr1[i]%2!=0 ){
											arr.push(arr1[i]);
										}
									}
									return arr
								}
							},
							'ho_d_s':{
								'name':'红大双',
								'reg':'titleHong',
								'isd':true,
								'iss':true,
								fn:function(arr1){
									var arr=[];
									for(var i=0;i<arr1.length;i++){
										if( arr1[i]>=25 && arr1[i]%2==0 ){
											arr.push(arr1[i]);
										}
									}
									return arr
								}
							},
							'ho_x_dan':{
								'name':'红小单',
								'reg':'titleHong',
								'isx':true,
								'isdan':true,
								fn:function(arr1){
									var arr=[];
									for(var i=0;i<arr1.length;i++){
										if( arr1[i]<25 && arr1[i]%2!=0 ){
											arr.push(arr1[i]);
										}
									}
									return arr
								}
							},
							'ho_x_s':{
								'name':'红小双',
								'reg':'titleHong',
								'isx':true,
								'iss':true,
								fn:function(arr1){
									var arr=[];
									for(var i=0;i<arr1.length;i++){
										if( arr1[i]<25 && arr1[i]%2==0 ){
											arr.push(arr1[i]);
										}
									}
									return arr
								}
							}
							
						},
						'color_la':{
							'la':{
								'name':'蓝波',
								'reg':'titleLan',
								fn:function(arr1){
									
									return arr1
								}
							},
							'la_dan':{
								'name':'蓝单',
								'reg':'titleLan',
								'isdan':true,
								fn:function(arr1){
									var arr=[];
									for(var i=0;i<arr1.length;i++){
										if( arr1[i]%2!=0 ){
											arr.push(arr1[i]);
										}
									}
									return arr
								}
							},
							'la_s':{
								'name':'蓝双',
								'reg':'titleLan',
								'iss':true,
								fn:function(arr1){
									var arr=[];
									for(var i=0;i<arr1.length;i++){
										if( arr1[i]%2==0 ){
											arr.push(arr1[i]);
										}
									}
									return arr
								}
							},
							'la_d':{
								'name':'蓝大',
								'reg':'titleLan',
								'isd':true,
								fn:function(arr1){
									var arr=[];
									for(var i=0;i<arr1.length;i++){
										if( arr1[i]>=25  ){
											arr.push(arr1[i]);
										}
									}
									return arr
								}
							},
							'la_x':{
								'name':'蓝小',
								'reg':'titleLan',
								'isx':true,
								fn:function(arr1){
									var arr=[];
									for(var i=0;i<arr1.length;i++){
										if( arr1[i]<25  ){
											arr.push(arr1[i]);
										}
									}
									return arr
								}
							},
							'la_d_dan':{
								'name':'蓝大单',
								'reg':'titleLan',
								'isd':true,
								'isdan':true,
								fn:function(arr1){
									var arr=[];
									for(var i=0;i<arr1.length;i++){
										if( arr1[i]>=25 && arr1[i]%2!=0  ){
											arr.push(arr1[i]);
										}
									}
									return arr
								}
							},
							'la_d_s':{
								'name':'蓝大双',
								'reg':'titleLan',
								'isd':true,
								'iss':true,
								fn:function(arr1){
									var arr=[];
									for(var i=0;i<arr1.length;i++){
										if( arr1[i]>=25 && arr1[i]%2==0  ){
											arr.push(arr1[i]);
										}
									}
									return arr
								}
							},
							'la_x_dan':{
								'name':'蓝小单',
								'reg':'titleLan',
								'isx':true,
								'isdan':true,
								fn:function(arr1){
									var arr=[];
									for(var i=0;i<arr1.length;i++){
										if( arr1[i]<25 && arr1[i]%2!=0  ){
											arr.push(arr1[i]);
										}
									}
									return arr
								}
							},
							'la_x_s':{
								'name':'蓝小双',
								'reg':'titleLan',
								'isx':true,
								'iss':true,
								fn:function(arr1){
									var arr=[];
									for(var i=0;i<arr1.length;i++){
										if( arr1[i]<25 && arr1[i]%2==0  ){
											arr.push(arr1[i]);
										}
									}
									return arr
								}
							}
						},
						'color_v':{
							'v':{
								'name':'绿波',
								'reg':'titleLv',
								fn:function(arr1){
									
									return arr1
								}
							},
							'v_dan':{
								'name':'绿单',
								'reg':'titleLv',
								'isdan':true,
								fn:function(arr1){
									var arr=[];
									for(var i=0;i<arr1.length;i++){
										if( arr1[i]%2!=0  ){
											arr.push(arr1[i]);
										}
									}
									return arr
								}
							},
							'v_s':{
								'name':'绿双',
								'reg':'titleLv',
								'iss':true,
								fn:function(arr1){
									var arr=[];
									for(var i=0;i<arr1.length;i++){
										if( arr1[i]%2==0  ){
											arr.push(arr1[i]);
										}
									}
									return arr
								}
							},
							'v_d':{
								'name':'绿大',
								'reg':'titleLv',
								'isd':true,
								fn:function(arr1){
									var arr=[];
									for(var i=0;i<arr1.length;i++){
										if( arr1[i]>=25  ){
											arr.push(arr1[i]);
										}
									}
									return arr
								}
							},
							'v_x':{
								'name':'绿小',
								'reg':'titleLv',
								'isx':true,
								fn:function(arr1){
									var arr=[];
									for(var i=0;i<arr1.length;i++){
										if( arr1[i]<25 ){
											arr.push(arr1[i]);
										}
									}
									return arr
								}
							},
							'v_d_dan':{
								'name':'绿大单',
								'reg':'titleLv',
								'isd':true,
								'isdan':true,
								fn:function(arr1){
									var arr=[];
									for(var i=0;i<arr1.length;i++){
										if( arr1[i]>=25 && arr1[i]%2!=0  ){
											arr.push(arr1[i]);
										}
									}
									return arr
								}
							},
							'v_d_s':{
								'name':'绿大双',
								'reg':'titleLv',
								'isd':true,
								'iss':true,
								fn:function(arr1){
									var arr=[];
									for(var i=0;i<arr1.length;i++){
										if( arr1[i]>=25 && arr1[i]%2==0  ){
											arr.push(arr1[i]);
										}
									}
									return arr
								}
							},
							'v_x_dan':{
								'name':'绿小单',
								'reg':'titleLv',
								'isx':true,
								'isdan':true,
								fn:function(arr1){
									var arr=[];
									for(var i=0;i<arr1.length;i++){
										if( arr1[i]<25 && arr1[i]%2!=0  ){
											arr.push(arr1[i]);
										}
									}
									return arr
								}
							},
							'v_x_s':{
								'name':'绿小双',
								'reg':'titleLv',
								'isx':true,
								'iss':true,
								fn:function(arr1){
									var arr=[];
									for(var i=0;i<arr1.length;i++){
										if( arr1[i]<25 && arr1[i]%2==0  ){
											arr.push(arr1[i]);
										}
									}
									return arr
								}
							}

						}
					},
					'quick_bet_obj':'LHZMT'
				},
				'zm-zx-tbhhx': {
	                'actName': '正码',
	                'item': {
	                    'LHZM': {'titleName':'' /*'正码'*/, 'Frame_01': true, 'playLx': {'LHZM': '正码', 'LHZHDX': '正码总大小', 'LHZHDS': '正码总单双'}}
	                    }
	            },
				'sx':{
					'actName':'生肖',
					'item':{
						'LHTBHSX': {'titleName': '特别号生肖', 'Frame_06': true, 'playLx': {'LHTBHSX': '特别号生肖'}},               
						'LHYX': {'titleName': '平特一肖', 'Frame_06': true, 'playLx': {'LHYX': '平特一肖'}},
	                    'LHZX': {'titleName': '正肖', 'Frame_06': true, 'playLx': {'LHZX': '正肖'}},               
						'LHPTZX': {'titleName': '平特总肖', 'Frame_01': true, 'playLx': {'LHZXS': '平特总肖'}},
						'LHZXDS': {'titleName': '总肖单双', 'Frame_01': true, 'playLx': {'LHZXDS': '总肖单双'}},
						'LHTBHHX': {'titleName': '合肖', 'Frame_07': true, 'playLx': {LHTBHHXZ: '六合彩合肖中', LHTBHHXBZ: '六合彩合肖不中'}}
	                
					}
				},
				'tws':{
					'actName':'头尾数',
					'item':{
						
						'LHTBHTS': {'titleName': '特别号头数', 'Frame_01': true, 'playLx': {'LHTBHTS': '特别号头数'}},
	                    'LHTBHWS': {'titleName': '特别号尾数', 'Frame_01': true, 'playLx': {'LHTBHWS': '特别号尾数'}},
						'LHZTWS': {'titleName': '正特尾数', 'Frame_01': true, 'playLx': {'LHZTWS': '正特尾数'}}
	                   
						
					}
				},
				'sb':{
					'actName': '色波',
	                'item': {
	                    'LHTBHSB': {
							'titleName':'' /*'色波'*/, 
							'Frame_01': true,
							'playLx': {
								'LHTBHC': '特别号色波',
								'LHDYHC': '正码一特色波',
								'LHDEHC': '正码二特色波',
								'LHDSHC': '正码三特色波',
								'LHDSIHC': '正码四特色波',
								'LHDWHC': '正码五特色波',
								'LHDLHC': '正码六特色波'
							}
						},
	                    'LHTBHBSB': {'titleName': '特别号半色波', 'Frame_01': true, 'playLx': {'LHTBHBDX': '特别号半色波大小', 'LHTBHBDS': '特别号半色波单双'}},
	                    'LHTBHBBSB': {'titleName': '特别号半半色波', 'Frame_01': true, 'playLx': {'LHTBHBB': '特别号半半色波'}},
						'LHQSB':{
							'titleName':'七色波',
							'Frame_01':true,
							'playLx':{
								'LHQSB':'七色波'
							}
						}
					   /*
						'LHGG': {
	                        'titleName': '正码过关', 'Frame_04': true,
	                        'playLx': {'LHGG': '正码过关'}} */
	                }
				},
				'gg':{
					'actName':'过关',
					'item':{
						
						'LHGG': {
	                        'titleName':'' /*'正码过关'*/, 'Frame_04': true,
	                        'playLx': {'LHGG': '正码过关'}
						} 
					}
				},
	           
				'lx':{
					'actName':'连肖',
					'item':{
						'LHLX': {'titleName':'' /*'连肖'*/, 'Frame_08': true, 'playLx': {LHEXP: '六合彩二肖碰', LHSXP: '六合彩三肖碰', LHSIXP: '六合彩四肖碰', LHWXP: '六合彩五肖碰'}}
	                   
					}
				},
				'lw':{
					'actName':'连尾',
					'item':{
						'LHLW': {'titleName': ''/*'连尾'*/, 'Frame_08': true, 'playLx': {LHEWP: '六合彩二尾碰', LHSWP: '六合彩三尾碰', LHSIWP: '六合彩四尾碰', LHWWP: '六合彩五尾碰'}}
	                
					}
				},
				
	            'lm': {
	                'actName': '连码',
	                'item': {
	                    'LHLM': {'titleName':'' /*'连码'*/, 'Frame_05': true, 'playLx': {'LHSIZSI': '四全中', 'LHSZS': '三全中', 'LHSZE': '三中二', 'LHEZE': '二中二', 'LHEZT': '二中特', 'LHTC': '特串'}}
	                }
	            },
	            'zxbz': {
	                'actName': '自选不中',
	                'item': {
	                    'LHZXBZ': {'titleName':'' /*'自选不中'*/, 'Frame_05': true, 'playLx': {'LHZXBZ5': '五不中', 'LHZXBZ6': '六不中', 'LHZXBZ7': '七不中', 'LHZXBZ8': '八不中', 'LHZXBZ9': '九不中', 'LHZXBZ10': '十不中', 'LHZXBZ11': '十一不中', 'LHZXBZ12': '十二不中'}}
	                }
	            }
	        },
	        'gameLx': {10: {'gameName': "六合彩"}}
	    },
	    'k3': { //这个东西不能删除
			
			'menu':{
				'zsp':{
					'actName':'主勢盤',
					'item':{
						'KSYYW':{
							playLx:{
								'KSYYW':'一字'							
							}
						},
						'KSDSW':{
							playLx:{
								'KSDSW':'单双'
							}
						},
						'KSDXW':{
							playLx:{
								'KSDXW':'大小'
							}
						},
						'KSDZZ':{
							playLx:{
								'KSDZZ':'对子'
							}
						},
						'KSDZ':{
							playLx:{
								'KSDZ':'短牌'
							}
						},
						'KSBZ':{
							playLx:{
								'KSBZ':'围骰'
							}
						},
						'KSZH':{
							playLx:{
								'KSZH':'和值'
							}
						},
						'KSEBT':{
							playLx:{
								'KSEBT':'长牌'
							}
						},
						'KSBZZ':{
							playLx:{
								'KSBZZ':'豹子'
							}
						},
						'KSSZ':{
							playLx:{
								'KSSZ':'顺子'
							}
						},
						'KSZL':{
							playLx:{
								'KSZL':'杂六'
							}
						}
						
					}
				},
				'rxh':{
					'actName':'任选号',
					'item':{
						'KSETD':{
							playLx:{
								'KSETD':'二同号单选'
							}
						},
						'KSSBT':{
							playLx:{
								'KSSBT':'三不同号单选'
							}
						}
					}
				}
				
				
	
				
			}  
	    }
	};
	
	var objName = {
	    'd': '大', 'x': '小', 'dan': '单', 's': '双', 'z': '质', 'h': '合', 'l': '龙', 'hu': '虎', 'he': '和', 'bz': '豹子', 'sz': '顺子', 'dz': '对子',
	    'bs': '半顺', 'zl': '杂六', 'c': '春', 'xia': '夏', 'q': '秋', 'do': '冬', 'j': '金', 'm': '木', 'sh': '水', 'huo': '火', 't': '土', 'dong': '东', 'n': '南',
	    'xi': '西', 'bei': '北', 'zh': '中', 'f': '发', 'b': '白', 'ho': '红', 'la': '蓝', 'v': '绿', 'sp': '上盘', 'zp': '中盘', 'xp': '下盘', 'ji': '奇', 'ou': '偶',
	    'xs': '小双', 'xdan': '小单', 'ds': '大双', 'ddan': '大单', 'hd': '红大', 'hx': '红小', 'hdan': '红单', 'hs': '红双', 'ld': '蓝大', 'lx': '蓝小', 'ldan': '蓝单',
	    'ls': '蓝双', 'vd': '绿大', 'vx': '绿小', 'vdan': '绿单', 'vs': '绿双', 'hddan': '红大单', 'hds': '红大双', 'hxdan': '红小单', 'hxs': '红小双', 'lddan': '蓝大单',
	    'lds': '蓝大双', 'lxdan': '蓝小单', 'lxs': '蓝小双', 'vddan': '绿大单', 'vds': '绿大双', 'vxdan': '绿小单', 'vxs': '绿小双', 'she': '蛇', 'long': '龙', 'jj': '鸡',
	    'niu': '牛', 'hou': '猴', 'gou': '狗', 'tu': '兔', 'yang': '羊', 'zhu': '猪', 'shu': '鼠', 'ma': '马', 'shu2': '鼠', 'niu2': '牛', 'hu2': '虎', 'tu2': '兔',
	    'long2': '龙', 'she2': '蛇', 'ma2': '马', 'yang2': '羊', 'hou2': '猴', 'jj2': '鸡', 'gou2': '狗', 'zhu2': '猪', 'FCYZGGB': '佰',
	    'FCYZGGS': '拾', 'FCYZGGG': '个', 'LHGGZ': '正码', '1dan': '1单', '2dan': '2单', '3dan': '3单', '4dan': '4单', '5dan': '5单', '6dan': '6单', '1s': '1双', '2s': '2双', '3s': '3双',
	    '4s': '4双', '5s': '5双', '6s': '6双', '1d': '1大', '2d': '2大', '3d': '3大', '4d': '4大', '5d': '5大', '6d': '6大', '1x': '1小', '2x': '2小', '3x': '3小', '4x': '4小', '5x': '5小', '6x': '6小',
	    '1hdan': '1单', '2hdan': '2单', '3hdan': '3单', '4hdan': '4单', '5hdan': '5单', '6hdan': '6单', '1hs': '1双', '2hs': '2双', '3hs': '3双',
	    '4hs': '4双', '5hs': '5双', '6hs': '6双', '1hd': '1大', '2hd': '2大', '3hd': '3大', '4hd': '4大', '5hd': '5大', '6hd': '6大', '1hx': '1小', '2hx': '2小', '3hx': '3小', '4hx': '4小', '5hx': '5小', '6hx': '6小',
	    '1wd': '1尾大', '2wd': '2尾大', '3wd': '3尾大', '4wd': '4尾大', '5wd': '5尾大', '6wd': '6尾大', '1wx': '1尾小', '2wx': '2尾小', '3wx': '3尾小', '4wx': '4尾小', '5wx': '5尾小', '6wx': '6尾小',
	    '1ho': '1红色', '2ho': '2红色', '3ho': '3红色', '4ho': '4红色', '5ho': '5红色', '6ho': '6红色', '1la': '1蓝色', '2la': '2蓝色', '3la': '3蓝色', '4la': '4蓝色', '5la': '5蓝色', '6la': '6蓝色',
	    '1lv': '1绿色', '2lv': '2绿色', '3lv': '3绿色', '4lv': '4绿色', '5lv': '5绿色', '6lv': '6绿色', 'n1': '牛1', 'n2': '牛2', 'n3': '牛3', 'n4': '牛4', 'n5': '牛5', 'n6': '牛6',
	    'n7': '牛7', 'n8': '牛8', 'n9': '牛9', 'nn': '牛牛', 'w': '无牛', zd: '炸弹', 'hl': '葫芦', 'st': '三条', 'ld': '两对', dd: '单对', /*sh: '散号', */yd:'有对',wd:'无对'
	};
	
	var gameRuleObj = {
	    'ssc': { //时时彩
	        'zsp': {
	            'ruleName': ['一字定位', '全五一字组合', '前三一字组合', '中三一字组合', '后三一字组合', '万/仟/佰/拾/个 大小', '万/仟/佰/拾/个 单双', '万/仟/佰/拾/个 质合', '万仟/万佰/万拾/万个/仟佰/仟拾/仟个/佰拾/佰个/拾个 和数单双'],
	            'ruleBox': [
	                '于万仟佰拾个任选一位，自0~9任选1号进行投注，当开奖结果与所选的定位与号码相同且顺序一致时，即为中奖。',
	                '0~9任选1号进行投注，当开奖结果[万位、仟位、佰位、拾位、个位]任一数与所选的号码相同时，即为中奖。',
	                '0~9任选1号进行投注，当开奖结果[万位、仟位、佰位]任一数与所选的号码相同时，即为中奖。',
	                '0~9任选1号进行投注，当开奖结果[仟位、佰位、拾位]任一数与所选的号码相同时，即为中奖。',
	                '0~9任选1号进行投注，当开奖结果[佰位、拾位、个位]任一数与所选的号码相同时，即为中奖。',
	                '0~4为小，5~9为大。',
	                '1、3、5、7、9为单，0、2、4、6、8为双。',
	                '1、2、3、5、7为质数，0、4、6、8、9为合数。',
	                '1、3、5、7、9、11、13、15、17为单，0、2、4、6、8、10、12、14、16、18为双。'
	            ]
	        },
	        'yz': {
	            'ruleName': ['一字定位', '全五一字组合', '前三一字组合', '中三一字组合', '后三一字组合', '万/仟/佰/拾/个 大小', '万/仟/佰/拾/个 单双', '万/仟/佰/拾/个 质合'],
	            'ruleBox': [
	                '于万仟佰拾个任选一位，自0~9任选1号进行投注，当开奖结果与所选的定位与号码相同且顺序一致时，即为中奖。',
	                '0~9任选1号进行投注，当开奖结果[万位、仟位、佰位、拾位、个位]任一数与所选的号码相同时，即为中奖。',
	                '0~9任选1号进行投注，当开奖结果[万位、仟位、佰位]任一数与所选的号码相同时，即为中奖。',
	                '0~9任选1号进行投注，当开奖结果[仟位、佰位、拾位]任一数与所选的号码相同时，即为中奖。',
	                '0~9任选1号进行投注，当开奖结果[佰位、拾位、个位]任一数与所选的号码相同时，即为中奖。',
	                '0~4为小，5~9为大。',
	                '1、3、5、7、9为单，0、2、4、6、8为双。',
	                '1、2、3、5、7为质数，0、4、6、8、9为合数。'
	            ]
	        },
	        'ez': {
	            'ruleName': ['二字组选', '二字定位'],
	            'ruleBox': [
	                ' 	从0-9十个数字中任选两个不同的数字对指定位置进行投注，若所选择的号码与当期开奖号码所指定之位置相同（顺序不限），即为中奖，若是开出对子如00、11、22、33、44、55、66、77、88、99算不中奖。',
	                '于万仟百拾个任选二位，自0~9任选2号进行投注，当开奖结果与所选号码相同且顺序一致时，即为中奖。'
	            ]
	        },
	        'ezhs': {
	            'ruleName': ['万仟/万佰/万拾/万个/仟佰/仟拾/仟个/佰拾/佰个/拾个 和数单双'],
	            'ruleBox': [
	                '1、3、5、7、9、11、13、15、17为单，0、2、4、6、8、10、12、14、16、18为双。'
	            ]
	        },
	        'sz': {
	            'ruleName': ['三字组选', '三字定位'],
	            'ruleBox': [
	                '从0-9十个数字中任选三个不同的数字对指定位置进行投注，若所选择的号码与当期开奖号码所指定之位置相同（顺序不限），即为中奖，若是开出豹子如000、111、222、333、444、555、666、777、888、999算不中奖。',
	                '于万仟百拾个任选三位，自0~9任选3号进行投注，当开奖结果与所选号码相同且顺序一致时，即为中奖。'
	            ]
	        },
	        'szhs': {
	            'ruleName': [
	                '三字和数',
	                '三字和数大小',
	                '三字和数单双',
	                '三字和数尾数',
	                '三字和数尾数大小',
	                '三字和数尾数质合'
	            ],
	            'ruleBox': [
	                '开奖结果万仟佰/仟佰拾/佰拾个三位数的总和值与若投注万仟佰数字的总和值与相同时，即为中奖。',
	                '0~13为小，14~27为大。',
	                '1、3、5、7、9、11、13、15、17、19、21、23、25、27为单，0、2、4、6、8、10、12、14、16、18、20、22、24、26为双。',
	                '以开奖号码的总和尾数，作为中奖依据。会员可以选择0~9的任一号码。举例：开奖结果为3、4、5。万仟佰总和为2，尾数为2。',
	                '0~13为小，14~27为大。',
	                '1、3、5、7、9、11、13、15、17、19、21、23、25、27为单，0、2、4、6、8、10、12、14、16、18、20、22、24、26为双。'
	            ]
	        },
	        'wz': {
	            'ruleName': ['五字和数', '五字和数尾数', '五字和数大小', '五字和数单双', '五字和数尾数大小', '五字和数尾数质合', '五字龙虎'],
	            'ruleBox': [
	                '开奖结果五位数字的总和值与若投注五位数字的总和值与相同时，即为中奖。',
	                '以开奖号码的总和尾数，作为中奖依据。会员可以选择0~9的任一号码。举例：五字和数为12，尾数为2。',
	                '0~22为小，23~45为大。',
	                '1、3、5、7、9、11、13、15、17、19、21、23、25、27为单，0、2、4、6、8、10、12、14、16、18、20、22、24、26为双。',
	                '0~4为小，5~9为大。',
	                '1、2、3、5、7为质数，0、4、6、8、9为合数。',
	                ' 	龙：万位中奖号码大于个位的中奖号码。如万位开出9，个位开出2。虎：万位中奖号码小于个位的中奖号码。如万位开出2，个位开出6。和：万位中奖号码等于个位的中奖号码。如万位开出1，个位开出1。'
	            ]
	        },
	        'zxs': {
	            'ruleName': ['组选三'],
	            'ruleBox': [
	                '会员可以挑选5~10个号码，当开奖结果[万位、仟位、佰位]中有且只有两个号码重复，则视为中奖。挑选不同个数的号码有其相对应的赔率。如果是选择(1、2、3、4、5)，则只要开奖结果[万位、仟位、佰位]中，有出现1、2、3、4、5中的任何两个号码，且其中有一个号码重复则中奖。<br>例如：112、344，若是开出豹子则不算中奖。<br>备注："豹子"为三字同号，例如：111、222'
	            ]
	        },
	        'zxl': {
	            'ruleName': ['组选六'],
	            'ruleBox': [
	                '会员可以挑选4~8个号码，当开奖结果[万位、仟位、佰位]都出现在所下注的号码中且没有任何号码重复，则视为中奖。挑选不同个数的号码有其相对应的赔率，中奖赔率以所选号码中的最小赔率计算派彩。<br> 例如：如果是选择(1、2、3、4)，则开奖结果[万位、仟位、佰位]为123、124、134、234都中奖，其他都是不中奖。例如：112、133、145、444等都是不中奖。'
	            ]
	        },
	        'kd': {
	            'ruleName': ['前三跨度', '中三跨度', '后三跨度'],
	            'ruleBox': [
	                '举例：开奖结果为3、4、8、7、6。中奖的跨度为5。（最大号码8减最小号码3=5）。',
	                '举例：开奖结果为3、4、8、7、6。中奖的跨度为4。（最大号码8减最小号码4=4）。',
	                '举例：开奖结果为3、4、8、7、6。中奖的跨度为2。（最大号码8减最小号码6=2）。'
	            ]
	        },
	        'qt': {
	            'ruleName': ['豹子', '顺子', '对子', '半顺', '杂六', '准对', '不出'],
	            'ruleBox': [
	                '万仟佰豹子/仟佰拾豹子/佰拾个豹子 数字都相同。例如：111、222，即为中奖。',
	                '万仟佰顺子/仟佰拾顺子/佰拾个顺子 数字连号，不分顺序(包含数字9.0.1)。例如：012、019，即为中奖。',
	                '万仟佰对子/仟佰拾对子/佰拾个对子 任意2位数相同，另一位数不同(不含豹子)。例如：211、727，即为中奖。',
	                '万仟佰半顺/仟佰拾半顺/佰拾个半顺 数字皆不同，且任意2位数为连号(不含对子、顺子与数字9,0,1)。例如：023、401，即为中奖。',
	                '万仟佰杂六/仟佰拾杂六/佰拾个杂六 不包含豹子、顺子、对子、半顺的所有中奖号码。例如：024、406即为中奖。',
	                '万仟佰准对/仟佰拾准对/佰拾个准对 0~9投注一个号码，该号码于本次开奖为对子即为中奖(不包含豹子)。例如：开奖结果为211，准对1即为中奖。',
	                '万仟佰不出/仟佰拾不出/佰拾个不出 0~9投注一个号码，如果开奖号码不包含该号码，则视为中奖。例如：开奖结果为012，不出3、4、5、6、7、8、9即为中奖。'
	            ]
	        },
	        'nn': {
	            'ruleName': ['牛1', '牛2', '牛3', '牛4', '牛5', '牛6', '牛7', '牛8', '牛9', '牛牛', '无牛', '牛大小', '牛单双', '牛质合', '炸弹', '葫芦', '顺子', '三条', '两对', '单对', '散号'],
	            'ruleBox': [
	                '开出五个号码任意组合三个号码为0或10的倍数，剩余两个号码之和的个位数为1。',
	                '开出五个号码任意组合三个号码为0或10的倍数，剩余两个号码之和的个位数为2。',
	                '开出五个号码任意组合三个号码为0或10的倍数，剩余两个号码之和的个位数为3。',
	                '开出五个号码任意组合三个号码为0或10的倍数，剩余两个号码之和的个位数为4。',
	                '开出五个号码任意组合三个号码为0或10的倍数，剩余两个号码之和的个位数为5。',
	                '开出五个号码任意组合三个号码为0或10的倍数，剩余两个号码之和的个位数为6。',
	                '开出五个号码任意组合三个号码为0或10的倍数，剩余两个号码之和的个位数为7。',
	                '开出五个号码任意组合三个号码为0或10的倍数，剩余两个号码之和的个位数为8。',
	                '开出五个号码任意组合三个号码为0或10的倍数，剩余两个号码之和的个位数为9。',
	                '开出五个号码任意组合三个号码为0或10的倍数，剩余两个号码之和大于10减10为0者。',
	                '开出五个号码任意组合三个数都无法组合成为0或10的倍数。',
	                '牛大(牛6.牛7.牛8.牛9.牛牛)、牛小(牛1.牛2.牛3.牛4.牛5)，无牛则视为无中奖。',
	                '牛单(牛1.牛3.牛5.牛7.牛9)、牛双(牛2.牛4.牛6.牛8.牛牛)，无牛则视为无中奖。',
	                '牛质(牛1.牛2.牛3.牛5.牛7)、牛和(牛4.牛6.牛8.牛9.牛牛)，无牛则视为无中奖。',
	                '开出五个号码中四个相同。如：10000..22221',
	                '开出五个号码中三个相同(三条)及两个号码相同(一对)。如：11222.33444',
	                '开出五个号码从小到大排列为01234.12345.23456.34567.45678.56789.06789.01789.01289.01239',
	                '开出五个号码中三个相同(三条)及两个号码不相同。如：12333.66678',
	                '开出五个号码中有两组相同。如：00112.36677',
	                '开出五个号码中只有一组相同。如：00123.13556',
	                '开出五个号码没有任何相同或相关联。如：12356.01345.34678.12579'
	            ]
	        }
	    },
	    'fcssl': { //福彩时时乐
	        'zsp': {
	            'ruleName': [
	                '一字定位', '一字组合', '佰/拾/个 大小', '佰/拾/个 单双', '佰/拾/个 质合', '二字定位', '二字组合', '佰拾和数', '佰个和数', '拾个和数', '佰拾/佰个/拾个 和数尾数',
	                '佰拾和数尾数', '佰个和数尾数', '拾个和数尾数', '佰拾/佰个/拾个 和数单双', '佰拾/佰个/拾个 和数尾数大小', '佰拾/佰个/拾个 和数尾数质合', '三字组合', '佰拾个和数',
	                '佰拾个和数尾数', '佰拾个和数大小', '佰拾个和数单双', '佰拾个和数尾数大小', '佰拾个和数尾数质合'
	            ],
	            'ruleBox': [
	                '于佰拾个任选一位，自0~9任选1号进行投注，当开奖结果与所选的定位与号码相同且顺序一致时，即为中奖。',
	                '0~9任选1号进行投注，当开奖结果佰拾个任一数与所选的号码相同时，即为中奖。',
	                '0~4为小，5~9为大。',
	                '1、3、5、7、9为单，0、2、4、6、8为双。',
	                '1、2、3、5、7为质数，0、4、6、8、9为合数。',
	                '于佰拾个任选二位，自0~9任选2号进行投注，当开奖结果与所选号码相同且顺序一致时，即为中奖。',
	                '0~9任选2号进行投注，当开奖结果佰拾个任二数与所选的号码相同时，即为中奖。',
	                '开奖结果佰拾二位数的总和值若与投注佰拾位数字的总和值相同时，即为中奖。',
	                '开奖结果佰个二位数的总和值若与投注佰个位数字的总和值相同时，即为中奖。',
	                '开奖结果拾个二位数的总和值若与投注佰个位数字的总和值相同时，即为中奖。',
	                '以开奖号码的总和尾数，作为中奖依据。会员可以选择0~9的任一号码。<br>举例：开奖结果为3、4、5。',
	                '佰拾总合为7，尾数为7。',
	                '佰个总合为8，尾数为8。',
	                '拾个总合为9，尾数为9。',
	                '1、3、5、7、9、11、13、15、17为单，0、2、4、6、8、10、12、14、16、18为双。',
	                '0~4为小，5~9为大。',
	                '1、2、3、5、7为质数，0、4、6、8、9为合数。',
	                '自0~9号任选3个号码时（如123），当开奖结果与所选号码相同，即为中奖。',
	                '开奖结果佰拾个三位数的总和值与若投注佰拾个数字的总和值与相同时，即为中奖。',
	                '以开奖号码的总和尾数，作为中奖依据。会员可以选择0~9的任一号码。<br>举例：开奖结果为3、4、5。<br>佰拾个总合为2，尾数为2。',
	                '0~13为小，14~27为大。',
	                '1、3、5、7、9、11、13、15、17、19、21、23、25、27为单，0、2、4、6、8、10、12、14、16、18、20、22、24、26为双。',
	                '0~4为小，5~9为大。',
	                ' 	1、2、3、5、7为质数，0、4、6、8、9为合数。'
	            ]
	        },
	        'yz': {
	            'ruleName': ['一字定位', '一字组合', '佰/拾/个 大小', '佰/拾/个 单双', '佰/拾/个 质合'],
	            'ruleBox': [
	                '于佰拾个任选一位，自0~9任选1号进行投注，当开奖结果与所选的定位与号码相同且顺序一致时，即为中奖。',
	                '0~9任选1号进行投注，当开奖结果佰拾个任一数与所选的号码相同时，即为中奖。',
	                '0~4为小，5~9为大。',
	                '1、3、5、7、9为单，0、2、4、6、8为双。',
	                '1、2、3、5、7为质数，0、4、6、8、9为合数。'
	            ]
	        },
	        'ez': {
	            'ruleName': ['二字定位', '二字组合', '佰拾和数', '佰个和数', '拾个和数', '佰拾/佰个/拾个 和数尾数', '佰拾和数尾数', '佰个和数尾数', '拾个和数尾数', '佰拾/佰个/拾个 和数单双', '佰拾/佰个/拾个 和数尾数大小', '佰拾/佰个/拾个 和数尾数质合'],
	            'ruleBox': [
	                '于佰拾个任选二位，自0~9任选2号进行投注，当开奖结果与所选号码相同且顺序一致时，即为中奖。',
	                '0~9任选2号进行投注，当开奖结果佰拾个任二数与所选的号码相同时，即为中奖。',
	                '开奖结果佰拾二位数的总和值若与投注佰拾位数字的总和值相同时，即为中奖。',
	                '开奖结果佰个二位数的总和值若与投注佰个位数字的总和值相同时，即为中奖。。',
	                '开奖结果拾个二位数的总和值若与投注佰个位数字的总和值相同时，即为中奖。',
	                '以开奖号码的总和尾数，作为中奖依据。会员可以选择0~9的任一号码。<br>举例：开奖结果为3、4、5。',
	                '佰拾总合为7，尾数为7。',
	                '佰个总合为8，尾数为8。',
	                '拾个总合为9，尾数为9。',
	                '1、3、5、7、9、11、13、15、17为单，0、2、4、6、8、10、12、14、16、18为双。',
	                '0~4为小，5~9为大。',
	                '1、2、3、5、7为质数，0、4、6、8、9为合数。'
	            ]
	        },
	        'sz': {
	            'ruleName': ['三字组合', '佰拾个和数', '佰拾个和数尾数', '佰拾个和数大小', '佰拾个和数单双', '佰拾个和数尾数大小', '佰拾个和数尾数质合'],
	            'ruleBox': [
	                '自0~9号任选3个号码时（如123），当开奖结果与所选号码相同，即为中奖。',
	                '开奖结果佰拾个三位数的总和值与若投注佰拾个数字的总和值与相同时，即为中奖。',
	                '以开奖号码的总和尾数，作为中奖依据。会员可以选择0~9的任一号码。<br>举例：开奖结果为3、4、5。<br>佰拾个总合为2，尾数为2。',
	                '0~13为小，14~27为大。',
	                '1、3、5、7、9、11、13、15、17、19、21、23、25、27为单，0、2、4、6、8、10、12、14、16、18、20、22、24、26为双。',
	                '0~4为小，5~9为大。',
	                '1、2、3、5、7为质数，0、4、6、8、9为合数。'
	            ]
	        },
	        'zxs': {
	            'ruleName': ['组选三'],
	            'ruleBox': [
	                '会员可以挑选5~10个号码，当开奖结果中有且只有两个号码重复，则视为中奖。挑选不同个数的号码有其相对应的赔率。如果是选择(1、2、3、4、5)，则只要开奖结果中，有出现1、2、3、4、5中的任何两个号码，且其中有一个号码重复则中奖。 <br> 例如：112、344，若是开出豹子则不算中奖。<br> 备注："豹子"为三字同号，例如：111、222'
	            ]
	        },
	        'zxl': {
	            'ruleName': ['组选六'],
	            'ruleBox': [
	                '会员可以挑选4~8个号码，当开奖结果都出现在所下注的号码中且没有任何号码重复，则视为中奖。挑选不同个数的号码有其相对应的赔率，中奖赔率以所选号码中的最小赔率计算派彩。<br>例如：如果是选择(1、2、3、4)，则开奖结果为123、124、134、234都中奖，其他都是不中奖。例如：112、133、145、444等都是不中奖。'
	            ]
	        },
	        'fszh': {
	            'ruleName': ['复式组合'],
	            'ruleBox': [
	                '在佰、拾、个中分别选择号码组合。例如选择3x2x4，即佰位数选3个号码，拾位数选2个号码，个位数选4个号码或选择3x3x3，如每个位数所选择的号码都对应出现在开奖的结果中，则视为中奖。<br> 此游戏选号有以下限制：<br>1. 每一位数最少要选择1个号码，最多选10个号码。<br>2. 三个位数共选取号码数量，最少需选择9个号码，最多选21个号码。'
	            ]
	        },
	        'yzgg': {
	            'ruleName': ['一字过关'],
	            'ruleBox': [
	                '以开奖三个号码之大小、单双、质合作为中奖的依据。<br/>举例：开奖结果为3、4、8。会员若在佰定位下小、拾定位下双、个定位下合。则视为中奖。'
	            ]
	        },
	        'kd': {
	            'ruleName': ['跨度'],
	            'ruleBox': [
	                '举例：开奖结果为3、4、8。中奖的跨度为5。（最大号码8减最小号码3=5）。'
	            ]
	        },
	        'qt': {
	            'ruleName': ['豹子', '顺子', '对子', '半顺', '杂六', '准对', '不出'],
	            'ruleBox': [
	                '数字都相同。例如：111、222，即为中奖。',
	                '数字连号，不分顺序(包含数字9.0.1)。例如：012、019，即为中奖。',
	                '任意2位数相同，另一位数不同(不含豹子)。例如：211、727，即为中奖。',
	                '数字皆不同，且任意2位数为连号(不含对子、顺子与数字9,0,1)。例如：023、401，即为中奖。',
	                '不包含豹子、顺子、对子、半顺的所有中奖号码。例如：024、406即为中奖。',
	                '0~9投注一个号码，该号码于本次开奖为对子即为中奖(不包含豹子)。例如：开奖结果为211，准对1即为中奖。',
	                '0~9投注一个号码，如果开奖号码不包含该号码，则视为中奖。例如：开奖结果为012，不出3、4、5、6、7、8、9即为中奖。'
	            ]
	        }
	    },
	    'gxklsf': { //广西快乐十分
	        'zsp': {
	            'ruleName': ['特别号单码', '特别号大小', '特别号单双', '特别号合数单双', '特别号尾数大小', '特别号半特', '特别号色波', '特别号四季', '特别号五行', '正码特', '正码大小', '正码单双', '正码合数单双', '正码尾数大小', '正码半特', '正码色波', '正码四季', '正码五行', '一中一'],
	            'ruleBox': [
	                '假如投注号码为开奖号码之特别号，视为中奖，其余情形视为不中奖。',
	                '开出号码01~10为小，11~20为大，21为和 。',
	                '特别号为单数叫特单，如11丶15；为双数叫特双，开出号码21为和。',
	                '特别号个位和十位数字之合来判断胜负，如01丶12丶16为合单；02丶11丶20为合双；出21为和 。',
	                '开出之特别号尾数大於或等於5为尾大，小於或等於4为尾小；出21为和 。',
	                '以特别号特大小与特别号单双游戏为一个投注组合；当期特别号开出符合投注组合，即视为中奖； 若当期特码开出21号，则视为和局；其余情形视为不中奖。',
	                '<span style="color: #d00;">红：1丶4丶7丶10丶13丶16丶19</span><br><span style="color: #00f;">蓝：2丶5丶8丶11丶14丶17丶20</span><br><span style="color: #080;">绿：3丶6丶9丶12丶15丶18丶21</span>',
	                '春：1、2、3、4、5<br>夏：6、7、8、9、10<br>秋：11、12、13、14、15<br>冬：16、17、18、19、20<br>出21为和 。',
	                '金：5、10、15、20<br>木：01、06、11、16、21<br>水：02、07、12、17<br>火：03、08、13、18<br>土：04、09、14、19',
	                '正1特丶正2特丶正3特丶正4特：指下注的正码特与现场滚球开出之正码其开奖顺序及开奖号码相同，视为中奖，如现场滚球第一个正码开奖为21号，下注第一个正码特为21则视为中奖，其它号码视为不中奖。',
	                '开出号码01~10为小，11~20为大，21为和 。',
	                '正码为单数叫特单，如11丶15；为双数叫特双，开出号码21为和。',
	                '正码个位和十位数字之合来判断胜负，如01丶12丶16为合单；02丶11丶20为合双；出21为和 。',
	                '开出之正码尾数大於或等於5为尾大，小於或等於4为尾小；出21为和 。',
	                '以正码特大小与特别号单双游戏为一个投注组合；当期特别号开出符合投注组合，即视为中奖； 若当期特码开出21号，则视为和局；其余情形视为不中奖。',
	                '<span style="color: #d00;">红：1丶4丶7丶10丶13丶16丶19</span><br><span style="color: #00f;">蓝：2丶5丶8丶11丶14丶17丶20</span><br><span style="color: #080;">绿：3丶6丶9丶12丶15丶18丶21</span>',
	                '春：1、2、3、4、5<br>夏：6、7、8、9、10<br>秋：11、12、13、14、15<br>冬：16、17、18、19、20<br>出21为和 。',
	                '金：5、10、15、20<br>木：01、06、11、16、21<br>水：02、07、12、17<br>火：03、08、13、18<br>土：04、09、14、19',
	                '投注一个码，如果此码在开奖结果的五个数中存在，为中奖。 '
	            ]
	        },
	        'tbh': {
	            'ruleName': ['特别号单码', '特别号大小', '特别号单双', '特别号合数单双', '特别号尾数大小', '特别号半特', '特别号色波', '特别号四季', '特别号五行'],
	            'ruleBox': [
	                '假如投注号码为开奖号码之特别号，视为中奖，其余情形视为不中奖。',
	                '开出号码01~10为小，11~20为大，21为和 。',
	                '特别号为单数叫特单，如11丶15；为双数叫特双，开出号码21为和。',
	                '特别号个位和十位数字之合来判断胜负，如01丶12丶16为合单；02丶11丶20为合双；出21为和 。',
	                '开出之特别号尾数大於或等於5为尾大，小於或等於4为尾小；出21为和 。',
	                '以特别号特大小与特别号单双游戏为一个投注组合；当期特别号开出符合投注组合，即视为中奖； 若当期特码开出21号，则视为和局；其余情形视为不中奖。',
	                '<span style="color: #d00;">红：1丶4丶7丶10丶13丶16丶19</span><br><span style="color: #00f;">蓝：2丶5丶8丶11丶14丶17丶20</span><br><span style="color: #080;">绿：3丶6丶9丶12丶15丶18丶21</span>',
	                '春：1、2、3、4、5<br>夏：6、7、8、9、10<br>秋：11、12、13、14、15<br>冬：16、17、18、19、20<br>出21为和 。',
	                '金：5、10、15、20<br>木：01、06、11、16、21<br>水：02、07、12、17<br>火：03、08、13、18<br>土：04、09、14、19'
	            ]
	        },
	        'sjwx': {
	            'ruleName': ['正码特', '正码大小', '正码单双', '正码合数单双', '正码尾数大小', '正码半特', '正码色波', '正码四季', '正码五行'],
	            'ruleBox': [
	                '正1特丶正2特丶正3特丶正4特：指下注的正码特与现场滚球开出之正码其开奖顺序及开奖号码相同，视为中奖，如现场滚球第一个正码开奖为21号，下注第一个正码特为21则视为中奖，其它号码视为不中奖。',
	                '开出号码01~10为小，11~20为大，21为和 。',
	                '正码为单数叫特单，如11丶15；为双数叫特双，开出号码21为和。',
	                '正码个位和十位数字之合来判断胜负，如01丶12丶16为合单；02丶11丶20为合双；出21为和 。',
	                '开出之正码尾数大於或等於5为尾大，小於或等於4为尾小；出21为和 。',
	                '以正码特大小与特别号单双游戏为一个投注组合；当期特别号开出符合投注组合，即视为中奖； 若当期特码开出21号，则视为和局；其余情形视为不中奖。',
	                '<span style="color: #d00;">红：1丶4丶7丶10丶13丶16丶19</span><br><span style="color: #00f;">蓝：2丶5丶8丶11丶14丶17丶20</span><br><span style="color: #080;">绿：3丶6丶9丶12丶15丶18丶21</span>',
	                '春：1、2、3、4、5<br>夏：6、7、8、9、10<br>秋：11、12、13、14、15<br>冬：16、17、18、19、20<br>出21为和 。',
	                '金：5、10、15、20<br>木：01、06、11、16、21<br>水：02、07、12、17<br>火：03、08、13、18<br>土：04、09、14、19'
	            ]
	        },
	        'zmt': {
	            'ruleName': ['正码特', '正码大小', '正码单双', '正码合数单双', '正码尾数大小', '正码半特', '正码色波', '正码四季', '正码五行'],
	            'ruleBox': [
	                '正1特丶正2特丶正3特丶正4特：指下注的正码特与现场滚球开出之正码其开奖顺序及开奖号码相同，视为中奖，如现场滚球第一个正码开奖为21号，下注第一个正码特为21则视为中奖，其它号码视为不中奖。',
	                '开出号码01~10为小，11~20为大，21为和 。',
	                '正码为单数叫特单，如11丶15；为双数叫特双，开出号码21为和。',
	                '正码个位和十位数字之合来判断胜负，如01丶12丶16为合单；02丶11丶20为合双；出21为和 。',
	                '开出之正码尾数大於或等於5为尾大，小於或等於4为尾小；出21为和 。',
	                '以正码特大小与特别号单双游戏为一个投注组合；当期特别号开出符合投注组合，即视为中奖； 若当期特码开出21号，则视为和局；其余情形视为不中奖。',
	                '<span style="color: #d00;">红：1丶4丶7丶10丶13丶16丶19</span><br><span style="color: #00f;">蓝：2丶5丶8丶11丶14丶17丶20</span><br><span style="color: #080;">绿：3丶6丶9丶12丶15丶18丶21</span>',
	                '春：1、2、3、4、5<br>夏：6、7、8、9、10<br>秋：11、12、13、14、15<br>冬：16、17、18、19、20<br>出21为和 。',
	                '金：5、10、15、20<br>木：01、06、11、16、21<br>水：02、07、12、17<br>火：03、08、13、18<br>土：04、09、14、19'
	            ]
	        },
	        'yzy': {
	            'ruleName': ['一中一'],
	            'ruleBox': [
	                '投注一个码，如果此码在开奖结果的五个数中存在，为中奖。 '
	            ]
	        }
	    },
	    'gdklsf': {  //广东快乐十分
	        'zsp': {
	            'ruleName': ['单码', '大小', '单双', '合数单双', '尾数大小', '四季', '五行', '方位', '中发白', '总合大小', '总合单双', '总合尾数大小', '龙虎', '一中一'],
	            'ruleBox': [
	                '第一球、第二球、第三球、第四球、第五球、第六球、第七球、第八球：指下注的球号与现场滚球开出之号码其开奖顺序及开奖号码相同，视为中奖，如现场滚球第一球开奖为20号，下注第一球为20则视为中奖，其它号码视为不中奖。',
	                '开出的号码大于或等于11为大，小于或等于10为小。',
	                '号码为双数叫双，如08、16；号码为单叫单，如19、05。',
	                '正码个位和十位数字之合来判断胜负，如01、12、16为合单；02、11、20为合双。',
	                '开出之正码尾数大于或等于5为尾大，小于或等于4为尾小。',
	                '春：01、02、03、04、05<br>夏：06、07、08、09、10<br>秋：11、12、13、14、15<br>冬：16、17、18、19、20',
	                '金：05、10、15、20<br>木：01、06、11、16<br>水：02、07、12、17<br>火：03、08、13、18<br>土：04、09、14、19',
	                '东：01、05、09、13、17<br>南：02、06、10、14、18<br>西：03、07、11、15、19<br>北：04、08、12、16、20',
	                '中：01、02、03、04、05、06、07<br>发：08、09、10、11、12、13、14<br>白：15、16、17、18、19、20',
	                '所有8个开奖号码总和值小于84为总小；总和值大于84为总大，若总和值刚好等于84算和局(不计算输赢)。',
	                '所有开奖号码数字加总值是单数为合单，如11、21；加总值是双数为合双，如22、40。',
	                '所有开奖号码数字加总值大于或等于5为总尾大，小于或等于4为总尾小。',
	                '龙：第一球中奖号码大于第八球的中奖号码。如第一球开出14第八球开出09。虎：第一球中奖号码小于第八球的中奖号码。如第一球开出09第八球开出14。 ',
	                '投注一个码，如果此码在开奖结果的八个数中存在，为中奖。 '
	            ]
	        },
	        'dmsm': {
	            'ruleName': ['单码', '大小', '单双', '合数单双', '尾数大小', '四季', '五行', '方位', '中发白'],
	            'ruleBox': [
	                '第一球、第二球、第三球、第四球、第五球、第六球、第七球、第八球：指下注的球号与现场滚球开出之号码其开奖顺序及开奖号码相同，视为中奖，如现场滚球第一球开奖为20号，下注第一球为20则视为中奖，其它号码视为不中奖。',
	                '开出的号码大于或等于11为大，小于或等于10为小。',
	                '号码为双数叫双，如08、16；号码为单叫单，如19、05。',
	                '正码个位和十位数字之合来判断胜负，如01、12、16为合单；02、11、20为合双。',
	                '开出之正码尾数大于或等于5为尾大，小于或等于4为尾小。',
	                '春：01、02、03、04、05<br>夏：06、07、08、09、10<br>秋：11、12、13、14、15<br>冬：16、17、18、19、20',
	                '金：05、10、15、20<br>木：01、06、11、16<br>水：02、07、12、17<br>火：03、08、13、18<br>土：04、09、14、19',
	                '东：01、05、09、13、17<br>南：02、06、10、14、18<br>西：03、07、11、15、19<br>北：04、08、12、16、20',
	                '中：01、02、03、04、05、06、07<br>发：08、09、10、11、12、13、14<br>白：15、16、17、18、19、20'
	            ]
	        },
	        'sjwx': {
	            'ruleName': ['单码', '大小', '单双', '合数单双', '尾数大小', '四季', '五行', '方位', '中发白'],
	            'ruleBox': [
	                '第一球、第二球、第三球、第四球、第五球、第六球、第七球、第八球：指下注的球号与现场滚球开出之号码其开奖顺序及开奖号码相同，视为中奖，如现场滚球第一球开奖为20号，下注第一球为20则视为中奖，其它号码视为不中奖。',
	                '开出的号码大于或等于11为大，小于或等于10为小。',
	                '号码为双数叫双，如08、16；号码为单叫单，如19、05。',
	                '正码个位和十位数字之合来判断胜负，如01、12、16为合单；02、11、20为合双。',
	                '开出之正码尾数大于或等于5为尾大，小于或等于4为尾小。',
	                '春：01、02、03、04、05<br>夏：06、07、08、09、10<br>秋：11、12、13、14、15<br>冬：16、17、18、19、20',
	                '金：05、10、15、20<br>木：01、06、11、16<br>水：02、07、12、17<br>火：03、08、13、18<br>土：04、09、14、19',
	                '东：01、05、09、13、17<br>南：02、06、10、14、18<br>西：03、07、11、15、19<br>北：04、08、12、16、20',
	                '中：01、02、03、04、05、06、07<br>发：08、09、10、11、12、13、14<br>白：15、16、17、18、19、20'
	            ]
	        },
	        'fwzfb': {
	            'ruleName': ['单码', '大小', '单双', '合数单双', '尾数大小', '四季', '五行', '方位', '中发白'],
	            'ruleBox': [
	                '第一球、第二球、第三球、第四球、第五球、第六球、第七球、第八球：指下注的球号与现场滚球开出之号码其开奖顺序及开奖号码相同，视为中奖，如现场滚球第一球开奖为20号，下注第一球为20则视为中奖，其它号码视为不中奖。',
	                '开出的号码大于或等于11为大，小于或等于10为小。',
	                '号码为双数叫双，如08、16；号码为单叫单，如19、05。',
	                '正码个位和十位数字之合来判断胜负，如01、12、16为合单；02、11、20为合双。',
	                '开出之正码尾数大于或等于5为尾大，小于或等于4为尾小。',
	                '春：01、02、03、04、05<br>夏：06、07、08、09、10<br>秋：11、12、13、14、15<br>冬：16、17、18、19、20',
	                '金：05、10、15、20<br>木：01、06、11、16<br>水：02、07、12、17<br>火：03、08、13、18<br>土：04、09、14、19',
	                '东：01、05、09、13、17<br>南：02、06、10、14、18<br>西：03、07、11、15、19<br>北：04、08、12、16、20',
	                '中：01、02、03、04、05、06、07<br>发：08、09、10、11、12、13、14<br>白：15、16、17、18、19、20'
	            ]
	        },
	        'zhlh': {
	            'ruleName': ['总合大小', '总合单双', '总合尾数大小', '龙虎', '一中一'],
	            'ruleBox': [
	                '所有8个开奖号码总和值小于84为总小；总和值大于84为总大，若总和值刚好等于84算和局(不计算输赢)。',
	                '所有开奖号码数字加总值是单数为合单，如11、21；加总值是双数为合双，如22、40。',
	                '所有开奖号码数字加总值大于或等于5为总尾大，小于或等于4为总尾小。',
	                '龙：第一球中奖号码大于第八球的中奖号码。如第一球开出14第八球开出09。虎：第一球中奖号码小于第八球的中奖号码。如第一球开出09第八球开出14。 ',
	                '投注一个码，如果此码在开奖结果的八个数中存在，为中奖。 '
	            ]
	        },
	        'yzy': {
	            'ruleName': ['总合大小', '总合单双', '总合尾数大小', '龙虎', '一中一'],
	            'ruleBox': [
	                '所有8个开奖号码总和值小于84为总小；总和值大于84为总大，若总和值刚好等于84算和局(不计算输赢)。',
	                '所有开奖号码数字加总值是单数为合单，如11、21；加总值是双数为合双，如22、40。',
	                '所有开奖号码数字加总值大于或等于5为总尾大，小于或等于4为总尾小。',
	                '龙：第一球中奖号码大于第八球的中奖号码。如第一球开出14第八球开出09。虎：第一球中奖号码小于第八球的中奖号码。如第一球开出09第八球开出14。 ',
	                '投注一个码，如果此码在开奖结果的八个数中存在，为中奖。 '
	            ]
	        }
	    },
	    'klsf': {  //快乐十分
	        'zsp': {
	            'ruleName': ['单码', '大小', '单双', '合数单双', '尾数大小', '四季', '五行', '方位', '中发白', '总合大小', '总合单双', '总合尾数大小', '龙虎', '一中一'],
	            'ruleBox': [
	                '第一球、第二球、第三球、第四球、第五球、第六球、第七球、第八球：指下注的球号与现场滚球开出之号码其开奖顺序及开奖号码相同，视为中奖，如现场滚球第一球开奖为20号，下注第一球为20则视为中奖，其它号码视为不中奖。',
	                '开出的号码大于或等于11为大，小于或等于10为小。',
	                '号码为双数叫双，如08、16；号码为单叫单，如19、05。',
	                '正码个位和十位数字之合来判断胜负，如01、12、16为合单；02、11、20为合双。',
	                '开出之正码尾数大于或等于5为尾大，小于或等于4为尾小。',
	                '春：01、02、03、04、05<br>夏：06、07、08、09、10<br>秋：11、12、13、14、15<br>冬：16、17、18、19、20',
	                '金：05、10、15、20<br>木：01、06、11、16<br>水：02、07、12、17<br>火：03、08、13、18<br>土：04、09、14、19',
	                '东：01、05、09、13、17<br>南：02、06、10、14、18<br>西：03、07、11、15、19<br>北：04、08、12、16、20',
	                '中：01、02、03、04、05、06、07<br>发：08、09、10、11、12、13、14<br>白：15、16、17、18、19、20',
	                '所有8个开奖号码总和值小于84为总小；总和值大于84为总大，若总和值刚好等于84算和局(不计算输赢)。',
	                '所有开奖号码数字加总值是单数为合单，如11、21；加总值是双数为合双，如22、40。',
	                '所有开奖号码数字加总值大于或等于5为总尾大，小于或等于4为总尾小。',
	                '龙：第一球中奖号码大于第八球的中奖号码。如第一球开出14第八球开出09。虎：第一球中奖号码小于第八球的中奖号码。如第一球开出09第八球开出14。 ',
	                '投注一个码，如果此码在开奖结果的八个数中存在，为中奖。 '
	            ]
	        },
	        'tbh': {
	            'ruleName': ['单码', '大小', '单双', '合数单双', '尾数大小', '四季', '五行', '方位', '中发白'],
	            'ruleBox': [
	                '第一球、第二球、第三球、第四球、第五球、第六球、第七球、第八球：指下注的球号与现场滚球开出之号码其开奖顺序及开奖号码相同，视为中奖，如现场滚球第一球开奖为20号，下注第一球为20则视为中奖，其它号码视为不中奖。',
	                '开出的号码大于或等于11为大，小于或等于10为小。',
	                '号码为双数叫双，如08、16；号码为单叫单，如19、05。',
	                '正码个位和十位数字之合来判断胜负，如01、12、16为合单；02、11、20为合双。',
	                '开出之正码尾数大于或等于5为尾大，小于或等于4为尾小。',
	                '春：01、02、03、04、05<br>夏：06、07、08、09、10<br>秋：11、12、13、14、15<br>冬：16、17、18、19、20',
	                '金：05、10、15、20<br>木：01、06、11、16<br>水：02、07、12、17<br>火：03、08、13、18<br>土：04、09、14、19',
	                '东：01、05、09、13、17<br>南：02、06、10、14、18<br>西：03、07、11、15、19<br>北：04、08、12、16、20',
	                '中：01、02、03、04、05、06、07<br>发：08、09、10、11、12、13、14<br>白：15、16、17、18、19、20'
	            ]
	        },
	        'dmsm': {
	            'ruleName': ['单码', '大小', '单双', '合数单双', '尾数大小', '四季', '五行', '方位', '中发白'],
	            'ruleBox': [
	                '第一球、第二球、第三球、第四球、第五球、第六球、第七球、第八球：指下注的球号与现场滚球开出之号码其开奖顺序及开奖号码相同，视为中奖，如现场滚球第一球开奖为20号，下注第一球为20则视为中奖，其它号码视为不中奖。',
	                '开出的号码大于或等于11为大，小于或等于10为小。',
	                '号码为双数叫双，如08、16；号码为单叫单，如19、05。',
	                '正码个位和十位数字之合来判断胜负，如01、12、16为合单；02、11、20为合双。',
	                '开出之正码尾数大于或等于5为尾大，小于或等于4为尾小。',
	                '春：01、02、03、04、05<br>夏：06、07、08、09、10<br>秋：11、12、13、14、15<br>冬：16、17、18、19、20',
	                '金：05、10、15、20<br>木：01、06、11、16<br>水：02、07、12、17<br>火：03、08、13、18<br>土：04、09、14、19',
	                '东：01、05、09、13、17<br>南：02、06、10、14、18<br>西：03、07、11、15、19<br>北：04、08、12、16、20',
	                '中：01、02、03、04、05、06、07<br>发：08、09、10、11、12、13、14<br>白：15、16、17、18、19、20'
	            ]
	        },
	        'sjwx': {
	            'ruleName': ['单码', '大小', '单双', '合数单双', '尾数大小', '四季', '五行', '方位', '中发白'],
	            'ruleBox': [
	                '第一球、第二球、第三球、第四球、第五球、第六球、第七球、第八球：指下注的球号与现场滚球开出之号码其开奖顺序及开奖号码相同，视为中奖，如现场滚球第一球开奖为20号，下注第一球为20则视为中奖，其它号码视为不中奖。',
	                '开出的号码大于或等于11为大，小于或等于10为小。',
	                '号码为双数叫双，如08、16；号码为单叫单，如19、05。',
	                '正码个位和十位数字之合来判断胜负，如01、12、16为合单；02、11、20为合双。',
	                '开出之正码尾数大于或等于5为尾大，小于或等于4为尾小。',
	                '春：01、02、03、04、05<br>夏：06、07、08、09、10<br>秋：11、12、13、14、15<br>冬：16、17、18、19、20',
	                '金：05、10、15、20<br>木：01、06、11、16<br>水：02、07、12、17<br>火：03、08、13、18<br>土：04、09、14、19',
	                '东：01、05、09、13、17<br>南：02、06、10、14、18<br>西：03、07、11、15、19<br>北：04、08、12、16、20',
	                '中：01、02、03、04、05、06、07<br>发：08、09、10、11、12、13、14<br>白：15、16、17、18、19、20'
	            ]
	        },
	        'fwzfb': {
	            'ruleName': ['单码', '大小', '单双', '合数单双', '尾数大小', '四季', '五行', '方位', '中发白'],
	            'ruleBox': [
	                '第一球、第二球、第三球、第四球、第五球、第六球、第七球、第八球：指下注的球号与现场滚球开出之号码其开奖顺序及开奖号码相同，视为中奖，如现场滚球第一球开奖为20号，下注第一球为20则视为中奖，其它号码视为不中奖。',
	                '开出的号码大于或等于11为大，小于或等于10为小。',
	                '号码为双数叫双，如08、16；号码为单叫单，如19、05。',
	                '正码个位和十位数字之合来判断胜负，如01、12、16为合单；02、11、20为合双。',
	                '开出之正码尾数大于或等于5为尾大，小于或等于4为尾小。',
	                '春：01、02、03、04、05<br>夏：06、07、08、09、10<br>秋：11、12、13、14、15<br>冬：16、17、18、19、20',
	                '金：05、10、15、20<br>木：01、06、11、16<br>水：02、07、12、17<br>火：03、08、13、18<br>土：04、09、14、19',
	                '东：01、05、09、13、17<br>南：02、06、10、14、18<br>西：03、07、11、15、19<br>北：04、08、12、16、20',
	                '中：01、02、03、04、05、06、07<br>发：08、09、10、11、12、13、14<br>白：15、16、17、18、19、20'
	            ]
	        },
	        'zhlh': {
	            'ruleName': ['总合大小', '总合单双', '总合尾数大小', '龙虎', '一中一'],
	            'ruleBox': [
	                '所有8个开奖号码总和值小于84为总小；总和值大于84为总大，若总和值刚好等于84算和局(不计算输赢)。',
	                '所有开奖号码数字加总值是单数为合单，如11、21；加总值是双数为合双，如22、40。',
	                '所有开奖号码数字加总值大于或等于5为总尾大，小于或等于4为总尾小。',
	                '龙：第一球中奖号码大于第八球的中奖号码。如第一球开出14第八球开出09。虎：第一球中奖号码小于第八球的中奖号码。如第一球开出09第八球开出14。 ',
	                '投注一个码，如果此码在开奖结果的八个数中存在，为中奖。 '
	            ]
	        },
	        'yzy': {
	            'ruleName': ['总合大小', '总合单双', '总合尾数大小', '龙虎', '一中一'],
	            'ruleBox': [
	                '所有8个开奖号码总和值小于84为总小；总和值大于84为总大，若总和值刚好等于84算和局(不计算输赢)。',
	                '所有开奖号码数字加总值是单数为合单，如11、21；加总值是双数为合双，如22、40。',
	                '所有开奖号码数字加总值大于或等于5为总尾大，小于或等于4为总尾小。',
	                '龙：第一球中奖号码大于第八球的中奖号码。如第一球开出14第八球开出09。虎：第一球中奖号码小于第八球的中奖号码。如第一球开出09第八球开出14。 ',
	                '投注一个码，如果此码在开奖结果的八个数中存在，为中奖。 '
	            ]
	        }
	    },
	    'yyxw': {   //11选5
	        'zsp': {
	            'ruleName': ['单码', '大小', '单双', '总和大小', '总和单双', '总和尾数大小', '龙虎'],
	            'ruleBox': [
	                '第一球、第二球、第三球、第四球、第五球：指下注的球号与现场滚球开出之号码其开奖顺序及开奖号码相同，视为中奖，如现场滚球第一球开奖为10号，下注第一球为10则视为中奖，其它号码视为不中奖。',
	                '开出的号码大于或等于6为大，小于或等于5为小，开出11号为和。',
	                '号码为双数叫双，如8、16；号码为单叫单，如19、5。开出11号为和。',
	                '所有5个开奖号码总和值小于30为总小；总和值大于30为总大，若总和值刚好等于30算和局(不计算输赢)。',
	                '所有开奖号码数字加总值是单数为合单，如11、31；加总值是双数为合双，如42、30。 ',
	                '所有开奖号码数字加总值大于或等于5为总尾大，小于或等于4为总尾小。 ',
	                '龙：第一球中奖号码大于第五球的中奖号码。如第一球开出10第五球开出07。虎：第一球中奖号码小于第五球的中奖号码。如第一球开出03第五球开出07。'
	            ]
	        },
	        'dmsm': {
	            'ruleName': ['单码', '大小', '单双'],
	            'ruleBox': [
	                '第一球、第二球、第三球、第四球、第五球：指下注的球号与现场滚球开出之号码其开奖顺序及开奖号码相同，视为中奖，如现场滚球第一球开奖为10号，下注第一球为10则视为中奖，其它号码视为不中奖。',
	                '开出的号码大于或等于6为大，小于或等于5为小，开出11号为和。',
	                '号码为双数叫双，如8、16；号码为单叫单，如19、5。开出11号为和。'
	            ]
	        },
	        'zhlh': {
	            'ruleName': ['总和大小', '总和单双', '总和尾数大小', '龙虎'],
	            'ruleBox': [
	                '所有5个开奖号码总和值小于30为总小；总和值大于30为总大，若总和值刚好等于30算和局(不计算输赢)。',
	                '所有开奖号码数字加总值是单数为合单，如11、31；加总值是双数为合双，如42、30。 ',
	                '所有开奖号码数字加总值大于或等于5为总尾大，小于或等于4为总尾小。 ',
	                '龙：第一球中奖号码大于第五球的中奖号码。如第一球开出10第五球开出07。虎：第一球中奖号码小于第五球的中奖号码。如第一球开出03第五球开出07。'
	            ]
	        },
	        'rxyb': {
	            'ruleName': ['一中一', '任选二中2', '任选三中3', '任选四中4', '任选五中5', '任选六中5', '任选七中5', '任选八中5'],
	            'ruleBox': [
	                '投注一个码，如果此码在开奖结果的五个数中存在，为中奖。 ',
	                '投注的2个号码与当期摇出的5个号码中的任2个号码相同，则中奖。 ',
	                '投注的3个号码与当期摇出的5个号码中的任3个号码相同，则中奖。 ',
	                '投注的4个号码与当期摇出的5个号码中的任4个号码相同，则中奖。 ',
	                '投注的5个号码与当期摇出的5个号码中的任5个号码相同，则中奖。',
	                '投注的6个号码与当期摇出的5个号码中的任5个号码相同，则中奖。',
	                '投注的7个号码与当期摇出的5个号码中的任5个号码相同，则中奖。 ',
	                '投注的8个号码与当期摇出的5个号码中的任5个号码相同，则中奖。 '
	            ]
	        },
	        'qszhxzux': {
	            'ruleName': ['选前三组选', '选前三直选'],
	            'ruleBox': [
	                '投注的3个号码与当期顺序摇出的5个号码中的前3个号码相同，则中奖。 ',
	                '投注的3个号码与当期顺序摇出的5个号码中的前3个号码相同且顺序一致，则中奖。 '
	            ]
	        },
	        'qezhxzux': {
	            'ruleName': ['选前二组选', '选前二直选'],
	            'ruleBox': [
	                '投注的2个号码与当期顺序摇出的5个号码中的前2个号码相同，则中奖。 ',
	                '投注的2个号码与当期顺序摇出的5个号码中的前2个号码相同且顺序一致，则中奖。  '
	            ]
	        }
	    },
	    'bjkl8': {  //北京快乐8
	        'xh': {
	            'ruleName': ['选一', '选二', '选三', '选四', '选五'],
	            'ruleBox': [
	                '投注的1个号码与当期摇出的20个号码中的任1个号码相同，则中奖。',
	                '投注的2个号码与当期摇出的20个号码中的任2个号码相同，则中奖。',
	                '所投注的3个号码为一组合，若其中2个是开奖号码中的号码，即为三中二，视为中奖；<br>若3个都是开奖号码中的号码，即为三中二之中三，其余情形视为不中奖。',
	                '所投注的4个号码为一组合，若其中2个是开奖号码中的号码，即为四中二，视为中奖；<br>若其中3个都是开奖号码中的号码，即为四中二之中三；<br>若4个都是开奖号码中的号码，即为四中二之中四，其余情形视为不中奖。',
	                '所投注的5个号码为一组合，若其中3个是开奖号码中的号码，即为五中三，视为中奖；<br>若其中4个都是开奖号码中的号码，即为五中三之中四；<br>若5个都是开奖号码中的号码，即为五中三之中五，其余情形视为不中奖。'
	            ]
	        },
	        'zsp': {
	            'ruleName': ['上下盘', '奇偶盘', '大小盘', '单双盘', '大小单双盘', '快8五行'],
	            'ruleBox': [
	                '开奖号码1~40为上盘号码，41~80为下盘号码。<br>开出的20个号码中，如上盘(1~40)在此局开出号码数目中占多数，则此局为上盘；<br>下盘(41~80)在此局开出号码数目中占多数，则此局为下盘；<br>上盘号码(1~40)和下盘号码(41~80)在此局开出的数目相同时(各10个号码)，则此局为中盘。 ',
	                '开出的20个号码中，如奇数号码在此局开出号码数目中占多数，则此局为奇盘；<br>偶数号码在此局开出号码数目中占多数，则此局为偶盘；<br>奇数号码和偶数号码在此局开出的数目相同时(各10个号码)，则此局为和。',
	                '投注20个号码的总和。 当20个号码总和为810时，游戏将自动退还投注在“大”、“小”、“大单”、“小单”、“大双”、“小双”这六个选项的注金；当过关注单中包含以上六个选项中的一项或几项时，此过关注单将被自动取消，投注本金将被自动退还。',
	                '开出的20个号码的总和为奇数，则为总单；这一总和为偶数，则为总双。',
	                '开出的20个号码的总和的游戏，分为“大单”，“小单”，“大双”和“小双”。总和大于810为“总数大”,小于810为“总数小”；总和为偶数叫“双”，奇数叫“单”；通过大小和单双组合产生“大单”，“小单”，“大双”和“小双”四种结果。',
	                '开出的20个号码的总和分在5个段，以金、木、水、火、土命名：金（210～695）、木（696～763）、水（764～855）、火（856～923）和土（924～1410）。'
	            ]
	        }
	    },
	    'bjpks': {   //北京PK10
	        'zsp': {
	            'ruleName': ['单码', '大小', '单双', '冠军龙虎', '亚军龙虎', '季军龙虎', '第四名龙虎', '第五名龙虎', '冠亚军和'],
	            'ruleBox': [
	                '冠军、亚军、季军、第四名、第五名、第六名、第七名、第八名：指下注的号码与现场开出之号码其开奖顺序及开奖号码相同，视为中奖，如现场第一个开奖号码为3号，下注冠军为3则视为中奖，其它号码视为不中奖。',
	                '开出的号码大于或等于6为大，小于或等于5为小。',
	                '号码为双数叫双，如08、06；号码为单叫单，如09、05。',
	                '龙：冠军中奖号码大于第十名的中奖号码。如冠军开出05，第十名开出02。<br>虎：冠军中奖号码小于第十名的中奖号码。如冠军开出02，第十名开出05。',
	                '龙：亚军中奖号码大于第九名的中奖号码。如亚军开出05，第九名开出02。<br>虎：亚军中奖号码小于第九名的中奖号码。如亚军开出02，第九名开出05。',
	                '龙：季军中奖号码大于第八名的中奖号码。如季军开出05，第八名开出02。<br>虎：季军中奖号码小于第八名的中奖号码。如季军开出02，第八名开出05',
	                '龙：第四名中奖号码大于第七名的中奖号码。如第四名开出05，第七名开出02。<br>虎：第四名中奖号码小于第七名的中奖号码。如第四名开出02，第七名开出05',
	                '龙：第五名中奖号码大于第六名的中奖号码。如第五名开出05，第六名开出02。<br>虎：第五名中奖号码小于第六名的中奖号码。如第五名开出02，第六名开出05',
	                '冠军中奖号码+亚军中奖号码总和。'
	            ]
	        },
	        'dmsm': {
	            'ruleName': ['单码', '大小', '单双', '冠军龙虎', '亚军龙虎', '季军龙虎', '第四名龙虎', '第五名龙虎'],
	            'ruleBox': [
	                '冠军、亚军、季军、第四名、第五名、第六名、第七名、第八名：指下注的号码与现场开出之号码其开奖顺序及开奖号码相同，视为中奖，如现场第一个开奖号码为3号，下注冠军为3则视为中奖，其它号码视为不中奖。',
	                '开出的号码大于或等于6为大，小于或等于5为小。',
	                '号码为双数叫双，如08、06；号码为单叫单，如09、05。',
	                '龙：冠军中奖号码大于第十名的中奖号码。如冠军开出05，第十名开出02。<br>虎：冠军中奖号码小于第十名的中奖号码。如冠军开出02，第十名开出05。',
	                '龙：亚军中奖号码大于第九名的中奖号码。如亚军开出05，第九名开出02。<br>虎：亚军中奖号码小于第九名的中奖号码。如亚军开出02，第九名开出05。',
	                '龙：季军中奖号码大于第八名的中奖号码。如季军开出05，第八名开出02。<br>虎：季军中奖号码小于第八名的中奖号码。如季军开出02，第八名开出05',
	                '龙：第四名中奖号码大于第七名的中奖号码。如第四名开出05，第七名开出02。<br>虎：第四名中奖号码小于第七名的中奖号码。如第四名开出02，第七名开出05',
	                '龙：第五名中奖号码大于第六名的中奖号码。如第五名开出05，第六名开出02。<br>虎：第五名中奖号码小于第六名的中奖号码。如第五名开出02，第六名开出05'
	            ]
	        },
	        'gyjh': {
	            'ruleName': ['冠亚军和'],
	            'ruleBox': [
	                '冠军中奖号码+亚军中奖号码总和'
	            ]
	        },
	        'xh': {
	            'ruleName': ['前二', '前三', '前四'],
	            'ruleBox': [
	                '投注的2个号码与开奖号码中的前2个号码相同且顺序一致。 选二之二中一：投注的2个号码，只要有1个号码与开奖号码前2个号码其中1码相同且顺序一致，就算中奖。 例：开奖号码为1,2,3,4,5,6,7,8,9,10；下注号码第一位为 1、第二位为 2 ，即中奖。',
	                '投注的3个号码与开奖号码中的前3个号码相同且顺序一致。 选三之三中二：投注的3个号码，只要有2个号码与开奖号码前3个号码其中2码相同且顺序一致，就算中奖。 例：开奖号码为1,2,3,4,5,6,7,8,9,10；下注号码第一位为 1、第二位为 2 、第三位是 3，即中奖。',
	                '投注的4个号码与开奖号码的前4个号码相同且顺序一致 选四之四中三：投注的4个号码，只要有3个号码与开奖号码前4个号码其中3码相同且顺序一致，就算中奖。 选四之四中二：投注的4个号码，只要有2个号码与开奖号码前4个号码其中2码相同且顺序一致，就算中奖。 例：开奖号码为1,2,3,4,5,6,7,8,9,10；下注号码第一位为 1、第二位为 2 、第三位是 3、第四位是 4，即中奖。 '
	            ]
	        }
	    },
	    'lhc': {
	        'zsp': {
	            'ruleName': ['特别号单码', '特别号大小', '特别号单双', '特别号合数大小', '特别号合数单双', '特别号尾数大小', '特别号半特', '正码单码', '总和大小', '总和单双', '大小', '单双', '色波', '合数大小', '合数单双', '尾数大小'],
	            'ruleBox': [
	                '假如投注号码为开奖号码之特别号，视为中奖，其余情形视为不中奖。',
	                '开出的特别号大于或等于25为特大；小于等于24为特小，开出49号为和。',
	                '特别号为单数叫特单，如21、35；为双数叫特双，如8、16，开出49号为和。',
	                '以特别号个位数和十位数之和来决定大小，合数大于或等于7为大，小于或等于6为小，开出49号为和。',
	                '以特别号个位和十位数字之和来决定为单数或双数，如01、12、32为合单；如02、11、33为合双，开出49号为和。',
	                '以特别号尾数若0尾~4尾为小、5尾~9尾为大；如01、32、44为特尾小；如05、18、19为特尾大，开出49号为和。',
	                '以特别号大小与特别号单双游戏为一个投注组合；当期特别号开出符合投注组合，即视为中奖； 若当期特码开出49号，则视为和局；其余情形视为不中奖。',
	                '假如投注号码为开奖号码之正码，视为中奖，其余情形视为不中奖。',
	                '所有7个开奖号码的分数总和大于或等于175为总分大或称总大。如开奖号码为02、08、17、28、39、46、25，分数总和是165，则总分小。',
	                '所有7个开奖号码的分数总和是单数叫总分单或称总单，如分数总和是115、183；分数总和是双数叫总分双或称总双，如分数总和是108、162。',
	                '以指定出现正码的位置与号码大于或等于25为大，小于或等于24为小，开出49号为和。',
	                '以指定出现正码的位置与号码为单数或双数下注，开出49号为和。',
	                '以指定出现正码的位置与球色下注，开奖的球色与下注的颜色相同，视为中奖。',
	                '以指定出现正码的位置与号码个位数和十位数之和来决定大小，合数大于或等于7为大，小于或等于6为小，开出49号为和',
	                '以指定出现正码的位置与号码个位数和十位数之和为单数或双数来判断胜负，开出49号为和。',
	                '以指定出现正码的位置与号码尾数大小下注，若0尾~4尾为小、5尾~9尾为大。<br/>如01、32、44为正尾小；如05、18、19为正尾大，开出49号为和。'
	            ]
	        },
	        'tbh-zm': {
	            'ruleName': ['特别号单码', '特别号大小', '特别号单双', '特别号合数大小', '特别号合数单双', '特别号尾数大小', '特别号半特', '正码特', '大小', '单双', '合数单双', '尾数大小'],
	            'ruleBox': [
	                '假如投注号码为开奖号码之特别号，视为中奖，其余情形视为不中奖。',
	                '开出的特别号大于或等于25为特大；小于等于24为特小，开出49号为和。',
	                '特别号为单数叫特单，如21、35；为双数叫特双，如8、16，开出49号为和。',
	                '以特别号个位数和十位数之和来决定大小，合数大于或等于7为大，小于或等于6为小，开出49号为和。',
	                '以特别号个位和十位数字之和来决定为单数或双数，如01、12、32为合单；如02、11、33为合双，开出49号为和。',
	                '以特别号尾数若0尾~4尾为小、5尾~9尾为大；如01、32、44为特尾小；如05、18、19为特尾大，开出49号为和。',
	                '以特别号大小与特别号单双游戏为一个投注组合；当期特别号开出符合投注组合，即视为中奖； 若当期特码开出49号，则视为和局；其余情形视为不中奖。',
	                '正1特、正2特、正3特、正4特、正5特、正6特：指下注的正码特与现场滚球开出之<span style="color: #e00;">正码其开奖顺序及开奖号码相同</span>，视为中奖，如现场滚球第一个正码开奖为49号，下注第一个正码特为49则视为中奖，其它号码视为不中奖。',
	                '以指定出现正码的位置与号码大于或等于25为大，小于或等于24为小，开出49号为和。',
	                '以指定出现正码的位置与号码为单数或双数下注，开出49号为和。',
	                '以指定出现正码的位置与号码个位数和十位数之和为单数或双数来判断胜负，开出49号为和。',
	                '以指定出现正码的位置与号码尾数大小下注，若0尾~4尾为小、5尾~9尾为大。<br/>如01、32、44为正尾小；如05、18、19为正尾大，开出49号为和。'
	            ]
	        },
			dmsm:{
				'ruleName': ['特别号单码', '特别号大小', '特别号单双', '特别号合数大小', '特别号合数单双', '特别号尾数大小', '特别号半特', '正码特', '大小', '单双', '合数单双', '尾数大小'],
	            'ruleBox': [
	                '假如投注号码为开奖号码之特别号，视为中奖，其余情形视为不中奖。',
	                '开出的特别号大于或等于25为特大；小于等于24为特小，开出49号为和。',
	                '特别号为单数叫特单，如21、35；为双数叫特双，如8、16，开出49号为和。',
	                '以特别号个位数和十位数之和来决定大小，合数大于或等于7为大，小于或等于6为小，开出49号为和。',
	                '以特别号个位和十位数字之和来决定为单数或双数，如01、12、32为合单；如02、11、33为合双，开出49号为和。',
	                '以特别号尾数若0尾~4尾为小、5尾~9尾为大；如01、32、44为特尾小；如05、18、19为特尾大，开出49号为和。',
	                '以特别号大小与特别号单双游戏为一个投注组合；当期特别号开出符合投注组合，即视为中奖； 若当期特码开出49号，则视为和局；其余情形视为不中奖。',
	                '正1特、正2特、正3特、正4特、正5特、正6特：指下注的正码特与现场滚球开出之<span style="color: #e00;">正码其开奖顺序及开奖号码相同</span>，视为中奖，如现场滚球第一个正码开奖为49号，下注第一个正码特为49则视为中奖，其它号码视为不中奖。',
	                '以指定出现正码的位置与号码大于或等于25为大，小于或等于24为小，开出49号为和。',
	                '以指定出现正码的位置与号码为单数或双数下注，开出49号为和。',
	                '以指定出现正码的位置与号码个位数和十位数之和为单数或双数来判断胜负，开出49号为和。',
	                '以指定出现正码的位置与号码尾数大小下注，若0尾~4尾为小、5尾~9尾为大。<br/>如01、32、44为正尾小；如05、18、19为正尾大，开出49号为和。'
	            ]	
			},
			sx:{
				'ruleName': [ '生肖','一肖', '总肖', '总肖单双','正肖', '合肖'],
	            'ruleBox': [
					'生肖为鼠、牛、虎、兔、龙、蛇、马、羊、猴、鸡、狗、猪，每一个生肖都会有各自所属的号码，再以生肖投注。若开出的特别号坐落于投注的生肖所属号码内，视为中奖，其余情形视为不中奖。',
	                '只要当期号码(所有正码与最后开出的特码)，坐落于投注的生肖所属号码内，则视为中奖，其余情形视为不中奖<span style="color: #DE0000">（请注意:49亦算输赢，不为和）</span> 。',
	                '只要当期号码(所有正码与最后开出的特码)开出的不同生肖总数，与所投注之预计开出之生肖总数符合(不用指定特定生肖)，则视为中奖，其余情形视为不中奖。<br/>例如如果当期号码为19, 24, 12, 34, 40, 39, 特别号: 49 总计六个生肖，若选取总肖 [6] 则为中奖<span style="color: #DE0000">（请注意:49亦算输赢，不为和）</span> 。 ',
	                '只要当期号码(所有正码与最后开出的特码)开出的不同生肖总数若为单数则为单；若为双数则为双。<br/>例如如果当期号码为19, 24, 12, 34, 40, 39, 特别号: 49 总计六个生肖，若下双则为中奖。 ',         
	                '只要当期6个正码，只要有1个落在下注生肖所属号码范围内，则视为中奖。如超过1个正码落在下注生肖所属号码范围内 ，派彩将倍增！如：下注＄100. 正肖猪倍率1.8<br/>6个正码开出01，派彩为＄80.<br/>6个正码开出01，13，派彩为＄160.<br/>6个正码开出01，13，25，派彩为＄240.<br/>6个正码开出01，13，25，37，派彩为＄320.<br/>6个正码开出01，13，25，37，49，派彩为＄400. <span style="color: #DE0000">（请注意:49亦算输赢，不为和）</span> ',
	                '挑选1~11生肖(排列如同生肖)为一个组合，并选择开奖号码的特码是否在此组合内，若选择是(中)且开奖 号码的特码亦在此组合内，即视为中奖；若选择否(不中)且开奖号码的特码亦不在此组合内，即视为中奖；若当期特码开出49号，则所有组合皆视为和局。'
	            ]	
			},
			tws:{
				
				'ruleName': ['头数', '尾数', '正特尾数'],
	            'ruleBox': [
					'指特别号所属头数的号码。<br/>"0"头：01.02.03.04.05.06.07.08.09<br/>"1"头：10.11.12.13.14.15.16.17.18.19<br/>"2"头：20.21.22.23.24.25.26.27.28.29<br/>"3"头：30.31.32.33.34.35.36.37.38.39<br/>"4"头：40.41.42.43.44.45.46.47.48.49<br/>例如：开奖结果特别号码是21 则 “2”头为中奖，其他头数都不中奖。',
	                '指特别号所属尾数的号码。<br/>"1"尾：01.11.21.31.41<br/>"2"尾：02.12.22.32.42<br/>"3"尾：03.13.23.33.43<br/>"4"尾：04.14.24.34.44<br/>"5"尾：05.15.25.35.45<br/><br/>"6"尾：06.16.26.36.46<br/>"7"尾：07.17.27.37.47<br/>"8"尾：08.18.28.38.48<br/>"9"尾：09.19.29.39.49<br/>"0"尾：10.20.30.40<br/>例如：开奖结果特别号码是21 则"1"尾为中奖，其他尾数都不中奖。',
					'只要当期号码(所有正码与最后开出的特码)，含有所属尾数的一个或多个号码，但派彩只派一次，即不论同尾数号码出现一个或多个号码都只派彩一次。<br/>例如：开奖结果正码是11、31、42、44、35、32特别号码是21 则"1"尾"2"尾"4"尾"5"尾都为中奖，其他尾数都不中奖<span style="color: #DE0000">（请注意:49亦算输赢，不为和）</span>。'
	                
	            ]	
	
			},
			lx:{
				
				'ruleName': ['连肖'],
	            'ruleBox': [
					'挑选2~6生肖(排列如同生肖)为一个组合，当期号码(所有正码与最后开出的特码)坐落于投注时所勾选之生肖组合所属号码内，所勾选之生肖皆至少有中一个号码，则视为中奖，其余情形视为不中奖<span style="color: #DE0000">（请注意:49亦算输赢，不为和）</span><br/>例如如果当期号码为19, 24, 12, 34, 40, 39, 特别号: 49 ，所勾选三个生肖(称为三肖碰)，若所有生肖的所属号码内至少一个出现于当期号码，则视为中奖。 ',
	            ]	
	
			},
			lw:{
				'ruleName': ['连尾'],
	            'ruleBox': [
					'挑选2~6尾数为一个组合，当期号码(所有正码与最后开出的特码)坐落于投注时所勾选之尾数组合所属号码内，所勾选之尾数皆至少有中一个号码，则视为中奖，其余情形视为不中奖<span style="color: #DE0000">（请注意:49亦算输赢，不为和）</span><br/>例如如果当期号码为19, 24, 12, 34, 40, 39, 特别号: 49 ，所勾选三个尾数(称为三尾碰)，若所有尾数的所属号码内至少一个出现于当期号码，则是为中奖。 '
	            ]
			},
	        'tbhsxtw-zmyl': {
	            'ruleName': ['生肖', '头数', '尾数', '大小', '单双', '色波', '合数大小', '合数单双', '尾数大小'],
	            'ruleBox': [
	                '生肖为鼠、牛、虎、兔、龙、蛇、马、羊、猴、鸡、狗、猪，每一个生肖都会有各自所属的号码，再以生肖投注。若开出的特别号坐落于投注的生肖所属号码内，视为中奖，其余情形视为不中奖。',
	                '指特别号所属头数的号码。<br/>"0"头：01.02.03.04.05.06.07.08.09<br/>"1"头：10.11.12.13.14.15.16.17.18.19<br/>"2"头：20.21.22.23.24.25.26.27.28.29<br/>"3"头：30.31.32.33.34.35.36.37.38.39<br/>"4"头：40.41.42.43.44.45.46.47.48.49<br/>例如：开奖结果特别号码是21 则 “2”头为中奖，其他头数都不中奖。',
	                '指特别号所属尾数的号码。<br/>"1"尾：01.11.21.31.41<br/>"2"尾：02.12.22.32.42<br/>"3"尾：03.13.23.33.43<br/>"4"尾：04.14.24.34.44<br/>"5"尾：05.15.25.35.45<br/><br/>"6"尾：06.16.26.36.46<br/>"7"尾：07.17.27.37.47<br/>"8"尾：08.18.28.38.48<br/>"9"尾：09.19.29.39.49<br/>"0"尾：10.20.30.40<br/>例如：开奖结果特别号码是21 则"1"尾为中奖，其他尾数都不中奖。',
	                '以指定出现正码的位置与号码大于或等于25为大，小于或等于24为小，开出49号为和。',
	                '以指定出现正码的位置与号码为单数或双数下注，开出49号为和。',
	                '以指定出现正码的位置与球色下注，开奖的球色与下注的颜色相同，视为中奖。',
	                '以指定出现正码的位置与号码个位数和十位数之和来决定大小，合数大于或等于7为大，小于或等于6为小，开出49号为和',
	                '以指定出现正码的位置与号码个位数和十位数之和为单数或双数来判断胜负，开出49号为和。',
	                '以指定出现正码的位置与号码尾数大小下注，若0尾~4尾为小、5尾~9尾为大。<br/>如01、32、44为正尾小；如05、18、19为正尾大，开出49号为和。'
	            ]
	        },
			/*
	        'tbhc-gg': {
	            'ruleName': ['色波', '半波', '半半波', '过关'],
	            'ruleBox': [
	                '以特别号的球色下注，开奖的球色与下注的颜色相同，视为中奖，球色号码分布如下：<br/><span style="color: #DE0000">01 02 07 08 12 13 19 23 24 29 30 34 35 40 45 46</span><br/><span style="color: #00A600">05 06 11 16 17 21 22 27 28 32 33 38 39 43 44 49</span><br/><span style="color: #00f">03 04 09 10 14 15 20 25 26 31 36 37 41 42 47 48</span>',
	                '以特码色波和特单、特双、特大、特小为一个投注组合，当期特码开出符合投注组合，即视为中奖； 若当期特码开出49号，则视为和局；其余情形视为不中奖。',
	                '以特码色波和特码单双及特码大小等三种游戏为一个投注组合，当期特码开出符合投注组合，即视为中奖； 若当期特码开出49号，则视为和局；其余情形视为不中奖。 ',
	                '游戏规则同正码1-6盘势，但须同时投注多项结果，串联成投注组合，只要单期所开出之开奖结果符合您所选定之串联结果，即视为中奖。若其中一项结果不中，则视为不中奖；若其中一项结果为和，其余结果都中奖的情形，也视为中奖；和的项目赔率以一计算。 '
	            ]
	        },
			*/
			'sb':{
				'ruleName': ['色波', '半波', '半半波'],
	            'ruleBox': [
	                '以特别号的球色下注，开奖的球色与下注的颜色相同，视为中奖，球色号码分布如下：<br/><span style="color: #DE0000">01 02 07 08 12 13 19 23 24 29 30 34 35 40 45 46</span><br/><span style="color: #00A600">05 06 11 16 17 21 22 27 28 32 33 38 39 43 44 49</span><br/><span style="color: #00f">03 04 09 10 14 15 20 25 26 31 36 37 41 42 47 48</span>',
	                '以特码色波和特单、特双、特大、特小为一个投注组合，当期特码开出符合投注组合，即视为中奖； 若当期特码开出49号，则视为和局；其余情形视为不中奖。',
	                '以特码色波和特码单双及特码大小等三种游戏为一个投注组合，当期特码开出符合投注组合，即视为中奖； 若当期特码开出49号，则视为和局；其余情形视为不中奖。 ',
	                
	            ]
			},
			'gg':{
				'ruleName':["过关"],
				'ruleBox':[
					 '游戏规则同正码1-6盘势，但须同时投注多项结果，串联成投注组合，只要单期所开出之开奖结果符合您所选定之串联结果，即视为中奖。若其中一项结果不中，则视为不中奖；若其中一项结果为和，其余结果都中奖的情形，也视为中奖；和的项目赔率以一计算。 '
	            	
				]
			},
	        'zm-zx-tbhhx': {
	            'ruleName': ['正码单码', '总和大小', '总和单双', '正肖', '合肖'],
	            'ruleBox': [
	                '假如投注号码为开奖号码之正码，视为中奖，其余情形视为不中奖。',
	                '所有7个开奖号码的分数总和大于或等于175为总分大或称总大。如开奖号码为02、08、17、28、39、46、25，分数总和是165，则总分小。',
	                '所有7个开奖号码的分数总和是单数叫总分单或称总单，如分数总和是115、183；分数总和是双数叫总分双或称总双，如分数总和是108、162。',
	                '只要当期6个正码，只要有1个落在下注生肖所属号码范围内，则视为中奖。如超过1个正码落在下注生肖所属号码范围内 ，派彩将倍增！如：下注＄100. 正肖猪倍率1.8<br/>6个正码开出01，派彩为＄80.<br/>6个正码开出01，13，派彩为＄160.<br/>6个正码开出01，13，25，派彩为＄240.<br/>6个正码开出01，13，25，37，派彩为＄320.<br/>6个正码开出01，13，25，37，49，派彩为＄400. <span style="color: #DE0000">（请注意:49亦算输赢，不为和）</span> ',
	                '挑选1~11生肖(排列如同生肖)为一个组合，并选择开奖号码的特码是否在此组合内，若选择是(中)且开奖 号码的特码亦在此组合内，即视为中奖；若选择否(不中)且开奖号码的特码亦不在此组合内，即视为中奖；若当期特码开出49号，则所有组合皆视为和局。'
	            ]
	        },
	        'ptyx': {
	            'ruleName': ['一肖', '总肖', '总肖单双', '正特尾数', '七色波'],
	            'ruleBox': [
	                '只要当期号码(所有正码与最后开出的特码)，坐落于投注的生肖所属号码内，则视为中奖，其余情形视为不中奖<span style="color: #DE0000">（请注意:49亦算输赢，不为和）</span> 。',
	                '只要当期号码(所有正码与最后开出的特码)开出的不同生肖总数，与所投注之预计开出之生肖总数符合(不用指定特定生肖)，则视为中奖，其余情形视为不中奖。<br/>例如如果当期号码为19, 24, 12, 34, 40, 39, 特别号: 49 总计六个生肖，若选取总肖 [6] 则为中奖<span style="color: #DE0000">（请注意:49亦算输赢，不为和）</span> 。 ',
	                '只要当期号码(所有正码与最后开出的特码)开出的不同生肖总数若为单数则为单；若为双数则为双。<br/>例如如果当期号码为19, 24, 12, 34, 40, 39, 特别号: 49 总计六个生肖，若下双则为中奖。 ',
	                '只要当期号码(所有正码与最后开出的特码)，含有所属尾数的一个或多个号码，但派彩只派一次，即不论同尾数号码出现一个或多个号码都只派彩一次。<br/>例如：开奖结果正码是11、31、42、44、35、32特别号码是21 则"1"尾"2"尾"4"尾"5"尾都为中奖，其他尾数都不中奖<span style="color: #DE0000">（请注意:49亦算输赢，不为和）</span>。',
	                '以开出的7个色波，那种颜色最多为中奖。 开出的6个正码各以1个色波计，特别号以1.5个色波计。而以下3种结果视为和局。<br/>1. 6个正码开出3蓝3绿，而特别码是1.5红<br/>2. 6个正码开出3蓝3红，而特别码是1.5绿<br/>3. 6个正码开出3绿3红，而特别码是1.5蓝<br/>如果出现和局，所有投注红，绿，蓝七色波的金额将全数退回，会员也可投注和局。 '
	            ]
	        },
	        'lx-lw': {
	            'ruleName': ['连肖', '连尾'],
	            'ruleBox': [
	                '挑选2~6生肖(排列如同生肖)为一个组合，当期号码(所有正码与最后开出的特码)坐落于投注时所勾选之生肖组合所属号码内，所勾选之生肖皆至少有中一个号码，则视为中奖，其余情形视为不中奖<span style="color: #DE0000">（请注意:49亦算输赢，不为和）</span><br/>例如如果当期号码为19, 24, 12, 34, 40, 39, 特别号: 49 ，所勾选三个生肖(称为三肖碰)，若所有生肖的所属号码内至少一个出现于当期号码，则视为中奖。 ',
	                '挑选2~6尾数为一个组合，当期号码(所有正码与最后开出的特码)坐落于投注时所勾选之尾数组合所属号码内，所勾选之尾数皆至少有中一个号码，则视为中奖，其余情形视为不中奖<span style="color: #DE0000">（请注意:49亦算输赢，不为和）</span><br/>例如如果当期号码为19, 24, 12, 34, 40, 39, 特别号: 49 ，所勾选三个尾数(称为三尾碰)，若所有尾数的所属号码内至少一个出现于当期号码，则是为中奖。 '
	            ]
	        },
	        'lm': {
	            'ruleName': ['四全中', '三全中', '三中二', '二全中', '二中特', '特串'],
	            'ruleBox': [
	                '所投注的每四个号码为一组合，若四个号码都是开奖号码之正码，视为中奖，其余情形视为不中奖。如06、07、08、09四个都是开奖号码之正码，视为中奖，如三个正码加上一个特别号码视为不中奖 。',
	                '所投注的每三个号码为一组合，若三个号码都是开奖号码之正码，视为中奖，其余情形视为不中奖。如06、07、08三个都是开奖号码之正码，视为中奖，如两个正码加上一个特别号码视为不中奖 。 ',
	                '所投注的每三个号码为一组合，若其中二个是开奖号码中的正码，即为三中二，视为中奖； 若三个都是开奖号码中的正码，即为三中二之中三，其余情形视为不中奖，如06、07、08 为一组合，开奖号码中有06、07两个正码，没有08，即为三中二，按三中二赔付；如开奖号码中有06、07、08三个正码，即为三中二之中三，按中三赔付；如出现一个或没有，视为不中奖 。',
	                '所投注的每二个号码为一组合，二个号码都是开奖号码之正码，视为中奖，其余情形视为不中奖（含一个正码加一个特别号码之情形）。 ',
	                '所投注的每二个号码为一组合，二个号码都是开奖号码之正码，叫二中特之中二；若其中一 个是正码，一个是特别号码，叫二中特之中特其余情形视为不中奖 。 ',
	                '所投注的每二个号码为一组合，其中一个是正码，一个是特别号码，视为中奖，其余情形视为不中奖（含二个号码都是正码之情形）。'
	            ]
	        },
	        'zxbz': {
	            'ruleName': ['自选不中'],
	            'ruleBox': [
	                '挑选5~12个号码为一个组合，当期号码(所有正码与最后开出的特码)皆没有坐落于投注时所挑选之号码组合内，则视为中奖，若是有任何一个当期号码开在所挑选的号码组合情形视为不中奖。<br/>例如当期号码为19,24,17,34,40,39,特别号:49，所挑选5个号码(称为五不中)，若所挑选的号码内皆没有坐落于当期号码，则为中奖。'
	            ]
	        }
	    },
	    'k3': {
	        'k3Rule': {
	            'ruleName': ['大小', '单选', '二不同号', '二同号单选', '二同号复选', '三连号通选', '三不同号', '三同号单选', '三同号通选', '和值', '单双', '有无对'],
	            'ruleBox': [
	                '是根据三个号码的和来判断，(4-10)为小，(11-17)为大，豹子通吃',
	                '从1-6这几个数中选择一个，一骰1中1、两骰1中2、三骰1中3',
	                '是指对三个号码中两个指定的不同号码和一个任意号码进行投注。',
	                '是指对三个号码中两个指定的相同号码和一个指定的不同号码进行投注。',
	                '是指对三个号码中两个指定的相同号码和一个任意号码进行投注。',
	                '是指对所有三个相连的号码（仅限：123、234、345、456）进行投注。',
	                '是指对三个各不相同的号码进行投注。',
	                '是指从所有相同的三个号码（111、222、…、666）中任意选择一组号码进行投注',
	                '是指对所有相同的三个号码（111、222、…、666）进行投注',
	                '是指对三个号码的和值进行投注包括“和值4”至“和值17”投注,豹子也算',
	                '是根据三个号码的和来判断，如果和是单就是单，双就是双，豹子通吃',
	                '如果出现2个或3个相同的号码就是有对，反之就是无对'
	            ]
	        }
	    }
	};
