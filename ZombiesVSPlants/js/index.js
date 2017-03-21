window.onload = function(){
	var background = document.getElementById("background");
	background.style.backgroundImage = "url(../img/interface/background1unsodded.jpg)";
	var x = 0;
	var timer = setInterval(function(){
		x -=20;
		background.style.backgroundPosition = x + "px 0px";
		if (x<=-500) {
			clearInterval(timer);
			var zombiePlaceholder = document.getElementById("zombiePlaceholder");
			zombiePlaceholder.style.left = (900 - 335)+"px";
			for (var i=0;i<5;i++) {
				var zombie = document.createElement("div");
				zombie.style.position = "absolute";
				zombie.style.left = Math.random() * (zombiePlaceholder.offsetWidth-166) + "px";
				zombie.style.top = Math.random() * (zombiePlaceholder.offsetHeight-144) + "px";
				zombie.zIndex = 1;
				zombie.innerHTML = "<img src='../img/interface/plantshadow32.png' style='position:absolute;left:72px;top:122px'/><img style='position:absolute;left:10px;top:0px' src='../img/Zombies/Zombie/1.gif' />";
				zombiePlaceholder.appendChild(zombie);
			}
			setTimeout(function(){
				zombiePlaceholder.style.left = "1065px";
				background.style.backgroundPosition = "-155px 0px";
				//铺草坪
				var sod = document.createElement("div");
				sod.style.position = "absolute";
				sod.style.height = "117px";
				sod.style.width = "70px";
				sod.style.top = "280px";
				sod.style.left = "92px";
				sod.style.zIndex = 1;
				sod.style.background = "url(../img/interface/sod1row.png) no-repeat 0px 0px";
				sod.className = "sod";
				background.appendChild(sod);
				
				var sodScroll = document.createElement("img");
				sodScroll.src = "img/interface/SodRoll.png";
				sodScroll.style.position = "absolute";
				sodScroll.style.height = "141px";
				sodScroll.style.width = "68px";
				sodScroll.style.top = "250px";
				sodScroll.style.left = "102px";
				sodScroll.style.zIndex = 1;
				background.appendChild(sodScroll);
				
				var sodScrollCover = document.createElement("img");
				sodScrollCover.src = "../img/interface/SodRollCap.png";
				sodScrollCover.style.position = "absolute";
				sodScrollCover.style.height = "71px";
				sodScrollCover.style.width = "73px";
				sodScrollCover.style.top = "345px"
				sodScrollCover.style.left = "96px";
				sodScrollCover.style.zIndex = 1;
				background.appendChild(sodScrollCover);
				
				var w = 20,l = 1;
				var _timer = setInterval(function(){
					sod.style.width = sod.offsetWidth + w + "px";
					sodScroll.style.left = ++sodScroll.offsetLeft + w + "px";
					sodScrollCover.style.left = ++sodScrollCover.offsetLeft + w + "px";
					
					sodScroll.style.width = --sodScroll.offsetWidth + "px";
					sodScrollCover.style.width = --sodScrollCover.offsetWidth + "px";
					sodScrollCover.style.height = --sodScrollCover.offsetHeight + "px";
					sodScrollCover.style.top = ++sodScrollCover.offsetTop + "px";
					
					if (sod.offsetWidth>= 755) {
						clearInterval(_timer);
						background.removeChild(sodScroll);
						background.removeChild(sodScrollCover);
					}
					
				},30);
			},2000);

				
		}
	},30);
	//阳光部分
	function sunDrop(){
		var gameWindow = document.getElementById("gameWindow");
		var sun = document.createElement("img");
		var autoPick = true;
		sun.src = "../img/interface/Sun.gif";
		sun.style.position = "absolute";
		sun.style.cursor = "pointer";
		sun.style.zIndex = 25;
		sun.style.opacity = 0.8;
		sun.style.height = "78px";
		sun.style.width = "78px";
		sun.style.left = Math.random()*(gameWindow.offsetWidth-sun.offsetWidth) + "px";
		var H = Math.random()*(gameWindow.offsetHeight - sun.offsetHeight);
		var __timer = setInterval(function(){
			sun.style.top = ++sun.offsetTop + "px";
			if (sun.offsetTop >= H) {
				clearInterval(__timer);
				setTimeout(function(){
					if (autoPick == true) {
						sun.onclick();
					}else{
						gameWindow.removeChild(sun);
					}
				},3000);
			}
		},30);
		gameWindow.appendChild(sun);
		sun.onclick = function(){
			if (__timer != null) {
				clearInterval(__timer);
			}
			var x = sun.offsetLeft - 80 + sun.offsetWidth/2;
			var y = sun.offsetTop -20 + sun.offsetHeight/2;
			var xy = Math.sqrt(x*x + y*y);
			var speedX = x/xy;
			var speedY = y/xy;
			var speed = 20;
			var sunTimer = setInterval(function(){
				sun.style.left = sun.offsetLeft - speed*speedX + "px";
				sun.style.top = sun.offsetTop - speed*speedY + "px";
				if (sun.offsetLeft <= 80 || sun.offsetTop <= -20) {
					clearInterval(sunTimer);
					sunTimer = null;
					sun.style.left = "80px";
					sun.style.top = "-20px";
					setTimeout(function(){
						gameWindow.removeChild(sun);
						var sunNumber = document.getElementById("sunNumber");
						var num = parseInt(sunNumber.innerHTML);
						num += 25;
						sunNumber.innerHTML = num;
					},500);
				}
			},30);
		}
	}
	setInterval(sunDrop,5000);
	
	//创建植物的实验性方法 卧槽成功了
	function Plant(firePermission){
//	var plantsHolder = document.getElementById("plantsHolder");
	this.firePermission = false || firePermission;
	this.plants = this.init();
	this.blood = 4;
	}
	Plant.prototype.doplant = function(left,top){}

	Plant.prototype.init = function(){
		var that = this;
		var cards = document.getElementById("cardPeashooter");//获取植物卡片
		cards.onclick = function(){//点植物卡片创建植物与透明植物
			var plantsHolder = document.getElementById("plantsHolder");
			var plant = document.createElement("img");//
			var plant_trans = document.createElement("img");
			plant.src = "../img/Plants/Peashooter/Peashooter.gif";
			plant.style.position = "absolute";
			plant.style.zIndex = 999;
			plant.style.left = 0 + "px";
			plant.style.top = 0 + "px";
			
			plant_trans.src = "../img/Plants/Peashooter/Peashooter.gif";
			plant_trans.style.position = "absolute";
			plant_trans.style.zIndex = 998;
			plant_trans.style.left = 0 + "px";
			plant_trans.style.top = 0 + "px";
			plant_trans.style.opacity = 0.8;
			plant_trans.style.display = "none";
			plantsHolder.appendChild(plant);//植物和透明植物附着在父节点上
			plantsHolder.appendChild(plant_trans);
			
			var imgs = cards.getElementsByTagName("img");
			imgs[1].style.visibility = "hidden";
			document.onmousemove = function(ev){//检测鼠标移动确定植物的位置
					var e = ev || window.event;
					plant.style.left = e.clientX - plant.offsetWidth/2 + "px";
					plant.style.top = e.clientY - plant.offsetHeight/2 + "px";
					if (e.clientY < 280 || e.clientY > (280 + 117) ) {//草卷的top与height
						plant.onclick = function(){
							plantsHolder.removeChild(plant);
							plantsHolder.removeChild(plant_trans);
							imgs[1].style.visibility = "visible";
						};
						plant.oncontextmenu = function(){
							plantsHolder.removeChild(plant);
							plantsHolder.removeChild(plant_trans);
							imgs[1].style.visibility = "visible";
						};
					}else{
						plant_trans.style.display = "block";
						plant_trans.style.top = 280 + 117/2 - plant_trans.offsetHeight/2-20 + "px";
						
						var oneWidth = 770/9;
						if (e.clientX < 92 + oneWidth) {
							plant_trans.style.left = 92 + oneWidth/2 - plant_trans.offsetWidth/2 + "px";
						}else if (e.clientX > 92 + 8.5*oneWidth) {
							plant_trans.style.left = 92+8.5*oneWidth - plant_trans.offsetWidth/2 + "px";
						}else{
							for (var i=1;i<8;i++) {
								if (e.clientX > 92 + i*oneWidth && e.clientX < 92 + (i+1)*oneWidth) {
									plant_trans.style.left = 92 + oneWidth*(i+1) - oneWidth/2 - plant_trans.offsetWidth/2 + "px";
								}
							}
						}
						//种植植物
						plant.onclick = function(){
							plant.style.left = plant_trans.offsetLeft + "px";
							plant.style.top = plant_trans.offsetTop + "px";
							document.onmousemove = null;
							plantsHolder.removeChild(plant_trans);
							imgs[1].style.visibility = "visible";
							plant.onclick = null;
							plant.oncontextmenu = null;
						}
					}
				}
		}
		return plant;
	}
Plant.prototype.createBullets = function(){
	if (this.plants != undefined) {
		var bullets = document.createElement("img");
		bullets.src = "../img/Plants/PB00.gif";
		bullets.style.position = "absolute";
		bullets.style.left = this.plants.offsetLeft + 30 + "px";
		bullets.style.top = this.plants.offsetTop - 3 + "px";
		bullets.style.zIndex = 998;
		plantsHolder.appendChild(bullets);
		return bullets;
	}
}
	Plant.prototype.shoot = function(){
		var that = this;
		this.shooterTimer = setInterval(function(){
				var bullets = that.createBullets();
				setInterval(function(){
					bullets.style.left = bullets.offsetLeft + 11 + "px";
					if (bullets.offsetLeft >= 1000) {
					plantsHolder.removeChild(that.bullets);
					}
				},80);
		},2000);
	}
	
	Plant.prototype.stopShoot = function(){
		clearInterval(this.shooterTimer);
		this.shooterTimer = null;
	}
	Plant.prototype.die = function(){
		this.stopShoot();
		plantsHolder.removeChild(this.plants);
	}
	//创建僵尸的方法
	function Zombie(){
		this.liveZombieholder = document.getElementById("liveZombie");
		this.zombie = this.init();
		this.blood = 10;
		
	}
//	Zombie.prototype.init = function(){
//		var zombieDiv = document.createElement("div");
//		zombieDiv.innerHTML = "<img src='../img/interface/plantshadow32.png' style='position:absolute;left:72px;top:122px;' /><img src='../img/Zombies/Zombie/Zombie.gif' />";
//		this.liveZombieholder.appendChild(zombieDiv);
//		return zombieDiv;
//		
//	}
	Zombie.prototype.init = function(){
		this.liveZombieholder.innerHTML = "<img src='../img/interface/plantshadow32.png' style='position:absolute;left:72px;top:122px;' /><img src='../img/Zombies/Zombie/Zombie.gif' />";
		this.liveZombieholder.style.top = 226 + "px";
		return this.liveZombieholder;
		
	}
	Zombie.prototype.walk = function(){
		var that = this;
		this.walkTimer = setInterval(function(){
			that.zombie.style.left = (that.zombie.offsetLeft - 1) + "px";
//			if (that.zombie.offsetLeft <= -100) {
//				that.liveZombieholder.innerHTML = "";
//			}
			//删除不在画面内的僵尸
		},80);
	}
	Zombie.prototype.walkWithoutHead = function(){
		var imgs = this.zombie.getElementsByTagName("img");
		imgs[1].src = "../img/Zombies/Zombie/ZombieLostHead.gif";
	}
	Zombie.prototype.lostHead = function(){
		var head = document.createElement("img");
		var that = this;
		head.src = "../img/Zombies/Zombie/ZombieHead.gif";
		head.style.zIndex = 998;
		this.liveZombieholder.appendChild(head);
		setTimeout(function(){
			that.liveZombieholder.removeChild(head);
		},1500);
	}
	Zombie.prototype.stop = function(){
		clearInterval(this.walkTimer);
		this.walkTimer = null;
	}
	Zombie.prototype.consume = function(){
		var imgs = this.zombie.getElementsByTagName("img");
		imgs[1].src = "../img/Zombies/Zombie/ZombieAttack.gif";
	}
	Zombie.prototype.consumeWithoutHead = function(){
		var imgs = this.zombie.getElementsByTagName("img");
		imgs[1].src = "../img/Zombies/Zombie/ZombieLostHeadAttack.gif";

	}
	Zombie.prototype.die = function(){
		this.stop();
		this.liveZombieholder.innerHTML = "";
	}
	Zombie.prototype.layDown = function(){
		var imgs = this.zombie.getElementsByTagName("img");
		imgs[1].src = "../img/Zombies/Zombie/ZombieDie.gif";

	}
	
	setTimeout(function(){
		var normalZombie = new Zombie();
		normalZombie.walk();
//		normalZombie.walkWithoutHead();
//		normalZombie.lostHead();
//		normalZombie.die();
	},6000);
	var peaShooter = new Plant(true);
	console.log(peaShooter);
	peaShooter.shoot();
	//下面是小尾巴
}
	//创建植物的方法：
