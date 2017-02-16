var drawClock = function(){
	var date = new Date();
	var hour = date.getHours();
	hour = hour>12? hour-12:hour;
	var minute = date.getMinutes();
	var second = date.getSeconds();
	var miliSecond = date.getMilliseconds();
	hour += minute/60;
	minute += second/60;
	second += miliSecond/1000;
	hourText = Math.floor(hour)<10? "0" + Math.floor(hour) : Math.floor(hour);
	minuteText = Math.floor(minute)<10? "0" + Math.floor(minute) : Math.floor(minute);
	secondText = Math.floor(second)<10? "0" + Math.floor(second) : Math.floor(second);
	
	var canvas = document.getElementById("canvas");
	var c = canvas.getContext("2d");
	var img = new Image();
	img.src = "img/timg(21).jpg";
	var drawCircle = function(){/*画圆盘*/
		c.save();
		c.beginPath();
		c.strokeStyle = "black";
		c.fillStyle = "aquamarine";
		c.lineWidth = 10;
		c.arc(250,250,200,0*Math.PI,2*Math.PI,false);
//		c.fill();
		/*因为fill的存在，每一次settimeinterval之后刷出的表针才能被覆盖掉，注释掉就糟了*/
		
		c.clip();
//		img.onload = function(){
		c.drawImage(img,45,45);
//		}

		c.stroke();
		c.closePath();
		c.restore();
	}
	var drawHourDegree = function(){/*画时刻度*/
		c.save();
		c.translate(250,250);
		c.strokeStyle = "brown";
		c.lineWidth = 7;
		var pi = Math.PI;
		for (var i = 0;i<12;i++) {
			c.rotate(pi/6);
			c.beginPath();
			c.moveTo(0,-195);
			c.lineTo(0,-175);
			c.closePath();
			c.stroke();
		}
		c.restore();
	}
	var drawMinuteDegree = function(){/*画分刻度*/
		c.save();
		c.translate(250,250);
		c.strokeStyle = "brown";
		c.lineWidth = 5;
		var jumpHour = true;
		var pi = Math.PI;
		for (var i = 1;i<=60;i++) {/*小小的坑，万一分刻度比时刻度长，就尴尬了 所以改良下*/
			if (i%5 == 0) {
				c.rotate(pi/30);
				c.beginPath();
				c.moveTo(0,-195);
				c.lineTo(0,-185);
				c.closePath();
			} else{
				c.rotate(pi/30);
				c.beginPath();
				c.moveTo(0,-195);
				c.lineTo(0,-185);
				c.closePath();
				c.stroke();
			}
		}
		c.restore();
	}
	var hands = function(){/*画时针分针秒针*/
		//时针
		c.save();
		c.lineWidth = 7;
		c.strokeStyle = "lightblue";
		c.translate(250,250);
		c.rotate(hour*30*Math.PI/180);
		c.beginPath();
		c.moveTo(0,-130);
		c.lineTo(0,10);
		c.closePath();
		c.stroke();
		c.restore();
		//分针
		c.save();
		c.lineWidth = 5;
		c.strokeStyle = "yellow";
		c.translate(250,250);
		c.rotate(minute*6*Math.PI/180);
		c.beginPath();
		c.moveTo(0,-150);
		c.lineTo(0,10);
		c.closePath();
		c.stroke();
		c.restore();
		//秒针
		c.save();
		c.lineWidth = 3;
		c.strokeStyle = "red";
		c.translate(250,250);
		c.rotate(second*6*Math.PI/180);//秒针一秒走6度
		c.beginPath();
		c.moveTo(0,-170);
		c.lineTo(0,10);
		c.closePath();
		c.stroke();
		//秒针上的小圆
		c.beginPath();
		c.arc(0,0,7,0*Math.PI,2*Math.PI,false);
		c.strokeStyle = "#FF0000"
		c.fillStyle = "#ffff00";
		c.closePath();
		c.fill();
		c.stroke();

		c.beginPath();
		c.arc(0,-140,5,0*Math.PI,2*Math.PI,false);
		c.strokeStyle = "#FF0000"
		c.fillStyle = "#ffff00";
		c.closePath();
//		c.fill();
		c.stroke();

		c.restore();
		

	}
	var drawText = function(){/*写文字*/
			
		c.save();
		c.fillStyle = "white";
		c.strokeStyle = "black";
		c.lineWidth = 5;
		c.font = "30px 微软雅黑";
//		c.strokeText(hourText + ":" + minuteText + ":" + secondText,193,403);
		c.fillText(hourText + ":" + minuteText + ":" + secondText,190,400);
		c.restore();
	}
	
	drawCircle();
	drawHourDegree();
	drawMinuteDegree();
	drawText();
	hands();
}

drawClock();
setInterval(drawClock,20);