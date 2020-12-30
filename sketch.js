var gameState = "PLAY";

var player , player_running
var banana ,bananaImage, obstacle, obstacleImage;
var score;

var survivalTime;

var backImg;

var gameOver, gameOverImage;

var restart,restartImg;

function preload(){
  
  backImg = loadImage("jungle.jpg");
  
  player_running =            loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_04.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  
  gameOverImage = loadImage("gameover.png");
 
  restartImg = loadImage("restart.png");
  
}



function setup() {
  createCanvas(400,400);
  
//creating Monkey
  
  ground = createSprite(400,350,900,10)
  ground.velocityX = -4;
  ground.x = ground.width/2;
  ground.visible = false;
  
  
  survivalTime = 0;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  playerGroup = new Group();
  
  player = createSprite(80,315,20,20);
  player.addAnimation("moving",player_running);
  player.scale = 0.1;
  playerGroup.add(player);
  
  gameOver = createSprite(200,200,120,50);
  gameOver.addImage(gameOverImage);
  gameOver.visible = false;
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  restart.visible = false;
  
}


function draw() {
  
  
  background(backImg);
  
  if(ground.x<0){
     ground.x = ground.width/2;
     
     }
  
  if(keyDown("space")&& player.y >= 100) {
        player.velocityY = -12;
    }
  
  player.velocityY = player.velocityY + 0.8;
  
  player.collide(ground);
  
  food();
  obstacle();
  
drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+survivalTime,100,50);
  
    if(foodGroup.isTouching(playerGroup)){
     foodGroup.destroyEach();
    
    survivalTime = survivalTime+1;
      
      switch(survivalTime){
      
    case 10: player.scale = 0.12;
      break;
    case 20: player.scale = 0.14;
      break;
    case 30: player.scale = 0.16;
      break;
    case 40: player.scale = 0.18;
      break;
    default:break;
      
  }

  }
  if(obstacleGroup.isTouching(player)){
       player.scale = 0.1;
     
     }
}

function food() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(400,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
    
    banana.lifetime = 200;
    
    foodGroup.add(banana);
  }
  
}

function obstacle() {
  if (frameCount % 300 === 0) {
    var stone = createSprite(400,310,40,10);
    stone.addImage(obstacleImage);
    stone.scale = 0.2;
    stone.velocityX = -5;
    
    stone.lifetime = 200;
    
    obstacleGroup.add(stone);
  }
  
}

