var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,obstacelesgroup
var score = 0
var PLAY = 1
var END = 0
var gamestate = PLAY
var gameoverimg,restartimg,gameover,restart,jumpsound,checkpointsound,diesound

var newImage;
var oosososos = "this is a message"

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  gameoverimg = loadImage ("gameOver.png")
  restartimg = loadImage ("restart.png")
  checkpointsound = loadSound("checkpoint.mp3")
  diesound = loadSound("die.mp3")
  jumpsound = loadSound("jump.mp3")

}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
   trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  cloudsGroup=new Group ()
  obstacelesgroup=new Group ()
  gameover = createSprite(300,100)
  gameover.addImage(gameoverimg)
  gameover.visible = false
  restart = createSprite(300,150)
  restart.addImage(restartimg)
  restart.visible = false
  //trex.setCollider("rectangle",100,0,trex.width,trex.height)
}

function draw() {
  background(180);
if(gamestate=== PLAY){
  ground.velocityX = -(6+3*score/100);

  score = score+ Math.round (frameCount/300)
  if(keyDown("space") && trex.y>=161) {
    trex.velocityY = -13;
    jumpsound.play()
  }
  if(score%100 === 0 && score>1){
    
    checkpointsound.play()
    }
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
   //spawn the clouds
   spawnClouds();
   spawnobstacles()
   if(obstacelesgroup.isTouching(trex)){
    gamestate = END
    diesound.play()
    
   }
}
else if(gamestate=== END){
ground.velocityX = 0
trex.velocityY = 0
obstacelesgroup.setVelocityXEach(0)
trex.changeAnimation("collided",trex_collided)
obstacelesgroup.setLifetimeEach(-1)
gameover.visible = true
restart.visible = true
}
if (mousePressedOver(restart)){
  reset()
}



  
  text ("score = "+ score,50,50)
 
 
  
  trex.collide(invisibleGround);
  
 
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    cloudsGroup.add(cloud)
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    cloud.lifetime = 200
    }
}

function spawnobstacles(){
  if (frameCount % 60 === 0){
  var obstaceles = createSprite(600,164,400,1)
  obstaceles.velocityX = -(6+3*score/100)
  var num = Math.round(random(1,6))
  switch(num){
    case 1 :obstaceles.addImage(obstacle1)
          break
    case 2 :obstaceles.addImage(obstacle2)
          break
    case 3 :obstaceles.addImage(obstacle3)
          break
    case 4 :obstaceles.addImage(obstacle4)
          break
    case 5 :obstaceles.addImage(obstacle5)
          break
    case 6 :obstaceles.addImage(obstacle6)
          break
  }
  obstaceles.scale = 0.5
  obstaceles.lifetime = 300
  obstacelesgroup.add(obstaceles)
  }

}
function reset(){
gamestate = PLAY
gameover.visible = false
restart.visible = false
obstacelesgroup.destroyEach()
cloudsGroup.destroyEach()
score = 0
trex.changeAnimation("running",trex_running)
}