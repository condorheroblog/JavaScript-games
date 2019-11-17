(function(){
	window.Starscore = function Starscore(){
		this.StarWidth = 24;
		this.starHeight = 44;
		this.scoreWidth = 21;
		this.scoreHeight = 24;
		this.wallscore = 0;
	}
	Starscore.prototype.init = function(){
		game.ctx.font="bold 32px 微软雅黑";
		game.ctx.fillStyle="white";
		game.ctx.drawImage(game.Pic["starfood"],20,20,game.Startfood.starWidth * 0.5,game.Startfood.starWidth * 0.5);
		this.starscore = localStorage.getItem("starscore");
		game.ctx.fillText(this.starscore,30 + game.Startfood.starWidth * 0.5 ,55);
		// game.ctx.drawImage(game.Pic["star2"],70 + game.Startfood.starWidth * 0.5,25,this.starWidth * 0.8,this.starHeight * 0.8);
		// ,this.scoreWidth,this.scoreHeight
		// game.ctx.drawImage(game.Pic["score" + this.wallscore],game.width / 2,game.height * 0.12);
		game.ctx.beginPath();
		game.ctx.font="bold 42px 微软雅黑";
		game.ctx.fillStyle="red";
		game.ctx.fillText(this.wallscore,game.width / 2,game.height * 0.18);
		game.ctx.closePath();
		// 屏幕下方绘制的矩形有黑色填充。防止上面的覆盖
		game.ctx.fillStyle="black";
	}
})();