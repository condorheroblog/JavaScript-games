(function(){
	window.Diehero = function Diehero(){
		this.dieleft = 0;
		this.width = 233;
		this.height = 86;
	}
	Diehero.prototype.changpic = function(){
		var self = this;
		var timer = setInterval(function(){
			self.renderdie();
			self.dieleft++;
			game.Hero.idy -=1;
			if(self.dieleft > 4){
				clearInterval(timer)
			}
			if(game.Hero.idy < 0){
				game.Hero.idy = 0;
			}
		},110);
	}
	Diehero.prototype.renderdie = function(){
		// 为了Herodie时的特效，必须时刻清屏，且保持画面不动
		game.ctx.clearRect(0,0,self.width,self.height);
		game.Bg.render();
		game.Tree.render();
		game.Grass.render();
		// 障碍物的渲染
		for(var i = 0;i < game.wall.length;i++){
			// console.log(game.wall.length);
			game.Startfood.render();
			game.wall[i].render();
		}
		game.Starscore.init();
		game.ctx.drawImage(game.Pic["diehero"],this.dieleft * 92,0,92,112,8,game.height * .750 - game.Hero.height*0.5 + game.Hero.idy + game.Hero.idy,game.Hero.width*0.5,game.Hero.height*0.5);
		// 判断是否有五个星，在继续游戏
		if(game.Starscore.starscore - 5 >= 0){
			game.ctx.drawImage(game.Pic["relifebg"],game.width / 4,game.height / 2 - game.height*0.077,game.width*0.5,game.height*0.16);
			game.ctx.drawImage(game.Pic["relife"],game.width / 4 + game.width * 0.09,game.height / 2,(game.width*0.5)*.6,(game.height*0.16)*.4);
			game.myCanvas.addEventListener("click",this.norelife,false);
		}else{
			this.hint();
		}
	}
	// 吃到五个星die，是否复活
	Diehero.prototype.norelife = function(event) {
		var x = event.offsetX;
		var y = event.offsetY;
		// 拿到鼠标的坐标
		// console.log(x,y);
		if(game.width/4 + (game.width*0.5)*.83 < x && x < game.width / 4 + game.width*0.5 && y > game.height / 2 - game.height*0.077&& y < game.height / 2 - game.height*0.077 + (game.height*0.16)*0.34){
			// 点击红叉退出
			game.Diehero.hint();
			// console.log("succes");
		}
		// 点击go后复活，并重启定时器
		if(game.width/4 + (game.width*0.5)*.52 < x && x < game.width / 4 + (game.width*0.5)*0.77 && y > game.height / 2 - game.height*0.077 + (game.height*0.16)*0.55&& y < game.height / 2 - game.height*0.077 + (game.height*0.16)*0.88){
				// 打开背景音乐
				ado[0].play();
				game.Hero.idx = 40;
				game.Starscore.starscore -= 5;
				localStorage.setItem("starscore",game.Starscore.starscore);
				game.timer = setInterval(function(){
				game.ctx.clearRect(0,0,game.width,game.height);
				// 生产出来障碍物
				frame++;
				if(frame % 45 == 0){
					new Wall();
				}
				game.Bg.render();
				game.Tree.render();
				game.Tree.update();
				game.Grass.update();
				game.Grass.render();
				// 必须把Hero放在障碍物的下面这样才能清除图片，在放置死亡图片
				game.Hero.render();
				game.Hero.update();
				// 障碍物的渲染
				for(var i = 0;i < game.wall.length;i++){
					game.Startfood.render();
					game.wall[i].render();
					game.wall[i].update();

					// 障碍物下面的引导跳跃hover
					game.Hover.render();
					// 死亡检测
					game.wall[i].godie();
				}
				// 星星的分数，也就是星星的数量
				game.Starscore.init();
			},80);
		}
		// reset重新开始游戏
		if(game.width*0.57 < x && x < game.width*0.57 + game.Diehero.width*0.5 &&  y > game.height * 0.78 && y < game.height * 0.78 + game.Diehero.height*0.5){
			// 类似F5刷新当前页面
			location.reload();
			// console.log("reset重新开始游戏");
		}
		// home回到首页
		if(game.width*0.15 < x && x < game.width*0.15 + game.Diehero.width*0.5 &&  y > game.height * 0.78 && y < game.height * 0.78 + game.Diehero.height*0.5){
			console.log("回到首页");
		}
	}
	Diehero.prototype.hint = function(){
		ado[5].play();
		game.ctx.drawImage(game.Pic["score"],game.width*0.15,game.height * 0.19,game.width*0.67,game.height*0.56);
		game.ctx.fillStyle = "red";
		// 填充的分数
		game.ctx.fillText(game.Starscore.wallscore,game.width*0.15 + (game.width*0.67)*0.45,game.height * 0.19 + (game.height*0.56)*0.55);
		var highscore = localStorage.getItem("game.Starscore.highscore");
		game.ctx.fillText(highscore,game.width*0.15 + (game.width*0.67)*0.45,game.height * 0.19 + (game.height*0.56)*0.85);
		game.ctx.drawImage(game.Pic["home"],game.width*0.15,game.height * 0.78,this.width*0.5,this.height*0.5);
		game.ctx.drawImage(game.Pic["restart"],game.width*0.57,game.height * 0.78,this.width*0.5,this.height*0.5);
		game.ctx.fillStyle = "black";
		// 重新开始
		game.myCanvas.addEventListener("click",this.norelife,false);
	}
})();