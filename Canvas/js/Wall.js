(function(){
	window.Wall = function Wall(){
		// 完美的想法星星随机出现,只有天才才看懂的代码
		this.random = parseInt(Math.random() * 3);
		this.width = 40;
		this.height = game.height;
		// 上下之间的距离
		this.space = 100;
		this.down = parseInt(Math.random() * 50) + 50;
		game.wall.push(this);
		// 障碍物到视图最左边的距离和到最上边的距离
		this.idx = game.width;
		// 随机下面障碍物的y值，必须保证小人的一连跳和二连跳与障碍物的高相适应
		this.idy = game.height * 0.75 - this.down;
	}
	Wall.prototype.render = function(){
		// 下边障碍物
		game.ctx.drawImage(game.Pic["wall1"],0,0,this.width,this.height,this.idx,this.idy,this.width * 0.5,this.height * 0.4);
		// 上边障碍物障碍物的高为this.idy-this.space;它的上y值为零
		game.ctx.drawImage(game.Pic["wall2"],0,0,this.width,this.height,this.idx,0,this.width * 0.5,this.idy - this.space);
	}
	Wall.prototype.update = function(){
		// 更改障碍物的图片让其不断往前来，数值越大速度越快
		this.idx -= 10;
		// 改变障碍物的数组让小人跳过去的的障碍物消失
		if(this.idx <= -this.width){
			game.wall.splice(game.wall.indexOf(this),1);
		}
	}
	// 人与柱子障碍物接触进行死亡判断
	Wall.prototype.godie = function(){
		// 碰撞检测范围必须保证game.Hero.idx=40,此时的game.Hero.idx + game.Hero.width * 0.5 - 20恰好在范围[69,89]之间
		// 检测成功game.Hero.idx=40能保证头正好贴着障碍物
		var Herox = game.Hero.idx + game.Hero.width * 0.5 -10;
		if(Herox > this.idx && Herox < this.idx + this.width * 0.5 && this.idy < game.height * .761 - game.Hero.height*0.5 + game.Hero.idy || Herox > this.idx && Herox < this.idx + this.width * 0.3 && this.idy - (game.Hero.height*0.5)*0.8 < game.height * .761 - game.Hero.height*0.5 + game.Hero.idy){
			// die音乐
			ado[0].pause();
			ado[1].pause();
			ado[4].load();
			ado[4].play();
			// 放置死亡的图片
			game.Hero.idx = 1000000;
			game.Diehero.changpic();
			// 延迟会影响到relife
			setTimeout(function(){
				clearInterval(game.timer); 
			},110);
		}else if(Herox > this.idx && Herox < this.idx + this.width * 0.5 && this.idy - this.space > game.height * .761 - game.Hero.height*0.5 + game.Hero.idy){
			// die音乐
			ado[0].pause();
			ado[1].pause();
			ado[4].load();
			ado[4].play();
			// 先移除以前的，放置死亡的图片
			game.Hero.idx = 1000000;
			game.Diehero.changpic();
			// 延迟会影响到relife
			setTimeout(function(){
				clearInterval(game.timer); 
			},110);
		}else if(Herox > this.idx && Herox < this.idx + this.width * 0.3 && this.idy - this.space < game.height * .761 - game.Hero.height*0.5 + game.Hero.idy && game.height * .761 - game.Hero.height*0.5 + game.Hero.idy < this.idy){
			// 跳过障碍物红色数字加分
			game.Starscore.wallscore++;
			// 存储本地获取最高分
			var highscore = localStorage.getItem("game.Starscore.highscore");
			highscore = highscore > game.Starscore.wallscore ? highscore: game.Starscore.wallscore;
			localStorage.setItem("game.Starscore.highscore",highscore);
			ado[3].load();
			ado[3].play();
		}
	}
})();