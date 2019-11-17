(function(){
	window.Hero = function(){
		this.width = 92;
		this.height = 112;
		// 跳的时候显示的图片
		this.jumpPic = 1;
		// 不跳的时候跑步的锁
		this.lock = true;
		// 二级跳翻身动作的锁
		this.dblock = false;
		// 二级跳的图片
		this.dbjump = 0;
		// 用来二级跳的时候改变二次跳跃高度
		this.dir = true;
		this.music = true;
		// 双击连跳事件和单机连跳事件绑定

		this.index = 0;
		this.idy = 0;
		this.idx = -46;
		this.k = {vx:8,vy:15,dbjump:0,jumpH:-80};//x,y表示坐标   半径r  加速度g 速度vx 
		this.animate = true;
	}
	Hero.prototype.render = function(){
		game.ctx.drawImage(game.Pic["hero"],this.dbjump * this.width + this.jumpPic * this.width * (2 + this.index),this.jumpPic * this.height,this.width,this.height,this.idx,game.height * .761 - this.height*0.5 + this.idy,this.width*0.5,this.height*0.5);
	}
	Hero.prototype.update = function(){
		if(this.animate){
			// 入场动画this.idx为负，这里就不能执行了。
			// if(this.idx <= 35){
			// 	this.idx = 35;
			// }
			// this.idx -= -this.k.vx*0.5;
		}else{
			// 脚步声关掉
			ado[1].pause();
			// 跳的时候更改显示的图片
			// 跳的时候锁定跳的动作,两个动作一起
			this.jumpPic = 0;
			this.lock = false;
			// 图片跳的时候不需要改变水平方向的距离
			// this.idx -=this.k.vx;
			// 改变信号量让人物上下运动
			// 必须拿出来，不然在空中点三下，四下。就没人操作信号量了。
			this.idy -=this.k.vy;
            if(this.k.dbjump == 1){
				if(this.music){
					// 跳的时候音乐
					ado[2].play();
				}
				this.music = false;
            	this.ondblock1 = true;
            	this.ondblock2 = false;
            }
            if(this.k.dbjump == 2){
            	if(this.dir){
					// 只改变一次跳跃的高度，完美解决
	        		this.k.jumpH = this.idy - 80;
				}
				// 二级跳当它上升的时候继续上升，下落的时候二级跳反向上升
				// 方法就是判断下一帧的改变量是正还是负
				if(this.dir){
					if(this.k.vy < 0){
					// 正在下落，改变
					this.k.vy=-this.k.vy;
					ado[2].play();
					}else{
						// 正在上升起跳, 就不改变
						this.k.vy=this.k.vy;
						ado[2].play();
					}
				}
            	console.log(this.k.jumpH)
            	this.ondblock1 = false;
            	this.ondblock2 = true;
            	this.ondblock = true;
            	this.dir = false;
            	// 二级跳翻身动作的锁
            	this.dblock = true;
            	// 更改第二次跳的高度
            	// console.log(this.idy);
            }
            // 此处不能双击连续双跳
            if(this.ondblock1){
	            if(this.idy <= this.k.jumpH){
					// this.k.vy负15
	                this.k.vy=-this.k.vy;
	                // console.log(this.idy <= this.k.jumpH);
	            }
            }
			if(this.ondblock2){
				if(this.idy <= this.k.jumpH){
					this.k.vy=-this.k.vy;
				}
			}
            // 落地成功
   			if(this.idy > 0){
   				// 脚步声打开
				ado[1].load();
				ado[1].play();
   				// 跳的动作完成打开锁，继续跑步
				this.lock = true;
				this.jumpPic = 1;
				// 二级跳翻身动作的锁
				this.dblock = false;
				//二级跳的图片
				this.dbjump = 0;
				this.animate = true;
				this.k.dbjump = 0;
				this.idy = 0;
				this.k.jumpH = -80;
				this.k.vy=-this.k.vy;
				//二级跳完成打开，下落在跳的动作
				this.dir = true;
				this.music = true;
			}
		}
		// 没有跳的时候，在跑步的图片
		if(this.lock){
			this.index++;
			if(this.index > 2){
				this.index = 0;
			}
		}
		// 二级跳的翻身动作图
		if(this.dblock){
			// console.log("二级跳的图片")
			this.dbjump++;
			if(this.dbjump > 6){
				this.dbjump = 2;
			}
		}
	}
	Hero.prototype.jump = function(){
		this.animate = false;
	}
	Hero.prototype.back = function(){
		this.animate = false;
	}
})();