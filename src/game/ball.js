function Ball(x, y, r){

	this.x = x;
	this.y = y;
	this.r = r;
	this.dx = 0;
	this.dy = 0;
	
	this.defaults = {
		x: x,
		y: y
	};

	this.update = function(dt){
		if(this.y - this.r < 0){
			this.dy *= -1;
			this.y = 0 + this.r;
		}
		if(this.y + this.r > height){
			this.dy *= -1;
			this.y = height - this.r;
		}
		this.x += this.dx * dt;
		this.y += this.dy * dt;
	}

	this.collides = function(paddle){

		// AABB collision
		if( this.x - this.r > paddle.x + paddle.w/2 || paddle.x - paddle.w/2 > this.x + this.r ){
			return false;
		}

		if( this.y > paddle.y + paddle.h/2 || paddle.y > this.y + paddle.h/2 ){
			return false;
		}

		return true	
	}

	this.revert = function(){
		this.dx *= -GAME_SPEEDUP_FACTOR;
		this.dy = randInt(BALL_VSPEED*0.3, BALL_VSPEED) * Math.sign(this.dy);
	}

	this.bounce = function(paddle){
		this.revert();
		this.x = paddle.x + (paddle.w/2 + this.r) * Math.sign(this.dx);
	}

	this.reset = function(){
		this.x = this.defaults['x'];
		this.y = this.defaults['y'];
		this.dx = random() < 0.5 ? BALL_HSPEED : -BALL_HSPEED;
		this.dy = randInt(-BALL_HSPEED, BALL_HSPEED);
	}

	this.render = function(){
		push();

		noStroke();
		fill(255);
		ellipse(this.x, this.y, this.r * 2, this.r * 2);
		
		pop();
	}



}