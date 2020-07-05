var ground,player,playerimg,background,backgroundimg,enemy1,enemy1img,bullets,bulletsimg,bulletsCount,invisibleGround,bulletspackage,bulletspackageimg,packageGroup,steps,stepsGroup,enemybulletsimg,enemybullets,gameState,PLAY,END,bulletsGroup,enemyBulletsGroup;

bulletsCount = 30;

function setup() {
  createCanvas(displayWidth-20,displayHeight-30);

  backGround = createSprite(displayWidth/2,displayHeight/2,displayWidth*2,displayHeight);
  backGround.addImage(backgroundimg);
  backGround.velocityX = -3;
  backGround.x = backGround.width/2;
  backGround.scale = 1.5;

  ground = createSprite(100,775,2*displayWidth,20);
  ground.velocityX = -10;
  ground.x = ground.width/2;
  ground.shapeColor = "black";

  player = createSprite(100,705,20,20);
  player.addImage(playerimg);
  player.velocityY = player.velocityY + 1;

  enemy1 = createSprite(1250,715,20,20);
  enemy1.scale = 0.2;
  enemy1.addImage(enemy1img);

  invisibleGround = createSprite(100,775,2*displayWidth,20);
  invisibleGround.visible = false;

  packageGroup = createGroup();
  stepsGroup = createGroup();
  bulletsGroup = createGroup();
  enemyBulletsGroup = createGroup();

  PLAY = 1;
  END = 0;
  gameState = PLAY;
}

function preload(){
  
  playerimg = loadImage("vector.png");

  backgroundimg = loadImage("background.jpg");

  enemy1img = loadImage("enemy.png");

  bulletspackageimg = loadImage("package.png");

  bulletsimg = loadImage("bullets.png");

  enemybulletsimg = loadImage("fire.png");

}

function draw() {
  background(255,220,255);  

  if(gameState === PLAY){
    if(ground.x < 0){
      ground.x = ground.width/2;
    }
  
    if(backGround.x < 0){
      backGround.x = backGround.width/2;
    }
  
    if(keyDown("space") && bulletsCount > 0){
      bulletsCount = bulletsCount - 1;
    }

    player.collide(stepsGroup);

    spawnBullets();

    bulletsReleased();

    jump();

    spawnBulletsPackage();

    spawnSteps();

    collectingBullets(); 

    if(player.isTouching(stepsGroup)||player.isTouching(enemyBulletsGroup)){
      gameState = END;
    }

  }
  else if(gameState === END){

    ground.velocityX = 0;
    backGround.velocityX = 0;
  
    stepsGroup.setVelocityXEach(0);
    stepsGroup.setLifetimeEach(-1);
    packageGroup.setVelocityXEach(0);
    packageGroup.setLifetimeEach(-1);
    bulletsGroup.setVelocityXEach(0);
    bulletsGroup.setLifetimeEach(-1);
    enemyBulletsGroup.setVelocityXEach(0);
    enemyBulletsGroup.setLifetimeEach(-1);
  }

  player.collide(invisibleGround);

  console.log(bulletsCount);
  drawSprites();

}

function spawnBullets(){
  if(World.frameCount % 80 === 0){
    enemybullets = createSprite(1300,705,5,5);
    enemybullets.addImage(enemybulletsimg);
    enemybullets.scale = 0.4;
    enemybullets.velocityX = -15;
    enemybullets.lifetime = displayWidth/enemybullets.velocityX;
    enemyBulletsGroup.add(enemybullets);
  }
}

function bulletsReleased(){
  if(keyDown("space")&& bulletsCount > 0){
    bullets = createSprite(100,725,5,5);
    bullets.scale = 0.02;
    bullets.addImage(bulletsimg);
    bullets.velocityX = 15;
    bullets.lifetime = displayWidth/bullets.velocityX;
    bulletsGroup.add(bullets);
  }
}

function jump(){
  if(keyDown("UP_ARROW")&& player.y > 690){
    player.velocityY = -15;
  }
  player.velocityY = player.velocityY + 0.5;
}

function spawnBulletsPackage(){
  if(World.frameCount % 200 === 0){
    bulletspackage = createSprite(1500,750,25,25);
    bulletspackage.addImage(bulletspackageimg);
    bulletspackage.velocityX = -5;
    bulletspackage.scale = 0.5;
    bulletspackage.y = random(500,750);
    bulletspackage.shapeColor = "yellow";
    bulletspackage.visible =true;
    packageGroup.add(bulletspackage);
    bulletspackage.lifetime = displayWidth/bulletspackage.velocityX
    console.log(bulletspackage.depth)
  }  
}

function spawnSteps(){
  if(World.frameCount % 100 === 0){
    steps = createSprite(1500,735,100,20);
    steps.shapeColor = "brown";
    steps.y = random(600,750);
    steps.width = random(10,100);
    steps.velocityX = -7.5;
    stepsGroup.add(steps);
    steps.lifetime = displayWidth/steps.velocityX;
  }
}

function collectingBullets(){
  if(player.isTouching(packageGroup)){
    bulletsCount = bulletsCount + 1;
    for(var i = 0;i < packageGroup.length;i ++){
      if(packageGroup.get(i).isTouching(player)){
        packageGroup.get(i).destroy();
      }
    }
  }
}
//https://99sounds.org/free-sound-effects/

//http://soundbible.com/royalty-free-sounds-1.html
