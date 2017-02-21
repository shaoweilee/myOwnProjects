var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");

//1 游戏的初始化函数,生成大球 等待球 转动的小球
//2 小球转起来,是一直执行的动画
//3 在点击鼠标时,转动求增加一个 等待球减少一个 同时判定圆心距(点击执行动画和判定)
var centerX = 300;
var centerY = 200;
var centerRadius = 50;

var level = 0;
var ballRadius = 10;
var levelArray = [
	{"initNum":3, "waitNum":5, "speed":200},
	{"initNum":4, "waitNum":8, "speed":180},
	{"initNum":5, "waitNum":5, "speed":160},
	{"initNum":3, "waitNum":5, "speed":140},
	{"initNum":4, "waitNum":8, "speed":120},
	{"initNum":5, "waitNum":5, "speed":100},
	{"initNum":6, "waitNum":7, "speed":90},
];
var balls = [];
var balllen = levelArray[level].initNum;
var lineLen = 130;
for (var i = 0;i<balllen;i++) {
	var angle = (360/balllen)*(i+1);
	balls.push({"angle":angle,"numStr":""});
}

var waitballs = [];
var waitOffset = 260;
var waitballlen = levelArray[level].waitNum;
for (var i=waitballlen;i>0;i--) {
	waitballs.push({"angle":"","numStr":i});
}

var waitx = centerX;
var waity = lineLen+waitOffset;

function big(){
//	c.save();
	c.beginPath();
	c.arc(centerX,centerY,centerRadius,0,Math.PI*2,true);
	c.closePath();
	c.fillStyle = "black";
	c.fill();
//	c.save();
	
	if (level == levelArray.length) {
		level = levelArray.length - 1;
	}
	var txt = (level + 1) + "";
	c.textAlign = "center";
	c.textBaseline = "middle";
	c.font = "bold 60px sans-serif";
	c.strokeStyle = "#eed5b7";
	c.fillStyle = "#eed5b7";
	c.fillText(txt,centerX,centerY);
//	c.strokeText(txt,centerX-2,centerY+5);
//	c.restore();
}
function drawball(deg){
	balls.forEach(function(o){
		c.save();
		c.globalCompositeOperation = "destination-over";
		o.angle = o.angle+deg;
//		if(o.angle>=360){
//			o.angle = 0;
//		}
		c.moveTo(centerX,centerY);
		var rad = 2*Math.PI * o.angle/360;
		var x = centerX+lineLen*Math.cos(rad);
		var y = centerY+lineLen*Math.sin(rad);
		c.strokeStyle = "black";
		c.lineTo(x,y);
		c.stroke();
		c.restore();
		c.beginPath();
		c.arc(x,y,ballRadius,0,2*Math.PI,true);
		c.closePath();
		c.fillStyle = "black";c.fill();
		if (o.numStr!="") {
			c.textAlign = "center";
			c.textBaseline = "middle";
			c.font = "15px sans-serif";
			c.strokeStyle = "#fff";
			c.fillStyle = "#fff";
			c.fillText(o.numStr,x,y);
			c.strokeText(o.numStr,x,y);
		}
	});
}

function drawWait(){
	c.clearRect(0,345,900,400);
	waitballs.forEach(function(o){
		c.moveTo(waitx,waity);
		c.beginPath();
		c.arc(waitx,waity,ballRadius,0,2*Math.PI,true);
		c.closePath();
		c.fillStyle = "black";
		c.fill();
		
		c.textAlign = "center";
		c.textBaseline = "middle";
		c.font = "15px sans-serif";
		c.strokeStyle = "#fff";
		c.fillStyle = "#fff";
		c.fillText(o.numStr,waitx,waity);
		c.strokeText(o.numStr,waitx,waity);
		waity+=3*ballRadius;
	});
}
function init(deg){
	c.clearRect(0,0,900,800);
	big();
	drawball(deg);
	drawWait();
}
init(0);

function buildFrame(){//想想怎么用requestAnimationFrame去调整频率
	c.clearRect(0,0,900,345);
	big();
	drawball(1);
//	setTimeout(function(){
		requestAnimationFrame(buildFrame);
//	},levelArray[level].speed);
}
requestAnimationFrame(buildFrame);

var state;
document.onclick = function(){
	if(waitballs.length==0)return;
	waity = lineLen+200;
//	drawWait();
	
	var ball = waitballs.shift();
	ball.angle = 90;
	var faild = true;
	
	balls.forEach(function(o,index){
		if(!faild)return;
		if(Math.abs(o.angle - ball.angle)/2 < 360*ballRadius/(lineLen*Math.PI)){
			state = 0;
			faild = false;
		}else if(index === balls.length - 1 && waitballs.length === 0){
			faild = false;
			state = 1;
		}
	});
	balls.push(ball);
	waity = lineLen + waitOffset;
	drawWait();
	drawball(0);
	if(state ==0){
		alert("闯关失败");
		window.location.href = "index.html"+level;
	}else if(state ==1){
		alert("闯关成功");
		level++;
		window.location.href = "index.html"+level;
	}
}
