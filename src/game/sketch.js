var ball;
var p1, p2;

// CONFIGS
const BALL_VSPEED = 100;
const BALL_HSPEED = 150;
const BALL_RADIUS = 7;
const PADDLE_H = 80;
const PADDLE_W = 20;
const PADDLE_WALL_DISTANCE = 80;
const GAME_SPEEDUP_FACTOR = 1.03;
const PLAYER_SPEED = 200;

var points = {
    first: 0,
    second: 0
};

function setup() {
    let canvas = createCanvas(640, 480);
    angleMode(DEGREES);

    ball = new Ball(width/2, height/2, BALL_RADIUS);

    p1 = new Paddle(PADDLE_WALL_DISTANCE, height/2, PADDLE_W, PADDLE_H,
        {
            up: 87, //w
            down: 83 //s
        });
    p2 = new Paddle(width - PADDLE_WALL_DISTANCE, height/2, PADDLE_W, PADDLE_H,
        {
            up: 38, //UP
            down: 40 //DOWN
        });
}

function draw() {
    let deltaTime = 1/frameRate();
    if(isFinite(deltaTime)){        
        update(deltaTime);
    }
    render();

}

function update(dt){
    ball.update(dt);
    p1.update(dt);
    p2.update(dt);

    if(ball.collides(p1)){
        ball.bounce(p1);
    }
    if(ball.collides(p2)){
        ball.bounce(p2);
    }

    // CONTROLLER

    if(ball.x >= width){
        reset();
        points['first']++;
    }
    if(ball.x <= 0){
        reset();
        points['second']++;
    }

    if(keyIsDown(82)){
        reset();
        points = {
            first: 0,
            second: 0
        };
    }

}

function reset(){
    ball.reset();
    p1.reset();
    p2.reset();
}

function render(){
    background(0);
    ball.render();
    p1.render();
    p2.render();

    textAlign(CENTER);
    textSize(height/8);
    fill(255);
    text(points['first']+' : '+points['second'], width/2, height/6);
}

/**
 * Get random number between [a, b)
 */
function randInt(b, a = 0) { return a + Math.floor(Math.random() * (++b - a)) }
