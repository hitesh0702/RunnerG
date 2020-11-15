var PLAY = 1;
var END  = 0;

 var runner, ri, jri_jumping;
var enemy, ei;
var bi, track,ivisibletrack, ti, gamesound;
var laser, li, lgroup;
var obstacle, oi, ogroup;
var jumpsound;
var gameState = PLAY;
var gI, gameover;
var restart, ri,restarti;
var score = 0;





function preload(){
  ri = loadAnimation(
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/redNinja/run00.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/redNinja/run01.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/redNinja/run02.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/redNinja/run03.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/redNinja/run04.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/redNinja/run05.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/redNinja/run06.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/redNinja/run07.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/redNinja/run08.png',     
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/redNinja/run09.png'    
);
  
  ei = loadAnimation(
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/robot/run00.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/robot/run01.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/robot/run02.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/robot/run03.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/robot/run04.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/robot/run05.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/robot/run06.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/robot/run07.png'   
);
  
  jri_jumping = loadAnimation(
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/redNinja/jump00.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/redNinja/jump01.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/redNinja/jump02.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/redNinja/jump03.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/redNinja/jump04.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/redNinja/jump05.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/redNinja/jump06.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/redNinja/jump07.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/redNinja/jump08.png',     
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/redNinja/jump09.png'    
);

  
  
  bi = loadImage('https://la-wit.github.io/build-an-infinite-runner/build/images/environments/industrialBackground.png');
ti = loadImage('https://la-wit.github.io/build-an-infinite-runner/build/images/environments/industrialPlatform.png');
gameFont = loadFont('https://la-wit.github.io/build-an-infinite-runner/build/fonts/ARCADE_R.TTF');

gamesound = loadSound("game.mp3");
jumpsound = loadSound('https://la-wit.github.io/build-an-infinite-runner/build/sounds/jump07.mp3');
  li =loadImage("laser.svg");
   oi =loadImage("ob.svg") ;     
 restarti=  loadImage("restart.png")
gi = loadImage("gameover.png");
  
}

function setup() {
  createCanvas(590, 400);
  runner = createSprite(290,250,20,20);
  runner.addAnimation("running" ,ri);
   runner.addAnimation("jumping" ,jri_jumping)
  runner.scale  = 1.3;
    runner.frameDelay = 2;
  enemy = createSprite(30,250,20,20);
  enemy.addAnimation("running", ei);
  enemy.frameDelay = 2;
  track = createSprite(400,390,20,20);
  track.velocityX =-5; 
  track.addImage(ti);
  track.scale = 0.7
  invisibletrack = createSprite(30,278,600,5);
  invisibletrack.visible = false;
  enemy.setCollider("rectangle",0,0,90,enemy.height);

   runner.setCollider("rectangle",0,0,30,enemy.height);
   
  gameover = createSprite(300,100);
gameover.addImage(gi);
  gameover.scale = 0.9;
  
  restart = createSprite(300,240);
  restart.addImage(restarti);
  restart.scale = 0.5;
  restart.visible = false;
  gameover.visible = false;
    lgroup = new Group();
  ogroup = new Group();
}

function draw() {
  background(bi);
  
  if (gameState===PLAY){
     text("Score: "+ score, 500,50);
     score = score + Math.round(getFrameRate()/60);
      track.velocityX =-5; 
    runner.visible = true;
    enemy.visible = true;
     restart.visible = false;
  gameover.visible = false;
    lasers();
  obstacles();
if(track.x<199){
  track.x = 400;
}
  if(keyDown("space")&& runner.y >= 235) {
        runner.velocityY = -12;
    
        jumpsound.play();
    
    }
 
   if(enemy.isTouching(ogroup)){
     enemy.velocityY = -12;
   }
  if(runner.isTouching(ogroup) || runner.isTouching(lgroup)){
    gameState = END;
     
   }
  }
  if(gameState===END){
    gameover.visible = true;
    restart.visible = true;
    
  score = 0; 
    
 
    runner.visible  = false;
    enemy.visible = false;
     
     if(mousePressedOver(restart)) {
      reset();
    }
    track.velocityX = 0;
    
    ogroup.destroyEach();
    
    lgroup.destroyEach();
     
    
  }
  

  
    runner.velocityY = runner.velocityY + 0.9;
  enemy.velocityY = enemy.velocityY + 0.9;
  

  drawSprites();
   runner.collide(invisibletrack); 
  enemy.collide(invisibletrack); 
}
 function lasers(){
   if(frameCount%80===0){
   laser = createSprite(45,254,20,20);
  laser.addImage(li);
  laser.scale = 0.1;
  laser.velocityX = 10  ;
     laser.lifeTime = 400;
     lgroup.add(laser);
   }
 }
function obstacles(){
 if (frameCount % 100 === 0){
    obstacle = createSprite(600,265,10,40);
   obstacle.velocityX = -6
   obstacle.addImage(oi);
  obstacle.scale= 0.5;
   obstacle.lifeTime = 200;
   ogroup.add(obstacle);
   
   
   
   
   
   
 }
}
function reset() {
  gameState = PLAY;
 
  
}

