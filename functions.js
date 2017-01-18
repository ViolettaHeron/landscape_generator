var time = {
	"day" : {
		"label" : "day",
		"h" : [180,200],
		"s" : [30,80],
		"l" : [50,80],
		"stars" : 0,
		"moon" : false,
		"clouds" : {
			"max" : 5,
			"color" : {
				"h" : [180,200],
				"s" : [50,100],
				"l" : [90,100],
				"a" : 0.8
			},
		}
	},
	"night" : {
		"label" : "night",
		"h" : [220,286],
		"s" : [60,100],
		"l" : [5,12],
		"stars" : 100,
		"moon" : true,
		"clouds" : {
			"max" : 0,"color" : {
				"h" : [0,0],
				"s" : [0,0],
				"l" : [0,0],
				"a" : 0
			},
		}
	}
}
var period = ""; 


function init(){
	putSize('sky_color_night',false,false);
	putSize('sky_color_day',false,false);
	putSize('stars1',true,true);
	putSize('stars2',true,true);
	putSize('moon',false,false);
	putSize('sun',false,false);
	putSize('clouds',false,false);

	sky(time['day'])
	sky(time['night'])
	
	for(var i=1;i<=2;i++){
		drawStars("stars" + i,100*i*i);
	}
}

/**
* @param string name of the canvas
* @param square boolean : 	true : canvas is going to be square
* 							false : canvas is ging to fit the screen
* @param overflow boolean : true : if canvas is square, it is going to have the size of the max betweeb height and width
*  							false : if canvas is square, it is going to have the size of the min between height and width
*/
function putSize(name,square,overflow){
	var can = document.getElementById(name);
	if(square){
		var dim = 0;
		var max = Math.max(window.innerHeight,window.innerWidth);
		var min = Math.min(window.innerHeight,window.innerWidth)
		if(overflow){
			dim = Math.sqrt(max*max+min*min)
			//positionner le canvas de façon à superposer les centres
		}else{
			dim = min
		}
		can.parentNode.style.top = -((dim/2)-(window.innerHeight/2))
		can.parentNode.style.left = -((dim/2)-(window.innerWidth/2))
		can.height = dim;
		can.width = dim;
	}else{
		can.height = window.innerHeight;
		can.width = window.innerWidth;
	}
}


function sky(period){
	var can = document.getElementById('sky_color_' + period.label);
	var ctx = can.getContext('2d');

	//sky background color
	var h = Math.floor((period.h[1]-period.h[0])*Math.random()+period.h[0])
	var s = Math.floor((period.s[1]-period.s[0])*Math.random()+period.s[0])
	var l = Math.floor((period.l[1]-period.l[0])*Math.random()+period.l[0])

	var g = ctx.createLinearGradient(0,0,0,can.height);
	g.addColorStop(0,"hsl("+h+","+s+"%,"+l+"%)");
	g.addColorStop(1,"hsl("+h+","+s+"%,"+(l+5)+"%)");
	ctx.fillStyle = g;
	ctx.fillRect(0,0,can.width,can.height);
}

function drawStars(canvasName,ratio){
	var can = document.getElementById(canvasName);
	var ctx = can.getContext('2d');

	var maxHeight = can.height;
	var maxWidth = can.width;

	for(var i = 0;i<ratio*10;i++){
		ctx.fillStyle = "hsl("+Math.floor(Math.random()*45+173)+", "+Math.floor(Math.random()*10+56)+"%, "+Math.floor(Math.random()*20+80)+"%)";
		var l=Math.random()<0.999?Math.random()*1.5+0.5:Math.random()*3+1;
		ctx.fillRect(Math.random()*maxWidth,Math.pow(Math.random(), 1.5)*maxHeight,l,l);
	}
}



function drawClouds(clouds){

	var h = Math.floor((clouds.color.h[1]-clouds.color.h[0])*Math.random()+clouds.color.h[0])
	var s = Math.floor((clouds.color.s[1]-clouds.color.s[0])*Math.random()+clouds.color.s[0])
	var l = Math.floor((clouds.color.l[1]-clouds.color.l[0])*Math.random()+clouds.color.l[0])


	ctx.fillStyle = "hsla("+h+","+s+"%,"+l+"%,"+clouds.color.a+")";
	for(var n=0;n<Math.random()*clouds.max;n++){

		var x=Math.random()*can.width
		var y=Math.random()*(can.height/2)

		for(var i=0;i<Math.random()*40+20;i++){
			r = Math.random()*30+10
			ctx.beginPath();
			ctx.arc(x, y, r, 0, 2 * Math.PI, false);
			ctx.fill()
			ctx.closePath();
			x = Math.random()>0.5? x+Math.random()*25: x-Math.random()*12 
			y = Math.random()<0.5? y+Math.random()*5: y-Math.random()*5
		}
	}
}

function drawMoon(){
	var x=(Math.random()*Math.abs(can.width-120))+60;
	var y=Math.random()*(can.height/2.5)+30;
	var r = Math.random()*15+10;
	var h = Math.random()*6+4

	var a = 0.7;
	for(var i=0;i<h;i++){
		//ctx.fillStyle = "hsla("+h+","+s+"%,"+l+"%,"+clouds.color.a+")";
		ctx.fillStyle = "hsla(59,100%,"+(Math.random()*10+85)+"%,"+a+")";
		ctx.beginPath();
		ctx.arc(x, y, r, 0, 2 * Math.PI, false);
		ctx.fill()
		ctx.closePath();
		r+=4*(2+i);
		a-=0.1;
	}
}