//	function createPlants(){
//		var cards = document.getElementById("cardPeashooter");
//		var background = document.getElementById("background");
//		cards.onclick = function(){
//			//创建一个豌豆射手
//			var peaShooter = document.createElement("img");
//			peaShooter.src = "/img/Plants/Peashooter/Peashooter.gif";
//			peaShooter.style.position = "absolute";
//			peaShooter.style.zIndex = 999;
//			peaShooter.style.left = 0 + "px";
//			peaShooter.style.top = 0 + "px";
//			background.appendChild(peaShooter);
//			
//			//创建透明的豌豆射手
//			var peaShooter_trans = document.createElement("img");
//			peaShooter_trans.src = "/img/Plants/Peashooter/Peashooter.gif";
//			peaShooter_trans.style.position = "absolute";
//			peaShooter_trans.style.zIndex = 998;
//			peaShooter_trans.style.left = 0 + "px";
//			peaShooter_trans.style.top = 0 + "px";
//			peaShooter_trans.style.opacity = 0.8;
//			peaShooter_trans.style.display = "none";
//			background.appendChild(peaShooter_trans);
//			
//			//选项卡变灰
//			var imgs = cards.getElementsByTagName("img");
//			imgs[1].style.visibility = "hidden";
//			
//			document.onmousemove = function(ev){
//				var e = ev || window.event;
//				peaShooter.style.left = e.clientX - peaShooter.offsetWidth/2 + "px";
//				peaShooter.style.top = e.clientY - peaShooter.offsetHeight/2 + "px";
//				if (e.clientY < 280 || e.clientY > (280 + 117) ) {//草卷的top与height
//					peaShooter.onclick = function(){
//						background.removeChild(peaShooter);
//						background.removeChild(peaShooter_trans);
//						imgs[1].style.visibility = "visible";
//					};
//					peaShooter.oncontextmenu = function(){
//						background.removeChild(peaShooter);
//						background.removeChild(peaShooter_trans);
//						imgs[1].style.visibility = "visible";
//					};
//				}else{
//					peaShooter_trans.style.display = "block";
//					peaShooter_trans.style.top = 280 + 117/2 - peaShooter_trans.offsetHeight/2-20 + "px";
//					
//					var oneWidth = 770/9;
//					if (e.clientX < 92 + oneWidth) {
//						peaShooter_trans.style.left = 92 + oneWidth/2 - peaShooter_trans.offsetWidth/2 + "px";
//					}else if (e.clientX > 92 + 8.5*oneWidth) {
//						peaShooter_trans.style.left = 92+8.5*oneWidth - peaShooter_trans.offsetWidth/2 + "px";
//					}else{
//						for (var i=1;i<8;i++) {
//							if (e.clientX > 92 + i*oneWidth && e.clientX < 92 + (i+1)*oneWidth) {
//								peaShooter_trans.style.left = 92 + oneWidth*(i+1) - oneWidth/2 - peaShooter_trans.offsetWidth/2 + "px";
//							}
//						}
//					}
//					//种植植物
//					peaShooter.onclick = function(){
//						peaShooter.style.left = peaShooter_trans.offsetLeft + "px";
//						peaShooter.style.top = peaShooter_trans.offsetTop + "px";
//						document.onmousemove = null;
//						background.removeChild(peaShooter_trans);
//						imgs[1].style.visibility = "visible";
//						peaShooter.onclick = null;
//						peaShooter.oncontextmenu = null;
//					}
//				}
//			}
//		}
//	}
//	createPlants();
//}


