window.onload = function(){
	var canvas =  document.getElementById('canvas'),
			context = canvas.getContext('2d'),
			WIDTH = canvas.width = document.documentElement.clientWidth,
			HEIGHT = canvas.height = document.documentElement.clientHeight,
			color = ['#f00','#ff0','#0f0','#00f'],
			direct = [1,2,3,4,5,6,7,8]


	function CircleItem(x,y){
		// x , y , r , color , direct 
		this.x = x
		this.y = y
		this.color = color[Math.floor(Math.random()*4)]
		this.r = Math.floor(Math.random()*20+ 12)
		this.speed = Math.random()*10
		this.symbol = direct[Math.floor(Math.random()*8)]
		this.angle = Math.random()
	}


		CircleItem.prototype.drawSolid = function(){
			context.beginPath()
			context.arc(this.x,this.y,this.r,Math.PI*2,false)

			context.fillStyle = this.color
			// context.fillRect(this.x,this.y,10,10)
			context.fill()
		}



		CircleItem.prototype.drawHollow = function(){

		}

		CircleItem.prototype.move = function(){
			switch(this.symbol){
				case 1:
					this.x += this.speed
					this.y += this.speed * this.angle 
					break
				case 2:
					this.y += this.speed
					this.x += this.speed * this.angle
					break
				case 3:
					this.y += this.speed
					this.x -= this.speed *this.angle
					break
				case 4:
					this.x -= this.speed
					this.y += this.speed * this.angle 
					break
				case 5:
					this.x -= this.speed
					this.y -= this.speed * this.angle
					break
				case 6:
					this.y -= this.speed
					this.x -= this.speed * this.angle
					break
				case 7:
					this.y -= this.speed
					this.x += this.speed *this.angle
					break
				case 8:
					this.x += this.speed
					this.y -= this.speed * this.angle
					break
				default:
					break
			}
			if(this.r >0.1){
				this.r -= 1
			}

		}


		canvas.onclick = function(e){
			var x = e.offsetX,
				y = e.offsetY,
				circles = []
			for(var i=0;i<30;i++){
				circles[i] = new CircleItem(x,y)
				circles[i].drawSolid()
			}
			function animate(){
				context.clearRect(0,0,WIDTH,HEIGHT)
				for(circle of circles){
					circle.move()
					circle.drawSolid()
				}

				var stop = window.requestAnimationFrame(animate)
			}
			animate()
		}

		//点击 -- 画小圈 -- 半径变大 -- 重绘 -- 直到半径为20 结束


		//点击 -- 空心圈 -- 很多实心圈 -- 向外迸发 -- 半径缩小 -- 消失

}