(function(){
	window.Hoversheet = function Hoversheet(){
		this.idx = 0;
		this.width = 284;
		this.height = 332;
	}
	Hoversheet.prototype.render = function(){
		this.idx -= 10;
		game.ctx.drawImage(game.Pic["how-sheet0"],this.idx + game.width / 2 + game.width * 0.15,game.height / 2 - game.width * 0.02,this.width * 0.5,this.height * 0.5);
	}
})();