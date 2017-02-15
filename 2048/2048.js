$.fn.make2048 = function(option){
	var defaultOption = {
		width:4,
		height:4,
		style:{
			background_color:"rgb(184,175,158)",
			block_background_color:"rgb(204,192,178)",
			padding:18,
			block_size:100,
			block_style:{
				"font-family":"微软雅黑",
				"font-weight":"bold",
				"text-align":"center"
			},
		},
		blocks: [
			{ level: 0, value: 2,style:{"background-color":"rgb(238,228,218)", "color":"rgb(124,115,106)", "font-size": 58 } },
			{ level: 1, value: 4,style:{"background-color":"rgb(236,224,200)", "color":"rgb(124,115,106)", "font-size": 58 } },
			{ level: 2, value: 8,style:{"background-color":"rgb(242,177,121)", "color":"rgb(255,247,235)", "font-size": 58 } },
			{ level: 3, value: 16,style:{"background-color":"rgb(245,149,99)", "color":"rgb(255,250,235)", "font-size": 50 } },
			{ level: 4, value: 32,style:{"background-color":"rgb(244,123,94)", "color":"rgb(255,247,235)", "font-size": 50 } },
			{ level: 5, value: 64,style:{"background-color":"rgb(247,93,59)", "color":"rgb(255,247,235)", "font-size": 50 } },
			{ level: 6, value: 128,style:{"background-color":"rgb(236,205,112)", "color":"rgb(255,247,235)", "font-size": 42 } },
			{ level: 7, value: 256,style:{"background-color":"rgb(237,204,97)", "color":"rgb(255,247,235)", "font-size": 42 } },
			{ level: 8, value: 512,style:{"background-color":"rgb(236,200,80)", "color":"rgb(255,247,235)", "font-size": 42 } },
			{ level: 9, value: 1024,style:{"background-color":"rgb(237,197,63)", "color":"rgb(255,247,235)", "font-size": 34 } },
			{ level: 10, value: 2048,style:{"background-color":"rgb(238,194,46)", "color":"rgb(255,247,235)", "font-size": 34 } },
			{ level: 11, value: 4096,style:{"background-color":"rgb(61,58,51)", "color":"rgb(255,247,235)", "font-size": 34 } }
		],
		animateSpeed:300
		
	};
	var state = [];
	option = $.extend({},defaultOption,option);
	
	if(this.length>1)throw "一次只能有一个游戏";
	if(this.length == 0)throw "未找到游戏容器";
	
	var $this = $(this[0]);
	$this.css({
		"background-color":option.style.background_color,
		"border-radius":option.style.padding,
		"position":"relative",
		"user-select":"none"
	});
	var getPosition = function(x,y){
		return {
			top:option.style.padding + y*(option.style.block_size+option.style.padding),
			left:option.style.padding + x*(option.style.block_size+option.style.padding)
			
		}
	}
	var getEmptyBlockIndexs = function(){
		var emptyBlockIndexs = [];
		$(state).each(function(i,o){
			if(o == null) emptyBlockIndexs.push(i);
		});
		return emptyBlockIndexs;
	}
	var getCoordinate = function(index){
		return {
			x:index%option.width,
			y:Math.floor(index/option.width)
		}
	}
	var getIndex = function(x,y){
		return x + y*option.width;
	}
	var getBlock = function(x,y){
		return state[getIndex(x,y)];
	}
	var buildBackground = function(){
		var backgrounds = [];
		for(var x = 0;x<option.width;x++){
			for(var y = 0;y<option.height;y++){
				state.push(null);
				var bg_block = $("<div></div>");
				var position = getPosition(x,y);
				bg_block.css({
					"width":option.style.block_size,
					"height":option.style.block_size,
					"background-color":option.style.block_background_color,
					"position":"absolute",
					"top":position.top,
					"left":position.left
				});
				backgrounds.push(bg_block);
			}
		}
		$this.append(backgrounds);
		$this.width((option.style.block_size + option.style.padding)*option.width+option.style.padding);
		$this.height((option.style.block_size + option.style.padding)*option.height+option.style.padding);
		
	}
	
	var buildBlock = function(level,x,y){
		var emptyBlockIndexs = getEmptyBlockIndexs();
		if(emptyBlockIndexs.length == 0) return false;
		
		var putIndex;
		if(x != undefined && y!= undefined){
			putIndex = getIndex(x,y);
		}else{
			putIndex = emptyBlockIndexs[Math.floor(Math.random()*emptyBlockIndexs.length)];
		}

		
		var block;
		if(level != undefined){
			block = $.extend({},option.blocks[level]);
		}else{
			block = Math.random() >= 0.5 ? option.blocks[0] : option.blocks[1];
		}
		var coordinate = getCoordinate(putIndex);
		var position = getPosition(coordinate.x,coordinate.y);
		var blockDom = $("<div></div>");
		blockDom.addClass("block_" + coordinate.x + "_" + coordinate.y);
		blockDom.css($.extend(option.style.block_style,{
			"position":"absolute",
			"top":position.top + option.style.block_size/2,
			"left":position.left + option.style.block_size/2,
			"width":0,
			"height":0
		}, block.style))
		$this.append(blockDom);
		state[putIndex] = block;
		
		blockDom.animate({
			"width":option.style.block_size,
			"height":option.style.block_size,
			"line-height":option.style.block_size + "px",
			"top":position.top,
			"left":position.left
		},option.animateSpeed,(function(blockDom){
			return function(){
				blockDom.html(block.value);
			}
		})(blockDom));
		
		return true;
	}
	var keyHandler = function(evt){
		switch (evt.which){
			case 37:
				move("left");
				buildBlock();
				break;
			case 38:
				move("up");
				buildBlock();
				break;
			case 39:
				move("right");
				buildBlock();
				break;
			case 40:
				move("down");
				buildBlock();
				break;
		}
	}
	var gameStart = function(){
		buildBackground();
		buildBlock();
		buildBlock();
		
		$(document).on("keydown",keyHandler);
	}
	
	var move = function(direction){
		switch (direction){
			case "up":
			for(var x = 0;x<option.width;x++){
				for (y = 1;y<option.height;y++) {
					var block = getBlock(x,y);
					if(block == null) continue;
					var target_Coordinate = {x:x,y:y-1};
					var target_block = getBlock(target_Coordinate.x,target_Coordinate.y);
					var moved = 0;
					while(target_Coordinate.y>0 && target_block==null){
						target_Coordinate.y = target_Coordinate.y - 1;
						target_block = getBlock(target_Coordinate.x,target_Coordinate.y);
						if(++moved > Math.max(option.width,option.height)) break;
					}
					var blockDom = $(".block_" + x + "_" + y);
					var position = getPosition(target_Coordinate.x,target_Coordinate.y);
					if(target_block == null){
						state[getIndex(x,y)] = null;
						state[getIndex(target_Coordinate.x,target_Coordinate.y)] = block;
						blockDom.removeClass();
						blockDom.addClass("block_" + target_Coordinate.x + "_" + target_Coordinate.y);
						blockDom.animate({
							"top":position.top,
							"left":position.left
						},option.animateSpeed);
					}else if(target_block.value == block.value&&!target_block.justModified){
						var updatedBlock = $.extend({},option.blocks[block.level + 1]);
						console.log("updatedBlock" , updatedBlock);
						updatedBlock.justModified = true;
						console.log("updatedBlock" , updatedBlock);
						console.log("target_block" , target_block);
						
						state[getIndex(x,y)] = null;
						state[getIndex(target_Coordinate.x,target_Coordinate.y)] = updatedBlock;
						blockDom.animate({
							"top":position.top,
							"left":position.left
						},option.animateSpeed,(function(blockDom,target_Coordinate,updatedBlock){
							return function(){
								blockDom.hide();
								var target_blockDom = $(".block_" + target_Coordinate.x + "_" + target_Coordinate.y);
								target_blockDom.html(updatedBlock.value);
								target_blockDom.css(updatedBlock.style);
							}
						}(blockDom,target_Coordinate,updatedBlock)));
					}else{
						target_Coordinate.y = target_Coordinate.y + 1;
						var position = getPosition(target_Coordinate.x,target_Coordinate.y);
						state[getIndex(x,y)] = null;
						state[getIndex(target_Coordinate.x,target_Coordinate.y)] = block;
						blockDom.removeClass();
						blockDom.addClass("block_" + target_Coordinate.x + "_" + target_Coordinate.y);
						blockDom.animate({
							"top":position.top,
							"left":position.left
						},option.animateSpeed);
					}
//					console.log(target_block);
				}
			}
				break;
			case "down":
			for(var x = 0;x<option.width;x++){
				for (var y = option.height-2;y >= 0;y--) {
					var block = getBlock(x,y);
					if(block == null) continue;
					var target_Coordinate = {x:x,y:y+1};
					var target_block = getBlock(target_Coordinate.x,target_Coordinate.y);
					var moved = 0;
					while(target_Coordinate.y <= option.height - 2 && target_block==null){
						target_Coordinate.y = target_Coordinate.y + 1;
						target_block = getBlock(target_Coordinate.x,target_Coordinate.y);
						if(++moved > Math.max(option.width,option.height)) break;
					}
					var blockDom = $(".block_" + x + "_" + y);
					var position = getPosition(target_Coordinate.x,target_Coordinate.y);
					if(target_block == null){
						state[getIndex(x,y)] = null;
						state[getIndex(target_Coordinate.x,target_Coordinate.y)] = block;
						blockDom.removeClass();
						blockDom.addClass("block_" + target_Coordinate.x + "_" + target_Coordinate.y);
						blockDom.animate({
							"top":position.top,
							"left":position.left
						},option.animateSpeed);
					}else if(target_block.value == block.value&&!target_block.justModified){
						var updatedBlock = $.extend({},option.blocks[block.level + 1]);
						updatedBlock.justModified = true;
						state[getIndex(x,y)] = null;
						state[getIndex(target_Coordinate.x,target_Coordinate.y)] = updatedBlock;
						blockDom.animate({
							"top":position.top,
							"left":position.left
						},option.animateSpeed,(function(blockDom,target_Coordinate,updatedBlock){
							return function(){
								blockDom.hide();
								var target_blockDom = $(".block_" + target_Coordinate.x + "_" + target_Coordinate.y);
								target_blockDom.html(updatedBlock.value);
								target_blockDom.css(updatedBlock.style);
							}
						}(blockDom,target_Coordinate,updatedBlock)));
					}else{
						target_Coordinate.y = target_Coordinate.y - 1;
						var position = getPosition(target_Coordinate.x,target_Coordinate.y);
						state[getIndex(x,y)] = null;
						state[getIndex(target_Coordinate.x,target_Coordinate.y)] = block;
						blockDom.removeClass();
						blockDom.addClass("block_" + target_Coordinate.x + "_" + target_Coordinate.y);
						blockDom.animate({
							"top":position.top,
							"left":position.left
						},option.animateSpeed);
					}
				}
			}
				break;
			case "left":
			for(var y = 0;y<option.height;y++){
				for (var x = 1;x <option.width;x++) {
					var block = getBlock(x,y);
					if(block == null) continue;
					var target_Coordinate = {x:x-1,y:y};
					var target_block = getBlock(target_Coordinate.x,target_Coordinate.y);
					var moved = 0;
					while(target_Coordinate.x > 0 && target_block == null){
						target_Coordinate.x = target_Coordinate.x - 1;
						target_block = getBlock(target_Coordinate.x,target_Coordinate.y);
						if(++moved > Math.max(option.width,option.height)) break;
					}
					var blockDom = $(".block_" + x + "_" + y);
					var position = getPosition(target_Coordinate.x,target_Coordinate.y);
//					console.log(state);
					
					if(target_block == null){
						state[getIndex(x,y)] = null;
						state[getIndex(target_Coordinate.x,target_Coordinate.y)] = block;
						blockDom.removeClass();
						blockDom.addClass("block_" + target_Coordinate.x + "_" + target_Coordinate.y);
						blockDom.animate({
							"top":position.top,
							"left":position.left
						},option.animateSpeed);
//						console.log(position);
//						console.log(state);           
					}else if(target_block.value == block.value&&!target_block.justModified){
						var updatedBlock = $.extend({},option.blocks[block.level + 1]);
						updatedBlock.justModified = true;
						state[getIndex(x,y)] = null;
						state[getIndex(target_Coordinate.x,target_Coordinate.y)] = updatedBlock;
						blockDom.animate({
							"top":position.top,
							"left":position.left
						},option.animateSpeed,(function(blockDom,target_Coordinate,updatedBlock){
							return function(){
								blockDom.hide();
								var target_blockDom = $(".block_" + target_Coordinate.x + "_" + target_Coordinate.y);
								target_blockDom.html(updatedBlock.value);
								target_blockDom.css(updatedBlock.style);
							}
						}(blockDom,target_Coordinate,updatedBlock)));
//						console.log(position);
					}else{
						target_Coordinate.x = target_Coordinate.x + 1;
						var position = getPosition(target_Coordinate.x,target_Coordinate.y);
						state[getIndex(x,y)] = null;
						state[getIndex(target_Coordinate.x,target_Coordinate.y)] = block;
						blockDom.removeClass();
						blockDom.addClass("block_" + target_Coordinate.x + "_" + target_Coordinate.y);
						blockDom.animate({
							"top":position.top,
							"left":position.left
						},option.animateSpeed);
					}
				}
			}
				break;
			case "right":
			for(var y = 0;y<option.height;y++){
				for (var x = option.width-2;x >= 0;x--) {
					var block = getBlock(x,y);
					if(block == null) continue;
					var target_Coordinate = {x:x+1,y:y};
					var target_block = getBlock(target_Coordinate.x,target_Coordinate.y);
					var moved = 0;
					while(target_Coordinate.x <= option.width - 2 && target_block==null){
						target_Coordinate.x = target_Coordinate.x + 1;
						target_block = getBlock(target_Coordinate.x,target_Coordinate.y);
						if(++moved > Math.max(option.width,option.height)) break;
					}
					var blockDom = $(".block_" + x + "_" + y);
					var position = getPosition(target_Coordinate.x,target_Coordinate.y);
					if(target_block == null){
						state[getIndex(x,y)] = null;
						state[getIndex(target_Coordinate.x,target_Coordinate.y)] = block;
						blockDom.removeClass();
						blockDom.addClass("block_" + target_Coordinate.x + "_" + target_Coordinate.y);
						blockDom.animate({
							"top":position.top,
							"left":position.left
						},option.animateSpeed);
					}else if(target_block.value == block.value&&!target_block.justModified){
						var updatedBlock = $.extend({},option.blocks[block.level + 1]);
						updatedBlock.justModified = true;
						state[getIndex(x,y)] = null;
						state[getIndex(target_Coordinate.x,target_Coordinate.y)] = updatedBlock;
						blockDom.animate({
							"top":position.top,
							"left":position.left
						},option.animateSpeed,(function(blockDom,target_Coordinate,updatedBlock){
							return function(){
								blockDom.hide();
								var target_blockDom = $(".block_" + target_Coordinate.x + "_" + target_Coordinate.y);
								target_blockDom.html(updatedBlock.value);
								target_blockDom.css(updatedBlock.style);
							}
						}(blockDom,target_Coordinate,updatedBlock)));
					}else{
						target_Coordinate.x = target_Coordinate.x - 1;
						var position = getPosition(target_Coordinate.x,target_Coordinate.y);
						state[getIndex(x,y)] = null;
						state[getIndex(target_Coordinate.x,target_Coordinate.y)] = block;
						blockDom.removeClass();
						blockDom.addClass("block_" + target_Coordinate.x + "_" + target_Coordinate.y);
						blockDom.animate({
							"top":position.top,
							"left":position.left
						},option.animateSpeed);
					}
				}
			}
				break;
		}
	}
	
	gameStart();
}
