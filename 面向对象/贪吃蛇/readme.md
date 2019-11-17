首发于简书：https://www.jianshu.com/p/4cee1ae08835

贪吃蛇是我接触 JavaScript 这门语言写的第一个小游戏，因为其简单绝对是入门首先。前端这块最重要的就是 JavaScript，JavaScript 中最重要的就是 ES5 的原型以及原型链。当你熟悉一种贪吃蛇这个简单的小游戏基本就算掌握了用 JavaScript 写游戏的套路，然后就可以使用 ES5 的原型来写游戏或使用 ES6 的 class 来写游戏。写几个游戏估计你的面向对象编程能力绝对是前端的佼佼者。

贪吃蛇的思路：
- 创建画板（地图）
- 渲染一条蛇
- 让蛇动起来
- 添加键盘事件控制方向
- 死亡条件判断
- 生成食物
- 两个 bug
- 长按如何加速
##### 一、创建画板（地图）
第一步就是要使用原生 DOM 创建一个 25x25 的表格。
![](https://upload-images.jianshu.io/upload_images/16069544-4147a32eadc29b45.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>贪吃蛇</title>
	<style>
		table{
			margin: 10px auto;
			border-collapse: collapse;
		}
		td{
			width: 25px;
			height: 25px;
			border: 1px solid #456;
		}
	</style>
</head>
<body>
	<script>
		let otable = document.createElement("table");
		for(let i = 0;i < 20;i++){
			let otr = document.createElement("tr");
			for(let j = 0;j < 20;j++){
				let otd = document.createElement("td");
				otr.appendChild(otd);
			}
			otable.appendChild(otr);
		}
		document.body.appendChild(otable);
	</script>
</body>
</html>
```
##### 二、渲染一条蛇
接下来我们要想办法绘制一条蛇。如下图：
![](https://upload-images.jianshu.io/upload_images/16069544-19ea3191cfed7348.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
绘制思路都是一样的用一个数组来管理这条蛇，数组里面的每一项都是对象，对象里面放着蛇的这部分在多少行多少列（对应表格的DOM节点）以及蛇的的颜色，根据蛇的上色不同一共分为两种办法：
- 直接定义颜色使用 RGB
- 使用类名上色
两个渲染的思路都是根据数组遍历拿到单元格对应的 DOM 节点，然后添加颜色。
###### 方法一
```
let snakeArr = [
	{"row" : 2,"col" : 6,"color":"rgb(11,22,33)"},
	{"row" : 2,"col" : 5,"color":"rgb(99,33,44)"},
	{"row" : 2,"col" : 4,"color":"rgb(88,99,22)"},
];

function renderSnake(snakeArr){
	for( let k = 0;k < snakeArr.length;k++){
		setColor(snakeArr[k]["row"],snakeArr[k]["col"],snakeArr[k]["color"]);
	};
};
function setColor(row,col,color){
	document.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].style.backgroundColor = color;
};
renderSnake(snakeArr);
```
###### 方法二：
```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>贪吃蛇</title>
	<style>
		table{
			margin: 10px auto;
			border-collapse: collapse;
		}
		td{
			width: 25px;
			height: 25px;
			border: 1px solid #456;
		}
		.snake0{
			background-color: #123456;
		}
		.snake1{
			background-color: #987654;
		}
		.snake2{
			background-color: #999999;
		}
	</style>
</head>
<body>
	<script>
		let otable = document.createElement("table");
		for(let i = 0;i < 20;i++){
			let otr = document.createElement("tr");
			for(let j = 0;j < 20;j++){
				let otd = document.createElement("td");
				otr.appendChild(otd);
			}
			otable.appendChild(otr);
		}
		document.body.appendChild(otable);

		let snakeArr = [
			{"row" : 2,"col" : 6},
			{"row" : 2,"col" : 5},
			{"row" : 2,"col" : 4},
		];

		function renderSnake(snakeArr){
			for( let k = 0;k < snakeArr.length;k++){
				setColor(snakeArr[k]["row"],snakeArr[k]["col"],k);
			};
		};
		function setColor(row,col,classname){
			document.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].className = `snake${classname}`;
		};
		renderSnake(snakeArr);
	</script>
</body>
</html>
```
###### 三、让蛇动起来
蛇说白了就是 snakeArr 这个数组，首先假设蛇向右运动的时候，我们只需要删除最后一项，增加数组的第一项。这样蛇就会向右移动一格，移动的时候肯定是以蛇头为参考所以增加数组的新项是以 snakeArr[0] 为参考，增加的时候行 row 是不变的，列 col 需要加一。除此之外之前删除的那个单元格的颜色还在所以的在重新渲染之前进行清屏操作。
```
function clear(){
	for(let i = 0;i < 20;i++){
		for(let j = 0;j < 20;j++){
			document.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].style.backgroundColor = "white";
		}
	}
};

