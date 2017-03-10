window.onload = function(){
	var cards = document.getElementById("cardPeashooter");
	var background = document.getElementById("background");
	cards.onclick = function(){
		//创建一个豌豆射手
		var peaShooter = document.createElement("img");
		peaShooter.src = "/img/Plants/Peashooter/Peashooter.gif";
		peaShooter.style.position = "absolute";
		peaShooter.style.zIndex = 999;
		peaShooter.style.left = 0 + "px";
		peaShooter.style.top = 0 + "px";
		background.appendChild(peaShooter);
		
		//创建透明的豌豆射手
		var peaShooter_trans = document.createElement("img");
		peaShooter_trans.src = "/img/Plants/Peashooter/Peashooter.gif";
		peaShooter_trans.style.position = "absolute";
		peaShooter_trans.style.zIndex = 999;
		peaShooter_trans.style.left = 0 + "px";
		peaShooter_trans.style.top = 0 + "px";
		peaShooter_trans.style.display = "none";
		background.appendChild(peaShooter_trans);
		
		//选项卡变灰
		
	}
}
