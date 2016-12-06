var can = document.getElementById('c');
var ctx = can.getContext('2d');

var time = {
	"day" : {
		"h" : [180,200],
		"s" : [50,100],
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
		"h" : [220,286],
		"s" : [62,100],
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

/*
générator
options

dl paysage

sol
nuages *
montagnes

rain

*/

function init(){
	putSize();
	var period = time[['day','night'][Math.floor(Math.random()*2)]]


	sky(period)
}

function putSize(){
	can.height = window.innerHeight;
	can.width = window.innerWidth;
}

function sky(period){
	var h = Math.floor((period.h[1]-period.h[0])*Math.random()+period.h[0])
	var s = Math.floor((period.s[1]-period.s[0])*Math.random()+period.s[0])
	var l = Math.floor((period.l[1]-period.l[0])*Math.random()+period.l[0])

	var g = ctx.createLinearGradient(0,0,0,can.height);
	g.addColorStop(0,"hsl("+h+","+s+"%,"+l+"%)");
	g.addColorStop(1,"hsl("+h+","+s+"%,"+(l+(Math.random()*10)+5)+"%)");
	ctx.fillStyle = g;
	ctx.fillRect(0,0,can.width,can.height)

	drawStars(period.stars)
	drawClouds(period.clouds)
	if(period.moon){
		drawMoon();
	}
}

function drawStars(ratio){	
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
	var x=(Math.random()*can.width-120)+60;
	var y=Math.random()*(can.height/2.5);
	var r = Math.random()*30+40;

	var a = 0.2;
	for(var i=0;i<3;i++){
		//ctx.fillStyle = "hsla("+h+","+s+"%,"+l+"%,"+clouds.color.a+")";
		ctx.fillStyle = "hsla(59,100%,"+(Math.random()*10+85)+"%,"+a+")";
		ctx.beginPath();
		ctx.arc(x, y, r, 0, 2 * Math.PI, false);
		ctx.fill()
		ctx.closePath();
		r-=5*(3-i);
		a+=0.4;
	}
}