let timer = setInterval(function(){
	clear();
	let color = `rgb(${~~(Math.random()*256)},${~~(Math.random()*256)},${~~(Math.random()*256)})`;
	snakeArr.pop();
	snakeArr.unshift({
		"row"  : snakeArr[0]["row"],
		"col"  : snakeArr[0]["col"] + 1,
		"color": color
	});
	renderSnake(snakeArr);
},1000);
```
写游戏最重要就是这里，它有个套路就是一定要记住：
> 清屏 => 更新 => 重绘
##### 四、添加键盘事件控制方向
写到这里蛇现在已经可以自动往右行走了，但是还不能控制方向，于是我们还的添加键盘点击事件来控制蛇头的方向，主要通过 keydown 事件监控按键按下， event。keyCode 可以得到键盘对应的数字。

顺便参考往右移动的思路，把蛇上下左的增加删除也给写出来。
```
let direction = "right";
document.onkeydown = function(event){
	console.log(event.keyCode)
	if(event.keyCode == 37){
		direction = "left";
	}else if(event.keyCode == 38){
		direction = "up";
	}else if(event.keyCode == 39){
		direction = "right";
	}else if(event.keyCode ==40){
		direction = "down";
	};
}
let timer = setInterval(function(){
	clear();
	let color = `rgb(${~~(Math.random()*256)},${~~(Math.random()*256)},${~~(Math.random()*256)})`;
	snakeArr.pop();
	if(direction === "right"){
		snakeArr.unshift({
			"row"  : snakeArr[0]["row"],
			"col"  : snakeArr[0]["col"] + 1,
			"color": color
		});
	}else if(direction === "left"){
		snakeArr.unshift({
			"row"  : snakeArr[0]["row"],
			"col"  : snakeArr[0]["col"] - 1,
			"color": color
		});
	}else if(direction === "up"){
		snakeArr.unshift({
			"row"  : snakeArr[0]["row"] - 1,
			"col"  : snakeArr[0]["col"],
			"color": color
		});
	}else if(direction === "down"){
		snakeArr.unshift({
			"row"  : snakeArr[0]["row"] + 1,
			"col"  : snakeArr[0]["col"],
			"color": color
		});
	}
	renderSnake(snakeArr);
},1000);
```
##### 五、死亡条件判断
玩过贪吃蛇的知道，蛇碰到墙必须的死亡，也就是蛇一直往右走，当到达二十列的时候，再往下走，就会到达二十一列，这时可以理解为撞墙死亡，对应的这时候表格渲染的 DOM 没有对应的节点报错如下：
![](https://upload-images.jianshu.io/upload_images/16069544-73f77b91f56ece6d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
我们的增加判断来判断蛇撞墙死亡，清除定时器停止游戏，具体代码如下：
```
function die(){
    clearInterval(timer);
    alert("CAME OVER!");
    renderSnake(snakeArr);
};
if(direction === "right"){
    if(snakeArr[0].col + 1 > 19){
        die();
        return;
    };
	snakeArr.pop();
	snakeArr.unshift({
		"row"  : snakeArr[0]["row"],
		"col"  : snakeArr[0]["col"] + 1,
		"color": color
	});
}else if(direction === "left"){
    if(snakeArr[0].col - 1 < 0){
        die();
        return;
    };
	snakeArr.pop();
	snakeArr.unshift({
		"row"  : snakeArr[0]["row"],
		"col"  : snakeArr[0]["col"] - 1,
		"color": color
	});
}else if(direction === "up"){
	if(snakeArr[0].row - 1 < 0){
        die();
        return;
    };
    snakeArr.pop();
	snakeArr.unshift({
		"row"  : snakeArr[0]["row"] - 1,
		"col"  : snakeArr[0]["col"],
		"color": color
	});
}else if(direction === "down"){
	if(snakeArr[0].row + 1 > 19){
        die();
        return;
    };
    snakeArr.pop();
	snakeArr.unshift({
		"row"  : snakeArr[0]["row"] + 1,
		"col"  : snakeArr[0]["col"],
		"color": color
	});
};
```
![](https://upload-images.jianshu.io/upload_images/16069544-d037071eacccca13.gif?imageMogr2/auto-orient/strip)
##### 六、生成食物
现在贪吃蛇能跑能跳也能死亡，就差吃到食物来增加蛇的长度了。

食物会随机出现在表格的任意一处，但就是不能出现在蛇身子覆盖的单元格。下面的代码通过 do while 产生一个不再蛇身上的一个坐标，然后渲染这个表格的内容为五角星就当做食物。到此食物制作 OK。

但是这个 snakeFood 必须有个清屏的动作，原因是在蛇吃到食物时，会调用 snakeFood 这个函数，这时我们的把老食物拿掉（清屏）同时产生新事物。
```
function snakeFood(){
	for(let i = 0;i < 20; i++){
        for (let j = 0; j < 20; j++){
            tr[i].getElementsByTagName("td")[j].innerHTML = "";
        };
    };

    do{ 
        var lock = false;
        var x = parseInt(Math.random()*20);
        var y = parseInt(Math.random()*20);
        for(let i = 0;i < snakeArr.length;i++){
            if(snakeArr[i].row === x && snakeArr[i].col === y){
                lock = true;
            };
        };
    }while(lock);
    tr[x].getElementsByTagName("td")[y].innerHTML = "☆";
}
snakeFood();
```
接下来就是蛇如何吃到食物？
> 吃到食物的肯定是蛇头，我们只需要拿到蛇头对应的单元格的内容为五角星，就可以判定蛇吃掉食物。吃到食物我们调用 snakeFood 函数，来增加一个新的食物，同时选择这次更新不删除数组（蛇身）最后一项，来变相达到增加一格的效果。
```
if(tr[snakeArr[0]["row"]].getElementsByTagName("td")[snakeArr[0]["col"]].innerHTML === "☆"){
	snakeFood();
}else{
	snakeArr.pop();
};
```
最后实现效果如下：
![](https://upload-images.jianshu.io/upload_images/16069544-fc6c5fe404a758ed.gif?imageMogr2/auto-orient/strip)
##### 七、两个 bug
到现在游戏还有两个 bug 。
1. 蛇可以掉头（蛇头本来正在往右，突然改变方向往左结果直接穿过自己掉头）
2. 蛇吃到自己不能死亡（直接穿过自己）

bug 动图如下：
![](https://upload-images.jianshu.io/upload_images/16069544-02e8e844ccd76919.gif?imageMogr2/auto-orient/strip)

###### 1. 解决掉头
掉头很简单了，只需要简单的判断，当方向往右的时候点击左方向键失效。其他同理，代码如下：
```
document.onkeydown = function(event){
	console.log(event.keyCode)
	if(direction !== "right" && event.keyCode == 37){
		direction = "left";
	}else if(direction !== "down" && event.keyCode == 38){
		direction = "up";
	}else if(direction !== "left" && event.keyCode == 39){
		direction = "right";
	}else if(direction !== "up" && event.keyCode ==40){
		direction = "down";
	};
};
```
###### 2. 解决自我死亡
解决自我死亡就更简单了，只要验证蛇头是否在蛇身上，在渲染函数处进行检查，检查的时候遍历蛇身忽略掉蛇头。
```
function renderSnake(snakeArr){
	for( let k = 0;k < snakeArr.length;k++){
		setColor(snakeArr[k]["row"],snakeArr[k]["col"],snakeArr[k]["color"]);
	};
	for( let k = 1;k < snakeArr.length;k++){
        if(snakeArr[0].row == snakeArr[k].row && snakeArr[0].col == snakeArr[k].col){
    		clearInterval(timer);
    		alert("CAME OVER!");
        };
    };
};
```
##### 八、长按如何加速
如果你玩过下面这种游戏机，一定知道里面有个游戏，就类似我们现在写的贪吃蛇，还记的以前玩熟了贪吃蛇这个游戏，就会长按上下左右键来获得加速的效果，以达到节省自己的游戏时间，不可能傻等着蛇从上面跑到下面去吃食物。

贪吃蛇这个东西不是第一次写了，第一次写的时候，就想着能不能有加速的效果试了几次没找到办法失败了。毕竟当时基础还不太牢，这次可算是解决了，有点轻而易举。前提的对 JS 事件执行机制和定时器延时器有点深入的认识。

![图片来自网络](https://upload-images.jianshu.io/upload_images/16069544-b3ed8692f9a0ca55.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
当时想的办法是蛇既然是定时器来维持运动的，那我就更改一下定时器的时间 interval，比如定义一些事件来更改 interval ，已达到修改定时器间隔事件的效果，当时就没想到定时器这个事件一旦开启之后，怎么可能去改 interval，你只能把定时器给停了。
```
let timer = setInterval(function(){
	//....
},interval);
```
现在想到的办法，用递归回调的延时器来代替定时器，这时候就能更改 interval 了：
```
let timer = setTimeout(function timers(){
	clear();
	let color = `rgb(${~~(Math.random()*256)},${~~(Math.random()*256)},${~~(Math.random()*256)})`;
	if(direction === "right"){
        if(snakeArr[0].col + 1 > 19){
            die();
            return;
        };
		snakeArr.unshift({
			"row"  : snakeArr[0]["row"],
			"col"  : snakeArr[0]["col"] + 1,
			"color": color
		});
	}else if(direction === "left"){
        if(snakeArr[0].col - 1 < 0){
            die();
            return;
        };
		snakeArr.unshift({
			"row"  : snakeArr[0]["row"],
			"col"  : snakeArr[0]["col"] - 1,
			"color": color
		});
	}else if(direction === "up"){
		if(snakeArr[0].row - 1 < 0){
            die();
            return;
        };
		snakeArr.unshift({
			"row"  : snakeArr[0]["row"] - 1,
			"col"  : snakeArr[0]["col"],
			"color": color
		});
	}else if(direction === "down"){
		if(snakeArr[0].row + 1 > 19){
            die();
            return;
        };
		snakeArr.unshift({
			"row"  : snakeArr[0]["row"] + 1,
			"col"  : snakeArr[0]["col"],
			"color": color
		});
	};

	if(tr[snakeArr[0]["row"]].getElementsByTagName("td")[snakeArr[0]["col"]].innerHTML === "☆"){
		snakeFood();
	}else{
		snakeArr.pop();
	};

	renderSnake(snakeArr);
	setTimeout(timers,interval)
},interval);
```
用 keypress 长按事件来更改 interval，为了防止蛇跑的过快设置最小时间为 50ms，当按键抬起时恢复原速度 。因为 keypress 不能监听方向键 ctrl 和 alt 等等键盘长按，所以可以把原来控制方向的方向键的功能转移到 `wasd` 四个按键上面，这样既可以更改方向又可以长按加速。
```
document.onkeypress = function(){
	interval -= 100;
	if(interval < 50){
		interval = 50;
	}
};

