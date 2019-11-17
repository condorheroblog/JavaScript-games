(function(){
	window.Tree = function(){
		this.width = 1440;
		this.height = 400;
		this.idx1 = 0;
		this.idx2 = 0;
	}
	Tree.prototype.render = function(){
		game.ctx.drawImage(game.Pic["tree02"],this.idx2,game.height * .7669 - this.height * 0.5,this.width * 0.5,this.height * 0.5);
		game.ctx.drawImage(game.Pic["tree02"],this.width + this.idx2,game.height * .7669 - this.height * 0.5,this.width * 0.5,this.height * 0.5);
		game.ctx.drawImage(game.Pic["tree01"],0 + this.idx1,game.height * .77 - this.height * 0.5,this.width * 0.5,this.height * 0.5);
		game.ctx.drawImage(game.Pic["tree01"],this.width * 0.5 + this.idx1,game.height * .7669 - this.height * 0.5,this.width * 0.5,this.height * 0.5);
	}
	Tree.prototype.update = function(){
		this.idx1 -= 3;
		this.idx2 -= 1;
		if(Math.abs(this.idx1) > this.width * 0.5){
			this.idx1 = 0;
		}
		if(Math.abs(this.idx2) > this.width * 0.5){
			this.idx2 = 0;
		}
	}
})();