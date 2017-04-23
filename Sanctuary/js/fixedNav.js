$.fixedNav = function(){
	var nav = document.getElementsByClassName("navbar")[0];
//	var navHeight = $(nav).height();
//	$(window).scrollTop(300);
	$(window).scroll(function(){
		var flag = $(this).scrollTop() <= nav.offsetTop + nav.clientHeight;
		if (!flag) {
			$(".navAlt").css({//不在视口内
				"height": $(nav).height(),
				"paddingTop": 33
			});
			$(nav).css({
				"position": "fixed",
				"top": 0,
				"background": "rgb(255, 255, 255)",
				"transition": "all .3s",
				"paddingTop": 0
			});
		} else{//在视口内
			$(".navAlt").css({
				"height": 0,
				"paddingTop": 0
			});
			$(nav).css({
				"position": "static",
				"background": "",
				"paddingTop": 33
			});
		}
	})
}
$.navClick = function(){
	var navList = $("a[data-hover]", document.getElementsByClassName("navbar")[0]);
	var clickHandler = function(event, start, end, rate){
		var body = document.body;
		var e = event || window.event;
		e.preventDefault();
		ease(start, end, rate, function(value){body.scrollTop = value;console.log("end:"+value,"当前位置"+start);});
	}
//	var clickHandler = function(event, x){
//		var body = document.body;
//		var e = event || window.event;
//		e.preventDefault();
//		body.scrollTop = x;
//	}
	navList[0].onclick = function(event){clickHandler(event, document.body.scrollTop, 0, 6);}//注意这里event对象的传递,必须用匿名函数包裹，匿名函数不传参也可以的。
	navList[1].onclick = function(event){clickHandler(event, document.body.scrollTop, 0, 6);}//注意这里event对象的传递,必须用匿名函数包裹，匿名函数不传参也可以的。
	navList[2].onclick = function(event){clickHandler(event, document.body.scrollTop, 0, 6);}//注意这里event对象的传递,必须用匿名函数包裹，匿名函数不传参也可以的。
	navList[3].onclick = function(event){
		clickHandler(event, document.body.scrollTop, $(".work h1").offset().top - $(".work header").height() - $(navList).height(), 6);
	}//注意这里event对象的传递,必须用匿名函数包裹，匿名函数不传参也可以的。
	navList[5].onclick = function(event){clickHandler(event, document.body.scrollTop, 1500, 6);}//注意这里event对象的传递,必须用匿名函数包裹，匿名函数不传参也可以的。
}


var ease = function(start, end, rate, callback){
	if (start === end) {
		return;
	}
	var step = function(){
		start = start + (end - start)/rate;
		if (Math.abs(end - start) < 1) {
			callback(end, true);
			return;
		}
		callback(start, false);
		requestAnimationFrame(step);
	}
	step();
}
