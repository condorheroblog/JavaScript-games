(function(){
	window.Bg = function Bg(){
		this.width = 564;
		this.height = 899;
	}
	Bg.prototype.render = function(){
		game.ctx.drawImage(game.Pic["bg01"],0,0,game.width,game.height);
	}
})();