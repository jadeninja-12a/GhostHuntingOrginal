var hunter, ghost;
var hunterSprite, ghostSprite;
var gameState, obstacleGroup, obstacle;
var invisibleLine, invisibleLine1, invisibleLine2;
var game,  form;
var gameResult;
var delay;
var hunterCrashIMG;

function preload() {
  dancingIMG = loadAnimation("images/Dancing/frame_00_delay-0.02s.png","images/Dancing/frame_01_delay-0.02s.png",
  "images/Dancing/frame_04_delay-0.02s.png","images/Dancing/frame_05_delay-0.02s.png",
  "images/Dancing/frame_06_delay-0.02s.png","images/Dancing/frame_07_delay-0.02s.png",
  "images/Dancing/frame_08_delay-0.02s.png",
  "images/Dancing/frame_10_delay-0.02s.png","images/Dancing/frame_11_delay-0.02s.png",
  
  "images/Dancing/frame_14_delay-0.02s.png","images/Dancing/frame_15_delay-0.02s.png",
  "images/Dancing/frame_16_delay-0.02s.png","images/Dancing/frame_17_delay-0.02s.png")
  dancingIMG.frameDelay = 0.5;
  yay = loadSound("images/YAYff.mp3")
  hurtSound= loadSound("../images/ouch.mp3")
  hunterIMG = loadAnimation("images/Walking/run0001.png",
  "images/Walking/run0002.png","images/Walking/run0003.png","images/Walking/run0004.png"
  ,"images/Walking/run0005.png", "images/Walking/run0006.png",);
  ghostIMG = loadImage("images/ghost.png");
  hunterCrashIMG = loadAnimation("images/Collide/c0001.png","images/Collide/c0002.png",
  "images/Collide/c0003.png","images/Collide/c0004.png","images/Collide/c0005.png",
  "images/Collide/c0006.png","images/Collide/c0007.png","images/Collide/c0008.png",
  "images/Collide/c0009.png","images/Collide/c0010.png");
  celebratingSound = loadSound("images/YAY.mp3")
  losingSound = loadSound("images/scarySound.mp3")
  loserSound  = loadSound("images/Sad.mp3")
  scarySound = loadSound("images/scarySound(1).mp3");
  hunterDuckingIMG = loadAnimation("images/Sliding/Slide0004.png","images/Sliding/Slide0005.png",);
  bushIMG = loadImage("images/Dark Bush.png");
  branchIMG = loadImage("images/DarkBranch.png");
  bgIMG = loadImage("images/dark scary forest.jpg"); 
  bgIMG2 = loadImage("images/darkscaryforest2.jpg");
  
  
}
function setup() {
  createCanvas(displayWidth, displayHeight -150);
    obstacleGroup = createGroup();
    gameState = 0;
    game = new Game(); 
    imageMode(CENTER)
    image(bgIMG, displayWidth/2, displayHeight/2 , displayWidth, displayHeight - 150)
    game.start();
    
}

function draw() {
  
    if(gameState == 1){
      imageMode(CENTER)
      image(bgIMG2, displayWidth * 10 -100, displayHeight/2
         , displayWidth * 22, displayHeight - 150)
      game.play();
    }
    if(gameState == 2){
      game.end();
      imageMode(CENTER)
      image(bgIMG, displayWidth/2, displayHeight/2 , displayWidth, displayHeight - 150)
    }
    drawSprites();
}
