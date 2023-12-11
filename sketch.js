var PLAY = 1;
var END = 0;
var gameState = PLAY;

var basketball, basketball_running, basketball_collided;
var ground, invisibleGround, groundImage;

var needlegroup, needleImage;
var needle, needleImg;
var score;

var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound


function preload(){
  basketball_running = loadImage("basketball.jpg")
  
  
  groundImage = loadImage("ground2.png");
  
  //cloudImage = loadImage("cloud.png");
  
  needleImg = loadImage("needle.jpg");
  
  
   restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(600, 200);
  
  basketball = createSprite(50,100,20,50);
  basketball.addImage("running", basketball_running);
  //basketball.addImage("collided" ,basketball_collided);
  basketball.scale = 0.1;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
   gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(200,174,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  needlegroup = createGroup();
  //cloudsGroup = createGroup();
  
  console.log("Hello" + 5);
  
  basketball.setCollider("circle",0,0,40);
  basketball.debug = true
  
  score = 0;
  
}

function draw() {
  
  background(255);
  //displaying score
  text("Score: "+ score, 500,50);
  
  console.log("this is ",gameState)
  
  
  if(gameState === PLAY){
    gameOver.visible = false
    restart.visible = false
    //move the ground
    ground.velocityX = -4;
    //scoring
    score = score + Math.round(frameCount/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& basketball.y >= 100) {
        basketball.velocityY = -12;
    }
    
    //add gravity
    basketball.velocityY = basketball.velocityY + 0.8
  
    //spawn the clouds
    spawnNeedle();
  
    //spawn obstacles on the ground
    //spawnObstacles();
    
    if(needlegroup.isTouching(basketball)){
        gameState = END;
    }
  }
   else if (gameState === END) {
     console.log("hey")
      gameOver.visible = true;
      restart.visible = true;
     
      ground.velocityX = 0;
      basketball.velocityY = 0
     
      //change the basketball Image

     
      //set lifetime of the game objects so that they are never destroyed
    needlegroup.setLifetimeEach(-1);
    //cloudsGroup.setLifetimeEach(-1);
     
     needlegroup.setVelocityXEach(0);
     if(mousePressedOver(restart)) {
      reset();
    }
    // cloudsGroup.setVelocityXEach(0);
   }
  
 
  //stop basketball from falling down
  basketball.collide(invisibleGround);
  
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(needle);
              break;
      case 2: obstacle.addImage(needle);
              break;
      case 3: obstacle.addImage(needle);
              break;
      case 4: obstacle.addImage(needle);
              break;
      case 5: obstacle.addImage(needle);
              break;
      case 6: obstacle.addImage(needle);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    needle.add(obstacle);
 }
}

function spawnNeedle() {
  //write code here to spawn the needles
  if (frameCount % 60 === 0) {
     needle = createSprite(600,160,40,10);
    //needle.y = Math.round(random(10,60));
    needle.addImage(needleImg);
    needle.scale = 0.025;
    needle.velocityX = -3;
    
     //assign lifetime to the variable
    needle.lifetime = 300;
    
    //adjust the depth
    needle.depth = basketball.depth;
    basketball.depth = basketball.depth + 1;
    
    //adding needle to the group
   needlegroup.add(needle);
    }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  needlegroup.destroyEach();
  //cloudsGroup.destroyEach();
  score = 0;
}