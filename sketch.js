var naruto , naruto_collide , naruto_run;
var wghost , bghost ;
var back;
var invisibleG;
var gameState = "play";
var score = 0;
var bronze,silver,gold;

function preload(){
   naruto_collide = loadAnimation("tile011.png");
  naruto_run = loadAnimation("tile016.png" , "tile017.png","tile018.png","tile019.png","tile020.png","tile021.png");
  wghost = loadImage("tile000.png");
  bghost = loadImage("tile006.png");
  back = loadImage("forest.jpg");
  bronze = loadImage("bronze.png");
  silver = loadImage("silver.png");
  gold = loadImage("gold.png");
  
}

function setup() {
  createCanvas(800, 450);

  bg = createSprite(300,-80);
  bg.addImage(back);
  bg.velocityX = -4;
  bg.scale = 2.8

  naruto = createSprite(100,400);
  naruto.addAnimation("nr",naruto_run);
   naruto.addAnimation("nc",naruto_collide);
  
  naruto.scale = 2;
  naruto.setCollider("rectangle",-40,-25,30,60);

invisibleG = createSprite(400,450,800,20);
invisibleG.visible = false;

obstaclesGroup = new Group();
coinBGroup = new Group();
coinSGroup = new Group();
coinGGroup = new Group();

gameOver = createSprite(450,225,200,40);
gameOver.visible = false;
  
}

function draw() {
  background(0);
  

  if(gameState === "play"){
    if(bg.x <100){
      bg.x = 300;
    }
    if(keyDown("space")){
  
      naruto.velocityY = -12;
    }
  naruto.velocityY = naruto.velocityY+0.5;
   

    spawnObstacles();
    spawnCoins();

    if(naruto.isTouching(obstaclesGroup)){

      gameState = "end";
    }
    

    for(var i = 0;i<coinSGroup.length;i++){
      if(naruto.isTouching(coinSGroup[i])){
        score = score + 2;
        coinSGroup[i].lifetime = 0;
        }
    }
    for(var i = 0;i<coinBGroup.length;i++){
      if(naruto.isTouching(coinBGroup[i])){
        score = score + 1;
        coinBGroup[i].lifetime = 0;
        }
    }
    for(var i = 0;i<coinGGroup.length;i++){
      if(naruto.isTouching(coinGGroup[i])){
        score = score + 3;
        coinGGroup[i].lifetime = 0;
        }
    }
    
  }

  drawSprites();
  textSize(20);
  strokeWeight(5);
  stroke("black");
  text("score: "+score , 100,10);
 
  naruto.collide(invisibleG);
  if(gameState === "end"){
    naruto.changeAnimation("nc",naruto_collide);
textSize(20);
stroke("yellow")
fill("red")
strokeWeight(5);
text("Game over" , 400,225)
bg.velocityX = 0
obstaclesGroup.setVelocityXEach(0);
coinSGroup.setVelocityXEach(0);
coinBGroup.setVelocityXEach(0);
coinGGroup.setVelocityXEach(0);

obstaclesGroup.setLifetimeEach(-1);
coinSGroup.setLifetimeEach(-1);
coinBGroup.setLifetimeEach(-1);
coinGGroup.setLifetimeEach(-1);

naruto.velocityY = 0;
if(mousePressedOver(gameOver)){
  reset();
}


  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,390,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(wghost);
              break;
      case 2: obstacle.addImage(bghost);
              break;
      
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 1.7;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnCoins() {
  if(frameCount % 20 === 0 && frameCount % 60 !== 0) {
    var coin = createSprite(600,390,10,40);
    //obstacle.debug = true;
    coin.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: coin.addImage(bronze);
      coinBGroup.add(coin);
              break;
      case 2: coin.addImage(silver);
      coinSGroup.add(coin);
              break;
      case 3: coin.addImage(gold);
      coinGGroup.add(coin);
              break;
      
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    coin.scale = 0.5;
    coin.lifetime = 300;
    //add each obstacle to the group
   
  }
}

function reset(){
  gameState = "play";
  
  
  obstaclesGroup.destroyEach();
  coinBGroup.destroyEach();
  coinSGroup.destroyEach();
  coinGGroup.destroyEach();
  naruto.changeAnimation("nr",naruto_run);
  
  
  score = 0;
  
}