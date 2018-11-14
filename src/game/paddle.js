function Paddle(x, y, w, h, controls){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;

	this.defaults = {
		y: y,
	};

	this.dy = PLAYER_SPEED;

	this.controls = controls;

	this.update = function(dt){
		if(keyIsDown(controls['up'])){
			this.y += -this.dy * dt;
			this.y = max(this.y, this.h/2);
		}else if(keyIsDown(controls['down'])){
			this.y += this.dy * dt;
			this.y = min(this.y, height - this.h/2);			
		}	
	}

	this.reset = function(){
		this.y = this.defaults['y'];
	}

	this.render = function(){
		push();

		noStroke();
		fill(255);
		rect(this.x - this.w/2, this.y - this.h/2, this.w, this.h);

		pop();
	}
}