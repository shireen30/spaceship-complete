var bgimage;
var spaceshipimage;
var spaceship;
var meteorimage;
var meteor;
var meteorGroup;
var star, starGroup, starImage;
var bg;
var score=0;
var asteroid, asteroidimage;

const PLAY = 1;
const END = 0;
var gameState = PLAY;

var bgSound,starSound,gameOverSound;


function preload(){
bgimage=loadImage("assets/background.jpg");
spaceshipimage=loadImage("assets/spaceship.png");
meteorimage=loadImage("assets/obstacle1.png");
starImage=loadImage("assets/star.png");
asteroidimage=loadImage("assets/obstacle2.png");
bgSound=loadSound("assets/space_sound.mp3");
starSound=loadSound("assets/bonus.wav");
gameOverSound=loadSound("assets/gameover.wav");
}



function setup() {
  createCanvas(900, 600);
  bg=createSprite(450,300,900,600);
  bg.addImage(bgimage);
  bg.scale=1.2
  bg.velocityY=1;
  spaceship=createSprite(200,500,30,50);
  spaceship.addImage(spaceshipimage);
  spaceship.scale=0.3;
  spaceship.debug=false;
  spaceship.setCollider("rectangle", 0,0, 200,300);

 meteorGroup=createGroup();
 starGroup=createGroup();

 bgSound.loop();

  
}

function draw() {
  background(0);

if (gameState === PLAY){
  if(keyIsDown(LEFT_ARROW) && spaceship.x>20){
    spaceship.x=spaceship.x-4
  }

  if(keyIsDown(RIGHT_ARROW) && spaceship.x<870){
    spaceship.x+=4
  }


  if(bg.y>300){
    bg.y=200;
}

if(starGroup.isTouching(spaceship)){
  score+=10;
  starSound.play();
  starGroup.destroyEach();
}

spawnMeteors();
spawnStars();

if (meteorGroup.isTouching(spaceship)){
  gameState=END;
  gameOverSound.play();
  bgSound.stop();
}
drawSprites();
}
else if (gameState === END){
  textSize(40);
  fill("red")
  text("GAME OVER", 350,300);
}

image(starImage,680,50,35,35)
  textSize(30);
  fill("white")
  text("Score:"+score,700,50)
  console.log(mouseX)
}

function spawnMeteors(){
  if (frameCount % 60 === 0){
    meteor=createSprite(Math.round(random(100,800)),100);
    if (score>=50){
      meteor.addImage(asteroidimage)
    }
    else{
     meteor.addImage(meteorimage)
    }
    meteor.scale=0.2;
    meteor.velocityY=6;
    meteorGroup.add(meteor);
    meteor.debug=false;
  } 
  
}

function spawnStars(){
  if (frameCount % 90 === 0){
    star=createSprite(Math.round(random(100,800)),100);
    star.addImage(starImage);
    star.scale=0.2;
    star.velocityY=4;
    starGroup.add(star);
  }
}


