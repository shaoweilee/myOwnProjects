function requestImg(){
	var p = new Promise(function(resolve, reject){
		var img = new Image();
		img.onload = function(){
			resolve(img);
		}
		img.src = "******";
	});
	return p;
}
function timeout(){
	var p = new Promise(function(resolve, reject){
		setTimeout(function(){
			reject("图片请求超时");
		}, 5000);
	});
	return p;
}
Promise.race([requestImg(), timeout()])
.then(function(result){
	console.log(result);
})
.catch(function(reason){
	console.log(reason);
});