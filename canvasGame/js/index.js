var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");

//1 游戏的初始化函数,生成大球 等待球 转动的小球
//2 小球转起来,是一直执行的动画
//3 在点击鼠标时,转动求增加一个 等待球减少一个 同时判定圆心距(点击执行动画和判定)
var buildGame = function(){
	var initGame = function(){
		var j = 0;
		var drawRollingBalls = function(){

//			c.save();

			for (var i = 0;i<3;i++) {
				c.clearRect(0,0,1000,1000);
				c.save();
				c.translate(250,150);
				c.rotate( (j++)*Math.PI/180 );
				c.rotate( 360/3*1*(Math.PI/180) );
				c.rotate( 360/3*2*(Math.PI/180) );
				c.rotate( 360/3*3*(Math.PI/180) );
				c.beginPath();
				c.moveTo(0,0);
				c.lineTo(120,0);
				c.strokeStyle = "black";
				c.stroke();
				c.closePath();
				c.arc(120,0,10,0,2*Math.PI,false);
				c.fill();
				c.restore();
			}

		}
		var drawCircle = function(){
			c.beginPath();
			c.arc(0,0,30,0,2*Math.PI,false);
			c.fillStyle = "black";
			c.fill();
			c.closePath();
		}
//		setInterval(drawRollingBalls,500);
		var roll = function(){
			drawRollingBalls();
			requestAnimationFrame(roll);
		}
		requestAnimationFrame(roll);
		drawCircle();
		
	}
	initGame();
}
buildGame();