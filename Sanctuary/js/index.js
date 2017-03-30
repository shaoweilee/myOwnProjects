/*
function runAsync1(){
	var p = new Promise(function(resolve, reject){
		setTimeout(function(){
			console.log("done1");
			resolve("anyting1");
		}, 2000);
	});
	return p;
}
function runAsync2(){
	var p = new Promise(function(resolve, reject){
		setTimeout(function(){
			console.log("done2");
			resolve("anyting2");
		}, 2000);
	});
	return p;
}
function runAsync3(){
	var p = new Promise(function(resolve, reject){
		setTimeout(function(){
			console.log("done3");
			resolve("anyting3");
		}, 2000);
	});
	return p;
}


runAsync1()
.then(function(data){
	console.log(data);
//	return runAsync2();
	return "直接返回数据";
})
.then(function(data){
	console.log(data);
	return runAsync3();
})
.then(function(data){
	console.log(data);
});
*/

function getNumber(){
	var p = new Promise(function(resolve, reject){
		setTimeout(function(){
			var num = Math.ceil(Math.random()*10);
			if(num<=5){
				resolve(num);
			}
			else{
				reject("数字太大了");
			}
		}, 2000);
	});
	return p;
}
getNumber()
.then(
	function(data){
		console.log("resolved");
		console.log(data);
	})
.catch(
	function(reason){
		console.log("rejected");
		console.log(reason);
	});
