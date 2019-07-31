(function(){
	window.Grass = function(){
		this.width = 240;
		this.height = 40;
		this.idx = 0;
	}
	Grass.prototype.render = function(){
		game.ctx.drawImage(game.Pic["grass"],this.idx,game.height * 0.79 - this.height,this.width,this.height * 0.5);
		game.ctx.drawImage(game.Pic["grass"],this.width + this.idx,game.height * 0.79 - this.height,this.width,this.height * 0.5);
		game.ctx.drawImage(game.Pic["grass"],this.width * 2 + this.idx,game.height * 0.79 - this.height,this.width,this.height * 0.5);

		game.ctx.fillRect(0,game.height * .75,game.width,200);
	}
	Grass.prototype.update = function(){
		this.idx -= 6;
		if(Math.abs(this.idx) > this.width){
			this.idx = 0;
		}
	}
})();