(function(){
	window.Game = function Game(){
		 this.myCanvas = document.querySelector("canvas");
		this.ctx = this.myCanvas.getContext("2d");
		this.width = document.documentElement.clientWidth;
		this.height = document.documentElement.clientHeight;
		if(this.width > 414){
			this.width = 414;
		}else if(this.width < 360){
			this.width =360;
		}
		if(this.height > 812){
			this.height = 812;
		}else if(this.height < 640){
			this.height = 640;
		}
		this.myCanvas.style.marginLeft = -this.width / 2 + "px";
		this.myCanvas.width = this.width;
		this.myCanvas.height = this.height;
		this.init();
		this.Bg = new Bg();
		this.Tree = new Tree();
		this.Grass = new Grass();
		this.Hero = new Hero();
		this.Diehero = new Diehero();
		// 星星的分数，也就是星星的数量
		this.Starscore = new Starscore();
		// 小星星
		this.Startfood = new Startfood();
		//用来放障碍物的数组
		this.wall = [];
		this.bindTap();
		// hero入场
		this.lock  = false;
		// hoversheet
		this.Hover = new Hoversheet;
	}
	Game.prototype.init = function(){
		// 图片的JSON
		this.Pic = {
			"bg01" : "bg.png",
			 "grass" : "grass.png",
			 "tree01" : "tree01.png",
			 "tree02" : "tree02.png",
			 "hero" : "hero.png",
			 "wall1" : "wall1.png",
			 "wall2" : "wall2.png",
			 "diehero" : "diehero.png",
			 "starfood" : "starfood.png",
			 "relife" : "relife.png",
			 "relifebg" : "relifebg.png",
			 "how-sheet0" : "how-sheet0.png",
			 "score" : "score.png",
			 "restart" : "restart.png",
			 "home" : "home.png"
			 // 数字图片不在需要了使用canvas文本替换的
			 // "score0" : "0.png",
			 // "score1" : "1.png",
			 // "score2" : "2.png",
			 // "score3" : "3.png",
			 // "score4" : "4.png",
			 // "score5" : "5.png",
			 // "score6" : "6.png",
			 // "score7" : "7.png",
			 // "score8" : "8.png",
			 // "star0" : "star0.png",
			 // "star1" : "star1.png",
			 // "star2" : "star2.png",
			 // "star3" : "star3.png",
			 // "star4" : "star4.png",
			 // "star5" : "star5.png",
			 // "star6" : "star6.png",
			 // "star7" : "star7.png",
			 // "star8" : "star8.png",
			 // "star9" : "star9.png"
		}
		for(var k in this.Pic){
			src = this.Pic[k];
			this.Pic[k] = new Image();
			this.Pic[k].src = "./image/" + src;
		}
		var count = 0;
		for(var k in this.Pic){
			var self = this;
			this.Pic[k].onload = function(){
				count++;
				if(count == Object.keys(self.Pic).length){
					self.start();
				}
			}
		}
	}
	Game.prototype.bindTap = function(){
		var self = this;
		this.myCanvas.onclick = function(){
			game.Hero.k.dbjump++;
			self.Hero.jump();
		}
	}
	Game.prototype.start = function(){
		var self = this;
		window.frame = 0;
		this.timer = setInterval(function(){
			// 人物入场动画
			if(game.Hero.idx < 40){
				game.Hero.idx += game.Hero.k.vx;
				self.ctx.clearRect(0,0,self.width,self.height);
				self.Bg.render();
				self.Tree.render();
				self.Grass.render();
				self.Starscore.init();
				game.Hero.render();
				game.Hero.update();
				setTimeout(function(){
					self.lock = true;
				},880);
			}
			if(self.lock){
			ado[0].play();
			ado[1].play();
			// 清屏
			self.ctx.clearRect(0,0,self.width,self.height);
			// 生产出来障碍物
			frame++;
			if(frame % 45 == 0){
				new Wall();
			}
			self.Bg.render();
			self.Tree.render();
			self.Tree.update();
			self.Grass.update();
			self.Grass.render();
			// 必须把Hero放在障碍物的下面这样才能清除图片，在放置死亡图片
			self.Hero.render();
			self.Hero.update();
			// 障碍物的渲染
			for(var i = 0;i < self.wall.length;i++){
				self.Startfood.render();
				self.wall[i].render();
				self.wall[i].update();

				// 障碍物下面的引导跳跃hover
				self.Hover.render();
				// 死亡检测
				self.wall[i].godie();
			}
			// 星星的分数，也就是星星的数量
			self.Starscore.init();
			}
		},80);
	}
})();