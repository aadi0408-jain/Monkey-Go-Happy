var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;  
var FoodGroup, obstacleGroup;
var score;
var bg;
var invisibleGround;
var time = 0;
var r;

function preload(){
  
  monkey_running =            loadAnimation("sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
  background = loadImage("bg.png");
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
  
  monkey_stopped = loadAnimation("sprite_0.png");
  
  gameOverImg = loadImage("gameOver.png");
  
  resetImg = loadImage("reset.jpg");
  
  death = loadSound("death.mp3");
  
}

function setup() {
createCanvas(600, 200);
  
score = 0;
  
bg = createSprite(300, 100, 400, 200);
bg.addImage(background);
  
invisibleGround = createSprite(200, 197, 400, 10);
invisibleGround.visible = false;
  
monkey = createSprite(100, 162,10,40);
monkey.addAnimation("running",monkey_running);
monkey.scale = 0.08;
  
foodGroup = createGroup();
obstacleGroup = createGroup();
  
gameOver = createSprite(300, 100);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.5;
  
}


function draw() {
  
  if (gameState === PLAY){

    gameOver.visible = false;

    invisibleGround.velocityX = -(4 + 3* score/100);
    
    if(keyDown("space")&& monkey.y >= 100) {
    monkey.velocityY = -12;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(invisibleGround);
  
    bg.velocityX = -4;
    if (bg.x < 0) { 
    
      bg.x = bg.width/2;
    
   }
    
    time = time + Math.round(getFrameRate()/60);
  
    invisibleGround.velocityX = -4;
    if (invisibleGround.x < 0) { 
    
      invisibleGround.x = invisibleGround.width/2;
      
   }
    spawnBanana();
    spawnObstacles();
    
    if (foodGroup.isTouching(monkey)){
     foodGroup.destroyEach();
     score=score+2;
    }
    
    if (obstacleGroup.isTouching(monkey)){
      gameState = END;
      death.play();
    }
  }
  if (gameState === END){
    
    gameOver.visible = true;
    //stopping and destroying all sprites
    foodGroup.velocityX = 0;
    obstacleGroup.velocityX = 0;   
    invisibleGround.velocityX = 0;
    bg.velocityX = 0;
    monkey.destroy();
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
    monkey.collide(invisibleGround);

  }
  
  drawSprites();
  
  fill("black");
  textSize(20);
  textFont("Ink Free");
  text("score = " + score, 500, 30);
  
  fill("black");
  textSize(20);
  textFont("Ink Free");
  text("time survived = " + time, 300, 30);
  
}

function spawnBanana(){
 if (frameCount % 60 === 0){
   var banana = createSprite(600,100,40,10);
   banana.y = Math.round(random(20, 150));
   banana.velocityX = -(6 + score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: banana.addImage(bananaImage);
              break;
      case 2: banana.addImage(bananaImage);
              break;
      case 3: banana.addImage(bananaImage);
              break;
      case 4: banana.addImage(bananaImage);
              break;
      case 5: banana.addImage(bananaImage);
              break;
      case 6: banana.addImage(bananaImage);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    banana.scale = 0.08;
    banana.lifetime = 300;
   
   //add each obstacle to the group
    foodGroup.add(banana);
 }
}

  function spawnObstacles(){
 if (frameCount % 100 === 0){
   var obstacle = createSprite(600,170,10,40);
   obstacle.velocityX = -6;
   
r = Math.round(random(1,2));
if(r === 1){
  obstacle.addImage(obstacleImage);
}
else if(r===2){
  obstacle.addImage(obstacleImage);
}
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.12;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
   
 }
}
