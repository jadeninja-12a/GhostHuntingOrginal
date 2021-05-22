class Game{
    constructor(){
        this.isJump = true;
        this.hunterYes = true;
        this.hunterTimer = 0;
        this.isDuck = false;
        this.OMG = 220 + displayWidth;
        this.boo = true;
        this.ghostScale = 0.5;
        this.ghostSpeed = 0;
        this.fly = false;

    }
    start(){
       
        hunter = new Hunter();
        form = new Form();
        ghost = new Ghost();
        form.display();
        hunterSprite = createSprite(20, displayHeight/2, 30, 50);
        hunterSprite.addAnimation("running", hunterIMG);
        hunterSprite.addAnimation("ducking", hunterDuckingIMG);
        hunterSprite.addAnimation("crashed", hunterCrashIMG)
        hunterSprite.addAnimation("dancing", dancingIMG)
      
        hunterSprite.scale = 2.5;
        hunterSprite.setCollider("rectangle", -50, 5, 60, 120)
        ghostSprite = createSprite(displayWidth - 200, displayHeight-200, 15, 60);
        ghostSprite.setCollider("circle", -30,0,80 );
        ghostSprite.scale = 0.5;
        ghostSprite.addImage("normal", ghostIMG);
        invisibleLine1 = createSprite(displayWidth * 10 ,200, displayWidth * 20, 10);
        invisibleLine2 = createSprite(displayWidth * 10 ,displayHeight/2 + 100 , displayWidth * 20, 10);
        invisibleLine = createSprite(displayWidth * 10 ,windowHeight + 570, displayWidth * 20, 1000);
        invisibleLine.visible = false
        invisibleLine1.visible = false
        invisibleLine2.visible = false
        
        for(var i = 0; i<=40;i++){
            this.spawnObstacles();
        }
       
    }
    play(){
        form.hide();
        camera.x = hunterSprite.x + 730;
        camera.y = displayHeight/2;
        ghostSprite.scale = this.ghostScale;
        if(ghostSprite.x > displayWidth * 8 ){
           
            if(!this.fly){
                ghostSprite.velocityY = -2
            }
            if(ghostSprite.x > (invisibleLine2.x +10)){
                this.fly = true;
            }
            if(this.fly){
                ghostSprite.bounceOff(invisibleLine1);
                ghostSprite.bounceOff(invisibleLine2);
            }
        }
        if(ghostSprite.x < displayWidth * 2){
            this.ghostScale = 0.5
            this.ghostSpeed = 11.8
        } else if(ghostSprite.x < displayWidth * 7){
            this.ghostScale = 1;
            this.ghostSpeed = 12;
        } else if(ghostSprite.x < displayWidth * 13){
            this.ghostScale = 1.5;
            this.ghostSpeed = 12.2;
        } else{
            this.ghostScale = 2;
            this.ghostSpeed = 12.4;
        }
        // hunterSprite.x = camera.x
        textSize(22);
        fill("red");
        text(hunter.name, hunterSprite.x -200, hunterSprite.y-160 );
        
        drawSprites()
        
            hunterSprite.velocityY += 1.1;
        
        ghostSprite.velocityX = this.ghostSpeed;
        this.ghostSpeed += 0.00001
        if(keyIsDown(87) && this.isJump == false && this.hunterYes){
            hunterSprite.velocityY = -25;
            this.isJump = true;
            
        }
        
            
        
        
        if(keyIsDown(83)){
            hunterSprite.VelocityY = 4;
            //testing required for collider
            hunterSprite.setCollider("rectangle", -30, 37, 130, 40);
            hunterSprite.changeAnimation("ducking");
            if(this.hunterYes){
                hunterSprite.velocityX = 12;
            }
        }
        if(!keyIsDown(83) ){
            //testing required for collider
            hunterSprite.setCollider("rectangle", -50, 5, 30, 120)
            if(this.hunterYes){
            hunterSprite.changeAnimation("running");
            
                hunterSprite.velocityX = 14;
            }
        }
        if(hunterSprite.collide(invisibleLine) && this.isJump == true){
            this.isJump = false;
        }
        
        if(hunterSprite.collide(obstacleGroup) && this.hunterYes == true){
            hunterSprite.velocityX = -4; 
            hurtSound.playMode("restart");
            hurtSound.play()
            this.hunterYes = false;
            this.spawnNow = false
        }
        if(!loserSound.isPlaying()){
            loserSound.play()
        }
        if(!this.hunterYes){
            hunterSprite.setCollider("rectangle", -30, 70, 130, 40);
            hunterSprite.y = 840
           
            hunterSprite.changeAnimation("crashed")
            this.hunterTimer++;
            if(this.hunterTimer >= 40){
                this.hunterTimer = 0;
                this.hunterYes = true;
            }
        }
        if(!this.spawNow){
 
            this.spawnTimer++;
            if(this.spawnTimer >= 60){
                this.spawnTimer = 0;
                this.spawnNow = true;
            }
        }

        this.spawnObstacles();
     
        
        hunter.chasing();
        
        //in the below line the number will be according
        // to how long our games finishing line will be
        if(hunterSprite.isTouching(ghostSprite)){
            obstacleGroup.removeSprites();
        image(bgIMG, displayWidth/2, displayHeight/2 , displayWidth, displayHeight - 150)
            gameState = 2;
            
        }
        if(ghostSprite.x >= (displayWidth * 20)){
            obstacleGroup.removeSprites();
        image(bgIMG, displayWidth/2, displayHeight/2 , displayWidth, displayHeight - 150)
            ghost.isFinished = true;
            gameState = 2;
        }
    }
    end(){
        camera.x = displayWidth/2 
        camera.y = displayHeight/2
        if(ghost.isFinished == true){
            gameResult = "LOSS";
        } else if(ghost.isFinished == false){
            gameResult = "WON";
        }
       
        
        if(gameResult == "WON"){
            loserSound.stop()
            if(!celebratingSound.isPlaying()){
                celebratingSound.play()
            }
            

            hunterSprite.x = displayWidth/2;
            hunterSprite.y = displayHeight-300;
            hunterSprite.changeAnimation("dancing")

            var title = createElement("h1");
            title.html("GHOST HUNTING GAME");
            title.position(displayWidth/2 -200 , displayHeight/2 - 400);
            title.style.color = "Blue";
            var title1 = createElement("h2");
            title1.html("You Won The Game Congratualtions.");
            title1.position(displayWidth/2-200 , displayHeight/2 - 250);
            var title2 = createElement("h2");
            title2.html("Time Taken:-" + Math.round((hunter.timeTaken * 35)/1023) + " Seconds");
            title2.position(displayWidth/2-200, displayHeight/2 - 100);
        }else if(gameResult == "LOSS"){
            loserSound.stop()
            if(this.boo){
                losingSound.play()
                this.boo = false
                ghostSprite.velocityX = 2
            }
            if(!scarySound.isPlaying() && !losingSound.isPlaying()){
                scarySound.play()
            }
            ghostSprite.x = displayWidth/2
            ghostSprite.y = displayHeight/2+200;
            
            if(ghostSprite.x > displayWidth){
                ghostSprite.velocityX = -2
            }
            if(ghostSprite.x < 0){
                ghostSprite.velocityX = 2
            }
            ghostSprite.scale += 0.01
            var title = createElement("h1");
            title.html("GHOST HUNTING GAME");
            title.position(displayWidth/2- 200, displayHeight/2 - 400);
            var title2 = createElement("h2");
            title2.html("You Lost the Game. What a loser......");
            title2.position(displayWidth/2 - 200, displayHeight/2 - 250);
        }
    }
       
        
    
            
        

        
    
    spawnObstacles(){
        if (frameCount % 50 == 0) {
            var randomNumber = Math.round(random(1, 2));
            //the createSprites will have specific values depending on the img size so we
            // need to vary it according to img, this will be done when we get to test the
            //game with the images

          switch (randomNumber) {
            case 1:
                obstacle = createSprite(this.OMG, 
                400, 40, 10);
                obstacle.addImage(branchIMG);
                obstacle.scale = 1.5
                obstacle.setCollider("rectangle", 0, 0, 80, 480)
                this.OMG += 450
                break;
            case 2:
                obstacle = createSprite(this.OMG, 
                displayHeight - 100, 40, 10);
                obstacle.setCollider("rectangle", 0, -5, 270, 470)
                obstacle.addImage(bushIMG);
                obstacle.scale = 0.6
                this.OMG += 670
                break;
        
          }
          obstacleGroup.add(obstacle);
          if((obstacleGroup.get(0).x +200)<hunterSprite.x){
            obstacleGroup.get(0).lifetime = 1;
          }
        }
    }
}
