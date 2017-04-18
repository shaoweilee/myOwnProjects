$.fixedNav = function(){
	var nav = document.getElementsByClassName("navbar")[0];
//	var navHeight = $(nav).height();
//	$(window).scrollTop(300);
	$(window).scroll(function(){
		var flag = $(this).scrollTop() <= nav.offsetTop + nav.clientHeight;
		if (!flag) {
			$(nav).css({
				"position": "fixed",
				"top": 0,
				"background": "rgb(255, 255, 255)",
				"transition": "all .3s",
				"paddingTop": 0
			});
			$(".navAlt").css({
				"height": nav.clientHeight + 33
			});
		} else{
			$(nav).css({
				"position": "static",
				"background": "",
				"paddingTop": 33
			});
			$(".navAlt").css({
				"height": 0
			});
		}
	})
}
$.navClick = function(){
	var navList = $("a[data-hover]", document.getElementsByClassName("navbar")[0]);
	var clickHandler = function(event, x){
		var body = document.body;
		var e = event || window.event;
		e.preventDefault();
		body.scrollTop = x;
	}
	navList[0].onclick = function(event){clickHandler(event, 0);}//注意这里event对象的传递,必须用匿名函数包裹，匿名函数不传参也可以的。
}