document.onkeyup = function(){
	interval = 500;
};

document.onkeydown = function(event){
	if(direction !== "right" && event.keyCode == 65){
		direction = "left";
	}else if(direction !== "down" && event.keyCode == 87){
		direction = "up";
	}else if(direction !== "left" && event.keyCode == 68){
		direction = "right";
	}else if(direction !== "up" && event.keyCode == 83){
		direction = "down";
	};
};
```
如果你还不满意可以加上音乐，背景，计分等等，剩下的就你自己尽情发挥了。我最后的成品效果动图：

![最后的成品效果图](https://upload-images.jianshu.io/upload_images/16069544-a50511aaa8022f3d.gif?imageMogr2/auto-orient/strip)

源代码奉上：
```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>贪吃蛇</title>
	<style>
		table{
			margin: 10px auto;
			border-collapse: collapse;
		}
		td{
			width: 25px;
			height: 25px;
			line-height: 25px;
			text-align: center;
			border: 1px solid #456;
		}
		div{
			width: 550px;
			margin: 0 auto;
		}
	</style>
</head>
<body>
	<div>
		得分：<span></span><br />
		历史最高分：<span></span>
	</div>
    <audio src="./audio/bg.mp3" autoplay loop></audio>
    <audio src="./audio/cameover.mp3"></audio>
    <audio src="./audio/food.mp3"></audio>
	<script>
		let span = document.getElementsByTagName("span");
		let music = document.getElementsByTagName("audio");
		let otable = document.createElement("table");
		for(let i = 0;i < 20;i++){
			let otr = document.createElement("tr");
			for(let j = 0;j < 20;j++){
				let otd = document.createElement("td");
				otr.appendChild(otd);
			}
			otable.appendChild(otr);
		}
		document.body.appendChild(otable);
		let direction = "right",interval = 500,score = 0,highScore = 0;
		span[0].innerHTML = score;
		span[1].innerHTML = sessionStorage.getItem("highScore");
		let tr = document.getElementsByTagName("tr");
		let td = document.getElementsByTagName("td");

		let snakeArr = [
			{"row" : 2,"col" : 6,"color":"rgb(11,22,33)"},
			{"row" : 2,"col" : 5,"color":"rgb(99,33,44)"},
			{"row" : 2,"col" : 4,"color":"rgb(88,99,22)"},
		];

		function renderSnake(snakeArr){
			for( let k = 0;k < snakeArr.length;k++){
				setColor(snakeArr[k]["row"],snakeArr[k]["col"],snakeArr[k]["color"]);
			};
			for( let k = 1;k < snakeArr.length;k++){
                if(snakeArr[0].row == snakeArr[k].row && snakeArr[0].col == snakeArr[k].col){
            		clearTimeout(timer);
            		alert("CAME OVER!");
                };
            };
		};
		function setColor(row,col,color){
			tr[row].getElementsByTagName("td")[col].style.backgroundColor = color;
		};
		renderSnake(snakeArr);

		function clear(){
			for(let i = 0;i < 20;i++){
				for(let j = 0;j < 20;j++){
					tr[i].getElementsByTagName("td")[j].style.backgroundColor = "white";
				}
			}
		};

		document.onkeydown = function(event){
			if(direction !== "right" && event.keyCode == 37){
				direction = "left";
			}else if(direction !== "down" && event.keyCode == 38){
				direction = "up";
			}else if(direction !== "left" && event.keyCode == 39){
				direction = "right";
			}else if(direction !== "up" && event.keyCode == 40){
				direction = "down";
			};
			if(direction !== "right" && event.keyCode == 65){
				direction = "left";
			}else if(direction !== "down" && event.keyCode == 87){
				direction = "up";
			}else if(direction !== "left" && event.keyCode == 68){
				direction = "right";
			}else if(direction !== "up" && event.keyCode == 83){
				direction = "down";
			};
		};

		document.onkeypress = function(){
			interval -= 100;
			if(interval < 50){
				interval = 50;
			}
		};

		document.onkeyup = function(){
			interval = 500;
		};

	    function die(){
            music[0].pause();
            music[1].play();
            clearTimeout(timer);
            alert("CAME OVER!");
            renderSnake(snakeArr);
        }
		let timer = setTimeout(function timers(){
			clear();
			let color = `rgb(${~~(Math.random()*256)},${~~(Math.random()*256)},${~~(Math.random()*256)})`;
			if(direction === "right"){
                if(snakeArr[0].col + 1 > 19){
                    die();
                    return;
                };
				snakeArr.unshift({
					"row"  : snakeArr[0]["row"],
					"col"  : snakeArr[0]["col"] + 1,
					"color": color
				});
			}else if(direction === "left"){
                if(snakeArr[0].col - 1 < 0){
                    die();
                    return;
                };
				snakeArr.unshift({
					"row"  : snakeArr[0]["row"],
					"col"  : snakeArr[0]["col"] - 1,
					"color": color
				});
			}else if(direction === "up"){
				if(snakeArr[0].row - 1 < 0){
                    die();
                    return;
                };
				snakeArr.unshift({
					"row"  : snakeArr[0]["row"] - 1,
					"col"  : snakeArr[0]["col"],
					"color": color
				});
			}else if(direction === "down"){
				if(snakeArr[0].row + 1 > 19){
                    die();
                    return;
                };
				snakeArr.unshift({
					"row"  : snakeArr[0]["row"] + 1,
					"col"  : snakeArr[0]["col"],
					"color": color
				});
			};

			if(tr[snakeArr[0]["row"]].getElementsByTagName("td")[snakeArr[0]["col"]].innerHTML === "☆"){
				music[2].play();
				snakeFood();
				span[0].innerHTML = score += 1;
				if(sessionStorage.getItem("highScore") <= score){
					highScore = score;
					sessionStorage.setItem("highScore",highScore);
				};
				span[1].innerHTML = sessionStorage.getItem("highScore");
			}else{
				snakeArr.pop();
			};

			renderSnake(snakeArr);
			setTimeout(timers,interval)
		},interval);

        function snakeFood(){
        	for(let i = 0;i < 20; i++){
                for (let j = 0; j < 20; j++){
                    tr[i].getElementsByTagName("td")[j].innerHTML = "";
                };
            };

            do{ 
                var lock = false;
                var x = parseInt(Math.random()*20);
                var y = parseInt(Math.random()*20);
                for(let i = 0;i < snakeArr.length;i++){
                    if(snakeArr[i].row === x && snakeArr[i].col === y){
                        lock = true;
                    };
                };
            }while(lock);
            tr[x].getElementsByTagName("td")[y].innerHTML = "☆";
        }
        snakeFood();
	</script>
</body>
</html>
```