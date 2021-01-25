var monkey, monkey_running;
var ground;
var banana, bananaImage, obstacle, obstacleImage;
var bgImage;
var bananaGroup, obstacleGroup;
var randY;
var FoodGroup, obstacleGroup;
var score;
var END = 0;
var PLAY = 1;
var gameState = PLAY;

function preload() {
	monkey_running = loadAnimation('sprite_0.png', 'sprite_1.png', 'sprite_2.png', 'sprite_3.png', 'sprite_4.png', 'sprite_5.png', 'sprite_6.png', 'sprite_7.png', 'sprite_8.png');

	bananaImage = loadImage('banana.png');
	obstacleImage = loadImage('obstacle.png');

	bgImage = loadImage('backgorund.jpeg');
}

function setup() {
	createCanvas(400, 400);
	monkey = createSprite(60, 350, 20, 20);
	monkey.addAnimation('monkey', monkey_running);
	monkey.scale = 0.1;

	ground = createSprite(300, 400, 600, 20);

	bananaGroup = new Group();
	obstacleGroup = new Group();
}
function monkeyFunc() {
	monkey.collide(ground);
	monkey.velocityY = monkey.velocityY + 0.5;
	if (keyDown('space') && monkey.y > 358) {
		monkey.velocityY = -15;
	}
}

function monkeyMove() {
	//To make the monkey move forwards
	if (monkey) {
		monkey.velocityX = 4;
		ground.velocityX = 4;
		camera.position.x += 4;
	}
}

function bananaFunc() {
	if (camera.position.x % 180 === 0) {
		randY = Math.round(random(120, 200));
		banana = createSprite(camera.position.x * 2, randY, 20, 20);
		banana.addImage('banana', bananaImage);
		//banana.velocityX = -4;
		banana.scale = 0.1;
		banana.lifetime = 400;
		bananaGroup.add(banana);
		console.log('minion food');
	}

	if (bananaGroup.isTouching(monkey)) {
		bananaGroup.destroyEach();
	}
}

function obFunc() {
	if (camera.position.x % 300 === 0) {
		obstacle = createSprite(camera.position.x * 2, 370, 20, 20);
		//obstacle.velocityX = -5;
		obstacle.addImage('obImage', obstacleImage);
		obstacle.scale = 0.1;
		obstacle.lifetime = 400;
		obstacleGroup.add(obstacle);
	}
	if (obstacleGroup.isTouching(monkey)) {
		obstacleGroup.setLifetimeEach(-1);
		bananaGroup.setLifetimeEach(-1);
		obstacleGroup.setVelocityXEach(0);
		bananaGroup.setVelocityXEach(0);
	}
}

function survTime() {
	if (!monkey.isTouching(obstacleGroup)) {
		score = frameCount;
	}
	stroke('red');
	fill('red');
	text('Survival Time: ' + score, camera.position.x, 20);
}

function draw() {
	background(bgImage);
	if (monkey.isTouching(obstacleGroup) || gameState === END) {
		obstacleGroup.setVelocityXEach(0);
		bananaGroup.setVelocityXEach(0);
		monkey.velocityX = 0;
		ground.velocityX = 0;
		console.log('Hm...');
		gameState = END;
		background('gray');
		textAlign(CENTER, CENTER);
		fill('red');
		textSize(20);
		text('Game Over! Your score was ' + score, camera.position.x, 200);
	}

	if (gameState === PLAY) {
		monkeyFunc();
		monkeyMove();
		bananaFunc();
		obFunc();
		survTime();
	}
	monkey.collide(obstacleGroup);
	monkey.collide(ground);

	drawSprites();
}
