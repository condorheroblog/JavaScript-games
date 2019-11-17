(function(){
	window.Startfood = function Startfood(){
		// game.starArr.push(this);
		this.starWidth = 80;
		this.starHeight = 78;
		this.rotate = 0;
	}
	Startfood.prototype.render = function(random){
		var Herox = game.Hero.idx + game.Hero.width * 0.5 -10;
		// 以下是星星旋转代码
		this.rotate++;
		game.ctx.save();
		// console.log(game.wall[0]);
		game.ctx.translate(game.wall[0].idx + game.wall[0].width * 0.5 / 2,game.wall[0].idy - game.wall[0].space + game.wall[0].space / 2 - game.wall[0].width * 0.5 / 2 + game.wall[0].width * 0.5 / 2);
		game.ctx.rotate(this.rotate);
		// 星星的渲染是在障碍物的数组里面进行的，一个星星一对障碍物，要想星星随机出现，
		// 只要随即一个范围内的数，看看这个数是不是与你自己给定的数相等，相等就出现，这样就能造成随机的效果
		// 如何随机输出一个数，绝妙办法是绑定在障碍物上。通过game拿到在这里渲染
		if(game.wall[0].random == 1){
		game.ctx.drawImage(game.Pic["starfood"],0,0,this.starWidth,this.starHeight,-game.wall[0].width * 0.5 / 2,-game.wall[0].width * 0.5 / 2,game.wall[0].width * 0.5,game.wall[0].width * 0.5);
		// 星星加分的地方,Herox在上面
		if(Herox > game.wall[0].idx && Herox < game.wall[0].idx + game.wall[0].width * 0.5 && game.wall[0].idy - game.wall[0].space < game.height * .761 - game.Hero.height*0.5 + game.Hero.idy && game.height * .761 - game.Hero.height*0.5 + game.Hero.idy < game.wall[0].idy){
			// 吃到星星让星星消失
			game.wall[0].random = 0;
			// 星星分数加一
			game.Starscore.starscore++;
			localStorage.setItem("starscore",game.Starscore.starscore);
			}
		}
		game.ctx.restore();
	}
})();