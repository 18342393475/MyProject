// JavaScript Document
//生日对象
function dateSelect( yearID, monID, dayID, yearNum1, yearNum2){
	
	this.mydate = new Date();	
	var currYear = this.mydate.getFullYear();
	this.yearList =document.getElementById( yearID );
	this.monList = document.getElementById( monID );
	this.dayList = document.getElementById( dayID );
	
	this.getDayList = function (){
		var dayNum = new Date(this.yearList.value,this.monList.value,0).getDate();
		this.dayList.options.length = dayNum;
		for( var i=0; i<dayNum; i++ ){
			var day = (i<9)?('0'+(i+1)):(i+1);
			this.dayList.options[i] = new Option( day, day);
		}
	}
	
	//年
	for( var i=0; i<=yearNum1; i++ ) this.yearList.options[i] = new Option( currYear-i, currYear-i);
	for( var i=0; i<yearNum2; i++ ) this.yearList.options[i] = new Option( currYear+i, currYear+i);
	
	//月
	for( var i=0; i<12; i++ ){
		var mon = (i<9)?('0'+(i+1)):(i+1);
		this.monList.options[i] = new Option( mon, mon);
	}
	this.getDayList();
	
	
}
